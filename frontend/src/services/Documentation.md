# Coffee Brew Log

## Project Description

Coffee Brew Log is a full-stack web application created for the XPL Full-stack Developer Bootcamp assessment.

The application allows a user to:

- Create a coffee brew entry
- View all saved brews
- Filter brews by brew method
- Edit an existing brew
- Delete a brew
- See the total number of brews

The application uses a React frontend, an Express backend, Prisma ORM, and a SQLite database.

## Technology Stack

### Frontend

- React
- Vite
- Bootstrap
- JavaScript

### Backend

- Node.js
- Express
- Prisma ORM
- SQLite

## Project Structure

```text
coffee-brew-log/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── services/
│   └── package.json
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   └── routes/
│   └── package.json
│
├── Documentation.md
├── deployment.md
└── .gitignore