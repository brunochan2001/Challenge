import Image from 'next/image';
import LoginPortada from '@/assets/images/login.png';
import { FormLogin } from '@/container/formLogin/FormLogin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Home() {
  const cookie = cookies();
  const dataCookie = cookie.get('user_challenge');
  if (dataCookie && dataCookie.value) {
    return redirect('/products');
  }

  return (
    <div className="flex h-screen">
      <div className="hidden bg-white lg:flex items-center justify-center flex-1">
        <Image alt="login-portada" src={LoginPortada} priority />
      </div>
      <div className="flex flex-col justify-center items-center flex-1 bg-gray-200">
        <div className="flex flex-col gap-6 lg:gap-10 lg:w-[500px]">
          <Image
            alt="login-portada"
            src={LoginPortada}
            priority
            className="w-52 h-52 rounded-full lg:hidden mx-auto"
          />
          <p className="font-bold text-center lg:text-2xl">
            ¡Bienvenido! <br />
            Ingresa a tu cuenta
          </p>
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
