import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ApolloWrapper from '@/api/graphql/apollo';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Proyect',
  description: 'Proyect'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-center" />

        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
