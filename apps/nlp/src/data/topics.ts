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
  { id: 2, title: 'Deep Learning for NLP' },
  { id: 3, title: 'Applications' },
  { id: 4, title: 'Modern NLP' },
];

export const topics: Topic[] = [
  // Part 1: Foundations
  {
    id: 1,
    title: 'Text Processing Fundamentals',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'The foundational techniques for converting raw text into structured representations that NLP models can consume, including tokenization strategies, morphological analysis, and text normalization pipelines.',
    concepts: [
      {
        id: '1-1',
        name: 'Tokenization & Subword Methods (BPE, WordPiece)',
        description:
          'Tokenization splits raw text into discrete units (tokens) for model consumption. Modern subword tokenizers like BPE and WordPiece balance vocabulary size with the ability to handle unseen words by decomposing them into known subword pieces.',
        keyPoints: [
          'Whitespace and rule-based tokenizers (e.g., spaCy, NLTK word_tokenize) split on spaces and punctuation but struggle with agglutinative languages, compound words, and domain-specific terms',
          'Byte-Pair Encoding (BPE) iteratively merges the most frequent character pairs in a corpus to build a subword vocabulary — used by GPT-2, GPT-3, and RoBERTa with typical vocab sizes of 30K-50K tokens',
          'WordPiece (used by BERT) is similar to BPE but selects merges based on likelihood improvement rather than raw frequency, producing slightly different segmentations',
          'SentencePiece (Google) treats the input as a raw byte stream and learns subword units without pre-tokenization — supports both BPE and unigram language model algorithms, enabling language-agnostic tokenization',
          'Tokenizer choice directly impacts model performance: too small a vocabulary forces excessive splitting (longer sequences, lost semantics), while too large a vocabulary wastes embedding parameters on rare tokens',
        ],
        tradeoffs: [
          'BPE is simple and fast to train but greedy — it may not find the globally optimal segmentation; unigram models explore more candidates but are slower to train',
          'Subword tokenizers handle out-of-vocabulary words gracefully but can split meaningful morphemes in unintuitive ways (e.g., "unhappiness" -> "un", "##happi", "##ness")',
          'Character-level tokenization eliminates OOV issues entirely but produces very long sequences that increase compute cost and make it harder for models to learn word-level semantics',
        ],
        realWorld: [
          'Hugging Face tokenizers library — fast Rust-backed implementations of BPE, WordPiece, and Unigram used across thousands of models',
          'tiktoken (OpenAI) — efficient BPE tokenizer used by GPT-3.5/4, with ~100K token vocabulary optimized for code and multilingual text',
          'SentencePiece powering multilingual models like mT5 and XLM-RoBERTa across 100+ languages',
        ],
      },
      {
        id: '1-2',
        name: 'Stemming & Lemmatization',
        description:
          'Stemming and lemmatization reduce words to their base forms to normalize text and reduce vocabulary size. Stemming uses heuristic rules to chop suffixes, while lemmatization uses morphological analysis to find the dictionary form (lemma).',
        keyPoints: [
          'Porter Stemmer applies a cascade of ~60 rules to strip suffixes (e.g., "running" -> "run", "studies" -> "studi") — fast but aggressive, often producing non-words',
          'Snowball Stemmer (Porter2) improves on the original Porter Stemmer with better handling of edge cases and support for multiple languages including French, German, Spanish, and Russian',
          'Lemmatization uses part-of-speech tags and morphological dictionaries to find the true lemma — "better" -> "good", "ran" -> "run", "mice" -> "mouse" — producing valid words but requiring more computation',
          'spaCy provides fast lemmatization using lookup tables and rule-based approaches, while WordNet-based lemmatizers (NLTK) require POS disambiguation for accuracy',
          'In modern transformer-based NLP, explicit stemming/lemmatization is less common because subword tokenizers and contextual embeddings capture morphological relationships implicitly',
        ],
        tradeoffs: [
          'Stemming is fast and language-independent (rule-based) but loses information — "university" and "universe" may map to the same stem, creating false conflations',
          'Lemmatization preserves meaning but requires language-specific resources (dictionaries, POS taggers) and is significantly slower than stemming',
          'For information retrieval and search, stemming increases recall (find more documents) but may reduce precision; lemmatization offers a better precision-recall trade-off',
        ],
        realWorld: [
          'Elasticsearch uses Snowball stemming by default for its full-text search analyzers across dozens of languages',
          'spaCy lemmatizer used in production NLP pipelines for text normalization before feature extraction',
          'Medical NLP systems using MetaMap and UMLS for domain-specific lemmatization of clinical terms',
        ],
      },
      {
        id: '1-3',
        name: 'Regex & Text Normalization',
        description:
          'Text normalization pipelines clean and standardize raw text before model input, using regular expressions, Unicode handling, and domain-specific rules to remove noise and ensure consistent formatting.',
        keyPoints: [
          'Common normalization steps include: lowercasing, removing HTML tags, expanding contractions ("don\'t" -> "do not"), handling Unicode (NFKD decomposition), and removing or replacing special characters',
          'Regular expressions are the workhorse of text cleaning — pattern matching for emails, URLs, phone numbers, dates, and other structured entities within unstructured text',
          'Sentence boundary detection (SBD) is surprisingly hard — abbreviations ("Dr.", "U.S."), decimal numbers ("3.14"), and ellipses ("...") create ambiguous periods that naive splitting mishandles',
          'Unicode normalization (NFC, NFD, NFKC, NFKD) ensures that visually identical characters (e.g., accented characters composed vs. precomposed) are represented consistently, preventing duplicate tokens',
          'Domain-specific normalization is critical: medical text needs abbreviation expansion ("pt" -> "patient"), social media needs emoji handling and slang normalization, legal text needs citation standardization',
        ],
        tradeoffs: [
          'Aggressive normalization (removing all punctuation, lowercasing) simplifies the vocabulary but loses information — "US" (country) vs "us" (pronoun), or sentiment cues from capitalization and punctuation',
          'Hand-crafted regex rules are precise but brittle — they break on unexpected input formats and require ongoing maintenance as data distributions shift',
          'Language-specific normalization is more accurate but costly to develop; universal approaches sacrifice quality for coverage across languages',
        ],
        realWorld: [
          'ftfy (Python) — fixes Unicode mojibake, HTML entities, and encoding errors in large-scale text corpora',
          'clean-text library used for preprocessing Common Crawl data before training large language models',
          'Twitter/X API preprocessing pipelines that handle @mentions, hashtags, URLs, and emoji before sentiment analysis',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Language Representations',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'How text is converted into numerical vectors that capture semantic meaning, from simple count-based methods to dense embeddings that encode distributional semantics and contextual information.',
    concepts: [
      {
        id: '2-1',
        name: 'Bag-of-Words & TF-IDF',
        description:
          'Bag-of-words (BoW) represents documents as sparse vectors of word counts, ignoring word order. TF-IDF refines this by weighting terms based on their importance — frequent within a document but rare across the corpus.',
        keyPoints: [
          'BoW creates a vector of dimension |V| (vocabulary size) where each entry is the count (or binary presence) of a word — simple but produces extremely high-dimensional sparse vectors',
          'TF-IDF = TF(t,d) x IDF(t) where TF measures term frequency in a document and IDF = log(N/df_t) downweights terms appearing in many documents, highlighting discriminative words',
          'Scikit-learn\'s CountVectorizer (BoW) and TfidfVectorizer are the standard implementations, supporting n-grams, min/max document frequency filtering, and custom tokenizers',
          'BM25 (Okapi BM25) is a TF-IDF variant that adds term frequency saturation and document length normalization — the default ranking function in Elasticsearch and Lucene',
          'BoW/TF-IDF cannot capture word order, synonymy, or polysemy — "bank account" and "river bank" produce similar representations despite different meanings',
        ],
        tradeoffs: [
          'BoW/TF-IDF is fast, interpretable, and requires no training — but the resulting sparse vectors scale poorly with vocabulary size and cannot capture semantic similarity between different words',
          'N-gram extensions (bigrams, trigrams) partially capture word order but exponentially increase dimensionality and sparsity',
          'TF-IDF is still competitive with embeddings for many classification tasks on smaller datasets where training data is limited',
        ],
        realWorld: [
          'Elasticsearch and Apache Solr use BM25 (a TF-IDF variant) as their default relevance scoring algorithm for billions of queries daily',
          'Spam filters using TF-IDF features with logistic regression remain effective and interpretable baselines',
          'scikit-learn pipelines combining TfidfVectorizer with SVM or Naive Bayes for production text classification',
        ],
      },
      {
        id: '2-2',
        name: 'Word Embeddings (Word2Vec, GloVe, FastText)',
        description:
          'Static word embeddings map words to dense, low-dimensional vectors (50-300d) learned from large corpora, capturing semantic relationships through distributional similarity. Each word gets exactly one vector regardless of context.',
        keyPoints: [
          'Word2Vec (Mikolov et al., 2013) learns embeddings via two architectures: Skip-gram (predict context from center word) and CBOW (predict center word from context) — trained on local context windows of 5-10 words',
          'GloVe (Pennington et al., 2014) combines global co-occurrence statistics with local context window methods — factorizes the log of the word-word co-occurrence matrix, often producing slightly better analogy performance',
          'FastText (Bojanowski et al., 2017, Facebook) extends Word2Vec by representing words as bags of character n-grams — can generate embeddings for out-of-vocabulary words by summing their subword vectors',
          'Famous analogy property: king - man + woman = queen demonstrates that linear relationships in embedding space capture semantic and syntactic regularities',
          'Pre-trained embeddings (GloVe 6B, fastText crawl-300d) are commonly used to initialize the embedding layer of downstream models, providing a strong starting point especially for small datasets',
        ],
        tradeoffs: [
          'Static embeddings assign one vector per word, so they cannot disambiguate polysemy — "bank" has the same representation whether it means financial institution or river bank',
          'Word2Vec requires large corpora (billions of tokens) to learn high-quality embeddings; on small corpora, random initialization with task-specific training often works better',
          'FastText handles morphologically rich languages and rare words better than Word2Vec/GloVe but produces larger models due to subword n-gram storage',
        ],
        realWorld: [
          'Gensim library providing efficient Word2Vec, FastText, and GloVe training and loading for Python NLP pipelines',
          'Pre-trained fastText embeddings available for 157 languages from Facebook Research, enabling NLP in low-resource languages',
          'Spotify using Word2Vec-style embeddings on playlists (treating songs as "words") for music recommendation',
        ],
      },
      {
        id: '2-3',
        name: 'Contextual Embeddings & ELMo',
        description:
          'Contextual embeddings generate different vector representations for the same word depending on its surrounding context, solving the polysemy problem of static embeddings. ELMo was the first major contextual embedding model.',
        keyPoints: [
          'ELMo (Embeddings from Language Models, Peters et al., 2018) uses a 2-layer bidirectional LSTM trained as a language model — the final embedding for each word is a learned weighted combination of all LSTM layers',
          'Unlike static embeddings, ELMo produces different vectors for "bank" in "river bank" vs. "bank account" because the bidirectional LSTM encodes the full sentence context',
          'ELMo demonstrated that different layers capture different linguistic properties: lower layers capture syntax (POS, constituency), higher layers capture semantics (word sense, coreference)',
          'The transition from feature-based models (ELMo features fed to task-specific architectures) to fine-tuning-based models (BERT) represented a paradigm shift — ELMo was the bridge between these two eras',
          'Contextual embeddings consistently improved state-of-the-art across NLP tasks by 5-25% over static embeddings when ELMo was introduced, demonstrating the importance of context-dependent representations',
        ],
        tradeoffs: [
          'Contextual embeddings require running the full model at inference time for every input, making them orders of magnitude slower than static embedding lookups',
          'ELMo\'s bidirectional LSTM is sequential by nature and cannot be parallelized across time steps, limiting throughput — this was a key motivation for the Transformer architecture',
          'Feature-based approaches (adding ELMo vectors to existing models) are simpler to integrate but generally underperform fine-tuning approaches where the entire model is updated for the downstream task',
        ],
        realWorld: [
          'AllenNLP library providing pre-trained ELMo models and easy integration with PyTorch-based NLP models',
          'ELMo achieving state-of-the-art on SQuAD, SNLI, and NER tasks in 2018, catalyzing the pre-train/fine-tune revolution',
          'Flair NLP library stacking ELMo-style contextual string embeddings with other features for state-of-the-art NER',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Statistical NLP',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Classical probabilistic approaches to language modeling, sequence labeling, and text classification that formed the backbone of NLP before the deep learning revolution and still provide important theoretical foundations.',
    concepts: [
      {
        id: '3-1',
        name: 'N-gram Language Models',
        description:
          'N-gram models estimate the probability of a word given the previous N-1 words using maximum likelihood estimation on corpus counts. They are the simplest language models and remain useful as baselines and in resource-constrained settings.',
        keyPoints: [
          'A bigram model estimates P(w_n | w_{n-1}) = count(w_{n-1}, w_n) / count(w_{n-1}); trigrams condition on two preceding words — higher N captures more context but requires exponentially more data',
          'The chain rule of probability allows decomposing P(sentence) = P(w1) * P(w2|w1) * P(w3|w1,w2) * ... — n-gram models apply the Markov assumption to truncate this to N-1 words of context',
          'Smoothing techniques are essential because raw MLE assigns zero probability to unseen n-grams: Laplace (add-1), Kneser-Kney (interpolation based on continuation probability), and Stupid Backoff (used at Google scale)',
          'Perplexity = 2^{-avg log2 P(w_i | context)} is the standard evaluation metric for language models — lower perplexity means the model assigns higher probability to the test data',
          'KenLM provides highly optimized n-gram language model estimation and querying, supporting models with billions of n-grams in compressed trie data structures',
        ],
        tradeoffs: [
          'N-gram models are fast to train and query (table lookups) but cannot capture long-range dependencies — even 5-grams miss important context in most natural language',
          'Increasing N improves coverage of linguistic patterns but causes data sparsity — most possible n-grams never appear in training data, requiring aggressive smoothing',
          'N-gram models store explicit counts and thus have predictable memory usage, unlike neural models — this makes them suitable for on-device and edge deployments',
        ],
        realWorld: [
          'Google N-gram Viewer analyzing word frequency trends across 500 years of published books using massive n-gram counts',
          'KenLM used in speech recognition (Kaldi, Mozilla DeepSpeech) and machine translation for fast language model scoring during beam search decoding',
          'Predictive text on older mobile keyboards (T9, early Android) using trigram models for next-word prediction',
        ],
      },
      {
        id: '3-2',
        name: 'Hidden Markov Models & POS Tagging',
        description:
          'Hidden Markov Models (HMMs) model sequences where observed outputs (words) depend on hidden states (POS tags). The Viterbi algorithm efficiently finds the most likely tag sequence, making HMMs foundational for sequence labeling tasks.',
        keyPoints: [
          'An HMM is defined by: states (POS tags), observations (words), transition probabilities P(tag_i | tag_{i-1}), emission probabilities P(word | tag), and initial state distribution',
          'The Viterbi algorithm uses dynamic programming to find the most likely hidden state sequence in O(T * S^2) time, where T is sequence length and S is the number of states',
          'The Forward algorithm computes the total probability of an observation sequence (summing over all possible state paths), used for model evaluation and training via Baum-Welch (EM algorithm)',
          'HMM-based POS taggers achieve ~95-97% accuracy on English text — competitive with early neural approaches but surpassed by bidirectional LSTM and Transformer-based taggers at ~98%+',
          'The Markov assumption (current state depends only on the previous state) limits HMMs — Conditional Random Fields (CRFs) remove this limitation by modeling the full observation sequence jointly',
        ],
        tradeoffs: [
          'HMMs are generative models (model joint P(tags, words)) which means they can generate synthetic data but are less flexible than discriminative models (CRFs) that model P(tags | words) directly',
          'The first-order Markov assumption is linguistically unrealistic — whether a noun follows depends on more than just the previous tag — but higher-order HMMs face combinatorial explosion',
          'HMMs are mathematically elegant and well-understood but require feature engineering (hand-crafted emission distributions) compared to neural models that learn features automatically',
        ],
        realWorld: [
          'NLTK HMM tagger used in educational settings to teach sequence labeling fundamentals',
          'Speech recognition systems (pre-deep learning) using HMMs to model phoneme sequences — each phoneme state emits acoustic features',
          'Biological sequence analysis using HMMs (HMMER tool) for protein family detection — direct analog of NLP sequence labeling',
        ],
      },
      {
        id: '3-3',
        name: 'Bayesian Methods & Naive Bayes Classification',
        description:
          'Naive Bayes applies Bayes\' theorem with the "naive" assumption of feature independence to classify text. Despite this strong assumption, it is surprisingly effective for text classification and remains a go-to baseline.',
        keyPoints: [
          'Bayes\' theorem: P(class | document) is proportional to P(document | class) * P(class) — Naive Bayes assumes all word features are conditionally independent given the class, making computation tractable',
          'Multinomial Naive Bayes uses word counts as features (suitable for TF-IDF or BoW inputs); Bernoulli NB uses binary word presence/absence; Gaussian NB handles continuous features',
          'Despite the independence assumption being clearly violated in natural language (words are highly correlated), Naive Bayes works well because classification only requires the correct ranking of class posteriors, not calibrated probabilities',
          'Laplace smoothing (add-alpha) prevents zero probabilities for unseen words: P(w|c) = (count(w,c) + alpha) / (count(c) + alpha * |V|) — alpha=1 is standard but smaller values often work better',
          'Training is extremely fast (single pass through data to compute counts) and prediction is O(|V| * |C|) — making Naive Bayes ideal for real-time classification of streaming text',
        ],
        tradeoffs: [
          'Naive Bayes is fast, simple, and works well with small training data, but its probability estimates are poorly calibrated — it tends to push predictions toward 0 or 1',
          'The independence assumption means Naive Bayes cannot model feature interactions (e.g., "not good" being negative despite "good" being positive) without explicit n-gram features',
          'Naive Bayes degrades gracefully with irrelevant features (they average out) but benefits less from feature engineering compared to models like SVMs or neural networks',
        ],
        realWorld: [
          'SpamAssassin and early Gmail spam filters using Naive Bayes trained on bag-of-words features — Paul Graham\'s "A Plan for Spam" (2002) popularized this approach',
          'scikit-learn MultinomialNB used as a fast baseline in text classification competitions and production systems',
          'Language identification systems using character n-gram Naive Bayes to detect the language of input text (e.g., langdetect, fastText language ID)',
        ],
      },
    ],
  },

  // Part 2: Deep Learning for NLP
  {
    id: 4,
    title: 'Sequence Models',
    part: 2,
    partTitle: 'Deep Learning for NLP',
    summary:
      'Recurrent neural networks and their extensions for processing sequential text data, including the attention mechanism that enabled models to selectively focus on relevant parts of the input.',
    concepts: [
      {
        id: '4-1',
        name: 'RNNs & LSTMs',
        description:
          'Recurrent Neural Networks process sequences one token at a time, maintaining a hidden state that carries information forward. LSTMs add gating mechanisms to control information flow, solving the vanishing gradient problem that limits vanilla RNNs.',
        keyPoints: [
          'Vanilla RNNs compute h_t = tanh(W_h * h_{t-1} + W_x * x_t + b) — the hidden state h_t theoretically carries all previous context but in practice suffers from vanishing/exploding gradients beyond ~10-20 tokens',
          'LSTMs (Hochreiter & Schmidhuber, 1997) introduce three gates: forget gate (what to discard), input gate (what to store), and output gate (what to expose) — plus a cell state that can carry information across long distances unchanged',
          'GRUs (Cho et al., 2014) simplify LSTMs to two gates (reset and update), achieving comparable performance with fewer parameters — often preferred when compute is limited',
          'Bidirectional RNNs/LSTMs process the sequence in both directions, concatenating forward and backward hidden states — critical for tasks where future context matters (NER, POS tagging)',
          'Stacked (deep) LSTMs with 2-4 layers and dropout between layers were the dominant architecture for NLP from 2015-2018, before Transformers took over',
        ],
        tradeoffs: [
          'LSTMs capture longer dependencies than vanilla RNNs but are inherently sequential — each time step depends on the previous one, preventing parallelization across sequence positions',
          'Bidirectional LSTMs see both past and future context but cannot be used for autoregressive generation (where future tokens are unknown), limiting their use to encoding tasks',
          'LSTMs have O(T) sequential steps for sequence length T, making them much slower to train than Transformers (O(1) depth with parallel attention) on modern GPU hardware',
        ],
        realWorld: [
          'Google Neural Machine Translation (GNMT, 2016) using 8-layer bidirectional LSTM encoder + 8-layer LSTM decoder — the system that first made neural MT competitive with phrase-based systems',
          'ELMo using 2-layer bidirectional LSTMs to produce the first widely-used contextual word embeddings',
          'Apple Siri and Google Assistant (pre-2019) using bidirectional LSTM models for intent detection and slot filling in voice commands',
        ],
      },
      {
        id: '4-2',
        name: 'Sequence-to-Sequence & Attention',
        description:
          'Sequence-to-sequence models use an encoder to compress input into a fixed vector and a decoder to generate output. The attention mechanism allows the decoder to dynamically focus on different encoder positions, eliminating the information bottleneck.',
        keyPoints: [
          'The vanilla seq2seq model (Sutskever et al., 2014) encodes the entire input into a single fixed-size context vector c — the decoder LSTM generates output tokens conditioned on c and previous outputs',
          'The information bottleneck: compressing arbitrary-length input into a fixed-size vector loses information, especially for long sequences — performance degrades significantly beyond ~20-30 tokens',
          'Bahdanau attention (2015) computes a weighted sum of all encoder hidden states at each decoder step: attention(h_dec, h_enc) = softmax(score(h_dec, h_enc_i)) * h_enc_i, creating a dynamic context vector',
          'Luong attention (2015) introduced three scoring functions: dot product, general (learned bilinear), and concat — dot product attention is the simplest and fastest',
          'Attention provides interpretability through attention weights — visualizing which source tokens the model focuses on when generating each output token reveals alignment patterns',
        ],
        tradeoffs: [
          'Attention adds O(T_src * T_tgt) computation per decoder step (comparing each decoder position to every encoder position) but dramatically improves quality, especially on long sequences',
          'Soft attention (weighted average) is differentiable and trainable via backpropagation but attends to all positions; hard attention selects discrete positions but requires reinforcement learning to train',
          'Attention weights are often interpreted as alignments, but research shows they can be misleading — high attention weight does not always correlate with feature importance for the final prediction',
        ],
        realWorld: [
          'Google\'s sequence-to-sequence with attention powering Google Translate from 2016-2020 before being replaced by Transformer-based models',
          'OpenNMT and Fairseq providing open-source seq2seq-with-attention implementations for machine translation research',
          'Attention mechanisms adopted far beyond NLP — image captioning (Show, Attend and Tell), speech recognition (Listen, Attend and Spell), and protein structure prediction',
        ],
      },
      {
        id: '4-3',
        name: 'Encoder-Decoder Architectures',
        description:
          'The encoder-decoder framework provides a general architecture for sequence transduction tasks where input and output sequences may differ in length and structure. It underpins machine translation, summarization, and question answering.',
        keyPoints: [
          'The encoder maps an input sequence to a sequence of continuous representations; the decoder generates the output sequence one token at a time, conditioned on the encoder representations and previously generated tokens',
          'Teacher forcing trains the decoder by feeding ground-truth previous tokens (rather than model predictions) — accelerates training convergence but creates exposure bias (train-test mismatch)',
          'Beam search decoding maintains the top-K partial hypotheses at each step, expanding each by all vocabulary tokens and keeping the K highest-scoring — beam width 4-10 is typical for translation',
          'Copy mechanisms (Pointer Networks, CopyNet) allow the decoder to copy tokens directly from the input — critical for summarization, question answering, and any task where output overlaps with input',
          'The encoder-decoder paradigm generalizes beyond sequence-to-sequence: graph-to-sequence (code generation from ASTs), table-to-text, and image-to-sequence (captioning) all follow this pattern',
        ],
        tradeoffs: [
          'Teacher forcing speeds up training but causes exposure bias — the model never learns to recover from its own mistakes during training, leading to error accumulation at inference (especially for long outputs)',
          'Beam search produces higher-quality outputs than greedy decoding but is K times slower and can produce generic, repetitive text — sampling-based methods often produce more diverse outputs',
          'Autoregressive decoding generates tokens one at a time (O(T) sequential steps), creating a latency bottleneck — non-autoregressive models generate all tokens in parallel but sacrifice quality',
        ],
        realWorld: [
          'T5 (Text-to-Text Transfer Transformer) framing all NLP tasks as text-to-text encoder-decoder problems — classification, translation, summarization all use the same architecture',
          'BART (Facebook) using encoder-decoder architecture with denoising pre-training for state-of-the-art summarization',
          'Whisper (OpenAI) using an encoder-decoder Transformer for speech-to-text, processing audio spectrograms as encoder input',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Transformer Architecture',
    part: 2,
    partTitle: 'Deep Learning for NLP',
    summary:
      'The Transformer architecture replaced recurrence with self-attention, enabling massive parallelization and capturing long-range dependencies efficiently. It is the foundation of virtually all modern NLP models.',
    concepts: [
      {
        id: '5-1',
        name: 'Self-Attention Mechanism',
        description:
          'Self-attention computes a weighted representation of every position in a sequence by comparing each position to all others. This allows each token to directly attend to any other token regardless of distance, capturing global dependencies in a single layer.',
        keyPoints: [
          'Each input token is projected into three vectors: Query (Q), Key (K), and Value (V) using learned weight matrices — Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) * V',
          'The scaling factor 1/sqrt(d_k) prevents dot products from growing too large in high dimensions, which would push softmax into saturated regions with near-zero gradients',
          'Self-attention has O(n^2 * d) complexity where n is sequence length and d is dimension — this quadratic scaling limits the maximum context window and has motivated efficient attention variants',
          'Causal (masked) self-attention in decoder models prevents positions from attending to future tokens — implemented by setting upper-triangular attention scores to negative infinity before softmax',
          'Unlike RNNs, self-attention computes all positions in parallel — the entire attention matrix can be computed as a single batched matrix multiplication on GPU, enabling massive throughput',
        ],
        tradeoffs: [
          'Self-attention captures arbitrary-distance dependencies in O(1) layers (vs. O(n) for RNNs) but has O(n^2) memory and compute cost, making it expensive for very long sequences (>8K tokens without optimization)',
          'Self-attention has no inherent notion of position or order — it treats the input as a set, not a sequence — requiring explicit positional encoding to inject order information',
          'Full self-attention allows every token to attend to every other token, which is powerful but may attend to irrelevant positions — sparse attention patterns (local + global) can be more efficient and equally effective',
        ],
        realWorld: [
          'FlashAttention (Dao et al., 2022) reducing self-attention memory from O(n^2) to O(n) through tiling and recomputation — now standard in all major LLM training frameworks',
          'Multi-Query Attention (MQA) and Grouped-Query Attention (GQA) in Llama 2/3 sharing key-value heads to reduce KV cache memory during inference',
          'Vision Transformers (ViT) applying self-attention to image patches, extending the mechanism beyond NLP to computer vision',
        ],
      },
      {
        id: '5-2',
        name: 'Positional Encoding & Multi-Head Attention',
        description:
          'Positional encodings inject sequence order information into the Transformer since self-attention is permutation-invariant. Multi-head attention runs multiple attention operations in parallel, allowing the model to capture different types of relationships simultaneously.',
        keyPoints: [
          'Sinusoidal positional encoding (original Transformer): PE(pos, 2i) = sin(pos/10000^{2i/d}), PE(pos, 2i+1) = cos(pos/10000^{2i/d}) — generates unique patterns for each position that the model can learn to interpret',
          'Learned positional embeddings (BERT, GPT-2) train a separate embedding for each position — simpler but limited to the maximum sequence length seen during training',
          'Rotary Position Embedding (RoPE, used by Llama, Mistral) encodes position by rotating the query and key vectors — naturally supports relative position encoding and can extrapolate to longer sequences than training',
          'Multi-head attention splits Q, K, V into H heads: each head has dimension d_model/H and operates independently — the outputs are concatenated and projected, allowing different heads to learn different attention patterns',
          'Research shows that different attention heads specialize: some track syntactic dependencies (subject-verb), others capture coreference, positional patterns, or semantic similarity',
        ],
        tradeoffs: [
          'Sinusoidal encodings generalize to any sequence length in theory but degrade in practice beyond training lengths; learned embeddings are more expressive but cannot extrapolate at all',
          'More attention heads allow richer parallel attention patterns but each head has smaller dimension (d/H), potentially limiting per-head capacity — 8-16 heads with d=512-1024 is typical',
          'RoPE enables length extrapolation but requires careful scaling (YaRN, NTK-aware) to maintain quality at 2-8x training length — naive extrapolation still degrades performance',
        ],
        realWorld: [
          'ALiBi (Attention with Linear Biases, used in BLOOM and MPT) replacing positional encodings with linear attention bias — simpler and better length generalization',
          'Llama 2 (Meta) using RoPE with 4096 context length, extended to 128K+ via YaRN scaling in community fine-tunes',
          'Attention head visualization tools (BertViz, exBERT) revealing interpretable patterns — e.g., heads that consistently attend to the previous token, to separators, or to syntactically related words',
        ],
      },
      {
        id: '5-3',
        name: 'Pre-training & Fine-tuning Paradigm',
        description:
          'The pre-train/fine-tune paradigm first trains a large model on massive unlabeled text (self-supervised), then adapts it to specific tasks with smaller labeled datasets. This transfer learning approach revolutionized NLP by eliminating the need for task-specific architectures.',
        keyPoints: [
          'Pre-training objectives: Masked Language Modeling (BERT — predict randomly masked tokens), Causal Language Modeling (GPT — predict next token), and Span Corruption (T5 — reconstruct corrupted spans)',
          'Fine-tuning updates all model parameters on task-specific data — typically requires only hundreds to thousands of labeled examples because the pre-trained model already understands language structure',
          'Parameter-efficient fine-tuning (PEFT) methods freeze most pre-trained weights and only train small adapters: LoRA adds low-rank matrices (0.1-1% of parameters), prefix tuning prepends learned tokens, and prompt tuning learns continuous prompt embeddings',
          'The pre-training corpus determines model capabilities: Common Crawl provides broad coverage, GitHub code enables code understanding, scientific papers enable reasoning — data mixture is a critical design choice',
          'Catastrophic forgetting during fine-tuning can erase pre-trained knowledge — learning rate warmup, gradual unfreezing, and regularization (weight decay, dropout) help preserve general capabilities',
        ],
        tradeoffs: [
          'Pre-training is enormously expensive (GPT-3: ~$4.6M, Llama 2 70B: ~$2M in compute) but amortized across all downstream tasks — fine-tuning is cheap ($10-$1000) and fast (hours, not months)',
          'Full fine-tuning achieves the best task performance but requires storing a separate copy of all parameters per task; PEFT methods use <1% of parameters but may slightly underperform',
          'Larger pre-trained models generally fine-tune better with less data (few-shot capability) but are more expensive to serve — model distillation can recover some of this gap',
        ],
        realWorld: [
          'Hugging Face Hub hosting 500K+ pre-trained and fine-tuned models, with the transformers library enabling fine-tuning in ~20 lines of code',
          'LoRA becoming the default fine-tuning method for open-source LLMs — QLoRA (quantized LoRA) enables fine-tuning 65B models on a single 48GB GPU',
          'OpenAI fine-tuning API allowing GPT-3.5/4 customization for enterprise tasks like customer support, legal document analysis, and code review',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Large Language Models',
    part: 2,
    partTitle: 'Deep Learning for NLP',
    summary:
      'The scaling of Transformer models to billions of parameters has produced Large Language Models (LLMs) with remarkable emergent capabilities — from few-shot learning to complex reasoning — fundamentally changing how NLP systems are built.',
    concepts: [
      {
        id: '6-1',
        name: 'GPT & Autoregressive Models',
        description:
          'GPT (Generative Pre-trained Transformer) models use causal (left-to-right) language modeling to predict the next token. Scaling this simple objective to hundreds of billions of parameters and trillions of tokens produced models capable of sophisticated reasoning and generation.',
        keyPoints: [
          'GPT architecture: decoder-only Transformer with causal masking — each position can only attend to previous positions, naturally suited for text generation by repeatedly predicting the next token',
          'The scaling trajectory: GPT-1 (117M params, 2018) -> GPT-2 (1.5B, 2019) -> GPT-3 (175B, 2020) -> GPT-4 (rumored ~1.8T MoE, 2023) demonstrated that scaling reliably improves capabilities',
          'In-context learning: GPT-3 demonstrated that large models can perform new tasks from just a few examples in the prompt (few-shot) without any parameter updates — a paradigm shift from fine-tuning',
          'The Chinchilla scaling laws (Hoffmann et al., 2022) showed that most LLMs were undertrained: optimal compute allocation suggests training tokens should scale linearly with model size (~20 tokens per parameter)',
          'Open-source autoregressive models: Llama (Meta), Mistral, Falcon, and Qwen have democratized LLM access — Llama 3 70B approaches GPT-4 level on many benchmarks',
        ],
        tradeoffs: [
          'Autoregressive models generate high-quality text but are slow at inference — each token requires a full forward pass through the model, and KV-cache memory grows linearly with sequence length',
          'Decoder-only architecture cannot efficiently encode bidirectional context (unlike BERT), making it less natural for classification and extraction tasks — though instruction tuning largely closes this gap',
          'Larger models have better few-shot ability but are prohibitively expensive to serve — a 70B model requires ~140GB VRAM at FP16, driving demand for quantization (GPTQ, AWQ) and distillation',
        ],
        realWorld: [
          'ChatGPT (GPT-3.5/4) handling billions of queries for conversational AI, code generation, writing assistance, and analysis',
          'GitHub Copilot using Codex (GPT-3 fine-tuned on code) to provide inline code suggestions adopted by millions of developers',
          'Llama 3.1 405B being the largest open-weights model, enabling enterprises to deploy GPT-4-class capabilities on their own infrastructure',
        ],
      },
      {
        id: '6-2',
        name: 'BERT & Masked Language Modeling',
        description:
          'BERT (Bidirectional Encoder Representations from Transformers) introduced masked language modeling, where the model predicts randomly masked tokens using bidirectional context. This produces rich representations ideal for understanding tasks like classification, NER, and question answering.',
        keyPoints: [
          'BERT pre-training uses two objectives: Masked Language Modeling (randomly mask 15% of tokens and predict them) and Next Sentence Prediction (predict if two sentences are consecutive) — NSP was later found to be less important',
          'BERT-base (110M params, 12 layers) and BERT-large (340M params, 24 layers) were pre-trained on BooksCorpus + English Wikipedia (~3.3B tokens) — small by modern standards but revolutionary in 2018',
          'BERT variants optimized different aspects: RoBERTa (more data, no NSP, dynamic masking), ALBERT (parameter sharing for efficiency), DistilBERT (knowledge distillation for 60% size at 97% performance), DeBERTa (disentangled attention)',
          'For classification, BERT adds a [CLS] token whose final representation is passed through a linear layer — for token-level tasks (NER), each token\'s representation gets its own classifier',
          'BERT established the paradigm of using a single pre-trained model as the foundation for all NLP tasks — before BERT, each task typically required a custom architecture',
        ],
        tradeoffs: [
          'BERT\'s bidirectional context makes it excellent for understanding tasks but it cannot generate text autoregressively — it is an encoder, not a decoder',
          'Masked language modeling sees only 15% of tokens as training signal per example (the masked ones), making it less sample-efficient than causal LM which learns from every token position',
          'BERT\'s maximum sequence length (typically 512 tokens) limits its applicability to long documents — Longformer and BigBird extended this to 4096+ with sparse attention',
        ],
        realWorld: [
          'Google Search using BERT (and later MUM) to understand query intent — the single biggest improvement to search quality in years, affecting ~10% of English queries at launch',
          'Hugging Face transformers making BERT fine-tuning accessible — BERT remains the most downloaded model family on the Hub',
          'Clinical BERT, SciBERT, FinBERT, and LegalBERT — domain-specific BERT variants pre-trained on specialized corpora for healthcare, science, finance, and law',
        ],
      },
      {
        id: '6-3',
        name: 'Scaling Laws & Emergent Abilities',
        description:
          'Scaling laws describe predictable relationships between model size, data size, compute budget, and performance. Beyond these smooth trends, certain capabilities appear to "emerge" abruptly at specific scale thresholds, challenging our understanding of how LLMs work.',
        keyPoints: [
          'Kaplan scaling laws (OpenAI, 2020): loss scales as a power law with model parameters N, dataset size D, and compute C — L(N) ~ N^{-0.076}, enabling prediction of performance before training',
          'Chinchilla scaling laws (DeepMind, 2022) revised the optimal ratio: for compute-optimal training, model size and training tokens should scale roughly equally — this showed GPT-3 was severely undertrained',
          'Emergent abilities are capabilities that appear near-zero at small scales but jump to high performance above a threshold — examples include multi-step arithmetic, chain-of-thought reasoning, and multilingual translation',
          'Whether emergence is real or an artifact of evaluation metrics is debated — Schaeffer et al. (2023) showed that switching from accuracy (discontinuous) to log-likelihood (continuous) makes emergence disappear for some tasks',
          'Mixture-of-Experts (MoE) architectures (Mixtral, Switch Transformer) scale total parameters cheaply by activating only a subset per token — a 47B total MoE model might use only 13B parameters per forward pass',
        ],
        tradeoffs: [
          'Scaling laws predict average performance well but cannot predict which specific capabilities will emerge at which scale — making it hard to plan for safety and alignment',
          'Training larger models is more compute-efficient per unit of capability but requires massive upfront investment and infrastructure — favoring well-funded labs over academic researchers',
          'MoE models have more total parameters (larger disk footprint, more complex serving) but use similar compute per token as much smaller dense models — a favorable trade-off when memory is cheap relative to compute',
        ],
        realWorld: [
          'Mixtral 8x7B (Mistral) outperforming Llama 2 70B while using only 13B active parameters per token — demonstrating MoE efficiency in open-source LLMs',
          'Epoch AI tracking compute trends showing a 10x increase in training compute every ~8 months, with frontier models now exceeding 10^25 FLOPs',
          'Google PaLM 540B demonstrating emergent chain-of-thought reasoning, joke explanation, and logical deduction abilities not present in smaller PaLM variants',
        ],
      },
    ],
  },

  // Part 3: Applications
  {
    id: 7,
    title: 'Text Classification & Sentiment',
    part: 3,
    partTitle: 'Applications',
    summary:
      'Assigning labels to text spans — from binary sentiment (positive/negative) to fine-grained topic taxonomies — using approaches ranging from classical ML to zero-shot LLMs, with real-world applications across every industry.',
    concepts: [
      {
        id: '7-1',
        name: 'Sentiment Analysis Approaches',
        description:
          'Sentiment analysis determines the emotional tone or opinion expressed in text. Approaches range from lexicon-based methods using sentiment dictionaries to fine-tuned Transformers that capture nuanced context, sarcasm, and implicit sentiment.',
        keyPoints: [
          'Lexicon-based methods (VADER, SentiWordNet, AFINN) assign sentiment scores to individual words and aggregate — fast and interpretable but miss context: "not good" is negative despite "good" being positive',
          'Aspect-based sentiment analysis (ABSA) extracts sentiments toward specific entities or features: "The food was great but service was terrible" has positive food sentiment and negative service sentiment',
          'Fine-tuned BERT models achieve state-of-the-art on sentiment benchmarks (SST-2: ~96% accuracy, Yelp Reviews: ~98%) by capturing context, negation, and subtle linguistic cues',
          'Multimodal sentiment analysis combines text with audio features (prosody, tone) and visual features (facial expressions) for more accurate sentiment detection in video and speech',
          'Handling sarcasm, irony, and implicit sentiment remains a major challenge — "What a great day" can be sincere or sarcastic depending on context that may not be in the text itself',
        ],
        tradeoffs: [
          'Lexicon-based methods require no training data and work across domains but are shallow — Transformer models are far more accurate but need labeled data and are domain-sensitive',
          'Binary sentiment (positive/negative) is easier but less useful than fine-grained (5-star) or continuous sentiment scores — granularity increases annotation cost and disagreement',
          'Domain adaptation is critical: a model trained on movie reviews performs poorly on financial text where "volatile" is negative but "aggressive growth" is positive',
        ],
        realWorld: [
          'Twitter/X sentiment analysis powering brand monitoring tools (Brandwatch, Sprinklr) processing millions of posts daily',
          'Financial sentiment analysis using FinBERT to gauge market sentiment from news articles, earnings calls, and analyst reports',
          'Customer review analysis on Amazon, Yelp, and TripAdvisor using ABSA to extract product-specific feedback at scale',
        ],
      },
      {
        id: '7-2',
        name: 'Intent Classification & Topic Modeling',
        description:
          'Intent classification identifies the purpose behind user utterances (e.g., "book a flight" -> BookFlight intent), while topic modeling discovers latent thematic structure in document collections without supervision.',
        keyPoints: [
          'Intent classification is core to conversational AI: utterances like "What\'s the weather?" map to intents (GetWeather) with slots (location, date) — typically using BERT fine-tuned on intent-labeled datasets',
          'Latent Dirichlet Allocation (LDA) is the classic topic model: each document is a mixture of topics, each topic is a distribution over words — trained via variational inference or collapsed Gibbs sampling',
          'BERTopic uses BERT embeddings + UMAP dimensionality reduction + HDBSCAN clustering to discover topics — produces more coherent topics than LDA and handles short texts better',
          'Joint intent detection and slot filling (e.g., JointBERT) uses a single model with a shared encoder, intent classification head, and token-level slot tagging head — improving both tasks through multi-task learning',
          'Topic coherence metrics (C_v, NPMI) evaluate topic quality by measuring whether top words in a topic co-occur in reference corpora — essential for hyperparameter tuning (number of topics)',
        ],
        tradeoffs: [
          'LDA is unsupervised and interpretable but assumes bag-of-words and struggles with short texts (tweets, messages); neural topic models handle these better but are harder to interpret',
          'Intent classification works well for defined domains (virtual assistants) but scaling to open-domain intent detection requires hierarchical taxonomies or zero-shot approaches',
          'Static topic models produce fixed topics; dynamic topic models (DTM) track topic evolution over time but are significantly more complex to train and interpret',
        ],
        realWorld: [
          'Amazon Alexa and Google Assistant using intent classification + slot filling to understand and execute user commands across thousands of intents',
          'News aggregators (Google News, Apple News) using topic modeling to cluster and organize articles into coherent storylines',
          'BERTopic used in social science research to analyze public discourse on Twitter/Reddit around events like elections and pandemics',
        ],
      },
      {
        id: '7-3',
        name: 'Zero-Shot & Few-Shot Classification',
        description:
          'Zero-shot classification assigns labels to text without any task-specific training data, using pre-trained model knowledge. Few-shot classification uses just a handful of examples. Both paradigms reduce the need for expensive labeled datasets.',
        keyPoints: [
          'Zero-shot classification with NLI models: frame classification as textual entailment — "This text is about {label}" — and use an NLI model (trained on MNLI) to score each label hypothesis against the input text',
          'In-context few-shot learning with LLMs: provide a few input-label examples in the prompt, and the model continues the pattern — GPT-3 demonstrated this at scale, with performance improving up to ~32 examples',
          'SetFit (Sentence Transformer Fine-tuning) achieves few-shot classification by fine-tuning a sentence transformer on contrastive pairs from just 8 examples per class — competitive with GPT-3 few-shot at 1000x less cost',
          'Prompt sensitivity is a major issue: rephrasing the same zero-shot prompt can change accuracy by 10-30% — prompt ensembling (averaging predictions across multiple phrasings) improves robustness',
          'Chain-of-thought prompting improves few-shot classification on complex tasks by asking the model to reason step-by-step before producing the label — particularly effective for tasks requiring inference',
        ],
        tradeoffs: [
          'Zero-shot requires no labeled data but is less accurate than supervised models for well-defined tasks — it shines when labeled data is unavailable or the label space changes frequently',
          'Few-shot LLM classification is flexible but expensive at inference (long prompts) and non-deterministic — fine-tuning a smaller model on the few examples is often more cost-effective in production',
          'Zero-shot NLI-based classification is limited by the NLI model\'s understanding of label descriptions — ambiguous or technical labels require careful description engineering',
        ],
        realWorld: [
          'Hugging Face zero-shot classification pipeline (facebook/bart-large-mnli) used for rapid prototyping of text classification without training data',
          'Content moderation systems using zero-shot classification to detect new categories of harmful content without waiting for labeled examples',
          'Enterprise document routing using few-shot GPT-4 to classify incoming emails and support tickets into dynamic category taxonomies',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Named Entity Recognition & IE',
    part: 3,
    partTitle: 'Applications',
    summary:
      'Extracting structured information from unstructured text — identifying entities (people, organizations, locations), their relationships, and assembling this information into knowledge graphs for downstream reasoning.',
    concepts: [
      {
        id: '8-1',
        name: 'NER Models & Architectures',
        description:
          'Named Entity Recognition (NER) identifies and classifies named entities in text into predefined categories. Modern NER systems use Transformer-based sequence labeling with BIO/BILOU tagging schemes, achieving near-human performance on standard benchmarks.',
        keyPoints: [
          'BIO tagging scheme: B-PER (beginning of person), I-PER (inside person), O (outside entity) — BILOU extends this with L (last token) and U (unit/single token) for better boundary detection',
          'BERT-based NER: each token\'s contextual embedding is passed through a linear classifier to predict its entity tag — fine-tuning BERT on CoNLL-2003 achieves F1 ~93%, close to human agreement (~97%)',
          'Adding a CRF (Conditional Random Field) layer on top of BERT enforces label transition constraints (e.g., I-PER cannot follow B-LOC) and consistently improves NER F1 by 0.5-1%',
          'Nested NER handles overlapping entities: "New York University" contains both an organization and a location — span-based models (enumerate and classify all possible spans) handle this naturally',
          'Few-shot NER with LLMs: prompting GPT-4 with entity type descriptions and examples achieves competitive NER performance without fine-tuning, especially for novel entity types',
        ],
        tradeoffs: [
          'Sequence labeling (BIO tags) is fast and well-studied but cannot handle nested entities; span-based approaches handle nesting but have O(n^2) candidate spans to classify',
          'Fine-tuned BERT NER is accurate but requires labeled data for each entity type; zero-shot/few-shot NER with LLMs is more flexible but slower and less reliable for standard types',
          'Cross-domain transfer is limited — a NER model trained on news text performs poorly on biomedical text (different entity types, naming conventions, and vocabulary)',
        ],
        realWorld: [
          'spaCy providing production-ready NER pipelines with pre-trained models for multiple languages, processing millions of documents per hour',
          'Google Knowledge Graph using NER to extract entities from web pages and build the structured knowledge panel shown in search results',
          'Clinical NER using models like SciSpaCy and MedCAT to extract diseases, drugs, and procedures from medical records for clinical decision support',
        ],
      },
      {
        id: '8-2',
        name: 'Relation Extraction',
        description:
          'Relation extraction identifies semantic relationships between entities in text (e.g., "Einstein" born_in "Ulm"). It bridges the gap between flat entity lists and structured knowledge, enabling automated knowledge base construction.',
        keyPoints: [
          'Pipeline approach: first run NER to identify entities, then classify the relationship between each entity pair — simpler but suffers from error propagation (NER errors cascade to RE)',
          'Joint entity and relation extraction models (SpERT, REBEL) extract entities and relations simultaneously using shared Transformer representations — reducing error propagation and capturing interactions',
          'Distant supervision (Mintz et al., 2009) automatically generates training data by aligning a knowledge base (Wikidata/Freebase) with text: if two entities appear in a sentence and have a known relation, label that sentence — noisy but scalable',
          'Relation types range from simple (born_in, works_at, located_in) to complex temporal and causal relations — the TAC-KBP benchmark evaluates 41 relation types across person, organization, and location entities',
          'Prompt-based relation extraction with LLMs frames RE as a question: "What organization does [PERSON] work for?" — enabling zero-shot extraction of arbitrary relation types',
        ],
        tradeoffs: [
          'Pipeline approaches are modular (swap NER or RE models independently) but error propagation limits ceiling performance; joint models are better but harder to maintain and adapt',
          'Distant supervision generates large training sets for free but introduces label noise (~30% of labels may be wrong) — noise-robust training methods (denoising, multi-instance learning) are essential',
          'Document-level relation extraction captures relations spanning multiple sentences but is significantly harder than sentence-level — requiring coreference resolution and cross-sentence reasoning',
        ],
        realWorld: [
          'Google Knowledge Graph populated by large-scale relation extraction from web text, supporting entity cards in Google Search',
          'Drug-drug interaction extraction from medical literature using BioBERT-based RE models — critical for pharmacovigilance',
          'REBEL (Relation Extraction By End-to-end Language generation) from Babelscape generating knowledge triples from arbitrary text as a seq2seq task',
        ],
      },
      {
        id: '8-3',
        name: 'Knowledge Graph Construction',
        description:
          'Knowledge graphs organize extracted entities and relations into structured graph databases where nodes are entities and edges are relationships. They enable reasoning, question answering, and recommendation far beyond what flat text search provides.',
        keyPoints: [
          'A knowledge graph triple (subject, predicate, object) — e.g., (Einstein, born_in, Ulm) — is the atomic unit; billions of triples form graphs like Wikidata (100B+ triples), Google Knowledge Graph, and DBpedia',
          'Entity linking (EL) maps entity mentions to their canonical entries in a knowledge base: "Apple" in "Apple released iOS 17" -> Q312 (Apple Inc.) not Q89 (apple fruit) — using context for disambiguation',
          'Knowledge graph embedding models (TransE, RotatE, ComplEx) learn low-dimensional vectors for entities and relations, enabling link prediction: if (Einstein, born_in, ?) is missing, predict "Ulm" from the embedding space',
          'Ontology design defines the schema: entity types (Person, Organization, Location), relation types, and constraints (a person can have at most one birth date) — foundational for consistent KG construction',
          'Knowledge graph completion using LLMs: prompting GPT-4 with existing triples and asking it to infer missing relationships shows promising results, combining neural reasoning with structured knowledge',
        ],
        tradeoffs: [
          'Knowledge graphs provide structured, queryable knowledge (SPARQL) but are expensive to build and maintain — entity linking alone is a hard disambiguation problem with ~5-10% error rates',
          'Static knowledge graphs go stale as the world changes; temporal knowledge graphs track fact validity over time but add significant complexity',
          'Embedding-based reasoning is scalable but opaque (can\'t explain why a prediction was made); symbolic reasoning (rules, SPARQL) is interpretable but doesn\'t generalize to unseen patterns',
        ],
        realWorld: [
          'Wikidata — the largest open knowledge graph with 100+ billion triples, powering Wikipedia infoboxes and structured data across the web',
          'Neo4j and Amazon Neptune providing graph database infrastructure for enterprise knowledge graphs in healthcare, finance, and e-commerce',
          'KGTK (Knowledge Graph Toolkit, USC/ISI) providing tools for building, transforming, and analyzing large knowledge graphs from text',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Machine Translation',
    part: 3,
    partTitle: 'Applications',
    summary:
      'Automatically translating text between languages — from early rule-based systems to modern neural approaches that handle 200+ languages, with specialized evaluation metrics and ongoing challenges in low-resource and domain-specific translation.',
    concepts: [
      {
        id: '9-1',
        name: 'Neural Machine Translation',
        description:
          'Neural Machine Translation (NMT) uses end-to-end neural networks to translate between languages, replacing the pipeline of separate components (alignment, reordering, language model) used in statistical MT. Modern NMT is dominated by the Transformer architecture.',
        keyPoints: [
          'The Transformer (Vaswani et al., 2017) was originally designed for MT — "Attention Is All You Need" demonstrated that self-attention alone, without recurrence, achieved state-of-the-art translation quality',
          'NMT operates on subword units (BPE/SentencePiece) to handle open vocabularies — a shared vocabulary across source and target languages enables knowledge transfer, especially for related language pairs',
          'Back-translation generates synthetic parallel data by translating target-language monolingual text back to the source language — the most effective data augmentation technique for NMT, often improving BLEU by 2-5 points',
          'Training tricks: label smoothing (0.1), learning rate warmup + inverse square root decay, dropout (0.1-0.3), and large batch sizes (25K-400K tokens) are standard for competitive NMT systems',
          'Modern NMT systems use autoregressive decoding with beam search (beam=4-5) — speculative decoding and non-autoregressive methods aim to reduce the latency bottleneck',
        ],
        tradeoffs: [
          'NMT produces more fluent output than statistical MT but can hallucinate — generating fluent text unrelated to the source, especially on out-of-domain or noisy input',
          'End-to-end NMT is simpler than SMT pipelines but is a black box — errors are harder to diagnose and fix compared to modular components',
          'NMT requires millions of parallel sentence pairs for high quality; for low-resource language pairs (<100K pairs), transfer learning and data augmentation are essential',
        ],
        realWorld: [
          'Google Translate using Transformer-based NMT for 130+ languages, serving billions of translations daily',
          'DeepL achieving top translation quality for European languages by training specialized high-capacity Transformer models',
          'Meta AI releasing NLLB-200 (No Language Left Behind) supporting 200 languages including many low-resource African and Asian languages',
        ],
      },
      {
        id: '9-2',
        name: 'Multilingual Models (mBART, NLLB)',
        description:
          'Multilingual NLP models are trained on text from many languages simultaneously, enabling cross-lingual transfer where training in one language improves performance in others. This is critical for the hundreds of languages with limited labeled data.',
        keyPoints: [
          'mBERT (Multilingual BERT) was trained on Wikipedia in 104 languages with shared WordPiece vocabulary — surprisingly effective at cross-lingual transfer despite no explicit alignment between languages',
          'XLM-RoBERTa (Conneau et al., 2020) improved on mBERT by training on 100 languages from Common Crawl (2.5TB) — the go-to multilingual encoder for cross-lingual NLU tasks',
          'mBART (Liu et al., 2020) pre-trains a seq2seq Transformer on monolingual text in 25 languages using denoising autoencoding — can be fine-tuned for translation without parallel data (unsupervised MT)',
          'NLLB-200 (Meta, 2022) trained on mined parallel data (CCMatrix, LASER) for 200 languages — representing the largest effort in low-resource MT, with dedicated evaluation for underserved languages',
          'Cross-lingual transfer works because multilingual models develop shared representations: training NER in English and evaluating in German yields ~70-80% of supervised German NER performance',
        ],
        tradeoffs: [
          'Multilingual models suffer from the "curse of multilinguality" — adding more languages dilutes per-language capacity, and low-resource languages benefit at the expense of high-resource ones',
          'Shared vocabulary across many languages leads to suboptimal tokenization for individual languages — language-specific tokenizers or adapter-based approaches can mitigate this',
          'Cross-lingual transfer works best between typologically similar languages (English -> German is easier than English -> Japanese) — performance drops significantly for distant language pairs',
        ],
        realWorld: [
          'XLM-RoBERTa powering cross-lingual content moderation on Facebook/Instagram, detecting hate speech across 100+ languages with a single model',
          'NLLB-200 integrated into Meta platforms to translate user content in low-resource languages like Igbo, Yoruba, and Khmer',
          'Multilingual BERT enabling startups to build NLP products for non-English markets without collecting language-specific training data',
        ],
      },
      {
        id: '9-3',
        name: 'Evaluation Metrics (BLEU, METEOR)',
        description:
          'Machine translation evaluation metrics automatically assess translation quality by comparing system output to human reference translations. While imperfect proxies for human judgment, they enable rapid development iteration and benchmarking.',
        keyPoints: [
          'BLEU (Bilingual Evaluation Understudy, Papineni et al., 2002) computes modified n-gram precision (1-4 grams) with a brevity penalty — the most widely used MT metric despite known weaknesses',
          'METEOR (Banerjee & Lavie, 2005) extends beyond exact matches using stemming, synonyms (via WordNet), and paraphrases — correlates better with human judgment than BLEU, especially at segment level',
          'chrF (character F-score) computes character-level n-gram F-score — more robust than BLEU for morphologically rich languages where word-level matching is too strict',
          'COMET (Rei et al., 2020) uses a trained neural model (on human quality assessments) to score translations — significantly better correlation with human judgment than all string-matching metrics',
          'SacreBLEU standardizes BLEU computation (tokenization, normalization, reference handling) to ensure reproducible and comparable scores across papers — always report SacreBLEU, not custom BLEU implementations',
        ],
        tradeoffs: [
          'BLEU is fast, widely understood, and easy to compute but penalizes valid paraphrases, ignores fluency beyond 4-grams, and correlates poorly with human judgment at the sentence level',
          'Neural metrics (COMET, BLEURT) correlate much better with human judgment but require GPU inference, are expensive to compute at scale, and can inherit biases from their training data',
          'No single metric captures all quality dimensions — adequacy (meaning preservation), fluency, terminology accuracy, and style all matter but are measured differently',
        ],
        realWorld: [
          'WMT (Conference on Machine Translation) using BLEU, COMET, and human evaluation as official metrics for their annual shared tasks across 15+ language pairs',
          'SacreBLEU by Matt Post becoming the standard for reporting MT results, eliminating metric computation inconsistencies that plagued earlier MT research',
          'Google and Microsoft using internal quality estimation models (similar to COMET) to continuously monitor translation quality in production systems',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Text Generation',
    part: 3,
    partTitle: 'Applications',
    summary:
      'Generating coherent, relevant, and controllable text using autoregressive language models — from decoding strategies that balance quality and diversity to techniques for steering generation and condensing information through summarization.',
    concepts: [
      {
        id: '10-1',
        name: 'Decoding Strategies (Beam Search, Nucleus Sampling)',
        description:
          'Decoding strategies determine how the next token is selected during text generation. The choice between deterministic methods (greedy, beam search) and stochastic methods (top-k, nucleus sampling) dramatically affects output quality, diversity, and creativity.',
        keyPoints: [
          'Greedy decoding selects the highest-probability token at each step — fast but produces repetitive, generic text because it never explores alternative paths',
          'Beam search maintains B hypotheses (beams) at each step, selecting the B highest-scoring partial sequences — produces higher-quality text than greedy but can still be repetitive and lacks diversity',
          'Top-k sampling restricts the next-token distribution to the k most probable tokens and samples from this truncated distribution — k=50 is common, but fixed k is suboptimal when the distribution varies in entropy',
          'Nucleus (top-p) sampling (Holtzman et al., 2020) dynamically selects the smallest set of tokens whose cumulative probability exceeds p (typically 0.9-0.95) — adapts to distribution shape: fewer tokens when the model is confident, more when uncertain',
          'Temperature scaling divides logits by T before softmax: T<1 sharpens the distribution (more deterministic), T>1 flattens it (more random) — commonly combined with top-p for fine-grained control',
        ],
        tradeoffs: [
          'Beam search is best for tasks with a "correct" answer (translation, summarization) but produces boring, repetitive text for open-ended generation; sampling methods are better for creative tasks',
          'Higher top-p/temperature increases diversity and creativity but also increases the probability of incoherent or off-topic text — there is no universally optimal setting',
          'Repetition penalties (frequency, presence penalties) help reduce degenerate repetition but can make the model avoid important repeated words (like entity names in a long passage)',
        ],
        realWorld: [
          'OpenAI API exposing temperature, top_p, frequency_penalty, and presence_penalty as user-configurable generation parameters',
          'vLLM and TGI (Text Generation Inference) implementing optimized sampling kernels for high-throughput LLM serving with configurable decoding',
          'Creative writing assistants (Jasper, Copy.ai) using high temperature + top-p sampling for diverse content generation',
        ],
      },
      {
        id: '10-2',
        name: 'Controllable Generation',
        description:
          'Controllable generation steers text generation toward desired attributes (style, topic, sentiment, length) while maintaining fluency. Techniques range from simple prompt engineering to learned control codes and gradient-based steering.',
        keyPoints: [
          'Control codes (CTRL, Keskar et al., 2019) prepend special tokens indicating desired attributes (e.g., "Reviews Rating:5.0" for positive review generation) — trained into the model during pre-training',
          'Classifier-Free Guidance (CFG) uses the difference between conditional and unconditional generation to amplify the effect of the conditioning signal — borrowed from image generation (diffusion models) and now applied to LLM generation',
          'RLHF (Reinforcement Learning from Human Feedback) trains a reward model on human preferences, then fine-tunes the LLM with PPO to maximize reward — the technique behind ChatGPT\'s helpfulness and safety',
          'Constitutional AI (Anthropic) uses the model to self-critique and revise its own outputs according to a set of principles — reducing the need for human feedback while maintaining alignment',
          'Structured output: constraining generation to valid JSON, SQL, or code through grammar-guided decoding (Outlines, Guidance) — forces the model to only generate tokens that maintain syntactic validity',
        ],
        tradeoffs: [
          'Prompt-based control is flexible and requires no training but is imprecise — the model may ignore or misinterpret instructions, especially for complex constraints',
          'RLHF produces well-aligned models but can reduce output diversity (mode collapse) and is expensive to implement — requiring human annotators, reward model training, and RL optimization',
          'Grammar-constrained decoding guarantees structural correctness but can degrade semantic quality — forcing JSON structure may cause the model to generate valid but nonsensical content to satisfy constraints',
        ],
        realWorld: [
          'ChatGPT and Claude using RLHF/RLAIF to align generation with user preferences for helpfulness, harmlessness, and honesty',
          'Outlines library (dottxt) enabling structured JSON/regex-constrained generation from any LLM — adopted for reliable API output formatting',
          'Grammarly using controllable generation to adjust writing tone (formal, casual, confident, empathetic) while preserving the user\'s meaning',
        ],
      },
      {
        id: '10-3',
        name: 'Summarization & Paraphrasing',
        description:
          'Text summarization compresses documents into shorter versions preserving key information. Extractive methods select important sentences; abstractive methods generate new text. Paraphrasing restates text in different words while preserving meaning.',
        keyPoints: [
          'Extractive summarization selects and concatenates the most important sentences from the source: TextRank (graph-based), BertSumExt (BERT representations + sentence classification) — fast and faithful but can be incoherent',
          'Abstractive summarization generates new text: BART and PEGASUS (pre-trained with gap sentence generation) achieve state-of-the-art on CNN/DailyMail, XSum, and other benchmarks — more fluent but may hallucinate',
          'Long document summarization requires handling inputs >512 tokens: LED (Longformer Encoder-Decoder), hierarchical approaches (summarize chunks then merge), and LLM-based (GPT-4 with 128K context) approaches',
          'Faithfulness is the critical challenge: abstractive models generate fluent summaries that contain facts not in the source document — factual consistency checking (FactCC, SummaC) is an active research area',
          'Paraphrasing models (trained on paraphrase corpora like MRPC, QQP, or back-translation data) rephrase text while preserving meaning — used for data augmentation, plagiarism avoidance, and text simplification',
        ],
        tradeoffs: [
          'Extractive summaries are faithful (every sentence is from the source) but often lack coherence and cannot compress information below the sentence level; abstractive summaries are more natural but risk hallucination',
          'LLM-based summarization (GPT-4, Claude) produces the most natural summaries but is expensive, slow, and still hallucinates — fine-tuned specialized models (BART, PEGASUS) are more cost-effective for production',
          'Evaluation is difficult: ROUGE (n-gram overlap with reference) correlates poorly with human judgment; human evaluation is expensive; no automated metric reliably captures faithfulness',
        ],
        realWorld: [
          'Google Search using abstractive summarization (AI Overviews) to generate concise answers from multiple web sources',
          'Notion AI and Confluence AI using LLM-based summarization to condense meeting notes and long documents',
          'News aggregators (Google News, Apple News) using extractive summarization to generate article previews from full news stories',
        ],
      },
    ],
  },

  // Part 4: Modern NLP
  {
    id: 11,
    title: 'Retrieval-Augmented Generation',
    part: 4,
    partTitle: 'Modern NLP',
    summary:
      'RAG combines the generative power of LLMs with external knowledge retrieval, grounding responses in specific documents to reduce hallucination and enable knowledge-updateable systems without retraining.',
    concepts: [
      {
        id: '11-1',
        name: 'RAG Architecture & Vector Databases',
        description:
          'Retrieval-Augmented Generation retrieves relevant documents from an external knowledge base and injects them into the LLM\'s context window before generation. Vector databases provide the infrastructure for fast similarity search over millions of document embeddings.',
        keyPoints: [
          'The RAG pipeline: (1) embed user query, (2) retrieve top-K similar documents from vector DB, (3) inject retrieved documents into the LLM prompt as context, (4) generate a grounded response with citations',
          'Vector databases (Pinecone, Weaviate, Qdrant, Chroma, Milvus) store document embeddings and support approximate nearest neighbor (ANN) search using HNSW or IVF-PQ indices — sub-millisecond search over millions of vectors',
          'Embedding models for retrieval: OpenAI text-embedding-3, Cohere embed-v3, BGE (BAAI), and E5 (Microsoft) produce dense vectors (768-3072d) optimized for semantic similarity search',
          'Naive RAG (single retrieval step) often fails for complex queries — Advanced RAG techniques include query rewriting, HyDE (hypothetical document embedding), recursive retrieval, and multi-step reasoning',
          'Hybrid search combining dense vector retrieval with sparse BM25 keyword matching consistently outperforms either alone — Reciprocal Rank Fusion (RRF) or learned score combination merges the two result sets',
        ],
        tradeoffs: [
          'RAG enables knowledge updates without retraining but adds latency (retrieval + context packing) and can retrieve irrelevant or contradictory documents — retrieval quality is the bottleneck',
          'Larger context windows (128K+ tokens) reduce the need for precise retrieval but increase cost and can overwhelm the model with noise — "lost in the middle" shows models attend poorly to mid-context information',
          'Vector databases add infrastructure complexity and cost — for small knowledge bases (<10K documents), in-memory FAISS or even brute-force search may be simpler and sufficient',
        ],
        realWorld: [
          'Perplexity AI using RAG to provide cited, real-time answers by retrieving from a continuously updated web index',
          'Enterprise RAG systems (LangChain, LlamaIndex) enabling companies to query their internal documents (Confluence, Notion, Slack) using natural language',
          'Pinecone and Weaviate serving billions of vectors for production RAG systems in healthcare, legal, and financial applications',
        ],
      },
      {
        id: '11-2',
        name: 'Chunking & Embedding Strategies',
        description:
          'How documents are split into chunks and embedded determines RAG retrieval quality. Chunk size, overlap, and semantic boundaries all affect whether the retrieved context contains the information needed to answer the query.',
        keyPoints: [
          'Fixed-size chunking (e.g., 512 tokens with 50-token overlap) is the simplest approach — easy to implement but can split sentences mid-thought or separate related paragraphs',
          'Semantic chunking uses sentence embeddings to detect topic boundaries — adjacent sentences with low cosine similarity indicate a natural split point, producing more coherent chunks',
          'Recursive character splitting (LangChain) tries progressively smaller separators (paragraphs -> sentences -> words) to stay within size limits while respecting natural boundaries',
          'Late chunking embeds the full document first with a long-context model, then splits the embeddings — preserving cross-chunk context that is lost when chunks are embedded independently',
          'Parent-child retrieval indexes small chunks (for precise matching) but returns the larger parent chunk (for complete context) — balancing retrieval precision with context completeness',
        ],
        tradeoffs: [
          'Smaller chunks (256 tokens) enable more precise retrieval but may lack sufficient context for the LLM to generate a complete answer; larger chunks (1024+ tokens) provide more context but reduce retrieval precision',
          'Overlap between chunks prevents information from being split across boundaries but increases storage and can cause duplicate information in retrieved results',
          'Document-specific chunking (respecting headers, code blocks, tables) produces better results but requires format-aware parsing for each document type (PDF, HTML, Markdown)',
        ],
        realWorld: [
          'LlamaIndex providing 20+ chunking strategies including sentence window, hierarchical, and semantic chunking for different use cases',
          'Unstructured.io parsing PDFs, Word docs, and HTML into clean text chunks with metadata preservation for enterprise RAG pipelines',
          'Anthropic\'s contextual embeddings approach prepending document context to each chunk before embedding — improving retrieval by 49% on benchmarks',
        ],
      },
      {
        id: '11-3',
        name: 'Retrieval Evaluation & Reranking',
        description:
          'Evaluating and improving retrieval quality is critical for RAG performance. Reranking uses a more powerful model to rescore initial retrieval results, while evaluation metrics measure whether the right documents are being retrieved.',
        keyPoints: [
          'Retrieval metrics: Recall@K (fraction of relevant documents in top-K), MRR (Mean Reciprocal Rank of first relevant result), NDCG (graded relevance ranking quality), and Hit Rate (binary: is any relevant doc in top-K)',
          'Cross-encoder rerankers (e.g., Cohere Rerank, bge-reranker, ms-marco-MiniLM) take the full (query, document) pair as input and produce a relevance score — much more accurate than embedding similarity but ~100x slower',
          'Two-stage retrieval: fast but approximate first stage (embedding similarity over millions of docs) followed by precise but expensive second stage (cross-encoder reranking over top-100) — the standard production architecture',
          'RAGAS (Retrieval Augmented Generation Assessment) evaluates the full RAG pipeline: context relevance (are retrieved docs relevant?), faithfulness (is the answer grounded in context?), and answer relevance (does it address the query?)',
          'Lost-in-the-middle effect: LLMs attend more to the beginning and end of the context window — placing the most relevant documents at the start of the prompt improves answer quality',
        ],
        tradeoffs: [
          'Cross-encoder reranking significantly improves retrieval quality (5-15% recall improvement) but adds 100-500ms latency — acceptable for most applications but problematic for real-time systems',
          'Evaluating retrieval requires ground-truth relevance labels which are expensive to create — synthetic evaluation using LLMs to generate question-answer pairs from documents is a scalable alternative',
          'Optimizing retrieval metrics does not guarantee better end-to-end RAG performance — a document that scores high on relevance may not contain the specific fact needed for the answer',
        ],
        realWorld: [
          'Cohere Rerank API providing production-ready cross-encoder reranking that integrates with any vector database',
          'RAGAS framework used by enterprises to evaluate and monitor RAG pipeline quality in production',
          'MTEB (Massive Text Embedding Benchmark) leaderboard ranking embedding models across retrieval, classification, and clustering tasks — the standard for choosing embedding models',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Prompt Engineering & In-Context Learning',
    part: 4,
    partTitle: 'Modern NLP',
    summary:
      'The art and science of crafting inputs to LLMs to elicit desired behaviors — from basic prompt design to advanced techniques like chain-of-thought reasoning, instruction tuning, and autonomous agent frameworks.',
    concepts: [
      {
        id: '12-1',
        name: 'Prompt Design & Chain-of-Thought',
        description:
          'Prompt engineering crafts the input text to steer LLM behavior without changing model parameters. Chain-of-thought (CoT) prompting elicits step-by-step reasoning, dramatically improving performance on complex tasks requiring multi-step inference.',
        keyPoints: [
          'Zero-shot prompting relies on clear instructions: "Classify the following text as positive or negative" — effective for simple tasks but insufficient for complex reasoning',
          'Few-shot prompting provides 3-8 input-output examples that demonstrate the desired behavior — the model learns the pattern in-context and applies it to new inputs',
          'Chain-of-thought (Wei et al., 2022): adding "Let\'s think step by step" or providing reasoning examples improves GPT-4\'s math accuracy from ~60% to ~90% on GSM8K by making intermediate steps explicit',
          'Self-consistency (Wang et al., 2022) generates multiple chain-of-thought paths and takes the majority vote — improving robustness by reducing sensitivity to individual reasoning traces',
          'Structured prompting patterns: role assignment ("You are an expert in X"), output formatting (JSON, markdown), constraint specification ("Respond in under 100 words"), and few-shot exemplars work synergistically',
        ],
        tradeoffs: [
          'Prompt engineering is fast and requires no training but is fragile — small wording changes can significantly alter output quality, and optimal prompts vary between models',
          'Chain-of-thought increases accuracy on reasoning tasks but also increases output length (and thus cost/latency) — for simple tasks, CoT adds overhead without benefit',
          'Few-shot examples consume context window tokens — with a 4K context window, providing many examples leaves little room for the actual input; this tradeoff is less severe with 128K+ context models',
        ],
        realWorld: [
          'OpenAI\'s prompt engineering guide documenting best practices for GPT-4: be specific, provide examples, use delimiters, specify output format',
          'Google\'s Gemini using chain-of-thought internally during reasoning tasks, with the thinking process visible in Gemini 2.0 Flash Thinking',
          'DSPy (Stanford) automating prompt optimization by treating prompts as programs with optimizable parameters — removing manual prompt engineering',
        ],
      },
      {
        id: '12-2',
        name: 'Instruction Tuning & RLHF',
        description:
          'Instruction tuning fine-tunes LLMs on diverse task instructions to improve their ability to follow arbitrary natural language commands. RLHF further aligns models with human preferences, making them helpful, harmless, and honest.',
        keyPoints: [
          'Instruction tuning (FLAN, T0, InstructGPT) fine-tunes on thousands of tasks formatted as instructions: "Summarize the following article: {text}" — dramatically improving zero-shot task generalization',
          'RLHF pipeline: (1) supervised fine-tuning on demonstrations, (2) train a reward model on human preference rankings (response A vs. B), (3) optimize the LLM with PPO to maximize the reward model\'s score',
          'DPO (Direct Preference Optimization, Rafailov et al., 2023) simplifies RLHF by directly optimizing the LLM on preference data without training a separate reward model — mathematically equivalent but more stable',
          'The "alignment tax" refers to the potential reduction in raw capability that comes from RLHF — aligned models may refuse valid requests or become overly cautious, though modern techniques minimize this',
          'Synthetic instruction data (Self-Instruct, Alpaca, WizardLM) uses LLMs to generate instruction-following examples, bootstrapping instruction tuning without expensive human annotation',
        ],
        tradeoffs: [
          'Instruction tuning makes models broadly useful but can reduce performance on specific tasks compared to task-specific fine-tuning — a general-purpose model vs. specialist trade-off',
          'RLHF produces preferred outputs but can lead to sycophancy (agreeing with the user even when wrong) and reward hacking (exploiting reward model weaknesses without genuinely improving quality)',
          'DPO is simpler and more stable than PPO-based RLHF but may produce less diverse outputs — ongoing research compares their effectiveness across different model sizes and tasks',
        ],
        realWorld: [
          'InstructGPT (OpenAI, 2022) demonstrating that RLHF on a 1.3B model produces outputs preferred over a 175B GPT-3 — alignment matters more than raw scale',
          'Llama 2 Chat using RLHF with over 1 million human preference annotations to create a safe and helpful open-source assistant',
          'Anthropic\'s Claude using Constitutional AI (RLAIF) — the model critiques its own outputs against a set of principles, reducing reliance on human annotators',
        ],
      },
      {
        id: '12-3',
        name: 'Agent Frameworks & Tool Use',
        description:
          'LLM agents extend language models beyond text generation by enabling them to use tools (search, code execution, APIs), plan multi-step tasks, and interact with external environments. This transforms LLMs from text predictors into autonomous problem solvers.',
        keyPoints: [
          'Tool-augmented LLMs call external functions (search engines, calculators, code interpreters, APIs) by generating structured function calls — the model decides when to use which tool based on the query',
          'ReAct (Reason + Act, Yao et al., 2022) interleaves reasoning traces with actions: Thought -> Action -> Observation -> Thought — grounding the model\'s reasoning in real-world observations',
          'Planning frameworks: task decomposition (break complex tasks into subtasks), tree-of-thought (explore multiple reasoning paths), and reflexion (learn from past mistakes through self-reflection)',
          'Multi-agent systems (CrewAI, AutoGen, LangGraph) orchestrate multiple LLM agents with different roles (researcher, coder, reviewer) that collaborate on complex tasks through structured communication',
          'Function calling (OpenAI, Anthropic) provides a structured interface: the model outputs JSON specifying the function name and arguments, the system executes the function, and the result is fed back — more reliable than free-form tool use parsing',
        ],
        tradeoffs: [
          'Tool use dramatically expands LLM capabilities (real-time information, computation, code execution) but adds complexity, latency, and failure modes (wrong tool, bad arguments, API errors)',
          'Autonomous agents can accomplish impressive multi-step tasks but are unreliable — error rates compound over many steps, and the model may loop or take destructive actions without human oversight',
          'Multi-agent architectures enable task parallelism and specialization but introduce coordination overhead and are harder to debug — single-agent with tools is often simpler and sufficient',
        ],
        realWorld: [
          'OpenAI Code Interpreter (Advanced Data Analysis) allowing GPT-4 to write and execute Python code, creating visualizations, analyzing data, and solving math problems in a sandboxed environment',
          'Claude computer use and Anthropic\'s tool-use API enabling Claude to interact with GUIs, take screenshots, and perform multi-step computer tasks',
          'LangChain and LlamaIndex providing frameworks for building production agent systems with tool registries, memory, and structured workflows',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'NLP Ethics & Evaluation',
    part: 4,
    partTitle: 'Modern NLP',
    summary:
      'The critical challenges of bias, hallucination, and rigorous evaluation in modern NLP — ensuring that language models are fair, truthful, and reliably measured, with real consequences for the millions of people who interact with these systems daily.',
    concepts: [
      {
        id: '13-1',
        name: 'Bias in Language Models',
        description:
          'Language models absorb and amplify biases present in their training data — stereotypes about gender, race, religion, and other attributes. Understanding, measuring, and mitigating these biases is essential for responsible NLP deployment.',
        keyPoints: [
          'Representational bias: word embeddings encode stereotypes — Word2Vec\'s "man:computer_programmer :: woman:homemaker" analogy revealed that distributional semantics captures societal biases',
          'Allocational bias: biased NLP systems can cause real-world harm — resume screening systems scoring male names higher, sentiment classifiers rating African American English as more negative, and toxicity detectors flagging AAVE disproportionately',
          'Evaluation benchmarks for bias: WinoBias (gender coreference), BBQ (ambiguous questions), CrowS-Pairs (stereotypes), and StereoSet (measuring stereotypical associations in LMs)',
          'Mitigation strategies: debiased embeddings (Bolukbasi et al., 2016), data balancing (counterfactual augmentation), fine-tuning with debiasing objectives, and RLHF with safety constraints',
          'Bias is not a single problem with a single solution — different types of bias (gender, racial, political, age) require different measurement tools and mitigation strategies, and debiasing one dimension can worsen another',
        ],
        tradeoffs: [
          'Aggressive debiasing can remove useful correlations along with harmful ones — removing gender information entirely makes it impossible to correctly process gendered pronouns or gender-specific medical information',
          'Bias benchmarks measure narrow aspects of bias and can give false confidence — passing a bias test does not mean the model is unbiased in general deployment',
          'Transparency about model limitations (model cards, datasheets) helps users understand risks but does not eliminate the underlying biases in the model\'s behavior',
        ],
        realWorld: [
          'Amazon scrapping a resume screening tool in 2018 after discovering it penalized resumes containing the word "women\'s" (e.g., "women\'s chess club")',
          'Google\'s Perspective API undergoing continuous debiasing after research showed it rated African American English as significantly more toxic',
          'Model cards (Mitchell et al., 2019) adopted by Hugging Face, Google, and Meta to document model training data, intended use, limitations, and bias evaluation results',
        ],
      },
      {
        id: '13-2',
        name: 'Hallucination Detection & Mitigation',
        description:
          'Hallucination occurs when language models generate text that is fluent and confident but factually incorrect or unsupported by the provided context. Detecting and reducing hallucinations is one of the most critical challenges in making LLMs trustworthy.',
        keyPoints: [
          'Intrinsic hallucination contradicts the source input (e.g., a summary that changes a date or name from the source document); extrinsic hallucination introduces information not present in any source (fabricated facts, citations)',
          'LLMs hallucinate because they are trained to produce probable text, not true text — if the training data contains a common-but-wrong pattern, the model will reproduce it confidently',
          'Detection methods: natural language inference (NLI) checking whether generated text is entailed by the source, self-consistency checking (generate multiple responses and flag contradictions), and calibration analysis (low confidence often correlates with hallucination)',
          'Mitigation strategies: RAG grounding (providing source documents), chain-of-thought with citations (forcing the model to reference specific passages), fine-tuning on factuality datasets, and constrained decoding that verifies claims against a knowledge base',
          'Uncertainty quantification: methods like semantic entropy, prompt perturbation sensitivity, and multi-sample consistency help estimate when a model is likely to hallucinate, enabling selective abstention',
        ],
        tradeoffs: [
          'RAG reduces hallucination by grounding in retrieved documents but introduces new failure modes: the model may hallucinate that the context says something it does not, or the retrieved documents may themselves be incorrect',
          'Overly conservative models that refuse to answer when uncertain are less useful but more trustworthy; the optimal refusal threshold depends on the application\'s risk tolerance',
          'Hallucination detection models (NLI-based checkers) are themselves imperfect and can miss subtle hallucinations or flag correct statements as hallucinations — meta-evaluation is needed',
        ],
        realWorld: [
          'Lawyers sanctioned in 2023 for submitting a brief containing fabricated case citations generated by ChatGPT — a high-profile example of hallucination causing real-world harm',
          'Vectara\'s Hallucination Evaluation Model (HEM) providing a leaderboard tracking hallucination rates across LLMs — showing rates from 3% to 27% depending on the model',
          'Medical AI systems (Med-PaLM 2) requiring extensive hallucination evaluation before clinical deployment — healthcare has zero tolerance for fabricated medical facts',
        ],
      },
      {
        id: '13-3',
        name: 'Evaluation Benchmarks & Human Evaluation',
        description:
          'Rigorous evaluation of NLP systems requires both automated benchmarks for scalable comparison and human evaluation for nuanced quality assessment. The choice of evaluation methodology fundamentally shapes what gets optimized and deployed.',
        keyPoints: [
          'General LLM benchmarks: MMLU (57 subjects, factual knowledge), HellaSwag (commonsense reasoning), HumanEval (code generation), GSM8K (math reasoning), and ARC (science questions) — collectively form the standard evaluation suite',
          'Aggregate benchmarks: Open LLM Leaderboard (Hugging Face), LMSYS Chatbot Arena (ELO-based human preference), and HELM (holistic evaluation across many dimensions) — each captures different aspects of capability',
          'Chatbot Arena uses blind pairwise comparison: users chat with two anonymous models and pick the better response — producing ELO ratings that correlate well with real-world preference and are hard to game',
          'Human evaluation protocols: Likert scale rating (1-5), pairwise comparison (A vs. B), and absolute assessment — inter-annotator agreement (Cohen\'s kappa, Krippendorff\'s alpha) measures evaluation reliability',
          'Contamination: if benchmark data appears in training data, evaluation becomes meaningless — decontamination checks, held-out evaluation sets, and dynamic benchmarks (LiveBench, Chatbot Arena) are countermeasures',
        ],
        tradeoffs: [
          'Automated benchmarks are fast and reproducible but can be gamed (training on benchmark data, prompt engineering for specific formats) — they measure narrow capabilities, not general intelligence',
          'Human evaluation captures nuance but is expensive, slow, subjective, and hard to reproduce — annotator demographics, instructions, and compensation all affect results',
          'Single-number rankings (MMLU score, ELO rating) are convenient for comparison but hide important nuances — a model may excel at math but fail at creative writing, and aggregate scores obscure this',
        ],
        realWorld: [
          'LMSYS Chatbot Arena collecting 1M+ human preference votes, becoming the de facto standard for comparing LLM chat quality across GPT-4, Claude, Gemini, and open-source models',
          'Hugging Face Open LLM Leaderboard driving open-source model development by providing a standardized comparison of thousands of models',
          'LiveBench releasing new evaluation questions monthly to prevent contamination — ensuring that benchmark performance reflects genuine capability rather than memorization',
        ],
      },
    ],
  },
];

export const chapters: Topic[] = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find(t => t.id === id);
}
