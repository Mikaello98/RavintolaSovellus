import api from "./apiClient";

const authService = {
  register: async (data) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  login: async (data) => {
    const res = await api.post("/auth/login", data);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getCurrentUser: () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  },
};

export default authService;