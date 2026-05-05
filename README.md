# Debugra

A professional, real-time collaborative code editor for developers and CS students. Built with a VS Code-inspired UI, AI-powered debugging, multi-language code execution, and an industry-level component architecture.

---

## Features

- **VS Code-Like UI** — Professional dark-mode interface with status bar, tab bar, and keyboard shortcuts (`Ctrl+Enter` to run)
- **Multi-Language Execution** — Run 18+ languages (Python, Java, C++, JavaScript, Go, Rust, SQLite and more) powered by the Wandbox API — permanently free
- **Monaco Editor** — Syntax highlighting, autocomplete, bracket matching, snippets, and code formatting
- **AI Time-Travel Debugger** — Step-by-step execution visualization, error explanations, one-click fixes, logic breakdown, and test case generation (Groq `llama-3.3-70b-versatile`)
- **Real-Time Collaboration** — Create rooms, share a Room ID, and code together with live Firebase sync
- **Access Control & Presence** — Author-managed edit permissions with request/approve/deny/revoke flow, displaying real user names
- **Live User Tracking** — Clickable status bar showing all connected members with a dropdown list
- **Team Chat** — In-editor real-time messaging for collaborators
- **Saved Code History** — Authenticated users can save code to Firestore and reload it anytime
- **User Input (stdin)** — Auto-detects input functions and syncs stdin across all room members
- **Clean & Aesthetic UI** — Minimalist design system using geometric symbols (`✦`, `⟡`) and language badges (`PY`, `JS`, `C++`) instead of generic emojis
- **Mobile Responsive** — Bootstrap-powered responsive layout with a dedicated mobile bottom navigation bar
- **SQLite (SQL)** — SQL execution uses SQLite 3.46.1 via Wandbox — no `CREATE DATABASE` needed

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Monaco Editor |
| Styling | Vanilla CSS + Bootstrap 5 (dark VS Code theme) |
| Auth & Database | Firebase Auth, Cloud Firestore |
| Code Execution | Wandbox API (free, serverless) |
| AI Features | Groq SDK — `llama-3.3-70b-versatile` + node-cache |
| Backend | Express.js (Node.js) with Rate Limiting & Helmet |
| Icons | Bootstrap Icons |

---

## Architecture

Debugra follows an **industry-level** component architecture — business logic is fully decoupled from UI through custom React hooks.

### Custom Hooks (`src/hooks/`)

| Hook | Responsibility |
|---|---|
| `useEditor` | Code, language, font size, stdin, save to cloud, download |
| `useExecution` | Run code via Wandbox, stdout/stderr, execution timing |
| `useAI` | Fix, Explain, Visualize, Generate Tests via Groq |
| `useRoom` | Firebase room sync, create/join, access control, presence |
| `useIsMobile` | Reactive viewport detection for responsive layout |

### Project Structure

```
debugra/
├── src/
│   ├── config/
│   │   └── constants.js          # All app-wide constants (breakpoints, defaults, enums)
│   ├── hooks/
│   │   ├── index.js              # Barrel export for all hooks
│   │   ├── useEditor.js          # Local editor state
│   │   ├── useExecution.js       # Code execution logic
│   │   ├── useAI.js              # Groq AI features
│   │   ├── useRoom.js            # Firebase room & collaboration
│   │   └── useIsMobile.js        # Responsive viewport hook
│   ├── components/
│   │   ├── Auth/                 # Login/Signup modal
│   │   ├── Chat/                 # Team chat panel
│   │   ├── Editor/
│   │   │   ├── EditorPage.jsx            # Orchestrator (~250 lines)
│   │   │   ├── AIResponsePanel.jsx       # AI output renderer
│   │   │   ├── CollaborationControls.jsx # Room access control UI
│   │   │   ├── EditorStatusBar.jsx       # VS Code-style status bar
│   │   │   ├── MobileBottomNav.jsx       # Mobile tab navigation
│   │   │   └── HistoryPanel.jsx          # Saved code history sidebar
│   │   ├── Landing/              # Landing page
│   │   ├── Output/               # Visualization panel
│   │   └── Problem/              # Problem description panel
│   ├── services/
│   │   ├── api.js                # Axios instance with interceptors + all API calls
│   │   └── firebase.js           # Firebase config
│   ├── utils/
│   │   ├── languageConfig.js     # Language templates and Monaco mappings
│   │   └── snippetsConfig.js     # Monaco code snippet definitions
│   ├── App.jsx
│   └── index.css                 # Global design system tokens + responsive styles
├── server/                       # Backend (Express.js)
│   ├── routes/
│   │   ├── execute.js            # /api/execute — Wandbox code execution
│   │   └── ai.js                 # /api/ai/* — Groq AI endpoints
│   ├── services/
│   │   └── judge0Service.js      # Wandbox API wrapper
│   ├── middleware/
│   │   └── errorHandler.js
│   └── server.js
├── index.html
├── package.json
└── vite.config.js
```

---

## Local Development

### Prerequisites

- Node.js 18+
- A Firebase project (Auth + Firestore enabled)
- A Groq API key (free at [console.groq.com](https://console.groq.com))

### 1. Clone the repo

```bash
git clone https://github.com/omkhandare55/Debugra.git
cd Debugra
```

### 2. Install dependencies

```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

### 3. Configure environment variables

**Frontend** — create `.env` in root:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:3001
```

**Backend** — create `.env` in `server/`:

```env
PORT=3001
CLIENT_URL=http://localhost:5173
GROQ_API_KEY=your_groq_api_key
```

### 4. Start development servers

```bash
# Terminal 1 — Frontend
npm run dev

# Terminal 2 — Backend
cd server
npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:3001`.

---

## Deployment

### Frontend — Vercel

1. Push code to GitHub.
2. Import the repository at [vercel.com](https://vercel.com) — Vite is auto-detected.
3. Add all `VITE_*` environment variables in the Vercel dashboard.
4. Set `VITE_API_URL` to your Cloud Run backend URL.
5. Click **Deploy**.

### Backend — Google Cloud Run

```bash
cd server

gcloud run deploy debugra-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "GROQ_API_KEY=your_key,CLIENT_URL=https://your-app.vercel.app"
```

After deploying, update your frontend `.env`:

```env
VITE_API_URL=https://debugra-api-xxxxx-uc.a.run.app
```

---

## Supported Languages

Python, JavaScript, TypeScript, Java, C++, C, C#, Go, Rust, Ruby, PHP, Swift, Perl, Lua, Scala, Haskell, SQLite (SQL), Bash

> **SQL Note:** The execution engine uses SQLite 3.46.1. Statements like `CREATE DATABASE` are not supported — begin directly with `CREATE TABLE`.

---

## Design Principles

- **Aesthetic** — No generic emojis. Geometric symbols (`✦`, `⟡`) and text badges (`PY`, `JS`) maintain a premium developer aesthetic.
- **Separation of Concerns** — All business logic lives in custom hooks, not inside components.
- **Single Source of Truth** — All constants (breakpoints, defaults, enums) in `src/config/constants.js`.
- **Mobile-First** — Bootstrap 5 grid + dedicated `MobileBottomNav` for seamless mobile experience.
- **Centralized API** — All HTTP calls go through a single Axios instance with error interceptors.

---

## Team

Built for **Hackathon SVKM 2026** — Debugra Team
