'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUser } from '@/api/graphql/resolvers/user';
import { useRouter } from 'next/navigation';

interface ILogin {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('¡Correo inválido!').required('¡Campo requerido!'),
  password: Yup.string()
    .min(2, '¡Muy corto!')
    .max(50, 'Muy largo!')
    .required('¡Campo requerido!')
});

export const FormLogin = () => {
  const router = useRouter();
  const [getUserData] = useUser();

  const loginFormik = useFormik<ILogin>({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values: ILogin) => {
      try {
        const { data } = await getUserData({
          variables: { emails: values.email }
        });
        console.log('data', data);
        if (data && data.accounts && data.accounts.length) {
          router.push('/home');
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <form onSubmit={loginFormik.handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <input
          className="px-6 py-3 rounded-md w-full"
          placeholder="Correo electrónico"
          name="email"
          value={loginFormik.values.email}
          onChange={loginFormik.handleChange}
        />
        <p className="text-xs text-red-500">
          {loginFormik.errors.email &&
            loginFormik.touched.email &&
            loginFormik.errors.email}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <input
          className="px-6 py-3 rounded-md"
          placeholder="Contraseña"
          name="password"
          value={loginFormik.values.password}
          onChange={loginFormik.handleChange}
        />
        <p className="text-xs text-red-500">
          {loginFormik.errors.password &&
            loginFormik.touched.password &&
            loginFormik.errors.password}
        </p>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-[#004AC9] px-6 py-3 lg:px-8 lg:py-4 rounded-md"
          type="submit"
        >
          <p className=" text-white font-bold">Iniciar Sesión</p>
        </button>
      </div>
    </form>
  );
};
