"use client";

import { Product } from "@/interface/product/product";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import Star from "../common/Star";
import { useState } from "react";
import UpdateProduct from "./UpdateProduct";
import { NotificationProvider } from "@/context/NotificationContext";
import Swal from "sweetalert2";
import { useDeleteProduct } from "@/hook/product/product";
import { useRouter } from "next/navigation";

export default function ProductDetail({ product }: { product: Product }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mutateAsync } = useDeleteProduct(product.id);
  const router = useRouter();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          mutateAsync();
          router.push("/product");
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        }
      }
    });
  };

  return (
    <NotificationProvider>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <TabGroup className="flex flex-col-reverse">
              <TabPanels className="aspect-h-1 aspect-w-1 w-full">
                <TabPanel>
                  <img
                    alt={product.title}
                    src={product.image}
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </TabPanel>
              </TabPanels>
            </TabGroup>

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.category}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {product.title}
                </p>
              </div>

              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Star current={product?.rating?.rate ?? 0} />
                  </div>
                  <p className="sr-only">
                    {product?.rating?.rate} out of 5 stars
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  dangerouslySetInnerHTML={{
                    __html: product.description,
                  }}
                  className="space-y-6 text-base text-gray-700"
                />
              </div>

              <form className="mt-6">
                <div className="mt-10 flex">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    type="button"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-yellow-600 px-8 py-3 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Chỉnh sửa
                  </button>

                  <button
                    onClick={handleDelete}
                    type="button"
                    className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-red-400 hover:bg-gray-100 hover:text-red-500"
                  >
                    <TrashIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0"
                    />
                    <span className="sr-only">Xóa</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <UpdateProduct
            open={sidebarOpen}
            setOpen={setSidebarOpen}
            item={product}
          />
        </div>
      </div>
    </NotificationProvider>
  );
}
