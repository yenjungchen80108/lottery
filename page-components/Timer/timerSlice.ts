import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

export type CountState = {
    seconds: string;
    minutes: string;
    status: string;
    showModal: boolean;
}

const initCountState: CountState = {
    seconds: '00',
    minutes: '0',
    status: 'pause',
    showModal: false
};

export const countSlice = createSlice({
    name: 'count',
    initialState: {
        countState: initCountState
    },
    reducers: {
        setTimer: (state, action) => {
            state.countState = {...state.countState, ...action.payload};
        },
    }
})

export const {
    setTimer,
} = countSlice.actions;

export const selectCount = (state: RootState) => state.count;
export default countSlice.reducer;