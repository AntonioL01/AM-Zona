import React from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";
import { GiGearStickPattern } from 'react-icons/gi';
import { FaGasPump } from 'react-icons/fa';

function DetailHeader({ carDetail }) {
  return (
    <div className="mb-6">
      {carDetail?.listingTitle ? (
        <div>
          <h2 className="font-bold text-3xl text-black mb-1">
            {carDetail?.listingTitle}
          </h2>
          <p className="text-sm text-gray-600">{carDetail?.tagline}</p>

          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex gap-2 items-center bg-gray-300 rounded-full p-2 px-3">
              <FaCalendarAlt  className="h-5 w-5 text-black" />
              <span className="text-black text-sm">
                {carDetail?.year || 'Godina'}
              </span>
            </div>
            <div className="flex gap-2 items-center bg-gray-200 rounded-full p-2 px-3">
              <IoIosSpeedometer className="h-5 w-5 text-black" />
              <span className="text-black text-sm">
                {carDetail?.mileage
                  ? `${carDetail?.mileage.toLocaleString()} km`
                  : 'Kilometraža'}
              </span>
            </div>
            <div className="flex gap-2 items-center bg-gray-200 rounded-full p-2 px-3">
              <GiGearStickPattern className="h-5 w-5 text-black" />
              <span className="text-black text-sm">
                {carDetail?.transmission || 'Prijenos'}
              </span>
            </div>
            <div className="flex gap-2 items-center bg-gray-200 rounded-full p-2 px-3">
              <FaGasPump className="h-5 w-5 text-black" />
              <span className="text-black text-sm">
                {carDetail?.fuelType || 'Gorivo'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[100px] rounded-xl bg-slate-200 animate-pulse" />
      )}
    </div>
  );
}

export default DetailHeader;
