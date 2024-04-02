'use server';
import { cookies } from 'next/headers';

export const setCookies = (name: string, value: string) => {
  const cookieStore = cookies();
  cookieStore.set(name, value, { secure: false });
};

export const deleteCookie = (name: string) => {
  const cookieStore = cookies();
  cookieStore.delete(name);
};
