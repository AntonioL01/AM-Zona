import React from "react";
import allFeatures from "@/shared/features.json";

function Features({ features }) {
  if (!features || typeof features !== "object") {
    return (
      <div>
        <h3 className="font-bold text-xl mb-2">Dodatna oprema</h3>
        <p className="text-gray-500">Nema informacija o dodatnoj opremi.</p>
      </div>
    );
  }

  const selectedFeatures = allFeatures.features.filter(f => features[f.name]);

  return (
    <div>
      <h3 className="font-bold text-xl mb-2">Dodatna oprema</h3>
      {selectedFeatures.length > 0 ? (
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {selectedFeatures.map((item, index) => (
            <li key={index}>{item.label}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nema informacija o dodatnoj opremi.</p>
      )}
    </div>
  );
}

export default Features;
