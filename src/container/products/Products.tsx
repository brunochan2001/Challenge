'use client';
import React, { useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { ProductoModal } from './productoModal/ProductoModal';
import { TableContainer } from './tableContainer/TableContainer';

interface IProducts {
  id: string;
}

export const Products: React.FC<IProducts> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reload, setReload] = useState(false);
  const accountId = id;

  const handleReload = (data: boolean) => {
    setReload(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row justify-between lg:items-center">
        <p className="text-xl lg:text-4xl text-[#004AC9] font-bold">
          Productos
        </p>
        <button
          className="px-4 h-10 lg:px-14 lg:h-14 rounded-md text-white font-bold bg-[#004AC9]"
          onClick={onOpen}
        >
          Crear producto
        </button>
      </div>
      <TableContainer accountId={accountId} reload={reload} />
      <ProductoModal
        accountId={accountId}
        isOpenProduct={isOpen}
        handleReload={handleReload}
        onCloseProduct={onClose}
      />
    </div>
  );
};
