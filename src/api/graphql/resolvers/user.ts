import { useLazyQuery } from '@apollo/client';
import { getUserById } from '../queries/user';

export const useUser = () => {
  return useLazyQuery(getUserById, {
    context: { clientName: 'api' },
    fetchPolicy: 'network-only'
  });
};
