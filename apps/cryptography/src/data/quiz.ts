export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Cryptographic Primitives & Properties
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'Which property ensures that a ciphertext cannot be decrypted without the correct key, even with unlimited computational resources?',
    options: [
      'Computational security',
      'Information-theoretic security',
      'Semantic security',
      'Indistinguishability',
    ],
    answer: 1,
    explanation: 'Information-theoretic security (unconditional security) means the ciphertext reveals zero information about the plaintext regardless of computational power. The one-time pad achieves this. Computational security only holds against resource-bounded adversaries.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'What does Kerckhoffs\'s principle state about cryptographic systems?',
    options: [
      'The algorithm must be kept secret to be secure',
      'Security should depend only on the secrecy of the key, not the algorithm',
      'Longer keys always provide better security',
      'Symmetric ciphers are more secure than asymmetric ones',
    ],
    answer: 1,
    explanation: 'Kerckhoffs\'s principle states that a cryptosystem should be secure even if everything about the system, except the key, is public knowledge. This is why modern algorithms like AES are fully published and peer-reviewed.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'A pseudorandom generator (PRG) is considered secure if its output is:',
    options: [
      'Truly random according to statistical tests',
      'Computationally indistinguishable from a truly random sequence',
      'Generated using hardware entropy sources',
      'Longer than 256 bits',
    ],
    answer: 1,
    explanation: 'A secure PRG produces output that no efficient algorithm can distinguish from a truly random sequence with non-negligible advantage. This is a computational notion — the output is not truly random but appears so to any polynomial-time adversary.',
  },

  // Chapter 2: Symmetric Encryption
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'Why is ECB (Electronic Codebook) mode considered insecure for encrypting data longer than one block?',
    options: [
      'It uses too much memory',
      'Identical plaintext blocks produce identical ciphertext blocks, leaking patterns',
      'It cannot handle data that is not a multiple of the block size',
      'It requires a longer key than other modes',
    ],
    answer: 1,
    explanation: 'ECB encrypts each block independently with the same key, so identical plaintext blocks yield identical ciphertext blocks. This preserves patterns in the data — famously demonstrated by the "ECB penguin" image where the outline remains visible after encryption.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'What is the primary advantage of AES-GCM over AES-CBC?',
    options: [
      'AES-GCM uses a larger block size',
      'AES-GCM provides both encryption and authentication in a single operation',
      'AES-GCM supports longer keys',
      'AES-GCM is resistant to quantum attacks',
    ],
    answer: 1,
    explanation: 'AES-GCM is an authenticated encryption mode that provides both confidentiality and integrity/authenticity in one pass. AES-CBC only provides confidentiality — you need a separate MAC (like HMAC) for integrity, which introduces complexity and potential vulnerabilities like padding oracle attacks.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'In ChaCha20-Poly1305, what role does Poly1305 serve?',
    options: [
      'It provides the encryption',
      'It generates the initialization vector',
      'It computes a message authentication code (MAC)',
      'It performs key derivation',
    ],
    answer: 2,
    explanation: 'ChaCha20 handles encryption (stream cipher) while Poly1305 computes a MAC for authentication. Together they form an AEAD (Authenticated Encryption with Associated Data) construction, similar to AES-GCM but using different primitives.',
  },

  // Chapter 3: Hash Functions & MACs
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'Which property of a hash function guarantees it is hard to find two different inputs that produce the same output?',
    options: [
      'Preimage resistance',
      'Second preimage resistance',
      'Collision resistance',
      'Avalanche effect',
    ],
    answer: 2,
    explanation: 'Collision resistance means it is computationally infeasible to find any two distinct inputs x ≠ y such that H(x) = H(y). Preimage resistance means given h, it is hard to find x where H(x) = h. Second preimage resistance means given x, it is hard to find y ≠ x where H(x) = H(y).',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'Why does HMAC use the construction H(K ⊕ opad || H(K ⊕ ipad || message)) instead of simply H(K || message)?',
    options: [
      'It runs faster on modern hardware',
      'It prevents length extension attacks that affect Merkle-Damgård hashes',
      'It allows variable-length keys',
      'It reduces the output size',
    ],
    answer: 1,
    explanation: 'Simply prepending a key (H(K || m)) is vulnerable to length extension attacks with Merkle-Damgård hashes like SHA-256. An attacker knowing H(K || m) can compute H(K || m || padding || m\') without knowing K. HMAC\'s nested construction prevents this.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'What is the birthday bound for finding collisions in a hash function with an n-bit output?',
    options: [
      'O(2^n) operations',
      'O(2^(n/2)) operations',
      'O(n^2) operations',
      'O(2^(n-1)) operations',
    ],
    answer: 1,
    explanation: 'The birthday paradox means collisions can be found in approximately 2^(n/2) operations, not 2^n. For SHA-256 (256-bit output), collision resistance is 2^128 — which is why 256-bit hashes are considered to provide 128-bit collision security.',
  },

  // Chapter 4: Number Theory for Cryptography
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'The security of RSA relies on the assumed difficulty of which mathematical problem?',
    options: [
      'The discrete logarithm problem',
      'Integer factorization of large semiprimes',
      'The shortest vector problem in lattices',
      'Finding roots of polynomials over finite fields',
    ],
    answer: 1,
    explanation: 'RSA security rests on the difficulty of factoring the product of two large primes (a semiprime). If an attacker can factor n = p × q, they can compute the private key. No efficient classical algorithm for factoring is known, though Shor\'s quantum algorithm can do it in polynomial time.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What does Euler\'s theorem state about a^φ(n) mod n when gcd(a, n) = 1?',
    options: [
      'a^φ(n) ≡ 0 (mod n)',
      'a^φ(n) ≡ 1 (mod n)',
      'a^φ(n) ≡ a (mod n)',
      'a^φ(n) ≡ φ(n) (mod n)',
    ],
    answer: 1,
    explanation: 'Euler\'s theorem states that if gcd(a, n) = 1, then a^φ(n) ≡ 1 (mod n), where φ(n) is Euler\'s totient function. This is fundamental to RSA: since ed ≡ 1 (mod φ(n)), we get m^(ed) ≡ m (mod n), allowing decryption to recover the original message.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'In modular arithmetic, what is the Chinese Remainder Theorem (CRT) used for in RSA?',
    options: [
      'Generating prime numbers more efficiently',
      'Speeding up decryption by computing mod p and mod q separately',
      'Increasing the key size for better security',
      'Verifying digital signatures',
    ],
    answer: 1,
    explanation: 'CRT allows RSA decryption to be performed as two smaller modular exponentiations (mod p and mod q) instead of one large one (mod n). The results are then combined. This is roughly 4× faster than direct computation and is standard in RSA implementations.',
  },

  // Chapter 5: RSA & Diffie-Hellman
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'Why is textbook RSA (direct m^e mod n) insecure in practice?',
    options: [
      'The key size is too small',
      'It is deterministic — the same plaintext always produces the same ciphertext',
      'It cannot encrypt messages longer than 64 bits',
      'It requires sharing the private key',
    ],
    answer: 1,
    explanation: 'Textbook RSA is deterministic, so identical messages produce identical ciphertexts, enabling an attacker to detect repeated messages or perform chosen-plaintext attacks. OAEP padding (RSA-OAEP) adds randomness to make encryption probabilistic and provides CCA2 security.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'What security property does the Diffie-Hellman key exchange provide?',
    options: [
      'Authentication of both parties',
      'Forward secrecy when using ephemeral keys',
      'Non-repudiation of messages',
      'Protection against replay attacks',
    ],
    answer: 1,
    explanation: 'Ephemeral Diffie-Hellman (DHE) provides forward secrecy: even if long-term keys are later compromised, past session keys cannot be recovered because the ephemeral DH values were discarded. Basic DH does not authenticate parties — that requires signatures or certificates.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'In the Diffie-Hellman protocol, what information can a passive eavesdropper observe?',
    options: [
      'The shared secret directly',
      'Both private exponents a and b',
      'The public values g^a mod p and g^b mod p, but not the shared secret g^(ab) mod p',
      'The complete plaintext of all messages',
    ],
    answer: 2,
    explanation: 'An eavesdropper sees the public parameters (g, p) and the exchanged values (g^a mod p, g^b mod p) but computing g^(ab) mod p from these requires solving the Computational Diffie-Hellman (CDH) problem, which is believed to be hard in appropriate groups.',
  },

  // Chapter 6: Elliptic Curve Cryptography
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'What is the main advantage of ECC over RSA at equivalent security levels?',
    options: [
      'ECC is older and more battle-tested',
      'ECC uses much smaller key sizes for the same security strength',
      'ECC is resistant to quantum computer attacks',
      'ECC does not require random number generation',
    ],
    answer: 1,
    explanation: 'A 256-bit ECC key provides roughly the same security as a 3072-bit RSA key. This means smaller keys, faster operations, less bandwidth, and lower storage — critical for constrained devices like smart cards and IoT sensors.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'In elliptic curve cryptography, what is the "hard problem" that provides security?',
    options: [
      'Factoring the curve parameters',
      'The Elliptic Curve Discrete Logarithm Problem (ECDLP)',
      'Finding the order of the curve',
      'Inverting the hash function used in ECDSA',
    ],
    answer: 1,
    explanation: 'Given points P and Q = kP on an elliptic curve, the ECDLP is to find the scalar k. The best known algorithms for solving ECDLP on well-chosen curves run in O(√n) time (Pollard\'s rho), making 256-bit curves provide ~128-bit security.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'Why was Curve25519 designed to be resistant to timing side-channel attacks?',
    options: [
      'It uses a larger field size than other curves',
      'Its arithmetic can be implemented with constant-time operations on standard hardware',
      'It uses a different mathematical structure than other elliptic curves',
      'It incorporates built-in key rotation',
    ],
    answer: 1,
    explanation: 'Curve25519 was specifically designed so that the Montgomery ladder scalar multiplication runs in constant time without secret-dependent branches or memory access patterns. This prevents timing attacks that have compromised other curve implementations.',
  },

  // Chapter 7: Key Management & PKI
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'What is the primary purpose of a Certificate Authority (CA) in PKI?',
    options: [
      'To encrypt all communications on behalf of users',
      'To bind public keys to identities by issuing signed certificates',
      'To store private keys securely for users',
      'To perform key exchange between communicating parties',
    ],
    answer: 1,
    explanation: 'A CA verifies the identity of certificate applicants and then signs digital certificates that bind a public key to that identity. Relying parties trust the CA and can verify certificates using the CA\'s public key, establishing a chain of trust.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'What is Certificate Transparency (CT) designed to detect?',
    options: [
      'Expired certificates still in use',
      'Mis-issued or fraudulently issued certificates by monitoring public logs',
      'Man-in-the-middle attacks on TLS connections',
      'Weak key generation in certificates',
    ],
    answer: 1,
    explanation: 'Certificate Transparency requires CAs to publish all issued certificates to public, append-only logs. Domain owners and monitors can watch these logs to detect if a CA issues an unauthorized certificate for their domain, as happened with DigiNotar and other CA compromises.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'In key derivation, what is the purpose of a "salt" in HKDF or PBKDF2?',
    options: [
      'To increase the speed of key derivation',
      'To ensure different derived keys even from the same input keying material',
      'To compress the key to a fixed length',
      'To make the key quantum-resistant',
    ],
    answer: 1,
    explanation: 'A salt is a non-secret random value that ensures two users with the same password (or input) derive different keys. Without a salt, identical inputs always produce identical keys, enabling precomputation attacks like rainbow tables.',
  },

  // Chapter 8: TLS & Secure Channels
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'What major improvement did TLS 1.3 make to the handshake compared to TLS 1.2?',
    options: [
      'Added support for RSA key exchange',
      'Reduced the handshake to 1-RTT (and 0-RTT for resumption) by combining steps',
      'Increased the maximum certificate chain length',
      'Added support for compression',
    ],
    answer: 1,
    explanation: 'TLS 1.3 reduces the handshake from 2-RTT to 1-RTT by sending the ClientHello with key shares in the first message. It also supports 0-RTT resumption for repeat connections. Additionally, it removed insecure features like RSA key transport and static DH.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'Why did TLS 1.3 remove RSA key exchange (where the client encrypts the premaster secret with the server\'s RSA public key)?',
    options: [
      'RSA is too slow for key exchange',
      'It does not provide forward secrecy — compromising the server key compromises all past sessions',
      'RSA key exchange is vulnerable to padding oracle attacks',
      'Both B and C are correct',
    ],
    answer: 3,
    explanation: 'RSA key transport lacks forward secrecy (a compromised server private key decrypts all past sessions) AND has been vulnerable to padding oracle attacks (Bleichenbacher/ROBOT attacks). TLS 1.3 mandates ephemeral Diffie-Hellman (ECDHE) for both forward secrecy and to eliminate these attack classes.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'What is the purpose of the "record protocol" in TLS?',
    options: [
      'To negotiate cipher suites during the handshake',
      'To fragment, compress, encrypt, and authenticate application data after the handshake',
      'To verify the server\'s certificate chain',
      'To manage session resumption tokens',
    ],
    answer: 1,
    explanation: 'After the handshake establishes keys, the TLS record protocol handles the actual data transfer: fragmenting messages into records, encrypting each record with the negotiated AEAD cipher, and authenticating them to prevent tampering. It operates as a secure, ordered byte stream.',
  },

  // Chapter 9: Digital Signatures
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'What property do digital signatures provide that symmetric MACs do not?',
    options: [
      'Integrity protection',
      'Non-repudiation — the signer cannot deny having signed',
      'Authentication of the message sender',
      'Confidentiality of the message',
    ],
    answer: 1,
    explanation: 'Since only the private key holder can create a valid signature, digital signatures provide non-repudiation: the signer cannot plausibly deny signing. With symmetric MACs, both parties share the same key, so either could have created the MAC — no non-repudiation.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'In ECDSA, what catastrophic vulnerability occurs if the same nonce k is used for two different messages?',
    options: [
      'The signature becomes invalid',
      'The private key can be mathematically recovered from the two signatures',
      'The hash function is weakened',
      'The public key is exposed',
    ],
    answer: 1,
    explanation: 'If the same nonce k is reused in ECDSA, an attacker can algebraically solve for the private key from two signatures. This is exactly how the PlayStation 3 ECDSA key was extracted — Sony used a fixed nonce. EdDSA (Ed25519) avoids this by deriving nonces deterministically from the message and key.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'What advantage does Ed25519 offer over traditional ECDSA?',
    options: [
      'Larger key sizes',
      'Deterministic nonce generation, eliminating nonce-reuse vulnerabilities',
      'Compatibility with RSA infrastructure',
      'Resistance to quantum computing attacks',
    ],
    answer: 1,
    explanation: 'Ed25519 derives nonces deterministically from the private key and message using a hash, making it impossible to reuse nonces accidentally. It also offers faster verification, simpler implementation, and built-in resistance to timing side channels — advantages over ECDSA.',
  },

  // Chapter 10: Cryptographic Protocols
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'In a zero-knowledge proof, what does the "zero-knowledge" property guarantee?',
    options: [
      'The proof is computationally efficient',
      'The verifier learns nothing beyond the truth of the statement being proved',
      'The prover does not need to know the secret',
      'The proof cannot be replayed by an attacker',
    ],
    answer: 1,
    explanation: 'Zero-knowledge means the verifier gains no information except that the statement is true. Anything the verifier could compute from the proof interaction, they could have computed without it. This enables proving knowledge of a secret (like a password) without revealing it.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'What does "oblivious transfer" enable in secure multi-party computation?',
    options: [
      'Sending encrypted messages without a pre-shared key',
      'A sender transfers one of several messages without learning which one the receiver chose',
      'Anonymous broadcasting of messages to a group',
      'Encrypting data so that no single party can decrypt it alone',
    ],
    answer: 1,
    explanation: 'In 1-out-of-2 oblivious transfer, the sender has two messages and the receiver selects one. The sender doesn\'t learn which was selected, and the receiver doesn\'t learn the other message. OT is a fundamental building block for secure computation protocols like Yao\'s garbled circuits.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'What problem does secret sharing (e.g., Shamir\'s scheme) solve?',
    options: [
      'Encrypting messages for multiple recipients simultaneously',
      'Splitting a secret into shares so that any t-of-n shares can reconstruct it, but fewer cannot',
      'Generating random numbers from multiple sources',
      'Distributing computational work across multiple machines',
    ],
    answer: 1,
    explanation: 'Shamir\'s Secret Sharing uses polynomial interpolation to split a secret into n shares with a threshold t. Any t shares reconstruct the secret, but t-1 or fewer reveal absolutely no information about it (information-theoretic security). Used for key escrow, multi-sig wallets, and distributed trust.',
  },

  // Chapter 11: Cryptanalysis & Attacks
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'What is a "padding oracle attack" and which protocols has it affected?',
    options: [
      'An attack on hash function padding; affected MD5',
      'An attack exploiting error messages from decryption padding validation; affected TLS CBC and XML Encryption',
      'An attack on RSA key padding; affected SSH',
      'An attack on block cipher padding in ECB mode; affected AES',
    ],
    answer: 1,
    explanation: 'A padding oracle attack exploits systems that reveal whether CBC decryption padding is valid (via error messages or timing). The attacker iteratively decrypts ciphertext byte-by-byte. The POODLE attack on SSL 3.0 and Lucky Thirteen on TLS are famous examples. This motivated the move to AEAD ciphers.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'In a "meet-in-the-middle" attack on double encryption (E(K2, E(K1, m))), what is the effective security?',
    options: [
      'Double the single-key security (2 × 2^n = 2^(n+1))',
      'Only slightly more than single-key security (2^(n+1) time, 2^n space)',
      'Exactly the same as single-key security',
      'Quadruple the single-key security',
    ],
    answer: 1,
    explanation: 'Meet-in-the-middle encrypts from one side and decrypts from the other, looking for matches in a stored table. For two n-bit keys, it takes 2^(n+1) time and 2^n space instead of the expected 2^(2n). This is why Double-DES provides only ~57-bit security instead of 112, and why Triple-DES was needed.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'What does a "side-channel attack" exploit?',
    options: [
      'Mathematical weaknesses in the encryption algorithm',
      'Physical implementation leakage such as timing, power consumption, or electromagnetic emanations',
      'Flaws in the network protocol design',
      'Social engineering of key holders',
    ],
    answer: 1,
    explanation: 'Side-channel attacks exploit physical information leaked during computation — timing variations, power consumption patterns, electromagnetic emissions, or even acoustic signals. Countermeasures include constant-time code, masking, and blinding. These attacks bypass mathematical security entirely.',
  },

  // Chapter 12: Post-Quantum Cryptography
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'Why does Shor\'s algorithm threaten RSA and ECC but not symmetric ciphers like AES-256?',
    options: [
      'Shor\'s algorithm only works on public-key systems based on factoring and discrete logarithms',
      'AES-256 uses quantum-resistant operations internally',
      'Symmetric ciphers don\'t use mathematical trapdoors',
      'Both A and C are correct',
    ],
    answer: 3,
    explanation: 'Shor\'s algorithm efficiently solves integer factorization and discrete logarithm — the problems underlying RSA, DH, and ECC. Symmetric ciphers like AES don\'t rely on these mathematical trapdoors. Grover\'s algorithm can speed up brute-force search but only halves the effective key length (AES-256 → 128-bit security).',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'Which mathematical structure does the NIST-standardized ML-KEM (formerly CRYSTALS-Kyber) rely on?',
    options: [
      'Elliptic curves over finite fields',
      'Module lattices and the Learning With Errors (LWE) problem',
      'Multivariate polynomial equations',
      'Isogenies between supersingular elliptic curves',
    ],
    answer: 1,
    explanation: 'ML-KEM (FIPS 203) is based on the Module Learning With Errors (MLWE) problem over structured lattices. The hardness of MLWE — finding a secret vector given noisy linear equations over a module lattice — is believed to resist both classical and quantum attacks.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'What is the "harvest now, decrypt later" threat that motivates urgent PQC migration?',
    options: [
      'Quantum computers can already break current encryption',
      'Adversaries record encrypted data today to decrypt it once quantum computers become available',
      'Harvesting encryption keys from compromised servers',
      'Using AI to predict encryption keys from patterns',
    ],
    answer: 1,
    explanation: 'Nation-state adversaries may be recording encrypted traffic now, planning to decrypt it years later when sufficiently powerful quantum computers exist. For data with long-term confidentiality requirements (state secrets, medical records), migration to post-quantum algorithms is urgent even before quantum computers arrive.',
  },

  // Chapter 13: Emerging Cryptography
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'What does homomorphic encryption allow?',
    options: [
      'Encrypting data with multiple keys simultaneously',
      'Performing computations on encrypted data without decrypting it first',
      'Creating encryption schemes that are resistant to all known attacks',
      'Sharing encrypted data between users without a key exchange',
    ],
    answer: 1,
    explanation: 'Fully homomorphic encryption (FHE) allows arbitrary computations on ciphertexts that, when decrypted, yield the same result as if the operations were performed on the plaintexts. This enables cloud computing on sensitive data without the cloud ever seeing the unencrypted data.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'What is the key innovation of zk-SNARKs used in blockchain systems?',
    options: [
      'They enable faster transaction processing',
      'They provide succinct, non-interactive proofs that can verify computations without revealing inputs',
      'They replace the need for consensus mechanisms',
      'They encrypt all blockchain data by default',
    ],
    answer: 1,
    explanation: 'zk-SNARKs (Zero-Knowledge Succinct Non-interactive Arguments of Knowledge) produce tiny proofs that verify large computations instantly, without revealing the underlying data. In blockchains like Zcash, they prove transaction validity without revealing sender, receiver, or amount.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'What problem does Multi-Party Computation (MPC) solve for key management?',
    options: [
      'Generating truly random keys using multiple sources',
      'Distributing key generation and signing so no single party ever holds the complete private key',
      'Automatically rotating keys based on usage patterns',
      'Encrypting keys for long-term archival storage',
    ],
    answer: 1,
    explanation: 'MPC-based threshold signing (like threshold ECDSA) splits key generation and signing across multiple parties. The private key is never assembled in one place — each party holds a share and contributes to the signing computation. This eliminates single points of compromise in key management.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
