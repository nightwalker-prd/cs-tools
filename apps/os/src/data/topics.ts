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
  { id: 1, title: 'Process & Thread Management' },
  { id: 2, title: 'Memory Management' },
  { id: 3, title: 'Storage & I/O' },
  { id: 4, title: 'Advanced Topics' },
];

export const topics: Topic[] = [
  // ============================================================
  // PART 1: Process & Thread Management (Topics 1-4)
  // ============================================================
  {
    id: 1,
    title: 'Processes & Process Lifecycle',
    part: 1,
    partTitle: 'Process & Thread Management',
    summary:
      'A process is the fundamental unit of execution in an operating system — an instance of a running program with its own address space, file descriptors, and execution context. Understanding how processes transition through states and how the OS manages their metadata is foundational to all systems programming.',
    concepts: [
      {
        id: 'process-states',
        name: 'Process States & Transitions',
        description:
          'Every process moves through a well-defined set of states — New, Ready, Running, Waiting (Blocked), and Terminated — as managed by the OS scheduler and triggered by system events.',
        keyPoints: [
          'The five-state model captures a process lifecycle: New (being created), Ready (loaded in memory and waiting for CPU), Running (actively executing on a core), Waiting/Blocked (suspended until an I/O operation or event completes), and Terminated (finished or killed, awaiting cleanup)',
          'Transitions are triggered by specific events: Ready -> Running happens when the scheduler dispatches the process; Running -> Waiting happens on a blocking system call (e.g., read() on a slow device); Waiting -> Ready happens when the I/O completes and an interrupt signals the OS',
          'A Running process moves back to Ready either voluntarily (yield) or involuntarily via preemption when its time quantum expires or a higher-priority process becomes ready',
          'The Terminated state is not instant cleanup — the OS must reclaim the process\'s page table entries, close file descriptors, release IPC resources, and notify the parent process via SIGCHLD before the PCB is fully deallocated',
          'Zombie processes occur when a child terminates but the parent has not yet called wait() — the process entry remains in the process table consuming a PID slot until the parent reads the exit status',
        ],
        tradeoffs: [
          'More granular states (e.g., Linux distinguishes TASK_RUNNING, TASK_INTERRUPTIBLE, TASK_UNINTERRUPTIBLE, TASK_STOPPED, TASK_ZOMBIE) provide finer control but increase scheduler complexity',
          'Preemptive scheduling ensures fairness and responsiveness but adds context-switching overhead and complicates shared-state reasoning compared to cooperative models',
        ],
        realWorld: [
          'Linux /proc/[pid]/status shows process state as R (running), S (sleeping), D (uninterruptible sleep), Z (zombie), T (stopped)',
          'Windows Task Manager displays process states and allows killing stuck processes',
          'Docker containers are essentially processes with namespace isolation — container lifecycle maps directly to process states',
        ],
      },
      {
        id: 'pcb',
        name: 'Process Control Block (PCB)',
        description:
          'The PCB (called task_struct in Linux) is the kernel data structure that stores all metadata about a process — its state, registers, memory mappings, open files, scheduling priority, and signal handlers.',
        keyPoints: [
          'Each process has exactly one PCB, allocated by the kernel at fork() time and deallocated when the parent calls wait() after the process terminates — the PCB is the process\'s identity within the kernel',
          'The PCB stores the saved CPU context (program counter, stack pointer, general-purpose registers, floating-point state, and CPU flags) which is restored during a context switch to resume execution exactly where the process left off',
          'Memory management metadata in the PCB includes the pointer to the page table (CR3 register on x86), virtual memory area (VMA) list describing mapped regions, and the memory descriptor (mm_struct in Linux)',
          'The PCB tracks all open file descriptors via a file descriptor table pointing to kernel file objects, which in turn reference inodes — this is how the OS knows which files a process has open and at what offset',
          'Scheduling information in the PCB includes the process priority (nice value and dynamic priority), CPU affinity mask, accumulated CPU time, and pointers into the scheduler\'s run queue data structure',
        ],
        tradeoffs: [
          'A large PCB (Linux task_struct is ~6KB) allows rich per-process metadata but increases the memory overhead per process and the cost of fork() which must copy or initialize all fields',
          'Keeping the PCB in kernel memory protects it from user-space tampering but means every PCB access requires a system call or kernel-mode transition, adding latency to process inspection tools',
        ],
        realWorld: [
          'Linux task_struct in include/linux/sched.h — one of the largest kernel data structures with hundreds of fields',
          'Windows EPROCESS and KPROCESS structures serve the same role, accessible via WinDbg kernel debugging',
          'The /proc filesystem in Linux exposes PCB fields as readable files — /proc/[pid]/stat, /proc/[pid]/maps, /proc/[pid]/fd/',
        ],
      },
      {
        id: 'context-switching',
        name: 'Context Switching',
        description:
          'A context switch is the mechanism by which the OS saves the state of the currently running process and restores the state of the next process to run — enabling time-sharing of the CPU among multiple processes.',
        keyPoints: [
          'A context switch is triggered by a timer interrupt (preemption), a system call that blocks (e.g., read() on a pipe with no data), or an explicit yield — the interrupt handler saves the current process\'s registers to its PCB and invokes the scheduler',
          'The switch involves saving and restoring the full CPU context: general-purpose registers, program counter, stack pointer, floating-point/SIMD registers (FPU/SSE/AVX state), and the memory management registers (page table base register CR3 on x86)',
          'The TLB (Translation Lookaside Buffer) is typically flushed on a context switch because the new process has a different virtual address space — this TLB flush is a major source of context-switch overhead, as subsequent memory accesses will miss the TLB until it warms up',
          'Modern CPUs mitigate TLB flush costs with ASIDs (Address Space Identifiers) or PCIDs (Process-Context Identifiers on x86) that tag TLB entries per process, allowing entries from multiple processes to coexist in the TLB',
          'Context switch latency on modern Linux is typically 1-10 microseconds, but the indirect cost (TLB misses, cache pollution, pipeline flushes) can be much larger — causing measurable performance degradation in latency-sensitive applications',
        ],
        tradeoffs: [
          'Frequent context switches improve responsiveness and fairness (lower latency for interactive tasks) but increase overhead — each switch wastes CPU cycles on saving/restoring state rather than doing useful work',
          'Larger time quanta reduce switch frequency and overhead but increase response latency for interactive processes — the scheduler must balance throughput against responsiveness',
        ],
        realWorld: [
          'Linux perf sched records and analyzes context switch behavior, showing per-process switch counts and migration patterns',
          'Real-time operating systems (RTOS) like VxWorks minimize context-switch latency to microseconds for deterministic task switching',
          'High-frequency trading systems pin processes to CPU cores and disable preemption to avoid context-switch jitter',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Threads & Concurrency',
    part: 1,
    partTitle: 'Process & Thread Management',
    summary:
      'Threads are lightweight execution units within a process that share the same address space but have independent stacks and register sets. Understanding threading models, their kernel mapping, and modern concurrency patterns is critical for writing efficient concurrent software.',
    concepts: [
      {
        id: 'user-kernel-threads',
        name: 'User-space vs Kernel Threads',
        description:
          'User-space threads are managed entirely by a user-level library without kernel involvement, while kernel threads are scheduled by the OS kernel — each approach has fundamentally different performance characteristics and limitations.',
        keyPoints: [
          'User-space threads (also called green threads or fibers) are created and scheduled by a runtime library (e.g., GNU Pth) — the kernel sees only a single thread, so thread creation and switching are fast (no system calls), typically under 100 nanoseconds',
          'The fatal flaw of pure user-space threads is that a blocking system call (e.g., read(), accept()) blocks the entire process because the kernel schedules at the process level — all user threads in that process stop until the syscall returns',
          'Kernel threads (POSIX pthreads on Linux, Win32 threads on Windows) are created via clone() or CreateThread() and scheduled by the kernel — each thread gets its own entry in the scheduler\'s run queue and can run on a separate CPU core',
          'Kernel thread creation is more expensive (typically 10-50 microseconds, involving a system call, PCB allocation, and stack setup) and context switching between kernel threads costs more than user-space thread switches',
          'Most modern systems use kernel threads as the foundation but layer user-space scheduling on top (hybrid models) — for example, Go\'s goroutine scheduler multiplexes goroutines onto a pool of OS threads',
        ],
        tradeoffs: [
          'User-space threads are extremely fast to create and switch but cannot exploit multiple CPU cores and suffer from blocking syscall issues — suitable only for cooperative concurrency patterns',
          'Kernel threads fully utilize multicore hardware and handle blocking syscalls correctly but incur higher creation and switching overhead — the OS imposes limits on the number of threads per process',
        ],
        realWorld: [
          'Java initially used green threads (JDK 1.1) but switched to native kernel threads in JDK 1.3 for true parallelism',
          'Erlang BEAM VM uses lightweight user-space processes with preemptive scheduling — millions of concurrent processes with microsecond switching',
          'Linux NPTL (Native POSIX Thread Library) provides 1:1 kernel threads with optimized futex-based synchronization',
        ],
      },
      {
        id: 'thread-models',
        name: 'Thread Models (1:1, M:N)',
        description:
          'Threading models define the mapping between user-level threads and kernel-level threads — the 1:1 model maps each user thread to a kernel thread, while M:N multiplexes M user threads onto N kernel threads.',
        keyPoints: [
          'The 1:1 model (one user thread = one kernel thread) is the simplest and most common — used by Linux NPTL, Windows, and macOS. Each thread can be independently scheduled on any CPU core, and blocking syscalls affect only that thread',
          'The M:N model (M user threads multiplexed onto N kernel threads, where M >> N) uses a user-space scheduler to distribute work across a smaller pool of kernel threads — reducing kernel resource consumption while maintaining parallelism',
          'M:N scheduling requires solving the "blocking problem": when a user thread makes a blocking syscall, the runtime must either use non-blocking I/O with an event loop, or dynamically spawn an additional kernel thread to keep the other user threads progressing',
          'The M:1 model (many-to-one) maps all user threads to a single kernel thread — simple but cannot use multiple cores and has the blocking-syscall problem. This is the pure green-thread model',
          'Go\'s goroutine scheduler is the most prominent modern M:N implementation: it runs goroutines on a pool of OS threads (GOMAXPROCS), uses work-stealing to balance load, and automatically handles blocking syscalls by parking the OS thread and scheduling goroutines on another',
        ],
        tradeoffs: [
          '1:1 is simpler to implement and debug (thread IDs map directly to kernel entities visible in strace/gdb) but consumes more kernel resources per thread and limits scalability to tens of thousands of threads',
          'M:N achieves higher concurrency (millions of user threads) with lower resource usage but introduces complex scheduling, debugging difficulties (user threads are invisible to kernel debuggers), and potential priority-inversion issues',
        ],
        realWorld: [
          'Go runtime uses M:N with work-stealing — goroutines are multiplexed onto GOMAXPROCS OS threads',
          'Rust Tokio runtime uses M:N async tasks on a thread pool, with cooperative scheduling and async/await syntax',
          'Solaris historically used M:N (LWPs mapped to kernel threads) but switched to 1:1 in Solaris 9 due to complexity',
        ],
      },
      {
        id: 'thread-pools',
        name: 'Thread Pools & Green Threads',
        description:
          'Thread pools amortize the cost of thread creation by maintaining a set of reusable worker threads, while green threads (coroutines/fibers) provide lightweight concurrency with cooperative or preemptive user-space scheduling.',
        keyPoints: [
          'A thread pool pre-creates a fixed number of worker threads that pull tasks from a shared work queue — this avoids the overhead of creating and destroying threads for each task, typically reducing per-task overhead from microseconds to nanoseconds',
          'Sizing the pool is critical: too few threads under-utilize CPU cores and create bottlenecks on I/O-bound workloads; too many threads cause excessive context switching and memory consumption — a common heuristic is CPU cores for CPU-bound work, or CPU cores * (1 + wait_time/compute_time) for mixed workloads',
          'Work-stealing is an optimization where idle threads steal tasks from the queues of busy threads — this provides automatic load balancing without centralized coordination, used by Java ForkJoinPool and Go\'s goroutine scheduler',
          'Green threads (goroutines, Erlang processes, Java virtual threads) have tiny stacks (as small as 2-8KB, growable) compared to OS thread stacks (typically 1-8MB), enabling millions of concurrent green threads in a single process',
          'Java 21 introduced Virtual Threads (Project Loom) — platform threads are expensive kernel threads, while virtual threads are cheap green threads that automatically unmount from the carrier platform thread during blocking operations, providing the simplicity of synchronous code with the scalability of async I/O',
        ],
        tradeoffs: [
          'Thread pools simplify resource management and prevent thread exhaustion but introduce potential deadlocks if all pool threads block waiting for tasks that are also in the pool\'s queue (thread-pool starvation)',
          'Green threads enable extreme concurrency (millions of lightweight tasks) but require runtime support for preemption and blocking-syscall handling — long CPU-bound computations can starve other green threads in cooperative models',
        ],
        realWorld: [
          'Java ExecutorService and ForkJoinPool provide configurable thread pools with work-stealing',
          'Nginx uses a small fixed thread pool (typically equal to CPU count) with an event loop — handling tens of thousands of concurrent connections',
          'Go spawns goroutines trivially (go func()) — a single Go process can handle millions of concurrent goroutines with 2-8KB stacks each',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'CPU Scheduling',
    part: 1,
    partTitle: 'Process & Thread Management',
    summary:
      'The CPU scheduler is the kernel component that decides which ready process or thread runs next on the CPU. Scheduling algorithms balance competing goals: maximizing throughput, minimizing latency, ensuring fairness, and meeting real-time deadlines.',
    concepts: [
      {
        id: 'fcfs-sjf',
        name: 'FCFS & SJF Scheduling',
        description:
          'First-Come, First-Served (FCFS) and Shortest Job First (SJF) are foundational scheduling algorithms — FCFS is simple but suffers from the convoy effect, while SJF minimizes average waiting time but requires knowing burst lengths in advance.',
        keyPoints: [
          'FCFS (First-Come, First-Served) is the simplest scheduling algorithm — processes run to completion in arrival order using a FIFO queue. It is non-preemptive, meaning once a process gets the CPU, it holds it until it finishes or blocks',
          'The convoy effect in FCFS occurs when a long CPU-burst process arrives before several short ones — all short processes must wait behind the long one, dramatically inflating average waiting time and reducing CPU utilization for I/O-bound processes',
          'SJF (Shortest Job First) selects the process with the smallest expected CPU burst — this provably minimizes average waiting time for a given set of processes, making it theoretically optimal among non-preemptive algorithms',
          'SJF requires predicting the next CPU burst length, which is impossible to know exactly — the OS estimates it using exponential averaging: predicted_next = alpha * actual_last + (1 - alpha) * predicted_last, where alpha is typically 0.5',
          'Preemptive SJF (also called Shortest Remaining Time First / SRTF) preempts the running process if a newly arrived process has a shorter remaining burst — this further reduces average waiting time but increases context-switch frequency',
        ],
        tradeoffs: [
          'FCFS is trivial to implement (just a queue) and has zero scheduling overhead but causes poor average wait times when burst lengths vary — unsuitable as a primary scheduler for interactive systems',
          'SJF/SRTF minimizes average waiting time but can cause starvation of long processes that are perpetually bypassed by shorter ones — and burst prediction errors degrade it to near-FCFS behavior',
        ],
        realWorld: [
          'Batch processing systems like IBM mainframe JCL job queues historically used FCFS with priority classes',
          'SJF principles appear in web server request scheduling — nginx can prioritize small static file responses over large dynamic requests',
          'Supercomputer job schedulers (SLURM, PBS) use SJF variants with backfilling to minimize average queue wait time',
        ],
      },
      {
        id: 'round-robin-mlfq',
        name: 'Round Robin & MLFQ',
        description:
          'Round Robin adds preemption to FCFS via fixed time quanta, while Multi-Level Feedback Queue (MLFQ) adapts priorities dynamically based on observed process behavior — MLFQ is the basis of most real-world general-purpose schedulers.',
        keyPoints: [
          'Round Robin (RR) assigns each process a fixed time quantum (typically 10-100ms) — when the quantum expires, a timer interrupt preempts the running process, moves it to the back of the ready queue, and dispatches the next process, ensuring all processes get regular CPU access',
          'Time quantum selection is critical: too small (< 1ms) causes excessive context switching overhead where the CPU spends more time switching than executing; too large (> 100ms) degrades to FCFS behavior with poor interactive responsiveness',
          'MLFQ uses multiple ready queues with different priority levels — new processes start at the highest priority, and processes that use their full quantum are demoted to a lower-priority queue, while processes that voluntarily release the CPU (I/O-bound) stay at high priority',
          'MLFQ adaptively separates interactive processes (short bursts, frequent I/O) from CPU-bound processes (long bursts) without requiring advance knowledge of process behavior — interactive processes naturally stay in high-priority queues',
          'To prevent starvation of CPU-bound processes in MLFQ, a periodic priority boost moves all processes to the highest-priority queue at regular intervals (e.g., every second) — this also handles processes whose behavior changes over time from CPU-bound to interactive',
        ],
        tradeoffs: [
          'Round Robin provides excellent fairness and bounded response time but gives equal treatment to all processes regardless of their importance or I/O patterns — leading to suboptimal throughput for mixed workloads',
          'MLFQ adapts to process behavior and provides good interactive responsiveness but has many tunable parameters (number of queues, quantum per level, boost interval) and can be gamed by processes that deliberately yield just before their quantum expires',
        ],
        realWorld: [
          'Windows Task Scheduler uses a variant of MLFQ with 32 priority levels and dynamic priority boosting for foreground and I/O-completing processes',
          'FreeBSD ULE scheduler uses a multi-level queue design with interactivity scoring to prioritize responsive processes',
          'Solaris TS (Time Sharing) scheduling class implements MLFQ with a configurable dispatch table defining quanta and priorities per level',
        ],
      },
      {
        id: 'linux-cfs',
        name: 'Linux CFS (Completely Fair Scheduler)',
        description:
          'The Completely Fair Scheduler replaced the O(1) scheduler in Linux 2.6.23. It uses a red-black tree keyed by virtual runtime to approximate ideal fair CPU sharing — giving each task a proportional share of CPU time based on its weight (nice value).',
        keyPoints: [
          'CFS maintains a red-black tree of runnable tasks, ordered by their vruntime (virtual runtime) — the task with the smallest vruntime (the one that has received the least proportional CPU time) is always the leftmost node and is selected next, achieving O(log N) scheduling decisions',
          'Virtual runtime advances at a rate inversely proportional to the task\'s weight — a task with twice the weight (lower nice value) accumulates vruntime at half the rate, so it gets twice the CPU time before being preempted, naturally implementing weighted fair sharing',
          'CFS has no fixed time quanta — instead, it calculates a target latency (the period in which every runnable task should get at least one turn) and divides it proportionally by weight. With few tasks, each gets a long slice; with many tasks, slices shrink to a minimum granularity (typically 0.75ms)',
          'The sched_latency parameter (default 6ms for <= 8 tasks) sets the target scheduling period, and sched_min_granularity (default 0.75ms) prevents time slices from becoming impractically small — when there are more tasks, the period scales up as N * min_granularity',
          'CFS treats sleeping tasks fairly by capping their vruntime when they wake up to min_vruntime - sched_latency/2 — this prevents tasks that slept for a long time from monopolizing the CPU when they wake, while still giving them a slight boost for responsiveness',
        ],
        tradeoffs: [
          'CFS provides excellent fairness and scales well with many processes (O(log N) vs O(1) but with smaller constants) — however, it does not provide strict real-time guarantees and its fairness model can cause latency spikes for interactive tasks under heavy CPU load',
          'The red-black tree approach is elegant but adds per-scheduling overhead compared to a simple array-based O(1) scheduler — though in practice, the tree rarely exceeds a few levels deep since only runnable tasks are tracked',
        ],
        realWorld: [
          'Linux kernel since 2.6.23 uses CFS as the default scheduler for the SCHED_NORMAL (SCHED_OTHER) scheduling class',
          'EEVDF (Earliest Eligible Virtual Deadline First) replaced CFS in Linux 6.6, extending the virtual-time concept with per-task deadlines for better latency control',
          'cgroups v2 CPU controller uses CFS weights (cpu.weight) to allocate CPU proportionally among containerized workloads in Docker/Kubernetes',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Inter-Process Communication',
    part: 1,
    partTitle: 'Process & Thread Management',
    summary:
      'Processes need to exchange data and coordinate with each other despite having isolated address spaces. IPC mechanisms range from simple pipes and signals to shared memory and sockets, each with different semantics, performance characteristics, and use cases.',
    concepts: [
      {
        id: 'pipes',
        name: 'Pipes & Named Pipes',
        description:
          'Pipes are unidirectional byte-stream channels for communication between related processes, while named pipes (FIFOs) extend this to unrelated processes by creating a filesystem entry.',
        keyPoints: [
          'An anonymous pipe is created by the pipe() system call, which returns two file descriptors — fd[0] for reading and fd[1] for writing. After fork(), the parent and child each close one end, establishing a one-way communication channel through the kernel buffer',
          'Pipe capacity is limited by a kernel buffer (typically 64KB on Linux, configurable via F_SETPIPE_SZ up to /proc/sys/fs/pipe-max-size) — a write() to a full pipe blocks the writer until the reader drains data, providing natural flow control (backpressure)',
          'Named pipes (FIFOs) are created with mkfifo() and appear in the filesystem — any process can open them by name, enabling IPC between unrelated processes. They have the same semantics as anonymous pipes but persist until explicitly deleted',
          'Pipes transmit raw bytes with no message boundaries — the reader must implement its own framing protocol (e.g., length-prefixed messages or newline-delimited records) to determine where one message ends and another begins',
          'The shell pipe operator (cmd1 | cmd2) creates an anonymous pipe connecting cmd1\'s stdout to cmd2\'s stdin — this is the foundation of Unix composability, enabling complex data processing by chaining simple programs',
        ],
        tradeoffs: [
          'Pipes are simple and provide automatic flow control via blocking semantics, but are limited to unidirectional byte streams between processes on the same machine — bidirectional communication requires two pipes or a different mechanism',
          'Named pipes allow unrelated processes to communicate but create filesystem clutter and lack access control beyond filesystem permissions — they also block on open() until both a reader and writer are connected',
        ],
        realWorld: [
          'Unix shell pipelines (grep pattern file | sort | uniq -c | sort -rn) — the core Unix philosophy of composable tools',
          'systemd service notification uses named pipes for sd_notify() protocol messages between services and the init system',
          'Docker uses pipes for container log streaming — container stdout/stderr is piped to the logging driver',
        ],
      },
      {
        id: 'message-queues-shm',
        name: 'Message Queues & Shared Memory',
        description:
          'Message queues provide structured message-based IPC with kernel-managed queuing, while shared memory maps the same physical memory region into multiple process address spaces for zero-copy data exchange.',
        keyPoints: [
          'POSIX message queues (mq_open, mq_send, mq_receive) provide priority-ordered message delivery — each message has a priority, and higher-priority messages are dequeued first. Messages have defined boundaries (unlike pipes), so receivers get complete messages',
          'System V message queues (msgget, msgsnd, msgrcv) support message types — a receiver can selectively receive only messages of a specific type, enabling multiplexing of different message categories through a single queue',
          'Shared memory (shm_open + mmap or shmget + shmat) is the fastest IPC mechanism — processes read and write directly to a common memory region without any kernel involvement per operation, achieving bandwidth limited only by memory bus speed',
          'Shared memory requires explicit synchronization (mutexes, semaphores, or atomic operations) because the kernel provides no ordering guarantees — without synchronization, concurrent reads and writes produce data races and undefined behavior',
          'Memory-mapped files (mmap with MAP_SHARED) combine shared memory with filesystem persistence — changes are visible to all processes mapping the file and are eventually written back to disk, useful for databases and memory-mapped I/O',
        ],
        tradeoffs: [
          'Message queues provide clean message boundaries and built-in ordering but involve kernel copies (message data is copied from sender to kernel buffer to receiver) — limiting throughput for large messages compared to shared memory',
          'Shared memory achieves zero-copy performance but shifts all synchronization burden to the application — bugs lead to subtle race conditions, corruption, and security vulnerabilities. Resource cleanup is manual (segments persist until explicitly removed)',
        ],
        realWorld: [
          'PostgreSQL uses shared memory (System V or POSIX) for the shared buffer pool where all backend processes access cached database pages',
          'Redis pub/sub internally uses message-passing semantics, while Redis itself uses mmap for RDB persistence',
          'Chrome uses shared memory for the compositor — the renderer process writes to a shared memory buffer that the GPU process reads to composite the final frame',
        ],
      },
      {
        id: 'signals-sockets',
        name: 'Signals & Sockets',
        description:
          'Signals are asynchronous notifications delivered to processes for event handling and control, while sockets provide bidirectional byte-stream or datagram communication between processes locally or across a network.',
        keyPoints: [
          'Signals are software interrupts delivered to a process — the kernel interrupts the process\'s normal execution to invoke a registered signal handler function. Standard signals include SIGTERM (graceful shutdown), SIGKILL (forced kill, uncatchable), SIGCHLD (child exited), and SIGSEGV (segmentation fault)',
          'Signal handlers must be async-signal-safe — only a restricted set of functions (write, _exit, signal) can be safely called from a handler because the signal may arrive while the process is in the middle of a non-reentrant function like malloc(). The common pattern is to set a volatile sig_atomic_t flag and handle it in the main loop',
          'Unix domain sockets (AF_UNIX) provide bidirectional, reliable communication between processes on the same machine — they support both stream (SOCK_STREAM) and datagram (SOCK_DGRAM) modes and are faster than TCP/IP loopback because they bypass the network stack entirely',
          'Unix domain sockets support ancillary data — file descriptor passing (SCM_RIGHTS) allows one process to send an open file descriptor to another process, enabling sophisticated process management patterns like socket activation in systemd',
          'The socketpair() system call creates a pair of connected Unix domain sockets — similar to pipe() but bidirectional, making it useful for parent-child communication where both sides need to send and receive data',
        ],
        tradeoffs: [
          'Signals are the lightest IPC mechanism (just a bit flip in the target process PCB) but carry almost no data (only the signal number) and have complex safety requirements — unsuitable for data transfer, best used for event notification and process control',
          'Sockets are the most versatile IPC mechanism (local or network, stream or datagram, with ancillary data support) but have higher setup overhead than pipes or shared memory and require serialization for structured data exchange',
        ],
        realWorld: [
          'Nginx uses signals for operational control — SIGHUP reloads configuration, SIGUSR1 reopens log files, SIGQUIT triggers graceful shutdown',
          'systemd socket activation uses Unix domain sockets to pass pre-opened listening sockets to services, enabling zero-downtime restarts',
          'Docker daemon communicates with the CLI via a Unix domain socket at /var/run/docker.sock',
        ],
      },
    ],
  },

  // ============================================================
  // PART 2: Memory Management (Topics 5-7)
  // ============================================================
  {
    id: 5,
    title: 'Virtual Memory & Paging',
    part: 2,
    partTitle: 'Memory Management',
    summary:
      'Virtual memory gives each process the illusion of a large, contiguous, private address space by mapping virtual addresses to physical memory frames through page tables. This abstraction enables memory isolation, overcommitment, and demand paging — foundational to modern OS design.',
    concepts: [
      {
        id: 'page-tables',
        name: 'Page Tables & Address Translation',
        description:
          'A page table is a per-process data structure that maps virtual page numbers to physical frame numbers — the MMU hardware walks this table on every memory access to translate virtual addresses to physical addresses.',
        keyPoints: [
          'Virtual addresses are split into a virtual page number (VPN) and a page offset — the VPN indexes into the page table to find the physical frame number (PFN), which is concatenated with the offset to form the physical address. Typical page size is 4KB (12-bit offset)',
          'Each page table entry (PTE) contains the physical frame number plus control bits: present/valid (is the page in physical memory?), read/write permissions, user/supervisor access, dirty (has the page been written?), accessed (has it been read or written recently?), and no-execute (NX/XD bit)',
          'A page fault occurs when the present bit is 0 — the MMU generates an exception, and the OS page fault handler determines whether to load the page from disk (valid fault), allocate a new zeroed frame (anonymous page), or deliver a segmentation fault to the process (invalid access)',
          'Demand paging means pages are loaded into physical memory only when first accessed — the OS creates PTEs with present=0 for newly mapped regions, and the first access triggers a page fault that loads the content. This avoids loading unused pages and speeds up process startup',
          'Copy-on-write (COW) optimization used by fork(): parent and child initially share the same physical frames with both PTEs marked read-only — when either process writes, the resulting page fault triggers the OS to copy the page, give each process its own copy, and mark both as writable',
        ],
        tradeoffs: [
          'Smaller pages (4KB) minimize internal fragmentation and provide fine-grained protection but require more page table entries and cause more TLB misses — a 48-bit virtual address space needs 2^36 PTEs (256GB of page tables) without multi-level tables',
          'Larger pages (2MB huge pages, 1GB gigantic pages) reduce TLB pressure and page table size but increase internal fragmentation and can waste memory when small allocations are rounded up to the huge-page boundary',
        ],
        realWorld: [
          'x86-64 uses 4KB base pages with optional 2MB and 1GB huge pages, configured via PTE flags in the page table hierarchy',
          'Linux Transparent Huge Pages (THP) automatically promotes and demotes 2MB pages without application changes',
          'AWS EC2 instances use huge pages extensively for database workloads — Oracle recommends huge pages for the SGA (System Global Area)',
        ],
      },
      {
        id: 'tlb',
        name: 'TLB (Translation Lookaside Buffer)',
        description:
          'The TLB is a small, fast hardware cache inside the CPU that stores recent virtual-to-physical address translations — without it, every memory access would require multiple page table lookups, making virtual memory impractically slow.',
        keyPoints: [
          'The TLB is organized as a content-addressable memory (CAM) that searches all entries in parallel — given a virtual page number, the TLB returns the physical frame number in a single cycle (or a few cycles for set-associative designs), compared to 3-5 memory accesses for a full page table walk',
          'TLB hit rates are typically 98-99% in normal workloads due to spatial and temporal locality — most memory accesses are to recently accessed pages, and a TLB with just 64-1024 entries covers the working set of most programs effectively',
          'A TLB miss triggers a hardware page table walk (on x86) where the MMU walks the multi-level page table structure in memory — this walk takes roughly 10-100 CPU cycles depending on whether intermediate page table pages are in the L1/L2 cache',
          'TLB entries must be invalidated when page table mappings change — process context switches traditionally require a full TLB flush, but modern x86 CPUs support PCID (Process-Context Identifiers) that tag entries with a process ID, allowing multiple process mappings to coexist',
          'The TLB is split into instruction TLB (iTLB) and data TLB (dTLB) on most architectures, each optimized for its access pattern — the dTLB typically has more entries because data access patterns are less predictable than instruction fetch patterns',
        ],
        tradeoffs: [
          'Larger TLBs reduce miss rates but are expensive in silicon area and power — doubling TLB size gives diminishing returns since most misses come from cold (first access) or capacity (working set exceeds TLB coverage) events',
          'PCID avoids full TLB flushes on context switches but limits the number of concurrent address spaces in the TLB (typically 4096 PCIDs on x86) and adds complexity to TLB invalidation when page tables are modified',
        ],
        realWorld: [
          'Intel Skylake has a 64-entry L1 dTLB (4KB pages) + 32-entry L1 dTLB (2MB/1GB pages) + 1536-entry L2 STLB shared between data and instructions',
          'The Meltdown vulnerability (CVE-2017-5754) exploited speculative execution with TLB behavior — KPTI mitigation separates kernel and user page tables, increasing TLB pressure',
          'Database systems like PostgreSQL use huge pages specifically to reduce TLB misses when scanning large shared buffer pools',
        ],
      },
      {
        id: 'multilevel-page-tables',
        name: 'Multi-level & Inverted Page Tables',
        description:
          'Multi-level page tables solve the space problem of flat page tables by organizing them hierarchically, while inverted page tables use a single global table indexed by physical frame to handle very large virtual address spaces.',
        keyPoints: [
          'A flat page table for a 48-bit address space with 4KB pages would require 2^36 entries (512GB) per process — clearly impractical. Multi-level page tables only allocate lower-level tables for actually used virtual address regions, making sparse address spaces space-efficient',
          'x86-64 uses a 4-level page table (PML4 -> PDPT -> PD -> PT): the 48-bit virtual address is split into four 9-bit indices plus a 12-bit offset — each level is a 4KB page containing 512 8-byte entries. Only tables for mapped regions need to exist in memory',
          'Linux 5.17+ supports 5-level paging (LA57) extending the virtual address space to 57 bits (128PB) by adding a PML5 level — currently only enabled for machines with large memory that need to map more than 256TB of physical memory',
          'An inverted page table has one entry per physical frame (not per virtual page) — lookups use a hash of the virtual page number to find the corresponding physical frame. This scales with physical memory size rather than virtual address space size',
          'Hardware page table walkers (on x86, ARM) traverse multi-level tables automatically — the OS only needs to set up the tables and load the root pointer (CR3 on x86). On architectures with software-managed TLBs (MIPS, some RISC-V), the OS TLB miss handler does the walk in software',
        ],
        tradeoffs: [
          'Multi-level tables save memory for sparse address spaces (common case) but add multiple memory accesses per TLB miss — a 4-level walk requires 4 sequential memory reads, each potentially a cache miss, adding significant latency',
          'Inverted page tables save space when physical memory is much smaller than virtual address space but make operations like sharing pages between processes and reverse mapping (finding all PTEs pointing to a frame) more complex and require hash-collision handling',
        ],
        realWorld: [
          'x86-64 4-level paging with CR3 register pointing to PML4 — the standard for all modern x86 operating systems',
          'IBM POWER architecture uses a hash-based inverted page table (HPT) with 256MB segments, though newer POWER9+ also supports radix (hierarchical) page tables',
          'ARM uses up to 4-level page tables with configurable page sizes (4KB, 16KB, 64KB) and concatenated first-level tables for different virtual address space sizes',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Page Replacement & Thrashing',
    part: 2,
    partTitle: 'Memory Management',
    summary:
      'When physical memory is full and a page fault occurs, the OS must choose which existing page to evict — page replacement algorithms attempt to evict the page least likely to be needed soon. Poor choices or insufficient memory lead to thrashing, where the system spends more time paging than executing.',
    concepts: [
      {
        id: 'lru-clock',
        name: 'LRU & Clock Algorithms',
        description:
          'LRU (Least Recently Used) evicts the page that has not been accessed for the longest time, based on the principle of temporal locality. The Clock algorithm approximates LRU efficiently using a circular buffer and reference bits.',
        keyPoints: [
          'True LRU requires maintaining a timestamp or ordered list of all pages by last access time — the least recently used page is evicted first. This is optimal among stack algorithms but expensive: maintaining exact ordering on every memory access would require hardware support or frequent interrupts',
          'The accessed/referenced bit in each PTE is set by hardware on every access — the OS periodically clears these bits and uses them to approximate recency. A page with its referenced bit clear has not been accessed since the last clearing, so it is a good eviction candidate',
          'The Clock (Second Chance) algorithm arranges pages in a circular buffer with a "clock hand" pointer — when a page must be evicted, the hand sweeps forward: if a page\'s referenced bit is set, clear it and advance (giving it a second chance); if the bit is already clear, evict that page',
          'The enhanced Clock algorithm considers both the referenced (R) and dirty/modified (M) bits, preferring to evict pages in order: (R=0,M=0) > (R=0,M=1) > (R=1,M=0) > (R=1,M=1) — this avoids the I/O cost of writing back dirty pages when clean pages are available',
          'Clock is O(1) amortized per eviction (each page is visited at most twice per sweep) and requires only a single bit per page plus a single pointer — making it practical for real OS implementations handling millions of pages',
        ],
        tradeoffs: [
          'True LRU is excellent for most workloads (temporal locality is common) but fails for sequential scans that touch each page exactly once — in this pattern, LRU evicts the most recently cached page which is about to be reused, while MRU (Most Recently Used) would be better',
          'Clock approximates LRU cheaply but with lower accuracy — it cannot distinguish between a page accessed once and a page accessed thousands of times since the last bit clearing, potentially evicting frequently-used "hot" pages',
        ],
        realWorld: [
          'Linux uses a two-list LRU approximation (active and inactive lists) with the PG_active and PG_referenced flags — pages must be referenced on the inactive list to be promoted to the active list',
          'PostgreSQL buffer manager uses a clock-sweep algorithm for shared buffer eviction — the BufFreelistLock protects the clock hand',
          'memcached uses strict LRU per slab class — each slab maintains a doubly-linked list of items ordered by last access time',
        ],
      },
      {
        id: 'lfu-working-set',
        name: 'LFU & Working Set Model',
        description:
          'LFU (Least Frequently Used) evicts pages based on access frequency rather than recency, while the Working Set model tracks the set of pages a process actively uses within a time window to determine how much memory it needs.',
        keyPoints: [
          'LFU maintains an access counter per page and evicts the page with the lowest count — it excels at keeping truly "hot" pages (frequently accessed data structures, code loops) in memory even during occasional scans of cold data',
          'Pure LFU suffers from cache pollution: pages that were heavily accessed in the past but are no longer needed accumulate high counts and are never evicted — solutions include periodic count halving (aging), windowed frequency tracking, or hybrid LFU/LRU schemes',
          'The Working Set W(t, delta) is the set of distinct pages referenced by a process in the time interval [t - delta, t] — it captures the process\'s current memory demand. If the OS allocates at least |W(t, delta)| frames to each process, page fault rates remain low',
          'The working set size changes over time as programs move between phases — during initialization, the working set grows rapidly; during steady-state computation, it stabilizes; during a phase transition (e.g., switching from parsing to code generation in a compiler), it shifts to a new set of pages',
          'The Page Fault Frequency (PFF) algorithm provides a practical alternative to working set tracking: if a process\'s page fault rate exceeds an upper threshold, allocate more frames to it; if below a lower threshold, reclaim frames — this directly controls the metric we care about (fault rate) without tracking page references',
        ],
        tradeoffs: [
          'LFU is more resistant to scan pollution than LRU but responds slowly to workload phase changes — a page that was hot in the previous phase retains a high count and blocks eviction even though it is no longer needed',
          'Working set tracking provides a principled basis for memory allocation but requires continuous monitoring of page references, which is expensive — in practice, OSes approximate it using reference bits and periodic aging rather than exact tracking',
        ],
        realWorld: [
          'Redis LFU eviction mode (allkeys-lfu) uses a logarithmic frequency counter with time-based decay to handle workload changes',
          'ARC (Adaptive Replacement Cache) used in ZFS combines LRU and LFU concepts — it maintains ghost entries to learn whether the workload favors recency or frequency',
          'Windows Memory Manager uses a working-set model — each process has a working-set minimum and maximum, and the balance set manager trims processes that exceed their allocation when memory is low',
        ],
      },
      {
        id: 'thrashing',
        name: 'Thrashing Detection & Prevention',
        description:
          'Thrashing occurs when processes collectively demand more physical memory than available — the system spends most of its time handling page faults (swapping pages in and out) rather than executing useful instructions, causing catastrophic performance degradation.',
        keyPoints: [
          'Thrashing is detectable by monitoring page fault rate and CPU utilization simultaneously — when CPU utilization drops while page fault rate spikes, the system is thrashing. The paradox is that the scheduler may respond by increasing the degree of multiprogramming (adding more processes) to raise CPU utilization, which worsens thrashing',
          'The root cause is that the sum of all processes\' working sets exceeds available physical memory — each process continuously evicts pages that other processes (or itself) will soon need, creating a cascade of page faults that keeps the disk I/O subsystem saturated',
          'Local page replacement policies (each process can only evict its own pages) contain thrashing to the affected process rather than letting it degrade the entire system — but they require per-process frame allocation decisions that may be suboptimal',
          'The OOM (Out Of Memory) Killer in Linux is the last resort when the system is critically low on memory — it scores processes by memory usage, age, and priority, then kills the highest-scoring process to reclaim its frames. The oom_score_adj parameter allows administrators to protect critical processes',
          'Memory overcommit and demand paging can mask the onset of thrashing — Linux vm.overcommit_memory=0 (default) uses heuristics to allow moderate overcommit, while =2 enforces strict accounting where commit cannot exceed swap + (physical * overcommit_ratio)',
        ],
        tradeoffs: [
          'Aggressive swapping (allowing more overcommit) lets more processes run concurrently but risks thrashing when memory demand spikes — conservative allocation (strict limits) prevents thrashing but wastes memory that might never be actually used',
          'The OOM Killer prevents total system freeze but its process selection heuristic may kill the wrong process — production systems often disable the OOM Killer in favor of explicit memory limits per cgroup/container',
        ],
        realWorld: [
          'Linux vm.swappiness controls the kernel\'s preference for swapping anonymous pages vs reclaiming file cache — values of 0-10 are common for database servers to avoid swapping',
          'Kubernetes memory limits trigger the OOM Killer at the container level — pods exceeding their memory limit are OOM-killed and restarted, isolating the impact',
          'Facebook (Meta) developed OOMD, a userspace OOM daemon that makes more intelligent kill decisions than the kernel OOM Killer based on PSI (Pressure Stall Information) metrics',
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Memory Allocation',
    part: 2,
    partTitle: 'Memory Management',
    summary:
      'User-space memory allocators (malloc/free) and kernel-space allocators manage the allocation and deallocation of variable-sized memory blocks. The challenge is to serve allocation requests quickly, minimize fragmentation, and work efficiently across multiple threads.',
    concepts: [
      {
        id: 'malloc-free',
        name: 'malloc/free Internals',
        description:
          'The C library malloc() and free() functions manage a process\'s heap — they request large memory regions from the kernel (via brk/sbrk or mmap) and subdivide them into smaller blocks to satisfy application allocation requests.',
        keyPoints: [
          'malloc() maintains a free list of available memory blocks and searches it to find a block large enough for the request — common strategies are first-fit (return the first block that fits), best-fit (return the smallest block that fits, minimizing leftover waste), and next-fit (start searching from where the last search ended)',
          'Each allocated block typically has a header containing the block size and allocation status — free() uses this header to determine the block size and returns it to the free list. Metadata overhead is usually 8-16 bytes per allocation',
          'When no existing free block is large enough, malloc() requests more memory from the kernel — brk()/sbrk() expands the heap contiguously (fast but limited), while mmap(MAP_ANONYMOUS) allocates a new virtual memory region anywhere in the address space (slower but more flexible). Large allocations (typically > 128KB) use mmap directly',
          'Coalescing merges adjacent free blocks to combat external fragmentation — when free() returns a block, it checks if the neighboring blocks are also free and merges them into a single larger block. Without coalescing, the free list degrades into many small unusable fragments',
          'Modern allocators like glibc ptmalloc2 use per-thread arenas — each thread has its own set of free lists (bins), reducing lock contention on multithreaded allocation. Bins are organized by size: fastbins for small allocations (< 80 bytes) that skip coalescing for speed, and unsorted/small/large bins for larger allocations',
        ],
        tradeoffs: [
          'First-fit is fast (O(1) with segregated lists) but can leave fragmented gaps; best-fit reduces waste but requires scanning more of the free list — most practical allocators use segregated free lists (bins organized by size class) to get fast allocation with acceptable fragmentation',
          'Per-thread arenas eliminate lock contention but can waste memory when threads have asymmetric allocation patterns — thread A allocates memory, passes it to thread B which frees it, but the freed memory sits in thread B\'s arena while thread A keeps requesting more from the kernel',
        ],
        realWorld: [
          'glibc ptmalloc2 is the default allocator on most Linux distributions — derived from dlmalloc with per-thread arena support',
          'jemalloc (used by Facebook/Meta, Rust, FreeBSD) uses size-class-based allocation with thread caches and extent-based management for reduced fragmentation',
          'Google tcmalloc (Thread-Caching Malloc) uses per-thread caches for small objects and a central page heap for large objects — designed for high-concurrency server workloads',
        ],
      },
      {
        id: 'buddy-system',
        name: 'Buddy System Allocator',
        description:
          'The buddy system allocator manages physical memory by splitting and merging blocks that are always powers of two in size — enabling fast allocation and efficient coalescing at the cost of internal fragmentation.',
        keyPoints: [
          'The buddy system maintains free lists for each power-of-two size (e.g., 4KB, 8KB, 16KB, ..., 4MB) — to allocate a block of size S, round up S to the next power of two and search the corresponding free list. If empty, split a block from the next larger size, putting the unused half (the "buddy") on the smaller free list',
          'Coalescing in the buddy system is elegant: when a block is freed, check if its buddy (the other half of the pair that was split) is also free — if so, merge them into a single block of the next larger size and repeat recursively. The buddy\'s address is found by flipping a single bit in the block\'s address',
          'The buddy system suffers from internal fragmentation because allocations are rounded up to powers of two — a request for 65KB gets a 128KB block, wasting nearly 50%. This makes it unsuitable for variable-size user-space allocations but acceptable for page-frame allocation where the unit is already a fixed power-of-two (4KB)',
          'The Linux kernel uses the buddy system as its primary physical page frame allocator — it manages zones (DMA, Normal, HighMem) with separate buddy systems, each maintaining free lists for orders 0-10 (4KB to 4MB blocks)',
          'Allocation and deallocation are both O(log N) where N is the maximum block size divided by the minimum — in practice, the number of splitting/coalescing steps is bounded by the small number of orders (typically 11), making it very fast',
        ],
        tradeoffs: [
          'The buddy system enables fast, deterministic allocation and O(1) coalescing with its buddy-address-by-bit-flip trick — but wastes up to 50% of memory on internal fragmentation for non-power-of-two requests',
          'Splitting and coalescing can cascade through multiple levels, causing brief latency spikes — and external fragmentation can still occur at higher orders (e.g., no contiguous 2MB regions even though enough 4KB pages are free) which is problematic for huge-page allocation',
        ],
        realWorld: [
          'Linux /proc/buddyinfo shows the number of free blocks at each order for each memory zone — useful for diagnosing fragmentation and huge-page allocation failures',
          'Linux memory compaction (kcompactd) defragments memory by migrating pages to create contiguous free blocks at higher orders for transparent huge page allocation',
          'FreeBSD UMA (Universal Memory Allocator) uses a buddy-like allocator for the zone-based kernel memory allocation',
        ],
      },
      {
        id: 'slab-allocator',
        name: 'Slab Allocator & Fragmentation',
        description:
          'The slab allocator sits on top of the buddy system and caches pre-initialized objects of a specific type — eliminating the cost of repeated initialization/destruction and minimizing fragmentation for frequently allocated kernel objects.',
        keyPoints: [
          'The slab allocator creates caches for specific object types (e.g., task_struct, inode, dentry) — each cache contains slabs (one or more contiguous pages from the buddy allocator) pre-divided into object-sized slots. Allocating an object is O(1): grab a free slot from a partially-filled slab',
          'Objects in a slab cache are pre-constructed — when a task_struct is "freed," the destructor runs but the memory stays in the slab with the object in a known-clean state. The next allocation can skip the constructor entirely, saving the cost of initializing hundreds of fields',
          'Slab coloring staggers the starting offset of objects within different slabs to reduce hardware cache conflicts — if all task_structs started at the same cache-line offset, they would contend for the same cache set. Coloring spreads them across different cache lines',
          'Linux has three slab allocator implementations: the original SLAB (Bonwick, 1994), SLUB (the current default, simpler and more scalable with per-CPU partial slabs), and SLOB (a minimal allocator for embedded systems with severe memory constraints)',
          'External fragmentation occurs when free memory is scattered in non-contiguous chunks too small to satisfy large allocations — internal fragmentation occurs when allocated blocks are larger than needed (rounding to size classes). The slab allocator minimizes both by matching object sizes exactly and managing full/partial/empty slabs',
        ],
        tradeoffs: [
          'Slab allocation is extremely fast (O(1) with pre-initialized objects) and eliminates internal fragmentation for known object sizes — but each cache reserves memory that cannot be used for other object types, potentially wasting memory when some caches are oversized',
          'Per-CPU partial slab lists in SLUB reduce lock contention but can lead to memory being stranded on CPUs that no longer need it — the SLUB allocator periodically flushes per-CPU slabs to mitigate this',
        ],
        realWorld: [
          'Linux /proc/slabinfo shows all slab caches with object sizes, active/total objects, and pages used — useful for monitoring kernel memory usage',
          'Linux slabtop command provides a real-time view of slab cache utilization sorted by memory consumption',
          'The kernel slab cache for dentry objects (directory entries) is typically the largest slab cache — it caches filesystem path components to speed up path resolution',
        ],
      },
    ],
  },

  // ============================================================
  // PART 3: Storage & I/O (Topics 8-10)
  // ============================================================
  {
    id: 8,
    title: 'File Systems',
    part: 3,
    partTitle: 'Storage & I/O',
    summary:
      'File systems organize persistent data on storage devices by mapping human-readable names to sequences of disk blocks. They manage metadata (inodes, directories), ensure consistency (journaling, copy-on-write), and provide the abstraction layer between applications and raw storage.',
    concepts: [
      {
        id: 'inodes-directories',
        name: 'Inodes & Directory Structure',
        description:
          'An inode (index node) stores all metadata about a file except its name, while directories are special files that map names to inode numbers — together they form the hierarchical namespace of a Unix filesystem.',
        keyPoints: [
          'Each file has exactly one inode containing: file type (regular, directory, symlink, device), ownership (UID/GID), permissions (rwx for owner/group/other), timestamps (atime, mtime, ctime), file size, and pointers to data blocks on disk',
          'Inodes use a multi-level block pointer scheme: typically 12 direct pointers (each pointing to a 4KB data block = 48KB directly addressable), one indirect pointer (pointing to a block of pointers = 4MB), one double-indirect (16GB), and one triple-indirect (64TB) — enabling files of any size with constant-time access to the first 48KB',
          'A directory is a file whose data blocks contain a list of (name, inode number) pairs called directory entries (dentries) — looking up a path like /home/user/file.txt requires reading three directory files: /, /home, and /home/user, each to find the inode number of the next component',
          'Hard links are additional directory entries pointing to the same inode — the inode maintains a link count, and the file\'s data blocks are freed only when the last hard link is removed (link count drops to 0). Hard links cannot cross filesystem boundaries or link to directories',
          'Symbolic (soft) links are separate inodes whose data contains the target path as a string — the OS transparently resolves the symlink by reading the path and performing another lookup. Symlinks can cross filesystems and point to directories but break if the target is moved or deleted',
        ],
        tradeoffs: [
          'The inode-based design separates metadata from names, enabling hard links, efficient metadata access, and simple permission checking — but the fixed number of inodes (set at filesystem creation in ext4) can cause "out of inodes" errors even with free disk space',
          'Multi-level block pointers provide constant-time access for small files (common case) but require multiple disk reads for large file offsets — extent-based allocation (used in ext4, XFS, Btrfs) replaces pointer trees with (start_block, length) extents for more efficient large-file handling',
        ],
        realWorld: [
          'ext4 uses HTree (hash tree) directories for O(1) lookup performance instead of linear scans — critical for directories with millions of files',
          'XFS uses B+ trees for both inode allocation and extent mapping, scaling to exabyte-sized filesystems',
          'The ls -i command shows inode numbers, and stat shows all inode metadata for a given file',
        ],
      },
      {
        id: 'journaling',
        name: 'Journaling File Systems',
        description:
          'Journaling adds crash consistency by writing a log (journal) of pending changes before applying them to the filesystem — if the system crashes mid-operation, the journal can be replayed or rolled back to restore a consistent state.',
        keyPoints: [
          'Without journaling, a crash during a multi-block update (e.g., creating a file requires updating the inode bitmap, data bitmap, inode table, directory, and data blocks) can leave the filesystem in an inconsistent state — requiring a full fsck scan of the entire disk, which can take hours on large volumes',
          'Journal write-ahead protocol: (1) write all pending changes to the journal area, (2) write a commit record marking the transaction as complete, (3) write the changes to their actual locations (checkpoint), (4) mark the journal entries as freed. If a crash occurs before step 2, the incomplete transaction is discarded',
          'ext4 supports three journaling modes: journal (both data and metadata are journaled — safest but slowest, doubles write traffic), ordered (default — metadata is journaled, data is written before the metadata commit to prevent stale-data exposure), and writeback (only metadata is journaled — fastest but data can appear corrupted after a crash)',
          'The journal is a circular buffer on a dedicated disk region — once checkpointed transactions are freed, the space is reused. Journal size is fixed at filesystem creation (typically 128MB for ext4) and limits the maximum size of an atomic transaction',
          'Journaling adds write amplification — every metadata change is written twice (once to the journal, once to its final location). For metadata-heavy workloads (creating many small files), this can significantly reduce throughput compared to a non-journaling filesystem',
        ],
        tradeoffs: [
          'Full data journaling provides the strongest consistency guarantee (no stale data exposure, no metadata corruption) but doubles write traffic and reduces throughput — ordered mode is a practical compromise used by most deployments',
          'Journaling enables fast recovery (replaying the journal takes seconds regardless of disk size) but adds write latency and reduces the useful life of flash storage due to extra writes — SSDs with wear-leveling handle this better than HDDs',
        ],
        realWorld: [
          'ext4 with ordered journaling is the default filesystem for most Linux distributions',
          'XFS uses metadata-only journaling with an allocation-group-based design for high-performance parallel I/O',
          'NTFS (Windows) uses a log-structured journal called $LogFile for metadata transactions, with lazy writer for data',
        ],
      },
      {
        id: 'cow-filesystems',
        name: 'Copy-on-Write File Systems',
        description:
          'Copy-on-write (COW) filesystems never overwrite existing data — instead, modified data is written to new locations and metadata pointers are atomically updated. This provides built-in snapshots, checksumming, and crash consistency without a separate journal.',
        keyPoints: [
          'In a COW filesystem, writing to a file allocates new blocks for the changed data, creates a new copy of the metadata (inode) pointing to both old (unchanged) and new (changed) blocks, and atomically updates the parent pointer — the old version of the file remains intact until its space is reclaimed',
          'Snapshots are nearly free in COW filesystems — a snapshot simply preserves a pointer to the current root of the metadata tree. Since writes always go to new locations, the snapshot\'s view of the data remains frozen without copying anything. Restoring a snapshot is an atomic pointer swap',
          'Data integrity checksumming: COW filesystems like ZFS and Btrfs compute checksums (CRC32C or SHA-256) for every data and metadata block, storing them in the parent block — on read, the checksum is verified, and if corruption is detected (bit rot), a mirror copy is used automatically',
          'COW introduces write amplification for random writes — modifying a single byte in a file requires rewriting the data block, its inode, and potentially every level of the metadata tree up to the superblock. This creates "wandering tree" updates that worsen with deeper trees',
          'Fragmentation is a natural consequence of COW — since modified data goes to new locations, files that were initially written sequentially become scattered across the disk over time. This primarily affects HDD performance; SSDs are less impacted due to random-access performance',
        ],
        tradeoffs: [
          'COW provides atomic updates, free snapshots, and data integrity verification without a journal — but random-write performance degrades due to write amplification and fragmentation, especially on HDDs',
          'Self-healing (checksum + mirror repair) prevents silent data corruption but requires redundancy (mirroring or parity) and adds CPU overhead for checksum computation on every read and write',
        ],
        realWorld: [
          'ZFS (Solaris, FreeBSD, OpenZFS on Linux) is the gold standard COW filesystem — pooled storage, built-in RAID (RAIDZ), 128-bit checksums, snapshots, clones, and send/receive replication',
          'Btrfs is Linux\'s native COW filesystem — supports subvolumes, snapshots, online defragmentation, and transparent compression (zstd, lzo)',
          'Apple APFS uses COW for atomic metadata updates, space-efficient clones (instant file copies), and per-file encryption',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'I/O Systems',
    part: 3,
    partTitle: 'Storage & I/O',
    summary:
      'The I/O subsystem manages communication between the CPU and peripheral devices — from disk drives to network interfaces. Understanding DMA, interrupt handling, disk scheduling, and I/O buffering is essential for optimizing system throughput and latency.',
    concepts: [
      {
        id: 'dma-interrupts',
        name: 'DMA & Interrupt-driven I/O',
        description:
          'Direct Memory Access (DMA) allows peripheral devices to transfer data directly to/from main memory without CPU involvement, while interrupts notify the CPU when I/O operations complete — together they enable efficient asynchronous I/O.',
        keyPoints: [
          'Without DMA, the CPU must execute a load/store instruction for every byte transferred between a device and memory (programmed I/O or PIO) — this wastes CPU cycles on data movement. DMA offloads bulk transfers to a dedicated DMA controller, freeing the CPU to execute other instructions during the transfer',
          'A DMA transfer involves: (1) CPU programs the DMA controller with source/destination addresses and transfer size, (2) DMA controller takes control of the memory bus and transfers data directly, (3) DMA controller raises an interrupt to signal completion — the CPU only participates at setup and completion',
          'Interrupts provide asynchronous notification — when a device completes an operation or has data ready, it signals the CPU via an interrupt line. The CPU suspends its current work, saves state, and executes the interrupt handler (ISR), then resumes. This eliminates the need for the CPU to busy-wait (polling) for I/O completion',
          'Interrupt coalescing (batching) reduces interrupt overhead for high-throughput devices — instead of one interrupt per packet/block, the device collects multiple completions and raises a single interrupt, reducing the rate of expensive context switches to the interrupt handler. Linux NAPI uses this for network I/O',
          'Top-half/bottom-half interrupt handling: the top-half ISR runs with interrupts disabled, does minimal work (acknowledge hardware, copy status), and schedules a bottom-half (softirq, tasklet, or workqueue) that runs with interrupts enabled to do the slower processing — this minimizes interrupt latency',
        ],
        tradeoffs: [
          'DMA dramatically improves throughput for bulk transfers but adds complexity (DMA controller programming, bounce buffers for devices that cannot access all of physical memory) and can create cache-coherency issues — the CPU cache may hold stale data after a DMA write to memory',
          'Interrupt-driven I/O is efficient for sporadic events but can cause "interrupt livelock" under extreme load (e.g., 10Gbps network) where the CPU spends all its time in interrupt handlers — hybrid polling/interrupt approaches (Linux NAPI, io_uring) address this',
        ],
        realWorld: [
          'NVMe SSDs use DMA extensively — command submission and completion queues are in host memory, and data transfers bypass the CPU entirely via bus-mastering DMA',
          'Linux NAPI (New API) for network drivers switches from interrupt-driven to polling mode under high packet rates to avoid interrupt livelock',
          'RDMA (Remote DMA) in InfiniBand/RoCE extends DMA across the network — one machine writes directly into another machine\'s memory without involving either CPU',
        ],
      },
      {
        id: 'disk-scheduling',
        name: 'Disk Scheduling Algorithms',
        description:
          'Disk scheduling algorithms determine the order in which pending I/O requests to a rotating disk are serviced — the goal is to minimize total seek time by ordering requests to reduce head movement across the disk platters.',
        keyPoints: [
          'Seek time (moving the disk head to the correct track) dominates rotational-disk I/O latency — a full stroke across a modern HDD takes 10-15ms, while sequential access on the same track takes only microseconds. Disk scheduling reorders pending requests to minimize total seek distance',
          'FCFS (First-Come, First-Served) processes requests in arrival order — simple but can cause wild head oscillations (e.g., requests alternating between inner and outer tracks). SSTF (Shortest Seek Time First) always serves the nearest request — better throughput but starves distant requests',
          'SCAN (elevator algorithm) sweeps the head in one direction, servicing all requests on the way, then reverses — like an elevator. C-SCAN (Circular SCAN) only services requests in one direction and returns to the start without servicing, providing more uniform wait times',
          'Linux I/O schedulers (block layer): the deadline scheduler assigns a deadline to each request to prevent starvation while batching nearby requests; mq-deadline is the multi-queue version. BFQ (Budget Fair Queuing) provides fairness guarantees, prioritizing interactive workloads over background tasks',
          'For SSDs, disk scheduling is largely irrelevant because flash has no seek time — the Linux noop (now "none") scheduler simply passes requests through in order, since the SSD\'s internal firmware handles request optimization. NVMe devices bypass the Linux scheduler entirely with their own hardware queues',
        ],
        tradeoffs: [
          'SSTF maximizes throughput by minimizing seek distance but can starve requests at the edges of the disk — SCAN/C-SCAN provide bounded wait times at a slight throughput cost',
          'Sophisticated schedulers (BFQ, deadline) add per-request overhead — acceptable for slow HDDs but unnecessary for fast NVMe SSDs where the scheduling overhead exceeds the optimization benefit',
        ],
        realWorld: [
          'Linux default I/O scheduler for HDDs is mq-deadline; for NVMe SSDs, it is "none" (passthrough)',
          'Database systems (PostgreSQL, MySQL) rely on the OS I/O scheduler but also implement their own request ordering through write-ahead log sequential writes and checkpoint scheduling',
          'Enterprise storage arrays (NetApp, EMC) implement their own sophisticated I/O scheduling in firmware, often making OS-level scheduling redundant',
        ],
      },
      {
        id: 'io-buffering',
        name: 'I/O Buffering & Caching',
        description:
          'The OS kernel interposes a multi-layered buffering and caching system between applications and storage devices — buffering smooths out the speed mismatch between fast CPUs and slow I/O devices, while caching avoids redundant device access.',
        keyPoints: [
          'The Linux page cache stores recently read file data in memory — subsequent reads of the same data are served from RAM (microseconds) instead of disk (milliseconds). The page cache dynamically uses all available free memory and is reclaimed under memory pressure by the LRU-based kswapd daemon',
          'Write-back buffering: write() system calls typically copy data to the page cache and return immediately — the actual disk write happens later when the kernel\'s writeback threads (pdflush/flush-*) flush dirty pages, typically within 30 seconds (dirty_expire_centisecs) or when dirty pages exceed a threshold (dirty_ratio)',
          'The fsync() system call forces all dirty pages for a specific file to be written to the storage device and waits for the device to confirm persistence — this is critical for database write-ahead logs and any application that must survive crashes, but it is orders of magnitude slower than a buffered write',
          'Double buffering: data often passes through the page cache (kernel buffer) and then an application-level buffer (e.g., stdio FILE buffers in C, BufferedReader in Java) — database systems that manage their own buffer pool use O_DIRECT to bypass the page cache and avoid redundant caching',
          'Read-ahead (prefetching): the kernel detects sequential read patterns and proactively reads ahead — if the application reads blocks 1, 2, 3, the kernel prefetches blocks 4-32 asynchronously, so they are in the page cache before the application requests them. Read-ahead window grows dynamically with sequential access patterns',
        ],
        tradeoffs: [
          'Write-back buffering dramatically improves write throughput (100-1000x vs synchronous writes) but creates a window where written data exists only in volatile RAM — a power failure during this window loses the data unless the application explicitly calls fsync()',
          'The page cache improves read performance for repeated access patterns but consumes memory that could be used by applications — under memory pressure, cache eviction causes sudden I/O latency spikes. O_DIRECT gives applications direct control but bypasses the kernel\'s optimization heuristics',
        ],
        realWorld: [
          'PostgreSQL relies on fsync() for WAL (Write-Ahead Log) durability and uses shared_buffers as its own buffer cache, often with O_DIRECT for table data',
          'Linux free command shows page cache usage in the "buff/cache" column — a healthy system uses most free memory for caching',
          'MySQL InnoDB uses O_DIRECT for data files to avoid double-buffering, managing its own buffer pool with sophisticated LRU variants',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Storage Hierarchy',
    part: 3,
    partTitle: 'Storage & I/O',
    summary:
      'Modern storage systems form a hierarchy from fast, expensive, volatile memory at the top to slow, cheap, persistent storage at the bottom. Understanding RAID for redundancy, SSD internals for flash-aware design, and emerging NVMe/tiered storage is essential for system architecture.',
    concepts: [
      {
        id: 'raid-levels',
        name: 'RAID Levels',
        description:
          'RAID (Redundant Array of Independent Disks) combines multiple physical disks into a logical unit to improve performance, capacity, or reliability — different RAID levels offer different trade-offs between these goals.',
        keyPoints: [
          'RAID 0 (striping) distributes data across N disks in fixed-size stripes — reads and writes are parallelized across all disks, providing N-times throughput improvement, but any single disk failure destroys all data (reliability decreases as N increases)',
          'RAID 1 (mirroring) writes identical copies to two (or more) disks — reads can be served from either disk (doubling read throughput), writes must go to both (write speed of a single disk), and the system tolerates one disk failure. Usable capacity is 50% of total',
          'RAID 5 (striped with distributed parity) requires at least 3 disks — data and parity blocks are distributed across all disks. It tolerates one disk failure with (N-1)/N usable capacity. The "write hole" problem: a crash during a partial stripe write can leave parity inconsistent',
          'RAID 6 (double distributed parity) uses two independent parity calculations — it tolerates any two simultaneous disk failures, which is critical for large arrays where the probability of a second failure during rebuild is significant (especially with multi-TB drives that take hours to rebuild)',
          'RAID 10 (1+0) mirrors pairs of disks, then stripes across the mirrored pairs — combines RAID 1\'s redundancy with RAID 0\'s performance. It can tolerate multiple failures as long as both disks in a mirrored pair don\'t fail simultaneously. Often preferred for databases due to excellent random write performance',
        ],
        tradeoffs: [
          'RAID 5 offers good space efficiency (only 1 disk of parity overhead) but suffers from poor random write performance (each write requires read-modify-write of the parity block) and the write hole — RAID 6 adds more safety but doubles the parity overhead and worsens the write penalty',
          'RAID 10 provides the best performance and simplest rebuild (only one disk to copy vs recalculating parity) but uses 50% of total capacity for redundancy — the cost/performance trade-off favors RAID 10 for performance-critical applications and RAID 6 for capacity-focused storage',
        ],
        realWorld: [
          'Enterprise databases (Oracle, SQL Server) typically use RAID 10 for data volumes and RAID 1 for transaction log volumes',
          'ZFS RAIDZ1/RAIDZ2/RAIDZ3 are COW implementations of RAID 5/6 with an additional triple-parity option that avoids the write hole through atomic stripe writes',
          'Cloud storage (AWS EBS, Google Persistent Disk) provides RAID-like redundancy transparently — multiple copies are maintained across different physical hosts',
        ],
      },
      {
        id: 'ssd-internals',
        name: 'SSD Internals',
        description:
          'Solid-state drives store data in NAND flash cells organized into pages and blocks — understanding the asymmetric read/write/erase operations, write amplification, and garbage collection is essential for designing flash-friendly software.',
        keyPoints: [
          'NAND flash is organized hierarchically: cells (store 1-4 bits) -> pages (4-16KB, smallest read/write unit) -> blocks (256-512 pages, smallest erase unit). You can read or write individual pages, but erasing (resetting to all-1s) must be done at the block level — this asymmetry drives all SSD complexity',
          'Pages cannot be overwritten in place — to modify a page, the SSD writes the new data to a free page, marks the old page as invalid (stale), and updates its internal mapping table (Flash Translation Layer / FTL). The FTL maps logical block addresses (LBAs) to physical NAND pages, hiding this complexity from the OS',
          'Garbage collection (GC) reclaims blocks containing stale pages — the SSD copies valid pages from a partially-stale block to a new block, then erases the old block to make it available for writing. GC creates write amplification: the SSD writes more data internally than the host requested',
          'Write amplification factor (WAF) = actual NAND writes / host writes — a WAF of 1.0 is ideal (no amplification), but random writes with GC typically produce WAF of 2-5x. TRIM/DISCARD commands from the OS tell the SSD which pages are no longer needed, helping GC avoid copying stale data',
          'NAND flash cells have a limited write/erase endurance (typically 3000-100,000 cycles for TLC/MLC) — the SSD firmware performs wear leveling, distributing writes evenly across all blocks to prevent some blocks from wearing out before others. Over-provisioning (extra NAND not exposed to the OS) provides a reserve for GC and wear leveling',
        ],
        tradeoffs: [
          'SSDs provide dramatically better random read/write performance than HDDs (50-500x for random reads) but have finite write endurance — write-heavy workloads must be designed to minimize write amplification through sequential writes, proper alignment, and TRIM support',
          'More bits per cell (SLC=1 -> MLC=2 -> TLC=3 -> QLC=4) increases capacity per chip but decreases endurance, speed, and reliability — enterprise SSDs use MLC or TLC with large over-provisioning, while consumer SSDs use TLC/QLC for cost efficiency',
        ],
        realWorld: [
          'Samsung 990 Pro NVMe SSD: TLC NAND, 4KB random read up to 1.2M IOPS, 7000/5100 MB/s sequential read/write',
          'Log-structured merge trees (LSM) in RocksDB/LevelDB are designed for SSDs — they convert random writes into sequential writes, reducing write amplification',
          'Databases like ScyllaDB and CockroachDB are specifically designed for SSD-first deployment with I/O patterns optimized for flash characteristics',
        ],
      },
      {
        id: 'nvme-tiering',
        name: 'NVMe & Storage Tiers',
        description:
          'NVMe (Non-Volatile Memory Express) is a high-performance storage protocol designed from the ground up for SSDs connected via PCIe, while storage tiering automatically places data on the most appropriate medium based on access patterns.',
        keyPoints: [
          'NVMe connects SSDs directly to the CPU via PCIe lanes, bypassing the legacy AHCI/SATA storage stack — it supports up to 64K queues with 64K commands each (vs AHCI\'s single queue of 32 commands), enabling massive parallelism that matches the internal parallelism of modern SSDs',
          'NVMe reduces I/O latency by eliminating software layers: the driver submits commands directly to submission queues in host memory, the SSD processes them and writes results to completion queues — the entire path from application to device can be under 10 microseconds, compared to 50-100us for SATA',
          'Storage tiering combines different storage media in a hierarchy: Optane/SCM (near-DRAM speed) -> NVMe SSD (fast) -> SATA SSD (medium) -> HDD (slow, high capacity) -> archival (tape/cold cloud). Data migration between tiers is based on access frequency and recency',
          'Automatic tiering (used in enterprise arrays and cloud storage) monitors data access patterns and migrates hot data upward (to faster tiers) and cold data downward (to cheaper tiers) — this optimizes the cost/performance ratio without application changes. Linux dm-writecache and bcache provide host-side caching tiers',
          'CXL (Compute Express Link) is an emerging standard that extends PCIe to provide cache-coherent memory access to storage devices — enabling memory-mapped access to persistent storage at near-DRAM latencies, blurring the line between memory and storage tiers',
        ],
        tradeoffs: [
          'NVMe provides extreme performance (millions of IOPS) but saturating it requires careful software design — the application must use asynchronous I/O (io_uring, SPDK), multiple threads, and sufficient queue depth to keep the device busy, or the software becomes the bottleneck',
          'Multi-tier storage maximizes cost efficiency but adds complexity in data placement decisions and migration overhead — incorrect tier assignment causes either wasted expensive storage (hot data on slow tier) or unnecessary cost (cold data on fast tier)',
        ],
        realWorld: [
          'AWS offers gp3/io2 (SSD), st1/sc1 (HDD), and S3/Glacier (archival) storage tiers — applications can use Intelligent-Tiering to automatically move data between S3 tiers',
          'Intel Optane (3D XPoint) provided a tier between DRAM and NAND flash — used as persistent memory or fast cache, though Intel discontinued the product line in 2022',
          'SPDK (Storage Performance Development Kit) provides user-space NVMe drivers that bypass the kernel for maximum performance, used in high-performance storage systems like Ceph BlueStore',
        ],
      },
    ],
  },

  // ============================================================
  // PART 4: Advanced Topics (Topics 11-13)
  // ============================================================
  {
    id: 11,
    title: 'Synchronization Primitives',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'When multiple threads or processes access shared data concurrently, synchronization primitives ensure correctness by enforcing mutual exclusion, ordering, and coordination. Understanding the trade-offs between different primitives is essential for writing correct and performant concurrent code.',
    concepts: [
      {
        id: 'mutexes-spinlocks',
        name: 'Mutexes & Spinlocks',
        description:
          'Mutexes and spinlocks both provide mutual exclusion — ensuring only one thread can execute a critical section at a time — but they differ fundamentally in how they wait: mutexes sleep (context switch) while spinlocks busy-wait (spin in a loop).',
        keyPoints: [
          'A mutex (mutual exclusion lock) is acquired via a system call — if the lock is held, the kernel puts the requesting thread to sleep (moves it to the blocked state and context-switches to another thread). When the lock is released, the kernel wakes one sleeping thread. This is efficient for long critical sections because sleeping threads consume no CPU',
          'A spinlock uses an atomic instruction (e.g., compare-and-swap or test-and-set) in a tight loop — the thread continuously checks the lock until it becomes available. This avoids the overhead of a context switch but wastes CPU cycles while spinning. Spinlocks are only efficient when the expected wait time is shorter than a context switch (~1-10 microseconds)',
          'Adaptive mutexes (used in Linux futex implementation) combine both approaches — they spin briefly (optimistic short wait) then sleep if the lock is still held. The Linux pthread_mutex uses futex (Fast User-space Mutex): the fast path is entirely in user-space with atomic operations, only falling back to a kernel sleep call on contention',
          'Priority inversion occurs when a low-priority thread holds a lock needed by a high-priority thread — the high-priority thread is blocked while medium-priority threads preempt the lock holder. Solutions include priority inheritance (temporarily boosting the lock holder\'s priority) and priority ceiling (setting the lock\'s priority to the highest potential user)',
          'Lock ordering is critical to prevent deadlocks — if thread A acquires lock 1 then lock 2, and thread B acquires lock 2 then lock 1, they can deadlock. All threads must acquire locks in a consistent global order. Static analysis tools (lockdep in Linux kernel) detect lock-ordering violations',
        ],
        tradeoffs: [
          'Mutexes have higher overhead per lock/unlock (futex system call on contention) but are efficient for long-held locks — spinlocks have near-zero overhead for uncontended acquisition but waste CPU on contention, and must never be held while sleeping (would waste an entire CPU core)',
          'Fine-grained locking (many small locks) maximizes parallelism but increases complexity, memory overhead, and deadlock risk — coarse-grained locking (few large locks) is simpler but serializes more threads, reducing concurrency',
        ],
        realWorld: [
          'Linux kernel uses spinlocks (spin_lock) for short critical sections in interrupt context and mutexes (struct mutex) for longer sections in process context',
          'Java synchronized keyword implements a mutex using an adaptive approach — biased locking, thin locks, and fat locks depending on contention level',
          'The Mars Pathfinder spacecraft experienced a priority inversion bug in 1997 — a low-priority meteorological task held a mutex needed by the high-priority bus management task, causing system resets',
        ],
      },
      {
        id: 'semaphores-condvars',
        name: 'Semaphores & Condition Variables',
        description:
          'Semaphores generalize mutexes by maintaining a count (allowing up to N concurrent accesses), while condition variables allow threads to sleep until a specific condition becomes true, enabling complex coordination patterns beyond simple mutual exclusion.',
        keyPoints: [
          'A counting semaphore maintains an integer count initialized to N — sem_wait() decrements the count (blocking if it would go below 0), and sem_post() increments it (waking a blocked thread if any). With N=1, it behaves like a mutex. With N>1, it controls access to a pool of N identical resources',
          'Binary semaphores (N=1) differ from mutexes in ownership semantics — a mutex must be released by the same thread that acquired it, while a semaphore can be posted by any thread. This makes semaphores suitable for signaling (one thread signals another to proceed) but more error-prone (no ownership checking)',
          'Condition variables are always used with a mutex — the pattern is: lock mutex, check condition, if false call cond_wait() which atomically releases the mutex and sleeps, then re-acquires the mutex when signaled. This "check, sleep, re-check" pattern avoids the lost-wakeup problem',
          'Spurious wakeups can occur with condition variables — the thread may wake up even without a signal (due to OS implementation details). The condition check must always be in a while loop, not an if statement: while(!condition) { cond_wait(&cv, &mutex); }',
          'The producer-consumer pattern is a classic use of semaphores or condition variables: producers add items to a bounded buffer (blocking when full), consumers remove items (blocking when empty). With semaphores: empty_slots (initialized to buffer size), full_slots (initialized to 0), and a mutex protecting the buffer',
        ],
        tradeoffs: [
          'Semaphores are versatile (mutual exclusion, signaling, resource counting) but their lack of ownership semantics makes debugging harder — accidental double-post or missed wait operations create subtle bugs. Mutexes + condition variables provide the same patterns with clearer semantics',
          'Condition variables are more expressive (can wait on arbitrary conditions) but require careful coding — forgetting the while loop around cond_wait, or signaling without holding the mutex, causes race conditions that are extremely difficult to reproduce and debug',
        ],
        realWorld: [
          'Database connection pools use counting semaphores — the semaphore count equals the maximum connections, and each client waits on the semaphore before acquiring a connection',
          'Java BlockingQueue uses condition variables (ReentrantLock + Condition) internally to implement the producer-consumer pattern with bounded capacity',
          'POSIX unnamed semaphores (sem_init) can be placed in shared memory for inter-process synchronization, unlike mutexes which are typically per-process',
        ],
      },
      {
        id: 'monitors-rwlocks',
        name: 'Monitors & Read-Write Locks',
        description:
          'Monitors encapsulate shared data with the synchronization needed to access it safely, while read-write locks optimize for the common case where reads vastly outnumber writes by allowing concurrent readers.',
        keyPoints: [
          'A monitor is a synchronization construct that combines a mutex with one or more condition variables, encapsulated around shared data — the monitor automatically acquires the mutex on entry to any method and releases it on exit, preventing programmers from forgetting to lock or unlock. Java\'s synchronized keyword implements the monitor pattern',
          'Mesa-style monitors (used by Java, POSIX) differ from Hoare-style monitors in signaling semantics — in Mesa semantics, signal() makes a waiting thread eligible to run but doesn\'t guarantee it runs next (hence the need for while loops around wait()). Hoare semantics guarantee the signaled thread runs immediately, which is harder to implement',
          'Read-write locks (rwlock) distinguish between shared (read) and exclusive (write) access — multiple readers can hold the lock simultaneously (no data mutation, so concurrent reads are safe), but a writer must have exclusive access (no readers or other writers). This significantly improves throughput for read-heavy workloads',
          'Writer starvation is a risk with reader-preference rwlocks — if readers continuously arrive, the writer may wait indefinitely because new readers keep being admitted. Writer-preference rwlocks block new readers when a writer is waiting, but this can reduce read throughput. Most implementations use a fair (FIFO) policy',
          'RCU (Read-Copy-Update) is a Linux kernel synchronization mechanism that provides extremely fast reads (no locking at all for readers) — writers create a new copy of the data structure, update the pointer atomically, and defer freeing the old copy until all current readers have finished (a "grace period"). Ideal for data structures that are read millions of times per second but rarely modified',
        ],
        tradeoffs: [
          'Monitors provide safety through encapsulation (impossible to access shared data without holding the lock) but limit flexibility — all methods are mutually exclusive even when some could safely run concurrently. Read-write locks provide more concurrency but require careful discipline about which operations are truly read-only',
          'RCU provides the best read performance (zero overhead for readers) but requires significant complexity on the write path — writers must create copies, manage grace periods, and handle memory reclamation. It is primarily a kernel-level technique due to its complexity',
        ],
        realWorld: [
          'Java uses monitors extensively — every object has an implicit monitor (synchronized methods/blocks), and java.util.concurrent.locks.ReentrantReadWriteLock provides rwlock semantics',
          'Linux kernel uses RCU pervasively for routing tables, process lists, and module management — thousands of RCU usage sites in the kernel',
          'Go sync.RWMutex provides read-write lock semantics — RLock() for shared read access, Lock() for exclusive write access, with writer-preference fairness',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Deadlocks',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'A deadlock occurs when two or more threads are permanently blocked, each waiting for a resource held by another thread in the group. Understanding the conditions that cause deadlocks, algorithms to prevent or detect them, and recovery strategies is crucial for building reliable concurrent systems.',
    concepts: [
      {
        id: 'deadlock-conditions',
        name: 'Four Conditions for Deadlock',
        description:
          'A deadlock can only occur when all four Coffman conditions hold simultaneously: mutual exclusion, hold and wait, no preemption, and circular wait. Breaking any one condition prevents deadlock entirely.',
        keyPoints: [
          'Mutual Exclusion: at least one resource must be held in a non-sharable mode — only one thread can use the resource at a time. This is inherent to resources like printers, file locks, and critical sections that require exclusive access',
          'Hold and Wait: a thread holding at least one resource is waiting to acquire additional resources held by other threads — the thread neither releases its current resources nor acquires all needed resources atomically at the start',
          'No Preemption: resources cannot be forcibly taken from a thread — a thread must voluntarily release its resources. This is fundamental for resources that cannot be safely interrupted (e.g., a partially-written database transaction)',
          'Circular Wait: there exists a circular chain of threads, each waiting for a resource held by the next thread in the chain — thread A waits for resource held by B, B waits for C, C waits for A. This is the most actionable condition to prevent through lock ordering',
          'Livelock is a related condition where threads are not blocked but make no progress — they continuously change state in response to each other (e.g., two people in a hallway both stepping aside in the same direction). Livelock is harder to detect than deadlock because threads appear active',
        ],
        tradeoffs: [
          'Breaking mutual exclusion (using lock-free data structures or making resources sharable) eliminates deadlock possibility but is complex and not always possible — some resources are inherently exclusive',
          'Breaking hold-and-wait by requiring all-or-nothing resource acquisition prevents deadlock but reduces concurrency (resources are held longer than necessary) and requires knowing all needed resources upfront, which is often impractical',
        ],
        realWorld: [
          'Database systems detect deadlocks in their lock manager by building a wait-for graph and checking for cycles — when detected, the youngest transaction is typically rolled back and restarted',
          'The Linux kernel lockdep subsystem dynamically verifies lock ordering at runtime — it maintains a dependency graph and warns when a potential circular dependency is created, even before an actual deadlock occurs',
          'The Dining Philosophers problem illustrates all four conditions — five philosophers with five forks demonstrate how circular wait causes deadlock and how ordering (e.g., always pick up the lower-numbered fork first) prevents it',
        ],
      },
      {
        id: 'bankers-algorithm',
        name: "Banker's Algorithm",
        description:
          'The Banker\'s Algorithm is a deadlock avoidance algorithm that decides whether granting a resource request leaves the system in a safe state — a state from which all processes can eventually complete even in the worst case.',
        keyPoints: [
          'A safe state is one where there exists a safe sequence — an ordering of all processes such that each process\'s maximum resource demands can be satisfied by the currently available resources plus resources held by all preceding processes in the sequence. If no safe sequence exists, the state is unsafe (deadlock may occur)',
          'When a process requests resources, the Banker\'s Algorithm tentatively grants the request, checks if the resulting state is safe by finding a safe sequence, and only actually grants the request if the state remains safe — otherwise, the process must wait',
          'Finding a safe sequence: iterate through all processes, find one whose remaining maximum needs can be satisfied by current available resources — assume that process runs to completion and releases all its resources, then repeat with the updated available resources. If all processes can complete, the sequence is safe',
          'The algorithm requires each process to declare its maximum resource requirements upfront — the banker (OS) uses this information along with current allocations and available resources to make decisions. The matrices used are: Max (maximum needs), Allocation (current holdings), Need (Max - Allocation), and Available (unallocated resources)',
          'The algorithm\'s time complexity is O(n^2 * m) per request, where n is the number of processes and m is the number of resource types — the safety check runs in O(n * m) per iteration and may require up to n iterations to find the safe sequence',
        ],
        tradeoffs: [
          'The Banker\'s Algorithm guarantees deadlock freedom (deadlock avoidance, not just prevention) without requiring conservative all-or-nothing allocation — but it is pessimistic, potentially refusing safe requests because they could lead to an unsafe state',
          'The main practical limitation is that processes must declare maximum resource needs in advance, which is often unknown or too conservative — and the algorithm is too expensive (O(n^2*m) per request) for fine-grained resource allocation in high-throughput systems',
        ],
        realWorld: [
          'Database systems use a form of deadlock avoidance for lock acquisition — SQL Server uses timeouts and wound-wait/wait-die protocols rather than the full Banker\'s Algorithm due to performance constraints',
          'Embedded real-time systems sometimes use Banker\'s Algorithm for memory buffer allocation where maximum needs are known at design time and safety guarantees are critical',
          'Cloud resource schedulers like Kubernetes implement simplified versions — checking whether a pod\'s resource request can be satisfied given current cluster utilization and reserved resources',
        ],
      },
      {
        id: 'deadlock-detection',
        name: 'Deadlock Detection & Recovery',
        description:
          'Instead of preventing or avoiding deadlocks, some systems allow deadlocks to occur and then detect and recover from them — using algorithms that check for cycles in the resource-allocation graph and then breaking the deadlock by terminating or rolling back processes.',
        keyPoints: [
          'A wait-for graph tracks which threads are waiting for which other threads — each thread is a node, and an edge from thread A to thread B means A is waiting for a resource held by B. A cycle in this graph indicates a deadlock. For single-instance resources, cycle detection (DFS) in O(V + E) is sufficient',
          'For multi-instance resources, cycle detection alone is insufficient — the full resource-allocation graph with request and assignment edges must be analyzed using an algorithm similar to the Banker\'s safety check, reducing the graph by finding processes that can complete',
          'Detection frequency is a trade-off: checking after every resource request guarantees immediate detection but is expensive; periodic checks (e.g., every few seconds or when CPU utilization drops below a threshold) amortize the cost but delay detection and increase the impact of the deadlock',
          'Recovery by process termination: kill one or more processes in the deadlock cycle to break it — the victim selection algorithm considers process priority, how long it has been running, resources held, resources needed to complete, and whether it can be safely restarted. Killing the minimum number of processes to break all cycles is NP-hard',
          'Recovery by resource preemption: forcibly take a resource from one process and give it to another — this requires the ability to save the preempted process\'s state and restore it later (rollback). Database transactions support this naturally (rollback undoes all changes), but general processes cannot be easily rolled back',
        ],
        tradeoffs: [
          'Deadlock detection allows maximum concurrency (no resources refused or delayed for safety) but incurs the cost of periodic detection and the disruption of recovery — processes may lose work when they are terminated or rolled back',
          'Termination is simple but wasteful (the killed process loses all its work); preemption with rollback is less wasteful but requires application-level support for checkpointing and recovery, which not all programs provide',
        ],
        realWorld: [
          'MySQL InnoDB detects deadlocks by maintaining a wait-for graph — when a cycle is found, it rolls back the transaction with the fewest row-level locks modified (least work to redo)',
          'PostgreSQL checks for deadlocks periodically (deadlock_timeout, default 1 second) by building a wait-for graph among active transactions — the newest transaction in the cycle is rolled back',
          'Oracle Database uses a distributed deadlock detection mechanism that handles deadlocks across RAC (Real Application Clusters) instances by periodically sending deadlock-detection messages between nodes',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Virtualization & Containers',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Virtualization creates isolated execution environments that share physical hardware — from full hardware virtualization with hypervisors to lightweight OS-level virtualization with containers. Understanding these technologies and their trade-offs is fundamental to modern cloud infrastructure and deployment.',
    concepts: [
      {
        id: 'hypervisors',
        name: 'Type 1 & Type 2 Hypervisors',
        description:
          'A hypervisor (Virtual Machine Monitor) manages multiple guest operating systems on shared hardware. Type 1 runs directly on hardware (bare-metal), while Type 2 runs as an application on a host OS — each with distinct performance and management characteristics.',
        keyPoints: [
          'Type 1 hypervisors (bare-metal) run directly on the hardware without a host OS — they have direct access to hardware resources and provide the thinnest virtualization layer. Examples: VMware ESXi, Microsoft Hyper-V, Xen, KVM (technically a kernel module that turns Linux into a Type 1 hypervisor)',
          'Type 2 hypervisors run as a regular application on a host operating system — they rely on the host OS for hardware access and device drivers, adding an extra layer of overhead. Examples: VirtualBox, VMware Workstation, Parallels Desktop. They are convenient for development but less efficient for production',
          'Hardware-assisted virtualization (Intel VT-x, AMD-V) added CPU modes specifically for virtualization — VMX root mode (hypervisor) and VMX non-root mode (guest). The guest OS runs in non-root mode and traps to the hypervisor on privileged operations, eliminating the need for binary translation or paravirtualization',
          'Memory virtualization uses nested page tables (Intel EPT, AMD NPT) — the guest has its own page tables mapping guest-virtual to guest-physical addresses, and the hypervisor maintains extended page tables mapping guest-physical to host-physical. The MMU walks both levels, adding ~5% overhead compared to native execution',
          'I/O virtualization with SR-IOV (Single Root I/O Virtualization) allows a physical device (typically a network card) to present multiple virtual functions — each VM gets direct access to a virtual function, bypassing the hypervisor for data-path operations and approaching native I/O performance',
        ],
        tradeoffs: [
          'Type 1 provides better performance (< 5% overhead for CPU, < 10% for I/O) and stronger isolation but requires specialized management tools and cannot run arbitrary desktop applications — Type 2 is easier to use but adds the overhead of the host OS',
          'Full virtualization (each guest has its own kernel) provides the strongest isolation and allows running different OSes on the same hardware, but each VM consumes significant resources (separate kernel, memory for page tables, etc.) — typically hundreds of MB overhead per VM',
        ],
        realWorld: [
          'AWS EC2 uses KVM (Nitro hypervisor) with custom hardware for network and storage — the Nitro System offloads virtualization functions to dedicated hardware, approaching bare-metal performance',
          'VMware vSphere ESXi dominates enterprise on-premises virtualization with features like vMotion (live VM migration), DRS (Distributed Resource Scheduler), and HA (High Availability)',
          'Apple Silicon Macs use the Hypervisor.framework to run lightweight VMs — used by Docker Desktop, UTM, and Parallels to run Linux and Windows on ARM hardware',
        ],
      },
      {
        id: 'namespaces-cgroups',
        name: 'Linux Namespaces & cgroups',
        description:
          'Linux namespaces provide isolation of system resources (process IDs, network stacks, mount points) per container, while cgroups (control groups) limit and account for resource usage (CPU, memory, I/O) — together they form the foundation of Linux containers.',
        keyPoints: [
          'Linux namespaces create isolated views of global system resources — each namespace type isolates a specific resource: PID (process IDs — PID 1 inside a container is not PID 1 on the host), Network (separate network stack, interfaces, routing tables), Mount (filesystem mount points), UTS (hostname), IPC (message queues, semaphores), User (UID/GID mapping), and Cgroup (cgroup hierarchy view)',
          'The clone() system call with CLONE_NEW* flags creates a new process in new namespaces — unshare() moves the calling process into new namespaces, and setns() allows a process to join an existing namespace (used by docker exec to enter a running container)',
          'cgroups v2 organizes processes into a hierarchy and sets resource limits per group — cpu.max limits CPU time (e.g., "100000 100000" = 100% of one core), memory.max sets the hard memory limit (OOM-killed if exceeded), memory.high sets a soft limit (throttled), and io.max limits block I/O bandwidth',
          'cgroups provide resource accounting: memory.current shows actual memory usage, cpu.stat shows user/system CPU time, and io.stat shows read/write bytes and operations — this is how container monitoring tools (cAdvisor, Docker stats) report per-container resource usage',
          'The user namespace is critical for rootless containers — it maps UID 0 (root) inside the container to an unprivileged UID on the host, so processes that appear to run as root inside the container have no special privileges on the host system. This significantly improves security',
        ],
        tradeoffs: [
          'Namespaces provide lightweight isolation (sharing the host kernel) with near-zero performance overhead — but isolation is weaker than VMs because a kernel vulnerability in the shared kernel affects all containers. Namespace escapes have been demonstrated through kernel exploits',
          'cgroups provide fair resource sharing and prevent noisy-neighbor problems but add overhead for enforcement and accounting — memory limits can cause unexpected OOM kills, and CPU throttling can cause unpredictable latency spikes for latency-sensitive applications',
        ],
        realWorld: [
          'Docker containers use PID, Network, Mount, UTS, IPC, and User namespaces — each docker run creates a new set of namespaces for the container process',
          'Kubernetes uses cgroups v2 for pod-level resource management — resource requests and limits in pod specs map directly to cgroup memory.max and cpu.max settings',
          'systemd uses cgroups to organize all services into a hierarchy — systemd-cgtop shows per-service resource usage, and Slice units define resource limits for service groups',
        ],
      },
      {
        id: 'container-runtimes',
        name: 'Container Runtimes & OCI',
        description:
          'Container runtimes are the software components that create and manage containers using kernel primitives. The OCI (Open Container Initiative) defines standards for container images and runtimes, ensuring interoperability across the container ecosystem.',
        keyPoints: [
          'The OCI defines two specifications: the Image Spec (how container images are structured — layers, manifest, config) and the Runtime Spec (how a container is created from an image — root filesystem, namespace configuration, cgroup settings, lifecycle hooks). Any compliant runtime can run any OCI image',
          'runc is the reference OCI runtime — a low-level tool that takes an OCI bundle (root filesystem + config.json) and creates a container using clone(), namespace setup, cgroup configuration, pivot_root(), and capability dropping. Docker, containerd, Podman, and CRI-O all use runc by default',
          'Container runtimes are layered: high-level runtimes (Docker Engine, Podman) handle image management, networking, and user interface; mid-level runtimes (containerd, CRI-O) manage container lifecycle and image distribution; low-level runtimes (runc, crun, gVisor, Kata Containers) perform the actual container creation using kernel primitives',
          'Overlay filesystems (OverlayFS) enable image layering — each Docker image is a stack of read-only layers, and the container adds a writable layer on top. Copy-on-write semantics mean files are only duplicated when modified, so 100 containers from the same image share all read-only layers and use minimal additional disk space',
          'Alternative runtimes provide different security/performance trade-offs: gVisor (Google) interposes a user-space kernel that intercepts system calls, providing stronger isolation than namespaces alone; Kata Containers run each container in a lightweight VM with its own kernel, combining container UX with VM-level isolation',
        ],
        tradeoffs: [
          'Standard runc containers offer the best performance (native execution, ~0% CPU overhead) but share the host kernel, creating a larger attack surface — sandbox runtimes like gVisor reduce the attack surface but add 5-50% overhead for system-call-heavy workloads',
          'Image layering with OverlayFS enables efficient storage and fast deployment (shared layers are pulled once) but adds I/O overhead for write-heavy workloads (copy-on-write overhead) and complicates image size management (deleted files still exist in lower layers)',
        ],
        realWorld: [
          'Kubernetes uses the CRI (Container Runtime Interface) to support multiple runtimes — containerd (Docker-derived) and CRI-O (Red Hat) are the most common, both using runc as the default low-level runtime',
          'Google Cloud Run and AWS Fargate use gVisor and Firecracker (micro-VM) respectively to provide strong multi-tenant isolation for serverless container workloads',
          'Docker BuildKit uses OverlayFS layers and content-addressable storage — docker build creates efficient layered images where unchanged layers are cached and shared across builds',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find(t => t.id === id);
}
