import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Container, Spacer } from '../../components/Layout';
import { useCallback, useRef, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import styles from './Timer.module.css';
import { useTranslation } from 'react-i18next';
import { lotteryContext } from '../Index/Lottery';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setTimer } from '../Timer/timerSlice';
import { useInterval } from './useInterval';
import { ResultModal } from '../ResultModal/ResultModal';

export function Timer() {
  const ref = useRef('0');
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(0);
  const [remainSeconds, setRemainSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const count = useAppSelector((state) => state.count.countState)

  const setCount = (e) => {
    e.preventDefault();
    setIsRunning(true);
    setRemainSeconds(parseInt(time) * 60);
    dispatch(setTimer({ status: 'start' }))
  }

  const pauseCount = (e) => {
    e.preventDefault();
    setIsRunning(!isRunning);
    dispatch(setTimer({ status: 'pause' }))
  }

  const resetCount = (e) => {
    e.preventDefault();
    setRemainSeconds(0)
    setIsRunning(false);
    dispatch(setTimer({ minutes: '0', seconds: '00', status: 'reset' }))
    ref.current.reset();
  }

  const handleChange = (e) => {
    e.preventDefault();
    setTime(e.target.value);
    dispatch(setTimer({ minutes: !e.target.value ? '0' : e.target.value,
    status: 'setTime' }))
  }

  const handleTick = () => {
    let min = Math.floor(remainSeconds / 60);
    let sec = remainSeconds - (min * 60);
    
    dispatch(setTimer({ minutes: min, seconds: sec.toString().length == 1 ? '0' + sec : sec}));

    if (min === 0 && sec === 0) {
      setIsRunning(false);
      dispatch(setTimer({ showModal: true }));
    }

    setRemainSeconds(remainSeconds-1);
  };

  useInterval(() => {
    setRemainSeconds(parseInt(time) * 60);
    handleTick();
  }, isRunning ? 1000 : null)

  return (
    <>
    <div className={styles.root}>
      <form
      ref={ref}
      >
      <Container className={styles.timer}>
        <div>
          <h3>{t('TIMER.TITLE')}</h3>
          <Spacer size={0.5} axis="vertical" />
          <div className="flex">
          <Input
            defaultValue="0"
            name="time"
            className={styles.input}
            placeholder="0"
            ariaLabel="0"
            onChange={handleChange}
            htmlType="number"
          /><span className="pt-2">
            {t('TIMER.MINUTE')}
          </span></div>
        </div>
        <br />
        <div className="flex">
          <Button type="success"
            onClick={setCount}
            disabled={!time}
          >
            {t('TIMER.SET')}
          </Button>
          <Spacer size={1} axis="horizontal" />
          <Button type="secondary"
            onClick={pauseCount}
            disabled={!time}
          >
            { isRunning === false ? t('TIMER.CONTINUE') : t('TIMER.PAUSE') }
          </Button>
          <Spacer size={1} axis="horizontal" />
          <Button type="secondary"
            onClick={resetCount}
            disabled={!time}
          >
            {t('TIMER.RESET')}
          </Button>
        </div>
      </Container>
      </form>
    </div>
    {count.showModal ? (<ResultModal />) : <></>}
  </>);
};
