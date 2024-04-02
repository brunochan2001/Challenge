import { Products } from '@/container/products/Products';
import { cookies } from 'next/headers';

export default function Home() {
  const cookie = cookies();
  const dataCookie = cookie.get('user_challenge');
  const user = JSON.parse(dataCookie ? dataCookie.value : '');

  return <Products id={user[0]._id} />;
}
