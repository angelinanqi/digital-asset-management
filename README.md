# digital-asset-management
Digital Asset Management System

Group Project 6
- Bryan Tan Zhu Wei
- Soh Angelina

Digital Asset Management System
A full-stack digital asset management (DAM) platform built with Next.js, Chakra UI, Django REST Framework, and PostgreSQL.

https://github.com/user-attachments/assets/47abe49b-b2b4-4367-8bbb-b8620ab0321e

Technology Stack
Frontend
- Next.js
- Chakra UI (see frontend/package.json)

Project Structure
/frontend       → Next.js + Chakra UI app  
/backend        → Django + DRF API

Backend
- Django + Django REST Framework + SimpleJWT
- PostgreSQL (local or Supabase-hosted)

Frontend (in a second PowerShell terminal, from the repository root):

```powershell
Set-Location frontend
npm.cmd ci
npm.cmd run dev
```

Open http://localhost:3000. The Django API remains http://127.0.0.1:8000.
Django authentication and local backend/media uploads are retained.