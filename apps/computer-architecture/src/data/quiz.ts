export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ─── Topic 1: Boolean Logic & Gates ────────────────────────────────
  {
    id: 't1-q1',
    chapterId: 1,
    question:
      'Why are NAND and NOR gates called "universal gates"?',
    options: [
      'Any Boolean function can be implemented using only NAND gates or only NOR gates',
      'They are the fastest gates to manufacture',
      'They consume the least power of all gate types',
      'They are used in every integrated circuit ever made',
    ],
    answer: 0,
    explanation:
      'NAND and NOR are universal because any Boolean function (AND, OR, NOT, XOR, etc.) can be constructed using only NAND gates or only NOR gates. This is a fundamental result in digital logic that simplifies manufacturing since only one gate type needs to be fabricated.',
  },
  {
    id: 't1-q2',
    chapterId: 1,
    question:
      'What is the primary advantage of using Karnaugh maps for Boolean simplification?',
    options: [
      'They work for any number of input variables without limitation',
      'They automatically generate hardware-ready netlists',
      'They replace the need for truth tables entirely',
      'They visually group adjacent terms to identify redundant variables through spatial adjacency',
    ],
    answer: 3,
    explanation:
      'K-maps exploit the property that adjacent cells differ by exactly one variable, allowing designers to visually identify and group terms where a variable can be eliminated. This spatial representation makes simplification intuitive for up to 5-6 variables, though it becomes impractical for more.',
  },
  {
    id: 't1-q3',
    chapterId: 1,
    question:
      'In CMOS technology, what has become a dominant power concern as transistors shrink below 10nm?',
    options: [
      'Dynamic switching power from clock distribution',
      'Static leakage current through transistors even when not switching',
      'Power consumed by input/output pads',
      'Power loss in interconnect wiring resistance',
    ],
    answer: 1,
    explanation:
      'As transistors shrink below 10nm, the gate oxide becomes so thin that electrons tunnel through it even when the transistor is off, causing significant leakage current. This static power dissipation is present even when the circuit is idle and has become a dominant fraction of total chip power consumption.',
  },

  // ─── Topic 2: Number Systems & Binary Arithmetic ───────────────────
  {
    id: 't2-q1',
    chapterId: 2,
    question:
      'In two\'s complement representation, what is the range of values for an 8-bit signed integer?',
    options: [
      '-127 to +127',
      '-128 to +128',
      '-128 to +127',
      '-255 to +255',
    ],
    answer: 2,
    explanation:
      'An n-bit two\'s complement number ranges from -2^(n-1) to 2^(n-1)-1. For 8 bits: -2^7 to 2^7-1 = -128 to +127. The range is asymmetric because zero takes one of the positive bit patterns, so there is one more negative value than positive.',
  },
  {
    id: 't2-q2',
    chapterId: 2,
    question:
      'Why is floating-point addition not associative — that is, why can (a + b) + c differ from a + (b + c)?',
    options: [
      'Floating-point hardware has random rounding errors that vary each time',
      'Floating-point uses base-10 internally, causing decimal conversion errors',
      'The sign bit is handled differently depending on operation order',
      'Each intermediate result is rounded to the nearest representable value, and the rounding depends on the order of operations',
    ],
    answer: 3,
    explanation:
      'IEEE 754 requires rounding the result of each individual operation to the nearest representable value. When operands have very different magnitudes, the smaller value loses precision when added to the larger one. Changing the order changes which intermediate values are rounded, potentially producing different final results.',
  },
  {
    id: 't2-q3',
    chapterId: 2,
    question:
      'A carry-lookahead adder improves upon a ripple-carry adder by:',
    options: [
      'Using fewer transistors per bit, reducing cost',
      'Computing carry signals in parallel using generate and propagate logic, reducing carry delay to O(log n)',
      'Eliminating the need for carry signals entirely through redundant encoding',
      'Operating at a lower clock frequency to avoid timing violations',
    ],
    answer: 1,
    explanation:
      'A carry-lookahead adder precomputes generate (G = A AND B) and propagate (P = A XOR B) signals for each bit position, then uses a tree of lookahead logic to compute all carries in O(log n) gate delays rather than the O(n) delays of a ripple-carry chain.',
  },

  // ─── Topic 3: Sequential & Combinational Circuits ──────────────────
  {
    id: 't3-q1',
    chapterId: 3,
    question:
      'What distinguishes a combinational circuit from a sequential circuit?',
    options: [
      'Combinational circuits are faster than sequential circuits',
      'Combinational circuits can only use AND and OR gates',
      'Sequential circuits cannot perform arithmetic operations',
      'Combinational circuit outputs depend only on current inputs, with no internal state or memory',
    ],
    answer: 3,
    explanation:
      'A combinational circuit\'s outputs are purely a function of its current inputs — it has no memory or feedback. A sequential circuit includes storage elements (flip-flops or latches) that give it state, so its outputs depend on both current inputs and the history of past inputs.',
  },
  {
    id: 't3-q2',
    chapterId: 3,
    question:
      'What happens when setup or hold time constraints are violated in a flip-flop?',
    options: [
      'The output enters a metastable state where it may oscillate unpredictably before settling to an indeterminate value',
      'The flip-flop stores the previous value instead of the new one',
      'The flip-flop permanently damages its transistors',
      'The clock signal is automatically stretched to compensate',
    ],
    answer: 0,
    explanation:
      'Violating setup or hold time means the data input is changing too close to the clock edge for the flip-flop\'s internal feedback loop to resolve cleanly. The output enters metastability — an unstable equilibrium where it may hover between 0 and 1, oscillate, or take an unpredictable amount of time to settle to either value.',
  },
  {
    id: 't3-q3',
    chapterId: 3,
    question:
      'Why can\'t hold time violations be fixed by simply lowering the clock frequency?',
    options: [
      'Hold time violations only occur at low frequencies',
      'Lower frequencies cause more skew in the clock network',
      'The clock frequency has no effect on hold time because hold time is measured relative to the clock edge, not the clock period',
      'Hold time is only relevant in asynchronous circuits',
    ],
    answer: 2,
    explanation:
      'Hold time requires that data remain stable for a minimum duration after the clock edge, regardless of how long the clock period is. Slowing the clock extends the period between edges but does not change the relationship between the clock edge and the data transition. Only adding delay to the data path can fix hold violations.',
  },

  // ─── Topic 4: ISA & Instruction Formats ────────────────────────────
  {
    id: 't4-q1',
    chapterId: 4,
    question:
      'How do modern x86 processors reconcile their CISC instruction set with efficient execution?',
    options: [
      'They skip complex instructions and only execute simple ones',
      'They use slower multi-cycle execution for all instructions',
      'They emulate x86 using a RISC processor running in software',
      'They internally translate CISC instructions into simpler RISC-like micro-operations (uops) that are pipelined and executed efficiently',
    ],
    answer: 3,
    explanation:
      'Modern x86 processors decode variable-length CISC instructions into fixed-length RISC-like micro-operations. These uops flow through a wide, out-of-order, superscalar execution engine. This hybrid approach preserves backward compatibility with decades of x86 software while achieving RISC-like execution efficiency.',
  },
  {
    id: 't4-q2',
    chapterId: 4,
    question:
      'What is a key advantage of load-store architectures (like ARM and RISC-V) over register-memory architectures (like x86)?',
    options: [
      'They simplify pipeline design because only dedicated load/store stages access memory',
      'They can encode more registers in each instruction',
      'They execute fewer total instructions for the same program',
      'They support more addressing modes per instruction',
    ],
    answer: 0,
    explanation:
      'In a load-store architecture, only load and store instructions access memory; all arithmetic operates on registers. This means only one or two pipeline stages need memory access ports, simplifying the datapath and pipeline control. Register-memory architectures allow memory operands in arithmetic instructions, creating variable-latency operations that complicate scheduling.',
  },
  {
    id: 't4-q3',
    chapterId: 4,
    question:
      'Why does RISC-V place register specifier fields in the same bit positions across all instruction formats?',
    options: [
      'To reduce the total number of instruction formats needed',
      'To maximize the number of bits available for immediate values',
      'To allow register file reads to begin before instruction decoding is complete, simplifying and speeding up the decode stage',
      'To ensure backward compatibility with MIPS instruction encoding',
    ],
    answer: 2,
    explanation:
      'By placing register specifiers (rs1, rs2, rd) in consistent bit positions across R, I, S, B, U, and J formats, the register file can begin reading operands in parallel with the rest of instruction decoding. This pipelining overlap reduces the critical path through the decode stage and simplifies the hardware.',
  },

  // ─── Topic 5: Datapath & Control Unit ──────────────────────────────
  {
    id: 't5-q1',
    chapterId: 5,
    question:
      'What is the main performance limitation of a single-cycle datapath?',
    options: [
      'It can only execute one type of instruction',
      'The clock period must accommodate the slowest instruction, leaving faster instructions idle for part of the cycle',
      'It requires separate memories for instructions and data',
      'It cannot support branch instructions',
    ],
    answer: 1,
    explanation:
      'In a single-cycle design, every instruction completes in one clock cycle. The clock period must be long enough for the slowest instruction (typically a load, which requires fetch, decode, ALU, memory access, and writeback). Simple instructions like register-to-register ADD finish early but must wait for the rest of the cycle.',
  },
  {
    id: 't5-q2',
    chapterId: 5,
    question:
      'What is a key advantage of microprogrammed control over hardwired control?',
    options: [
      'It decodes instructions faster because microcode runs in parallel',
      'It uses less hardware than hardwired control',
      'It can be updated via microcode patches to fix bugs or add features without changing hardware',
      'It consumes less power because the control ROM is passive',
    ],
    answer: 2,
    explanation:
      'Microprogrammed control stores control signal patterns in a programmable ROM, making it possible to modify the control unit behavior by updating the microcode. Intel regularly releases microcode updates to fix CPU bugs and mitigate security vulnerabilities like Spectre, without requiring hardware replacement.',
  },
  {
    id: 't5-q3',
    chapterId: 5,
    question:
      'In a multi-cycle processor, why can instruction and data memories be unified into a single memory?',
    options: [
      'Because instructions and data use different address ranges',
      'Because the processor can stall whenever a memory conflict occurs',
      'Because the memory is dual-ported, supporting two simultaneous accesses',
      'Because instruction fetch and data access happen in different clock cycles, so they never conflict',
    ],
    answer: 3,
    explanation:
      'In a multi-cycle design, instruction fetch occurs in the IF cycle and data access in the MEM cycle — different clock cycles. Since only one memory operation happens per cycle, a single-ported memory can serve both purposes. This contrasts with single-cycle designs where both must happen simultaneously, requiring separate memories.',
  },

  // ─── Topic 6: Pipelining & Hazards ─────────────────────────────────
  {
    id: 't6-q1',
    chapterId: 6,
    question:
      'Why does a load instruction followed immediately by an instruction that uses the loaded value require a pipeline stall even with forwarding?',
    options: [
      'The forwarding network does not support load instructions',
      'Load instructions always take two cycles to execute',
      'The loaded data is not available until the end of the MEM stage, which is too late to forward to the EX stage of the immediately following instruction',
      'The register file cannot perform a read and write in the same cycle',
    ],
    answer: 2,
    explanation:
      'With forwarding, ALU results from the EX stage can be sent to the next instruction\'s EX stage. But a load reads data from memory in the MEM stage, which occurs one cycle later. The dependent instruction needs the value at the start of its EX stage, but it won\'t be available until the end of the load\'s MEM stage — a one-cycle gap that requires a stall (bubble).',
  },
  {
    id: 't6-q2',
    chapterId: 6,
    question:
      'What is the primary security concern with speculative execution past branch predictions?',
    options: [
      'It uses too much power and can damage the processor',
      'It can corrupt the register file if the prediction is wrong',
      'It violates memory protection by accessing kernel memory directly',
      'Speculatively accessed data can leave observable traces in caches and other microarchitectural state, creating side-channel information leaks',
    ],
    answer: 3,
    explanation:
      'Even though speculatively executed instructions are architecturally squashed on misprediction, their effects on caches, TLBs, and branch predictors persist. The Spectre family of attacks exploits this by tricking the processor into speculatively accessing sensitive data, then inferring the data through cache timing measurements.',
  },
  {
    id: 't6-q3',
    chapterId: 6,
    question:
      'Why did most modern ISAs abandon the delayed branching approach used in MIPS?',
    options: [
      'Delayed branching exposes pipeline depth in the ISA, constraining future pipeline redesigns and creating backward compatibility issues',
      'Compilers could never find useful instructions to fill the delay slot',
      'Delayed branching only works with 5-stage pipelines',
      'Branch prediction made delayed branching impossible to implement',
    ],
    answer: 0,
    explanation:
      'Delayed branching encodes the number of delay slots (pipeline stages between branch and execution) into the ISA. If a future processor implementation changes the pipeline depth, it must still honor the original delay slot count for compatibility, either wasting cycles or adding complexity. Modern ISAs keep pipeline details invisible to software.',
  },

  // ─── Topic 7: Cache Architecture ───────────────────────────────────
  {
    id: 't7-q1',
    chapterId: 7,
    question:
      'What problem does set-associative caching solve compared to direct-mapped caching?',
    options: [
      'It reduces the total cache size needed',
      'It makes cache access faster by reducing tag comparison',
      'It removes the need for a replacement policy',
      'It reduces conflict misses by allowing multiple blocks with the same index to coexist in the same set',
    ],
    answer: 3,
    explanation:
      'In a direct-mapped cache, each memory block maps to exactly one cache line. If two frequently used blocks map to the same line, they continuously evict each other (conflict misses). Set-associative caches provide N ways per set, allowing N blocks with the same index to coexist, dramatically reducing conflict misses.',
  },
  {
    id: 't7-q2',
    chapterId: 7,
    question:
      'In the AMAT formula (AMAT = Hit Time + Miss Rate x Miss Penalty), why does reducing the miss rate at any level of the cache hierarchy improve overall performance?',
    options: [
      'Because each miss triggers a full access to main memory regardless of cache level',
      'Because each cache level acts as a filter — reducing misses at level N reduces traffic to slower level N+1, compounding the benefit',
      'Because miss rate and hit time are always inversely proportional',
      'Because the miss penalty is the same at every cache level',
    ],
    answer: 1,
    explanation:
      'The AMAT formula is recursive: the miss penalty at level N includes the AMAT of level N+1. Reducing misses at any level reduces the number of accesses to the slower next level, and that next level\'s misses also propagate further. This filtering effect means improvements at any level compound through the hierarchy.',
  },
  {
    id: 't7-q3',
    chapterId: 7,
    question:
      'What is the key idea behind cache-oblivious algorithms?',
    options: [
      'They bypass the cache entirely and operate directly on main memory',
      'They use software prefetch instructions to preload data into the cache',
      'They recursively divide problems into sub-problems that eventually fit in any cache, achieving good cache performance without knowing cache parameters',
      'They are designed for processors without caches, like early microcontrollers',
    ],
    answer: 2,
    explanation:
      'Cache-oblivious algorithms use recursive decomposition to break problems into progressively smaller sub-problems. At some recursion level, the sub-problem fits entirely in L1, L2, or L3 cache — regardless of cache sizes. This achieves optimal cache complexity across all cache levels without being tuned for any specific cache configuration.',
  },

  // ─── Topic 8: Virtual Memory Hardware ──────────────────────────────
  {
    id: 't8-q1',
    chapterId: 8,
    question:
      'Why do modern processors use multi-level page tables instead of a single flat page table?',
    options: [
      'Multi-level page tables are faster to traverse',
      'Multi-level tables support larger page sizes',
      'Flat page tables cannot store permission bits',
      'A flat page table for a 48-bit address space would require enormous contiguous memory even for small processes, while multi-level tables only allocate entries for used regions',
    ],
    answer: 3,
    explanation:
      'A flat page table for a 48-bit virtual address space with 4 KB pages would need 2^36 entries (about 512 GB of table memory per process). Multi-level page tables allocate sub-tables only for address ranges that are actually mapped, so a process using 100 MB of memory needs only a few KB of page table entries.',
  },
  {
    id: 't8-q2',
    chapterId: 8,
    question:
      'How do ASIDs (Address Space Identifiers) improve TLB performance?',
    options: [
      'They allow TLB entries from different processes to coexist, avoiding full TLB flushes on context switches',
      'They increase the number of entries the TLB can hold',
      'They speed up the page table walk by providing a shortcut',
      'They enable the TLB to predict which pages will be accessed next',
    ],
    answer: 0,
    explanation:
      'Without ASIDs, every context switch must flush the entire TLB because entries from the old process have different virtual-to-physical mappings. ASIDs tag each TLB entry with the process identifier, so entries from multiple processes coexist safely. After a context switch, the new process finds its cached translations still present.',
  },
  {
    id: 't8-q3',
    chapterId: 8,
    question:
      'How does Copy-on-Write (COW) use the MMU\'s protection mechanism?',
    options: [
      'It marks shared pages as non-cacheable to prevent stale reads',
      'It sets the no-execute bit on shared pages to prevent code injection',
      'It marks shared pages as read-only so that a write triggers a protection fault, prompting the OS to create a private copy for the writing process',
      'It uses the supervisor bit to restrict COW pages to kernel-mode access only',
    ],
    answer: 2,
    explanation:
      'COW shares physical pages between processes (e.g., after fork()) by marking them read-only in both processes\' page tables. When either process writes to a shared page, the MMU raises a protection fault. The OS fault handler allocates a new physical page, copies the data, updates the writing process\'s page table to point to the private copy with write permission, and restarts the instruction.',
  },

  // ─── Topic 9: Memory Technologies ──────────────────────────────────
  {
    id: 't9-q1',
    chapterId: 9,
    question:
      'Why is SRAM used for caches instead of DRAM, despite DRAM being much denser?',
    options: [
      'SRAM retains data without power, making it more reliable',
      'SRAM uses less power per bit than DRAM',
      'DRAM cannot be integrated onto the same chip as the processor',
      'SRAM is faster and does not require refresh cycles, matching the speed needed for processor caches, even though it is less dense and more expensive per bit',
    ],
    answer: 3,
    explanation:
      'SRAM access times (0.5-5 ns) can keep pace with multi-GHz processors, while DRAM access times (~15-45 ns) cannot. SRAM also does not need periodic refresh (which adds latency and complexity). The 6-transistor SRAM cell is larger and more expensive than the 1-transistor DRAM cell, but the speed advantage is essential for cache performance.',
  },
  {
    id: 't9-q2',
    chapterId: 9,
    question:
      'What is "write amplification" in NAND flash storage?',
    options: [
      'The voltage boost needed to program flash cells',
      'The phenomenon where the physical amount of data written exceeds the logical amount due to garbage collection copying valid pages before erasing blocks',
      'Signal amplification in the flash sense amplifiers during writes',
      'The extra error correction data written alongside user data',
    ],
    answer: 1,
    explanation:
      'NAND flash can only erase in large blocks (256 KB - 4 MB) but writes in smaller pages. When a block must be reclaimed, the flash translation layer copies all valid pages to a new block before erasing the old one. This garbage collection causes more physical writes than the application requested, reducing effective write performance and accelerating wear.',
  },
  {
    id: 't9-q3',
    chapterId: 9,
    question:
      'Why does DDR memory transfer data on both clock edges?',
    options: [
      'To support error correction by sending data twice',
      'To maintain backward compatibility with SDR memory controllers',
      'To double the effective data rate without increasing the clock frequency, since faster clocks would create signal integrity problems',
      'To reduce power consumption by using a lower clock frequency',
    ],
    answer: 2,
    explanation:
      'DDR (Double Data Rate) transfers data on both the rising and falling edges of the clock signal, doubling the data rate compared to SDR (Single Data Rate) at the same clock frequency. This is preferable to simply doubling the clock frequency because higher frequencies create more signal integrity challenges on the memory bus PCB traces.',
  },

  // ─── Topic 10: Branch Prediction & Speculation ─────────────────────
  {
    id: 't10-q1',
    chapterId: 10,
    question:
      'What advantage does a 2-bit saturating counter predictor have over a 1-bit predictor?',
    options: [
      'It can predict branches with more than two outcomes',
      'It requires only a single misprediction to change its prediction',
      'It uses less hardware than a 1-bit predictor',
      'It tolerates one anomalous branch outcome before changing its prediction, improving accuracy on loop exit branches',
    ],
    answer: 3,
    explanation:
      'A 1-bit predictor flips its prediction after every misprediction, causing two mispredictions per loop (on entry and exit). A 2-bit saturating counter has four states (strongly/weakly taken/not-taken) and requires two consecutive mispredictions to switch, tolerating the single anomaly at a loop boundary.',
  },
  {
    id: 't10-q2',
    chapterId: 10,
    question:
      'How does the Reorder Buffer (ROB) enable correct recovery from branch mispredictions?',
    options: [
      'It prevents any speculative instructions from executing until the branch is resolved',
      'It tracks all in-flight instructions in program order, allowing speculative results to be squashed from the misprediction point forward while preserving correctly executed older instructions',
      'It duplicates the register file before each branch so the old state can be restored',
      'It re-fetches all instructions from memory after a misprediction',
    ],
    answer: 1,
    explanation:
      'The ROB maintains program order for all in-flight instructions, including speculative ones. When a misprediction is detected, the ROB identifies the mispredicted branch and flushes all younger entries (speculative results), while entries older than the branch have already been verified and can commit normally. This enables precise recovery.',
  },
  {
    id: 't10-q3',
    chapterId: 10,
    question:
      'Why is the Return Address Stack (RAS) effective for predicting function return targets?',
    options: [
      'The RAS uses branch history to correlate return patterns with prior branches',
      'Function calls and returns follow a strict LIFO pattern, so a hardware stack naturally predicts return addresses with near-perfect accuracy',
      'Function return addresses are always the same for each function',
      'Modern calling conventions encode the return address in the instruction itself',
    ],
    answer: 1,
    explanation:
      'Function calls push a return address and returns pop it, following a Last-In-First-Out (LIFO) pattern. A hardware stack that mirrors this behavior — pushing on call and popping on return — naturally predicts the correct return address with near-perfect accuracy for non-recursive code. This simple structure outperforms general-purpose branch predictors for returns.',
  },

  // ─── Topic 11: Superscalar & Out-of-Order Execution ────────────────
  {
    id: 't11-q1',
    chapterId: 11,
    question:
      'Why do modern processors have far more physical registers than architectural registers?',
    options: [
      'To provide backup copies in case of hardware errors',
      'Because the ISA requires all physical registers to be programmer-accessible',
      'To enable register renaming, which eliminates false (WAR and WAW) dependencies and allows more instructions to execute in parallel out of order',
      'To store microcode sequences for complex instructions',
    ],
    answer: 2,
    explanation:
      'Register renaming maps each architectural register write to a fresh physical register, eliminating false dependencies where instructions reuse the same register name without a true data dependency. With 16 architectural registers but 280+ physical registers, the processor can have hundreds of instructions in flight without false dependencies blocking parallel execution.',
  },
  {
    id: 't11-q2',
    chapterId: 11,
    question:
      'What does store-to-load forwarding accomplish in an out-of-order processor?',
    options: [
      'It ensures stores are written to memory before any subsequent load can execute',
      'It converts store instructions into load instructions for efficiency',
      'It forwards prediction results from the branch predictor to the load unit',
      'It allows a load to receive its value directly from an older store in the store buffer when the addresses match, without waiting for the store to commit to cache',
    ],
    answer: 3,
    explanation:
      'When a load executes, the store buffer is checked for any older store to the same address. If found, the load receives the stored value directly from the buffer, bypassing the cache entirely. This is essential for out-of-order execution because stores may not have committed to cache yet, but dependent loads need the data immediately.',
  },
  {
    id: 't11-q3',
    chapterId: 11,
    question:
      'Why do real programs typically achieve only 2-4 IPC on 6-8 wide superscalar processors?',
    options: [
      'Real programs have limited instruction-level parallelism due to data dependencies, branches, and cache misses that prevent all issue slots from being filled every cycle',
      'The processors are intentionally throttled to save power',
      'Compiler technology is not advanced enough to exploit more parallelism',
      'The operating system limits the number of instructions each process can execute per cycle',
    ],
    answer: 0,
    explanation:
      'Real programs contain chains of dependent instructions (where each instruction needs the result of the previous one), unpredictable branches that cause pipeline flushes, and cache misses that stall execution. These factors limit the instruction-level parallelism available in any given window of instructions, preventing the processor from filling all functional units every cycle.',
  },

  // ─── Topic 12: Multicore & GPU Architecture ────────────────────────
  {
    id: 't12-q1',
    chapterId: 12,
    question:
      'What is "false sharing" in a multicore processor with cache coherence?',
    options: [
      'When two cores read the same variable simultaneously',
      'When a core caches data that it never actually uses',
      'When two cores modify different variables that happen to reside on the same cache line, triggering unnecessary coherence traffic',
      'When the coherence protocol sends data to the wrong core',
    ],
    answer: 2,
    explanation:
      'Cache coherence operates at cache-line granularity (typically 64 bytes). If core A modifies variable X and core B modifies variable Y, but X and Y are on the same cache line, the coherence protocol treats this as a conflict — each write invalidates the other core\'s copy of the entire line. This unnecessary traffic can degrade parallel performance dramatically.',
  },
  {
    id: 't12-q2',
    chapterId: 12,
    question:
      'In GPU SIMT execution, what happens when threads in a warp take different branches (divergence)?',
    options: [
      'The warp splits into two independent warps that execute in parallel',
      'Both branch paths must be executed serially by the warp, with inactive threads masked, reducing efficiency',
      'The divergent threads are moved to a different SM for parallel execution',
      'The GPU predicts which branch most threads will take and only executes that path',
    ],
    answer: 1,
    explanation:
      'When threads in a warp diverge at a branch, the SM must execute both paths sequentially. During each path, threads not taking that path are masked (their results are discarded). This serialization means divergent warps take twice as long as convergent ones, making branch divergence a major performance concern in GPU programming.',
  },
  {
    id: 't12-q3',
    chapterId: 12,
    question:
      'Why have chiplet-based processor designs (like AMD EPYC) become popular?',
    options: [
      'Chiplets improve manufacturing yield because smaller dies have fewer defects, and they enable heterogeneous integration of different process technologies',
      'Chiplets are easier to cool than monolithic dies',
      'Chiplets eliminate the need for cache coherence between cores',
      'Chiplets allow processors to be upgraded by swapping individual chiplets',
    ],
    answer: 0,
    explanation:
      'Manufacturing yield drops dramatically as die size increases because a single defect anywhere on the die renders it unusable. Chiplets use smaller dies with much higher yield, connected by a die-to-die interconnect. This also allows mixing different process nodes — compute chiplets on cutting-edge process and I/O chiplets on mature, cheaper processes.',
  },

  // ─── Topic 13: I/O Systems & Bus Architecture ─────────────────────
  {
    id: 't13-q1',
    chapterId: 13,
    question:
      'Why was the NVMe protocol developed to replace AHCI for solid-state drives?',
    options: [
      'AHCI was only designed for IDE drives and could not work with SATA',
      'NVMe uses a simpler protocol that is easier to implement in hardware',
      'NVMe supports up to 65,535 I/O queues with 65,535 commands each, matching the massive internal parallelism of SSDs that AHCI\'s single command queue could not exploit',
      'AHCI could not support drives larger than 2 TB',
    ],
    answer: 2,
    explanation:
      'AHCI was designed for spinning hard drives with a single command queue of 32 entries — sufficient for a single mechanical head. SSDs have hundreds of flash chips that can operate in parallel, but AHCI\'s single queue created a severe bottleneck. NVMe provides 65K queues with 65K commands each, enabling the host to saturate the SSD\'s internal parallelism.',
  },
  {
    id: 't13-q2',
    chapterId: 13,
    question:
      'When does polling become more efficient than interrupt-driven I/O?',
    options: [
      'When the device is very slow and generates infrequent events',
      'When the processor has no interrupt controller',
      'Polling is always less efficient than interrupts',
      'When the event rate is so high that the overhead of interrupt context switching exceeds the cost of continuously checking device status',
    ],
    answer: 3,
    explanation:
      'Each interrupt requires saving processor state, jumping to the handler, processing the event, and restoring state — overhead that is amortized over the time between events. At very high event rates (millions of network packets per second), this overhead dominates. Polling eliminates the context switch cost and can batch-process multiple events, making it more efficient despite consuming a dedicated CPU core.',
  },
  {
    id: 't13-q3',
    chapterId: 13,
    question:
      'What is the primary purpose of an IOMMU (I/O Memory Management Unit)?',
    options: [
      'To speed up DMA transfers by caching device data',
      'To provide address translation and access control for DMA, preventing devices from accessing arbitrary physical memory and enabling safe device assignment to virtual machines',
      'To manage interrupt routing between devices and CPU cores',
      'To compress data transferred between devices and memory',
    ],
    answer: 1,
    explanation:
      'The IOMMU translates device DMA addresses through page tables similar to CPU virtual memory, restricting each device to only the memory regions it is authorized to access. This prevents rogue or compromised devices from reading/writing arbitrary memory, and enables virtual machines to use devices directly (passthrough) without the hypervisor mediating every DMA transfer.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
