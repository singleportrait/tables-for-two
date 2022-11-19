import classNames from 'classnames';
import React from 'react';

const Button = ({ onClick, className, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={classNames({
      'text-xs font-mono py-1 px-2 bg-secondary rounded-full': true,
      [className]: !!className,
    })}
  >
    {children}
  </button>
);

export default Button;
