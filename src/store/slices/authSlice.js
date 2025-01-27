import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  loading: false,
  error: null,
  isLoggedIn: false,
  firstName: "",
  lastName: "",
  confirmPassword: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const {
  setEmail,
  setPassword,
  setLoading,
  setError,
  setFirstName,
  setLastName,
  setConfirmPassword,
  resetForm,
} = authSlice.actions;
export default authSlice.reducer;
