# Carbon Wallet — Reward Climate Action. Automatically.

A modern, production-ready web application that helps organizations measure, verify, and reward real climate-positive behaviors without self-reporting. Built with a standards-aligned MRV (Measurement, Reporting, and Verification) engine, a sleek React frontend, and a FastAPI backend backed by MongoDB.

- Live UX focuses on clarity, speed, and accessibility.
- IP-safe design: custom inline illustrations and diagrams (no third-party images).
- Built-in lead capture stored in MongoDB.
- SEO-ready with JSON-LD for Organization and FAQ.


## Table of Contents
- Product Overview
- Architecture & Tech Stack
- Project Structure
- Environment & URLs (Critical)
- Setup & Running (Emergent environment and Local Dev)
- API Reference
- Frontend Overview (Routes, Components, Styles)
- Data & Security Notes
- Design System (Palette, Typography, Motion)
- Testing & Debugging
- Roadmap
- License

---

## Product Overview
Carbon Wallet enables companies to turn climate goals into engaging results by:
- Connecting verified data sources (transit, utilities, HVAC, fleet) via secure, read-only integrations
- Automatically verifying CO₂ reductions using standards-aligned methodologies
- Issuing Carbon Points in real-time and enabling redemption in a curated marketplace

Key modules
- MRV Engine: cross-source validation, anomaly detection, standards mapping (ISO 14064-2, GHG Protocol)
- Rewards Orchestration: translate verified CO₂e into Carbon Points using dynamic parameters
- Reporting & Auditability: automated trails and exportable evidence bundles


## Architecture & Tech Stack
- Frontend: React 19, TailwindCSS, CRACO, React Router, Axios
- Backend: FastAPI, Motor (async Mongo), Pydantic v2
- Database: MongoDB
- Infra: Supervisor-managed processes (in the Emergent environment)


## Project Structure
```
/app/
├── backend/
│   ├── server.py               # FastAPI app + /api routes
│   ├── requirements.txt        # Python deps
│   └── .env                    # MONGO_URL, DB_NAME, CORS_ORIGINS
├── frontend/
│   ├── public/
│   │   └── index.html          # Inter font + Organization JSON-LD
│   ├── src/
│   │   ├── components/         # NavBar, Footer, BottomBar, LeadForm
│   │   ├── hooks/              # useReveal (IntersectionObserver)
│   │   ├── pages/              # Home, Solution, HowItWorks, WhoWeAre, FAQ, AdminLeads
│   │   ├── lib/                # api.js (axios client)
│   │   ├── App.js              # Router shell + layout
│   │   ├── index.css           # Tailwind + brand theme + animations
│   │   └── App.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env                    # REACT_APP_BACKEND_URL
└── README.md
```


## Environment & URLs (Critical)
- Frontend must use REACT_APP_BACKEND_URL for all API calls
- Backend must use MONGO_URL for database connection
- All backend API routes are prefixed with /api (Kubernetes ingress expectation)
- Backend binds to 0.0.0.0:8001 (handled by supervisor mapping in the environment)
- Do NOT hardcode URLs or ports in code

Protected variables
- frontend/.env: REACT_APP_BACKEND_URL (external URL in deployed env)
- backend/.env: MONGO_URL (local DB), DB_NAME, CORS_ORIGINS


## Setup & Running

### In Emergent (this environment)
Processes are already managed by Supervisor:
- Restart all: `sudo supervisorctl restart all`
- Restart backend: `sudo supervisorctl restart backend`
- Restart frontend: `sudo supervisorctl restart frontend`

Logs
- Backend: `tail -n 100 /var/log/supervisor/backend.err.log`
- Frontend: `tail -n 100 /var/log/supervisor/frontend.err.log`

### Local Development (optional)
Prereqs
- Node.js 18+ and Yarn 1.x
- Python 3.10+ and MongoDB running locally

Backend
```
cd backend
cp .env.example .env   # or create .env with MONGO_URL and DB_NAME
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Frontend
```
cd frontend
yarn
cp .env.example .env   # or ensure REACT_APP_BACKEND_URL points to backend base URL (no /api)
yarn start
```
Note: The frontend axios client automatically uses `${REACT_APP_BACKEND_URL}/api`.


## API Reference
Base: `${REACT_APP_BACKEND_URL}/api`

Health
- GET `/` → { message: "Hello World" }

Status checks (internal/demo)
- POST `/status` body: { client_name: string } → persisted with UUID and timestamp
- GET `/status` → list[StatusCheck]

Leads
- POST `/leads`
  - body: { name, email, company?, phone?, country?, industry?, company_size?, team_size?, timeline?, interests?: string[], message?, source?, consent?: bool }
  - returns: Lead { id: uuid, created_at: iso, ...fields }
- GET `/leads` → list[Lead] (sorted by created_at desc)

Notes
- All returned IDs are UUID strings; Mongo `_id` is not exposed.

Curl examples
```
curl -sS ${BACKEND}/api/

curl -sS -X POST ${BACKEND}/api/leads \
  -H 'Content-Type: application/json' \
  -d '{"name":"Alice","email":"alice@example.com","company":"RetailCo"}'

curl -sS ${BACKEND}/api/leads
```


## Frontend Overview
Routes
- `/` Home: hero, value props, CTA with lead form
- `/solution` Solution: pillars, animated MRV pipeline, verification workflows, roadmap timeline
- `/how-it-works` How It Works: 4-step process, verification/rewards graphic, system details, demo cards
- `/who-we-are` Who We Are: team bios (Umer, Musa), values, vision
- `/faq` FAQ: common questions; emits FAQPage JSON-LD for SEO
- `/admin/leads` Admin Leads: temporary internal table (add auth later)

Shared components
- NavBar (sticky), Footer, BottomBar (compact cookie/CTA bar), LeadForm (posts to `/api/leads`)

UX details
- Inter font, subtle reveal-on-scroll (IntersectionObserver)
- IP-safe inline SVG illustrations/diagrams
- All interactive/critical elements tagged with `data-testid`


## Data & Security Notes
- DB: MongoDB (collections: `leads`, `status_checks`)
- Models: Pydantic v2, UUID ids for JSON safety
- CORS: configured via backend/.env `CORS_ORIGINS`
- Privacy: consent captured on lead form (boolean); minimize PII
- Transport security depends on deployment; ensure TLS termination at ingress


## Design System
Palette (from brand palette)
- Forest Ink: `#0B3B2E` (primary dark)
- Action Green: `#1E7A4F` (CTA)
- Leaf: `#2FBF71` (accent)
- Sea Teal: `#0E7480` (accent 2)
- Graphite: `#1F2937` (base text)
- Mist: `#F4F7F6` (section bg)

Typography
- Inter (Google Fonts) — fast, legible, system-friendly fallbacks

Motion
- `.reveal` + IntersectionObserver for smooth fade/slide
- Lightweight SVG animations (animated attributes) for diagrams and badges


## Testing & Debugging
Backend
- Use curl examples above
- Logs: `/var/log/supervisor/backend.err.log`

Frontend
- Verify navigation and `data-testid` attributes for automated testing
- Logs: `/var/log/supervisor/frontend.err.log`

Linting (optional)
- JS/TS: `npx eslint frontend/src` (ESLint already in devDependencies)
- Python: `flake8 backend` or `black backend`


## Roadmap
- AuthN/AuthZ and protected admin dashboard
- Visual analytics for organization programs
- Partner integrations library and marketplace management
- Advanced animations and micro-interactions
- Expanded JSON-LD (Organization, WebSite, BreadcrumbList) and Open Graph meta


## License
© 2025 Carbon Wallet. All rights reserved.
