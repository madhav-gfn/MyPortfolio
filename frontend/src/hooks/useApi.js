import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi, blogsApi, contactApi } from '../api/Index';
import toast from 'react-hot-toast';

const projectsSource = import.meta.env.VITE_PROJECTS_SOURCE?.toLowerCase() || 'backend';
const githubUsername = import.meta.env.VITE_GITHUB_USERNAME;

const resolveProjectsSource = () => (projectsSource === 'github' ? 'github' : 'backend');

const fetchProjectsFromBackend = async () => {
  const response = await projectsApi.getAll();
  return response.data;
};

const fetchProjectsFromGithub = async () => {
  if (!githubUsername) {
    throw new Error('VITE_GITHUB_USERNAME is required when VITE_PROJECTS_SOURCE=github.');
  }

  const response = await fetch(
    `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to load GitHub projects.');
  }

  const repos = await response.json();
  return repos.map((repo) => ({
    _id: repo.id,
    title: repo.name,
    description: repo.description || 'No description provided.',
    techStack: repo.topics?.length ? repo.topics : repo.language ? [repo.language] : [],
    github: repo.html_url,
    liveDemo: repo.homepage || '',
  }));
};

const fetchProjectFromGithub = async (id) => {
  if (!githubUsername) {
    throw new Error('VITE_GITHUB_USERNAME is required when VITE_PROJECTS_SOURCE=github.');
  }

  const response = await fetch(`https://api.github.com/repositories/${id}`, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to load GitHub project.');
  }

  const repo = await response.json();
  return {
    _id: repo.id,
    title: repo.name,
    description: repo.description || 'No description provided.',
    techStack: repo.topics?.length ? repo.topics : repo.language ? [repo.language] : [],
    github: repo.html_url,
    liveDemo: repo.homepage || '',
  };
};

const getProjectsQueryFn = (source) =>
  source === 'github' ? fetchProjectsFromGithub : fetchProjectsFromBackend;

// Projects hooks
export const useProjects = () => {
  const source = resolveProjectsSource();

  return useQuery({
    queryKey: ['projects', source],
    queryFn: getProjectsQueryFn(source),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProject = (id) => {
  const source = resolveProjectsSource();

  return useQuery({
    queryKey: ['project', id, source],
    queryFn: async () =>
      source === 'github' ? fetchProjectFromGithub(id) : (await projectsApi.getById(id)).data,
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
