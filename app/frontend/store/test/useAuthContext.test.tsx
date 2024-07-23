import React from 'react';
import { jest, test, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import AuthContextProvider from '../auth-context-provider';
import useAuthContext from '../useAuthContext';

const mockUseAuth = {
  user: null,
  handleCreateUser: jest.fn(),
  checkLoginStatus: jest.fn(),
  logout: jest.fn(),
};

jest.mock('../useAuth', () => ({
  useAuth: () => mockUseAuth,
}));

function TestComponent() {
  useAuthContext();
  return <></>;
}

describe('useAuthContext', () => {
  test('render', () => {
    render(
      <AuthContextProvider>
        <TestComponent />
      </AuthContextProvider>
    );
  });
});
