import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  type = 'button',
  className = '',
  onClick,
  disabled,
  arrow = false,
  ...props
}) {
  const classes = `btn btn-${variant} ${className}`.trim();
  const content = (
    <span>
      {children}
      {arrow ? <span className="btn-arrow" aria-hidden="true">→</span> : null}
    </span>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...props}>
      {content}
    </button>
  );
}
