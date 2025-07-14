import React from "react";
import { FaCity } from "react-icons/fa";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function SellerInfo({ carDetail }) {
  const { county, city, phoneNumber, createdBy } = carDetail;
  const navigate = useNavigate();

  const handleMessageClick = () => {
    if (createdBy) {
      navigate(`/inbox?recipient=${encodeURIComponent(createdBy)}`);
    }
  };

  return (
    <div className="p-6 rounded-xl border shadow-md mt-7 space-y-4">
      <h2 className="font-medium text-2xl mb-4">Informacije o prodavaču</h2>
      <div className="text-gray-700 space-y-2">
        {county && (
          <p className="flex items-center gap-2">
            <FaLocationDot className="text-black" />
            Županija: <strong>{county}</strong>
          </p>
        )}
        {city && (
          <p className="flex items-center gap-2">
            <FaCity className="text-black" />
            Grad: <strong>{city}</strong>
          </p>
        )}
        {phoneNumber && (
          <p className="flex items-center gap-2">
            <FaPhone className="text-black" />
            Telefon: <strong>{phoneNumber}</strong>
          </p>
        )}
      </div>

      {createdBy && (
        <button
          onClick={handleMessageClick}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-xl mt-4 text-lg shadow-md transition"
        >
          💬 Pošalji poruku prodavaču
        </button>
      )}
    </div>
  );
}

export default SellerInfo;
