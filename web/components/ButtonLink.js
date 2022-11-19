import classNames from 'classnames';

const ButtonLink = ({ href, className, children }) => (
  <a
    href={href}
    rel="noopener noreferrer"
    target="_blank"
    className={classNames({
      'text-xs font-mono py-1 px-2 bg-secondary rounded-full': true,
      [className]: !!className,
    })}
  >
    {children}
  </a>
);

export default ButtonLink;
