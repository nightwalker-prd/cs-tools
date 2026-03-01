# Cloud Security Explorer — Design Document

## Overview

A new explorer app (#39) for the cs-tools monorepo covering broad cloud security: shared responsibility, IAM, zero trust, container/serverless security, compliance frameworks, CSPM, DevSecOps, and cloud IR.

## App Configuration

| Field | Value |
|-------|-------|
| Package | `@cstools/cloud-security` |
| Directory | `apps/cloud-security` |
| Port | 5211 |
| Icon | `CloudCog` |
| Color | `#3498DB` |
| localStorage prefix | `cloud-security-` |
| Tags | `['reference', 'quiz']` |

## Topic Structure (4 parts, 13 topics, 39 concepts)

### Part 1: Foundations (Topics 1-3)

1. **Cloud Security Fundamentals & Shared Responsibility** — shared responsibility model, service model security implications, cloud threat landscape
2. **Identity & Access Management (IAM)** — least privilege, RBAC/ABAC, federation, service accounts, privilege escalation
3. **Zero Trust Architecture** — zero trust principles, micro-segmentation, continuous verification, BeyondCorp

### Part 2: Infrastructure Security (Topics 4-7)

4. **Network Security in the Cloud** — VPCs, security groups, NACLs, private endpoints, DDoS protection
5. **Compute & Container Security** — VM hardening, image scanning, Kubernetes security, runtime protection
6. **Serverless & Application Security** — function security, API gateway, event injection, secrets management
7. **Data Security & Encryption** — encryption at rest/in transit, KMS, data classification, DLP

### Part 3: Governance & Compliance (Topics 8-10)

8. **Cloud Compliance Frameworks** — SOC 2, ISO 27001, FedRAMP, HIPAA, PCI-DSS, GDPR
9. **Security Monitoring & Logging** — CloudTrail/Azure Monitor/GCP Audit, SIEM integration, cloud-native detection
10. **Cloud Security Posture Management (CSPM)** — misconfiguration detection, policy-as-code, drift detection

### Part 4: Advanced Topics (Topics 11-13)

11. **DevSecOps & Shift-Left Security** — IaC scanning, CI/CD pipeline security, SAST/DAST, GitOps security
12. **Incident Response in the Cloud** — cloud IR playbooks, forensic evidence collection, containment strategies
13. **Multi-Cloud & Emerging Cloud Security** — multi-cloud governance, CNAPP, AI/ML workload security, confidential computing

## Architecture

Standard explorer app scaffold: 12 component/config files + 2 data files (topics.ts, quiz.ts). Uses shared packages (@cstools/ui, @cstools/core). Dark theme, sidebar navigation, concept cards with expand/collapse, quiz mode per topic, search, bookmarks, completion tracking.

## Integration

- Hub entry with CloudCog icon and #3498DB color
- CLAUDE.md updated with port 5211
- Overall stats incremented (tools, topics, questions, concepts)
