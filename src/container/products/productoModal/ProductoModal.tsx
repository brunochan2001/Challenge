import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { IProduct } from '@/interfaces/product';
import { TableProducts } from '@/components/table/tableProducts/TableProducts';
import { useCreateProduct } from '@/api/graphql/resolvers/products';
import { ProductForm } from './ProductForm';

interface IProductoModal {
  isOpenProduct: boolean;
  accountId: string;
  onCloseProduct: () => void;
  handleReload: (data: boolean) => void;
}

export const ProductoModal: React.FC<IProductoModal> = ({
  isOpenProduct,
  accountId,
  onCloseProduct,
  handleReload
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pageProduct, setPageProduct] = React.useState(1);
  const rowsPerPageProduct = 5;
  const pagesSubCategory = Math.ceil(products.length / rowsPerPageProduct);
  const [mutateCreateProduct] = useCreateProduct();

  useEffect(() => {
    if (!isOpenProduct) {
      setProducts([]);
      handleReload(false);
    }
  }, [isOpenProduct]);

  const handleChangepage = (page: number) => {
    if (page == 0 || page > pagesSubCategory) {
      return;
    }
    setPageProduct(page);
  };

  const handleAddProduct = (product: IProduct) => {
    setProducts([...products, { ...product, accountId }]);
  };

  const deleteProduct = (id: string) => {
    const productsFilter = products.filter(product => product._id !== id);
    setProducts(productsFilter);
  };

  const handleCreateProducts = async () => {
    try {
      const { data } = await mutateCreateProduct({
        variables: {
          products: products.map(({ _id, ...resto }) => resto)
        }
      });
      if (data && data.createProducts) {
        handleReload(true);
        onCloseProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isOpenProduct}
      placement="center"
      onClose={onCloseProduct}
      size="3xl"
      scrollBehavior="inside"
      classNames={{
        base: 'rounded-md p-[34px] gap-6 max-h-[300px] lg:max-h-full overflow-y-auto',
        header: 'p-0 justify-end',
        body: 'p-0 gap-4',
        footer: 'p-0 justify-end mt-4'
      }}
      hideCloseButton={true}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>
              <div className="flex justify-between w-full">
                <p>Crear Productos</p>
                <button onClick={onClose}>x</button>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <ProductForm handleAddProduct={handleAddProduct} />
                <TableProducts
                  page={pageProduct}
                  data={products}
                  rowsPerPage={rowsPerPageProduct}
                  deleteProduct={deleteProduct}
                  handleChangepage={handleChangepage}
                />
                <div className="flex flex-col gap-2 lg:flex-row lg:justify-end">
                  <button
                    type="button"
                    className="px-4 h-10 lg:px-14 lg:h-14 rounded-md text-white font-bold bg-[#004AC9]"
                    onClick={handleCreateProducts}
                  >
                    <p className="font-bold leading-4 text-[#fff]">Crear</p>
                  </button>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};