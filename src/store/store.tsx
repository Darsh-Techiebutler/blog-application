import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default is localStorage
import themeReducer from '../reducer/theme';  // import the theme slice
import authReducer from '../reducer/authReducer';  // import the auth slice
const persistConfig = {
    key: 'root',
    storage,  // You can replace with sessionStorage if needed
    whitelist: ['theme'],  // Only persist the theme state
};

const persistedReducer = persistReducer(persistConfig, themeReducer);

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: persistedReducer,
    },
});

const persistor = persistStore(store);

export { store, persistor };
