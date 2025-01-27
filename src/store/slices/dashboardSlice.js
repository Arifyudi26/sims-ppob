import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileImage: "/assets/Profile-Photo.png",
  data: {},
  balance: {},
  service: [],
  banner: [],
  payment: {},
  activeTab: "dashboard",
  showSaldo: false,
  loading: true,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.data = action.payload.data;
      state.profileImage = action.payload.profile_image;
    },
    setService: (state, action) => {
      state.service = action.payload;
    },
    setBanner: (state, action) => {
      state.banner = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
    setShowSaldo: (state, action) => {
      state.showSaldo = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProfile,
  setService,
  setBanner,
  setBalance,
  setPayment,
  setShowSaldo,
  setLoading,
  setActiveTab,
  setError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
