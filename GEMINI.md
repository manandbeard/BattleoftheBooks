System Instructions & Context Lock
Always refer to this file for the project's routing structure, database schema, and scope before generating code, especially Next.js <Link> components. Do not hallucinate routes or import paths. Keep features strictly within the scope defined below.

Project Overview
A full-stack Next.js web application for the Oregon Battle of the Books (OBOB). It serves as a statewide, multi-tenant tournament management system and a collaborative student study portal.

Tech Stack
Framework: Next.js (App Router)

Database & Backend: Supabase (PostgreSQL)

ORM: Prisma 

Styling: Tailwind CSS

Offline Caching & State: TanStack React Query + IndexedDB 

Multi-Tenant Role-Based Access Control (RBAC)
The system relies on a shared database with row-level data isolation using a tenant_id or school_id. Data access is strictly controlled by the following hierarchical roles:

State Admin (Superuser): System-wide configuration, manages global annual book lists for all three age divisions, and broadcasts statewide announcements.

Regional Chair: Scoped geographically by county. Manages school registrations, verifies rosters, and tracks regional tournament readiness.

Coach / School Sponsor: Scoped to their specific school. Hosts local tournaments, schedules rooms/moderators, and manages strict 5-member team rosters.

Student: Scoped to their team. Accesses study tools, gamified flashcards, and tournament schedules.

Core Routing Structure (App Router)
All internal navigation must use the next/link <Link> component pointing exactly to these established routes:

/ : Public landing page.

/login : Authentication portal.

/admin/... : State Admin superuser dashboard (global book lists, announcements).

/region/... : Regional Chair dashboard (county-level verification).

/coach/... : Coach dashboard (roster management, tournament hosting wizard).

/coach/tournament/[id]/scoresheet : The offline-first digital scoresheet for live battle scorekeeping.

/student/... : Student portal (collaborative study cards, team progress).

/api/... : Next.js Route Handlers for backend interactions.

Key Business Logic & Compliance Rules
FERPA & COPPA Compliance: Strictly enforce data minimization. Collect only first name, last initial, grade level, and school affiliation. Do not collect physical addresses. Require digital parental consent workflows for students under 13.

Offline-First Scoring: The digital scoresheet must function entirely offline. Use IndexedDB as the primary local data store during a battle. Score mutations should queue locally and sync automatically when network connectivity is restored.

Tournament Scheduling: Pool play matches must be generated using the Rotation Algorithm (Berger tables) to handle round-robin matchups and automatically assign "byes" for pools with an odd number of teams.

Battle Rules: A battle consists of 16 questions (8 "In Which Book" and 8 "Content"). "In Which Book" questions require both Title (3 pts) and Author (2 pts), allowing for steals if partially incorrect.