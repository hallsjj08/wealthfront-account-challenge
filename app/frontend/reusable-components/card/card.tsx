import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
  maxWidth?: string
}

export function Card({ children, title, description, maxWidth = '' }: Props) {
  return (
    <section className={`p-10 shadow-card min-h-[400px] w-full rounded-2xl border border-solid border-slate-200 ${maxWidth}`}>
      {title && <h1 className="text-2xl font-medium m-0 mb-1">{title}</h1>}
      {description && <p data-testid="cardDescription" className="text-[hsla(243,30%,13%,.63)] text-base m-0 mb-1">{description}</p>}
      {children}
    </section>
  );
}
