import React from "react";
import {
  FaCar,
  FaCheckCircle,
  FaIndustry,
  FaCarSide,
  FaCalendarAlt,
  FaRoad,
  FaGasPump,
  FaTachometerAlt,
  FaWrench,
  FaBolt,
  FaPalette,
  FaDoorClosed,
} from "react-icons/fa";

import { AiOutlineFieldNumber } from "react-icons/ai";
import { FaMoneyBill } from "react-icons/fa";
import { PiEngineFill } from "react-icons/pi";
import { BiCategoryAlt } from "react-icons/bi";
import { TbManualGearboxFilled } from "react-icons/tb";
import { MdLocalOffer } from "react-icons/md";

import data from "@/shared/carDetails.json";

const specs = data.carDetails
  .filter(
    (item) =>
      item.name !== "listingDescription" && item.name !== "listingTitle"
  )
  .slice(0, 16); 

const customIcons = {
  vin: AiOutlineFieldNumber,
  price: FaMoneyBill,
  engineSize: PiEngineFill,
  category: BiCategoryAlt,
  make: FaCar,
  transmission: TbManualGearboxFilled,
  offerType: MdLocalOffer,
};

const defaultIcons = {
  condition: FaCheckCircle,
  model: FaCarSide,
  year: FaCalendarAlt,
  driveType: FaRoad,
  fuelType: FaGasPump,
  mileage: FaTachometerAlt,
  power: FaBolt,
  color: FaPalette,
  door: FaDoorClosed,
};

const iconMap = { ...defaultIcons, ...customIcons };

function CarSpecification({ carDetail }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {specs.map((spec, index) => {
        const Icon = iconMap[spec.name];
        return (
          <div
            key={index}
            className="flex items-start gap-3 bg-gray-100 p-3 rounded-lg shadow-sm"
          >
            {Icon && <Icon className="text-primary w-5 h-5 mt-1" />}
            <div>
              <p className="text-sm text-gray-500">{spec.label}</p>
              <p className="font-medium text-gray-800 break-words">
                {carDetail?.[spec.name] || "N/A"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CarSpecification;
