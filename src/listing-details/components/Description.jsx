import React from "react";

function Description({ description }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-3">Opis vozila</h3>
      <p className="text-gray-700 leading-relaxed">
        {description ? description : "Nema dostupnog opisa za ovo vozilo."}
      </p>
    </div>
  );
}

export default Description;
