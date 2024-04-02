import { gql } from '@apollo/client';

export const queryProduct = gql`
  query {
    products {
      name
    }
  }
`;
