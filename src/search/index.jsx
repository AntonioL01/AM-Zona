import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Service from '@/shared/Service';
import Header from '@/components/Header';
import Search from '@/components/Search';
import CarItem from '@/components/CarItem';
import InfoSection from '@/components/InfoSection';

function SearchByOptions() {
  const [searchParams] = useSearchParams();
  const [carList, setCarList] = useState([]);

  const category = searchParams.get('category');
  const condition = searchParams.get('condition');
  const make = searchParams.get('make');
  const price = searchParams.get('price');

  useEffect(() => {
    GetCarList();
  }, [category, condition, make, price]);

  const GetCarList = async () => {
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (condition) params.append('condition', condition);
      if (make) params.append('make', make);
      if (price) params.append('price', price);

      const response = await fetch(`/api/manage-listing?${params.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      if (response.ok && Array.isArray(result)) {
        const formatted = Service.FormatResult(result);
        setCarList(formatted);
      } else {
        console.error('Greška u dohvaćanju podataka:', result.error || result);
      }
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
              <div key={index} className="rounded-xl shadow hover:shadow-lg transition duration-200 bg-white">
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
