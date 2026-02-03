import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { blogs } from '../data/blogs';

const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'madhav-gfn';
const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
const githubTopicFilter = import.meta.env.VITE_GITHUB_PROJECTS_TOPIC || '';

const buildGithubHeaders = () => {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (githubToken) {
    headers.Authorization = `Bearer ${githubToken}`;
  }

  return headers;
};

const mapRepoToProject = (repo) => {
  const topics = Array.isArray(repo.topics) ? repo.topics : [];
  const techStack = topics.length > 0 ? topics : repo.language ? [repo.language] : [];

  return {
    id: repo.id,
    title: repo.name,
    description: repo.description || 'No description available.',
    techStack,
    github: repo.html_url,
    liveDemo: repo.homepage || '',
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    importedFromGithub: true,
  };
};

// Projects hooks
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`,
        { headers: buildGithubHeaders() }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch GitHub projects');
      }

      const repos = await response.json();
      const filtered = repos.filter((repo) => !repo.fork && !repo.archived);
      const topicFiltered = githubTopicFilter
        ? filtered.filter((repo) => (repo.topics || []).includes(githubTopicFilter))
        : filtered;

      return topicFiltered.map(mapRepoToProject);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProject = (id) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/repositories/${id}`,
        { headers: buildGithubHeaders() }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }

      const repo = await response.json();
      return mapRepoToProject(repo);
    },
    enabled: !!id,
  });
};

// Blogs hooks
export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      return blogs;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useBlog = (id) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      return blogs.find((blog) => blog.id === id);
    },
    enabled: !!id,
  });
};

// Contact mutation
export const useContactForm = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (formData) => {
      const { name, email, message } = formData;
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`Email: ${email}\n\n${message}`);
      window.location.href = `mailto:madmishra72@gmail.com?subject=${subject}&body=${body}`;
      return formData;
    },
    onSuccess: () => {
      toast.success('Your email client is ready to send the message!', {
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
