import React, { ButtonHTMLAttributes } from 'react';

import './styles.scss';

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...others
}) => {
  return (
    <button type="button" className={`btn ${className}`} {...others}>
      {children}
    </button>
  );
};
