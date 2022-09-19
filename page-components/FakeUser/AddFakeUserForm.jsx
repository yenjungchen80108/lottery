import { Spacer, Wrapper } from '../../components/Layout';
import { LoadingDots } from '../../components/LoadingDots';
import { fetcher } from '../../lib/fetch';
import { useFakeUsers } from '../../lib/fakeUser';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import styles from './FakeUser.module.css';
import { useSWRConfig } from "swr";
import { withRouter } from 'next/router';
import { Label } from '../../components/Label';
import { SingleTableList } from '../../components/SingleTable';
import { columns } from './constant';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

// common form for add, edit, delete mode
export const FakeUserForm = (props) => {
  const { t } = useTranslation();
  const { handleChange, values } = props;

  return (
    <section>
        <h5>{t('USER.MODAL_TITLE')}</h5> 
        <Label
          name="name"
          value={values.name}
          onChange={handleChange}
        ></Label>
        <Label
          name="phone"
          value={values.phone}
          onChange={handleChange}
        ></Label>
        <Label
          name="age"
          value={values.age} 
          onChange={handleChange}
        ></Label>
        <Label
          name="email"
          value={values.email}
          onChange={handleChange}
        ></Label>
        <Label
          name="img"
          value={values.img}
          onChange={handleChange}
        ></Label>
    </section>
  )
}

export const FakeUserFormInner = () => {
  const init = {
    name: '',
    phone: '',
    age: '',
    email: '',
    img: ''
  }
  const [values, setValues] = useState(init);
  const { fakeUserData, isLoading, isError } = useFakeUsers();
  const { mutate } = useSWRConfig();
  const { t } = useTranslation();
  const count = useAppSelector((state) => state.count.countState)
  const closeRef = useRef();

  const onSubmit = async (e, mode) => {
    try {
      e.preventDefault();
      // add/edit item when submit  
      await fetcher('/api/fakeUsers', {
        method: mode === 'add' ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      toast.success(mode === 'add' ? 
      t('MESSAGE.CREATE_SUCCESS') : t('MESSAGE.UPDATE_SUCCESS'));
      setValues(mode === 'add' ? init : values);
      mutate('/api/fakeUsers');
    } catch (e) {
      toast.error(e.info.error.message);
    } finally {
      closeRef.current.handleClose();
    }
  };

  const onDelete = async (e, data) => {
    try {
      e.preventDefault();
      // delete item by id
     await fetcher('/api/fakeUsers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: data._id
        }),
      });

      mutate('/api/fakeUsers');
      toast.success(t('MESSAGE.DELETE_SUCCESS'));
    } catch (e) {
      toast.error(e.info.error.message);
    } finally {
      closeRef.current.handleClose();
  }
};

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

    return (
      <Wrapper>
        <div>
        <Spacer axis="vertical" size={1} />
        {isLoading ? (
        <LoadingDots>Loading</LoadingDots>
        ) : fakeUserData.fakeUsers ? 
        (<>
          <SingleTableList
            ref={closeRef}
            name={t('USER.TITLE')}
            initVal={init}
            columns={columns}
            fields={fakeUserData.fakeUsers}
            setValue={setValues}
            onSubmit={onSubmit}
            onDelete={onDelete}
            showAction={count.status === ''}
          ><FakeUserForm
            handleChange={handleChange}
            values={values}
          ></FakeUserForm>
          </SingleTableList>
        </>)
        : (<span>no data</span>)}
      </div>
    </Wrapper>
    );
};

const AddFakeUserForm = () => {
    return (
      <div className={styles.root}>
        <FakeUserFormInner/>
      </div>
    );
  };

export default withRouter(AddFakeUserForm);