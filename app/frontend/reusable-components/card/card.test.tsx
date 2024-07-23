import { describe, test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Card } from './card';

describe('Card', () => {
    test('render Card title, description and content', () => {
      render(<Card title='Mock Card Title' description='Mock Card Description'><p>Card Children</p></Card>);
      expect(screen.getByRole('heading', {name: /Mock Card Title/})).toBeTruthy();
      expect(screen.getByText('Mock Card Description')).toBeTruthy();
      expect(screen.getByText('Card Children')).toBeTruthy();
    });

    test('render Card content and check for absence of title and description', () => {
        render(<Card><div>Card Children</div></Card>);
        expect(screen.queryByRole('heading')).toBeNull();
        expect(screen.queryByTestId('cardDescription')).toBeNull();
        expect(screen.getByText('Card Children')).toBeTruthy();
      });
  });