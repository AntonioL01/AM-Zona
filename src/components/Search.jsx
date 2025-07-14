import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from './ui/separator';
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Data from '@/shared/Data';

function Search() {
  const [cars, setCars] = useState();
  const [make, setMake] = useState();
  const [price, setPrice] = useState();

  return (
    <div className="p-3 md:p-5 bg-white text-black rounded-md md:rounded-full 
    flex flex-col md:flex-row items-center w-full md:w-[60%] shadow-md gap-4 md:gap-6">

      <div className="flex flex-1 items-center gap-4">
        <Select onValueChange={(value) => setCars(value)}>
          <SelectTrigger className="flex-1 text-black bg-white outline-none border-none shadow-none text-lg">
            <SelectValue placeholder="Vrsta vozila" />
          </SelectTrigger>
          <SelectContent className="text-black bg-white">
            <SelectItem value="Novo">Novo</SelectItem>
            <SelectItem value="Rabljeno">Rabljeno</SelectItem>
            <SelectItem value="Karambolirano">Karambolirano</SelectItem>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="hidden md:block h-8" />

        <Select onValueChange={(value) => setMake(value)}>
          <SelectTrigger className="flex-1 text-black bg-white outline-none border-none shadow-none text-lg">
            <SelectValue placeholder="Marka vozila" />
          </SelectTrigger>
          <SelectContent className="text-black bg-white max-h-[200px] overflow-y-auto">
            {Data.CarMakes.map((maker, index) => (
              <SelectItem key={index} value={maker.name}>{maker.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="hidden md:block h-8" />

        <Select onValueChange={(value) => setPrice(value)}>
          <SelectTrigger className="flex-1 text-black bg-white outline-none border-none shadow-none text-lg">
            <SelectValue placeholder="Cijena do" />
          </SelectTrigger>
          <SelectContent className="text-black bg-white">
            {Data.Pricing.map((price, index) => (
              <SelectItem key={index} value={price.amount}>{price.amount} €</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Link
        to={`/search?cars=${cars || ''}&make=${make || ''}&price=${price || ''}`}
        className="flex items-center justify-center p-3 rounded-full bg-blue-800 hover:scale-105 transition"
      >
        <IoSearch className="text-2xl text-white" />
      </Link>
    </div>
  );
}

export default Search;
