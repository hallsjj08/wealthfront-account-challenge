import React from 'react';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { Input } from '../../../reusable-components/input/input.tsx';
import CardContent from 'app/frontend/reusable-components/card/card-content.tsx';

export function Deposit() {
  return (
      <Card title="Deposit funds" description="Accounts can be funded with as little as $5.">
        <CardContent>
          <Input name="depositAmount" label="Deposit Amount" />
          <Button href="/signup/account-selection">Start over</Button>
        </CardContent>
      </Card>
  );
}
