export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Topic 1: RE Methodology & Tooling
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'Which analysis approach examines a binary without executing it?',
    options: [
      'Dynamic analysis',
      'Static analysis',
      'Behavioral analysis',
      'Sandbox analysis',
    ],
    answer: 1,
    explanation: 'Static analysis examines code without execution — disassembly, decompilation, string extraction, and control flow analysis. Dynamic analysis requires running the binary.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'Which tool is NSA\'s open-source reverse engineering framework with a built-in decompiler?',
    options: [
      'IDA Pro',
      'Binary Ninja',
      'Ghidra',
      'radare2',
    ],
    answer: 2,
    explanation: 'Ghidra is the NSA\'s open-source software reverse engineering framework, released in 2019. It includes a decompiler, supports multiple architectures, and is scriptable via Java/Python.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'What is the first step in a reverse engineering workflow?',
    options: [
      'Deep analysis of all functions',
      'Patching the binary to remove protections',
      'Triage — file identification, string extraction, import analysis',
      'Writing a full decompilation report',
    ],
    answer: 2,
    explanation: 'Triage is the first step: identifying the file type, extracting strings, analyzing imports/exports, and checking for packers. This guides the direction of deeper analysis.',
  },

  // Topic 2: x86/x64 Assembly Fundamentals
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'In the System V AMD64 calling convention (Linux/macOS), which register holds the first function argument?',
    options: [
      'RAX',
      'RCX',
      'RDI',
      'RSI',
    ],
    answer: 2,
    explanation: 'System V AMD64 passes the first six integer arguments in RDI, RSI, RDX, RCX, R8, R9 (in that order). RAX is used for the return value.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'What does the instruction "PUSH RBP; MOV RBP, RSP" typically indicate?',
    options: [
      'A system call invocation',
      'A function prologue setting up the stack frame',
      'A loop counter initialization',
      'An exception handler registration',
    ],
    answer: 1,
    explanation: 'This is the classic function prologue: saving the caller\'s base pointer and establishing a new stack frame. The corresponding epilogue is "MOV RSP, RBP; POP RBP; RET" (or LEAVE; RET).',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'What does the RSP register point to?',
    options: [
      'The return address of the current function',
      'The top of the stack (current stack pointer)',
      'The base of the heap',
      'The instruction being executed',
    ],
    answer: 1,
    explanation: 'RSP (Stack Pointer) always points to the top of the stack — the most recently pushed value. PUSH decrements RSP and writes; POP reads and increments RSP.',
  },

  // Topic 3: Executable Formats & Loaders
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'What is the magic number at the beginning of a PE (Windows executable) file?',
    options: [
      '0x7F ELF',
      'MZ (0x4D5A)',
      'PK (0x504B)',
      'CAFE BABE',
    ],
    answer: 1,
    explanation: 'PE files begin with the DOS header starting with "MZ" (0x4D5A), named after Mark Zbikowski. The actual PE signature (PE\\0\\0) is at the offset specified in the DOS header.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'What mechanism do ELF binaries use for lazy symbol resolution of shared library functions?',
    options: [
      'Import Address Table (IAT)',
      'Virtual Method Table (vtable)',
      'GOT/PLT (Global Offset Table / Procedure Linkage Table)',
      'Thread Local Storage (TLS)',
    ],
    answer: 2,
    explanation: 'ELF binaries use the GOT/PLT mechanism: PLT stubs jump through GOT entries. On first call, the dynamic linker resolves the symbol and patches the GOT entry for subsequent direct jumps.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'What is DLL hijacking?',
    options: [
      'Injecting code into a running DLL',
      'Exploiting the DLL search order to load a malicious DLL instead of the legitimate one',
      'Modifying the exports of a system DLL',
      'Encrypting DLL files to prevent loading',
    ],
    answer: 1,
    explanation: 'DLL hijacking exploits Windows\' DLL search order — placing a malicious DLL in a directory searched before the legitimate DLL\'s location causes the application to load the attacker\'s version.',
  },

  // Topic 4: Disassembly & Decompilation
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'Which disassembly algorithm follows control flow paths to determine instruction boundaries?',
    options: [
      'Linear sweep',
      'Recursive descent',
      'Brute force scanning',
      'Pattern matching',
    ],
    answer: 1,
    explanation: 'Recursive descent follows control flow (branches, calls, returns) to determine which bytes are instructions. Linear sweep simply disassembles sequentially, which can be confused by inline data.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What is a basic block in a control flow graph?',
    options: [
      'A single assembly instruction',
      'A sequence of instructions with one entry and one exit point (no internal branches)',
      'A complete function',
      'A loop body',
    ],
    answer: 1,
    explanation: 'A basic block is a maximal sequence of instructions that execute sequentially — no branches in the middle, one entry point at the top, one exit at the bottom. They are the nodes of a CFG.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'What is the main limitation of automated decompilers?',
    options: [
      'They can only handle x86 architecture',
      'They struggle with optimized code, custom calling conventions, and obfuscated binaries',
      'They require the original source code to function',
      'They can only produce Python output',
    ],
    answer: 1,
    explanation: 'Decompilers struggle with heavy optimization (SIMD, vectorization), custom calling conventions, and obfuscated code. The output should always be verified against the actual disassembly.',
  },

  // Topic 5: Debugging Techniques
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'What is the advantage of hardware breakpoints over software breakpoints?',
    options: [
      'Hardware breakpoints are unlimited in number',
      'Hardware breakpoints do not modify code, making them invisible to integrity checks',
      'Hardware breakpoints work on all architectures',
      'Hardware breakpoints are faster to set',
    ],
    answer: 1,
    explanation: 'Hardware breakpoints use CPU debug registers (DR0-DR3) and don\'t modify the binary\'s code. Software breakpoints replace instructions with INT 3 (0xCC), which anti-debugging code can detect via memory checksums.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'Which tool captures file, registry, and network activity of processes on Windows?',
    options: [
      'x64dbg',
      'Process Monitor (Procmon)',
      'IDA Pro',
      'Wireshark',
    ],
    answer: 1,
    explanation: 'Process Monitor (Procmon) from Sysinternals captures real-time file system, registry, network, and process/thread activity — essential for understanding program behavior without a debugger.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'What does "step over" do when debugging?',
    options: [
      'Skips the current instruction entirely',
      'Executes the entire called function and stops at the next instruction after the call',
      'Steps into the called function',
      'Runs until the program exits',
    ],
    answer: 1,
    explanation: 'Step-over executes a CALL instruction completely (the entire function runs) and breaks at the instruction after the call. Step-into would enter the function and stop at its first instruction.',
  },

  // Topic 6: Binary Patching & Instrumentation
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'What is NOP patching commonly used for?',
    options: [
      'Adding new features to a binary',
      'Replacing conditional checks with no-operations to bypass them',
      'Compressing the binary to save space',
      'Encrypting function code',
    ],
    answer: 1,
    explanation: 'NOP patching replaces instructions (typically conditional jumps) with NOP (0x90, no operation), effectively removing checks like license verification or anti-debugging code.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'What is Frida primarily used for?',
    options: [
      'Static disassembly of binaries',
      'Dynamic binary instrumentation — injecting JavaScript to hook and modify running processes',
      'Compiling source code into binaries',
      'Network packet capture',
    ],
    answer: 1,
    explanation: 'Frida is a dynamic instrumentation toolkit that lets you inject JavaScript into running processes to hook functions, trace calls, modify behavior, and inspect memory — across Windows, macOS, Linux, iOS, and Android.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'What is inline hooking?',
    options: [
      'Adding comments to disassembly',
      'Overwriting a function\'s prologue with a jump to redirect execution to a hook function',
      'Monitoring network connections',
      'Compiling code with debug symbols',
    ],
    answer: 1,
    explanation: 'Inline hooking overwrites the first few bytes of a target function with a JMP instruction to a hook function. The original bytes are preserved in a "trampoline" to allow calling the original function.',
  },

  // Topic 7: Data Structure Recovery
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'How can you identify struct field access in disassembled x86 code?',
    options: [
      'By looking for string literals',
      'By identifying consistent base+offset memory access patterns like [rax+0x10]',
      'By counting the number of local variables',
      'By analyzing function return values',
    ],
    answer: 1,
    explanation: 'Struct field access appears as base register + constant offset (e.g., [rax+0x10]). Consistent use of the same offsets from the same base pointer reveals the struct layout and field sizes.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'What is a vtable in the context of C++ reverse engineering?',
    options: [
      'A table of variable names',
      'An array of function pointers used for virtual method dispatch in polymorphic objects',
      'A lookup table for string translations',
      'A hash table of imported functions',
    ],
    answer: 1,
    explanation: 'A vtable (virtual method table) is an array of function pointers stored at the beginning of polymorphic C++ objects. Virtual method calls use indirect calls through vtable entries, enabling runtime polymorphism.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'What does the constant 0x67452301 typically indicate when found in a binary?',
    options: [
      'A random magic number with no significance',
      'An MD5 or SHA-1 initialization constant, indicating hash algorithm usage',
      'A memory address for the heap',
      'A Windows API error code',
    ],
    answer: 1,
    explanation: '0x67452301 is one of the initialization constants for both MD5 and SHA-1 hash algorithms. Recognizing cryptographic constants is a fast way to identify which algorithms a binary uses.',
  },

  // Topic 8: Malware Analysis Fundamentals
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'What does high entropy in a PE section typically indicate?',
    options: [
      'The section contains readable strings',
      'The section is compressed or encrypted (possibly packed)',
      'The section has been corrupted',
      'The section contains only NOP instructions',
    ],
    answer: 1,
    explanation: 'High entropy (close to 8.0 for byte-level measurement) indicates randomness, which is characteristic of compressed or encrypted data. Packed malware typically has high-entropy sections that unpack at runtime.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'What is a YARA rule used for?',
    options: [
      'Compiling malware source code',
      'Pattern-matching to identify and classify malware based on strings, byte patterns, and conditions',
      'Decompiling executable files',
      'Encrypting malware samples for safe storage',
    ],
    answer: 1,
    explanation: 'YARA is a pattern-matching tool for creating rules that identify malware families based on textual or binary patterns, file properties, and complex conditions. It\'s widely used in malware classification and threat hunting.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'Why should you avoid uploading sensitive malware samples to VirusTotal?',
    options: [
      'VirusTotal is unreliable and often gives wrong results',
      'Uploaded samples become publicly accessible, potentially alerting the threat actor',
      'VirusTotal charges per scan',
      'VirusTotal only supports Windows executables',
    ],
    answer: 1,
    explanation: 'Files uploaded to VirusTotal are shared with security vendors and accessible to paid subscribers. Uploading sensitive samples (targeted attacks, unreleased malware) may alert the threat actor that their tool has been discovered.',
  },

  // Topic 9: Packers, Crypters & Obfuscation
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'What is the simplest way to unpack a UPX-packed binary?',
    options: [
      'Manually trace through the unpacking stub in a debugger',
      'Run "upx -d" to decompress the binary',
      'Use a hex editor to remove the UPX header',
      'Recompile the binary from source',
    ],
    answer: 1,
    explanation: 'UPX includes a built-in decompression feature: "upx -d <file>" restores the original binary. This works for unmodified UPX packing; modified UPX headers may require manual unpacking.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'What is control flow flattening?',
    options: [
      'Removing all conditional branches from code',
      'Replacing structured control flow with a switch-based dispatcher to hide program structure',
      'Converting loops into recursive functions',
      'Inlining all function calls',
    ],
    answer: 1,
    explanation: 'Control flow flattening transforms structured code (if/else, loops) into a single switch statement in a loop, where a state variable determines which block executes next. This hides the original program structure from static analysis.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'What is the OEP (Original Entry Point) in the context of packed executables?',
    options: [
      'The address of the packer\'s decompression code',
      'The original program\'s entry point that the unpacking stub transfers control to after decompression',
      'The address of the PE header',
      'The first imported function address',
    ],
    answer: 1,
    explanation: 'The OEP is where the original (unpacked) program begins execution. The packer\'s stub runs first to decompress/decrypt the code, then jumps to the OEP. Finding the OEP is the key step in generic unpacking.',
  },

  // Topic 10: Anti-Debugging & Anti-RE
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'Which Windows API is the simplest way to check if a debugger is attached?',
    options: [
      'GetSystemMetrics()',
      'IsDebuggerPresent()',
      'GetCurrentProcess()',
      'CreateMutex()',
    ],
    answer: 1,
    explanation: 'IsDebuggerPresent() directly reads the BeingDebugged flag from the PEB (Process Environment Block). It returns TRUE if a user-mode debugger is attached — the simplest but most easily bypassed anti-debug check.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'How do timing-based anti-debugging checks work?',
    options: [
      'They check the system clock for a specific date',
      'They measure execution time between two points — debugging causes significantly longer intervals',
      'They set timers that crash the program after a delay',
      'They synchronize with a remote server to verify execution speed',
    ],
    answer: 1,
    explanation: 'Timing checks use RDTSC, QueryPerformanceCounter, or GetTickCount to measure execution time between two points. Single-stepping or breakpoints in a debugger cause dramatically longer intervals than normal execution.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'What is a nanomite protection technique?',
    options: [
      'Encrypting the binary with a hardware key',
      'Replacing jumps with INT 3 instructions, handled by a parent process that patches the correct target',
      'Using nanotechnology-based hardware protection',
      'Splitting code into 1-byte instructions',
    ],
    answer: 1,
    explanation: 'Nanomites replace conditional jumps with INT 3 (breakpoint) instructions. A parent process catches the exceptions and determines the correct jump target, splitting the logic across two processes and making single-process debugging impossible.',
  },

  // Topic 11: Firmware & Embedded RE
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'Which tool is most commonly used to extract file systems from firmware images?',
    options: [
      'Ghidra',
      'Binwalk',
      'Nmap',
      'Wireshark',
    ],
    answer: 1,
    explanation: 'Binwalk scans firmware images for known file signatures (SquashFS, gzip, LZMA, etc.), extracts embedded file systems, and identifies firmware structure. It\'s the standard first tool for firmware analysis.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'What hardware interface provides direct CPU debug access on embedded devices?',
    options: [
      'USB',
      'JTAG',
      'Ethernet',
      'HDMI',
    ],
    answer: 1,
    explanation: 'JTAG (Joint Test Action Group) provides direct access to the CPU\'s debug interface — read/write memory, set breakpoints, halt/resume execution, and dump flash contents. It\'s the most powerful hardware debug interface.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'What is U-Boot in the context of embedded systems?',
    options: [
      'A Linux distribution for IoT devices',
      'A widely used open-source bootloader for embedded systems',
      'A USB debugging protocol',
      'A firmware encryption standard',
    ],
    answer: 1,
    explanation: 'U-Boot (Universal Boot Loader) is the most common bootloader for embedded Linux systems. Its environment variables, network boot capabilities, and command shell are common targets for security research.',
  },

  // Topic 12: Protocol & Network RE
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'What tool is used for man-in-the-middle interception of HTTPS traffic?',
    options: [
      'Nmap',
      'mitmproxy',
      'Binwalk',
      'GDB',
    ],
    answer: 1,
    explanation: 'mitmproxy intercepts HTTPS traffic by acting as a proxy that terminates TLS with its own CA certificate. The client must trust this CA. Burp Suite provides similar functionality with a GUI.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'What is a TLV encoding scheme commonly found in binary protocols?',
    options: [
      'Text-Line-Value: each field is a text line followed by a value',
      'Type-Length-Value: each field has a type identifier, a length, and the actual data',
      'Time-Log-Version: timestamp-based protocol versioning',
      'Token-List-Variable: tokenized field encoding',
    ],
    answer: 1,
    explanation: 'TLV (Type-Length-Value) is a common binary encoding where each field starts with a type tag, followed by a length, then the data. It enables flexible, extensible protocol messages and is used in many binary protocols.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'How can you decode Protocol Buffer messages without the .proto schema file?',
    options: [
      'It is impossible without the schema',
      'Use "protoc --decode_raw" to parse the wire format, revealing field numbers and types',
      'Convert to JSON first, then parse',
      'Use Wireshark\'s built-in protobuf decoder',
    ],
    answer: 1,
    explanation: 'protoc --decode_raw parses protobuf wire format without a schema, showing field numbers, wire types, and values. You won\'t get field names, but the structure and data types are revealed.',
  },

  // Topic 13: Exploit Development Basics
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'What is the primary purpose of ASLR (Address Space Layout Randomization)?',
    options: [
      'Encrypting code in memory',
      'Randomizing the base addresses of executables and libraries to prevent hardcoded address exploitation',
      'Adding stack canaries to detect buffer overflows',
      'Marking heap memory as non-executable',
    ],
    answer: 1,
    explanation: 'ASLR randomizes where executables, libraries, stack, and heap are loaded in memory. This prevents attackers from using hardcoded addresses in exploits, requiring an information leak to determine actual addresses.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'What is Return-Oriented Programming (ROP)?',
    options: [
      'A programming paradigm focused on function return values',
      'Chaining short instruction sequences (gadgets) ending in RET to execute arbitrary code without injecting new code',
      'A debugging technique for tracing return addresses',
      'A compiler optimization that eliminates redundant returns',
    ],
    answer: 1,
    explanation: 'ROP chains existing code snippets (gadgets) that end in RET instructions. By controlling the stack, each RET pops the next gadget address, creating arbitrary computation from existing code — bypassing DEP/NX.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'What is a stack canary (stack cookie)?',
    options: [
      'A buffer at the bottom of the stack for overflow detection',
      'A random value placed before the return address that is checked before function return to detect overflows',
      'A special CPU register for stack protection',
      'An encrypted copy of the return address',
    ],
    answer: 1,
    explanation: 'A stack canary is a random value placed between local variables and the saved return address. Before returning, the function checks if the canary was modified — if so, a buffer overflow occurred and the program terminates.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
