import { Products } from '@/container/products/Products';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Home() {
  const cookie = cookies();
  const dataCookie = cookie.get('user_challenge');
  let user;
  if (dataCookie && dataCookie.value) {
    user = JSON.parse(dataCookie.value);
  } else {
    return redirect('/');
  }
  return <Products id={user[0]._id} />;
}
