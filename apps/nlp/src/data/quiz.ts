export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Text Processing Fundamentals
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'What is the key advantage of Byte-Pair Encoding (BPE) over whitespace tokenization?',
    options: [
      'BPE is faster at runtime because it uses fewer operations',
      'BPE handles out-of-vocabulary words by decomposing them into known subword units',
      'BPE produces exactly one token per word, making sequences shorter',
      'BPE does not require any training data to build the vocabulary',
    ],
    answer: 1,
    explanation: 'BPE iteratively merges frequent character pairs to build a subword vocabulary. When encountering an unknown word, it decomposes it into known subword pieces rather than mapping it to a single [UNK] token. This is why GPT-2, GPT-3, and RoBERTa all use BPE-based tokenizers.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'What is the main difference between stemming and lemmatization?',
    options: [
      'Stemming is slower but more accurate than lemmatization',
      'Lemmatization only works for English, while stemming works for all languages',
      'Stemming uses heuristic suffix-stripping rules while lemmatization uses morphological analysis to find the dictionary form',
      'Stemming requires a neural network while lemmatization uses rule-based methods',
    ],
    answer: 2,
    explanation: 'Stemming applies heuristic rules to chop off suffixes (e.g., Porter Stemmer), often producing non-words ("studies" -> "studi"). Lemmatization uses POS tags and morphological dictionaries to find the actual lemma ("better" -> "good", "ran" -> "run"), always producing valid words but requiring more computation.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'Why is Unicode normalization important in text preprocessing?',
    options: [
      'It converts all text to ASCII, removing any non-English characters',
      'It ensures visually identical characters have consistent internal representations, preventing duplicate tokens',
      'It automatically translates text to English before processing',
      'It removes all Unicode characters from the text, keeping only basic Latin letters',
    ],
    answer: 1,
    explanation: 'Unicode normalization (NFC, NFD, NFKC, NFKD) ensures that visually identical characters — such as accented characters that can be represented as either precomposed or decomposed forms — are stored consistently. Without normalization, the same visible character might produce different tokens, inflating vocabulary size and reducing model effectiveness.',
  },

  // Chapter 2: Language Representations
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'What fundamental limitation does TF-IDF share with bag-of-words representations?',
    options: [
      'They require GPU acceleration to compute',
      'They cannot handle documents longer than 512 tokens',
      'They cannot capture word order or semantic similarity between different words',
      'They only work with English text',
    ],
    answer: 2,
    explanation: 'Both BoW and TF-IDF represent documents as sparse vectors where each dimension corresponds to a vocabulary word. They completely ignore word order ("dog bites man" = "man bites dog") and cannot represent semantic similarity between different words ("car" and "automobile" are as distant as "car" and "banana").',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'How does FastText improve upon Word2Vec for handling rare or unseen words?',
    options: [
      'FastText uses a larger vocabulary size than Word2Vec',
      'FastText represents words as bags of character n-grams and can compose embeddings for unseen words from their subword parts',
      'FastText uses bidirectional context instead of skip-gram or CBOW',
      'FastText trains on more data than Word2Vec by default',
    ],
    answer: 1,
    explanation: 'FastText (Facebook, 2017) extends Word2Vec by representing each word as the sum of its character n-gram embeddings. For an unseen word, FastText can generate a meaningful embedding by summing the vectors of its constituent n-grams. This is especially valuable for morphologically rich languages and domain-specific terminology.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'What problem did ELMo solve that static word embeddings could not?',
    options: [
      'ELMo reduced the dimensionality of word vectors from 300 to 50',
      'ELMo enabled training embeddings on smaller datasets',
      'ELMo generated different representations for the same word depending on its context, addressing polysemy',
      'ELMo eliminated the need for tokenization',
    ],
    answer: 2,
    explanation: 'Static embeddings (Word2Vec, GloVe) assign exactly one vector per word regardless of context, so "bank" has the same representation in "river bank" and "bank account." ELMo uses a bidirectional LSTM language model to produce context-dependent embeddings, generating different vectors for the same word in different contexts.',
  },

  // Chapter 3: Statistical NLP
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'Why are smoothing techniques essential for n-gram language models?',
    options: [
      'To make the probability distribution smoother for visualization',
      'To reduce the memory footprint of the n-gram tables',
      'To assign non-zero probability to unseen n-grams that never appeared in training data',
      'To speed up the computation of n-gram probabilities',
    ],
    answer: 2,
    explanation: 'Raw maximum likelihood estimation assigns zero probability to any n-gram not seen in training data. Since natural language is creative and most possible n-grams are rare, this means the model would assign zero probability to perfectly valid sentences. Smoothing techniques like Kneser-Kney and Laplace redistribute probability mass to unseen n-grams.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'In a Hidden Markov Model for POS tagging, what does the Viterbi algorithm find?',
    options: [
      'The most common POS tag in the training corpus',
      'The probability of the observation sequence summed over all possible state paths',
      'The most likely sequence of hidden states (POS tags) given the observed words',
      'The optimal number of hidden states for the model',
    ],
    answer: 2,
    explanation: 'The Viterbi algorithm uses dynamic programming to find the single most likely sequence of hidden states (POS tags) that generated the observed words. It runs in O(T * S^2) time where T is sequence length and S is the number of states, making it efficient for real-time tagging.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'Why does Naive Bayes work well for text classification despite its clearly violated independence assumption?',
    options: [
      'The independence assumption is actually correct for natural language text',
      'Naive Bayes only processes one word at a time, so independence is guaranteed',
      'Classification only requires correct ranking of class posteriors, not calibrated probabilities, and Naive Bayes typically achieves correct ranking',
      'Modern implementations secretly use more complex models internally',
    ],
    answer: 2,
    explanation: 'While word features in text are clearly correlated (violating the independence assumption), classification only requires that the correct class receives the highest posterior probability — not that the probability values are calibrated. Naive Bayes tends to rank classes correctly even though its probability estimates are pushed toward 0 and 1.',
  },

  // Chapter 4: Sequence Models
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'What is the primary purpose of the gating mechanisms in LSTMs?',
    options: [
      'To make the model run faster by skipping unnecessary computations',
      'To control information flow through the cell state, solving the vanishing gradient problem that limits vanilla RNNs',
      'To reduce the number of parameters compared to vanilla RNNs',
      'To enable the model to process input in both forward and backward directions',
    ],
    answer: 1,
    explanation: 'LSTMs introduce forget, input, and output gates that control what information is discarded, stored, and exposed from the cell state. The cell state acts as a highway for gradient flow, allowing LSTMs to learn dependencies across much longer sequences (hundreds of tokens) compared to vanilla RNNs (which fail beyond ~10-20 tokens due to vanishing gradients).',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What is the "information bottleneck" problem in vanilla sequence-to-sequence models?',
    options: [
      'The decoder runs out of memory when processing long sequences',
      'The entire input sequence must be compressed into a single fixed-size context vector, losing information for long inputs',
      'The encoder processes tokens too slowly for real-time applications',
      'The vocabulary size limits the amount of information the model can represent',
    ],
    answer: 1,
    explanation: 'In vanilla seq2seq, the encoder compresses the entire input sequence into a single fixed-size vector (the final hidden state). This bottleneck means that information about early tokens in a long input is inevitably lost. Attention mechanisms solve this by allowing the decoder to dynamically access all encoder hidden states at each generation step.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'What is "teacher forcing" in encoder-decoder training, and what problem does it cause?',
    options: [
      'Using a pretrained model as a teacher — it causes the student model to overfit to the teacher\'s style',
      'Feeding ground-truth previous tokens during training — it causes exposure bias where the model never learns to recover from its own errors',
      'Forcing the model to use a specific attention pattern — it causes the model to ignore important context',
      'Training the encoder before the decoder — it causes training instability due to unbalanced learning',
    ],
    answer: 1,
    explanation: 'Teacher forcing feeds ground-truth previous tokens (rather than the model\'s own predictions) at each decoder step during training. While this accelerates convergence, it creates a train-test mismatch: at inference time, the model must condition on its own (potentially wrong) predictions, and it has never been trained to recover from errors. This is called exposure bias.',
  },

  // Chapter 5: Transformer Architecture
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'Why does self-attention scale the dot product by 1/sqrt(d_k)?',
    options: [
      'To normalize the output vectors to unit length',
      'To reduce the computational cost of the attention operation',
      'To prevent dot products from growing too large in high dimensions, which would push softmax into saturated regions with near-zero gradients',
      'To ensure that attention weights sum to exactly 1.0',
    ],
    answer: 2,
    explanation: 'In high dimensions, dot products between random vectors tend to have large magnitude (variance proportional to d_k). Without scaling, the softmax function would produce near-one-hot distributions with extremely small gradients, making training unstable. Dividing by sqrt(d_k) keeps the variance at 1, maintaining well-behaved softmax gradients.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'Why do Transformers need positional encoding?',
    options: [
      'To encode the semantic meaning of each token in the vocabulary',
      'To reduce the dimensionality of the input embeddings',
      'Because self-attention is permutation-invariant and has no inherent notion of sequence order',
      'To provide information about the language of the input text',
    ],
    answer: 2,
    explanation: 'Self-attention treats its input as an unordered set — the attention output is the same regardless of token order (it is permutation-equivariant). Positional encodings inject order information so the model can distinguish "dog bites man" from "man bites dog." Different approaches include sinusoidal (original Transformer), learned (BERT/GPT-2), and rotary (RoPE, used in Llama).',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'What is the key advantage of LoRA over full fine-tuning for adapting pre-trained models?',
    options: [
      'LoRA always achieves higher accuracy than full fine-tuning',
      'LoRA trains only low-rank matrices (0.1-1% of parameters), dramatically reducing memory, storage, and compute costs while achieving near-full-fine-tuning performance',
      'LoRA eliminates the need for any training data',
      'LoRA works by modifying the tokenizer rather than the model weights',
    ],
    answer: 1,
    explanation: 'LoRA (Low-Rank Adaptation) freezes all pre-trained weights and injects small trainable low-rank matrices into each attention layer. This means you only store and update ~0.1-1% of total parameters per task, enabling fine-tuning of 65B+ models on a single GPU. QLoRA further reduces memory by quantizing the frozen weights to 4-bit.',
  },

  // Chapter 6: Large Language Models
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'What did GPT-3 demonstrate about in-context learning?',
    options: [
      'That models must always be fine-tuned for each new task',
      'That large language models can perform new tasks from just a few examples in the prompt, without any parameter updates',
      'That pre-training on code is necessary for in-context learning',
      'That in-context learning only works for classification tasks',
    ],
    answer: 1,
    explanation: 'GPT-3 (175B parameters) showed that sufficiently large autoregressive models can learn new tasks simply by being given a few input-output examples in the prompt (few-shot learning) — with no gradient updates or fine-tuning. This was a paradigm shift, showing that scaling model size enables a form of meta-learning from the prompt context.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'What is the fundamental difference between BERT\'s and GPT\'s pre-training objectives?',
    options: [
      'BERT uses next sentence prediction while GPT uses previous sentence prediction',
      'BERT predicts randomly masked tokens using bidirectional context while GPT predicts the next token using only left (previous) context',
      'BERT is trained on books while GPT is trained on web data',
      'BERT uses self-attention while GPT uses cross-attention',
    ],
    answer: 1,
    explanation: 'BERT uses Masked Language Modeling — it sees the full bidirectional context and predicts the ~15% of tokens that were randomly masked. GPT uses Causal Language Modeling — it can only see previous tokens (left context) and predicts the next token. This makes BERT better for understanding tasks and GPT better for generation tasks.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'What did the Chinchilla scaling laws reveal about most existing LLMs?',
    options: [
      'That larger models always perform better regardless of training data',
      'That most LLMs were overtrained on too much data relative to their size',
      'That most LLMs were undertrained — optimal compute allocation requires training tokens to scale linearly with model size (~20 tokens per parameter)',
      'That scaling laws only apply to encoder-decoder models',
    ],
    answer: 2,
    explanation: 'The Chinchilla paper (Hoffmann et al., 2022) showed that for a given compute budget, model size and training tokens should be scaled roughly equally. This revealed that GPT-3 (175B params, 300B tokens) was significantly undertrained — a compute-optimal model would have been smaller (~70B) but trained on much more data (~1.4T tokens). This insight influenced Llama and other subsequent models.',
  },

  // Chapter 7: Text Classification & Sentiment
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'Why do lexicon-based sentiment analysis methods fail on the phrase "not good"?',
    options: [
      'The word "not" is not in most sentiment lexicons',
      'Lexicons assign sentiment to individual words independently without considering context — "good" is always scored as positive regardless of negation',
      'Lexicon-based methods cannot process words shorter than 4 characters',
      'The phrase "not good" is actually neutral, so all methods fail on it',
    ],
    answer: 1,
    explanation: 'Lexicon-based methods (VADER, AFINN, SentiWordNet) look up each word independently in a sentiment dictionary. "good" has a positive score, and while some lexicons have negation rules, they are heuristic and often fail with complex negation, sarcasm, or implicit sentiment. Contextual models like fine-tuned BERT handle these cases by encoding the full sentence context.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'How does BERTopic improve upon LDA for topic modeling?',
    options: [
      'BERTopic uses more training data than LDA',
      'BERTopic uses BERT embeddings + UMAP + HDBSCAN clustering, producing more coherent topics and handling short texts better than LDA\'s bag-of-words assumption',
      'BERTopic is faster than LDA because it uses fewer iterations',
      'BERTopic requires labeled topic data while LDA is unsupervised',
    ],
    answer: 1,
    explanation: 'BERTopic leverages BERT sentence embeddings (capturing semantic meaning) reduced with UMAP (for clustering efficiency) and clustered with HDBSCAN (detecting arbitrary cluster shapes). Unlike LDA\'s bag-of-words assumption, BERTopic captures semantic similarity, making it particularly effective for short texts like tweets and messages where BoW features are sparse.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'How does zero-shot classification using NLI models work?',
    options: [
      'By training a new classifier head for each label at runtime',
      'By framing classification as textual entailment — scoring whether "This text is about {label}" is entailed by the input text',
      'By clustering the input text with pre-defined label embeddings',
      'By generating the classification label using autoregressive decoding',
    ],
    answer: 1,
    explanation: 'Zero-shot NLI classification reframes the task: for each candidate label, it constructs a hypothesis ("This text is about {label}") and uses an NLI model (trained on MNLI) to score whether the input text entails this hypothesis. The label with the highest entailment score wins. This enables classification with arbitrary labels without any task-specific training.',
  },

  // Chapter 8: Named Entity Recognition & IE
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'Why is a CRF layer commonly added on top of BERT for NER?',
    options: [
      'To increase the model\'s vocabulary size for entity recognition',
      'To enforce label transition constraints (e.g., I-PER cannot follow B-LOC), improving entity boundary detection',
      'To reduce the number of parameters in the model',
      'To enable the model to process longer input sequences',
    ],
    answer: 1,
    explanation: 'A CRF layer models dependencies between adjacent output labels, learning which tag transitions are valid (B-PER -> I-PER is valid, I-PER -> I-LOC is invalid). Without a CRF, BERT classifies each token independently and may produce invalid tag sequences. Adding a CRF consistently improves NER F1 by 0.5-1% by ensuring globally coherent label sequences.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'What is "distant supervision" in the context of relation extraction?',
    options: [
      'Training a model on a remote server rather than locally',
      'Using a teacher model to supervise a smaller student model',
      'Automatically generating training labels by aligning a knowledge base with text — assuming that if two entities have a known relation and co-occur in a sentence, that sentence expresses that relation',
      'Manually annotating a small dataset and extrapolating labels to a larger one',
    ],
    answer: 2,
    explanation: 'Distant supervision (Mintz et al., 2009) leverages existing knowledge bases like Wikidata: if (Einstein, born_in, Ulm) is known, then any sentence mentioning both "Einstein" and "Ulm" is assumed to express the born_in relation. This is noisy (~30% wrong labels) but generates massive training datasets for free.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'What is "entity linking" in knowledge graph construction?',
    options: [
      'Connecting two knowledge graphs from different sources',
      'Creating hyperlinks between entity pages on Wikipedia',
      'Mapping entity mentions in text to their canonical entries in a knowledge base, disambiguating based on context',
      'Linking entities to their corresponding word embeddings',
    ],
    answer: 2,
    explanation: 'Entity linking (EL) resolves ambiguous mentions to canonical knowledge base entries: "Apple" in "Apple released iOS 17" must be linked to Apple Inc. (Q312 in Wikidata), not apple the fruit (Q89). This requires context-based disambiguation and is a critical step in building knowledge graphs from text.',
  },

  // Chapter 9: Machine Translation
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'What is "back-translation" in neural machine translation?',
    options: [
      'Translating output back to the source language to check for errors',
      'Training the model to translate in reverse direction (target -> source)',
      'Generating synthetic parallel data by translating target-language monolingual text back to the source language for data augmentation',
      'Using the same model for both translation directions simultaneously',
    ],
    answer: 2,
    explanation: 'Back-translation takes target-language monolingual text (which is abundant and free), translates it to the source language using an existing MT model, and uses these synthetic parallel pairs as additional training data. This is the most effective data augmentation technique for NMT, typically improving BLEU scores by 2-5 points.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'What is the "curse of multilinguality" in multilingual NLP models?',
    options: [
      'Multilingual models take longer to download and deploy',
      'Adding more languages dilutes per-language capacity, causing high-resource languages to degrade while low-resource languages benefit',
      'Multilingual models can only handle 10 languages at most',
      'Multilingual models always produce translations in the wrong language',
    ],
    answer: 1,
    explanation: 'With a fixed model capacity, adding more languages forces the model to share its parameters across more languages, reducing the quality for each individual language — especially high-resource languages like English that would benefit from dedicated capacity. Low-resource languages gain from cross-lingual transfer but high-resource languages may actually perform worse than monolingual models.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'Why is COMET considered a better MT evaluation metric than BLEU?',
    options: [
      'COMET is faster to compute than BLEU',
      'COMET does not require reference translations',
      'COMET uses a trained neural model on human quality assessments, achieving significantly better correlation with human judgment than string-matching metrics like BLEU',
      'COMET works with more languages than BLEU',
    ],
    answer: 2,
    explanation: 'COMET (Rei et al., 2020) is a learned metric: it trains a neural model on human quality assessment data (DA scores from WMT). Because it considers semantic similarity rather than just n-gram overlap, it can recognize valid paraphrases that BLEU penalizes and catch meaning errors that BLEU misses. COMET consistently achieves higher correlation with human judgment across languages.',
  },

  // Chapter 10: Text Generation
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'What advantage does nucleus (top-p) sampling have over top-k sampling?',
    options: [
      'Top-p sampling is always faster than top-k sampling',
      'Top-p dynamically adjusts the number of candidate tokens based on the probability distribution, while top-k uses a fixed number regardless of model confidence',
      'Top-p sampling produces deterministic output while top-k is stochastic',
      'Top-p sampling uses a neural network to select tokens while top-k uses random sampling',
    ],
    answer: 1,
    explanation: 'Top-k always considers exactly k tokens regardless of the distribution shape. When the model is very confident (one token has 95% probability), top-k still samples from k candidates, introducing unnecessary noise. Nucleus (top-p) sampling adapts: it includes fewer tokens when the model is confident and more when it is uncertain, by selecting the smallest set whose cumulative probability exceeds p.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'What is the purpose of RLHF in controllable generation?',
    options: [
      'To make the model generate text faster by reinforcing efficient patterns',
      'To train the model to produce outputs that align with human preferences for helpfulness, harmlessness, and honesty',
      'To enable the model to generate text in multiple languages',
      'To reduce the model\'s vocabulary size for more focused generation',
    ],
    answer: 1,
    explanation: 'RLHF trains a reward model on human preference rankings (which response is better?), then uses reinforcement learning (PPO) to fine-tune the LLM to maximize this reward. This aligns the model with human preferences beyond what supervised training can achieve — the model learns nuanced qualities like helpfulness, safety, and honesty that are difficult to specify in a loss function.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'What is the key challenge with abstractive summarization compared to extractive?',
    options: [
      'Abstractive summarization is always slower than extractive',
      'Abstractive summarization can only handle short documents',
      'Abstractive models may generate fluent text that contains facts not in the source document (hallucination)',
      'Abstractive summarization requires more training data than extractive',
    ],
    answer: 2,
    explanation: 'Extractive summarization selects sentences directly from the source, guaranteeing that all information comes from the original text. Abstractive summarization generates new text, which means the model may introduce "hallucinated" facts — information that sounds plausible and fluent but is not supported by (or contradicts) the source document. This faithfulness challenge is a major area of active research.',
  },

  // Chapter 11: Retrieval-Augmented Generation
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'Why does hybrid search (dense + sparse) consistently outperform either method alone in RAG?',
    options: [
      'Hybrid search is faster because it processes fewer documents',
      'Dense retrieval captures semantic similarity while sparse BM25 captures exact keyword matches — they have complementary strengths',
      'Hybrid search uses a larger language model for retrieval',
      'Hybrid search does not require a vector database',
    ],
    answer: 1,
    explanation: 'Dense (embedding-based) retrieval excels at finding semantically similar documents even with different wording ("car" matches "automobile") but can miss exact keyword matches. Sparse BM25 excels at exact and partial keyword matching but misses semantic similarity. Combining both via Reciprocal Rank Fusion (RRF) captures both types of relevance, consistently improving retrieval quality.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'What is the trade-off between smaller and larger chunk sizes in RAG?',
    options: [
      'Smaller chunks are always better because they reduce processing time',
      'Larger chunks are always better because they contain more information',
      'Smaller chunks enable more precise retrieval but may lack sufficient context; larger chunks provide more context but reduce retrieval precision',
      'Chunk size has no impact on RAG performance',
    ],
    answer: 2,
    explanation: 'Small chunks (~256 tokens) match queries more precisely because each chunk contains focused information, but the retrieved chunk may lack the surrounding context needed for a complete answer. Large chunks (~1024+ tokens) provide more context but reduce precision because the matching query-relevant portion is diluted by surrounding text. Parent-child retrieval is one strategy to get the best of both.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'What is the "lost in the middle" effect in RAG systems?',
    options: [
      'Documents in the middle of the knowledge base are never retrieved',
      'LLMs attend more to documents at the beginning and end of the context window, under-utilizing information in the middle positions',
      'Chunking algorithms lose information from the middle of documents',
      'Embedding models produce lower quality vectors for medium-length documents',
    ],
    answer: 1,
    explanation: 'Research shows that LLMs exhibit a positional bias in long contexts: they attend more strongly to information at the beginning and end of the prompt, while information in the middle positions is "lost" and less likely to be used in the response. This means placing the most relevant retrieved documents at the start of the context can improve answer quality.',
  },

  // Chapter 12: Prompt Engineering & In-Context Learning
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'How does chain-of-thought (CoT) prompting improve LLM reasoning?',
    options: [
      'By reducing the number of tokens the model needs to generate',
      'By making the model output intermediate reasoning steps, which improves accuracy on multi-step problems by making the reasoning process explicit',
      'By connecting multiple LLMs in a chain to solve problems collaboratively',
      'By training the model on additional reasoning data during prompting',
    ],
    answer: 1,
    explanation: 'Chain-of-thought prompting (Wei et al., 2022) elicits step-by-step reasoning by either adding "Let\'s think step by step" or providing examples with reasoning traces. This forces the model to decompose complex problems into manageable steps, dramatically improving accuracy — e.g., GPT-4\'s math accuracy on GSM8K jumps from ~60% to ~90% with CoT.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'What is DPO and how does it simplify the RLHF pipeline?',
    options: [
      'DPO uses data parallelism to speed up RLHF training',
      'DPO directly optimizes the LLM on preference data without needing a separate reward model, while being mathematically equivalent to RLHF',
      'DPO replaces human preferences with synthetic data generated by the model itself',
      'DPO uses a different reinforcement learning algorithm but still requires a reward model',
    ],
    answer: 1,
    explanation: 'Direct Preference Optimization (DPO, Rafailov et al., 2023) reformulates the RLHF objective to optimize the LLM directly on human preference pairs (chosen vs. rejected responses) without training a separate reward model. It is mathematically equivalent to RLHF with the reward model solved in closed form, but is simpler to implement and more stable to train.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'What is the ReAct framework for LLM agents?',
    options: [
      'A JavaScript framework for building LLM-powered React applications',
      'A training method that combines real and synthetic data for LLM pre-training',
      'A framework that interleaves reasoning traces (Thought) with external actions (Action) and their results (Observation) to ground LLM reasoning in real-world information',
      'A benchmarking framework for evaluating LLM reaction times',
    ],
    answer: 2,
    explanation: 'ReAct (Yao et al., 2022) enables LLMs to alternate between thinking (generating reasoning traces) and acting (calling external tools like search engines, calculators, or APIs). The Thought -> Action -> Observation cycle grounds the model\'s reasoning in real-world information, reducing hallucination and enabling complex multi-step problem solving.',
  },

  // Chapter 13: NLP Ethics & Evaluation
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'What is "allocational bias" in NLP systems?',
    options: [
      'Bias in how compute resources are allocated during model training',
      'Bias in how memory is allocated for embedding storage',
      'When biased NLP systems cause real-world harm by allocating opportunities or resources unfairly — e.g., resume screening that favors male names',
      'Bias introduced by allocating too much training data to certain languages',
    ],
    answer: 2,
    explanation: 'Allocational bias occurs when NLP systems produce biased outputs that lead to unfair allocation of opportunities, resources, or outcomes in the real world. Examples include resume screening systems scoring male names higher, loan approval systems discriminating by race, and toxicity classifiers disproportionately flagging certain dialects as toxic.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'Why do LLMs hallucinate even when they have been trained on correct information?',
    options: [
      'LLMs hallucinate because their training data is always incorrect',
      'LLMs are trained to produce probable text, not true text — they generate the most likely continuation regardless of factual accuracy',
      'Hallucination only occurs in models smaller than 1 billion parameters',
      'LLMs hallucinate because they run out of context window space',
    ],
    answer: 1,
    explanation: 'LLMs are trained to maximize the probability of the next token given the context — they are essentially sophisticated pattern matchers, not truth databases. If the training data contains common patterns that happen to be wrong, or if the model interpolates between facts to produce plausible-sounding but fabricated information, it will do so confidently because probable does not equal true.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'Why is LMSYS Chatbot Arena considered more reliable than automated benchmarks like MMLU?',
    options: [
      'Chatbot Arena tests models on more questions than MMLU',
      'Chatbot Arena uses GPT-4 as the judge, which is more accurate than automated metrics',
      'Chatbot Arena uses blind pairwise human comparisons that are hard to game and capture real-world preferences, while automated benchmarks can be contaminated by training data overlap',
      'Chatbot Arena only evaluates English language capabilities',
    ],
    answer: 2,
    explanation: 'LMSYS Chatbot Arena has users chat with two anonymous models and pick the better response, producing ELO ratings from 1M+ human votes. This is hard to game because (1) the questions are unpredictable, (2) evaluation is holistic rather than measuring narrow capabilities, and (3) contamination is impossible since questions are user-generated. Automated benchmarks like MMLU can be inflated by training data overlap.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
