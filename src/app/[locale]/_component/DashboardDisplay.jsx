"use client";

import Spinner from "../../../components/ui/Spinner";
import Paginaion from "../../../components/pagination/Paginaion";
import ProductCard from "../../../components/productCard/ProductCard";

import { ProductContext } from "../../../context/ProductContext";
import { useContext } from "react";
export default function DashboardDisplay({ editCourse, deleteCourse }) {
  const { paginationProducts, page, setPage, pageCount, loading } =
    useContext(ProductContext);

  return (
    <section>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <main>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {paginationProducts.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    editCourse={editCourse}
                    deleteCourse={deleteCourse}
                  />
                );
              })}
            </div>
          </main>
          <Paginaion page={page} setPage={setPage} pageCount={pageCount} />
        </>
      )}
    </section>
  );
}
