import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Container, Spacer } from '../../components/Layout';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Timer.module.css';
import { useTranslation } from 'react-i18next';

const TimerInner = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <form onSubmit={onSubmit}>
      <Container className={styles.timer}>
        <div>
            <h3>{t('TIMER.TITLE')}</h3>
            <Spacer size={0.5} axis="vertical" />
            <Input
              className={styles.input}
              placeholder={t('TIMER.MINUTE')}
              ariaLabel="0"
            />
        </div>
        <br />
        <div className="flex">
            <Button type="success" loading={isLoading}>
              {t('TIMER.SET')}
            </Button>
            <Spacer size={1} axis="horizontal" />
            <Button type="secondary">
              {t('TIMER.RESET')}
            </Button>
        </div>
      </Container>
    </form>
  );
};

export const Timer = () => {
  return (<div className={styles.root}>
      <TimerInner />
    </div>);
};
