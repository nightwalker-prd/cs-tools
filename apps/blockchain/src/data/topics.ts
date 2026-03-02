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
  { id: 2, title: 'Platforms & Smart Contracts' },
  { id: 3, title: 'Applications' },
  { id: 4, title: 'Advanced Topics' },
];

export const topics: Topic[] = [
  // Part 1: Foundations
  {
    id: 1,
    title: 'Blockchain Fundamentals',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'The core concepts underpinning all blockchain systems: distributed ledgers, how blocks are chained together through cryptographic hashing, and the fundamental problem of reaching agreement among untrusted participants.',
    concepts: [
      {
        id: '1-1',
        name: 'Distributed Ledger Concepts',
        description:
          'A distributed ledger is a database replicated, shared, and synchronized across multiple nodes in a network with no single central administrator. Every participant maintains an identical copy of the ledger, and updates are propagated through a peer-to-peer protocol.',
        keyPoints: [
          'Unlike centralized databases controlled by a single entity, distributed ledgers replicate state across all participating nodes — no single point of failure or control exists',
          'Nodes communicate via gossip protocols or structured peer-to-peer networks to propagate new transactions and blocks, ensuring eventual consistency across the network',
          'Permissionless (public) ledgers allow anyone to join and validate, while permissioned (private) ledgers restrict participation to authorized entities — each model has different trust and performance characteristics',
          'Immutability is achieved by making it computationally or economically infeasible to alter historical records once they are confirmed by the network consensus',
          'The CAP theorem applies: blockchain systems generally prioritize consistency and partition tolerance, sacrificing availability during network splits (nodes may halt rather than fork)',
        ],
        tradeoffs: [
          'Full replication across all nodes provides censorship resistance and fault tolerance but severely limits throughput compared to centralized databases — Bitcoin processes ~7 TPS vs Visa at ~65,000 TPS',
          'Permissionless systems maximize decentralization and trustlessness but sacrifice performance and privacy; permissioned systems are faster but reintroduce trusted intermediaries',
          'Immutability protects against tampering but makes it impossible to correct errors or comply with data deletion regulations like GDPR without additional layers',
        ],
        realWorld: [
          'Bitcoin network: ~15,000 full nodes globally, each storing the complete 500+ GB blockchain',
          'Hyperledger Fabric used by Walmart for food supply chain tracking across hundreds of suppliers',
          'Central bank digital currencies (CBDCs) like China\'s digital yuan using permissioned distributed ledgers',
        ],
      },
      {
        id: '1-2',
        name: 'Blocks, Chains & Hashing',
        description:
          'A blockchain is a linked list of blocks where each block contains a set of transactions and a cryptographic hash of the previous block header. This chaining creates a tamper-evident structure where altering any historical block invalidates all subsequent blocks.',
        keyPoints: [
          'Each block header typically contains: previous block hash, Merkle root of transactions, timestamp, nonce (for PoW), and difficulty target — together these form the chain\'s integrity backbone',
          'The genesis block (block 0) is the only block without a reference to a previous block and is hardcoded into the protocol software',
          'Changing even a single bit in a historical block produces a completely different hash (avalanche effect), which breaks the chain — an attacker would need to recompute all subsequent blocks',
          'Block size and block time are fundamental protocol parameters: Bitcoin uses ~1 MB blocks every ~10 minutes, Ethereum uses variable-size blocks every ~12 seconds',
          'Block finality differs by protocol: probabilistic finality (Bitcoin — deeper blocks are exponentially harder to reverse) vs deterministic finality (Tendermint — blocks are final once committed)',
        ],
        tradeoffs: [
          'Larger blocks increase throughput but require more bandwidth and storage, raising the barrier to running full nodes and potentially reducing decentralization',
          'Shorter block times reduce confirmation latency but increase the rate of orphaned/uncle blocks, wasting computational resources and reducing effective security',
          'Probabilistic finality is simpler to implement but means transactions are never truly irreversible — merchants must choose how many confirmations to wait for',
        ],
        realWorld: [
          'Bitcoin\'s block size wars (2015-2017) led to the SegWit upgrade and the Bitcoin Cash fork over the 1 MB block size limit',
          'Ethereum\'s uncle block mechanism rewards miners who produce valid blocks that don\'t make it into the main chain, reducing wasted work',
          'Solana uses 400ms block times to achieve ~65,000 TPS but requires high-performance hardware to run validators',
        ],
      },
      {
        id: '1-3',
        name: 'Consensus Overview (BFT Problem)',
        description:
          'The Byzantine Fault Tolerance (BFT) problem asks how a distributed system can reach agreement on a single value when some participants may be faulty or malicious. Blockchain consensus mechanisms are practical solutions to this decades-old problem in distributed computing.',
        keyPoints: [
          'The Byzantine Generals Problem (Lamport, 1982) proves that reliable consensus requires at least 3f+1 nodes to tolerate f Byzantine (arbitrarily malicious) faults',
          'Nakamoto consensus (Bitcoin) solves BFT probabilistically using Proof of Work — the longest chain with the most accumulated work is treated as the canonical chain',
          'Classical BFT protocols (PBFT, Tendermint) achieve deterministic finality in fewer rounds but require known validator sets and scale poorly beyond ~100 validators',
          'The FLP impossibility result shows that no deterministic consensus protocol can guarantee both safety and liveness in an asynchronous network with even one faulty process',
          'Sybil resistance is orthogonal to consensus — PoW uses computational cost, PoS uses economic stake, and permissioned systems use identity verification to prevent one entity from masquerading as many',
        ],
        tradeoffs: [
          'Nakamoto consensus scales to thousands of anonymous validators but achieves only probabilistic finality and wastes enormous energy — classical BFT achieves instant finality but requires known, small validator sets',
          'Stronger consistency guarantees (deterministic finality) come at the cost of liveness — BFT systems halt if more than 1/3 of validators go offline, while Nakamoto consensus continues with any number of miners',
          'Hybrid approaches (Ethereum\'s Casper) attempt to combine PoS Sybil resistance with BFT finality gadgets, adding protocol complexity to gain both scalability and fast finality',
        ],
        realWorld: [
          'Bitcoin\'s 51% attack threshold: in practice, mining pools like Foundry USA and AntPool each control ~25-30% of hashrate, making collusion a theoretical concern',
          'Cosmos/Tendermint uses classical BFT with up to 175 validators, achieving 6-second finality',
          'The DAO hack (2016) demonstrated that even with consensus, social consensus can override the blockchain — Ethereum community chose to hard fork and reverse the theft',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Cryptographic Primitives',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'The cryptographic building blocks that make blockchains possible: hash functions for data integrity, public-key cryptography for identity and authorization, and Merkle trees for efficient verification of large datasets.',
    concepts: [
      {
        id: '2-1',
        name: 'Hash Functions (SHA-256, Keccak)',
        description:
          'Cryptographic hash functions are deterministic one-way functions that map arbitrary input data to a fixed-size output (digest). They are the backbone of blockchain integrity, used in block linking, mining, address generation, and Merkle trees.',
        keyPoints: [
          'SHA-256 (used by Bitcoin) produces a 256-bit (32-byte) digest — finding a collision (two different inputs with the same hash) requires ~2^128 operations, which is computationally infeasible',
          'Keccak-256 (used by Ethereum, standardized as SHA-3) was selected through NIST\'s public competition as a structurally different alternative to SHA-2, using a sponge construction rather than Merkle-Damgard',
          'The avalanche effect ensures that changing even one bit of input produces a completely different hash output — this is what makes blockchains tamper-evident',
          'Preimage resistance (given hash h, infeasible to find input m such that H(m) = h) is critical for Proof of Work mining — miners must brute-force to find a nonce that produces a hash below the difficulty target',
          'Bitcoin uses double SHA-256 (SHA-256 applied twice) for block hashing and transaction IDs as a defense against potential length-extension attacks on single SHA-256',
        ],
        tradeoffs: [
          'SHA-256 is battle-tested with decades of cryptanalysis but is vulnerable to theoretical quantum attacks (Grover\'s algorithm reduces security from 2^128 to 2^64 operations) — post-quantum hash functions are being researched',
          'Hardware-friendly hash functions (SHA-256) enable efficient ASIC mining, which increases security through hashrate but centralizes mining in entities that can afford specialized hardware',
          'Memory-hard hash functions (Ethash, used by pre-merge Ethereum) resist ASIC mining to preserve GPU-mining accessibility, but at the cost of lower total network hashrate and security per dollar spent',
        ],
        realWorld: [
          'Bitcoin mining: SHA-256 ASICs like Bitmain Antminer S19 XP compute ~140 TH/s (140 trillion hashes per second)',
          'Ethereum address generation: Keccak-256 hash of the public key, taking the last 20 bytes as the address',
          'IPFS content addressing: files are identified by their hash (CIDv0 uses SHA-256), ensuring content integrity without trusting the storage provider',
        ],
      },
      {
        id: '2-2',
        name: 'Public-Key Cryptography & Digital Signatures',
        description:
          'Public-key (asymmetric) cryptography enables blockchain users to prove ownership and authorize transactions without revealing their private key. Digital signatures provide authentication, integrity, and non-repudiation for every transaction on the network.',
        keyPoints: [
          'Elliptic Curve Digital Signature Algorithm (ECDSA) over the secp256k1 curve is used by both Bitcoin and Ethereum — a private key (256-bit random number) generates a public key via elliptic curve point multiplication, which is a one-way trapdoor function',
          'A digital signature proves three things: the sender holds the private key (authentication), the message has not been altered (integrity), and the sender cannot deny signing (non-repudiation)',
          'Blockchain addresses are typically derived from public keys through hashing — Bitcoin addresses use RIPEMD-160(SHA-256(pubkey)) with Base58Check encoding, adding a checksum to prevent typos',
          'Schnorr signatures (added to Bitcoin via Taproot/BIP340) are linearly aggregatable — multiple signatures can be combined into one, enabling more efficient and private multi-signature transactions',
          'EdDSA (Ed25519) is used by newer blockchains like Solana and Polkadot — it offers deterministic signatures (no random nonce needed), reducing implementation risks that caused real-world key leaks in ECDSA',
        ],
        tradeoffs: [
          'ECDSA is widely adopted and battle-tested but requires careful random nonce generation — reusing or predictably generating the nonce k leaks the private key entirely (as happened in the PlayStation 3 hack)',
          'Schnorr signatures enable signature aggregation and improved privacy but required a soft fork (Taproot) and are not backward-compatible with legacy Bitcoin transactions',
          'Hierarchical Deterministic (HD) wallets (BIP-32/44) derive unlimited key pairs from a single seed phrase, simplifying backup but creating a single point of failure if the seed is compromised',
        ],
        realWorld: [
          'MetaMask and hardware wallets (Ledger, Trezor) use BIP-39 mnemonic seed phrases (12 or 24 words) encoding 128-256 bits of entropy to generate deterministic key hierarchies',
          'The 2014 Android Bitcoin wallet vulnerability: flawed random number generation in Java\'s SecureRandom caused nonce reuse in ECDSA, allowing attackers to extract private keys',
          'Taproot activation on Bitcoin (November 2021) enabled Schnorr signatures, making multi-sig transactions indistinguishable from single-sig on-chain',
        ],
      },
      {
        id: '2-3',
        name: 'Merkle Trees & Proofs',
        description:
          'A Merkle tree is a binary tree of hashes where each leaf node is a hash of a data block and each internal node is a hash of its two children. The root hash (Merkle root) provides a single fixed-size commitment to all the data in the tree, enabling efficient and trustless verification.',
        keyPoints: [
          'A Merkle proof (or inclusion proof) demonstrates that a specific transaction is included in a block by providing only O(log n) hashes — a path from the leaf to the root — rather than requiring the verifier to download the entire block',
          'Bitcoin\'s block header contains the Merkle root of all transactions in the block — light clients (SPV nodes) can verify transaction inclusion without downloading full blocks, reducing bandwidth from megabytes to kilobytes',
          'Ethereum uses a Modified Merkle Patricia Trie (MPT) to store account state, transaction receipts, and storage — this allows proving not just inclusion but also the current state of any account or contract variable',
          'Merkle trees enable efficient data synchronization: two nodes can compare their Merkle roots and recursively descend to identify exactly which data blocks differ, as used in anti-entropy protocols',
          'Sparse Merkle Trees (SMTs) are used in rollups and state proofs — they represent a key-value map with 2^256 possible keys, where most leaves are empty, enabling efficient proofs of non-inclusion',
        ],
        tradeoffs: [
          'Merkle proofs are compact (O(log n) hashes) and enable trustless verification, but the verifier must trust the Merkle root — this root must come from a trusted source like a fully validating node or a consensus-secured block header',
          'Ethereum\'s MPT provides powerful state proofs but is storage-intensive and complex — the trie must be traversed for every state access, contributing to node sync times of hours or days',
          'Binary Merkle trees are simpler but less flexible than tries — they prove inclusion efficiently but cannot prove key-value mappings or non-inclusion without additional structure',
        ],
        realWorld: [
          'Bitcoin SPV wallets (e.g., Electrum in SPV mode) verify payments using Merkle proofs, requiring only ~80 bytes per block header instead of ~1 MB per full block',
          'Ethereum light clients use Merkle proofs against the state root to verify account balances and contract storage without running a full node',
          'Certificate Transparency (CT) logs use Merkle trees to create publicly auditable append-only logs of TLS certificates, allowing anyone to verify certificate inclusion',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Consensus Mechanisms',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Deep dive into the major consensus algorithms: how Proof of Work secures Bitcoin through computational cost, how Proof of Stake replaces energy expenditure with economic incentives, and how BFT-family protocols achieve deterministic finality.',
    concepts: [
      {
        id: '3-1',
        name: 'Proof of Work (Nakamoto Consensus)',
        description:
          'Proof of Work requires miners to expend computational resources to find a nonce that, combined with the block data, produces a hash below a difficulty target. The miner who finds a valid nonce first gets to propose the next block and earns the block reward plus transaction fees.',
        keyPoints: [
          'Mining difficulty adjusts automatically (every 2016 blocks in Bitcoin, ~2 weeks) to maintain a target block time of ~10 minutes regardless of total network hashrate — this self-regulating mechanism ensures predictable block production',
          'The longest chain rule (heaviest chain by cumulative work) determines the canonical chain — miners always build on the chain with the most accumulated proof of work, providing Sybil resistance without identity',
          'The block reward halves approximately every 4 years (210,000 blocks) in Bitcoin — starting at 50 BTC in 2009, it reached 3.125 BTC after the April 2024 halving, creating a fixed supply cap of 21 million BTC',
          'Selfish mining attacks: a miner with >33% hashrate can strategically withhold blocks to gain a disproportionate share of rewards — this lowers the effective 51% attack threshold',
          'Mining pools aggregate hashrate from many miners and distribute rewards proportionally (PPS, PPLNS) — while individual miners face high variance, pools create centralization concerns',
        ],
        tradeoffs: [
          'PoW provides the strongest Sybil resistance (attacking requires real-world energy expenditure) but consumes enormous electricity — Bitcoin mining uses ~150 TWh/year, comparable to a mid-sized country',
          'The difficulty adjustment ensures stable block times but creates mining death spirals in low-price environments — if price drops below mining cost, miners exit, difficulty lags, and block times temporarily slow',
          'ASIC mining maximizes hashrate and security but centralizes mining in regions with cheap electricity (historically China, now US/Kazakhstan) and among entities that can afford specialized hardware',
        ],
        realWorld: [
          'Bitcoin\'s total network hashrate exceeds 600 EH/s (2024), requiring entire power plants dedicated to mining operations',
          'The 2021 China mining ban caused ~50% of Bitcoin hashrate to go offline overnight, demonstrating geographic concentration risk — hashrate recovered within months as miners relocated',
          'Stratum V2 protocol aims to decentralize block template construction away from pool operators back to individual miners, addressing pool centralization concerns',
        ],
      },
      {
        id: '3-2',
        name: 'Proof of Stake & Validator Economics',
        description:
          'Proof of Stake replaces computational work with economic collateral: validators lock up cryptocurrency as stake, and the protocol selects block proposers based on stake weight. Misbehavior is punished by slashing (destroying) part of the staked funds.',
        keyPoints: [
          'Ethereum\'s Beacon Chain requires 32 ETH minimum to run a validator — validators are pseudo-randomly selected to propose blocks and attest to others\' proposals, with selection probability proportional to stake',
          'Slashing conditions deter misbehavior: double-signing (proposing two blocks at the same height) or surround voting (conflicting attestations) results in loss of staked ETH and forced ejection from the validator set',
          'The "nothing at stake" problem — in PoS, validators can cheaply vote on multiple forks simultaneously since there\'s no computational cost — is addressed through slashing conditions and finality gadgets like Casper FFG',
          'Liquid staking protocols (Lido, Rocket Pool) issue derivative tokens (stETH, rETH) representing staked ETH, allowing users to earn staking rewards while maintaining liquidity — but they concentrate stake in a few protocols',
          'Validator rewards come from block proposals, attestations, and sync committee duties — net APY for Ethereum validators is typically 3-5%, minus hardware costs and slashing risk',
        ],
        tradeoffs: [
          'PoS eliminates PoW\'s energy waste (~99.95% reduction for Ethereum post-Merge) but introduces "rich get richer" dynamics — validators with more stake earn more rewards, potentially concentrating control over time',
          'Minimum stake requirements (32 ETH ~ $60,000+) create barriers to entry that reduce validator decentralization — liquid staking lowers this barrier but introduces smart contract risk and protocol-level centralization',
          'Long unbonding periods (Ethereum\'s exit queue can take days to weeks) protect against certain attacks but reduce capital efficiency — validators cannot quickly exit during market downturns',
        ],
        realWorld: [
          'Ethereum\'s Merge (September 2022) transitioned from PoW to PoS, reducing energy consumption by ~99.95% while maintaining over 900,000 active validators',
          'Lido controls ~28% of all staked ETH, raising concerns about a single liquid staking protocol having outsized influence on Ethereum consensus',
          'Solana\'s delegated PoS allows token holders to delegate stake to validators without running node software — over 1,500 validators operate on the network',
        ],
      },
      {
        id: '3-3',
        name: 'BFT Variants (PBFT, Tendermint)',
        description:
          'Practical Byzantine Fault Tolerance (PBFT) and its modern derivatives provide deterministic finality in permissioned or bounded validator set environments. These protocols guarantee that once a block is committed, it cannot be reversed, unlike the probabilistic finality of Nakamoto consensus.',
        keyPoints: [
          'Classic PBFT (Castro & Liskov, 1999) operates in three phases — pre-prepare, prepare, commit — requiring O(n^2) message complexity, which limits scalability to roughly 20-100 validators',
          'Tendermint BFT (used by Cosmos) combines BFT consensus with a PoS Sybil resistance layer — it achieves single-block finality (typically 6 seconds) and tolerates up to 1/3 Byzantine validators',
          'HotStuff (used by Facebook\'s Diem/Libra) reduces PBFT\'s O(n^2) communication to O(n) using a leader-based linear protocol with threshold signatures, enabling larger validator sets',
          'BFT protocols provide safety (no two honest nodes finalize conflicting blocks) and liveness (the network eventually makes progress) under the assumption that fewer than 1/3 of validators are Byzantine',
          'View changes (leader rotation) handle liveness failures — if the current leader is faulty or slow, validators trigger a timeout and elect a new leader, ensuring the protocol does not stall indefinitely',
        ],
        tradeoffs: [
          'Deterministic finality eliminates the risk of chain reorganizations but requires a known, relatively small validator set — this limits decentralization compared to PoW where anyone can mine anonymously',
          'O(n^2) communication in classic PBFT provides strong consistency but becomes a bottleneck beyond ~100 validators — optimized variants (HotStuff, Narwhal/Bullshark) trade some simplicity for better scalability',
          'BFT protocols halt (lose liveness) if more than 1/3 of validators go offline — the network stops producing blocks entirely rather than risk inconsistency, which may be unacceptable for highly available systems',
        ],
        realWorld: [
          'Cosmos Hub uses Tendermint BFT with 175 validators, achieving ~6-second block finality and processing hundreds of transactions per second',
          'Hyperledger Fabric supports PBFT-based ordering services for enterprise blockchain deployments where all participants are known and authenticated',
          'Aptos and Sui use DiemBFT (a HotStuff derivative) to achieve sub-second finality with over 100 validators in their mainnet configurations',
        ],
      },
    ],
  },

  // Part 2: Platforms & Smart Contracts
  {
    id: 4,
    title: 'Bitcoin Architecture',
    part: 2,
    partTitle: 'Platforms & Smart Contracts',
    summary:
      'Bitcoin\'s unique transaction model, its limited scripting language, and the Layer 2 solutions that extend its capabilities: the UTXO model for tracking coin ownership, Bitcoin Script for programmable transactions, and the Lightning Network for instant payments.',
    concepts: [
      {
        id: '4-1',
        name: 'UTXO Model & Transactions',
        description:
          'Bitcoin uses the Unspent Transaction Output (UTXO) model where coins are tracked as discrete, indivisible outputs from previous transactions. Spending requires referencing specific UTXOs as inputs and creating new UTXOs as outputs, with any difference becoming the transaction fee.',
        keyPoints: [
          'A UTXO is a specific amount of bitcoin locked to a script (typically a public key hash) — it can only be spent in its entirety, so transactions create "change" outputs sent back to the sender',
          'Transaction validation is stateless: a node only needs the UTXO set (currently ~5 GB) to verify transactions, not the full blockchain history — this enables efficient pruning of old block data',
          'The UTXO model naturally supports parallel transaction processing since transactions spending different UTXOs are independent — unlike account-based models where sequential nonces create ordering dependencies',
          'CoinJoin and other privacy techniques leverage the UTXO model to mix inputs from multiple users in a single transaction, making it harder to trace the flow of funds',
          'Transaction fees are calculated as (sum of input values - sum of output values) and are denominated in satoshis per virtual byte (sat/vB) — users compete for limited block space during periods of high demand',
        ],
        tradeoffs: [
          'The UTXO model provides better privacy (each output has a distinct address) and parallelism but is more complex to program against than account-based models — wallets must manage UTXO selection and change outputs',
          'UTXO dust (outputs too small to economically spend because fees exceed their value) accumulates in the UTXO set, bloating node memory — consolidation transactions during low-fee periods are a common mitigation',
          'Stateless validation enables efficient pruning but means full transaction history is needed for initial blockchain synchronization — Bitcoin\'s IBD (Initial Block Download) takes hours to days',
        ],
        realWorld: [
          'Bitcoin Core\'s UTXO set is stored in a LevelDB database and occupies ~5 GB of RAM for fast validation — this is the critical performance bottleneck for full nodes',
          'CoinJoin implementations like Wasabi Wallet and JoinMarket use the UTXO model to create collaborative transactions that improve privacy',
          'Cardano adopted an extended UTXO model (eUTXO) that adds datum (arbitrary data) to UTXOs, enabling smart contract functionality while preserving UTXO parallelism',
        ],
      },
      {
        id: '4-2',
        name: 'Bitcoin Script & Limitations',
        description:
          'Bitcoin Script is a simple, stack-based, Turing-incomplete programming language used to define the conditions under which a UTXO can be spent. Its intentional limitations prioritize security and predictability over expressiveness.',
        keyPoints: [
          'Bitcoin Script is intentionally not Turing-complete — it has no loops, no recursion, and limited opcodes — preventing infinite execution and making transaction validation deterministic and bounded',
          'Standard script types: P2PKH (Pay-to-Public-Key-Hash), P2SH (Pay-to-Script-Hash), P2WPKH/P2WSH (SegWit variants), and P2TR (Taproot) — each offers different trade-offs in size, privacy, and flexibility',
          'Multisig scripts (OP_CHECKMULTISIG) enable m-of-n signing requirements — commonly used for corporate treasury management (2-of-3) and escrow services',
          'Taproot (BIP340/341/342) introduced Schnorr signatures and MAST (Merklized Alternative Script Trees), allowing complex spending conditions to appear as simple single-signature transactions on-chain',
          'OP_RETURN outputs allow embedding up to 80 bytes of arbitrary data in transactions — used for timestamping, anchor commitments for sidechains, and the Omni Layer protocol',
        ],
        tradeoffs: [
          'Turing-incompleteness prevents smart contract complexity but guarantees that script execution always terminates — this eliminates entire categories of bugs (infinite loops, gas estimation failures) that plague Turing-complete platforms',
          'Limited scripting capability means complex applications (DeFi, NFTs) cannot be built natively on Bitcoin — this pushes complexity to Layer 2 solutions like Lightning or sidechains like Liquid and Stacks',
          'Taproot\'s MAST trees enable complex scripts while revealing only the executed branch on-chain, improving privacy — but the additional complexity increases the attack surface and requires wallet software updates',
        ],
        realWorld: [
          'Lightning Network\'s Hash Time-Locked Contracts (HTLCs) are implemented using Bitcoin Script opcodes OP_HASH160, OP_EQUALVERIFY, and OP_CHECKLOCKTIMEVERIFY',
          'BitVM proposes Turing-complete computation on Bitcoin by using fraud proofs and bit commitments within Bitcoin Script\'s existing opcode set — no protocol changes required',
          'Ordinals and BRC-20 tokens exploit the SegWit witness discount and Taproot script paths to inscribe data (images, JSON) onto individual satoshis',
        ],
      },
      {
        id: '4-3',
        name: 'Lightning Network & Payment Channels',
        description:
          'The Lightning Network is a Layer 2 protocol built on top of Bitcoin that enables instant, low-fee payments through a network of bidirectional payment channels. Payments are routed across multiple channels using HTLCs, settling on the Bitcoin base layer only when channels are opened or closed.',
        keyPoints: [
          'A payment channel is created by a 2-of-2 multisig funding transaction on-chain — both parties can then exchange signed commitment transactions off-chain, updating balances without touching the blockchain',
          'Hash Time-Locked Contracts (HTLCs) enable multi-hop routing: Alice can pay Carol through Bob without trusting Bob — the hash preimage reveals atomically across the route, or the payment times out and reverts',
          'Channel capacity is limited by the funding transaction amount — a 0.1 BTC channel cannot route payments larger than 0.1 BTC, creating liquidity constraints for large payments',
          'Watchtowers monitor the blockchain for old (revoked) commitment transactions broadcast by a cheating counterparty — they submit penalty transactions to claim the cheater\'s entire channel balance',
          'Lightning invoices use BOLT 11 encoding, containing the payment hash, amount, expiry, and routing hints — the payer\'s node finds a route through the channel graph using pathfinding algorithms',
        ],
        tradeoffs: [
          'Lightning enables near-instant settlement (~1 second) and sub-satoshi fees but requires users to be online (or use watchtowers) to defend against fraud — offline users risk losing funds to revoked state broadcasts',
          'Payment routing requires sufficient liquidity along the entire path — large payments may fail if no route with adequate channel capacity exists, creating a UX challenge for high-value transfers',
          'Channel management (opening, closing, rebalancing) requires on-chain transactions and fees — for infrequent users, the overhead may not justify the speed improvement over on-chain transactions',
        ],
        realWorld: [
          'El Salvador adopted Bitcoin as legal tender in 2021, with the government\'s Chivo wallet using Lightning Network for everyday payments at stores and restaurants',
          'Strike and Cash App integrate Lightning for instant Bitcoin transfers, abstracting channel management from end users',
          'Lightning Network capacity exceeds 5,000 BTC across ~75,000 channels (2024), with major routing nodes operated by ACINQ, Lightning Labs, and Blockstream',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Ethereum & Smart Contracts',
    part: 2,
    partTitle: 'Platforms & Smart Contracts',
    summary:
      'Ethereum\'s programmable blockchain: the Ethereum Virtual Machine that executes arbitrary code, Solidity as the dominant smart contract language, and the token standards that enabled the explosion of DeFi, NFTs, and DAOs.',
    concepts: [
      {
        id: '5-1',
        name: 'EVM & Account Model',
        description:
          'The Ethereum Virtual Machine (EVM) is a quasi-Turing-complete, stack-based virtual machine that executes smart contract bytecode deterministically across all nodes. Ethereum uses an account-based model (not UTXO) where each account has a balance, nonce, code, and storage.',
        keyPoints: [
          'Two account types exist: Externally Owned Accounts (EOAs) controlled by private keys, and Contract Accounts controlled by their deployed code — only EOAs can initiate transactions, but contracts can call other contracts',
          'The EVM executes bytecode instruction-by-instruction using a 256-bit word size stack, with separate memory (volatile, per-call) and storage (persistent, on-chain) spaces — storage is the most expensive resource',
          'The gas mechanism bounds computation: each opcode has a fixed gas cost, and transactions specify a gas limit and gas price — if execution exceeds the gas limit, all state changes revert but the gas fee is still consumed',
          'Account nonces prevent transaction replay attacks — each EOA transaction must have a nonce exactly one higher than the previous transaction, enforcing strict ordering',
          'EVM bytecode is platform-agnostic — the same contract executes identically on every node regardless of hardware or operating system, ensuring deterministic state transitions',
        ],
        tradeoffs: [
          'The account model is simpler for developers (balances are just numbers, no UTXO management) but creates sequential dependencies — transactions from the same account must be ordered by nonce, limiting parallelism',
          'Gas metering prevents infinite loops and DoS attacks but makes cost estimation difficult — gas costs change with EIPs (e.g., EIP-2929 increased cold storage access cost 4x), breaking assumptions in deployed contracts',
          'Persistent storage enables powerful stateful applications but is extremely expensive (~20,000 gas to write a 32-byte slot, ~$2-50 depending on gas price) and contributes to state bloat on full nodes',
        ],
        realWorld: [
          'Ethereum\'s state size exceeds 150 GB and continues to grow — full node operators must maintain an ever-increasing database, with archive nodes requiring 13+ TB',
          'The Shanghai upgrade (EIP-4895) enabled staked ETH withdrawals by adding a new system-level transaction type, demonstrating how EVM upgrades can add functionality',
          'Alternative EVM-compatible chains (Polygon, BSC, Avalanche C-Chain) run the same EVM bytecode with different consensus layers, enabling easy contract portability',
        ],
      },
      {
        id: '5-2',
        name: 'Solidity Fundamentals & Gas',
        description:
          'Solidity is the dominant high-level, statically-typed programming language for writing Ethereum smart contracts. It compiles to EVM bytecode and introduces concepts like visibility modifiers, modifiers, events, and the critical gas optimization patterns that differentiate on-chain programming from traditional software development.',
        keyPoints: [
          'Solidity supports inheritance, interfaces, libraries, and abstract contracts — but unlike traditional OOP, deployed contract code is immutable, so bugs cannot be patched without deploying a new contract and migrating state',
          'Storage layout matters enormously for gas costs: variables packed into the same 32-byte slot save ~20,000 gas per write — struct ordering, uint sizes, and slot packing are critical optimization techniques',
          'The fallback and receive functions handle ETH transfers and unknown function calls — improperly implemented fallback functions are a common source of vulnerabilities (reentrancy, unexpected behavior)',
          'Events (emit) write data to transaction logs rather than contract storage — logs are ~8x cheaper than storage and are indexed for efficient off-chain querying via services like The Graph',
          'Gas optimization patterns: using calldata instead of memory for read-only function parameters, caching storage reads in local variables, using unchecked blocks for arithmetic known not to overflow (saves ~200 gas per operation)',
        ],
        tradeoffs: [
          'Solidity\'s high-level abstractions make smart contract development accessible but hide critical low-level details — developers may not realize that a simple mapping lookup costs 2,100 gas (cold SLOAD) or that string operations are expensive',
          'Immutable deployment means contracts must be correct at launch — the "move fast and break things" approach of web development is catastrophic when bugs can drain millions of dollars in minutes',
          'Gas optimization often trades readability for efficiency — highly optimized Solidity code with bitwise operations, assembly blocks, and packed structs is harder to audit and maintain',
        ],
        realWorld: [
          'OpenZeppelin Contracts is the de facto standard library for secure Solidity development — used by the majority of production smart contracts for ERC implementations, access control, and security utilities',
          'Vyper (Python-like smart contract language) was created as a safer alternative to Solidity with no inheritance, no modifiers, and bounds-checked loops — used by Curve Finance',
          'The Huff language allows writing EVM bytecode directly with macro support, achieving maximum gas efficiency — used for gas-optimized core DeFi contracts',
        ],
      },
      {
        id: '5-3',
        name: 'ERC Standards (ERC-20, ERC-721)',
        description:
          'Ethereum Request for Comments (ERC) standards define common interfaces for smart contracts, enabling interoperability across the ecosystem. ERC-20 standardized fungible tokens, and ERC-721 standardized non-fungible tokens, together forming the foundation of DeFi and the NFT ecosystem.',
        keyPoints: [
          'ERC-20 defines six functions (totalSupply, balanceOf, transfer, transferFrom, approve, allowance) and two events (Transfer, Approval) — any contract implementing this interface is compatible with all ERC-20-aware wallets, exchanges, and DeFi protocols',
          'The approve/transferFrom pattern enables delegated transfers but creates the well-known "approve front-running" vulnerability — ERC-2612 (permit) adds gasless approvals via EIP-712 typed signatures as a safer alternative',
          'ERC-721 adds unique token IDs and metadata URIs to represent non-fungible assets — each token has a distinct ID and owner, with optional metadata pointing to JSON describing the asset\'s properties and image',
          'ERC-1155 (Multi-Token Standard) combines fungible and non-fungible tokens in a single contract — batch transfer operations save significant gas compared to individual ERC-20 or ERC-721 transfers',
          'ERC-4626 (Tokenized Vault Standard) standardizes yield-bearing vaults — deposit assets, receive shares proportional to the vault\'s total value, enabling composable yield strategies across DeFi protocols',
        ],
        tradeoffs: [
          'Standardized interfaces enable ecosystem composability (any ERC-20 works with Uniswap) but lock in design decisions — improvements require new standards and migration, as seen with the ERC-20 approve vulnerability',
          'On-chain metadata (fully on-chain SVG/JSON) ensures permanence but is extremely expensive — most NFTs store metadata on IPFS or centralized servers, creating dependency on external storage that may disappear',
          'ERC-1155 is more gas-efficient for batch operations but more complex to implement and index — many marketplaces and wallets still have better ERC-721 support',
        ],
        realWorld: [
          'USDT (Tether), USDC, and DAI are ERC-20 tokens with combined market cap exceeding $130 billion — they are the backbone of DeFi liquidity',
          'CryptoPunks (one of the first NFT collections) predates ERC-721 and uses a custom contract — later projects like Bored Ape Yacht Club use standard ERC-721',
          'Aave V3 uses ERC-4626 compatible aTokens to represent deposited assets, enabling seamless integration with other yield aggregators and DeFi protocols',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Smart Contract Security',
    part: 2,
    partTitle: 'Platforms & Smart Contracts',
    summary:
      'The unique security challenges of smart contracts: common vulnerability patterns that have caused billions in losses, the auditing and formal verification techniques used to prevent exploits, and the upgrade patterns that balance immutability with the need for bug fixes.',
    concepts: [
      {
        id: '6-1',
        name: 'Common Vulnerabilities (Reentrancy, Overflow)',
        description:
          'Smart contract vulnerabilities arise from the unique execution environment of the EVM: external calls can re-enter the calling contract, integer arithmetic can overflow or underflow, and the order of operations matters critically when multiple contracts interact.',
        keyPoints: [
          'Reentrancy: when a contract sends ETH via call() before updating its state, the recipient\'s fallback function can recursively call back into the vulnerable function — the checks-effects-interactions pattern prevents this by updating state before making external calls',
          'Integer overflow/underflow: in Solidity <0.8.0, arithmetic silently wraps around (type(uint256).max + 1 = 0) — Solidity 0.8+ adds automatic overflow checks, but unchecked blocks can reintroduce the vulnerability for gas optimization',
          'Flash loan attacks exploit the composability of DeFi — an attacker borrows millions in a single transaction to manipulate oracle prices, drain liquidity pools, or exploit governance voting, then repays the loan atomically',
          'Access control failures: missing or incorrect onlyOwner/role-based modifiers allow unauthorized users to call privileged functions — this includes uninitialized proxy implementation contracts that anyone can "initialize" and take ownership of',
          'Front-running (MEV): validators and searchers observe pending transactions in the mempool and insert their own transactions before or after to extract value — sandwich attacks on DEX trades are the most common form',
        ],
        tradeoffs: [
          'The checks-effects-interactions pattern prevents reentrancy but requires disciplined coding practices that are easy to overlook in complex contracts — reentrancy guards (mutexes) add gas overhead but provide more robust protection',
          'Automatic overflow checking in Solidity 0.8+ prevents arithmetic bugs by default but adds ~100 gas per operation — performance-critical code may use unchecked blocks, re-introducing risk if developers are not careful',
          'Flashbots and MEV-aware transaction submission reduce front-running but create a parallel "dark pool" for transaction ordering, raising concerns about validator centralization and censorship',
        ],
        realWorld: [
          'The DAO hack (2016): reentrancy exploit drained 3.6 million ETH ($60M) — led to the Ethereum/Ethereum Classic hard fork to reverse the theft',
          'Wormhole bridge hack (2022): $320M stolen due to a signature verification bypass in the Solana-side guardian contract — the attacker spoofed guardian approvals',
          'Euler Finance exploit (2023): $197M stolen via a flash loan attack exploiting a vulnerability in the donation function — funds were later returned after negotiation',
        ],
      },
      {
        id: '6-2',
        name: 'Auditing & Formal Verification',
        description:
          'Smart contract auditing combines manual code review by security experts with automated analysis tools to identify vulnerabilities before deployment. Formal verification goes further by mathematically proving that contract behavior matches its specification.',
        keyPoints: [
          'Manual audits by firms like Trail of Bits, OpenZeppelin, and Consensys Diligence typically involve 2-4 auditors over 2-6 weeks, reviewing every line of code for known vulnerability patterns, business logic errors, and economic attack vectors',
          'Static analysis tools (Slither, Mythril, Securify) automatically detect common vulnerability patterns without executing the code — they analyze the control flow graph and data flow to flag potential reentrancy, unchecked calls, and access control issues',
          'Formal verification (Certora, Halmos, K Framework) proves mathematical properties about contract behavior — invariants like "total supply equals sum of all balances" or "only the owner can withdraw" are verified exhaustively across all possible states',
          'Fuzz testing (Echidna, Foundry\'s forge fuzz) generates random inputs to stress-test contract functions, discovering edge cases that manual review and static analysis miss — property-based fuzzing tests invariants rather than specific scenarios',
          'Bug bounties (Immunefi, HackerOne) incentivize white-hat hackers to find vulnerabilities post-deployment — critical DeFi protocols often offer $1-10M bounties for critical vulnerabilities',
        ],
        tradeoffs: [
          'Manual audits are thorough and catch business logic errors but are expensive ($50K-$500K+), time-consuming, and dependent on auditor expertise — audited contracts still get hacked if auditors miss novel attack vectors',
          'Formal verification provides mathematical guarantees but only proves the properties you specify — if the specification is incomplete or wrong, verified contracts can still have exploitable behaviors',
          'Automated tools produce false positives that require manual triage and may miss application-specific vulnerabilities — they complement but cannot replace human auditors for complex protocol logic',
        ],
        realWorld: [
          'Uniswap V3\'s core contracts were formally verified by Trail of Bits using the Certora prover, verifying 30+ invariants about pool behavior and fee accumulation',
          'Immunefi has facilitated over $80M in bug bounty payouts, including a $10M bounty for a critical vulnerability in Wormhole (the largest bounty paid in crypto)',
          'Runtime Verification used the K Framework to formally verify the Ethereum 2.0 deposit contract, mathematically proving correctness before billions of dollars were staked through it',
        ],
      },
      {
        id: '6-3',
        name: 'Upgrade Patterns & Proxies',
        description:
          'Since deployed smart contracts are immutable, upgrade patterns use proxy contracts that delegate calls to replaceable implementation contracts. This allows fixing bugs and adding features without changing the contract address or migrating user state.',
        keyPoints: [
          'The Transparent Proxy pattern separates admin and user calls — the proxy admin can upgrade the implementation address, while regular users\' calls are delegated to the current implementation via delegatecall',
          'UUPS (Universal Upgradeable Proxy Standard, EIP-1822) moves the upgrade logic into the implementation contract itself — this saves gas on every call (no admin check in the proxy) but means a buggy implementation can permanently brick the proxy',
          'The Diamond pattern (EIP-2535) enables modular upgrades — a single proxy delegates to multiple "facet" contracts based on function selectors, allowing selective upgrade of specific features without redeploying the entire logic',
          'Storage collision is the critical risk in proxy patterns: the proxy and implementation share the same storage layout, so any mismatch (adding, removing, or reordering state variables) corrupts data — OpenZeppelin\'s storage gap pattern reserves empty slots for future use',
          'Beacon proxies (EIP-1967) point multiple proxies to a single beacon contract that holds the implementation address — upgrading the beacon simultaneously upgrades all proxies, useful for factory patterns with many identical instances',
        ],
        tradeoffs: [
          'Upgradeable contracts enable bug fixes and feature additions but undermine the "code is law" promise — users must trust that the upgrade admin will not introduce malicious changes or be compromised',
          'Timelocks and multi-sig governance on upgrade functions reduce admin key risk but add latency to critical security patches — a 48-hour timelock means a discovered vulnerability cannot be fixed for 2 days',
          'The Diamond pattern offers maximum flexibility but significantly increases complexity and attack surface — each facet must be carefully audited for storage collisions and function selector conflicts',
        ],
        realWorld: [
          'OpenZeppelin\'s TransparentUpgradeableProxy is used by hundreds of production DeFi protocols including Aave, Compound, and many others for safe upgradability',
          'The Wormhole hack was partially attributable to an uninitialized UUPS implementation contract — the attacker called initialize() on the implementation directly, bypassing the proxy\'s access controls',
          'Compound Finance uses a timelock + governance system: any upgrade must pass a community vote and then wait 48 hours before execution, allowing users to exit if they disagree with the change',
        ],
      },
    ],
  },

  // Part 3: Applications
  {
    id: 7,
    title: 'Decentralized Finance (DeFi)',
    part: 3,
    partTitle: 'Applications',
    summary:
      'The core building blocks of decentralized finance: automated market makers that replace order books with mathematical formulas, lending protocols that enable permissionless borrowing and lending, and yield farming strategies that compose these primitives.',
    concepts: [
      {
        id: '7-1',
        name: 'Automated Market Makers (Uniswap)',
        description:
          'Automated Market Makers (AMMs) replace traditional order books with liquidity pools governed by mathematical pricing functions. Liquidity providers deposit token pairs into pools and earn fees from every trade, while the constant product formula (x * y = k) determines prices algorithmically.',
        keyPoints: [
          'Uniswap V2\'s constant product formula (x * y = k) ensures that as one token is bought, its price increases and the other decreases — this provides infinite liquidity at increasingly unfavorable prices, meaning large trades suffer significant slippage',
          'Liquidity providers deposit equal value of two tokens and receive LP tokens representing their share of the pool — they earn 0.3% (Uniswap V2) of every trade but face impermanent loss when token prices diverge',
          'Uniswap V3 introduced concentrated liquidity — LPs can specify price ranges for their capital, dramatically increasing capital efficiency (up to 4000x) but requiring active management to stay in range',
          'Impermanent loss occurs when the price ratio of pooled tokens changes from the deposit ratio — a 2x price change in one token causes ~5.7% impermanent loss vs simply holding, and extreme moves can exceed fee earnings',
          'Constant sum (x + y = k) AMMs provide zero slippage but are depleted when prices move — Curve Finance uses the StableSwap invariant (a hybrid of constant product and constant sum) optimized for same-peg assets with minimal slippage',
        ],
        tradeoffs: [
          'AMMs provide permissionless, always-on liquidity but are less capital-efficient than order books for most trading pairs — concentrated liquidity (V3) closes the gap but requires active LP management',
          'Impermanent loss is the hidden cost of providing liquidity — in volatile markets, LPs often earn less than they would by simply holding their tokens, making LP profitability dependent on high trading volume',
          'Simple pricing formulas (constant product) are easy to reason about and audit but are susceptible to oracle manipulation — flash loan attacks can temporarily move AMM prices to exploit protocols using them as price oracles',
        ],
        realWorld: [
          'Uniswap processes $1-5B in daily trading volume with no order book, no market makers, and no KYC — anyone can list a token by creating a pool',
          'Curve Finance dominates stablecoin swaps with over $2B TVL, using the StableSwap invariant to enable million-dollar trades with <0.1% slippage',
          'Balancer extends the AMM concept to weighted pools with up to 8 tokens in arbitrary ratios, enabling index fund-like portfolio management on-chain',
        ],
      },
      {
        id: '7-2',
        name: 'Lending Protocols (Aave, Compound)',
        description:
          'Decentralized lending protocols enable permissionless borrowing and lending of crypto assets through over-collateralized pools. Lenders deposit assets to earn variable interest rates, while borrowers lock collateral worth more than their loan to borrow against it.',
        keyPoints: [
          'Interest rates are determined algorithmically based on utilization rate (borrowed / total supplied) — as utilization increases, borrow rates rise to incentivize deposits and discourage excessive borrowing, following a kinked curve model',
          'Over-collateralization (typically 150-200% collateral-to-loan ratio) protects lenders — if collateral value drops below the liquidation threshold, liquidators repay part of the debt and receive discounted collateral as profit',
          'Flash loans (invented by Aave) allow borrowing any amount with zero collateral, provided the loan is repaid within the same transaction — this enables atomic arbitrage, collateral swaps, and self-liquidation',
          'Compound\'s cToken model: depositors receive cTokens (cUSDC, cETH) representing their deposit plus accrued interest — the exchange rate monotonically increases, so holding cTokens automatically earns yield',
          'Aave V3 introduced isolation mode, efficiency mode (eMode), and cross-chain portals — isolation mode limits risk exposure for new assets, while eMode allows higher LTV for correlated assets (e.g., stETH/ETH)',
        ],
        tradeoffs: [
          'Over-collateralization ensures protocol solvency but is capital-inefficient — borrowers must lock up more value than they receive, limiting DeFi lending to leverage trading, tax optimization, and liquidity without selling',
          'Algorithmic interest rates respond to market conditions automatically but can spike dramatically during high demand — borrow rates exceeding 100% APY have occurred during volatile periods',
          'Liquidation mechanisms protect lenders but can cascade during market crashes — rapid price declines can trigger mass liquidations that further depress prices, creating a downward spiral (as seen in the May 2022 crash)',
        ],
        realWorld: [
          'Aave V3 holds over $10B in total value locked across multiple chains, making it one of the largest financial applications ever built on a blockchain',
          'MakerDAO\'s DAI stablecoin is generated by depositing collateral (ETH, USDC, real-world assets) into vaults — overcollateralization maintains the $1 peg',
          'The Terra/Luna collapse (May 2022) triggered cascading liquidations across DeFi lending protocols, with over $20B in value destroyed in days',
        ],
      },
      {
        id: '7-3',
        name: 'Yield Farming & Liquidity Mining',
        description:
          'Yield farming is the practice of moving crypto assets between DeFi protocols to maximize returns, often through liquidity mining programs where protocols distribute governance tokens to users who provide liquidity. This creates complex, multi-layered yield strategies.',
        keyPoints: [
          'Liquidity mining programs distribute protocol tokens (e.g., COMP, UNI, AAVE) to users who deposit assets — this bootstraps liquidity but creates sell pressure as farmers dump reward tokens for profit',
          'Yield aggregators (Yearn Finance, Beefy) automate yield farming strategies: they auto-compound rewards, rebalance between protocols, and optimize gas costs — users deposit into vaults and receive yield-bearing tokens',
          'Yield farming APYs are highly variable and often misleading — advertised rates assume constant token prices, but reward tokens frequently depreciate 80-99% as farmers sell, creating a "farm and dump" cycle',
          'Composability enables yield stacking: deposit ETH to get stETH, deposit stETH in Aave to borrow USDC, deposit USDC in Curve to earn CRV — each layer adds yield but also compounds smart contract risk',
          'Convex Finance and the "Curve Wars" demonstrated how governance token economics can create meta-strategies — protocols compete to control CRV emissions by accumulating vote-locked CRV (veCRV)',
        ],
        tradeoffs: [
          'Liquidity mining successfully bootstraps protocol adoption but is unsustainable long-term — once token emissions decrease or stop, mercenary capital moves to higher-yielding opportunities elsewhere',
          'Yield stacking multiplies returns through leverage and composability but creates cascading liquidation risk — failure of any underlying protocol can unwind the entire stack',
          'Auto-compounding vaults save gas and optimize returns but introduce smart contract risk (the vault contract itself can be exploited) and create tax complexity in jurisdictions that treat each compounding event as taxable',
        ],
        realWorld: [
          'DeFi Summer (2020): Compound\'s COMP token distribution ignited a yield farming frenzy, growing DeFi TVL from $1B to $15B in three months',
          'Yearn Finance\'s vaults automatically execute complex multi-protocol strategies, managing over $1B at peak — strategies are written by experienced DeFi developers and audited before deployment',
          'The Curve Wars: Convex Finance accumulated over 50% of all veCRV, giving it dominant influence over Curve\'s gauge weight votes and CRV emission distribution',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'NFTs & Digital Ownership',
    part: 3,
    partTitle: 'Applications',
    summary:
      'Non-fungible tokens and the infrastructure around digital ownership: the token standards that define unique assets, the marketplace economics of trading and royalties, and the storage challenges of ensuring NFT content persists beyond the blockchain.',
    concepts: [
      {
        id: '8-1',
        name: 'Token Standards & Metadata',
        description:
          'NFT token standards define the on-chain interface for creating, transferring, and querying unique digital assets. The metadata standard specifies how off-chain information (name, description, image, attributes) is structured and linked to the on-chain token.',
        keyPoints: [
          'ERC-721 assigns a unique uint256 tokenId to each NFT — the tokenURI(tokenId) function returns a URL pointing to a JSON metadata file conforming to the OpenSea metadata standard (name, description, image, attributes array)',
          'ERC-1155 supports both fungible and non-fungible tokens in a single contract — a game could use one contract for unique weapons (NFTs) and stackable currencies (fungibles), with batch transfer saving ~50% gas',
          'On-chain metadata stores the entire JSON and SVG directly in contract storage or bytecode — projects like Loot, Nouns, and Art Blocks generate art algorithmically, making the NFT fully self-contained on the blockchain',
          'Dynamic NFTs have metadata that changes based on external conditions or on-chain events — game items that level up, sports NFTs that update with scores, or generative art that evolves based on holder behavior',
          'Soulbound Tokens (SBTs, EIP-5192) are non-transferable NFTs representing credentials, reputation, or identity — once minted to an address, they cannot be transferred, creating persistent on-chain identity markers',
        ],
        tradeoffs: [
          'ERC-721 is simple and universally supported but inefficient for large collections — minting 10,000 NFTs requires 10,000 separate transactions (unless using batch-optimized implementations like ERC-721A)',
          'On-chain metadata guarantees permanence but is prohibitively expensive for large files — storing a 100KB image on-chain costs thousands of dollars in gas, limiting fully on-chain NFTs to generative/text-based art',
          'Dynamic NFTs enable richer experiences but require trusted oracles or complex on-chain logic to update metadata — the mutability also makes it harder for collectors to verify the "final" state of an NFT',
        ],
        realWorld: [
          'Azuki\'s ERC-721A implementation optimized batch minting to cost nearly the same gas as a single mint, saving millions in gas fees during popular mint events',
          'Chainlink VRF (Verifiable Random Function) is used by NFT projects to generate provably random traits during minting, preventing manipulation of rarity',
          'ENS (Ethereum Name Service) domains are ERC-721 NFTs — vitalik.eth is a token owned by an Ethereum address, enabling human-readable names for wallets and dApps',
        ],
      },
      {
        id: '8-2',
        name: 'NFT Marketplaces & Royalties',
        description:
          'NFT marketplaces facilitate the listing, discovery, and trading of non-fungible tokens, handling the complex mechanics of auction systems, royalty enforcement, and order matching. The royalty debate centers on whether creators should receive a percentage of every secondary sale.',
        keyPoints: [
          'OpenSea pioneered the off-chain order book model: sellers sign an order (Seaport protocol), and buyers submit a transaction that atomically transfers the NFT and payment — this avoids gas costs for listing and cancellation',
          'EIP-2981 (NFT Royalty Standard) provides a standardized way for contracts to signal a royalty percentage and recipient — but it is purely informational, and marketplaces are not required to honor it',
          'Blur\'s zero-fee, optional-royalty marketplace disrupted OpenSea\'s model — by not enforcing royalties and rewarding traders with BLUR tokens, it captured >70% market share by volume in 2023',
          'Creator royalties (typically 2.5-10% of sale price) were a key value proposition of NFTs — but the shift to optional royalties forced creators to explore on-chain enforcement mechanisms like blacklisting non-royalty marketplaces',
          'Auction mechanisms: English auctions (ascending bid), Dutch auctions (descending price), and sealed-bid auctions each have different properties — Dutch auctions are popular for NFT mints to discover fair market price',
        ],
        tradeoffs: [
          'Enforcing royalties on-chain (e.g., OpenSea\'s Operator Filter Registry) maintains creator revenue but restricts composability — NFTs that blacklist certain contracts cannot be used in all DeFi protocols',
          'Zero-fee marketplaces increase trading volume and price discovery but eliminate the revenue model for both the platform and creators — the race to zero fees may be unsustainable',
          'Off-chain order books reduce gas costs but introduce centralization — if the marketplace goes down, pending orders become inaccessible, and the marketplace can censor listings',
        ],
        realWorld: [
          'OpenSea\'s Seaport protocol is open-source and permissionless — anyone can build a marketplace using Seaport orders, reducing dependence on any single platform',
          'Yuga Labs (Bored Ape Yacht Club) publicly supported enforcing creator royalties and threatened to blacklist marketplaces that made them optional',
          'Magic Eden expanded from Solana to Ethereum and Bitcoin (Ordinals), becoming a cross-chain marketplace serving multiple NFT ecosystems',
        ],
      },
      {
        id: '8-3',
        name: 'On-Chain vs Off-Chain Storage (IPFS)',
        description:
          'Most NFTs store their media and metadata off-chain due to the prohibitive cost of on-chain storage. IPFS (InterPlanetary File System) provides content-addressed, decentralized storage as a middle ground between fully on-chain permanence and centralized server dependency.',
        keyPoints: [
          'IPFS uses content-addressing: files are identified by their cryptographic hash (CID), ensuring that the content at a given address cannot be changed — if the content changes, the CID changes, breaking any references to the old content',
          'IPFS pinning services (Pinata, Infura, nft.storage) ensure files remain available by hosting them on dedicated nodes — without pinning, IPFS content can be garbage-collected and become unavailable',
          'Arweave provides permanent storage by paying a one-time fee calculated to cover 200+ years of storage costs — data is stored on a blockweave (blockchain-like structure) and replicated across miners incentivized to store it',
          'Centralized storage (AWS S3, traditional web servers) is cheapest and fastest but creates a single point of failure — if the server goes down or the company shuts down, NFT metadata and images become inaccessible',
          'Filecoin extends IPFS with economic incentives: storage providers are paid to store data and must regularly prove they still hold it (Proof of Spacetime) — this creates a decentralized storage marketplace',
        ],
        tradeoffs: [
          'IPFS provides content integrity (CIDs are immutable) but not availability guarantees — content must be actively pinned by at least one node, and pinning services charge ongoing fees similar to traditional hosting',
          'Arweave offers true permanence with a single upfront payment but is more expensive than IPFS pinning and requires trusting the economic model\'s 200-year cost projections',
          'Fully on-chain storage is the most censorship-resistant but limits NFT media to small files (typically <10KB) — this restricts on-chain NFTs to generative art, text, and highly compressed formats',
        ],
        realWorld: [
          'The "rug pull" phenomenon includes projects where NFT metadata pointed to centralized servers that later went offline, leaving holders with tokens pointing to dead URLs',
          'nft.storage (backed by Protocol Labs) offered free IPFS and Filecoin pinning for NFT metadata, helping preserve the long-term accessibility of NFT collections',
          'Art Blocks stores generative art scripts fully on-chain — the JavaScript code that generates each piece is in the contract, and the art can be regenerated from on-chain data alone',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'DAOs & Governance',
    part: 3,
    partTitle: 'Applications',
    summary:
      'Decentralized Autonomous Organizations bring traditional organizational governance on-chain: token-weighted voting systems, delegation mechanisms for representative democracy, and treasury management through smart contracts rather than corporate officers.',
    concepts: [
      {
        id: '9-1',
        name: 'On-Chain Governance Models',
        description:
          'On-chain governance encodes decision-making processes in smart contracts: proposals are submitted, voted on by token holders, and executed automatically if they pass the required thresholds. This creates transparent, censorship-resistant organizational management.',
        keyPoints: [
          'Governor contracts (OpenZeppelin Governor, Compound Governor) implement a standard lifecycle: proposal creation, voting period, timelock delay, and execution — each phase has configurable parameters (quorum, voting delay, execution delay)',
          'Token-weighted voting (1 token = 1 vote) is the most common model but creates plutocratic governance — wealthy token holders can unilaterally pass proposals, and most token holders do not actively vote',
          'Quorum requirements (minimum percentage of total supply that must vote) prevent low-participation attacks — but setting quorum too high can prevent any proposal from passing if voter apathy is widespread',
          'Off-chain voting (Snapshot) uses signed messages rather than on-chain transactions — this eliminates gas costs for voters but requires trusted execution of the vote result, typically by a multi-sig committee',
          'Optimistic governance: proposals are assumed to pass unless vetoed within a challenge period — this reduces voter fatigue for routine decisions while preserving the ability to block harmful proposals',
        ],
        tradeoffs: [
          'Fully on-chain governance ensures trustless execution but has high gas costs per vote (~50,000-100,000 gas) and is susceptible to last-block vote manipulation and flash loan governance attacks',
          'Off-chain voting (Snapshot) is free and accessible but introduces trust assumptions — the multi-sig executing the result could theoretically ignore the vote outcome',
          'Token-weighted voting aligns governance with economic stake but disadvantages smaller holders — quadratic voting (cost proportional to votes^2) and conviction voting (strength grows with time) are proposed alternatives',
        ],
        realWorld: [
          'MakerDAO governance controls the DAI stablecoin parameters: stability fees, collateral types, and debt ceilings are all determined by MKR token holders voting on-chain',
          'Uniswap governance requires 40M UNI (~$200M) to reach quorum, meaning proposals need support from large token holders — many proposals fail to reach quorum despite community support',
          'Nouns DAO auctions one NFT per day and directs 100% of proceeds to a community treasury governed by NFT holders — it has funded public goods, art projects, and charitable donations',
        ],
      },
      {
        id: '9-2',
        name: 'Voting Mechanisms & Delegation',
        description:
          'Beyond simple token-weighted voting, DAOs employ various mechanisms to improve participation, representation, and fairness. Delegation enables representative democracy, while novel voting systems attempt to reduce plutocratic control.',
        keyPoints: [
          'Vote delegation allows token holders to assign their voting power to a representative (delegate) who votes on their behalf — delegates can be changed at any time and often have public voting rationales and track records',
          'Quadratic voting prices votes quadratically: 1 vote costs 1 token, but 2 votes cost 4 tokens, 3 votes cost 9, etc. — this gives smaller holders proportionally more influence, but is vulnerable to Sybil attacks without identity',
          'Conviction voting accumulates voting power over time — the longer tokens are staked on a proposal, the stronger the vote becomes, preventing last-minute swing votes and encouraging long-term commitment',
          'Rage quit mechanisms (pioneered by Moloch DAO) allow dissenting members to exit the DAO with their proportional share of the treasury before a passed proposal is executed — this protects minorities from majority tyranny',
          'Vote escrowing (veToken model, pioneered by Curve\'s veCRV) requires locking tokens for a period to gain voting power — longer locks give more votes, aligning voter incentives with long-term protocol health',
        ],
        tradeoffs: [
          'Delegation increases participation by proxy but concentrates power in a few active delegates — if delegates collude or become inactive, governance quality degrades without most token holders noticing',
          'Quadratic voting reduces plutocracy but requires Sybil resistance (proof of unique identity) — without it, a whale can split tokens across many wallets and vote quadratically at linear cost',
          'Vote escrowing aligns long-term incentives but reduces token liquidity — users who lock for maximum voting power cannot sell during market downturns, creating forced holding that can amplify crashes',
        ],
        realWorld: [
          'Gitcoin Grants uses quadratic funding (a variant of quadratic voting) to distribute matching funds — small individual donations are amplified quadratically, supporting public goods with broad community backing',
          'ENS DAO distributed tokens to all .eth domain holders and established a delegate system — active delegates like brantly.eth and nick.eth vote on ENS protocol changes on behalf of thousands of token holders',
          'Curve\'s veTokenomics sparked the "Curve Wars" — protocols like Convex and Frax compete to accumulate veCRV to direct CRV emissions to their preferred liquidity pools',
        ],
      },
      {
        id: '9-3',
        name: 'Treasury Management & Proposals',
        description:
          'DAO treasuries hold community-owned funds governed by smart contracts, with expenditures requiring governance approval through the proposal process. Effective treasury management balances growth investment with capital preservation and diversification.',
        keyPoints: [
          'DAO treasuries typically hold the protocol\'s native governance token plus stablecoins and ETH — concentration in the governance token creates circular value: the treasury\'s value depends on the token price, which depends on the protocol\'s success',
          'Diversification strategies convert governance tokens to stablecoins and productive assets — but large token sales create sell pressure and can be perceived negatively by the community, requiring careful execution',
          'Streaming payment protocols (Sablier, Superfluid) enable continuous salary payments to DAO contributors without requiring individual transaction approvals — payments flow per-second from treasury to recipient',
          'Grants programs are the primary mechanism for DAOs to fund development — committees or elected reviewers evaluate proposals and allocate budgets, acting as a decentralized version of corporate R&D spending',
          'Multi-sig wallets (Safe, formerly Gnosis Safe) often serve as the execution layer: even after a governance vote passes, a trusted committee of signers must execute the transaction, adding a human safety check',
        ],
        tradeoffs: [
          'Large treasuries attract governance attacks — an attacker can buy enough tokens to pass a proposal that drains the treasury, making the cost of attack proportional to token market cap rather than treasury size',
          'Multi-sig execution adds safety but reintroduces centralization — the signers can refuse to execute valid proposals or be coerced/compromised, undermining the trustless nature of on-chain governance',
          'Active treasury management (yield farming, LP provision) generates returns but introduces smart contract risk and complexity — the ConstitutionDAO wound-down demonstrated how returning treasury funds to contributors is operationally challenging',
        ],
        realWorld: [
          'Uniswap DAO treasury holds over $3B in UNI tokens — the community debates how to deploy this capital for grants, liquidity incentives, and protocol development',
          'Lido DAO allocated $150M from its treasury to an ecosystem fund, distributed through a grants committee with public milestone-based deliverables',
          'ConstitutionDAO raised $47M in ETH to bid on a copy of the US Constitution — after losing the auction, the DAO had to return funds to thousands of contributors, costing more in gas fees than many contributors donated',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Layer 2 & Scaling',
    part: 3,
    partTitle: 'Applications',
    summary:
      'Solutions to blockchain\'s scalability limitations: rollups that execute transactions off-chain while inheriting the security of the base layer, sidechains that trade security for throughput, and the data availability problem that underpins all scaling approaches.',
    concepts: [
      {
        id: '10-1',
        name: 'Rollups (Optimistic vs ZK)',
        description:
          'Rollups execute transactions off-chain and post compressed transaction data back to the Layer 1 for data availability. They inherit the L1\'s security guarantees while achieving much higher throughput. The two main approaches differ in how they prove the validity of off-chain execution.',
        keyPoints: [
          'Optimistic rollups (Optimism, Arbitrum) assume all transactions are valid by default and use a fraud proof window (typically 7 days) during which anyone can challenge invalid state transitions — if a fraud proof succeeds, the invalid batch is reverted and the sequencer is slashed',
          'ZK rollups (zkSync, StarkNet, Scroll) generate cryptographic validity proofs (ZK-SNARKs or ZK-STARKs) for each batch — the L1 contract verifies the proof in a single transaction, providing instant finality without a challenge period',
          'Both rollup types post transaction data to L1 (as calldata or blobs post-EIP-4844) — this ensures anyone can reconstruct the rollup state from L1 data alone, preserving the L1\'s security and censorship resistance guarantees',
          'Sequencers order and batch transactions on the rollup — most rollups currently use a single centralized sequencer for performance, creating censorship and liveness risks that shared/decentralized sequencer solutions aim to address',
          'EIP-4844 (Proto-Danksharding) introduced blob transactions that provide temporary (~18 days) data availability at a fraction of calldata cost — this reduced rollup fees by 10-100x and is a stepping stone toward full danksharding',
        ],
        tradeoffs: [
          'Optimistic rollups are simpler to build and fully EVM-compatible but have a 7-day withdrawal delay — ZK rollups provide instant finality but require complex ZK circuits that may not support all EVM opcodes',
          'Centralized sequencers provide fast confirmation (~200ms) and MEV protection but are single points of failure — decentralized sequencing adds latency and complexity but eliminates censorship risk',
          'Posting data to L1 ensures security but creates a throughput ceiling determined by L1 data capacity — off-chain data availability (validiums, volitions) removes this bottleneck but weakens security guarantees',
        ],
        realWorld: [
          'Arbitrum One processes more transactions per day than Ethereum mainnet, with fees typically under $0.10 — it uses an optimistic rollup with a 7-day challenge period',
          'zkSync Era achieved EVM equivalence with ZK proofs, allowing existing Solidity contracts to deploy on a ZK rollup without modification',
          'Base (built by Coinbase on the OP Stack) reached 2M daily active addresses by leveraging the Optimism ecosystem and Coinbase\'s distribution',
        ],
      },
      {
        id: '10-2',
        name: 'Sidechains & State Channels',
        description:
          'Sidechains are independent blockchains with their own consensus that connect to a main chain through a two-way bridge. State channels allow two parties to transact off-chain by locking funds in an on-chain contract and exchanging signed state updates, settling the final state on-chain.',
        keyPoints: [
          'Sidechains (Polygon PoS, Ronin) have their own validator sets and consensus mechanisms — they are faster and cheaper than the main chain but do not inherit its security, meaning sidechain validators can collude to steal bridged funds',
          'Two-way pegs use lock-and-mint bridges: assets are locked on the main chain and equivalent synthetic assets are minted on the sidechain — the bridge contract is a critical security chokepoint',
          'State channels (Raiden Network, Lightning Network) enable unlimited off-chain transactions between parties with only two on-chain transactions (open and close) — ideal for high-frequency, low-value interactions',
          'Plasma chains (an older L2 design) use a hierarchical structure where child chains submit commitment hashes to the parent chain — users can exit to L1 using Merkle proofs if the operator becomes malicious',
          'Commit chains (Polygon PoS) periodically submit checkpoints of sidechain state to Ethereum — this provides a weaker form of L1 security than rollups but is sufficient for many applications',
        ],
        tradeoffs: [
          'Sidechains provide immediate scalability with full EVM compatibility but sacrifice L1 security — the Ronin bridge hack ($625M) demonstrated that sidechain validator sets can be compromised',
          'State channels enable instant, zero-fee transactions but require both parties to be online and are limited to fixed participant sets — they cannot support smart contract interactions with arbitrary counterparties',
          'Plasma chains inherit more L1 security than sidechains but have the data availability problem (users must monitor the chain to exit safely) and never achieved broad adoption — rollups superseded them',
        ],
        realWorld: [
          'Polygon PoS processes 2-3M transactions daily with sub-cent fees, hosting major DeFi protocols (Aave, Uniswap) and gaming applications (Aavegotchi)',
          'The Ronin bridge hack (March 2022): attackers compromised 5 of 9 validator keys to steal $625M in ETH and USDC — highlighting sidechain bridge security risks',
          'The Raiden Network (Ethereum\'s state channel solution) achieved limited adoption compared to Lightning Network due to Ethereum\'s faster block times and the emergence of rollups as a superior scaling solution',
        ],
      },
      {
        id: '10-3',
        name: 'Data Availability & Sharding',
        description:
          'Data availability (DA) ensures that the data needed to verify blockchain state is accessible to all participants. Sharding distributes the network\'s data and computation across multiple parallel chains or committees, increasing total throughput while maintaining security.',
        keyPoints: [
          'The data availability problem: a block producer could publish a block header with a valid proof but withhold the underlying data — without data availability guarantees, light clients cannot verify state transitions and users cannot detect fraud',
          'Data Availability Sampling (DAS) allows light nodes to verify data availability by randomly sampling small portions of the data — if they can retrieve their samples, the entire data is available with high probability (using erasure coding)',
          'Danksharding (Ethereum\'s full sharding roadmap) will create a massive data availability layer with 16+ MB blobs per block — rollups will post data to this layer instead of calldata, dramatically reducing costs',
          'Dedicated DA layers (Celestia, EigenDA, Avail) modularize the DA function — rollups can post data to these specialized chains instead of Ethereum, trading some security for lower costs',
          'Erasure coding encodes data with redundancy so that the original data can be reconstructed from any 50% of the encoded fragments — this enables DAS to work with high confidence using relatively few samples',
        ],
        tradeoffs: [
          'On-chain DA (Ethereum blobs) provides the strongest security guarantees but is expensive and limited by L1 throughput — off-chain DA (Celestia) is cheaper but introduces a new trust assumption on the DA layer\'s security',
          'Full sharding maximizes throughput but requires complex cross-shard communication protocols — if contracts on different shards need to interact, transactions become multi-step and more expensive',
          'DAS reduces individual node requirements (no need to download all data) but requires a minimum number of honest samplers — if adversaries can target and prevent sampling, DA guarantees degrade',
        ],
        realWorld: [
          'Celestia launched as the first modular DA layer (October 2023), providing cheap blob storage for rollups like Manta Network and Eclipse',
          'EIP-4844 introduced blob transactions on Ethereum (March 2024), providing ~125 KB of temporary DA per block at ~100x cheaper than calldata — rollup fees dropped from dollars to cents',
          'EigenDA leverages Ethereum\'s validator set through restaking to provide DA, achieving higher throughput than Ethereum blobs while inheriting Ethereum\'s economic security',
        ],
      },
    ],
  },

  // Part 4: Advanced Topics
  {
    id: 11,
    title: 'Zero-Knowledge Proofs',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Zero-knowledge proofs enable one party to prove knowledge of information without revealing the information itself. From the theoretical foundations of ZK-SNARKs and ZK-STARKs to privacy-preserving cryptocurrencies and emerging non-crypto applications.',
    concepts: [
      {
        id: '11-1',
        name: 'ZK-SNARKs & ZK-STARKs',
        description:
          'ZK-SNARKs (Succinct Non-interactive Arguments of Knowledge) and ZK-STARKs (Scalable Transparent Arguments of Knowledge) are the two dominant zero-knowledge proof systems. Both allow a prover to convince a verifier that a computation was performed correctly without revealing the inputs.',
        keyPoints: [
          'ZK-SNARKs produce very small proofs (~200 bytes) that are cheap to verify on-chain (~200K gas), but require a trusted setup ceremony — if the toxic waste from the setup is not properly destroyed, the system can be forged',
          'ZK-STARKs require no trusted setup (transparent) and are post-quantum secure (based on hash functions rather than elliptic curves), but produce larger proofs (~50-200 KB) that are more expensive to verify on-chain',
          'The arithmetic circuit: ZK proofs require converting the computation to be proven into a mathematical representation (R1CS, AIR, or Plonkish) — this compilation step is a major engineering challenge and bottleneck',
          'Groth16 (a specific SNARK scheme) is the most gas-efficient for on-chain verification but requires a per-circuit trusted setup — PLONK and its variants (HyperPlonk, UltraPLONK) use a universal trusted setup that works for any circuit',
          'Recursive proof composition allows proofs to verify other proofs — this enables proof aggregation (combining thousands of transaction proofs into one) and incrementally verifiable computation (IVC) for long-running computations',
        ],
        tradeoffs: [
          'SNARKs offer tiny proofs and cheap verification but rely on trusted setups and are vulnerable to quantum computers — STARKs eliminate these concerns but at the cost of larger proofs and higher verification costs',
          'Proof generation is computationally expensive (seconds to minutes for complex circuits) — this creates a centralization pressure where only well-resourced provers can generate proofs, potentially leading to prover MEV',
          'Higher-level ZK languages (Circom, Noir, Cairo) abstract circuit design but may generate suboptimal circuits — hand-optimized circuits are more efficient but require deep mathematical expertise to write and audit',
        ],
        realWorld: [
          'Zcash pioneered ZK-SNARKs in production (2016) with the Powers of Tau ceremony — over 87,000 participants contributed randomness, ensuring security as long as at least one participant was honest',
          'StarkNet uses ZK-STARKs (via Cairo language) for its ZK rollup on Ethereum, processing thousands of transactions per proof and achieving significant throughput improvements',
          'Axiom uses ZK-SNARKs to prove historical Ethereum state, allowing smart contracts to trustlessly access data from any past block without relying on an oracle',
        ],
      },
      {
        id: '11-2',
        name: 'Privacy Coins & Confidential Transactions',
        description:
          'Privacy-focused cryptocurrencies use advanced cryptographic techniques to hide transaction amounts, sender and receiver identities, or both. These systems address the fundamental transparency limitation of public blockchains where all transaction data is visible to everyone.',
        keyPoints: [
          'Zcash uses ZK-SNARKs for shielded transactions: the sender, receiver, and amount are encrypted on-chain, and a zero-knowledge proof demonstrates that the transaction is valid (inputs equal outputs, no double-spending) without revealing any details',
          'Monero uses three privacy technologies: ring signatures (hide the sender among decoy signers), stealth addresses (one-time addresses for each transaction), and RingCT (hide transaction amounts using Pedersen commitments)',
          'Confidential Transactions (CT) use Pedersen commitments to hide transaction amounts while allowing verification that inputs equal outputs — range proofs (Bulletproofs) ensure committed values are non-negative without revealing them',
          'Tornado Cash (Ethereum) used ZK-SNARKs to break the transaction graph: users deposit fixed amounts into a pool and withdraw to a different address, proving membership in the deposit set without revealing which deposit is theirs',
          'Privacy vs compliance: regulators view privacy coins with suspicion, leading to exchange delistings — view keys (Zcash) and audit mechanisms allow selective disclosure to authorized parties while maintaining default privacy',
        ],
        tradeoffs: [
          'Strong privacy protects legitimate users (financial privacy, business confidentiality) but can also facilitate money laundering — regulators have sanctioned privacy tools (OFAC sanctioned Tornado Cash in 2022)',
          'Zcash\'s shielded transactions are expensive (~4000x more computation than transparent transactions) and rarely used (~5% of transactions are shielded) — optional privacy creates a smaller anonymity set',
          'Monero\'s mandatory privacy means all transactions are private by default, creating a large anonymity set — but this makes the blockchain opaque to auditing and verification, complicating supply audits',
        ],
        realWorld: [
          'OFAC sanctioned Tornado Cash (August 2022), making it illegal for US persons to interact with the smart contracts — developer Alexey Pertsev was convicted in the Netherlands',
          'Monero is the most widely used privacy coin, adopted in darknet markets due to its mandatory privacy — the IRS has offered bounties for breaking Monero\'s privacy',
          'Aztec Network is building a privacy-first L2 on Ethereum using ZK-SNARKs, enabling private smart contract execution (not just private transfers)',
        ],
      },
      {
        id: '11-3',
        name: 'ZK Applications Beyond Crypto',
        description:
          'Zero-knowledge proofs have applications far beyond cryptocurrency: identity verification without revealing personal data, supply chain provenance, voting systems, and machine learning model verification. These applications leverage ZK\'s ability to prove statements about private data.',
        keyPoints: [
          'ZK-based identity (Polygon ID, Worldcoin, Sismo) allows proving attributes (age > 18, resident of country X, holds degree Y) without revealing the underlying identity document — selective disclosure preserves privacy while satisfying verification requirements',
          'ZK machine learning (zkML) enables proving that a specific ML model produced a specific output for a given input without revealing the model weights — this has applications in AI auditing and verifiable inference',
          'ZK voting allows voters to prove they are eligible and that their vote is valid without revealing their choice — this enables verifiable elections with voter privacy, addressing both fraud and coercion resistance',
          'ZK compliance proofs let institutions demonstrate regulatory compliance (sufficient reserves, passing KYC/AML checks) without revealing sensitive customer data — useful for DeFi protocols needing to satisfy regulators',
          'ZK coprocessors (Axiom, RISC Zero, Succinct) extend smart contract capabilities by proving off-chain computations — contracts can trustlessly access computed results from historical data, complex algorithms, or external databases',
        ],
        tradeoffs: [
          'ZK identity preserves privacy but requires trusted issuers (governments, institutions) to sign attestations — the system is only as trustworthy as the issuer, and compromised issuer keys could generate false attestations',
          'zkML proofs are computationally expensive and currently limited to small models — proving inference of a large language model is orders of magnitude beyond current ZK proving capabilities',
          'ZK voting provides strong privacy but the complexity of ZK circuits makes it difficult for non-experts to verify the system\'s correctness — bugs in the ZK circuit could silently corrupt election results',
        ],
        realWorld: [
          'Worldcoin uses ZK proofs to verify that each user has a unique iris scan without storing biometric data — the proof confirms uniqueness without revealing identity',
          'RISC Zero\'s zkVM allows proving arbitrary Rust program execution in zero knowledge — any computation that runs in Rust can generate a ZK proof of correct execution',
          'Polygon ID enables decentralized identity verification for KYC/AML compliance — users can prove they passed verification without sharing personal documents with every service',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Cross-Chain & Interoperability',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Connecting isolated blockchain ecosystems: bridge architectures that move assets between chains, standardized messaging protocols for cross-chain communication, and atomic swap mechanisms that enable trustless cross-chain trades.',
    concepts: [
      {
        id: '12-1',
        name: 'Bridges & Wrapped Assets',
        description:
          'Blockchain bridges enable transferring assets and data between different chains by locking assets on the source chain and minting equivalent wrapped tokens on the destination chain. Bridge security is one of the most critical and frequently exploited attack surfaces in crypto.',
        keyPoints: [
          'Lock-and-mint bridges: a user locks ETH on Ethereum, and after verification, the bridge mints WETH (wrapped ETH) on the destination chain — the bridge contract holding locked assets becomes a high-value target (billions locked in major bridges)',
          'Trust models range from fully trusted (centralized bridge operator), to committee-based (multi-sig or MPC threshold), to trust-minimized (light client verification or ZK proofs) — each trades security for cost and speed',
          'Canonical bridges (official L2 bridges like Arbitrum Bridge, Optimism Bridge) inherit L1 security by verifying state proofs — they are the most secure but may have slow withdrawal times (7 days for optimistic rollup exits)',
          'Liquidity networks (Across, Stargate, Hop Protocol) use relayers who front capital on the destination chain for fast bridging — the relayer is reimbursed from the locked assets after verification, creating instant cross-chain transfers',
          'Bridge aggregators (Li.Fi, Socket) route cross-chain transfers through the optimal bridge based on speed, cost, and security — abstracting the complexity of choosing between dozens of competing bridges',
        ],
        tradeoffs: [
          'Bridges are the weakest link in cross-chain security — over $2.5B has been stolen from bridge hacks (Ronin $625M, Wormhole $320M, Nomad $190M), making them the largest category of DeFi exploits',
          'Trust-minimized bridges (light client, ZK) provide strong security but are expensive to operate (gas costs for proof verification) and complex to implement — most production bridges use simpler but less secure multi-sig models',
          'Fast bridging via liquidity networks provides better UX but requires relayers to hold capital on every destination chain — capital efficiency decreases linearly with the number of supported chains',
        ],
        realWorld: [
          'WBTC (Wrapped Bitcoin) is an ERC-20 token backed 1:1 by Bitcoin held in custody by BitGo — with over $5B in circulation, it is the primary way Bitcoin is used in Ethereum DeFi',
          'The Nomad bridge hack (August 2022): a smart contract vulnerability allowed anyone to drain funds by replaying modified transactions — over $190M stolen by hundreds of copycats within hours',
          'LayerZero provides a generalized messaging protocol enabling omnichain applications — rather than wrapping assets, it allows contracts on different chains to call each other directly',
        ],
      },
      {
        id: '12-2',
        name: 'IBC & Cross-Chain Messaging',
        description:
          'The Inter-Blockchain Communication (IBC) protocol, pioneered by the Cosmos ecosystem, provides a standardized framework for blockchains to exchange arbitrary messages and tokens trustlessly. Cross-chain messaging extends this concept beyond the Cosmos ecosystem.',
        keyPoints: [
          'IBC uses light client verification: each connected chain runs a light client of the other chain, verifying consensus proofs to confirm that messages were actually finalized — no trusted third party is needed',
          'IBC packets follow a handshake protocol: channel opening (INIT, TRY, ACK, CONFIRM), packet commitment on the source chain, relay to the destination, and acknowledgment — relayers are permissionless and earn fees for delivering packets',
          'Cosmos chains connected via IBC can transfer tokens (ICS-20), make interchain accounts (ICS-27), and query state (ICS-31) — this creates a "internet of blockchains" where sovereign chains interoperate seamlessly',
          'Cross-chain messaging protocols (LayerZero, Axelar, Hyperlane) generalize IBC concepts beyond Cosmos — they enable Ethereum, Solana, and other non-Cosmos chains to send arbitrary messages to each other',
          'General Message Passing (GMP) allows smart contracts to call functions on contracts deployed on different chains — this enables truly cross-chain applications (cross-chain lending, unified liquidity, multi-chain governance)',
        ],
        tradeoffs: [
          'IBC\'s light client verification provides the strongest cross-chain security guarantees but requires both chains to have compatible consensus (BFT-style finality) — connecting to probabilistic-finality chains (Bitcoin, PoW Ethereum) requires trust assumptions',
          'Permissionless relayers ensure liveness (anyone can relay messages) but create MEV opportunities — relayers can reorder, delay, or front-run cross-chain messages for profit',
          'General message passing enables powerful cross-chain composability but creates systemic risk — a vulnerability in the messaging protocol affects every application built on top of it across all connected chains',
        ],
        realWorld: [
          'The Cosmos ecosystem has 50+ IBC-connected chains (Osmosis, Celestia, dYdX) processing millions of cross-chain transfers monthly with zero bridge hacks — IBC\'s light client model has proven its security',
          'LayerZero enables omnichain fungible tokens (OFTs) that exist natively on multiple chains — rather than wrapping, the same token supply is spread across chains and can be transferred between them',
          'Axelar Network provides cross-chain GMP connecting 45+ chains including Ethereum, Cosmos chains, and Polkadot — it uses a PoS validator set to verify cross-chain messages',
        ],
      },
      {
        id: '12-3',
        name: 'Atomic Swaps & Hash Time-Locked Contracts',
        description:
          'Atomic swaps enable trustless exchange of assets across different blockchains without an intermediary. Hash Time-Locked Contracts (HTLCs) are the cryptographic primitive that makes this possible, using hash preimages and timelocks to ensure both parties fulfill their obligations or neither does.',
        keyPoints: [
          'An HTLC locks funds that can be claimed by providing a secret preimage whose hash matches a specified hash — if the preimage is not revealed before a timeout, the funds are returned to the sender, ensuring atomicity',
          'Cross-chain atomic swaps use linked HTLCs: Alice locks BTC with hash H on Bitcoin, Bob locks ETH with the same hash H on Ethereum, Alice claims ETH by revealing the preimage, which Bob then uses to claim BTC',
          'The timelock asymmetry is critical: Alice\'s Bitcoin HTLC must have a longer timeout than Bob\'s Ethereum HTLC — this ensures Alice has time to claim on Ethereum before her Bitcoin HTLC expires',
          'Submarine swaps enable on-chain to off-chain atomic exchanges — a user can atomically swap on-chain Bitcoin for Lightning Network BTC, enabling Lightning liquidity management without trusted intermediaries',
          'Point Time-Locked Contracts (PTLCs) use adaptor signatures instead of hash preimages — they provide better privacy (no hash linkage between the two chains) and enable more complex multi-party swap protocols',
        ],
        tradeoffs: [
          'Atomic swaps are fully trustless but require both blockchains to support the necessary scripting primitives (hash functions, timelocks) — not all chains have compatible HTLC capabilities',
          'The process requires multiple on-chain transactions (lock, claim, or refund on each chain) — total costs can exceed centralized exchange fees for small amounts, making atomic swaps impractical for everyday trading',
          'Both parties must be online and responsive within the timelock windows — if one party goes offline, the other\'s funds are locked until the timeout expires, creating a poor user experience',
        ],
        realWorld: [
          'THORChain implements cross-chain swaps between Bitcoin, Ethereum, and other native assets using a variant of continuous liquidity pools rather than traditional HTLCs — no wrapping required',
          'Lightning Loop (by Lightning Labs) uses submarine swaps to manage Lightning channel liquidity — node operators can atomically move funds between on-chain Bitcoin and Lightning channels',
          'Komodo\'s AtomicDEX was one of the first decentralized exchanges to use atomic swaps for trustless cross-chain trading between Bitcoin, Ethereum, and other UTXO-based chains',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Web3 Development',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'The practical tools and patterns for building decentralized applications: wallet management and key security, the architecture of dApps from frontend to smart contract, and the testing and deployment infrastructure that supports the development lifecycle.',
    concepts: [
      {
        id: '13-1',
        name: 'Wallets & Key Management (MetaMask)',
        description:
          'Cryptocurrency wallets manage private keys and provide user interfaces for interacting with blockchains. From browser extensions to hardware devices and smart contract wallets, the wallet is the primary user touchpoint in Web3 and the most critical security component.',
        keyPoints: [
          'MetaMask is the dominant browser extension wallet with 30M+ monthly active users — it injects an Ethereum provider (window.ethereum) into web pages, allowing dApps to request account access, sign transactions, and interact with smart contracts',
          'BIP-39 mnemonic seed phrases (12 or 24 words) encode the master secret for HD wallets (BIP-32/44) — from this single seed, an unlimited number of accounts across multiple chains can be derived deterministically',
          'Hardware wallets (Ledger, Trezor) store private keys on a secure element chip that never exposes the key to the host computer — transactions are signed on the device itself, protecting against malware on the connected computer',
          'Smart contract wallets (Safe, ERC-4337 account abstraction) replace EOA key management with programmable logic — features include multi-sig, social recovery (recover access using friends/guardians), gas sponsorship, and transaction batching',
          'ERC-4337 (Account Abstraction) introduces UserOperations processed by bundlers, enabling gasless transactions (paymasters cover gas), batch transactions, and arbitrary signature schemes — this dramatically improves Web3 UX',
        ],
        tradeoffs: [
          'Browser extension wallets are convenient and support the widest range of dApps but are vulnerable to phishing attacks (malicious sites requesting signatures) and browser-level vulnerabilities',
          'Hardware wallets provide the strongest key security but add friction to every transaction (physical button press required) and are a single physical device that can be lost, stolen, or damaged',
          'Smart contract wallets enable superior features (recovery, batching, gasless) but introduce smart contract risk — a bug in the wallet contract could lock or steal all user funds',
        ],
        realWorld: [
          'The MetaMask blind signing problem: users are asked to sign opaque transaction data they cannot understand — this has enabled "ice phishing" attacks where users unknowingly sign token approval transactions to attackers',
          'Gnosis Safe (now Safe) protects over $100B in assets using multi-sig smart contract wallets — major DAOs, protocols, and treasuries use it as their primary key management solution',
          'ERC-4337 wallets like Pimlico and ZeroDev enable gasless onboarding: new users can create wallets and transact without holding ETH, with gas fees sponsored by the dApp',
        ],
      },
      {
        id: '13-2',
        name: 'dApp Architecture & RPC Providers',
        description:
          'Decentralized application architecture combines traditional web frontend development with blockchain backend interactions through RPC (Remote Procedure Call) providers. The stack includes React/Next.js frontends, ethers.js/viem libraries, RPC nodes, indexing services, and on-chain smart contracts.',
        keyPoints: [
          'dApps use RPC providers (Alchemy, Infura, QuickNode) to communicate with blockchain nodes via JSON-RPC — calls include eth_call (read), eth_sendTransaction (write), eth_getLogs (events), and eth_getBlockByNumber (blocks)',
          'Frontend libraries (ethers.js, viem/wagmi) abstract JSON-RPC complexity — they handle ABI encoding/decoding, transaction signing, gas estimation, and provide TypeScript-safe contract interaction interfaces',
          'Event indexing is critical for dApp performance — reading contract state via eth_call is expensive and limited, so services like The Graph (subgraphs) and Ponder index events into queryable databases using GraphQL',
          'IPFS or Arweave host dApp frontends for censorship resistance — instead of traditional web hosting, the frontend bundle is pinned to IPFS and accessed via ENS (decentralized DNS), making the entire stack decentralized',
          'Multicall contracts batch multiple read-only contract calls into a single RPC request — this reduces API calls from O(n) to O(1) for displaying portfolio balances, token lists, and other aggregate views',
        ],
        tradeoffs: [
          'Centralized RPC providers (Alchemy, Infura) offer reliability and developer tools but create a centralization dependency — if the provider goes down, the dApp cannot communicate with the blockchain (as happened during Infura outages)',
          'Running your own node provides maximum decentralization and reliability but requires significant infrastructure (Ethereum full node needs 2+ TB SSD, 16+ GB RAM) and ongoing maintenance',
          'Subgraph-based indexing (The Graph) provides powerful querying but adds latency (blocks must be indexed) and dependency on indexer availability — custom indexing solutions offer more control but require more engineering effort',
        ],
        realWorld: [
          'Alchemy processes billions of API requests daily across Ethereum, Polygon, Optimism, Arbitrum, and other chains — it provides enhanced APIs for NFT data, token balances, and transaction simulation',
          'Uniswap\'s frontend is hosted on IPFS and accessible via app.uniswap.org (traditional DNS) and uniswap.eth (ENS) — even if the domain is seized, the IPFS-hosted version remains accessible',
          'The Graph Protocol has indexed over 60,000 subgraphs across 40+ chains, providing the data infrastructure layer for most major DeFi dashboards and analytics platforms',
        ],
      },
      {
        id: '13-3',
        name: 'Testing & Deployment (Hardhat, Foundry)',
        description:
          'Smart contract development frameworks provide local development environments, testing infrastructure, and deployment tools. Hardhat and Foundry are the two dominant frameworks, each with different philosophies on testing, performance, and developer experience.',
        keyPoints: [
          'Hardhat provides a JavaScript/TypeScript-based development environment with a local EVM (Hardhat Network) that supports console.log in Solidity, stack traces for reverts, and mainnet forking for testing against production state',
          'Foundry is a Rust-based toolkit (forge, cast, anvil, chisel) that runs tests written in Solidity — test execution is 10-100x faster than Hardhat because tests are compiled to EVM bytecode rather than interpreted through JavaScript',
          'Fuzz testing in Foundry generates random inputs to test function properties — rather than testing specific scenarios, developers write invariants (properties that should always hold), and the fuzzer tries to find counterexamples',
          'Mainnet forking creates a local copy of the live blockchain state at a specific block — this allows testing contract interactions with real DeFi protocols, real token balances, and real oracle prices without spending real money',
          'Deployment scripts must handle deterministic deployment (CREATE2), proxy initialization, access control setup, and contract verification on block explorers — deployment is a critical phase where mistakes are irreversible and costly',
        ],
        tradeoffs: [
          'Hardhat\'s JavaScript ecosystem provides rich tooling (plugins, tasks, scripts) and a gentle learning curve but is slower for large test suites — projects with 1000+ tests may see 10+ minute test runs that slow development',
          'Foundry\'s Solidity-native testing is blazingly fast and catches more bugs (tests run in the same language as the contract) but has a steeper learning curve and less mature plugin ecosystem',
          'Mainnet forking enables realistic integration testing but creates flaky tests (forked state becomes stale) and requires an archive node or API provider — local simulation cannot capture all mainnet behaviors (gas price fluctuations, MEV)',
        ],
        realWorld: [
          'Paradigm (a crypto VC) developed Foundry and uses it for all their portfolio company audits — its fuzz testing has discovered vulnerabilities missed by manual auditing',
          'OpenZeppelin\'s contract library uses Hardhat for testing with over 5,000 tests covering their implementation of ERC standards, access control, and security utilities',
          'Tenderly provides a transaction simulation and debugging platform that integrates with both Hardhat and Foundry — developers can simulate transactions before broadcasting and debug reverts with full stack traces',
        ],
      },
    ],
  },
];

export const chapters: Chapter[] = topics;

export function getChapter(id: number): Chapter | undefined {
  return chapters.find((ch) => ch.id === id);
}
