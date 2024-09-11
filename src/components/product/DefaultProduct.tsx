import { Product } from "@/interface/product/product";
import Link from "next/link";
import Star from "../common/Star";

export default function DefaultProduct({ product }: { product: Product }) {
  return (
    <>
      <div className="group relative border-x border-y border-gray-200 p-4 sm:p-6">
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
          <img
            alt={product.title}
            src={product.image}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="pb-4 pt-10 text-center">
          <h3 className="text-sm font-medium text-gray-900">
            <Link href={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          <div className="mt-3 flex flex-col items-center">
            <p className="sr-only">{product?.rating?.rate} out of 5 stars</p>
            <div className="flex items-center">
              <Star
                current={product?.rating?.rate ?? 0}
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {product?.rating?.count} reviews
            </p>
          </div>
          <p className="mt-4 text-base font-medium text-gray-900">
            ${product.price}
          </p>
        </div>
      </div>
    </>
  );
}
