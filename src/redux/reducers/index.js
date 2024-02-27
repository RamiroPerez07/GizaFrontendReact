import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import { cartReducer } from "./cartReducer";
import { userReducer } from "./userReducer";


const persistConfig = {
  key:"root",
  storage: storage,
  whiteList : ["cart"]
}

export const reducer = combineReducers({
  cart: cartReducer,
  user: userReducer
})

export const persistedReducer = persistReducer(persistConfig, reducer)