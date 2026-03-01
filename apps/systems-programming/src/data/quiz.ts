export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ─── Topic 1: System Calls & Kernel Interface ───────────────────────
  {
    id: "t1-q1",
    chapterId: 1,
    question:
      "When a user-space program makes a system call, what actually happens at the CPU level?",
    options: [
      "The kernel spawns a new process to handle the request on behalf of the user program",
      "The CPU switches from ring 3 (user mode) to ring 0 (kernel mode) via a software interrupt/trap instruction",
      "The CPU pauses the current process and context-switches to a dedicated kernel process",
      "The program links against a kernel shared library that runs the operation in user space",
    ],
    answer: 1,
    explanation:
      "A system call triggers a software interrupt (trap) that transitions the CPU from ring 3 (user mode) to ring 0 (kernel mode). This mode switch allows the kernel to execute privileged operations on behalf of the process. The same process continues running, just with elevated privileges in kernel context.",
  },
  {
    id: "t1-q2",
    chapterId: 1,
    question:
      "What is the key difference between calling printf() and calling write() directly?",
    options: [
      "printf() is faster because it bypasses the kernel entirely",
      "write() buffers data in userspace before flushing to the kernel in batches",
      "They are equivalent — printf() is just an alias for write() provided by the compiler",
      "printf() buffers output in a userspace buffer and eventually calls write(), which traps into the kernel",
    ],
    answer: 3,
    explanation:
      "printf() is a C library function that formats output and stores it in a userspace buffer (stdio buffer). It only invokes the write() system call when the buffer is flushed (e.g., on newline for line-buffered streams, or when full). write() immediately traps into the kernel to perform the I/O.",
  },
  {
    id: "t1-q3",
    chapterId: 1,
    question: "What does the strace tool show when attached to a running process?",
    options: [
      "System calls made by the process, traced using the ptrace mechanism",
      "All function calls within the application, including internal library calls",
      "The assembly instructions being executed by the CPU",
      "Network packets sent and received by the process",
    ],
    answer: 0,
    explanation:
      "strace intercepts and records system calls made by a process using the ptrace system call. It shows each syscall name, arguments, and return value. It does not trace internal function calls or library calls — only the boundary between user space and kernel space.",
  },

  // ─── Topic 2: Process Creation & Lifecycle ──────────────────────────
  {
    id: "t2-q1",
    chapterId: 2,
    question: "What does fork() return to the parent and child processes?",
    options: [
      "It returns 1 to the parent and 0 to the child",
      "It returns the parent PID to both processes",
      "It returns 0 to the child, the child's PID to the parent, and -1 on error",
      "It returns the child's PID to both processes so they can communicate",
    ],
    answer: 2,
    explanation:
      "fork() returns 0 to the newly created child process, the child's PID (a positive integer) to the parent process, and -1 if the fork fails. This asymmetric return value is how each process determines whether it is the parent or the child after the fork.",
  },
  {
    id: "t2-q2",
    chapterId: 2,
    question: "What exactly is a zombie process?",
    options: [
      "A process that is stuck in an infinite loop consuming CPU",
      "A process that has exited but whose parent has not yet called wait() to collect its status",
      "A process that has lost its parent and is adopted by init",
      "A process that has been killed by the OOM killer but remains in the process table",
    ],
    answer: 1,
    explanation:
      "A zombie process has finished execution but still occupies an entry in the process table because its parent has not called wait() or waitpid() to retrieve its exit status. The kernel retains this entry so the parent can eventually collect the termination information. Zombies consume no CPU or memory, but they do consume a process table slot.",
  },
  {
    id: "t2-q3",
    chapterId: 2,
    question:
      "What happens to the calling process when exec() (e.g., execvp) is invoked?",
    options: [
      "A new child process is created to run the specified program",
      "The process forks first, then the child loads the new program",
      "The new program is loaded into a shared memory segment alongside the existing code",
      "The entire process image (code, data, heap, stack) is replaced with the new program",
    ],
    answer: 3,
    explanation:
      "exec() replaces the entire process image — including code, data, heap, and stack — with a new program. The PID remains the same, but everything else about the process is overwritten. If exec() succeeds, it never returns; if it fails, it returns -1 and the original program continues.",
  },

  // ─── Topic 3: Memory Layout & Allocation ────────────────────────────
  {
    id: "t3-q1",
    chapterId: 3,
    question:
      "In a typical process memory layout, which direction do the heap and stack grow?",
    options: [
      "The heap grows toward higher addresses; the stack grows toward lower addresses",
      "Both grow toward higher addresses from opposite ends of memory",
      "The heap grows toward lower addresses; the stack grows toward higher addresses",
      "Both grow toward the center of the address space from the same starting point",
    ],
    answer: 0,
    explanation:
      "In the conventional memory layout, the heap starts after the BSS/data segments and grows upward toward higher addresses. The stack starts at a high address and grows downward toward lower addresses. They grow toward each other, with a large unmapped gap between them.",
  },
  {
    id: "t3-q2",
    chapterId: 3,
    question:
      "When you call free() on a previously allocated pointer, what happens to the memory?",
    options: [
      "The memory is immediately returned to the operating system and unmapped from the process",
      "The memory is zeroed out for security and then returned to the OS",
      "The memory remains allocated until the process exits, and free() is just a hint",
      "The memory is returned to the allocator's internal free list, not necessarily back to the OS",
    ],
    answer: 3,
    explanation:
      "free() returns the memory block to the C library allocator's internal free list, making it available for future malloc() calls within the same process. The allocator typically does not return small blocks to the OS because the overhead of system calls (like brk/munmap) would be too high. Only large allocations (often mmap-based) may be unmapped immediately.",
  },
  {
    id: "t3-q3",
    chapterId: 3,
    question: "Which of the following does Valgrind's memcheck tool detect?",
    options: [
      "Only memory leaks — it cannot detect use-after-free or buffer overflows",
      "Only stack-based buffer overflows and stack smashing attacks",
      "Memory leaks, use-after-free, reads of uninitialized memory, and buffer overflows",
      "Thread synchronization errors like data races and deadlocks",
    ],
    answer: 2,
    explanation:
      "Valgrind memcheck is a comprehensive memory error detector that catches memory leaks, use-after-free bugs, reads of uninitialized memory, heap buffer overflows, double frees, and mismatched alloc/dealloc calls. It works via binary translation (dynamic instrumentation), running the program on a synthetic CPU. Thread errors are handled by a separate tool called Helgrind.",
  },

  // ─── Topic 4: Pointers & Low-Level Memory ──────────────────────────
  {
    id: "t4-q1",
    chapterId: 4,
    question:
      "If int *p points to address 0x1000 on a system where sizeof(int) is 4 bytes, what is the value of p + 3?",
    options: [
      "0x1003 — pointer arithmetic adds the literal value 3",
      "0x100C — pointer arithmetic adds 3 * sizeof(int) = 12 bytes",
      "0x1006 — the compiler adds 3 * 2 bytes for word alignment",
      "0x1030 — the compiler multiplies by 16 for cache line alignment",
    ],
    answer: 1,
    explanation:
      "Pointer arithmetic in C scales by the size of the pointed-to type. Since sizeof(int) is 4 bytes, p + 3 advances by 3 * 4 = 12 bytes, resulting in address 0x100C. This is why pointer arithmetic is type-aware: it ensures you always land on a valid element boundary in an array.",
  },
  {
    id: "t4-q2",
    chapterId: 4,
    question: "What is a function pointer primarily used for in C?",
    options: [
      "Declaring functions that return pointers to dynamically allocated memory",
      "Preventing stack overflow by allocating function frames on the heap",
      "Allowing functions to modify their own code at runtime for optimization",
      "Storing a reference to a function that can be called indirectly, enabling callbacks and dispatch tables",
    ],
    answer: 3,
    explanation:
      "A function pointer holds the address of a function, allowing it to be called indirectly through the pointer. This is the foundation of callback mechanisms, dispatch tables, plugin architectures, and polymorphism in C. For example, qsort() takes a comparison function pointer to customize sorting behavior.",
  },
  {
    id: "t4-q3",
    chapterId: 4,
    question:
      "Why do C compilers insert padding bytes into structs?",
    options: [
      "To ensure struct members are naturally aligned for efficient CPU access and to avoid hardware penalties",
      "To make structs a power-of-two size for faster memory allocation",
      "To add space for runtime type information used by the debugger",
      "To reserve space for future fields that might be added in later versions",
    ],
    answer: 0,
    explanation:
      "Compilers add padding bytes between struct members to ensure each member falls on its natural alignment boundary (e.g., a 4-byte int starts at a 4-byte-aligned address). Misaligned access can cause performance penalties on most architectures or even hardware faults on some. The overall struct size is also padded to a multiple of its largest member's alignment.",
  },

  // ─── Topic 5: Threads & Thread Programming ─────────────────────────
  {
    id: "t5-q1",
    chapterId: 5,
    question:
      "What is the key difference between threads and processes in terms of memory?",
    options: [
      "Threads each get their own virtual address space, just like processes",
      "Threads share everything including their stacks, which is why they are lightweight",
      "Threads share the same address space (heap, global variables) but each has its own stack",
      "Threads use a copy-on-write mechanism identical to fork() for memory isolation",
    ],
    answer: 2,
    explanation:
      "Threads within the same process share the heap, global/static variables, file descriptors, and code segments. However, each thread has its own stack and set of registers (including its own program counter). This shared address space is what makes threads lighter-weight than processes but also what makes synchronization necessary.",
  },
  {
    id: "t5-q2",
    chapterId: 5,
    question: "What does pthread_detach() do to a thread?",
    options: [
      "It marks the thread so its resources are automatically reclaimed on exit without needing pthread_join()",
      "It kills the thread immediately and frees all its resources",
      "It moves the thread to a different process for load balancing",
      "It pauses the thread until another thread calls pthread_resume()",
    ],
    answer: 0,
    explanation:
      "pthread_detach() tells the system that no other thread will call pthread_join() on this thread. When a detached thread finishes execution, its resources (stack, thread descriptor) are automatically reclaimed by the system. Without detaching or joining, a finished thread's resources remain allocated, similar to a zombie process.",
  },
  {
    id: "t5-q3",
    chapterId: 5,
    question:
      "How should you size a thread pool differently for CPU-bound versus I/O-bound workloads?",
    options: [
      "Both should use exactly one thread per CPU core for maximum performance",
      "CPU-bound pools should roughly match the number of cores; I/O-bound pools can be much larger since threads spend time waiting",
      "CPU-bound pools should be very large; I/O-bound pools should match the number of cores",
      "Thread pool size does not matter because the OS scheduler handles all optimization automatically",
    ],
    answer: 1,
    explanation:
      "For CPU-bound tasks, having more threads than cores causes unnecessary context switching, so the pool size should approximate the number of CPU cores. For I/O-bound tasks, threads spend significant time blocked on I/O operations, so a larger pool keeps the CPU busy while other threads wait. A common heuristic for I/O-bound work is cores * (1 + wait_time/compute_time).",
  },

  // ─── Topic 6: Synchronization Primitives ────────────────────────────
  {
    id: "t6-q1",
    chapterId: 6,
    question:
      "Why should you check a condition variable with a while loop instead of an if statement?",
    options: [
      "Because the compiler may optimize away the if statement in release builds",
      "Because while loops are faster than if statements for synchronization checks",
      "Because if statements do not properly release the mutex during the wait",
      "Because of spurious wakeups — the thread may be woken even when the condition is not actually true",
    ],
    answer: 3,
    explanation:
      "POSIX allows condition variable waits to return even when no signal was sent (spurious wakeups). Additionally, between the signal and the woken thread re-acquiring the mutex, another thread may have changed the condition. Using a while loop ensures the predicate is re-checked after every wakeup, guaranteeing correctness regardless of spurious wakeups or races.",
  },
  {
    id: "t6-q2",
    chapterId: 6,
    question: "What is the fundamental difference between a mutex and a semaphore?",
    options: [
      "A mutex can be locked by multiple threads; a semaphore is always binary",
      "A semaphore is just a mutex that works across different processes",
      "A mutex is a binary lock with ownership (only the locker can unlock); a semaphore is a counter that any thread can signal",
      "There is no real difference — semaphore is just the POSIX name for mutex",
    ],
    answer: 2,
    explanation:
      "A mutex provides mutual exclusion with ownership semantics: only the thread that locked it can unlock it. A semaphore maintains a counter and supports wait (decrement) and signal (increment) operations from any thread. Semaphores can be used for signaling between threads or limiting concurrent access to a resource pool, whereas mutexes strictly protect critical sections.",
  },
  {
    id: "t6-q3",
    chapterId: 6,
    question: "What does a compare-and-swap (CAS) operation do?",
    options: [
      "It locks a mutex, swaps two values, then unlocks the mutex",
      "It atomically compares a memory location to an expected value and swaps in a new value only if they match",
      "It copies a value to a register, compares it with another register, and swaps if the CPU is idle",
      "It swaps two memory locations and returns whether they were equal before the swap",
    ],
    answer: 1,
    explanation:
      "CAS atomically reads a memory location, compares it to an expected value, and writes a new value only if the comparison succeeds — all as a single indivisible hardware operation. If the comparison fails, the memory is left unchanged and the caller typically retries. CAS is the foundation of most lock-free data structures and algorithms.",
  },

  // ─── Topic 7: Concurrency Pitfalls & Patterns ──────────────────────
  {
    id: "t7-q1",
    chapterId: 7,
    question:
      "Which set of conditions must ALL hold simultaneously for a deadlock to occur (Coffman conditions)?",
    options: [
      "Starvation, livelock, priority inversion, and resource exhaustion",
      "Race condition, data corruption, busy waiting, and thread starvation",
      "Mutual exclusion, hold-and-wait, no preemption, and circular wait",
      "Lock contention, context switching overhead, cache thrashing, and memory exhaustion",
    ],
    answer: 2,
    explanation:
      "The four Coffman conditions for deadlock are: (1) mutual exclusion — resources cannot be shared, (2) hold-and-wait — a thread holds resources while waiting for others, (3) no preemption — resources cannot be forcibly taken away, and (4) circular wait — a circular chain of threads each waits for a resource held by the next. Eliminating any one condition prevents deadlock.",
  },
  {
    id: "t7-q2",
    chapterId: 7,
    question: "What is the difference between a race condition and a data race?",
    options: [
      "They are the same thing — different terms for unsynchronized concurrent access",
      "A race condition only occurs with more than two threads; a data race can occur with just two",
      "A race condition involves CPU cache coherency issues; a data race involves incorrect lock ordering",
      "A data race is a specific case of unsynchronized concurrent memory access where at least one operation is a write; a race condition is a broader logic bug where correctness depends on timing",
    ],
    answer: 3,
    explanation:
      "A data race is a precisely defined condition: two or more threads access the same memory location concurrently with at least one write, and no synchronization orders the accesses. A race condition is a broader concept where program correctness depends on the relative timing of operations. You can have race conditions without data races (e.g., check-then-act with proper locking but wrong logic) and data races without observable race conditions.",
  },
  {
    id: "t7-q3",
    chapterId: 7,
    question: "What is priority inversion?",
    options: [
      "When a high-priority task is blocked waiting for a lock held by a low-priority task, which is itself preempted by medium-priority tasks",
      "When the OS scheduler reverses the priority of all threads to ensure fairness",
      "When a high-priority task starves because it keeps yielding to lower-priority tasks voluntarily",
      "When two threads of equal priority alternate execution and neither makes progress",
    ],
    answer: 0,
    explanation:
      "Priority inversion occurs when a high-priority task blocks on a lock held by a low-priority task. If medium-priority tasks preempt the low-priority task, the high-priority task is effectively stuck behind medium-priority work. Solutions include priority inheritance (temporarily boosting the low-priority holder) and priority ceiling protocols. This bug famously caused issues on the Mars Pathfinder mission.",
  },

  // ─── Topic 8: File I/O & Descriptors ────────────────────────────────
  {
    id: "t8-q1",
    chapterId: 8,
    question:
      "In Unix, what do file descriptors 0, 1, and 2 conventionally represent?",
    options: [
      "The root directory, the current directory, and the parent directory",
      "The program binary, the shared library loader, and the configuration file",
      "Read-only mode, write-only mode, and read-write mode",
      "stdin (standard input), stdout (standard output), and stderr (standard error)",
    ],
    answer: 3,
    explanation:
      "By convention, every Unix process starts with three open file descriptors: 0 for standard input (stdin), 1 for standard output (stdout), and 2 for standard error (stderr). These are inherited from the parent process, and shells use this convention for I/O redirection (e.g., 2>/dev/null redirects stderr).",
  },
  {
    id: "t8-q2",
    chapterId: 8,
    question:
      "Why might printf() output appear duplicated after a fork() call?",
    options: [
      "The stdio buffer has not been flushed before fork(), so both parent and child flush the same buffered content",
      "fork() copies the printf function itself, causing it to execute twice",
      "The child process re-executes all code from the beginning of main()",
      "The kernel intentionally duplicates output to ensure it is not lost during the fork",
    ],
    answer: 0,
    explanation:
      "printf() writes to a userspace stdio buffer, not directly to the file descriptor. When fork() is called, the child gets a copy of the entire process, including the unflushed buffer. Both parent and child then independently flush their copy of the buffer, resulting in duplicated output. The fix is to call fflush(stdout) before fork().",
  },
  {
    id: "t8-q3",
    chapterId: 8,
    question: "What is the main advantage of using mmap() for file access instead of read()/write()?",
    options: [
      "mmap() encrypts the file contents in memory for security",
      "mmap() avoids explicit read/write system calls by mapping the file directly into virtual memory, with the kernel handling paging transparently",
      "mmap() is the only way to access files larger than 2 GB",
      "mmap() automatically compresses the file to reduce memory usage",
    ],
    answer: 1,
    explanation:
      "mmap() maps a file (or portion of it) directly into the process's virtual address space. Accessing the mapped region triggers page faults that the kernel handles by loading data from disk. This avoids the overhead of explicit read()/write() system calls and eliminates copying data between kernel and user buffers. It is particularly beneficial for random access patterns on large files.",
  },

  // ─── Topic 9: Inter-Process Communication ───────────────────────────
  {
    id: "t9-q1",
    chapterId: 9,
    question:
      "What happens when a process writes to a pipe that has no remaining readers?",
    options: [
      "The data is silently discarded and the write returns success",
      "The write blocks indefinitely until a reader opens the pipe",
      "The kernel sends SIGPIPE to the writing process, which by default terminates it",
      "The kernel stores the data in a temporary file until a reader connects",
    ],
    answer: 2,
    explanation:
      "When all read ends of a pipe are closed and a process attempts to write, the kernel delivers a SIGPIPE signal to the writer. The default action for SIGPIPE is to terminate the process. Programs that need to handle this gracefully (like network servers) can ignore SIGPIPE and instead check for the EPIPE error returned by write().",
  },
  {
    id: "t9-q2",
    chapterId: 9,
    question: "Why is shared memory considered the fastest IPC mechanism?",
    options: [
      "Because it uses dedicated high-speed hardware channels for inter-process data transfer",
      "Because data is directly accessible in both processes' address spaces with no kernel involvement for data transfer — only setup requires syscalls",
      "Because the kernel compresses the data before transferring it between processes",
      "Because it uses UDP sockets internally, which are faster than TCP",
    ],
    answer: 1,
    explanation:
      "Shared memory maps the same physical memory pages into the virtual address spaces of multiple processes. After the initial setup (shmget/shmat or mmap), processes can read and write the shared region without any system calls for data transfer. Other IPC mechanisms like pipes and message queues require copying data through the kernel, adding overhead for each transfer.",
  },
  {
    id: "t9-q3",
    chapterId: 9,
    question:
      "Why must signal handlers only call async-signal-safe functions?",
    options: [
      "Because async-signal-safe functions are the only ones that work in kernel mode",
      "Because signal handlers run in a separate thread that has limited library access",
      "Because signals can interrupt any code — including functions like malloc or printf that hold internal locks — and calling them again from the handler would cause deadlock or corruption",
      "Because the C standard requires all signal handlers to be written in assembly language",
    ],
    answer: 2,
    explanation:
      "A signal can arrive at any point during execution, including in the middle of a non-reentrant function like malloc() that holds an internal lock. If the signal handler calls malloc() again, it will attempt to acquire the same lock, causing a deadlock or heap corruption. Async-signal-safe functions (like write(), _exit()) are guaranteed to be safe to call from signal handlers because they do not use internal locks or global state.",
  },

  // ─── Topic 10: Network Socket Programming ──────────────────────────
  {
    id: "t10-q1",
    chapterId: 10,
    question:
      "What is the correct order of socket API calls for setting up a TCP server?",
    options: [
      "bind -> socket -> accept -> listen",
      "socket -> listen -> bind -> accept",
      "socket -> accept -> bind -> listen",
      "socket -> bind -> listen -> accept",
    ],
    answer: 3,
    explanation:
      "A TCP server first creates a socket with socket(), then binds it to an address/port with bind(), marks it as a passive listening socket with listen(), and finally accepts incoming connections with accept(). Each step is required in this order: you cannot listen on an unbound socket, and you cannot accept connections on a socket that is not listening.",
  },
  {
    id: "t10-q2",
    chapterId: 10,
    question:
      "Why might TCP recv() return fewer bytes than you requested?",
    options: [
      "Because some bytes were lost during transmission and TCP does not retransmit them",
      "Because recv() has a maximum single-call limit of 1024 bytes",
      "Because TCP is a byte stream protocol — the kernel may deliver partial data, requiring a loop to receive the full message",
      "Because the sender's write() call was also partial, so the receiver sees the same partial write",
    ],
    answer: 2,
    explanation:
      "TCP provides a reliable byte stream, not a message-oriented protocol. The kernel may deliver data in chunks of any size, regardless of how the sender wrote it. Network conditions, buffer sizes, and timing all affect how data is segmented. Applications must loop on recv() and accumulate bytes until the expected amount is received or the connection closes.",
  },
  {
    id: "t10-q3",
    chapterId: 10,
    question:
      "What is the key advantage of epoll over select for handling many concurrent connections?",
    options: [
      "epoll uses kernel callbacks and is O(1) for returning ready file descriptors, while select scans all monitored fds and is O(n)",
      "epoll works with UDP sockets, while select only works with TCP",
      "epoll supports encrypted connections natively, while select does not",
      "epoll can handle up to 1 million connections, while select is hard-limited to 100",
    ],
    answer: 0,
    explanation:
      "select() requires the kernel to scan through all monitored file descriptors on every call, making it O(n) where n is the number of fds. epoll uses an event-driven approach with kernel callbacks: when a fd becomes ready, the kernel adds it to a ready list, so epoll_wait() returns only the ready fds in O(1) time. This makes epoll vastly more efficient for servers handling thousands of concurrent connections.",
  },

  // ─── Topic 11: Debugging with GDB & Sanitizers ─────────────────────
  {
    id: "t11-q1",
    chapterId: 11,
    question: "What does the GDB command 'bt' (backtrace) display?",
    options: [
      "All breakpoints currently set in the debugging session",
      "A trace of all memory allocations made since the program started",
      "The chain of function calls (call stack) that led to the current execution point",
      "The binary translation log showing how instructions were interpreted",
    ],
    answer: 2,
    explanation:
      "The bt (backtrace) command in GDB prints the current call stack — a list of stack frames from the current function back to main() (or the thread entry point). Each frame shows the function name, arguments, source file, and line number. This is essential for understanding how execution reached the current point, especially when debugging crashes.",
  },
  {
    id: "t11-q2",
    chapterId: 11,
    question:
      "What is the key advantage of AddressSanitizer (ASan) over Valgrind for memory error detection?",
    options: [
      "ASan can detect memory leaks but Valgrind cannot",
      "ASan runs at roughly 2x slowdown using compile-time instrumentation, while Valgrind incurs 10-50x slowdown via binary translation",
      "ASan works on any binary without recompilation, while Valgrind requires source code",
      "ASan can detect errors in kernel code, while Valgrind is limited to user space",
    ],
    answer: 1,
    explanation:
      "AddressSanitizer uses compile-time instrumentation (adding checks at every memory access during compilation) which results in approximately 2x runtime overhead. Valgrind uses dynamic binary translation, effectively running the program on a simulated CPU, which causes 10-50x slowdown. Both detect similar classes of bugs, but ASan's speed advantage makes it practical to use in development and CI pipelines.",
  },
  {
    id: "t11-q3",
    chapterId: 11,
    question: "What types of bugs does UndefinedBehaviorSanitizer (UBSan) catch?",
    options: [
      "Only null pointer dereferences and nothing else",
      "Memory leaks and file descriptor leaks",
      "Thread synchronization errors like data races and lock order violations",
      "Signed integer overflow, null pointer dereference, misaligned accesses, and other C/C++ undefined behavior",
    ],
    answer: 3,
    explanation:
      "UBSan detects undefined behavior as defined by the C and C++ standards, including signed integer overflow, null pointer dereferences, type punning violations, misaligned pointer accesses, out-of-bounds array indexing, and division by zero. These are bugs that compilers are free to handle in any way, often leading to subtle and hard-to-reproduce issues. UBSan adds minimal runtime overhead compared to other sanitizers.",
  },

  // ─── Topic 12: Shared Libraries & Linking ───────────────────────────
  {
    id: "t12-q1",
    chapterId: 12,
    question:
      "What is the key difference between static linking and dynamic linking?",
    options: [
      "Static linking is only available on Linux; dynamic linking is cross-platform",
      "Static linking embeds all library code directly into the binary; dynamic linking references shared objects loaded at runtime",
      "Dynamic linking produces smaller binaries because it embeds compressed library code",
      "Static linking is slower at compile time but faster at runtime than dynamic linking in all cases",
    ],
    answer: 1,
    explanation:
      "Static linking copies all required library code into the final executable at link time, producing a self-contained but larger binary. Dynamic linking stores only references to shared objects (.so/.dll files) that are loaded by the dynamic linker at runtime. Dynamic linking saves disk space and memory (shared libraries are loaded once and mapped into multiple processes) but adds a runtime dependency on the shared library being present.",
  },
  {
    id: "t12-q2",
    chapterId: 12,
    question: "What does the LD_PRELOAD environment variable do?",
    options: [
      "It preloads data files into memory before the program starts for faster I/O",
      "It sets the search path for header files used during compilation",
      "It specifies which CPU cores the dynamic linker should use for loading libraries",
      "It forces a shared library to be loaded before all others, allowing you to override and intercept function calls like malloc()",
    ],
    answer: 3,
    explanation:
      "LD_PRELOAD instructs the dynamic linker to load the specified shared library before any others, including libc. Functions defined in the preloaded library take precedence over those in later libraries due to symbol resolution order. This is commonly used for debugging (intercepting malloc to track allocations), testing (injecting faults), and profiling without modifying or recompiling the target program.",
  },
  {
    id: "t12-q3",
    chapterId: 12,
    question: "What are dlopen() and dlsym() used for?",
    options: [
      "Opening and reading debug symbol files for GDB",
      "Downloading shared libraries from a remote symbol server",
      "Loading a shared library at runtime and looking up symbols (functions or variables) by name",
      "Creating symbolic links to library files in the filesystem",
    ],
    answer: 2,
    explanation:
      "dlopen() loads a shared library (.so file) into the process at runtime, and dlsym() looks up the address of a symbol (function or global variable) by its string name. Together they enable plugin architectures where code is loaded dynamically based on configuration or user input. This is how applications like web servers, editors, and media players load plugins without being recompiled.",
  },

  // ─── Topic 13: Performance & Profiling ──────────────────────────────
  {
    id: "t13-q1",
    chapterId: 13,
    question: "What does a flamegraph visualize?",
    options: [
      "Memory allocation patterns over time, with flame colors indicating leak severity",
      "Network latency between services, with taller flames meaning higher latency",
      "Aggregated stack traces showing where CPU time is spent, with the width of each frame proportional to time in that function",
      "CPU temperature and thermal throttling events during program execution",
    ],
    answer: 2,
    explanation:
      "A flamegraph aggregates sampled stack traces from a profiler (like perf or DTrace) and displays them as stacked bars. Each bar represents a function in the call stack, and its width is proportional to the number of samples (i.e., time) that function appeared. Wider bars indicate functions consuming more CPU time. The x-axis is sorted alphabetically (not by time), and the y-axis represents call depth.",
  },
  {
    id: "t13-q2",
    chapterId: 13,
    question: "What is false sharing in the context of multi-threaded performance?",
    options: [
      "When threads on different cores modify different variables that share the same cache line, causing unnecessary cache invalidation",
      "When threads incorrectly share a mutex that should be per-thread, reducing parallelism",
      "When the compiler falsely determines that variables are shared and adds unnecessary synchronization",
      "When two threads read the same data but the OS creates unnecessary copies for each thread",
    ],
    answer: 0,
    explanation:
      "False sharing occurs when threads on different CPU cores modify independent variables that happen to reside on the same cache line (typically 64 bytes). Each write invalidates the cache line on other cores, forcing them to re-fetch it from a shared cache level or main memory. This creates a severe performance bottleneck despite there being no logical data sharing. The fix is to pad variables so they occupy separate cache lines.",
  },
  {
    id: "t13-q3",
    chapterId: 13,
    question:
      "What does sendfile() achieve compared to a traditional read() + write() approach for serving files over a network?",
    options: [
      "It compresses the file during transfer to reduce bandwidth usage",
      "Zero-copy file transfer — data moves directly from the file to the socket in kernel space without copying through user-space buffers",
      "It encrypts the file contents automatically using TLS before sending",
      "It sends files using UDP instead of TCP for higher throughput",
    ],
    answer: 1,
    explanation:
      "The traditional approach requires read() to copy file data from kernel buffer to user-space buffer, then write() to copy it back to a kernel socket buffer — two unnecessary copies. sendfile() tells the kernel to transfer data directly from the file page cache to the network socket buffer, eliminating the user-space copies entirely. This reduces CPU usage and memory bandwidth consumption, which is why high-performance web servers like nginx use it extensively.",
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
