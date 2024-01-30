import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/global/globalSlice";
import smartphoneReducer from "./features/smartphone/smartphoneSlice";

const store = configureStore({
  reducer: {
    global: globalReducer,
    smartphone: smartphoneReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
