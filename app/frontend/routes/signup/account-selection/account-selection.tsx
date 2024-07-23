import React from 'react';
import { Card } from '../../../reusable-components/card/card.tsx';
import CardContent from '../../../reusable-components/card/card-content.tsx';
import AccountTypes from './account-types.tsx';

export function AccountSelection() {
  return (
    <Card title="What type of account would you like?" description="You can open a new account in just 5 minutes.">
      <CardContent classes="space-y-2 first-child:border-t-slate-200">
        <AccountTypes />
      </CardContent>
    </Card>
  );
}
