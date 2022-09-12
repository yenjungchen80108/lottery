import clsx from 'clsx';
import styles from './Input.module.css';

const Input = function ({
    name,
    value,
    label,
    ref,
    placeholder,
    className,
    htmlType,
    autoComplete,
    size,
    ariaLabel,
    required,
    onKeyDown,
    onChange
  }) {
  return (
    <div className={clsx(styles.root, className)}>
      <label>
        {label && <div className={styles.label}>{label}</div>}
        <input
          name={name}
          value={value}
          ref={ref}
          type={htmlType}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={clsx(styles.input, size && styles[size])}
          aria-label={ariaLabel}
          required={required}
          onKeyDown={onKeyDown}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default Input;
