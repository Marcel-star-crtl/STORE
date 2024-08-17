// import React from 'react';
// import Layout from '../components/Layout';
// import HeroSection from '../components/Hero';
// import Collections from '../components/Categories';
// import FullImage from '../components/FullImage';
// import ProductList from '../components/ProductList';
// import Footer from '../components/Footer';
// import FullVideo from '../components/FullVideo';
// import Image from 'next/image';


// const HomePage = () => {
//   return (
//     <Layout>
//       <div>
//         <HeroSection />
//         <Collections />
        
//         <div className="relative h-screen overflow-hidden">
//           <div className="absolute inset-0 z-0 h-full px-4 sm:px-16">
//             <img src='/homepage1.png' alt="Hero Background" className="object-contain" />
//           </div>
//         </div>


//         <ProductList />
//         <FullVideo videoUrl="/annies_vid2.mp4" />

//         {/* Our Story */}
//         <div className="flex justify-center items-center px-4 sm:px-6 md:px-8 py-12 md:py-20">
//           <div className="w-full max-w-4xl text-black">
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6">Our Story</h1>
//             <div className="space-y-4 font-poppins text-sm md:text-base leading-relaxed" style={{fontFamily: "Poppins-Regular"}}>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//               </p>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
//                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
//                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
//                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//               </p>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
//                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
//                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
//                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//               </p>
//             </div>
//             <button className="bg-black text-white py-2 px-6 md:px-10 mt-8 text-sm md:text-base hover:bg-opacity-80 transition-colors duration-300" style={{fontFamily: "Poppins-Regular"}}>
//               Read More
//             </button>
//           </div>
//         </div>

//         {/* CONNECT */}
//         {/* <div className="flex flex-col md:flex-row h-96 section__padding">
//           <div className="md:w-1/2 flex items-center p-4 border border-black">
//             <h1 style={{ fontFamily: 'Playfair Display', fontSize: '61px', fontWeight: 600, lineHeight: '1.2', textAlign: 'left', paddingLeft: "70px" }} className="text-2xl font-bold">Carefully <br/> Considered</h1>
//           </div>
//           <div className="md:w-1/2">
//             <img src="/conn.png" alt="Carefully Considered" className="w-full h-auto md:h-full object-cover" />
//           </div>
//         </div> */}
//         <div className="flex flex-col md:flex-row min-h-[24rem] md:h-96 px-4 sm:px-16">
//           <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 border border-black">
//             <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight md:leading-snug lg:leading-tight text-center md:text-left">
//               Carefully <br/> Considered
//             </h1>
//           </div>
//           <div className="w-full md:w-1/2 h-64 md:h-auto relative">
//             <Image
//               src="/conn.png"
//               alt="Carefully Considered"
//               layout="fill"
//               objectFit="cover"
//               priority
//             />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </Layout>
//   );
// };

// export default HomePage;

















import React, { useState, useRef } from 'react';
import Layout from '../components/layout';
import HeroSection from '../components/Hero';
import Collections from '../components/Categories';
import ProductList from '../components/ProductList';
import ProductInfo from '../components/ProductInfo';
import FullImage from '../components/FullImage';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';


import Employee from '../../public/homepage1.png';

const HomePage = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      setPlaying(!playing);
      if (!playing || videoRef.current.ended) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleVideoEnded = () => {
    setPlaying(false);
  };

  return (
    <Layout>
      <div>
        <HeroSection />
        <Collections />

        {/* <FullImage imageUrl={Employee} alt="employee" /> */}
        <div className="relative overflow-hidden">
          <div className="gpt3__header-content section__padding-vid-home" style={{}}>
            <div className="gpt3__header-image">
              <Image src={Employee} alt="hey" className="object-cover w-full h-full" layout="fill" />
            </div>
          </div>
        </div>
        <ProductList />
        <div className='padding__mobile-video ulev__details-video section__padding-vid'>
          <div className="">
            <video
              // ref={videoRef}
              controls
              width="100%"
              height="600px"
              style={{ objectFit: 'cover' }}
              onEnded={handleVideoEnded}
              autoPlay
              muted
            >
              <source src="/annies_vid2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Our Story */}
        <div className="flex justify-center items-center px-4 sm:px-6 md:px-8 py-12 md:py-20">
          <div className="w-full max-w-4xl text-black">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6">Our Story</h1>
            <div className="space-y-4 font-poppins text-sm md:text-base leading-relaxed" style={{fontFamily: "Poppins-Regular"}}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <Link href="/our-story">
            <button className="bg-black text-white py-2 px-6 md:px-10 mt-8 text-sm md:text-base hover:bg-opacity-80 transition-colors duration-300" style={{fontFamily: "Poppins-Regular"}}>
              Read More
            </button>
          </Link>
          </div>
        </div>

        {/* CONNECT */}
        <div className="flex flex-col md:flex-row max-h-[400px] px-4 sm:px-16 pb-4 text-black">
          <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 border border-black">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-5xl font-semibold leading-tight md:leading-snug lg:leading-tight text-center md:text-left">
              Carefully <br/> Considered
            </h1>
          </div>
          <div className="w-full md:w-1/2 max-h-[400px] h-[254px] relative">
            <Image
              src="/conn.png"
              alt="Carefully Considered"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default HomePage;
