"use client";
import React, { useContext } from "react";
import ProductCard from "../productCard/ProductCard";
import { ProductContext } from "../../context/ProductContext";
import Spinner from "../ui/Spinner";

export default function ProductList() {
  const { products, loading } = useContext(ProductContext);
  const { selectedCategory } = useContext(ProductContext);
  const filterdProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);
  const limitProducts = filterdProducts.slice(0, 6);
  return (
    <section>
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {limitProducts.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })}
        </div>
      )}
    </section>
  );
}
