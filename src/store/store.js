import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";
import transactionSlice from "./slices/transactionSlice";
import topUpReducer from "./slices/topUpSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    transaction: transactionSlice,
    topUp: topUpReducer,
  },
});

export default store;
