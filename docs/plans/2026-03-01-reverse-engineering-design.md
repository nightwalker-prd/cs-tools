# Reverse Engineering Explorer — Design Document

## App Configuration

| Field | Value |
|-------|-------|
| Package | `@cstools/reverse-engineering` |
| Directory | `apps/reverse-engineering` |
| Port | 5207 |
| Icon | `Microscope` |
| Color | `#00CED1` |
| localStorage prefix | `reverse-engineering-` |
| Tags | `['reference', 'quiz']` |

## Topic Structure (4 Parts, 13 Topics, 39 Concepts, 39 Quiz Questions)

### Part 1: Foundations (Topics 1-3)
1. **RE Methodology & Tooling** — workflow, static vs dynamic analysis, Ghidra/IDA/radare2
2. **x86/x64 Assembly Fundamentals** — registers, instructions, calling conventions, stack frames
3. **Executable Formats & Loaders** — PE, ELF, Mach-O, sections, imports/exports, dynamic linking

### Part 2: Static & Dynamic Analysis (Topics 4-7)
4. **Disassembly & Decompilation** — linear sweep vs recursive descent, control flow graphs, pseudocode recovery
5. **Debugging Techniques** — breakpoints, single-stepping, memory inspection, conditional breaks
6. **Binary Patching & Instrumentation** — NOPing, hooking, Frida, DBI frameworks, code injection
7. **Data Structure Recovery** — identifying structs, vtables, strings, enums from binary patterns

### Part 3: Malware & Anti-Analysis (Topics 8-10)
8. **Malware Analysis Fundamentals** — triage, sandboxing, behavioral analysis, indicators of compromise
9. **Packers, Crypters & Obfuscation** — UPX, custom packers, control flow flattening, opaque predicates
10. **Anti-Debugging & Anti-RE** — timing checks, debugger detection, VM detection, code self-modification

### Part 4: Specialized RE (Topics 11-13)
11. **Firmware & Embedded RE** — firmware extraction, JTAG/SWD, UART, bootloader analysis
12. **Protocol & Network RE** — traffic capture, protocol dissection, serialization format RE, API reversing
13. **Exploit Development Basics** — buffer overflows, ROP chains, shellcode, mitigations (ASLR/DEP/canaries)

## Hub Integration

- Add `Microscope` to lucide-react imports
- Add tool entry after pentesting
- Update overallStats: 34→35 tools, 402→415 topics, 1283→1322 questions, 1203→1242 concepts
