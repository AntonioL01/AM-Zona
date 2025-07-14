import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoMdCloseCircle } from 'react-icons/io';
import { supabase } from '../../../configs/supabaseClient';

function UploadImages({ triggleUploadImages, setLoader, carInfo, mode }) {
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [editCarImageList, setEditCarImageList] = useState([]);

  useEffect(() => {
    if (mode === 'edit') {
      setEditCarImageList([]);
      carInfo?.images?.forEach((image) => {
        setEditCarImageList((prev) => [...prev, image?.imageUrl]);
      });
    }
  }, [carInfo]);

  useEffect(() => {
    if (triggleUploadImages) {
      UploadImageToServer();
    }
  }, [triggleUploadImages]);

  const onFileSelected = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      setSelectedFileList((prev) => [...prev, file]);
    }
  };

  const onImageRemove = (image) => {
    const result = selectedFileList.filter((item) => item !== image);
    setSelectedFileList(result);
  };

  const onImageRemoveFromDB = async (image, index) => {
    try {
      await fetch(`/.netlify/functions/delete-car-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageId: carInfo?.images[index]?.id })
      });
      const imageList = editCarImageList.filter((item) => item !== image);
      setEditCarImageList(imageList);
    } catch (err) {
      console.error('Greška kod brisanja slike iz baze:', err);
    }
  };

  const UploadImageToServer = async () => {
    setLoader(true);

    if (selectedFileList.length === 0) {
      setLoader(false);
      return;
    }

    for (const file of selectedFileList) {
      const fileName = `${Date.now()}-${file.name}`;

      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('images')
        .upload(`car-marketplace/${fileName}`, file);

      if (uploadError) {
        console.error('Greška kod uploada:', uploadError.message);
        continue;
      }

      const { data: publicUrlData } = supabase
        .storage
        .from('images')
        .getPublicUrl(`car-marketplace/${fileName}`);

      const downloadUrl = publicUrlData?.publicUrl;

      if (downloadUrl && triggleUploadImages) {
        try {
          await fetch(`/.netlify/functions/save-car-image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageUrl: downloadUrl,
              carListingId: triggleUploadImages
            })
          });
        } catch (err) {
          console.error('Greška kod spremanja slike u bazu:', err);
        }
      }
    }

    setLoader(false);
  };

  return (
    <div>
      <h2 className='font-medium text-xl my-3'>Dodajte slike </h2>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
        {mode === 'edit' &&
          editCarImageList?.map((image, index) => (
            <div key={index} className='relative'>
              <IoMdCloseCircle
                className='absolute top-1 right-1 text-lg text-white cursor-pointer z-10'
                onClick={() => onImageRemoveFromDB(image, index)}
              />
              <img src={image} alt='car' className='w-full h-[130px] object-cover rounded-xl' />
            </div>
          ))}

        {selectedFileList.map((image, index) => (
          <div key={index} className='relative'>
            <IoMdCloseCircle
              className='absolute top-1 right-1 text-lg text-white cursor-pointer z-10'
              onClick={() => onImageRemove(image)}
            />
            <img src={URL.createObjectURL(image)} alt='preview' className='w-full h-[130px] object-cover rounded-xl' />
          </div>
        ))}

        <label htmlFor='upload-images'>
          <div className='border rounded-xl border-dotted border-primary bg-neutral-300 hover:bg-neutral-600 transition p-10 cursor-pointer text-center'>
            <h2 className='text-lg text-primary'>+</h2>
          </div>
        </label>

        <input type='file' multiple id='upload-images' onChange={onFileSelected} className='hidden' />
      </div>
    </div>
  );
}

export default UploadImages;
