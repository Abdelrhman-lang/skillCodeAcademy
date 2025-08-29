"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { UpdateCourse } from "../update-course/UpdateCourse";
import DeleteCourse from "../delete-course/DeleteCourse";
export default function ProductCard({ product, editCourse, deleteCourse }) {
  const path = usePathname();
  return (
    <Link
      href={path.includes("dashboard") ? "" : `/product-details/${product.id}`}
      className="group block bg-white shadow-md rounded-lg"
    >
      <div>
        <img
          src={product.imageUrl}
          alt="product-img"
          className="w-full h-[250] object-cover rounded-lg rounded-b-none"
        />
      </div>
      <div className="mt-3 flex justify-between text-sm p-2">
        <div>
          <h3 className=" font-semibold text-primary line-clamp-1">
            {product.title}
          </h3>
          <p className="mt-1.5 text-sm text-pretty text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>

        <p className="text-red-500 font-bold">${product.price}</p>
      </div>
      {path.includes("dashboard") ? (
        <div className="mt-5 flex gap-5">
          <UpdateCourse product={product} editCourse={editCourse} />
          <DeleteCourse product={product} deleteCourse={deleteCourse} />
        </div>
      ) : (
        ""
      )}
    </Link>
  );
}
