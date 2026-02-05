# Task Manager – React + Django (Production-Ready)

A clean, mobile-first Task Manager built with **React (Vite) + Tailwind CSS** on the frontend and **Django + Django REST Framework** on the backend.

## Live URLs

- Frontend (Netlify): https://task-manager-sanket.netlify.app/
- Backend API (Render): https://task-manager-p6ok.onrender.com/api

---

## Features

- Add new tasks
- View all tasks
- Mark tasks as completed
- Delete tasks with confirmation modal
- Toast notification on task completion
- Mobile-first responsive UI
- Optimistic UI updates
- Loading skeletons and empty states
- Keyboard-accessible controls

---

## Tech Stack

### Frontend
- React 18 (Vite)
- JavaScript (JSX)
- Tailwind CSS

### Backend
- Python 3.10+
- Django 5
- Django REST Framework
- django-cors-headers

### Database
- SQLite (suitable for assignment & demo)

---

## Folder Structure

### Backend (`backend/`)
```
backend/
├─ manage.py
├─ backend/
│  ├─ settings.py
│  ├─ urls.py
│  └─ wsgi.py
├─ tasks/
│  ├─ models.py
│  ├─ serializers.py
│  ├─ views.py
│  ├─ urls.py
│  └─ migrations/
└─ requirements.txt
```

### Frontend (`frontend/`)
```
frontend/
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ api.js
│  ├─ index.css
│  └─ components/
│     ├─ TaskInput.jsx
│     ├─ TaskList.jsx
│     └─ TaskItem.jsx
├─ tailwind.config.js
├─ vite.config.js
└─ package.json
```

---

## API Endpoints

Base URL (local): `http://localhost:8000/api`

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/tasks/` | List all tasks |
| POST | `/tasks/` | Create task |
| PATCH | `/tasks/:id/` | Toggle / update task |
| DELETE | `/tasks/:id/` | Delete task |

Example request body:
```json
{ "title": "My task" }
```

All responses are JSON.

---

## Environment Variables

### Backend (`backend/.env.example`)
```env
DJANGO_SECRET_KEY=change-me
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOW_ALL_ORIGINS=True
```

### Frontend (`frontend/.env.example`)
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Production example:
```env
VITE_API_BASE_URL=https://task-manager-p6ok.onrender.com/api
```

---

## Backend – Local Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

API runs at:
```
http://localhost:8000/api/tasks/
```

---

## Frontend – Local Setup

```bash
cd frontend
npm install
npm run dev
```

App runs at:
```
http://localhost:5173
```

---

## Deployment

### Frontend (Netlify)
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable:
```env
VITE_API_BASE_URL=https://task-manager-p6ok.onrender.com/api
```

### Backend (Render)
- Build command:
```bash
pip install -r requirements.txt
```
- Start command:
```bash
gunicorn backend.wsgi
```
- Environment variables:
```env
DJANGO_SECRET_KEY=your-strong-secret
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=task-manager-p6ok.onrender.com
```

---

## UX Notes

- Mobile-first centered layout
- Completed tasks show strike-through and reduced opacity
- Toast notification on task completion
- Confirmation modal before delete
- Optimistic UI with rollback on error
- Accessible form and buttons

---

## Assumptions

- Single-user application
- No authentication required
- SQLite is sufficient for demo and evaluation
