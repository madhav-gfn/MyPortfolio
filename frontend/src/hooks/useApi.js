import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi, blogsApi, contactApi } from '../api/Index';
import toast from 'react-hot-toast';
import axiosInstance from '../api/axiosInstance';

// Projects hooks
export const useProjects = (options = {}) => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await projectsApi.getAll();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: options.enabled ?? true,
  });
};

export const useGithubPortfolioProjects = (username, options = {}) => {
  return useQuery({
    queryKey: ['github-projects', username],
    queryFn: async () => {
      const response = await axiosInstance.get('/github/search', {
        params: { username },
      });
      return response.data;
    },
    enabled: !!username && (options.enabled ?? true),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // 1 minute
    refetchIntervalInBackground: true,
  });
};

export const useProject = (id) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const response = await projectsApi.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

// Blogs hooks
export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await blogsApi.getAll();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useBlog = (id) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const response = await blogsApi.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

// Contact mutation
export const useContactForm = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (formData) => {
      const response = await contactApi.create(formData);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Message sent successfully! I\'ll get back to you soon.', {
        duration: 4000,
        icon: '✨',
      });
      queryClient.invalidateQueries(['contacts']);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || 
        'Failed to send message. Please try again.',
        { duration: 4000 }
      );
    },
  });
};
