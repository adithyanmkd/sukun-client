import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "../features/auth/authSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"],
};

export const persistedReducer = persistReducer(persistConfig, authReducer);
