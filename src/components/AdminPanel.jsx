import React, { useEffect, useState } from 'react';
import Header from './Header';
import InfoSection from './InfoSection';
import CarItem from './CarItem';
import Service from '@/shared/Service';
import { Button } from '@/components/ui/button';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'sonner';

const AdminPanel = () => {
    const [allCarList, setAllCarList] = useState([]);

    useEffect(() => {
        fetchAllListings();
    }, []);

    const fetchAllListings = async () => {
        try {
            const response = await fetch('/.netlify/functions/manage-listing?all=true', {
                method: 'GET',
            });
            const result = await response.json();

            if (response.ok) {
                const formatted = Service.FormatResult(result);
                setAllCarList(formatted);
            } else {
                toast.error('Greška pri dohvaćanju svih oglasa.');
                console.error('Greška pri dohvaćanju svih oglasa:', result.error);
            }
        } catch (error) {
            toast.error('Mrežna greška pri dohvaćanju oglasa.');
            console.error('Mrežna greška:', error);
        }
    };

    const deleteListing = async (listingId) => {
        if (!window.confirm('Jeste li sigurni da želite obrisati ovaj oglas?')) return;

        try {
            const response = await fetch('/.netlify/functions/manage-listing', {
                method: 'DELETE',
                body: JSON.stringify({ listingId }),
            });

            if (response.ok) {
                setAllCarList((prev) => prev.filter((car) => car.id !== listingId));
                toast.success('Oglas uspješno obrisan.');
            } else {
                toast.error('Brisanje oglasa nije uspjelo.');
            }
        } catch (e) {
            console.error('Greška pri brisanju oglasa:', e);
            toast.error('Brisanje oglasa nije uspjelo.');
        }
    };

    return (
        <div className="min-h-screen bg-zinc-200 text-zinc-900 flex flex-col">
            <Header />
            <div className="px-6 md:px-10 py-6 max-w-6xl mx-auto w-full flex-grow">
                <h2 className="font-bold text-4xl mb-6 text-zinc-900">Admin Panel - Svi oglasi</h2>
                <div className="border-b border-zinc-400 mb-6"></div>

                {allCarList.length === 0 ? (
                    <p className="text-center text-zinc-600">Nema dostupnih oglasa.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {allCarList.map((item) => (
                            <div key={item.id} className="bg-zinc-100 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 p-2 border border-zinc-300">
                                <CarItem car={item} />
                                <div className="p-2 bg-zinc-200 rounded-lg flex justify-between gap-3 mt-2">
                                    <Button
                                        variant="destructive"
                                        className="w-full bg-red-700 hover:bg-red-800 text-white"
                                        onClick={() => deleteListing(item.id)}
                                    >
                                        <FaTrashAlt className="mr-2" /> Obriši oglas
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <InfoSection />
        </div>
    );
};

export default AdminPanel;
