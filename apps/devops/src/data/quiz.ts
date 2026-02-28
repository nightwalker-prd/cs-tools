export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ============================================================
  // Topic 1: Docker & Containers (chapterId: 1)
  // ============================================================
  {
    id: "t1-q1",
    chapterId: 1,
    question:
      "Why does Docker use a layered filesystem for container images?",
    options: [
      "To encrypt each layer independently for security",
      "To enable caching and deduplication — unchanged layers are reused across builds and images, reducing build times and storage by only transferring or storing unique layers",
      "To allow each layer to run on a different operating system",
      "To improve runtime performance by loading layers in parallel",
    ],
    answer: 1,
    explanation:
      "Docker's layered filesystem (OverlayFS) stacks read-only layers where each Dockerfile instruction creates a new layer. Layers are content-addressed by SHA256 digest, meaning identical layers are stored only once on disk and in registries. When pulling an image, only layers not already present need to be downloaded. During builds, unchanged layers are served from cache, making rebuilds after minor code changes take seconds instead of minutes.",
  },
  {
    id: "t1-q2",
    chapterId: 1,
    question:
      "What is the primary benefit of multi-stage Docker builds?",
    options: [
      "They allow running multiple containers from a single Dockerfile",
      "They enable building images for multiple CPU architectures simultaneously",
      "They separate build-time dependencies from the runtime image — the final stage copies only artifacts, reducing image size by 10-100x and shrinking the attack surface",
      "They automatically parallelize the build process for faster compilation",
    ],
    answer: 2,
    explanation:
      "Multi-stage builds use multiple FROM statements in a single Dockerfile. Early stages install compilers, build tools, and development dependencies to compile the application. The final stage starts from a minimal base image (alpine, distroless) and copies only the compiled binary or production files from earlier stages. This means build tools (gcc, npm, maven) are never in the production image, dramatically reducing size and the number of packages that could contain vulnerabilities.",
  },
  {
    id: "t1-q3",
    chapterId: 1,
    question:
      "Why should containers write logs to stdout/stderr instead of log files?",
    options: [
      "stdout/stderr is faster than writing to files",
      "Log files would be lost when the container stops — but more importantly, writing to stdout/stderr lets the container runtime (Docker, Kubernetes) collect, aggregate, and forward logs through a unified logging pipeline",
      "Container filesystems do not support file creation",
      "stdout/stderr automatically encrypts log data",
    ],
    answer: 1,
    explanation:
      "The 12-factor app methodology recommends treating logs as event streams. When containers write to stdout/stderr, the container runtime captures this output and can forward it to any logging backend (ELK, Loki, CloudWatch) through a log driver or sidecar. Writing to files inside the container creates operational problems: files are in the writable layer (lost on restart), require volume mounts to persist, and need per-container log rotation configuration. The unified stdout approach enables centralized logging without application-level log management.",
  },

  // ============================================================
  // Topic 2: Kubernetes Architecture (chapterId: 2)
  // ============================================================
  {
    id: "t2-q1",
    chapterId: 2,
    question:
      "What is the role of etcd in a Kubernetes cluster?",
    options: [
      "It schedules Pods onto worker nodes based on resource availability",
      "It runs health checks against Pods and restarts unhealthy ones",
      "It is the distributed key-value store that serves as the single source of truth for all cluster state — persisting resource definitions, configurations, and secrets using Raft consensus",
      "It manages container image caching on worker nodes",
    ],
    answer: 2,
    explanation:
      "etcd stores every Kubernetes resource (Pods, Services, ConfigMaps, Secrets, etc.) as key-value pairs. The API server reads from and writes to etcd for all cluster operations. etcd uses the Raft consensus protocol to replicate data across multiple nodes for high availability — ensuring cluster state survives node failures. Because etcd is the single source of truth, its corruption or loss effectively destroys the cluster's configuration, making regular backups critical.",
  },
  {
    id: "t2-q2",
    chapterId: 2,
    question:
      "How does a Kubernetes Deployment handle a failed rolling update?",
    options: [
      "It immediately deletes all Pods and starts fresh",
      "It continues the rollout regardless of failures",
      "If new Pods fail their readiness probes, the rollout automatically pauses — the old Pods remain running and serving traffic, and a single 'kubectl rollout undo' command reverts to the previous version",
      "It sends an email notification to the cluster administrator",
    ],
    answer: 2,
    explanation:
      "During a rolling update, the Deployment controller creates new Pods with the updated spec and waits for each to pass its readiness probe before terminating old Pods. If new Pods fail readiness checks (application crash, health check failure), the rollout pauses — the maxUnavailable parameter ensures a minimum number of old Pods keep running. The deployment status shows the rollout is stuck, and 'kubectl rollout undo' reverts the Deployment spec to the previous revision, triggering a new rollout back to the known-good version.",
  },
  {
    id: "t2-q3",
    chapterId: 2,
    question:
      "What problem do taints and tolerations solve in Kubernetes scheduling?",
    options: [
      "They speed up container image downloads on nodes",
      "They encrypt communication between Pods on different nodes",
      "They allow nodes to repel Pods unless those Pods explicitly tolerate the taint — enabling dedicated node pools (GPU nodes, high-memory) and node maintenance (drain without new Pods landing)",
      "They automatically scale the number of nodes in the cluster",
    ],
    answer: 2,
    explanation:
      "Taints are applied to nodes (e.g., 'gpu=true:NoSchedule') and repel all Pods that do not have a matching toleration. This ensures that only workloads that specifically need GPU resources are scheduled onto expensive GPU nodes, while general workloads use regular nodes. During maintenance, adding a NoSchedule taint prevents new Pods from being placed on the node, and a NoExecute taint evicts existing Pods — enabling graceful node draining without disrupting the scheduler's normal operation.",
  },

  // ============================================================
  // Topic 3: Kubernetes Networking & Storage (chapterId: 3)
  // ============================================================
  {
    id: "t3-q1",
    chapterId: 3,
    question:
      "Why might a team choose Cilium over Calico as their Kubernetes CNI plugin?",
    options: [
      "Cilium is simpler to configure than Calico",
      "Cilium uses eBPF to implement networking, security, and observability directly in the Linux kernel — bypassing iptables entirely for higher performance and richer visibility into traffic flows",
      "Cilium does not require any Linux kernel support",
      "Cilium is the only CNI that supports Network Policies",
    ],
    answer: 1,
    explanation:
      "Cilium leverages eBPF (extended Berkeley Packet Filter) to attach programs directly to the Linux kernel's networking stack. This bypasses the traditional iptables chain processing, which becomes a performance bottleneck with thousands of services (each service adds iptables rules). Cilium also provides deep observability (Hubble) showing Layer 7 traffic flows, DNS queries, and HTTP request details — visibility that iptables-based CNIs cannot offer. However, Cilium requires Linux kernel 5.4+ and has a steeper learning curve than Calico.",
  },
  {
    id: "t3-q2",
    chapterId: 3,
    question:
      "What is the difference between a ClusterIP and a LoadBalancer Service in Kubernetes?",
    options: [
      "ClusterIP is for TCP traffic and LoadBalancer is for UDP traffic",
      "ClusterIP creates a virtual IP reachable only within the cluster — LoadBalancer provisions an external cloud load balancer that routes traffic from outside the cluster to the service",
      "ClusterIP supports multiple ports while LoadBalancer supports only one",
      "LoadBalancer is free while ClusterIP costs money per hour",
    ],
    answer: 1,
    explanation:
      "ClusterIP is the default Service type — it assigns an internal virtual IP that is only routable within the Kubernetes cluster network. Pods can reach the service but external clients cannot. LoadBalancer extends NodePort (which itself extends ClusterIP) by requesting the cloud provider to create an external load balancer (AWS NLB/ALB, GCP LB, Azure LB) with a public IP. External traffic hits the cloud LB, which forwards to NodePort on each node, which routes to the ClusterIP, which reaches the Pods. Each LoadBalancer Service typically costs money because a real cloud load balancer is provisioned.",
  },
  {
    id: "t3-q3",
    chapterId: 3,
    question:
      "Why are StatefulSets needed for databases in Kubernetes when Deployments exist?",
    options: [
      "StatefulSets use less memory than Deployments",
      "StatefulSets provide stable, persistent network identities (pod-0, pod-1) and dedicated PersistentVolumes for each replica — ensuring that when a Pod is rescheduled, it reconnects to its own storage rather than getting a random volume",
      "Deployments cannot mount volumes",
      "StatefulSets automatically backup database data",
    ],
    answer: 1,
    explanation:
      "Deployment Pods are interchangeable — they get random names, any Pod can be replaced with any other, and they share volume claims. Databases need stable identity: a PostgreSQL replica must reconnect to its specific data directory, and Pods must be started/stopped in order (primary before replicas). StatefulSets provide: stable hostnames (db-0, db-1, db-2) that persist across rescheduling, volumeClaimTemplates that give each Pod its own PersistentVolumeClaim, and ordered graceful deployment and scaling.",
  },

  // ============================================================
  // Topic 4: Container Security (chapterId: 4)
  // ============================================================
  {
    id: "t4-q1",
    chapterId: 4,
    question:
      "Why is running containers as root dangerous even though containers provide isolation?",
    options: [
      "Root containers use more CPU and memory",
      "Container isolation relies on Linux namespaces and cgroups which have had escape vulnerabilities — if an attacker escapes a root container, they gain root on the host; a non-root container limits the blast radius to an unprivileged user",
      "Root containers cannot access the network",
      "Root containers are not supported by Kubernetes",
    ],
    answer: 1,
    explanation:
      "Container isolation is implemented by Linux kernel features (namespaces, cgroups, seccomp) that have historically had vulnerabilities (CVE-2019-5736 in runc allowed container escape to host root). If a container runs as root (UID 0) and an escape exploit is found, the attacker immediately has root access on the host machine. Running as a non-root user means even a successful escape results in an unprivileged user on the host, significantly limiting the attacker's capabilities. User namespace remapping adds another layer by mapping container root to an unprivileged host UID.",
  },
  {
    id: "t4-q2",
    chapterId: 4,
    question:
      "What does an SBOM (Software Bill of Materials) provide for container security?",
    options: [
      "It encrypts the container image for secure transmission",
      "It provides a runtime firewall for the container",
      "It is a complete inventory of all software components (packages, libraries, versions) in the image — enabling rapid identification of affected images when a new CVE is disclosed",
      "It limits the CPU and memory available to the container",
    ],
    answer: 2,
    explanation:
      "When a new vulnerability like Log4Shell (CVE-2021-44228) is announced, the first question is 'which of our images contain the vulnerable component?' Without SBOMs, teams must scan every image from scratch. With SBOMs (in SPDX or CycloneDX format), you have a pre-generated inventory of every package and library in every image — a simple query against the SBOM database instantly identifies all affected images. SBOMs also enable compliance reporting and license tracking across the entire container fleet.",
  },
  {
    id: "t4-q3",
    chapterId: 4,
    question:
      "What is the difference between Pod Security Admission's Baseline and Restricted levels?",
    options: [
      "Baseline allows containers to run as root while Restricted does not",
      "Baseline blocks known privilege escalation vectors (hostNetwork, privileged mode) while remaining compatible with most workloads — Restricted additionally requires non-root, drops all capabilities, enforces read-only root filesystem, and blocks privilege escalation",
      "Restricted is for development and Baseline is for production",
      "There is no difference — they are aliases for the same policy",
    ],
    answer: 1,
    explanation:
      "The Baseline level prevents the most dangerous configurations: no hostNetwork, hostPID, or hostIPC; no privileged containers; no hostPath volumes of sensitive paths. Most applications can run under Baseline without changes. The Restricted level goes further: it requires runAsNonRoot, drops ALL Linux capabilities (only allows NET_BIND_SERVICE if needed), enforces readOnlyRootFilesystem, sets allowPrivilegeEscalation to false, and requires seccomp profile. Many off-the-shelf Helm charts fail under Restricted because they assume root access, requiring SecurityContext updates.",
  },

  // ============================================================
  // Topic 5: CI/CD Fundamentals (chapterId: 5)
  // ============================================================
  {
    id: "t5-q1",
    chapterId: 5,
    question:
      "Why is fast CI feedback (under 10 minutes) critical for development velocity?",
    options: [
      "Faster CI uses less cloud compute resources",
      "Developers must wait for CI before coding anything else",
      "Slow CI pipelines encourage batching changes and delaying integration — defeating the core CI principle of frequent, small merges and making failures harder to diagnose because they could come from any of many bundled changes",
      "CI systems have a hard timeout limit of 10 minutes",
    ],
    answer: 2,
    explanation:
      "The value of CI comes from integrating frequently with fast feedback. When a pipeline takes 45 minutes, developers batch multiple changes into one push, context-switch away, and lose the mental model of what they changed. If the build fails, the failure could be in any of the batched changes. With sub-10-minute pipelines, developers get results while the change is still fresh in mind, can fix issues immediately, and maintain the discipline of small, frequent integrations. Strategies for fast CI include parallel test execution, dependency caching, incremental builds, and fast test prioritization.",
  },
  {
    id: "t5-q2",
    chapterId: 5,
    question:
      "What distinguishes Continuous Delivery from Continuous Deployment?",
    options: [
      "Continuous Delivery uses Docker while Continuous Deployment uses VMs",
      "Continuous Delivery is faster than Continuous Deployment",
      "Continuous Delivery ensures every commit is release-ready with a manual approval gate before production — Continuous Deployment removes the gate and automatically deploys every passing commit to production",
      "Continuous Deployment only works with monorepos",
    ],
    answer: 2,
    explanation:
      "Both practices require the same foundation: comprehensive automated testing, artifact versioning, and deployment automation. The distinction is the manual gate. In Continuous Delivery, the pipeline produces a release-ready artifact and waits for human approval (product owner, release manager) before deploying to production. In Continuous Deployment, there is no manual step — if all automated checks pass, the change goes live automatically. Continuous Deployment requires higher confidence in test coverage and monitoring because there is no human safety net.",
  },
  {
    id: "t5-q3",
    chapterId: 5,
    question:
      "How does caching dependencies in CI pipelines improve build times?",
    options: [
      "Caching makes the tests run faster by pre-computing results",
      "Caching stores the final build artifact so the entire pipeline is skipped",
      "Caching preserves downloaded dependencies (npm packages, Docker layers, pip packages) between pipeline runs — avoiding redundant downloads and installations that can account for 50-80% of total build time",
      "Caching keeps the CI runner warm so it boots faster",
    ],
    answer: 2,
    explanation:
      "Without caching, every CI run starts from scratch: download all npm packages, pull base Docker images, install system dependencies. For a Node.js project with 500+ dependencies, 'npm install' alone can take 2-5 minutes. With a cache key based on the lockfile hash (package-lock.json), the node_modules directory is restored from cache in seconds if dependencies have not changed. Similarly, Docker layer caching avoids rebuilding unchanged layers. Combined, these caches can reduce a 15-minute pipeline to 3-5 minutes.",
  },

  // ============================================================
  // Topic 6: Testing in Pipelines (chapterId: 6)
  // ============================================================
  {
    id: "t6-q1",
    chapterId: 6,
    question:
      "Why is the 'testing pyramid' inverted (heavy on e2e, light on unit tests) considered an anti-pattern?",
    options: [
      "End-to-end tests are more expensive to write than unit tests",
      "End-to-end tests provide less code coverage",
      "An inverted pyramid means the test suite is slow, brittle, and expensive to maintain — e2e tests have timing issues, external dependencies, and take minutes per test, while unit tests run in milliseconds with precise failure localization",
      "Unit tests cannot be run in CI/CD pipelines",
    ],
    answer: 2,
    explanation:
      "The testing pyramid recommends many fast unit tests (milliseconds each, testing individual functions), fewer integration tests (seconds each, testing component interactions), and few e2e tests (minutes each, testing full user workflows). An inverted pyramid with mostly e2e tests creates a slow feedback loop (30+ minutes per CI run), flaky tests (browser timeouts, race conditions, external service outages), and poor failure localization (an e2e failure could be anywhere in the stack). The ideal pyramid provides fast, reliable feedback from the base while reserving expensive e2e tests for critical user journeys.",
  },
  {
    id: "t6-q2",
    chapterId: 6,
    question:
      "What does mutation testing measure that code coverage does not?",
    options: [
      "Mutation testing measures execution speed of tests",
      "Mutation testing measures the percentage of lines executed",
      "Mutation testing measures test quality by introducing small code changes (mutations) and checking if tests catch them — high coverage tests might all pass even with bugs if the tests do not actually assert correct behavior",
      "Mutation testing measures the number of test files in the project",
    ],
    answer: 2,
    explanation:
      "Code coverage tells you which lines were executed during testing, but not whether the tests actually verify correct behavior. A test that calls a function without asserting its return value achieves 100% coverage of that function but catches zero bugs. Mutation testing modifies the source code (e.g., changing '+' to '-', 'true' to 'false', removing a return statement) and runs the tests. If tests still pass after a mutation (a 'survived mutant'), it means the tests do not verify that behavior. A high mutation score (% of killed mutants) indicates tests that truly validate correctness.",
  },
  {
    id: "t6-q3",
    chapterId: 6,
    question:
      "What is the main advantage of contract testing over traditional integration testing in microservices?",
    options: [
      "Contract tests run faster because they test against mock servers",
      "Contract tests eliminate the need for any other testing",
      "Each service independently tests against a shared contract — you do not need both services running simultaneously, and broken contracts are detected before deployment rather than during integration",
      "Contract tests automatically fix API incompatibilities",
    ],
    answer: 2,
    explanation:
      "In traditional integration testing, you need both the consumer and provider services running to verify compatibility. This requires complex test environments, causes slow feedback, and creates interdependencies between team deployment schedules. With contract testing (Pact), the consumer defines expectations (I call GET /users/1 and expect {id: 1, name: string}), and the provider independently verifies it satisfies those expectations. Both run in their own CI pipelines. If the provider makes a breaking change, their contract verification fails before the change is deployed, preventing runtime integration failures.",
  },

  // ============================================================
  // Topic 7: Deployment Strategies (chapterId: 7)
  // ============================================================
  {
    id: "t7-q1",
    chapterId: 7,
    question:
      "What is the hardest part of implementing blue-green deployments?",
    options: [
      "Setting up two identical environments is too expensive",
      "The load balancer cannot switch traffic between environments",
      "Database schema migrations must be backward-compatible — both blue and green environments share the same database, so migrations must work with both the old and new application versions simultaneously",
      "Blue-green deployments do not support rollback",
    ],
    answer: 2,
    explanation:
      "Traffic switching between blue and green environments is straightforward (DNS, load balancer rules, Kubernetes service selectors). The real complexity is the database. If the green deployment adds a new required column and the blue deployment does not know about it, switching back to blue causes errors. Database changes must be additive (new nullable columns, new tables) and the old version must work with the new schema. This often requires multi-step migrations: deploy schema change first, deploy application change second, then optionally drop old columns after the rollback window closes.",
  },
  {
    id: "t7-q2",
    chapterId: 7,
    question:
      "How does automated canary analysis (Kayenta, Flagger) decide whether to promote or roll back a canary deployment?",
    options: [
      "It checks if the canary Pods are running without crashes",
      "It waits a fixed amount of time and then promotes automatically",
      "It statistically compares metrics (error rate, latency, saturation) between the canary and a baseline running the same traffic — if the canary is significantly worse, it automatically rolls back",
      "It requires manual approval from the engineering team",
    ],
    answer: 2,
    explanation:
      "Automated canary analysis runs the canary version alongside a baseline (copy of the current production version receiving the same percentage of traffic). The analysis engine collects metrics from both and uses statistical tests (Mann-Whitney U test, Kolmogorov-Smirnov) to determine if the canary's performance is significantly worse. If error rate is higher, latency percentiles are worse, or business metrics degrade, the canary is automatically rolled back. If metrics are comparable or better across multiple analysis intervals, the canary is progressively promoted (5% -> 20% -> 50% -> 100%).",
  },
  {
    id: "t7-q3",
    chapterId: 7,
    question:
      "Why should feature flags be treated as temporary and cleaned up after full rollout?",
    options: [
      "Feature flags slow down application performance",
      "Feature flags consume too much memory",
      "Accumulated feature flags create a combinatorial explosion of code paths that are difficult to test, reason about, and maintain — each flag doubles the number of possible code states that could occur in production",
      "Feature flag services charge per flag",
    ],
    answer: 2,
    explanation:
      "Each feature flag creates a branch in the code: if flag on, execute path A; else, execute path B. With 10 active flags, there are theoretically 2^10 = 1024 possible combinations of code paths. Testing all combinations is impractical, and unexpected interactions between flags can cause bugs that only appear under specific combinations. Old flags that were fully rolled out months ago but never removed add dead code paths, confuse new developers reading the code, and increase cognitive load. Best practice is to remove a flag within 1-2 sprints after 100% rollout.",
  },

  // ============================================================
  // Topic 8: Infrastructure as Code (chapterId: 8)
  // ============================================================
  {
    id: "t8-q1",
    chapterId: 8,
    question:
      "What happens when you run 'terraform plan' and why is it valuable?",
    options: [
      "It provisions all resources defined in the configuration",
      "It destroys existing infrastructure and recreates it",
      "It compares the desired state (configuration files) with the actual state (state file + real infrastructure) and shows what changes would be made — additions, modifications, and deletions — without actually making any changes",
      "It validates the HCL syntax without connecting to any cloud provider",
    ],
    answer: 2,
    explanation:
      "terraform plan is a dry-run that refreshes the state (queries actual infrastructure), compares it with the desired configuration, and outputs a detailed diff showing exactly what will be created (+), modified (~), or destroyed (-). This preview is critical because infrastructure changes can be destructive — accidentally destroying a production database is irreversible. The plan output shows resource names, attribute changes (old value -> new value), and whether a change requires replacement (destroy + recreate). Teams often require plan output to be reviewed in pull requests before apply is allowed.",
  },
  {
    id: "t8-q2",
    chapterId: 8,
    question:
      "Why does Terraform need a state file when the cloud provider already knows what resources exist?",
    options: [
      "The state file is just a cache for faster operations",
      "The state file maps resource addresses in configuration to real resource IDs — without it, Terraform cannot know which configured resource corresponds to which real resource, and it cannot compute accurate diffs or manage dependencies",
      "The cloud provider does not track resource metadata",
      "The state file stores the Terraform plan for later execution",
    ],
    answer: 1,
    explanation:
      "Terraform configuration says 'resource aws_instance web {}' but the real EC2 instance has an ID like 'i-0abc123def456'. The state file maps the configuration address (aws_instance.web) to the real resource ID (i-0abc123def456). Without this mapping, Terraform would not know if 'aws_instance.web' already exists or needs to be created. The state also tracks dependencies between resources, stores computed attributes (IP addresses, ARNs) as outputs, and records metadata needed for accurate planning. This is also why 'terraform import' exists — to bring existing resources under Terraform management by creating the mapping.",
  },
  {
    id: "t8-q3",
    chapterId: 8,
    question:
      "What is infrastructure drift and why is it a problem?",
    options: [
      "Drift is when Terraform configuration files become outdated with deprecated syntax",
      "Drift is when infrastructure costs exceed the budget",
      "Drift occurs when actual infrastructure differs from the IaC definition — caused by manual console changes, auto-scaling, or external scripts — making the IaC definitions unreliable and potentially causing unexpected changes on the next apply",
      "Drift is when multiple team members edit the same Terraform file",
    ],
    answer: 2,
    explanation:
      "Infrastructure drift means the real infrastructure has diverged from what the IaC configuration describes. Common causes: an engineer manually changed a security group rule via the AWS console, an auto-scaling event created instances not tracked in state, or a script modified a resource outside of Terraform. The danger is that the next 'terraform apply' may revert these manual changes (destroying a security group rule someone added for a hotfix), or the plan output becomes confusing because Terraform shows changes it did not expect. Drift detection tools periodically compare actual vs desired state and alert when they diverge.",
  },

  // ============================================================
  // Topic 9: Configuration & Secrets (chapterId: 9)
  // ============================================================
  {
    id: "t9-q1",
    chapterId: 9,
    question:
      "What does 'agentless' mean for Ansible and how does it differ from Chef or Puppet?",
    options: [
      "Ansible does not require installation on any machine",
      "Ansible does not require any programming language",
      "Ansible connects to managed nodes via SSH and executes tasks remotely — it does not require a persistent daemon on managed nodes, unlike Chef (chef-client agent) and Puppet (puppet agent) which require pre-installed agents that periodically pull configuration",
      "Ansible only works with cloud instances, not physical servers",
    ],
    answer: 2,
    explanation:
      "Chef and Puppet use an agent model: a daemon runs on every managed node, periodically connecting to a central server to pull and apply the latest configuration. This provides continuous convergence (drift is automatically corrected) but requires installing and maintaining agents on every node. Ansible takes the opposite approach: it connects via SSH (or WinRM for Windows), pushes tasks to the node, executes them, and disconnects. This is simpler to set up (no agents to install) but only enforces state when you run the playbook — manual changes between runs are not automatically corrected.",
  },
  {
    id: "t9-q2",
    chapterId: 9,
    question:
      "Why are dynamic secrets (generated on-demand by Vault) more secure than static secrets?",
    options: [
      "Dynamic secrets are encrypted with stronger algorithms",
      "Dynamic secrets are stored in a more secure location",
      "Each client receives unique, short-lived credentials that automatically expire — eliminating shared passwords, reducing the window of exposure if a credential is compromised, and providing a clear audit trail of which client used which credential",
      "Dynamic secrets do not require any authentication to access",
    ],
    answer: 2,
    explanation:
      "With static secrets, a database password is shared across all application instances and remains valid indefinitely. If it leaks, all instances are compromised, and rotation requires updating every consumer simultaneously. With Vault dynamic secrets, each application instance requests its own database credentials — Vault creates a unique username/password pair with a time-limited lease (e.g., 1 hour). If one credential is compromised, only that single instance is affected, the credential expires automatically, and the Vault audit log shows exactly which identity requested the compromised credential. No shared passwords, no indefinite validity, and full auditability.",
  },
  {
    id: "t9-q3",
    chapterId: 9,
    question:
      "What problem does SOPS (Secrets OPerationS) solve that .env files do not?",
    options: [
      "SOPS provides faster secret loading than .env files",
      "SOPS supports more programming languages",
      "SOPS encrypts secret values in place within YAML/JSON files — allowing secrets to be safely committed to Git with version history and code review, while .env files must be kept out of version control and distributed manually",
      "SOPS automatically rotates secrets while .env files do not",
    ],
    answer: 2,
    explanation:
      "The .env file approach requires keeping secrets out of Git (via .gitignore) and distributing them through secure channels (password managers, encrypted messages). This means secrets lack version history, are not code-reviewed, and can easily get out of sync across team members. SOPS encrypts only the values in a structured file (keys remain readable), using KMS, PGP, or age keys for encryption. The encrypted file is committed to Git — anyone can see which secrets exist (by key name) and review changes, but only authorized KMS/PGP key holders can decrypt the values. This provides GitOps workflow for secrets with full audit trail.",
  },

  // ============================================================
  // Topic 10: Cloud Architecture (chapterId: 10)
  // ============================================================
  {
    id: "t10-q1",
    chapterId: 10,
    question:
      "Why do cloud architectures use private subnets for databases and application servers?",
    options: [
      "Private subnets are faster than public subnets",
      "Private subnets cost less than public subnets",
      "Private subnets have no route to the Internet Gateway — resources in them cannot be reached from the internet, adding a network-level security boundary that protects against direct external attacks even if security groups are misconfigured",
      "Private subnets support more instances than public subnets",
    ],
    answer: 2,
    explanation:
      "Defense in depth means multiple layers of security. Even with correctly configured security groups, a database in a public subnet has a public IP that attackers can probe — a misconfigured security group could expose it directly. In a private subnet, there is no route to the Internet Gateway, so the database has no public IP and is physically unreachable from the internet. Access only comes through resources in the same VPC (application servers, bastion hosts). Outbound traffic from private subnets goes through a NAT Gateway, which does not allow inbound connections. This is a fundamental best practice for any cloud architecture.",
  },
  {
    id: "t10-q2",
    chapterId: 10,
    question:
      "What is the key difference between horizontal and vertical auto-scaling?",
    options: [
      "Horizontal scaling is faster than vertical scaling",
      "Horizontal scaling adds more instances to distribute load while vertical scaling increases the resources (CPU, RAM) of existing instances — horizontal scaling is preferred because it has no upper bound and supports zero-downtime scaling",
      "Vertical scaling only works with databases",
      "Horizontal scaling requires a load balancer while vertical scaling does not",
    ],
    answer: 1,
    explanation:
      "Vertical scaling (scale up) makes a single machine bigger — moving from 4 CPU to 16 CPU. It is simple but has limits (the largest available instance type), often requires downtime (stopping and resizing the instance), and creates a single point of failure. Horizontal scaling (scale out) adds more machines behind a load balancer. It has no theoretical upper bound, supports zero-downtime scaling (add instances while traffic is being served), and provides fault tolerance (losing one of ten instances loses 10% capacity, not 100%). However, horizontal scaling requires applications to be stateless or use shared storage, which is a design constraint.",
  },
  {
    id: "t10-q3",
    chapterId: 10,
    question:
      "What is a cold start in serverless computing and how is it mitigated?",
    options: [
      "A cold start is when the cloud region experiences an outage",
      "A cold start occurs when a function has not been invoked recently and the platform must provision a new execution environment — adding 100ms to 10s of latency; it is mitigated by provisioned concurrency which keeps instances pre-warmed",
      "A cold start is when a function runs out of memory",
      "A cold start is when the function code has syntax errors",
    ],
    answer: 1,
    explanation:
      "Serverless platforms like AWS Lambda create execution environments on demand. When a function has not been called recently, the platform must: allocate a microVM or container, download the deployment package, initialize the runtime (JVM startup, Node.js initialization), and execute any initialization code. This cold start adds significant latency — 100-200ms for Python/Node.js, 1-10 seconds for Java/C#. Provisioned concurrency keeps a specified number of execution environments always ready, eliminating cold starts for those instances but adding cost (you pay for idle warm instances). Alternatives include keeping functions warm with periodic pings or using lighter runtimes.",
  },

  // ============================================================
  // Topic 11: Monitoring & Metrics (chapterId: 11)
  // ============================================================
  {
    id: "t11-q1",
    chapterId: 11,
    question:
      "What is an error budget and how does it balance reliability with development velocity?",
    options: [
      "An error budget is the financial cost allocated for fixing production bugs",
      "An error budget is the maximum number of bugs allowed per sprint",
      "An error budget is the inverse of an SLO — a 99.9% availability SLO allows 43.2 minutes of downtime per month, which can be 'spent' on risky deployments; when the budget is exhausted, the team freezes changes and focuses on reliability",
      "An error budget is the number of alerts allowed before the team is paged",
    ],
    answer: 2,
    explanation:
      "The error budget concept from Google SRE provides an objective mechanism for balancing the competing goals of feature velocity and system reliability. A 99.9% SLO means 0.1% unreliability is acceptable — that is 43.2 minutes per month. If the service has been 99.99% reliable this month (only 4.3 minutes of errors), there is budget remaining for risky changes. If a bad deployment already consumed 40 minutes of the budget, the team should prioritize reliability work. This data-driven approach replaces subjective arguments about whether to ship features or fix tech debt with measurable criteria.",
  },
  {
    id: "t11-q2",
    chapterId: 11,
    question:
      "Why does Prometheus use a pull-based model (scraping) rather than having applications push metrics?",
    options: [
      "Pull is faster than push for metric collection",
      "Pull-based scraping means Prometheus controls the collection schedule, makes it easy to detect when targets are down (failed scrape = target unhealthy), and avoids the need for applications to know where to send metrics — push models require discovery in the other direction",
      "Push-based models do not support labels on metrics",
      "Prometheus cannot receive network connections",
    ],
    answer: 1,
    explanation:
      "In a pull model, Prometheus periodically scrapes /metrics endpoints on each target. Benefits: Prometheus controls the scrape interval (no thundering herd from all targets pushing simultaneously), a failed scrape is itself a signal (target is down), targets do not need to know where Prometheus is (just expose an HTTP endpoint), and you can curl the metrics endpoint manually for debugging. Push models require each application to know the metrics server address, handle buffering/retries if the server is unavailable, and make it harder to detect that an application has stopped reporting. The tradeoff is that pull cannot handle very short-lived processes — hence the Pushgateway for batch jobs.",
  },
  {
    id: "t11-q3",
    chapterId: 11,
    question:
      "Why should alerts be symptom-based (high error rate) rather than cause-based (high CPU)?",
    options: [
      "Symptom-based alerts are cheaper to compute",
      "Cause-based alerts cannot be configured in Prometheus",
      "Users experience symptoms not causes — high CPU might not affect users (efficient processing), while a low-CPU server could have 100% error rate (returning cached errors); alerting on symptoms ensures you only page when users are actually impacted",
      "Symptom-based alerts generate fewer notifications",
    ],
    answer: 2,
    explanation:
      "Cause-based alerts (CPU > 80%, disk > 90%, memory > 75%) often fire without user impact — a healthy service might run at 90% CPU under normal load. Conversely, a service returning errors from cache uses very little CPU while being completely broken. Symptom-based alerts (error rate > 1%, p99 latency > 500ms, availability below SLO) directly measure what users experience. If the error rate is fine, there is no reason to page someone at 3 AM about high CPU. Cause-based metrics are still valuable as dashboards for investigation, but they should not trigger pages. The Google SRE book calls this the 'symptoms vs causes' principle.",
  },

  // ============================================================
  // Topic 12: Logging & Tracing (chapterId: 12)
  // ============================================================
  {
    id: "t12-q1",
    chapterId: 12,
    question:
      "Why is structured logging (JSON) preferred over unstructured text logs in microservices?",
    options: [
      "JSON logs are smaller in size than text logs",
      "JSON logs are more human-readable than text logs",
      "Structured logs have named fields (timestamp, level, service, requestId) that log aggregation systems can parse, index, and filter — enabling queries like 'show all ERROR logs from service X with requestId Y' without fragile regex parsing",
      "JSON is the only format supported by Elasticsearch",
    ],
    answer: 2,
    explanation:
      "Unstructured logs like 'Error: connection timeout for user 123' require regex or grok patterns to extract the error type, user ID, and context — these patterns are fragile and break when log formats change. Structured JSON logs like {\"level\":\"error\", \"message\":\"connection timeout\", \"userId\":123, \"service\":\"auth\", \"requestId\":\"abc-123\"} have each field as a named, typed value. Log aggregation systems (Elasticsearch, Loki, Datadog) can directly index these fields, enabling fast queries, faceted search, and correlation across services by requestId without any custom parsing rules.",
  },
  {
    id: "t12-q2",
    chapterId: 12,
    question:
      "What is the difference between head-based and tail-based trace sampling?",
    options: [
      "Head-based samples the first N traces of the day while tail-based samples the last N",
      "Head-based sampling decides at the start of a trace (randomly sample 1% of all traces) while tail-based sampling buffers all spans and decides at the end — keeping traces with errors or high latency regardless of the sampling percentage",
      "Head-based is for HTTP traces and tail-based is for gRPC traces",
      "There is no practical difference between the two approaches",
    ],
    answer: 1,
    explanation:
      "Head-based sampling makes the keep/discard decision at the root span before any work is done — e.g., keep 1% of traces randomly. This is simple and cheap but means 99% of error traces are also discarded. You might miss the one trace that shows a rare production bug. Tail-based sampling buffers all spans temporarily and makes the decision after the trace completes — if the trace contains an error, has latency above a threshold, or matches a rule, it is kept regardless of the sampling rate. This ensures interesting traces are never lost, but requires a collector that can buffer and analyze all spans before deciding, which is more expensive and complex.",
  },
  {
    id: "t12-q3",
    chapterId: 12,
    question:
      "Why are correlation IDs essential for debugging in microservices architectures?",
    options: [
      "Correlation IDs encrypt communication between services",
      "Correlation IDs speed up request processing",
      "A single user request may traverse 10+ services — without a shared correlation ID propagated through all services, there is no way to connect the log entries, trace spans, and error reports from different services that all belong to the same user request",
      "Correlation IDs are required by HTTP specification",
    ],
    answer: 2,
    explanation:
      "In a monolith, you can follow a request through a single log file using thread ID. In microservices, a single user action (place an order) may involve the API gateway, auth service, inventory service, payment service, notification service, and more — each with their own logs. Without a correlation ID generated at the edge and propagated through all service calls (HTTP headers, message queue headers), logs from these services are disconnected. With a correlation ID, searching for 'requestId=abc-123' across all service logs shows the complete request journey, making it possible to trace where a failure occurred and why.",
  },

  // ============================================================
  // Topic 13: Incident Management & SRE (chapterId: 13)
  // ============================================================
  {
    id: "t13-q1",
    chapterId: 13,
    question:
      "Why are blameless postmortems more effective than identifying who made the mistake?",
    options: [
      "Blameless postmortems are shorter and faster to write",
      "Blameless postmortems do not require any documentation",
      "Blaming individuals discourages reporting errors and hides the systemic factors (missing guardrails, inadequate testing, confusing interfaces) that allowed a human error to cause an outage — blameless culture uncovers and fixes root causes",
      "Blameless postmortems mean no one is responsible for action items",
    ],
    answer: 2,
    explanation:
      "When organizations punish individuals for mistakes, engineers learn to hide errors, avoid risky improvements, and cover up near-misses. The real cause of outages is almost never a single person's mistake — it is the system that allowed that mistake to have catastrophic consequences. Why was there no automated check? Why could a single typo take down production? Why was there no rollback capability? Blameless postmortems focus on these systemic questions and produce action items that prevent entire categories of failures. The engineer who made the 'mistake' often has the best insight into what guardrails were missing.",
  },
  {
    id: "t13-q2",
    chapterId: 13,
    question:
      "What is the purpose of chaos engineering and when should you NOT practice it?",
    options: [
      "Chaos engineering tests developer productivity — do not practice it during sprints",
      "Chaos engineering verifies that resilience mechanisms (retries, circuit breakers, failover) actually work under real failure conditions — do not practice it without mature monitoring and observability, as you cannot measure impact without visibility",
      "Chaos engineering optimizes application performance — do not practice it on slow applications",
      "Chaos engineering tests security vulnerabilities — do not practice it on encrypted systems",
    ],
    answer: 1,
    explanation:
      "Many systems have resilience mechanisms (retries, timeouts, circuit breakers, failover) that are implemented but never tested under real conditions. Chaos engineering injects controlled failures (kill Pods, add network latency, revoke credentials) to verify these mechanisms work as expected. The prerequisite is mature observability — you must be able to measure the impact of injected failures in real-time and have abort mechanisms if the impact exceeds expectations. Without good monitoring, you are just randomly breaking things with no way to learn from the results. Start in non-production environments, establish a steady state, form a hypothesis, run the experiment, and measure.",
  },
  {
    id: "t13-q3",
    chapterId: 13,
    question:
      "What makes a good incident postmortem action item versus a bad one?",
    options: [
      "Good action items are vague so they can be interpreted flexibly",
      "Good action items should focus on retraining the engineer who caused the issue",
      "Good action items are specific, assigned to an owner, have a deadline, and address systemic causes — bad action items are vague ('improve monitoring'), unassigned, undated, and address symptoms rather than root causes",
      "Good action items require management approval before implementation",
    ],
    answer: 2,
    explanation:
      "Vague action items like 'improve monitoring' or 'be more careful' never get done because they have no clear definition of done, no owner accountable for completion, and no deadline. Effective action items are specific and measurable: 'Add a Prometheus alert for error rate > 1% on the payment service, assigned to Alice, due March 15' or 'Add a pre-deploy database migration validation check in CI, assigned to Bob, due end of sprint.' They address systemic causes (missing automated checks) rather than human factors (someone made a mistake). Tracking action items in a project management tool ensures they are completed and not just documented.",
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
