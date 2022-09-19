import { LoadingDots } from '../LoadingDots';
import clsx from 'clsx';
import styles from './Button.module.css';
import React from 'react';

export const Button = function ({
    children,
    type,
    className,
    onClick,
    size,
    variant = 'invert',
    loading,
    disabled,
  }) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[type],
        size && styles[size],
        styles[variant],
        className
      )}
      onClick={onClick}
      disabled={loading || disabled}
      type={type}
    >
      {loading && <LoadingDots className={styles.loading} />}
      <span>{children}</span>
    </button>
  );
};

export const ButtonLink = function ({
  children, type, className, href, onClick, size, variant = 'invert' },
) {
  return (
    <a
      className={clsx(
        styles.button,
        type && styles[type],
        size && styles[size],
        variant && styles[variant],
        className
      )}
      href={href}
      onClick={onClick}
    ><span>{children}</span>
    </a>
  );
};

export default React.memo(Button);