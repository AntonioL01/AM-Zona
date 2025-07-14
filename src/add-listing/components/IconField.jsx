import React from 'react';
import {
  FaClipboardList,
  FaTag,
  FaDollarSign,
  FaMoneyBillAlt,
  FaCar,
  FaCheckCircle,
  FaChargingStation,
  FaIndustry,
  FaCarSide,
  FaCalendarAlt,
  FaRoad,
  FaCogs,
  FaGasPump,
  FaTachometerAlt,
  FaWrench,
  FaCircle,
  FaPalette,
  FaDoorClosed,
  FaTags,
  FaFileAlt,
} from 'react-icons/fa';
import { ImPower } from 'react-icons/im';
import { MdConfirmationNumber } from 'react-icons/md';

const iconMap = {
  FaClipboardList: <FaClipboardList />,
  FaTag: <FaTag />,
  FaDollarSign: <FaDollarSign />,
  FaMoneyBillAlt: <FaMoneyBillAlt />,
  FaCar: <FaCar />,
  FaCheckCircle: <FaCheckCircle />,
  FaChargingStation: <FaChargingStation />,
  FaIndustry: <FaIndustry />,
  FaCarSide: <FaCarSide />,
  FaCalendarAlt: <FaCalendarAlt />,
  FaRoad: <FaRoad />,
  FaCogs: <FaCogs />,
  FaGasPump: <FaGasPump />,
  FaTachometerAlt: <FaTachometerAlt />,
  FaWrench: <FaWrench />,
  FaCircle: <FaCircle />,
  FaPalette: <FaPalette />,
  FaDoorClosed: <FaDoorClosed />,
  FaTags: <FaTags />,
  FaFileAlt: <FaFileAlt />,
  ImPower: <ImPower />,
  MdConfirmationNumber: <MdConfirmationNumber />,
};

function IconField({ icon }) {
  return (
    <div
      className="text-primary text-zinc-800 p-1 text-lg flex items-center justify-center"
      title={icon}
    >
      {iconMap[icon] || null}
    </div>
  );
}

export default IconField;
