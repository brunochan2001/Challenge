import React, { useEffect, useState } from 'react';
import { IProduct } from '@/interfaces/product';
import { useProduct } from '@/api/graphql/resolvers/products';
import { TableProducts } from '@/components/table/tableProducts/TableProducts';

interface IFilters {
  page: number;
  limit: number;
  _id: string;
  names?: string;
  skus?: string;
}

interface ITableContainer {
  accountId: string;
  reload: boolean;
}

export const TableContainer: React.FC<ITableContainer> = ({
  accountId,
  reload
}) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filters, setFilter] = useState<IFilters>({
    page: 1,
    limit: 5,
    names: '',
    skus: '',
    _id: accountId
  });
  const [getProductData] = useProduct();

  useEffect(() => {
    handleGetData(filters);
  }, []);

  useEffect(() => {
    if (reload) {
      handleGetData(filters);
    }
  }, [reload]);

  const handleGetData = async (data: IFilters) => {
    const updatedFilters = {
      ...data,
      names: data.names?.toLowerCase(),
      skus: data.skus?.toLowerCase()
    };
    if (updatedFilters.skus?.trim() === '') {
      delete updatedFilters.skus;
    }
    if (updatedFilters.names?.trim() === '') {
      delete updatedFilters.names;
    }
    setLoading(true);
    try {
      const response = await getProductData({
        variables: updatedFilters
      });
      if (response.data && response.data.products) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (page: number) => {
    if (
      page === 0 ||
      (products.length < filters.limit && page > filters.page)
    ) {
      return;
    }
    const data = { ...filters, page };
    setFilter(data);
    handleGetData(data);
  };

  const handleChangeLimit = (limit: number) => {
    const data = { ...filters, limit, page: 1 };
    setFilter(data);
    handleGetData(data);
  };

  const handleSearch = () => {
    const data = { ...filters, page: 1 };
    setFilter(data);
    handleGetData(data);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="flex gap-1 flex-col">
            <input
              className="px-6 py-3 rounded-md w-full border"
              placeholder="Buscar por nombre"
              name="name"
              value={filters.names}
              onChange={e => setFilter({ ...filters, names: e.target.value })}
            />
          </div>
          <div className="flex gap-1 flex-col">
            <input
              className="px-6 py-3 rounded-md w-full border"
              placeholder="Buscar por sku"
              name="sku"
              value={filters.skus}
              onChange={e => setFilter({ ...filters, skus: e.target.value })}
            />
          </div>
        </div>
        <button
          className="px-4 h-10 lg:px-14 lg:h-14 rounded-md text-white font-bold bg-[#004AC9]"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
      <div className="flex flex-col gap-4 p-4 bg-white rounded-md">
        <TableProducts
          data={products}
          handleChangepage={handleChangePage}
          handleChangeLimit={handleChangeLimit}
          page={filters.page}
          rowsPerPage={filters.limit}
          loading={loading}
        />
      </div>
    </>
  );
};
