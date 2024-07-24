import { describe, expect, jest, test } from '@jest/globals';
import useCreateAccount from '../useCreateAccount';
import { renderHook } from '@testing-library/react';

const mockUseAuthContext = {
  user: null,
  handleCreateUser: jest.fn(),
  logout: jest.fn(),
};

jest.mock('app/frontend/store/useAuthContext', () => ({
  useAuthContext: () => mockUseAuthContext,
}));

describe('useCreateAccount', () => {
  test('render with default values', async () => {
    const { result } = renderHook(() => useCreateAccount());
    expect(result.current.user).toBeNull();
    expect(result.current.score).toBe(-1);
    expect(result.current.errorMessages).toHaveLength(0);
  });
});
