# Cryptography Explorer — Design Document

## App Configuration

| Field | Value |
|-------|-------|
| Package | `@cstools/cryptography` |
| Directory | `apps/cryptography` |
| Port | 5208 |
| Icon | `KeyRound` |
| Color | `#FFD700` |
| localStorage prefix | `cryptography-` |
| Tags | `['reference', 'quiz']` |

## Topic Structure (4 Parts, 13 Topics, 39 Concepts, 39 Quiz Questions)

### Part 1: Foundations (Topics 1-3)
1. **Cryptographic Primitives & Properties** — confidentiality, integrity, authenticity, randomness, Kerckhoffs's principle
2. **Symmetric Encryption** — block ciphers (AES/DES), modes of operation (CBC/CTR/GCM), stream ciphers (ChaCha20)
3. **Hash Functions & MACs** — SHA-2/SHA-3, collision/preimage resistance, HMAC, authenticated encryption (AEAD)

### Part 2: Asymmetric Cryptography (Topics 4-7)
4. **Number Theory & Math Foundations** — modular arithmetic, primes, discrete logarithm, groups/fields
5. **RSA & Diffie-Hellman** — RSA encryption/signing, DH key exchange, padding schemes (OAEP/PSS)
6. **Elliptic Curve Cryptography** — curve math, ECDH, ECDSA, EdDSA, curve selection (P-256, Curve25519)
7. **Key Management & PKI** — certificates, X.509, CAs, certificate chains, key rotation, HSMs

### Part 3: Protocols & Applications (Topics 8-10)
8. **TLS & Secure Channels** — TLS 1.3 handshake, cipher suites, forward secrecy, certificate verification
9. **Digital Signatures & Authentication** — signature schemes, multi-signatures, zero-knowledge proofs basics
10. **Cryptographic Protocols** — Signal Protocol (Double Ratchet), Secure MPC, secret sharing, commitment schemes

### Part 4: Advanced Topics (Topics 11-13)
11. **Cryptanalysis & Attacks** — side-channel attacks, padding oracle, birthday attacks, meet-in-the-middle
12. **Post-Quantum Cryptography** — lattice-based (Kyber/Dilithium), hash-based signatures, NIST PQC standards
13. **Emerging Cryptography** — homomorphic encryption, ZK-SNARKs/STARKs, threshold cryptography, blockchain crypto

## Hub Integration

- Add `KeyRound` to lucide-react imports
- Add tool entry after reverse-engineering
- Update overallStats: 35→36 tools, 415→428 topics, 1322→1361 questions, 1242→1281 concepts
