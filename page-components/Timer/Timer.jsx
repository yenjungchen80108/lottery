import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Container, Spacer } from '../../components/Layout';
import React, { useCallback, useRef, useState, useContext, useEffect } from 'react';
import styles from './Timer.module.css';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setTimer } from '../Timer/timerSlice';
import { useInterval } from './useInterval';
import { ResultModal } from '../ResultModal/ResultModal';
import Snowfall from 'react-snowfall';

function Timer() {
  const ref = useRef('1');
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(0);
  const [remainSeconds, setRemainSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isValidNum, setIsValidNum] = useState(false);
  const count = useAppSelector((state) => state.count.countState);
  const setCount = (e) => {
    e.preventDefault();
    setIsRunning(true);
    setRemainSeconds(parseInt(time) * 60);
    dispatch(setTimer({ status: 'start' }))
  }

  const pauseCount = (e) => {
    e.preventDefault();
    setIsRunning(!isRunning);
    dispatch(setTimer({ status: isRunning === false ? 'continue' : 'pause' }))
  }

  const resetCount = (e) => {
    e.preventDefault();
    setRemainSeconds(0)
    setIsRunning(false);
    dispatch(setTimer({ minutes: '0', seconds: '00', status: '' }))
    ref.current.reset();
  }

  // const validNumber = (val) => {
  //   const reg = /^[0-9\b]+$/;
  //   return reg.test(val);
  // }
  
  const handleChange = (e) => {
    e.preventDefault();
    let inputNum = +e.target.value;
    setIsValidNum(inputNum > 60 || inputNum == 0);
    setTime(e.target.value);
    dispatch(setTimer({ minutes: !e.target.value ? '1' : e.target.value }));
  }

  const formatNumber = (e) => {
    let checkIfNum;
    let key = ['e', '.', '+', '-'];
    let keyCode = [69, 187, 189, 190]
    if (e.key !== undefined) {
      checkIfNum = key.includes(e.key);
    } else if (e.keyCode !== undefined) {
      checkIfNum = keyCode.includes(e.keyCode);
    }
    return checkIfNum && e.preventDefault();
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

  // useEffect(() => {
  //   handleTick();
  // })
  
  useInterval(() => {
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
            defaultValue="1"
            name="time"
            className={styles.input}
            placeholder="1"
            ariaLabel="1"
            onChange={handleChange}
            onKeyDown={formatNumber}
            htmlType="number"
          /><span className="pt-2">
            {t('TIMER.MINUTE')}
          </span><br/>
          </div>
          {isValidNum &&<div
            className={styles.invalid}
          >{t('MESSAGE.INVALID_NUM')}</div>}
        </div>
        <br />
        <div className={styles.btnContainer}>
          <Button type="success"
            onClick={setCount}
            disabled={isValidNum}
          >
            {t('TIMER.SET')}
          </Button>
          <Spacer size={0.5} axis="horizontal" />
          <Button type="secondary"
            onClick={pauseCount}
            disabled={isValidNum}
          >
            { isRunning === false ? t('TIMER.CONTINUE') : t('TIMER.PAUSE') }
          </Button>
          <Spacer size={0.5} axis="horizontal" />
          <Button type="secondary"
            onClick={resetCount}
          >
            {t('TIMER.RESET')}
          </Button>
        </div>
      </Container>
      </form>
    </div>
    {count.showModal ? (<>
      <ResultModal />
      <Snowfall />
      </>) : <></>}
  </>);
};

export default React.memo(Timer);