import clsx from 'clsx';
import styles from './Input.module.css';

const Input = function ({
    value,
    label,
    placeholder,
    className,
    htmlType,
    autoComplete,
    size,
    ariaLabel,
    required,
    onKeyDown
  }) {
  return (
    <div className={clsx(styles.root, className)}>
      <label>
        {label && <div className={styles.label}>{label}</div>}
        <input
          value={value}
          type={htmlType}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={clsx(styles.input, size && styles[size])}
          aria-label={ariaLabel}
          required={required}
          onKeyDown={onKeyDown}
        />
      </label>
    </div>
  );
};

export default Input;
