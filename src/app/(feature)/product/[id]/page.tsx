"use client";

import PageTitle from "@/components/common/PageTitle";
import { Suspense } from "react";
import { useGetProduct } from "@/hook/product/product";
import ProductDetail from "@/components/product/ProductDetail";

export default function Product({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetProduct(params.id);
  const pages = [
    { name: "Product", href: "/product", current: false },
    { name: "Product Detail", href: `/product/${params.id}`, current: true },
  ];

  return (
    <>
      <PageTitle title="Products Detail" />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <Suspense fallback={<div>Loading</div>}>
            {!isLoading && <ProductDetail product={data} />}
          </Suspense>
        </div>
      </div>
    </>
  );
}
