# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Environment variables

Copy `frontend/.env.example` to `frontend/.env` and adjust the values as needed.

| Variable | Description | Example |
| --- | --- | --- |
| `VITE_PROJECTS_SOURCE` | Selects the projects data source. Use `backend` to load from the API or `github` to load directly from GitHub. Defaults to `backend` for any other value. | `backend` |
| `VITE_GITHUB_USERNAME` | GitHub username used when `VITE_PROJECTS_SOURCE=github`. | `octocat` |

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
