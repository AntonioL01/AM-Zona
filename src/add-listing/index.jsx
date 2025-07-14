import Header from '@/components/Header'; 
import React, { useEffect, useState } from 'react';
import carDetails from '../shared/carDetails.json';
import InputField from './components/InputField';
import DropdownField from './components/DropdownField';
import TextAreaField from './components/TextAreaField';
import { Separator } from '@/components/ui/separator';
import features from '../shared/features.json';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import SellerFormSection from './components/SellerFormSection';
import UploadImages from './components/UploadImages';
import IconField from './components/IconField';
import { toast } from 'sonner';

const categories = ["Automobil", "Motocikl", "Kamion", "Plovila"];

function AddListing() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mode = searchParams.get('mode');
  const recordId = searchParams.get('id');

  const [formData, setFormData] = useState({});
  const [featuresData, setFeaturesData] = useState({});
  const [isUploading, setIsUploading] = useState(false);

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
    try {
      toast.success('Oglas spremljen.');
      navigate('/profile');
    } catch (err) {
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

          {!selectedCategory && (
            <div className="mb-8">
              <label className="block mb-2 font-medium">Odaberi kategoriju</label>
              <select
                value={formData.category || ""}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="p-2 border rounded w-full"
              >
                <option value="">Odaberi...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}

          {selectedCategory && (
            <form onSubmit={onSubmit} className="space-y-10">
              <div>
                <h2 className="font-medium text-xl mb-6 text-zinc-800">
                  Detalji {selectedCategory.toLowerCase()}
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

              {!["Plovila", "Motocikl", "Kamion"].includes(selectedCategory) && (
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
              )}

              <Separator className="bg-zinc-300" />
              <UploadImages setLoader={setIsUploading} />
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
          )}
        </div>
      </div>
    </div>
  );
}

export default AddListing;
