"use client";
import { Input } from "../../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useContext, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import Spinner from "../../../components/ui/Spinner";
import { useRouter } from "next/navigation";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

export default function ExploreClient({
  title,
  placeholder,
  description,
  translate,
  locale,
}) {
  const { products, loading } = useContext(ProductContext);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage; // 0 , 6
  const endIndex = startIndex + itemsPerPage; // 6 , 12

  const filterdCourses = products.filter((course) =>
    course.title.toLowerCase().includes(input.toLowerCase())
  );
  const pagination = filterdCourses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filterdCourses.length / itemsPerPage);
  const router = useRouter();
  return (
    <section className="container py-12">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold mb-2 text-primary">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="max-w-md mx-auto mb-10">
        <Input
          placeholder={placeholder}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setPage(1);
          }}
        />
      </div>
      {loading ? (
        <div className="flex items-center justify-center mt-10">
          <Spinner />
          {/* <Loader /> */}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {pagination.map((course) => (
            <Card
              key={course.id}
              className="hover:shadow-lg transition-shadow duration-300 pt-0 cursor-pointer"
              onClick={() => {
                router.push(`/product-details/${course.id}`);
              }}
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="h-60 w-full object-cover rounded-lg rounded-b-none"
              />
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{course.title}</span>
                  <span className="text-red-500">${course.price}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {course.discription}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <main className="flex items-center justify-center mt-5">
        <div className="flex items-center gap-4">
          <button
            className="bg-white shadow-md rounded-full p-2 text-primary cursor-pointer disabled:text-gray-500"
            disabled={page === 1}
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            {locale === "en" ? <ArrowBigLeft /> : <ArrowBigRight />}
          </button>
          <p>
            {page} {translate} {totalPages}
          </p>
          <button
            className="bg-white shadow-md rounded-full p-2 text-primary cursor-pointer"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            {locale === "en" ? <ArrowBigRight /> : <ArrowBigLeft />}
          </button>
        </div>
      </main>
    </section>
  );
}
