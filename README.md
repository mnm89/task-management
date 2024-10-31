# TaskFlow - Advanced Task Management App

## Project Overview

TaskFlow is a task management app where users can create, update, and delete tasks. The app provides real-time task collaboration features using WebSockets, supports user authentication with JWT, and integrates with an external API for time-tracking. It uses a PostgreSQL database for data persistence and demonstrates best practices with TypeScript, React, Node.js, and Express

## Project Structure

            TaskFlow/
            ├── backend/
            │   ├── src/
            │   │   ├── controllers/
            │   │   ├── middleware/
            │   │   ├── models/
            │   │   ├── routes/
            │   │   ├── services/
            │   │   ├── utils/
            │   │   └── app.ts
            │   └── tests/
            ├── frontend/
            │   ├── public/
            │   ├── src/
            │   │   ├── components/
            │   │   ├── context/
            │   │   ├── hooks/
            │   │   ├── pages/
            │   │   ├── services/
            │   │   ├── App.tsx
            │   │   └── index.tsx
            └── README.md

## Backend (Node.js + Express)

Key Features:

- TypeScript decorators for route handling and validation
- Middleware for JWT authentication.
- TypeORM or Prisma ORM for database integration.
- Real-time updates using Socket.IO.

## Frontend (React + TypeScript)

Key Features:

- React hooks with TypeScript (useContext, useState, useEffect).
- React Context API for global state management.
- Custom hooks for Websocket integration.
- TypeScript generics in custom hooks and reusable components.
- Styled Components for styling.

## Setup and Installation

1. Backend Setup:

        cd backend
        npm install
        npm run dev

2. Frontend Setup:

        cd frontend
        npm install
        npm start

3. Dummy user for login

        username: user
        password: password

## What to Showcase

### 1) TypeScript proficiency: Advanced typing, decorators, and generics

### 2) Architecture: Modular code structure (controllers, services, middleware)

### 3) Real-time collaboration: WebSocket-based updates

### 4) Best practices: Code quality, error handling, and security