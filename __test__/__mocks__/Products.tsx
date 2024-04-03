import { getProductByFilter } from '@/api/graphql/queries/product';
import { MockedResponse } from '@apollo/client/testing';

export const Products = {
  data: {
    products: [
      { name: 'atun', sku: 'ph-1', _id: 'a1' },
      { name: 'arroz', sku: 'ph-2', _id: 'a2' },
      { name: 'aceite', sku: 'ph-3', _id: 'a3' },
      { name: 'yogurt', sku: 'ph-4', _id: 'a4' }
    ]
  }
};

export const mockProducts: MockedResponse = {
  delay: 30,
  request: {
    query: getProductByFilter
  },
  variableMatcher: variables => true,
  result: Products
};
