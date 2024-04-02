import { gql } from '@apollo/client';

export const getProductByFilter = gql`
  query getProductByFilter(
    $page: Int
    $limit: Int
    $_id: [String]
    $names: [String]
    $skus: [String]
  ) {
    products(
      limit: $limit
      page: $page
      filter: { accountIds: $_id, names: $names, skus: $skus }
    ) {
      name
      sku
      _id
    }
  }
`;

export const postProduct = gql`
  mutation createProducts($products: [ProductInput!]!) {
    createProducts(input: { products: $products }) {
      name
      _id
      sku
    }
  }
`;
