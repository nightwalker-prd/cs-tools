export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Cloud Security Fundamentals & Shared Responsibility
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'In the AWS shared responsibility model, who is responsible for patching the guest operating system on an EC2 instance?',
    options: [
      'AWS is fully responsible for all patching',
      'The customer is responsible for guest OS patching',
      'Responsibility is shared equally between AWS and the customer',
      'The EC2 service automatically patches the guest OS',
    ],
    answer: 1,
    explanation: 'In IaaS (EC2), AWS manages the physical infrastructure and hypervisor ("security OF the cloud"), but the customer owns the guest OS, applications, and data ("security IN the cloud"). This includes OS patching, firewall configuration, and data encryption. With PaaS/SaaS, more responsibility shifts to the provider.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'How does the security responsibility boundary shift when moving from IaaS to SaaS?',
    options: [
      'The customer takes on more responsibility with SaaS',
      'The cloud provider assumes more responsibility with SaaS — the customer primarily manages identity, access, and data classification',
      'Security responsibility is identical across all service models',
      'SaaS eliminates all security responsibilities for the customer',
    ],
    answer: 1,
    explanation: 'Moving up the stack: IaaS (customer manages OS, middleware, runtime, apps, data), PaaS (customer manages apps and data), SaaS (customer manages access control and data). Even with SaaS, customers remain responsible for identity management, access policies, data classification, and compliance — security is never fully outsourced.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'What is the most common root cause of cloud security breaches?',
    options: [
      'Zero-day exploits in cloud provider infrastructure',
      'Misconfigurations — overly permissive access, public storage buckets, exposed credentials, and default settings left unchanged',
      'Physical break-ins at data centers',
      'Flaws in hypervisor isolation',
    ],
    answer: 1,
    explanation: 'Studies consistently show that misconfigurations cause the majority of cloud breaches: publicly accessible S3 buckets, overly permissive IAM policies, exposed metadata endpoints, unencrypted databases, and default security group rules. The Capital One breach (2019) stemmed from a misconfigured WAF and overly permissive IAM role — not a cloud provider vulnerability.',
  },

  // Chapter 2: Identity & Access Management (IAM)
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'What does the principle of "least privilege" mean in cloud IAM?',
    options: [
      'Users should share a single admin account to reduce the number of credentials',
      'Every identity should have only the minimum permissions required to perform its specific function — no more',
      'Privileges should be granted based on seniority',
      'All users should have read-only access by default with no write permissions',
    ],
    answer: 1,
    explanation: 'Least privilege limits blast radius: if an identity is compromised, the attacker can only do what that identity was authorized to do. In practice: use granular IAM policies (not AdministratorAccess), scope to specific resources (not *), implement permission boundaries, and regularly review and revoke unused permissions using tools like AWS IAM Access Analyzer.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'Why are long-lived IAM access keys considered a security risk compared to temporary credentials?',
    options: [
      'Access keys are slower than temporary credentials',
      'Long-lived keys can be leaked, stolen, or forgotten — they never expire unless rotated, creating a persistent attack vector',
      'Temporary credentials don\'t work with CLI tools',
      'Access keys use weaker encryption',
    ],
    answer: 1,
    explanation: 'Static access keys committed to Git repos, stored in config files, or embedded in applications are a leading cause of cloud compromise. Temporary credentials (from IAM Roles, STS AssumeRole, OIDC federation) expire automatically (15 min to 12 hours), limiting exposure. AWS recommends using IAM Roles for EC2/Lambda instead of embedding access keys.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'What is the difference between RBAC and ABAC in cloud access control?',
    options: [
      'RBAC is for AWS and ABAC is for Azure',
      'RBAC assigns permissions based on predefined roles (job function), while ABAC uses attributes (tags, department, environment) for dynamic, fine-grained access decisions',
      'RBAC is newer than ABAC',
      'They are different names for the same concept',
    ],
    answer: 1,
    explanation: 'RBAC groups users into roles (DevOps-Engineer, DB-Admin) with predefined permissions — simple but can lead to role explosion. ABAC uses resource tags and user attributes for dynamic policies (e.g., "allow access if user.department == resource.tag.department AND resource.tag.env == \'dev\'"). ABAC scales better for large organizations with many resources and conditions.',
  },

  // Chapter 3: Zero Trust Architecture
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'What is the core principle of Zero Trust architecture?',
    options: [
      'Trust internal network traffic but verify external traffic',
      'Never trust any request by default — verify every access attempt based on identity, device, context, and behavior regardless of network location',
      'Trust is established once at login and maintained for the session',
      'Only trust traffic that comes through a VPN',
    ],
    answer: 1,
    explanation: 'Zero Trust eliminates the concept of a trusted internal network. Every access request — whether from inside the office or a coffee shop — must be authenticated, authorized, and continuously validated. NIST SP 800-207 defines the framework: identity-centric policies, micro-segmentation, least privilege access, and continuous monitoring of all sessions.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'What is micro-segmentation and how does it support Zero Trust?',
    options: [
      'Splitting a database into smaller tables for performance',
      'Dividing the network into granular segments with individual security policies, so a breach in one segment cannot freely spread to others',
      'Running multiple antivirus products simultaneously',
      'Encrypting network traffic between data centers',
    ],
    answer: 1,
    explanation: 'Traditional flat networks allow lateral movement after initial compromise. Micro-segmentation creates fine-grained security boundaries around individual workloads or services, with policies controlling traffic between segments. In cloud: security groups per workload, service mesh (Istio) with mTLS, and Kubernetes network policies enforce east-west traffic control.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'How did Google\'s BeyondCorp model influence Zero Trust adoption?',
    options: [
      'It introduced a new encryption algorithm',
      'It demonstrated that enterprise applications could be securely accessed without a VPN by making access decisions based on user identity and device state rather than network location',
      'It created a new cloud computing platform',
      'It replaced firewalls with AI-based detection',
    ],
    answer: 1,
    explanation: 'BeyondCorp (2014) moved Google\'s corporate apps to the internet without VPN, using an access proxy that evaluates each request based on: who is the user (identity), what device are they using (certificate, patch level, encryption status), and what are they trying to access (resource sensitivity). This proved Zero Trust was practical at enterprise scale and influenced the industry-wide shift away from perimeter-based security.',
  },

  // Chapter 4: Network Security in the Cloud
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'What is the key difference between Security Groups and NACLs (Network ACLs) in AWS?',
    options: [
      'They are identical in functionality',
      'Security Groups are stateful (return traffic auto-allowed) and operate at the instance level; NACLs are stateless (explicit rules for both directions) and operate at the subnet level',
      'NACLs are stateful and Security Groups are stateless',
      'Security Groups only work with EC2 and NACLs only work with Lambda',
    ],
    answer: 1,
    explanation: 'Security Groups: stateful (allow outbound response automatically), instance/ENI-level, allow-only rules, evaluated as a whole. NACLs: stateless (need explicit inbound AND outbound rules), subnet-level, support allow AND deny rules, evaluated in order. Best practice: use Security Groups for fine-grained instance control and NACLs as a broad subnet-level safety net.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What is the security benefit of using VPC Private Endpoints (AWS PrivateLink)?',
    options: [
      'They make services faster',
      'They keep traffic between your VPC and AWS services on the AWS private network, eliminating exposure to the public internet',
      'They provide free DDoS protection',
      'They automatically encrypt all data at rest',
    ],
    answer: 1,
    explanation: 'Without Private Endpoints, traffic to AWS services (S3, DynamoDB, etc.) traverses the public internet via internet/NAT gateways. PrivateLink creates private connections within the AWS network — traffic never leaves the Amazon backbone. This reduces attack surface, prevents data exfiltration via public routes, and satisfies compliance requirements for private connectivity.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'How does a Web Application Firewall (WAF) complement cloud network security?',
    options: [
      'WAF replaces all other security controls',
      'WAF inspects HTTP/HTTPS traffic at Layer 7 to block application-level attacks (SQL injection, XSS, bot traffic) that network-layer controls like Security Groups cannot detect',
      'WAF only blocks DDoS attacks',
      'WAF encrypts traffic between users and servers',
    ],
    answer: 1,
    explanation: 'Security Groups and NACLs operate at Layers 3-4 (IP/port). WAF operates at Layer 7, understanding HTTP semantics: it can block SQL injection attempts, XSS payloads, known malicious user agents, and rate-limit specific API endpoints. AWS WAF, Azure Front Door WAF, and GCP Cloud Armor provide managed rule sets (OWASP core rules) plus custom rules.',
  },

  // Chapter 5: Compute & Container Security
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'Why is the EC2 Instance Metadata Service (IMDS) a common attack target, and how does IMDSv2 mitigate this?',
    options: [
      'IMDS stores encryption keys that can be directly used to decrypt data',
      'IMDSv1 allows simple GET requests to 169.254.169.254 to retrieve IAM role credentials; IMDSv2 requires a session token via PUT request, blocking SSRF attacks that can only issue GET requests',
      'IMDS is only accessible from outside the VPC',
      'IMDSv2 disables the metadata service entirely',
    ],
    answer: 1,
    explanation: 'The Capital One breach (2019) exploited SSRF to reach IMDSv1 (a simple GET to http://169.254.169.254) and extract IAM role credentials. IMDSv2 requires a PUT request to get a session token first, then uses that token in subsequent requests. Since most SSRF vulnerabilities only allow GET requests, this blocks the most common exploitation path.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'What is the purpose of container image scanning in a CI/CD pipeline?',
    options: [
      'To reduce the image file size',
      'To detect known vulnerabilities (CVEs), embedded secrets, misconfigurations, and malicious packages in container images before they reach production',
      'To convert images between different container formats',
      'To test application functionality inside the container',
    ],
    answer: 1,
    explanation: 'Image scanning tools (Trivy, Snyk Container, Grype, ECR scanning) analyze container image layers for: known OS/library CVEs, hardcoded secrets/tokens, misconfigured permissions, and malicious packages. Scanning in CI/CD ("shift left") catches vulnerabilities before deployment. Continuous scanning in registries catches newly discovered CVEs in already-deployed images.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'In Kubernetes, what does Pod Security Admission (PSA) enforce?',
    options: [
      'Network encryption between pods',
      'Security standards that restrict pod configurations — preventing privileged containers, host namespace access, root execution, and dangerous capabilities',
      'Automatic scaling of pods based on load',
      'Authentication of users accessing the Kubernetes API',
    ],
    answer: 1,
    explanation: 'PSA (replacing PodSecurityPolicy) enforces three security levels: Privileged (unrestricted), Baseline (prevents known privilege escalations), and Restricted (hardened best practices). Restricted prevents: running as root, privilege escalation, host networking/PID/IPC, hostPath mounts, and dangerous capabilities. Applied per-namespace via labels.',
  },

  // Chapter 6: Serverless & Application Security
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'What is "event injection" in serverless computing?',
    options: [
      'Adding more events to a queue for load testing',
      'An attack where malicious input is crafted in event data (S3 filenames, API parameters, queue messages) to exploit the function processing it',
      'Injecting events into another account\'s Lambda functions',
      'Overloading a function with too many events to cause denial of service',
    ],
    answer: 1,
    explanation: 'Serverless functions are triggered by events from many sources (API Gateway, S3, SQS, DynamoDB Streams). Attackers can inject malicious payloads in event data: a filename containing shell commands, an API body with SQL injection, or a queue message with deserialization exploits. Functions must validate and sanitize ALL event input regardless of the source.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'Why should secrets never be stored in Lambda environment variables without encryption?',
    options: [
      'Environment variables are too slow to read',
      'Environment variables are visible in the Lambda console, CloudFormation templates, and API responses — anyone with Lambda:GetFunction permission can read them in plaintext',
      'Lambda does not support environment variables',
      'Environment variables are automatically shared with all functions in the account',
    ],
    answer: 1,
    explanation: 'Unencrypted environment variables are visible to anyone with IAM permissions to describe the function. Better approaches: use AWS Secrets Manager or Parameter Store (with KMS encryption), reference secrets at runtime via SDK calls, cache secrets in memory for the function\'s lifetime, and restrict Secrets Manager access via IAM. This follows the principle of defense in depth.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'How does API Gateway throttling help secure serverless applications?',
    options: [
      'It encrypts API responses',
      'It limits request rates per client/API key, preventing abuse, protecting backend resources from overload, and mitigating denial-of-wallet attacks on pay-per-invocation functions',
      'It blocks all traffic from outside the VPC',
      'It automatically patches function vulnerabilities',
    ],
    answer: 1,
    explanation: 'Serverless billing is per-invocation, making unthrottled APIs vulnerable to "denial-of-wallet" attacks — an attacker floods the API, generating massive Lambda invocations and costs. API Gateway throttling (rate limits, burst limits, usage plans per API key) plus Lambda reserved/provisioned concurrency limits prevent both cost explosion and backend overload.',
  },

  // Chapter 7: Data Security & Encryption
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'What is the difference between server-side encryption (SSE) and client-side encryption in cloud storage?',
    options: [
      'SSE is for servers and client-side is for mobile devices',
      'SSE encrypts data after the cloud provider receives it (provider manages encryption); client-side encrypts before upload, so the provider never sees plaintext',
      'SSE is stronger encryption than client-side',
      'Client-side encryption is only available for S3',
    ],
    answer: 1,
    explanation: 'SSE (SSE-S3, SSE-KMS, SSE-C) encrypts data at rest after the provider receives it — protects against physical disk theft but the provider processes plaintext momentarily. Client-side encryption encrypts before upload — the provider never sees plaintext, protecting against provider compromise or insider threats. The tradeoff: client-side adds complexity and prevents server-side processing.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'Why is KMS key rotation important, and how does AWS KMS handle it?',
    options: [
      'Key rotation changes the actual encrypted data',
      'Automatic rotation creates a new key version annually — new data uses the new version while old data remains readable via the previous version, limiting the impact of a compromised key',
      'Key rotation is only required for compliance, not security',
      'KMS does not support key rotation',
    ],
    answer: 1,
    explanation: 'Key rotation limits exposure: if a key version is compromised, only data encrypted with that version is at risk. AWS KMS automatic rotation creates new backing key material yearly while maintaining previous versions for decryption. The key ID stays the same — applications need no changes. Customer-managed CMKs support automatic rotation; AWS-managed keys rotate every 3 years.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'What is Data Loss Prevention (DLP) in the cloud context?',
    options: [
      'A backup service that prevents data loss from hardware failure',
      'Automated detection and prevention of sensitive data (PII, credentials, financial data) from being exposed, exfiltrated, or stored in unauthorized locations',
      'A disk redundancy technology like RAID',
      'Antivirus scanning of cloud storage',
    ],
    answer: 1,
    explanation: 'Cloud DLP (Google Cloud DLP, AWS Macie, Azure Purview) scans data stores, network traffic, and application outputs to identify sensitive data: SSNs, credit card numbers, API keys, PHI. It can automatically classify data, alert on exposure (public S3 buckets with PII), mask/redact sensitive fields, and enforce policies preventing sensitive data from leaving approved boundaries.',
  },

  // Chapter 8: Cloud Compliance Frameworks
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'What does a SOC 2 Type II report evaluate that a Type I does not?',
    options: [
      'Type II covers more trust service criteria',
      'Type II evaluates the operating effectiveness of controls over a period of time (typically 6-12 months), while Type I only evaluates design at a point in time',
      'Type II is for healthcare organizations only',
      'Type II is less rigorous than Type I',
    ],
    answer: 1,
    explanation: 'SOC 2 Type I: "Are the controls designed appropriately?" (point-in-time snapshot). SOC 2 Type II: "Did the controls actually work effectively over the review period?" (typically 6-12 months of evidence). Type II is more valuable to customers because it proves controls were consistently enforced, not just designed on paper. Most enterprises require Type II reports from cloud vendors.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'What makes FedRAMP authorization particularly rigorous for cloud providers?',
    options: [
      'It requires the cheapest pricing tier',
      'It mandates NIST 800-53 controls (325+ for Moderate, 421+ for High), continuous monitoring, annual assessments by a Third-Party Assessment Organization (3PAO), and authorization by a government agency',
      'It only requires an annual self-assessment questionnaire',
      'It applies only to classified data',
    ],
    answer: 1,
    explanation: 'FedRAMP implements NIST 800-53 controls: Low (125), Moderate (325), High (421). Requirements include: 3PAO assessment, agency authorization (ATO), continuous monitoring (monthly vulnerability scans, annual penetration testing), incident reporting within specified timeframes, and a Plan of Action & Milestones (POA&M) for remediation tracking.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'How does GDPR\'s "data residency" requirement affect cloud architecture?',
    options: [
      'It requires all data to be stored in the United States',
      'It restricts where EU personal data can be stored and processed, requiring cloud architectures to use specific regions and implement data transfer mechanisms (SCCs, adequacy decisions) for cross-border flows',
      'It only applies to data stored on physical hard drives',
      'GDPR has no requirements about data location',
    ],
    answer: 1,
    explanation: 'GDPR restricts transfer of EU personal data to countries without "adequate" data protection. Cloud architects must: deploy workloads in EU regions, configure services to prevent cross-region replication to non-adequate countries, implement Standard Contractual Clauses (SCCs) for necessary transfers, and use data residency controls. AWS, Azure, and GCP offer EU-only data boundary commitments.',
  },

  // Chapter 9: Security Monitoring & Logging
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'Why should AWS CloudTrail be enabled in all regions, not just the regions you actively use?',
    options: [
      'CloudTrail pricing is based on the number of regions enabled',
      'An attacker who gains access may operate in unused regions to avoid detection — activity in unmonitored regions would go completely unnoticed',
      'CloudTrail only works when enabled in all regions simultaneously',
      'AWS requires it for all accounts by default',
    ],
    answer: 1,
    explanation: 'Attackers commonly pivot to unused regions where monitoring may not exist: launching crypto-mining instances in ap-southeast-1 when the organization only uses us-east-1. With a multi-region trail, all API activity across every region is captured. Also enable CloudTrail for all accounts in an AWS Organization via organization trails, and alert on activity in "inactive" regions.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'What is the concept of "alert fatigue" in cloud security monitoring?',
    options: [
      'Alerts consuming too much network bandwidth',
      'Security teams becoming desensitized to the high volume of alerts — many false positives — causing them to miss or ignore genuinely critical alerts',
      'Hardware failure from too many alerts being stored',
      'Users getting tired of MFA prompts',
    ],
    answer: 1,
    explanation: 'Cloud environments generate enormous telemetry. Without tuning, SIEM/CSPM tools produce thousands of alerts daily, most benign or low-priority. Overwhelmed analysts start ignoring alerts, missing real threats. Mitigation: tune detection rules to reduce false positives, implement alert severity tiers, automate triage of common alerts via SOAR, and focus on high-fidelity detections aligned to ATT&CK techniques.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'What is the benefit of centralizing cloud logs in a dedicated security account?',
    options: [
      'It reduces storage costs',
      'It prevents attackers who compromise a workload account from tampering with or deleting forensic evidence, ensuring log integrity for investigations',
      'It makes logs easier to search by reducing volume',
      'It is required by all cloud providers',
    ],
    answer: 1,
    explanation: 'If logs are stored in the same account an attacker compromises, they can delete CloudTrail logs, clear VPC Flow Logs, or modify S3 access logs to cover tracks. Centralizing logs in a separate, locked-down security/log-archive account (with S3 Object Lock, cross-account replication, and restrictive IAM) ensures log integrity even if workload accounts are fully compromised.',
  },

  // Chapter 10: Cloud Security Posture Management (CSPM)
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'What type of security issue does CSPM primarily detect?',
    options: [
      'Zero-day exploits in application code',
      'Cloud infrastructure misconfigurations — public S3 buckets, overly permissive security groups, unencrypted databases, missing MFA, and CIS benchmark violations',
      'Physical security breaches at data centers',
      'Employee phishing susceptibility',
    ],
    answer: 1,
    explanation: 'CSPM tools (Wiz, Prisma Cloud, AWS Security Hub, Azure Defender) continuously scan cloud configurations against benchmarks (CIS, AWS Well-Architected). They detect: publicly accessible storage, overly permissive IAM policies, unencrypted volumes, security groups allowing 0.0.0.0/0 on sensitive ports, missing logging, and non-compliant configurations. Misconfigurations cause ~80% of cloud breaches.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'What is "policy-as-code" using Open Policy Agent (OPA) and Rego?',
    options: [
      'Writing security documentation in a programming language',
      'Defining security and compliance policies as executable code that can be version-controlled, tested, and automatically enforced across infrastructure deployments',
      'Converting firewall rules into Python scripts',
      'Using AI to generate security policies',
    ],
    answer: 1,
    explanation: 'OPA/Rego allows policies like "no public S3 buckets," "all EBS volumes must be encrypted," or "pods cannot run as root" to be written as code, stored in Git, tested in CI, and enforced at deploy time (Terraform plan validation, Kubernetes admission control, CI/CD gates). HashiCorp Sentinel, AWS Config Rules, and Azure Policy offer similar capabilities.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'What is "configuration drift" and why is it a security concern?',
    options: [
      'When cloud provider APIs change over time',
      'When deployed infrastructure gradually diverges from its defined secure state — through manual changes, emergency fixes, or undocumented modifications — potentially introducing vulnerabilities',
      'When encryption keys expire naturally over time',
      'When network latency increases during peak hours',
    ],
    answer: 1,
    explanation: 'IaC (Terraform, CloudFormation) defines the desired secure state, but manual console changes, emergency hotfixes, and ad-hoc modifications cause drift. A security group might be opened for debugging and never closed. CSPM tools detect drift by comparing live configurations to the defined state, alerting when reality diverges from the approved baseline.',
  },

  // Chapter 11: DevSecOps & Shift-Left Security
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'What does "shift-left security" mean in the context of DevSecOps?',
    options: [
      'Moving security servers to the left side of the network diagram',
      'Integrating security testing earlier in the development lifecycle — in the IDE, at commit, and in CI/CD — rather than only testing in production or pre-deployment',
      'Prioritizing left-to-right reading of security logs',
      'Having the security team sit to the left of the development team',
    ],
    answer: 1,
    explanation: 'Traditional security operates late: penetration tests before release, production monitoring after deployment. Shift-left moves security earlier: IDE plugins catch secrets in code as typed, pre-commit hooks scan for vulnerabilities, CI pipelines run SAST/DAST/IaC scanning, and PR reviews include security checks. Earlier detection is cheaper and faster to fix.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'Why is scanning Infrastructure-as-Code (IaC) templates important for cloud security?',
    options: [
      'IaC templates are written in insecure languages',
      'IaC templates define the actual cloud infrastructure — scanning them catches misconfigurations (public buckets, open security groups, unencrypted resources) before they are deployed',
      'IaC templates always contain malware',
      'Scanning is required to convert IaC between cloud providers',
    ],
    answer: 1,
    explanation: 'IaC (Terraform, CloudFormation, Pulumi) templates declare cloud resources before deployment. Scanning tools (Checkov, tfsec, KICS, Snyk IaC) analyze templates for misconfigurations: S3 buckets without encryption, security groups with 0.0.0.0/0 ingress, RDS without backups, IAM policies with \'*\' permissions. Catching these in CI prevents insecure resources from ever being created.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'What is the SLSA (Supply-chain Levels for Software Artifacts) framework designed to protect?',
    options: [
      'Runtime application security',
      'The integrity of the software supply chain — ensuring that build artifacts haven\'t been tampered with, build processes are reproducible, and provenance is verifiable',
      'Database encryption at rest',
      'Network traffic between microservices',
    ],
    answer: 1,
    explanation: 'SLSA (pronounced "salsa") defines four levels of supply chain security: from basic (L1: documentation of build process) to hardened (L4: two-person review, hermetic builds, verified provenance). It addresses threats like SolarWinds (compromised build system), codecov (tampered CI script), and event-stream (malicious dependency) by ensuring artifact integrity and build provenance.',
  },

  // Chapter 12: Incident Response in the Cloud
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'How does incident response in the cloud differ from traditional on-premises IR?',
    options: [
      'Cloud IR is simpler because there are no servers to investigate',
      'Cloud IR relies heavily on API logs and provider telemetry instead of physical evidence, and containment uses IAM/network controls that can be applied programmatically at scale',
      'Cloud IR requires physical access to data centers',
      'There is no difference — the same tools and processes apply',
    ],
    answer: 1,
    explanation: 'Cloud IR differences: no physical disk seizure (use EBS snapshots, memory dumps via SSM), containment via IAM policy changes and security group modifications (instant, scriptable), evidence in CloudTrail/VPC Flow Logs/GuardDuty rather than syslog, and ephemeral workloads (containers/Lambda) that may disappear before investigation. Automation and pre-built runbooks are essential.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'What is the recommended first containment action when an IAM access key is suspected to be compromised?',
    options: [
      'Delete the IAM user entirely',
      'Disable the access key (don\'t delete it — preserve for forensics), apply a deny-all inline policy, and revoke active sessions by invalidating temporary credentials',
      'Change the account\'s root password',
      'Shut down all EC2 instances in the account',
    ],
    answer: 1,
    explanation: 'Disable (don\'t delete) the key to stop new API calls while preserving the key ID for log correlation. Apply an explicit deny-all policy to prevent any action. Revoke existing sessions (add a condition denying tokens issued before now). Then investigate: review CloudTrail for actions taken with the key, check for persistence mechanisms (new users, roles, keys) the attacker may have created.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'Why is automated containment (via SOAR/Lambda) valuable for cloud incident response?',
    options: [
      'It eliminates the need for human analysts entirely',
      'Cloud attacks can escalate in seconds — automated playbooks can isolate compromised resources, revoke credentials, and snapshot evidence faster than manual response',
      'It costs less than manual investigation',
      'Cloud providers require automated response for all incidents',
    ],
    answer: 1,
    explanation: 'In cloud environments, attackers can programmatically create resources, exfiltrate data, and escalate privileges in seconds via API calls. Automated response (GuardDuty → EventBridge → Lambda/Step Functions) can: quarantine an instance by changing its security group, disable a compromised access key, snapshot an EBS volume for forensics, and alert the IR team — all within seconds of detection.',
  },

  // Chapter 13: Multi-Cloud & Emerging Cloud Security
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'What is a CNAPP (Cloud-Native Application Protection Platform)?',
    options: [
      'A specific cloud provider\'s native security service',
      'A unified platform that converges CSPM, CWPP, CIEM, and application security into a single solution for comprehensive cloud-native security across the full lifecycle',
      'A container-only security scanning tool',
      'A compliance certification for cloud applications',
    ],
    answer: 1,
    explanation: 'CNAPP (Gartner coined, 2021) unifies previously separate tools: CSPM (configuration scanning), CWPP (workload protection), CIEM (identity entitlement management), IaC scanning, container security, and API security into one platform. Vendors like Wiz, Prisma Cloud, Orca, and Lacework provide CNAPP solutions that correlate risks across layers — e.g., a misconfigured VM with an overprivileged role running a vulnerable container.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'What unique security challenges do AI/ML workloads introduce in cloud environments?',
    options: [
      'AI/ML workloads don\'t have any unique security concerns',
      'Model theft/extraction, training data poisoning, prompt injection, large GPU instance costs from abuse, and sensitive data exposure in training datasets',
      'AI/ML workloads are immune to traditional security threats',
      'The only concern is the compute cost of GPU instances',
    ],
    answer: 1,
    explanation: 'AI/ML workloads introduce novel risks: model theft (extracting proprietary models via APIs), data poisoning (corrupting training data to influence model behavior), adversarial inputs, PII in training data (GDPR implications), prompt injection (LLM-specific), expensive GPU instances as crypto-mining targets, and model supply chain risks (malicious models on Hugging Face). Security teams must extend traditional controls to these new attack surfaces.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'What does "confidential computing" provide that standard cloud encryption does not?',
    options: [
      'Stronger encryption algorithms',
      'Protection of data while it is being processed (in-use) using hardware-based Trusted Execution Environments (TEEs), preventing even the cloud provider from accessing plaintext data during computation',
      'Faster encryption and decryption speeds',
      'Automatic key management without KMS',
    ],
    answer: 1,
    explanation: 'Standard encryption protects data at rest and in transit, but data must be decrypted for processing — leaving it exposed in memory. Confidential computing (Intel SGX, AMD SEV, ARM CCA, AWS Nitro Enclaves, Azure Confidential VMs) uses hardware-backed TEEs to keep data encrypted even during processing. The cloud provider\'s admins cannot access data inside the enclave, enabling sensitive workloads on shared infrastructure.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
