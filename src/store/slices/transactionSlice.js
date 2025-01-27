import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  offset: 0,
  loading: true,
  error: null,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setHistory, setLoading, setError, setOffset } =
  historySlice.actions;

export default historySlice.reducer;
