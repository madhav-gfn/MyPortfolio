const router = require('express').Router();
const { searchUserPortfolioRepos } = require('../services/github');

router.get('/search', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: 'GitHub username is required' });
  }

  try {
    const data = await searchUserPortfolioRepos(username);
    return res.json(data);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || 'Failed to fetch GitHub repositories',
      details: error.payload,
    });
  }
});

module.exports = router;
