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
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload; 
        },
    },
});

export const { loginSuccess, setError } = authSlice.actions;

export default authSlice.reducer;
