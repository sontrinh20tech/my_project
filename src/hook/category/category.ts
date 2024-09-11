import { api } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => await api.get<string[]>(`/products/categories`),
  });
};
