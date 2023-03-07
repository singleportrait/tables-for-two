import classNames from 'classnames';

const Button = ({ onClick, className, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={classNames({
      button: true,
      [className]: !!className,
    })}
  >
    {children}
  </button>
);

export default Button;
