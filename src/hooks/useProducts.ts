import { useProduct } from '@/api/graphql/resolvers/products';
import { IProduct } from '@/interfaces/product';
import { useEffect, useState } from 'react';

interface IFilters {
  page: number;
  limit: number;
  _id: string;
  names?: string;
  skus?: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [getProductData, { data, loading }] = useProduct();

  useEffect(() => {
    if (!loading && data) {
      setProducts(data.products);
    }
  }, [loading, data]);

  const handleGetProducts = async (filters: IFilters) => {
    await getProductData({
      variables: filters
    });
  };

  return { products, loading, handleGetProducts };
};
