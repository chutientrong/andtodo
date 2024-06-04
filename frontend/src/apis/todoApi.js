import axiosClient from "./axiosClient";

const API_URL = "/todos";

const todosApi = {
  getTodos: () => {
    return axiosClient.get(`${API_URL}`);
  },
  getTodo: (id) => {
    return axiosClient.get(`${API_URL}/${id}`);
  },
  getTaskListById: (id) => {
    return axiosClient.get(`${API_URL}/${id}/task`);
  },

  addTodo: ({ title, description }) => {
    return axiosClient.post(`${API_URL}`, { title, description });
  },

  deleteTodo: (id) => {
    return axiosClient.delete(`${API_URL}/${id}`);
  },

  updateTodo: ({ id, title, description }) => {
    return axiosClient.put(`${API_URL}/${id}`, {
        title, description
    });
  },
};

export default todosApi;
