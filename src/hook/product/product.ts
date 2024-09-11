import { api } from "@/config/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Product, ProductParams } from "@/interface/product/product";

export const useGetProducts = (params?: ProductParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => await api.get<Product[]>(`/products`, { params }),
  });
};

export const useGetProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => await api.get<Product>(`/products/${id}`),
  });
};

export const useUpdateProduct = (id: number) => {
  return useMutation({
    mutationFn: async (product: Product) =>
      await api.put<Product>(`/products/${id}`, product),
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (product: Product) =>
      await api.post<Product>(`/products`, product),
  });
};

export const useDeleteProduct = (id: number) => {
  return useMutation({
    mutationFn: async () => await api.delete<Product>(`/products/${id}`),
  });
};
