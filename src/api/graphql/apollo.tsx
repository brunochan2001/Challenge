'use client';
import React from 'react';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  Operation
} from '@apollo/client';

import config from '@/config/app';

type LinkConditionPair = {
  condition: (operation: Operation) => boolean;
  link: HttpLink;
};

const apiLink = new HttpLink({
  uri: `${config.apiUrl}/graphql`
});

const getApolloLink = (pairs: LinkConditionPair[]): ApolloLink => {
  if (pairs.length == 1) return pairs[0].link;
  const [firstPair, ...restPairs] = pairs;
  return ApolloLink.split(
    firstPair.condition,
    firstPair.link,
    getApolloLink(restPairs)
  );
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: getApolloLink([
    {
      condition: (operation: Operation) =>
        operation.getContext().clientName === 'api',
      link: apiLink
    },
    { condition: () => true, link: apiLink }
  ])
});

const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
