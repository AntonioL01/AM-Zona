import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

function ImageGallery({ images }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const imageUrls = images?.map((img) => img.imageUrl) || [];

  if (!images || images.length === 0) {
    return <p className="text-gray-500">Nema dostupnih slika.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {imageUrls.map((url, idx) => (
          <div
            key={idx}
            className="w-full h-64 overflow-hidden rounded-lg border shadow-sm cursor-pointer"
            onClick={() => {
              setPhotoIndex(idx);
              setIsOpen(true);
            }}
          >
            <img
              src={url}
              alt={`Slika ${idx + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="eager"
            />
          </div>
        ))}
      </div>

      <div style={{ display: "none" }}>
        {imageUrls.map((url, idx) => (
          <img key={`preload-${idx}`} src={url} alt={`Preload ${idx}`} />
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={imageUrls[photoIndex]}
          nextSrc={imageUrls[(photoIndex + 1) % imageUrls.length]}
          prevSrc={imageUrls[(photoIndex + imageUrls.length - 1) % imageUrls.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + imageUrls.length - 1) % imageUrls.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % imageUrls.length)
          }
          imageTitle={`Slika ${photoIndex + 1} od ${imageUrls.length}`}
        />
      )}
    </>
  );
}

export default ImageGallery;
