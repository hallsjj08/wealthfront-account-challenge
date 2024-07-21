import React from 'react';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { Input } from '../../../reusable-components/input/input.tsx';
import CardContent from 'app/frontend/reusable-components/card/card-content.tsx';

export function StockRestrictions() {
  return (
      <Card
        title="Are you restricted from trading any stocks?"
        description="If you are a broker dealer or registered representative of another company, you may be restricted from trading that stock."
      >
        {/*<li>style UI to look like given mock, make sure the typeahead is realtime feeling search</li>*/}
        <CardContent>
          <Input name="stock" label="Stock Symbol" />
          <Button href="/signup/deposit">Continue</Button>
        </CardContent>
      </Card>
  );
}
