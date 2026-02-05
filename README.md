## Task Manager – React + Django (Production-Ready Skeleton)

Clean, mobile-first Task Manager built with **React (Vite) + Tailwind CSS** on the frontend and **Django + Django REST Framework** on the backend.

Users can:
- **Add** a task
- **View** all tasks
- **Toggle** task completion
- **Delete** tasks

The UI is neutral, accessible, and keyboard-friendly with loading skeletons and optimistic updates for toggle/delete.

---

### Tech stack

- **Frontend**
  - React 18 (Vite)
  - JavaScript (JSX)
  - Tailwind CSS
- **Backend**
  - Python 3.10+
  - Django 5
  - Django REST Framework
  - django-cors-headers
- **Database**
  - SQLite (local development)

---

### Folder structure

**Backend (`backend/`)**
- `backend/settings.py` – Django config (REST framework, CORS, env-based settings)
- `backend/urls.py` – includes `tasks` API under `/api/`
- `tasks/models.py` – `Task` model (`title`, `completed`, `created_at`)
- `tasks/serializers.py` – DRF `TaskSerializer`
- `tasks/views.py` – DRF generic views for list/create + retrieve/update/delete
- `tasks/urls.py` – API routes
- `tasks/migrations/` – database migrations
- `requirements.txt` – backend dependencies

**Frontend (`frontend/`)**
- `src/main.jsx` – Vite entry
- `src/App.jsx` – main app shell, state management, optimistic updates
- `src/api.js` – centralized API client (`getTasks`, `createTask`, `updateTask`, `deleteTask`)
- `src/index.css` – Tailwind base + small global tweaks
- `src/components/`
  - `TaskInput.jsx` – new-task input form
  - `TaskList.jsx` – list, loading skeleton, empty state
  - `TaskItem.jsx` – individual task row
- `tailwind.config.js`, `postcss.config.js`, `vite.config.ts`, `package.json`

---

### API contract

Base URL (local): `http://localhost:8000/api`

- `GET    /api/tasks/` – list all tasks (newest first)
- `POST   /api/tasks/` – create a task  
  - Body: `{ "title": "My task title" }`
- `PATCH  /api/tasks/:id/` – update/toggle task  
  - Example body: `{ "completed": true }`
- `DELETE /api/tasks/:id/` – delete task

All responses are JSON.

---

### Environment variables

#### Backend (`backend/.env` – create from this example)

```env
DJANGO_SECRET_KEY=change-me
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

**Note:** You should create `backend/.env.example` with the same keys when sharing this repo.

#### Frontend (`frontend/.env` – optional in local dev)

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

For production, point this to your deployed backend, e.g.:

```env
VITE_API_BASE_URL=https://your-backend-host.com/api
```

---

### Backend – local setup

Requirements: **Python 3.10+**

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows

pip install -r requirements.txt

# create .env and fill env variables as in the README

python manage.py migrate
python manage.py runserver 8000
```

The API is now available at `http://localhost:8000/api/tasks/`.

---

### Frontend – local setup

Requirements: **Node.js (LTS)** and **npm**

```bash
cd frontend
npm install

# optional: create .env and override VITE_API_BASE_URL if your backend URL differs

npm run dev
```

The app runs at `http://localhost:5173` and will call the backend at `http://localhost:8000/api` by default.

---

### Deployment

#### Frontend (Netlify)

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Environment variables**:
  - `VITE_API_BASE_URL=https://your-backend-host.com/api`

> Netlify will serve the static assets from the `frontend/dist` folder and the app will talk to your deployed Django backend via `VITE_API_BASE_URL`.

#### Backend (Render / Railway / similar)

- **Build / install**:
  - `pip install -r requirements.txt`
- **Start command**:
  - `gunicorn backend.wsgi`
- **Environment variables**:
  - `DJANGO_SECRET_KEY=your-strong-secret`
  - `DJANGO_DEBUG=False`
  - `DJANGO_ALLOWED_HOSTS=your-backend-host.com`
  - `CORS_ALLOWED_ORIGINS=https://your-frontend-netlify-domain.netlify.app`

Also ensure:
- Static files and database (or external DB) are configured per platform’s docs.
- HTTPS is enabled via the hosting provider.

---

### UX & behavior notes

- **Mobile-first** max-width layout with a neutral, dark theme using Tailwind.
- Clear hierarchy: header → input bar → list/empty state.
- Completed tasks show **strike-through + reduced opacity**.
- Smooth transitions via Tailwind classes for hover/focus states.
- Keyboard accessible: form uses `<form>` + `<button>`, task items are buttons for toggle, delete buttons have `aria-label`s.
- **Loading state**: skeleton rows (no spinners) while the initial list loads.
- **Empty state**: friendly copy when there are no tasks.
- **Error state**: non-blocking error banner in the task card.
- **Optimistic UI** for toggle and delete:
  - Toggle: immediately flips completion, reverts on error.
  - Delete: removes from the list immediately, restores on error.

---

### Assumptions

- Single-user, no authentication required.
- SQLite is sufficient for local and demo environments.
- CORS is permissive in local development; in production you should set explicit origins via `CORS_ALLOWED_ORIGINS`.
<<<<<<< HEAD
# Task_Manager
A mobile-friendly Task Manager built with React, Tailwind CSS, and Django REST Framework.
=======
## Task Manager – React + Django (Production-Ready Skeleton)

Clean, mobile-first Task Manager built with **React (Vite) + Tailwind CSS** on the frontend and **Django + Django REST Framework** on the backend.

Users can:
- **Add** a task
- **View** all tasks
- **Toggle** task completion
- **Delete** tasks

The UI is neutral, accessible, and keyboard-friendly with loading skeletons and optimistic updates for toggle/delete.

---

### Tech stack

- **Frontend**
  - React 18 (Vite)
  - JavaScript (JSX)
  - Tailwind CSS
- **Backend**
  - Python 3.10+
  - Django 5
  - Django REST Framework
  - django-cors-headers
- **Database**
  - SQLite (local development)

---

### Folder structure

**Backend (`backend/`)**
- `backend/settings.py` – Django config (REST framework, CORS, env-based settings)
- `backend/urls.py` – includes `tasks` API under `/api/`
- `tasks/models.py` – `Task` model (`title`, `completed`, `created_at`)
- `tasks/serializers.py` – DRF `TaskSerializer`
- `tasks/views.py` – DRF generic views for list/create + retrieve/update/delete
- `tasks/urls.py` – API routes
- `tasks/migrations/` – database migrations
- `requirements.txt` – backend dependencies

**Frontend (`frontend/`)**
- `src/main.jsx` – Vite entry
- `src/App.jsx` – main app shell, state management, optimistic updates
- `src/api.js` – centralized API client (`getTasks`, `createTask`, `updateTask`, `deleteTask`)
- `src/index.css` – Tailwind base + small global tweaks
- `src/components/`
  - `TaskInput.jsx` – new-task input form
  - `TaskList.jsx` – list, loading skeleton, empty state
  - `TaskItem.jsx` – individual task row
- `tailwind.config.js`, `postcss.config.cjs`, `vite.config.ts`, `package.json`

---

### API contract

Base URL (local): `http://localhost:8000/api`

- `GET    /api/tasks/` – list all tasks (newest first)
- `POST   /api/tasks/` – create a task  
  - Body: `{ "title": "My task title" }`
- `PATCH  /api/tasks/:id/` – update/toggle task  
  - Example body: `{ "completed": true }`
- `DELETE /api/tasks/:id/` – delete task

All responses are JSON.

---

### Environment variables

#### Backend (`backend/.env` – create from this example)

```env
DJANGO_SECRET_KEY=change-me
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

**Note:** This repo cannot auto-create `backend/.env.example` in this environment, but you should create that file with the exact contents above when preparing your own repo.

#### Frontend (`frontend/.env` – optional in local dev)

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

For production, point this to your deployed backend, e.g.:

```env
VITE_API_BASE_URL=https://your-backend-host.com/api
```

---

### Backend – local setup

Requirements: **Python 3.10+**

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows

pip install -r requirements.txt

# (optional) copy env example
# create .env and fill env variables as in the README

python manage.py migrate
python manage.py runserver 8000
```

The API is now available at `http://localhost:8000/api/tasks/`.

---

### Frontend – local setup

Requirements: **Node.js (LTS)** and **npm**

```bash
cd frontend
npm install

# optional: create .env and override VITE_API_BASE_URL if your backend URL differs

npm run dev
```

The app runs at `http://localhost:5173` and will call the backend at `http://localhost:8000/api` by default.

---

### Deployment

#### Frontend (Netlify)

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Environment variables**:
  - `VITE_API_BASE_URL=https://your-backend-host.com/api`

> Netlify will serve the static assets from the `frontend/dist` folder and the app will talk to your deployed Django backend via `VITE_API_BASE_URL`.

#### Backend (Render / Railway / similar)

- **Build / install**:
  - `pip install -r requirements.txt`
- **Start command**:
  - `gunicorn backend.wsgi`
- **Environment variables**:
  - `DJANGO_SECRET_KEY=your-strong-secret`
  - `DJANGO_DEBUG=False`
  - `DJANGO_ALLOWED_HOSTS=your-backend-host.com`
  - `CORS_ALLOWED_ORIGINS=https://your-frontend-netlify-domain.netlify.app`

Also ensure:
- Static files and database (or external DB) are configured per platform’s docs.
- HTTPS is enabled via the hosting provider.

---

### UX & behavior notes

- **Mobile-first** max-width layout with a neutral, dark theme using Tailwind.
- Clear hierarchy: header → input bar → list/empty state.
- Completed tasks show **strike-through + reduced opacity**.
- Smooth transitions via Tailwind classes for hover/focus states.
- Keyboard accessible: form uses `<form>` + `<button>`, task items are buttons for toggle, delete buttons have `aria-label`s.
- **Loading state**: skeleton rows (no spinners) while the initial list loads.
- **Empty state**: friendly copy when there are no tasks.
- **Error state**: non-blocking error banner in the task card.
- **Optimistic UI** for toggle and delete:
  - Toggle: immediately flips completion, reverts on error.
  - Delete: removes from the list immediately, restores on error.

---

### Assumptions

- Single-user, no authentication required.
- SQLite is sufficient for local and demo environments.
- CORS is permissive in local development; in production you should set explicit origins via `CORS_ALLOWED_ORIGINS`.

>>>>>>> edf7b5f (docs: add project README)
