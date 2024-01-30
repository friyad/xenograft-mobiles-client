import { createSlice } from "@reduxjs/toolkit";

interface SmartPhoneState {
  cardView: boolean;
}

const initialState: SmartPhoneState = {
  cardView: true,
};

const smartPhoneSlice = createSlice({
  name: "smartPhone",
  initialState,
  reducers: {
    setCardView: (state, action) => {
      state.cardView = action.payload;
    },
  },
});

export const { setCardView } = smartPhoneSlice.actions;

export default smartPhoneSlice.reducer;
