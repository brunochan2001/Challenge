import { useEffect } from 'react';
import { useUser } from '@/api/graphql/resolvers/user';
import { setCookies } from '@/utils/cookies';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ILogin {
  email: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();
  const [getUserData, { data, loading, error }] = useUser();

  useEffect(() => {
    if (!loading && data) {
      if (data.accounts.length) {
        setCookies('user_challenge', JSON.stringify(data.accounts));
        router.push('/products');
      } else {
        toast.error('No existe usuario!', { position: 'top-right' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);

  const handleLogin = async (data: ILogin) => {
    await getUserData({
      variables: { emails: data.email }
    });
  };
  return { handleLogin, loading };
};
