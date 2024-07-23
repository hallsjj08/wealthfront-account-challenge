import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit';
  href?: string;
  fullwidth?: boolean;
  children: ReactNode;
}

export function Button({ href, children, type, fullwidth = false, ...props }: Props) {
  let classes = 'inline-block py-3 px-6 bg-[hsla(244,49%,49%,1)] text-white rounded-md hover:bg-indigo-700 text-center';

  if (fullwidth) classes += ' w-full';
  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
