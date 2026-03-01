# Software Engineering Explorer — Design Document

## Overview

App #21 in the cs-tools monorepo. An interactive explorer covering the professional practice of software engineering — requirements, testing, code quality, agile processes, and production readiness. Follows the established explorer pattern (databases template).

## App Configuration

| Field | Value |
|-------|-------|
| App name | Software Engineering |
| Package | `@cstools/software-engineering` |
| Directory | `apps/software-engineering` |
| Port | 5193 |
| Icon | `Wrench` |
| Color | `#E5C07B` (warm gold) |
| localStorage prefix | `software-engineering-` |
| Hub tags | `['reference', 'interactive']` |

## Content: 13 Topics x 3 Concepts = 39 Concepts, 39 Quiz Questions

### Part 1: Requirements & Design (Topics 1-3)

1. **Requirements Engineering** — gathering techniques (interviews, user stories, use cases), functional vs non-functional requirements, requirement traceability
2. **Software Architecture Fundamentals** — architectural styles (layered, microservices, event-driven), quality attributes (scalability, maintainability), architecture decision records (ADRs)
3. **API & Interface Design** — REST principles, API versioning, backward compatibility, contract-first design, GraphQL vs REST trade-offs

### Part 2: Code Quality & Testing (Topics 4-7)

4. **Clean Code & Code Smells** — naming, function size, DRY/KISS/YAGNI, common smells (long method, feature envy, god class), when rules conflict
5. **Refactoring Techniques** — systematic refactoring (extract method, move field, replace conditional with polymorphism), refactoring safety (tests first), technical debt quadrant
6. **Testing Strategies** — test pyramid (unit/integration/E2E), TDD red-green-refactor, BDD and acceptance testing, test doubles (mocks, stubs, fakes)
7. **Advanced Testing** — property-based testing, mutation testing, snapshot/golden testing, contract testing, load & performance testing

### Part 3: Process & Collaboration (Topics 8-10)

8. **Agile Methodologies** — Scrum ceremonies & roles, Kanban flow, sprint planning & estimation (story points, planning poker), retrospectives
9. **Code Review & Collaboration** — review best practices, PR size and flow, pair programming, trunk-based vs feature-branch development
10. **Documentation & Communication** — technical writing (ADRs, RFCs, design docs), runbooks, README-driven development, diagrams as code

### Part 4: Delivery & Operations (Topics 11-13)

11. **Version Control Strategies** — branching models (GitFlow, trunk-based), semantic versioning, monorepo vs polyrepo, release management
12. **Production Readiness** — feature flags, canary/blue-green deployments, rollback strategies, health checks, SLOs/SLIs/SLAs
13. **Incident Management & Reliability** — on-call practices, incident response frameworks, blameless postmortems, chaos engineering, error budgets

## Implementation Steps

### Step 1: Create app scaffold
Same 14-file structure as existing explorers (from databases template):
- Config: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`
- Source: `src/main.tsx`, `src/index.css`, `src/App.tsx`, `src/components/Sidebar.tsx`
- Shared (direct copy): `src/components/TopicView.tsx`, `src/components/ConceptCard.tsx`, `src/components/QuizMode.tsx`, `src/components/SearchResults.tsx`
- Data: `src/data/topics.ts` (13 topics, 39 concepts), `src/data/quiz.ts` (39 questions)

### Step 2: Update hub
- Add `Wrench` to icon imports in `apps/hub/src/App.tsx`
- Add tool entry (port 5193, color #E5C07B, tags reference+interactive)
- Update overallStats: Tools 20->21, Topics 220->233, Questions 737->776, Concepts 657->696

### Step 3: Update CLAUDE.md
- Add `| software-engineering | 5193 | Software engineering practices explorer with quizzes |`

### Step 4: Build verification
```bash
pnpm install
pnpm --filter @cstools/software-engineering build
pnpm --filter @cstools/hub build
```

## Key Reference Files
- `apps/dev-experience/` — most recent template for all files
- `apps/databases/src/data/topics.ts` — content format (Concept/Topic interfaces)
- `apps/databases/src/data/quiz.ts` — quiz format (QuizQuestion interface)
- `apps/hub/src/App.tsx` — hub registration (currently 20 tools)
- `CLAUDE.md` — app table (currently 20 content apps)

## Overlap Analysis

| Existing Tool | What it covers | How SE tool differs |
|---------------|---------------|-------------------|
| Design Patterns | GoF patterns (creational/structural/behavioral) | SE covers when/why to refactor, not specific patterns |
| DevOps & CI/CD | Containers, K8s, pipelines, IaC | SE covers process (agile, code review, estimation) |
| Dev Experience | Shell, git commands, CLI tools | SE covers branching strategies, version control philosophy |
| System Design | Distributed architecture at scale | SE covers requirements gathering, ADRs, production readiness |
