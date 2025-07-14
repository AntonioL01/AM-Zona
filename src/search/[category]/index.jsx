import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../configs';
import { CarImages, CarListing } from '../../../configs/schema';
import { eq, desc } from 'drizzle-orm';
import Service from '@/shared/Service';
import CarItem from '@/components/CarItem';
import Header from '@/components/Header';
import InfoSection from '@/components/InfoSection';

function SearchByCategory() {
  const { category } = useParams();
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    if (category) {
      fetchCarsByCategory();
    }
  }, [category]);

  const fetchCarsByCategory = async () => {
    try {
      const result = await db
        .select()
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.category, category))
        .orderBy(desc(CarListing.id));

      const formatted = Service.FormatResult(result);
      setCarList(formatted);
    } catch (error) {
      console.error('Greška prilikom dohvaćanja vozila po kategoriji:', error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-black flex flex-col justify-between">
      <div>
        <Header />

        <div className="px-4 py-8 md:px-10 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 capitalize">Kategorija: {category}</h1>

          {carList.length === 0 ? (
            <p className="text-gray-400">Nema dostupnih oglasa za ovu kategoriju.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {carList.map((car, index) => (
                <CarItem key={index} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>

      <InfoSection />
    </div>
  );
}

export default SearchByCategory;
