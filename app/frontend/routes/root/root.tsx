import React from 'react';
import { FlowLayout } from '../../reusable-components/flow-layout/flow-layout.tsx';
import { Outlet } from 'react-router-dom';

export function Root() {
  return (
    <FlowLayout>
      <Outlet />
    </FlowLayout>
  );
}
