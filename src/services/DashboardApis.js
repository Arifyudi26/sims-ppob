import instance from "./AxiosGlobal";

const getProfile = () => {
  return instance.get("/profile");
};

const getService = () => {
  return instance.get("/services");
};

const getBanner = () => {
  return instance.get("/banner");
};

const getBalance = () => {
  return instance.get("/balance");
};

const uploadImage = (data) => {
  return instance.put("/profile/image", data);
};

const updateProfile = (data) => {
  return instance.put("/profile/update", data);
};

const getHistory = (param) => {
  return instance.get("/transaction/history", param);
};

const topUp = (data) => {
  return instance.post("/topup", data);
};

const Transaction = (data) => {
  return instance.post("/transaction", data);
};

const DashboardApis = {
  getProfile,
  getService,
  getBanner,
  getBalance,
  uploadImage,
  updateProfile,
  getHistory,
  topUp,
  Transaction,
};

export default DashboardApis;
