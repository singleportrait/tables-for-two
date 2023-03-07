import classNames from 'classnames';

const ButtonLink = ({ href, className, children }) => (
  <a
    href={href}
    rel="noopener noreferrer"
    target="_blank"
    className={classNames({
      'button inline-block': true,
      [className]: !!className,
    })}
  >
    {children}
  </a>
);

export default ButtonLink;
