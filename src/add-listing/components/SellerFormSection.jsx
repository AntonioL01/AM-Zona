import React from "react";

const counties = [
  "Bjelovarsko-bilogorska", "Brodsko-posavska", "Dubrovačko-neretvanska", "Istarska", "Karlovačka",
  "Koprivničko-križevačka", "Krapinsko-zagorska", "Ličko-senjska", "Međimurska", "Osječko-baranjska",
  "Požeško-slavonska", "Primorsko-goranska", "Sisačko-moslavačka", "Splitsko-dalmatinska", "Šibensko-kninska",
  "Varaždinska", "Virovitičko-podravska", "Vukovarsko-srijemska", "Zadarska", "Zagrebačka", "Grad Zagreb"
];

function SellerFormSection({ formData, handleInputChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block mb-1 text-gray-800 font-medium">
          Županija <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.county || ""}
          onChange={(e) => handleInputChange("county", e.target.value)}
          required
          className="form-input w-full bg-zinc-200 text-gray-900 rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Odaberi županiju</option>
          {counties.map((county, index) => (
            <option key={index} value={county}>
              {county}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-gray-800 font-medium">
          Grad <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.city || ""}
          onChange={(e) => handleInputChange("city", e.target.value)}
          required
          className="form-input w-full bg-zinc-200 text-gray-900 rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Unesite grad"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block mb-1 text-gray-800 font-medium">
          Broj telefona <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={formData.phoneNumber || ""}
          onChange={(e) =>
            handleInputChange("phoneNumber", e.target.value.replace(/\D/g, ""))
          }
          required
          className="form-input w-full bg-zinc-200 text-gray-900 rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Unesite broj telefona"
        />
      </div>
    </div>
  );
}

export default SellerFormSection;
