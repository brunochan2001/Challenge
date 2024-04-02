import { IProduct } from '@/interfaces/product';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

interface IProductForm {
  handleAddProduct: (data: IProduct) => void;
}

const ProductSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Muy corto!').required('¡Campo requerido!'),
  sku: Yup.string().max(50, 'Muy largo!').required('¡Campo requerido!')
});
export const ProductForm: React.FC<IProductForm> = ({ handleAddProduct }) => {
  const [id, setId] = useState(0);

  const productFormik = useFormik<IProduct>({
    initialValues: { name: '', sku: '', _id: '' },
    validationSchema: ProductSchema,
    onSubmit: async (values: IProduct) => {
      setId(id + 1);
      handleAddProduct({ ...values, _id: id.toString() });
    }
  });

  return (
    <form className="flex flex-col gap-2" onSubmit={productFormik.handleSubmit}>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="flex gap-1 flex-col flex-1">
          <label
            className="font-semibold text-xs leading-3	text-[#3F5061]"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            className="px-6 py-3 rounded-md w-full border"
            placeholder="Escribe el nombre"
            name="name"
            value={productFormik.values.name}
            onChange={productFormik.handleChange}
          />
          <p className="text-xs text-red-500">
            {productFormik.errors.name &&
              productFormik.touched.name &&
              productFormik.errors.name}
          </p>
        </div>
        <div className="flex gap-1 flex-col flex-1">
          <label
            className="font-semibold text-xs leading-3	text-[#3F5061]"
            htmlFor="sku"
          >
            Sku
          </label>
          <input
            className="px-6 py-3 rounded-md w-full border"
            placeholder="Escribe el sku"
            name="sku"
            value={productFormik.values.sku}
            onChange={productFormik.handleChange}
          />
          <p className="text-xs text-red-500">
            {productFormik.errors.sku &&
              productFormik.touched.sku &&
              productFormik.errors.sku}
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="px-4 h-10 lg:px-14 lg:h-14 rounded-md text-white font-bold bg-green-600"
          type="submit"
        >
          Agregar
        </button>
      </div>
    </form>
  );
};
