# Digital Forensics Explorer — Design Document

## Overview

A new explorer app (#37) for the cs-tools monorepo covering broad digital forensics: disk/memory/network/mobile/cloud forensics, incident response, evidence handling, anti-forensics, and malware forensics.

## App Configuration

| Field | Value |
|-------|-------|
| Package | `@cstools/forensics` |
| Directory | `apps/forensics` |
| Port | 5209 |
| Icon | `Fingerprint` |
| Color | `#9B59B6` |
| localStorage prefix | `forensics-` |
| Tags | `['reference', 'quiz']` |

## Topic Structure (4 parts, 13 topics, 39 concepts)

### Part 1: Foundations (Topics 1-3)

1. **Forensic Principles & Legal Framework** — chain of custody, evidence admissibility, Daubert standard, forensic soundness
2. **Evidence Acquisition & Imaging** — write blockers, dd/dc3dd, E01/AFF4 formats, hashing for integrity, live vs dead acquisition
3. **File Systems & Data Recovery** — NTFS/ext4/APFS internals, MFT parsing, slack space, deleted file recovery, carving

### Part 2: System Forensics (Topics 4-7)

4. **Windows Forensics** — registry hives, event logs, prefetch, ShimCache/AmCache, NTFS artifacts
5. **Linux & macOS Forensics** — /var/log analysis, bash history, cron, plist files, FSEvents, Unified Logs
6. **Memory Forensics** — Volatility framework, process analysis, DLL injection detection, rootkit detection
7. **Browser & Application Forensics** — SQLite databases, browser history/cookies/cache, email headers, chat artifacts

### Part 3: Network & Mobile (Topics 8-10)

8. **Network Forensics** — pcap analysis, Wireshark/Zeek, NetFlow, protocol reconstruction
9. **Mobile Forensics** — iOS/Android acquisition, app data extraction, GPS/location artifacts
10. **Cloud & Container Forensics** — AWS/Azure/GCP logs, CloudTrail, container layers, ephemeral evidence

### Part 4: Advanced Topics (Topics 11-13)

11. **Incident Response Process** — PICERL framework, triage, containment, eradication, recovery, IOC extraction
12. **Anti-Forensics & Detection** — timestomping, log clearing, data wiping, steganography, detecting anti-forensic activity
13. **Malware Forensics & Threat Intel** — malware triage, YARA rules, IOC correlation, MITRE ATT&CK mapping

## Architecture

Standard explorer app scaffold: 12 component/config files + 2 data files (topics.ts, quiz.ts). Uses shared packages (@cstools/ui, @cstools/core). Dark theme, sidebar navigation, concept cards with expand/collapse, quiz mode per topic, search, bookmarks, completion tracking.

## Integration

- Hub entry with Fingerprint icon and #9B59B6 color
- CLAUDE.md updated with port 5209
- Overall stats incremented (tools, topics, questions, concepts)
