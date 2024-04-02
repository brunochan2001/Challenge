import { useLazyQuery, useMutation } from '@apollo/client';
import { getProductByFilter, postProduct } from '../queries/product';

export const useProduct = () => {
  return useLazyQuery(getProductByFilter, {
    context: { clientName: 'api' },
    fetchPolicy: 'network-only'
  });
};

export const useCreateProduct = () => {
  return useMutation(postProduct, {
    context: { clientName: 'api' }
  });
};
