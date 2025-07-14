import Header from '@/components/Header'; 
import React, { useEffect, useState } from 'react';
import carDetails from '../shared/carDetails.json';
import InputField from './components/InputField';
import DropdownField from './components/DropdownField';
import TextAreaField from './components/TextAreaField';
import { Separator } from '@/components/ui/separator';
import features from '../shared/features.json';
import { Button } from '@/components/ui/button';
import IconField from './components/IconField';
import UploadImages from './components/UploadImages';
import { toast } from 'sonner';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import SellerFormSection from './components/SellerFormSection';

function AddListing() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mode = searchParams.get('mode');
  const recordId = searchParams.get('id');

  const [formData, setFormData] = useState({});
  const [featuresData, setFeaturesData] = useState({});
  const [newListingId, setNewListingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [carInfo, setCarInfo] = useState(null);

  const selectedCategory = formData?.category;

  const allowedFieldsByCategory = {
    Plovila: ["listingTitle", "price", "category", "condition", "year", "color", "offerType", "listingDescription"],
    Motocikl: [
      "listingTitle", "price", "category", "condition", "year", "color", "offerType", "listingDescription",
      "enginePower", "mileage", "fuelType", "transmission", "vinNumber"
    ],
    Kamion: [
      "listingTitle", "price", "category", "condition", "year", "make", "model", "color", "offerType", "listingDescription",
      "enginePower", "engineSize", "mileage", "fuelType", "transmission", "vinNumber", "driveType", "doors"
    ]
  };

  const filteredDetails = carDetails.carDetails.filter((item) => {
    if (selectedCategory === "Plovila") return allowedFieldsByCategory.Plovila.includes(item.name);
    if (selectedCategory === "Motocikl") return allowedFieldsByCategory.Motocikl.includes(item.name);
    if (selectedCategory === "Kamion") return allowedFieldsByCategory.Kamion.includes(item.name);
    return true;
  });

  useEffect(() => {
    if (mode === 'edit' && recordId) {
      GetListingDetail();
    }
  }, [mode, recordId]);

  useEffect(() => {
    if (carInfo) {
      setFormData(carInfo);
    }
  }, [carInfo]);

  useEffect(() => {
    if (mode !== 'edit') {
      setFormData((prev) => ({
        ...prev,
        county: "",
        city: "",
        phoneNumber: "",
      }));
    }
  }, [mode]);

  const GetListingDetail = async () => {
    try {
      const res = await fetch(`/.netlify/functions/get-listing?id=${recordId}`);
      const data = await res.json();
      setCarInfo(data);
      setFeaturesData(data.features || {});
    } catch (e) {
      toast.error("Greška pri dohvaćanju oglasa.");
      console.error(e);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeatureChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const fullData = {
      ...formData,
      features: featuresData,
      createdBy: user?.id,
      userName: user?.fullName,
      userImageUrl: user?.imageUrl,
      postedOn: moment().format('DD/MM/yyyy'),
    };

    try {
      const res = await fetch(`/.netlify/functions/${mode === 'edit' ? 'update-listing' : 'create-listing'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: fullData, id: recordId }),
      });

      if (!res.ok) throw new Error('Network response not ok');
      const result = await res.json();

      if (mode === 'edit') {
        toast.success('Oglas ažuriran.');
        navigate('/profile');
      } else {
        setNewListingId(result.id);
        toast.success('Oglas uspješno spremljen. Učitavanje slika...');
      }
    } catch (e) {
      console.error('Error:', e);
      toast.error('Greška prilikom spremanja oglasa.');
    }

    setIsUploading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-300 text-zinc-900">
      <Header />
      <div className="px-4 md:px-20 py-10 max-w-6xl mx-auto">
        <div className="bg-zinc-100 p-6 md:p-10 rounded-2xl shadow-xl">
          <h2 className="font-bold text-4xl mb-8 text-zinc-900">
            {mode === 'edit' ? 'Uredi oglas' : 'Dodaj novi oglas'}
          </h2>
          <form onSubmit={onSubmit} className="space-y-10">
            {/* ostali dijelovi forme ostaju isti */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddListing;
