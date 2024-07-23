import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Button } from './button';
// import { createMemoryRouter, Form, RouterProvider } from 'react-router-dom';

describe('CreateUser', () => {
  test('test button of type button', () => {
    const click = jest.fn();
    render(<Button onClick={click}>Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button.nodeName).toBe('BUTTON');
    fireEvent.click(button);
    expect(click).toBeCalled();
  });

  test.todo('test button type submit');

  test.todo('test button with href');
});
