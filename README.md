# Task & Goal Management App

## About the Project

A full-stack task and goal management web application focused on productivity and data visualization.

The application allows users to create, edit, delete, and filter tasks by status, date, and name. It also provides interactive dashboards with weekly and monthly insights, including completed tasks and tracked hours.

## Features

- Create, edit, and delete tasks and goals  
- Advanced filtering by status, date, and name  
- Interactive dashboards with dynamic charts  
- Weekly and monthly productivity tracking  
- Configurable task alerts  
- Persistent timer accessible across all pages  
- Light and dark mode support  

## Tech Stack

- Next.js  
- React  
- TypeScript  
- Tailwind CSS  
- shadcn/ui  
- Lucide Icons  
- Recharts  
- Prisma  
- PostgreSQL  

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:Rafhael-Augusto/trackly.git
cd trackly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and configure your database connection:

```
DATABASE_URL="your_database_url_here"
```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

Vercel: https://trackly-opal.vercel.app/
