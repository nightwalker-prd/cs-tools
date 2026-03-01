export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ─── Topic 1: Entropy & Information Content ───────────────────────────
  {
    id: 't1-q1',
    chapterId: 1,
    question:
      'What is the Shannon entropy of a fair coin flip (two equally likely outcomes)?',
    options: ['0 bits', '0.5 bits', '1 bit', '2 bits'],
    answer: 2,
    explanation:
      'A fair coin has probability 0.5 for each outcome. H(X) = -2 * (0.5 * log2(0.5)) = -2 * (0.5 * -1) = 1 bit. This is the maximum entropy for a binary source, reflecting maximum uncertainty.',
  },
  {
    id: 't1-q2',
    chapterId: 1,
    question:
      'Which property does KL divergence D_KL(P||Q) lack, preventing it from being a true distance metric?',
    options: [
      'Non-negativity',
      'It requires continuous distributions',
      'It can be infinite',
      'Symmetry',
    ],
    answer: 3,
    explanation:
      'KL divergence is asymmetric: D_KL(P||Q) does not equal D_KL(Q||P) in general. A true metric must satisfy symmetry (d(x,y) = d(y,x)), the triangle inequality, and identity of indiscernibles. KL divergence violates both symmetry and the triangle inequality.',
  },
  {
    id: 't1-q3',
    chapterId: 1,
    question:
      'If an event has probability 1/256, what is its self-information?',
    options: ['8 bits', '6 bits', '4 bits', '16 bits'],
    answer: 0,
    explanation:
      'Self-information I(x) = -log2(p(x)) = -log2(1/256) = log2(256) = 8 bits. Since 256 = 2^8, the event carries exactly 8 bits of information. Rarer events carry more self-information.',
  },

  // ─── Topic 2: Source Coding Theorem ───────────────────────────────────
  {
    id: 't2-q1',
    chapterId: 2,
    question:
      'According to Shannon\'s source coding theorem, what is the theoretical minimum average bits per symbol for lossless compression?',
    options: [
      'log2 of the alphabet size',
      'The entropy H(X) of the source',
      'One bit per symbol',
      'The maximum self-information of any symbol',
    ],
    answer: 1,
    explanation:
      'Shannon\'s source coding theorem states that the entropy H(X) is the fundamental lower bound on the average codeword length for any lossless compression scheme. No code can achieve fewer than H(X) bits per symbol on average without losing information.',
  },
  {
    id: 't2-q2',
    chapterId: 2,
    question:
      'Kraft\'s inequality sum of 2^(-l_i) <= 1 is a necessary and sufficient condition for the existence of what type of code?',
    options: [
      'Any binary code',
      'An error-correcting code',
      'A uniquely decodable code',
      'A prefix-free (instantaneous) code',
    ],
    answer: 3,
    explanation:
      'Kraft\'s inequality is the necessary and sufficient condition for the existence of a prefix-free code with given codeword lengths. The McMillan inequality extends this to show that all uniquely decodable codes also satisfy it, but Kraft\'s original statement applies to prefix-free codes.',
  },
  {
    id: 't2-q3',
    chapterId: 2,
    question:
      'The Asymptotic Equipartition Property (AEP) states that for large n, the typical set contains approximately how many sequences?',
    options: [
      '2^n sequences',
      '2^(nH) sequences',
      'n^2 sequences',
      '2^(n * log2|A|) sequences',
    ],
    answer: 1,
    explanation:
      'The AEP shows that the typical set contains approximately 2^(nH) sequences, where H is the entropy of the source. This is much smaller than the total number of possible sequences 2^(n*log2|A|) when H < log2|A|, which is why compression is possible.',
  },

  // ─── Topic 3: Mutual Information & Channel Capacity ───────────────────
  {
    id: 't3-q1',
    chapterId: 3,
    question:
      'What does the data processing inequality I(X;Z) <= I(X;Y) state about a Markov chain X -> Y -> Z?',
    options: [
      'Processing data can only preserve or destroy information, never create it',
      'Processing can create new information about X',
      'Z always contains more information than Y',
      'Mutual information increases along the chain',
    ],
    answer: 0,
    explanation:
      'The data processing inequality states that for a Markov chain X -> Y -> Z, no processing of Y can increase the information about X. I(X;Z) <= I(X;Y), meaning each processing step can only maintain or reduce the available information.',
  },
  {
    id: 't3-q2',
    chapterId: 3,
    question:
      'The capacity of the AWGN channel is given by C = B * log2(1 + S/N). What does doubling the bandwidth B do to the capacity?',
    options: [
      'It has no effect on capacity',
      'It halves the capacity because noise doubles',
      'It approximately doubles the capacity when S/N is held constant',
      'It quadruples the capacity',
    ],
    answer: 2,
    explanation:
      'If the bandwidth B doubles and the signal-to-noise ratio S/N remains constant, then C = 2B * log2(1 + S/N) is exactly double the original capacity. The Shannon-Hartley formula shows capacity scales linearly with bandwidth when SNR is fixed.',
  },
  {
    id: 't3-q3',
    chapterId: 3,
    question:
      'Does feedback increase the capacity of a discrete memoryless channel?',
    options: [
      'Yes, feedback always increases capacity',
      'Yes, but only for channels with memory',
      'No, feedback does not increase DMC capacity but can simplify coding',
      'No, and feedback actually decreases capacity',
    ],
    answer: 2,
    explanation:
      'Shannon proved that feedback does not increase the capacity of a discrete memoryless channel. However, feedback can simplify the coding scheme, reduce the complexity of achieving near-capacity rates, and improve error exponents.',
  },

  // ─── Topic 4: Huffman Coding ──────────────────────────────────────────
  {
    id: 't4-q1',
    chapterId: 4,
    question:
      'What is the worst-case overhead of a Huffman code compared to the source entropy H(X)?',
    options: [
      'At most log2(n) bits per symbol above H(X)',
      'No overhead; Huffman always achieves H(X)',
      'At most 0.5 bits per symbol above H(X)',
      'At most 1 bit per symbol above H(X)',
    ],
    answer: 3,
    explanation:
      'For a Huffman code, the average codeword length L satisfies H(X) <= L < H(X) + 1. The worst case is just under 1 bit above entropy, which occurs when symbol probabilities are far from powers of 1/2.',
  },
  {
    id: 't4-q2',
    chapterId: 4,
    question:
      'How does the Huffman algorithm construct its optimal prefix-free code?',
    options: [
      'By assigning codewords in alphabetical order of symbols',
      'By repeatedly merging the two least probable symbols into a parent node',
      'By repeatedly splitting the most probable symbol group in half',
      'By using a hash table to map symbols to fixed-length codes',
    ],
    answer: 1,
    explanation:
      'The Huffman algorithm works bottom-up: it starts with all symbols as leaf nodes, then repeatedly combines the two nodes with the lowest probabilities into a new parent node whose probability is their sum, continuing until a single root node remains.',
  },
  {
    id: 't4-q3',
    chapterId: 4,
    question:
      'What advantage does adaptive Huffman coding have over static Huffman coding?',
    options: [
      'It always achieves better compression',
      'It produces shorter maximum codeword lengths',
      'It requires only a single pass over the data',
      'It uses less memory',
    ],
    answer: 2,
    explanation:
      'Adaptive Huffman coding updates the code tree dynamically as symbols are processed, requiring only one pass over the data. Static Huffman coding requires two passes: one to compute symbol frequencies and one to encode. However, adaptive coding is not guaranteed to achieve better compression overall.',
  },

  // ─── Topic 5: Arithmetic & Lempel-Ziv Coding ─────────────────────────
  {
    id: 't5-q1',
    chapterId: 5,
    question:
      'Why can arithmetic coding achieve better compression than Huffman coding on most data?',
    options: [
      'It uses a larger alphabet',
      'It effectively assigns fractional bit lengths to symbols rather than integer lengths',
      'It uses a more complex probability model',
      'It compresses data in parallel',
    ],
    answer: 1,
    explanation:
      'Arithmetic coding encodes the entire message as a single interval, effectively assigning fractional bit lengths to each symbol. Huffman coding is constrained to assign integer-length codewords, which wastes bits when symbol probabilities are not exact powers of 1/2.',
  },
  {
    id: 't5-q2',
    chapterId: 5,
    question:
      'LZ77 compression works by encoding repeated patterns as references to what?',
    options: [
      'A Huffman code tree built from the input',
      'A static dictionary compiled before compression begins',
      'A hash table of all previously seen symbols',
      'Earlier occurrences within a sliding window of recently seen data',
    ],
    answer: 3,
    explanation:
      'LZ77 uses a sliding window approach where each new match is encoded as a (distance, length, next symbol) triple referencing a match within a fixed-size window of previously processed data. This eliminates the need for a pre-built dictionary.',
  },
  {
    id: 't5-q3',
    chapterId: 5,
    question:
      'What makes Lempel-Ziv algorithms "universal" compressors?',
    options: [
      'They converge to the entropy rate for any stationary ergodic source without needing to know the source statistics',
      'They work on any file format without modification',
      'They achieve the same compression ratio on all types of data',
      'They can both compress and decompress in a single pass',
    ],
    answer: 0,
    explanation:
      'Lempel-Ziv algorithms are universal because their compression ratio asymptotically converges to the entropy rate of any stationary ergodic source, regardless of the source\'s statistical properties. No prior knowledge of the distribution is needed.',
  },

  // ─── Topic 6: Lossy Compression (DCT, Wavelets) ──────────────────────
  {
    id: 't6-q1',
    chapterId: 6,
    question:
      'In rate-distortion theory, what does the function R(D) represent?',
    options: [
      'The maximum distortion at a given rate',
      'The ratio of data size to compressed size',
      'The minimum bit rate needed to achieve distortion level D',
      'The redundancy of the source at distortion D',
    ],
    answer: 2,
    explanation:
      'The rate-distortion function R(D) gives the minimum number of bits per symbol required to represent the source such that the expected distortion does not exceed D. It defines the fundamental limit of lossy compression.',
  },
  {
    id: 't6-q2',
    chapterId: 6,
    question:
      'What is the main advantage of wavelet-based compression over block DCT compression?',
    options: [
      'Wavelets are computationally simpler',
      'Wavelets avoid blocking artifacts by processing the entire image at once',
      'Wavelets produce smaller file sizes at all quality levels',
      'Wavelets require no quantization step',
    ],
    answer: 1,
    explanation:
      'Wavelet transforms operate on the entire image rather than independent blocks, eliminating the blocking artifacts (visible discontinuities at block boundaries) that plague DCT-based methods like JPEG at low bitrates.',
  },
  {
    id: 't6-q3',
    chapterId: 6,
    question:
      'In JPEG compression, which step introduces the actual information loss?',
    options: [
      'The DCT transform',
      'The color space conversion (RGB to YCbCr)',
      'Huffman entropy coding',
      'Quantization of DCT coefficients',
    ],
    answer: 3,
    explanation:
      'Quantization is the lossy step in JPEG: DCT coefficients are divided by quantization step sizes and rounded to integers, permanently discarding fine detail. The DCT itself is reversible, color conversion is nearly lossless, and Huffman coding is lossless.',
  },

  // ─── Topic 7: Hamming Codes ───────────────────────────────────────────
  {
    id: 't7-q1',
    chapterId: 7,
    question:
      'A code with minimum distance d_min = 5 can correct up to how many errors?',
    options: ['2 errors', '1 error', '3 errors', '4 errors'],
    answer: 0,
    explanation:
      'A code with minimum distance d_min can correct up to floor((d_min - 1) / 2) errors. For d_min = 5: floor((5 - 1) / 2) = floor(2) = 2 errors. It can also detect up to 4 errors (d_min - 1).',
  },
  {
    id: 't7-q2',
    chapterId: 7,
    question:
      'In a (7,4) Hamming code, how many parity bits are added to 4 data bits?',
    options: ['1 parity bit', '2 parity bits', '3 parity bits', '4 parity bits'],
    answer: 2,
    explanation:
      'A (7,4) Hamming code encodes 4 data bits into 7 total bits, so it adds 7 - 4 = 3 parity bits. These parity bits are placed at positions 1, 2, and 4 (powers of 2), and the nonzero syndrome directly indicates the position of a single-bit error.',
  },
  {
    id: 't7-q3',
    chapterId: 7,
    question:
      'What does a nonzero syndrome indicate in Hamming code decoding?',
    options: [
      'The message was transmitted correctly',
      'Multiple errors have occurred and cannot be corrected',
      'The entire codeword must be retransmitted',
      'The binary value of the syndrome gives the position of the bit error',
    ],
    answer: 3,
    explanation:
      'In a Hamming code, the syndrome s = H * r^T is computed by multiplying the parity-check matrix by the received vector. A zero syndrome means no error was detected. A nonzero syndrome directly encodes the binary position of the single-bit error, enabling immediate correction.',
  },

  // ─── Topic 8: Reed-Solomon & BCH Codes ────────────────────────────────
  {
    id: 't8-q1',
    chapterId: 8,
    question:
      'Why are Reed-Solomon codes particularly effective against burst errors?',
    options: [
      'They use very long block lengths',
      'They include an interleaver as part of the encoding process',
      'They operate on multi-bit symbols, so a burst affecting one symbol counts as a single error',
      'They use convolutional encoding internally',
    ],
    answer: 2,
    explanation:
      'Reed-Solomon codes operate over GF(2^m) where each symbol is m bits wide. A burst error that corrupts several consecutive bits within a single m-bit symbol counts as just one symbol error. An RS code correcting t symbol errors can thus handle bursts up to t*m bits long.',
  },
  {
    id: 't8-q2',
    chapterId: 8,
    question:
      'What does it mean for Reed-Solomon codes to be Maximum Distance Separable (MDS)?',
    options: [
      'They have the maximum possible block length for their alphabet',
      'They achieve the Singleton bound d = n - k + 1 with equality',
      'They can correct the maximum number of errors among all codes',
      'They use the maximum possible field size',
    ],
    answer: 1,
    explanation:
      'An MDS code achieves the Singleton bound d = n - k + 1 with equality, meaning it has the maximum possible minimum distance for any code with the same length n and dimension k. No code can have a higher minimum distance for the same rate.',
  },
  {
    id: 't8-q3',
    chapterId: 8,
    question:
      'In GF(2^8), how are addition and multiplication performed?',
    options: [
      'Addition is bitwise XOR; multiplication is polynomial multiplication modulo an irreducible polynomial',
      'Standard integer addition and multiplication modulo 256',
      'Both are standard floating-point operations',
      'Addition is modular; multiplication uses lookup tables only',
    ],
    answer: 0,
    explanation:
      'In GF(2^m), elements are represented as binary polynomials. Addition is bitwise XOR (coefficient addition modulo 2), and multiplication is polynomial multiplication modulo a chosen irreducible polynomial of degree m, ensuring the result stays within the field.',
  },

  // ─── Topic 9: Convolutional & Turbo Codes ─────────────────────────────
  {
    id: 't9-q1',
    chapterId: 9,
    question:
      'What determines the state of a convolutional code encoder at any given time?',
    options: [
      'The current input bit only',
      'All previously encoded output bits',
      'The K-1 most recent input bits stored in the shift register',
      'The parity-check matrix of the code',
    ],
    answer: 2,
    explanation:
      'A convolutional code with constraint length K uses a shift register with K-1 memory elements. The encoder\'s state is fully determined by the contents of these K-1 memory positions, which hold the most recent K-1 input bits.',
  },
  {
    id: 't9-q2',
    chapterId: 9,
    question:
      'What type of decoding does the Viterbi algorithm perform?',
    options: [
      'Syndrome-based algebraic decoding',
      'Iterative belief propagation decoding',
      'Bit-by-bit maximum a posteriori (MAP) decoding',
      'Maximum-likelihood sequence decoding via dynamic programming',
    ],
    answer: 3,
    explanation:
      'The Viterbi algorithm finds the most likely entire sequence (path through the trellis) given the received data, making it a maximum-likelihood sequence decoder. It uses dynamic programming to reduce the complexity from exponential to linear in the sequence length.',
  },
  {
    id: 't9-q3',
    chapterId: 9,
    question:
      'What key innovation allows turbo codes to approach the Shannon limit?',
    options: [
      'Using very large constraint lengths',
      'Iterative exchange of soft information between two component decoders',
      'Operating over non-binary finite fields',
      'Using algebraic decoding instead of probabilistic decoding',
    ],
    answer: 1,
    explanation:
      'Turbo codes use two parallel convolutional encoders with an interleaver, and the decoder iteratively passes extrinsic soft information (log-likelihood ratios) between two SISO component decoders. This iterative refinement enables performance within a fraction of a dB of the Shannon limit.',
  },

  // ─── Topic 10: Channel Capacity & Shannon Limit ───────────────────────
  {
    id: 't10-q1',
    chapterId: 10,
    question:
      'What is the minimum possible Eb/N0 for reliable communication over an AWGN channel?',
    options: [
      '0 dB',
      '-1.59 dB (= ln 2)',
      '3 dB',
      '-3 dB',
    ],
    answer: 1,
    explanation:
      'The ultimate Shannon limit for the AWGN channel is Eb/N0 = ln(2) which equals approximately -1.59 dB. Below this value, reliable communication is theoretically impossible at any positive data rate, regardless of the coding scheme used.',
  },
  {
    id: 't10-q2',
    chapterId: 10,
    question:
      'What type of matrix defines an LDPC code?',
    options: [
      'A Vandermonde matrix over a finite field',
      'A dense generator matrix',
      'A diagonal matrix with error correction weights',
      'A sparse parity-check matrix with mostly zero entries',
    ],
    answer: 3,
    explanation:
      'LDPC codes are defined by their sparse (low-density) parity-check matrix H, where most entries are zero. This sparsity enables efficient iterative belief propagation decoding on the corresponding factor graph.',
  },
  {
    id: 't10-q3',
    chapterId: 10,
    question:
      'What is the defining theoretical property of polar codes that distinguishes them from other capacity-achieving approaches?',
    options: [
      'They are the first codes with explicit construction that provably achieve capacity for binary-input symmetric channels',
      'They use the largest known minimum distance',
      'They require no decoding algorithm',
      'They work without any redundancy bits',
    ],
    answer: 0,
    explanation:
      'Polar codes, invented by Erdal Arikan in 2009, are the first explicitly constructible codes proven to achieve the capacity of any binary-input discrete memoryless symmetric channel, with efficient O(N log N) encoding and successive cancellation decoding.',
  },

  // ─── Topic 11: Cryptographic Information Theory ───────────────────────
  {
    id: 't11-q1',
    chapterId: 11,
    question:
      'What condition must a cipher satisfy to achieve Shannon\'s perfect secrecy?',
    options: [
      'The key must be computationally hard to guess',
      'The encryption algorithm must be secret',
      'The ciphertext must be statistically independent of the plaintext: I(M;C) = 0',
      'The ciphertext must be shorter than the plaintext',
    ],
    answer: 2,
    explanation:
      'Perfect secrecy requires I(M;C) = 0, meaning the ciphertext reveals absolutely zero information about the plaintext. This is equivalent to requiring P(M|C) = P(M) for all messages and ciphertexts. Shannon proved this requires the key to be at least as long as the message.',
  },
  {
    id: 't11-q2',
    chapterId: 11,
    question:
      'What happens if a one-time pad key is reused for two different messages?',
    options: [
      'Security is maintained as long as the key is random',
      'The XOR of the two ciphertexts reveals the XOR of the two plaintexts, leaking information',
      'The second message cannot be decrypted',
      'The encryption becomes computationally secure instead of information-theoretically secure',
    ],
    answer: 1,
    explanation:
      'If m1 and m2 are encrypted with the same key k: c1 = m1 XOR k and c2 = m2 XOR k. Then c1 XOR c2 = m1 XOR m2, directly revealing the relationship between the two plaintexts. This completely breaks the perfect secrecy guarantee.',
  },
  {
    id: 't11-q3',
    chapterId: 11,
    question:
      'Which entropy measure is most appropriate for evaluating cryptographic key strength against a single-guess attack?',
    options: [
      'Shannon entropy H(X)',
      'Joint entropy H(X,Y)',
      'Min-entropy H_inf = -log2(max p(x))',
      'Conditional entropy H(X|Y)',
    ],
    answer: 2,
    explanation:
      'Min-entropy H_inf = -log2(max p(x)) reflects the probability of the most likely outcome, which is the relevant quantity when an adversary makes their single best guess. A key might have high Shannon entropy but low min-entropy if one key value is much more probable than others.',
  },

  // ─── Topic 12: Data Compression in Practice ───────────────────────────
  {
    id: 't12-q1',
    chapterId: 12,
    question:
      'What entropy coding technique does Zstandard (zstd) use instead of Huffman coding?',
    options: [
      'Arithmetic coding',
      'Range coding',
      'Golomb-Rice coding',
      'Finite-State Entropy (tANS, a form of Asymmetric Numeral Systems)',
    ],
    answer: 3,
    explanation:
      'Zstandard uses tabled Asymmetric Numeral Systems (tANS), a finite-state entropy coder that achieves compression ratios close to arithmetic coding but with speed comparable to Huffman coding. This gives zstd an excellent balance of compression ratio and throughput.',
  },
  {
    id: 't12-q2',
    chapterId: 12,
    question:
      'Why does decompression speed often matter more than compression speed in practice?',
    options: [
      'Data is typically compressed once but decompressed many times',
      'Decompression algorithms are inherently more complex',
      'Decompression uses more memory than compression',
      'Decompression cannot be parallelized',
    ],
    answer: 0,
    explanation:
      'In most use cases, data is compressed once (at creation or ingestion time) and decompressed many times (at each access). This asymmetry means that optimizing decompression speed has a larger impact on total system performance than optimizing compression speed.',
  },
  {
    id: 't12-q3',
    chapterId: 12,
    question:
      'Approximately how much bitrate reduction does H.266/VVC achieve compared to H.265/HEVC at the same visual quality?',
    options: ['10%', '25%', '50%', '75%'],
    answer: 2,
    explanation:
      'H.266/VVC (Versatile Video Coding, finalized in 2020) achieves approximately 50% bitrate reduction compared to H.265/HEVC at equivalent perceptual quality, through larger block sizes, geometric partitioning, improved intra prediction, and other advanced tools.',
  },

  // ─── Topic 13: Information Theory in Machine Learning ─────────────────
  {
    id: 't13-q1',
    chapterId: 13,
    question:
      'Minimizing cross-entropy loss in classification is mathematically equivalent to what?',
    options: [
      'Minimizing the Hamming distance between predictions and labels',
      'Minimizing the L2 norm of the model weights',
      'Maximizing the mutual information between features and labels',
      'Maximizing the log-likelihood of the training data under the model',
    ],
    answer: 3,
    explanation:
      'Cross-entropy loss L = -sum(y_i * log(p_i)) is the negative log-likelihood of the true labels under the predicted distribution. Minimizing cross-entropy is therefore equivalent to maximum likelihood estimation, connecting classification training directly to information theory.',
  },
  {
    id: 't13-q2',
    chapterId: 13,
    question:
      'In the Information Bottleneck framework, what does increasing the penalty on I(X;T) (the compression term) achieve?',
    options: [
      'A representation T that is identical to X',
      'A more compressed representation T that discards irrelevant details about X while retaining information about Y',
      'Complete independence between T and Y',
      'An increase in the model\'s parameter count',
    ],
    answer: 1,
    explanation:
      'The Information Bottleneck objective trades off compression of the input I(X;T) against preservation of relevant information I(T;Y). Increasing the penalty on I(X;T) forces a more compressed representation that discards irrelevant details while retaining as much information about the target Y as possible.',
  },
  {
    id: 't13-q3',
    chapterId: 13,
    question:
      'According to information-theoretic generalization bounds, what relationship exists between I(S;W) and the generalization gap?',
    options: [
      'Higher I(S;W) guarantees better generalization',
      'I(S;W) has no relationship to generalization',
      'The generalization gap equals I(S;W) exactly',
      'Lower I(S;W) (less dependence of learned parameters on training data) implies a tighter generalization bound',
    ],
    answer: 3,
    explanation:
      'The mutual information generalization bound states that the expected generalization gap is bounded by sqrt(I(S;W) / (2n)). Lower I(S;W) means the learned parameters depend less on the specific training set, implying better generalization. This formalizes the intuition that memorization hurts generalization.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
