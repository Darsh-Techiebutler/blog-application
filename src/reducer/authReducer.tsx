import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            console.log('Dispatched loginSuccess with data:', action.payload);  // Log dispatched action data
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
        }


    },
});

export const { loginSuccess, setError, logout } = authSlice.actions;

export default authSlice.reducer;
