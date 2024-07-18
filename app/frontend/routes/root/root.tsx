import React from 'react';
import { FlowLayout } from '../../reusable-components/flow-layout/flow-layout.tsx';
import { Button } from 'app/frontend/reusable-components/button/button.tsx';

export function Root() {
  return (
    <FlowLayout>
      <Button href="/create-account">
        Get started
      </Button>
    </FlowLayout>
  );
}
