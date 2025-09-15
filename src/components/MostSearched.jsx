import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import CarItem from './CarItem';
import Service from '@/shared/Service';

const MostSearched = () => {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    GetPopularCarList();
  }, []);

  const GetPopularCarList = async () => {
    try {
      const response = await fetch('/.netlify/functions/manage-listing?limit=10', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      if (response.ok && Array.isArray(result)) {
        const formatted = Service.FormatResult(result);
        setCarList(formatted);
      } else {
        console.error("Greška pri dohvaćanju popularnih vozila:", result.error);
      }
    } catch (error) {
      console.error("Greška pri dohvaćanju popularnih vozila:", error);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-white via-white to-neutral-50 py-16 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-neutral-800 tracking-tight">
            Najtraženija vozila
          </h2>
          <p className="text-gray-500 mt-2">
            Pogledaj vozila koja korisnici najviše pretražuju
          </p>
        </div>

        <div className="relative">
          <Carousel>
            <CarouselContent>
              {carList.map((car, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 lg:basis-1/3 flex justify-center"
                >
                  <CarItem car={car} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="-left-6 md:-left-10 z-10" />
            <CarouselNext className="-right-6 md:-right-10 z-10" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default MostSearched;