import React from 'react';
import { Separator } from './ui/separator';
import { FaGasPump, FaRoad, FaMapMarkerAlt } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { MdOpenInNew } from "react-icons/md";
import { Link } from 'react-router-dom';

function CarItem({ car }) {
  const firstImage = car?.images?.[0]?.imageUrl || '/placeholder.jpg';

  return (
    <Link to={`/listing-details/${car?.id}`}>
      <div className="rounded-xl bg-white border hover:shadow-md cursor-pointer relative w-full">
        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full z-10">
          Novo
        </span>

        <img
          src={firstImage}
          alt={car?.listingTitle || 'Vozilo'}
          className="rounded-t-xl h-[180px] w-full object-cover"
        />

        <div className="p-4">
          <h2 className="font-bold text-black text-lg mb-2 truncate">
            {car?.listingTitle || 'Naziv vozila'}
          </h2>

          <Separator />

          <div className="grid grid-cols-3 text-center text-sm text-gray-700 my-3">
            <div className="flex flex-col items-center">
              <FaRoad className="mb-1 text-gray-700" />
              <p>{car?.mileage || '-'} km</p>
            </div>
            <div className="flex flex-col items-center">
              <FaGasPump className="mb-1 text-gray-700" />
              <p>{car?.fuelType || '-'}</p>
            </div>
            <div className="flex flex-col items-center">
              <GiGearStickPattern className="mb-1 text-gray-700" />
              <p>{car?.transmission || '-'}</p>
            </div>
          </div>

          <div className="flex justify-center text-sm text-gray-700 mb-3">
            <div className="flex flex-col items-center">
              <FaMapMarkerAlt className="mb-1 text-gray-700" />
              <p>{car?.city || '-'}, {car?.county || '-'}</p>
            </div>
          </div>

          <Separator className="my-2" />

          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-xl text-black">
              {parseFloat(car?.price || 0).toFixed(2)} €
            </span>
            <span className="text-blue-700 text-sm flex gap-1 items-center">
              Detalji <MdOpenInNew />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CarItem;
