# QuillFire

QuillFire is a web application built with **Next.js 14** that provides a user-friendly, feature-rich writing environment for authors and content creators. Users can create and share topics, comment, like/dislike, and browse by tags.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (UI components & validation) + JavaScript (pages, API routes, models — incremental migration)
- **Auth:** NextAuth.js (credentials + Google)
- **Database:** MongoDB with Mongoose
- **Styling:** Tailwind CSS
- **Rich text:** React Quill

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- (Optional) Google OAuth credentials for “Sign in with Google”

### Installation

```bash
git clone <repo-url>
cd Quill_Fire
npm install
```

### Environment

Create a `.env.local` in the project root with:

- `MONGODB_URI` – MongoDB connection string  
- `NEXTAUTH_SECRET` – secret for NextAuth  
- `NEXTAUTH_URL` – e.g. `http://localhost:3000`  
- (Optional) `GAUTHID` / `GAUTHSECRET` for Google provider  

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & Lint

```bash
npm run build
npm run lint
```

---

## Project Structure (high level)

```
├── app/                 # Next.js App Router (pages, layout, API routes)
├── components/          # React components (TypeScript)
├── types/               # Shared TypeScript types and declarations
├── utils/               # Helpers and validation (TS + JS)
├── models/              # Mongoose models (JavaScript)
├── styles/              # Global CSS
├── public/              # Static assets
└── docs/                # Documentation (e.g. case study)
```

---

## TypeScript Migration

The frontend is being migrated to TypeScript incrementally:

- **Converted:** All components in `components/`, `utils/validations.ts`, and shared types in `types/`.
- **Config:** `tsconfig.json` (strict), path alias `@/*` in `tsconfig.json` and `jsconfig.json`.
- **Still JS:** App routes (`app/*`), API routes (`app/api/*`), and Mongoose models (`models/`).

See `docs/quillfire-case-study.md` for context and tradeoffs, and `PULL_REQUEST.md` for a detailed PR-style summary of the migration.

---

## License

Private / All rights reserved (adjust as needed).
