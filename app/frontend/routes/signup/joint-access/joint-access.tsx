import React from 'react';
import { Card } from '../../../reusable-components/card/card.tsx';
import CustomerInfo from 'app/frontend/reusable-components/customer-info/customer-info.tsx';

export function JointAccess() {
  return (
      <Card
        title="Will this be a joint account?"
        description="Joint accounts allow for a secondary account holder which provides the same level of access as the primary."
      >
        <CustomerInfo to="/signup/stock-restrictions"/>
      </Card>
  );
}
