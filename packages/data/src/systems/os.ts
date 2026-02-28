import type { SystemConcept } from '../types';

export const processes: SystemConcept = {
  id: 'processes',
  name: 'Processes',
  category: 'operating-systems',
  pillar: 'systems',
  difficulty: 'medium',
  description: 'A process is an instance of a running program with its own memory space, file descriptors, and execution context. The OS manages process lifecycle, scheduling, and inter-process communication.',
  keyPoints: [
    'Each process has its own virtual address space',
    'Process states: new, ready, running, waiting, terminated',
    'Context switching between processes is expensive',
    'IPC mechanisms: pipes, sockets, shared memory, message queues',
    'Fork creates a child process (copy-on-write)',
  ],
  tradeoffs: [
    'Process isolation is safe but IPC is slower than shared memory',
    'More overhead than threads for concurrent tasks',
    'Better fault isolation — one process crashing does not affect others',
  ],
  realWorldExamples: ['Web browsers (each tab as a process)', 'Docker containers', 'Microservices'],
};

export const threads: SystemConcept = {
  id: 'threads',
  name: 'Threads',
  category: 'operating-systems',
  pillar: 'systems',
  difficulty: 'medium',
  description: 'Threads are lightweight units of execution within a process. They share the same memory space but have their own stack and registers.',
  keyPoints: [
    'Share memory space with other threads in the same process',
    'Lighter than processes — faster creation and context switching',
    'Shared state requires synchronization (mutexes, semaphores)',
    'Race conditions occur when threads access shared data without synchronization',
    'Deadlock: two threads each waiting for the other to release a resource',
  ],
  tradeoffs: [
    'Shared memory is fast but prone to concurrency bugs',
    'Context switching is cheaper than processes but not free',
    'GIL in Python limits true parallelism for CPU-bound work',
  ],
  realWorldExamples: ['Web server request handling', 'GUI applications', 'Parallel computation'],
};

export const memoryManagement: SystemConcept = {
  id: 'memory-management',
  name: 'Memory Management',
  category: 'operating-systems',
  pillar: 'systems',
  difficulty: 'hard',
  description: 'The OS manages how memory is allocated, used, and reclaimed. Key concepts include virtual memory, paging, segmentation, and garbage collection in managed languages.',
  keyPoints: [
    'Virtual memory: each process sees a contiguous address space',
    'Paging: divides memory into fixed-size pages mapped to physical frames',
    'Page faults: accessing a page not in physical memory triggers disk read',
    'Stack: automatic allocation for local variables (LIFO)',
    'Heap: dynamic allocation (malloc/new), must be explicitly freed or garbage collected',
  ],
  tradeoffs: [
    'Virtual memory enables isolation but adds translation overhead (TLB)',
    'Garbage collection reduces bugs but adds pauses and overhead',
    'Manual memory management is faster but error-prone (leaks, dangling pointers)',
  ],
  realWorldExamples: ['Memory-mapped files', 'Swap space', 'JVM garbage collector', 'Rust ownership model'],
};

export const osConcepts: SystemConcept[] = [
  processes,
  threads,
  memoryManagement,
];
