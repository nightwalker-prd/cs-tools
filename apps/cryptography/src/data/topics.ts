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
  { id: 2, title: 'Asymmetric Cryptography' },
  { id: 3, title: 'Protocols & Applications' },
  { id: 4, title: 'Advanced Topics' },
];

export const topics: Topic[] = [
  // Part 1: Foundations
  {
    id: 1,
    title: 'Cryptographic Primitives & Properties',
    part: 1,
    partTitle: 'Foundations',
    summary: 'Core security properties, design principles, and the building blocks that all cryptographic systems are constructed from.',
    concepts: [
      {
        id: '1-1',
        name: 'CIA Triad & Cryptographic Goals',
        description: 'The fundamental security properties that cryptography aims to provide.',
        keyPoints: [
          'Confidentiality: ensuring only authorized parties can read the data — achieved through encryption',
          'Integrity: detecting unauthorized modifications to data — achieved through hash functions and MACs',
          'Authentication: verifying the identity of communicating parties — achieved through digital signatures and MACs',
          'Non-repudiation: preventing a party from denying they performed an action — achieved through digital signatures (not MACs)',
        ],
        tradeoffs: [
          'MACs provide authentication + integrity but not non-repudiation (both parties share the key)',
          'Digital signatures provide non-repudiation but are computationally more expensive than MACs',
        ],
        realWorld: ['TLS', 'PGP/GPG', 'JWT tokens', 'code signing'],
      },
      {
        id: '1-2',
        name: 'Kerckhoffs\'s Principle',
        description: 'A cryptographic system should be secure even if everything about the system is public knowledge, except the key.',
        keyPoints: [
          'Security through obscurity is not security — assume the attacker knows the algorithm',
          'The only secret should be the key — this enables public review and cryptanalysis of the algorithm',
          'Open algorithms (AES, SHA-256) are stronger because they survive years of public scrutiny',
          'Proprietary/secret algorithms often contain weaknesses discovered only after deployment (e.g., CSS for DVDs, A5/1 for GSM)',
        ],
        tradeoffs: [
          'Open algorithms invite analysis but also give attackers knowledge of the system',
          'In practice, some obscurity (implementation details) can add defense-in-depth on top of strong crypto',
        ],
        realWorld: ['AES competition', 'NIST standardization', 'open-source crypto libraries'],
      },
      {
        id: '1-3',
        name: 'Randomness & Key Generation',
        description: 'Cryptographic security fundamentally depends on the quality of random number generation.',
        keyPoints: [
          'CSPRNG (Cryptographically Secure PRNG): produces output indistinguishable from true randomness — /dev/urandom, CryptGenRandom',
          'Entropy sources: hardware noise (thermal, shot noise), timing jitter, user input — collected and whitened by the OS',
          'Key space: a 128-bit key has 2^128 possible values — brute force is infeasible if the key is truly random',
          'Nonce/IV requirements: many schemes require unique (never-reused) values — reuse can catastrophically break security (e.g., WEP)',
        ],
        tradeoffs: [
          'True random number generators are slow; CSPRNGs are fast but depend on seed quality',
          'Larger keys provide more security margin but increase computation and storage costs',
        ],
        realWorld: ['/dev/urandom', 'Intel RDRAND', 'Fortuna PRNG', 'HSM key generation'],
      },
    ],
  },
  {
    id: 2,
    title: 'Symmetric Encryption',
    part: 1,
    partTitle: 'Foundations',
    summary: 'Block ciphers, stream ciphers, and modes of operation — encrypting data with a shared secret key.',
    concepts: [
      {
        id: '2-1',
        name: 'Block Ciphers (AES & DES)',
        description: 'Algorithms that encrypt fixed-size blocks of data using a symmetric key.',
        keyPoints: [
          'AES (Advanced Encryption Standard): 128-bit blocks, 128/192/256-bit keys, SPN (Substitution-Permutation Network) structure',
          'AES rounds: SubBytes (S-box substitution), ShiftRows, MixColumns, AddRoundKey — 10/12/14 rounds based on key size',
          'DES: obsolete 56-bit key, 64-bit blocks — broken by brute force; 3DES applies DES three times but is slow',
          'AES is hardware-accelerated (AES-NI instructions) on modern CPUs, achieving multi-GB/s throughput',
        ],
        tradeoffs: [
          'AES-128 is sufficient for most use cases; AES-256 provides margin against quantum computers (Grover\'s algorithm halves effective key size)',
          'Block ciphers alone only encrypt single blocks — modes of operation are needed for arbitrary-length data',
        ],
        realWorld: ['AES-NI', 'disk encryption (LUKS, BitLocker)', 'TLS cipher suites', 'Wi-Fi WPA2/WPA3'],
      },
      {
        id: '2-2',
        name: 'Modes of Operation',
        description: 'Schemes for applying block ciphers to encrypt data larger than one block.',
        keyPoints: [
          'ECB (Electronic Codebook): each block encrypted independently — NEVER use, identical plaintext blocks produce identical ciphertext (the penguin problem)',
          'CBC (Cipher Block Chaining): each block XORed with previous ciphertext — requires IV, vulnerable to padding oracle attacks',
          'CTR (Counter Mode): encrypts incrementing counter values, XORs with plaintext — parallelizable, no padding needed',
          'GCM (Galois/Counter Mode): CTR + GHASH authentication tag — provides AEAD (Authenticated Encryption with Associated Data)',
        ],
        tradeoffs: [
          'CBC is sequential (cannot parallelize encryption); CTR/GCM are fully parallelizable',
          'GCM is the preferred choice but nonce reuse is catastrophic — destroys both confidentiality and authenticity',
        ],
        realWorld: ['AES-GCM in TLS 1.3', 'AES-CBC in legacy systems', 'AES-CTR for disk encryption'],
      },
      {
        id: '2-3',
        name: 'Stream Ciphers',
        description: 'Ciphers that encrypt data one byte/bit at a time using a pseudorandom keystream.',
        keyPoints: [
          'ChaCha20: modern stream cipher by Daniel Bernstein — 256-bit key, 96-bit nonce, 20 rounds of quarter-round operations',
          'ChaCha20-Poly1305: AEAD construction pairing ChaCha20 encryption with Poly1305 MAC — TLS 1.3 cipher suite',
          'RC4: obsolete stream cipher — biases in keystream led to practical attacks on TLS and WEP',
          'Stream ciphers XOR plaintext with keystream — same keystream must never be reused (two-time pad attack)',
        ],
        tradeoffs: [
          'ChaCha20 is faster than AES on platforms without AES-NI hardware acceleration (mobile, embedded)',
          'Stream ciphers handle arbitrary-length data without padding but require strict nonce management',
        ],
        realWorld: ['ChaCha20-Poly1305 in TLS', 'WireGuard VPN', 'Google QUIC protocol'],
      },
    ],
  },
  {
    id: 3,
    title: 'Hash Functions & MACs',
    part: 1,
    partTitle: 'Foundations',
    summary: 'Cryptographic hash functions for integrity, message authentication codes for authenticity, and authenticated encryption.',
    concepts: [
      {
        id: '3-1',
        name: 'Cryptographic Hash Functions',
        description: 'One-way functions that map arbitrary input to a fixed-size digest with specific security properties.',
        keyPoints: [
          'Preimage resistance: given h, infeasible to find m such that H(m) = h — cannot reverse the hash',
          'Second preimage resistance: given m1, infeasible to find m2 ≠ m1 such that H(m1) = H(m2)',
          'Collision resistance: infeasible to find any m1 ≠ m2 such that H(m1) = H(m2) — birthday bound is 2^(n/2)',
          'SHA-256 (256-bit output, SHA-2 family) and SHA-3 (Keccak sponge construction) are the current standards',
        ],
        tradeoffs: [
          'SHA-256 is widely deployed and hardware-accelerated; SHA-3 provides algorithmic diversity but is less common',
          'MD5 and SHA-1 are broken for collision resistance — still used for checksums but not security',
        ],
        realWorld: ['Git (SHA-1→SHA-256)', 'certificate fingerprints', 'blockchain proof-of-work', 'password hashing (via KDFs)'],
      },
      {
        id: '3-2',
        name: 'HMAC & Message Authentication',
        description: 'Keyed hash constructions that provide both integrity and authentication of messages.',
        keyPoints: [
          'HMAC: H(K⊕opad ∥ H(K⊕ipad ∥ message)) — uses the hash function twice with padded key variants',
          'HMAC is secure as long as the underlying hash function is pseudorandom — even MD5-HMAC is still considered safe',
          'Verification must use constant-time comparison to prevent timing side-channel attacks',
          'HMAC provides authentication (only key holders can create valid MACs) but not non-repudiation (both parties share key)',
        ],
        tradeoffs: [
          'HMAC is simple and well-analyzed but requires a shared secret — not suitable when non-repudiation is needed',
          'Poly1305 is faster than HMAC-SHA256 for large messages but is a one-time authenticator (needs unique key per message)',
        ],
        realWorld: ['HMAC-SHA256 in JWT', 'API request signing (AWS Signature V4)', 'TOTP/HOTP (HMAC-based OTP)'],
      },
      {
        id: '3-3',
        name: 'Authenticated Encryption (AEAD)',
        description: 'Encryption schemes that simultaneously provide confidentiality, integrity, and authenticity.',
        keyPoints: [
          'AEAD combines encryption + authentication in a single operation — prevents encrypt-then-MAC composition errors',
          'AES-GCM: AES in counter mode + GHASH polynomial authentication — the dominant AEAD in TLS 1.3',
          'ChaCha20-Poly1305: ChaCha20 stream cipher + Poly1305 MAC — alternative AEAD for software-only environments',
          'Associated Data (AD): additional unencrypted data (headers, metadata) that is authenticated but not encrypted',
        ],
        tradeoffs: [
          'AES-GCM is fast with hardware support but catastrophically fails on nonce reuse; AES-GCM-SIV is nonce-misuse resistant',
          'AEAD is the modern standard — avoid implementing encrypt-then-MAC manually as composition errors are common',
        ],
        realWorld: ['TLS 1.3 cipher suites', 'Google Tink library', 'libsodium secretbox', 'AWS encryption SDK'],
      },
    ],
  },

  // Part 2: Asymmetric Cryptography
  {
    id: 4,
    title: 'Number Theory & Math Foundations',
    part: 2,
    partTitle: 'Asymmetric Cryptography',
    summary: 'The mathematical foundations underpinning asymmetric cryptography — modular arithmetic, primes, and hard problems.',
    concepts: [
      {
        id: '4-1',
        name: 'Modular Arithmetic',
        description: 'Arithmetic in finite sets that forms the basis of most public-key cryptography.',
        keyPoints: [
          'Modular arithmetic: a ≡ b (mod n) means n divides (a - b) — all operations wrap around at n',
          'Modular exponentiation: a^b mod n computed efficiently via square-and-multiply algorithm — O(log b) multiplications',
          'Euler\'s theorem: a^φ(n) ≡ 1 (mod n) when gcd(a,n)=1 — the mathematical basis for RSA',
          'Extended Euclidean algorithm: finds modular inverses — essential for computing RSA private keys',
        ],
        tradeoffs: [
          'Large modular exponentiations are computationally expensive — limits RSA performance compared to ECC',
          'Modular arithmetic on large numbers requires arbitrary-precision libraries (GMP, OpenSSL bignum)',
        ],
        realWorld: ['RSA key generation', 'Diffie-Hellman', 'ElGamal encryption'],
      },
      {
        id: '4-2',
        name: 'Prime Numbers & Factoring',
        description: 'The hardness of integer factorization is the security basis for RSA.',
        keyPoints: [
          'RSA security relies on the difficulty of factoring n = p × q where p and q are large primes (2048+ bits)',
          'Primality testing: Miller-Rabin probabilistic test — fast and sufficient for cryptographic prime generation',
          'Best known factoring algorithms: General Number Field Sieve (GNFS) — sub-exponential but still infeasible for 2048-bit moduli',
          'RSA-250 (829 bits) was factored in 2020 — current minimum recommendation is RSA-2048, with RSA-4096 for long-term security',
        ],
        tradeoffs: [
          'Larger RSA keys are more secure but significantly slower — RSA-4096 is ~8x slower than RSA-2048',
          'Shor\'s quantum algorithm can factor in polynomial time — RSA will be broken by sufficiently large quantum computers',
        ],
        realWorld: ['RSA key sizes', 'NIST recommendations', 'quantum computing timeline estimates'],
      },
      {
        id: '4-3',
        name: 'Discrete Logarithm Problem',
        description: 'Computing the exponent in modular exponentiation — the hard problem underlying DH and DSA.',
        keyPoints: [
          'Given g, g^x mod p, and p, finding x is the Discrete Logarithm Problem (DLP) — believed to be hard for large primes',
          'Group theory: DLP is defined over cyclic groups — both multiplicative groups mod p and elliptic curve groups',
          'Index calculus methods solve DLP in sub-exponential time for multiplicative groups — requires 2048+ bit primes',
          'Elliptic curve DLP has no sub-exponential algorithm — 256-bit EC provides security comparable to 3072-bit RSA',
        ],
        tradeoffs: [
          'DLP-based schemes (DH, DSA) use the same math as RSA factoring but with different hard problems',
          'Elliptic curve variants of DLP are harder, enabling much smaller key sizes for equivalent security',
        ],
        realWorld: ['Diffie-Hellman key exchange', 'DSA signatures', 'ElGamal encryption'],
      },
    ],
  },
  {
    id: 5,
    title: 'RSA & Diffie-Hellman',
    part: 2,
    partTitle: 'Asymmetric Cryptography',
    summary: 'The two foundational asymmetric cryptosystems — RSA for encryption and signing, Diffie-Hellman for key exchange.',
    concepts: [
      {
        id: '5-1',
        name: 'RSA Encryption & Signing',
        description: 'The most widely deployed asymmetric algorithm — based on the difficulty of factoring large composites.',
        keyPoints: [
          'Key generation: choose primes p, q; compute n = pq, φ(n) = (p-1)(q-1); choose e (commonly 65537); compute d = e^(-1) mod φ(n)',
          'Encryption: c = m^e mod n (public key encrypts); Decryption: m = c^d mod n (private key decrypts)',
          'Signing: s = m^d mod n (private key signs); Verification: m = s^e mod n (public key verifies)',
          'Never use textbook RSA — always use padding schemes (OAEP for encryption, PSS for signatures)',
        ],
        tradeoffs: [
          'RSA is well-understood and widely supported but slow for large data — typically used to encrypt symmetric keys',
          'RSA key sizes must increase over time (1024→2048→3072+) as computing power grows',
        ],
        realWorld: ['TLS certificates', 'SSH keys', 'PGP/GPG', 'code signing'],
      },
      {
        id: '5-2',
        name: 'RSA Padding Schemes',
        description: 'Essential padding that makes RSA secure against practical attacks.',
        keyPoints: [
          'OAEP (Optimal Asymmetric Encryption Padding): randomized padding for encryption — prevents chosen-ciphertext attacks',
          'PSS (Probabilistic Signature Scheme): randomized padding for signatures — provably secure in the random oracle model',
          'PKCS#1 v1.5 padding: legacy scheme — vulnerable to Bleichenbacher\'s attack (adaptive chosen-ciphertext attack on encryption)',
          'Without padding, textbook RSA is malleable (c1 × c2 decrypts to m1 × m2) and deterministic (same plaintext → same ciphertext)',
        ],
        tradeoffs: [
          'OAEP/PSS are more secure but PKCS#1 v1.5 remains in legacy systems — migration is slow',
          'Padding reduces the maximum message size that RSA can encrypt (e.g., OAEP overhead for RSA-2048 is ~42 bytes)',
        ],
        realWorld: ['PKCS#1 v2.2', 'Bleichenbacher attacks on TLS', 'ROBOT attack'],
      },
      {
        id: '5-3',
        name: 'Diffie-Hellman Key Exchange',
        description: 'Protocol for two parties to establish a shared secret over an insecure channel.',
        keyPoints: [
          'Classic DH: Alice sends g^a mod p, Bob sends g^b mod p; shared secret is g^(ab) mod p — neither sends their private exponent',
          'An eavesdropper sees g^a and g^b but cannot compute g^(ab) without solving the Computational Diffie-Hellman (CDH) problem',
          'Ephemeral DH (DHE): generates fresh key pairs per session — provides forward secrecy (past sessions safe if long-term key compromised)',
          'Vulnerable to man-in-the-middle without authentication — must be combined with signatures or certificates',
        ],
        tradeoffs: [
          'DH provides key exchange but not authentication — must be paired with RSA/ECDSA signatures to prevent MITM',
          'Static DH reuses exponents (no forward secrecy); ephemeral DH (DHE/ECDHE) is preferred but requires more computation',
        ],
        realWorld: ['TLS key exchange', 'SSH key exchange', 'IPsec IKE', 'Signal Protocol'],
      },
    ],
  },
  {
    id: 6,
    title: 'Elliptic Curve Cryptography',
    part: 2,
    partTitle: 'Asymmetric Cryptography',
    summary: 'Modern asymmetric crypto using elliptic curves — smaller keys, faster operations, and the same security guarantees.',
    concepts: [
      {
        id: '6-1',
        name: 'Elliptic Curve Math',
        description: 'The algebraic structure of elliptic curves over finite fields that enables efficient public-key crypto.',
        keyPoints: [
          'Elliptic curve: y² = x³ + ax + b over a finite field F_p — points on the curve form an abelian group under point addition',
          'Point addition: geometric chord-and-tangent rule translated to algebraic formulas — the group operation',
          'Scalar multiplication: P, 2P, 3P, ... nP computed efficiently via double-and-add — analogous to modular exponentiation',
          'ECDLP: given P and Q = nP, finding n is the Elliptic Curve Discrete Logarithm Problem — no sub-exponential algorithms known',
        ],
        tradeoffs: [
          '256-bit ECC ≈ 3072-bit RSA security — dramatically smaller keys and faster operations',
          'Curve choice matters: some curves have special structure that enables faster attacks or backdoors (Dual_EC_DRBG controversy)',
        ],
        realWorld: ['NIST P-256', 'Curve25519', 'secp256k1 (Bitcoin)', 'Ed448'],
      },
      {
        id: '6-2',
        name: 'ECDH & ECDSA',
        description: 'Elliptic curve variants of Diffie-Hellman key exchange and digital signatures.',
        keyPoints: [
          'ECDH: Alice sends aG, Bob sends bG; shared secret is abG — same DH protocol but on elliptic curves',
          'ECDSA: sign with private key d, verify with public key Q = dG — deterministic variant (RFC 6979) avoids nonce reuse disasters',
          'ECDSA nonce reuse catastrophe: if the same k is used for two different messages, the private key is trivially recoverable',
          'X25519: ECDH on Curve25519 — designed for simplicity and resistance to implementation errors (constant-time by design)',
        ],
        tradeoffs: [
          'ECDSA requires perfect nonce generation — deterministic ECDSA (RFC 6979) eliminates this risk',
          'ECDH is fast and compact but like all DH requires authentication to prevent MITM',
        ],
        realWorld: ['TLS 1.3 (ECDHE)', 'SSH (Ed25519)', 'Bitcoin/Ethereum transactions', 'Apple/Google code signing'],
      },
      {
        id: '6-3',
        name: 'EdDSA & Modern Curves',
        description: 'Edwards-curve Digital Signature Algorithm and the modern curve choices designed for security and speed.',
        keyPoints: [
          'Ed25519: EdDSA over Curve25519 — deterministic signatures, fast, constant-time, misuse-resistant',
          'Edwards curves: x² + y² = 1 + dx²y² — complete addition formula (no special cases), simplifies constant-time implementation',
          'Curve25519/X25519 (DH) and Ed25519 (signatures) are birationally equivalent — same underlying curve, different coordinate systems',
          'Ed448 (Goldilocks): 448-bit curve providing ~224-bit security — used where extra security margin beyond Ed25519 is desired',
        ],
        tradeoffs: [
          'Ed25519 is simpler and faster than ECDSA but is newer with less legacy support',
          'NIST curves (P-256) have broader hardware/library support; Curve25519 is preferred by cryptographers for its design transparency',
        ],
        realWorld: ['SSH Ed25519 keys', 'Signal Protocol', 'WireGuard', 'Tor directory authority signing'],
      },
    ],
  },
  {
    id: 7,
    title: 'Key Management & PKI',
    part: 2,
    partTitle: 'Asymmetric Cryptography',
    summary: 'Managing cryptographic keys throughout their lifecycle and the public key infrastructure that enables trust on the internet.',
    concepts: [
      {
        id: '7-1',
        name: 'X.509 Certificates & Certificate Chains',
        description: 'Digital certificates that bind public keys to identities, enabling trust hierarchies.',
        keyPoints: [
          'X.509 certificate: contains subject, issuer, public key, validity period, extensions, and the issuer\'s digital signature',
          'Certificate chain: end-entity cert → intermediate CA → root CA — each cert signed by the next, root is self-signed and pre-trusted',
          'Certificate validation: check signature chain, expiration, revocation status (CRL/OCSP), and name matching',
          'Certificate Transparency (CT): public logs of all issued certificates — enables detection of misissued certificates',
        ],
        tradeoffs: [
          'Certificate chains enable scalable trust but introduce single points of failure (compromised CA can issue fake certs)',
          'CT improves accountability but adds complexity and doesn\'t prevent misissued certificates, only detects them',
        ],
        realWorld: ['HTTPS/TLS certificates', 'Let\'s Encrypt', 'Certificate Transparency logs'],
      },
      {
        id: '7-2',
        name: 'Key Lifecycle Management',
        description: 'Generating, storing, distributing, rotating, and destroying cryptographic keys securely.',
        keyPoints: [
          'Key generation: use CSPRNGs, generate in secure environments (HSMs for high-value keys), never derive from low-entropy sources',
          'Key storage: encrypt at rest, use hardware security modules (HSMs) or TPMs for high-value keys, separate key material from encrypted data',
          'Key rotation: regularly replace keys to limit exposure from potential compromise — automate with protocols like ACME',
          'Key destruction: securely erase key material when no longer needed — zero memory, destroy HSM key slots',
        ],
        tradeoffs: [
          'HSMs provide strong key protection but are expensive and add operational complexity',
          'Frequent key rotation limits exposure but increases operational burden and risk of service disruption',
        ],
        realWorld: ['AWS KMS', 'HashiCorp Vault', 'PKCS#11', 'Let\'s Encrypt ACME'],
      },
      {
        id: '7-3',
        name: 'Key Derivation Functions',
        description: 'Functions that derive one or more cryptographic keys from a source of key material.',
        keyPoints: [
          'HKDF: HMAC-based KDF for deriving multiple keys from a shared secret — extract-then-expand paradigm',
          'PBKDF2: password-based KDF — iterates HMAC many times to slow brute force; minimum 600,000 iterations recommended',
          'Argon2: memory-hard password hashing — winner of Password Hashing Competition, resistant to GPU/ASIC attacks',
          'scrypt: memory-hard KDF — requires large amounts of RAM, making parallel brute-force attacks expensive',
        ],
        tradeoffs: [
          'HKDF is fast (for deriving keys from strong secrets); PBKDF2/Argon2/scrypt are intentionally slow (for passwords)',
          'Argon2id is preferred for password hashing; PBKDF2 remains acceptable with high iteration counts',
        ],
        realWorld: ['Argon2 in password storage', 'HKDF in TLS 1.3', 'scrypt in cryptocurrency', 'PBKDF2 in LUKS'],
      },
    ],
  },

  // Part 3: Protocols & Applications
  {
    id: 8,
    title: 'TLS & Secure Channels',
    part: 3,
    partTitle: 'Protocols & Applications',
    summary: 'Transport Layer Security — the protocol that secures the web, its handshake, cipher suites, and security properties.',
    concepts: [
      {
        id: '8-1',
        name: 'TLS 1.3 Handshake',
        description: 'The modern TLS handshake — one round trip, forward secrecy by default, minimal cipher suite complexity.',
        keyPoints: [
          'ClientHello: client sends supported cipher suites, key shares (ECDHE), and supported versions — all in one message',
          'ServerHello: server selects cipher suite, sends its key share, encrypted extensions, certificate, and CertificateVerify',
          'Key derivation: HKDF derives handshake keys, then application traffic keys from the ECDHE shared secret',
          '1-RTT handshake: data can be sent after just one round trip; 0-RTT resumption enables even faster reconnection (with replay risk)',
        ],
        tradeoffs: [
          'TLS 1.3 removed legacy options (RSA key exchange, CBC mode) — simpler and more secure but breaks some middleboxes',
          '0-RTT data is vulnerable to replay attacks — only safe for idempotent requests',
        ],
        realWorld: ['HTTPS everywhere', 'HTTP/2 and HTTP/3', 'email (STARTTLS)', 'database connections'],
      },
      {
        id: '8-2',
        name: 'Forward Secrecy',
        description: 'The property that past session keys cannot be recovered even if the server\'s long-term private key is compromised.',
        keyPoints: [
          'Ephemeral key exchange (DHE/ECDHE): fresh DH key pairs per session — shared secret is not derivable from long-term keys',
          'Without forward secrecy (static RSA key exchange): recording encrypted traffic + later key compromise = decryption of all past sessions',
          'TLS 1.3 mandates forward secrecy — only ECDHE and DHE key exchanges are supported',
          'Forward secrecy protects against future compromises, mass surveillance, and "record now, decrypt later" attacks',
        ],
        tradeoffs: [
          'Ephemeral key exchange adds computation per connection but the cost is negligible with modern ECC',
          'Forward secrecy means lawful interception cannot decrypt past traffic even with a court order for the key',
        ],
        realWorld: ['TLS 1.3 (mandatory)', 'Signal Protocol', 'WhatsApp', 'Wire'],
      },
      {
        id: '8-3',
        name: 'Cipher Suites & Configuration',
        description: 'The combination of algorithms negotiated for a TLS connection and best practices for configuration.',
        keyPoints: [
          'TLS 1.3 cipher suites: TLS_AES_256_GCM_SHA384, TLS_AES_128_GCM_SHA256, TLS_CHACHA20_POLY1305_SHA256',
          'Key exchange is separate in TLS 1.3: X25519 (preferred), P-256, P-384 — always ephemeral',
          'Disable TLS 1.0/1.1, avoid TLS 1.2 cipher suites without forward secrecy (RSA key exchange) or AEAD (CBC mode)',
          'Certificate: prefer ECDSA (P-256 or Ed25519) over RSA for smaller, faster certificates',
        ],
        tradeoffs: [
          'Strict configuration improves security but may break compatibility with older clients',
          'ChaCha20-Poly1305 is preferred for clients without AES-NI; AES-GCM is preferred when hardware acceleration is available',
        ],
        realWorld: ['Mozilla SSL Configuration Generator', 'Qualys SSL Labs', 'Let\'s Encrypt'],
      },
    ],
  },
  {
    id: 9,
    title: 'Digital Signatures & Authentication',
    part: 3,
    partTitle: 'Protocols & Applications',
    summary: 'Signature schemes for proving authorship and integrity, and zero-knowledge proofs for authentication without revealing secrets.',
    concepts: [
      {
        id: '9-1',
        name: 'Signature Schemes',
        description: 'Algorithms that allow a signer to prove message authorship using their private key.',
        keyPoints: [
          'RSA-PSS: RSA with Probabilistic Signature Scheme padding — the recommended RSA signature mode',
          'ECDSA: elliptic curve signatures — compact but requires careful nonce generation (use deterministic RFC 6979)',
          'Ed25519: deterministic EdDSA — no nonce issues, fast, constant-time, 64-byte signatures with 32-byte public keys',
          'Signature verification is asymmetric: anyone with the public key can verify, only the private key holder can sign',
        ],
        tradeoffs: [
          'Ed25519 is simpler and safer than ECDSA but has less legacy support in some ecosystems',
          'RSA signatures are larger (256-512 bytes) than ECDSA/EdDSA signatures (64 bytes) but more broadly supported',
        ],
        realWorld: ['Git commit signing', 'code signing', 'JWT RS256/ES256', 'TLS certificate signatures'],
      },
      {
        id: '9-2',
        name: 'Multi-Signatures & Threshold Signatures',
        description: 'Schemes requiring multiple parties to collaborate on producing a single signature.',
        keyPoints: [
          'Multi-signature (multisig): multiple independent signatures on the same message — simple but produces large combined signatures',
          'Threshold signatures (t-of-n): t out of n parties must cooperate to produce a single standard-looking signature',
          'Schnorr signatures enable efficient aggregation — MuSig2 allows n parties to produce a single Schnorr signature',
          'Applications: cryptocurrency wallets (2-of-3 multisig), distributed key management, consensus protocols',
        ],
        tradeoffs: [
          'Multisig is simple but signatures grow linearly with signers; threshold signatures produce constant-size output',
          'Threshold signature protocols are more complex and require careful handling of distributed key generation',
        ],
        realWorld: ['Bitcoin multisig', 'Ethereum account abstraction', 'MPC wallet providers'],
      },
      {
        id: '9-3',
        name: 'Zero-Knowledge Proofs (Basics)',
        description: 'Proving knowledge of a secret without revealing the secret itself.',
        keyPoints: [
          'ZKP properties: completeness (honest prover convinces verifier), soundness (cheating prover fails), zero-knowledge (verifier learns nothing beyond the statement\'s truth)',
          'Schnorr identification protocol: prove knowledge of discrete log x without revealing x — interactive 3-move protocol',
          'Fiat-Shamir heuristic: converts interactive ZKPs to non-interactive by replacing verifier\'s random challenge with a hash',
          'ZKPs enable authentication, anonymous credentials, and private computation verification',
        ],
        tradeoffs: [
          'Interactive ZKPs require multiple rounds of communication; non-interactive ZKPs (via Fiat-Shamir) are single-message but require the random oracle model',
          'General-purpose ZKP systems (SNARKs/STARKs) are powerful but computationally expensive',
        ],
        realWorld: ['Schnorr signatures', 'anonymous credentials', 'Zcash (privacy coins)', 'identity verification'],
      },
    ],
  },
  {
    id: 10,
    title: 'Cryptographic Protocols',
    part: 3,
    partTitle: 'Protocols & Applications',
    summary: 'Advanced protocols built from cryptographic primitives — secure messaging, secret sharing, and multi-party computation.',
    concepts: [
      {
        id: '10-1',
        name: 'Signal Protocol & Double Ratchet',
        description: 'The gold standard for end-to-end encrypted messaging — forward secrecy and post-compromise security.',
        keyPoints: [
          'X3DH (Extended Triple Diffie-Hellman): initial key agreement using long-term, medium-term, and ephemeral keys',
          'Double Ratchet: combines DH ratchet (new DH key pairs) with symmetric ratchet (KDF chain) for per-message keys',
          'Forward secrecy: compromise of current keys cannot decrypt past messages (DH ratchet advances)',
          'Post-compromise security (self-healing): after temporary compromise, security recovers when new DH exchanges occur',
        ],
        tradeoffs: [
          'The Double Ratchet requires both parties to exchange messages to advance the DH ratchet — one-way communication limits healing',
          'Metadata (who talks to whom, when) is not protected by the Signal Protocol — requires additional measures',
        ],
        realWorld: ['Signal app', 'WhatsApp', 'Facebook Messenger (secret conversations)', 'Matrix/Element'],
      },
      {
        id: '10-2',
        name: 'Secret Sharing',
        description: 'Splitting a secret into shares so that only a threshold of shares can reconstruct it.',
        keyPoints: [
          'Shamir\'s Secret Sharing: (t,n) threshold scheme using polynomial interpolation — t shares reconstruct, t-1 shares reveal nothing',
          'A degree-(t-1) polynomial has t coefficients — the secret is the constant term, shares are evaluations at different points',
          'Information-theoretic security: fewer than t shares provide zero information about the secret (not even computationally)',
          'Applications: key escrow, distributed key storage, master key backup, multi-party key ceremonies',
        ],
        tradeoffs: [
          'Shamir\'s scheme requires a trusted dealer to create shares; verifiable secret sharing (VSS) removes this requirement',
          'Share refresh allows updating shares without changing the secret — prevents gradual share compromise over time',
        ],
        realWorld: ['HashiCorp Vault unseal keys', 'cryptocurrency key backup', 'DNSSEC root key ceremonies'],
      },
      {
        id: '10-3',
        name: 'Secure Multi-Party Computation',
        description: 'Protocols enabling multiple parties to jointly compute a function without revealing their individual inputs.',
        keyPoints: [
          'MPC goal: parties P1,...,Pn with inputs x1,...,xn compute f(x1,...,xn) without any party learning others\' inputs',
          'Garbled circuits (Yao): one party "garbles" a boolean circuit, the other evaluates it obliviously — efficient for two parties',
          'Secret sharing-based MPC: inputs are shared, computation proceeds on shares using linear operations and Beaver triples for multiplication',
          'Applications: private set intersection, auctions without revealing bids, joint data analysis without sharing datasets',
        ],
        tradeoffs: [
          'MPC is orders of magnitude slower than plaintext computation — practical only for specific high-value use cases',
          'Honest-majority protocols are more efficient than dishonest-majority, but require trust assumptions about colluding parties',
        ],
        realWorld: ['Private Set Intersection (contact discovery)', 'secure auctions', 'privacy-preserving analytics', 'Boston wage equity study'],
      },
    ],
  },

  // Part 4: Advanced Topics
  {
    id: 11,
    title: 'Cryptanalysis & Attacks',
    part: 4,
    partTitle: 'Advanced Topics',
    summary: 'Common attacks on cryptographic systems — from implementation flaws to mathematical breaks.',
    concepts: [
      {
        id: '11-1',
        name: 'Side-Channel Attacks',
        description: 'Extracting secrets from the physical implementation rather than the mathematical algorithm.',
        keyPoints: [
          'Timing attacks: execution time varies based on secret data (e.g., early-exit in comparison, branch-dependent operations)',
          'Power analysis: measuring CPU power consumption reveals data-dependent operations — Simple (SPA) and Differential (DPA)',
          'Cache-timing attacks: shared CPU caches leak information about memory access patterns — Flush+Reload, Prime+Probe',
          'Countermeasures: constant-time implementations, masking/blinding, noise generation, physical shielding',
        ],
        tradeoffs: [
          'Constant-time code is harder to write and often slower — but essential for any code handling secret keys',
          'Side-channel countermeasures add complexity and may themselves introduce subtle vulnerabilities',
        ],
        realWorld: ['Spectre/Meltdown', 'ECDSA nonce recovery via cache timing', 'RSA key recovery from power traces'],
      },
      {
        id: '11-2',
        name: 'Padding Oracle & CBC Attacks',
        description: 'Exploiting error feedback in padding validation to decrypt CBC-mode ciphertext.',
        keyPoints: [
          'Padding oracle: a server that reveals whether decrypted padding is valid — enables byte-by-byte plaintext recovery',
          'The attack works by manipulating ciphertext bytes and observing which modifications produce valid padding',
          'POODLE attack: forces TLS downgrade to SSL 3.0, then exploits CBC padding oracle to steal cookies',
          'Lucky Thirteen: timing side channel in TLS CBC MAC-then-encrypt reveals padding validity',
        ],
        tradeoffs: [
          'The fundamental issue is separating decryption from authentication — AEAD modes (GCM) prevent these attacks entirely',
          'Constant-time padding checks mitigate timing oracles but the error-based oracle may still leak through other channels',
        ],
        realWorld: ['POODLE', 'Lucky Thirteen', 'Bleichenbacher attack on RSA PKCS#1', 'ROBOT attack'],
      },
      {
        id: '11-3',
        name: 'Birthday & Meet-in-the-Middle Attacks',
        description: 'Generic attacks exploiting the birthday paradox and time-memory tradeoffs.',
        keyPoints: [
          'Birthday attack: finding a collision in an n-bit hash requires ~2^(n/2) attempts — SHA-256 collisions need ~2^128 work',
          'Meet-in-the-middle: attack on double encryption — encrypt from one side, decrypt from the other, find matches in the middle',
          'MITM makes Double-DES no better than single DES in practice (2^57 time + 2^56 memory vs 2^112 brute force)',
          'Sweet32 attack: birthday collision on 64-bit block ciphers (3DES, Blowfish) after ~2^32 blocks (~32 GB) of data',
        ],
        tradeoffs: [
          'Birthday attacks set a lower bound on hash output size — 128-bit hashes are insecure, 256-bit provides 128-bit collision resistance',
          'Meet-in-the-middle trades memory for time — can be defeated by triple encryption (3DES) at the cost of performance',
        ],
        realWorld: ['Sweet32 on 3DES in TLS', 'MD5 collision attacks', 'SHA-1 collision (SHAttered)'],
      },
    ],
  },
  {
    id: 12,
    title: 'Post-Quantum Cryptography',
    part: 4,
    partTitle: 'Advanced Topics',
    summary: 'Cryptographic algorithms designed to resist attacks from quantum computers — the NIST PQC standards and migration strategies.',
    concepts: [
      {
        id: '12-1',
        name: 'Quantum Threats to Cryptography',
        description: 'How quantum computers break current cryptographic assumptions.',
        keyPoints: [
          'Shor\'s algorithm: factors integers and computes discrete logs in polynomial time — breaks RSA, DH, ECDH, ECDSA, EdDSA',
          'Grover\'s algorithm: searches unsorted databases in O(√N) — halves effective key length of symmetric ciphers (AES-128 → 64-bit security)',
          'Symmetric crypto survives with doubled key sizes: AES-256 provides 128-bit post-quantum security',
          'Hash functions remain secure against quantum attacks — SHA-256 still provides ~128-bit quantum security',
        ],
        tradeoffs: [
          'Timeline uncertainty: estimates range from 10-30+ years for cryptographically relevant quantum computers',
          '"Harvest now, decrypt later": adversaries may store encrypted data today to decrypt when quantum computers are available',
        ],
        realWorld: ['NIST PQC competition', 'NSA CNSA 2.0 requirements', 'quantum key distribution research'],
      },
      {
        id: '12-2',
        name: 'Lattice-Based Cryptography',
        description: 'Post-quantum schemes based on the hardness of lattice problems (Learning With Errors).',
        keyPoints: [
          'ML-KEM (Kyber): NIST-standardized key encapsulation mechanism — lattice-based, compact keys and ciphertexts',
          'ML-DSA (Dilithium): NIST-standardized digital signature — based on Module Learning With Errors (MLWE)',
          'LWE problem: given (A, b = As + e), find s — the added noise e makes this hard even for quantum computers',
          'Lattice schemes offer good performance and relatively small key/ciphertext sizes compared to other PQC families',
        ],
        tradeoffs: [
          'Lattice keys/ciphertexts are larger than classical ECC (KEM: ~1.5 KB vs 32 bytes) but much smaller than code-based alternatives',
          'Lattice assumptions are relatively newer and less studied than factoring — some concern about future cryptanalytic advances',
        ],
        realWorld: ['FIPS 203 (ML-KEM)', 'FIPS 204 (ML-DSA)', 'Chrome hybrid PQ key exchange', 'Signal PQXDH'],
      },
      {
        id: '12-3',
        name: 'Hash-Based & Other PQC Signatures',
        description: 'Alternative post-quantum signature schemes based on well-understood hash function security.',
        keyPoints: [
          'SLH-DSA (SPHINCS+): NIST-standardized stateless hash-based signature — security relies only on hash function properties',
          'XMSS/LMS: stateful hash-based signatures — very small signatures but require careful state management (one-time keys)',
          'Code-based crypto: Classic McEliece — extremely large public keys (~1 MB) but decades of cryptanalysis and confidence',
          'Hybrid approaches: combine classical + PQC (e.g., X25519 + ML-KEM) for security against both classical and quantum adversaries',
        ],
        tradeoffs: [
          'Hash-based signatures are conservative (rely only on hash security) but have larger signatures than lattice-based schemes',
          'Hybrid key exchange increases bandwidth/computation but provides defense-in-depth during the transition period',
        ],
        realWorld: ['FIPS 205 (SLH-DSA)', 'XMSS in HSMs', 'Chrome X25519+ML-KEM hybrid', 'Apple iMessage PQ3'],
      },
    ],
  },
  {
    id: 13,
    title: 'Emerging Cryptography',
    part: 4,
    partTitle: 'Advanced Topics',
    summary: 'Cutting-edge cryptographic techniques — homomorphic encryption, zero-knowledge proof systems, and blockchain cryptography.',
    concepts: [
      {
        id: '13-1',
        name: 'Homomorphic Encryption',
        description: 'Encryption schemes that allow computation on ciphertext, producing encrypted results without decryption.',
        keyPoints: [
          'Partially homomorphic: RSA (multiplicative), Paillier (additive) — only one operation on ciphertexts',
          'Fully homomorphic encryption (FHE): arbitrary computation on encrypted data — BFV, BGV, CKKS schemes',
          'Bootstrapping: Gentry\'s technique to refresh noisy ciphertexts, enabling unlimited computation depth',
          'CKKS: approximate FHE scheme efficient for machine learning on encrypted data — supports floating-point operations',
        ],
        tradeoffs: [
          'FHE is 10,000-1,000,000x slower than plaintext computation — practical only for high-privacy, low-throughput tasks',
          'Ciphertext expansion: encrypted data is orders of magnitude larger than plaintext, increasing storage and bandwidth costs',
        ],
        realWorld: ['Microsoft SEAL', 'Google FHE compiler', 'encrypted ML inference', 'private database queries'],
      },
      {
        id: '13-2',
        name: 'ZK-SNARKs & ZK-STARKs',
        description: 'Succinct non-interactive zero-knowledge proof systems for general computation.',
        keyPoints: [
          'ZK-SNARK: Succinct Non-interactive ARgument of Knowledge — tiny proofs (~200 bytes), fast verification, but requires trusted setup',
          'ZK-STARK: Scalable Transparent ARgument of Knowledge — no trusted setup, post-quantum secure, but larger proofs (~100 KB)',
          'Both prove correct computation without revealing inputs — the verifier is convinced the computation was done correctly',
          'Arithmetic circuit model: computation expressed as polynomial constraints over a finite field — proof attests to satisfying assignment',
        ],
        tradeoffs: [
          'SNARKs are smaller and faster to verify but require a trusted setup ceremony (toxic waste problem)',
          'STARKs have no trusted setup and are quantum-resistant but produce much larger proofs',
        ],
        realWorld: ['Zcash (SNARKs)', 'StarkNet (STARKs)', 'zkEVM rollups', 'private identity verification'],
      },
      {
        id: '13-3',
        name: 'Blockchain Cryptography',
        description: 'Cryptographic building blocks specific to blockchain and decentralized systems.',
        keyPoints: [
          'Merkle trees: hash trees that enable efficient inclusion proofs — prove a transaction is in a block with O(log n) hashes',
          'Commitment schemes: commit to a value without revealing it, then reveal later — hash commitments, Pedersen commitments',
          'Threshold signatures & MPC: distributed key generation and signing for multi-party wallet control',
          'Verifiable Random Functions (VRFs): produce provably random outputs with a proof of correctness — used in consensus protocols',
        ],
        tradeoffs: [
          'Blockchain crypto prioritizes verifiability and decentralization over efficiency',
          'On-chain ZKP verification is expensive in gas/computation but enables powerful privacy and scaling solutions',
        ],
        realWorld: ['Bitcoin Merkle trees', 'Ethereum Patricia tries', 'Algorand VRF consensus', 'zkSync/Polygon zkEVM'],
      },
    ],
  },
];

export const chapters: Chapter[] = topics;

export function getChapter(id: number): Chapter | undefined {
  return chapters.find((ch) => ch.id === id);
}
