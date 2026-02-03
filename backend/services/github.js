const fetch = require('node-fetch');

const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_API_VERSION = '2022-11-28';
const GITHUB_ACCEPT_HEADER = 'application/vnd.github+json';

const getGithubHeaders = () => {
  const headers = {
    Accept: GITHUB_ACCEPT_HEADER,
    'X-GitHub-Api-Version': GITHUB_API_VERSION,
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const searchUserPortfolioRepos = async (username) => {
  if (!username) {
    throw new Error('GitHub username is required');
  }

  const query = `user:${username}+topic:portfolio`;
  const url = `${GITHUB_API_BASE_URL}/search/repositories?q=${encodeURIComponent(query)}&sort=updated&per_page=100`;

  const response = await fetch(url, {
    headers: getGithubHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data?.message || 'Failed to fetch GitHub repositories');
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return data;
};

module.exports = { searchUserPortfolioRepos };
