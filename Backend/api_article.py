from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from bs4 import BeautifulSoup
import requests
from llmware.models import ModelCatalog
from urllib.parse import urlparse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Helper function to fetch and parse the HTML content
def fetch_html(url):
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching the article.")
    return BeautifulSoup(response.content, 'html.parser')

# Generalized scraping function
def scrape_article(url):
    domain = urlparse(url).netloc

    if 'dev.to' in domain:
        return scrape_dev_article(url)
    elif 'medium.com' in domain or 'levelup.gitconnected.com' in domain:
        return scrape_medium_article(url)
    else:
        raise HTTPException(status_code=400, detail='Unsupported website')

def scrape_dev_article(url):
    soup = fetch_html(url)
    
    title = soup.find('h1').get_text() if soup.find('h1') else 'No title found'
    content = '\n\n'.join(p.get_text() for p in soup.find('div', class_='crayons-article__main').find_all('p', recursive=False))
    comments = '\n\n'.join(div.get_text() for div in soup.find_all('div', class_='comment__body'))
    likes = 'Likes information not extracted'
    
    content = filter_content(content)
    
    return title, content, comments, likes

def scrape_medium_article(url):
    soup = fetch_html(url)
    
    title = soup.find('h1').get_text() if soup.find('h1') else 'No title found'
    content = '\n\n'.join(p.get_text() for p in soup.find_all('p'))
    comments = '\n\n'.join(div.get_text() for div in soup.find_all('div', class_='comment'))
    likes = soup.find('button', class_='likeButton').get_text() if soup.find('button', class_='likeButton') else 'No likes information found'
    
    content = filter_content(content)
    
    return title, content, comments, likes

def filter_content(content):
    lines = content.splitlines()
    filtered_lines = [line for i, line in enumerate(lines) if i >= 20 or not any(word in line for word in remove_words_first_20)]
    filtered_lines = [line for i, line in enumerate(filtered_lines) if i < len(filtered_lines) - 25 or not any(word in line for word in remove_words_last_25)]
    return '\n'.join(filtered_lines)

remove_words_first_20 = ["Sign up", "Sign in", "Follow", "Listen", "Share"]
remove_words_last_25 = [
    "--", "Building. Author of “Feeling Great About My Butt.” Previously: Creators @Medium, Product @embedly, Research @NECSI. http://whichlight.com.",
    "Help", "Status", "About", "Careers", "Press", "Blog", "Privacy", "Terms", "Text to speech", "Teams"
]

# LLMware Models
def get_summary(text):
    if text:
        slim_model = ModelCatalog().load_model("slim-summary-tool")
        response = slim_model.function_call(text, params=["key points (3)"], function="summarize")
        return response["llm_response"]
    return "Invalid text"

def get_tags(text):
    if text:
        slim_model = ModelCatalog().load_model("slim-tags-tool")
        response = slim_model.function_call(text, params=["tags"], function="classify")
        return response["llm_response"]
    return "Invalid text"

def get_sentiment(comments):
    if comments:
        slim_model = ModelCatalog().load_model("slim-sentiment-tool")
        response = slim_model.function_call(comments, params=["sentiment"], function="classify")
        return response["llm_response"]
    return "Invalid text"

def get_topic(text):
    if text:
        slim_model = ModelCatalog().load_model("slim-topics-tool")
        response = slim_model.function_call(text, params=["topics"], function="classify")
        return response["llm_response"]
    return "Invalid text"

def get_answer(text, question):
    if text:
        questions = '"' + question + " (explain)" + '"'
        slim_model = ModelCatalog().load_model("slim-boolean-tool")
        response = slim_model.function_call(text, params=[questions], function="boolean")
        return response["llm_response"]
    return "Invalid text"

@app.post("/get_all/")
async def get_all(url: str = Form(...)):
    title, content, comments, likes = scrape_article(url)

    text = '"' + content + '"'
    summary = get_summary(text)
    tags = get_tags(text)
    sentiment = get_sentiment(comments)
    topic = get_topic(text)

    return JSONResponse({"summary": summary, "tags": tags, "sentiment": sentiment, "topic": topic})

@app.post("/get_answer/")
async def get_answer_route(url: str = Form(...), question: str = Form(...)):
    title, content, comments, likes = scrape_article(url)

    text = '"' + content + '"'

    if not question:
        raise HTTPException(status_code=400, detail="Question parameter is required for get_answer function")

    answer = get_answer(text, question)
    return JSONResponse({"answer": answer})
