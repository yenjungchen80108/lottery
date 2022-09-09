import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Container, Spacer } from '../../components/Layout';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './RemainTime.module.css';
import { useTranslation } from 'react-i18next';

const RemainTimeInner = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container className={styles.timer}>
      <div>
        <h3>{t('TIMER.REMAIN')}</h3>
        <Spacer size={0.5} axis="vertical" />
        <Input
          className={styles.input}
          placeholder={t('TIMER.MINUTE')}
          ariaLabel="0"
        />
      </div>
    </Container>
  );
};

export const RemainTime = () => {
  return (<div className={styles.root}>
      <RemainTimeInner />
    </div>);
};
