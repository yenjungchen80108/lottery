import clsx from 'clsx';
import styles from './Layout.module.css';

const Wrapper = ({ children, className }) => {
  return <div className={clsx(styles.wrapper, className)}>{children}</div>;
};

export default Wrapper;
