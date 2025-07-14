import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../../configs';
import { CarListing, CarImages } from '../../configs/schema';
import { and, eq, lte } from 'drizzle-orm';
import Service from '@/shared/Service';
import Header from '@/components/Header';
import Search from '@/components/Search';
import CarItem from '@/components/CarItem';
import InfoSection from '@/components/InfoSection';

function SearchByOptions() {
  const [searchParams] = useSearchParams();
  const [carList, setCarList] = useState([]);

  const condition = searchParams.get('cars');
  const make = searchParams.get('make');
  const price = searchParams.get('price');

  useEffect(() => {
    GetCarList();
  }, [condition, make, price]);

  const GetCarList = async () => {
    try {
      const whereConditions = [];

      if (condition) {
        whereConditions.push(eq(CarListing.condition, condition));
      }

      if (make) {
        whereConditions.push(eq(CarListing.make, make));
      }

      if (price) {
        const parsedPrice = Number(price);
        if (!isNaN(parsedPrice)) {
          whereConditions.push(lte(CarListing.price, parsedPrice));
        }
      }

      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(whereConditions.length ? and(...whereConditions) : undefined);

      const formatted = Service.FormatResult(result);
      setCarList(formatted);
    } catch (err) {
      console.error('Greška u dohvaćanju podataka:', err);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <div className="p-6 md:p-12 bg-black flex justify-center">
        <Search />
      </div>
      <div className="px-6 md:px-20 py-12 bg-neutral-100 flex-grow">
        <h2 className="font-bold text-3xl text-neutral-800 mb-8 text-center">
          Rezultati pretrage
        </h2>
        {carList.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {carList.map((item, index) => (
              <div
                key={index}
                className="rounded-xl shadow hover:shadow-lg transition duration-200 bg-white"
              >
                <CarItem car={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg mt-20">
            Nema rezultata koji odgovaraju odabranim kriterijima.
          </div>
        )}
      </div>
      <InfoSection />
    </div>
  );
}

export default SearchByOptions;
