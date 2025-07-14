import React from "react";
import { Link } from "react-router-dom";

function InfoSection() {
  return (
    <footer className="bg-zinc-900 text-zinc-100 py-16 mt-32">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        <div className="space-y-4">
          <h2 className="font-bold text-lg text-white">O nama</h2>
          <p className="text-sm text-zinc-300 leading-relaxed text-justify">
            Auto Moto Zona je moderna hrvatska platforma za kupnju i prodaju automobila. Olakšavamo pretragu, usporedbu i komunikaciju između prodavatelja i kupaca — brzo, jednostavno i pouzdano.
          </p>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="font-bold text-lg text-white">Navigacija</h2>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>
              <Link to="/" className="hover:text-blue-800 hover:underline transition duration-150">
                Početna
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-blue-800 hover:underline transition duration-150">
                Pretraga
              </Link>
            </li>
            <li>
              <Link to="/add-listing" className="hover:text-blue-800 hover:underline transition duration-150">
                Dodaj oglas
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold text-lg text-white">Kontakt</h2>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>
              Email:{" "}
              <a href="mailto:info@amzona.hr" className="hover:text-blue-800 hover:underline">
                info@amzona.hr
              </a>
            </li>
            <li>
              Telefon:{" "}
              <a href="tel:+385911234567" className="hover:text-blue-800 hover:underline">
                +385 91 123 4567
              </a>
            </li>
            <li>Lokacija: Zagreb, Hrvatska</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-zinc-500 mt-12 border-t border-zinc-800 pt-6">
        © {new Date().getFullYear()} Auto Moto Zona. Sva prava pridržana.
      </div>
    </footer>
  );
}

export default InfoSection;
