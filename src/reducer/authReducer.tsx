import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
    user: null,
    error: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            console.log('Dispatched loginSuccess with data:', action.payload);  // Log dispatched action data
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload));  // Save user to localStorage
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
            localStorage.removeItem('user');  // Remove user from localStorage
        },
        token: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);  // Save token to localStorage
        }
    },
});

export const { loginSuccess, setError, logout } = authSlice.actions;

export default authSlice.reducer;
