import clsx from 'clsx';
import styles from './Text.module.css';

export const Text = function({ color, children, className, as, ...props }) {
  const Component = as || 'p';
  return (
    <Component
      style={color ? { '--color': `var(--${color})` } : undefined}
      className={clsx(styles.text, className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export const TextLink = function Text(
  { color, children, className, href, onClick, variant }) {
  return (
    <a
      style={color ? { '--color': `var(--${color})` } : undefined}
      className={clsx(
        styles.text,
        styles.link,
        variant && styles[variant],
        className
      )}
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  )};
