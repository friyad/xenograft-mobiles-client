import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  authFormAnimState: string | null;
}

const initialState: GlobalState = {
  authFormAnimState: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAuthFormAnimState: (
      state: GlobalState,
      action: PayloadAction<string>
    ) => {
      state.authFormAnimState = action.payload;
    },
  },
});

export const { setAuthFormAnimState } = globalSlice.actions;

export default globalSlice.reducer;
