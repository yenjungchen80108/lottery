import '@testing-library/jest-dom'
import { store } from '../../../store/store';
import { setTimer } from '../timerSlice';

describe('renders the timer component', () => {
    const initState = { 
        seconds: '00',
        minutes: '0',
        status: 'pause',
        showModal: false
    }

    it('render the store', async() => {
        const res = await store.dispatch(setTimer({
            seconds: '00', minutes: '1', status: 'start', showModal: false
        }));
        const timers = res.payload;
        
        expect(timers.seconds).toEqual(initState.seconds);
        const state = store.getState().count.countState;
        expect(state).toEqual(timers);
    })
});
