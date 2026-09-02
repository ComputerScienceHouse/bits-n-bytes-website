# Bits 'n Bytes Website

The public website for Computer Science House's Bits 'n Bytes Project, built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build tool:** [Vite 7](https://vite.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)-style components built on [Radix UI](https://www.radix-ui.com/)
- **Auth:** [`@axa-fr/react-oidc`](https://github.com/AxaGuilDEv/react-oidc) (CSH SSO / OIDC)
- **Package manager:** [pnpm](https://pnpm.io/)
- **Linting/formatting:** ESLint + Prettier

## Prerequisites

- **Node.js 22**
- **pnpm**: install it via:
  ```bash
  npm install -g pnpm
  ```

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/ComputerScienceHouse/bits-n-bytes-website.git
   cd bits-n-bytes-website
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**

   This app authenticates against CSH's SSO/OIDC provider (`sso.csh.rit.edu`), which requires a client ID.
   - Reach out to a Bits 'n Bytes maintainer / CSH RTP to get valid OIDC client credentials for local development.
   - Vite only exposes environment variables prefixed with `VITE_` to client code. Place any local secrets in a `.env.local` file at the project root (PLEASE MAKE SURE THIS FILE IS GIT IGNORED!!!).

4. **Run the dev server**

   ```bash
   pnpm dev
   ```

   By default, Vite is configured (see `vite.config.ts`) to serve on **port 8080**, so the app should be available at:

   ```
   http://localhost:8080
   ```

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite dev server with hot module reloading |
| `pnpm build` | Type-check and build a production bundle to `dist/` |
| `pnpm build:dev` | Build in development mode (useful for debugging a production build) |
| `pnpm preview` | Locally preview the production build |
| `pnpm lint` | Run ESLint over the project |
| `pnpm format` | Format the codebase with Prettier |

## Running with Docker

A `Dockerfile` is included that builds the app and serves the static output with nginx:

```bash
docker build -t bits-n-bytes-website .
docker run -p 8080:8080 bits-n-bytes-website
```

Note the production image also runs a post-build step to copy the OIDC service worker files (`copy-service-worker-files.mjs`) into `dist/`, which is required for the silent-login/token-refresh flow to work correctly.

## Project Structure

```
.
├── src/                    # Application source code
|   ├──── assets/           # public assets (images, videos, etc.)
|   ├──── callbacks/        # used for auth process
|   ├──── components/       # reusable components
|   ├──── pages/            # where all individual page files are stored
|   ├──── configuration.ts  # config for the auth
|   ├──── UserInfo.ts       # handles CSH user account templates      
|   └──── styles.css        # global stylesheet for non-tailwind styling
├── index.html              # Vite entry HTML
├── vite.config.ts          # Vite configuration (dev server, aliases, plugins)
├── tsconfig.json           # TypeScript configuration
├── components.json         # shadcn/ui component configuration
├── eslint.config.js        # ESLint configuration
├── .prettierrc             # Prettier configuration
├── Dockerfile              # Production build/serve container
└── pnpm-workspace.yaml     # pnpm workspace configuration
```

## Contributing

1. Create a feature branch off `main`.
2. Make your changes, following the existing ESLint/Prettier configuration (`pnpm lint` and `pnpm format` before committing).
3. Open a pull request for review.