import classNames from 'classnames';
import React from 'react';

const classes = 'text-xs font-mono py-1 px-3 bg-secondary rounded-full border border-secondary hover:bg-white hover:border-secondary';

const Button = ({ onClick, className, children }) => (
  <>
    {onClick && (
      <button
        type="button"
        onClick={onClick}
        className={classNames({
          [classes]: true,
          [className]: !!className,
        })}
      >
        {children}
      </button>
    )}
    {!onClick && (
      <div
        className={classNames({
          [classes]: true,
          [className]: !!className,
        })}
      >
        {children}
      </div>
    )}
  </>
);

export default Button;
