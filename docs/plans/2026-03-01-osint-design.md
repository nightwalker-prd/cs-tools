# OSINT Explorer App Design

## App Configuration

| Field | Value |
|-------|-------|
| Package | `@cstools/osint` |
| Directory | `apps/osint` |
| Port | 5204 |
| Icon | `Radar` (lucide-react) |
| Color | `#00D4AA` |
| localStorage prefix | `osint-` |
| Tags | `['reference', 'quiz']` |
| Hub stats | `13 topics, 39 concepts, 39 quiz questions` |
| Hub description | `OSINT fundamentals — reconnaissance, SOCMINT, GEOINT, verification, threat intelligence, and operational security` |

## Content Structure (4 Parts, 13 Topics, 39 Concepts)

### Part 1: Foundations & Ethics (Topics 1-3)

1. **OSINT Fundamentals** — intelligence cycle, OSINT vs other INTs, collection management
2. **Legal & Ethical Frameworks** — privacy law, terms of service, ethical guidelines
3. **Operational Security (OPSEC)** — sock puppets, attribution risks, secure research environments

### Part 2: Collection Techniques (Topics 4-7)

4. **Search Engine Intelligence (SEARCHINT)** — Google dorking, cached content, advanced operators
5. **Social Media Intelligence (SOCMINT)** — platform APIs, profile analysis, network mapping
6. **Domain & Infrastructure Recon** — WHOIS, DNS, certificate transparency, IP geolocation
7. **Geospatial Intelligence (GEOINT)** — satellite imagery, geolocation techniques, mapping tools

### Part 3: Analysis & Verification (Topics 8-10)

8. **Image & Video Analysis** — reverse image search, EXIF data, deepfake detection
9. **Data Correlation & Link Analysis** — entity resolution, graph analysis, timeline reconstruction
10. **Verification & Fact-Checking** — source evaluation, multi-source corroboration, digital forensics

### Part 4: Advanced & Specialized (Topics 11-13)

11. **Dark Web & Deep Web Intel** — Tor, onion services, marketplace monitoring, paste sites
12. **Threat Intelligence & CTI** — IOCs, TTPs, MITRE ATT&CK, threat feeds
13. **OSINT Automation & Tooling** — frameworks (Maltego, SpiderFoot), APIs, custom scripts

## Architecture

Standard explorer scaffold — identical to all other cs-tools apps:
- `App.tsx` with sidebar/content layout, quiz mode toggle, search
- `data/topics.ts` with 13 topics, 39 concepts (3 per topic)
- `data/quiz.ts` with 39 quiz questions (3 per topic)
- 5 components: Sidebar, TopicView, ConceptCard, QuizMode, SearchResults

## Hub Integration

- Add `Radar` to lucide-react imports in `apps/hub/src/App.tsx`
- Add tool entry after algorithm-analysis (port 5203)
- Update overallStats: Tools 31→32, Topics 363→376, Questions 1166→1205, Concepts 1086→1125
- Add row to CLAUDE.md app table
