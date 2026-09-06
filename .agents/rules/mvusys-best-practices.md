# mvusys Best Practices & Guardrails

This file contains critical project-specific rules, security guardrails, and development workflows for the `mvusys` project.

## 1. Security & Secrets Management (CRITICAL)
- **Never commit secrets:** Never hardcode sensitive keys (e.g., `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`) in tracked files like `docker-compose.yml`. Always use `.env` files and ensure they are listed in `.gitignore`.
- **Scrub Public Documentation:** When generating or reviewing files meant for public display (like `README.md`), always remove or redact:
  - Internal IP addresses (e.g., `192.168.x.x`).
  - Absolute server paths containing local usernames (e.g., `/home/iamvj/...`).
  - Specific internal domains unless explicitly instructed otherwise. Use placeholders like `yourdomain.com`.
- **Data Privacy & Source Code Scrubbing:** NEVER hardcode real personal identifiers (e.g., real names, real student/staff emails like `@mvu.ac.th`) or testing passwords (e.g., `admin1234`) directly into the source code (`.tsx`, `.js`, etc.).
- **Use Generic Placeholders:** When creating mock data or preset users for UI testing, ALWAYS use generic placeholders such as:
  - Names: `ผู้ดูแลระบบ (Admin)`, `John Doe`
  - Emails: `admin@yourdomain.ac.th`, `user@example.com`
  - Passwords: `your_secure_password` or rely on `process.env` variables.

## 2. Docker Workflow (Project Specific)
- **Frontend Container Rebuilds:** In this project, the `mvusys-frontend` container in `docker-compose.yml` is built as a static Nginx image without volume mounting. Therefore, whenever frontend React code is modified, you **must** manually rebuild the container using `docker compose up -d --build frontend` for the changes to take effect.

## 3. Backend Robustness
- **Safe String Methods:** When querying, filtering, or mapping data from the database, always use optional chaining (e.g., `field?.toLowerCase()`) before calling string methods. This prevents `TypeError: Cannot read properties of undefined` crashes caused by empty or null fields (like `owner` or `assignee`).

## 4. Frontend UX Best Practices
- **Password Manager Compatibility:** When building authentication forms, always include:
  - `id` attributes matching the input types.
  - `autoComplete="username"` (or `"email"`) for the identity field.
  - `autoComplete="current-password"` for the password field.

## 5. Responsive Design & UI (Tailwind CSS)
- **Mobile-First Approach:** Always use mobile-first Tailwind classes. Define the base style for small screens first, then use `sm:`, `md:`, `lg:` breakpoints for larger screens (e.g., `flex-col sm:flex-row`, `p-4 sm:p-6`).
- **Navigation & Layouts:** Use Hamburger menus and off-canvas drawers (`fixed inset-0`) with backdrops for sidebars on mobile devices (`md:hidden`). Maintain static block layouts for desktop (`md:block`).
- **Data Grids & Tables:** Always wrap tables in a container with `overflow-x-auto` to prevent horizontal overflow and breaking the page width on small screens.
- **Modals & Overlays:** Ensure modals have a maximum width and height constraint (e.g., `w-full max-w-2xl max-h-[90vh] overflow-y-auto`) and include sufficient padding on the parent container (e.g., `p-4`) so they don't touch the screen edges on mobile.
