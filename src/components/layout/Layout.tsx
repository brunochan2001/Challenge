import React from 'react';
import { Header } from './Header';

interface ILayout {
  children: React.ReactNode;
}

export const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1  pt-12 px-4 lg:px-10 bg-gray-200">
        <div className="flex flex-col max-w-screen-2xl mx-auto">{children}</div>
      </div>
    </div>
  );
};
