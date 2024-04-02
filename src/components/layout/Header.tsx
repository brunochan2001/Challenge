'use client';
import React from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { deleteCookie } from '@/lib/cookies';

const UserIcon = () => {
  return (
    <svg
      data-name="Iconly/Curved/Profile"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
    >
      <g
        fill="#fff"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
      >
        <path
          data-name="Stroke 1"
          d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
        />
        <path
          data-name="Stroke 3"
          d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
        />
      </g>
    </svg>
  );
};

export const Header = () => {
  const router = useRouter();
  return (
    <div className="bg-[#004AC9] px-10">
      <div className="max-w-screen-2xl mx-auto py-5">
        <div className="flex justify-end">
          <Dropdown>
            <DropdownTrigger>
              <Button
                className=""
                variant="bordered"
                startContent={<UserIcon />}
              >
                <p className="text-white">Bruno Chan</p>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="close"
                onClick={() => {
                  deleteCookie('user_challenge');
                  router.push('/');
                }}
              >
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
