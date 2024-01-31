import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/global/globalSlice";
import smartphoneReducer from "./features/smartphone/smartphoneSlice";
import { api, uploadAPI } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    global: globalReducer,
    smartphone: smartphoneReducer,
    [api.reducerPath]: api.reducer,
    [uploadAPI.reducerPath]: uploadAPI.reducer,
  },
  middleware: (gDM) => gDM().concat([api.middleware, uploadAPI.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
