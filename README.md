# Carbon Wallet
Reward climate action. Automatically.

A sleek, standards-aligned web app to measure real climate-positive behaviors (no self‑reporting), verify them with an MRV engine, and instantly reward users.

— Built with React + Tailwind (frontend), FastAPI + MongoDB (backend)


## TL;DR (60 seconds)
- Frontend URL env: `frontend/.env` → `REACT_APP_BACKEND_URL` (already set in this environment)
- Backend runs at 0.0.0.0:8001 with all API routes under `/api`
- Lead form writes to MongoDB
- Admin leads page is protected with JWT
- Admin login: `admin / carbonwallet`

Useful commands (Emergent environment):
- Restart services: `sudo supervisorctl restart all`
- Backend logs: `tail -n 100 /var/log/supervisor/backend.err.log`
- Frontend logs: `tail -n 100 /var/log/supervisor/frontend.err.log`


## What you get
- Zero self-reporting MRV narratives, verification workflows, and reward orchestration content
- Modern UI with brand palette, accessible animations (reduced‑motion aware)
- SEO JSON‑LD for Organization + FAQ
- Secure admin area to review leads


## Architecture (at a glance)
- Frontend: React 19, TailwindCSS, React Router, CRACO, Axios, Framer Motion
- Backend: FastAPI, Motor (async Mongo), Pydantic v2, python‑jose (JWT)
- Database: MongoDB
- Processes: Managed by Supervisor in this environment

Key rules
- Frontend must call the backend using `REACT_APP_BACKEND_URL`
- All backend routes are prefixed with `/api`
- Backend uses `MONGO_URL` and `DB_NAME` from `backend/.env`


## Project layout
```
/app/
├── backend/
│   ├── server.py               # FastAPI app + /api endpoints
│   ├── requirements.txt        # Python deps
│   └── .env                    # MONGO_URL, DB_NAME, CORS_ORIGINS, ADMIN_*
├── frontend/
│   ├── public/
│   │   ├── index.html          # Inter font + Organization JSON-LD
│   │   └── logo.svg            # App logo (referenced by JSON-LD and navbar)
│   ├── src/
│   │   ├── components/         # NavBar, Footer, BottomBar, LeadForm, ProtectedRoute
│   │   ├── hooks/              # (Previously) useReveal; now Framer Motion used
│   │   ├── lib/                # api.js (axios client + auth header)
│   │   ├── pages/              # Home, Solution, HowItWorks, WhoWeAre, FAQ, AdminLeads, Login
│   │   ├── App.js              # Router + layout + Suspense/lazy
│   │   └── index.css           # Tailwind + brand theme + layout tweaks
│   └── package.json
└── README.md
```


## Run & operate (Emergent environment)
- Restart services after env changes: `sudo supervisorctl restart backend` or `sudo supervisorctl restart all`
- View logs:
  - Backend: `/var/log/supervisor/backend.err.log`
  - Frontend: `/var/log/supervisor/frontend.err.log`
- Hot reload is enabled for code changes; restarts needed only after installing deps or editing `.env`


## Local development (optional)
Prereqs: Node 18+, Yarn 1.x; Python 3.10+, running MongoDB

Backend
```
cd backend
python -m venv .venv && source .venv/bin/activate
cp .env.example .env  # or create with MONGO_URL, DB_NAME, CORS_ORIGINS, ADMIN_*
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Frontend
```
cd frontend
yarn
cp .env.example .env  # ensure REACT_APP_BACKEND_URL points to your backend base URL
yarn start
```


## Features by page
- Home `/`: Hero, value props, and lead capture
- Solution `/solution`: Product pillars, verification workflows (highlight cards), roadmap (card grid)
- How It Works `/how-it-works`: 4-step flow, verification/reward diagram, system details
- Who We Are `/who-we-are`: Team bios (Umer, Musa), values, vision
- FAQ `/faq`: Common questions + JSON‑LD (FAQPage)
- Admin Leads `/admin/leads`: Protected table view (pagination‑ready)


## API quick reference
Base: `${REACT_APP_BACKEND_URL}/api`

Auth
- POST `/auth/login` (form encoded)
  - body: `username=...&password=...&grant_type=password`
  - returns: `{ access_token, token_type }`

Leads
- POST `/leads` → 201 Created
  - body (JSON):
    `{ name, email, company?, phone?, country?, industry?, company_size?, team_size?, timeline?, interests?: string[], message?, source?, consent?: boolean }`
  - returns: Lead with UUID `id` and `created_at`
- GET `/leads?skip=0&limit=20` (JWT required)
  - header: `Authorization: Bearer <token>`
  - returns: `{ items: Lead[], total, skip, limit }`

Health / sample
- GET `/` → `{ message: "Hello World" }`

Curl examples
```
BACKEND="https://your-backend.example.com"

# Login
TOKEN=$(curl -sS -X POST "$BACKEND/api/auth/login" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=admin&password=carbonwallet&grant_type=password' | jq -r .access_token)

# Create a lead
curl -sS -X POST "$BACKEND/api/leads" -H 'Content-Type: application/json' \
  -d '{"name":"Alice","email":"alice@example.com"}'

# List leads (protected)
curl -sS "$BACKEND/api/leads?skip=0&limit=10" -H "Authorization: Bearer $TOKEN"
```


## Security
- JWT-based admin access using OAuth2 password flow
- Protected route: `GET /api/leads` requires bearer token
- Input validation with Pydantic; explicit error handling for validation and database exceptions
- CORS controlled via `backend/.env`


## Design system & UX
- Brand palette: Forest Ink (#0B3B2E), Action Green (#1E7A4F), Leaf (#2FBF71), Sea Teal (#0E7480), Graphite (#1F2937), Mist (#F4F7F6)
- Typography: Inter (Google Fonts)
- Motion: Framer Motion with `reducedMotion="user"` for accessibility
- IP‑safe visuals: custom inline graphics and badges (no third‑party brand assets)


## Troubleshooting
- 401 on `/api/leads`: Ensure you’re sending `Authorization: Bearer <token>` from `/api/auth/login`
- No data in Admin Leads: Submit a lead via home form first; confirm Mongo is reachable
- Frontend cannot reach backend: Check `frontend/.env` `REACT_APP_BACKEND_URL` and do not hardcode URLs in code
- CORS errors: Adjust `CORS_ORIGINS` in `backend/.env` then restart backend
- Blank page or slow load: animations are lightweight with lazy routes; ensure network ok, check console logs; services can be restarted via Supervisor


## Roadmap (short)
- Admin auth UX and role management
- Analytics dashboards (impact, engagement)
- Partner marketplace management
- Expanded JSON‑LD (WebSite, Breadcrumb) and OG meta


## License
© 2025 Carbon Wallet. All rights reserved.
