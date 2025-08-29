"use client";
import { useState, createContext, useEffect } from "react";
import axiosInstance from "../lib/axios";
import axios from "axios";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [paginationProducts, setPaginationProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  //fetch all Products Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/fetch-products");
      if (res.status === 200) {
        setProducts(res.data);
      } else {
        throw new Error("Faild to fetch products");
      }
    } catch (err) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };
  // Fetch Single Product
  const fetchSingleProduct = async (id) => {
    try {
      const res = await axios.get(`/api/fetch-single-product?id=${id}`);
      if (res.status === 200) {
        setSingleProduct(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //fetch Pagination Products
  const fetchPaginationProducts = async () => {
    try {
      const res = await axiosInstance.get("/products?populate=*", {
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": 7,
        },
      });
      setPaginationProducts(res.data.data);
      setPageCount(res.data.meta.pagination.pageCount);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPaginationProducts();
  }, [page]);
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        selectedCategory,
        setSelectedCategory,
        singleProduct,
        fetchSingleProduct,
        paginationProducts,
        page,
        setPage,
        pageCount,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
