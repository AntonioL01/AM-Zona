import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Service from '@/shared/Service';
import CarItem from '@/components/CarItem';
import Header from '@/components/Header';
import InfoSection from '@/components/InfoSection';

function SearchByCategory() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [carList, setCarList] = useState([]);

  const selectedCategory = searchParams.get('category');
  const selectedCondition = searchParams.get('condition');
  const selectedMake = searchParams.get('make');
  const selectedPrice = searchParams.get('price');

  useEffect(() => {
    fetchCars();
  }, [searchParams]);

  const fetchCars = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (selectedCategory) queryParams.append('category', selectedCategory);
      if (selectedCondition) queryParams.append('condition', selectedCondition);
      if (selectedMake) queryParams.append('make', selectedMake);
      if (selectedPrice) queryParams.append('price', selectedPrice);

      const response = await fetch(`/api/manage-listing?${queryParams.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (response.ok && Array.isArray(result)) {
        const formatted = Service.FormatResult(result);
        setCarList(formatted);
      } else {
        console.error('Greška prilikom dohvaćanja vozila po kategoriji:', result.error || result);
      }
    } catch (error) {
      console.error('Greška prilikom dohvaćanja vozila po kategoriji:', error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-black flex flex-col justify-between">
      <div>
        <Header />
        <div className="px-4 py-8 md:px-10 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 capitalize">Rezultati pretrage</h1>
          {carList.length === 0 ? (
            <p className="text-gray-400">Nema dostupnih oglasa za ove kriterije.</p>
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
