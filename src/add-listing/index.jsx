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
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import SellerFormSection from './components/SellerFormSection';

function AddListing() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [featuresData, setFeaturesData] = useState({});
  const [newListingId, setNewListingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const selectedCategory = formData?.category || '';

  const allowedFieldsByCategory = {
    Plovila: ['listingTitle', 'price', 'category', 'condition', 'year', 'color', 'offerType', 'listingDescription'],
    Motocikl: ['listingTitle', 'price', 'category', 'condition', 'year', 'make', 'model', 'color', 'offerType', 'listingDescription', 'enginePower', 'mileage', 'fuelType', 'transmission', 'vin'],
    Kamion: ['listingTitle', 'price', 'category', 'condition', 'year', 'make', 'model', 'color', 'offerType', 'listingDescription', 'enginePower', 'engineSize', 'mileage', 'fuelType', 'transmission', 'vin', 'driveType', 'door'],
  };

  const filteredDetails = carDetails.carDetails.filter((item) => {
    if (!selectedCategory) return true;
    if (selectedCategory === "Plovila") return allowedFieldsByCategory.Plovila.includes(item.name);
    if (selectedCategory === "Motocikl") return allowedFieldsByCategory.Motocikl.includes(item.name);
    if (selectedCategory === "Kamion") return allowedFieldsByCategory.Kamion.includes(item.name);
    return true;
  });

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (name, value) => {
    setFeaturesData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const payload = {
      ...formData,
      features: featuresData,
      createdBy: user?.id,
      userName: user?.fullName,
      userImageUrl: user?.imageUrl,
      postedOn: moment().format('DD/MM/yyyy'),
    };

    try {
      const res = await fetch('/.netlify/functions/save-car-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success && data.id) {
        setNewListingId(data.id);
        toast.success('Oglas spremljen. Učitavanje slika...');
      } else {
        toast.error('Greška kod spremanja oglasa.');
      }
    } catch (err) {
      console.error(err);
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
            Dodaj novi oglas
          </h2>
          <form onSubmit={onSubmit} className="space-y-10">
            <div>
              <h2 className="font-medium text-xl mb-6 text-zinc-800">
                Detalji vozila
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredDetails.map((item, index) => (
                  <div key={index}>
                    <label className="text-sm flex gap-2 items-center mb-1 text-zinc-700">
                      <IconField icon={item.icon} />
                      {item.label}
                      {item.required && <span className="text-red-500">*</span>}
                    </label>
                    {item.fieldType === 'text' || item.fieldType === 'number' ? (
                      <InputField item={item} handleInputChange={handleInputChange} carInfo={formData} />
                    ) : item.fieldType === 'dropdown' ? (
                      <DropdownField item={item} handleInputChange={handleInputChange} carInfo={formData} />
                    ) : item.fieldType === 'textarea' ? (
                      <TextAreaField item={item} handleInputChange={handleInputChange} carInfo={formData} />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <SellerFormSection formData={formData} handleInputChange={handleInputChange} />
            <Separator className="bg-zinc-300" />

            <div>
              <h2 className="font-medium text-xl mb-6 text-zinc-800">Dodatna oprema</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {features.features.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center text-zinc-700">
                    <input
                      type="checkbox"
                      id={item.name}
                      onChange={(e) => handleFeatureChange(item.name, e.target.checked)}
                      checked={featuresData?.[item.name] || false}
                      className="accent-blue-800"
                    />
                    <label htmlFor={item.name}>{item.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-zinc-300" />

            <UploadImages
              triggleUploadImages={newListingId}
              setLoader={setIsUploading}
              mode="add"
              carInfo={formData}
            />

            <div className="text-right">
              <Button
                type="submit"
                disabled={isUploading}
                className="bg-blue-950 hover:bg-blue-900 text-white"
              >
                {isUploading ? 'Spremanje...' : 'Spremi oglas'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddListing;
