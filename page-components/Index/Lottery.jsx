import Timer from '../Timer/Timer';
import RemainTime from '../RemainTime/RemainTime';
import { Board } from '../../components/Board';
import AddFakeUserForm from '../../page-components/FakeUser/AddFakeUserForm'
import styles from './Lottery.module.css';

export function Lottery() {
  return (
    <Board>
      <div className={styles.layout}>
        <div className={styles.innerRow}>
            <Timer />
            <RemainTime />
        </div>
        <AddFakeUserForm />
      </div>
    </Board>
  );
};

export default Lottery;