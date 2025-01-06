// store.js or store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/authReducer';
import themeReducer from '../reducer/theme';
const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
    },
});

export default store;
