import { useEffect } from 'react';
import { useUser } from '@/api/graphql/resolvers/user';
import { setCookies } from '@/utils/cookies';
import { useRouter } from 'next/navigation';

interface ILogin {
  email: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();
  const [getUserData, { data, loading }] = useUser();

  useEffect(() => {
    if (!loading && data && data.accounts.length) {
      setCookies('user_challenge', JSON.stringify(data.accounts));
      router.push('/products');
    }
  }, [loading, data]);

  const handleLogin = async (data: ILogin) => {
    try {
      await getUserData({
        variables: { emails: data.email }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { handleLogin, loading };
};
