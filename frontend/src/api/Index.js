import axiosInstance from './axiosInstance';

// Projects API
export const projectsApi = {
  getAll: () => axiosInstance.get('/projects'),
  getById: (id) => axiosInstance.get(`/projects/${id}`),
  create: (data) => axiosInstance.post('/projects/add', data),
  update: (id, data) => axiosInstance.post(`/projects/update/${id}`, data),
  delete: (id) => axiosInstance.delete(`/projects/${id}`),
  importFromGithub: (data) => axiosInstance.post('/projects/import-github', data),
};

// Blogs API
export const blogsApi = {
  getAll: () => axiosInstance.get('/blogs'),
  getById: (id) => axiosInstance.get(`/blogs/${id}`),
  create: (data) => axiosInstance.post('/blogs/add', data),
  update: (id, data) => axiosInstance.post(`/blogs/update/${id}`, data),
  delete: (id) => axiosInstance.delete(`/blogs/${id}`),
};

// Contact API
export const contactApi = {
  getAll: () => axiosInstance.get('/contact'),
  getById: (id) => axiosInstance.get(`/contact/${id}`),
  create: (data) => axiosInstance.post('/contact/add', data),
  delete: (id) => axiosInstance.delete(`/contact/${id}`),
};


