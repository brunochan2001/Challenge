import React from 'react';
import {
  Button,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react';
import { IProduct } from '@/interfaces/product';

interface ITableProducts {
  page: number;
  rowsPerPage: number;
  data: IProduct[];
  loading?: boolean;
  handleChangepage: (page: number) => void;
  handleChangeLimit?: (limit: number) => void;
  deleteProduct?: (id: string) => void;
}

export const TableProducts: React.FC<ITableProducts> = ({
  handleChangepage,
  deleteProduct,
  handleChangeLimit,
  rowsPerPage,
  data,
  loading,
  page
}) => {
  const itemsProducts: IProduct[] = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    if (data.length <= rowsPerPage) {
      return data;
    }

    return data.slice(start, end);
  }, [page, data]);

  return (
    <>
      <div style={{ height: `${40 + rowsPerPage * 36}px` }}>
        <Table
          aria-label="table-products"
          classNames={{
            wrapper: 'rounded-md p-0 shadow-none',
            tbody: `${itemsProducts.length > 0 ? `` : `h-[${rowsPerPage * 36}px]`}`,
            tr: 'hover:bg-gray-100'
          }}
        >
          <TableHeader className="w-full">
            <TableColumn key="name" className="w-1/3">
              Nombre
            </TableColumn>
            <TableColumn key="sku" className="w-1/3">
              Sku
            </TableColumn>
            <TableColumn key="actions" className="w-1/3">
              Acciones
            </TableColumn>
          </TableHeader>
          <TableBody
            items={itemsProducts}
            isLoading={loading}
            loadingContent={<Spinner />}
            emptyContent={!loading && 'No hay productos'}
          >
            {itemsProducts.map(product => (
              <TableRow key={product._id}>
                <TableCell className="whitespace-nowrap">
                  {product.name}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {product.sku}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      className="bg-red-400 px-2 rounded-md"
                      onClick={() => {
                        if (deleteProduct) {
                          deleteProduct(product._id);
                        }
                      }}
                    >
                      <p className="text-white">Eliminar</p>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between flex-row-reverse w-full gap-2">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-gray-200"
            onPress={() => handleChangepage(page - 1)}
          >
            {'<'}
          </Button>
          <p className="font-bold">{page}</p>
          <Button
            size="sm"
            className="bg-gray-200"
            onPress={() => handleChangepage(page + 1)}
          >
            {'>'}
          </Button>
        </div>
        {handleChangeLimit && (
          <Select
            size="sm"
            className="max-w-40"
            defaultSelectedKeys={['5']}
            aria-label="limit"
            classNames={{
              trigger:
                'min-h-unit-9 bg-white border rounded-md data-[hover=true]:bg-[#fff] shadow-none'
            }}
            listboxProps={{
              itemClasses: {
                base: [
                  'data-[selectable=true]:focus:bg-slate-100',
                  'rounded-md'
                ]
              }
            }}
            popoverProps={{
              classNames: {
                content: 'rounded-md'
              }
            }}
            onChange={e => handleChangeLimit(Number(e.target.value))}
          >
            <SelectItem key={5} value={5}>
              5 / página
            </SelectItem>
            <SelectItem key={10} value={10}>
              10 / página
            </SelectItem>
            <SelectItem key={15} value={15}>
              15 / página
            </SelectItem>
          </Select>
        )}
      </div>
    </>
  );
};
