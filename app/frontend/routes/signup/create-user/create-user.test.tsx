import { describe, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CreateUser } from './create-user';

describe('CreateUser', () => {
  test('render', () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <CreateUser />
      }
    ])
    render(<RouterProvider router={router}/>);
    screen.getByText('First name');
    screen.getByText('Last name');
  });
});
