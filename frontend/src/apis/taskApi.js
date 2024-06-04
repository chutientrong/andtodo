import axiosClient from "./axiosClient";

const API_URL = "/task";

const tasksApi = {
  getTasks: () => {
    return axiosClient.get(`${API_URL}`);
  },
  getTask: (id) => {
    return axiosClient.get(`${API_URL}/${id}`);
  },

  addTask: ({ title, description, todoId }) => {
    return axiosClient.post(`${API_URL}`, { title, description, todoId });
  },

  deleteTask: (id) => {
    return axiosClient.delete(`${API_URL}/${id}`);
  },

  updateTask: ({ id, title, description }) => {
    return axiosClient.put(`${API_URL}/${id}`, {
        title, description
    });
  },
  updateStage: ({ tasks }) => {
    return axiosClient.post(`${API_URL}/stage`, {
        tasks
    });
  },
};

export default tasksApi;
