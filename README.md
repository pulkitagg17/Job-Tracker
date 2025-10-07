# JobTracker — Full-Stack Job Application Manager

A modern web app to **track your job applications**, **visualize progress**, and **analyze your placement journey** — all in one dashboard.

Built for developers and students preparing for placements.

---

## Features

*  **Organize applications** by stage — Applied, Interview, Offer, or Rejected
* Add details like **CTC (LPA)**, **Date of Drive**, **Tags**, and **Notes**
* **Drag-and-drop Kanban board** for managing job stages
* **Analytics dashboard** showing progress and timeline insights
* **Secure JWT authentication** with protected routes
* **Responsive UI** with modern UX and real-time toasts

---

## Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, Recharts\
**Backend:** Node.js, Express, MongoDB, Mongoose\
**Auth:** JWT\
**Notifications:** Sonner

---

## Project Structure

```
jobtracker/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── config/
│   └── server.ts
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── context/
│   └── main.tsx
│
└── README.md
```

---

## API Overview

### Auth

| Method | Endpoint         | Description         | Body                                        |
| :----- | :--------------- | :------------------ | :------------------------------------------ |
| POST   | `/auth/register` | Register a new user | `{ email, password }`                       |
| POST   | `/auth/login`    | Login existing user | `{ email, password }` → returns `{ token }` |

---

### Jobs (Protected, requires JWT)

| Method | Endpoint    | Description                     | Body                                                 |
| :----- | :---------- | :------------------------------ | :--------------------------------------------------- |
| GET    | `/jobs`     | Get all jobs for logged-in user | —                                                    |
| POST   | `/jobs`     | Create a new job entry          | `{ title, company, status, ctc, dateOfDrive, tags }` |
| PUT    | `/jobs/:id` | Update a job by ID              | `{ ...fieldsToUpdate }`                              |
| DELETE | `/jobs/:id` | Delete a job by ID              | —                                                    |

---

### Analytics

| Method | Endpoint          | Description                                 |
| :----- | :---------------- | :------------------------------------------ |
| GET    | `/jobs/analytics` | Returns job status counts and timeline data |

**Example Response:**

```json
{
  "statusCounts": [
    { "_id": "applied", "count": 3 },
    { "_id": "interview", "count": 2 }
  ],
  "timeline": [
    { "_id": "2025-10-01", "count": 1 },
    { "_id": "2025-10-03", "count": 2 }
  ]
}
```

---

## ️ Getting Started

1. **Clone the repo**

   ```bash
   git clone [https://github.com/yourusername/jobtracker.git](https://github.com/Yashcu/Job-Tracker)
   cd jobtracker
   ```

2. **Setup environment variables**
   Create `.env` files in both `backend/` and `frontend/` as per your configuration.

3. **Install dependencies**

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

4. **Run both servers**

   ```bash
   # Backend
   npm run dev
   # Frontend
   npm run dev
   ```

5. **Open in browser**

   ```
   http://localhost:5173
   ```

---

## Folder Highlights

* `controllers/` → Core business logic for jobs, auth, and analytics
* `middlewares/` → JWT auth middleware
* `models/` → Mongoose schemas
* `components/` → Reusable UI components (buttons, cards, modals, etc.)
* `context/` → App-wide state (auth, theme, etc.)

---
