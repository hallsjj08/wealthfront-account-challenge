import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/root/root.tsx';
import { AccountSelection } from './routes/signup/account-selection/account-selection.tsx';
import { CreateUser } from './routes/signup/create-user/create-user.tsx';
import { Deposit } from './routes/signup/deposit/deposit.tsx';
import { JointAccess } from './routes/signup/joint-access/joint-access.tsx';
import { StockRestrictions } from './routes/signup/stock-restrictions/stock-restrictions.tsx';
import { CreateAccount } from './routes/create-account/create-account.tsx';
import ProtectedRoute from './routes/protected-route.tsx';
import GettingStarted from './routes/root/getting-started.tsx';
import ErrorBoundary from './routes/error-boundary.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorBoundary/>,
    children: [
      {
        index: true,
        element: <GettingStarted />
      },
      {
        path: 'create-account',
        element: <CreateAccount />,
      },
      {
        path: 'signup',
        element: <ProtectedRoute/>,
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
        ]
      },
    ]
  },
]);

export function Router() {
  return (
    <main className="h-screen w-screen">
      <div className="h-full w-full max-w-[1200px] my-0 mx-auto">
        <RouterProvider router={router} />
      </div>
    </main>
  );
}
