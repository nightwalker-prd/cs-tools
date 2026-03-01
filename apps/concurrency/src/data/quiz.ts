export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ──────────────────────────────────────────────
  // Topic 1: Concurrency vs Parallelism
  // ──────────────────────────────────────────────
  {
    id: 't1-q1',
    chapterId: 1,
    question:
      'What is the key difference between concurrency and parallelism?',
    options: [
      'Concurrency is about structure (dealing with many things); parallelism is about execution (doing many things simultaneously)',
      'Concurrency requires multiple cores; parallelism does not',
      'Parallelism is a software concept; concurrency is a hardware concept',
      'They are synonyms used interchangeably in computer science',
    ],
    answer: 0,
    explanation:
      'Concurrency is about structuring a program to handle multiple tasks that can make progress independently, while parallelism is about physically executing multiple tasks at the same instant on multiple processors. A concurrent program can run on a single core via time-slicing.',
  },
  {
    id: 't1-q2',
    chapterId: 1,
    question:
      "According to Amdahl's Law, if 20% of a program is inherently sequential, what is the maximum speedup with infinite processors?",
    options: ['4x', '10x', '20x', '5x'],
    answer: 3,
    explanation:
      "Amdahl's Law states that the maximum speedup is 1/s, where s is the sequential fraction. With s = 0.20, the maximum speedup is 1/0.20 = 5x, regardless of how many processors are used.",
  },
  {
    id: 't1-q3',
    chapterId: 1,
    question:
      'Which of the following is an example of a system that is concurrent but NOT parallel?',
    options: [
      'A GPU rendering millions of pixels simultaneously',
      'A single-threaded Node.js event loop handling thousands of I/O requests',
      'A SIMD instruction processing 8 floats at once',
      'Two threads running on two separate CPU cores',
    ],
    answer: 1,
    explanation:
      'A single-threaded Node.js event loop handles many I/O tasks concurrently by interleaving them, but since there is only one thread, no two tasks execute at the same physical instant. This is concurrency without parallelism.',
  },

  // ──────────────────────────────────────────────
  // Topic 2: Thread Models & Green Threads
  // ──────────────────────────────────────────────
  {
    id: 't2-q1',
    chapterId: 2,
    question:
      'What is the primary disadvantage of kernel (OS) threads compared to green threads?',
    options: [
      'Kernel threads cannot achieve true parallelism',
      'Kernel threads are cooperatively scheduled',
      'Kernel threads have high memory overhead per thread and expensive context switches',
      'Kernel threads are not supported on modern operating systems',
    ],
    answer: 2,
    explanation:
      'Kernel threads typically consume 1-8 MB of stack memory each and require a kernel-level context switch costing 1-10 microseconds. This makes it impractical to create millions of them, unlike green threads which use only 2-8 KB of stack.',
  },
  {
    id: 't2-q2',
    chapterId: 2,
    question:
      'In the M:N threading model, what does "M:N" refer to?',
    options: [
      'M messages sent to N receivers',
      'M user-space threads mapped onto N kernel threads',
      'M mutexes protecting N shared variables',
      'M memory pages shared across N processes',
    ],
    answer: 1,
    explanation:
      'The M:N model maps M user-space (green) threads onto N kernel threads, where M is typically much larger than N. This combines the scalability of green threads (millions of M) with the parallelism of kernel threads (N matches core count).',
  },
  {
    id: 't2-q3',
    chapterId: 2,
    question:
      'What problem can occur with cooperatively scheduled green threads?',
    options: [
      'They always use more memory than kernel threads',
      'They require hardware support not available on modern CPUs',
      'They cannot perform any I/O operations',
      'A green thread that never yields can starve all other green threads on the same OS thread',
    ],
    answer: 3,
    explanation:
      'Cooperative scheduling relies on green threads voluntarily yielding control. If a green thread enters an infinite CPU loop without yielding, no other green thread on the same OS thread can make progress, causing starvation.',
  },

  // ──────────────────────────────────────────────
  // Topic 3: Shared Memory & Race Conditions
  // ──────────────────────────────────────────────
  {
    id: 't3-q1',
    chapterId: 3,
    question: 'What is "false sharing" in the context of shared memory?',
    options: [
      'Two threads modifying different variables that reside on the same cache line, causing unnecessary cache invalidation',
      'Two threads accidentally sharing a pointer to the same object',
      'A thread reading stale data from a shared variable',
      'A thread writing to another thread\'s stack memory',
    ],
    answer: 0,
    explanation:
      'False sharing occurs when threads modify independent variables that happen to be on the same cache line (typically 64 bytes). The cache coherence protocol invalidates the entire line on each write, causing expensive cache misses even though the threads are not logically sharing data.',
  },
  {
    id: 't3-q2',
    chapterId: 3,
    question:
      'What is the precise definition of a data race?',
    options: [
      'Any bug that depends on timing in a concurrent program',
      'A situation where two threads try to acquire the same lock simultaneously',
      'Two or more threads accessing the same memory location concurrently where at least one writes, with no synchronization ordering the accesses',
      'When a thread reads a variable before another thread has finished writing to it, but both use proper synchronization',
    ],
    answer: 2,
    explanation:
      'A data race specifically requires: (1) two or more threads access the same memory location, (2) at least one access is a write, and (3) the accesses are not ordered by any synchronization mechanism. This is narrower than the general concept of a race condition.',
  },
  {
    id: 't3-q3',
    chapterId: 3,
    question:
      'Why does a coarse-grained locking strategy limit concurrency?',
    options: [
      'Coarse-grained locks consume more memory than fine-grained locks',
      'A single big lock serializes all threads, even those accessing unrelated data, creating a bottleneck',
      'Coarse-grained locks are incompatible with modern CPUs',
      'Coarse-grained locks always cause deadlock',
    ],
    answer: 1,
    explanation:
      'A coarse-grained lock (e.g., one lock for an entire data structure) forces all threads to wait for the lock even if they access different, independent parts of the data. This serializes access and eliminates the benefit of having multiple threads.',
  },

  // ──────────────────────────────────────────────
  // Topic 4: Locks, Mutexes & Semaphores
  // ──────────────────────────────────────────────
  {
    id: 't4-q1',
    chapterId: 4,
    question: 'When are spinlocks preferred over mutexes?',
    options: [
      'When the program runs on a single-core system',
      'When the critical section is long-running',
      'When the expected wait time is very short, less than the cost of a context switch',
      'When the critical section involves I/O operations',
    ],
    answer: 2,
    explanation:
      'Spinlocks busy-wait in a tight loop, avoiding the overhead of putting a thread to sleep and waking it up (which involves system calls). This makes them faster when the lock is held for only a few instructions, which is less than the context switch cost.',
  },
  {
    id: 't4-q2',
    chapterId: 4,
    question:
      'What advantage do reader-writer locks provide over simple mutexes?',
    options: [
      'They prevent deadlock automatically',
      'They are always faster than mutexes',
      'They eliminate the need for condition variables',
      'They allow multiple threads to read concurrently while still providing exclusive write access',
    ],
    answer: 3,
    explanation:
      'Reader-writer locks distinguish between read and write access. Multiple readers can hold the lock simultaneously since reads do not modify data, while writers get exclusive access. This improves throughput for read-dominated workloads.',
  },
  {
    id: 't4-q3',
    chapterId: 4,
    question:
      'How does a counting semaphore differ from a binary semaphore?',
    options: [
      'A counting semaphore allows up to N threads to access a resource concurrently, while a binary semaphore allows only one',
      'A counting semaphore can only be used between processes, not threads',
      'A binary semaphore allows N threads while a counting semaphore allows only one',
      'There is no difference; they are the same primitive',
    ],
    answer: 0,
    explanation:
      'A counting semaphore maintains an integer N: up to N threads can acquire it concurrently. A binary semaphore (N=1) allows only one thread at a time, similar to a mutex but without ownership semantics.',
  },

  // ──────────────────────────────────────────────
  // Topic 5: Lock-Free & Wait-Free Algorithms
  // ──────────────────────────────────────────────
  {
    id: 't5-q1',
    chapterId: 5,
    question: 'What is the ABA problem in CAS-based algorithms?',
    options: [
      'CAS instructions consuming too much CPU power on ARM processors',
      'A thread reads value A, another changes it to B then back to A, causing CAS to succeed incorrectly because it sees the expected value A',
      'A deadlock that occurs when three threads attempt CAS simultaneously',
      'A memory leak caused by failed CAS operations not freeing allocated memory',
    ],
    answer: 1,
    explanation:
      'The ABA problem occurs when a thread reads value A, is preempted, another thread changes the value to B and back to A, and the first thread\'s CAS succeeds because it still sees A, even though the underlying state may have changed. Solutions include tagged pointers and hazard pointers.',
  },
  {
    id: 't5-q2',
    chapterId: 5,
    question:
      'What is the difference between lock-free and wait-free algorithms?',
    options: [
      'Lock-free algorithms use no synchronization; wait-free algorithms use locks',
      'Wait-free algorithms are slower; lock-free algorithms are faster',
      'There is no practical difference between the two',
      'Lock-free guarantees some thread makes progress; wait-free guarantees every thread makes progress in bounded steps',
    ],
    answer: 3,
    explanation:
      'Lock-free guarantees system-wide progress: at least one thread always makes progress in a finite number of steps. Wait-free is strictly stronger: every individual thread completes its operation in a bounded number of steps, regardless of other threads.',
  },
  {
    id: 't5-q3',
    chapterId: 5,
    question:
      'Why is memory reclamation a challenge for lock-free data structures?',
    options: [
      'Lock-free algorithms use more memory than lock-based ones by design',
      'When a node is removed, other threads may still hold references to it, making it unsafe to immediately free the memory',
      'Operating systems do not support freeing memory in lock-free contexts',
      'CAS operations prevent the memory allocator from functioning correctly',
    ],
    answer: 1,
    explanation:
      'In lock-free structures, after a node is logically removed, other threads might still be reading it. Freeing the memory immediately would cause use-after-free bugs. Solutions like epoch-based reclamation, hazard pointers, and RCU delay freeing until it is safe.',
  },

  // ──────────────────────────────────────────────
  // Topic 6: Memory Models & Ordering
  // ──────────────────────────────────────────────
  {
    id: 't6-q1',
    chapterId: 6,
    question:
      'Why might a concurrent program that works correctly on x86 fail on ARM?',
    options: [
      'ARM does not support multi-threading',
      'ARM processors run at lower clock speeds',
      'ARM has a weaker memory model that allows more aggressive reordering of loads and stores, exposing ordering bugs masked by x86\'s stronger model',
      'ARM does not have cache coherence protocols',
    ],
    answer: 2,
    explanation:
      'x86 has Total Store Order (TSO), a relatively strong model where stores are seen in program order. ARM has a weaker model allowing both loads and stores to be reordered. Code relying on x86\'s implicit ordering may break on ARM without explicit memory barriers.',
  },
  {
    id: 't6-q2',
    chapterId: 6,
    question:
      'What does sequential consistency (seq_cst) guarantee?',
    options: [
      'All threads observe all operations in a single total order consistent with each thread\'s program order',
      'Operations execute faster than with other orderings',
      'Only loads are ordered; stores can be reordered freely',
      'Only operations within the same thread are ordered',
    ],
    answer: 0,
    explanation:
      'Sequential consistency is the strongest memory ordering: it guarantees that the result of execution is as if all operations from all threads were interleaved in some single total order, and each thread\'s operations appear in program order within that total order.',
  },
  {
    id: 't6-q3',
    chapterId: 6,
    question:
      'What does the Data-Race-Freedom (DRF) guarantee provide?',
    options: [
      'It guarantees that programs never have bugs',
      'It means the compiler will automatically fix data races',
      'It prevents all race conditions including higher-level logical races',
      'If all shared accesses are ordered by happens-before, the program behaves as if sequentially consistent',
    ],
    answer: 3,
    explanation:
      'The DRF guarantee states that a program with no data races (all concurrent accesses to shared memory are properly synchronized with happens-before relationships) will execute as if sequentially consistent, greatly simplifying reasoning about correctness.',
  },

  // ──────────────────────────────────────────────
  // Topic 7: Producer-Consumer & Channels
  // ──────────────────────────────────────────────
  {
    id: 't7-q1',
    chapterId: 7,
    question:
      'What is the primary benefit of using a bounded buffer in the producer-consumer pattern?',
    options: [
      'It makes producers run faster',
      'It provides backpressure, preventing producers from overwhelming consumers and causing unbounded memory growth',
      'It eliminates the need for synchronization',
      'It guarantees FIFO ordering of messages',
    ],
    answer: 1,
    explanation:
      'A bounded buffer has a fixed capacity. When full, producers must block or slow down, naturally throttling the system to the consumer\'s processing rate. This prevents unbounded memory growth that would occur if producers continuously outpaced consumers.',
  },
  {
    id: 't7-q2',
    chapterId: 7,
    question:
      'What distinguishes an unbuffered (rendezvous) channel from a buffered channel?',
    options: [
      'Unbuffered channels can only send integers',
      'Buffered channels do not support multiple senders',
      'In an unbuffered channel, the sender blocks until the receiver is ready, making every send a synchronization point',
      'Unbuffered channels are always faster than buffered channels',
    ],
    answer: 2,
    explanation:
      'An unbuffered channel requires the sender and receiver to meet (rendezvous): the sender blocks until a receiver calls receive, and vice versa. This ensures tight synchronization but limits throughput compared to buffered channels.',
  },
  {
    id: 't7-q3',
    chapterId: 7,
    question:
      'What is the "colored function" problem related to in the context of channels and async patterns?',
    options: [
      'Async functions can only be awaited from other async functions, creating a viral split between sync and async code',
      'A race condition specific to channel-based communication',
      'Functions that process colored output terminal codes',
      'A deadlock pattern in producer-consumer systems',
    ],
    answer: 0,
    explanation:
      'The colored function problem refers to how async/await creates two "colors" of functions: async and sync. Async functions can only be called (awaited) from other async functions, forcing async to propagate throughout the codebase and splitting APIs into two worlds.',
  },

  // ──────────────────────────────────────────────
  // Topic 8: Actor Model & Message Passing
  // ──────────────────────────────────────────────
  {
    id: 't8-q1',
    chapterId: 8,
    question:
      'What are the three fundamental capabilities of an actor in the actor model?',
    options: [
      'Lock resources, unlock resources, and wait for signals',
      'Send messages to other actors, create new actors, and update its own private state',
      'Read memory, write memory, and execute instructions',
      'Map data, reduce data, and filter data',
    ],
    answer: 1,
    explanation:
      'In the actor model, each actor can: (1) send messages to other actors it knows, (2) create new actors, and (3) designate how to handle the next message (update its private state). Crucially, actors do not share mutable state.',
  },
  {
    id: 't8-q2',
    chapterId: 8,
    question:
      'Why is exactly-once message delivery impossible to guarantee in a distributed system?',
    options: [
      'Network hardware always duplicates packets',
      'Exactly-once delivery requires infinite memory',
      'The Two Generals Problem proves that no protocol can guarantee both delivery and non-duplication in the presence of unreliable communication',
      'Modern networking protocols do not support message acknowledgments',
    ],
    answer: 2,
    explanation:
      'The Two Generals Problem (and the related impossibility result) shows that in a system with unreliable communication, you cannot guarantee that a message is delivered exactly once. Systems approximate it using at-least-once delivery with idempotent receivers and deduplication.',
  },
  {
    id: 't8-q3',
    chapterId: 8,
    question:
      'What is the "let it crash" philosophy in actor-based systems?',
    options: [
      'Actors should intentionally crash to test system resilience',
      'Errors should be ignored so the system keeps running',
      'The entire system should crash and restart when any error occurs',
      'Actors should fail fast on errors rather than trying to recover internally, relying on supervisors to handle recovery',
    ],
    answer: 3,
    explanation:
      'The "let it crash" philosophy, pioneered by Erlang, encourages actors to crash on errors rather than adding complex error recovery logic. A supervisor actor monitors children and applies a restart strategy, leading to simpler, more reliable code.',
  },

  // ──────────────────────────────────────────────
  // Topic 9: Async/Await & Event Loops
  // ──────────────────────────────────────────────
  {
    id: 't9-q1',
    chapterId: 9,
    question:
      'How does an event loop achieve concurrency without multiple threads?',
    options: [
      'By using SIMD instructions to process events in parallel',
      'By polling each file descriptor individually in sequence',
      'By duplicating the process using fork() for each event',
      'By using I/O multiplexing (epoll/kqueue) to wait on many I/O sources and dispatching callbacks for ready events in a single-threaded loop',
    ],
    answer: 3,
    explanation:
      'Event loops use I/O multiplexing system calls (epoll on Linux, kqueue on macOS) to efficiently wait for readiness on thousands of file descriptors. When any are ready, the loop dispatches their callbacks sequentially on a single thread.',
  },
  {
    id: 't9-q2',
    chapterId: 9,
    question:
      'What does the compiler transform an async function into under the hood?',
    options: [
      'A state machine where each await point is a state transition, with local variables captured in a struct',
      'A separate OS thread for each async function',
      'A callback function that is passed to the event loop',
      'A coroutine that runs on the GPU',
    ],
    answer: 0,
    explanation:
      'The compiler transforms async functions into state machines. Each await point becomes a state transition, and the function\'s local variables are stored in a struct so they persist across suspensions and resumptions.',
  },
  {
    id: 't9-q3',
    chapterId: 9,
    question:
      'What problem does structured concurrency solve?',
    options: [
      'It prevents all types of deadlocks',
      'It automatically parallelizes sequential code',
      'It ensures concurrent tasks are scoped to a lexical block, guaranteeing all child tasks complete before the parent continues and preventing resource leaks',
      'It eliminates the need for async/await syntax',
    ],
    answer: 2,
    explanation:
      'Structured concurrency ensures every spawned task has a clear owner and lifetime. When a scope exits, all child tasks are awaited or cancelled, preventing orphaned tasks, resource leaks, and unhandled errors from "fire and forget" concurrency.',
  },

  // ──────────────────────────────────────────────
  // Topic 10: Parallel Algorithms & MapReduce
  // ──────────────────────────────────────────────
  {
    id: 't10-q1',
    chapterId: 10,
    question:
      'What is a "work-efficient" parallel algorithm?',
    options: [
      'An algorithm whose total work (time x processors) matches the optimal sequential algorithm',
      'An algorithm that uses the fewest possible threads',
      'An algorithm that completes in O(1) time regardless of input size',
      'An algorithm that minimizes memory usage',
    ],
    answer: 0,
    explanation:
      'A parallel algorithm is work-efficient if its total computational work (wall-clock time multiplied by number of processors) equals the work of the best sequential algorithm. Extra work reduces the effective speedup achievable through parallelism.',
  },
  {
    id: 't10-q2',
    chapterId: 10,
    question:
      'Why did Apache Spark largely replace Hadoop MapReduce for iterative workloads?',
    options: [
      'Spark uses a simpler programming model',
      'Hadoop MapReduce cannot run on clusters',
      'Spark keeps intermediate data in memory instead of writing to disk between iterations, achieving 10-100x speedup',
      'Spark does not require a distributed file system',
    ],
    answer: 2,
    explanation:
      'Hadoop MapReduce writes intermediate results to disk after each Map-Reduce phase. For iterative algorithms (like machine learning), this disk I/O is repeated every iteration. Spark keeps data in memory (RDDs), avoiding repeated disk writes and achieving dramatic speedups.',
  },
  {
    id: 't10-q3',
    chapterId: 10,
    question:
      'What role does the Shuffle phase play in MapReduce?',
    options: [
      'It randomly reorders data for better load balancing',
      'It groups all values with the same key and routes them to the same reducer',
      'It compresses the data before sending to reducers',
      'It duplicates data across nodes for fault tolerance',
    ],
    answer: 1,
    explanation:
      'The Shuffle phase takes the key-value pairs output by mappers, groups all values sharing the same key, and sends each group to the reducer responsible for that key. This is the most network-intensive phase and often the primary bottleneck.',
  },

  // ──────────────────────────────────────────────
  // Topic 11: GPU Parallelism & SIMD
  // ──────────────────────────────────────────────
  {
    id: 't11-q1',
    chapterId: 11,
    question:
      'Why does struct-of-arrays (SoA) layout improve SIMD performance compared to array-of-structs (AoS)?',
    options: [
      'SoA uses less total memory',
      'SoA avoids the need for alignment',
      'SoA places each field in a contiguous array, allowing SIMD instructions to load multiple values of the same field into a vector register in one operation',
      'SoA layouts are easier to read in code',
    ],
    answer: 2,
    explanation:
      'SIMD instructions operate on contiguous data. In SoA layout, all x-coordinates are adjacent in memory, so a single SIMD load fills a vector register. In AoS layout, fields from different structs are interleaved, requiring expensive gather operations.',
  },
  {
    id: 't11-q2',
    chapterId: 11,
    question:
      'What is "warp divergence" in GPU computing?',
    options: [
      'When threads in the same warp take different branches, forcing the warp to execute both paths serially with threads masked',
      'When threads in different warps access the same memory simultaneously',
      'When a warp runs out of registers and spills to global memory',
      'When warps from different SMs compete for the same cache line',
    ],
    answer: 0,
    explanation:
      'In NVIDIA\'s SIMT model, all 32 threads in a warp execute the same instruction. When threads diverge at a branch (some take if, others take else), the warp must execute both paths sequentially, masking inactive threads, which reduces effective parallelism.',
  },
  {
    id: 't11-q3',
    chapterId: 11,
    question:
      'What is the main advantage of unified memory architectures like Apple Silicon?',
    options: [
      'They double the available memory bandwidth',
      'They allow GPUs to run at higher clock speeds',
      'They make programming in CUDA easier',
      'They eliminate the data transfer bottleneck between CPU and GPU by sharing the same physical memory',
    ],
    answer: 3,
    explanation:
      'In traditional systems, data must be copied between CPU and GPU memory over PCIe (~32 GB/s), which is far slower than GPU memory bandwidth (~1 TB/s). Unified memory architectures share the same physical memory, eliminating or reducing this transfer overhead.',
  },

  // ──────────────────────────────────────────────
  // Topic 12: Transactional Memory
  // ──────────────────────────────────────────────
  {
    id: 't12-q1',
    chapterId: 12,
    question:
      'What is the key advantage of Software Transactional Memory (STM) over lock-based synchronization?',
    options: [
      'STM is always faster than locks',
      'STM transactions compose naturally: two separately correct transactions can be combined into a single atomic transaction without restructuring',
      'STM does not require any runtime support',
      'STM eliminates all concurrency bugs',
    ],
    answer: 1,
    explanation:
      'With locks, combining two correct operations into an atomic whole requires knowing their internal locking protocols to avoid deadlock, breaking encapsulation. STM transactions can simply be nested: the runtime guarantees the combined operation is atomic.',
  },
  {
    id: 't12-q2',
    chapterId: 12,
    question:
      'What causes a Hardware Transactional Memory (HTM) transaction to abort?',
    options: [
      'Only explicit abort instructions',
      'Running more than 100 instructions in the transaction',
      'Accessing memory that has not been pre-allocated',
      'Conflict with another transaction on the same cache line, exceeding cache capacity, or hardware interrupts',
    ],
    answer: 3,
    explanation:
      'HTM transactions abort for several reasons: (1) a conflict when another core writes to a cache line the transaction has read, (2) the transaction\'s working set exceeds L1 cache capacity, or (3) a hardware interrupt or context switch occurs during the transaction.',
  },
  {
    id: 't12-q3',
    chapterId: 12,
    question:
      'How does Read-Copy-Update (RCU) achieve high read performance?',
    options: [
      'By allowing readers to access data lock-free while writers create new versions and defer reclamation of old versions until all readers have finished',
      'By caching all data in CPU registers',
      'By using hardware transactional memory for all reads',
      'By restricting reads to a single thread',
    ],
    answer: 0,
    explanation:
      'RCU lets readers access shared data without any synchronization (no locks, no atomic operations). Writers create updated copies and swap pointers atomically. Old versions are freed only after a "grace period" ensures no reader still references them.',
  },

  // ──────────────────────────────────────────────
  // Topic 13: Distributed Concurrency
  // ──────────────────────────────────────────────
  {
    id: 't13-q1',
    chapterId: 13,
    question:
      'According to the CAP theorem, what trade-off must a distributed system make during a network partition?',
    options: [
      'Between encryption and performance',
      'Between horizontal and vertical scaling',
      'Between consistency and availability, since partition tolerance is mandatory',
      'Between speed and memory usage',
    ],
    answer: 2,
    explanation:
      'Since network partitions are inevitable in distributed systems, the CAP theorem forces a choice: a CP system sacrifices availability during partitions (refuses requests rather than serving stale data), while an AP system sacrifices consistency (serves potentially stale data to remain available).',
  },
  {
    id: 't13-q2',
    chapterId: 13,
    question:
      'How many node failures can a Raft consensus cluster of 5 nodes tolerate while still making progress?',
    options: ['1', '2', '3', '4'],
    answer: 1,
    explanation:
      'Raft (and Paxos) require a majority quorum to make progress. With 5 nodes, the majority is 3 (5/2 + 1 = 3). So the cluster can tolerate 2 failures and still have 3 nodes to form a quorum.',
  },
  {
    id: 't13-q3',
    chapterId: 13,
    question:
      'What is the purpose of fencing tokens in distributed locking?',
    options: [
      'To encrypt the lock data during transmission',
      'To limit the number of times a lock can be acquired',
      'To distribute the lock across multiple nodes for redundancy',
      'To prevent a previous lock holder whose lock expired from making stale writes, by assigning monotonically increasing sequence numbers that the storage system can validate',
    ],
    answer: 3,
    explanation:
      'Fencing tokens are monotonically increasing numbers issued with each lock acquisition. The storage system rejects writes with a token lower than the highest it has seen, preventing a slow client whose lock expired from overwriting updates made by the new lock holder.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
