# Coy — Discover Tab

A privacy-first crush-matching app built as a standalone demonstration for Coy. Features a mobile-first swipe deck alongside a placeholder "Home" tab, powered by a robust Express + Prisma 6 + Neon PostgreSQL architecture.

---

## 🌟 Tech Stack

* **Frontend (`/web`)**: Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion (gesture-driven card physics), Lucide Icons.
* **Backend (`/server`)**: Node.js, Express, TypeScript, Prisma 6 (pinned), Zod (schema validation), CORS.
* **Database**: PostgreSQL hosted on **Neon**, accessed using direct non-pooled connections with `sslmode=require`.
* **Testing**: Vitest + Supertest for automated integration tests against an isolated Neon test branch.

---

## 🚀 Quickstart Setup

### 1. Prerequisites
* Node.js v20+ installed
* A free account on [Neon](https://neon.tech)

### 2. Configure Environment Variables
In `server/.env`, configure your Neon connection strings:

```env
# Direct connection string to your Neon main branch
DATABASE_URL="postgresql://<user>:<password>@<endpoint>.neon.tech/neondb?sslmode=require"

# (Optional for testing) Dedicated test branch connection string
DATABASE_URL_TEST="postgresql://<user>:<password>@<endpoint>.neon.tech/neondb_test?sslmode=require"

PORT=4000
NODE_ENV=development
```

In `web/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 3. Install, Migrate & Seed
From the root directory:

```bash
# Setup & seed backend
cd server
npm install
npm run db:migrate
npm run seed

# Setup frontend
cd ../web
npm install
```

### 4. Start Development Servers
In two separate terminals:

```bash
# Terminal 1 - Backend (http://localhost:4000)
cd server
npm run dev

# Terminal 2 - Frontend (http://localhost:3000)
cd web
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to open Coy Discover.

---

## 🛡️ Privacy Architecture Decisions (Non-Negotiable)

Coy is designed with strict mathematical and architectural guarantees ensuring that **an unmatched inbound like can never be discovered or inferred**:

1. **Single Profile Mapper (`src/modules/profiles/profile.mapper.ts`)**:
   * The server defines `PUBLIC_PROFILE_SELECT` and `toPublicProfile()`.
   * Only `id`, `name`, `age`, `photoUrl`, `bio`, `city`, and `interests` are ever queried or serialized.
2. **Zero `likesMe` Column**:
   * Inbound likes exist strictly as `Swipe` records where `action = LIKE`. No boolean, counter, or status column exists on the `User` table.
3. **Randomized Deck Order**:
   * Feed queries do not rank by popularity, inbound like status, or timestamp. The backend performs an unbiased in-memory Fisher-Yates array shuffle before serialization.
4. **Mutual-Only Reveal**:
   * In `POST /swipe`, if the swipe does not result in a mutual match, the response payload is strictly `{ matched: false }`. The `profile` payload is only attached when `matched: true`.
5. **No Timing Side-Channels**:
   * Indexed queries (`toUserId = currentUserId AND action = 'LIKE'`) resolve in under 2ms, safely masking lookup latency within normal network jitter.
6. **No Client Memory Leaks**:
   * The server is the single source of truth; no swipe history is cached in browser `localStorage`.

---

## 📡 API Reference

### `GET /feed`
Returns up to 20 profiles that the current user has not yet swiped on, in randomized order.
* **Status**: `200 OK`
* **Response**:
```json
{
  "profiles": [
    {
      "id": "profile_01",
      "name": "Aanya Sharma",
      "age": 22,
      "photoUrl": "https://randomuser.me/api/portraits/women/1.jpg",
      "bio": "Literature major at DU...",
      "city": "Delhi University",
      "interests": ["Reading Fiction", "Chai & Samosas", "Poetry"]
    }
  ]
}
```

### `POST /swipe`
Records an optimistic or deliberate action (`LIKE` or `PASS`) on a candidate profile.
* **Body**:
```json
{
  "profileId": "profile_01",
  "action": "LIKE"
}
```
* **Status**: `200 OK`
* **Response (Mutual Match)**:
```json
{
  "matched": true,
  "profile": {
    "id": "profile_01",
    "name": "Aanya Sharma",
    "age": 22,
    "photoUrl": "https://randomuser.me/api/portraits/women/1.jpg",
    "bio": "Literature major at DU...",
    "city": "Delhi University",
    "interests": ["Reading Fiction", "Chai & Samosas", "Poetry"]
  }
}
```
* **Response (Unmatched or Pass)**:
```json
{
  "matched": false
}
```
* **Errors**: `400 Bad Request` (swiping on yourself or invalid enum), `404 Not Found` (unknown profile ID).

### `GET /matches`
Returns the current user's mutual matches ordered newest first.
* **Status**: `200 OK`
* **Response**:
```json
{
  "matches": [
    {
      "id": "profile_01",
      "name": "Aanya Sharma",
      "age": 22,
      "photoUrl": "https://randomuser.me/api/portraits/women/1.jpg",
      "bio": "Literature major...",
      "city": "Delhi University",
      "interests": ["Reading Fiction", "Chai & Samosas"],
      "matchedAt": "2026-11-19T15:55:38.413Z"
    }
  ]
}
```

### `POST /dev/reset`
Dev-only endpoint to wipe and re-seed all 36 candidates and 10 inbound likes (refuses to execute in production).

### `GET /health`
Returns `{ "status": "ok" }` after testing direct SQL ping connectivity against Neon.

---

## 🏗️ Architecture Overview

### Server Structure
Feature modules with strict unidirectional layering: `routes -> controller -> service -> repository`
* **Controllers**: Strictly parse input, delegate to services, and send HTTP status responses.
* **Services**: Contain business logic (shuffling, match evaluation, self-swipe validation).
* **Repositories**: The **only** code that imports and executes Prisma queries.
* **Error Handling**: Centralized `errorHandler` middleware returning uniform `{ "error": string }` shapes.

### Web Structure
* **`app/(tabs)/layout.tsx`**: Mobile-first container (`h-dvh flex flex-col`, desktop-centered `max-w-md`) with fixed bottom `TabBar` and safe-area padding.
* **`features/discover/hooks`**:
  * `useFeed`: Manages queue, loading, error, and empty states.
  * `useSwipe`: Handles optimistic card removal, rollback on server error, and match modal visibility.
  * `useMatches`: Manages live list of mutual matches.
* **`features/discover/components`**:
  * `CardStack`: Framer Motion gesture physics, rotation, LIKE/NOPE stamps, velocity/distance thresholds, and desktop arrow keys (`ArrowLeft`/`ArrowRight`).
  * `ProfileCard`: Image hero with initials error fallback, bio, location, and interest tags.
  * `MatchOverlay`: Celebratory modal with dual avatars, focus trap, and Escape key dismissal.
  * `MatchesGrid`: 2-column mutual match grid with empty state messaging.

---

## 🧪 Testing & Demo Reset

### Resetting Demo Data
At any time, restore clean initial state with:
```bash
cd server
npm run seed
```
Or via HTTP: `POST http://localhost:4000/dev/reset`.

### Running Integration Tests
Integration tests run with Vitest and Supertest against an isolated `DATABASE_URL_TEST` database branch:
```bash
cd server
npm test
```
The test suite validates:
* Feed exclusion of swiped candidates and self.
* Strict public schema keys without leaks.
* Mutual match on inbound likers and non-match on passes or one-way likes.
* Idempotency of duplicate swipes.
* Rejection of self-swipes, invalid actions, and non-existent users.
