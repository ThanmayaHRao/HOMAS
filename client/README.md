# HOMAS — Hospital Management System Frontend

React + Vite + Tailwind CSS frontend for the HOMAS Spring Boot backend.

## Tech Stack
- React 18
- Vite 5
- Tailwind CSS 3
- React Router DOM 6
- Lucide React (icons)

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Pages

| Route | Page |
|---|---|
| `/` | Dashboard — stats overview |
| `/patients` | Patient registry |
| `/doctors` | Doctor directory |
| `/departments` | Department cards with staff |
| `/appointments` | Appointment table |
| `/insurance` | Insurance policies |

## Design
- White background, black fonts, grey shadows — clean official style
- No colour except black/white/grey

## Connecting to Backend
Replace mock data in `src/data/mockData.js` with real API calls to your Spring Boot backend running at `http://localhost:8080`.
