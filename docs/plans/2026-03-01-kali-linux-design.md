# Kali Linux Explorer — Design Document

## Overview

A new explorer app (#40) for the cs-tools monorepo covering broad Kali Linux toolset and workflows: environment setup, reconnaissance, Nmap, Metasploit, Burp Suite, password attacks, wireless attacks, social engineering, post-exploitation, and reporting methodology.

## App Configuration

| Field | Value |
|-------|-------|
| Package | `@cstools/kali-linux` |
| Directory | `apps/kali-linux` |
| Port | 5212 |
| Icon | `Skull` |
| Color | `#557C94` |
| localStorage prefix | `kali-linux-` |
| Tags | `['reference', 'quiz']` |

## Topic Structure (4 parts, 13 topics, 39 concepts)

### Part 1: Foundations (Topics 1-3)

1. **Kali Linux Setup & Environment** — installation, desktop environments, package management, persistence USB
2. **Command-Line Essentials for Security** — bash, text processing, piping, scripting for automation
3. **Networking Fundamentals in Kali** — netcat, tcpdump, proxychains, Tor, SSH tunneling

### Part 2: Reconnaissance & Scanning (Topics 4-6)

4. **Information Gathering & OSINT Tools** — theHarvester, Maltego, Recon-ng, Shodan, DNS enumeration
5. **Nmap & Network Scanning** — host discovery, port scanning, NSE scripts, evasion techniques
6. **Vulnerability Assessment** — OpenVAS/GVM, Nikto, WPScan, scan interpretation

### Part 3: Exploitation & Attack Tools (Topics 7-10)

7. **Metasploit Framework** — msfconsole, modules, Meterpreter, MSFvenom payload generation
8. **Web Application Testing** — Burp Suite, SQLMap, gobuster/ffuf, OWASP ZAP
9. **Password Attacks** — John the Ripper, Hashcat, Hydra, wordlist generation
10. **Wireless & Network Attacks** — Aircrack-ng, WPA cracking, Evil Twin, Bettercap, ARP spoofing

### Part 4: Advanced Topics (Topics 11-13)

11. **Social Engineering & Client-Side** — SET, phishing, HID attacks, payload delivery
12. **Post-Exploitation & Pivoting** — privilege escalation, lateral movement, persistence, exfiltration
13. **Reporting & Methodology** — PTES, OWASP methodology, documentation, responsible disclosure

## Architecture

Standard explorer app scaffold: 12 component/config files + 2 data files (topics.ts, quiz.ts). Uses shared packages (@cstools/ui, @cstools/core). Dark theme, sidebar navigation, concept cards with expand/collapse, quiz mode per topic, search, bookmarks, completion tracking.

## Integration

- Hub entry with Skull icon and #557C94 color (Kali blue-grey)
- CLAUDE.md updated with port 5212
- Overall stats incremented (tools, topics, questions, concepts)
