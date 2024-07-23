import React from 'react';
import { expect, jest, test, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import AuthContextProvider from '../auth-context-provider';

const mockUseAuth = {
  user: null,
  handleCreateUser: jest.fn(),
  checkLoginStatus: jest.fn(),
  logout: jest.fn(),
};

jest.mock('../useAuth', () => ({
  useAuth: () => mockUseAuth,
}));

describe('AuthProvider', () => {
  test('checkLoginStatus should be called when component mounts', () => {
    render(<AuthContextProvider />);

    expect(mockUseAuth.checkLoginStatus).toHaveBeenCalled();
  });
});
