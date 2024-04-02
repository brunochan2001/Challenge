import { gql } from '@apollo/client';

export const getUserById = gql`
  query getUserById($emails: [String]) {
    accounts(filter: { emails: $emails }) {
      name
      email
      _id
      __typename
    }
  }
`;
