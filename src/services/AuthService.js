import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

const signup = (email, password) => {
  return axios
    .post(API_URL + "/users", {
      user: {
        email,
        password,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/login", {
      session: {
        email,
        password,
      },
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
