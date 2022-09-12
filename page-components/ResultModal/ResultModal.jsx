import { Wrapper } from '../../components/Layout';
import { LoadingDots } from '../../components/LoadingDots';
import { useCallback, useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/hooks';
import { setTimer } from '../Timer/timerSlice';
import { useFakeUsers } from '../../lib/fakeUser';
import { Profile } from '../../components/Profile';
import { Modal } from '../../components/Modal';

export const ResultModal = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { fakeUserData, isLoading } = useFakeUsers();
  const [ randomUser, setRandomUser ] = useState({});
  
  useEffect(() => {
    try {
      if (!fakeUserData) return <></>;
      const { fakeUsers } = fakeUserData;
      let tempUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
      setRandomUser(tempUser);
    } catch (e) {
      console.log(e);
    }
  }, [fakeUserData])

  const handleClose = () => {
    dispatch(setTimer({ showModal: false }));
  };

  return (
    <>
      <Modal
        onClose={handleClose}
        title={t('RESULT.TITLE')}
      >
        <Wrapper>{isLoading ? 
          <LoadingDots /> : (
            <Profile props={randomUser} txt={t('RESULT.MSG')}/>
          )}
        </Wrapper>
      </Modal>
    </>
  );
};