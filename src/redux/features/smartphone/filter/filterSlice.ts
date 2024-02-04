import {
  FilterItemsType,
  ISmartPhone2,
  InitailFilterItemsType,
} from "@/types/globalTypes";
import { getFilteredPhones } from "@/utils/smartphoneUtils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FiltersState {
  initailFilterItems: InitailFilterItemsType;
  smartphoneDatas: ISmartPhone2[];
  filterItems: FilterItemsType;
  filteredSmartPhones: ISmartPhone2[];
  openedFilterItem: string | null;
}

interface SetFilterPayload {
  property: string;
  value: string[] | number | string | { min: string; max: string };
}

const initialState: FiltersState = {
  // Initial Filter Items with initial phones data
  smartphoneDatas: [],
  initailFilterItems: {
    price: {
      min: 0,
      max: 0,
    },
    releasedDate: {
      min: "",
      max: "",
    },
    brand: [],
    model: [],
    opSystem: [],
    storageCapacityGB: [],
    screenSize: [],
    color: [],
    battery: [],
  },

  // Filter Items and filtered data after user interaction
  filteredSmartPhones: [],
  filterItems: {
    price: null,
    releasedDate: null,
    brand: null,
    model: null,
    opSystem: null,
    storageCapacityGB: null,
    screenSize: null,
    color: null,
    battery: null,
  },

  // otheres
  openedFilterItem: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setItemOpenOnChange: (
      state: FiltersState,
      action: PayloadAction<string | null>
    ) => {
      state.openedFilterItem = action.payload;
    },

    // Handle Signle Filter Item value changes
    handleValueChanges: (
      state: FiltersState,
      action: PayloadAction<SetFilterPayload>
    ) => {
      const { property, value } = action.payload;
      state.filterItems[property] = value;

      // check if it is an array and the the array is empty then make it null
      if (
        Array.isArray(state.filterItems[property]) &&
        //@ts-ignore
        state.filterItems[property].length <= 0
      ) {
        state.filterItems[property] = null;
      }
    },

    // Handle Filter Apply when user click on Apply or onClickOutside
    handleApply: (state: FiltersState) => {
      state.filteredSmartPhones = getFilteredPhones(
        state.smartphoneDatas,
        state.filterItems,
        state.initailFilterItems
      );
      state.openedFilterItem = null;
    },

    clearFilter: (
      state: FiltersState,
      action: PayloadAction<{ isAll: boolean; property: string }>
    ) => {
      if (action.payload.isAll) {
        state.filterItems = {
          price: null,
          releasedDate: null,
          brand: null,
          model: null,
          opSystem: null,
          storageCapacityGB: null,
          screenSize: null,
          color: null,
          battery: null,
        };
      } else {
        state.filterItems[action.payload.property] = null;
      }
      state.openedFilterItem = null;
    },

    handleSearch: (state: FiltersState, action: PayloadAction<string>) => {
      state.filteredSmartPhones = state.smartphoneDatas.filter((phone) =>
        phone.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },

    // Set Initail Filter State
    setFilterInit: (
      state: FiltersState,
      action: PayloadAction<{
        items: InitailFilterItemsType;
        phones: ISmartPhone2[];
      }>
    ) => {
      const { phones, items } = action.payload;
      state.smartphoneDatas = phones;
      state.filteredSmartPhones = phones;
      state.initailFilterItems = items;
    },
  },
});

export const {
  setItemOpenOnChange,
  handleValueChanges,
  handleApply,
  setFilterInit,
  clearFilter,
  handleSearch,
} = filtersSlice.actions;

export default filtersSlice.reducer;
