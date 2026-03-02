export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Quantum Mechanics for Computing
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'What is the key difference between a classical bit and a qubit?',
    options: [
      'A qubit can store more data than a classical bit',
      'A qubit can exist in a superposition of |0> and |1> simultaneously, described by complex amplitudes, while a classical bit is definitively 0 or 1',
      'A qubit is faster than a classical bit',
      'A qubit uses less energy than a classical bit',
    ],
    answer: 1,
    explanation: 'A qubit state is |psi> = alpha|0> + beta|1> where alpha and beta are complex amplitudes satisfying |alpha|^2 + |beta|^2 = 1. This superposition allows quantum computers to process 2^N amplitudes simultaneously with N qubits, compared to a single N-bit string for classical bits. However, measurement collapses the qubit to a single classical outcome.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'What does the Born rule state about quantum measurement?',
    options: [
      'That quantum states always collapse to |0> when measured',
      'That the probability of measuring outcome x is |<x|psi>|^2 — the squared magnitude of the amplitude for that state',
      'That measurement has no effect on quantum states',
      'That only entangled qubits can be measured',
    ],
    answer: 1,
    explanation: 'The Born rule provides the fundamental connection between quantum amplitudes and measurement probabilities. For a state |psi> = alpha|0> + beta|1>, the probability of measuring |0> is |alpha|^2 and the probability of measuring |1> is |beta|^2. This rule is the bridge between the quantum mathematical formalism and experimental observations.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'Why can entanglement not be used for faster-than-light communication?',
    options: [
      'Because entanglement only works over short distances',
      'Because measuring one qubit of an entangled pair determines the other\'s state, but extracting the teleported information requires a classical communication channel that is limited to the speed of light',
      'Because entanglement is too fragile to maintain over long distances',
      'Because governments have restricted its use',
    ],
    answer: 1,
    explanation: 'While measuring one qubit of an entangled pair instantaneously correlates with the other, the measurement outcomes are random and contain no controllable information. To use entanglement for communication (e.g., quantum teleportation), a classical channel is always required to send measurement results, and classical information travels at most at the speed of light.',
  },

  // Chapter 2: Quantum Gates & Circuits
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'What does the Hadamard gate do to a qubit in the |0> state?',
    options: [
      'Flips it to |1>',
      'Creates an equal superposition (|0>+|1>)/sqrt(2)',
      'Leaves it unchanged',
      'Entangles it with another qubit',
    ],
    answer: 1,
    explanation: 'The Hadamard gate H maps |0> to (|0>+|1>)/sqrt(2) and |1> to (|0>-|1>)/sqrt(2). It is self-inverse (H^2 = I) and is the most commonly used gate for creating superposition. It is fundamental to nearly every quantum algorithm, appearing at the beginning of circuits to initialize superposition states.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'Why is two-qubit gate fidelity typically the bottleneck in quantum computation?',
    options: [
      'Because two-qubit gates are not physically possible',
      'Because two-qubit gates require interactions between qubits, leading to error rates 10-100x higher than single-qubit gates, and most algorithms require many such gates',
      'Because two-qubit gates consume too much energy',
      'Because two-qubit gates can only be used once per circuit',
    ],
    answer: 1,
    explanation: 'Two-qubit gates like CNOT require controlled interactions between qubits, which are inherently noisier than single-qubit operations. Typical CNOT error rates are 0.5-2% compared to 0.01-0.1% for single-qubit gates. Since quantum algorithms require many CNOT gates (especially for entanglement and multi-qubit operations), minimizing CNOT count is a critical circuit optimization goal.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'What makes a quantum gate set "universal"?',
    options: [
      'It can perform any classical computation',
      'It can approximate any unitary operation on any number of qubits to arbitrary precision — {H, T, CNOT} is a common universal set',
      'It works on all types of quantum hardware',
      'It includes every possible quantum gate',
    ],
    answer: 1,
    explanation: 'A universal gate set can approximate any unitary transformation to arbitrary precision. The Solovay-Kitaev theorem guarantees that any single-qubit gate can be approximated using O(log^c(1/epsilon)) gates from a finite universal set. Common universal sets include {H, T, CNOT} and {H, Toffoli}. Universality is essential for general-purpose quantum computation.',
  },

  // Chapter 3: Quantum Measurement & Decoherence
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'What is the physical meaning of T1 and T2 times in quantum computing?',
    options: [
      'T1 is the time for a gate operation and T2 is the total circuit time',
      'T1 measures how long a qubit retains its energy state (relaxation), and T2 measures how long it retains phase coherence (dephasing) — always T2 <= 2*T1',
      'T1 and T2 are the two qubit states in a classical system',
      'T1 is the cooling time and T2 is the operating time',
    ],
    answer: 1,
    explanation: 'T1 (relaxation time) governs spontaneous decay from |1> to |0> due to energy exchange with the environment. T2 (dephasing time) governs loss of the relative phase between |0> and |1> components. T2 is always <= 2*T1 because energy relaxation also causes dephasing. These times directly limit how many gates can be executed before the quantum information is lost.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'What is a phase-flip error and why does it have no classical analog?',
    options: [
      'A phase-flip is when a bit changes from 0 to 1, similar to a classical bit error',
      'A phase-flip (Z error) changes the relative phase of a superposition (|+> becomes |->), which has no classical analog because classical bits have no phase — it is invisible in the computational basis',
      'A phase-flip is when both bits in an entangled pair flip simultaneously',
      'A phase-flip is a hardware malfunction that destroys the qubit',
    ],
    answer: 1,
    explanation: 'A phase-flip error applies the Pauli-Z gate, mapping |0> to |0> and |1> to -|1>. This changes the relative phase of a superposition state but leaves the computational basis states unchanged. Since classical bits have no phase information, this type of error has no classical counterpart. Phase-flip errors can only be detected by measuring in a different basis (e.g., the Hadamard basis).',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'Why is the depolarizing noise model commonly used in quantum error correction theory?',
    options: [
      'Because it is the only type of noise that exists in real quantum hardware',
      'Because it applies random Pauli errors (X, Y, Z) with equal probability p/3 each, providing a symmetric worst-case noise model that simplifies analysis while capturing essential error behavior',
      'Because it only affects specific types of qubits',
      'Because it can be completely eliminated with simple shielding',
    ],
    answer: 1,
    explanation: 'Depolarizing noise randomly applies I (no error), X, Y, or Z with probabilities (1-p), p/3, p/3, p/3 respectively. It is the most commonly used noise model because any single-qubit error can be decomposed into Pauli operators, and the symmetric treatment simplifies theoretical analysis. While real noise is more complex, the depolarizing model captures the essential challenge of correcting both bit-flip and phase-flip errors.',
  },

  // Chapter 4: Quantum Algorithms
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'What is the source of quantum speedup in Shor\'s factoring algorithm?',
    options: [
      'Faster clock speed of quantum processors',
      'The quantum Fourier transform efficiently extracts the period of modular exponentiation from a quantum superposition, solving the period-finding problem exponentially faster than any known classical algorithm',
      'Quantum computers have more memory than classical computers',
      'Shor\'s algorithm uses brute force but in parallel',
    ],
    answer: 1,
    explanation: 'Shor\'s algorithm reduces integer factoring to period-finding: find the period r of f(x) = a^x mod N. The quantum Fourier transform extracts this period from a superposition of function values in polynomial time O((log N)^3), while the best classical period-finding takes exponential time. This specific mathematical structure is what enables the exponential speedup.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'Why is Grover\'s quadratic speedup provably optimal for unstructured search?',
    options: [
      'Because quantum computers are only twice as fast as classical computers',
      'The BBBV theorem proves that no quantum algorithm can solve unstructured search in fewer than Omega(sqrt(N)) queries — Grover\'s matches this lower bound',
      'Because quantum hardware cannot process more than sqrt(N) operations per second',
      'Because Grover\'s algorithm was the first quantum algorithm ever invented',
    ],
    answer: 1,
    explanation: 'The Bennett-Bernstein-Brassard-Vazirani (BBBV) theorem establishes an information-theoretic lower bound: any quantum algorithm that identifies a marked item in an unstructured database of N items must query the oracle at least Omega(sqrt(N)) times. Grover\'s algorithm achieves exactly this bound (pi/4 * sqrt(N) iterations), making it provably optimal.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'What is the key advantage of the quantum Fourier transform over the classical discrete Fourier transform?',
    options: [
      'It produces more accurate results',
      'It uses O(n^2) quantum gates for n qubits versus O(n * 2^n) classical operations, an exponential reduction in gate count',
      'It can be applied to non-numerical data',
      'It does not require any quantum hardware',
    ],
    answer: 1,
    explanation: 'The QFT circuit uses only O(n^2) Hadamard and controlled-phase gates for n qubits, while the classical DFT requires O(n * 2^n) operations. This exponential reduction in gate count is what makes QFT-based algorithms like Shor\'s and quantum phase estimation efficient. However, the output is a quantum state that cannot be fully read out — only specific information can be extracted via measurement.',
  },

  // Chapter 5: Quantum Error Correction
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'Why can\'t classical error correction techniques (simple redundancy and majority voting) be directly applied to quantum systems?',
    options: [
      'Because quantum computers are too expensive for redundancy',
      'Because the no-cloning theorem prevents copying unknown quantum states, and measurement destroys the superposition — quantum error correction must detect errors without measuring the encoded information',
      'Because quantum systems never experience errors',
      'Because classical error correction is patented and cannot be used',
    ],
    answer: 1,
    explanation: 'Classical error correction relies on copying bits (0 -> 000) and majority voting. The no-cloning theorem forbids copying unknown quantum states, and direct measurement would collapse the superposition, destroying the encoded quantum information. Quantum error correction overcomes this by using entangled encodings and syndrome measurements that detect error types without revealing the logical qubit state.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'What determines the error-correcting capability of a surface code?',
    options: [
      'The number of qubits in the processor',
      'The code distance d — a distance-d surface code uses O(d^2) physical qubits and can correct up to floor((d-1)/2) errors, with logical error rate scaling as p^(d/2)',
      'The operating temperature of the quantum computer',
      'The programming language used to write the quantum circuit',
    ],
    answer: 1,
    explanation: 'The code distance d is the key parameter of a surface code. It determines both the number of physical qubits needed (approximately 2d^2 - 1) and the number of correctable errors (floor((d-1)/2)). The logical error rate decreases exponentially with distance (roughly as p^(d/2)) when physical error rates p are below the threshold (~1%), making larger codes more reliable.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'What is the Eastin-Knill theorem and how is it circumvented?',
    options: [
      'It proves quantum error correction is impossible',
      'It proves no quantum error correcting code has a universal set of transversal gates — circumvented by magic state distillation, which prepares special states to implement non-Clifford gates fault-tolerantly',
      'It limits the number of qubits in a quantum computer',
      'It proves that quantum computers cannot outperform classical computers',
    ],
    answer: 1,
    explanation: 'The Eastin-Knill theorem shows that no quantum error correcting code can implement a universal gate set using only transversal gates (which naturally prevent error propagation). This is overcome by magic state distillation: preparing high-fidelity "magic states" from many noisy copies, then using these states to implement the missing non-Clifford gates (typically the T gate) fault-tolerantly. This is the most resource-intensive part of fault-tolerant quantum computing.',
  },

  // Chapter 6: Quantum Communication
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'How does the BB84 protocol detect eavesdropping?',
    options: [
      'By encrypting the quantum channel with a classical key',
      'An eavesdropper measuring qubits inevitably disturbs them (due to the no-cloning theorem), introducing detectable errors in the sifted key — if the quantum bit error rate exceeds ~11%, the protocol aborts',
      'By using firewall software on the quantum channel',
      'By sending test messages before the actual key exchange',
    ],
    answer: 1,
    explanation: 'In BB84, Alice sends qubits in randomly chosen bases and Bob measures in randomly chosen bases. An eavesdropper (Eve) who intercepts and measures qubits will choose the wrong basis ~50% of the time, introducing errors. Alice and Bob sacrifice a portion of their sifted key to check the error rate. If the QBER exceeds approximately 11%, they know an eavesdropper is present and abort.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'What are the three essential ingredients for quantum teleportation?',
    options: [
      'A quantum computer, a classical computer, and an internet connection',
      'The qubit to teleport, a shared entangled Bell pair (pre-distributed), and a classical communication channel for sending 2 bits of measurement results',
      'Two identical quantum processors and a fiber optic cable',
      'A Hadamard gate, a CNOT gate, and a measurement device',
    ],
    answer: 1,
    explanation: 'Quantum teleportation requires: (1) the unknown qubit state to be teleported, (2) a shared entangled Bell pair between Alice and Bob (pre-distributed before the protocol), and (3) a classical channel for Alice to send her 2-bit Bell measurement result to Bob. Bob applies a correction based on these 2 bits to reconstruct the original state. The original qubit is destroyed in the process.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'Why can\'t classical repeaters (amplify-and-forward) be used for quantum communication?',
    options: [
      'Because classical repeaters are too slow for quantum signals',
      'Because the no-cloning theorem prevents amplifying (copying) unknown quantum states — quantum repeaters must use entanglement swapping and purification instead',
      'Because classical repeaters are too expensive',
      'Because quantum signals travel faster than classical signals',
    ],
    answer: 1,
    explanation: 'Classical optical repeaters amplify the signal by measuring and regenerating it, which requires copying the signal state. The no-cloning theorem forbids copying unknown quantum states, so this approach fails for quantum communication. Quantum repeaters overcome this by using entanglement swapping (connecting short entangled segments) and entanglement purification (improving noisy entanglement) to extend quantum communication distances.',
  },

  // Chapter 7: Qubit Technologies
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'What is the primary advantage of trapped ion qubits over superconducting qubits?',
    options: [
      'They operate at room temperature',
      'They offer all-to-all connectivity (no SWAP overhead), longer coherence times (seconds vs microseconds), and higher gate fidelities (>99.9%) — though at the cost of slower gate speeds',
      'They are cheaper to manufacture',
      'They use fewer qubits for the same computation',
    ],
    answer: 1,
    explanation: 'Trapped ion qubits achieve coherence times of seconds to minutes (vs 100-500 microseconds for superconducting), gate fidelities above 99.9% for two-qubit gates (vs 99-99.5%), and all-to-all connectivity through shared motional modes (eliminating SWAP gates). However, their gate speeds are ~1000x slower (microseconds vs nanoseconds), resulting in lower clock rates.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'Why do superconducting qubits need to operate at ~15 millikelvin?',
    options: [
      'Because the superconducting material melts at higher temperatures',
      'To minimize thermal noise that would cause random excitations and destroy quantum coherence — the thermal energy kT must be much less than the qubit energy splitting hf',
      'Because the control electronics only work at low temperatures',
      'Because quantum entanglement only occurs at absolute zero',
    ],
    answer: 1,
    explanation: 'Superconducting qubits have energy splittings of ~5 GHz (corresponding to a temperature of ~240 millikelvin). Operating at ~15 mK ensures that the thermal energy kT is far below this splitting, so thermal fluctuations are extremely unlikely to cause unwanted transitions between |0> and |1>. This requires dilution refrigerators, which are large, expensive, and power-intensive.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'What advantage do photonic qubits have over other qubit technologies, and what is their main challenge?',
    options: [
      'They are the fastest qubits; their challenge is they cannot be entangled',
      'They operate at room temperature and naturally resist decoherence (photons interact weakly with the environment); the main challenge is creating deterministic photon-photon interactions for two-qubit gates',
      'They are the cheapest to produce; their challenge is they require lasers',
      'They have infinite coherence time; their challenge is they are too large',
    ],
    answer: 1,
    explanation: 'Photonic qubits operate at room temperature (major cost advantage) and have very long coherence because photons interact weakly with the environment. However, this weak interaction is also their main challenge: creating deterministic photon-photon interactions for two-qubit gates is extremely difficult. Linear optical approaches (KLM protocol) use measurement-induced nonlinearity but are probabilistic, requiring resource overhead.',
  },

  // Chapter 8: Quantum Computing Platforms
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'What distinguishes Amazon Braket from other quantum computing cloud platforms?',
    options: [
      'It is the only platform with quantum hardware',
      'It provides a single API to access multiple quantum hardware providers (IonQ, Rigetti, QuEra, OQC) with different qubit technologies, plus managed simulators and hybrid algorithm support',
      'It offers free unlimited access to quantum hardware',
      'It can only run classical simulations of quantum circuits',
    ],
    answer: 1,
    explanation: 'Amazon Braket is unique in providing a hardware-agnostic platform that offers unified access to trapped-ion (IonQ), superconducting (Rigetti, OQC), and neutral-atom (QuEra) processors through a single SDK and API. This multi-hardware approach lets users compare technologies and run the same algorithm on different backends, alongside managed quantum circuit simulators.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'What was the significance of Google Willow\'s 2024 achievement?',
    options: [
      'It was the first quantum computer to exceed 1000 qubits',
      'It demonstrated that surface code error correction can exponentially suppress logical errors as code distance increases, proving that adding more qubits can make quantum computers more reliable when physical error rates are below threshold',
      'It factored a 2048-bit RSA key using Shor\'s algorithm',
      'It achieved quantum supremacy for the first time',
    ],
    answer: 1,
    explanation: 'Google Willow (105 qubits) demonstrated below-threshold surface code error correction, showing that increasing the code distance from 3 to 5 to 7 leads to exponential suppression of logical error rates. This is considered the most significant advance toward fault-tolerant quantum computing to date, as it proves the fundamental scalability of quantum error correction in practice.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'What is Qiskit and why is it significant in the quantum computing ecosystem?',
    options: [
      'A quantum hardware manufacturer that builds the fastest qubits',
      'An open-source Python SDK from IBM for quantum computing that provides circuit construction, transpilation, noise simulation, and hardware execution — used in over 2,000 research publications and by 400,000+ users',
      'A quantum encryption standard required by all cloud providers',
      'A classical simulation tool that replaces quantum hardware',
    ],
    answer: 1,
    explanation: 'Qiskit is IBM\'s open-source Python framework that provides the full stack for quantum computing: circuit construction (qiskit.circuit), compilation to hardware-native gates (transpiler), noise simulation (Aer), and execution on real IBM Quantum processors (Runtime). With 400,000+ registered users and 2,000+ research publications, it is the most widely adopted quantum computing SDK.',
  },

  // Chapter 9: NISQ Era Computing
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'What does "NISQ" stand for and what are the key limitations of NISQ devices?',
    options: [
      'New Integrated Semiconductor Quantum — limited by the cost of semiconductors',
      'Noisy Intermediate-Scale Quantum — limited by gate error rates (~0.1-1%), short coherence times, and lack of full error correction, restricting useful circuit depth to ~100-1000 gates',
      'National Institute for Scientific Quantum — limited by government funding',
      'Non-Interactive Sequential Quantum — limited by sequential processing speed',
    ],
    answer: 1,
    explanation: 'NISQ (coined by John Preskill, 2018) describes current quantum devices with 50-1000+ qubits that operate without full quantum error correction. They are "noisy" because gate errors, decoherence, and readout errors accumulate rapidly, limiting useful circuit depth to roughly 100-1000 gates. They are "intermediate-scale" because they are too small for fault-tolerant computing but too large for exact classical simulation.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'What is the barren plateau problem in variational quantum algorithms?',
    options: [
      'The physical landscape around quantum computing labs is barren',
      'For randomly initialized deep parameterized quantum circuits, the variance of cost function gradients decreases exponentially with qubit count, making classical optimization of parameters intractable',
      'The quantum processor overheats and enters a "barren" state',
      'The optimization converges to the wrong answer every time',
    ],
    answer: 1,
    explanation: 'Barren plateaus occur when the gradient of the cost function vanishes exponentially with the number of qubits for randomly initialized deep parameterized circuits. This means the classical optimizer cannot determine which direction to update parameters, making training impossible for large systems. Mitigation strategies include shallow circuits, local cost functions, structured ansatze, and layer-wise training.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'How does error mitigation differ from quantum error correction?',
    options: [
      'Error mitigation is more effective than error correction',
      'Error mitigation uses extra circuit executions and classical post-processing to extract better results without additional qubits, while error correction encodes logical qubits in many physical qubits to actively correct errors — mitigation has limited scaling while correction scales indefinitely',
      'There is no difference between them',
      'Error mitigation prevents errors from occurring while error correction fixes them after they happen',
    ],
    answer: 1,
    explanation: 'Error mitigation techniques (zero-noise extrapolation, probabilistic error cancellation, twirling) run additional circuits with varied noise levels and use classical post-processing to estimate noise-free results. They require no additional qubits but have exponential sampling overhead for high accuracy. Error correction uses many physical qubits to encode logical qubits and actively corrects errors, providing unlimited scaling below the threshold error rate.',
  },

  // Chapter 10: Quantum Simulation
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'Why did Richard Feynman propose that simulating quantum physics requires a quantum computer?',
    options: [
      'Because classical computers were too slow in 1982',
      'Because the Hilbert space of N quantum particles grows as 2^N, making the memory required for exact classical simulation exponentially large — a quantum computer naturally encodes these states with N qubits',
      'Because classical physics cannot describe quantum phenomena',
      'Because Feynman wanted to invent a new type of computer',
    ],
    answer: 1,
    explanation: 'Feynman (1982) observed that simulating a system of N quantum particles requires tracking 2^N complex amplitudes — the dimension of the quantum Hilbert space. For N=50 particles, this requires ~10^15 complex numbers, exceeding classical memory. A quantum computer with N qubits naturally represents this exponential state space, making quantum simulation its most natural application.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'What is the Jordan-Wigner transformation in quantum chemistry simulation?',
    options: [
      'A method for converting quantum computers to classical computers',
      'A mapping from fermionic creation/annihilation operators (representing molecular orbitals) to Pauli strings on qubits, enabling molecular Hamiltonians to be simulated on quantum hardware',
      'A technique for cooling quantum processors',
      'A classical algorithm for solving chemistry problems',
    ],
    answer: 1,
    explanation: 'The Jordan-Wigner transformation maps fermionic operators (which describe electrons in molecular orbitals and obey anti-commutation relations) to tensor products of Pauli operators (which act on qubits). This encoding allows molecular Hamiltonians to be expressed as sums of Pauli strings, making them suitable for simulation on quantum hardware using algorithms like VQE or quantum phase estimation.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'Why is quantum simulation of FeMoCo (nitrogenase active site) considered a key benchmark for quantum computing?',
    options: [
      'Because FeMoCo is the simplest molecule to simulate',
      'Because FeMoCo is the catalyst for biological nitrogen fixation, has 54 strongly correlated electrons that are intractable for classical computers, and understanding its mechanism could revolutionize fertilizer production',
      'Because FeMoCo was the first molecule ever discovered',
      'Because FeMoCo can only be synthesized using quantum computers',
    ],
    answer: 1,
    explanation: 'FeMoCo (the iron-molybdenum cofactor in nitrogenase) catalyzes biological nitrogen fixation at ambient temperature and pressure, while the industrial Haber-Bosch process requires extreme conditions. Its 54 strongly correlated electrons make it intractable for exact classical simulation. Understanding its mechanism through quantum simulation could enable design of more efficient artificial catalysts, with enormous agricultural and energy implications.',
  },

  // Chapter 11: Quantum Machine Learning
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'What is the "data loading bottleneck" in quantum machine learning?',
    options: [
      'Quantum computers cannot store data permanently',
      'Encoding N classical data points into quantum states requires O(N) time, which may negate any quantum speedup achieved in the processing stage',
      'Quantum hardware does not have input ports for data',
      'Classical data is incompatible with quantum formats',
    ],
    answer: 1,
    explanation: 'Many claimed quantum ML speedups assume quantum access to data (quantum RAM / QRAM), but loading N classical data points into a quantum state takes O(N) time. If the quantum processing step provides an O(sqrt(N)) speedup (Grover-type), the data loading time dominates and negates the advantage. This is a fundamental challenge for quantum ML applied to classical data.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'What is the parameter-shift rule in quantum machine learning?',
    options: [
      'A rule for shifting parameters between quantum and classical computers',
      'A technique for computing exact gradients on quantum hardware: the partial derivative of the cost function with respect to a gate parameter equals [C(theta+pi/2) - C(theta-pi/2)] / 2, requiring two circuit evaluations per parameter',
      'A security protocol for transferring model weights',
      'A method for reducing the number of parameters in a model',
    ],
    answer: 1,
    explanation: 'The parameter-shift rule enables exact gradient computation on quantum hardware without the need for backpropagation. For each trainable parameter theta, the gradient is computed by evaluating the circuit at theta+pi/2 and theta-pi/2 and taking the difference. This requires 2 circuit evaluations per parameter per gradient step, which can be expensive for models with many parameters.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'What is "dequantization" in the context of quantum ML advantages?',
    options: [
      'Converting quantum computers back to classical computers',
      'Discovering classical algorithms that match the performance of previously-claimed quantum ML speedups — Tang (2018) showed this for quantum recommendation systems, eliminating the claimed exponential quantum advantage',
      'Removing quantum noise from ML models',
      'Converting quantum data into classical data',
    ],
    answer: 1,
    explanation: 'Dequantization refers to finding classical algorithms that achieve comparable performance to quantum algorithms previously thought to offer exponential speedup. Ewin Tang\'s 2018 result showed that quantum-inspired classical sampling techniques can solve the recommendation system problem nearly as fast as the quantum algorithm (HHL-based). This has been extended to other quantum ML claims, significantly narrowing the scope of proven quantum advantages.',
  },

  // Chapter 12: Quantum Cryptography Impact
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'What is the "harvest now, decrypt later" threat?',
    options: [
      'Harvesting quantum computing resources for later use',
      'Adversaries record encrypted traffic today using classical means, storing it until quantum computers capable of running Shor\'s algorithm become available to decrypt it — threatening long-lived secrets that must remain confidential for decades',
      'A type of quantum attack that steals encryption keys',
      'A method for quantum computers to break encryption in real-time',
    ],
    answer: 1,
    explanation: 'The "harvest now, decrypt later" (HNDL) threat is the reason PQC migration is urgent despite large-scale quantum computers being years away. Adversaries can record encrypted traffic (TLS sessions, VPN tunnels, encrypted files) today and store it cheaply. Once a quantum computer running Shor\'s algorithm becomes available, they can retroactively decrypt all stored data. This is particularly dangerous for secrets that must remain confidential for 10-30+ years (government, military, healthcare).',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'Why is CRYSTALS-Kyber (ML-KEM) the primary NIST post-quantum key encapsulation standard?',
    options: [
      'Because it was invented by NIST researchers',
      'Because it is based on the Module Learning With Errors lattice problem, offering a strong balance of security, performance (fast key generation and encapsulation), and reasonable key sizes (~1,184 bytes at 128-bit security)',
      'Because it is the only algorithm that cannot be broken by quantum computers',
      'Because it uses the same mathematics as RSA',
    ],
    answer: 1,
    explanation: 'CRYSTALS-Kyber (now standardized as ML-KEM in FIPS 203) was selected because it offers the best combination of security (based on the Module-LWE problem, believed hard for quantum computers), performance (fast operations suitable for TLS handshakes), and key/ciphertext sizes (practical for web traffic). Its security relies on the hardness of finding short vectors in structured lattices, which has been extensively studied.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'What is "cryptographic agility" and why is it critical for post-quantum migration?',
    options: [
      'The ability of cryptographic algorithms to run quickly',
      'The ability of systems to swap cryptographic algorithms without major code changes — critical because PQC algorithms may need to be updated if vulnerabilities are found, and hardcoded algorithm choices make migration extremely expensive',
      'The ability to encrypt data while in transit',
      'The speed at which encryption keys are generated',
    ],
    answer: 1,
    explanation: 'Cryptographic agility means designing systems so that the cryptographic algorithms can be changed with minimal code modification. This is critical for PQC migration because: (1) the migration from RSA/ECC to PQC algorithms is a massive undertaking, (2) PQC algorithms are relatively new and may have vulnerabilities discovered later requiring algorithm changes, and (3) systems without agility face enormous costs for each algorithm change.',
  },

  // Chapter 13: Future of Quantum Computing
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'Why is Google\'s 2019 quantum supremacy claim controversial?',
    options: [
      'Because the experiment was never actually performed',
      'Because IBM showed the same task could be solved classically in ~2.5 days (not 10,000 years) with sufficient storage, and the task (random circuit sampling) has no known practical application',
      'Because the results were fabricated',
      'Because other companies achieved supremacy first',
    ],
    answer: 1,
    explanation: 'Google claimed their Sycamore processor completed a random circuit sampling task in 200 seconds that would take 10,000 years classically. IBM challenged this by showing that with sufficient disk storage, a classical supercomputer could complete the task in about 2.5 days. Furthermore, random circuit sampling has no practical application. This highlights that quantum supremacy is always relative to the best known classical algorithm and that the gap between supremacy and practical advantage remains large.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'What is circuit knitting/cutting in hybrid quantum-classical computing?',
    options: [
      'Physically cutting quantum chips to make them smaller',
      'Splitting large quantum circuits into smaller subcircuits that can be executed on available hardware, with classical computation combining the partial results to reconstruct the full circuit outcome',
      'A technique for sewing together different quantum hardware platforms',
      'Removing unnecessary gates from quantum circuits to make them faster',
    ],
    answer: 1,
    explanation: 'Circuit knitting (or circuit cutting) decomposes a large quantum circuit — which may require more qubits or connectivity than available hardware provides — into smaller subcircuits that fit on the available processor. Classical post-processing combines the results from these subcircuits to approximate the output of the full circuit. This enables effective computations larger than the physical hardware supports, at the cost of exponential classical overhead in the number of cuts.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'What is the estimated timeline for practical quantum advantage according to leading roadmaps?',
    options: [
      'It has already been achieved for all problems',
      '5-15 years for specific applications (chemistry, optimization) using fault-tolerant hardware, and 15-30+ years for broad economic impact — with timelines historically being overoptimistic',
      'It will never be achieved',
      'Within the next 1-2 years for all applications',
    ],
    answer: 1,
    explanation: 'Leading companies and research institutions estimate 5-15 years for quantum advantage on specific problems like quantum chemistry simulation and structured optimization, requiring fault-tolerant quantum computers with thousands of logical qubits. Broad economic impact (McKinsey estimates $450-850B by 2040) is projected 15-30+ years out. However, quantum computing timelines have historically been overoptimistic, and the actual trajectory depends on solving multiple open engineering and scientific challenges.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
