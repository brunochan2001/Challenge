'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLogin } from '@/hooks/useLogin';
import { Button, Input } from '@nextui-org/react';
import { EyeShow } from '@/assets/icons/EyeShow';
import { EyeHidden } from '@/assets/icons/EyeHidden';

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
  const [isVisible, setIsVisible] = React.useState(false);
  const { handleLogin, loading } = useLogin();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const loginFormik = useFormik<ILogin>({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values: ILogin) => {
      await handleLogin(values);
    }
  });

  return (
    <form onSubmit={loginFormik.handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Input
          size="sm"
          type="text"
          label="Correo electrónico"
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
        <Input
          size="sm"
          type={isVisible ? 'text' : 'password'}
          label="Contraseña"
          name="password"
          value={loginFormik.values.password}
          onChange={loginFormik.handleChange}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeShow className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeHidden className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
        <p className="text-xs text-red-500">
          {loginFormik.errors.password &&
            loginFormik.touched.password &&
            loginFormik.errors.password}
        </p>
      </div>
      <p className="text-center text-sm text-gray-600 underline font-semibold">
        Olvide mi contraseña
      </p>
      <p className="text-center text-sm text-gray-600">
        ¿No tienes tu contraseña?{' '}
        <span className="underline font-semibold">Crear una nueva cuenta</span>
      </p>
      <div className="flex justify-center">
        <Button
          size="md"
          className="bg-[#004AC9]"
          type="submit"
          disabled={loading}
        >
          <p className="text-white font-semibold">Iniciar Sesión</p>
        </Button>
      </div>
    </form>
  );
};
