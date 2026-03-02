export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Blockchain Fundamentals
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'What property of a blockchain makes it tamper-evident?',
    options: [
      'Each block is encrypted with a private key',
      'Each block contains the cryptographic hash of the previous block, so changing any block invalidates all subsequent hashes',
      'Blocks are stored in a centralized database with access controls',
      'Blocks are backed up to multiple cloud providers',
    ],
    answer: 1,
    explanation: 'Each block header includes the hash of the previous block, forming a chain. Altering any data in a past block changes its hash, which breaks the link to the next block, cascading through the entire chain. To tamper successfully, an attacker would need to re-mine all subsequent blocks faster than the honest network — computationally infeasible in established chains.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'What is the Byzantine Generals Problem and how does it relate to blockchain?',
    options: [
      'A problem about encrypting military communications',
      'The challenge of achieving agreement among distributed nodes when some may be faulty or malicious — blockchain consensus mechanisms solve this',
      'A problem about optimizing database queries across shards',
      'A challenge in designing user interfaces for complex systems',
    ],
    answer: 1,
    explanation: 'The Byzantine Generals Problem asks how distributed parties can agree on a strategy when some participants may be dishonest. Blockchain consensus mechanisms (PoW, PoS, BFT variants) provide practical solutions: honest nodes can agree on transaction ordering even if some nodes lie, fail, or act maliciously, as long as the honest majority exceeds a threshold (51% for PoW, 2/3 for BFT).',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'What is a distributed ledger and how does it differ from a traditional database?',
    options: [
      'A distributed ledger is just a faster database',
      'A distributed ledger is replicated across many nodes with no central authority, where all participants can verify transactions independently without trusting a single operator',
      'A distributed ledger only stores financial transactions',
      'A distributed ledger requires permission from a central admin to write data',
    ],
    answer: 1,
    explanation: 'Traditional databases have a single authority controlling read/write access. A distributed ledger replicates the full transaction history across all participating nodes. Each node independently validates transactions against consensus rules. No single entity can unilaterally alter records. This removes the need for a trusted intermediary but comes at the cost of throughput and storage efficiency.',
  },

  // Chapter 2: Cryptographic Primitives
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'Why are cryptographic hash functions essential for blockchain?',
    options: [
      'They encrypt transaction data for privacy',
      'They produce fixed-size, deterministic, collision-resistant fingerprints of data — enabling tamper detection, block linking, and proof-of-work puzzles',
      'They compress data to save storage space',
      'They authenticate users through password hashing',
    ],
    answer: 1,
    explanation: 'Hash functions (SHA-256 in Bitcoin, Keccak-256 in Ethereum) are one-way functions producing a fixed-size digest. Key properties: deterministic (same input = same hash), avalanche effect (tiny change = completely different hash), collision-resistant (infeasible to find two inputs with same hash), and pre-image resistant (cannot reverse a hash to find the input). These enable block chaining, Merkle trees, and mining puzzles.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'How do digital signatures work in blockchain transactions?',
    options: [
      'Users sign transactions with their email address',
      'The sender signs the transaction hash with their private key; anyone can verify the signature using the sender\'s public key, proving authenticity without revealing the private key',
      'A central authority signs all transactions',
      'Digital signatures encrypt the transaction so only the recipient can read it',
    ],
    answer: 1,
    explanation: 'Blockchain uses asymmetric cryptography (ECDSA with secp256k1 in Bitcoin/Ethereum). The sender hashes the transaction data and signs the hash with their private key. Any node can verify the signature against the sender\'s public key (derived from their address). This proves the transaction was authorized by the key holder without exposing the private key. Signatures are unique per transaction.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'What is a Merkle tree and why is it used in blockchain?',
    options: [
      'A data structure for storing encryption keys',
      'A binary hash tree where each leaf is a transaction hash and each parent is the hash of its children, enabling efficient verification that a transaction is included in a block without downloading all transactions',
      'A balanced binary search tree for fast lookups',
      'A tree structure for organizing smart contract code',
    ],
    answer: 1,
    explanation: 'A Merkle tree hashes pairs of transactions recursively until a single root hash remains. The Merkle root is stored in the block header. To prove a transaction is in a block, you only need O(log n) hashes (the Merkle proof/path), not all transactions. This enables light clients (SPV nodes) to verify inclusion without downloading the full block — critical for mobile wallets.',
  },

  // Chapter 3: Consensus Mechanisms
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'How does Proof of Work (PoW) achieve consensus?',
    options: [
      'By having nodes vote on which transactions are valid',
      'Miners compete to find a nonce that produces a block hash below a difficulty target, expending computational energy as the cost of block production',
      'By randomly selecting a node to produce each block',
      'By requiring all nodes to agree before adding a block',
    ],
    answer: 1,
    explanation: 'PoW requires miners to repeatedly hash block data with different nonces until finding a hash below the difficulty target. This brute-force search consumes electricity, making it expensive to produce blocks and astronomically expensive to rewrite history. The longest chain (most cumulative work) is canonical. Difficulty adjusts to maintain consistent block times (10 min in Bitcoin). The energy cost is the security budget.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'What is the key difference between Proof of Stake (PoS) and Proof of Work?',
    options: [
      'PoS is faster but less secure than PoW',
      'In PoS, validators lock up cryptocurrency as collateral (stake) instead of expending energy; misbehavior is punished by slashing their stake',
      'PoS requires specialized mining hardware while PoW does not',
      'PoS only works for private blockchains',
    ],
    answer: 1,
    explanation: 'PoS replaces energy expenditure with economic stake. Validators deposit tokens as collateral and are selected to propose/attest blocks proportional to their stake. If they act maliciously (double-signing, equivocating), their stake is partially or fully "slashed" (destroyed). This achieves economic security without massive energy consumption. Ethereum switched from PoW to PoS in "The Merge" (Sept 2022), reducing energy use by ~99.95%.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'What does finality mean in consensus and how does it differ between PoW and BFT?',
    options: [
      'Finality means a transaction has been broadcast to the network',
      'Finality means a transaction cannot be reversed — PoW has probabilistic finality (deeper blocks are exponentially harder to revert), while BFT provides deterministic finality (once committed, blocks are irreversible)',
      'Finality means the transaction fee has been paid',
      'Finality is the same in all consensus mechanisms',
    ],
    answer: 1,
    explanation: 'In PoW (Bitcoin), finality is probabilistic — each confirmation makes reversal exponentially more expensive but never technically impossible. 6 confirmations (~60 min) is considered practically final. BFT-based consensus (Tendermint, used in Cosmos) provides instant deterministic finality — once 2/3+ validators sign a block, it is mathematically irreversible. Ethereum\'s Casper FFG adds finality checkpoints to its PoS.',
  },

  // Chapter 4: Bitcoin Architecture
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'What is the UTXO model in Bitcoin?',
    options: [
      'A balance-based account system like a bank',
      'Unspent Transaction Outputs — Bitcoin tracks discrete "coins" (UTXOs) rather than account balances; spending creates new UTXOs while consuming old ones',
      'A database index for fast transaction lookups',
      'A user token exchange protocol',
    ],
    answer: 1,
    explanation: 'Bitcoin doesn\'t have "accounts" with balances. Instead, each transaction consumes previous unspent outputs (UTXOs) and creates new ones. Your "balance" is the sum of all UTXOs your keys can spend. When you send 0.3 BTC from a 1 BTC UTXO, the transaction creates two outputs: 0.3 BTC to the recipient and ~0.7 BTC back to yourself (minus fees). UTXOs enable parallel validation and privacy through change addresses.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What is Bitcoin Script and why is it intentionally limited?',
    options: [
      'A Turing-complete programming language for smart contracts',
      'A stack-based, non-Turing-complete scripting language that defines spending conditions for UTXOs — intentionally limited to prevent infinite loops and ensure predictable execution',
      'A markup language for formatting Bitcoin transactions',
      'JavaScript code that runs in Bitcoin wallets',
    ],
    answer: 1,
    explanation: 'Bitcoin Script uses a stack-based language with opcodes (OP_CHECKSIG, OP_HASH160, etc.) to define spending conditions. It is intentionally non-Turing-complete — no loops, limited opcodes — to prevent denial-of-service through infinite execution and ensure every script terminates. This limits Bitcoin\'s programmability but maximizes security and predictability. Taproot (2021) added Schnorr signatures and improved scripting.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'How does the Lightning Network enable fast Bitcoin payments?',
    options: [
      'By increasing Bitcoin\'s block size',
      'By creating off-chain payment channels between parties, where only the opening and closing transactions are recorded on the blockchain, enabling instant micro-payments',
      'By using a different consensus mechanism',
      'By compressing transaction data to fit more in each block',
    ],
    answer: 1,
    explanation: 'Lightning is a Layer 2 protocol. Two parties open a payment channel by locking BTC in a 2-of-2 multisig on-chain. They then exchange signed transactions off-chain, updating their balances instantly and with near-zero fees. Only the final balances are settled on-chain when the channel closes. Multi-hop routing enables payments to any Lightning node, not just direct channel partners. HTLCs (Hash Time-Locked Contracts) secure routed payments.',
  },

  // Chapter 5: Ethereum & Smart Contracts
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'How does Ethereum\'s account model differ from Bitcoin\'s UTXO model?',
    options: [
      'They are functionally identical',
      'Ethereum uses accounts with balances (like a bank) — each account has a nonce, balance, and optional code/storage, making smart contract interactions more natural than UTXO-based approaches',
      'Ethereum uses UTXOs but calls them accounts',
      'Bitcoin uses accounts and Ethereum uses UTXOs',
    ],
    answer: 1,
    explanation: 'Ethereum has two account types: Externally Owned Accounts (EOAs, controlled by private keys) and Contract Accounts (controlled by code). Each has a balance and nonce. Unlike Bitcoin\'s UTXO model, Ethereum tracks running balances directly. This simplifies smart contract logic (contracts have persistent state in storage) but makes parallel transaction processing harder and requires careful nonce management.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'What is gas in Ethereum and why does it exist?',
    options: [
      'A cryptocurrency used to pay validators',
      'A unit measuring computational work — each EVM operation costs gas, and users pay gas fees (gas × gas price) to prevent infinite loops and compensate validators for computation',
      'A token used for governance voting',
      'A measure of network bandwidth consumption',
    ],
    answer: 1,
    explanation: 'Gas solves the halting problem for smart contracts. Since the EVM is Turing-complete, contracts could loop forever. Gas assigns a cost to each opcode (ADD=3, SSTORE=20000). Transactions specify a gas limit and gas price. If execution exceeds the gas limit, it reverts (but fees are still consumed). EIP-1559 introduced base fee + priority tip pricing, burning the base fee to make ETH deflationary.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'What are ERC-20 and ERC-721 token standards?',
    options: [
      'Encryption standards for securing wallets',
      'ERC-20 defines fungible tokens (interchangeable, like currency) and ERC-721 defines non-fungible tokens (unique, like digital collectibles) — both are smart contract interfaces on Ethereum',
      'Network routing protocols for Ethereum nodes',
      'Database schemas for storing blockchain data',
    ],
    answer: 1,
    explanation: 'ERC-20 defines a standard interface (transfer, balanceOf, approve, transferFrom) for fungible tokens — every USDC token is identical. ERC-721 defines an interface for NFTs where each token has a unique tokenId. ERC-1155 combines both (multi-token standard for games). These standards ensure interoperability: any wallet, DEX, or marketplace can interact with any conforming token without custom integration.',
  },

  // Chapter 6: Smart Contract Security
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'What is a reentrancy attack in smart contracts?',
    options: [
      'An attack that replays old transactions',
      'When a malicious contract calls back into the victim contract before the first invocation completes, exploiting the fact that state hasn\'t been updated yet to drain funds repeatedly',
      'An attack that re-enters a contract through a different function',
      'When a contract is deployed twice to the same address',
    ],
    answer: 1,
    explanation: 'The classic reentrancy attack: Contract A sends ETH to Contract B, B\'s receive function calls back into A\'s withdraw function before A updates its balance. A still shows the old balance, so it sends ETH again, repeating until drained. The 2016 DAO hack ($60M) exploited this. Prevention: use checks-effects-interactions pattern (update state before external calls), ReentrancyGuard mutex, or pull-over-push payments.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'Why is formal verification important for smart contracts?',
    options: [
      'It makes contracts run faster on the EVM',
      'Smart contracts are immutable and handle real value — formal verification mathematically proves that code behaves according to its specification, catching bugs that testing alone might miss',
      'It is required by Ethereum protocol rules',
      'It verifies that the contract creator\'s identity is real',
    ],
    answer: 1,
    explanation: 'Unlike traditional software, deployed smart contracts cannot be patched (without proxy patterns). Bugs can lose millions irreversibly. Formal verification uses mathematical proofs (SMT solvers, symbolic execution) to verify properties like "total supply never exceeds X" or "only owner can withdraw." Tools: Certora Prover, Slither (static analysis), Mythril (symbolic execution), Echidna (fuzzing). Major DeFi protocols require audits + formal verification.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'How do proxy patterns enable smart contract upgrades?',
    options: [
      'By redeploying the contract to the same address',
      'A proxy contract delegates all calls to an implementation contract via delegatecall; upgrading means pointing the proxy to a new implementation while preserving storage and address',
      'By forking the blockchain to change the contract code',
      'By using a time-lock to gradually replace contract bytes',
    ],
    answer: 1,
    explanation: 'The proxy pattern separates storage (in the proxy) from logic (in the implementation). The proxy uses delegatecall to execute the implementation\'s code in the proxy\'s storage context. Upgrading means the admin changes which implementation the proxy points to. UUPS and Transparent Proxy are common patterns. OpenZeppelin provides audited implementations. Upgradability introduces trust assumptions — the admin can change logic arbitrarily unless governance or timelocks are added.',
  },

  // Chapter 7: DeFi
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'How do Automated Market Makers (AMMs) like Uniswap work?',
    options: [
      'They match buy and sell orders from a centralized order book',
      'Liquidity providers deposit token pairs into pools; the AMM uses a mathematical formula (x*y=k) to price trades based on pool ratios, with no order book or counterparty needed',
      'They use AI to predict optimal trade prices',
      'They aggregate prices from centralized exchanges',
    ],
    answer: 1,
    explanation: 'Uniswap\'s constant product formula (x*y=k) prices assets based on pool reserves. Buying token A reduces its supply in the pool, increasing its price. Larger trades relative to pool size create more slippage. Liquidity providers earn trading fees (0.3%) but face impermanent loss if token prices diverge. Uniswap V3 added concentrated liquidity — LPs choose price ranges for capital efficiency.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'What is a flash loan and why is it unique to DeFi?',
    options: [
      'A very fast traditional bank loan',
      'An uncollateralized loan that must be borrowed and repaid within a single transaction — if not repaid, the entire transaction reverts as if it never happened',
      'A small personal loan with low interest rates',
      'A loan backed by NFT collateral',
    ],
    answer: 1,
    explanation: 'Flash loans exploit atomic transactions: borrow millions, use the funds (arbitrage, liquidation, collateral swap), and repay — all in one transaction. If repayment fails, the entire transaction reverts. This requires zero collateral because the protocol is guaranteed repayment within the transaction. Flash loans enable complex DeFi strategies but have also been used in attacks (oracle manipulation, governance exploits).',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'What is impermanent loss in liquidity provision?',
    options: [
      'A permanent loss of deposited tokens',
      'The opportunity cost of providing liquidity vs simply holding — when token prices diverge from deposit ratios, the LP position is worth less than holding would have been, but the loss is "impermanent" because it reverses if prices return',
      'The loss caused by high gas fees on deposits',
      'The loss from smart contract exploits',
    ],
    answer: 1,
    explanation: 'When you provide liquidity to a 50/50 ETH/USDC pool and ETH doubles in price, arbitrageurs rebalance the pool — you end up with more USDC and less ETH than if you simply held. The difference is impermanent loss. It\'s called "impermanent" because if ETH returns to the original price, the loss disappears. Trading fees earned may offset the IL, but significant price divergence can make LPing unprofitable.',
  },

  // Chapter 8: NFTs & Digital Ownership
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'Where is the actual content (image, video) of an NFT typically stored?',
    options: [
      'Directly on the Ethereum blockchain',
      'Off-chain on IPFS or Arweave, with only the metadata URI and content hash stored on-chain — storing large files on-chain would be prohibitively expensive',
      'In the NFT marketplace\'s central servers',
      'In the buyer\'s browser cache',
    ],
    answer: 1,
    explanation: 'On-chain storage costs ~$20,000 per MB on Ethereum. NFTs typically store a tokenURI pointing to a JSON metadata file on IPFS (content-addressed, decentralized) or Arweave (permanent storage). The metadata contains the image URL, attributes, and description. The risk: if metadata is on a centralized server, it can disappear. IPFS pinning services (Pinata, Infura) and Arweave provide more durable storage.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'How do on-chain royalties work for NFT creators?',
    options: [
      'They are automatically enforced by the blockchain protocol',
      'ERC-2981 defines a royalty standard, but enforcement depends on marketplace cooperation — marketplaces can choose to honor or bypass royalty payments',
      'Smart contracts automatically transfer royalties on every sale',
      'Royalties are paid through a centralized payment processor',
    ],
    answer: 1,
    explanation: 'ERC-2981 provides a standard royaltyInfo() function that returns the royalty recipient and amount. However, it\'s just information — enforcement requires marketplaces to query and honor it. Many marketplaces initially ignored royalties for competitive advantage. Operator filter registries (OpenSea\'s approach) block sales on non-royalty-enforcing platforms but are controversial. True on-chain enforcement remains an unsolved problem.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'What does owning an NFT actually mean legally?',
    options: [
      'You own the copyright to the underlying artwork',
      'You own the token on the blockchain, but intellectual property rights depend entirely on the creator\'s license terms — most NFTs do not transfer copyright',
      'You own exclusive rights to display the image anywhere',
      'You own the smart contract that created the NFT',
    ],
    answer: 1,
    explanation: 'Buying an NFT transfers token ownership on the blockchain, not copyright. The creator retains IP rights unless explicitly transferred via license. Some projects (CC0 like Nouns) waive all rights. Others (Bored Apes) grant commercial rights to holders. Most NFTs give only a personal display license. The legal landscape is evolving and varies by jurisdiction. Always read the specific project\'s terms.',
  },

  // Chapter 9: DAOs & Governance
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'What is a DAO and how does it differ from a traditional organization?',
    options: [
      'A DAO is a type of cryptocurrency exchange',
      'A Decentralized Autonomous Organization where rules are encoded in smart contracts, governance happens through token-holder voting, and treasury is managed on-chain — no CEO, board, or traditional hierarchy',
      'A DAO is a decentralized data storage system',
      'A DAO is an automated trading bot',
    ],
    answer: 1,
    explanation: 'DAOs encode organizational rules in smart contracts. Members vote with governance tokens on proposals (treasury spending, parameter changes, partnerships). Execution is automatic or multi-sig. Benefits: transparent treasury, global participation, reduced agency problems. Challenges: voter apathy, plutocratic voting (more tokens = more power), slow decision-making, and legal ambiguity. Examples: MakerDAO, Uniswap DAO, ENS DAO.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'What is vote delegation in DAO governance?',
    options: [
      'Giving your tokens to another person permanently',
      'Assigning your voting power to a trusted representative (delegate) who votes on your behalf, while you retain token ownership and can reclaim delegation at any time',
      'Allowing multiple votes on a single proposal',
      'Creating proxy contracts that vote automatically',
    ],
    answer: 1,
    explanation: 'Delegation addresses voter apathy — most token holders don\'t vote on every proposal. You delegate to someone aligned with your interests who actively participates. You keep your tokens and can re-delegate or self-delegate anytime. Some DAOs (Optimism) use non-transferable "soulbound" governance to prevent vote-buying. Delegation creates a form of liquid democracy between direct and representative voting.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'What is a governance attack and how can DAOs prevent them?',
    options: [
      'A DDoS attack on the DAO website',
      'When an attacker acquires enough voting power (through flash loans, token purchases, or collusion) to pass malicious proposals — prevented by timelocks, quorum requirements, and voting escrows',
      'Hacking the smart contract code directly',
      'Spamming the DAO forum with fake proposals',
    ],
    answer: 1,
    explanation: 'Governance attacks exploit token-weighted voting: buy or flash-loan enough tokens, pass a proposal to drain the treasury, then dump. Defenses: timelocks (delay between vote passing and execution, allowing detection), minimum quorum (enough participation), vote escrow (lock tokens during voting period so flash loans don\'t work), and snapshot voting (voting power based on past block, not current). Beanstalk lost $182M to a flash loan governance attack in 2022.',
  },

  // Chapter 10: Layer 2 & Scaling
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'What is the difference between optimistic rollups and ZK rollups?',
    options: [
      'Optimistic rollups are faster, ZK rollups are more secure',
      'Optimistic rollups assume transactions are valid and use fraud proofs for disputes; ZK rollups generate cryptographic validity proofs that mathematically verify correctness — different trust and latency tradeoffs',
      'Optimistic rollups run on Ethereum, ZK rollups run on Bitcoin',
      'There is no difference; they are different names for the same technology',
    ],
    answer: 1,
    explanation: 'Optimistic rollups (Arbitrum, Optimism) post transaction data on-chain and assume validity. A 7-day challenge period allows anyone to submit a fraud proof if they detect invalidity. ZK rollups (zkSync, StarkNet, Polygon zkEVM) generate mathematical proofs (SNARKs/STARKs) that verify all transactions are valid. ZK provides faster finality (no challenge period) but proof generation is computationally expensive and ZK-compatible EVM development is harder.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'What is data availability and why is it critical for rollups?',
    options: [
      'Whether users can download the blockchain quickly',
      'The guarantee that transaction data is published and accessible so anyone can verify the rollup state and detect fraud — without it, rollup operators could commit invalid state transitions',
      'The availability of APIs for querying blockchain data',
      'How much storage space is available on each node',
    ],
    answer: 1,
    explanation: 'Rollups execute transactions off-chain but must publish the data on-chain (calldata/blobs on Ethereum) so anyone can reconstruct the state and verify correctness. If data is withheld, fraud proofs can\'t be generated (optimistic) or the state can\'t be independently verified. EIP-4844 (proto-danksharding) introduced "blobs" — cheaper temporary data storage for rollups, reducing L2 fees by 10-100x.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'How do state channels (like Lightning Network) differ from rollups?',
    options: [
      'State channels are more scalable than rollups',
      'State channels keep transactions entirely off-chain between participants and only settle on-chain when opening/closing; rollups batch many transactions and post data/proofs on-chain periodically',
      'State channels work on any blockchain, rollups only on Ethereum',
      'Rollups require participants to be online, state channels do not',
    ],
    answer: 1,
    explanation: 'State channels are best for repeated interactions between fixed participants (payment channels, gaming). Transactions are instant and free between openings/closings. Rollups are general-purpose — any participant can submit transactions, and the rollup processes them in batches. Channels require participants to be online (or hire watchtowers) to prevent fraud. Rollups don\'t have this requirement. Channels are more private; rollups provide more general smart contract support.',
  },

  // Chapter 11: Zero-Knowledge Proofs
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'What does a zero-knowledge proof allow a prover to demonstrate?',
    options: [
      'That they know a secret by revealing it securely',
      'That a statement is true without revealing any information beyond the truth of the statement itself — proving knowledge without disclosing the knowledge',
      'That a transaction was sent from a specific IP address',
      'That a blockchain has no invalid transactions',
    ],
    answer: 1,
    explanation: 'A ZK proof has three properties: completeness (an honest prover can convince the verifier), soundness (a dishonest prover cannot convince), and zero-knowledge (the verifier learns nothing beyond the statement\'s truth). Example: proving you\'re over 18 without revealing your birthdate, or proving a transaction is valid without revealing sender, receiver, or amount (Zcash).',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'What is the key difference between ZK-SNARKs and ZK-STARKs?',
    options: [
      'SNARKs are newer and more efficient than STARKs',
      'SNARKs require a trusted setup ceremony and use elliptic curve cryptography; STARKs need no trusted setup and are quantum-resistant but produce larger proofs',
      'STARKs only work on private blockchains',
      'SNARKs are open source and STARKs are proprietary',
    ],
    answer: 1,
    explanation: 'ZK-SNARKs (Succinct Non-interactive ARguments of Knowledge) produce small, fast-to-verify proofs but require a one-time trusted setup — if the setup is compromised, fake proofs could be generated. ZK-STARKs (Scalable Transparent ARguments of Knowledge) need no trusted setup (transparent), are quantum-resistant (use hash functions, not elliptic curves), but produce larger proofs (~100x bigger). STARKs are used by StarkNet; SNARKs by Zcash, zkSync.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'Beyond cryptocurrency, what are applications of zero-knowledge proofs?',
    options: [
      'ZK proofs are only useful for cryptocurrency privacy',
      'Identity verification without data exposure, verifiable computation (proving cloud computations are correct), private voting systems, and compliant financial audits without revealing individual transactions',
      'Faster database queries',
      'Better image compression algorithms',
    ],
    answer: 1,
    explanation: 'ZK proofs have broad applications: decentralized identity (prove credentials without revealing personal data — Worldcoin, Polygon ID), verifiable computation (prove a program executed correctly without re-running it), private voting (prove eligibility without revealing identity), supply chain verification (prove regulatory compliance without exposing trade secrets), and ML (prove a model produced a specific output without revealing model weights).',
  },

  // Chapter 12: Cross-Chain & Interoperability
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'What are the main risks of cross-chain bridges?',
    options: [
      'Bridges are completely safe because they use smart contracts',
      'Bridges are high-value targets — they custody locked assets on one chain while minting wrapped tokens on another, and bridge exploits (Wormhole $320M, Ronin $600M) represent the largest losses in DeFi history',
      'Bridges only risk losing transaction fees',
      'Bridges have no risks because they are decentralized',
    ],
    answer: 1,
    explanation: 'Bridges lock assets on chain A and mint representative tokens on chain B. This creates a honeypot: compromising the bridge validator set, smart contract, or key management lets an attacker mint unbacked tokens or steal locked funds. Ronin bridge ($624M, compromised validators), Wormhole ($320M, signature bypass), and Nomad ($190M, message verification bug) show bridges are the most dangerous smart contract category. Vitalik Buterin has argued that bridges\' security model is fundamentally fragile.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'What is the Inter-Blockchain Communication (IBC) protocol?',
    options: [
      'A messaging system between Ethereum L2s',
      'A standardized protocol for trustless communication between sovereign blockchains in the Cosmos ecosystem, using light client verification rather than trusted intermediaries',
      'A protocol for bridging Bitcoin to Ethereum',
      'An internet protocol for blockchain node discovery',
    ],
    answer: 1,
    explanation: 'IBC enables Cosmos SDK chains to transfer tokens and data trustlessly. Each chain runs a light client of the connected chain, verifying block headers and state proofs. Relayers pass packets between chains but are untrusted — they can\'t forge messages because light clients verify everything. This is more secure than multisig bridges because security comes from cryptographic verification, not trusted validators. IBC has processed billions in transfers with no exploits.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'What is an atomic swap?',
    options: [
      'A very fast token exchange on a centralized exchange',
      'A trustless exchange of tokens between two blockchains using Hash Time-Locked Contracts (HTLCs) — either both parties receive their tokens or neither does, with no intermediary',
      'A swap that happens in a single block',
      'A swap between NFTs on the same blockchain',
    ],
    answer: 1,
    explanation: 'Atomic swaps use HTLCs: Alice locks BTC with a hash lock (she knows the preimage). Bob locks ETH with the same hash lock. Alice claims Bob\'s ETH by revealing the preimage; Bob uses the revealed preimage to claim Alice\'s BTC. Time locks ensure that if either party fails to act, funds are returned. "Atomic" means the swap either completes entirely or not at all. Limitations: both chains must support hash locks, and parties must be online.',
  },

  // Chapter 13: Web3 Development
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'What is an RPC provider and why do dApps need them?',
    options: [
      'A code compiler for smart contracts',
      'A service (Alchemy, Infura, QuickNode) that provides API access to blockchain nodes, letting dApps read chain data and submit transactions without running their own full node',
      'A protocol for encrypting wallet communications',
      'A tool for testing smart contracts locally',
    ],
    answer: 1,
    explanation: 'Running an Ethereum full node requires significant resources (2TB+ storage, high bandwidth). RPC providers run nodes at scale and expose JSON-RPC APIs (eth_getBalance, eth_sendTransaction, etc.) so dApps can interact with the blockchain over HTTP/WebSocket. Most dApps use providers like Alchemy or Infura. The tradeoff: convenience vs centralization risk. If Infura goes down, many dApps break. Decentralized alternatives include Pocket Network.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'What is Hardhat and how does it help smart contract development?',
    options: [
      'A wallet application for managing cryptocurrencies',
      'A development environment for compiling, deploying, testing, and debugging Solidity smart contracts — featuring a local blockchain, console.log for Solidity, and a plugin ecosystem',
      'A blockchain explorer like Etherscan',
      'A smart contract auditing service',
    ],
    answer: 1,
    explanation: 'Hardhat provides a complete development environment: local Hardhat Network (EVM for testing with features like console.log in Solidity, stack traces, and mainnet forking), task runner for compilation and deployment scripts, and a plugin ecosystem (ethers.js integration, gas reporting, coverage). Foundry is a faster Rust-based alternative using Solidity for tests. Both support mainnet forking to test against production state.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'How does MetaMask inject into web pages to enable dApp interactions?',
    options: [
      'It runs a local blockchain server',
      'It injects a window.ethereum provider object into every page, exposing JSON-RPC methods for account access, transaction signing, and chain interaction — dApps request permissions through this API',
      'It intercepts all network requests and modifies them',
      'It creates a separate browser instance for blockchain interactions',
    ],
    answer: 1,
    explanation: 'MetaMask injects window.ethereum (an EIP-1193 provider) into every web page. dApps call ethereum.request({ method: "eth_requestAccounts" }) to connect, then use methods like eth_sendTransaction to request signatures. MetaMask prompts the user to approve. Private keys never leave MetaMask. EIP-6963 (Multi Injected Provider Discovery) standardizes detection of multiple wallet extensions. Libraries like viem, ethers.js, and wagmi abstract this interaction.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
