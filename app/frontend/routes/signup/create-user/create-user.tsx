import React from 'react';
import { Card } from '../../../reusable-components/card/card.tsx';
import CustomerInfo from '../../../reusable-components/customer-info/customer-info.tsx';

export function CreateUser() {
  return (
      <Card title="What's your first and last name?">
        <CustomerInfo to="/signup/joint-access"/>
      </Card>
  );
}
