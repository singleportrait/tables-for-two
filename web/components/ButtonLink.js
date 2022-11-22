import classNames from 'classnames';

const classes = 'text-xs font-mono py-1 px-3 bg-secondary rounded-full border border-secondary hover:bg-white hover:border-secondary';

const ButtonLink = ({ href, className, children }) => (
  <a
    href={href}
    rel="noopener noreferrer"
    target="_blank"
    className={classNames({
      'inline-block': true,
      [classes]: true,
      [className]: !!className,
    })}
  >
    {children}
  </a>
);

export default ButtonLink;
