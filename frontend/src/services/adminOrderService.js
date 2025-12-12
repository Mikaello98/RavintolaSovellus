import api from "./apiClient";

const adminOrderService = {
  getAll: async () => {
    const res = await api.get("/admin/orders");
    return res.data;
  },

  updateStatus: async (orderId, status) => {
    const res = await api.put(`/admin/orders/${orderId}`, { status });
    return res.data;
  },
};

export default adminOrderService;