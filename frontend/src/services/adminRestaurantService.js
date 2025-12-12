import api from "./apiClient";

const adminRestaurantService = {
  getAll: async () => {
    const res = await api.get("/admin/restaurants");
    return res.data;
  },

  create: async (data) => {
    const res = await api.post("/admin/restaurants", data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/admin/restaurants/${id}`, data);
    return res.data;
  },

  remove: async (id) => {
    const res = await api.delete(`/admin/restaurants/${id}`);
    return res.data;
  },
};

export default adminRestaurantService;