# Core CS Foundations — 8 New Explorer Apps

**Date:** 2026-03-01
**Status:** Approved
**Goal:** Expand cs-tools from 21 to 29 tools by filling core CS curriculum gaps.

## App Registry

| # | App | Package | Port | Icon | Color | localStorage Prefix |
|---|-----|---------|------|------|-------|-------------------|
| 22 | Computer Architecture | `@cstools/computer-architecture` | 5194 | `CircuitBoard` | `#FF6B6B` | `computer-architecture-` |
| 23 | Automata & Formal Languages | `@cstools/automata` | 5195 | `Infinity` | `#C678DD` | `automata-` |
| 24 | Programming Languages | `@cstools/programming-languages` | 5196 | `FileCode` | `#61AFEF` | `programming-languages-` |
| 25 | Computer Graphics | `@cstools/computer-graphics` | 5197 | `Monitor` | `#E06C75` | `computer-graphics-` |
| 26 | Concurrency & Parallelism | `@cstools/concurrency` | 5198 | `Workflow` | `#56B6C2` | `concurrency-` |
| 27 | Information Theory & Coding | `@cstools/information-theory` | 5199 | `Radio` | `#D19A66` | `information-theory-` |
| 28 | Numerical Methods & Linear Algebra | `@cstools/numerical-methods` | 5200 | `Sigma` | `#CBA6F7` | `numerical-methods-` |
| 29 | API Design & Protocols | `@cstools/api-design` | 5201 | `Plug` | `#F5A97F` | `api-design-` |

## Content Structure (per app)

Each app follows the established explorer pattern:
- 13 topics across 4 parts
- 39 concepts (3 per topic) with keyPoints[], tradeoffs[], realWorld[]
- 39 quiz questions (3 per topic) with varied answer indices
- 14-file scaffold (4 config, 6 source/components, 2 data files)

## Detailed Topic Breakdown

### App #22: Computer Architecture
**Port 5194 | CircuitBoard | #FF6B6B**

| Part | # | Topic |
|------|----|-------|
| Part 1: Digital Foundations | 1 | Boolean Logic & Gates |
| | 2 | Number Systems & Binary Arithmetic |
| | 3 | Sequential & Combinational Circuits |
| Part 2: Processor Design | 4 | ISA & Instruction Formats |
| | 5 | Datapath & Control Unit |
| | 6 | Pipelining & Hazards |
| Part 3: Memory Hierarchy | 7 | Cache Architecture |
| | 8 | Virtual Memory Hardware |
| | 9 | Memory Technologies (SRAM/DRAM/Flash) |
| Part 4: Advanced Architecture | 10 | Branch Prediction & Speculation |
| | 11 | Superscalar & Out-of-Order Execution |
| | 12 | Multicore & GPU Architecture |
| | 13 | I/O Systems & Bus Architecture |

### App #23: Automata & Formal Languages
**Port 5195 | Infinity | #C678DD**

| Part | # | Topic |
|------|----|-------|
| Part 1: Finite Automata | 1 | Deterministic Finite Automata (DFA) |
| | 2 | Nondeterministic Finite Automata (NFA) |
| | 3 | NFA-to-DFA Conversion & Minimization |
| Part 2: Regular Languages | 4 | Regular Expressions & Regular Grammars |
| | 5 | Pumping Lemma for Regular Languages |
| | 6 | Closure Properties & Decision Problems |
| Part 3: Context-Free Languages | 7 | Context-Free Grammars & Parse Trees |
| | 8 | Pushdown Automata |
| | 9 | CFL Properties & Pumping Lemma |
| Part 4: Computability & Complexity | 10 | Turing Machines |
| | 11 | Decidability & Recognizability |
| | 12 | Complexity Classes (P, NP, NP-Complete) |
| | 13 | Reductions & Intractability |

### App #24: Programming Languages
**Port 5196 | FileCode | #61AFEF**

| Part | # | Topic |
|------|----|-------|
| Part 1: Language Fundamentals | 1 | Syntax & Semantics |
| | 2 | Variables, Binding & Scope |
| | 3 | Data Types & Type Systems |
| Part 2: Evaluation & Control | 4 | Evaluation Strategies (Eager vs Lazy) |
| | 5 | Control Flow & Exception Handling |
| | 6 | Subroutines & Parameter Passing |
| Part 3: Paradigms & Abstractions | 7 | OOP Foundations (Inheritance, Polymorphism, Encapsulation) |
| | 8 | Functional Language Features |
| | 9 | Metaprogramming & Reflection |
| Part 4: Runtime & Implementation | 10 | Memory Management & Garbage Collection |
| | 11 | Concurrency Models in Programming Languages |
| | 12 | Domain-Specific Languages |
| | 13 | Language Interoperability & FFI |

### App #25: Computer Graphics
**Port 5197 | Monitor | #E06C75**

| Part | # | Topic |
|------|----|-------|
| Part 1: Math Foundations | 1 | Vectors & Matrix Operations |
| | 2 | Transformations & Homogeneous Coordinates |
| | 3 | Projections & Viewing Pipelines |
| Part 2: Rendering Pipeline | 4 | Rasterization & Scan Conversion |
| | 5 | Shading Models & Lighting (Phong, PBR) |
| | 6 | Textures, Sampling & Filtering |
| Part 3: Advanced Rendering | 7 | Ray Tracing & Path Tracing |
| | 8 | Global Illumination & Radiosity |
| | 9 | GPU Architecture & Shader Programming |
| Part 4: Applied Graphics | 10 | Color Science & HDR |
| | 11 | Animation & Interpolation |
| | 12 | Real-Time Rendering Techniques |
| | 13 | Image Processing & Computational Photography |

### App #26: Concurrency & Parallelism
**Port 5198 | Workflow | #56B6C2**

| Part | # | Topic |
|------|----|-------|
| Part 1: Foundations | 1 | Concurrency vs Parallelism |
| | 2 | Thread Models & Green Threads |
| | 3 | Shared Memory & Race Conditions |
| Part 2: Synchronization | 4 | Locks, Mutexes & Semaphores |
| | 5 | Lock-Free & Wait-Free Algorithms |
| | 6 | Memory Models & Ordering |
| Part 3: Patterns | 7 | Producer-Consumer & Channels |
| | 8 | Actor Model & Message Passing |
| | 9 | Async/Await & Event Loops |
| Part 4: Advanced Topics | 10 | Parallel Algorithms & MapReduce |
| | 11 | GPU Parallelism & SIMD |
| | 12 | Transactional Memory |
| | 13 | Distributed Concurrency |

### App #27: Information Theory & Coding
**Port 5199 | Radio | #D19A66**

| Part | # | Topic |
|------|----|-------|
| Part 1: Foundations | 1 | Entropy & Information Content |
| | 2 | Source Coding Theorem |
| | 3 | Mutual Information & Channel Capacity |
| Part 2: Compression | 4 | Huffman Coding |
| | 5 | Arithmetic & Lempel-Ziv Coding |
| | 6 | Lossy Compression (DCT, Wavelets) |
| Part 3: Error Correction | 7 | Hamming Codes |
| | 8 | Reed-Solomon & BCH Codes |
| | 9 | Convolutional & Turbo Codes |
| Part 4: Applications | 10 | Channel Capacity & Shannon Limit |
| | 11 | Cryptographic Information Theory |
| | 12 | Data Compression in Practice |
| | 13 | Information Theory in Machine Learning |

### App #28: Numerical Methods & Linear Algebra
**Port 5200 | Sigma | #CBA6F7**

| Part | # | Topic |
|------|----|-------|
| Part 1: Linear Algebra | 1 | Vectors, Matrices & Operations |
| | 2 | Linear Transformations & Rank |
| | 3 | Eigenvalues & Eigenvectors |
| Part 2: Matrix Methods | 4 | Matrix Decompositions (LU, QR, SVD) |
| | 5 | Solving Linear Systems |
| | 6 | Least Squares & Linear Regression |
| Part 3: Optimization | 7 | Gradient Descent & Variants |
| | 8 | Convex Optimization |
| | 9 | Constrained Optimization (Lagrange, KKT) |
| Part 4: Numerical Computing | 10 | Floating Point & Error Analysis |
| | 11 | Interpolation & Approximation |
| | 12 | Numerical Integration & ODEs |
| | 13 | Fast Fourier Transform |

### App #29: API Design & Protocols
**Port 5201 | Plug | #F5A97F**

| Part | # | Topic |
|------|----|-------|
| Part 1: REST & HTTP | 1 | RESTful Design Principles |
| | 2 | HTTP Methods, Headers & Status Codes |
| | 3 | Content Negotiation & HATEOAS |
| Part 2: Beyond REST | 4 | GraphQL Design & Schema |
| | 5 | gRPC & Protocol Buffers |
| | 6 | WebSockets & Real-Time APIs |
| Part 3: API Engineering | 7 | Authentication & Authorization (OAuth, JWT, API Keys) |
| | 8 | Rate Limiting & Throttling |
| | 9 | Versioning & API Evolution |
| Part 4: Operations | 10 | API Documentation & OpenAPI |
| | 11 | Testing & Contract Testing |
| | 12 | API Gateways & Service Mesh |
| | 13 | Error Handling & Observability |

## Hub Updates (after all 8 apps)

```
Tools: 29
Topics: 337+  (233 + 104)
Questions: 1088+  (776 + 312)
Concepts: 1008+  (696 + 312)
```

## Overlap Analysis

| New App | Overlaps With | Differentiation |
|---------|--------------|-----------------|
| Computer Architecture | OS, Systems Programming | Hardware-level (gates, pipelines, caches) vs OS abstractions vs userland syscalls |
| Automata | Compilers, Discrete Math | Formal language theory vs practical compilation vs math proofs |
| Programming Languages | FP, Compilers | Language design theory vs FP paradigm vs compiler implementation |
| Computer Graphics | Numerical Methods | Applied visual computing vs general numerical math |
| Concurrency | Systems Programming, Distributed Systems | Dedicated deep-dive vs chapter-level coverage in those apps |
| Information Theory | Networking, Security | Mathematical foundations vs applied networking vs applied crypto |
| Numerical Methods | Discrete Math, ML, Data Science | Computation math vs theoretical math vs applied ML/stats |
| API Design | Software Engineering, Networking | API-specific patterns vs general SE practices vs network protocols |
