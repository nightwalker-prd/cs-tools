export interface Concept {
  id: string;
  name: string;
  description: string;
  keyPoints: string[];
  tradeoffs?: string[];
  realWorld?: string[];
}

export interface Topic {
  id: number;
  title: string;
  part: number;
  partTitle: string;
  summary: string;
  concepts: Concept[];
}

export type Chapter = Topic;

export const parts = [
  { id: 1, title: 'Containers & Orchestration' },
  { id: 2, title: 'CI/CD Pipelines' },
  { id: 3, title: 'Infrastructure' },
  { id: 4, title: 'Observability & Operations' },
];

export const topics: Topic[] = [
  // ============================================================
  // PART 1: Containers & Orchestration (Topics 1-4)
  // ============================================================
  {
    id: 1,
    title: 'Docker & Containers',
    part: 1,
    partTitle: 'Containers & Orchestration',
    summary:
      'Containers package an application with all its dependencies into a standardized unit, using OS-level virtualization to provide lightweight isolation without the overhead of full virtual machines.',
    concepts: [
      {
        id: 'container-images-layers',
        name: 'Container Images & Layers',
        description:
          'Container images are built from a series of read-only filesystem layers stacked together using a union filesystem, with a thin writable layer added at runtime.',
        keyPoints: [
          'Each instruction in a Dockerfile (RUN, COPY, ADD) creates a new layer — layers are cached and reused across builds and images, dramatically reducing build times and storage',
          'Images use content-addressable storage — each layer is identified by its SHA256 digest, enabling deduplication across the entire host',
          'The union filesystem (OverlayFS on Linux) merges all layers into a single coherent view — files in upper layers override those in lower layers',
          'Container registries (Docker Hub, ECR, GCR) store and distribute images — only layers not already present on the target need to be transferred',
          'Multi-platform images (manifests) allow a single tag to serve different architectures (amd64, arm64) — the runtime automatically pulls the correct variant',
        ],
        tradeoffs: [
          'More layers increase image size and pull time — squashing layers reduces size but loses cache granularity',
          'Layer caching speeds builds but can serve stale content if external resources change without invalidating the cache',
        ],
        realWorld: [
          'Docker Hub',
          'Amazon ECR',
          'Google Container Registry',
        ],
      },
      {
        id: 'dockerfile-best-practices',
        name: 'Dockerfile Best Practices',
        description:
          'Writing efficient Dockerfiles involves ordering instructions for optimal caching, minimizing image size, and following security conventions.',
        keyPoints: [
          'Multi-stage builds separate build-time dependencies from the runtime image — the final stage copies only artifacts, reducing image size by 10-100x',
          'Order instructions from least to most frequently changing — package installs before source code copies so dependency layers are cached across code changes',
          'Use specific base image tags (node:20.11-alpine) rather than latest to ensure reproducible builds — pin digests for maximum reproducibility',
          'Combine related RUN commands with && to reduce layer count, and clean up caches (apt-get clean, rm -rf /var/lib/apt/lists/*) in the same layer',
          'Use .dockerignore to exclude node_modules, .git, and build artifacts from the build context — reducing context transfer time and preventing secrets from leaking into images',
        ],
        tradeoffs: [
          'Alpine-based images are smaller but use musl libc instead of glibc, which can cause compatibility issues with some native modules',
          'Multi-stage builds add Dockerfile complexity but significantly reduce final image size and attack surface',
        ],
        realWorld: [
          'Distroless images by Google',
          'BuildKit parallel builds',
          'Hadolint Dockerfile linter',
        ],
      },
      {
        id: 'container-lifecycle-management',
        name: 'Container Lifecycle Management',
        description:
          'Managing the full lifecycle of containers from creation through runtime to termination, including resource constraints, health checks, and graceful shutdown.',
        keyPoints: [
          'Containers use Linux namespaces (pid, net, mnt, uts, ipc, user) for isolation and cgroups for resource limits (CPU, memory, I/O) — providing process-level sandboxing',
          'Health checks (HEALTHCHECK in Dockerfile or livenessProbe in Kubernetes) allow the orchestrator to detect and restart unhealthy containers automatically',
          'Graceful shutdown requires handling SIGTERM — applications should finish in-flight requests, close database connections, and exit cleanly within the termination grace period',
          'Container logging follows the 12-factor app principle — write to stdout/stderr and let the runtime (Docker, Kubernetes) collect and forward logs',
          'Restart policies (always, on-failure, unless-stopped) define how the daemon handles container crashes without external orchestration',
        ],
        tradeoffs: [
          'Tight resource limits prevent noisy neighbors but can cause OOM kills if set too low — requires iterative tuning based on actual usage patterns',
          'Running one process per container simplifies management but increases the number of containers to orchestrate',
        ],
        realWorld: [
          'Docker Compose for local dev',
          'Podman rootless containers',
          'containerd runtime',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Kubernetes Architecture',
    part: 1,
    partTitle: 'Containers & Orchestration',
    summary:
      'Kubernetes is a container orchestration platform that automates deployment, scaling, and management of containerized workloads through a declarative configuration model and a control loop architecture.',
    concepts: [
      {
        id: 'pods-services-deployments',
        name: 'Pods, Services & Deployments',
        description:
          'The core Kubernetes abstractions — Pods group containers, Services provide stable networking, and Deployments manage rollouts and scaling.',
        keyPoints: [
          'A Pod is the smallest deployable unit — one or more containers sharing the same network namespace (localhost), storage volumes, and lifecycle',
          'Services provide a stable virtual IP (ClusterIP) and DNS name for a set of Pods selected by labels — enabling service discovery without hard-coded addresses',
          'Deployments declare the desired state (replica count, image version, update strategy) and the controller continuously reconciles actual state to match',
          'Rolling updates replace Pods incrementally (maxSurge, maxUnavailable) — if readiness probes fail the rollout automatically pauses, and rollback is a single command',
          'Labels and selectors are the fundamental grouping mechanism — Services, Deployments, and other controllers use label selectors to identify which Pods they manage',
        ],
        tradeoffs: [
          'Pods are ephemeral by design — applications must be stateless or use PersistentVolumes, which adds complexity for stateful workloads',
          'Services add a layer of indirection (kube-proxy iptables/IPVS rules) that can introduce slight latency and debugging complexity',
        ],
        realWorld: [
          'Google Kubernetes Engine (GKE)',
          'Amazon EKS',
          'Azure AKS',
        ],
      },
      {
        id: 'control-plane-components',
        name: 'Control Plane Components',
        description:
          'The Kubernetes control plane consists of the API server, etcd, scheduler, and controller manager — together they form the brain of the cluster.',
        keyPoints: [
          'The API server (kube-apiserver) is the single entry point for all cluster operations — it validates, authenticates, and persists resource definitions to etcd',
          'etcd is a distributed key-value store providing the source of truth for all cluster state — it uses the Raft consensus protocol for high availability',
          'The scheduler (kube-scheduler) assigns Pods to nodes based on resource requirements, affinity/anti-affinity rules, taints/tolerations, and custom scoring plugins',
          'The controller manager runs reconciliation loops — the ReplicaSet controller ensures the right number of Pods, the Node controller monitors node health, etc.',
          'The kubelet on each worker node watches the API server for Pod assignments, manages container lifecycle via the container runtime (containerd/CRI-O), and reports status back',
        ],
        tradeoffs: [
          'etcd is the single point of truth — its failure or corruption can bring down the entire cluster, requiring careful backup and high-availability configuration',
          'The control plane adds operational overhead — for small deployments, managed Kubernetes services abstract this away but reduce control',
        ],
        realWorld: [
          'etcd backup strategies',
          'Managed control planes (EKS, GKE)',
          'kubeadm cluster bootstrapping',
        ],
      },
      {
        id: 'kubernetes-scheduling',
        name: 'Kubernetes Scheduling',
        description:
          'The scheduler determines which node should run each Pod by evaluating resource requests, constraints, and optimization policies.',
        keyPoints: [
          'Resource requests (minimum guaranteed) and limits (maximum allowed) for CPU and memory drive scheduling decisions — the scheduler places Pods on nodes with sufficient allocatable resources',
          'Node affinity and anti-affinity rules express preferences or requirements about which nodes a Pod can run on — based on node labels like zone, instance type, or custom tags',
          'Pod affinity/anti-affinity controls co-location — e.g., schedule web Pods near cache Pods (affinity) or spread replicas across failure domains (anti-affinity)',
          'Taints on nodes repel Pods unless they have matching tolerations — used to dedicate nodes for specific workloads (GPU nodes, high-memory) or drain nodes for maintenance',
          'Priority classes and preemption allow critical Pods to evict lower-priority ones when resources are scarce — ensuring system-critical workloads always have capacity',
        ],
        tradeoffs: [
          'Over-provisioning resource requests wastes cluster capacity but under-provisioning risks throttling (CPU) or OOM kills (memory)',
          'Complex affinity rules can make Pods unschedulable if no node satisfies all constraints — keep rules as simple as possible',
        ],
        realWorld: [
          'Cluster autoscaler',
          'Karpenter node provisioning',
          'Vertical Pod Autoscaler (VPA)',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Kubernetes Networking & Storage',
    part: 1,
    partTitle: 'Containers & Orchestration',
    summary:
      'Kubernetes networking provides flat Pod-to-Pod communication across nodes, while the storage subsystem abstracts persistent volumes from underlying infrastructure through a plugin architecture.',
    concepts: [
      {
        id: 'cni-plugins-networking',
        name: 'CNI Plugins & Networking',
        description:
          'The Container Network Interface (CNI) provides a standard for configuring network interfaces in Linux containers, with plugins implementing the actual network connectivity.',
        keyPoints: [
          'Kubernetes requires a flat network where every Pod can reach every other Pod by IP without NAT — CNI plugins implement this using overlay networks (VXLAN), BGP routing, or cloud-native VPC integration',
          'Calico uses BGP to advertise Pod routes directly, avoiding encapsulation overhead — it also provides network policy enforcement using iptables or eBPF',
          'Cilium uses eBPF (extended Berkeley Packet Filter) for high-performance networking, observability, and security enforcement directly in the Linux kernel — bypassing iptables entirely',
          'Flannel is the simplest CNI — it creates an overlay network using VXLAN encapsulation, trading performance for ease of setup',
          'Network Policies are Kubernetes resources that define firewall rules (ingress/egress) between Pods using label selectors — without a CNI that supports them, they are silently ignored',
        ],
        tradeoffs: [
          'Overlay networks (VXLAN) work anywhere but add encapsulation overhead (50+ bytes per packet) — native routing (BGP, VPC) is faster but requires specific infrastructure support',
          'eBPF-based CNIs (Cilium) offer superior performance and observability but require newer kernel versions (5.4+) and have a steeper learning curve',
        ],
        realWorld: [
          'Calico on bare metal',
          'AWS VPC CNI plugin',
          'Cilium service mesh',
        ],
      },
      {
        id: 'services-ingress',
        name: 'Services & Ingress',
        description:
          'Services provide internal load balancing and discovery, while Ingress controllers expose HTTP/HTTPS routes from outside the cluster to internal Services.',
        keyPoints: [
          'ClusterIP Services create a virtual IP reachable only within the cluster — kube-proxy programs iptables rules (or IPVS) to distribute traffic across backend Pods',
          'NodePort Services expose the service on a static port on every node — traffic to any node IP on that port is forwarded to the service, enabling external access without a load balancer',
          'LoadBalancer Services provision a cloud load balancer (ALB, NLB, GCP LB) that routes external traffic to the service — the standard way to expose services in cloud environments',
          'Ingress resources define HTTP routing rules (host-based, path-based) — an Ingress controller (NGINX, Traefik, AWS ALB Ingress) watches these resources and configures the actual reverse proxy',
          'The Gateway API is the successor to Ingress — it provides more expressive routing (header matching, traffic splitting), role-based resource ownership, and support for non-HTTP protocols',
        ],
        tradeoffs: [
          'NodePort requires managing port conflicts and firewall rules — LoadBalancer is simpler but costs money per service (one cloud LB each)',
          'A single Ingress controller handles all HTTP routing efficiently but becomes a single point of failure — running multiple replicas with anti-affinity mitigates this',
        ],
        realWorld: [
          'NGINX Ingress Controller',
          'Traefik',
          'AWS ALB Ingress Controller',
        ],
      },
      {
        id: 'persistent-volumes-configmaps',
        name: 'Persistent Volumes & ConfigMaps',
        description:
          'Kubernetes decouples storage from compute using PersistentVolumes and PersistentVolumeClaims, while ConfigMaps and Secrets inject configuration data into Pods.',
        keyPoints: [
          'PersistentVolumes (PV) represent a piece of storage provisioned by an admin or dynamically by a StorageClass — PersistentVolumeClaims (PVC) are requests for storage by Pods',
          'StorageClasses enable dynamic provisioning — when a PVC is created, the provisioner (EBS CSI driver, NFS, Ceph) automatically creates the underlying volume without admin intervention',
          'Access modes (ReadWriteOnce, ReadOnlyMany, ReadWriteMany) control how volumes can be mounted — most block storage (EBS, GCE PD) only supports ReadWriteOnce',
          'ConfigMaps store non-sensitive key-value configuration — mounted as files or injected as environment variables, they allow decoupling config from container images',
          'Secrets are like ConfigMaps but for sensitive data (passwords, tokens, TLS certs) — stored base64-encoded in etcd (encrypted at rest with proper configuration) and mounted as tmpfs volumes',
        ],
        tradeoffs: [
          'Dynamic provisioning simplifies operations but can lead to orphaned volumes if PVCs are deleted without proper reclaim policies (Retain vs Delete)',
          'StatefulSets provide stable storage and network identity for stateful apps but are significantly more complex to operate than stateless Deployments',
        ],
        realWorld: [
          'AWS EBS CSI driver',
          'Rook-Ceph storage operator',
          'External Secrets Operator',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Container Security',
    part: 1,
    partTitle: 'Containers & Orchestration',
    summary:
      'Container security spans the entire lifecycle — from scanning images for vulnerabilities during build, to enforcing runtime restrictions, to implementing cluster-wide security policies.',
    concepts: [
      {
        id: 'image-scanning-vulnerabilities',
        name: 'Image Scanning & Vulnerabilities',
        description:
          'Automated scanning of container images detects known vulnerabilities (CVEs) in OS packages and application dependencies before they reach production.',
        keyPoints: [
          'Scanners (Trivy, Snyk, Grype) analyze image layers to identify installed packages and match them against vulnerability databases (NVD, OS vendor advisories)',
          'Scanning should happen at multiple stages — in the CI pipeline (shift-left), in the registry (admission control), and continuously in production (new CVEs emerge daily)',
          'SBOMs (Software Bill of Materials) in SPDX or CycloneDX format provide a complete inventory of all software components in an image — enabling rapid response when new vulnerabilities are disclosed',
          'Admission controllers (OPA Gatekeeper, Kyverno) can block deployment of images with critical/high CVEs or images not signed by a trusted authority',
          'Base image selection dramatically impacts vulnerability count — distroless images (no shell, no package manager) have the smallest attack surface',
        ],
        tradeoffs: [
          'Strict vulnerability policies can block deployments even when CVEs have no practical exploit path — teams need a process for exceptions and risk acceptance',
          'Frequent scanning and blocking adds friction to the deployment pipeline — balance security rigor with developer velocity',
        ],
        realWorld: [
          'Trivy in CI/CD',
          'Snyk Container',
          'AWS ECR image scanning',
        ],
      },
      {
        id: 'rootless-containers',
        name: 'Rootless Containers',
        description:
          'Running containers without root privileges reduces the blast radius of container escapes by ensuring even a compromised container cannot gain host-level root access.',
        keyPoints: [
          'By default, containers run as root (UID 0) inside the container — if a container escape exploit is found, the attacker gains root on the host unless user namespace remapping is enabled',
          'The USER directive in Dockerfile sets a non-root user — combined with readOnlyRootFilesystem in the Pod security context, this significantly limits what a compromised container can do',
          'User namespaces remap UID 0 inside the container to a high-numbered unprivileged UID on the host — so even root inside the container is unprivileged on the host',
          'seccomp profiles restrict which Linux system calls a container can make — the default Docker profile blocks ~44 dangerous syscalls (e.g., mount, reboot, keyctl)',
          'AppArmor and SELinux provide mandatory access control (MAC) — confining containers to specific file paths, network operations, and capabilities beyond what standard permissions allow',
        ],
        tradeoffs: [
          'Some applications require root to bind to privileged ports (<1024) or access certain devices — these need capability grants (NET_BIND_SERVICE) rather than full root',
          'User namespace remapping can complicate volume permissions — files created inside the container may have unexpected ownership on the host',
        ],
        realWorld: [
          'Podman rootless mode',
          'Docker userns-remap',
          'Kubernetes SecurityContext',
        ],
      },
      {
        id: 'pod-security-standards',
        name: 'Pod Security Standards',
        description:
          'Kubernetes Pod Security Standards define three levels (Privileged, Baseline, Restricted) that enforce increasingly strict security configurations at the namespace level.',
        keyPoints: [
          'Pod Security Admission (PSA) replaced PodSecurityPolicies in Kubernetes 1.25 — it enforces security standards using namespace labels without requiring webhook infrastructure',
          'The Privileged level allows unrestricted access — used for system components (CNI plugins, monitoring agents) that require host-level access',
          'The Baseline level prevents known privilege escalation — blocks hostNetwork, hostPID, privileged containers, and most dangerous volume types while remaining compatible with most workloads',
          'The Restricted level is the most hardened — requires non-root, drops all capabilities, enforces read-only root filesystem, and disallows privilege escalation',
          'Enforcement modes (enforce, audit, warn) can be applied per namespace — allowing gradual rollout: warn first, then audit, then enforce',
        ],
        tradeoffs: [
          'The Restricted standard breaks many off-the-shelf Helm charts that assume root — migration requires updating SecurityContext in every Pod spec',
          'PSA is simple but coarse-grained (namespace-level only) — for fine-grained policies (e.g., requiring specific labels or images), use OPA Gatekeeper or Kyverno',
        ],
        realWorld: [
          'Pod Security Admission controller',
          'OPA Gatekeeper policies',
          'Kyverno policy engine',
        ],
      },
    ],
  },

  // ============================================================
  // PART 2: CI/CD Pipelines (Topics 5-7)
  // ============================================================
  {
    id: 5,
    title: 'CI/CD Fundamentals',
    part: 2,
    partTitle: 'CI/CD Pipelines',
    summary:
      'Continuous Integration ensures code changes are automatically built, tested, and validated, while Continuous Delivery/Deployment extends this to reliably release software to production on demand or automatically.',
    concepts: [
      {
        id: 'continuous-integration',
        name: 'Continuous Integration',
        description:
          'Continuous Integration (CI) is the practice of merging developer changes into a shared mainline frequently, with each integration verified by automated builds and tests.',
        keyPoints: [
          'Developers push to the main branch at least daily — short-lived feature branches (< 1 day) reduce merge conflicts and integration risk',
          'Every push triggers an automated pipeline: compile, lint, unit tests, and static analysis — the build is either green (all pass) or red (broken, must be fixed immediately)',
          'The CI server (GitHub Actions, GitLab CI, Jenkins) provides reproducible build environments — typically using containers so builds are isolated and consistent',
          'Fast feedback is critical — CI pipelines should complete in under 10 minutes; slow pipelines encourage developers to skip or batch changes, defeating the purpose',
          'Build artifacts (binaries, Docker images, packages) are versioned and stored in artifact repositories — ensuring the exact same artifact tested in CI is what reaches production',
        ],
        tradeoffs: [
          'Trunk-based development with CI requires high test coverage and confidence — without it, frequent merges to main risk breaking production',
          'CI infrastructure costs scale with team size and push frequency — caching (dependencies, Docker layers, test results) is essential to control costs and time',
        ],
        realWorld: [
          'GitHub Actions',
          'GitLab CI/CD',
          'Jenkins',
        ],
      },
      {
        id: 'continuous-delivery-vs-deployment',
        name: 'Continuous Delivery vs Deployment',
        description:
          'Continuous Delivery ensures every change is release-ready with a manual approval gate, while Continuous Deployment automatically pushes every passing change to production.',
        keyPoints: [
          'Continuous Delivery (CD) means the main branch is always in a deployable state — releasing to production is a business decision, not a technical bottleneck',
          'Continuous Deployment removes the manual gate — every commit that passes all automated checks (tests, security scans, compliance) is automatically deployed to production',
          'Both require comprehensive automated testing (unit, integration, e2e) — the test suite is the safety net that replaces manual QA gates',
          'Deployment pipelines typically have stages: build -> test -> staging -> production — with automated gates (test pass rate, coverage thresholds) between each stage',
          'Release strategies (blue-green, canary) are implementation details of CD — they control how traffic shifts to the new version, not whether to deploy',
        ],
        tradeoffs: [
          'Continuous Deployment requires extreme confidence in automated testing — a missed regression goes straight to production, requiring robust rollback and monitoring',
          'Manual approval gates in Continuous Delivery provide a safety net but slow down delivery — the time between merge and production can grow if approvals bottleneck',
        ],
        realWorld: [
          'Amazon deploy-to-production pipeline',
          'Netflix Spinnaker',
          'Google continuous deployment',
        ],
      },
      {
        id: 'pipeline-stages-design',
        name: 'Pipeline Stages & Design',
        description:
          'Well-designed CI/CD pipelines organize steps into logical stages with appropriate parallelism, caching, and failure handling to maximize speed and reliability.',
        keyPoints: [
          'The testing pyramid guides stage ordering: fast unit tests first (seconds), then integration tests (minutes), then e2e tests (minutes-hours) — fail fast on cheap checks',
          'Parallel execution of independent stages (lint + unit test + security scan) dramatically reduces total pipeline time compared to sequential execution',
          'Caching dependencies (npm cache, pip cache, Docker layer cache) between runs avoids redundant downloads and compilation — often reducing build time by 50-80%',
          'Pipeline-as-code (.github/workflows/*.yml, .gitlab-ci.yml, Jenkinsfile) stores pipeline definitions alongside application code — versioned, reviewable, and reproducible',
          'Matrix builds run the same tests across multiple environments (Node 18/20/22, Linux/macOS/Windows) in parallel — ensuring compatibility without sequential runs',
        ],
        tradeoffs: [
          'More pipeline stages increase confidence but also increase total execution time — optimize by running stages in parallel and using incremental testing (only test changed modules)',
          'Shared CI runners are cost-efficient but can cause queue delays — dedicated runners provide faster feedback but cost more to maintain',
        ],
        realWorld: [
          'GitHub Actions matrix strategy',
          'GitLab CI/CD stages',
          'CircleCI workflows',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Testing in Pipelines',
    part: 2,
    partTitle: 'CI/CD Pipelines',
    summary:
      'Automated testing within CI/CD pipelines provides the confidence needed to deploy frequently, using a combination of unit, integration, and end-to-end tests with measurable quality gates.',
    concepts: [
      {
        id: 'test-automation-strategies',
        name: 'Test Automation Strategies',
        description:
          'Effective test automation balances speed, coverage, and maintenance cost across different test types following the testing pyramid model.',
        keyPoints: [
          'The testing pyramid: many fast unit tests (base), fewer integration tests (middle), few slow e2e tests (top) — inverted pyramids (heavy on e2e) are slow, brittle, and expensive to maintain',
          'Unit tests verify individual functions/classes in isolation using mocks/stubs — they run in milliseconds, provide precise failure localization, and form the foundation of test suites',
          'Integration tests verify interactions between components (API + database, service + service) — they catch interface mismatches that unit tests cannot detect',
          'End-to-end tests simulate real user workflows through the entire system (browser automation, API chains) — they provide the highest confidence but are slowest and most fragile',
          'Contract testing (Pact) verifies API compatibility between services without requiring both to run simultaneously — each service tests against a shared contract independently',
        ],
        tradeoffs: [
          'Heavy mocking in unit tests can give false confidence — tests pass but the real integration is broken because mocks do not match actual behavior',
          'End-to-end tests provide realistic validation but are slow, flaky (timing issues, external dependencies), and expensive to maintain — keep the count low and focused on critical paths',
        ],
        realWorld: [
          'Jest for unit testing',
          'Cypress/Playwright for e2e',
          'Pact for contract testing',
        ],
      },
      {
        id: 'coverage-gates-quality-metrics',
        name: 'Coverage Gates & Quality Metrics',
        description:
          'Quality gates enforce minimum standards (test coverage, code quality scores, security scan results) that must be met before code can progress through the pipeline.',
        keyPoints: [
          'Code coverage measures the percentage of code exercised by tests (line, branch, function) — it indicates what is NOT tested, not whether tests are good',
          'Coverage gates set minimum thresholds (e.g., 80% line coverage) — PRs that drop coverage below the threshold are blocked, preventing coverage erosion over time',
          'Static analysis tools (ESLint, SonarQube, semgrep) detect code quality issues (complexity, duplication, potential bugs) without running the code — they catch issues that tests miss',
          'Mutation testing (Stryker, PIT) measures test quality by introducing small code changes (mutations) and checking if tests catch them — a high mutation score means tests are actually verifying behavior',
          'Security gates (Snyk, Dependabot, SAST/DAST) block PRs with known vulnerable dependencies or code patterns — automating security review as part of the development workflow',
        ],
        tradeoffs: [
          'High coverage thresholds (95%+) can incentivize writing trivial tests (testing getters/setters) rather than meaningful ones — focus on critical path coverage instead',
          'Too many quality gates slow down the pipeline and frustrate developers — prioritize gates by impact and keep the total gate time under 15 minutes',
        ],
        realWorld: [
          'Codecov coverage reports',
          'SonarQube quality gates',
          'Stryker mutation testing',
        ],
      },
      {
        id: 'shift-left-testing',
        name: 'Shift-Left Testing',
        description:
          'Shift-left testing moves testing earlier in the development lifecycle — from post-deployment to pre-commit — catching issues when they are cheapest to fix.',
        keyPoints: [
          'Pre-commit hooks (Husky, pre-commit framework) run linters, formatters, and fast tests locally before code is pushed — catching issues in seconds rather than waiting for CI',
          'IDE integration (ESLint, TypeScript, IntelliSense) provides real-time feedback as developers type — the fastest possible feedback loop for type errors and common mistakes',
          'Trunk-based development with feature flags allows incomplete features to be merged to main safely — testing in production with real traffic on a subset of users',
          'Design-time testing involves threat modeling, architecture reviews, and testability considerations before code is written — preventing entire categories of issues',
          'Developer experience (DX) is critical — if local testing is slow or painful, developers will skip it; invest in fast feedback, hot reload, and easy test execution',
        ],
        tradeoffs: [
          'Too many pre-commit checks slow down the commit workflow and frustrate developers — keep pre-commit under 30 seconds and defer heavier checks to CI',
          'Shift-left requires investment in developer tooling and education — the payoff is large but the upfront cost is real',
        ],
        realWorld: [
          'Husky pre-commit hooks',
          'GitHub Copilot test generation',
          'LaunchDarkly feature flags',
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Deployment Strategies',
    part: 2,
    partTitle: 'CI/CD Pipelines',
    summary:
      'Deployment strategies control how new versions of software are rolled out to production, balancing speed of delivery against risk of regression through techniques like blue-green deployments, canary releases, and feature flags.',
    concepts: [
      {
        id: 'blue-green-deployments',
        name: 'Blue-Green Deployments',
        description:
          'Blue-green deployment maintains two identical production environments — one active (blue) and one idle (green) — with instant traffic switching for zero-downtime releases and instant rollbacks.',
        keyPoints: [
          'The blue environment serves all production traffic while the green environment is updated with the new version, tested, and validated in isolation',
          'Traffic switching happens at the load balancer or DNS level — a single change routes 100% of traffic from blue to green instantaneously',
          'Rollback is instantaneous — if the green environment has issues, switch traffic back to blue which is still running the previous version unchanged',
          'Database migrations must be backward-compatible — both blue and green must work with the same database during the transition period',
          'The idle environment can be used for final smoke testing, performance validation, and user acceptance testing with production-like traffic before switching',
        ],
        tradeoffs: [
          'Requires double the infrastructure during deployment — two full environments must be maintained, which doubles compute costs during transitions',
          'Database schema changes are the hard part — migrations must be additive (new columns, not renamed) to support both versions simultaneously',
        ],
        realWorld: [
          'AWS Elastic Beanstalk swap',
          'Cloud Foundry route switching',
          'Kubernetes service selector swap',
        ],
      },
      {
        id: 'canary-rolling-updates',
        name: 'Canary & Rolling Updates',
        description:
          'Canary releases route a small percentage of traffic to the new version for validation, while rolling updates gradually replace instances of the old version with the new.',
        keyPoints: [
          'Canary releases start by routing 1-5% of traffic to the new version — if metrics (error rate, latency, business KPIs) look healthy, traffic is gradually shifted (10%, 25%, 50%, 100%)',
          'Automated canary analysis (Kayenta, Flagger) compares metrics between canary and baseline versions — automatically promoting or rolling back based on statistical comparison',
          'Rolling updates (Kubernetes default) replace Pods one-at-a-time — the maxSurge and maxUnavailable parameters control how many Pods are updated simultaneously',
          'Readiness probes are critical for rolling updates — new Pods must pass their readiness check before old Pods are terminated, preventing traffic to unready instances',
          'Traffic shaping for canary releases can be implemented at the service mesh level (Istio, Linkerd) or the ingress controller level (NGINX weighted routing)',
        ],
        tradeoffs: [
          'Canary releases require sophisticated traffic splitting and metrics comparison infrastructure — simpler for large-scale systems but overhead for small deployments',
          'Rolling updates are simpler but provide less control — if 50% of instances are updated before a problem is detected, 50% of traffic has already been affected',
        ],
        realWorld: [
          'Flagger canary operator',
          'Argo Rollouts',
          'Istio traffic splitting',
        ],
      },
      {
        id: 'feature-flags-progressive-delivery',
        name: 'Feature Flags & Progressive Delivery',
        description:
          'Feature flags decouple deployment from release — code is deployed but features are toggled on/off at runtime, enabling progressive rollouts and instant kill switches.',
        keyPoints: [
          'Feature flags wrap new code in conditional checks (if flag enabled for this user) — the deployment ships to all servers but the feature is only active for targeted users',
          'Progressive delivery combines deployment strategies with feature flags — deploy to all instances, then gradually enable the feature for 1% -> 10% -> 50% -> 100% of users',
          'Targeting rules control who sees a feature — by user ID, percentage, geography, account type, or custom attributes — enabling beta programs and A/B testing',
          'Kill switches allow instant rollback without redeployment — if a feature causes issues, disable the flag and the old behavior is restored in seconds',
          'Flag lifecycle management is critical — feature flags should be temporary (removed after full rollout) to prevent technical debt from accumulating conditional code paths',
        ],
        tradeoffs: [
          'Feature flags add conditional complexity to the codebase — if not cleaned up after rollout, they create a combinatorial explosion of code paths that are hard to test and reason about',
          'External flag services (LaunchDarkly, Split) add a runtime dependency — if the flag service is down, applications need sensible defaults and local caching',
        ],
        realWorld: [
          'LaunchDarkly',
          'Split.io',
          'Unleash (open source)',
        ],
      },
    ],
  },

  // ============================================================
  // PART 3: Infrastructure (Topics 8-10)
  // ============================================================
  {
    id: 8,
    title: 'Infrastructure as Code',
    part: 3,
    partTitle: 'Infrastructure',
    summary:
      'Infrastructure as Code (IaC) manages infrastructure through machine-readable definition files rather than manual processes, enabling version control, peer review, and automated provisioning of cloud resources.',
    concepts: [
      {
        id: 'terraform-fundamentals',
        name: 'Terraform Fundamentals',
        description:
          'Terraform is a declarative IaC tool that provisions and manages infrastructure across multiple cloud providers using HCL (HashiCorp Configuration Language) and a state-based reconciliation model.',
        keyPoints: [
          'Terraform uses a plan-apply workflow — "terraform plan" shows what will change, "terraform apply" executes the changes — providing a preview before any infrastructure is modified',
          'Providers (AWS, GCP, Azure, Kubernetes) are plugins that translate HCL resource definitions into API calls — enabling a single tool to manage resources across any cloud or service',
          'The dependency graph is automatically computed from resource references — Terraform creates, updates, and destroys resources in the correct order based on their dependencies',
          'Modules are reusable packages of Terraform configuration — they encapsulate infrastructure patterns (VPC module, EKS module) and accept input variables for customization',
          'The HCL language supports variables, locals, outputs, conditionals (count, for_each), and data sources — providing enough expressiveness without being a full programming language',
        ],
        tradeoffs: [
          'HCL is declarative which simplifies reasoning but limits complex logic — loops and conditionals exist but are less intuitive than imperative code (this is why Pulumi and CDK exist)',
          'Provider updates can introduce breaking changes — pinning provider versions is essential for reproducibility but requires active version management',
        ],
        realWorld: [
          'Terraform Cloud/Enterprise',
          'Terragrunt for DRY configs',
          'Atlantis for PR-based workflow',
        ],
      },
      {
        id: 'cloudformation-pulumi',
        name: 'CloudFormation & Pulumi',
        description:
          'Alternative IaC tools offer different approaches — CloudFormation uses JSON/YAML templates tightly integrated with AWS, while Pulumi uses general-purpose programming languages for infrastructure.',
        keyPoints: [
          'AWS CloudFormation is the native AWS IaC service — templates define a stack of resources, and CloudFormation handles creation, update, rollback, and deletion as a unit',
          'CloudFormation drift detection identifies when manual changes have been made to stack resources — showing the difference between the template and actual state',
          'Pulumi lets you write infrastructure using TypeScript, Python, Go, or C# — enabling full IDE support, type checking, testing, and reuse of existing programming skills',
          'AWS CDK (Cloud Development Kit) generates CloudFormation templates from TypeScript/Python code — combining the expressiveness of a programming language with CloudFormation execution',
          'CrossGuard/Sentinel policy engines enforce organizational rules (no public S3 buckets, all volumes encrypted) — preventing policy violations before infrastructure is provisioned',
        ],
        tradeoffs: [
          'CloudFormation is AWS-only but deeply integrated (no state file to manage, automatic rollback) — multi-cloud teams need Terraform or Pulumi',
          'Pulumi offers maximum flexibility through general-purpose languages but the infrastructure definitions can become overly complex if not disciplined about abstraction boundaries',
        ],
        realWorld: [
          'AWS CloudFormation StackSets',
          'Pulumi Automation API',
          'AWS CDK constructs library',
        ],
      },
      {
        id: 'state-management-drift-detection',
        name: 'State Management & Drift Detection',
        description:
          'IaC tools maintain a state file that maps real infrastructure to configuration — managing this state correctly and detecting drift between desired and actual state is critical for reliability.',
        keyPoints: [
          'Terraform state maps each resource in configuration to a real infrastructure object (by ID) — it tracks metadata like dependencies and is required for plan, apply, and destroy operations',
          'Remote state backends (S3 + DynamoDB, Terraform Cloud, GCS) store state centrally with locking — preventing concurrent modifications that could corrupt state or create conflicts',
          'State locking prevents two team members from running apply simultaneously — DynamoDB (AWS) or Cloud Storage (GCP) provide the locking mechanism',
          'Drift detection compares actual infrastructure against the IaC definition — manual console changes, auto-scaling events, or external scripts can cause drift that IaC is unaware of',
          'State operations (import, mv, rm, taint) allow manual state manipulation — importing existing resources into Terraform management, moving resources between modules, or marking resources for recreation',
        ],
        tradeoffs: [
          'State files contain sensitive data (resource IDs, outputs, sometimes passwords) — they must be encrypted at rest and access-controlled, adding operational overhead',
          'State file corruption or loss can require manual reconciliation of every resource — regular backups and versioned state storage are essential safeguards',
        ],
        realWorld: [
          'S3 + DynamoDB remote backend',
          'Terraform Cloud state management',
          'Spacelift drift detection',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Configuration & Secrets',
    part: 3,
    partTitle: 'Infrastructure',
    summary:
      'Configuration management automates the setup and maintenance of servers and applications, while secrets management provides secure storage, rotation, and access control for sensitive credentials.',
    concepts: [
      {
        id: 'configuration-management-ansible',
        name: 'Configuration Management (Ansible)',
        description:
          'Configuration management tools like Ansible automate the provisioning and configuration of servers, ensuring consistent environments across development, staging, and production.',
        keyPoints: [
          'Ansible uses an agentless push model — it connects via SSH, executes tasks, and disconnects, requiring no daemon on managed nodes unlike Chef (client-server) or Puppet (agent-master)',
          'Playbooks are YAML files that define a series of tasks — each task uses a module (apt, copy, template, docker_container) to enforce a desired state on target hosts',
          'Idempotency means running the same playbook twice produces the same result — Ansible modules check current state before acting, only making changes when the actual state differs from desired',
          'Inventory files define which hosts belong to which groups — enabling targeted execution (deploy to web servers only) and group-specific variables (production database URL vs staging)',
          'Roles organize playbooks into reusable components (webserver role, database role, monitoring role) — shared via Ansible Galaxy, the community role repository',
        ],
        tradeoffs: [
          'Agentless simplicity comes at the cost of continuous compliance — Ansible only enforces state when you run it, unlike Puppet which continuously reconverges to the desired state',
          'YAML playbooks become unwieldy at scale — complex logic requires Jinja2 templates and variable precedence understanding, which has a steep learning curve',
        ],
        realWorld: [
          'Ansible Tower/AWX',
          'Red Hat Ansible Automation Platform',
          'Ansible Galaxy roles',
        ],
      },
      {
        id: 'environment-management',
        name: 'Environment Management',
        description:
          'Managing multiple environments (dev, staging, production) with consistent configurations while allowing environment-specific overrides for things like database URLs, feature flags, and resource sizing.',
        keyPoints: [
          'The 12-factor app methodology prescribes strict separation of config from code — configuration that varies between deploys (credentials, URLs, feature flags) should come from the environment, not hardcoded',
          'Environment-specific overlays (Kustomize overlays, Helm values files, Terraform workspaces) apply environment-specific settings on top of a shared base configuration',
          'Namespace isolation in Kubernetes separates environments within the same cluster — with ResourceQuotas and NetworkPolicies preventing cross-environment interference',
          'Environment parity means keeping dev, staging, and production as similar as possible — differences in infrastructure, data, or configuration are the top source of "works on my machine" bugs',
          'GitOps tools (ArgoCD, Flux) maintain environment configs in Git — changes to the Git repository are automatically applied to the corresponding environment, creating an audit trail',
        ],
        tradeoffs: [
          'Shared clusters for multiple environments save cost but risk noisy-neighbor issues and accidental cross-environment access — separate clusters provide stronger isolation at higher cost',
          'Complete environment parity is expensive (production-scale staging) — most teams compromise with smaller staging environments, accepting the risk of load-related issues in production',
        ],
        realWorld: [
          'Kustomize overlays',
          'Helm value files per environment',
          'ArgoCD ApplicationSets',
        ],
      },
      {
        id: 'secrets-management-vault',
        name: 'Secrets Management (Vault/SOPS)',
        description:
          'Dedicated secrets management systems provide encrypted storage, fine-grained access control, automatic rotation, and audit logging for sensitive credentials like API keys, database passwords, and TLS certificates.',
        keyPoints: [
          'HashiCorp Vault provides a centralized API for secrets — applications authenticate (Kubernetes auth, AWS IAM, AppRole) and receive time-limited, narrowly-scoped credentials',
          'Dynamic secrets are generated on-demand for each client — Vault can create temporary database credentials that automatically expire, eliminating shared long-lived passwords',
          'SOPS (Secrets OPerationS) encrypts specific values in YAML/JSON files — secrets are stored encrypted in Git, decrypted at deploy time using KMS, PGP, or age keys',
          'Sealed Secrets (Bitnami) encrypts Kubernetes Secrets with a cluster-specific key — the encrypted SealedSecret resource can be safely stored in Git and only decrypted by the target cluster',
          'Secret rotation changes credentials periodically without downtime — Vault lease renewal and external-secrets-operator synchronize rotated secrets into Kubernetes without Pod restarts',
        ],
        tradeoffs: [
          'Vault is powerful but operationally complex — it requires its own HA deployment, unsealing process, and backup strategy, adding significant infrastructure overhead',
          'SOPS-in-Git is simpler but less dynamic — secrets are static until someone updates and re-encrypts the file, with no automatic rotation or fine-grained access auditing',
        ],
        realWorld: [
          'HashiCorp Vault',
          'AWS Secrets Manager',
          'Mozilla SOPS + age',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Cloud Architecture',
    part: 3,
    partTitle: 'Infrastructure',
    summary:
      'Cloud architecture patterns leverage managed services for networking, compute, and scaling — from VPC design and auto-scaling groups to serverless functions that abstract away infrastructure entirely.',
    concepts: [
      {
        id: 'vpc-cloud-networking',
        name: 'VPC & Cloud Networking',
        description:
          'Virtual Private Clouds provide isolated network environments within cloud providers, with subnets, route tables, and security groups controlling traffic flow.',
        keyPoints: [
          'A VPC is a logically isolated virtual network — you define the IP address range (CIDR block), create subnets (public/private) across availability zones, and control routing',
          'Public subnets have a route to an Internet Gateway — instances with public IPs can receive inbound traffic; private subnets route outbound traffic through a NAT Gateway for security',
          'Security groups are stateful firewalls at the instance level — they allow specific inbound/outbound traffic by port, protocol, and source/destination (other security groups or CIDRs)',
          'VPC Peering and Transit Gateway connect multiple VPCs — peering is simple point-to-point, while Transit Gateway acts as a hub for connecting many VPCs and on-premises networks',
          'PrivateLink (AWS) / Private Service Connect (GCP) expose services across VPCs without traversing the public internet — providing secure, low-latency access to managed services',
        ],
        tradeoffs: [
          'Simple VPC designs (one public, one private subnet) are easy to manage but may not meet compliance requirements — complex multi-tier designs (web, app, data tiers) add security but increase operational complexity',
          'NAT Gateways are expensive for high-throughput outbound traffic — consider VPC endpoints for AWS services and dual-stack (IPv6) to reduce NAT costs',
        ],
        realWorld: [
          'AWS VPC with public/private subnets',
          'GCP Shared VPC',
          'Azure Virtual Network',
        ],
      },
      {
        id: 'auto-scaling-load-balancing',
        name: 'Auto-scaling & Load Balancing',
        description:
          'Auto-scaling automatically adjusts compute capacity based on demand, while load balancers distribute incoming traffic across healthy instances for high availability.',
        keyPoints: [
          'Horizontal Pod Autoscaler (HPA) in Kubernetes scales Pod replicas based on CPU/memory utilization or custom metrics — it checks metrics every 15 seconds by default and adjusts replica count',
          'AWS Auto Scaling Groups (ASG) manage EC2 instance counts — scaling policies respond to CloudWatch alarms (CPU > 70% for 5 minutes -> add 2 instances) with configurable cooldown periods',
          'Application Load Balancers (ALB) operate at Layer 7 (HTTP) — they route based on URL path, host header, or HTTP headers, and support WebSocket and gRPC protocols',
          'Network Load Balancers (NLB) operate at Layer 4 (TCP/UDP) — they handle millions of requests per second with ultra-low latency, ideal for non-HTTP workloads or extreme throughput requirements',
          'Predictive scaling uses machine learning to anticipate traffic patterns — pre-scaling capacity before the load arrives, avoiding the lag of reactive scaling',
        ],
        tradeoffs: [
          'Aggressive scaling policies respond faster to load spikes but can cause thrashing (scaling up and down rapidly) — conservative policies are more stable but risk under-provisioning during sudden spikes',
          'ALBs are more feature-rich but more expensive and higher latency than NLBs — choose based on whether you need Layer 7 features or raw throughput',
        ],
        realWorld: [
          'AWS ALB + ASG',
          'Kubernetes HPA + Cluster Autoscaler',
          'GCP Managed Instance Groups',
        ],
      },
      {
        id: 'serverless-patterns',
        name: 'Serverless Patterns',
        description:
          'Serverless computing abstracts away server management entirely — functions execute on demand, scaling from zero to thousands of concurrent invocations with pay-per-use pricing.',
        keyPoints: [
          'Functions as a Service (FaaS) — AWS Lambda, Google Cloud Functions, Azure Functions — execute code in response to events (HTTP requests, queue messages, file uploads) without provisioning servers',
          'Cold starts occur when a function has not been invoked recently — the platform must provision a new execution environment (download code, initialize runtime), adding 100ms-10s of latency',
          'Event-driven architectures use serverless functions to process events from queues (SQS), streams (Kinesis), or storage (S3) — enabling decoupled, scalable processing pipelines',
          'Step Functions / Cloud Workflows orchestrate multiple Lambda functions into complex workflows with error handling, retries, and parallel execution — providing a visual state machine',
          'Serverless databases (DynamoDB, Fauna, PlanetScale) and storage (S3) complement FaaS — the entire stack can be serverless, eliminating all infrastructure management',
        ],
        tradeoffs: [
          'Serverless eliminates infrastructure management but introduces vendor lock-in — your functions use provider-specific APIs, event formats, and deployment models that are hard to migrate',
          'Cold start latency is unacceptable for latency-sensitive workloads — provisioned concurrency (pre-warmed instances) mitigates this but adds cost and partially defeats the purpose',
        ],
        realWorld: [
          'AWS Lambda',
          'Vercel Edge Functions',
          'Cloudflare Workers',
        ],
      },
    ],
  },

  // ============================================================
  // PART 4: Observability & Operations (Topics 11-13)
  // ============================================================
  {
    id: 11,
    title: 'Monitoring & Metrics',
    part: 4,
    partTitle: 'Observability & Operations',
    summary:
      'Monitoring systems collect, store, and visualize metrics about infrastructure and application performance — enabling teams to detect anomalies, understand system behavior, and define measurable reliability targets.',
    concepts: [
      {
        id: 'prometheus-grafana',
        name: 'Prometheus & Grafana',
        description:
          'Prometheus is a pull-based metrics collection and alerting system that scrapes time-series data from targets, while Grafana provides rich visualization dashboards for exploring and presenting metrics.',
        keyPoints: [
          'Prometheus scrapes metrics from HTTP endpoints (/metrics) at regular intervals — applications expose metrics in a simple text format (metric_name{labels} value timestamp)',
          'Four metric types: Counter (monotonically increasing, e.g., total requests), Gauge (current value, e.g., temperature), Histogram (distribution, e.g., request duration buckets), Summary (quantiles)',
          'PromQL is the query language for Prometheus — it supports rate calculations (rate(http_requests_total[5m])), aggregations (sum by (service)), and complex expressions for alerting rules',
          'Service discovery (Kubernetes SD, consul SD, file SD) automatically finds scrape targets — when Pods are created or destroyed, Prometheus discovers them without manual configuration',
          'Grafana connects to Prometheus (and many other data sources) — dashboards with panels display time-series graphs, heatmaps, and tables with template variables for dynamic filtering',
        ],
        tradeoffs: [
          'Prometheus stores data locally on a single node — for long-term retention or global views across clusters, remote storage (Thanos, Cortex, Mimir) is needed, adding operational complexity',
          'Pull-based scraping is simple and reliable but cannot handle short-lived jobs — the Pushgateway exists for batch jobs but introduces a single point of failure',
        ],
        realWorld: [
          'Prometheus Operator (kube-prometheus-stack)',
          'Grafana Cloud',
          'Thanos for multi-cluster',
        ],
      },
      {
        id: 'slis-slos-slas',
        name: 'SLIs, SLOs & SLAs',
        description:
          'Service Level Indicators (SLIs), Objectives (SLOs), and Agreements (SLAs) provide a framework for defining, measuring, and communicating reliability targets between engineering teams and stakeholders.',
        keyPoints: [
          'SLIs (Service Level Indicators) are quantitative measures of service behavior — common SLIs include availability (% of successful requests), latency (p99 response time), and throughput (requests/second)',
          'SLOs (Service Level Objectives) set target values for SLIs — e.g., "99.9% of requests return successfully within 200ms over a 30-day rolling window"',
          'SLAs (Service Level Agreements) are contractual commitments with consequences — if the SLO target (99.9%) is not met, the provider owes credits or penalties; SLAs are always looser than internal SLOs',
          'Error budgets are the inverse of SLOs — a 99.9% SLO allows 43.2 minutes of downtime per month; this budget can be "spent" on risky deployments, and when exhausted, the team focuses on reliability',
          'Burn rate alerts detect when the error budget is being consumed faster than sustainable — a 10x burn rate means the entire monthly budget will be exhausted in 3 days, triggering an immediate alert',
        ],
        tradeoffs: [
          'Too aggressive SLOs (99.99%) constrain engineering velocity — the error budget is so small that any risky change could exhaust it, discouraging innovation',
          'SLOs only measure what they track — an SLO on availability misses degraded performance, and an SLO on p99 latency misses availability; multiple SLIs are needed for a complete picture',
        ],
        realWorld: [
          'Google SRE book SLO framework',
          'Nobl9 SLO platform',
          'Datadog SLO monitoring',
        ],
      },
      {
        id: 'alerting-strategies',
        name: 'Alerting Strategies',
        description:
          'Effective alerting notifies the right people at the right time about meaningful service degradation, while minimizing alert fatigue from noisy, non-actionable notifications.',
        keyPoints: [
          'Symptom-based alerts fire on user-facing impact (high error rate, slow responses) rather than causes (high CPU) — users do not care about CPU utilization, they care about whether the service works',
          'Multi-window, multi-burn-rate alerts (from the Google SRE book) use different time windows to detect both fast burns (5% of budget in 1 hour) and slow burns (10% in 6 hours) — reducing false positives',
          'Alert routing sends notifications to the right channel — page the on-call for critical alerts (PagerDuty, OpsGenie), send warnings to Slack, and log informational alerts for dashboards only',
          'Alert suppression and grouping prevent notification storms — if 100 Pods fail simultaneously, send one alert with context rather than 100 individual notifications',
          'Runbook links in alert annotations provide step-by-step response procedures — reducing mean-time-to-resolve (MTTR) by giving responders immediate context and remediation steps',
        ],
        tradeoffs: [
          'Too few alerts risk missing real incidents — too many alerts cause fatigue where responders start ignoring all notifications, including critical ones',
          'Sophisticated alerting rules (multi-window burn rates) are more accurate but harder to understand and debug — start simple and increase complexity as the team matures',
        ],
        realWorld: [
          'PagerDuty alert routing',
          'OpsGenie escalation policies',
          'Prometheus Alertmanager',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Logging & Tracing',
    part: 4,
    partTitle: 'Observability & Operations',
    summary:
      'Centralized logging aggregates logs from all services into a searchable system, while distributed tracing tracks requests across service boundaries — together they provide the visibility needed to debug issues in microservices architectures.',
    concepts: [
      {
        id: 'centralized-logging-elk',
        name: 'Centralized Logging (ELK)',
        description:
          'Centralized logging collects, parses, indexes, and makes searchable all logs from all services in a single system — the ELK stack (Elasticsearch, Logstash, Kibana) is the most widely adopted open-source solution.',
        keyPoints: [
          'Structured logging (JSON format) makes logs machine-parseable — fields like timestamp, level, service, requestId, userId enable precise filtering and correlation across services',
          'Log shippers (Fluentd, Fluent Bit, Filebeat) collect logs from containers, files, and system journals — they buffer, parse, enrich (add Kubernetes metadata), and forward to the aggregation layer',
          'Elasticsearch stores and indexes log data — its inverted index enables full-text search across billions of log entries with sub-second query response',
          'Kibana provides visualization and exploration — dashboards show error trends, discover mode enables ad-hoc investigation, and saved searches create reusable queries',
          'Log retention policies balance storage cost against debugging needs — hot-warm-cold architecture keeps recent logs on fast SSD, older logs on cheaper HDD, and archives in object storage',
        ],
        tradeoffs: [
          'Elasticsearch is resource-intensive (CPU, memory, storage) at scale — alternatives like Loki store only metadata and offload log content to object storage, trading query speed for lower cost',
          'Collecting all logs is expensive — log-level filtering (only WARNING and above in production) and sampling reduce volume but risk missing important DEBUG-level context during incidents',
        ],
        realWorld: [
          'ELK Stack (Elastic)',
          'Grafana Loki',
          'Datadog Log Management',
        ],
      },
      {
        id: 'distributed-tracing-opentelemetry',
        name: 'Distributed Tracing (OpenTelemetry)',
        description:
          'Distributed tracing follows a single request as it propagates through multiple microservices, capturing timing and metadata at each hop to visualize the full request lifecycle.',
        keyPoints: [
          'A trace represents the entire journey of a request — it consists of spans, where each span represents one operation (HTTP call, database query, queue publish) with start time, duration, and metadata',
          'Trace context propagation passes a trace ID and parent span ID through request headers (W3C Traceparent, B3) — enabling correlation of spans across different services and languages',
          'OpenTelemetry is the CNCF standard for telemetry (traces, metrics, logs) — it provides SDKs for auto-instrumentation of common frameworks (Express, Spring, Django) with minimal code changes',
          'Trace collectors (Jaeger, Zipkin, Tempo) receive, store, and visualize traces — the flame graph view shows the critical path and highlights slow or failed operations',
          'Sampling strategies control cost — head-based sampling decides at the start of a trace (e.g., sample 1% of requests), while tail-based sampling keeps traces with errors or high latency regardless of the sampling rate',
        ],
        tradeoffs: [
          'Full tracing (100% of requests) generates enormous data volumes and costs — but sampling means rare error traces may be missed; tail-based sampling is ideal but requires buffering all spans temporarily',
          'Auto-instrumentation captures framework-level spans automatically but custom business logic spans require manual instrumentation — balancing coverage with development effort',
        ],
        realWorld: [
          'Jaeger',
          'Grafana Tempo',
          'AWS X-Ray',
        ],
      },
      {
        id: 'correlation-ids-context-propagation',
        name: 'Correlation IDs & Context Propagation',
        description:
          'Correlation IDs are unique identifiers assigned to each request at the entry point and propagated through all downstream services — enabling logs, traces, and metrics from a single request to be linked together.',
        keyPoints: [
          'A correlation ID (request ID) is generated at the API gateway or edge service — typically a UUID or ULID that is included in all log entries, trace spans, and error reports for that request',
          'Context propagation passes the correlation ID through HTTP headers (X-Request-ID, X-Correlation-ID), message queue headers, and thread-local storage within each service',
          'MDC (Mapped Diagnostic Context) in logging frameworks (SLF4J, Winston, structlog) automatically includes the correlation ID in every log entry without explicit passing through function arguments',
          'Baggage items in OpenTelemetry carry additional context (user ID, tenant ID, feature flag state) alongside the trace context — available to all downstream services for logging and decision-making',
          'Cross-cutting concerns (authentication, rate limiting, correlation) are best handled at the gateway level — the gateway generates the ID, authenticates, and enriches all downstream requests',
        ],
        tradeoffs: [
          'Propagating context through all services requires consistent middleware/interceptor setup — missing propagation in even one service breaks the correlation chain',
          'Baggage items propagate through all downstream services, which can be a privacy/security concern — sensitive data in baggage is visible to every service in the call chain',
        ],
        realWorld: [
          'W3C Trace Context standard',
          'Envoy proxy request IDs',
          'AWS API Gateway request IDs',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Incident Management & SRE',
    part: 4,
    partTitle: 'Observability & Operations',
    summary:
      'Site Reliability Engineering (SRE) brings software engineering practices to operations — from structured incident response and blameless postmortems to chaos engineering that proactively tests system resilience.',
    concepts: [
      {
        id: 'on-call-runbooks',
        name: 'On-Call & Runbooks',
        description:
          'On-call rotation ensures someone is always available to respond to production incidents, while runbooks provide documented procedures for diagnosing and resolving common issues.',
        keyPoints: [
          'On-call rotations should be fair (shared equally across the team), well-compensated, and sustainable — no more than one week in four, with handoff meetings that cover current issues and recent changes',
          'Escalation policies define what happens when the primary on-call does not acknowledge an alert within a time window — escalate to secondary, then to the engineering manager, then to the incident commander',
          'Runbooks are step-by-step guides for responding to specific alerts — they include the alert meaning, investigation steps, remediation actions, and escalation criteria for when the runbook is insufficient',
          'War rooms (physical or virtual) centralize communication during major incidents — a dedicated Slack channel or video call where all responders coordinate, avoiding fragmented communication',
          'Incident severity levels (SEV1-SEV4) define response urgency — SEV1 (complete outage) pages immediately and requires an incident commander; SEV4 (minor issue) is handled during business hours',
        ],
        tradeoffs: [
          'Detailed runbooks reduce MTTR but require maintenance — outdated runbooks are worse than no runbooks because they send responders down wrong paths during stressful incidents',
          'On-call can lead to burnout if alert volume is too high — investing in reliability (reducing alerts) improves both system quality and team well-being',
        ],
        realWorld: [
          'PagerDuty on-call schedules',
          'Opsgenie incident management',
          'Incident.io',
        ],
      },
      {
        id: 'postmortems-blameless-culture',
        name: 'Postmortems & Blameless Culture',
        description:
          'Blameless postmortems analyze incidents to identify systemic causes and improve systems — focusing on what happened and why, not who made a mistake.',
        keyPoints: [
          'Blameless culture recognizes that humans make errors in complex systems — punishing individuals discourages reporting and hides the systemic factors that allowed the error to cause an outage',
          'A postmortem document includes: timeline of events, impact assessment (duration, affected users, revenue impact), root cause analysis, contributing factors, and action items with owners and deadlines',
          'The "Five Whys" technique iteratively asks why until the root cause is found — "the server crashed" -> why? "OOM" -> why? "memory leak in caching" -> why? "no size limit on cache" -> action: add cache eviction',
          'Action items must be specific, assigned, and tracked — vague items ("improve monitoring") never get done; specific items ("add memory usage alert at 80% threshold, assigned to Alice, due March 15") do',
          'Postmortem reviews should be shared widely — publishing findings across the organization prevents other teams from hitting the same issues and builds collective knowledge about system failure modes',
        ],
        tradeoffs: [
          'Thorough postmortems take significant time (4-8 hours to write well) — the investment pays off through reduced recurrence, but teams under pressure may skip them, losing valuable learning',
          'Blameless culture requires leadership commitment — if leaders revert to blame during stressful incidents, the entire culture of psychological safety collapses and reporting decreases',
        ],
        realWorld: [
          'Google SRE postmortem culture',
          'Etsy blameless postmortems',
          'PagerDuty postmortem templates',
        ],
      },
      {
        id: 'chaos-engineering',
        name: 'Chaos Engineering',
        description:
          'Chaos engineering proactively injects failures into production systems to verify that resilience mechanisms (retries, circuit breakers, failover) actually work under real conditions.',
        keyPoints: [
          'The scientific method: form a hypothesis ("if we kill 30% of API Pods, latency increases <10% because HPA will scale up"), run the experiment, measure the result, and improve if the hypothesis fails',
          'Start small and controlled — begin with non-production environments, inject single failures (kill one Pod), and gradually increase scope to production with blast radius controls (abort conditions)',
          'Common experiments: terminate instances/Pods, inject network latency or packet loss, fill disk, exhaust CPU, simulate AZ failure, revoke credentials, and corrupt DNS',
          'Chaos tools (Litmus, Chaos Monkey, Gremlin, Chaos Mesh) automate failure injection — they integrate with Kubernetes and cloud APIs to programmatically create controlled failures',
          'GameDays are scheduled team exercises where chaos experiments are run collaboratively — the team practices incident response while learning about system weaknesses in a controlled setting',
        ],
        tradeoffs: [
          'Running chaos experiments in production carries real risk — a poorly scoped experiment can cause actual customer-facing outages; robust abort mechanisms and blast radius controls are essential',
          'Chaos engineering requires mature monitoring and incident response — without good observability, you cannot measure the impact of injected failures or know when to abort the experiment',
        ],
        realWorld: [
          'Netflix Chaos Monkey',
          'Gremlin',
          'LitmusChaos for Kubernetes',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find(t => t.id === id);
}
