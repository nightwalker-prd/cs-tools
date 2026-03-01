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
  { id: 2, title: 'Static & Dynamic Analysis' },
  { id: 3, title: 'Malware & Anti-Analysis' },
  { id: 4, title: 'Specialized RE' },
];

export const topics: Topic[] = [
  // Part 1: Foundations
  {
    id: 1,
    title: 'RE Methodology & Tooling',
    part: 1,
    partTitle: 'Foundations',
    summary: 'Reverse engineering workflow, static vs dynamic analysis approaches, and the essential toolchain for binary analysis.',
    concepts: [
      {
        id: '1-1',
        name: 'Static vs Dynamic Analysis',
        description: 'Two fundamental approaches to understanding binary behavior without and with execution.',
        keyPoints: [
          'Static analysis examines code without executing it — disassembly, decompilation, string extraction, and control flow analysis',
          'Dynamic analysis runs the binary in a controlled environment — debugging, tracing, API monitoring, and memory inspection',
          'Hybrid approaches combine both: static analysis identifies interesting code paths, dynamic analysis confirms behavior',
          'Static analysis is safe but may miss runtime-generated code; dynamic analysis sees actual behavior but may miss dormant paths',
        ],
        tradeoffs: [
          'Static analysis cannot resolve indirect calls or runtime-unpacked code without additional techniques',
          'Dynamic analysis risks executing malicious payloads and may trigger anti-analysis checks',
        ],
        realWorld: ['IDA Pro', 'Ghidra', 'x64dbg', 'Process Monitor'],
      },
      {
        id: '1-2',
        name: 'Ghidra & IDA Pro',
        description: 'The two dominant disassembly and decompilation platforms for reverse engineering.',
        keyPoints: [
          'IDA Pro is the industry standard — advanced auto-analysis, FLIRT signatures, Hex-Rays decompiler, extensive plugin ecosystem',
          'Ghidra is NSA\'s open-source alternative — free, multi-architecture, built-in decompiler, scriptable via Java/Python',
          'Both support collaborative analysis: IDA with Lumina/Revsync, Ghidra with shared projects',
          'Key features: cross-references (xrefs), function signature matching, type reconstruction, and scripting APIs',
        ],
        tradeoffs: [
          'IDA Pro requires expensive licensing; Ghidra is free but has a steeper learning curve for some workflows',
          'IDA\'s decompiler produces cleaner output for x86; Ghidra\'s decompiler handles more architectures',
        ],
        realWorld: ['IDA Pro', 'Ghidra', 'Binary Ninja', 'radare2/Cutter'],
      },
      {
        id: '1-3',
        name: 'RE Workflow & Methodology',
        description: 'Structured approach to reverse engineering a binary from initial triage to complete understanding.',
        keyPoints: [
          'Triage phase: file type identification (file/magic bytes), string extraction, import/export analysis, entropy check',
          'Surface analysis: identify compiler/packer, map program structure, locate main() and key functions',
          'Deep analysis: trace execution flow, reconstruct algorithms, identify data structures and protocols',
          'Documentation: annotate functions, create type definitions, write behavioral summaries throughout the process',
        ],
        tradeoffs: [
          'Depth-first analysis can miss the big picture; breadth-first can waste time on irrelevant code',
          'Automated tools accelerate triage but may produce false positives that mislead deeper analysis',
        ],
        realWorld: ['CTF competitions', 'malware analysis', 'vulnerability research', 'software compatibility'],
      },
    ],
  },
  {
    id: 2,
    title: 'x86/x64 Assembly Fundamentals',
    part: 1,
    partTitle: 'Foundations',
    summary: 'Essential x86/x64 assembly knowledge for reading disassembled code — registers, instructions, calling conventions, and stack frames.',
    concepts: [
      {
        id: '2-1',
        name: 'Registers & Instruction Set',
        description: 'CPU registers and the most common x86/x64 instructions encountered during reverse engineering.',
        keyPoints: [
          'General-purpose registers: RAX (return value), RBX, RCX (counter/arg4), RDX (arg3), RSI (arg2), RDI (arg1), RSP (stack pointer), RBP (base pointer)',
          'Common instructions: MOV (assign), LEA (load address), PUSH/POP (stack), CALL/RET (functions), CMP/TEST (compare), JCC (conditional jumps)',
          'Arithmetic: ADD, SUB, IMUL, IDIV, SHL/SHR (shift), AND/OR/XOR (bitwise)',
          'x64 extends x86 with 64-bit registers (RAX vs EAX), additional registers R8-R15, and RIP-relative addressing',
        ],
        tradeoffs: [
          'Intel syntax (dest, src) vs AT&T syntax (src, dest) — tools vary in default syntax',
          'Understanding assembly is essential but time-consuming; decompilers help but aren\'t always accurate',
        ],
        realWorld: ['x86/x64 binaries', 'Windows/Linux/macOS reversing', 'shellcode analysis'],
      },
      {
        id: '2-2',
        name: 'Calling Conventions',
        description: 'How functions receive arguments and return values differs by platform and compiler.',
        keyPoints: [
          'System V AMD64 (Linux/macOS): args in RDI, RSI, RDX, RCX, R8, R9; return in RAX; callee saves RBX, RBP, R12-R15',
          'Microsoft x64 (Windows): args in RCX, RDX, R8, R9; 32-byte shadow space on stack; return in RAX',
          'x86 cdecl: all args on stack right-to-left; caller cleans up; return in EAX',
          'stdcall (Win32 API): args on stack; callee cleans up — recognizable by RET N instruction',
        ],
        tradeoffs: [
          'Register-based conventions are faster but harder to trace in disassembly when registers are reused',
          'Optimized code may deviate from standard conventions, making parameter identification harder',
        ],
        realWorld: ['Windows API calls', 'Linux syscalls', 'cross-platform libraries'],
      },
      {
        id: '2-3',
        name: 'Stack Frames & Function Prologues',
        description: 'How the stack is organized per function and how to identify function boundaries.',
        keyPoints: [
          'Classic prologue: PUSH RBP; MOV RBP, RSP; SUB RSP, N — sets up frame pointer and allocates local variables',
          'Epilogue: MOV RSP, RBP; POP RBP; RET — or LEAVE; RET as shorthand',
          'Local variables addressed as [RBP-offset], function arguments as [RBP+offset] (x86) or in registers (x64)',
          'Modern compilers often omit frame pointer (-fomit-frame-pointer), using RSP-relative addressing throughout',
        ],
        tradeoffs: [
          'Frame pointer omission makes code faster but stack traces and local variable identification harder',
          'Compiler optimizations may inline functions, eliminating prologues entirely',
        ],
        realWorld: ['stack buffer overflow analysis', 'debugging crashes', 'function boundary detection'],
      },
    ],
  },
  {
    id: 3,
    title: 'Executable Formats & Loaders',
    part: 1,
    partTitle: 'Foundations',
    summary: 'Understanding PE, ELF, and Mach-O binary formats — sections, headers, imports, exports, and how the OS loads executables into memory.',
    concepts: [
      {
        id: '3-1',
        name: 'PE Format (Windows)',
        description: 'The Portable Executable format used by Windows executables, DLLs, and drivers.',
        keyPoints: [
          'DOS header (MZ magic) → PE signature → COFF header → Optional header (entry point, image base, section alignment)',
          'Key sections: .text (code), .data (initialized data), .rdata (read-only/imports), .rsrc (resources), .reloc (relocations)',
          'Import Address Table (IAT): resolved at load time, lists DLLs and functions the binary depends on',
          'Export table: functions the binary provides to others, critical for DLL analysis',
        ],
        tradeoffs: [
          'Rich header contains compiler metadata useful for attribution but can be easily forged',
          'PE format supports both 32-bit (PE32) and 64-bit (PE32+), requiring tools that handle both',
        ],
        realWorld: ['Windows malware analysis', 'DLL injection', 'packer detection'],
      },
      {
        id: '3-2',
        name: 'ELF Format (Linux)',
        description: 'The Executable and Linkable Format used by Linux and most Unix-like systems.',
        keyPoints: [
          'ELF header: magic (0x7F ELF), class (32/64-bit), endianness, entry point, program/section header offsets',
          'Program headers (segments): PT_LOAD (loadable), PT_DYNAMIC (dynamic linking info), PT_INTERP (loader path)',
          'Section headers: .text, .data, .bss (uninitialized), .plt/.got (lazy binding), .symtab/.strtab (symbols)',
          'GOT/PLT mechanism: Global Offset Table + Procedure Linkage Table enable position-independent code and lazy symbol resolution',
        ],
        tradeoffs: [
          'Stripped binaries remove symbol tables, making analysis much harder but reducing file size',
          'PIE (Position Independent Executables) improve security but complicate static address references',
        ],
        realWorld: ['Linux malware', 'IoT firmware', 'Android native libraries'],
      },
      {
        id: '3-3',
        name: 'Dynamic Linking & Loading',
        description: 'How shared libraries are resolved and loaded at runtime by the OS loader.',
        keyPoints: [
          'Windows: LoadLibrary/GetProcAddress for runtime linking; DLL search order can be exploited (DLL hijacking)',
          'Linux: ld.so resolves shared objects; LD_PRELOAD allows hooking by loading libraries first',
          'Lazy binding defers symbol resolution until first call via PLT stubs — GOT entries updated on first invocation',
          'ASLR randomizes base addresses of executables and libraries, complicating exploitation and requiring PIE/PIC support',
        ],
        tradeoffs: [
          'Dynamic linking reduces binary size and enables updates, but introduces attack surface (DLL hijacking, LD_PRELOAD injection)',
          'Static linking eliminates loader dependencies but bloats binary size and complicates patching',
        ],
        realWorld: ['DLL hijacking attacks', 'LD_PRELOAD rootkits', 'GOT overwrite exploits'],
      },
    ],
  },

  // Part 2: Static & Dynamic Analysis
  {
    id: 4,
    title: 'Disassembly & Decompilation',
    part: 2,
    partTitle: 'Static & Dynamic Analysis',
    summary: 'Techniques for converting machine code back to assembly and higher-level representations — algorithms, challenges, and limitations.',
    concepts: [
      {
        id: '4-1',
        name: 'Disassembly Algorithms',
        description: 'Linear sweep vs recursive descent — two approaches to converting bytes back to instructions.',
        keyPoints: [
          'Linear sweep disassembles sequentially from start to end — simple but easily confused by inline data or padding',
          'Recursive descent follows control flow (branches, calls) — more accurate but may miss unreachable code',
          'IDA/Ghidra use recursive descent with heuristics for function detection, switch tables, and exception handlers',
          'Challenges: variable-length instructions (x86), overlapping instructions, and intentionally obfuscated code',
        ],
        tradeoffs: [
          'Linear sweep covers all bytes but produces garbage at data regions; recursive descent is precise but may miss code',
          'Heuristics improve coverage but can produce false positives in function detection',
        ],
        realWorld: ['IDA Pro auto-analysis', 'Ghidra analysis engine', 'objdump (linear)', 'Capstone library'],
      },
      {
        id: '4-2',
        name: 'Control Flow Graphs',
        description: 'Visual representation of program flow through basic blocks and their connections.',
        keyPoints: [
          'Basic block: a sequence of instructions with one entry point and one exit point (no branches in the middle)',
          'CFG nodes are basic blocks; edges represent branches (conditional, unconditional, fall-through)',
          'Dominator trees identify loops, if/else structures, and switch statements from raw branch patterns',
          'Structured analysis: lifting CFG back to high-level constructs (while, for, if/else) for decompiler output',
        ],
        tradeoffs: [
          'CFGs can become extremely complex for large functions — simplification may lose important details',
          'Indirect branches (jump tables, computed gotos) create incomplete CFGs without additional analysis',
        ],
        realWorld: ['IDA graph view', 'Ghidra function graphs', 'angr CFG recovery'],
      },
      {
        id: '4-3',
        name: 'Decompilation & Pseudocode',
        description: 'Lifting assembly back to C-like pseudocode — the holy grail of reverse engineering automation.',
        keyPoints: [
          'Decompilers reconstruct high-level code from assembly via type recovery, expression folding, and control flow structuring',
          'Hex-Rays (IDA) and Ghidra\'s decompiler are the most widely used — output quality varies by architecture and optimization level',
          'Type propagation infers variable types from usage patterns (pointer arithmetic, struct field access, function signatures)',
          'Limitations: decompilers struggle with heavy optimization (SIMD, vectorization), custom calling conventions, and obfuscated code',
        ],
        tradeoffs: [
          'Decompiled code is easier to read but may introduce inaccuracies — always verify against disassembly',
          'Manual type annotation dramatically improves decompiler output but requires significant effort',
        ],
        realWorld: ['Hex-Rays decompiler', 'Ghidra decompiler', 'RetDec', 'Snowman'],
      },
    ],
  },
  {
    id: 5,
    title: 'Debugging Techniques',
    part: 2,
    partTitle: 'Static & Dynamic Analysis',
    summary: 'Dynamic analysis through debugging — breakpoints, memory inspection, tracing, and advanced debugging strategies.',
    concepts: [
      {
        id: '5-1',
        name: 'Breakpoints & Stepping',
        description: 'Controlling execution flow to observe program behavior at specific points.',
        keyPoints: [
          'Software breakpoints: replace instruction with INT 3 (0xCC) — unlimited but detectable by anti-debugging',
          'Hardware breakpoints: use debug registers (DR0-DR3) — limited to 4 but invisible to memory checksums',
          'Memory breakpoints: set page permissions to trigger on access — useful for watching data reads/writes',
          'Step-into follows calls into functions; step-over executes entire function; step-out runs until current function returns',
        ],
        tradeoffs: [
          'Software breakpoints modify code, potentially triggering integrity checks in protected software',
          'Hardware breakpoints are limited in count but are much harder for anti-debugging to detect',
        ],
        realWorld: ['x64dbg', 'WinDbg', 'GDB', 'LLDB'],
      },
      {
        id: '5-2',
        name: 'Memory & Register Inspection',
        description: 'Examining program state during execution to understand data flow and transformations.',
        keyPoints: [
          'Watch expressions track variable values as execution progresses — essential for understanding algorithms',
          'Memory dump analysis: view raw bytes, interpret as different types (int, float, string, struct)',
          'Stack view shows local variables, return addresses, and saved registers — critical for understanding function calls',
          'Heap inspection reveals dynamically allocated objects, their sizes, and relationships between structures',
        ],
        tradeoffs: [
          'Extensive memory monitoring slows execution significantly, potentially affecting timing-sensitive code',
          'Heap analysis tools add overhead and may alter allocation patterns, changing behavior',
        ],
        realWorld: ['Cheat Engine', 'WinDbg memory commands', 'GDB examine commands'],
      },
      {
        id: '5-3',
        name: 'Tracing & API Monitoring',
        description: 'Recording execution traces and monitoring system/API calls to understand program behavior.',
        keyPoints: [
          'Instruction tracing records every executed instruction — generates massive logs but shows exact execution path',
          'API monitoring (strace/ltrace on Linux, API Monitor on Windows) captures system and library calls with arguments',
          'Process Monitor (Procmon) captures file, registry, network, and process activity on Windows',
          'Code coverage tools identify which code paths were exercised, guiding further static analysis',
        ],
        tradeoffs: [
          'Full instruction tracing is slow and produces enormous output — filtering is essential',
          'API-level tracing misses internal logic but quickly reveals high-level behavior patterns',
        ],
        realWorld: ['strace', 'ltrace', 'Procmon', 'Intel Pin', 'DynamoRIO'],
      },
    ],
  },
  {
    id: 6,
    title: 'Binary Patching & Instrumentation',
    part: 2,
    partTitle: 'Static & Dynamic Analysis',
    summary: 'Modifying binaries at runtime or on disk — patching, hooking, and dynamic binary instrumentation frameworks.',
    concepts: [
      {
        id: '6-1',
        name: 'Binary Patching',
        description: 'Modifying executable bytes to change program behavior — from simple NOPs to complex code caves.',
        keyPoints: [
          'NOP patching: replace conditional jumps with NOP (0x90) to bypass checks — simplest form of patching',
          'Jump patching: change JNZ to JZ (or vice versa) to invert conditional logic',
          'Code caves: find unused space in the binary to insert new code, then redirect execution to the cave',
          'Relocation and section alignment must be maintained — improper patching can crash the binary or break signatures',
        ],
        tradeoffs: [
          'Patching changes file hashes and may break digital signatures or integrity checks',
          'Code caves are limited by available space and may not exist in tightly packed binaries',
        ],
        realWorld: ['game modding', 'license bypass research', 'bug hot-patching', 'CTF challenges'],
      },
      {
        id: '6-2',
        name: 'Function Hooking',
        description: 'Intercepting function calls to monitor, modify, or replace behavior at runtime.',
        keyPoints: [
          'Inline hooking: overwrite function prologue with JMP to hook function, execute original code from trampoline',
          'IAT/GOT hooking: replace import table entries to redirect API calls to hook functions',
          'VTable hooking: replace virtual function pointers in C++ objects to intercept method calls',
          'Detours library (Windows) and PLT hooking (Linux) are common frameworks for function interception',
        ],
        tradeoffs: [
          'Inline hooks are versatile but may conflict with anti-cheat systems that scan for code modifications',
          'IAT hooks are simpler but only catch statically imported functions, missing runtime-resolved calls',
        ],
        realWorld: ['Frida', 'Microsoft Detours', 'EasyHook', 'LD_PRELOAD hooking'],
      },
      {
        id: '6-3',
        name: 'Dynamic Binary Instrumentation',
        description: 'Frameworks that transform binaries at runtime to insert analysis code without permanent modification.',
        keyPoints: [
          'Frida: inject JavaScript into processes for real-time hooking, tracing, and modification across platforms',
          'Intel Pin: compile-time instrumentation tool for building custom analysis tools (taint analysis, profiling)',
          'DynamoRIO: runtime code manipulation for building dynamic analysis tools with low overhead',
          'DBI operates transparently — the target binary doesn\'t need modification and often cannot detect instrumentation',
        ],
        tradeoffs: [
          'DBI frameworks add runtime overhead (2-10x slowdown), affecting timing-sensitive analysis',
          'Frida is easy to use but detectable; Pin/DynamoRIO are harder to detect but more complex to program',
        ],
        realWorld: ['Frida', 'Intel Pin', 'DynamoRIO', 'Valgrind', 'QBDI'],
      },
    ],
  },
  {
    id: 7,
    title: 'Data Structure Recovery',
    part: 2,
    partTitle: 'Static & Dynamic Analysis',
    summary: 'Identifying and reconstructing data types, structures, classes, and vtables from binary patterns.',
    concepts: [
      {
        id: '7-1',
        name: 'Struct & Type Reconstruction',
        description: 'Inferring data structure layouts from memory access patterns in disassembled code.',
        keyPoints: [
          'Field offsets: consistent access at base+offset reveals struct layout — [rax+0x10] suggests a field at offset 16',
          'Array detection: incrementing pointer by fixed stride in a loop indicates array access patterns',
          'Nested structs: pointer dereference followed by offset access (*[rax+8]+0x10) reveals indirection and nesting',
          'RTTI (Run-Time Type Information) in C++ binaries can reveal class names, inheritance hierarchies, and vtable layouts',
        ],
        tradeoffs: [
          'Manual reconstruction is accurate but extremely time-consuming for large programs',
          'Automated tools (e.g., Ghidra\'s data type manager) help but often require manual correction',
        ],
        realWorld: ['game reverse engineering', 'protocol analysis', 'vulnerability research'],
      },
      {
        id: '7-2',
        name: 'C++ Vtables & Inheritance',
        description: 'Recovering object-oriented structure from C++ binaries through virtual function tables.',
        keyPoints: [
          'Vtable: array of function pointers at the beginning of each polymorphic object, set in constructor',
          'Virtual dispatch: call [rax] where rax points to vtable entry — indirect call through function pointer table',
          'Single inheritance: one vtable pointer; multiple inheritance: multiple vtable pointers at different offsets',
          'Constructor analysis reveals class hierarchies — base class constructor called before derived class constructor',
        ],
        tradeoffs: [
          'Vtable analysis works well for MSVC/GCC but different compilers use different ABI layouts',
          'Devirtualization by optimizers can eliminate vtables, making class recovery impossible from optimized code',
        ],
        realWorld: ['game engine reversing', 'browser exploitation', 'COM object analysis'],
      },
      {
        id: '7-3',
        name: 'String & Constant Analysis',
        description: 'Extracting and analyzing strings, constants, and embedded data to understand program functionality.',
        keyPoints: [
          'String extraction: FLOSS/strings tools find ASCII/Unicode strings — error messages, URLs, file paths reveal functionality',
          'Cryptographic constants: S-boxes, magic numbers identify encryption algorithms (e.g., 0x67452301 = MD5/SHA-1 init)',
          'Format strings in printf/scanf calls reveal data types and structure of processed data',
          'Cross-referencing strings to code shows which functions handle specific features — fastest way to navigate large binaries',
        ],
        tradeoffs: [
          'Strings can be encrypted or obfuscated to defeat static extraction — FLOSS attempts deobfuscation',
          'False positive strings from data sections can mislead analysis — verify strings are actually referenced in code',
        ],
        realWorld: ['FLOSS', 'strings utility', 'YARA rules', 'malware classification'],
      },
    ],
  },

  // Part 3: Malware & Anti-Analysis
  {
    id: 8,
    title: 'Malware Analysis Fundamentals',
    part: 3,
    partTitle: 'Malware & Anti-Analysis',
    summary: 'Systematic approach to analyzing malicious software — triage, sandboxing, behavioral analysis, and indicator extraction.',
    concepts: [
      {
        id: '8-1',
        name: 'Malware Triage & Classification',
        description: 'Initial rapid assessment to determine malware type, capability, and priority.',
        keyPoints: [
          'File identification: magic bytes, PE/ELF analysis, packer detection (PEiD, Detect It Easy), entropy analysis',
          'Hash lookup: check SHA256 against VirusTotal, MalwareBazaar — determine if sample is known',
          'Import analysis: suspicious APIs (CreateRemoteThread, VirtualAllocEx, URLDownloadToFile) indicate capabilities',
          'Classification: ransomware, RAT, dropper, loader, worm, rootkit, cryptominer — determines analysis priority and approach',
        ],
        tradeoffs: [
          'Automated triage is fast but can miss novel techniques; manual triage is thorough but slow',
          'Uploading samples to VirusTotal exposes them publicly — use private scanning for sensitive samples',
        ],
        realWorld: ['VirusTotal', 'Detect It Easy', 'PEiD', 'MalwareBazaar'],
      },
      {
        id: '8-2',
        name: 'Sandbox Analysis',
        description: 'Executing malware in isolated environments to observe behavior automatically.',
        keyPoints: [
          'Automated sandboxes (Cuckoo/CAPE, Any.Run, Joe Sandbox) execute and report on file/registry/network activity',
          'Network simulation: INetSim/FakeNet-NG simulate DNS, HTTP, SMTP to capture C2 communications without internet access',
          'Behavioral indicators: process creation, file drops, registry modifications, network connections, privilege escalation attempts',
          'Sandbox evasion is common — malware may check for VM artifacts, human interaction, or time acceleration',
        ],
        tradeoffs: [
          'Sandboxes provide quick behavioral overview but may miss functionality that requires specific triggers or environments',
          'Heavy sandbox environments are resource-intensive; lightweight sandboxes may miss low-level behavior',
        ],
        realWorld: ['CAPE Sandbox', 'Any.Run', 'Joe Sandbox', 'INetSim'],
      },
      {
        id: '8-3',
        name: 'Indicators of Compromise (IOCs)',
        description: 'Extracting actionable intelligence from malware analysis for detection and response.',
        keyPoints: [
          'Network IOCs: C2 domains/IPs, URL patterns, User-Agent strings, JA3/JA3S TLS fingerprints',
          'Host IOCs: file hashes, mutexes, registry keys, scheduled tasks, service names, file paths',
          'Behavioral IOCs: process injection patterns, persistence mechanisms, lateral movement techniques',
          'YARA rules: pattern-matching language for creating signatures based on strings, byte patterns, and conditions',
        ],
        tradeoffs: [
          'Hash-based IOCs are precise but trivially evaded by recompilation; behavioral IOCs are robust but may cause false positives',
          'IOC sharing helps defenders but also alerts adversaries to update their tooling',
        ],
        realWorld: ['YARA', 'MITRE ATT&CK', 'STIX/TAXII', 'OpenIOC'],
      },
    ],
  },
  {
    id: 9,
    title: 'Packers, Crypters & Obfuscation',
    part: 3,
    partTitle: 'Malware & Anti-Analysis',
    summary: 'Techniques used to protect binaries from analysis — packing, encryption, and code obfuscation methods and their countermeasures.',
    concepts: [
      {
        id: '9-1',
        name: 'Executable Packers',
        description: 'Tools that compress and/or encrypt executables, unpacking the original code at runtime.',
        keyPoints: [
          'UPX: most common open-source packer — compresses with NRV/LZMA, easy to unpack with "upx -d"',
          'Custom packers: stub code decrypts/decompresses payload into memory, then transfers execution to OEP (Original Entry Point)',
          'Multi-layer packing: some malware uses multiple packers in sequence, requiring iterative unpacking',
          'Detection: high entropy sections, small import table (only LoadLibrary/GetProcAddress), unusual section names',
        ],
        tradeoffs: [
          'Packing increases analysis time but off-the-shelf packers are well-understood and easily unpacked',
          'Custom packers provide better protection but require development effort and may introduce bugs',
        ],
        realWorld: ['UPX', 'Themida', 'VMProtect', 'ASPack'],
      },
      {
        id: '9-2',
        name: 'Code Obfuscation Techniques',
        description: 'Transforming code to resist understanding while preserving functionality.',
        keyPoints: [
          'Control flow flattening: replaces structured flow with a switch-based dispatcher, hiding original program structure',
          'Opaque predicates: conditions that always evaluate the same way but appear complex — dead code paths confuse analysis',
          'Instruction substitution: replacing simple operations with mathematically equivalent complex sequences',
          'Dead code insertion: adding irrelevant instructions that execute but don\'t affect program output',
        ],
        tradeoffs: [
          'Obfuscation increases binary size and reduces performance — heavy obfuscation can cause 10-100x slowdown',
          'Automated deobfuscation tools are improving, making simple obfuscation less effective over time',
        ],
        realWorld: ['OLLVM', 'Tigress', 'JavaScript obfuscators', 'commercial protectors'],
      },
      {
        id: '9-3',
        name: 'Unpacking & Deobfuscation',
        description: 'Techniques for defeating packing and obfuscation to recover the original code.',
        keyPoints: [
          'Generic unpacking: let the packer execute its stub, then dump the unpacked code from memory at the OEP',
          'OEP detection: set breakpoints on common APIs (VirtualProtect, VirtualAlloc), watch for execution transfer to new memory',
          'Emulation-based unpacking: tools like QEMU/Unicorn emulate execution without running the full binary',
          'Symbolic execution (angr, Triton): solve obfuscated expressions mathematically to recover original logic',
        ],
        tradeoffs: [
          'Memory dumping is fast but may miss encrypted resources or multi-stage payloads',
          'Symbolic execution handles complex obfuscation but suffers from path explosion on large programs',
        ],
        realWorld: ['x64dbg + Scylla', 'PE-sieve', 'angr', 'Triton'],
      },
    ],
  },
  {
    id: 10,
    title: 'Anti-Debugging & Anti-RE',
    part: 3,
    partTitle: 'Malware & Anti-Analysis',
    summary: 'Techniques software uses to detect and resist reverse engineering — debugger detection, VM detection, and timing checks.',
    concepts: [
      {
        id: '10-1',
        name: 'Debugger Detection',
        description: 'Methods to detect when code is running under a debugger and alter behavior accordingly.',
        keyPoints: [
          'Windows API checks: IsDebuggerPresent(), CheckRemoteDebuggerPresent(), NtQueryInformationProcess(ProcessDebugPort)',
          'PEB flags: checking BeingDebugged flag, NtGlobalFlag, heap flags that differ under debugger',
          'Exception-based: trigger exceptions and check if debugger intercepts them (INT 2D, INT 3 in unexpected places)',
          'Timing checks: RDTSC instruction measures CPU cycles — large gaps between measurements indicate single-stepping',
        ],
        tradeoffs: [
          'Each anti-debug technique can be bypassed individually — defense in depth combines multiple checks',
          'Aggressive anti-debugging may trigger false positives on systems with security software that uses debug APIs',
        ],
        realWorld: ['ScyllaHide (anti-anti-debug)', 'TitanHide', 'x64dbg plugins'],
      },
      {
        id: '10-2',
        name: 'VM & Sandbox Detection',
        description: 'Detecting virtual machine and sandbox environments to evade automated analysis.',
        keyPoints: [
          'Hardware artifacts: VM-specific MAC address prefixes, device names (VMware, VirtualBox, QEMU)',
          'CPUID checks: hypervisor present bit, CPU brand string, leaf values that differ in VMs',
          'Behavioral checks: low RAM/disk, few processes running, no recent user activity (documents, browser history)',
          'Environmental checks: known sandbox usernames, file paths, registry keys, running analysis tool processes',
        ],
        tradeoffs: [
          'Hardened VMs can pass most checks, but perfect VM transparency is extremely difficult to achieve',
          'VM detection may backfire — some targets legitimately run in VMs (cloud workloads)',
        ],
        realWorld: ['Pafish', 'al-khaser', 'CAPE anti-evasion', 'bare-metal analysis'],
      },
      {
        id: '10-3',
        name: 'Code Self-Modification & Integrity Checks',
        description: 'Runtime code modification and checksum verification to resist patching and analysis.',
        keyPoints: [
          'Self-modifying code: decrypts or generates code at runtime, making static analysis see only encrypted/meaningless bytes',
          'Checksum verification: CRC32/hash of code sections compared against expected values — detects patching',
          'Code encryption per-function: each function decrypted only when called and re-encrypted after return',
          'Nanomites: replace jumps with INT 3, handled by parent process that patches correct jump target — splits logic across processes',
        ],
        tradeoffs: [
          'Self-modification defeats static analysis but is visible through dynamic analysis and memory dumps',
          'Integrity checks can be bypassed by patching the check itself — cat-and-mouse game',
        ],
        realWorld: ['Themida', 'Denuvo', 'custom malware protectors'],
      },
    ],
  },

  // Part 4: Specialized RE
  {
    id: 11,
    title: 'Firmware & Embedded RE',
    part: 4,
    partTitle: 'Specialized RE',
    summary: 'Reverse engineering firmware images and embedded systems — extraction, hardware interfaces, and bootloader analysis.',
    concepts: [
      {
        id: '11-1',
        name: 'Firmware Extraction & Analysis',
        description: 'Obtaining and analyzing firmware images from embedded devices and IoT equipment.',
        keyPoints: [
          'Firmware sources: vendor website downloads, flash chip reading (SPI/I2C), UART console access, OTA update interception',
          'Binwalk: scans firmware images for embedded file systems, compressed archives, and known signatures',
          'Common filesystems: SquashFS, JFFS2, UBIFS, CramFS — extracted with appropriate tools for each type',
          'Firmware structure: bootloader (U-Boot), kernel image, root filesystem, configuration partitions',
        ],
        tradeoffs: [
          'Software extraction methods may miss encrypted bootloaders or secure boot chains',
          'Hardware extraction (chip desoldering) risks damaging the device but bypasses software protections',
        ],
        realWorld: ['Binwalk', 'firmware-mod-kit', 'flashrom', 'IoT security research'],
      },
      {
        id: '11-2',
        name: 'Hardware Debug Interfaces',
        description: 'Physical interfaces for debugging and extracting data from embedded systems.',
        keyPoints: [
          'UART: serial console often provides shell access — identify TX/RX pins with multimeter or logic analyzer',
          'JTAG: provides direct CPU debug access — read/write memory, set breakpoints, dump flash contents',
          'SWD (Serial Wire Debug): ARM-specific debug interface, 2-wire alternative to JTAG for ARM Cortex processors',
          'SPI/I2C flash reading: connect directly to flash chips to dump firmware without going through the CPU',
        ],
        tradeoffs: [
          'Debug interfaces may be disabled or have authentication in production — not always accessible',
          'Physical access requirements limit scalability but provide deepest level of access',
        ],
        realWorld: ['Bus Pirate', 'J-Link', 'OpenOCD', 'Saleae Logic Analyzer'],
      },
      {
        id: '11-3',
        name: 'Bootloader & Secure Boot Analysis',
        description: 'Understanding boot chains and analyzing how devices verify firmware integrity.',
        keyPoints: [
          'U-Boot: most common embedded bootloader — environment variables, boot commands, and tftp loading are common attack surfaces',
          'Secure boot chain: ROM bootloader → secondary bootloader → kernel — each stage verifies the next',
          'Key extraction: finding signing keys or bypassing signature checks enables loading modified firmware',
          'Boot chain attacks: glitching voltage during verification, exploiting bootloader vulnerabilities, downgrade attacks',
        ],
        tradeoffs: [
          'Secure boot provides strong protection when implemented correctly, but implementation flaws are common',
          'Fault injection attacks bypass even correct implementations but require specialized hardware',
        ],
        realWorld: ['U-Boot exploits', 'Secure Boot bypass research', 'ChipWhisperer (glitching)'],
      },
    ],
  },
  {
    id: 12,
    title: 'Protocol & Network RE',
    part: 4,
    partTitle: 'Specialized RE',
    summary: 'Reverse engineering network protocols, serialization formats, and APIs from captured traffic and binary analysis.',
    concepts: [
      {
        id: '12-1',
        name: 'Traffic Capture & Analysis',
        description: 'Intercepting and analyzing network communications to understand protocol behavior.',
        keyPoints: [
          'Wireshark: capture and dissect network traffic — protocol hierarchy, follow streams, export objects',
          'MITM proxying: mitmproxy/Burp Suite intercept HTTPS traffic by inserting a CA certificate',
          'Protocol identification: port numbers, magic bytes in payloads, behavior patterns help identify unknown protocols',
          'TLS interception challenges: certificate pinning, mutual TLS, and HPKP require bypassing on the client side',
        ],
        tradeoffs: [
          'Passive capture sees traffic but cannot modify it; MITM proxying allows modification but may be detected',
          'Encrypted protocols require key extraction or MITM positioning, adding complexity',
        ],
        realWorld: ['Wireshark', 'mitmproxy', 'tcpdump', 'Burp Suite'],
      },
      {
        id: '12-2',
        name: 'Protocol Dissection & Reconstruction',
        description: 'Understanding the structure of unknown or proprietary network protocols.',
        keyPoints: [
          'Header analysis: identify length fields, type/opcode fields, sequence numbers, checksums, and magic values',
          'State machine reconstruction: map request-response patterns, handshakes, and session management',
          'Binary protocol patterns: TLV (Type-Length-Value), fixed-size headers with variable payloads, framing delimiters',
          'Correlation: match traffic patterns with disassembled send/recv code to identify message types and field meanings',
        ],
        tradeoffs: [
          'Protocol RE from traffic alone may miss edge cases; combining with binary analysis gives complete picture',
          'Fuzzing discovered protocols helps find vulnerabilities but requires building a protocol-aware fuzzer',
        ],
        realWorld: ['Wireshark dissector plugins', 'Scapy', 'protocol fuzzing', 'game protocol RE'],
      },
      {
        id: '12-3',
        name: 'Serialization Format RE',
        description: 'Identifying and parsing serialization formats used in binary protocols and data storage.',
        keyPoints: [
          'Common formats: Protocol Buffers (protobuf), MessagePack, BSON, Thrift, FlatBuffers — each has identifying patterns',
          'Protobuf: field numbers + wire types, varint encoding — tools like protoc --decode_raw can parse without schema',
          'Custom serialization: identify by analyzing serialization functions in the binary — look for sequential field writes',
          'Schema recovery: reconstruct .proto files or struct definitions from binary analysis and sample data',
        ],
        tradeoffs: [
          'Known formats are easy to parse once identified; custom formats require manual analysis of serialization code',
          'Schema-less decoding reveals structure but not field semantics — meaningful names require additional context',
        ],
        realWorld: ['protobuf reversing', 'game save file formats', 'mobile app API analysis'],
      },
    ],
  },
  {
    id: 13,
    title: 'Exploit Development Basics',
    part: 4,
    partTitle: 'Specialized RE',
    summary: 'Fundamentals of exploit development — memory corruption, ROP chains, shellcode, and modern mitigations.',
    concepts: [
      {
        id: '13-1',
        name: 'Buffer Overflows & Memory Corruption',
        description: 'Classic vulnerability class where writing beyond buffer boundaries corrupts adjacent memory.',
        keyPoints: [
          'Stack buffer overflow: overwrite return address to redirect execution — classic technique, basis of many exploits',
          'Heap overflow: corrupt heap metadata or adjacent objects to achieve arbitrary write or code execution',
          'Off-by-one: writing one byte past a buffer can overwrite the saved base pointer, enabling frame pointer overwrite attacks',
          'Format string vulnerabilities: %n write primitive, %x/%p for memory leaks — printf(user_input) is the classic pattern',
        ],
        tradeoffs: [
          'Stack overflows are simpler to exploit but well-mitigated by modern protections (canaries, ASLR)',
          'Heap exploits are more complex but often bypass stack-specific protections',
        ],
        realWorld: ['CTF challenges', 'CVE exploitation', 'bug bounty programs'],
      },
      {
        id: '13-2',
        name: 'ROP Chains & Code Reuse',
        description: 'Executing arbitrary code by chaining existing code snippets (gadgets) when code injection is prevented.',
        keyPoints: [
          'Return-Oriented Programming: chain small instruction sequences ending in RET (gadgets) from existing code',
          'Gadget finding: tools like ROPgadget, ropper scan binaries for useful instruction sequences',
          'Common ROP patterns: call system functions (mprotect to make memory executable, execve for shell)',
          'JOP/COP: Jump-Oriented and Call-Oriented Programming use JMP/CALL gadgets when RET-based chains are blocked',
        ],
        tradeoffs: [
          'ROP bypasses DEP/NX but requires gadget availability and ASLR bypass for reliable addresses',
          'Complex ROP chains are fragile and version-specific — different builds produce different gadgets',
        ],
        realWorld: ['ROPgadget', 'ropper', 'pwntools', 'modern exploit development'],
      },
      {
        id: '13-3',
        name: 'Mitigations & Bypass Techniques',
        description: 'Modern exploit mitigations and the techniques researchers use to work around them.',
        keyPoints: [
          'DEP/NX: marks memory pages as non-executable — bypassed by ROP, or by mprotect/VirtualProtect to re-enable execution',
          'ASLR: randomizes base addresses — bypassed by information leaks, partial overwrites, or brute force (32-bit)',
          'Stack canaries: random value before return address — bypassed by leak, brute force, or overwriting without touching canary',
          'CFI (Control Flow Integrity): restricts indirect call targets — limits ROP gadget availability but not fully deployed',
        ],
        tradeoffs: [
          'Each mitigation raises the bar but none is unbypassable — defense in depth combines multiple protections',
          'Mitigations add performance overhead — CFI and CET have measurable impact on heavily branching code',
        ],
        realWorld: ['ASLR bypass techniques', 'Stack canary leaks', 'Intel CET', 'ARM PAC'],
      },
    ],
  },
];

export const chapters: Chapter[] = topics;

export function getChapter(id: number): Chapter | undefined {
  return chapters.find((ch) => ch.id === id);
}
