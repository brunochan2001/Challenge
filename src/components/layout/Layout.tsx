import React from 'react';
import { Header } from './Header';
import { cookies } from 'next/headers';

interface ILayout {
  children: React.ReactNode;
}

export const Layout: React.FC<ILayout> = ({ children }) => {
  const cookie = cookies();
  const dataCookie = cookie.get('user_challenge');
  const user = JSON.parse(dataCookie ? dataCookie.value : '');

  return (
    <div className="flex flex-col min-h-screen">
      <Header email={user[0].email} />
      <div className="flex-1  pt-12 px-4 lg:px-10 bg-gray-200">
        <div className="flex flex-col max-w-screen-2xl mx-auto">{children}</div>
      </div>
    </div>
  );
};
