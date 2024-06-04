import axiosClient from "./axiosClient";

const BASE_URL = "/auth";

const authApi = {
  login: (account) => {
    const url = `${BASE_URL}/login`;
    return axiosClient.post(url, account);
  },

  refreshToken: (refreshToken) => {
    const url = `${BASE_URL}/refresh-token`;
    return axiosClient.post(url, { refreshToken });
  },

  signup: (account) => {
    const url = `${BASE_URL}/signup`;
    return axiosClient.post(url, account);
  },

  logout: () => {
    const url = `${BASE_URL}/logout`;
    return axiosClient.get(url);
  },
};

export default authApi;
