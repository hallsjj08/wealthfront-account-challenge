import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Button } from './button';
import { Form } from 'react-router-dom';

describe('CreateUser', () => {
  test('test button of type button', () => {
    const click = jest.fn();
    render(<Button onClick={click}>Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button.nodeName).toBe('BUTTON');
    fireEvent.click(button);
    expect(click).toBeCalled();
  });

  test('test button of type submit', () => {
    const click = jest.fn();
    render(
      <Form onSubmit={click}>
        <Button type="submit">Submit Button</Button>
      </Form>
    );
    const button = screen.getByText('Submit Button');
    console.log(button);
    expect(button.nodeName).toBe('BUTTON');
    fireEvent.click(button);
    expect(click).toBeCalled();
  });

  test.todo('test button with href');
});
