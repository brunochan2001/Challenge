import { useQuery } from '@apollo/client';
import { queryProduct } from '../queries/product';

export const useProduct = () => {
  return useQuery(queryProduct, {
    context: { clientName: 'api' }
  });
};
