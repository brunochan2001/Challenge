import { render, screen } from '@testing-library/react';
import { TableContainer } from '@/container/products/tableContainer/TableContainer';
import { MockedProvider } from '@apollo/client/testing';
import { mockProducts } from './__mocks__/Products';

it('Mostrar los productos del accountId', async () => {
  const accountId = '660462ce048bcbc00069df98';

  render(
    <MockedProvider mocks={[mockProducts]} addTypename={false}>
      <TableContainer accountId={accountId} reload={false} />
    </MockedProvider>
  );

  expect(await screen.findByText('atun')).toBeInTheDocument();
  expect(await screen.findByText('arroz')).toBeInTheDocument();
});
