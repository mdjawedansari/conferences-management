import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage";
import userReducer from "../redux/reducers/userSlice"

const rootReducer = combineReducers({
  auth: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const persistor = persistStore(store)