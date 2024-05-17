import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: localStorage.getItem('role') || '1', // Default role is '1' (user)
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
    },
});

export const { setRole } = userSlice.actions;

export default userSlice.reducer;