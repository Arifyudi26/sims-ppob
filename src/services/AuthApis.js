import instance from "./AxiosGlobal";

const SignIn = (data) => {
  return instance.post("/login", data);
};

const SignUp = (data) => {
  return instance.post("/registration", data);
};

const AuthAPIs = {
  SignIn,
  SignUp,
};

export default AuthAPIs;
