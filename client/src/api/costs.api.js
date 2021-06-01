import axios from "axios";
import config from "../config/config";
import { getCostsQueryParams } from "../utils/apiUtils";

const instanseAxios = axios.create({
  baseURL: config.baseURL + "/api",
});

const costsApi = {
  getCosts: async (
    from = null,
    to = null,
    userId = null,
    count = null,
    page = null
  ) => {
    let queryParams = getCostsQueryParams(from, to, userId, count, page);

    const res = await instanseAxios.get(`/costs/get?${queryParams}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  },
  getCategories: async () => {
    const res = await instanseAxios.get("/categories/get", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  },
  addCategory: async ({ name, iconId }) => {
    const res = await instanseAxios.post(
      "/categories/add",
      { name, icon: iconId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return res.data;
  },
  deleteCategory: async ({ id }) => {
    const res = await instanseAxios.delete(`/categories/delete/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  },
  editCategory: async ({ id, name, iconId }) => {
    const res = await instanseAxios.post(
      `/categories/edit`,
      { id, name, iconId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return res.data;
  },
  addCost: async ({ sum, category, date, costsId, comment }) => {
    const res = await instanseAxios.post(
      "/costs/add",
      { sum, category, date, costsId, comment },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return res.data;
  },
  deleteCost: async ({ userId, costId }) => {
    const res = await instanseAxios.delete(
      `/costs/delete?userId=${userId}&costId=${costId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return res.data;
  },
};

export default costsApi;
