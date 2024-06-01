// // import React from 'react'
// import { Link } from 'react-router-dom';
// import { MdKeyboardDoubleArrowRight } from "react-icons/md";
// import heroImage from "../assets/images/learning-with-ai.png";

// const HeroSection = () => {
//     const gradientStyle = {
//         background: 'rgb(0,85,184)',
//         background: 'radial-gradient(circle, rgb(0,85,184,1) 0%, rgba(0,0,0,1) 55%)' // Radial gradient
//     };
//     return (
//         <div className='grid grid-cols-1 md:grid-cols-6 m-10 h-[80%] md:px-20'>
//             <div className=' flex justify-center items-center col-span-3'>
//                 <div>
//                     <h1 className='text-green-400 text-xl tracking-widest'>AI-POWERED TOOL</h1>
//                     <h1 className='text-5xl md:text-8xl font-bold my-3'>ARTICLE ANALYZER</h1>
//                     <p className='text-xl md:text-2xl text-[#aaabc4] my-10'>Transform your reading experience with ArticleInsignt – an innovative web app that summarizes online articles, performs sentiment analysis, extracts keywords, and lets you ask questions related to the content.</p>
//                     <div className='flex flex-row gap-10'>
//                         {/* <Link to="/mcq"> */}
//                         <Link to='/home'>
//                             <button className='bg-[#171a8d] text-[#5ce1ff] font-bold px-5 py-3 rounded-lg flex items-center justify-center space-x-2 transition duration-300 ease-in-out hover:bg-[#0f0e69] hover:shadow-lg'>
//                                 <span>TRY IT NOW</span>
//                                 <MdKeyboardDoubleArrowRight className="text-xl" />
//                             </button>
//                         </Link>
//                         {/* </Link> */}
//                         <a href="https://quine.sh/repo/rajesh-adk-137-ArticleInsight-802838180?utm_source=copy&utm_share_context=rdp/">
//                             <button className='bg-[#4fe331] text-black font-bold px-5 py-3 rounded-lg flex items-center justify-center space-x-2 transition duration-300 ease-in-out hover:bg-[#3fb427] hover:shadow-lg'>
//                                 <span>VOTE ON QUINE</span>
//                                 <MdKeyboardDoubleArrowRight className="text-xl" />
//                             </button>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//             <div className='col-span-3 flex justify-center items-center ' style={gradientStyle}>
//                 <div className='p-2 md:w-full md:max-w-md'>
//                     <img src={heroImage} alt="Hero Image" className="w-full h-auto rounded-lg" />
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default HeroSection


import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import heroImage from "../assets/images/learning-with-ai.png";
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const HeroSection = () => {
    const gradientStyle = {
        background: 'rgb(0,85,184)',
        background: 'radial-gradient(circle, rgb(0,85,184,1) 0%, rgba(0,0,0,1) 55%)'
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
            id: 'hero-title',
            text: 'This is the main title of our application.',
            attachTo: { element: '.hero-title', on: 'bottom' },
            buttons: [
                {
                    text: 'Next',
                    action: tour.next
                }
            ]
        });

        tour.addStep({
            id: 'hero-description',
            text: 'Here is a brief description of what our application does.',
            attachTo: { element: '.hero-description', on: 'bottom' },
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
            id: 'hero-buttons',
            text: 'You can try our application or vote for us using these buttons.',
            attachTo: { element: '.hero-buttons', on: 'bottom' },
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
        <div className='grid grid-cols-1 md:grid-cols-6 m-10 h-[80%] md:px-20'>
            <div className='flex justify-center items-center col-span-3'>
                <div>
                    <h1 className='text-green-400 text-xl tracking-widest'>AI-POWERED TOOL</h1>
                    <h1 className='hero-title text-5xl md:text-8xl font-bold my-3'>ARTICLE ANALYZER</h1>
                    <p className='hero-description text-xl md:text-2xl text-[#aaabc4] my-10'>
                        Transform your reading experience with ArticleInsignt – an innovative web app that summarizes online articles, performs sentiment analysis, extracts keywords, and lets you ask questions related to the content.
                    </p>
                    <div className='hero-buttons flex flex-row gap-10'>
                        <Link to='/home'>
                            <button className='bg-[#171a8d] text-[#5ce1ff] font-bold px-5 py-3 rounded-lg flex items-center justify-center space-x-2 transition duration-300 ease-in-out hover:bg-[#0f0e69] hover:shadow-lg'>
                                <span>TRY IT NOW</span>
                                <MdKeyboardDoubleArrowRight className="text-xl" />
                            </button>
                        </Link>
                        <a href="https://quine.sh/repo/rajesh-adk-137-ArticleInsight-802838180?utm_source=copy&utm_share_context=rdp/">
                            <button className='bg-[#4fe331] text-black font-bold px-5 py-3 rounded-lg flex items-center justify-center space-x-2 transition duration-300 ease-in-out hover:bg-[#3fb427] hover:shadow-lg'>
                                <span>VOTE ON QUINE</span>
                                <MdKeyboardDoubleArrowRight className="text-xl" />
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className='col-span-3 flex justify-center items-center' style={gradientStyle}>
                <div className='p-2 md:w-full md:max-w-md'>
                    <img src={heroImage} alt="Hero Image" className="w-full h-auto rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
