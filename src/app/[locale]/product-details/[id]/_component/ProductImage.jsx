import Image from "next/image";
import React from "react";

export default function ProductImage({ product }) {
  return (
    <div>
      <Image
        src={product.imageUrl}
        alt="product-img"
        width={650}
        height={650}
        className="rounded-lg object-contain"
      />
    </div>
  );
}
