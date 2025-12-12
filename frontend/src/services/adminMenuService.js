import api from "./apiClient";

const adminMenuService = {
  getByRestaurant: async (restaurantId) => {
    const res = await api.get(`/admin/menu/${restaurantId}`);
    return res.data;
  },

  create: async (restaurantId, data) => {
    const res = await api.post(`/admin/menu/${restaurantId}`, data);
    return res.data;
  },

  update: async (menuId, data) => {
    const res = await api.put(`/admin/menu/${menuId}`, data);
    return res.data;
  },

  remove: async (menuId) => {
    const res = await api.delete(`/admin/menu/${menuId}`);
    return res.data;
  },
};

export default adminMenuService;