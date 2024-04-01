import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface ILayout {
  children: React.ReactNode;
}

export const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      {children}
    </div>
  );
};
