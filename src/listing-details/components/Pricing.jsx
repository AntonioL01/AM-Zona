import React from "react";

function Pricing({ price }) {
  return (
    <div className="bg-gray-300 p-6 rounded-xl">
      <h3 className="text-2xl font-semibold mb-3">Cijena vozila</h3>
      <div className="text-3xl text-black font-bold">
        {price ? `${Number(price).toLocaleString()} €` : "Nije dostupno"}
      </div>
    </div>
  );
}

export default Pricing;
