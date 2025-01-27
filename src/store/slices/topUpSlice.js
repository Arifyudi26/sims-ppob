import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: "",
  loading: false,
};

const topUpSlice = createSlice({
  name: "topUp",
  initialState,
  reducers: {
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { setAmount, resetForm, setLoading } = topUpSlice.actions;
export default topUpSlice.reducer;
