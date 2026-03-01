# Threat Intelligence Explorer — Design Document

## Overview

A new explorer app (#38) for the cs-tools monorepo covering broad cyber threat intelligence: CTI lifecycle, threat modeling, adversary tracking, MITRE ATT&CK, intelligence sharing (STIX/TAXII), threat hunting, and strategic reporting.

## App Configuration

| Field | Value |
|-------|-------|
| Package | `@cstools/threat-intelligence` |
| Directory | `apps/threat-intelligence` |
| Port | 5210 |
| Icon | `ScanEye` |
| Color | `#E74C3C` |
| localStorage prefix | `threat-intelligence-` |
| Tags | `['reference', 'quiz']` |

## Topic Structure (4 parts, 13 topics, 39 concepts)

### Part 1: Foundations (Topics 1-3)

1. **CTI Fundamentals & Intelligence Lifecycle** — intelligence requirements, collection, processing, analysis, dissemination, feedback loop
2. **Intelligence Types & Levels** — strategic, operational, tactical intelligence; confidence levels; finished vs raw intel
3. **Threat Landscape & Adversary Taxonomy** — nation-states, cybercriminals, hacktivists, insiders; motivation/capability matrices

### Part 2: Frameworks & Modeling (Topics 4-7)

4. **MITRE ATT&CK Framework** — tactics, techniques, sub-techniques; Navigator; detection mapping; coverage analysis
5. **Threat Modeling Methodologies** — STRIDE, PASTA, DREAD, attack trees; SDLC integration
6. **Kill Chain & Diamond Model** — Lockheed Martin Kill Chain, Diamond Model; campaign tracking
7. **Adversary Tracking & Attribution** — APT tracking, TTPs vs IOCs, false flags, clustering, attribution confidence

### Part 3: Operations & Sharing (Topics 8-10)

8. **Intelligence Collection & Sources** — OSINT, HUMINT, SIGINT, TECHINT; dark web monitoring; honeypots
9. **STIX, TAXII & Intelligence Sharing** — STIX 2.1, TAXII protocol, ISACs/ISAOs, TLP, sharing communities
10. **Threat Feeds & Platform Management** — TIPs (MISP, OpenCTI, ThreatConnect), feed evaluation, enrichment

### Part 4: Advanced Topics (Topics 11-13)

11. **Threat Hunting & Detection Engineering** — hypothesis-driven hunting, Sigma rules, detection-as-code, hunting maturity model
12. **Malware Intelligence & Campaign Analysis** — malware family tracking, infrastructure mapping, C2 analysis, pivoting
13. **Strategic Intelligence & Reporting** — reporting standards, stakeholder communication, risk quantification, intelligence-driven defense

## Architecture

Standard explorer app scaffold: 12 component/config files + 2 data files (topics.ts, quiz.ts). Uses shared packages (@cstools/ui, @cstools/core). Dark theme, sidebar navigation, concept cards with expand/collapse, quiz mode per topic, search, bookmarks, completion tracking.

## Integration

- Hub entry with ScanEye icon and #E74C3C color
- CLAUDE.md updated with port 5210
- Overall stats incremented (tools, topics, questions, concepts)
