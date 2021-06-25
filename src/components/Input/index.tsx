import React, { InputHTMLAttributes } from 'react';

import './styles.scss';

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return <input {...props} />;
};
