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
  { id: 2, title: 'Compression' },
  { id: 3, title: 'Error Correction' },
  { id: 4, title: 'Applications' },
];

export const topics: Topic[] = [
  // ─── Part 1: Foundations ───────────────────────────────────────────────
  {
    id: 1,
    title: 'Entropy & Information Content',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Entropy quantifies the average uncertainty or surprise in a random variable, forming the bedrock of information theory. It determines the minimum number of bits needed to represent messages from a source.',
    concepts: [
      {
        id: 'shannon-entropy',
        name: 'Shannon Entropy',
        description:
          'Shannon entropy H(X) measures the expected information content of a random variable X, expressed in bits when using base-2 logarithms.',
        keyPoints: [
          'Shannon entropy is defined as H(X) = -sum of p(x) * log2(p(x)) over all possible outcomes x. It represents the average number of bits required to optimally encode each symbol from the source.',
          'Entropy is maximized when all outcomes are equally likely. For a binary source, maximum entropy is 1 bit, achieved when both symbols have probability 0.5.',
          'Entropy is always non-negative and bounded above by log2(n) where n is the number of possible outcomes. A deterministic source with one certain outcome has zero entropy.',
          'Joint entropy H(X,Y) measures uncertainty over two variables together, and satisfies H(X,Y) <= H(X) + H(Y), with equality when X and Y are independent.',
          'Conditional entropy H(X|Y) represents the remaining uncertainty in X after observing Y. The chain rule states H(X,Y) = H(Y) + H(X|Y), decomposing joint uncertainty into sequential conditioning.',
        ],
        tradeoffs: [
          'Higher entropy means more bits per symbol are needed on average, but also implies greater unpredictability which is valuable in cryptography.',
          'Computing entropy requires knowing the true probability distribution, which in practice must be estimated from finite data, introducing estimation error.',
          'Entropy is a theoretical lower bound; practical codes may exceed this bound, especially for short message lengths.',
        ],
        realWorld: [
          'English text has roughly 1.0-1.5 bits of entropy per character (far below the 4.7 bits for 26 equally likely letters), which is why text compresses well.',
          'Password strength meters use entropy to estimate how many guesses an attacker would need to crack a password.',
          'In genetics, sequence entropy helps identify conserved regions in DNA where low entropy signals functional importance.',
        ],
      },
      {
        id: 'information-content',
        name: 'Self-Information',
        description:
          'Self-information (or surprisal) I(x) = -log2(p(x)) measures how surprising a single event is; rare events carry more information than common ones.',
        keyPoints: [
          'Self-information is inversely related to probability: an event with probability 1/1024 carries exactly 10 bits of information, while a certain event (p=1) carries 0 bits.',
          'Shannon entropy is simply the expected value of self-information over the source distribution: H(X) = E[I(X)]. This bridges the per-event and average perspectives.',
          'The logarithmic measure ensures information is additive for independent events. If two independent events occur, their combined information is the sum of their individual self-information values.',
          'The choice of logarithm base determines the unit: base 2 gives bits, base e gives nats, and base 10 gives hartleys (or bans). One nat equals approximately 1.443 bits.',
          'Self-information provides the theoretical justification for variable-length codes: symbols with high self-information (low probability) should receive longer codewords, while common symbols get shorter ones.',
        ],
        tradeoffs: [
          'Self-information describes single events, not average behavior. A source analysis requires looking at entropy rather than individual surprisal values.',
          'Very rare events yield very high self-information values, but allocating resources to encode them efficiently may not be worthwhile if they almost never occur.',
          'The concept assumes a known probability model; model mismatch leads to sub-optimal coding and cross-entropy overhead.',
        ],
        realWorld: [
          'Log-loss in machine learning is the average self-information of the true labels under the predicted distribution, directly connecting classification quality to information theory.',
          'In data compression, the ideal codeword length for a symbol equals its self-information, which Huffman and arithmetic coding approximate.',
          'Rare medical diagnoses carry high information content, which is why unexpected test results prompt more follow-up investigation than routine confirmations.',
        ],
      },
      {
        id: 'kl-divergence',
        name: 'KL Divergence & Cross-Entropy',
        description:
          'KL divergence measures how one probability distribution diverges from a reference distribution, while cross-entropy quantifies the average bits needed when using an imperfect model.',
        keyPoints: [
          'KL divergence D_KL(P||Q) = sum of p(x) * log2(p(x)/q(x)) measures the extra bits needed when encoding data from distribution P using a code optimized for distribution Q. It is always non-negative (Gibbs inequality).',
          'Cross-entropy H(P,Q) = H(P) + D_KL(P||Q) is the total average bits per symbol when using model Q to encode source P. Minimizing cross-entropy is equivalent to minimizing KL divergence when P is fixed.',
          'KL divergence is asymmetric: D_KL(P||Q) does not equal D_KL(Q||P) in general. The forward KL (P||Q) is mode-covering while the reverse KL (Q||P) is mode-seeking, leading to different fitting behaviors.',
          'Mutual information I(X;Y) can be expressed as the KL divergence between the joint distribution p(x,y) and the product of marginals p(x)p(y), measuring the information shared between two variables.',
          'In variational inference, the evidence lower bound (ELBO) is derived by bounding the KL divergence between an approximate posterior and the true posterior, making intractable Bayesian computations feasible.',
        ],
        tradeoffs: [
          'KL divergence is not a true metric (it violates symmetry and the triangle inequality), so it cannot be used directly as a distance in metric spaces.',
          'Cross-entropy loss is the standard training objective for classifiers, but it can overfit to noisy labels since it heavily penalizes confident wrong predictions.',
          'Forward KL tends to produce overdispersed approximations while reverse KL produces underdispersed ones; neither is universally better.',
        ],
        realWorld: [
          'Neural network classifiers are trained by minimizing cross-entropy loss, directly optimizing the model to approximate the true data distribution.',
          'A/B testing frameworks use KL divergence to measure how much user behavior distributions shift between control and treatment groups.',
          'Language model perplexity is 2^(cross-entropy), providing an interpretable measure of how well a model predicts text.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Source Coding Theorem',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Shannon\'s source coding theorem establishes that the entropy of a source is the fundamental limit on lossless data compression. No code can compress below the entropy rate without losing information.',
    concepts: [
      {
        id: 'source-coding-theorem',
        name: 'Shannon\'s Source Coding Theorem',
        description:
          'The source coding theorem states that the average codeword length of any uniquely decodable code must be at least H(X), and this bound is asymptotically achievable.',
        keyPoints: [
          'For a discrete memoryless source with entropy H(X), no lossless code can achieve an average length less than H(X) bits per symbol. This is a hard lower bound that holds for any coding scheme.',
          'The theorem guarantees existence: by coding blocks of n symbols together, the average per-symbol length can be driven arbitrarily close to H(X) as n grows, approaching the bound within 1/n bits.',
          'The proof relies on the asymptotic equipartition property (AEP): for large n, most probability mass concentrates on roughly 2^(nH) "typical" sequences, which can each be assigned codewords of length approximately nH.',
          'Prefix-free (instantaneous) codes pay at most 1 bit overhead per symbol above entropy: H(X) <= L < H(X) + 1, where L is the average codeword length.',
          'For sources with memory (like natural language), the relevant quantity is the entropy rate h = lim H(X1,...,Xn)/n, which accounts for statistical dependencies between symbols.',
        ],
        tradeoffs: [
          'Block coding approaches the entropy limit but introduces latency (must wait for the full block) and complexity that grows exponentially with block size.',
          'The theorem assumes perfect knowledge of source statistics; in practice, adaptive or universal codes are needed when the distribution is unknown.',
          'Achieving near-entropy compression for sources with complex dependencies requires sophisticated models, trading computation for compression efficiency.',
        ],
        realWorld: [
          'ZIP, gzip, and zstd all use algorithms whose compression ratios are benchmarked against the theoretical entropy of the source data.',
          'Audio codecs like FLAC achieve lossless compression by exploiting the low entropy rate of audio signals after predictive modeling removes redundancy.',
          'Database engines use entropy-based analysis to choose the most efficient encoding scheme for each column of data.',
        ],
      },
      {
        id: 'kraft-inequality',
        name: 'Kraft\'s Inequality',
        description:
          'Kraft\'s inequality provides the necessary and sufficient condition for the existence of a prefix-free binary code with a given set of codeword lengths.',
        keyPoints: [
          'Kraft\'s inequality states that for a prefix-free code with codeword lengths l1, l2, ..., ln, the sum of 2^(-li) must be at most 1. Conversely, if this condition holds, a prefix-free code with those lengths exists.',
          'The inequality extends to uniquely decodable codes via the McMillan inequality: any uniquely decodable code satisfies Kraft\'s inequality, so there is no advantage to using non-prefix codes in terms of achievable lengths.',
          'An optimal prefix code assigns length li = ceil(-log2(p(xi))) to symbol xi, yielding an average length within 1 bit of entropy. When probabilities are dyadic (negative powers of 2), the code achieves entropy exactly.',
          'Kraft\'s inequality can be visualized as partitioning the unit interval [0,1): each codeword of length l occupies an interval of size 2^(-l), and prefix-freeness requires these intervals to be disjoint.',
          'For D-ary codes (alphabet size D), Kraft\'s inequality generalizes to sum of D^(-li) <= 1, enabling the analysis of non-binary coding schemes used in some communication systems.',
        ],
        tradeoffs: [
          'Kraft-optimal integer codeword lengths can waste up to 1 bit per symbol compared to the true entropy; arithmetic coding avoids this by not restricting lengths to integers.',
          'Prefix-free codes allow instant decoding but require the encoder and decoder to agree on the code tree, adding overhead for the codebook.',
          'Shorter minimum codeword length means faster encoding of common symbols but longer codewords for rare symbols, which can cause variable processing time.',
        ],
        realWorld: [
          'UTF-8 encoding is a prefix-free code for Unicode: the leading bits of each byte determine how many bytes form a character, enabling instant decoding of text streams.',
          'Huffman trees are constructed to satisfy Kraft\'s inequality with equality, ensuring no wasted code space in the assignment.',
          'Network packet headers use prefix-free field encodings so routers can parse headers without needing to buffer the entire packet.',
        ],
      },
      {
        id: 'typical-sequences',
        name: 'Typical Sequences & AEP',
        description:
          'The Asymptotic Equipartition Property (AEP) shows that long sequences from a random source almost surely fall into a "typical set" of size approximately 2^(nH), enabling efficient compression.',
        keyPoints: [
          'A sequence x1,...,xn is epsilon-typical if its empirical entropy -(1/n)log2(p(x1,...,xn)) is within epsilon of the true entropy H(X). The AEP guarantees that the probability of being typical approaches 1 as n grows.',
          'The typical set contains approximately 2^(nH) sequences, far fewer than the total 2^(nlog2|A|) possible sequences when H < log2|A|. This concentration is the fundamental reason compression is possible.',
          'Each typical sequence has probability approximately 2^(-nH), so they are roughly equiprobable. This near-uniformity within the typical set simplifies both analysis and code design.',
          'By encoding only typical sequences with codewords of length nH + O(1) bits and using a special escape code for atypical sequences (which occur with vanishing probability), one achieves near-entropy compression.',
          'The strong AEP (Shannon-McMillan-Breiman theorem) extends to stationary ergodic sources, not just i.i.d. sources, covering important practical cases like natural language text.',
        ],
        tradeoffs: [
          'The AEP is an asymptotic result; for finite block lengths, the typical set boundaries are fuzzy and the compression penalty can be significant.',
          'Identifying and enumerating typical sequences requires knowledge of the source distribution, which must be estimated in practice.',
          'Larger block sizes give tighter concentration around entropy but require exponentially more memory for codebook storage and longer encoding/decoding latency.',
        ],
        realWorld: [
          'Video streaming services rely on the AEP principle: most video frames fall into predictable patterns (typical sequences), enabling reliable compression at rates near the source entropy.',
          'Random number generators are tested by checking whether output sequences fall in the typical set for a uniform distribution, as atypical sequences suggest bias.',
          'In statistical mechanics, the typical set corresponds to the set of microstates that dominate the partition function, connecting information theory to thermodynamic entropy.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Mutual Information & Channel Capacity',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Mutual information measures the information shared between input and output of a channel, while channel capacity defines the maximum rate at which information can be reliably transmitted.',
    concepts: [
      {
        id: 'mutual-information',
        name: 'Mutual Information',
        description:
          'Mutual information I(X;Y) quantifies how much knowing one variable reduces uncertainty about another, serving as a symmetric measure of statistical dependence.',
        keyPoints: [
          'Mutual information is defined as I(X;Y) = H(X) - H(X|Y) = H(Y) - H(Y|X) = H(X) + H(Y) - H(X,Y). It equals zero if and only if X and Y are independent.',
          'Unlike correlation, mutual information captures all forms of statistical dependence including nonlinear relationships. It is invariant under invertible transformations of the variables.',
          'The data processing inequality states that for a Markov chain X -> Y -> Z, I(X;Z) <= I(X;Y). Processing data cannot create new information about the source; it can only preserve or destroy it.',
          'Conditional mutual information I(X;Y|Z) measures the information X and Y share given knowledge of Z. The chain rule for mutual information decomposes I(X;Y1,Y2) = I(X;Y1) + I(X;Y2|Y1).',
          'For continuous random variables, mutual information is defined using differential entropy and can be infinite, unlike in the discrete case where it is bounded by min(H(X), H(Y)).',
        ],
        tradeoffs: [
          'Estimating mutual information from finite samples is notoriously difficult, especially in high dimensions, requiring careful choice of estimator (KDE, kNN, or neural).',
          'Mutual information does not indicate the direction or functional form of dependence, only its magnitude.',
          'Computational cost of exact mutual information grows with the size of the variable alphabets; approximate methods are needed for large or continuous domains.',
        ],
        realWorld: [
          'Feature selection algorithms use mutual information to identify which input features carry the most information about the target variable, avoiding redundant features.',
          'Independent Component Analysis (ICA) minimizes mutual information between output channels to separate mixed signals, such as isolating individual speakers from a recording.',
          'In neuroscience, mutual information between stimulus and neural response quantifies how much information neurons encode about sensory inputs.',
        ],
      },
      {
        id: 'channel-capacity-def',
        name: 'Channel Capacity',
        description:
          'Channel capacity C = max I(X;Y) over all input distributions is the supremum of rates at which information can be transmitted with arbitrarily low error probability.',
        keyPoints: [
          'For a discrete memoryless channel (DMC) defined by transition probabilities p(y|x), the capacity C = max_{p(x)} I(X;Y) is achieved by optimizing the input distribution. The Blahut-Arimoto algorithm computes this numerically.',
          'The noisy channel coding theorem proves that for any rate R < C, there exist codes with block length n such that the probability of decoding error decreases exponentially in n. Conversely, rates above C guarantee errors.',
          'For the binary symmetric channel (BSC) with crossover probability p, the capacity is C = 1 - H(p) bits per channel use, where H(p) = -p*log2(p) - (1-p)*log2(1-p).',
          'For the additive white Gaussian noise (AWGN) channel, the Shannon-Hartley theorem gives C = B * log2(1 + S/N), where B is bandwidth and S/N is the signal-to-noise ratio.',
          'Channel capacity is an operational quantity: it represents the tightest boundary between achievable and non-achievable reliable communication rates, independent of the specific coding scheme.',
        ],
        tradeoffs: [
          'Achieving capacity requires codes with very long block lengths and correspondingly high encoding/decoding complexity, which may be impractical for latency-sensitive applications.',
          'The capacity formula assumes perfect channel state information at the receiver; partial or no CSI reduces the effective capacity.',
          'Capacity-achieving input distributions may not be uniform, adding complexity to transmitter design especially for channels with input constraints.',
        ],
        realWorld: [
          'Wi-Fi and cellular standards (802.11ax, 5G NR) use adaptive modulation and coding to operate as close to channel capacity as possible under varying SNR conditions.',
          'Deep-space communication (e.g., NASA\'s DSN) operates near the Shannon limit using turbo and LDPC codes to maximize data return from distant spacecraft.',
          'Fiber-optic communication systems are approaching the nonlinear Shannon limit, driving research into new modulation formats and spatial multiplexing.',
        ],
      },
      {
        id: 'channel-coding-theorem',
        name: 'Channel Coding Theorem',
        description:
          'Shannon\'s channel coding theorem guarantees that reliable communication is possible at any rate below channel capacity, and impossible above it.',
        keyPoints: [
          'The achievability proof uses random coding: a random codebook of 2^(nR) codewords of length n, combined with joint typicality decoding, achieves vanishing error probability for R < C as n grows.',
          'The converse (weak converse) shows that for R > C, the error probability is bounded away from zero. The strong converse strengthens this to show the error probability approaches 1.',
          'The error exponent E(R) characterizes how fast the error probability decreases with block length n: P_error approximately equals 2^(-nE(R)). The sphere-packing bound and random coding bound bracket E(R).',
          'Feedback does not increase the capacity of a discrete memoryless channel (Shannon\'s feedback theorem), though it can simplify coding schemes and improve error exponents.',
          'For channels with memory, the capacity may be computed using the mutual information rate, and coding theorems extend to ergodic channels via information-spectrum methods.',
        ],
        tradeoffs: [
          'Random codes achieve capacity but are impractical due to exponential codebook size and decoding complexity. Structured codes (LDPC, polar, turbo) trade slight rate loss for practical encoding/decoding.',
          'Longer block lengths improve reliability but increase latency and memory requirements, creating a tension between performance and real-time constraints.',
          'The theorem assumes infinite block lengths; finite-length performance analysis requires more nuanced tools like normal approximation bounds and dispersion analysis.',
        ],
        realWorld: [
          'Modern 5G New Radio uses LDPC codes for the data channel and polar codes for the control channel, both approaching the Shannon limit with practical complexity.',
          'Satellite TV (DVB-S2) employs iteratively decoded LDPC codes that operate within 0.7 dB of the Shannon limit at typical operating points.',
          'Undersea cable systems use soft-decision forward error correction codes achieving spectral efficiencies very close to the channel capacity of the optical fiber.',
        ],
      },
    ],
  },

  // ─── Part 2: Compression ──────────────────────────────────────────────
  {
    id: 4,
    title: 'Huffman Coding',
    part: 2,
    partTitle: 'Compression',
    summary:
      'Huffman coding constructs an optimal prefix-free binary code for a known probability distribution, assigning shorter codewords to more probable symbols.',
    concepts: [
      {
        id: 'huffman-algorithm',
        name: 'Huffman Algorithm',
        description:
          'The Huffman algorithm builds an optimal prefix-free code by repeatedly merging the two least-probable symbols into a combined node, constructing a binary tree from the bottom up.',
        keyPoints: [
          'The algorithm starts with n leaf nodes (one per symbol) sorted by probability, then iteratively combines the two lowest-probability nodes into a parent whose probability is their sum, continuing until a single root remains.',
          'Huffman codes are optimal among all prefix-free codes for a given distribution: no other prefix code achieves a lower average codeword length. The average length L satisfies H(X) <= L < H(X) + 1.',
          'The resulting code tree may not be unique when multiple nodes share the same probability, but all valid Huffman trees for the same distribution yield the same average codeword length.',
          'Canonical Huffman codes standardize the tree by sorting codewords first by length, then lexicographically. This allows the codebook to be transmitted compactly using only the codeword lengths.',
          'Extended Huffman coding encodes blocks of k symbols together, reducing the per-symbol overhead from at most 1 bit to at most 1/k bits above entropy, at the cost of an exponentially larger alphabet.',
        ],
        tradeoffs: [
          'Huffman coding is optimal only for integer-length codes; when symbol probabilities are not powers of 1/2, arithmetic coding achieves better compression by effectively using fractional bit lengths.',
          'The codebook must be stored or transmitted alongside the data, creating overhead that is significant for small files but negligible for large ones.',
          'Static Huffman coding requires two passes over the data (one to compute frequencies, one to encode), while adaptive Huffman coding uses one pass but has higher per-symbol computational cost.',
        ],
        realWorld: [
          'DEFLATE, the algorithm behind ZIP and gzip, uses Huffman coding as its final stage after LZ77 dictionary matching to encode the output symbols and distances.',
          'JPEG uses Huffman coding (or optionally arithmetic coding) to encode the quantized DCT coefficients, with separate Huffman tables for DC and AC components.',
          'Fax machines (Group 3/4) use modified Huffman coding to compress the run lengths of black and white pixels in scanned documents.',
        ],
      },
      {
        id: 'adaptive-huffman',
        name: 'Adaptive Huffman Coding',
        description:
          'Adaptive Huffman coding updates the code tree dynamically as symbols are processed, eliminating the need for a pre-computed frequency table.',
        keyPoints: [
          'The FGK (Faller-Gallager-Knuth) algorithm maintains the sibling property: nodes are ordered by weight so that each node\'s weight is less than or equal to the next node in the ordering, ensuring the tree remains a valid Huffman tree.',
          'When a new symbol is encountered, a special NYT (Not Yet Transmitted) escape code signals the decoder, followed by the symbol in a fixed-length encoding. The tree is then updated to include the new symbol.',
          'After encoding each symbol, the tree is updated by incrementing the symbol\'s weight and potentially swapping nodes to maintain the sibling property, then propagating weight updates up to the root.',
          'Vitter\'s algorithm improves on FGK by maintaining a stronger invariant that minimizes the maximum codeword length at each step, resulting in better worst-case performance per symbol.',
          'Adaptive Huffman converges to the optimal static Huffman code as the number of processed symbols grows, since the accumulated frequencies approach the true distribution.',
        ],
        tradeoffs: [
          'Single-pass encoding/decoding is convenient for streaming but makes the code sensitive to the order in which symbols appear, especially early in the stream.',
          'Tree update operations (swapping nodes, recomputing weights) add O(L) time per symbol where L is the current codeword length, increasing computational overhead.',
          'Adaptive Huffman is less popular than adaptive arithmetic coding because arithmetic coding adapts more naturally and achieves better compression on non-dyadic distributions.',
        ],
        realWorld: [
          'Early modem protocols (V.42bis) used adaptive Huffman coding for real-time data compression over telephone lines where two-pass approaches were impractical.',
          'Some embedded systems use adaptive Huffman coding for compressing sensor telemetry streams where memory is too limited to store a full static codebook.',
          'The Unix "compact" utility historically used adaptive Huffman coding for file compression before being superseded by gzip and bzip2.',
        ],
      },
      {
        id: 'huffman-optimality',
        name: 'Optimality & Limitations',
        description:
          'Huffman codes are provably optimal among prefix codes with symbol-by-symbol encoding, but this optimality has precise boundaries and known limitations.',
        keyPoints: [
          'Huffman coding achieves the minimum possible average codeword length among all prefix-free codes for a given probability distribution. The proof proceeds by induction on the alphabet size, using the structure of the bottom-up construction.',
          'The redundancy (average length minus entropy) of a Huffman code is bounded above by p_max + 0.086, where p_max is the probability of the most likely symbol. For highly skewed distributions, redundancy can approach 1 bit.',
          'When the most probable symbol has probability greater than 0.5, Huffman coding assigns it a 1-bit codeword, but the optimal fractional length would be less than 1 bit, creating unavoidable waste.',
          'Huffman codes are not optimal for sources with memory because they encode each symbol independently. To exploit inter-symbol correlations, the source must first be decorrelated (e.g., via prediction or context modeling).',
          'For alphabets with very many symbols, the Huffman tree becomes deep, leading to long maximum codeword lengths. Length-limited Huffman codes (e.g., the Package-Merge algorithm) constrain the maximum length at a small cost in optimality.',
        ],
        tradeoffs: [
          'Symbol-by-symbol optimality does not imply stream optimality; arithmetic coding outperforms Huffman on most real-world data because it effectively assigns fractional bit lengths.',
          'Length-limited Huffman codes sacrifice a small amount of compression efficiency to enable faster table-based decoding with fixed-width lookup tables.',
          'Blocking symbols to reduce per-symbol overhead exponentially increases the alphabet size and codebook storage, creating a space-time tradeoff.',
        ],
        realWorld: [
          'PNG uses deflate (Huffman + LZ77) rather than arithmetic coding partly because Huffman decoding is simpler and faster, and the compression loss is minimal for image data.',
          'HTTP/2 header compression (HPACK) uses a static Huffman code derived from web traffic statistics, chosen for its decoding speed in high-throughput web servers.',
          'Bluetooth Low Energy uses simple Huffman-like codes for packet headers to minimize transmission time and energy consumption on constrained devices.',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Arithmetic & Lempel-Ziv Coding',
    part: 2,
    partTitle: 'Compression',
    summary:
      'Arithmetic coding encodes an entire message as a single number in [0,1), achieving near-entropy compression, while Lempel-Ziv algorithms provide universal compression without requiring prior knowledge of the source distribution.',
    concepts: [
      {
        id: 'arithmetic-coding',
        name: 'Arithmetic Coding',
        description:
          'Arithmetic coding represents a sequence of symbols as a single fractional number within a progressively narrowed interval, achieving compression rates that approach entropy without the integer-length constraint of Huffman codes.',
        keyPoints: [
          'The encoder maintains an interval [low, high) initialized to [0, 1). For each symbol, the interval is subdivided proportionally to symbol probabilities, and the sub-interval corresponding to the current symbol becomes the new working interval.',
          'After encoding all symbols, any number within the final interval serves as the compressed representation. The number of bits needed is approximately -log2(width of final interval), which equals the sum of self-information values.',
          'Arithmetic coding achieves compression within 2 bits of the theoretical entropy for the entire message, regardless of message length. Per-symbol overhead vanishes as the message grows, unlike Huffman\'s per-symbol ceiling.',
          'Practical implementations use finite-precision arithmetic (typically 32 or 64 bits) with renormalization: when the interval is contained within [0, 0.5) or [0.5, 1), output bits and rescale to avoid underflow.',
          'Arithmetic coding naturally handles adaptive probability models by updating symbol probabilities between each encoding step, making it well-suited for context-based compression.',
        ],
        tradeoffs: [
          'Arithmetic coding is computationally more expensive than Huffman coding due to the multiplication operations required for interval subdivision at each step.',
          'A single bit error in the compressed stream can corrupt the entire remainder of the decoded output since all subsequent interval calculations depend on previous ones.',
          'Patent restrictions historically limited arithmetic coding adoption (IBM and AT&T patents until the 2000s), though these have now expired.',
        ],
        realWorld: [
          'H.265/HEVC video codec uses Context-Adaptive Binary Arithmetic Coding (CABAC) as its sole entropy coding method, achieving 10-15% better compression than CABAC in H.264.',
          'The PAQ family of compressors uses arithmetic coding with sophisticated context mixing to achieve the best known compression ratios on most benchmarks.',
          'JPEG 2000 uses an arithmetic coder (MQ coder) for its final entropy coding stage, contributing to its superior compression over baseline JPEG.',
        ],
      },
      {
        id: 'lz77-lz78',
        name: 'Lempel-Ziv Coding (LZ77 & LZ78)',
        description:
          'Lempel-Ziv algorithms achieve universal compression by replacing repeated patterns with references to earlier occurrences, building a dictionary adaptively from the data itself.',
        keyPoints: [
          'LZ77 uses a sliding window approach: it encodes each new segment as a (distance, length, next symbol) triple referencing a match within a fixed-size window of recently seen data. Longer matches yield better compression.',
          'LZ78 builds an explicit dictionary of phrases: each new entry extends an existing dictionary phrase by one symbol. The dictionary grows incrementally, with entries referenced by their index number.',
          'LZW (Lempel-Ziv-Welch) is a practical variant of LZ78 that initializes the dictionary with all single-character entries and outputs only dictionary indices, eliminating the explicit next-symbol field.',
          'Lempel-Ziv algorithms are universal: for any stationary ergodic source, the compression ratio converges to the entropy rate as the input length grows, without requiring knowledge of the source statistics.',
          'The sliding window size in LZ77 (and dictionary size in LZ78) controls a tradeoff between compression quality and memory usage. Modern variants like zstd use large windows (up to 128 MB) with hash-table-based match finding.',
        ],
        tradeoffs: [
          'LZ77 decompression is very fast (just copying from a buffer) but compression can be slow due to the match-finding search, especially with large windows.',
          'LZ78/LZW can require unbounded dictionary growth; practical implementations reset or prune the dictionary periodically, causing compression ratio fluctuations.',
          'Lempel-Ziv methods work best on data with repeated patterns; they perform poorly on high-entropy data like encrypted or already-compressed files.',
        ],
        realWorld: [
          'gzip and DEFLATE use LZ77 followed by Huffman coding, forming the compression backbone of the web (HTTP content encoding) and file archiving (ZIP format).',
          'The GIF image format uses LZW compression, which was historically subject to Unisys patent restrictions that drove the development of the patent-free PNG format.',
          'Facebook\'s Zstandard (zstd) compressor uses an LZ77-family algorithm with finite-state entropy coding, offering better compression and speed than gzip at all compression levels.',
        ],
      },
      {
        id: 'context-mixing',
        name: 'Context Mixing & PPM',
        description:
          'Context-based methods use preceding symbols to predict the next symbol\'s probability, with PPM (Prediction by Partial Matching) and context mixing achieving compression rates very close to the source entropy rate.',
        keyPoints: [
          'PPM maintains probability models for contexts of varying lengths (up to order k) and blends their predictions using escape mechanisms. Higher-order contexts capture longer dependencies but require more memory.',
          'When a symbol has not been seen in a context of length k, PPM "escapes" to a shorter context of length k-1, using methods like PPMA, PPMB, PPMC, and PPMD that differ in how they estimate escape probabilities.',
          'Context mixing combines predictions from multiple models (including different context lengths, word-level models, and specialized models) using weighted averaging or neural network-based mixing.',
          'The PAQ compressor uses thousands of context models and a neural network to adaptively weight their predictions, achieving state-of-the-art compression at the cost of very slow encoding and decoding.',
          'Context tree weighting (CTW) provides a principled Bayesian approach: it computes the weighted mixture over all context tree models up to a maximum depth, achieving minimax optimal redundancy rates.',
        ],
        tradeoffs: [
          'Higher-order context models provide better predictions but require exponentially more memory and take longer to accumulate reliable statistics.',
          'Context mixing achieves the best compression ratios known but is orders of magnitude slower than LZ-based methods, making it impractical for most real-time applications.',
          'PPM methods struggle with non-stationary sources where the statistical properties change over time, requiring forgetting mechanisms or windowed estimation.',
        ],
        realWorld: [
          'The PPMD algorithm is used in the 7-Zip archiver as one of its compression methods, offering excellent compression for text files at reasonable speed.',
          'CMIX, the current champion in compression benchmarks (Hutter Prize, Large Text Compression Benchmark), uses context mixing with over 600 component models.',
          'Predictive text input on smartphones uses context models conceptually similar to PPM to estimate the probability of the next word given the preceding context.',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Lossy Compression (DCT, Wavelets)',
    part: 2,
    partTitle: 'Compression',
    summary:
      'Lossy compression sacrifices exact reconstruction for dramatically higher compression ratios, using transforms like the DCT and wavelets to concentrate energy into a few significant coefficients that can be coarsely quantized.',
    concepts: [
      {
        id: 'rate-distortion',
        name: 'Rate-Distortion Theory',
        description:
          'Rate-distortion theory establishes the fundamental tradeoff between compression rate and reconstruction fidelity, defining the minimum bit rate needed to achieve a given distortion level.',
        keyPoints: [
          'The rate-distortion function R(D) = min I(X;X_hat) over all conditional distributions p(x_hat|x) satisfying E[d(X,X_hat)] <= D gives the minimum achievable rate for distortion level D. It is a convex, non-increasing function.',
          'For a Gaussian source with mean-squared error distortion, R(D) = (1/2)log2(sigma^2/D) for D <= sigma^2, meaning each halving of the distortion budget costs one additional bit per sample.',
          'The reverse water-filling solution for parallel Gaussian sources allocates bits preferentially to components with higher variance, ignoring components whose variance falls below a threshold determined by the distortion target.',
          'Shannon\'s lossy source coding theorem proves that for any rate above R(D), there exist codes achieving distortion D with high probability as block length grows. Rates below R(D) cannot achieve distortion D.',
          'Perceptual distortion measures (like SSIM or perceptual loss) differ from MSE, leading to different rate-distortion tradeoffs. Rate-distortion theory applies to any distortion measure, but computing R(D) is harder for non-MSE measures.',
        ],
        tradeoffs: [
          'MSE-optimal compression may look worse to humans than perceptually-optimized compression at the same rate, because the eye is more sensitive to some types of distortion than others.',
          'Computing the rate-distortion function analytically is only feasible for simple source models; for complex sources, it must be estimated numerically or bounded.',
          'Approaching the rate-distortion bound requires long block lengths and high-dimensional vector quantization, which is computationally expensive.',
        ],
        realWorld: [
          'Video streaming services (Netflix, YouTube) use rate-distortion optimization to decide how many bits to allocate to each frame, scene, or region based on content complexity.',
          'Medical imaging standards specify maximum acceptable distortion levels, and rate-distortion theory guides the design of codecs that meet these requirements at minimum file size.',
          'Machine learning model compression (quantization, pruning) can be analyzed through rate-distortion theory, trading model size for prediction accuracy.',
        ],
      },
      {
        id: 'dct-compression',
        name: 'Discrete Cosine Transform (DCT)',
        description:
          'The DCT converts spatial-domain signals into frequency-domain coefficients, concentrating most of the signal energy into a few low-frequency components that can be efficiently quantized and coded.',
        keyPoints: [
          'The Type-II DCT transforms a block of N samples into N frequency coefficients. For typical images, most energy concentrates in the low-frequency coefficients (top-left corner of the 8x8 block), allowing high-frequency coefficients to be quantized coarsely or zeroed.',
          'JPEG divides images into 8x8 pixel blocks, applies the DCT to each block independently, quantizes coefficients using a quality-dependent quantization matrix, then entropy-codes the results using zigzag scanning and run-length encoding.',
          'The DCT is preferred over the DFT for compression because it uses only real-valued cosine basis functions and produces better energy compaction with fewer artifacts at block boundaries.',
          'Quantization is the lossy step: each DCT coefficient is divided by a quantization step size and rounded to the nearest integer. Larger step sizes mean more compression but more visible artifacts (blocking, ringing).',
          'The modified DCT (MDCT) uses overlapping windows and is the basis of audio codecs (MP3, AAC, Vorbis). The 50% overlap between adjacent blocks eliminates blocking artifacts through the time-domain aliasing cancellation property.',
        ],
        tradeoffs: [
          'Block-based DCT introduces blocking artifacts at low bitrates because each 8x8 block is processed independently, leading to visible discontinuities at block boundaries.',
          'The fixed 8x8 block size in JPEG is a compromise: larger blocks give better energy compaction but worse locality and higher computational cost.',
          'DCT-based compression is well-suited to smoothly varying signals but performs poorly on images with sharp edges, where Gibbs-like ringing artifacts appear.',
        ],
        realWorld: [
          'JPEG is the most widely used image format on the web, using the DCT to achieve typical compression ratios of 10:1 to 20:1 with acceptable visual quality.',
          'H.264/AVC uses a 4x4 integer DCT variant that avoids floating-point rounding mismatches between encoder and decoder, ensuring bit-exact reconstruction.',
          'MP3 and AAC audio codecs use the MDCT to transform audio into frequency bands, then apply psychoacoustic masking models to determine which coefficients can be quantized most aggressively.',
        ],
      },
      {
        id: 'wavelet-compression',
        name: 'Wavelet Transform Compression',
        description:
          'Wavelet transforms provide multi-resolution analysis, decomposing signals into components at different scales and locations, enabling superior compression with fewer artifacts than block-based DCT methods.',
        keyPoints: [
          'The discrete wavelet transform (DWT) applies a pair of lowpass and highpass filters followed by downsampling, recursively decomposing the signal into approximation and detail subbands at progressively coarser scales.',
          'Unlike the block DCT, the DWT operates on the entire image at once, avoiding blocking artifacts. It produces subbands (LL, LH, HL, HH) that separate horizontal, vertical, and diagonal details from the smooth approximation.',
          'Embedded zerotree wavelet (EZW) and SPIHT (Set Partitioning in Hierarchical Trees) exploit the parent-child relationships across wavelet subbands: if a parent coefficient is insignificant, its children are likely insignificant too.',
          'JPEG 2000 uses the Cohen-Daubechies-Feauveau 9/7 wavelet for lossy compression and the 5/3 wavelet for lossless compression, combined with EBCOT (Embedded Block Coding with Optimized Truncation) for entropy coding.',
          'Wavelet compression naturally supports progressive transmission: transmitting coefficients from coarse to fine scales produces increasingly detailed reconstructions, useful for image browsing over slow connections.',
        ],
        tradeoffs: [
          'Wavelet-based codecs are more complex to implement than DCT-based ones and have higher computational requirements, especially for the arithmetic coding stage.',
          'Despite technical superiority at low bitrates, JPEG 2000 never displaced JPEG for consumer photography due to lack of browser support, higher complexity, and entrenched ecosystem.',
          'The choice of wavelet filter affects both compression performance and artifact characteristics; no single wavelet is optimal for all image types.',
        ],
        realWorld: [
          'JPEG 2000 is mandated for digital cinema (DCI standard), archival imaging (ISO 15444), and medical imaging (DICOM) where its superior quality at low bitrates justifies the computational cost.',
          'The FBI uses wavelet-based compression (WSQ format) for fingerprint image storage, achieving 15:1 compression while preserving ridge detail for identification.',
          'Google\'s WebP lossy mode uses a block-based approach, but AV1/AVIF (its successor) incorporates wavelet-like directional transforms for better compression of natural images.',
        ],
      },
    ],
  },

  // ─── Part 3: Error Correction ─────────────────────────────────────────
  {
    id: 7,
    title: 'Hamming Codes',
    part: 3,
    partTitle: 'Error Correction',
    summary:
      'Hamming codes are linear error-correcting codes that can detect up to 2-bit errors and correct single-bit errors, using parity-check bits placed at power-of-two positions.',
    concepts: [
      {
        id: 'hamming-distance',
        name: 'Hamming Distance & Error Detection',
        description:
          'The Hamming distance between two codewords is the number of positions at which they differ, and the minimum distance of a code determines its error detection and correction capabilities.',
        keyPoints: [
          'The Hamming distance d(x,y) counts the number of bit positions where codewords x and y differ. For binary vectors, this equals the weight (number of 1s) of their XOR: d(x,y) = w(x XOR y).',
          'A code with minimum distance d_min can detect up to (d_min - 1) errors and correct up to floor((d_min - 1)/2) errors. Hamming codes have d_min = 3, enabling single-error correction and double-error detection (SEC-DED with an extra parity bit).',
          'The Hamming bound (sphere-packing bound) limits the number of codewords: for a binary code of length n correcting t errors, the number of codewords M satisfies M * sum_{i=0}^{t} C(n,i) <= 2^n.',
          'Codes that achieve the Hamming bound with equality are called perfect codes. The only nontrivial binary perfect codes are the Hamming codes (single-error correcting) and the Golay code (triple-error correcting, length 23).',
          'The Gilbert-Varshamov bound provides a lower bound on the achievable rate for a given minimum distance, showing that good codes exist even though finding them explicitly can be difficult.',
        ],
        tradeoffs: [
          'Higher minimum distance provides better error protection but requires more redundant bits, reducing the code rate and effective throughput.',
          'Perfect codes are rate-efficient but inflexible: they exist only for specific parameter combinations and cannot be adapted to arbitrary error rates.',
          'Minimum distance is a worst-case metric; many practical codes perform better than their minimum distance suggests due to the weight distribution of codewords.',
        ],
        realWorld: [
          'ECC memory (Error-Correcting Code RAM) uses SEC-DED Hamming codes to correct single-bit errors and detect double-bit errors in computer memory, critical for servers and scientific computing.',
          'DNA barcoding in genomics uses Hamming distance to design barcode sets where sequencing errors can be detected and corrected, enabling multiplexed sequencing experiments.',
          'QR codes use error correction levels (L, M, Q, H) that specify the minimum distance of the underlying Reed-Solomon code, determining how much damage the code can tolerate.',
        ],
      },
      {
        id: 'hamming-code-construction',
        name: 'Hamming Code Construction',
        description:
          'Hamming codes are constructed by placing parity-check bits at positions that are powers of 2, where each parity bit covers a specific subset of data bits determined by the binary representation of positions.',
        keyPoints: [
          'In a (7,4) Hamming code, 4 data bits are encoded into 7 bits using 3 parity bits at positions 1, 2, and 4. Each parity bit checks the data positions whose binary representation has a 1 in the corresponding bit position.',
          'The parity-check matrix H of a Hamming code has columns that are all nonzero binary vectors of length r, where r = n - k is the number of parity bits. For the (7,4) code, H is a 3x7 matrix with columns 001 through 111.',
          'Syndrome decoding computes s = H * r^T where r is the received vector. A zero syndrome indicates no error; a nonzero syndrome s directly gives the binary position number of the single bit error.',
          'General Hamming codes have parameters (2^r - 1, 2^r - 1 - r, 3) for any r >= 2: the block length is 2^r - 1, the number of data bits is 2^r - 1 - r, and the minimum distance is 3.',
          'Adding an overall parity bit to a Hamming code creates an extended Hamming code (SECDED) with parameters (2^r, 2^r - 1 - r, 4), enabling both single-error correction and double-error detection.',
        ],
        tradeoffs: [
          'Hamming codes have a fixed overhead ratio r/(2^r-1) that decreases with r, but larger codes also have more positions where multi-bit errors can overwhelm the correction capability.',
          'The simple syndrome-based decoding is fast (just matrix multiplication and a lookup), but is limited to correcting exactly one error per block.',
          'Hamming codes are not well-suited for burst errors (consecutive bit errors); interleaving multiple codewords is needed to handle burst error channels.',
        ],
        realWorld: [
          'Computer main memory uses (72,64) extended Hamming codes: 64 data bits plus 8 check bits, providing SECDED protection for each memory word.',
          'NAND flash memory controllers use Hamming codes for single-bit ECC in SLC (single-level cell) flash, though MLC and TLC flash require stronger BCH or LDPC codes.',
          'Satellite communication uplinks use Hamming codes as an inner code within a concatenated coding scheme, where the outer code handles burst errors from fading.',
        ],
      },
      {
        id: 'linear-codes',
        name: 'Linear Codes & Generator Matrices',
        description:
          'Linear codes form a vector subspace of the binary vector space, enabling efficient encoding via generator matrices and systematic decoding via parity-check matrices.',
        keyPoints: [
          'A linear [n, k, d] code over GF(2) is a k-dimensional subspace of GF(2)^n. The code is fully specified by its k x n generator matrix G: encoding maps a k-bit message m to codeword c = m * G.',
          'A code is systematic if the generator matrix has the form G = [I_k | P], where I_k is the k x k identity matrix and P is the k x (n-k) parity matrix. The first k bits of the codeword are the data bits.',
          'The parity-check matrix H satisfies G * H^T = 0, meaning H * c^T = 0 for every codeword c. For a systematic code, H = [-P^T | I_{n-k}] (over GF(2), negation is the identity).',
          'The minimum distance of a linear code equals the minimum weight (number of 1s) of any nonzero codeword. This simplification (from pairwise distance to individual weight) is a key advantage of linearity.',
          'The dual code C^perp consists of all vectors orthogonal to every codeword in C. The dual of a Hamming code is the simplex code, and dual relationships provide deep structural insights into code properties.',
        ],
        tradeoffs: [
          'Linear codes enable efficient encoding (matrix multiplication) and structured decoding, but not all good codes are linear, and some nonlinear codes outperform linear ones at specific parameters.',
          'Systematic encoding is convenient (data bits appear directly in the codeword) but may not minimize encoding complexity for all code families.',
          'Generator and parity-check matrices grow with code parameters, requiring careful storage and implementation strategies for very long codes.',
        ],
        realWorld: [
          'Wi-Fi (802.11n/ac/ax) uses LDPC codes, which are a class of linear codes defined by sparse parity-check matrices enabling efficient iterative decoding.',
          'Digital television (DVB-T2, ATSC 3.0) uses carefully designed linear codes whose generator matrices are standardized to ensure interoperability between equipment from different manufacturers.',
          'RAID-6 storage systems use linear codes (typically based on Reed-Solomon or parity computations) to protect against simultaneous failure of two disk drives.',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Reed-Solomon & BCH Codes',
    part: 3,
    partTitle: 'Error Correction',
    summary:
      'Reed-Solomon and BCH codes are powerful algebraic error-correcting codes that operate over finite fields, excelling at correcting burst errors and multiple random errors.',
    concepts: [
      {
        id: 'reed-solomon',
        name: 'Reed-Solomon Codes',
        description:
          'Reed-Solomon codes are non-binary cyclic codes defined over finite fields GF(2^m), capable of correcting up to t symbol errors where 2t = n - k redundancy symbols are used.',
        keyPoints: [
          'An RS(n, k) code over GF(2^m) has block length n = 2^m - 1, message length k, and can correct up to t = (n-k)/2 symbol errors. Each symbol is an m-bit element of the finite field, so burst errors affecting a single symbol count as one error.',
          'RS codes are maximum distance separable (MDS): they achieve the Singleton bound d = n - k + 1, meaning they have the maximum possible minimum distance for their rate. No code can correct more errors per unit of redundancy.',
          'Encoding treats the message as coefficients of a polynomial of degree k-1 and computes the remainder after division by a generator polynomial g(x) whose roots are consecutive powers of a primitive element alpha.',
          'Decoding uses the Berlekamp-Massey algorithm to find the error locator polynomial from the syndromes, then Chien search to find error positions, and Forney\'s algorithm to determine error values.',
          'Shortened and punctured RS codes allow flexible block lengths: shortening fixes some message symbols to zero (reducing k), while puncturing deletes some coded symbols (reducing n), adapting the code to specific requirements.',
        ],
        tradeoffs: [
          'RS codes require arithmetic in GF(2^m) which is more complex than binary operations, increasing encoder/decoder hardware or software cost compared to binary codes.',
          'The symbol size m must be chosen to match the expected error burst length; mismatches reduce either efficiency (m too large) or correction capability (m too small).',
          'For random bit errors (not burst errors), binary BCH codes are more efficient per redundant bit than RS codes because they operate at the bit level.',
        ],
        realWorld: [
          'CDs and DVDs use cross-interleaved RS codes (CIRC): two levels of RS coding with interleaving can recover from scratches up to 4mm long on a CD surface.',
          'QR codes use RS error correction over GF(2^8), enabling them to remain readable even when up to 30% of the code is damaged or obscured (at the highest correction level).',
          'Deep-space missions (Voyager, Mars rovers) use RS codes concatenated with convolutional codes to ensure reliable data transmission across billions of kilometers.',
        ],
      },
      {
        id: 'bch-codes',
        name: 'BCH Codes',
        description:
          'BCH (Bose-Chaudhuri-Hocquenghem) codes are a class of binary cyclic error-correcting codes with precise control over the number of correctable errors, generalizing Hamming codes to multi-error correction.',
        keyPoints: [
          'A binary BCH code of length n = 2^m - 1 designed to correct t errors has a generator polynomial that is the LCM of the minimal polynomials of alpha, alpha^2, ..., alpha^(2t), where alpha is a primitive n-th root of unity in GF(2^m).',
          'The BCH bound guarantees that the minimum distance d >= 2t + 1, ensuring the code can correct at least t errors. In practice, the true minimum distance often exceeds the designed distance.',
          'BCH codes are a subclass of RS codes when viewed properly: a binary BCH code can be derived from an RS code over GF(2^m) by subfield restriction, keeping only codewords with binary components.',
          'Decoding uses syndrome computation (evaluating the received polynomial at 2t consecutive powers of alpha), followed by the Berlekamp-Massey or Euclidean algorithm to find the error locator polynomial.',
          'The code rate of a t-error-correcting BCH code is approximately 1 - (mt)/n for large n, with each additional correctable error costing about m additional parity bits.',
        ],
        tradeoffs: [
          'BCH codes provide precise error-correction guarantees but require complex finite-field arithmetic for decoding, making hardware implementation area-intensive.',
          'The algebraic decoding algorithms are deterministic and fast but cannot exploit soft information from the channel, unlike iterative decoders for LDPC or turbo codes.',
          'Longer BCH codes have better rates but longer decoding latency, creating tension between throughput and latency in real-time systems.',
        ],
        realWorld: [
          'NAND flash memory controllers use BCH codes (correcting 40-72 bit errors per 1KB block) to maintain data integrity as flash cells degrade over program/erase cycles.',
          'DVB-S2 satellite broadcasting uses BCH as an outer code concatenated with LDPC as the inner code, providing excellent performance across a range of signal-to-noise ratios.',
          'Barcodes (Data Matrix, Aztec) use BCH-related codes for error correction, enabling reliable scanning in poor lighting or when labels are partially damaged.',
        ],
      },
      {
        id: 'finite-fields',
        name: 'Finite Field Arithmetic',
        description:
          'Finite fields (Galois fields) GF(p^m) provide the algebraic foundation for RS and BCH codes, enabling well-defined polynomial arithmetic with a finite number of elements.',
        keyPoints: [
          'GF(2^m) is constructed by taking polynomials over GF(2) modulo an irreducible polynomial of degree m. Each element is represented as a binary polynomial of degree at most m-1, giving exactly 2^m elements.',
          'Addition in GF(2^m) is bitwise XOR of polynomial coefficients. Multiplication is polynomial multiplication modulo the irreducible polynomial. These operations form a field (every nonzero element has a multiplicative inverse).',
          'A primitive element alpha generates all nonzero elements of GF(2^m) as powers alpha^0, alpha^1, ..., alpha^(2^m - 2). This log/antilog representation enables efficient multiplication via addition of exponents.',
          'Minimal polynomials are the lowest-degree polynomials over GF(2) having a given element as a root. Conjugate elements (related by the Frobenius automorphism x -> x^2) share the same minimal polynomial.',
          'Hardware implementations of GF(2^m) arithmetic use linear feedback shift registers (LFSRs) for multiplication and lookup tables (ROM) for inversion, enabling fast and area-efficient encoder/decoder circuits.',
        ],
        tradeoffs: [
          'Larger field sizes (higher m) allow longer codes and more symbols but increase the complexity of arithmetic operations and the size of lookup tables.',
          'The choice of irreducible polynomial affects implementation efficiency: some polynomials yield sparser multiplication circuits but may not be primitive.',
          'Software implementations of GF arithmetic are slower than hardware implementations due to the lack of native finite-field instructions in standard processors, though SIMD instructions can help.',
        ],
        realWorld: [
          'AES (Advanced Encryption Standard) performs all its operations in GF(2^8) defined by the irreducible polynomial x^8 + x^4 + x^3 + x + 1, using field arithmetic for its SubBytes and MixColumns steps.',
          'Shamir\'s Secret Sharing scheme uses polynomial interpolation over a finite field to split a secret into shares, with any k out of n shares sufficient to reconstruct the secret.',
          'RAID-6 implementations use GF(2^8) arithmetic to compute two independent parity drives, enabling recovery from any two simultaneous disk failures.',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Convolutional & Turbo Codes',
    part: 3,
    partTitle: 'Error Correction',
    summary:
      'Convolutional codes encode data using shift registers with memory, enabling soft-decision decoding via the Viterbi algorithm, while turbo codes approach the Shannon limit through iterative decoding of parallel concatenated convolutional codes.',
    concepts: [
      {
        id: 'convolutional-codes',
        name: 'Convolutional Codes',
        description:
          'Convolutional codes encode input bits continuously using a sliding window of memory (constraint length), producing output bits that depend on the current input and several previous inputs.',
        keyPoints: [
          'A rate R = k/n convolutional code with constraint length K processes k input bits at a time, producing n output bits using a shift register of K-1 memory elements. The encoder\'s state is determined by the K-1 most recent input bits.',
          'The code is defined by its generator polynomials, one for each output bit, specifying which register taps are XORed together. For example, the NASA standard (2,1,7) code uses generators G1 = 1111001 and G2 = 1011011 (octal 171, 133).',
          'The trellis diagram represents all possible state transitions over time, with 2^(K-1) states and 2^k branches leaving each state. Every valid codeword corresponds to a path through the trellis.',
          'The free distance d_free is the minimum Hamming distance between any two valid trellis paths that diverge and re-merge. Higher free distance provides better error correction capability.',
          'Punctured convolutional codes achieve higher rates by periodically deleting some output bits according to a puncturing pattern, offering flexible rate adaptation with a single encoder/decoder architecture.',
        ],
        tradeoffs: [
          'Larger constraint lengths increase the free distance and error correction capability but double the number of trellis states with each additional memory element, exponentially increasing decoder complexity.',
          'Convolutional codes produce a continuous stream of output bits with no natural block boundaries, requiring tail-biting or termination sequences to flush the encoder state at the end of a message.',
          'Hard-decision decoding of convolutional codes loses approximately 2 dB of coding gain compared to soft-decision (Viterbi) decoding, a significant performance penalty.',
        ],
        realWorld: [
          'The GSM mobile phone standard uses a rate-1/2, constraint-length-5 convolutional code for voice channel error protection, with Viterbi decoding at the receiver.',
          'NASA\'s Deep Space Network has used convolutional codes since the 1970s, with the Voyager missions employing a K=7, rate-1/2 code that provided reliable communication from beyond the solar system.',
          '802.11a/g/n Wi-Fi uses rate-1/2, K=7 convolutional codes with puncturing to achieve rates of 1/2, 2/3, and 3/4, selected adaptively based on channel conditions.',
        ],
      },
      {
        id: 'viterbi-algorithm',
        name: 'Viterbi Algorithm',
        description:
          'The Viterbi algorithm performs maximum-likelihood sequence decoding of convolutional codes by efficiently finding the most probable path through the code trellis using dynamic programming.',
        keyPoints: [
          'The algorithm computes a path metric for every state at each time step, representing the cumulative distance (Hamming for hard decision, Euclidean for soft decision) between the received sequence and the closest path ending in that state.',
          'At each time step and state, the algorithm selects the "surviving path" with the smallest metric among all paths merging into that state, discarding all others. This reduces the number of tracked paths from exponential to one per state.',
          'The final decoded sequence is obtained by tracing back from the state with the minimum metric at the end of the trellis, following the stored survivor path decisions back to the beginning.',
          'Soft-decision Viterbi decoding uses analog channel values (e.g., 3-bit quantization) instead of hard 0/1 decisions, providing approximately 2 dB of coding gain and approaching maximum-likelihood performance.',
          'The computational complexity of the Viterbi algorithm is O(n * 2^(K-1)) per decoded bit, where n is the number of output bits per input bit and K is the constraint length, making it practical for constraint lengths up to about 10.',
        ],
        tradeoffs: [
          'Memory requirements grow linearly with the traceback depth (typically 5 times the constraint length) and exponentially with the constraint length, limiting K in hardware implementations.',
          'Viterbi decoding finds the most likely sequence, not the most likely individual bits. The BCJR/MAP algorithm provides bit-level posteriors but at higher complexity.',
          'In practice, the traceback depth must be finite, introducing a small suboptimality. A traceback depth of 5*K is typically sufficient for near-optimal performance.',
        ],
        realWorld: [
          'Every 4G/LTE modem contains a Viterbi decoder for decoding the convolutional codes used in the control channels, processing millions of trellis operations per second.',
          'Speech recognition systems historically used the Viterbi algorithm to find the most likely sequence of phonemes through Hidden Markov Models, forming the backbone of pre-neural ASR systems.',
          'Bioinformatics uses the Viterbi algorithm on profile HMMs to find the most likely alignment of a protein sequence to a protein family, identifying structural and functional similarities.',
        ],
      },
      {
        id: 'turbo-codes',
        name: 'Turbo Codes',
        description:
          'Turbo codes use two parallel convolutional encoders separated by an interleaver, with iterative soft-input soft-output decoding that achieves performance within a fraction of a dB of the Shannon limit.',
        keyPoints: [
          'A turbo encoder consists of two recursive systematic convolutional (RSC) encoders operating on the same data: one encodes the data in its original order, the other encodes a pseudo-random interleaved version, producing three output streams (systematic + two parity).',
          'Iterative decoding passes soft information (log-likelihood ratios) between two component SISO (Soft-Input Soft-Output) decoders, each using the BCJR/MAP algorithm. The extrinsic information from one decoder becomes prior information for the other.',
          'Convergence of iterative decoding can be analyzed using EXIT (EXtrinsic Information Transfer) charts, which plot the mutual information transfer characteristics of each component decoder to predict the SNR threshold for successful decoding.',
          'The interleaver design is critical to turbo code performance: it must spread burst errors from one decoder over many trellis sections in the other decoder. S-random interleavers ensure a minimum spread distance.',
          'Turbo codes exhibit a "waterfall" region where BER drops dramatically over a narrow SNR range (within 0.5 dB of the Shannon limit for long codes), followed by an "error floor" at low BER caused by low-weight codewords.',
        ],
        tradeoffs: [
          'Iterative decoding introduces latency proportional to the block length times the number of iterations (typically 6-18), creating challenges for real-time applications.',
          'The error floor limits turbo codes in applications requiring very low error rates (below 10^-7); LDPC codes typically have lower error floors at comparable complexity.',
          'Turbo code encoders require the entire data block to be available before encoding (due to the interleaver), preventing streaming operation unlike standard convolutional codes.',
        ],
        realWorld: [
          '3G UMTS/WCDMA and 4G LTE use turbo codes for user data channels, operating within 1 dB of the Shannon limit at practical block lengths and enabling high-speed mobile data.',
          'The Mars Reconnaissance Orbiter uses turbo codes to transmit high-resolution imagery from Mars, achieving reliable communication at a data rate of 6 Mbps over a distance of 400 million km.',
          'DVB-RCS (Digital Video Broadcasting - Return Channel via Satellite) uses turbo codes for the uplink from user terminals to the satellite, where power-limited terminals benefit from near-capacity performance.',
        ],
      },
    ],
  },

  // ─── Part 4: Applications ─────────────────────────────────────────────
  {
    id: 10,
    title: 'Channel Capacity & Shannon Limit',
    part: 4,
    partTitle: 'Applications',
    summary:
      'The Shannon limit represents the ultimate theoretical boundary for reliable communication over noisy channels, and modern coding techniques now operate remarkably close to this limit.',
    concepts: [
      {
        id: 'shannon-limit',
        name: 'The Shannon Limit',
        description:
          'The Shannon limit specifies the maximum information rate that can be transmitted over a channel with arbitrarily low error probability, establishing the gold standard against which all practical codes are measured.',
        keyPoints: [
          'For the AWGN channel, the Shannon limit is C = B * log2(1 + S/N) bits per second, where B is bandwidth in Hz and S/N is the linear signal-to-noise ratio. This is also known as the Shannon-Hartley theorem.',
          'At the Shannon limit for the AWGN channel, the minimum Eb/N0 (energy per bit to noise spectral density ratio) is -1.59 dB (= ln(2)), below which reliable communication is theoretically impossible regardless of coding.',
          'Modern codes approach the Shannon limit: turbo codes and LDPC codes operate within 0.1-0.5 dB of the limit, while polar codes provably achieve capacity for binary-input symmetric channels.',
          'The bandwidth efficiency plane plots spectral efficiency (bits/s/Hz) versus Eb/N0, with the Shannon limit forming a boundary curve. Practical modulation and coding schemes are benchmarked by their proximity to this curve.',
          'For non-AWGN channels (fading, interference), the Shannon limit takes different forms. Ergodic capacity averages over fading states, while outage capacity considers the probability that instantaneous capacity falls below the target rate.',
        ],
        tradeoffs: [
          'Operating closer to the Shannon limit requires longer codes and more complex decoders, increasing latency and power consumption in the receiver.',
          'The Shannon limit assumes Gaussian noise and infinite block lengths; real-world channels with impulsive noise or strict delay constraints have lower effective capacities.',
          'Approaching the limit on multi-user channels introduces additional complexity due to interference management, multiple access, and broadcasting considerations.',
        ],
        realWorld: [
          '5G NR operates within 1-2 dB of the Shannon limit across a range of SNR values, using adaptive LDPC codes and 256-QAM modulation for the data channel.',
          'Fiber-optic communications are approaching the nonlinear Shannon limit (about 10 bits/s/Hz for standard single-mode fiber), driving research into spatial division multiplexing.',
          'Satellite internet services (Starlink, OneWeb) use DVB-S2X with LDPC codes operating within 0.2 dB of the Shannon limit to maximize throughput from power-limited satellites.',
        ],
      },
      {
        id: 'ldpc-codes',
        name: 'LDPC Codes',
        description:
          'Low-Density Parity-Check (LDPC) codes use sparse parity-check matrices and iterative belief propagation decoding to achieve near-Shannon-limit performance with practical complexity.',
        keyPoints: [
          'An LDPC code is defined by a sparse parity-check matrix H where most entries are zero. The sparsity is characterized by the column weight (number of 1s per column) and row weight (number of 1s per row), typically ranging from 3 to 6.',
          'Decoding uses the belief propagation (sum-product) algorithm on the factor graph corresponding to H, iteratively passing soft messages between variable nodes (coded bits) and check nodes (parity equations) until convergence.',
          'The density evolution technique analytically tracks the distribution of decoder messages across iterations for infinite-length codes, determining the precise SNR threshold below which the decoder fails to converge.',
          'LDPC codes can be designed with optimized degree distributions (irregular LDPC) using techniques like EXIT chart matching, achieving thresholds within 0.0045 dB of the Shannon limit for the binary-input AWGN channel.',
          'Quasi-cyclic LDPC codes use circulant permutation matrices to structure H, enabling efficient hardware implementation through simple shift-register operations while maintaining excellent performance.',
        ],
        tradeoffs: [
          'LDPC decoders have high throughput but also high power consumption due to the iterative message-passing across a large factor graph, a concern for battery-powered devices.',
          'Short LDPC codes (block length < 1000) underperform compared to turbo codes and polar codes due to the presence of short cycles in the factor graph that degrade belief propagation.',
          'Encoding LDPC codes can be more complex than decoding because the generator matrix is dense even when the parity-check matrix is sparse, requiring special encoding algorithms.',
        ],
        realWorld: [
          '5G NR uses rate-compatible quasi-cyclic LDPC codes for the data channel (PDSCH/PUSCH), supporting block lengths from 40 to 8448 bits and code rates from 1/5 to 22/25.',
          'The DVB-S2 satellite TV standard was one of the first to adopt LDPC codes, achieving near-capacity performance and enabling the delivery of HDTV over existing satellite infrastructure.',
          'Wi-Fi 6 (802.11ax) uses LDPC codes as mandatory for high-throughput modes, contributing to the improved spectral efficiency that enables reliable Gbps-class wireless connections.',
        ],
      },
      {
        id: 'polar-codes',
        name: 'Polar Codes',
        description:
          'Polar codes, invented by Erdal Arikan in 2009, are the first provably capacity-achieving codes with explicit construction and efficient encoding/decoding for binary-input symmetric channels.',
        keyPoints: [
          'Polar codes exploit channel polarization: applying a specific linear transform to N = 2^n independent copies of a binary symmetric channel creates N "polarized" synthetic channels that tend toward either perfectly reliable or perfectly unreliable as N grows.',
          'Data bits are transmitted over the reliable (high-capacity) synthetic channels while frozen bits (known to the decoder) are placed on the unreliable channels. The set of reliable channels is determined by the specific channel type and SNR.',
          'Successive cancellation (SC) decoding processes bits sequentially from the polarized channel tree, using previously decoded bits to compute the likelihood of each new bit. SC decoding achieves capacity as N approaches infinity.',
          'SC list (SCL) decoding maintains L candidate paths through the decoding tree, dramatically improving finite-length performance. With L=32 and CRC-aided selection, polar codes match or exceed turbo and LDPC performance at short block lengths.',
          'Polar codes have low encoding and decoding complexity of O(N log N), similar to the FFT. The encoding transform is its own inverse (up to bit-reversal), and the recursive structure enables efficient hardware implementation.',
        ],
        tradeoffs: [
          'Basic SC decoding has relatively high latency due to its sequential nature, though parallel implementations and hardware-friendly variants (SC flip, fast-SSC) mitigate this.',
          'Polar code design requires knowledge of the channel SNR to select the frozen bit positions; rate adaptation across different SNR values requires either redesign or universal constructions.',
          'At moderate block lengths (256-1024), polar codes with SC decoding underperform LDPC codes; competitive performance requires SCL decoding with CRC concatenation, adding complexity.',
        ],
        realWorld: [
          '5G NR uses polar codes for all control channels (PDCCH, PUCCH, PBCH), making it the first commercial deployment of polar codes. CRC-aided SCL decoding ensures reliable delivery of critical control information.',
          'Huawei has deployed polar codes in its 5G base stations and terminals, backed by significant investment in polar code research and standardization contributions.',
          'Polar codes are being investigated for future storage systems where the channel model (e.g., flash memory with asymmetric errors) is well-characterized and matches the polar code design framework.',
        ],
      },
    ],
  },
  {
    id: 11,
    title: 'Cryptographic Information Theory',
    part: 4,
    partTitle: 'Applications',
    summary:
      'Information theory provides the theoretical foundations for cryptographic security, from Shannon\'s perfect secrecy to modern concepts of computational security, key agreement, and quantum cryptography.',
    concepts: [
      {
        id: 'perfect-secrecy',
        name: 'Perfect Secrecy & One-Time Pad',
        description:
          'Shannon\'s notion of perfect secrecy requires that the ciphertext reveals absolutely no information about the plaintext, a condition achievable only when the key is at least as long as the message.',
        keyPoints: [
          'A cipher achieves perfect secrecy if and only if the mutual information I(M;C) = 0, meaning the ciphertext C is statistically independent of the plaintext M. Equivalently, P(M|C) = P(M) for all messages and ciphertexts.',
          'Shannon proved that perfect secrecy requires H(K) >= H(M): the key must have at least as much entropy as the message. This means the key must be at least as long as the plaintext, ruling out key reuse.',
          'The one-time pad (Vernam cipher) achieves perfect secrecy by XORing each plaintext bit with a uniformly random key bit. It is the only practically known cipher that provably achieves perfect secrecy.',
          'Key reuse in a one-time pad is catastrophic: if two messages m1 and m2 are encrypted with the same key k, the XOR of the ciphertexts equals m1 XOR m2, leaking information about both plaintexts.',
          'Shannon\'s impossibility result shows that no cipher can simultaneously achieve perfect secrecy and use shorter keys than messages, establishing a fundamental tension between key management practicality and information-theoretic security.',
        ],
        tradeoffs: [
          'Perfect secrecy guarantees unconditional security but requires key distribution as costly as the data itself, making it impractical for most applications.',
          'Computational security (used by AES, RSA) trades provable security for practical key sizes, relying on the assumed hardness of mathematical problems that could in principle be broken.',
          'One-time pads require truly random keys (not pseudorandom), and secure key generation and distribution become the bottleneck rather than the cipher itself.',
        ],
        realWorld: [
          'The Washington-Moscow Hotline historically used one-time pad encryption for diplomatic communications where the cost of key distribution was justified by the need for absolute security.',
          'Intelligence agencies have used one-time pads for field communications with agents, where pre-distributed key material in codebooks provides unbreakable encryption for short messages.',
          'Quantum key distribution (QKD) systems generate one-time pad keys using quantum mechanics, aiming to combine the practical key distribution of public-key cryptography with the security of one-time pads.',
        ],
      },
      {
        id: 'information-theoretic-security',
        name: 'Information-Theoretic Security',
        description:
          'Information-theoretic security provides cryptographic guarantees that hold against adversaries with unlimited computational power, relying on the physical properties of channels rather than computational assumptions.',
        keyPoints: [
          'The wiretap channel model (Wyner, 1975) shows that if the eavesdropper has a noisier channel than the legitimate receiver, secure communication is possible at a positive secrecy rate without shared keys.',
          'The secrecy capacity C_s = max(0, C_main - C_eavesdropper) for degraded wiretap channels gives the maximum rate at which messages can be transmitted with both reliability and information-theoretic secrecy.',
          'Secret key agreement from correlated observations (Maurer, 1993) shows that two parties with correlated random variables can distill a shared secret key via public discussion, even if an eavesdropper observes the discussion.',
          'Privacy amplification uses universal hash functions to distill a shorter, uniformly random key from a partially compromised longer key, quantified by the min-entropy of the key given the adversary\'s information.',
          'The leftover hash lemma guarantees that the output of a universal hash function applied to a source with sufficient min-entropy is statistically indistinguishable from uniform, formalizing the privacy amplification process.',
        ],
        tradeoffs: [
          'Information-theoretic security requires physical-layer advantages (channel quality, noise) that may not always be available, unlike computational security which works over any channel.',
          'Secrecy rates are typically lower than non-secret channel capacity, reducing throughput when security is required.',
          'Physical-layer security assumes accurate channel models; model mismatch (e.g., an eavesdropper with a better antenna than assumed) can compromise security guarantees.',
        ],
        realWorld: [
          'Quantum Key Distribution (BB84 protocol) provides information-theoretic security for key distribution, with commercial systems deployed in banking networks and government communications.',
          'Physical-layer security techniques are being standardized for 5G and beyond, using MIMO beamforming to create advantage for the intended receiver while degrading the eavesdropper\'s channel.',
          'Secure multi-party computation protocols use information-theoretic techniques to enable joint computation on private data without revealing individual inputs, with applications in privacy-preserving data analysis.',
        ],
      },
      {
        id: 'entropy-in-crypto',
        name: 'Entropy in Cryptographic Systems',
        description:
          'Entropy quantifies the unpredictability of cryptographic keys, random number generators, and hash functions, serving as the fundamental measure of security strength.',
        keyPoints: [
          'A cryptographic key with k bits of entropy requires an expected 2^(k-1) guesses under an optimal brute-force attack. NIST recommends minimum 128 bits of entropy for symmetric keys, corresponding to 2^127 expected guesses.',
          'Min-entropy H_inf = -log2(max p(x)) provides a conservative security measure: it reflects the probability of the most likely key, which is the relevant quantity for an adversary making a single best guess.',
          'Cryptographic random number generators (CSPRNGs) harvest entropy from physical sources (timing jitter, thermal noise, mouse movements) and use deterministic algorithms to stretch limited entropy into longer pseudorandom sequences.',
          'Hash functions like SHA-256 act as entropy extractors: when the input has sufficient min-entropy (even if not uniformly distributed), the output is computationally indistinguishable from uniform for any practical purpose.',
          'The unicity distance is the minimum amount of ciphertext needed to uniquely determine the encryption key. For a cipher with key entropy H(K) against a source with redundancy r, the unicity distance is approximately H(K)/r.',
        ],
        tradeoffs: [
          'Higher entropy in keys provides stronger security but requires better random number generation, which can be slow or expensive, especially in resource-constrained environments.',
          'Min-entropy is more conservative than Shannon entropy as a security metric; a source can have high Shannon entropy but low min-entropy if one outcome is much more likely than others.',
          'Entropy estimation from finite samples is inherently uncertain; cryptographic systems must account for estimation error by using conservative (lower) entropy estimates.',
        ],
        realWorld: [
          'Linux\'s /dev/urandom uses an entropy pool fed by hardware interrupts, disk timing, and other sources, with a CSPRNG (ChaCha20) to stretch the entropy for application use.',
          'Hardware random number generators (Intel RDRAND/RDSEED) sample thermal noise in silicon to provide entropy at rates of hundreds of Mbps directly to applications.',
          'Password managers estimate password entropy to guide users toward stronger passwords, typically recommending at least 60-80 bits of entropy for important accounts.',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Data Compression in Practice',
    part: 4,
    partTitle: 'Applications',
    summary:
      'Practical data compression combines theoretical foundations with engineering optimizations to handle diverse data types, balancing compression ratio, speed, memory usage, and compatibility.',
    concepts: [
      {
        id: 'modern-compressors',
        name: 'Modern Compression Algorithms',
        description:
          'State-of-the-art compressors like Zstandard, Brotli, and LZ4 represent decades of engineering refinement, achieving diverse tradeoffs between compression ratio, speed, and memory usage.',
        keyPoints: [
          'Zstandard (zstd) by Facebook uses an LZ77-family algorithm with finite-state entropy (tANS) coding instead of Huffman, achieving compression ratios comparable to LZMA at speeds approaching LZ4. It supports compression levels from 1 (fast) to 22 (best ratio).',
          'Brotli by Google uses a large pre-defined dictionary of common web content (HTML tags, CSS properties, JavaScript keywords) combined with LZ77 and context-dependent Huffman coding, outperforming gzip by 20-26% on web content.',
          'LZ4 prioritizes decompression speed above all: it achieves decompression rates exceeding 4 GB/s on modern hardware, making it ideal for real-time applications where fast access to compressed data is critical.',
          'Asymmetric numeral systems (ANS), particularly the tabled variant (tANS), replace arithmetic coding and Huffman coding in modern compressors. ANS achieves the compression ratio of arithmetic coding with the speed of Huffman coding.',
          'Dictionary-based presets allow compressors to train on representative data and share the dictionary with the decompressor, dramatically improving compression of small files (API responses, log entries) where per-file learning is insufficient.',
        ],
        tradeoffs: [
          'Faster compression algorithms (LZ4, Snappy) sacrifice 20-40% compression ratio compared to slower algorithms (LZMA, zstd level 22), appropriate when CPU time is more expensive than storage/bandwidth.',
          'Pre-trained dictionaries improve small-file compression but must be distributed to all decompressors and updated as data characteristics change.',
          'Higher compression levels use more memory for match-finding hash tables and longer search windows, which may exceed available memory on constrained systems.',
        ],
        realWorld: [
          'Facebook uses zstd internally for compressing everything from warehouse data to real-time messaging, saving petabytes of storage and reducing network bandwidth across data centers.',
          'Chrome and Firefox support Brotli content encoding, and CDNs (Cloudflare, Akamai) serve Brotli-compressed web assets by default, reducing page load times by 15-25% compared to gzip.',
          'Linux kernel uses LZ4 for initramfs compression, reducing boot time by decompressing the initial filesystem image faster than alternative algorithms.',
        ],
      },
      {
        id: 'image-video-compression',
        name: 'Image & Video Compression Standards',
        description:
          'Modern image and video codecs use sophisticated combinations of prediction, transform coding, quantization, and entropy coding to achieve compression ratios of 100:1 or more while maintaining perceptual quality.',
        keyPoints: [
          'H.266/VVC (Versatile Video Coding, 2020) achieves approximately 50% bitrate reduction over H.265/HEVC through larger block sizes (up to 128x128), geometric partitioning, affine motion compensation, and improved intra prediction with 67 angular modes.',
          'AV1 (Alliance for Open Media, 2018) is a royalty-free video codec competitive with HEVC, using 64x64 superblocks, recursive block partitioning, and CDEF (Constrained Directional Enhancement Filter) for deblocking.',
          'AVIF (AV1 Image File Format) and WebP provide modern image compression: AVIF uses AV1 intra-frame coding to achieve 20% better compression than WebP, which in turn outperforms JPEG by 30% at equivalent quality.',
          'Neural image compression using learned transforms and hyperprior models now matches or exceeds VVC intra coding in rate-distortion performance, with architectures like Balle\'s variational autoencoder (2018) achieving state-of-the-art results.',
          'Perceptual quality metrics (SSIM, VMAF, LPIPS) guide modern codec development beyond PSNR, optimizing for how humans perceive quality rather than pixel-level accuracy.',
        ],
        tradeoffs: [
          'Newer codecs (VVC, AV1) offer better compression but require 5-10x more computation for encoding than their predecessors, increasing cloud encoding costs.',
          'Royalty-free codecs (AV1) avoid patent licensing fees but may lag behind patent-encumbered codecs (VVC) in compression efficiency and encoder maturity.',
          'Neural compression offers excellent rate-distortion performance but requires GPU hardware for practical encoding/decoding speeds, limiting deployment to specific use cases.',
        ],
        realWorld: [
          'Netflix uses AV1 encoding for 4K content on supported devices, reducing bandwidth requirements by about 20% compared to HEVC while maintaining the same visual quality.',
          'Apple adopted AVIF support in Safari 16 and iOS 16, joining Chrome and Firefox in enabling modern image compression across major web platforms.',
          'Video conferencing platforms (Zoom, Teams) use custom real-time video codecs with neural enhancement layers that can maintain visual quality at very low bitrates (100-500 kbps).',
        ],
      },
      {
        id: 'compression-benchmarking',
        name: 'Compression Benchmarking & Selection',
        description:
          'Choosing the right compression algorithm requires systematic benchmarking across multiple dimensions including ratio, speed, memory, and compatibility, tailored to the specific data type and use case.',
        keyPoints: [
          'The compression ratio alone is insufficient; the Pareto frontier of ratio vs. speed reveals which algorithms are truly optimal. An algorithm is dominated if another achieves both better ratio and faster speed.',
          'Decompression speed often matters more than compression speed because data is typically compressed once but decompressed many times. Algorithms like LZ4 and Snappy optimize for this asymmetry.',
          'Data-specific benchmarking is essential because algorithm performance varies dramatically across data types: zstd excels on structured data, Brotli on web content, JPEG XL on photographic images, and FLAC on audio.',
          'Streaming vs. block compression affects latency and random access: block-based formats allow seeking within compressed data, while streaming formats require decompressing from the beginning.',
          'Compression testing should include edge cases: empty files, files with single repeated byte, already-compressed data, maximum-entropy random data, and adversarial inputs that trigger worst-case behavior.',
        ],
        tradeoffs: [
          'Universal benchmarks (like Silesia or Canterbury corpus) provide standardized comparisons but may not reflect the specific data distribution of a particular application.',
          'Compression level tuning allows trading speed for ratio, but the optimal level depends on the storage cost vs. compute cost ratio, which varies across environments.',
          'Hardware-accelerated compression (Intel QAT, NVIDIA nvCOMP) changes the speed-ratio tradeoff but introduces hardware dependency and may not be available in all deployments.',
        ],
        realWorld: [
          'Cloud providers (AWS, GCP) offer compression selection guides that recommend algorithms based on the storage class, access pattern, and data type of each workload.',
          'The Squash Compression Benchmark tests 50+ compression algorithms across multiple datasets, providing an interactive Pareto frontier visualization for algorithm selection.',
          'Database systems (PostgreSQL, ClickHouse) allow per-column compression algorithm selection, using LZ4 for frequently accessed columns and ZSTD for archival columns.',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Information Theory in Machine Learning',
    part: 4,
    partTitle: 'Applications',
    summary:
      'Information theory provides fundamental tools and perspectives for understanding machine learning, from training objectives and regularization to generalization bounds and representation learning.',
    concepts: [
      {
        id: 'cross-entropy-loss',
        name: 'Cross-Entropy & Loss Functions',
        description:
          'Cross-entropy serves as the primary training objective for classification models, directly connecting the optimization of neural networks to information-theoretic principles.',
        keyPoints: [
          'The cross-entropy loss for a classifier is L = -sum of y_i * log(p_i) where y is the one-hot true label and p is the predicted probability distribution. Minimizing this is equivalent to minimizing the KL divergence between the true and predicted distributions.',
          'For binary classification, cross-entropy reduces to the log loss: L = -[y*log(p) + (1-y)*log(1-p)]. The gradient with respect to the logit (pre-sigmoid value) is simply (p - y), providing a clean optimization landscape.',
          'Label smoothing replaces hard one-hot targets with soft targets (e.g., 0.9 for the correct class, 0.1/(K-1) for others), acting as an entropy regularizer that prevents the model from becoming overconfident.',
          'Focal loss modifies cross-entropy by down-weighting well-classified examples: FL = -alpha*(1-p)^gamma * log(p). With gamma > 0, the loss focuses training on hard, misclassified examples, addressing class imbalance.',
          'The relationship between cross-entropy and maximum likelihood estimation is direct: minimizing cross-entropy over the training set is mathematically identical to maximizing the log-likelihood of the data under the model.',
        ],
        tradeoffs: [
          'Cross-entropy loss can overfit to noisy labels because it heavily penalizes confident wrong predictions, driving the model to memorize mislabeled examples.',
          'Calibration (predicted probabilities matching true frequencies) is important but not guaranteed by cross-entropy minimization alone; temperature scaling or Platt scaling may be needed post-training.',
          'Cross-entropy is sensitive to class imbalance: the loss is dominated by the majority class unless weights, sampling strategies, or focal loss are employed.',
        ],
        realWorld: [
          'GPT, BERT, and all major language models are trained using cross-entropy loss over token predictions, with the training objective being next-token prediction (GPT) or masked token prediction (BERT).',
          'Medical AI systems use weighted cross-entropy or focal loss to handle the extreme class imbalance in disease detection (e.g., 1 positive case per 1000 negatives in cancer screening).',
          'Recommendation systems use binary cross-entropy to predict click-through rates, where the loss directly corresponds to the information gained about user preferences from each prediction.',
        ],
      },
      {
        id: 'information-bottleneck',
        name: 'Information Bottleneck',
        description:
          'The Information Bottleneck (IB) method provides a principled framework for learning compressed representations that preserve relevant information, offering theoretical insights into deep learning.',
        keyPoints: [
          'The IB objective minimizes I(X;T) - beta * I(T;Y), seeking a representation T of input X that is maximally compressed (low I(X;T)) while remaining maximally informative about the target Y (high I(T;Y)).',
          'The Lagrange multiplier beta controls the tradeoff between compression and relevance: beta = 0 yields maximum compression (T is independent of X), while beta -> infinity recovers the full representation.',
          'The IB curve plots I(T;Y) vs I(X;T) as beta varies, revealing the fundamental tradeoff between representation complexity and predictive power. The curve is concave and information-monotone.',
          'Tishby\'s Deep Learning IB hypothesis suggests that neural network training has two phases: fitting (increasing I(T;Y)) and compression (decreasing I(X;T)), with the compression phase corresponding to generalization improvement.',
          'Variational Information Bottleneck (VIB) makes the IB principle tractable for deep learning by using variational bounds on mutual information, adding an information-regularization term to the standard training loss.',
        ],
        tradeoffs: [
          'Exact mutual information computation is intractable for high-dimensional continuous data; practical implementations rely on variational bounds that may be loose.',
          'The IB hypothesis for deep learning remains debated: some studies show the compression phase depends on the activation function and may not occur universally.',
          'The optimal beta value is task-dependent and typically requires cross-validation, adding a hyperparameter to tune.',
        ],
        realWorld: [
          'Variational autoencoders (VAEs) implicitly implement a form of information bottleneck through their KL regularization term, which controls the mutual information between input and latent representation.',
          'Privacy-preserving machine learning uses IB-inspired objectives to learn representations that are informative about the task but uninformative about sensitive attributes like race or gender.',
          'Speech recognition systems use IB-related bottleneck features to extract compact, noise-robust representations from raw audio, improving recognition in noisy environments.',
        ],
      },
      {
        id: 'generalization-bounds',
        name: 'Information-Theoretic Generalization',
        description:
          'Information theory provides generalization bounds for learning algorithms based on the mutual information between the training data and the learned hypothesis, complementing classical PAC-learning and VC-dimension approaches.',
        keyPoints: [
          'The mutual information generalization bound states that the expected generalization gap (difference between test and training error) is bounded by sqrt(I(S;W) / (2n)), where S is the training set, W is the learned parameters, and n is the sample size.',
          'This bound captures the intuition that algorithms which are less dependent on their training data (lower I(S;W)) generalize better, formalizing the principle that memorization hurts generalization.',
          'Stochastic gradient descent (SGD) implicitly controls I(S;W) through its noise: the stochastic updates prevent the model from depending too precisely on individual training examples, acting as an implicit regularizer.',
          'The PAC-Bayes framework connects to information theory through the KL divergence between the posterior (data-dependent) and prior (data-independent) distributions over hypotheses: generalization depends on D_KL(posterior || prior).',
          'Compression-based generalization bounds use the minimum description length (MDL) principle: a model that can be described in fewer bits generalizes better because it captures regularities rather than noise.',
        ],
        tradeoffs: [
          'Information-theoretic bounds are often looser than empirically observed generalization gaps, especially for overparameterized neural networks where the bounds may be vacuous.',
          'Computing I(S;W) exactly is intractable for practical learning algorithms; bounds must use estimates or proxies that may not be tight.',
          'These bounds assume specific properties of the learning algorithm (stability, compression) that may not hold uniformly across architectures and training procedures.',
        ],
        realWorld: [
          'Dropout regularization in neural networks can be interpreted as reducing I(S;W) by injecting noise into the learned representation, improving generalization in practice.',
          'Model distillation compresses a large teacher model into a smaller student model, and the compression perspective from information theory explains why the student often generalizes better despite having fewer parameters.',
          'Differentially private learning algorithms provide formal guarantees on I(S;W) through their noise injection mechanism, simultaneously enabling privacy protection and provable generalization.',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find((t) => t.id === id);
}
