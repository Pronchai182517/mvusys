# mvusys Project Architecture & Development Rules

This document outlines the architectural blueprint, technology stack, and critical development guardrails for the **Mahaajiralongkorn Pali Theravada Rajavidyalaya Administration (mvusys)** project. All future development in this repository must adhere to these rules.

## 🏗️ 1. Architecture & Tech Stack Breakdown

### Frontend (`/frontend`)
- **Core Framework:** React 18 + Vite + TypeScript.
- **Styling & UI:** TailwindCSS, utilizing a strong "Glassmorphism" design system (e.g., `.glass-panel`, `.glass-card` classes) and a dark-mode aesthetic. 
- **Icons & Charts:** `lucide-react` for iconography and `recharts` for the Executive Dashboard data visualization.
- **Routing & State:** Custom minimal routing/state management (standard React state).
- **Build & Deployment:** Containerized via a multi-stage Docker build. The final image uses `nginx:alpine` to serve static assets (`dist` folder).

### Backend (`/backend`)
- **Core Framework:** Node.js + Express.js.
- **API Structure:** RESTful API with modular routes (`auth.js`, `aiAgent.js`, `dashboard.js`, `projects.js`, `tasks.js`, `resolutions.js`, `knowledge.js`).
- **Database Layer:** Integrates with **Supabase (PostgreSQL)** via `@supabase/supabase-js`. 
- **Failover Mechanism:** The backend utilizes a `mockData` object (`db/supabaseClient.js`) as an in-memory fallback/store alongside Supabase.

### Infrastructure & Operations
- **Docker Compose:** Manages both `backend` (port 5000) and `frontend` (port 3001 mapped to 80).
- **Networking:** Nginx in the frontend container acts as a Reverse Proxy, forwarding `/api/*` requests directly to the backend container.
- **External Access:** Designed to be exposed securely via Cloudflare Tunnels.

---

## 🛡️ 2. System Rules & Development Guardrails

### A. Frontend Development Rules
1. **Docker Static Build Awareness:** Because the frontend is served via Nginx (not a Vite dev server in Docker), any modification to React components (`.tsx`), styles (`.css`), or configuration requires running `docker compose up -d --build frontend` to recompile the static assets.
2. **UI Aesthetic Consistency:** All new components must adhere to the existing dark glassmorphism theme. Use `glass-panel`, `glass-card`, and Tailwind's `backdrop-blur-md`, `bg-slate-900/80` utility classes rather than standard solid backgrounds.
3. **API Communication:** All frontend requests must use the `/api` prefix (handled by the Nginx reverse proxy) and be centralized in `frontend/src/services/api.ts`. Do not hardcode `localhost:5000` in the frontend code.
4. **Password Manager Compatibility:** When building authentication forms, always include appropriate `id` attributes and `autoComplete` tags (e.g., `"username"`, `"current-password"`).

### B. Backend Development Rules
1. **Safe Database Operations:** When manipulating or searching data (especially in the `aiAgent.js` RAG implementation), **always use optional chaining (`?.`)** to prevent `TypeError: Cannot read properties of undefined` crashes when encountering missing fields (e.g., `owner`, `assignee`).
2. **Hybrid Data Sync:** When performing CRUD operations, developers must ensure updates are logically applied to both the database and the local `mockData` store if fallback synchronization is required.

### C. Security & Deployment Rules (CRITICAL)
1. **Zero-Hardcoded Secrets:** Never commit Supabase URLs, `ANON_KEY`, or `SERVICE_ROLE_KEY` to tracked files (like `docker-compose.yml` or `README.md`). All secrets must strictly reside in `.env` and `.env` must be in `.gitignore`.
2. **Public Documentation Sanitization:** Do not expose internal IP addresses (e.g., `192.168.1.57`), specific Cloudflare subdomains, or Linux user paths (`/home/iamvj/...`) in public-facing documentation.
