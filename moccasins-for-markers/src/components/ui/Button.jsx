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
  ...props
}) {
  const classes = `btn btn-${variant} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...props}>
        <span>{children}</span>
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...props}>
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...props}>
      <span>{children}</span>
    </button>
  );
}
