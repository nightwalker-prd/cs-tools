# Self-Hosting Explorer — Design Document

## Overview

A new explorer app (#41) for the cs-tools monorepo covering self-hosting fundamentals for enthusiasts: home server setup, Docker & containerization, reverse proxies, storage & backups, media servers, productivity tools, home automation, privacy tools, monitoring, security hardening, and infrastructure automation.

## App Configuration

| Field | Value |
|-------|-------|
| Package | `@cstools/self-hosting` |
| Directory | `apps/self-hosting` |
| Port | 5213 |
| Icon | `Home` |
| Color | `#E67E22` |
| localStorage prefix | `self-hosting-` |
| Tags | `['reference', 'quiz']` |

## Topic Structure (4 parts, 13 topics, 39 concepts)

### Part 1: Foundations (Topics 1-3)

1. **Introduction to Self-Hosting** — motivations & philosophy, cost analysis vs cloud, legal & ISP considerations
2. **Home Server Hardware & OS** — hardware selection, Linux server distros (Ubuntu/Debian/Proxmox), power & cooling
3. **Networking Fundamentals** — DNS & DDNS, port forwarding & firewalls, VLANs & network segmentation

### Part 2: Core Infrastructure (Topics 4-6)

4. **Docker & Containerization** — Docker basics & Compose, container management & orchestration, image registries & builds
5. **Reverse Proxies & SSL** — Nginx Proxy Manager vs Traefik vs Caddy, Let's Encrypt & SSL automation, subdomain routing
6. **Storage & Backup Strategies** — RAID & ZFS fundamentals, NAS solutions (TrueNAS/OpenMediaVault), backup strategies (3-2-1 rule, Borg, Restic)

### Part 3: Services & Applications (Topics 7-10)

7. **Media Servers & Management** — Plex vs Jellyfin vs Emby, *arr stack (Sonarr/Radarr/Prowlarr), transcoding & hardware acceleration
8. **Productivity & Collaboration** — Nextcloud & file sync, Vaultwarden & password management, wikis & documentation (Bookstack/Outline)
9. **Home Automation** — Home Assistant core concepts, MQTT & Zigbee/Z-Wave protocols, Node-RED & ESPHome automation
10. **Privacy & Ad Blocking** — Pi-hole vs AdGuard Home, VPN (WireGuard/Tailscale), DNS-over-HTTPS & privacy DNS

### Part 4: Advanced Topics (Topics 11-13)

11. **Monitoring & Observability** — Grafana & Prometheus stack, Uptime Kuma & health checks, logging & alerting strategies
12. **Security Hardening** — SSH hardening & key management, fail2ban & intrusion prevention, container security & updates
13. **Automation & Infrastructure as Code** — Ansible for homelab, GitOps & version-controlled configs, CI/CD for self-hosted services

## Architecture

Standard explorer app scaffold: 12 component/config files + 2 data files (topics.ts, quiz.ts). Uses shared packages (@cstools/ui, @cstools/core). Dark theme, sidebar navigation, concept cards with expand/collapse, quiz mode per topic, search, bookmarks, completion tracking.

## Integration

- Hub entry with Home icon and #E67E22 color (warm orange)
- CLAUDE.md updated with port 5213
- Overall stats incremented (tools, topics, questions, concepts)
