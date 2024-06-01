
// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FadeLoader } from 'react-spinners';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [url, setUrl] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const isValidUrl = (urlString) => {
//     try {
//       new URL(urlString);
//     } catch (_) {
//       return false;
//     }
//     return true;
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!isValidUrl(url)) {
//       setError('Please enter a valid URL');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       setError('');

//       const response = await axios.post(
//         'http://localhost:8000/get_all/',
//         new URLSearchParams({ url }).toString(),
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         }
//       );

//       if (response.status === 200) {
//         const dataWithUrl = { ...response.data, url }; // Include the URL in the data
//         localStorage.setItem('articleData', JSON.stringify(dataWithUrl));
//         navigate('/analyze', { state: { url } });
//         // console.log('Stored articleData:', JSON.stringify(dataWithUrl));
//       } else {
//         setError('Error processing the article. Please try again.');
//       }
//     } catch (err) {
//       setError('Error processing the article. Please try again.');
//       console.error('Error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <div className="bg-black text-white">
//         <Navbar />
//       </div>
//       <div className="flex-1 flex justify-center items-center bg-white min-h-[70vh] relative">
//         {isLoading && (
//           <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-75 z-10">
//             <FadeLoader color="#2563EB" />
//             <p className="mt-4 text-lg text-gray-600">It can take a few minutes. Please wait...</p>
//           </div>
//         )}
//         <div className={`bg-gray-100 p-8 rounded-2xl shadow-2xl md:min-w-[34rem] md:min-h-[15rem] ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
//           <h1 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black to-black p-1">
//             Enter URL Of Article
//           </h1>
//           <hr className="mb-6" />
//           <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
//             <div className="text-md text-gray-500">Use dev.to article URL to get better results.</div>
//             <input
//               type="url"
//               placeholder="https://dev.to/article-url"
//               className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Processing your request...' : 'Submit'}
//             </button>
//             {error && <div className="text-red-500 text-center">{error}</div>}
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default HomePage;


import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidUrl = (urlString) => {
    try {
      new URL(urlString);
    } catch (_) {
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const response = await axios.post(
        'http://localhost:8000/get_all/',
        new URLSearchParams({ url }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.status === 200) {
        const dataWithUrl = { ...response.data, url }; // Include the URL in the data
        localStorage.setItem('articleData', JSON.stringify(dataWithUrl));
        navigate('/analyze', { state: { url } });
      } else {
        setError('Error processing the article. Please try again.');
      }
    } catch (err) {
      setError('Error processing the article. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shepherd-theme-default',
        scrollTo: true
      }
    });

    tour.addStep({
      id: 'url-input',
      text: 'Enter the URL of the article you want to analyze here.',
      attachTo: { element: '.url-input', on: 'bottom' },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep({
      id: 'submit-button',
      text: 'Click this button to submit the URL and start the analysis.',
      attachTo: { element: '.submit-button', on: 'bottom' },
      buttons: [
        {
          text: 'Back',
          action: tour.back
        },
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep({
      id: 'loading-spinner',
      text: 'While your request is being processed, you will see this loading indicator.',
      attachTo: { element: '.loading-spinner', on: 'top' },
      buttons: [
        {
          text: 'Back',
          action: tour.back
        },
        {
          text: 'End Tour',
          action: tour.complete
        }
      ]
    });

    document.getElementById('start-tour').addEventListener('click', () => {
      tour.start();
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="bg-black text-white">
        <Navbar />
      </div>
      <div className="flex-1 flex justify-center items-center bg-white min-h-[70vh] relative">
        {isLoading && (
          <div className="loading-spinner absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-75 z-10">
            <FadeLoader color="#2563EB" />
            <p className="mt-4 text-lg text-gray-600">It can take a few minutes. Please wait...</p>
          </div>
        )}
        <div className={`bg-gray-100 p-8 rounded-2xl shadow-2xl md:min-w-[34rem] md:min-h-[15rem] ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          <h1 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black to-black p-1">
            Enter URL Of Article
          </h1>
          <hr className="mb-6" />
          <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
            <div className="text-md text-gray-500">Use dev.to article URL to get better results.</div>
            <input
              type="url"
              placeholder="https://dev.to/article-url"
              className="url-input p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="submit"
              className="submit-button p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            >
              {isLoading ? 'Processing your request...' : 'Submit'}
            </button>
            {error && <div className="text-red-500 text-center">{error}</div>}
          </form>
        </div>
      </div>
      <Footer />
      {/* <button id="start-tour" className="bg-blue-500 text-white px-4 py-2 rounded-full fixed bottom-5 right-5">Start Tour</button> */}
    </div>
  );
};

export default HomePage;
