import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useUser } from "@clerk/clerk-react";
import Service from "../shared/Service";
import Header from "../components/Header";
import InfoSection from "../components/InfoSection";
import { Separator } from "../components/ui/separator";

import DetailHeader from "./components/DetailHeader";
import ImageGallery from "./components/ImageGallery";
import Description from "./components/Description";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Specification from "./components/Specification";
import SellerInfo from "./components/SellerInfo";
import LoanCalculator from "./components/LoanCalculator";

function ListingDetails() {
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (id) {
      fetchCarDetail();
    }
  }, [id]);

  const fetchCarDetail = async () => {
    try {
      const res = await fetch("/.netlify/functions/get-listings");
      const data = await res.json();
      const formatted = Service.FormatResult(data);
      const listing = formatted.find(item => item.id === Number(id));
      setCarDetail(listing);
    } catch (err) {
      console.error("Greška prilikom dohvaćanja detalja vozila:", err);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <div className="px-4 md:px-20 py-10">
        {carDetail ? (
          <>
            <DetailHeader carDetail={carDetail} />
            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <ImageGallery images={carDetail?.images} />
                <Description description={carDetail?.listingDescription} />
                <Features features={carDetail?.features} />
                <LoanCalculator />
              </div>

              <div className="space-y-6">
                <Pricing price={carDetail?.price} />
                <Specification carDetail={carDetail} />
                <SellerInfo carDetail={carDetail} />
              </div>
            </div>
          </>
        ) : (
          <p>Učitavanje...</p>
        )}
      </div>

      <InfoSection />
    </div>
  );
}

export default ListingDetails;
