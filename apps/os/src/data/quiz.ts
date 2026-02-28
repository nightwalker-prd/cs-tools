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
  // Topic 1: Processes & Process Lifecycle (chapterId: 1)
  // ============================================================
  {
    id: "t1-q1",
    chapterId: 1,
    question:
      "What is a zombie process in Unix/Linux?",
    options: [
      "A process that consumes excessive CPU resources in an infinite loop",
      "A process that has been killed by the OOM Killer but not yet removed from memory",
      "A terminated child process whose exit status has not yet been read by its parent via wait()",
      "A process that is stuck in uninterruptible sleep waiting for disk I/O",
    ],
    answer: 2,
    explanation:
      "A zombie process is a child process that has finished execution (terminated) but still has an entry in the process table because its parent has not yet called wait() or waitpid() to read its exit status. The process consumes no CPU or memory resources (its pages are freed), but it occupies a PID slot and a process table entry. Zombies are cleaned up when the parent reads the status, or if the parent exits, init (PID 1) adopts and reaps them.",
  },
  {
    id: "t1-q2",
    chapterId: 1,
    question:
      "During a context switch, which of the following is the primary cause of indirect performance overhead beyond the register save/restore itself?",
    options: [
      "Allocating a new process control block for the incoming process",
      "TLB flush and subsequent cache cold-start misses in the new process's address space",
      "Recalculating the incoming process's scheduling priority",
      "Closing and reopening file descriptors for the new process",
    ],
    answer: 1,
    explanation:
      "While saving and restoring registers is relatively fast (a few hundred nanoseconds), the indirect cost of a context switch comes primarily from the TLB flush — when switching to a new process's address space, the TLB entries from the previous process are invalidated (unless PCIDs are used). The new process then experiences a burst of TLB misses as it accesses memory, each requiring a multi-level page table walk. Additionally, the CPU caches (L1, L2) are now filled with the previous process's data, causing cache misses. These indirect costs can exceed the direct register save/restore cost by 10-100x.",
  },
  {
    id: "t1-q3",
    chapterId: 1,
    question:
      "What information does the Process Control Block (PCB) NOT typically contain?",
    options: [
      "The saved values of CPU registers including the program counter",
      "A pointer to the process's page table base address",
      "The actual contents of the process's heap memory",
      "The list of open file descriptors and their current offsets",
    ],
    answer: 2,
    explanation:
      "The PCB (task_struct in Linux) stores metadata about the process — CPU register state, page table pointer (CR3), file descriptor table, scheduling priority, process state, PID, signal handlers, and resource limits. It does NOT contain the actual contents of the process's memory (heap, stack, code segments). The process's memory is managed through its page tables and stored in physical memory frames. The PCB merely contains a pointer to the page table root so the OS can set up the MMU to access that memory.",
  },

  // ============================================================
  // Topic 2: Threads & Concurrency (chapterId: 2)
  // ============================================================
  {
    id: "t2-q1",
    chapterId: 2,
    question:
      "What is the fundamental limitation of pure user-space (green) threads?",
    options: [
      "They cannot share memory between threads",
      "A blocking system call by one thread blocks all threads in the process because the kernel sees only one schedulable entity",
      "They are limited to a maximum of 256 threads per process",
      "They require special hardware support that most CPUs do not provide",
    ],
    answer: 1,
    explanation:
      "Pure user-space threads are invisible to the kernel — the kernel schedules the process as a single entity. When one user-space thread makes a blocking system call (e.g., read() on a slow device), the kernel blocks the entire process, stopping all user-space threads. This is the fundamental reason most modern systems use kernel threads or hybrid M:N models. Solutions include using non-blocking I/O, the M:N model (multiplexing user threads onto multiple kernel threads), or converting blocking calls to async operations.",
  },
  {
    id: "t2-q2",
    chapterId: 2,
    question:
      "In Go's M:N threading model, what happens when a goroutine makes a blocking system call?",
    options: [
      "The goroutine is terminated and must be restarted by the programmer",
      "All goroutines on that OS thread are blocked until the syscall completes",
      "The Go runtime parks the blocking OS thread and schedules other goroutines on a different OS thread",
      "The syscall is automatically converted to a non-blocking call by the Go runtime",
    ],
    answer: 2,
    explanation:
      "Go's goroutine scheduler handles blocking syscalls gracefully in its M:N model. When a goroutine makes a blocking system call, the Go runtime detaches the goroutine (and its OS thread) from the scheduler's thread pool, allowing other goroutines to continue running on the remaining OS threads. If needed, the runtime spins up a new OS thread to maintain GOMAXPROCS active threads. When the blocking syscall completes, the goroutine becomes runnable again and is placed back into the scheduling queue. This is a key advantage of Go's M:N model over pure 1:1 threading.",
  },
  {
    id: "t2-q3",
    chapterId: 2,
    question:
      "Why do green threads (goroutines, virtual threads) use much smaller stacks than OS threads?",
    options: [
      "Green threads cannot perform recursive function calls, so they need less stack space",
      "Green threads share a single global stack instead of having individual stacks",
      "Green threads start with tiny stacks (2-8KB) that grow dynamically as needed, while OS thread stacks must be pre-allocated at a fixed size (typically 1-8MB)",
      "Operating system security requirements mandate large stacks for kernel threads",
    ],
    answer: 2,
    explanation:
      "OS thread stacks are typically allocated at a fixed size (1-8MB by default on Linux) because the kernel maps them as contiguous virtual memory regions with a guard page — resizing would require remapping, which is complex and expensive. Green threads (goroutines, Java virtual threads) start with tiny stacks (Go uses ~2-8KB) that grow dynamically by allocating new, larger stack segments and copying existing frames when more space is needed. This enables millions of green threads in a single process (millions * 4KB = ~4GB) whereas millions of OS threads would require millions * 1MB = terabytes of virtual address space.",
  },

  // ============================================================
  // Topic 3: CPU Scheduling (chapterId: 3)
  // ============================================================
  {
    id: "t3-q1",
    chapterId: 3,
    question:
      "What is the convoy effect in FCFS (First-Come, First-Served) scheduling?",
    options: [
      "Multiple short processes complete faster than expected due to batch processing optimizations",
      "A long CPU-burst process holds the CPU, forcing many short processes to wait in the ready queue, inflating average waiting time",
      "Processes are grouped into convoys of similar burst length for more efficient scheduling",
      "The scheduler assigns higher priority to processes that arrived in groups",
    ],
    answer: 1,
    explanation:
      "The convoy effect is a significant drawback of FCFS scheduling. When a long CPU-burst process (e.g., a computation-intensive task) arrives before several short processes (e.g., I/O-bound interactive tasks), all the short processes must wait behind the long one in the queue. This dramatically increases the average waiting time and turnaround time for the short processes. The effect is particularly problematic in interactive systems where users expect responsive behavior. SJF, Round Robin, and MLFQ all address this problem by not requiring processes to run to completion in arrival order.",
  },
  {
    id: "t3-q2",
    chapterId: 3,
    question:
      "How does the Linux CFS (Completely Fair Scheduler) decide which process to run next?",
    options: [
      "It selects the process with the highest static priority (lowest nice value)",
      "It selects the process with the smallest virtual runtime (vruntime) from a red-black tree of runnable tasks",
      "It cycles through processes in round-robin order with dynamic time quanta",
      "It estimates the shortest remaining CPU burst using exponential averaging",
    ],
    answer: 1,
    explanation:
      "CFS maintains a red-black tree of all runnable tasks, sorted by their virtual runtime (vruntime). The task with the smallest vruntime — meaning it has received the least proportional CPU time — is the leftmost node in the tree and is selected to run next. The key insight is that vruntime advances at different rates based on task weight (derived from nice value): higher-weight tasks accumulate vruntime more slowly, so they naturally receive more CPU time. This achieves weighted fair sharing with O(log N) scheduling decisions, without fixed time quanta or explicit priority levels.",
  },
  {
    id: "t3-q3",
    chapterId: 3,
    question:
      "In a Multi-Level Feedback Queue (MLFQ), how does the scheduler prevent starvation of CPU-bound processes that have been demoted to the lowest-priority queue?",
    options: [
      "CPU-bound processes are automatically killed after spending too long in the lowest queue",
      "The scheduler periodically boosts all processes to the highest-priority queue, giving demoted processes another chance",
      "CPU-bound processes are migrated to a dedicated CPU core reserved for low-priority work",
      "The lowest-priority queue uses SJF scheduling to ensure fairness among CPU-bound processes",
    ],
    answer: 1,
    explanation:
      "MLFQ prevents starvation through periodic priority boosting — at regular intervals (e.g., every second), all processes in all queues are moved to the highest-priority queue. This ensures that CPU-bound processes that have been demoted to the lowest queue eventually get another chance to run at high priority. It also handles the case where a process's behavior changes over time (e.g., a CPU-bound process becomes I/O-bound) — the boost allows it to be reclassified based on its new behavior. Without boosting, processes in the lowest queue could wait indefinitely while new interactive processes continuously arrive in the highest queue.",
  },

  // ============================================================
  // Topic 4: Inter-Process Communication (chapterId: 4)
  // ============================================================
  {
    id: "t4-q1",
    chapterId: 4,
    question:
      "Why must applications implement their own framing protocol when using Unix pipes?",
    options: [
      "Pipes can only transmit ASCII text, not binary data",
      "Pipes have no built-in message boundaries — they transmit a raw byte stream, so the receiver cannot tell where one message ends and another begins",
      "Pipes are limited to 256 bytes per write, requiring message splitting",
      "The kernel reorders pipe data for optimization, so messages may arrive out of order",
    ],
    answer: 1,
    explanation:
      "Unix pipes provide a raw byte stream with no concept of message boundaries — write() calls are not atomic for large sizes, and the reader may receive partial writes or data from multiple writes in a single read(). For example, if the writer sends 'hello' and then 'world', the reader might receive 'helloworld' in a single read(), or 'hel' and 'loworld' in two reads. Applications must implement framing — common approaches include newline-delimited messages (line-based protocols), length-prefixed messages (send the byte count before each message), or fixed-size messages. This is in contrast to message queues which preserve message boundaries.",
  },
  {
    id: "t4-q2",
    chapterId: 4,
    question:
      "What makes shared memory the fastest IPC mechanism, and what is its primary drawback?",
    options: [
      "It uses hardware encryption for zero-overhead security; the drawback is limited to 4KB transfers",
      "Processes read/write directly to a common memory region without kernel copies; the drawback is that synchronization must be handled explicitly by the application",
      "The kernel optimizes shared memory by pre-fetching data; the drawback is that it only works on single-core systems",
      "Shared memory uses DMA for direct device-to-memory transfers; the drawback is it requires root privileges",
    ],
    answer: 1,
    explanation:
      "Shared memory (via shm_open + mmap or shmget + shmat) maps the same physical memory pages into the virtual address spaces of multiple processes. After the initial setup, processes read and write directly to this shared region at memory-bus speed — there are no system calls or kernel copies per operation (unlike pipes or message queues where data is copied from sender to kernel buffer to receiver). The critical drawback is that the kernel provides no synchronization — concurrent reads and writes without proper mutexes, semaphores, or atomic operations cause data races and undefined behavior. The application is fully responsible for thread-safe access to the shared region.",
  },
  {
    id: "t4-q3",
    chapterId: 4,
    question:
      "What capability does Unix domain socket ancillary data (SCM_RIGHTS) provide that no other standard IPC mechanism offers?",
    options: [
      "The ability to send encrypted data between processes without TLS",
      "The ability to pass open file descriptors from one process to another",
      "The ability to share GPU memory between processes for rendering",
      "The ability to send data faster than the speed of the memory bus",
    ],
    answer: 1,
    explanation:
      "SCM_RIGHTS is a Unix domain socket feature that allows one process to send an open file descriptor to another process via ancillary (control) data in a sendmsg() call. The receiving process gets a new file descriptor that refers to the same underlying kernel file object. This enables powerful patterns like socket activation (systemd opens a listening socket and passes it to a service), privilege separation (a privileged process opens a protected file and passes the fd to an unprivileged process), and zero-downtime server restarts (pass the listening socket to the new server process). No other standard IPC mechanism provides this capability.",
  },

  // ============================================================
  // Topic 5: Virtual Memory & Paging (chapterId: 5)
  // ============================================================
  {
    id: "t5-q1",
    chapterId: 5,
    question:
      "What happens when the CPU accesses a virtual address whose page table entry has the present bit set to 0?",
    options: [
      "The CPU automatically retries the access after a short delay",
      "The MMU generates a page fault exception, and the OS fault handler determines whether to load the page from disk, allocate a new frame, or deliver a segmentation fault",
      "The CPU reads zeroes from the address since the page is not in memory",
      "The process is immediately terminated by the kernel",
    ],
    answer: 1,
    explanation:
      "When the MMU encounters a page table entry with the present bit = 0, it generates a page fault exception, transferring control to the OS kernel's page fault handler. The handler examines the faulting address and the process's virtual memory area (VMA) descriptors to determine the appropriate action: (1) if the address is in a valid mapped region but the page was swapped out, the handler loads it from the swap device; (2) if it's a newly mapped anonymous page, a zeroed frame is allocated; (3) if it's a memory-mapped file page, the handler reads it from the file; (4) if the address is not in any valid mapping, the handler delivers a SIGSEGV (segmentation fault) to the process.",
  },
  {
    id: "t5-q2",
    chapterId: 5,
    question:
      "How does copy-on-write (COW) optimization work during fork()?",
    options: [
      "The kernel creates a complete copy of the parent's memory immediately at fork time, which takes proportional time to process size",
      "Parent and child share the same physical pages with read-only permissions; a write triggers a page fault that creates a private copy of only the written page",
      "The child process receives an empty address space and pages are copied on demand as the child reads them",
      "The kernel uses compression to store both copies of memory in the same physical frames",
    ],
    answer: 1,
    explanation:
      "Copy-on-write makes fork() nearly instant regardless of process memory size. Instead of copying all memory, the kernel marks all of the parent's and child's page table entries as read-only and both point to the same physical frames. When either process writes to a page, the write triggers a protection fault (page fault). The kernel's fault handler allocates a new physical frame, copies the content of the original page to it, updates the writing process's page table entry to point to the new frame with write permission, and allows the write to proceed. The other process retains the original page. This means only pages that are actually modified get copied, saving enormous amounts of memory and time — especially important for fork() + exec() patterns where the child immediately replaces its address space.",
  },
  {
    id: "t5-q3",
    chapterId: 5,
    question:
      "Why does x86-64 use a 4-level page table hierarchy instead of a single flat page table?",
    options: [
      "A flat page table for a 48-bit address space would require 512GB per process, which is impractical — multi-level tables only allocate table pages for actually used address regions",
      "Multi-level tables allow faster address translation because each level is smaller to search",
      "Hardware limitations prevent a single page table from being larger than 4KB",
      "Flat page tables cannot support different page sizes (4KB, 2MB, 1GB)",
    ],
    answer: 0,
    explanation:
      "A flat page table for a 48-bit virtual address space with 4KB pages would need 2^36 entries (one per virtual page). At 8 bytes per entry, that's 512GB of page table per process — clearly impractical. The 4-level hierarchy (PML4 -> PDPT -> PD -> PT) saves space because intermediate table pages are only allocated for virtual address regions that are actually mapped. A typical process maps a few GB of virtual address space but has a 256TB virtual address range — with hierarchical tables, only the few hundred page table pages covering the mapped regions need to exist. Most of the 4-level structure is sparse (null pointers in upper-level tables), consuming essentially zero memory for unmapped regions.",
  },

  // ============================================================
  // Topic 6: Page Replacement & Thrashing (chapterId: 6)
  // ============================================================
  {
    id: "t6-q1",
    chapterId: 6,
    question:
      "How does the Clock (Second Chance) page replacement algorithm work?",
    options: [
      "It maintains a timestamp for each page and evicts the page with the oldest timestamp",
      "It arranges pages in a circular buffer — the clock hand sweeps forward, clearing the reference bit of pages with it set and evicting the first page found with the reference bit already clear",
      "It randomly selects a page and gives it a second chance before evicting it",
      "It keeps two copies of each page and evicts the less frequently accessed copy",
    ],
    answer: 1,
    explanation:
      "The Clock algorithm is an efficient approximation of LRU. Pages are arranged in a circular buffer with a clock-hand pointer. When a page must be evicted, the hand examines the current page: if its reference (accessed) bit is 1, the algorithm clears the bit to 0 and advances the hand (giving the page a 'second chance' — it was recently used). If the reference bit is already 0, the page has not been accessed since its bit was last cleared, making it a good eviction candidate — it is evicted. This provides O(1) amortized cost per eviction and requires only one bit per page plus one pointer, making it practical for systems managing millions of pages.",
  },
  {
    id: "t6-q2",
    chapterId: 6,
    question:
      "What is thrashing, and what is its paradoxical relationship with CPU utilization?",
    options: [
      "Thrashing is when the CPU overheats due to excessive computation; the paradox is that cooling the CPU reduces performance",
      "Thrashing is when processes collectively demand more memory than available, causing excessive paging — the paradox is that the scheduler may increase multiprogramming (adding more processes) to raise CPU utilization, which worsens the thrashing",
      "Thrashing is when disk I/O is too fast for the CPU to process; the paradox is that faster disks make it worse",
      "Thrashing is when multiple processes compete for the same lock; the paradox is that adding more locks increases contention",
    ],
    answer: 1,
    explanation:
      "Thrashing occurs when the total working set of all running processes exceeds available physical memory. Each process continuously page-faults because its needed pages have been evicted to make room for other processes' pages. The system spends most of its time handling page faults (swapping pages in and out) rather than doing useful work. The paradox: when CPU utilization drops due to thrashing (processes are all waiting for I/O), the OS scheduler may interpret this as 'not enough processes' and increase the degree of multiprogramming by admitting more processes — which increases memory pressure and worsens the thrashing in a vicious cycle. The solution is to reduce the number of active processes or add more physical memory.",
  },
  {
    id: "t6-q3",
    chapterId: 6,
    question:
      "Why does pure LFU (Least Frequently Used) suffer from cache pollution?",
    options: [
      "LFU uses too much memory for its frequency counters, leaving less space for actual page data",
      "LFU preferentially evicts newly loaded pages before they have a chance to accumulate accesses",
      "Pages that were heavily accessed in the past but are no longer needed retain high frequency counts, preventing their eviction even though they are now cold",
      "LFU cannot distinguish between read and write accesses, so it keeps write-heavy pages too long",
    ],
    answer: 2,
    explanation:
      "Pure LFU tracks access frequency per page and evicts the page with the lowest count. The problem is that frequency counts are cumulative — a page accessed 10,000 times during an initialization phase retains that high count forever, even if it is never accessed again. This 'stale popular' page cannot be evicted because its count far exceeds that of newly loaded pages that are actively being used. The contaminated cache fills up with these historically popular but currently useless pages. Solutions include periodic count halving (aging/decay), windowed frequency tracking (only count accesses within a recent time window), or hybrid LFU/LRU algorithms like ARC (Adaptive Replacement Cache) used in ZFS.",
  },

  // ============================================================
  // Topic 7: Memory Allocation (chapterId: 7)
  // ============================================================
  {
    id: "t7-q1",
    chapterId: 7,
    question:
      "Why does glibc malloc use mmap() instead of brk() for large allocations (typically > 128KB)?",
    options: [
      "mmap() provides faster memory access than brk() due to hardware optimization",
      "brk() can only allocate memory in 4KB increments, which wastes space for large allocations",
      "mmap() allocates independent virtual memory regions that can be individually returned to the OS when freed, unlike brk() which can only shrink the heap from the top",
      "mmap() memory is automatically encrypted by the kernel for security",
    ],
    answer: 2,
    explanation:
      "brk()/sbrk() grow the heap contiguously — the heap is a single region that can only be expanded or contracted from its end. If a large allocation in the middle of the heap is freed, that space cannot be returned to the OS (it can only be reused by future allocations) because brk() can only shrink when the top-most allocation is freed. mmap() allocates separate virtual memory regions that can be individually munmap()'d and returned to the OS immediately when freed, regardless of other allocations. For large allocations (> MMAP_THRESHOLD, default 128KB), the memory savings of being able to return freed blocks to the OS outweigh the slightly higher cost of mmap() system calls.",
  },
  {
    id: "t7-q2",
    chapterId: 7,
    question:
      "What is the key insight that makes coalescing in the buddy system allocator O(1)?",
    options: [
      "The buddy system uses a hash table to look up adjacent free blocks instantly",
      "A block's buddy address can be computed by flipping a single bit in the block's address, so finding the buddy requires no searching",
      "The buddy system pre-computes all possible merge operations at initialization time",
      "Freed blocks are always adjacent to their buddy because the allocator never fragments",
    ],
    answer: 1,
    explanation:
      "The buddy system allocates blocks in power-of-two sizes by recursively splitting larger blocks in half. When a block of size 2^k at address A is freed, its buddy is the other half of the original 2^(k+1) block — and the buddy's address is simply A XOR 2^k (flipping the k-th bit). This means finding the buddy requires no searching, no linked-list traversal, and no hash lookup — just a single XOR operation. If the buddy is free, they merge into a 2^(k+1) block, and the process repeats at the next level. This elegant property is only possible because blocks are always aligned to their size and always split symmetrically.",
  },
  {
    id: "t7-q3",
    chapterId: 7,
    question:
      "What problem does the slab allocator solve that the buddy system alone cannot?",
    options: [
      "The buddy system cannot allocate memory smaller than one page, and kernel objects like task_struct need exact-size allocation with pre-initialization to avoid repeated construction overhead",
      "The buddy system is too slow for any practical use, so the slab allocator replaces it entirely",
      "The buddy system cannot handle concurrent allocations from multiple CPUs",
      "The buddy system does not support virtual memory, only physical memory",
    ],
    answer: 0,
    explanation:
      "The buddy system allocates in power-of-two page-sized blocks (minimum 4KB on Linux). Kernel objects like task_struct (~6KB), inode (~800 bytes), and dentry (~200 bytes) are much smaller than a page, and allocating a full page for each would waste enormous amounts of memory (internal fragmentation). The slab allocator solves this by obtaining pages from the buddy system and subdividing them into object-sized slots. Additionally, slab caches pre-construct objects — when a task_struct is freed, its memory stays in the cache with the object in a known state, so the next allocation skips the expensive initialization of hundreds of fields. This combination of exact-size allocation and construction caching dramatically improves both memory efficiency and allocation speed for frequently used kernel objects.",
  },

  // ============================================================
  // Topic 8: File Systems (chapterId: 8)
  // ============================================================
  {
    id: "t8-q1",
    chapterId: 8,
    question:
      "Why can't hard links cross filesystem boundaries, while symbolic links can?",
    options: [
      "Hard links use more disk space than symbolic links and there isn't enough room across filesystems",
      "A hard link is a directory entry pointing to an inode number, and inode numbers are only unique within a single filesystem — a different filesystem has its own independent inode numbering",
      "The kernel deliberately prevents cross-filesystem hard links for security reasons",
      "Hard links require the same file permissions on both filesystems, which is impossible to guarantee",
    ],
    answer: 1,
    explanation:
      "A hard link is simply a directory entry (name, inode_number) pair — the inode number directly identifies the file's metadata and data blocks within that specific filesystem. Each filesystem has its own independent inode table, so inode number 12345 on /dev/sda1 refers to a completely different file than inode 12345 on /dev/sda2. A hard link to an inode on a different filesystem would reference a non-existent or wrong file. Symbolic links solve this because they store a path string (e.g., '/other-fs/file.txt'), not an inode number — the kernel resolves the path at access time, transparently crossing filesystem boundaries.",
  },
  {
    id: "t8-q2",
    chapterId: 8,
    question:
      "In ext4's ordered journaling mode (the default), what guarantee does it provide that writeback mode does not?",
    options: [
      "Ordered mode journals both data and metadata, while writeback only journals metadata",
      "Ordered mode ensures data blocks are written to disk before the metadata journal entry is committed, preventing stale data exposure after a crash",
      "Ordered mode provides faster recovery time because it writes less to the journal",
      "Ordered mode encrypts the journal entries for security",
    ],
    answer: 1,
    explanation:
      "In ext4's ordered mode, data blocks for a file are written to their final on-disk locations BEFORE the metadata transaction is committed to the journal. This ordering guarantee prevents a dangerous scenario: if metadata were committed first (as in writeback mode), a crash could leave a file's inode pointing to blocks that contain old data from previously deleted files — exposing sensitive stale data. Ordered mode does NOT journal the data itself (that would be full journal mode which doubles write traffic); it only ensures the temporal ordering: data writes first, then metadata commit. This is why ordered mode is the default — it balances performance (no data journaling overhead) with safety (no stale data exposure).",
  },
  {
    id: "t8-q3",
    chapterId: 8,
    question:
      "How do copy-on-write (COW) filesystems like ZFS and Btrfs achieve free snapshots?",
    options: [
      "They compress the snapshot data so it takes minimal space",
      "They copy all file data to a snapshot area when the snapshot is taken",
      "Since writes always go to new locations (never overwriting existing data), a snapshot just preserves a pointer to the current metadata root — the old data naturally remains intact until its space is explicitly reclaimed",
      "They use deduplication to identify identical blocks between the snapshot and live data",
    ],
    answer: 2,
    explanation:
      "In a COW filesystem, modifying a file writes the new data to a NEW location on disk and creates new metadata blocks pointing to the mix of unchanged and new data blocks. The old data and metadata blocks remain untouched on disk. Taking a snapshot simply records a reference to the current root of the metadata tree — since future writes will go to new locations (never overwriting the blocks the snapshot references), the snapshot's view of the data is automatically preserved. No data copying is required at snapshot time, making it nearly instantaneous. The only cost is that blocks referenced by snapshots cannot be freed until the snapshot is deleted, so disk space is consumed proportionally to the rate of changes after the snapshot.",
  },

  // ============================================================
  // Topic 9: I/O Systems (chapterId: 9)
  // ============================================================
  {
    id: "t9-q1",
    chapterId: 9,
    question:
      "What problem does DMA (Direct Memory Access) solve compared to programmed I/O (PIO)?",
    options: [
      "DMA encrypts data during transfer for security, while PIO transfers data in plaintext",
      "DMA allows peripheral devices to transfer data directly to/from memory without the CPU executing a load/store instruction per byte, freeing the CPU to do other work during bulk transfers",
      "DMA provides faster memory access by using a dedicated high-speed memory bus",
      "DMA eliminates the need for device drivers because the DMA controller handles all device communication",
    ],
    answer: 1,
    explanation:
      "Without DMA, the CPU must execute a load/store instruction for every byte (or word) transferred between a device and memory — this is called Programmed I/O (PIO). For a 1MB disk read, the CPU would execute hundreds of thousands of instructions just moving data, unable to do any other useful work. DMA offloads this bulk data movement to a dedicated DMA controller: the CPU programs the controller with source address, destination address, and transfer size, then is free to execute other instructions. The DMA controller handles the actual data transfer over the bus, and raises an interrupt when complete. The CPU only participates at setup and completion, dramatically improving system throughput.",
  },
  {
    id: "t9-q2",
    chapterId: 9,
    question:
      "Why is disk scheduling largely irrelevant for NVMe SSDs?",
    options: [
      "NVMe SSDs use their own internal scheduling that overrides OS-level scheduling",
      "NVMe SSDs have no mechanical seek time — random and sequential access are nearly equally fast, so reordering requests to minimize seek distance provides no benefit",
      "NVMe SSDs have such large caches that all requests hit the cache",
      "The NVMe protocol does not support request reordering by the host",
    ],
    answer: 1,
    explanation:
      "Disk scheduling algorithms like SCAN, C-SCAN, and SSTF exist to minimize seek time — the time for a mechanical HDD's read/write head to physically move to the correct track. This head movement dominates HDD latency (10-15ms for a full stroke). SSDs have no moving parts — they access any NAND flash page in essentially the same time (~10-100 microseconds). Reordering requests to minimize 'seek distance' provides no benefit because there is no seek. Linux uses the 'none' (noop) scheduler for NVMe devices, which simply passes requests through without reordering. The NVMe protocol itself supports up to 64K hardware queues that the SSD firmware processes in parallel, further eliminating the need for host-side scheduling.",
  },
  {
    id: "t9-q3",
    chapterId: 9,
    question:
      "What is the risk of write-back buffering in the OS page cache without calling fsync()?",
    options: [
      "The write data may become corrupted due to buffer overflow in the page cache",
      "Other processes cannot read the written data until fsync() is called",
      "Written data exists only in volatile RAM until the kernel flushes dirty pages — a power failure during this window loses the data permanently",
      "The filesystem journal becomes inconsistent without fsync()",
    ],
    answer: 2,
    explanation:
      "When an application calls write(), the data is typically copied to the kernel's page cache (in RAM) and the system call returns immediately — the application thinks the write is complete. The actual disk write happens later when the kernel's writeback threads flush dirty pages (typically within 30 seconds or when dirty memory exceeds a threshold). During this window, the data exists ONLY in volatile RAM. If the system loses power or crashes, all unflushed dirty pages are lost permanently. This is why databases and any crash-sensitive application must call fsync() or fdatasync() after critical writes — these calls force the data to persistent storage and wait for the device to confirm. The trade-off is that fsync() is orders of magnitude slower than a buffered write.",
  },

  // ============================================================
  // Topic 10: Storage Hierarchy (chapterId: 10)
  // ============================================================
  {
    id: "t10-q1",
    chapterId: 10,
    question:
      "Why is RAID 10 (1+0) generally preferred over RAID 5 for database workloads?",
    options: [
      "RAID 10 provides more usable storage capacity than RAID 5",
      "RAID 10 offers better random write performance (no parity read-modify-write penalty) and faster rebuild times (only one disk to copy instead of recalculating parity across all disks)",
      "RAID 10 supports hot-spare disks while RAID 5 does not",
      "RAID 10 can tolerate more simultaneous disk failures than RAID 6",
    ],
    answer: 1,
    explanation:
      "RAID 5 distributes parity across all disks. Every random write requires reading the old data and old parity, computing new parity, then writing both new data and new parity — the 'read-modify-write' penalty that effectively quadruples random write I/O. RAID 10 mirrors data across paired disks, so random writes only go to two disks (the mirrored pair) with no parity computation. Rebuild time is also significantly faster: RAID 10 only needs to copy one disk's data from its mirror, while RAID 5 must read ALL remaining disks to recalculate the failed disk's data from parity. For databases with heavy random write patterns (OLTP workloads), RAID 10's superior write performance and faster rebuild make it the standard choice despite using 50% of capacity for redundancy.",
  },
  {
    id: "t10-q2",
    chapterId: 10,
    question:
      "What is write amplification in the context of SSDs, and why does it matter?",
    options: [
      "Write amplification means the SSD writes data louder (with more electrical current) to ensure durability",
      "Write amplification occurs when the SSD's internal garbage collection causes more physical NAND writes than the host requested, reducing effective write throughput and SSD lifespan",
      "Write amplification is the delay between when a write command is issued and when it completes",
      "Write amplification refers to the SSD duplicating writes across multiple NAND chips for redundancy",
    ],
    answer: 1,
    explanation:
      "NAND flash pages cannot be overwritten in place — to modify a page, the SSD writes new data to a free page and marks the old page as stale. Garbage collection (GC) reclaims blocks containing stale pages by copying still-valid pages to a new block, then erasing the old block. These internal copy operations mean the SSD writes more data to NAND than the host actually requested. The Write Amplification Factor (WAF) = actual NAND writes / host writes. A WAF of 3x means for every 1GB the host writes, 3GB is written to NAND. This matters because NAND flash cells have limited write/erase cycles (3,000-100,000 depending on technology) — higher WAF wears out the SSD faster. Sequential writes minimize WAF (~1.0) because they fill blocks completely, while random writes maximize it (3-5x) because they create scattered stale pages requiring frequent GC.",
  },
  {
    id: "t10-q3",
    chapterId: 10,
    question:
      "What is the key architectural advantage of NVMe over SATA/AHCI for SSD performance?",
    options: [
      "NVMe uses a different NAND flash technology that is inherently faster than SATA SSDs",
      "NVMe connects via PCIe with support for up to 64K queues of 64K commands each, compared to AHCI's single queue of 32 commands, enabling massive parallelism that matches modern SSD internal architecture",
      "NVMe SSDs have larger DRAM caches than SATA SSDs",
      "NVMe uses a proprietary compression protocol that reduces data transfer sizes",
    ],
    answer: 1,
    explanation:
      "The SATA/AHCI interface was designed for spinning hard drives with a single mechanical head — its single command queue of 32 entries was sufficient. Modern SSDs contain dozens of flash chips operating in parallel, capable of processing thousands of operations simultaneously. The AHCI bottleneck limits the SSD to processing 32 requests at a time through a single queue. NVMe was designed from scratch for flash storage: it supports up to 65,535 queues with 65,535 commands each, and the protocol bypasses legacy software layers, reducing per-I/O overhead. This massive parallelism allows NVMe SSDs to fully exploit their internal parallelism, achieving millions of IOPS and latencies under 10 microseconds — compared to SATA SSDs that top out around 100K IOPS due to the interface bottleneck.",
  },

  // ============================================================
  // Topic 11: Synchronization Primitives (chapterId: 11)
  // ============================================================
  {
    id: "t11-q1",
    chapterId: 11,
    question:
      "When should a spinlock be preferred over a mutex?",
    options: [
      "When the critical section involves file I/O operations",
      "When the expected lock hold time is very short (shorter than the cost of a context switch), such as in interrupt handlers or kernel code protecting a few instructions",
      "When there are more than 100 threads competing for the lock",
      "When the application needs to support recursive locking",
    ],
    answer: 1,
    explanation:
      "Spinlocks busy-wait in a tight loop, consuming CPU cycles while waiting. This is wasteful for long waits but avoids the overhead of a context switch (saving registers, scheduling another thread, restoring state when the lock is available — typically 1-10 microseconds). If the lock is held for less time than a context switch costs (e.g., protecting a few pointer updates that take 10-100 nanoseconds), spinning is more efficient. Spinlocks are essential in interrupt handlers where sleeping is not allowed (the handler must complete quickly and cannot be descheduled). However, holding a spinlock while performing I/O or any blocking operation wastes an entire CPU core — for those cases, a mutex (which sleeps and releases the CPU) is correct.",
  },
  {
    id: "t11-q2",
    chapterId: 11,
    question:
      "Why must the condition check in a condition variable wait always use a while loop instead of an if statement?",
    options: [
      "The while loop provides better performance by reducing the number of system calls",
      "Spurious wakeups can occur — the thread may be woken without the condition actually being true, so it must re-check the condition after each wakeup",
      "The if statement syntax is not compatible with the pthread_cond_wait() function signature",
      "The while loop is needed to handle signal interrupts that could terminate the wait prematurely",
    ],
    answer: 1,
    explanation:
      "Condition variables can experience spurious wakeups — the thread may be woken up even when no other thread called signal() or broadcast(). This happens due to implementation details: the OS may wake threads during signal delivery, or a multiprocessor race condition may cause a wakeup when the condition is not satisfied. Additionally, pthread_cond_broadcast() wakes ALL waiting threads, but only one may find the condition true. The correct pattern is: while(!condition) { pthread_cond_wait(&cv, &mutex); } — this ensures that after any wakeup (legitimate or spurious), the thread re-checks the actual condition before proceeding. Using if(!condition) instead would cause the thread to proceed on a spurious wakeup when the condition is still false, leading to subtle race condition bugs.",
  },
  {
    id: "t11-q3",
    chapterId: 11,
    question:
      "What makes RCU (Read-Copy-Update) unique among synchronization mechanisms?",
    options: [
      "RCU is the only synchronization mechanism that works across different machines in a network",
      "RCU provides zero-overhead reads (no locking, no atomic operations) by deferring the freeing of old data until all current readers have finished, at the cost of complex write-side logic",
      "RCU eliminates the need for any synchronization between readers and writers",
      "RCU is faster than all other mechanisms for both reads and writes",
    ],
    answer: 1,
    explanation:
      "RCU's key innovation is that readers pay absolutely no synchronization cost — no locks, no atomic operations, no memory barriers on the read path. This is achieved by the writer creating a complete new copy of the data structure, updating the pointer atomically (a single pointer swap is naturally atomic on aligned architectures), and then waiting for a 'grace period' during which all pre-existing readers finish. After the grace period, the old version can be safely freed because no reader can still be referencing it. The write path is significantly more complex and expensive (copy, update, wait for grace period, free), but for data structures that are read millions of times per second and rarely written (routing tables, kernel module lists), the trade-off is enormously favorable. RCU is extensively used in the Linux kernel with thousands of usage sites.",
  },

  // ============================================================
  // Topic 12: Deadlocks (chapterId: 12)
  // ============================================================
  {
    id: "t12-q1",
    chapterId: 12,
    question:
      "Which of the four Coffman conditions for deadlock is most commonly prevented in practice?",
    options: [
      "Mutual exclusion — by making all resources sharable",
      "Hold and wait — by requiring processes to request all resources at once",
      "No preemption — by allowing the OS to forcibly reclaim any resource",
      "Circular wait — by enforcing a global ordering on lock acquisition so threads always acquire locks in the same order",
    ],
    answer: 3,
    explanation:
      "Breaking circular wait through consistent lock ordering is the most practical and commonly used deadlock prevention technique. If all threads acquire locks in the same predefined order (e.g., always lock A before lock B before lock C), a circular dependency is impossible — the directed graph of lock acquisitions is acyclic by construction. The other conditions are harder to break: mutual exclusion is inherent to many resources; requiring all resources upfront (breaking hold-and-wait) is impractical when resource needs aren't known in advance; and forcible preemption is only safe for resources that can be saved and restored (like CPU via context switching, but not printer mid-page or database lock mid-transaction). The Linux kernel's lockdep tool dynamically verifies lock ordering at runtime.",
  },
  {
    id: "t12-q2",
    chapterId: 12,
    question:
      "What is a safe state in the context of the Banker's Algorithm?",
    options: [
      "A state where no process is currently blocked waiting for a resource",
      "A state where all processes have been allocated their maximum required resources",
      "A state where there exists a sequence in which all processes can complete, even in the worst case where each process requests its maximum remaining resources before releasing anything",
      "A state where the total allocated resources do not exceed physical capacity",
    ],
    answer: 2,
    explanation:
      "A safe state is one where there exists at least one safe sequence — an ordering of all processes such that each process can acquire its maximum remaining resource needs from the currently available resources plus the resources that will be released by all preceding processes in the sequence. The Banker's Algorithm checks safety by simulating: find a process whose remaining needs can be met by available resources, assume it runs to completion (releasing all its resources), add those resources to available, and repeat. If all processes can complete in some order, the state is safe and deadlock cannot occur. An unsafe state doesn't guarantee deadlock — it means deadlock MIGHT occur if processes request resources in the worst-case order.",
  },
  {
    id: "t12-q3",
    chapterId: 12,
    question:
      "How do modern database systems typically handle deadlocks?",
    options: [
      "They prevent deadlocks by requiring all locks to be acquired at transaction start time",
      "They use the Banker's Algorithm to avoid deadlocks before they occur",
      "They allow deadlocks to occur, detect them via wait-for graph cycle detection, and resolve them by rolling back one of the involved transactions",
      "They use lock-free data structures that are immune to deadlocks",
    ],
    answer: 2,
    explanation:
      "Modern databases (PostgreSQL, MySQL InnoDB, Oracle, SQL Server) use the detection-and-recovery approach. They allow transactions to acquire locks as needed (maximizing concurrency) and periodically check for deadlocks by maintaining a wait-for graph — where nodes are transactions and edges represent 'transaction A is waiting for a lock held by transaction B.' When a cycle is detected, the database selects a victim transaction (typically the one with the least work done or the youngest transaction) and rolls it back, releasing its locks and breaking the cycle. This approach is preferred because: (1) deadlocks are rare in practice (< 0.1% of transactions), so the overhead of prevention/avoidance for all transactions is not justified; (2) databases naturally support rollback, making recovery cheap; (3) the rolled-back transaction can simply be retried.",
  },

  // ============================================================
  // Topic 13: Virtualization & Containers (chapterId: 13)
  // ============================================================
  {
    id: "t13-q1",
    chapterId: 13,
    question:
      "What is the key difference between a Type 1 and Type 2 hypervisor?",
    options: [
      "Type 1 supports only Linux guests while Type 2 supports all operating systems",
      "Type 1 runs directly on the hardware (bare-metal) while Type 2 runs as an application on a host operating system",
      "Type 1 uses software emulation while Type 2 uses hardware-assisted virtualization",
      "Type 1 supports live migration while Type 2 does not",
    ],
    answer: 1,
    explanation:
      "A Type 1 (bare-metal) hypervisor runs directly on the physical hardware, acting as a thin layer between the hardware and guest operating systems. Examples include VMware ESXi, KVM (which turns the Linux kernel into a hypervisor), and Microsoft Hyper-V. A Type 2 (hosted) hypervisor runs as a regular application on top of a conventional host operating system, relying on the host OS for hardware access and resource management. Examples include VirtualBox, VMware Workstation, and Parallels Desktop. Type 1 provides better performance (less overhead, direct hardware access) and is used in data centers and cloud platforms, while Type 2 is more convenient for desktop development and testing because it coexists with the user's normal operating system.",
  },
  {
    id: "t13-q2",
    chapterId: 13,
    question:
      "How do Linux namespaces and cgroups work together to create containers?",
    options: [
      "Namespaces limit resource usage while cgroups provide isolation of system resources",
      "Namespaces provide isolation of system resources (PID, network, mounts) giving each container its own view, while cgroups limit and account for resource usage (CPU, memory, I/O) to prevent one container from starving others",
      "Namespaces handle networking while cgroups handle filesystem isolation",
      "Namespaces are used for Docker containers while cgroups are used for virtual machines",
    ],
    answer: 1,
    explanation:
      "Linux containers are built on two complementary kernel mechanisms. Namespaces provide ISOLATION — each namespace type gives the container its own isolated view of a global resource: PID namespace (container has its own PID 1), Network namespace (own network interfaces and routing), Mount namespace (own filesystem mounts), UTS namespace (own hostname), etc. Without namespaces, containers could see and interfere with each other's processes, networks, and files. Cgroups provide RESOURCE CONTROL — they limit how much CPU time, memory, I/O bandwidth, etc. a container can use, and provide accounting for monitoring. Without cgroups, a single container could consume all system resources, starving others. Together, namespaces create the illusion of a private system, while cgroups ensure fair resource sharing.",
  },
  {
    id: "t13-q3",
    chapterId: 13,
    question:
      "Why do sandbox runtimes like gVisor and Kata Containers exist when standard runc containers already provide namespace isolation?",
    options: [
      "Standard containers are too slow for production workloads, so sandbox runtimes improve performance",
      "Standard containers share the host kernel, meaning a kernel vulnerability in any container can compromise the host — sandbox runtimes add an additional isolation boundary (user-space kernel interception or lightweight VM) to limit the attack surface",
      "Standard containers cannot run applications written in languages other than Go",
      "Sandbox runtimes provide automatic scaling that standard containers lack",
    ],
    answer: 1,
    explanation:
      "Standard containers (runc) use Linux namespaces and cgroups for isolation, but all containers share the same host kernel. The Linux kernel has a large attack surface (~20 million lines of code, hundreds of system calls), and kernel vulnerabilities can allow a container to escape its namespace isolation and access the host system or other containers. gVisor addresses this by intercepting system calls from the container and handling them in a user-space 'kernel' (Sentry), so the container never directly interacts with the host kernel — even if a vulnerability exists in the host kernel, the container cannot reach it. Kata Containers takes a different approach, running each container inside a lightweight virtual machine with its own kernel, providing VM-level isolation with near-container convenience. The trade-off is performance: gVisor adds 5-50% overhead for syscall-heavy workloads, and Kata adds VM startup latency.",
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter(q => q.chapterId === chapterId);
}
