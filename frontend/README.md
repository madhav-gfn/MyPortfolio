# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## GitHub Projects Feed

The Projects page pulls repositories directly from the GitHub REST API.

Set these optional environment variables in a `.env` file before running the frontend:

```
VITE_GITHUB_USERNAME=your-github-username
VITE_GITHUB_TOKEN=your-github-token
VITE_GITHUB_PROJECTS_TOPIC=portfolio
```

- `VITE_GITHUB_TOKEN` is optional but helps avoid rate limits.
- `VITE_GITHUB_PROJECTS_TOPIC` lets you filter repositories by a GitHub topic.
