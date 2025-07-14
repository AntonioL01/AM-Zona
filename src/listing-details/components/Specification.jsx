import React from 'react';

function CarSpecification({ carDetail }) {
  const renderSpec = (label, value) => {
    if (!value || value === 'N/A') return null; // Sakrij ako je prazno ili N/A
    return (
      <div className="flex justify-between border-b py-1">
        <span className="text-gray-600">{label}:</span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {renderSpec('Marka', carDetail.make)}
      {renderSpec('Model', carDetail.model)}
      {renderSpec('Godina', carDetail.year)}
      {renderSpec('Boja', carDetail.color)}
      {renderSpec('Vrsta goriva', carDetail.fuelType)}
      {renderSpec('Kilometraža', carDetail.mileage)}
      {renderSpec('Vrsta prijenosa', carDetail.transmission)}
      {renderSpec('Snaga', carDetail.power)}
      {renderSpec('Pogon', carDetail.driveType)}
      {renderSpec('Vrata', carDetail.door)}
      {renderSpec('Veličina motora', carDetail.engineSize)}
      {renderSpec('VIN', carDetail.vin)}
      {renderSpec('Stanje', carDetail.condition)}
      {renderSpec('Tip ponude', carDetail.offerType)}
    </div>
  );
}

export default function Specification({ carDetail }) {
  return (
    <div className='p-10 rounded-xl border shadow-md mt-7'>
      <h2 className='font-medium text-2xl mb-4'>Specifikacije</h2>
      {carDetail ? (
        <CarSpecification carDetail={carDetail} />
      ) : (
        <div className='w-full h-[500px] rounded-xl bg-slate-200 animate-pulse'></div>
      )}
    </div>
  );
}
