import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/auth.reducers';
import api from './api/api';
import miscSlice from './reducers/misc.reducers';
import chatSlice from './reducers/chat.reducers';

const store = configureStore({
    reducer : {
        [authSlice.name]: authSlice.reducer,
        [miscSlice.name]: miscSlice.reducer,
        [chatSlice.name]: chatSlice.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware],
    
});

export default store;