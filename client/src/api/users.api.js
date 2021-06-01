import axios from "axios";
import config from "../config/config";

const instanseAxios = axios.create({
  baseURL: config.baseURL + "/api",
});

const usersApi = {
  add: async (name) => {
    const res = await instanseAxios.post(
      `/users/add`,
      { name },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return res.data;
  },
  getUsers: async () => {
    const res = await instanseAxios.get(`/users/get`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  },
};

export default usersApi;
