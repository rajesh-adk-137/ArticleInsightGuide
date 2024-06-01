// import React, { useState, useEffect } from 'react'
// // import { Link, Router } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { ImCross } from "react-icons/im";
// import { FaGithub } from "react-icons/fa";
// import { Link } from 'react-router-dom';


// export const Navbar = () => {
//     const [click, setClick] = useState(false)
//     const [button, setButton] = useState(true)

//     const handleClick = () => { setClick(!click) }

//     const closeMobileMenu = () => setClick(false)

//     const showButton = () => {
//         if (window.innerWidth <= 760) {
//             setButton(false)
//         }
//         else {
//             setButton(true)
//         }
//     };

//     useEffect(() => {
//         showButton();
//     }, []);

//     window.addEventListener('resize', showButton);

//     return (
//         <>
//             <header className="min-h-24 flex justify-center ">
//                 <nav className="flex justify-between items-center w-[92%]  mx-auto pt-4">
//                     <Link to="/">
//                         <div className='text-3xl font-bold ml-4 md:ml-10'>
//                             Article<span className='text-[#4fe331]'>Insight</span>
//                         </div>
//                     </Link>
//                     <div
//                         className={!click ? "nav-links duration-300 md:static absolute md:min-h-fit md:w-auto  w-full flex items-center px-5 left-[-50rem] top-[6rem]" :
//                             "nav-links duration-500 md:static absolute bg-white text-black left-0 md:w-auto  w-full flex items-center px-5 top-[5.25rem]"}>

//                         <ul className="flex md:flex-row flex-col items-center md:gap-[4vw] gap-5 w-full text-xl font-bold p-5  ">
//                             <Link to="/home">
//                                 <li className={!button ? 'hover:bg-gray-200 w-full text-center hover:text-black h-10 rounded-xl flex align-center justify-center md:hover:text-gray-800 pt-1' :
//                                     'hover:text-gray-800 w-full text-center flex align-center justify-center md:hover:text-blue-600 hover:border-b-2 border-blue-600 rounded-xl px-[1.25rem]'}>
//                                     HOME
//                                 </li>
//                             </Link>
//                             <Link to='/about'>
//                                 <li className={!button ? 'hover:bg-gray-200 w-full text-center hover:text-black h-10 rounded-xl flex align-center justify-center md:hover:text-gray-800 pt-1' :
//                                     'hover:text-gray-800 w-full text-center flex align-center justify-center md:hover:text-blue-600 hover:border-b-2 border-blue-600 rounded-xl px-[1.25rem]'}>
//                                     ABOUT
//                                 </li>
//                             </Link>
//                             {/* <li className={!button ? 'hover:bg-gray-200 w-full text-center hover:text-black h-10 rounded-xl flex align-center justify-center md:hover:text-gray-800 pt-1' :
//                                 'hover:text-gray-800 w-full text-center flex align-center justify-center md:hover:text-blue-600 hover:border-b-2 border-blue-600 rounded-xl px-[1.25rem]'}>
//                                 Help
//                             </li> */}
//                         </ul>
//                     </div>
//                     <div className="flex items-center gap-6 ">
//                         <div className='flex justify-center items-center'>
//                             <a href="https://github.com/rajesh-adk-137/StudyPal">
//                                 <button className='bg-white hover:bg-gray-400 text-black md:px-5 md:py-2 rounded-md md:flex items-center space-x-2 hidden'>
//                                     <FaGithub />
//                                     <span>GitHub</span>
//                                 </button>
//                             </a>
//                         </div>
//                         {
//                             click ? (
//                                 <ImCross onClick={handleClick} name="menu" className="text-3xl cursor-pointer md:hidden" />
//                             ) : (
//                                 <GiHamburgerMenu onClick={handleClick} name="menu" className="text-3xl cursor-pointer md:hidden" />
//                             )
//                         }
//                     </div>
//                 </nav>
//             </header>
//         </>
//     )
// }

// export default Navbar;

import React, { useState, useEffect } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Shepherd from 'shepherd.js';
import { motion } from 'framer-motion';
import 'shepherd.js/dist/css/shepherd.css';

export const Navbar = () => {
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const handleClick = () => { setClick(!click) }

    const closeMobileMenu = () => setClick(false)

    const showButton = () => {
        if (window.innerWidth <= 760) {
            setButton(false)
        } else {
            setButton(true)
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    useEffect(() => {
        const tour = new Shepherd.Tour({
            useModalOverlay: true,
            defaultStepOptions: {
                classes: 'shepherd-theme-default',
                scrollTo: true
            }
        });

        tour.addStep({
            id: 'brand',
            text: 'Welcome to Article Insight! This is our brand logo.',
            attachTo: { element: '.text-3xl', on: 'bottom' },
            buttons: [
                {
                    text: 'Next',
                    action: tour.next
                }
            ]
        });

        tour.addStep({
            id: 'nav-links',
            text: 'Here are the navigation links to different pages.',
            attachTo: { element: '.nav-links', on: 'bottom' },
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
            id: 'github-button',
            text: 'This button will take you to our GitHub repository.',
            attachTo: { element: '.fa-github', on: 'bottom' },
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
        <>
            <header className="min-h-24 flex justify-center ">
                <nav className="flex justify-between items-center w-[92%]  mx-auto pt-4">
                    <Link to="/">
                        <motion.div className='text-3xl font-bold ml-4 md:ml-10' whileHover={{scale:1.1}}>
                            Article<span className='text-[#4fe331]'>Insight</span>
                        </motion.div>
                    </Link>
                    <div
                        className={!click ? "nav-links duration-300 md:static absolute md:min-h-fit md:w-auto  w-full flex items-center px-5 left-[-50rem] top-[6rem]" :
                            "nav-links duration-500 md:static absolute bg-white text-black left-0 md:w-auto  w-full flex items-center px-5 top-[5.25rem]"}>

                        <ul className="flex md:flex-row flex-col items-center md:gap-[4vw] gap-5 w-full text-xl font-bold p-5  ">
                            <Link to="/home">
                                <motion.li className={!button ? 'hover:bg-gray-200 w-full text-center hover:text-black h-10 rounded-xl flex align-center justify-center md:hover:text-gray-800 pt-1' :
                                    'hover:text-gray-800 w-full text-center flex align-center justify-center md:hover:text-blue-600 hover:border-b-2 border-blue-600 rounded-xl px-[1.25rem]'} whileHover={{scale:1.1}}>
                                    HOME
                                </motion.li>
                            </Link>
                            <Link to='/about'>
                                <motion.li className={!button ? 'hover:bg-gray-200 w-full text-center hover:text-black h-10 rounded-xl flex align-center justify-center md:hover:text-gray-800 pt-1' :
                                    'hover:text-gray-800 w-full text-center flex align-center justify-center md:hover:text-blue-600 hover:border-b-2 border-blue-600 rounded-xl px-[1.25rem]'} whileHover={{scale:1.1}}>
                                    ABOUT
                                </motion.li>
                            </Link>
                        </ul>
                    </div>
                    <div className="flex items-center gap-6 ">
                        <div className='flex justify-center items-center'>
                            <a href="https://github.com/rajesh-adk-137/StudyPal">
                            <motion.button className='bg-gray-300 hover:bg-gray-400 text-black md:px-5 md:py-2 rounded-md md:flex items-center space-x-2 hidden'
                    whileHover={{scale:1.1}}>
                        <FaGithub />
                        <span>GitHub</span>
                    </motion.button>
                            </a>
                        </div>
                        {
                            click ? (
                                <ImCross onClick={handleClick} name="menu" className="text-3xl cursor-pointer md:hidden" />
                            ) : (
                                <GiHamburgerMenu onClick={handleClick} name="menu" className="text-3xl cursor-pointer md:hidden" />
                            )
                        }
                    </div>
                </nav>
                <button id="start-tour" className="bg-blue-500 text-white px-4 py-2 rounded-full fixed bottom-5 right-5">Start Tour</button>
            </header>
        </>
    )
}

export default Navbar;
