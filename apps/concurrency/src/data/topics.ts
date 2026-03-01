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
  { id: 1, title: 'Foundations' },
  { id: 2, title: 'Synchronization' },
  { id: 3, title: 'Patterns' },
  { id: 4, title: 'Advanced Topics' },
];

export const topics: Topic[] = [
  // ──────────────────────────────────────────────
  // Part 1 — Foundations
  // ──────────────────────────────────────────────
  {
    id: 1,
    title: 'Concurrency vs Parallelism',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Understand the fundamental distinction between concurrency (structuring a program as multiple independent tasks) and parallelism (executing multiple tasks simultaneously on hardware), and why the difference matters for system design.',
    concepts: [
      {
        id: 'concurrency-definition',
        name: 'What Is Concurrency?',
        description:
          'Concurrency is a property of program structure where multiple logical tasks can make progress without necessarily running at the same instant.',
        keyPoints: [
          'Concurrency is about dealing with many things at once; it describes how a program is organized into independently executing components that can be interleaved.',
          'A single-core CPU can run concurrent tasks through time-slicing, where the operating system rapidly switches between tasks so each appears to make progress simultaneously.',
          'Concurrency introduces non-determinism: the order in which tasks execute may vary between runs, making reasoning about correctness harder.',
          'Correctly structured concurrent programs must account for task interactions such as shared state, communication, and coordination to avoid bugs like race conditions.',
          'Languages like Go, Erlang, and Rust provide first-class concurrency primitives that encourage safe concurrent design at the language level rather than relying solely on OS threads.',
        ],
        tradeoffs: [
          'Concurrent design adds complexity in reasoning about program behavior, but enables responsive and modular systems.',
          'Time-slicing overhead means concurrency on a single core does not speed up CPU-bound work, though it helps with I/O-bound tasks.',
          'Non-deterministic interleaving can reveal subtle bugs only under specific scheduling, making testing harder.',
        ],
        realWorld: [
          'A web server handling thousands of HTTP requests concurrently on a small number of cores by interleaving request processing.',
          'A desktop application keeping its UI responsive while performing a long file download in the background.',
          'An operating system scheduler running dozens of applications "at the same time" on a dual-core laptop.',
        ],
      },
      {
        id: 'parallelism-definition',
        name: 'What Is Parallelism?',
        description:
          'Parallelism is the simultaneous physical execution of multiple computations, typically on multi-core CPUs or distributed hardware.',
        keyPoints: [
          'Parallelism requires hardware support: multiple CPU cores, SIMD units, GPUs, or separate machines must be available to execute tasks at the same physical instant.',
          'Data parallelism splits a single dataset across processors so each works on a portion simultaneously, while task parallelism assigns different operations to different processors.',
          'Amdahl\'s Law limits the speedup of parallelism: if a fraction "s" of a program is inherently sequential, the maximum speedup with infinite processors is 1/s.',
          'Gustafson\'s Law offers a more optimistic view by noting that as problem sizes grow, the parallel portion often grows proportionally, keeping speedup scaling practical.',
          'Effective parallelism demands careful workload partitioning; uneven distribution leads to load imbalance where some processors idle while others are still busy.',
        ],
        tradeoffs: [
          'Parallelism can dramatically reduce wall-clock time for compute-heavy work, but introduces coordination overhead such as synchronization and data transfer between cores.',
          'Not all problems are parallelizable; inherently sequential algorithms gain nothing from more cores.',
          'Hardware utilization versus energy consumption: running all cores at full load uses more power and generates more heat.',
        ],
        realWorld: [
          'Rendering frames in a video game where each pixel or tile is computed independently across GPU cores.',
          'Scientific simulations like weather forecasting that partition a 3D grid across thousands of CPU cores in a cluster.',
          'Compiling a large C++ project where independent translation units are compiled in parallel using make -j.',
        ],
      },
      {
        id: 'concurrency-vs-parallelism',
        name: 'How They Relate',
        description:
          'Concurrency and parallelism are orthogonal: a program can be concurrent but not parallel, parallel but not concurrent, both, or neither.',
        keyPoints: [
          'Rob Pike summarized it as "concurrency is about dealing with lots of things at once; parallelism is about doing lots of things at once." One is structure, the other is execution.',
          'A concurrent program running on a single core is concurrent but not parallel. Adding more cores can make it both concurrent and parallel without changing its logical structure.',
          'A SIMD instruction processing 8 floats simultaneously is parallel but not necessarily concurrent in the structural sense; it is a single operation replicated across data lanes.',
          'Designing for concurrency first often makes parallelism easier to add later, because independent tasks are already identified and isolated.',
          'Confusing the two concepts leads to design mistakes: throwing more cores at a poorly structured program rarely helps, while restructuring for concurrency can unlock dramatic gains.',
        ],
        tradeoffs: [
          'Designing for concurrency first is more flexible but may not exploit hardware fully without also tuning for parallelism.',
          'Parallelism without concurrency (e.g., vectorized loops) is simpler to reason about but applies only to data-parallel workloads.',
          'Combining both gives the best performance and responsiveness, at the cost of the highest design and debugging complexity.',
        ],
        realWorld: [
          'Node.js is concurrent (event loop handles many I/O tasks) but not parallel within a single thread; adding worker threads brings parallelism.',
          'A matrix multiplication using OpenMP is parallel (multiple cores compute sub-blocks) and concurrent (threads coordinate via barriers).',
          'A shell pipeline like "grep | sort | uniq" is concurrent (three processes) and parallel if the OS schedules them on different cores.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Thread Models & Green Threads',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Explore the spectrum of threading models from OS-level kernel threads to lightweight user-space green threads, and understand how the M:N mapping between them affects performance and scalability.',
    concepts: [
      {
        id: 'kernel-threads',
        name: 'Kernel (OS) Threads',
        description:
          'Kernel threads are scheduled by the operating system, giving each thread its own stack and direct access to CPU cores for true parallelism.',
        keyPoints: [
          'Each kernel thread has its own stack (typically 1-8 MB), register state, and thread-local storage managed by the OS scheduler.',
          'Context switching between kernel threads involves a trap into the kernel, saving and restoring registers, and potentially flushing TLB entries, costing roughly 1-10 microseconds.',
          'Because the OS scheduler is preemptive, kernel threads can be interrupted at any instruction boundary, making reasoning about interleavings difficult but ensuring fairness.',
          'Creating thousands of kernel threads is expensive: each consumes stack memory and the scheduler\'s overhead grows. Most systems become sluggish beyond tens of thousands of threads.',
          'POSIX pthreads, Java threads (on most JVMs), and C# threads are typically backed by kernel threads, making them suitable for CPU-bound work that benefits from multi-core execution.',
        ],
        tradeoffs: [
          'True parallelism and preemptive scheduling come at the cost of high per-thread memory and expensive context switches.',
          'Kernel threads integrate well with OS-level tools (debuggers, profilers) but scale poorly to millions of concurrent tasks.',
          'Blocking I/O on a kernel thread blocks only that thread, but with limited threads, blocking can exhaust the thread pool.',
        ],
        realWorld: [
          'A Java web server using a thread-per-request model with a pool of 200 kernel threads to handle concurrent HTTP connections.',
          'A C++ scientific simulation launching one pthread per CPU core to maximize throughput on a 64-core machine.',
          'A database engine like PostgreSQL using a process-per-connection model (similar to kernel threads in overhead) for isolation.',
        ],
      },
      {
        id: 'green-threads',
        name: 'Green Threads & Fibers',
        description:
          'Green threads are lightweight threads managed in user space by a runtime or library, allowing millions of concurrent tasks with minimal overhead.',
        keyPoints: [
          'Green threads have small stacks (often 2-8 KB, growable) and are scheduled cooperatively by a user-space runtime, not the OS kernel.',
          'Context switching between green threads avoids kernel transitions and typically costs only tens of nanoseconds, orders of magnitude cheaper than kernel thread switches.',
          'Because scheduling is cooperative, a green thread that never yields (e.g., an infinite CPU loop) can starve other green threads on the same OS thread.',
          'Goroutines in Go, Erlang processes, and Java virtual threads (Project Loom) are prominent examples of green threads, each supporting millions of concurrent tasks.',
          'Green threads typically cannot achieve true parallelism on their own; they must be multiplexed onto multiple OS threads (the M:N model) to utilize multiple cores.',
        ],
        tradeoffs: [
          'Extremely low memory and switching costs enable massive concurrency, but cooperative scheduling means a misbehaving task can block others.',
          'User-space scheduling makes debugging harder: OS tools see only the underlying kernel threads, not individual green threads.',
          'Calling blocking system calls from a green thread can block the entire underlying OS thread unless the runtime wraps them in non-blocking equivalents.',
        ],
        realWorld: [
          'Go programs routinely spawn hundreds of thousands of goroutines to handle concurrent network connections in microservices.',
          'Erlang/OTP systems in telecom run millions of lightweight processes for fault-tolerant message-passing architectures.',
          'Java 21+ virtual threads let existing thread-per-request server code scale to millions of concurrent requests without rewriting to async.',
        ],
      },
      {
        id: 'mn-threading',
        name: 'M:N Threading Model',
        description:
          'The M:N model maps M user-space threads onto N kernel threads, combining the scalability of green threads with the parallelism of kernel threads.',
        keyPoints: [
          'In M:N threading, M is typically much larger than N. For example, Go maps millions of goroutines onto a handful of OS threads equal to GOMAXPROCS (defaulting to the number of CPU cores).',
          'A work-stealing scheduler is commonly used: idle OS threads steal runnable green threads from busy OS threads\' queues, balancing load dynamically.',
          'The runtime must handle the "blocking syscall" problem: when a green thread makes a blocking call, the runtime may park the OS thread and spin up another to keep N threads active.',
          'M:N models achieve both high concurrency (millions of tasks) and true parallelism (utilizing all cores), bridging the gap between 1:1 and N:1 threading.',
          'The complexity cost is a sophisticated runtime scheduler: bugs in the scheduler can cause subtle issues like priority inversion, starvation, or incorrect synchronization.',
        ],
        tradeoffs: [
          'M:N threading offers the best of both worlds but requires a complex runtime that is difficult to implement and debug correctly.',
          'Integration with native code and OS primitives (e.g., thread-local storage, signals) becomes tricky because multiple green threads share an OS thread.',
          'Profiling and tracing tools may not understand the M:N mapping, requiring runtime-specific tooling like Go\'s pprof or Erlang\'s observer.',
        ],
        realWorld: [
          'The Go runtime scheduler implementing M:N threading with per-P (processor) run queues and global queue fallback for goroutines.',
          'The Tokio async runtime in Rust mapping thousands of async tasks onto a configurable number of worker threads.',
          'The .NET ThreadPool internally manages a pool of kernel threads and schedules Tasks (user-space work items) across them in an M:N fashion.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Shared Memory & Race Conditions',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Learn how concurrent access to shared memory can lead to race conditions, data races, and other correctness bugs, and why understanding the memory hierarchy is essential for writing safe concurrent code.',
    concepts: [
      {
        id: 'shared-memory-model',
        name: 'Shared Memory Fundamentals',
        description:
          'In the shared memory model, multiple threads access a common address space, enabling fast communication but requiring careful coordination.',
        keyPoints: [
          'Shared memory is the default model for multi-threaded programs: all threads in a process see the same heap, global variables, and static data.',
          'CPU caches introduce complexity: each core has its own L1/L2 cache, so a write by one core may not be immediately visible to another core without explicit synchronization.',
          'Cache coherence protocols like MESI ensure that caches eventually agree, but "eventually" can mean reordered or delayed visibility without memory barriers.',
          'The memory hierarchy (registers, L1, L2, L3, main memory) means that the cost of sharing data varies dramatically based on whether cores share a cache level.',
          'False sharing occurs when two threads modify different variables that happen to reside on the same cache line (typically 64 bytes), causing unnecessary cache invalidation and performance degradation.',
        ],
        tradeoffs: [
          'Shared memory enables zero-copy communication between threads, which is extremely fast, but correctness depends on proper synchronization.',
          'Hardware cache coherence simplifies programming compared to explicit message passing, but hides subtle performance pitfalls like false sharing.',
          'Shared memory scales well within a single machine but does not extend to distributed systems, where message passing is necessary.',
        ],
        realWorld: [
          'A multi-threaded image processor where worker threads read from a shared input buffer and write to a shared output buffer.',
          'A game engine where the physics thread and rendering thread share a scene graph protected by synchronization primitives.',
          'A database connection pool stored in shared memory that multiple request-handling threads draw from and return connections to.',
        ],
      },
      {
        id: 'race-conditions',
        name: 'Race Conditions & Data Races',
        description:
          'A race condition occurs when program correctness depends on the relative timing of events; a data race is a specific case where unsynchronized threads access the same memory and at least one writes.',
        keyPoints: [
          'A data race has a precise definition: two or more threads access the same memory location concurrently, at least one access is a write, and there is no synchronization ordering the accesses.',
          'Race conditions are a broader concept: even with no data races, a program can produce wrong results if operations happen in an unexpected order (e.g., check-then-act patterns).',
          'The classic example is incrementing a shared counter: read-modify-write is not atomic, so two threads may read the same value, increment it, and write back, losing one update.',
          'Data races cause undefined behavior in languages like C, C++, and Rust (which prevents them at compile time). Java and Go define data race semantics but results are still unpredictable.',
          'Tools like ThreadSanitizer (TSan), Helgrind, and the Go race detector dynamically detect data races by tracking memory accesses and synchronization events during execution.',
        ],
        tradeoffs: [
          'Eliminating data races guarantees memory safety but does not guarantee logical correctness; higher-level race conditions can still occur.',
          'Race detection tools add significant runtime overhead (2-20x slowdown) so they are typically used only during testing, not in production.',
          'Rust\'s ownership system prevents data races at compile time with zero runtime cost, but requires learning a complex type system.',
        ],
        realWorld: [
          'A banking application where two concurrent transfers from the same account read the balance, both see sufficient funds, and both withdraw, overdrawing the account.',
          'A web application\'s session store where concurrent requests modify the same session object, causing lost updates to user preferences.',
          'A logging system where multiple threads write to a shared log buffer without synchronization, producing garbled interleaved output.',
        ],
      },
      {
        id: 'critical-sections',
        name: 'Critical Sections & Atomicity',
        description:
          'A critical section is a code region that must execute atomically with respect to other threads to prevent race conditions on shared data.',
        keyPoints: [
          'A critical section is protected so that only one thread (or a controlled number) can execute it at a time, ensuring that compound operations on shared state appear atomic.',
          'Mutual exclusion is the simplest policy: a lock guards the critical section so that exactly one thread enters at a time. Other threads block or spin until the lock is released.',
          'The granularity of critical sections matters: coarse-grained locking (one big lock) is simple but limits concurrency; fine-grained locking (many small locks) increases parallelism but risks deadlock.',
          'Hardware provides atomic instructions (compare-and-swap, fetch-and-add, load-linked/store-conditional) that implement tiny critical sections without OS-level locks.',
          'Minimizing time spent in critical sections is crucial for performance: holding a lock while doing I/O or expensive computation serializes all threads waiting for that lock.',
        ],
        tradeoffs: [
          'Larger critical sections are easier to reason about but reduce the degree of concurrency, potentially creating bottlenecks.',
          'Atomic hardware instructions avoid lock overhead but only work for simple operations; complex invariants still need locks or transactions.',
          'Lock-free approaches eliminate blocking but are notoriously difficult to implement correctly and may not be faster under low contention.',
        ],
        realWorld: [
          'An operating system kernel protecting its process table with a spinlock so that only one core modifies the table at a time.',
          'A concurrent hash map using per-bucket locks (fine-grained) to allow parallel reads and writes to different buckets.',
          'An atomic counter used in a web server to track the total number of active connections without requiring a mutex.',
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // Part 2 — Synchronization
  // ──────────────────────────────────────────────
  {
    id: 4,
    title: 'Locks, Mutexes & Semaphores',
    part: 2,
    partTitle: 'Synchronization',
    summary:
      'Explore the foundational synchronization primitives: mutexes for mutual exclusion, reader-writer locks for concurrent reads, and semaphores for controlling access to finite resources.',
    concepts: [
      {
        id: 'mutexes',
        name: 'Mutexes & Spinlocks',
        description:
          'A mutex provides mutual exclusion by allowing only one thread to hold it at a time; a spinlock is a mutex variant that busy-waits instead of sleeping.',
        keyPoints: [
          'A mutex (mutual exclusion lock) blocks the calling thread when the lock is held by another thread, putting it to sleep until the lock is released, which involves a system call.',
          'A spinlock busy-waits in a tight loop checking the lock variable, avoiding the overhead of a sleep/wake system call but wasting CPU cycles while waiting.',
          'Spinlocks are preferred when the expected wait time is very short (less than the cost of a context switch), such as in OS kernels protecting brief critical sections.',
          'Recursive (reentrant) mutexes allow the same thread to lock the mutex multiple times without deadlocking, but they can mask design problems and add overhead.',
          'Priority inversion occurs when a low-priority thread holds a mutex needed by a high-priority thread; priority inheritance protocols solve this by temporarily boosting the holder\'s priority.',
        ],
        tradeoffs: [
          'Mutexes are fair and energy-efficient (sleeping threads consume no CPU) but have higher latency due to context switch overhead.',
          'Spinlocks have low latency for short waits but waste CPU and are unsuitable for long critical sections or single-core systems.',
          'Adaptive mutexes (used in Solaris and Linux) spin briefly then sleep, combining the advantages of both approaches.',
        ],
        realWorld: [
          'The Linux kernel using spinlocks to protect per-CPU data structures that are accessed for only a few instructions.',
          'A pthread_mutex in a multi-threaded C application guarding a shared configuration data structure.',
          'Java\'s synchronized keyword implementing a monitor (mutex + condition variable) to protect a block of code.',
        ],
      },
      {
        id: 'rwlocks',
        name: 'Reader-Writer Locks',
        description:
          'Reader-writer locks allow multiple concurrent readers or a single exclusive writer, optimizing workloads where reads vastly outnumber writes.',
        keyPoints: [
          'An RWLock has two modes: shared (read) mode allows any number of readers to hold the lock simultaneously, and exclusive (write) mode allows exactly one writer with no concurrent readers.',
          'Read-heavy workloads benefit enormously: if 95% of accesses are reads, an RWLock allows 95% of operations to proceed in parallel rather than serializing behind a mutex.',
          'Writer starvation can occur if readers continuously hold the lock; fairness policies (write-preferring or FIFO) prevent this at the cost of some read throughput.',
          'RWLocks are more expensive than simple mutexes due to internal bookkeeping (tracking reader count), so they are only beneficial when read contention is high and critical sections are non-trivial.',
          'Upgradeable read locks allow a reader to atomically upgrade to a writer without releasing and re-acquiring the lock, but only one upgradeable reader can exist at a time to prevent deadlock.',
        ],
        tradeoffs: [
          'RWLocks improve throughput for read-dominated workloads but add overhead for write-dominated or balanced workloads compared to a simple mutex.',
          'Fairness policies must be chosen carefully: reader-preferring maximizes read throughput but can starve writers indefinitely.',
          'On NUMA architectures, RWLock reader counts can cause cache-line bouncing across sockets, degrading performance even for reads.',
        ],
        realWorld: [
          'A DNS cache that is read millions of times per second but updated only every few minutes, using an RWLock to allow concurrent lookups.',
          'A routing table in a network switch accessed by many packet-processing threads (readers) and updated rarely by the control plane (writer).',
          'Rust\'s std::sync::RwLock guarding a shared configuration HashMap in a multi-threaded web server.',
        ],
      },
      {
        id: 'semaphores',
        name: 'Counting & Binary Semaphores',
        description:
          'A semaphore is a signaling mechanism that maintains a count, allowing up to N threads to access a resource concurrently, generalizing the mutex concept.',
        keyPoints: [
          'A counting semaphore has an integer value N: P (wait/acquire) decrements it and blocks if zero; V (signal/release) increments it and wakes a blocked thread.',
          'A binary semaphore (N=1) behaves similarly to a mutex but lacks ownership: any thread can signal it, not just the thread that acquired it, making it useful for signaling between threads.',
          'Semaphores solve classic synchronization problems like bounded buffer (producer-consumer with a fixed-size queue) by tracking available slots and filled slots.',
          'Unlike mutexes, semaphores are not tied to a specific critical section or thread, making them more flexible for signaling but easier to misuse (e.g., forgetting to signal).',
          'POSIX semaphores (sem_t) can be shared between processes via shared memory, making them suitable for inter-process synchronization in addition to inter-thread synchronization.',
        ],
        tradeoffs: [
          'Semaphores are versatile and can implement both mutual exclusion and signaling, but their lack of ownership makes reasoning about correctness harder.',
          'Counting semaphores elegantly limit concurrency to N, but choosing the right N requires understanding the resource constraints.',
          'Semaphores are a low-level primitive; higher-level abstractions like channels, monitors, or async/await are usually preferred in modern code.',
        ],
        realWorld: [
          'A database connection pool using a counting semaphore initialized to the maximum number of connections, throttling concurrent database access.',
          'A print spooler using a semaphore to limit the number of simultaneous print jobs to the number of available printers.',
          'The Linux kernel using semaphores for inter-process synchronization in System V IPC shared memory segments.',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Lock-Free & Wait-Free Algorithms',
    part: 2,
    partTitle: 'Synchronization',
    summary:
      'Discover non-blocking synchronization techniques that guarantee system-wide progress (lock-free) or per-thread progress (wait-free) without using traditional locks.',
    concepts: [
      {
        id: 'cas-operations',
        name: 'Compare-and-Swap (CAS)',
        description:
          'CAS is a hardware atomic instruction that updates a memory location only if it still holds an expected value, serving as the foundation for most lock-free algorithms.',
        keyPoints: [
          'CAS takes three arguments: a memory address, an expected old value, and a new value. It atomically compares the current value with expected, and if equal, writes the new value and returns success.',
          'CAS-based algorithms follow a retry loop pattern: read the current state, compute the desired new state, attempt CAS, and retry from the read step if CAS fails due to concurrent modification.',
          'The ABA problem occurs when a value changes from A to B and back to A between a thread\'s read and CAS, making CAS succeed incorrectly. Tagged pointers or hazard pointers solve this.',
          'Modern CPUs provide CAS as a single instruction (CMPXCHG on x86, LL/SC pairs on ARM/RISC-V), ensuring atomicity without disabling interrupts.',
          'CAS can suffer from high contention: when many threads CAS the same location, most fail and retry, leading to wasted work and poor cache behavior. Exponential backoff helps.',
        ],
        tradeoffs: [
          'CAS avoids the overhead and deadlock risk of locks, but retry loops can waste CPU under high contention.',
          'CAS is lock-free (some thread always makes progress) but not wait-free (individual threads can be starved by repeated failures).',
          'Single-word CAS limits the state you can atomically update; multi-word CAS (DCAS, MCAS) is not natively supported by most hardware.',
        ],
        realWorld: [
          'Java\'s AtomicInteger.compareAndSet() using CAS to implement thread-safe counters and accumulators without locks.',
          'The Linux kernel\'s lock-free singly-linked list implementation (llist) using CAS for concurrent push/pop operations.',
          'Lock-free memory allocators like jemalloc using CAS to manage free lists without global locks.',
        ],
      },
      {
        id: 'lock-free-data-structures',
        name: 'Lock-Free Data Structures',
        description:
          'Lock-free data structures guarantee that at least one thread makes progress in a finite number of steps, even if other threads are delayed or preempted.',
        keyPoints: [
          'The Michael-Scott queue is the canonical lock-free FIFO queue, using CAS on head and tail pointers to allow concurrent enqueue and dequeue without locks.',
          'Lock-free stacks (Treiber stack) are simpler: push and pop both CAS the top pointer, but suffer from the ABA problem which requires hazard pointers or tagged pointers to resolve.',
          'Lock-free data structures must solve memory reclamation: when is it safe to free a removed node if other threads might still hold references? Epoch-based reclamation, hazard pointers, and RCU address this.',
          'Correctness of lock-free data structures is notoriously hard to verify. Linearizability is the standard criterion: every operation appears to take effect at a single instant between its call and return.',
          'Lock-free structures often outperform lock-based ones under moderate contention, but under low contention a simple mutex may be faster due to lower constant factors.',
        ],
        tradeoffs: [
          'Lock-free structures eliminate deadlock and priority inversion but are significantly harder to design, implement, and verify.',
          'Memory reclamation adds complexity and overhead; without it, lock-free structures leak memory.',
          'Under extreme contention, lock-free CAS loops can perform worse than well-designed lock-based structures that queue waiters.',
        ],
        realWorld: [
          'Java\'s ConcurrentLinkedQueue implementing the Michael-Scott lock-free queue for high-throughput message passing.',
          'The Crossbeam library in Rust providing lock-free data structures with epoch-based memory reclamation.',
          'Intel\'s Threading Building Blocks (TBB) providing lock-free concurrent containers for parallel C++ applications.',
        ],
      },
      {
        id: 'wait-free-algorithms',
        name: 'Wait-Free Guarantees',
        description:
          'Wait-free algorithms guarantee that every thread completes its operation in a bounded number of steps, providing the strongest progress guarantee.',
        keyPoints: [
          'Wait-freedom means every operation finishes in O(n) or better steps regardless of other threads\' behavior, where n is the number of threads. No thread can be starved.',
          'Wait-free algorithms are strictly stronger than lock-free: lock-free guarantees system-wide progress (some thread advances), while wait-free guarantees per-thread progress (every thread advances).',
          'Universal constructions exist that can make any sequential data structure wait-free, but they incur high overhead and are primarily of theoretical interest.',
          'Practical wait-free algorithms exist for specific structures: wait-free snapshots, wait-free registers, and wait-free queues (e.g., Kogan-Petrank queue).',
          'The performance cost of wait-free guarantees often exceeds the benefit in practice: lock-free algorithms with helping mechanisms (where fast threads assist slow ones) are usually preferred.',
        ],
        tradeoffs: [
          'Wait-freedom provides the strongest fairness guarantee but typically at a significant performance cost compared to lock-free alternatives.',
          'Wait-free algorithms are essential in hard real-time systems where bounded response time is a correctness requirement, not just a performance goal.',
          'The complexity of implementing wait-free algorithms correctly is even higher than lock-free, limiting their practical adoption to niche domains.',
        ],
        realWorld: [
          'Hard real-time systems in avionics or medical devices where every operation must complete within a bounded time to meet safety requirements.',
          'Wait-free atomic snapshot objects used in distributed computing theory for consistent reads of shared state.',
          'The flat-combining technique that approximates wait-free behavior by delegating operations to a single combiner thread that batches them.',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Memory Models & Ordering',
    part: 2,
    partTitle: 'Synchronization',
    summary:
      'Understand how hardware and language memory models define the rules for when writes by one thread become visible to reads by another, and how memory ordering constraints affect correctness and performance.',
    concepts: [
      {
        id: 'hardware-memory-models',
        name: 'Hardware Memory Models',
        description:
          'Different CPU architectures reorder memory operations in different ways, making the observed order of reads and writes vary across platforms.',
        keyPoints: [
          'x86/x64 processors have a relatively strong memory model (Total Store Order): stores are seen in program order by other cores, but a store followed by a load to a different address can be reordered.',
          'ARM and RISC-V have weak memory models: both loads and stores can be reordered freely, requiring explicit fence/barrier instructions to enforce ordering.',
          'Store buffers allow a core to continue executing after a store without waiting for it to reach the cache, improving performance but making the store invisible to other cores temporarily.',
          'Memory barriers (fences) force ordering: a store fence ensures all prior stores are visible before subsequent stores; a full fence orders all operations. They are expensive and should be used sparingly.',
          'Programs that appear correct on x86 may break on ARM because x86\'s stronger model masks reordering bugs; portable concurrent code must not rely on any specific hardware model.',
        ],
        tradeoffs: [
          'Strong memory models (x86) are easier to program for but limit hardware optimization opportunities, potentially capping performance.',
          'Weak memory models (ARM) allow more aggressive hardware optimizations but push complexity onto the programmer who must insert explicit barriers.',
          'Testing on only one architecture (e.g., x86) gives false confidence; race conditions may only manifest on weaker architectures.',
        ],
        realWorld: [
          'The Linux kernel\'s memory barrier macros (smp_mb, smp_wmb, smp_rmb) abstracting hardware differences for portable synchronization.',
          'A lock-free queue that works on x86 but produces incorrect results on ARM due to missing load-acquire/store-release barriers.',
          'Apple\'s transition from x86 to ARM (M1 chips) exposing subtle memory ordering bugs in existing macOS applications.',
        ],
      },
      {
        id: 'language-memory-models',
        name: 'Language Memory Models',
        description:
          'Language memory models (C++11, Java, Rust) define abstract rules for inter-thread visibility, independent of hardware, giving compilers freedom to optimize while guaranteeing defined behavior.',
        keyPoints: [
          'The C++11 memory model defines six ordering modes: relaxed, consume, acquire, release, acq_rel, and seq_cst, giving programmers fine-grained control over synchronization costs.',
          'Sequential consistency (seq_cst) is the strongest ordering: all threads observe all operations in a single total order consistent with program order. It is the safest default but the most expensive.',
          'Acquire-release ordering is a common optimization: a release store synchronizes with an acquire load, ensuring all writes before the release are visible after the acquire, without a global total order.',
          'Relaxed ordering provides no cross-thread ordering guarantees; it is only useful for operations that do not participate in synchronization, like incrementing a statistics counter.',
          'The Java Memory Model (JMM) uses the happens-before relation: if action A happens-before action B, then A\'s effects are visible to B. Volatile reads/writes, lock/unlock, and thread start/join establish happens-before edges.',
        ],
        tradeoffs: [
          'Stronger orderings (seq_cst) are simpler to reason about but incur full memory fence overhead on weak architectures, potentially costing 10-100x more than relaxed operations.',
          'Weaker orderings (relaxed) maximize performance but shift the burden of correctness reasoning to the programmer, who must carefully construct happens-before relationships.',
          'Language memory models enable portable code by abstracting hardware differences, but understanding them requires significant expertise.',
        ],
        realWorld: [
          'C++ std::atomic with memory_order_release for a flag that signals data is ready, paired with memory_order_acquire on the reader side.',
          'Java volatile variables ensuring visibility of a shutdown flag across threads without explicit locks.',
          'Rust\'s std::sync::atomic::Ordering enum directly exposing the C++11 memory orderings for unsafe low-level concurrent code.',
        ],
      },
      {
        id: 'happens-before',
        name: 'Happens-Before & Synchronization',
        description:
          'The happens-before relation is the formal foundation for reasoning about inter-thread visibility: if A happens-before B, then B is guaranteed to see A\'s effects.',
        keyPoints: [
          'Within a single thread, every statement happens-before the next (program order). Across threads, synchronization actions like lock release -> lock acquire create happens-before edges.',
          'A release-acquire pair forms a synchronization point: all memory writes before a release are guaranteed to be visible to any thread that performs a subsequent acquire on the same variable.',
          'Happens-before is transitive: if A happens-before B and B happens-before C, then A happens-before C. This allows reasoning about chains of synchronization.',
          'Data-race-freedom (DRF) guarantee: if all shared memory accesses are ordered by happens-before, the program executes as if it were sequentially consistent, simplifying reasoning.',
          'Compiler and hardware reorderings are constrained by happens-before: the implementation is free to reorder operations only if no happens-before relationship is violated.',
        ],
        tradeoffs: [
          'The DRF guarantee simplifies reasoning for well-synchronized programs, but offers no guarantees for programs with data races.',
          'Establishing happens-before relationships adds synchronization overhead; the art is using the minimum synchronization needed for correctness.',
          'Happens-before reasoning is modular: you can verify synchronization locally at each variable without global analysis, which scales better than reasoning about interleavings.',
        ],
        realWorld: [
          'Java\'s happens-before rules guaranteeing that a thread sees all writes made before Thread.start() was called when the new thread begins executing.',
          'Go\'s sync.WaitGroup ensuring that the main goroutine sees all writes made by worker goroutines before wg.Done() was called when wg.Wait() returns.',
          'A C++ producer-consumer pair using an atomic flag with release/acquire to ensure the consumer sees the fully initialized data after the producer sets the flag.',
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // Part 3 — Patterns
  // ──────────────────────────────────────────────
  {
    id: 7,
    title: 'Producer-Consumer & Channels',
    part: 3,
    partTitle: 'Patterns',
    summary:
      'Master the producer-consumer pattern and its modern incarnation through channels, which decouple producing and consuming tasks via bounded or unbounded queues.',
    concepts: [
      {
        id: 'producer-consumer-pattern',
        name: 'The Producer-Consumer Pattern',
        description:
          'The producer-consumer pattern decouples data generation from data processing using a shared buffer, allowing producers and consumers to operate at different rates.',
        keyPoints: [
          'Producers generate data items and place them into a shared buffer; consumers remove items and process them. Neither side needs to know about the other, enabling loose coupling.',
          'A bounded buffer (fixed-size queue) introduces back-pressure: producers block when the buffer is full, and consumers block when it is empty, naturally throttling the system.',
          'The pattern is typically implemented with a mutex protecting the buffer plus two condition variables: one for "buffer not full" (producer waits) and one for "buffer not empty" (consumer waits).',
          'Multiple producers and multiple consumers can work with the same buffer, enabling parallel pipeline stages. The buffer serializes access, ensuring each item is processed exactly once.',
          'Choosing the buffer size involves a trade-off: larger buffers smooth out rate differences and reduce blocking, but consume more memory and increase latency for items waiting in the queue.',
        ],
        tradeoffs: [
          'Decoupling producers and consumers improves modularity and throughput, but the buffer adds latency and memory overhead.',
          'Bounded buffers provide back-pressure and prevent memory exhaustion, while unbounded buffers risk unlimited growth if consumers fall behind.',
          'Multiple consumers increase throughput but may process items out of order unless ordering guarantees are explicitly maintained.',
        ],
        realWorld: [
          'A logging framework where application threads (producers) enqueue log messages and a dedicated I/O thread (consumer) writes them to disk.',
          'A video streaming pipeline where a decoder (producer) fills a frame buffer and a renderer (consumer) displays frames at a fixed rate.',
          'Apache Kafka functioning as a distributed bounded buffer between data-producing microservices and data-consuming analytics systems.',
        ],
      },
      {
        id: 'channels',
        name: 'Channels & CSP',
        description:
          'Channels provide typed, thread-safe conduits for passing messages between concurrent tasks, embodying the CSP (Communicating Sequential Processes) model of "share memory by communicating."',
        keyPoints: [
          'A channel has a sender end and a receiver end. Sending puts a value into the channel; receiving takes a value out. The channel handles all necessary synchronization internally.',
          'Unbuffered (rendezvous) channels synchronize sender and receiver: the sender blocks until the receiver is ready, and vice versa, making every send/receive a synchronization point.',
          'Buffered channels allow N items to be sent without blocking, decoupling the sender from the receiver for improved throughput, but losing the synchronization guarantee of rendezvous channels.',
          'Go\'s channels with select statements allow a goroutine to wait on multiple channel operations simultaneously, enabling flexible event-driven control flow.',
          'Rust\'s std::sync::mpsc (multi-producer, single-consumer) channel enforces ownership transfer: once a value is sent, the sender can no longer access it, preventing data races by construction.',
        ],
        tradeoffs: [
          'Channels eliminate shared state bugs by moving data ownership between tasks, but copying data through channels can be slower than direct shared memory access.',
          'Unbuffered channels provide strong synchronization guarantees but can limit throughput due to mandatory rendezvous.',
          'Channels can deadlock if senders and receivers form a cycle where each waits for the other; this is analogous to lock-based deadlock but harder to detect with tools.',
        ],
        realWorld: [
          'Go microservices using channels to pass parsed HTTP request bodies from handler goroutines to worker goroutines for processing.',
          'Rust\'s Tokio runtime using async channels (tokio::sync::mpsc) for communication between async tasks without shared mutable state.',
          'Unix pipes (cat file | grep pattern | sort) as an OS-level channel implementation connecting process stdout to stdin.',
        ],
      },
      {
        id: 'backpressure',
        name: 'Backpressure & Flow Control',
        description:
          'Backpressure is a mechanism that slows down producers when consumers cannot keep up, preventing buffer overflow and maintaining system stability.',
        keyPoints: [
          'Without backpressure, a fast producer can overwhelm a slow consumer, causing unbounded memory growth, increased latency, and eventual out-of-memory crashes.',
          'Bounded buffers are the simplest backpressure mechanism: when the buffer is full, the producer blocks or receives an error, forcing it to slow down to the consumer\'s rate.',
          'Reactive Streams (Java) and similar frameworks formalize backpressure through subscription-based protocols where consumers explicitly request N items, and producers send at most N.',
          'TCP flow control is a network-level backpressure mechanism: the receiver advertises a window size, and the sender limits in-flight data to that window, preventing buffer overflow at the receiver.',
          'Dropping or sampling is an alternative to blocking: when overwhelmed, the system drops excess items (acceptable for metrics, monitoring) rather than blocking the producer.',
        ],
        tradeoffs: [
          'Blocking backpressure prevents data loss but can propagate slowness backward through an entire pipeline, potentially stalling the whole system.',
          'Dropping excess data prevents stalls but loses information, which is acceptable for metrics but not for financial transactions.',
          'Buffering absorbs temporary rate mismatches but delays the backpressure signal; by the time the buffer fills, a large backlog has accumulated.',
        ],
        realWorld: [
          'Kafka consumers falling behind: Kafka retains messages on disk and consumers control their read position, providing backpressure without blocking producers.',
          'Kubernetes pod autoscaling responding to queue depth: when the work queue grows, Kubernetes scales up consumers rather than blocking producers.',
          'Node.js readable streams emitting "pause" events when the writable destination\'s internal buffer exceeds its highWaterMark threshold.',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Actor Model & Message Passing',
    part: 3,
    partTitle: 'Patterns',
    summary:
      'Explore the actor model where isolated actors communicate exclusively through asynchronous messages, eliminating shared state and simplifying reasoning about concurrency.',
    concepts: [
      {
        id: 'actor-model',
        name: 'The Actor Model',
        description:
          'In the actor model, each actor is an independent unit of computation with private state that communicates with other actors solely through asynchronous messages.',
        keyPoints: [
          'An actor has three capabilities: it can send messages to other actors, create new actors, and update its own private state in response to received messages. There is no shared mutable state.',
          'Messages are delivered to an actor\'s mailbox (a queue) and processed one at a time in order. This serialized processing eliminates the need for locks or synchronization within an actor.',
          'Actors are location-transparent: a reference to an actor works the same whether the actor is in the same process, on another machine, or in another data center, enabling distributed systems.',
          'Failure handling in actor systems uses supervision trees: parent actors supervise children and decide how to handle failures (restart, stop, or escalate), enabling self-healing systems.',
          'The actor model was formalized by Carl Hewitt in 1973 and popularized by Erlang/OTP, which has been running telecom systems with 99.9999999% uptime since the 1980s.',
        ],
        tradeoffs: [
          'Eliminating shared state simplifies reasoning about concurrency, but asynchronous messaging introduces complexity in ordering, delivery guarantees, and debugging.',
          'Actor isolation provides strong fault isolation (one actor crashing does not corrupt others), but accessing related data spread across actors requires coordination patterns.',
          'The actor model scales naturally to distributed systems, but network partitions and message loss add failure modes that do not exist in shared-memory concurrency.',
        ],
        realWorld: [
          'Erlang/OTP powering WhatsApp\'s messaging backend, handling millions of concurrent connections with a small engineering team.',
          'Akka (Scala/Java) implementing actor-based systems for financial trading platforms that require low-latency message processing.',
          'Microsoft Orleans providing a virtual actor model for building distributed services on Azure, with transparent activation and deactivation.',
        ],
      },
      {
        id: 'message-passing',
        name: 'Message Passing Semantics',
        description:
          'Message passing semantics define how messages are delivered between actors or processes, including ordering guarantees, delivery assurances, and serialization.',
        keyPoints: [
          'At-most-once delivery means a message may be lost but will never be delivered more than once. This is the default for most actor systems and is the simplest to implement.',
          'At-least-once delivery guarantees the message arrives but may duplicate it. The receiver must be idempotent (processing the same message twice produces the same result) to handle duplicates.',
          'Exactly-once delivery is the holy grail but is impossible to achieve in a distributed system in the general case (proven by the Two Generals Problem). It is approximated using deduplication.',
          'Message ordering between the same sender-receiver pair is typically FIFO in local actor systems, but in distributed settings, messages may arrive out of order and require sequence numbers.',
          'Serialization (converting messages to bytes for transmission) is a key concern in distributed actor systems; efficient formats like Protocol Buffers, FlatBuffers, or MessagePack reduce overhead.',
        ],
        tradeoffs: [
          'Stronger delivery guarantees (at-least-once, exactly-once) require more infrastructure (retry logic, deduplication, persistent logs) and add latency.',
          'FIFO ordering simplifies application logic but limits throughput to a single channel; relaxing ordering enables parallel message delivery.',
          'Binary serialization formats are faster but harder to debug than text-based formats like JSON.',
        ],
        realWorld: [
          'Apache Kafka providing at-least-once delivery with idempotent producers achieving effectively-exactly-once semantics.',
          'gRPC using Protocol Buffers for efficient serialization in microservice-to-microservice communication.',
          'RabbitMQ offering configurable delivery guarantees: basic.publish for at-most-once, publisher confirms for at-least-once.',
        ],
      },
      {
        id: 'supervision-trees',
        name: 'Supervision & Fault Tolerance',
        description:
          'Supervision trees organize actors into hierarchies where parent actors monitor and restart child actors on failure, enabling self-healing concurrent systems.',
        keyPoints: [
          'In a supervision tree, each actor is supervised by a parent actor that defines a strategy for handling child failures: restart the failed child, stop it, restart all siblings, or escalate to the grandparent.',
          'The "let it crash" philosophy, pioneered by Erlang, encourages actors to fail fast when encountering errors rather than trying to recover internally. The supervisor handles recovery.',
          'Restart strategies include one-for-one (restart only the failed child), one-for-all (restart all children), and rest-for-one (restart the failed child and all children started after it).',
          'Supervision trees provide defense in depth: if a leaf actor crashes, its supervisor restarts it. If the supervisor itself crashes, its parent restarts the entire subtree.',
          'Backoff strategies prevent restart loops: if a child crashes repeatedly within a short period, the supervisor can delay restarts, stop the child permanently, or escalate the failure.',
        ],
        tradeoffs: [
          'Let-it-crash simplifies error handling code within actors but requires careful supervision tree design to ensure recovery is meaningful.',
          'Restarting an actor loses its in-memory state; important state must be persisted externally or passed in the restart message.',
          'Deep supervision trees add overhead and complexity but provide fine-grained fault isolation; flat trees are simpler but less resilient.',
        ],
        realWorld: [
          'Erlang/OTP\'s telecom switches achieving "nine nines" (99.9999999%) uptime through supervision trees that automatically recover from hardware and software faults.',
          'Akka\'s supervision system allowing a payment processing actor tree to isolate and recover from individual transaction failures without affecting the overall system.',
          'Elixir/Phoenix web applications using supervision trees to restart crashed request handlers without losing the overall application state.',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Async/Await & Event Loops',
    part: 3,
    partTitle: 'Patterns',
    summary:
      'Understand how async/await syntax and event loops enable concurrent I/O without threads, using cooperative multitasking to handle thousands of operations efficiently.',
    concepts: [
      {
        id: 'event-loops',
        name: 'Event Loops & I/O Multiplexing',
        description:
          'An event loop processes events from a queue in a single thread, using I/O multiplexing system calls to efficiently wait on thousands of file descriptors simultaneously.',
        keyPoints: [
          'The event loop runs a continuous cycle: check for ready I/O events, dispatch callbacks for ready events, execute callbacks, then return to checking. This avoids blocking on any single operation.',
          'I/O multiplexing system calls (select, poll, epoll on Linux, kqueue on macOS, IOCP on Windows) allow a single thread to monitor thousands of sockets for readiness without polling each one.',
          'The event loop is single-threaded for application code, eliminating data races on shared state. The trade-off is that CPU-intensive callbacks block the entire loop.',
          'Callback hell (deeply nested callbacks) was the original programming model for event loops, leading to hard-to-read and hard-to-maintain code that async/await syntax was designed to solve.',
          'Modern event loops (libuv in Node.js, tokio in Rust, asyncio in Python) provide high-level abstractions over OS-specific I/O multiplexing, enabling portable asynchronous I/O.',
        ],
        tradeoffs: [
          'Event loops handle thousands of concurrent I/O operations with a single thread and minimal memory, but cannot parallelize CPU-bound work.',
          'Single-threaded execution eliminates synchronization bugs but means one slow callback delays all pending events.',
          'I/O multiplexing APIs vary across operating systems; frameworks abstract this at the cost of an additional dependency.',
        ],
        realWorld: [
          'Node.js handling 10,000+ concurrent HTTP connections on a single thread using libuv\'s event loop and epoll/kqueue.',
          'Redis processing 100,000+ operations per second with a single-threaded event loop, relying on in-memory data for speed.',
          'Nginx using an event-driven architecture with a small number of worker processes to serve millions of concurrent connections.',
        ],
      },
      {
        id: 'async-await',
        name: 'Async/Await Syntax',
        description:
          'Async/await is syntactic sugar that lets developers write asynchronous code in a sequential style, with the compiler transforming it into state machines that cooperatively yield at suspension points.',
        keyPoints: [
          'An async function returns a future (or promise) representing a value that will be available later. The await keyword suspends the current function until the future resolves, then resumes with the result.',
          'Under the hood, the compiler transforms async functions into state machines: each await point becomes a state transition, and the function\'s local variables are captured in a struct.',
          'Async/await is cooperative: a task only yields at await points. Between awaits, the task runs uninterrupted, making it easy to reason about atomicity of synchronous code blocks.',
          'Async functions compose naturally: an async function can await other async functions, building complex asynchronous workflows that read like synchronous code.',
          'Cancellation is an important concern: when an async task is no longer needed, it should be cancelled to free resources. Different runtimes handle cancellation differently (structured concurrency, cancellation tokens, task abort).',
        ],
        tradeoffs: [
          'Async/await dramatically improves code readability over callbacks, but the underlying state machine adds hidden complexity and can produce confusing error messages.',
          'Colored function problem: async functions can only be awaited from other async functions, creating a viral split between sync and async code throughout the codebase.',
          'Debugging async code is harder because stack traces are fragmented across state machine transitions; specialized tools are needed to reconstruct logical call stacks.',
        ],
        realWorld: [
          'JavaScript/TypeScript using async/await with Promises for all web API calls, file I/O, and timer operations.',
          'Rust\'s async/.await with the Tokio runtime powering high-performance network services like Cloudflare\'s edge proxies.',
          'Python\'s asyncio powering web frameworks like FastAPI and aiohttp for handling thousands of concurrent HTTP requests.',
        ],
      },
      {
        id: 'structured-concurrency',
        name: 'Structured Concurrency',
        description:
          'Structured concurrency ensures that concurrent tasks are scoped to a lexical block, guaranteeing that all child tasks complete before the parent continues, preventing resource leaks.',
        keyPoints: [
          'In structured concurrency, every concurrent task has a clear owner and lifetime. When a scope exits, all tasks spawned within it are awaited (or cancelled), preventing "fire and forget" leaks.',
          'This mirrors structured programming\'s principle that control flow should have clear entry and exit points, applied to concurrent task lifetimes.',
          'Kotlin\'s coroutineScope, Swift\'s TaskGroup, and Python\'s trio.open_nursery are implementations of structured concurrency that enforce hierarchical task management.',
          'Error propagation becomes natural with structured concurrency: if a child task fails, the error propagates to the parent scope, which can cancel sibling tasks and handle the error.',
          'Structured concurrency makes resource cleanup reliable: because all tasks complete before the scope exits, resources (files, connections, locks) can be safely released at scope boundaries.',
        ],
        tradeoffs: [
          'Structured concurrency prevents task leaks and simplifies error handling, but can feel restrictive when genuinely long-lived background tasks are needed.',
          'Enforcing task hierarchies adds syntactic overhead compared to freely spawning tasks, but dramatically reduces the mental overhead of reasoning about task lifetimes.',
          'Not all concurrency frameworks support structured concurrency natively; retrofitting it onto callback-based or promise-based systems can be awkward.',
        ],
        realWorld: [
          'Kotlin coroutines using supervisorScope and coroutineScope to ensure all child coroutines complete or fail together in Android applications.',
          'Swift\'s structured concurrency with TaskGroup in iOS apps, ensuring that parallel image downloads all complete or cancel before updating the UI.',
          'Python\'s Trio library enforcing structured concurrency via nurseries, guaranteeing no orphaned background tasks in network client code.',
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // Part 4 — Advanced Topics
  // ──────────────────────────────────────────────
  {
    id: 10,
    title: 'Parallel Algorithms & MapReduce',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Learn how classic algorithms are redesigned for parallel execution, from parallel sorting and prefix sums to the MapReduce framework that powers large-scale data processing.',
    concepts: [
      {
        id: 'parallel-primitives',
        name: 'Parallel Primitives',
        description:
          'Parallel scan (prefix sum), reduce, and map are fundamental building blocks that enable the parallelization of a wide range of algorithms.',
        keyPoints: [
          'Parallel reduce computes an aggregate (sum, max, etc.) over N elements in O(log N) time using N/2 processors, compared to O(N) for sequential reduction.',
          'Parallel prefix sum (scan) computes all partial sums of an array in O(log N) time and is surprisingly versatile: it enables parallel sorting, filtering, histogram, and stream compaction.',
          'Work efficiency matters: a parallel algorithm is work-efficient if its total work (time x processors) matches the sequential algorithm. Extra work reduces the effective speedup.',
          'The fork-join model divides work recursively (fork) and combines results (join), naturally expressing parallel divide-and-conquer algorithms like merge sort and quicksort.',
          'Work-stealing schedulers dynamically balance load in fork-join programs: threads that finish their portion steal pending tasks from other threads\' deques, minimizing idle time.',
        ],
        tradeoffs: [
          'Parallel algorithms reduce wall-clock time but increase total work (CPU-seconds), using more energy than optimal sequential algorithms.',
          'Fork-join parallelism maps well to recursive algorithms but poorly to iterative ones; restructuring iterative algorithms may be necessary.',
          'Work-stealing provides excellent load balancing dynamically but adds overhead from deque management and task granularity decisions.',
        ],
        realWorld: [
          'Java\'s ForkJoinPool and parallel streams using work-stealing to parallelize collection operations like map, filter, and reduce.',
          'GPU prefix sum implementations enabling parallel radix sort that processes billions of elements per second.',
          'Intel TBB\'s parallel_for and parallel_reduce used in computer vision and image processing libraries for real-time performance.',
        ],
      },
      {
        id: 'mapreduce',
        name: 'MapReduce Framework',
        description:
          'MapReduce is a programming model for processing large datasets in parallel across a cluster, using a map phase to transform data and a reduce phase to aggregate results.',
        keyPoints: [
          'The Map phase applies a function to each input record independently, producing key-value pairs. Since each record is processed independently, this phase is embarrassingly parallel.',
          'The Shuffle phase groups all values with the same key and sends them to the same reducer. This is the most network-intensive phase and a common bottleneck in distributed MapReduce.',
          'The Reduce phase aggregates all values for each key using a user-defined function (sum, count, merge). Reducers run in parallel across the cluster, one per key group.',
          'MapReduce handles fault tolerance transparently: if a worker fails, the framework re-executes its tasks on another worker, leveraging the deterministic nature of map and reduce functions.',
          'Google\'s original MapReduce paper (2004) inspired Hadoop MapReduce, which became the foundation of the big data ecosystem, later evolving into more flexible frameworks like Spark and Flink.',
        ],
        tradeoffs: [
          'MapReduce is simple to program and scales to petabytes, but the rigid two-phase model is inefficient for iterative algorithms that need multiple passes (e.g., machine learning).',
          'Writing intermediate data to disk (as in Hadoop) provides fault tolerance but dramatically slows down iterative workloads compared to in-memory frameworks like Spark.',
          'MapReduce\'s batch-oriented design adds latency; stream processing frameworks (Flink, Kafka Streams) address the need for real-time results.',
        ],
        realWorld: [
          'Google\'s original MapReduce system processing petabytes of web crawl data daily for building the search index.',
          'Hadoop MapReduce jobs at Facebook analyzing user activity logs to generate engagement metrics and ad targeting data.',
          'Apache Spark replacing MapReduce for iterative machine learning workloads with 10-100x speedup from in-memory processing.',
        ],
      },
      {
        id: 'parallel-sorting',
        name: 'Parallel Sorting',
        description:
          'Parallel sorting algorithms exploit multiple processors to sort large datasets faster than O(N log N), the optimal sequential bound, in terms of wall-clock time.',
        keyPoints: [
          'Parallel merge sort recursively splits the array, sorts halves in parallel, and merges them. The merge step can also be parallelized using binary search to split the merge work evenly.',
          'Sample sort (a parallel generalization of quicksort) samples the data to find good splitters, partitions the data into roughly equal buckets, and sorts each bucket independently in parallel.',
          'Bitonic sort is a comparison-based parallel sorting network with O(log^2 N) parallel steps, well-suited for GPU implementation where its regular structure maps efficiently to SIMD lanes.',
          'The theoretical lower bound for comparison-based parallel sorting is O(N log N / P + log N) time with P processors, where the second term represents the inherent sequential depth.',
          'External parallel sorting (for data larger than memory) combines parallel in-memory sorting with parallel merge of sorted runs, often limited by I/O bandwidth rather than CPU.',
        ],
        tradeoffs: [
          'Parallel sorting achieves near-linear speedup for large datasets but overhead from synchronization and data movement limits gains for small arrays.',
          'Sample sort achieves better load balance than parallel quicksort but requires an extra sampling and partitioning step.',
          'GPU-based sorting (bitonic, radix) can process billions of elements per second but requires transferring data between CPU and GPU memory.',
        ],
        realWorld: [
          'Database query engines using parallel sort-merge join to combine large tables across multiple CPU cores.',
          'Large-scale data pipeline sorting terabyte log files using distributed sample sort across a Spark cluster.',
          'GPU-accelerated sorting in real-time graphics pipelines for depth sorting transparent objects before rendering.',
        ],
      },
    ],
  },
  {
    id: 11,
    title: 'GPU Parallelism & SIMD',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Understand how GPUs and SIMD instructions exploit data-level parallelism, processing thousands of elements simultaneously for computational workloads like graphics, machine learning, and scientific computing.',
    concepts: [
      {
        id: 'simd',
        name: 'SIMD (Single Instruction, Multiple Data)',
        description:
          'SIMD applies a single operation to multiple data elements simultaneously using wide vector registers, achieving parallelism within a single CPU core.',
        keyPoints: [
          'SIMD registers (128-bit SSE, 256-bit AVX2, 512-bit AVX-512 on x86; 128-bit NEON on ARM) hold multiple elements: an AVX2 register holds 8 floats and operates on all 8 simultaneously.',
          'Auto-vectorization allows compilers to automatically convert scalar loops into SIMD instructions when the loop body has no dependencies between iterations.',
          'Intrinsics are compiler-provided functions (e.g., _mm256_add_ps in C/C++) that map directly to SIMD instructions, giving explicit control when auto-vectorization fails.',
          'SIMD works best on regular, contiguous data: array-of-structs (AoS) layouts often prevent vectorization, while struct-of-arrays (SoA) layouts align data for optimal SIMD access.',
          'Branch divergence hurts SIMD: when elements in a vector register need different operations (e.g., an if/else), SIMD must execute both branches and mask results, wasting half the throughput.',
        ],
        tradeoffs: [
          'SIMD can deliver 4-16x speedup on data-parallel operations with no thread overhead, but only applies to regular, branchless, contiguous data processing.',
          'Wider SIMD registers (AVX-512) offer more parallelism but may cause CPU frequency throttling on some chips, reducing single-core speed for non-SIMD code.',
          'Using intrinsics provides control but ties code to a specific architecture; portable SIMD libraries and compiler auto-vectorization offer more flexibility.',
        ],
        realWorld: [
          'Video codecs (H.264, VP9) using SIMD intrinsics for block transform, motion compensation, and pixel processing, achieving real-time 4K decoding.',
          'NumPy and similar numerical libraries using SIMD under the hood for vectorized array operations, making Python competitive with C for numerical work.',
          'Game physics engines using SSE/AVX to process collision detection and force calculations on batches of objects simultaneously.',
        ],
      },
      {
        id: 'gpu-architecture',
        name: 'GPU Compute Architecture',
        description:
          'GPUs contain thousands of simple cores organized into streaming multiprocessors (SMs) that execute thousands of threads simultaneously in a SIMT (Single Instruction, Multiple Threads) model.',
        keyPoints: [
          'A GPU has tens of SMs, each containing dozens of CUDA cores (NVIDIA) or stream processors (AMD). A high-end GPU may have over 10,000 cores executing in parallel.',
          'Threads are organized into warps (NVIDIA, 32 threads) or wavefronts (AMD, 64 threads). All threads in a warp execute the same instruction at the same time (SIMT model).',
          'Warp divergence occurs when threads in the same warp take different branches: the warp serially executes each branch with threads masked, reducing effective parallelism.',
          'GPU memory hierarchy differs from CPU: global memory is high-bandwidth (~1 TB/s) but high-latency (~400 cycles), shared memory is fast but small (~48 KB per SM), and thread-local registers are fastest.',
          'The GPU hides memory latency through massive parallelism: while one warp waits for memory, the SM switches to another ready warp with zero overhead, keeping the cores busy.',
        ],
        tradeoffs: [
          'GPUs offer massive throughput for data-parallel workloads but have high data transfer overhead between CPU and GPU memory (PCIe bandwidth ~32 GB/s vs ~1 TB/s GPU memory bandwidth).',
          'SIMT execution is efficient for uniform workloads but wastes resources on irregular or branchy computations due to warp divergence.',
          'GPU programming (CUDA, OpenCL, compute shaders) requires restructuring algorithms for thousands of threads and careful memory management.',
        ],
        realWorld: [
          'Deep learning training on NVIDIA GPUs processing matrix multiplications across thousands of cores, enabling models like GPT and BERT.',
          'Cryptocurrency mining performing billions of hash computations per second using GPU parallelism.',
          'Real-time ray tracing in games using RT cores on NVIDIA RTX GPUs to simulate realistic lighting and reflections.',
        ],
      },
      {
        id: 'heterogeneous-computing',
        name: 'Heterogeneous Computing',
        description:
          'Heterogeneous computing combines different processor types (CPU, GPU, FPGA, TPU) in a single system, assigning each computation to the most efficient processor for that task.',
        keyPoints: [
          'CPUs excel at complex sequential logic with deep pipelines and large caches; GPUs excel at massively parallel numerical computation. Using both together maximizes throughput.',
          'Unified memory architectures (AMD APUs, Apple Silicon) share physical memory between CPU and GPU, reducing or eliminating the data transfer bottleneck.',
          'OpenCL and SYCL provide portable APIs for heterogeneous programming, while CUDA targets only NVIDIA GPUs but offers the most mature ecosystem.',
          'FPGAs (Field-Programmable Gate Arrays) offer custom hardware acceleration: they can implement specific algorithms in hardware fabric, achieving extreme efficiency for fixed workloads.',
          'Google\'s TPUs (Tensor Processing Units) are ASICs designed specifically for matrix multiplication and neural network inference, achieving higher efficiency per watt than GPUs for these workloads.',
        ],
        tradeoffs: [
          'Heterogeneous systems offer the best performance-per-watt by matching workloads to specialized hardware, but programming them is significantly more complex.',
          'Data transfer between different processors is often the bottleneck; kernel fusion and memory mapping techniques help minimize transfers.',
          'Portable APIs (OpenCL) sacrifice some performance compared to vendor-specific APIs (CUDA) but support a wider range of hardware.',
        ],
        realWorld: [
          'Apple Silicon\'s unified memory architecture allowing the CPU, GPU, and Neural Engine to share data without copying for efficient machine learning inference on-device.',
          'Microsoft Azure offering FPGA-accelerated cloud instances for specific workloads like real-time AI inference and network packet processing.',
          'Self-driving car compute platforms combining CPUs for planning, GPUs for perception, and custom ASICs for sensor fusion in a single system.',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Transactional Memory',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Explore transactional memory as an alternative to lock-based synchronization, where blocks of code execute atomically and the runtime detects and resolves conflicts automatically.',
    concepts: [
      {
        id: 'stm',
        name: 'Software Transactional Memory (STM)',
        description:
          'STM allows blocks of memory operations to execute as atomic transactions: either all changes commit together or the transaction aborts and retries, maintaining consistency without explicit locks.',
        keyPoints: [
          'STM wraps shared memory accesses in transactions that track read and write sets. At commit time, the runtime checks if any other transaction has modified the read set; if so, it aborts and retries.',
          'Optimistic concurrency is the key insight: transactions execute without acquiring locks, assuming no conflicts. Only at commit time are conflicts detected, making the common (no-conflict) case fast.',
          'STM composes naturally: two separately correct transactional operations can be combined into a single larger transaction, maintaining atomicity. This is impossible with lock-based code without restructuring.',
          'Haskell\'s STM is the gold standard: the type system enforces that I/O cannot be performed inside transactions (since transactions may retry), preventing irreversible side effects.',
          'STM performance depends on conflict rate: under low contention, STM approaches lock-free performance. Under high contention, repeated aborts and retries can make STM slower than locking.',
        ],
        tradeoffs: [
          'STM simplifies concurrent programming and enables composability, but adds runtime overhead for tracking read/write sets even when there are no conflicts.',
          'Transactions may abort and retry multiple times under contention, wasting work and potentially causing livelock if not managed with backoff strategies.',
          'STM is most effective in languages with immutable-by-default data (Haskell, Clojure) where the runtime can efficiently track mutations.',
        ],
        realWorld: [
          'Haskell\'s Control.Concurrent.STM used in the GHC runtime for concurrent data structures like TChan (transactional channels) and TVar (transactional variables).',
          'Clojure\'s ref system providing STM with MVCC (multi-version concurrency control) semantics for managing shared mutable state in a functional language.',
          'GCC\'s libitm library providing software transactional memory support for C/C++ programs through compiler extensions.',
        ],
      },
      {
        id: 'htm',
        name: 'Hardware Transactional Memory (HTM)',
        description:
          'HTM uses CPU hardware support to execute transactions directly in cache, providing near-zero overhead for small transactions that fit in the cache and do not conflict.',
        keyPoints: [
          'Intel TSX (Transactional Synchronization Extensions) and IBM POWER\'s HTM extensions allow the CPU to speculatively execute a transaction, buffering writes in the L1 cache.',
          'The cache coherence protocol detects conflicts: if another core writes to a cache line read by the transaction, the hardware aborts the transaction and discards buffered writes.',
          'HTM has capacity limits: transactions that touch more cache lines than the L1 cache can hold will always abort, requiring a fallback path (typically a global lock).',
          'The typical usage pattern is "HTM with lock elision": attempt the transaction in hardware, and if it aborts (due to conflict, capacity, or interrupt), fall back to acquiring a traditional lock.',
          'Intel suspended TSX (Transactional Synchronization Extensions) in many consumer processors due to security vulnerabilities, though server processors retain support with microcode updates.',
        ],
        tradeoffs: [
          'HTM has near-zero overhead for successful transactions (no extra instructions beyond XBEGIN/XEND), but the fallback path must be implemented and is often a global lock.',
          'Capacity limitations mean HTM works only for small transactions; large critical sections always fall back to locks, reducing the benefit.',
          'Security concerns (like TSX-based side-channel attacks) have limited HTM adoption and availability on consumer hardware.',
        ],
        realWorld: [
          'Concurrent data structures in databases (like IBM DB2) using HTM to speculatively execute short critical sections without locks.',
          'Lock elision in the glibc pthread mutex implementation on Intel platforms, transparently accelerating existing lock-based code.',
          'Java\'s JVM using hardware lock elision to optimize synchronized blocks on TSX-enabled processors.',
        ],
      },
      {
        id: 'transaction-composability',
        name: 'Composability & Alternatives',
        description:
          'Transactional memory\'s key advantage over locks is composability: independently developed transactions can be combined atomically, which is fundamentally impossible with locks alone.',
        keyPoints: [
          'With locks, combining two independently correct operations (e.g., transfer from account A to B, and transfer from B to C) into an atomic transfer from A to C requires knowing the internal locking protocol, breaking encapsulation.',
          'With STM, combining two transactions is simply nesting them: the runtime ensures the combined operation is atomic without the programmer knowing how each piece is implemented internally.',
          'MVCC (Multi-Version Concurrency Control), used in databases, is related to STM: readers see a consistent snapshot while writers create new versions, enabling high read concurrency.',
          'Optimistic locking in databases (check version number at commit time) follows the same principle as STM: assume no conflicts, detect at commit, retry on conflict.',
          'RCU (Read-Copy-Update), used heavily in the Linux kernel, is a specialized form of transactional read: readers access data lock-free while writers create new versions and reclaim old ones after a grace period.',
        ],
        tradeoffs: [
          'Composability is the killer feature of transactional memory, but the overhead of tracking read/write sets makes it slower than hand-tuned lock-based solutions for specific use cases.',
          'MVCC provides excellent read scalability but increases memory usage (multiple versions) and requires garbage collection of old versions.',
          'RCU is extremely efficient for read-heavy workloads but is complex to implement correctly and only works for specific data structure patterns.',
        ],
        realWorld: [
          'PostgreSQL using MVCC to allow concurrent reads and writes without readers blocking writers or vice versa, achieving high transaction throughput.',
          'The Linux kernel using RCU extensively for networking, file systems, and scheduling, where reads vastly outnumber writes.',
          'Clojure applications using STM refs for coordinated state updates across multiple mutable references in concurrent web servers.',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Distributed Concurrency',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Scale concurrency beyond a single machine: explore the challenges of distributed consensus, consistency models, and coordination in systems where network partitions and partial failures are the norm.',
    concepts: [
      {
        id: 'cap-theorem',
        name: 'CAP Theorem & Consistency Models',
        description:
          'The CAP theorem states that a distributed system can guarantee at most two of three properties simultaneously: Consistency, Availability, and Partition tolerance.',
        keyPoints: [
          'Consistency means every read returns the most recent write (linearizability). Availability means every request receives a response (not an error). Partition tolerance means the system continues operating despite network partitions.',
          'Since network partitions are inevitable in distributed systems, the practical choice is between CP (consistent but sometimes unavailable during partitions) and AP (available but sometimes inconsistent).',
          'Strong consistency (linearizability) makes a distributed system behave like a single machine, simplifying application logic but limiting performance and availability.',
          'Eventual consistency guarantees that if no new writes occur, all replicas will eventually converge to the same value. This is weaker but enables high availability and low latency.',
          'The PACELC extension adds: even when there is no Partition, there is a trade-off between Latency and Consistency. Low-latency reads may return stale data; consistent reads require coordination.',
        ],
        tradeoffs: [
          'CP systems (like ZooKeeper) provide strong guarantees but become unavailable during partitions, which can cascade through dependent services.',
          'AP systems (like Cassandra, DynamoDB) remain available during partitions but may serve stale data, requiring application-level conflict resolution.',
          'Tunable consistency (as in Cassandra) lets developers choose per-query, but adds complexity in understanding the implications of each consistency level.',
        ],
        realWorld: [
          'Amazon DynamoDB choosing AP (availability + partition tolerance) for shopping cart data, using last-writer-wins conflict resolution.',
          'Google Spanner achieving "effective CP" globally using GPS-synchronized TrueTime clocks to order transactions with bounded uncertainty.',
          'Apache ZooKeeper providing CP (consistency + partition tolerance) for distributed coordination like leader election and configuration management.',
        ],
      },
      {
        id: 'consensus-algorithms',
        name: 'Consensus Algorithms',
        description:
          'Consensus algorithms enable a group of distributed nodes to agree on a single value despite node failures and network delays, forming the foundation of fault-tolerant distributed systems.',
        keyPoints: [
          'Paxos, invented by Leslie Lamport, was the first proven-correct consensus algorithm. It guarantees safety (nodes never disagree) even with failures, but only makes progress when a majority of nodes can communicate.',
          'Raft was designed as an understandable alternative to Paxos, decomposing consensus into leader election, log replication, and safety. It is the basis for etcd, CockroachDB, and TiKV.',
          'Both Paxos and Raft require a majority quorum (N/2 + 1 of N nodes) to make progress. With 5 nodes, the system tolerates 2 failures; with 3 nodes, only 1 failure.',
          'Byzantine fault-tolerant (BFT) consensus algorithms like PBFT handle malicious nodes, not just crashed ones, but require 3f+1 nodes to tolerate f Byzantine faults, making them more expensive.',
          'The FLP impossibility result proves that no deterministic consensus algorithm can guarantee termination in an asynchronous system with even one crash failure, which is why practical algorithms use timeouts.',
        ],
        tradeoffs: [
          'Consensus provides strong agreement guarantees but requires network round-trips between nodes, adding latency (typically 2-10 ms for a single consensus round in a data center).',
          'More replicas increase fault tolerance but also increase the number of nodes that must acknowledge each operation, increasing latency.',
          'BFT consensus tolerates malicious actors but requires 3x the nodes and 2-3x the message complexity compared to crash-fault-tolerant algorithms.',
        ],
        realWorld: [
          'etcd using Raft consensus to provide a reliable key-value store for Kubernetes cluster configuration and service discovery.',
          'CockroachDB using Raft to replicate database partitions across data centers, providing serializable distributed transactions.',
          'Blockchain networks like Ethereum using BFT-inspired consensus (Casper) to agree on block ordering in a network with potentially malicious participants.',
        ],
      },
      {
        id: 'distributed-coordination',
        name: 'Distributed Coordination Patterns',
        description:
          'Distributed coordination patterns solve common challenges like leader election, distributed locking, and barrier synchronization across multiple machines.',
        keyPoints: [
          'Leader election ensures exactly one node is the active leader at any time, responsible for coordinating work. If the leader fails, a new one is elected automatically via consensus.',
          'Distributed locks (e.g., Redlock using Redis, ZooKeeper lock recipes) extend mutual exclusion across machines, but must handle the case where the lock holder crashes without releasing the lock (using TTLs or fencing tokens).',
          'Fencing tokens are monotonically increasing sequence numbers issued with each lock acquisition, allowing storage systems to reject stale writes from a previous lock holder whose lock expired.',
          'Distributed barriers synchronize multiple distributed workers: all workers wait at the barrier until everyone arrives, then all proceed. This is essential for coordinating phases in parallel computations.',
          'Saga pattern handles distributed transactions by breaking them into a sequence of local transactions with compensating actions: if any step fails, previously completed steps are undone by executing compensation logic.',
        ],
        tradeoffs: [
          'Leader election simplifies coordination but creates a single point of serialization; the leader can become a bottleneck for write-heavy workloads.',
          'Distributed locks are inherently unreliable due to network delays and clock skew; designs should minimize dependence on distributed locks and use fencing tokens for safety.',
          'Sagas provide eventual consistency for distributed transactions without holding locks, but compensation logic is complex to write correctly and may itself fail.',
        ],
        realWorld: [
          'Apache Kafka using ZooKeeper (or KRaft) for broker leader election and partition assignment across the cluster.',
          'Microservice architectures using the Saga pattern (via frameworks like Temporal or AWS Step Functions) to coordinate multi-service business transactions.',
          'Redis Redlock being used (and debated) for distributed locking in web applications, with Martin Kleppmann\'s critique highlighting the need for fencing tokens.',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find((t) => t.id === id);
}
