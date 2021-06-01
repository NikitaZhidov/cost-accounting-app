import axios from "axios";
import config from "../config/config";

const instanseAxios = axios.create({
  baseURL: config.baseURL + "/api",
});

const iconsApi = {
  getIcons: async () => {
    const res = await instanseAxios.get("/icons/get");
    return res.data;
  },
};

export default iconsApi;
