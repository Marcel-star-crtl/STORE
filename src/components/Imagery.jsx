"use client";

import React, { useState } from "react";

const Imagery = ({ productMedia }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    <div className="flex flex-col gap-3 max-w-[450px]">
      <img
        src={mainImage}
        width={500}
        height={500}
        alt="product"
        className="w-[100%] h-[100%] object-cover"
      />
    </div>
  );
};

export default Imagery;
