// authReducer.js or authReducer.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout(state) {
            state.user = null;
            state.token = null;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setUser, logout, setError } = authSlice.actions;

export default authSlice.reducer;
