"use client"

import BreadCrumb from "../../../../components/bread-crumb/BreadCrumb"
import { ProductContext } from "../../../../context/ProductContext"
import { use, useContext, useEffect } from "react"
import ProductImage from "./_component/ProductImage"
import ProductInfo from "./_component/ProductInfo"
import SectionHeader from "../../../../components/section-header/SectionHeader"
import ProductCard from "../../../../components/productCard/ProductCard"

import { SkeletonCard } from "../../../../components/skeleton-card/SkeletonCard"

export default function ProductDetails({ params }) {
  const { id } = use(params)
  const { singleProduct, fetchSingleProduct } = useContext(ProductContext)
  const { products } = useContext(ProductContext)
  useEffect(() => {
    fetchSingleProduct(id)
  }, [id])
  if (!singleProduct) return <SkeletonCard />
  const similarCourses = products.filter((p) => p.category === singleProduct.category && p.id != singleProduct.id)
  return (
    <div className="container">
      <BreadCrumb product={singleProduct}/>
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductImage product={singleProduct}/>
        <ProductInfo product={singleProduct}/>
      </div>
      <div className="mt-28 pb-15">
        <div className="mb-10 text-center">
          <SectionHeader title={"similar courses"} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {similarCourses.map((product) => {
          return <ProductCard product={product} key={product.id}/>
        })}
        </div>
      </div>
    </div>
  )
}
