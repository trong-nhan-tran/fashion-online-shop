import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import storage from "redux-persist/lib/storage";
import {
  persistStore, persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

const commonConfig = {
  key: "shop/user",
  storage
};

const userConfig = {
  ...commonConfig,
  whiteList: ["isLogin", "token"]
}

export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userSlice)
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})



export const persistor = persistStore(store);
