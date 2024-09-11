import { useNotification } from "@/context/NotificationContext";
import { useGetCategories } from "@/hook/category/category";
import { useCreateProduct } from "@/hook/product/product";
import { Product } from "@/interface/product/product";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function CreateProduct({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
  const { mutateAsync } = useCreateProduct();
  const { data } = useGetCategories();
  const { setShowNoti, setNotiMessage } = useNotification();

  const [product, setProduct] = useState<Product>({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        category: data[0], // Gán category từ data sau khi useQuery hoàn tất
      }));
    }
  }, [data]);

  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="mt-16 pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                      Add Product
                    </DialogTitle>
                  </div>
                  <div className="relative flex-1 px-4 sm:px-6">
                    <div className="border-b border-gray-900/10 pb-12">
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Title
                          </label>
                          <div className="mt-2">
                            <input
                              id="first-name"
                              name="first-name"
                              type="text"
                              value={product.title}
                              onChange={(e) =>
                                setProduct({
                                  ...product,
                                  title: e.target.value,
                                })
                              }
                              autoComplete="given-name"
                              className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Price
                          </label>
                          <div className="mt-2">
                            <input
                              id="last-name"
                              name="last-name"
                              type="number"
                              value={product.price}
                              onChange={(e) =>
                                setProduct({
                                  ...product,
                                  price: parseFloat(e.target.value),
                                })
                              }
                              autoComplete="family-name"
                              className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Image
                          </label>
                          <div className="mt-2">
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                              <div className="text-center">
                                <PhotoIcon
                                  aria-hidden="true"
                                  className="mx-auto h-12 w-12 text-gray-300"
                                />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                  <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                  >
                                    <span>Upload a file</span>
                                    <input
                                      id="file-upload"
                                      name="file-upload"
                                      type="file"
                                      className="sr-only"
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Category
                          </label>
                          <div className="mt-2">
                            <select
                              onChange={(e) => {
                                setProduct({
                                  ...product,
                                  category: e.target.value,
                                });
                              }}
                              value={product.category}
                              id="country"
                              name="country"
                              autoComplete="country-name"
                              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              {data?.map((category: string) => (
                                <option value={category} key={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Description
                          </label>
                          <div className="mt-2">
                            <textarea
                              value={product.description}
                              onChange={(e) => {
                                setProduct({
                                  ...product,
                                  description: e.target.value,
                                });
                              }}
                              className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            ></textarea>
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <div className="flex justify-between">
                            <button
                              onClick={() =>
                                setProduct({
                                  title: "",
                                  description: "",
                                  price: 0,
                                  image: "",
                                  category: data?.[0],
                                })
                              }
                              className="text-center mx-2 max-w-xs items-center rounded-md border border-transparent bg-slate-500 px-6 py-3 text-base font-medium text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                              Reset
                            </button>
                            <button
                              onClick={() => {
                                try {
                                  mutateAsync(product);
                                  setOpen(false);
                                  setShowNoti(true);
                                  setNotiMessage(
                                    "Product created successfully"
                                  );
                                  setProduct({
                                    title: "",
                                    price: 0,
                                    description: "",
                                    category: data?.[0],
                                    image: "",
                                  });
                                } catch (error) {}
                              }}
                              className="mx-2 max-w-xs items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                              Create Product
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
