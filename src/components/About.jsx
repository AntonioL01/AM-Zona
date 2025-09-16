import React from 'react';

const About = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-full max-w-lg mx-4 p-8 rounded-xl shadow-2xl bg-white text-gray-800">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors duration-200"
          aria-label="Zatvori"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="mb-6 text-3xl font-extrabold text-gray-900 text-center border-b-2 border-blue-500 pb-2">
          O aplikaciji Auto Moto Zona
        </h2>

        <div className="space-y-5 text-base leading-relaxed">
          <p className="text-gray-700">
            Ova aplikacija, kreirana kao završni rad, predstavlja modernu platformu za kupoprodaju vozila.
            Razvijena je s ciljem pružanja intuitivnog i sigurnog okruženja za korisnike.
          </p>
          
          <div className="bg-blue-100 p-4 rounded-lg shadow-inner">
            <p className="flex items-center text-blue-800">
              <span className="font-semibold w-24">Autor:</span>
              <span className="ml-2">Antonio Lipovac</span>
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="flex items-center text-gray-700">
              <span className="font-semibold w-24">Ustanova:</span>
              <span className="ml-2">Sveučilište Jurja Dobrile u Puli</span>
            </p>
            <p className="flex items-center text-gray-700 mt-1">
              <span className="font-semibold w-24"></span> 
              <span className="ml-2">(Fakultet informatike)</span>
            </p>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg shadow-inner">
            <p className="flex items-center text-blue-800">
              <span className="font-semibold w-24">Mentor:</span>
              <span className="ml-2">prof. dr. sc. Tihomir Orehovački</span>
            </p>
          </div>

          <p className="text-gray-600 italic text-center text-sm pt-4 border-t border-gray-200">
            Hvala na pažnji!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;