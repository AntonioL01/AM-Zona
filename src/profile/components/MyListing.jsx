import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { db } from './../../../configs';
import { CarImages, CarListing } from './../../../configs/schema';
import { desc, eq } from 'drizzle-orm';
import Service from '@/shared/Service';
import CarItem from '@/components/CarItem';
import { Button } from '@/components/ui/button';
import { FaTrashAlt } from "react-icons/fa";
import { toast } from 'sonner';

function MyListing() {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    user && GetUserCarListing();
  }, [user]);

  const GetUserCarListing = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.createdBy, user?.id))
      .orderBy(desc(CarListing.id));

    const resp = Service.FormatResult(result);
    setCarList(resp);
  };

  const deleteListing = async (listingId) => {
    try {
      await db.delete(CarImages).where(eq(CarImages.carListingId, listingId));
      await db.delete(CarListing).where(eq(CarListing.id, listingId));
      setCarList(prev => prev.filter(car => car.id !== listingId));
      toast.success("Oglas uspješno obrisan.");
    } catch (e) {
      console.error("Greška pri brisanju oglasa:", e);
      toast.error("Brisanje oglasa nije uspjelo.");
    }
  };

  return (
    <div className="mt-6 bg-zinc-200 min-h-screen text-zinc-900 px-6 md:px-10 py-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-4xl text-zinc-900">Moji oglasi</h2>
        <Link to={'/add-listing'}>
          <Button className="bg-blue-950 hover:bg-blue-900 text-white">
            + Dodaj novi oglas
          </Button>
        </Link>
      </div>

      {/* Separator */}
      <div className="border-b border-zinc-400 mb-6"></div>

      {carList.length === 0 ? (
        <p className="text-center text-zinc-600">Nemate dodanih oglasa.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {carList.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-100 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 p-2 border border-zinc-300"
            >
              <CarItem car={item} />
              <div className="p-2 bg-zinc-200 rounded-lg flex justify-between gap-3 mt-2">
                <Link to={`/add-listing?mode=edit&id=${item?.id}`} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-blue-950 text-blue-950 bg-white hover:bg-blue-950 hover:text-white"
                  >
                    Uredi
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="bg-red-700 hover:bg-red-800 text-white"
                  onClick={() => deleteListing(item?.id)}
                >
                  <FaTrashAlt />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListing;
