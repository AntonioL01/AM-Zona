import React from 'react';
import Search from './Search';

function Hero() {
  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] via-neutral-900 to-[#ffffff]">
      <div className="flex flex-col items-center p-8 py-12 gap-6 min-h-[600px] w-full text-white">
        <h2 className="text-lg text-center">
    
        </h2>
        <h2 className="text-[40px] md:text-[60px] font-bold text-center">
          Pronađi svoje idealno vozilo
        </h2>

        <Search />

        <img
          src="/automobili.png"
          alt="Automobil"
          className="mt-10 max-h-[300px] w-auto"
        />
      </div>
    </div>
  );
}

export default Hero;
