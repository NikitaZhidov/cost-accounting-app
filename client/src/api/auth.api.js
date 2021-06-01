import axios from "axios";
import config from "../config/config";

const instanseAxios = axios.create({
  baseURL: config.baseURL + "/api",
});

const authApi = {
  register: async (email, password, nickname) => {
    const res = await instanseAxios.post(`/auth/register`, {
      email,
      password,
      nickname,
    });
    return res.data;
  },

  login: async (email, password) => {
    const res = await instanseAxios.post(`/auth/login`, {
      email,
      password,
    });
    return res.data;
  },

  auth: async () => {
    const res = await instanseAxios.get(`/auth/login`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  },
};

export default authApi;
