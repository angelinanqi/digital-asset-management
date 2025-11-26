# digital-asset-management
5005CMD Aug25: Digital Asset Management System

Group Project 6
- Bryan Tan Zhu Wei
- Soh Angelina

Digital Asset Management System
A full-stack digital asset management (DAM) platform built with Next.js, Chakra UI, Django REST Framework, and PostgreSQL.

Technology Stack
Frontend
- Next.js
- Chakra UI (v3.30.0)

Project Structure
/frontend       → Next.js + Chakra UI app  
/backend        → Django + DRF API

Notes
- Ensure PostgreSQL is running before starting the backend.
- The UUID column fix is a one-time thing — once updated, future migrations will behave.

Backend
- Django
- Django REST Framework

Database
- PostgreSQL
- Uses uuidv4 for key fields 

Local Development Setup
1. Clone the Project
- git clone <your-repo-url>
- cd <project-folder>

Backend Setup (Django + DRF)
1. Move into backend folder
- cd backend

2. Activate virtual environment (Windows)
- venv\Scripts\activate

3. First-time migration prep (pgAdmin 4)
- Before you run the real migrations, make sure you update the PostgreSQL column type (the one meant to be uuidv4) from int → uuid.
- By default, Django creates certain fields (e.g., IDs) as integers unless explicitly configured otherwise.
- As the project uses UUIDv4 instead, you’ll need to manually update the relevant PostgreSQL column’s datatype from INTEGER → UUID before running the first full migration.

How to do that?
Run migrations for the backend to get the error message:
- py manage.py makemigrations
- py manage.py migrate

The expected error: 
django.db.utils.ProgrammingError: cannot cast type bigint to uuid
LINE 1: ...LE "asset_tags" ALTER COLUMN "id" TYPE uuid USING "id"::uuid

Open pgAdmin 4 to alter the id column in "asset_tags" table
- Open pgAdmin 4
- Go to asset_tags table
- Alter the id column to change from bigint to uuid
- Rerun migrations again by following steps 4 and 5

4. Make migrations
- py manage.py makemigrations

5. Apply migrations
- py manage.py migrate

6. Run the backend
- py manage.py runserver

Frontend Setup (Next.js + Chakra UI)
1. Move into frontend folder
- cd frontend

2. Start the dev server
- npm run dev
