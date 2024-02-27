import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { persistedReducer } from "../reducers/index";
import * as thunk from 'redux-thunk';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [thunk.thunk]
})


export const persistor = persistStore(store);

