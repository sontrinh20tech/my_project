"use client";

import PageTitle from "@/components/common/PageTitle";
import DefaultProduct from "@/components/product/DefaultProduct";
import { useGetProducts } from "@/hook/product/product";
import { Suspense, useState } from "react";
import ProductLoading from "./loading";
import CreateProduct from "@/components/product/CreateProduct";
import { NotificationProvider } from "@/context/NotificationContext";

export default function Product() {
  const { data } = useGetProducts();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <>
      <NotificationProvider>
        <PageTitle title="Products" />
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="max-w-xs items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Add product
          </button>
        </div>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
            <Suspense fallback={<ProductLoading />}>
              <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                {data?.map((product) => (
                  <DefaultProduct key={product.id} product={product} />
                ))}
              </div>
            </Suspense>
          </div>
        </div>
        <div className="mt-10">
          <CreateProduct open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>
      </NotificationProvider>
    </>
  );
}
