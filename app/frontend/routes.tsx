import React from 'react';
import { RouteObject } from 'react-router-dom';
import { Root } from './routes/root/root';
import ErrorBoundary from './routes/error/error-boundary';
import GettingStarted from './routes/root/getting-started';
import { CreateAccount } from './routes/create-account/create-account';
import ProtectedRoute from './routes/protected-route';
import { AccountSelection } from './routes/signup/account-selection/account-selection';
import { CreateUser } from './routes/signup/create-user/create-user';
import { Deposit } from './routes/signup/deposit/deposit';
import { JointAccess } from './routes/signup/joint-access/joint-access';
import { StockRestrictions } from './routes/signup/stock-restrictions/stock-restrictions';

export const routes: RouteObject = {
  path: '/',
  element: <Root />,
  errorElement: <ErrorBoundary />,
  children: [
    {
      index: true,
      element: <GettingStarted />,
    },
    {
      path: 'create-account',
      element: <CreateAccount />,
    },
    {
      path: 'signup',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'account-selection',
          element: <AccountSelection />,
        },
        {
          path: 'create-user',
          element: <CreateUser />,
        },
        {
          path: 'joint-access',
          element: <JointAccess />,
        },
        {
          path: 'stock-restrictions',
          element: <StockRestrictions />,
        },
        {
          path: 'deposit',
          element: <Deposit />,
        },
      ],
    },
  ],
};
