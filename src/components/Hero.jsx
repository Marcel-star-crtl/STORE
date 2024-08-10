import React from 'react';
import NavbarHome from '../components/HomeNavbar';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          priority
          className="w-full h-full"
        />
      </div>
      {/* <div className="absolute inset-0 z-10">
        <NavbarHome />
      </div> */}
      {/* <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">Welcome to Annie's</h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8">Discover our latest collection</p>
          <button className="bg-white text-black px-6 py-2 rounded-full text-lg md:text-xl hover:bg-opacity-80 transition-colors duration-300">
            Shop Now
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default HeroSection;