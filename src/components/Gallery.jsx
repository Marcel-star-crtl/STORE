"use client";

import React, { useState } from "react";

const Gallery = ({ productMedia }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    <div className="flex flex-col gap-3 max-w-[400px]">
      <img
        src={mainImage}
        width={500}
        height={600}
        alt="product"
        className="w-[100%] h-[100%] object-cover"
      />
      <div className="flex gap-2 overflow-auto tailwind-scrollbar-hide">
        {productMedia.map((image, index) => (
          <img
            key={index}
            src={image}
            height={200}
            width={200}
            alt="product"
            className={`w-20 h-20 object-cover cursor-pointer ${
              mainImage === image ? "border-2 border-black" : ""
            }`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
