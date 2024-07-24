import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { act } from 'react-dom/test-utils';
import { afterEach } from 'node:test';
import { User, UserValidationError } from '../user.type';

describe('useAuth', () => {
  let originalFetch: typeof global.fetch | undefined;

  beforeAll(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    (global.fetch as jest.Mock).mockClear();
    (global.fetch as jest.Mock).mockReset();
  });

  afterAll(() => {
    if (originalFetch) global.fetch = originalFetch;
  });

  test('handleCreateUser, success', async () => {
    const mockUser: User = { id: 1, username: 'mock username', password: 'mock password' };
    global.fetch = jest.fn<typeof global.fetch>(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user: { ...mockUser }, logged_in: true }),
      } as Response)
    );

    const { result, rerender } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
    const errors = await act(async () => await result.current.handleCreateUser(mockUser.username, mockUser.password));
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/create-account', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { username: mockUser.username, password: mockUser.password } }),
    });
    rerender();
    expect(result.current.user).toMatchObject({ ...mockUser });
    expect(errors).toHaveLength(0);
  });

  test('handleCreateUser, handle validation errors', async () => {
    const mockUser: User = { id: 1, username: 'mock username', password: 'mock password' };
    const mockErrors: UserValidationError[] = [
      { type: 'mock type 1', field: 'mock field 1', message: 'mock message 1' },
      { type: 'mock type 2', field: 'mock field 2', message: 'mock message 2' },
      { type: 'mock type 2', field: 'mock field 2', message: 'mock message 2' },
    ];

    global.fetch = jest.fn<typeof global.fetch>(() =>
      Promise.resolve({
        ok: false,
        status: 422,
        json: () => Promise.resolve({ errors: mockErrors.map((error) => JSON.stringify(error)) }),
      } as Response)
    );

    const { result, rerender } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
    const errors = await act(async () => {
      return await result.current.handleCreateUser(mockUser.username, mockUser.password);
    });
    rerender();
    expect(result.current.user).toBeNull();
    expect(errors).toHaveLength(mockErrors.length);
    expect(errors).toMatchObject({ ...mockErrors });
  });

  test('handleCreateUser, handle thrown response error', async () => {
    const mockUser: User = { id: 1, username: 'mock username', password: 'mock password' };
    global.fetch = jest.fn<typeof global.fetch>(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve(),
      } as Response)
    );

    const { result, rerender } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
    try {
      await act(async () => {
        return await result.current.handleCreateUser(mockUser.username, mockUser.password);
      });
    } catch (e) {
      const error = e as Response;
      expect(error.ok).toBeFalsy();
      expect(error.status).toBe(500);
    }
    rerender();
    expect(result.current.user).toBeNull();
  });

  test('checkLoginStatus, user has session and is defined', async () => {
    global.fetch = jest.fn<typeof global.fetch>(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ user: { id: 1, username: 'mock username', password: 'mock password' }, logged_in: true }),
      } as Response)
    );

    const { result, rerender } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
    await act(async () => await result.current.checkLoginStatus());
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/logged-in', {
      credentials: 'include',
    });
    rerender();
    expect(result.current.user).toMatchObject({ id: 1, username: 'mock username', password: 'mock password' });
  });

  test('checkLoginStatus, user does not have session and is undefined', async () => {
    global.fetch = jest.fn<typeof global.fetch>(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(JSON.stringify({ logged_in: false })),
      } as Response)
    );

    const { result, rerender } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
    await act(async () => await result.current.checkLoginStatus());
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/logged-in', {
      credentials: 'include',
    });
    rerender();
    expect(result.current.user).toBeUndefined();
  });

  test('checkLoginStatus, error and user is undefined', async () => {
    global.fetch = jest.fn<typeof global.fetch>(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(),
      } as Response)
    );

    const { result, rerender } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
    await act(async () => await result.current.checkLoginStatus());
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/logged-in', {
      credentials: 'include',
    });
    rerender();
    expect(result.current.user).toBeUndefined();
  });

  test('logout, successful logout', async () => {
    global.fetch = jest.fn<typeof global.fetch>(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(JSON.stringify({ logged_in: false })),
      } as Response)
    );

    const { result, rerender } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
    await act(async () => await result.current.logout());
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/logout', {
      method: 'DELETE',
      credentials: 'include',
    });
    rerender();
    expect(result.current.user).toBeUndefined();
  });

  test('logout, unsuccessful logout with ok false', async () => {
    global.fetch = jest.fn<typeof global.fetch>(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(JSON.stringify({ logged_in: false })),
      } as Response)
    );
    const { result, rerender } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();

    try {
      await act(async () => await result.current.logout());
    } catch (e) {
      const error = e as Response;
      expect(error.ok).toBeFalsy();
    }

    rerender();
    expect(result.current.user).toBeNull();
  });

  test('logout, unsuccessful logout with logged_in field true', async () => {
    global.fetch = jest.fn<typeof global.fetch>(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ logged_in: true }),
      } as Response)
    );
    const { result, rerender } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();

    try {
      await act(async () => await result.current.logout());
    } catch (e) {
      const error = e as Response;
      expect(error.ok).toBeTruthy();
      const data = await error.json();
      expect(data.logged_in).toBeTruthy();
    }

    rerender();
    expect(result.current.user).toBeNull();
  });
});
