import { Container, Spacer } from '../../components/Layout';
import { useCallback, useRef, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import styles from './RemainTime.module.css';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const RemainTimeInner = () => {
  const count = useAppSelector((state) => state.count.countState)
  const { t } = useTranslation();

  return (
    <Container className={styles.timer}>
      <div>
        <h3>{t('TIMER.REMAIN')}</h3>
        <Spacer size={0.5} axis="vertical" />
        <h1 style={{ fontSize: 90 }}>
          {count.minutes}:{count.seconds}</h1>
      </div>
    </Container>
  );
};

export const RemainTime = () => {
  return (<div className={styles.root}>
      <RemainTimeInner />
    </div>);
};
