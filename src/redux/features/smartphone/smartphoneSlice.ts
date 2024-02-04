import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SmartPhoneState {
  cardView: boolean;
  bulkIdsForDelete: string[];
}

const initialState: SmartPhoneState = {
  cardView: true,
  bulkIdsForDelete: [],
};

export const smartPhoneSlice = createSlice({
  name: "smartPhone",
  initialState,
  reducers: {
    setCardView: (state: SmartPhoneState, action: PayloadAction<boolean>) => {
      state.cardView = action.payload;
    },
    setIdForDelete: (state: SmartPhoneState, action: PayloadAction<string>) => {
      if (!state.bulkIdsForDelete.includes(action.payload)) {
        state.bulkIdsForDelete.push(action.payload);
      } else {
        state.bulkIdsForDelete = state.bulkIdsForDelete.filter(
          (id: string) => id !== action.payload
        );
      }
    },
    clearIdsForDelete: (state: SmartPhoneState) => {
      state.bulkIdsForDelete = [];
    },
  },
});

export const { setCardView, setIdForDelete, clearIdsForDelete } =
  smartPhoneSlice.actions;

export default smartPhoneSlice.reducer;
