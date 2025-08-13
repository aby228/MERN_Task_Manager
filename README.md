## MERN Task Manager — Production-Ready, Authenticated CRUD

This is a full‑stack MERN application showcasing secure authentication, protected routes, and real‑world CRUD. It’s deliberately engineered with reliability and clarity in mind: httpOnly cookies for JWTs, input validation, rate limiting, structured logging, and a clean React client with route guards and context‑driven state.

### Highlights recruiters care about
- **Authentication done right**: Short‑lived JWT in an httpOnly cookie, validated on every request. No tokens in localStorage.
- **Secure by default**: Helmet, CORS with credentials, rate limiting, and server‑side validation using Joi.
- **Clean architecture**: Layered controllers, models, middleware, and validators; small focused React components with context for auth.
- **Observability**: Sentry on the client, Winston logging on the server.
- **DX / UX**: Toast feedback, route guards, and a minimal but friendly UI.

### Stack
- Client: React 18, `react-router-dom@7`, Context API, React Toastify, Sentry
- Server: Node.js, Express, Mongoose, Joi, Helmet, CORS, Rate‑Limit, Winston
- Database: MongoDB

### Quickstart
1) Server
```bash
cd server
cp .env.example .env  # create and fill secrets
pnpm i || npm i || yarn
npm run dev  # or: npm start
```

2) Client (in another terminal)
```bash
cd client
pnpm i || npm i || yarn
npm start
```

By default the client proxies API calls to `http://localhost:5000`.

### Environment
Server `.env` keys:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_task_manager
JWT_SECRET=super_secret_change_me
CLIENT_ORIGIN=http://localhost:3000
```

Client `.env` keys (optional):
```
REACT_APP_SENTRY_DSN=
```

### Architecture notes
- `server/app.js`: Express setup, security middleware, Mongo connection, routes, and centralized error handling.
- `server/controllers/*`: Request handlers (auth and tasks) with ownership checks and input validation.
- `server/middleware/*`: JWT protect middleware reads the token from an httpOnly cookie; error middleware serializes errors.
- `server/models/*`: Mongoose models with password hashing (User) and per‑user task ownership (Task).
- `client/src/context/AuthContext.js`: Loads profile on boot, exposes `login`, `register`, `logout` with axios configured to send cookies.
- `client/src/components/PrivateRoute.js`: Route guard that waits for auth state and redirects if unauthenticated.
- `client/src/App.js`: Route table and app shell (navbar + toast container).

### Security choices
- JWT stored in `httpOnly` cookie to mitigate XSS token theft; CSRF minimized via same‑site cookies and route design.
- Input validation with Joi; rate limiting to reduce brute‑force; password hashing with bcrypt.

### What I’d build next
- E2E tests (Playwright) covering auth flows and task CRUD.
- Role‑based access control and refresh token rotation.
- Optimistic UI updates and offline cache for tasks.


### License
MIT