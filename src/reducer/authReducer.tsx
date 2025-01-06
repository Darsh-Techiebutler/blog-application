import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,    // Track loading state for login
    error: null,       // Store any error messages
};

// Create the slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;  // Store the error message
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
