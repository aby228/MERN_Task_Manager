## MERN Task Manager (Secure, Authenticated CRUD)

This full‑stack project demonstrates production‑minded application design on the MERN stack: secure auth with httpOnly cookies, protected routes, input validation, rate limiting, and clean component architecture.

### Live Demo
- Client: [mern-task-manager-1-pil2.onrender.com](https://mern-task-manager-1-pil2.onrender.com)
- API: [mern-task-manager-1phx.onrender.com](https://mern-task-manager-1phx.onrender.com)

### Why this project stands out
- **Authentication done right**: Short‑lived JWT in an httpOnly cookie, verified on every request (no localStorage tokens).
- **Security posture**: Helmet, CORS with credentials, rate limiting, and Joi validation on inputs.
- **Clean architecture**: Controllers, models, middleware, validators on the backend; Context + route guards on the frontend.
- **Observability**: Sentry (client) and structured logging via Winston (server).
- **User experience**: Toast notifications, simple responsive UI.

### Tech Stack
- Client: React 18, `react-router-dom@7`, Context API, React Toastify, Sentry
- Server: Node.js, Express, Mongoose, Joi, Helmet, CORS, Rate‑Limit, Winston
- Database: MongoDB

### Local Development
1) API
```bash
cd server
cp .env.example .env   # add your secrets (see Environment)
npm install
npm run dev            # or: npm start
```

2) Client (separate terminal)
```bash
cd client
npm install
npm start
```

The client proxies API calls to `http://localhost:5000` in development.

### Environment
- Server `.env`
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_task_manager
JWT_SECRET=<your_generated_secret>
CLIENT_ORIGIN=http://localhost:3000
```
- Client `.env` (optional)
```
REACT_APP_SENTRY_DSN=
```

### Architecture
- `server/app.js`: Express setup, security middleware, Mongo connection, routes, and centralized error handling
- `server/controllers/*`: Request handlers (auth and tasks) with ownership checks and input validation
- `server/middleware/*`: JWT `protect` middleware (reads httpOnly cookie), error serialization
- `server/models/*`: Mongoose models (User with password hashing, Task with ownership)
- `client/src/context/AuthContext.js`: Loads profile on boot; `login`, `register`, `logout` with axios sending credentials
- `client/src/components/PrivateRoute.js`: Route guard; waits for auth to resolve and redirects if unauthenticated
- `client/src/App.js`: Route table and app shell (navbar + toast container)

### Deploying on Render
- API (Web Service)
  - Root Directory: `server`
  - Build: `npm ci` (or `npm install` if lockfile changes are pending)
  - Start: `npm start`
  - Environment: `MONGO_URI`, `JWT_SECRET`, `CLIENT_ORIGIN=https://<your-static-site>.onrender.com`, `NODE_ENV=production`
- Client (Static Site)
  - Root Directory: `client`
  - Build: `npm ci && npm run build`
  - Publish: `build`
  - Redirects/Rewrites (ensure order):
    - Source: `/api/*` → Destination: `https://<your-api>.onrender.com/api/:splat` → Action: Rewrite
    - Source: `/*` → Destination: `/index.html` → Action: Rewrite

### What’s next
- E2E tests (Playwright) for auth and CRUD flows
- Role‑based access control and refresh token rotation
- Optimistic UI updates and offline cache
