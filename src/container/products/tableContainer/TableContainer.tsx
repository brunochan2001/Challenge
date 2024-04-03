import React, { useEffect, useState } from 'react';
import { TableProducts } from '@/components/table/tableProducts/TableProducts';
import { useProducts } from '@/hooks/useProducts';
import { Input } from '@nextui-org/react';
import { useDebounce } from 'react-use';

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
  const { handleGetProducts, products, loading } = useProducts();
  const [filters, setFilter] = useState<IFilters>({
    page: 1,
    limit: 5,
    names: '',
    skus: '',
    _id: accountId
  });

  useEffect(() => {
    if (reload) {
      handleGetData(filters);
    }
  }, [reload]);

  useDebounce(
    () => {
      handleSearch();
    },
    200,
    [filters.names, filters.skus]
  );

  const handleGetData = async (data: IFilters) => {
    const updatedFilters = {
      ...data,
      names: data.names?.toLowerCase(),
      skus: data.skus
    };
    if (updatedFilters.skus?.trim() === '') {
      delete updatedFilters.skus;
    }
    if (updatedFilters.names?.trim() === '') {
      delete updatedFilters.names;
    }
    await handleGetProducts(updatedFilters);
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
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="flex gap-1 flex-col">
          <Input
            size="sm"
            type="text"
            label="Buscar por nombre"
            value={filters.names}
            onChange={e => setFilter({ ...filters, names: e.target.value })}
          />
        </div>
        <div className="flex gap-1 flex-col">
          <Input
            size="sm"
            type="text"
            label="Buscar por skus"
            value={filters.skus}
            onChange={e => setFilter({ ...filters, skus: e.target.value })}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg">
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
