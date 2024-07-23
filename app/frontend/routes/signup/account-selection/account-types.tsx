import React from 'react';
import { Link } from 'react-router-dom';

const ACCOUNT_TYPES: { key: string; to: string; label: string }[] = [
  {
    key: 'account-type-cash',
    to: '/signup/create-user?type=cash',
    label: 'I want to open a cash account.',
  },
  {
    key: 'account-type-investing',
    to: '/signup/create-user?type=investing',
    label: 'I want to open an investing account.',
  },
];

export default function AccountTypes() {
  return (
    <>
      {ACCOUNT_TYPES.map(({ key, to, label }, i) => {
        return (
          <div key={key + '-div'}>
            <Link
              key={key}
              to={to}
              className="text-gray-500 block hover:bg-purple-50 transform-[background-color] duration-100 ease-in p-4 pl-2 rounded-2xl"
            >
              {label}
            </Link>
            {i != ACCOUNT_TYPES.length - 1 && <div key={key + '-separator'} className="bg-slate-200 h-px w-full" />}
          </div>
        );
      })}
    </>
  );
}
