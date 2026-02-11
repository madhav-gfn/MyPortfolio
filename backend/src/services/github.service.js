/**
 * GitHub Service
 * Handles all GitHub API interactions using Personal Access Token
 */

/**
 * Fetch all repositories from a GitHub user that have the 'portfolio' topic
 * @param {string} username - GitHub username
 * @param {string} pat - GitHub Personal Access Token
 * @returns {Promise<Array>} Array of portfolio repositories
 */
export const fetchPortfolioRepos = async (username, pat) => {
    const headers = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
    };

    // Add PAT if available (increases rate limit from 60 to 5000 requests/hour)
    if (pat) {
        headers.Authorization = `Bearer ${pat}`;
    }

    // Fetch all repos for the user
    const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        { headers }
    );

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    // Filter repos that have 'portfolio' topic
    const portfolioRepos = repos.filter(
        (repo) => repo.topics && repo.topics.includes('portfolio')
    );

    return portfolioRepos;
};

/**
 * Fetch detailed information about a specific repository
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} pat - GitHub Personal Access Token
 * @returns {Promise<Object>} Repository details
 */
export const fetchRepoDetails = async (owner, repo, pat) => {
    const headers = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
    };

    if (pat) {
        headers.Authorization = `Bearer ${pat}`;
    }

    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
        { headers }
    );

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `GitHub API error: ${response.status}`);
    }

    return response.json();
};

/**
 * Fetch README content for a repository (for images/description)
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} pat - GitHub Personal Access Token
 * @returns {Promise<string|null>} README content or null if not found
 */
export const fetchRepoReadme = async (owner, repo, pat) => {
    const headers = {
        Accept: 'application/vnd.github.raw+json',
        'X-GitHub-Api-Version': '2022-11-28',
    };

    if (pat) {
        headers.Authorization = `Bearer ${pat}`;
    }

    try {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/readme`,
            { headers }
        );

        if (!response.ok) {
            return null;
        }

        return response.text();
    } catch {
        return null;
    }
};

/**
 * Extract first image URL from README content
 * @param {string} readmeContent - Raw README markdown content
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @returns {string|null} First image URL or null
 */
export const extractImageFromReadme = (readmeContent, owner, repo) => {
    if (!readmeContent) return null;

    // Match markdown image syntax: ![alt](url)
    const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
    // Match HTML img tags: <img src="url" />
    const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/i;

    let imageUrl = null;

    // Try markdown syntax first
    const markdownMatch = readmeContent.match(markdownImageRegex);
    if (markdownMatch && markdownMatch[1]) {
        imageUrl = markdownMatch[1];
    }

    // Try HTML syntax if markdown didn't work
    if (!imageUrl) {
        const htmlMatch = readmeContent.match(htmlImageRegex);
        if (htmlMatch && htmlMatch[1]) {
            imageUrl = htmlMatch[1];
        }
    }

    // If it's a relative path, convert to raw GitHub URL
    if (imageUrl && !imageUrl.startsWith('http')) {
        // Remove leading ./ or /
        imageUrl = imageUrl.replace(/^\.?\//, '');
        imageUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${imageUrl}`;
    }

    return imageUrl;
};

/**
 * Fetch portfolio projects with all details including images
 * @param {string} username - GitHub username
 * @param {string} pat - GitHub Personal Access Token
 * @returns {Promise<Array>} Array of formatted project objects
 */
export const fetchPortfolioProjects = async (username, pat) => {
    // Get all portfolio repos
    const repos = await fetchPortfolioRepos(username, pat);

    // Fetch additional details for each repo (README for images)
    const projectsWithDetails = await Promise.all(
        repos.map(async (repo) => {
            let imageUrl = null;

            // Try to get image from README
            const readme = await fetchRepoReadme(username, repo.name, pat);
            if (readme) {
                imageUrl = extractImageFromReadme(readme, username, repo.name);
            }

            // Fallback: Use Open Graph image from GitHub
            if (!imageUrl) {
                imageUrl = `https://opengraph.githubassets.com/1/${username}/${repo.name}`;
            }

            return {
                id: repo.id,
                name: repo.name,
                title: formatRepoName(repo.name),
                description: repo.description || 'No description provided.',
                topics: repo.topics || [],
                language: repo.language,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                githubUrl: repo.html_url,
                liveUrl: repo.homepage || null,
                imageUrl,
                createdAt: repo.created_at,
                updatedAt: repo.updated_at,
                pushedAt: repo.pushed_at,
            };
        })
    );

    return projectsWithDetails;
};

/**
 * Format repository name to a readable title
 * @param {string} name - Repository name (e.g., "my-awesome-project")
 * @returns {string} Formatted title (e.g., "My Awesome Project")
 */
const formatRepoName = (name) => {
    return name
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
};
