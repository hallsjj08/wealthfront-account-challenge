import React from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, jest, test } from '@jest/globals';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from 'app/frontend/routes';
import AuthContextProvider from 'app/frontend/store/auth-context-provider';

describe('CreateAccount', () => {
  let originalFetch: typeof global.fetch | undefined;

  beforeAll(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    if (global.fetch) {
      (global.fetch as jest.Mock).mockClear();
      (global.fetch as jest.Mock).mockReset();
    }
  });

  afterAll(() => {
    if (originalFetch) global.fetch = originalFetch;
  });

  test('renders', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ logged_in: false }),
      } as Response)
    );
    const router = createMemoryRouter([routes], {
      initialEntries: ['/create-account'],
    });

    const navigateSpy = jest.spyOn(router, 'navigate');
    const screen = render(
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    );

    await waitFor(
      async () => {
        const header = await screen.findByRole('heading');
        expect(header.innerHTML).toContain('Create New Account');
      },
      { timeout: 3000 }
    );

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'MyMockUser_name' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'MyPasswordIsSuperSt0ng' } });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            user: { id: 1, username: 'MyMockUser_name', password: 'MyPasswordIsSuperSt0ng' },
            logged_in: true,
          }),
      } as Response)
    );

    navigateSpy.mockImplementationOnce(() => Promise.resolve());
    router;

    await act(() => fireEvent.click(screen.getByRole('button', { name: 'Create Account' })));
    expect(navigateSpy).toBeCalledWith(
      { hash: '', pathname: '/signup/account-selection', search: '' },
      { fromRouteId: '0-1', relative: undefined, replace: undefined, state: undefined }
    );
  });
});
