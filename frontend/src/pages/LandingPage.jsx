// import React from 'react'
// import Navbar from '../components/Navbar'
// import HeroSection from '../components/HeroSection'
// import FeaturesSection from '../components/Features'
// import FAQ from '../components/FAQ'
// import Footer from '../components/Footer'

// const LandingPage = () => {
//     return (
//         <>
//             <div className="bg-black">
//                 <div className="bg-black text-white">
//                     <Navbar/>
//                 </div>
//                 <div className="bg-black text-white h-[85vh]">
//                     <HeroSection/>
//                 </div>
//                 <div className="bg-black text-white">
//                     <FeaturesSection/>

//                 </div>
//                 <FAQ/>
//                 <Footer/>
//             </div>
//         </>
//     )
// }

// export default LandingPage


import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/Features';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <>
            <div className="bg-black">
                <div className="bg-black text-white">
                    <Navbar />
                </div>
                <div className="bg-black text-white h-[85vh]">
                    <HeroSection />
                </div>
                <div className="bg-black text-white">
                    <FeaturesSection />
                </div>
                <FAQ />
                <Footer />
            </div>
            {/* <button id="start-tour" className="bg-blue-500 text-white px-4 py-2 rounded-full fixed bottom-5 right-5">Start Tour</button> */}
        </>
    );
};

export default LandingPage;
