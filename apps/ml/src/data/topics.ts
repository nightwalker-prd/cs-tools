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
  { id: 2, title: 'Classical ML' },
  { id: 3, title: 'Deep Learning' },
  { id: 4, title: 'Advanced Topics' },
];

export const topics: Topic[] = [
  // ============================================================
  // PART 1: Foundations (Topics 1-4)
  // ============================================================
  {
    id: 1,
    title: 'Linear Regression & Gradient Descent',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Linear regression models the relationship between features and a continuous target variable using a weighted sum plus bias. Gradient descent iteratively optimizes the model parameters by following the negative gradient of the loss function.',
    concepts: [
      {
        id: 'linear-regression',
        name: 'Linear Regression',
        description:
          'A supervised learning algorithm that models the relationship between input features and a continuous output as a linear function y = wX + b, minimizing the sum of squared residuals.',
        keyPoints: [
          'The model predicts y = w1*x1 + w2*x2 + ... + wn*xn + b, where w is the weight vector and b is the bias (intercept) term',
          'The ordinary least squares (OLS) solution has a closed-form: w = (X^T X)^(-1) X^T y, but this requires inverting a matrix which is O(n^3) and numerically unstable for large feature sets',
          'The loss function is Mean Squared Error (MSE): (1/n) * sum((y_pred - y_actual)^2), which is convex and guarantees a single global minimum',
          'Assumptions include linearity, independence of errors, homoscedasticity (constant variance of residuals), and normally distributed residuals for valid statistical inference',
          'The coefficient of determination R-squared measures the proportion of variance in the target explained by the model, ranging from 0 (no explanatory power) to 1 (perfect fit)',
        ],
        tradeoffs: [
          'Simple and interpretable with clear coefficient meanings, but cannot capture non-linear relationships without feature engineering',
          'Closed-form OLS is exact but computationally expensive for high-dimensional data; gradient descent scales better but requires tuning the learning rate',
          'Sensitive to outliers because squared error penalizes large deviations quadratically; robust alternatives like Huber loss reduce this sensitivity',
        ],
        realWorld: [
          'Housing price prediction based on square footage, bedrooms, and location',
          'Sales forecasting from advertising spend across channels',
          'Salary prediction models in HR analytics',
        ],
      },
      {
        id: 'gradient-descent',
        name: 'Gradient Descent Optimization',
        description:
          'An iterative optimization algorithm that updates model parameters by moving in the direction of steepest descent of the loss function, scaled by a learning rate.',
        keyPoints: [
          'The update rule is w = w - learning_rate * gradient(loss), where the gradient points in the direction of steepest increase and we move opposite to it',
          'Batch gradient descent computes the gradient over the entire dataset per step (stable but slow); stochastic gradient descent (SGD) uses one sample (noisy but fast); mini-batch SGD uses a subset (balanced tradeoff)',
          'The learning rate is critical: too large causes divergence (overshooting the minimum), too small causes extremely slow convergence and getting stuck in local minima',
          'Learning rate schedules (step decay, cosine annealing, warm restarts) and adaptive methods (Adam, RMSProp, AdaGrad) automatically adjust the learning rate during training',
          'Convergence is detected when the gradient norm falls below a threshold, the loss change between epochs is negligible, or a maximum number of iterations is reached',
        ],
        tradeoffs: [
          'SGD is much faster per iteration but has high variance in updates, requiring momentum or averaging to smooth convergence',
          'Adam combines momentum and adaptive learning rates and works well out-of-the-box, but may converge to worse solutions than SGD with proper tuning on some tasks',
          'Mini-batch size affects both convergence quality and training speed: larger batches give more stable gradients but may generalize worse and require more memory',
        ],
        realWorld: [
          'Training all neural networks from image classifiers to language models',
          'Optimizing recommendation system parameters at scale',
          'Real-time model updates in online learning systems',
        ],
      },
      {
        id: 'polynomial-multivariate-regression',
        name: 'Polynomial & Multivariate Regression',
        description:
          'Extensions of linear regression that model non-linear relationships by adding polynomial terms (x^2, x^3, x1*x2) or handling multiple input features simultaneously.',
        keyPoints: [
          'Polynomial regression adds higher-degree terms (x^2, x^3, etc.) as new features, making the model linear in parameters even though the relationship with the original feature is non-linear',
          'Interaction terms (x1 * x2) capture how the effect of one feature depends on the value of another, enabling the model to represent more complex relationships',
          'The degree of the polynomial controls model complexity: degree 1 is linear, degree 2 is quadratic, and higher degrees fit increasingly complex curves but risk overfitting',
          'Feature scaling becomes critical with polynomial features because x^2 and x^3 can have vastly different magnitudes, causing gradient descent to oscillate or converge slowly',
        ],
        tradeoffs: [
          'Higher-degree polynomials fit training data more closely but are prone to overfitting, especially with limited data (high variance, low bias)',
          'Adding interaction terms increases the feature space combinatorially, requiring regularization or feature selection to prevent the curse of dimensionality',
          'Polynomial regression is still a linear model in the transformed feature space, so it benefits from the same closed-form solutions and convexity guarantees as standard linear regression',
        ],
        realWorld: [
          'Modeling growth curves in biology and economics where relationships are inherently non-linear',
          'Engineering applications like stress-strain curves and aerodynamic drag',
          'Environmental modeling of temperature, pollution, and seasonal patterns',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Classification & Logistic Regression',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Classification algorithms predict discrete class labels rather than continuous values. Logistic regression uses the sigmoid function to model the probability of binary outcomes, extended to multiple classes via softmax.',
    concepts: [
      {
        id: 'logistic-regression',
        name: 'Logistic Regression',
        description:
          'A classification algorithm that models the probability of a binary outcome using the sigmoid function sigma(z) = 1 / (1 + e^(-z)), where z = wX + b.',
        keyPoints: [
          'Despite its name, logistic regression is a classification algorithm that outputs probabilities between 0 and 1 via the sigmoid function, not a regression algorithm',
          'The loss function is binary cross-entropy: -[y*log(p) + (1-y)*log(1-p)], which is convex and penalizes confident wrong predictions heavily',
          'The model learns a linear decision boundary in feature space; the sigmoid maps the linear combination to a probability, and a threshold (typically 0.5) converts it to a class label',
          'Maximum likelihood estimation finds parameters that maximize the probability of observing the training labels, equivalent to minimizing cross-entropy loss',
          'Logistic regression provides well-calibrated probabilities when the linear assumption holds, making it valuable when you need probability estimates rather than just class labels',
        ],
        tradeoffs: [
          'Highly interpretable with odds ratios for each feature, but limited to linear decision boundaries and cannot capture complex non-linear patterns',
          'Computationally efficient and scales well to large datasets, but requires feature engineering to handle non-linear relationships',
          'Produces calibrated probabilities naturally, unlike many other classifiers that require post-hoc calibration (Platt scaling, isotonic regression)',
        ],
        realWorld: [
          'Medical diagnosis (disease present or absent) based on patient features',
          'Email spam detection classifying messages as spam or not spam',
          'Credit risk scoring for loan approval decisions',
        ],
      },
      {
        id: 'softmax-multiclass',
        name: 'Softmax & Multi-class Classification',
        description:
          'Softmax generalizes logistic regression to multiple classes by converting raw logits into a probability distribution where all class probabilities sum to 1.',
        keyPoints: [
          'The softmax function computes P(class_k) = exp(z_k) / sum(exp(z_j)) for all classes j, converting raw scores (logits) into a valid probability distribution',
          'Cross-entropy loss for multi-class: -sum(y_k * log(p_k)) where y is a one-hot vector, generalizing binary cross-entropy to K classes',
          'One-vs-rest (OvR) trains K binary classifiers independently; one-vs-one (OvO) trains K*(K-1)/2 pairwise classifiers; softmax handles all classes in a single model',
          'The temperature parameter T in softmax(z/T) controls the sharpness of the distribution: T < 1 makes predictions more confident, T > 1 makes them more uniform (used in knowledge distillation)',
        ],
        tradeoffs: [
          'Softmax assumes mutually exclusive classes; for multi-label problems (where an instance can belong to multiple classes), independent sigmoid classifiers are more appropriate',
          'One-vs-rest is simpler and parallelizable but can produce poorly calibrated probabilities; softmax provides a coherent probability distribution but requires all classes in one model',
          'High class counts (thousands of classes) make softmax expensive due to the normalization denominator; hierarchical softmax or sampled softmax can reduce this cost',
        ],
        realWorld: [
          'ImageNet classification with 1000 object categories',
          'Natural language processing tasks like part-of-speech tagging and named entity recognition',
          'Product categorization in e-commerce platforms',
        ],
      },
      {
        id: 'decision-boundaries',
        name: 'Decision Boundaries & Thresholds',
        description:
          'The decision boundary is the surface in feature space where the model transitions from predicting one class to another. The classification threshold controls the sensitivity-specificity tradeoff.',
        keyPoints: [
          'Linear classifiers (logistic regression, linear SVMs) create hyperplane decision boundaries; non-linear models (neural networks, kernel SVMs) create curved or complex boundaries',
          'The default threshold of 0.5 minimizes overall error rate but may not be optimal when classes are imbalanced or when the costs of false positives and false negatives differ',
          'Lowering the threshold increases recall (catches more positives) but decreases precision (more false positives); raising it does the opposite',
          'The optimal threshold depends on the business context: fraud detection typically uses a low threshold (catch more fraud), while medical screening balances sensitivity against unnecessary procedures',
          'Calibration ensures that a predicted probability of 0.8 means approximately 80% of such predictions are actually positive; reliability diagrams visualize calibration quality',
        ],
        tradeoffs: [
          'Complex decision boundaries fit training data better but may overfit, while simple boundaries (linear) generalize better but underfit if the true boundary is non-linear',
          'Threshold optimization requires a validation set and a clear business objective; optimizing for one metric (F1, recall at fixed precision) inherently trades off another',
          'Class imbalance shifts the effective decision boundary toward the majority class; techniques like oversampling, undersampling, or cost-sensitive learning can rebalance it',
        ],
        realWorld: [
          'Medical test cutoffs balancing sensitivity and specificity for disease screening',
          'Fraud detection systems tuning thresholds for different transaction risk levels',
          'Autonomous vehicle perception systems with safety-critical classification thresholds',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Model Evaluation & Validation',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Model evaluation quantifies how well a model generalizes to unseen data. Cross-validation provides robust performance estimates, while metrics like precision, recall, and AUC capture different aspects of classification quality.',
    concepts: [
      {
        id: 'cross-validation',
        name: 'Cross-Validation Techniques',
        description:
          'Cross-validation partitions data into multiple train-test splits to estimate model performance more reliably than a single holdout, reducing variance in the performance estimate.',
        keyPoints: [
          'K-fold cross-validation splits data into K equal folds, trains on K-1 folds and validates on the remaining fold, repeating K times to produce K performance estimates whose mean and standard deviation characterize model quality',
          'Stratified K-fold preserves the class distribution in each fold, which is critical for imbalanced datasets where random splits might leave some folds with very few minority class samples',
          'Leave-one-out (LOO) cross-validation uses K = N (one sample per fold), providing nearly unbiased estimates but with high variance and computational cost proportional to dataset size',
          'Time-series cross-validation uses expanding or sliding windows to respect temporal ordering, never training on future data to predict the past',
          'Nested cross-validation uses an inner loop for hyperparameter tuning and an outer loop for performance estimation, avoiding the optimistic bias of tuning and evaluating on the same splits',
        ],
        tradeoffs: [
          'More folds (larger K) reduce bias in the estimate but increase variance and computational cost; K=5 or K=10 are standard compromises',
          'Cross-validation estimates generalization performance but does not produce a single model; the final model is typically retrained on all available data',
          'Data leakage can occur if preprocessing (scaling, feature selection) is done before splitting; all preprocessing must be inside the cross-validation loop',
        ],
        realWorld: [
          'Comparing model architectures in Kaggle competitions',
          'Validating clinical prediction models where data is limited',
          'Hyperparameter tuning with grid search or random search using cross-validated scores',
        ],
      },
      {
        id: 'precision-recall-f1',
        name: 'Precision, Recall & F1 Score',
        description:
          'Precision measures the fraction of positive predictions that are correct, recall measures the fraction of actual positives that are found, and F1 balances both as their harmonic mean.',
        keyPoints: [
          'Precision = TP / (TP + FP): of all instances predicted positive, what fraction are actually positive. High precision means few false alarms.',
          'Recall (sensitivity) = TP / (TP + FN): of all actual positive instances, what fraction did the model find. High recall means few missed positives.',
          'F1 = 2 * (precision * recall) / (precision + recall): the harmonic mean penalizes extreme imbalances more than the arithmetic mean, requiring both metrics to be high for a high F1',
          'The F-beta score generalizes F1: F_beta = (1 + beta^2) * (precision * recall) / (beta^2 * precision + recall), where beta < 1 weighs precision higher and beta > 1 weighs recall higher',
          'Macro-averaging computes the metric independently for each class and averages (treats all classes equally); micro-averaging aggregates TP/FP/FN globally (favors majority classes)',
        ],
        tradeoffs: [
          'Accuracy is misleading for imbalanced data (99% accuracy on 99% negative data by predicting all negative); precision-recall metrics are more informative',
          'Optimizing for precision (reducing false positives) inherently reduces recall (more false negatives) and vice versa; the right balance depends on the cost of each error type',
          'Macro-average gives equal weight to rare classes (good for fairness); micro-average reflects overall performance (good when class importance correlates with frequency)',
        ],
        realWorld: [
          'Information retrieval systems where precision@k measures result quality',
          'Cancer screening where recall must be very high even at the cost of precision',
          'Content moderation where precision matters to avoid censoring legitimate content',
        ],
      },
      {
        id: 'roc-auc',
        name: 'ROC Curves & AUC',
        description:
          'The ROC curve plots true positive rate vs false positive rate across all classification thresholds. AUC (Area Under the Curve) summarizes overall model discrimination ability as a single number.',
        keyPoints: [
          'The ROC curve is created by varying the classification threshold from 0 to 1 and plotting TPR (recall) on the y-axis against FPR (1 - specificity) on the x-axis at each threshold',
          'AUC = 0.5 indicates random guessing (the diagonal line), AUC = 1.0 indicates perfect separation, and AUC < 0.5 suggests the model predictions are inverted',
          'AUC has a probabilistic interpretation: it is the probability that a randomly chosen positive instance is ranked higher than a randomly chosen negative instance by the model',
          'The precision-recall curve and average precision (AP) are preferred over ROC-AUC for highly imbalanced datasets because ROC-AUC can be optimistically high when negatives vastly outnumber positives',
        ],
        tradeoffs: [
          'AUC summarizes performance across all thresholds but may not reflect performance at the specific operating point (threshold) used in production',
          'ROC-AUC is invariant to class distribution, which is both a strength (allows comparison across datasets) and a weakness (can mask poor performance on the minority class)',
          'Multiple models can have the same AUC but very different ROC curves, performing better in different threshold ranges; visual inspection of the curve is important beyond the single number',
        ],
        realWorld: [
          'Comparing diagnostic tests in medicine where the operating threshold varies by clinical context',
          'Evaluating ranking models in search and recommendation systems',
          'A/B testing classification models by comparing AUC as a threshold-independent metric',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Regularization & Feature Engineering',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Regularization constrains model complexity to prevent overfitting, while feature engineering transforms raw data into informative features. Together they determine whether a model generalizes well or memorizes training noise.',
    concepts: [
      {
        id: 'l1-l2-regularization',
        name: 'L1 & L2 Regularization',
        description:
          'Regularization adds a penalty term to the loss function proportional to the magnitude of model weights, discouraging complex models that overfit. L1 uses absolute values (Lasso), L2 uses squared values (Ridge).',
        keyPoints: [
          'L2 regularization (Ridge) adds lambda * sum(w_i^2) to the loss, shrinking all weights toward zero but rarely setting any exactly to zero; it reduces overfitting while keeping all features',
          'L1 regularization (Lasso) adds lambda * sum(|w_i|) to the loss, producing sparse solutions where some weights are exactly zero, effectively performing automatic feature selection',
          'Elastic Net combines L1 and L2: alpha * L1 + (1 - alpha) * L2, providing both sparsity and stability, especially useful when features are correlated',
          'The regularization strength lambda controls the bias-variance tradeoff: high lambda increases bias (underfitting) but decreases variance; low lambda allows more complex models that may overfit',
          'Regularization is equivalent to placing a prior on the weights in Bayesian terms: L2 corresponds to a Gaussian prior, L1 to a Laplace prior',
        ],
        tradeoffs: [
          'L1 produces interpretable sparse models but the optimization is non-differentiable at zero, requiring specialized solvers (coordinate descent, proximal gradient)',
          'L2 is computationally simpler (differentiable everywhere) and handles correlated features better, but retains all features which may hinder interpretability',
          'The optimal lambda must be found via cross-validation; too much regularization prevents the model from learning the signal, too little allows it to memorize noise',
        ],
        realWorld: [
          'Genomics where L1 selects a small subset of genes from thousands of candidates',
          'Financial models using Ridge regression to handle multicollinearity among economic indicators',
          'Text classification with Elastic Net handling high-dimensional, correlated word features',
        ],
      },
      {
        id: 'feature-scaling',
        name: 'Feature Scaling & Normalization',
        description:
          'Feature scaling transforms features to comparable ranges so that algorithms sensitive to feature magnitudes (gradient descent, distance-based methods) work correctly and converge faster.',
        keyPoints: [
          'Standardization (Z-score) transforms features to zero mean and unit variance: z = (x - mean) / std. It does not bound values and works well when features follow approximately Gaussian distributions',
          'Min-max normalization scales features to [0, 1]: x_norm = (x - min) / (max - min). It preserves the shape of the distribution but is sensitive to outliers',
          'Robust scaling uses the median and interquartile range instead of mean and standard deviation, making it resistant to outliers: x_robust = (x - median) / IQR',
          'Algorithms that compute distances (KNN, SVM, K-means) or use gradient descent are sensitive to feature scale; tree-based methods (random forests, XGBoost) are invariant to scaling',
          'Scaling parameters (mean, std, min, max) must be computed only on the training set and applied to the test set to prevent data leakage',
        ],
        tradeoffs: [
          'Standardization works well for most algorithms but assumes features are roughly Gaussian; min-max is better when you need bounded outputs (e.g., for neural networks with sigmoid activations)',
          'Scaling can destroy meaningful natural scales (e.g., temperatures in Celsius vs. Fahrenheit have interpretable units); in tree-based models, keeping original scales preserves interpretability',
          'Batch normalization in neural networks performs scaling dynamically during training, reducing sensitivity to initialization and enabling higher learning rates',
        ],
        realWorld: [
          'Preprocessing for K-nearest neighbors where Euclidean distance depends on feature scale',
          'Neural network training where standardized inputs improve gradient flow and convergence speed',
          'Combining features with different units (age in years, income in dollars, distance in miles) in a single model',
        ],
      },
      {
        id: 'feature-selection-extraction',
        name: 'Feature Selection & Extraction',
        description:
          'Feature selection identifies the most informative subset of existing features, while feature extraction creates new features from the original ones, both aiming to improve model performance and reduce dimensionality.',
        keyPoints: [
          'Filter methods rank features independently of the model using statistical tests (chi-squared, mutual information, correlation) and are fast but ignore feature interactions',
          'Wrapper methods (forward selection, backward elimination, recursive feature elimination) evaluate subsets by training models, capturing interactions but being computationally expensive',
          'Embedded methods (L1 regularization, tree-based feature importance) perform selection during model training, balancing accuracy and efficiency',
          'Feature extraction transforms the original feature space: PCA finds orthogonal linear combinations that capture maximum variance; autoencoders learn non-linear compressed representations',
          'Domain-specific feature engineering (TF-IDF for text, spectrograms for audio, histograms of oriented gradients for images) encodes expert knowledge that raw features lack',
        ],
        tradeoffs: [
          'Fewer features reduce overfitting, training time, and storage but may discard relevant information; the optimal feature set depends on the model and task',
          'Automatic feature selection can be unstable with correlated features (different runs select different features); domain knowledge provides more robust feature choices',
          'Extracted features (e.g., PCA components) may be more predictive but lose interpretability; in regulated domains (healthcare, finance) interpretable features may be required',
        ],
        realWorld: [
          'Gene expression analysis selecting biomarkers from tens of thousands of genes',
          'Natural language processing creating TF-IDF, word embeddings, or n-gram features from raw text',
          'Computer vision using SIFT, HOG, or learned CNN features for object recognition',
        ],
      },
    ],
  },

  // ============================================================
  // PART 2: Classical ML (Topics 5-7)
  // ============================================================
  {
    id: 5,
    title: 'Decision Trees & Ensembles',
    part: 2,
    partTitle: 'Classical ML',
    summary:
      'Decision trees recursively partition the feature space using simple rules, creating interpretable models. Ensemble methods like random forests and gradient boosting combine multiple trees to achieve state-of-the-art performance on tabular data.',
    concepts: [
      {
        id: 'decision-trees',
        name: 'Decision Trees & Splitting Criteria',
        description:
          'A decision tree recursively splits data based on feature thresholds, creating a flowchart-like structure where each internal node tests a feature, each branch represents an outcome, and each leaf assigns a prediction.',
        keyPoints: [
          'At each node, the algorithm selects the feature and threshold that best separates the data according to an impurity measure (Gini impurity, entropy/information gain, or variance reduction for regression)',
          'Gini impurity measures the probability of misclassifying a randomly chosen element: Gini = 1 - sum(p_k^2). Entropy measures information content: H = -sum(p_k * log2(p_k)). Both reach zero for pure nodes.',
          'Trees are prone to overfitting (they can perfectly memorize training data by creating one leaf per sample); pruning techniques (max depth, min samples per leaf, cost-complexity pruning) prevent this',
          'Decision trees handle both numerical and categorical features natively, require no feature scaling, and can capture non-linear relationships and feature interactions automatically',
          'Feature importance can be computed by summing the weighted impurity decrease at each node where a feature is used, providing a built-in measure of variable relevance',
        ],
        tradeoffs: [
          'Highly interpretable (you can trace the decision path for any prediction) but a single tree is often too weak and unstable for production use',
          'Greedy splitting finds locally optimal splits but not the globally optimal tree (which is NP-hard to find); small changes in data can produce very different trees (high variance)',
          'No feature scaling needed and handles missing values naturally, but struggles with linear relationships that require many axis-aligned splits to approximate',
        ],
        realWorld: [
          'Medical diagnosis decision support systems where interpretability is required',
          'Customer churn prediction with clear rules for retention strategies',
          'Credit scoring with explainable approval and rejection reasons',
        ],
      },
      {
        id: 'random-forests',
        name: 'Random Forests',
        description:
          'A random forest trains many decision trees on different bootstrap samples of the data, using random subsets of features at each split, and aggregates their predictions by majority vote (classification) or averaging (regression).',
        keyPoints: [
          'Bagging (bootstrap aggregating) trains each tree on a random sample with replacement of size N drawn from N training examples; about 63.2% of data appears in each bootstrap sample',
          'Feature randomness: at each split, only a random subset of sqrt(p) features (classification) or p/3 features (regression) is considered, decorrelating the trees and reducing ensemble variance',
          'Out-of-bag (OOB) evaluation uses the ~36.8% of samples not in each tree bootstrap to estimate generalization error without a separate validation set',
          'Random forests are embarrassingly parallel (each tree is independent) and scale linearly with the number of trees, making them easy to distribute across cores or machines',
          'Permutation importance measures feature relevance by randomly shuffling each feature and measuring the decrease in OOB accuracy, providing a model-agnostic importance metric',
        ],
        tradeoffs: [
          'Very robust with minimal hyperparameter tuning (increasing trees never hurts, and defaults for max features work well), but less accurate than gradient boosting on many tabular tasks',
          'Each tree sees only a subset of features, preventing any single dominant feature from appearing in every tree and reducing overfitting, but this can miss important feature interactions',
          'Random forests are hard to interpret as a whole (hundreds of trees), although individual predictions can be explained using tree paths or SHAP values',
        ],
        realWorld: [
          'Kaggle competitions on tabular data as a strong baseline model',
          'Remote sensing and satellite image classification using spectral features',
          'Bioinformatics for gene expression analysis and variant classification',
        ],
      },
      {
        id: 'gradient-boosting',
        name: 'Gradient Boosting (XGBoost/LightGBM)',
        description:
          'Gradient boosting builds trees sequentially, where each new tree corrects the errors (residuals) of the previous ensemble. XGBoost and LightGBM are optimized implementations that dominate tabular machine learning.',
        keyPoints: [
          'Unlike random forests (parallel, independent trees), gradient boosting adds trees sequentially: each tree is fitted to the negative gradient (pseudo-residuals) of the loss function with respect to the current ensemble predictions',
          'The learning rate (shrinkage) scales the contribution of each tree, trading off the number of trees needed for convergence: lower learning rates need more trees but typically generalize better',
          'XGBoost adds L1/L2 regularization to the tree structure (leaf weights and number of leaves), second-order gradient information for better splits, and built-in handling of missing values',
          'LightGBM uses histogram-based splitting (binning continuous features) and leaf-wise growth instead of level-wise, achieving faster training on large datasets with comparable or better accuracy',
          'Early stopping monitors validation loss and halts training when performance stops improving, preventing overfitting without needing to specify the exact number of trees',
        ],
        tradeoffs: [
          'Gradient boosting achieves state-of-the-art accuracy on tabular data but is more sensitive to hyperparameters (learning rate, max depth, number of trees) than random forests',
          'Sequential training means boosting cannot be parallelized at the tree level (though XGBoost/LightGBM parallelize within-tree operations); this makes it slower to train than random forests',
          'Boosting is more prone to overfitting than bagging because each tree specifically targets the remaining errors, which may include noise; regularization and early stopping are essential',
        ],
        realWorld: [
          'Winning solution in the majority of Kaggle tabular data competitions',
          'Click-through rate prediction in online advertising at companies like Google and Facebook',
          'Risk modeling in insurance and finance for pricing and fraud detection',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Support Vector Machines',
    part: 2,
    partTitle: 'Classical ML',
    summary:
      'Support vector machines find the hyperplane that maximizes the margin between classes. The kernel trick enables SVMs to learn non-linear decision boundaries by implicitly mapping data to high-dimensional spaces.',
    concepts: [
      {
        id: 'linear-svm',
        name: 'Linear SVMs & Maximum Margin',
        description:
          'A linear SVM finds the hyperplane that separates two classes with the largest possible margin, defined as the distance between the hyperplane and the nearest data points (support vectors) from each class.',
        keyPoints: [
          'The maximum margin principle provides the hyperplane that is most robust to small perturbations in the data, leading to better generalization compared to any separating hyperplane',
          'Support vectors are the training points closest to the decision boundary; only these points determine the hyperplane, making SVMs memory-efficient once trained',
          'The soft-margin SVM (C-SVM) allows some misclassifications controlled by the parameter C: high C penalizes misclassifications more (tighter fit), low C allows more violations (wider margin)',
          'The optimization problem is a convex quadratic program, guaranteeing a unique global optimum and enabling efficient solving via sequential minimal optimization (SMO)',
          'The margin is 2/||w|| where w is the weight vector; maximizing the margin is equivalent to minimizing ||w||^2, which is also a form of L2 regularization',
        ],
        tradeoffs: [
          'SVMs with the right kernel can achieve excellent accuracy on small to medium datasets, but training time scales O(n^2) to O(n^3), making them impractical for very large datasets',
          'The maximum margin criterion makes SVMs naturally resistant to overfitting on small datasets, but they provide no probability estimates without additional calibration (Platt scaling)',
          'Linear SVMs are fast and interpretable but can only model linear decision boundaries; non-linear problems require kernelization which adds complexity and tuning burden',
        ],
        realWorld: [
          'Text classification and sentiment analysis with linear SVMs on TF-IDF features',
          'Handwriting recognition where the margin-based approach works well with high-dimensional pixel features',
          'Bioinformatics for protein structure prediction and gene classification',
        ],
      },
      {
        id: 'kernel-trick',
        name: 'Kernel Trick & Non-linear SVMs',
        description:
          'The kernel trick computes dot products in a high-dimensional feature space without explicitly mapping data there, enabling SVMs to learn non-linear decision boundaries efficiently.',
        keyPoints: [
          'A kernel function K(x_i, x_j) computes the inner product in a transformed feature space: K(x_i, x_j) = phi(x_i) . phi(x_j), without ever computing phi(x) explicitly',
          'Common kernels: RBF (Gaussian) K = exp(-gamma * ||x-y||^2) maps to infinite-dimensional space; polynomial K = (x.y + c)^d maps to a finite but high-dimensional space',
          'The RBF kernel parameter gamma controls the influence radius of each support vector: high gamma creates tight, complex boundaries (overfitting risk); low gamma creates smoother boundaries',
          'Mercer\'s theorem states that any positive semi-definite function can be used as a kernel, ensuring the implicit feature space exists and the optimization remains convex',
        ],
        tradeoffs: [
          'The kernel trick avoids the computational and memory cost of explicitly computing high-dimensional features, but kernel matrix computation is still O(n^2) in the number of samples',
          'RBF kernels can fit any boundary given enough data but have two hyperparameters (C and gamma) that require careful tuning, typically via grid search with cross-validation',
          'Custom kernels can encode domain-specific similarity (string kernels for sequences, graph kernels for molecules), but designing valid kernels requires mathematical expertise',
        ],
        realWorld: [
          'Image classification before deep learning dominated, using RBF kernels on histogram features',
          'Computational chemistry with molecular fingerprint kernels for drug discovery',
          'Natural language processing with string kernels for text classification without explicit feature extraction',
        ],
      },
      {
        id: 'svm-variants',
        name: 'SVM Variants & Applications',
        description:
          'SVMs extend beyond binary classification to support regression (SVR), one-class classification for anomaly detection, and multi-class classification through various decomposition strategies.',
        keyPoints: [
          'Support Vector Regression (SVR) fits a tube of width epsilon around the data; points inside the tube incur no loss, and only points outside (support vectors) contribute to the model',
          'One-class SVM learns a boundary around the normal data distribution without requiring labeled anomalies, making it suitable for novelty detection when only normal examples are available',
          'Multi-class SVM is typically implemented via one-vs-rest (K classifiers) or one-vs-one (K*(K-1)/2 pairwise classifiers); the latter is more accurate but computationally expensive for many classes',
          'Nu-SVM replaces the C parameter with nu (0 to 1), which directly controls the fraction of support vectors and margin errors, providing a more intuitive parameterization',
        ],
        tradeoffs: [
          'SVR ignores errors within the epsilon tube (sparse solution) but choosing epsilon and C requires domain knowledge about acceptable error tolerance',
          'One-class SVM is powerful for anomaly detection but assumes normal data fills a compact region; it struggles with multimodal normal distributions',
          'SVMs produce sparse models (only support vectors matter) which enables fast inference, but they lack the probabilistic framework of Bayesian methods and cannot quantify prediction uncertainty natively',
        ],
        realWorld: [
          'Financial time series prediction using SVR for stock price forecasting',
          'Network intrusion detection using one-class SVM trained on normal traffic patterns',
          'Handwritten digit recognition (MNIST) achieving near-human accuracy with RBF kernel SVMs',
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Unsupervised Learning',
    part: 2,
    partTitle: 'Classical ML',
    summary:
      'Unsupervised learning discovers hidden structure in unlabeled data. Clustering algorithms group similar data points, while dimensionality reduction techniques compress high-dimensional data into informative lower-dimensional representations.',
    concepts: [
      {
        id: 'kmeans-clustering',
        name: 'K-Means & Clustering Algorithms',
        description:
          'K-means partitions data into K clusters by iteratively assigning points to the nearest centroid and updating centroids to the mean of assigned points, minimizing within-cluster sum of squared distances.',
        keyPoints: [
          'The algorithm alternates between assignment (assign each point to nearest centroid) and update (recompute centroids as cluster means) until convergence, which is guaranteed but may be a local minimum',
          'K-means++ initialization selects initial centroids that are spread apart, dramatically improving convergence speed and solution quality compared to random initialization',
          'The elbow method plots within-cluster sum of squares (inertia) vs K and selects the K where adding more clusters yields diminishing returns; the silhouette score provides a more rigorous alternative',
          'K-means assumes spherical, equally-sized clusters and uses Euclidean distance; DBSCAN finds arbitrary-shaped clusters based on density; hierarchical clustering builds a tree of nested clusters',
          'Gaussian Mixture Models (GMMs) generalize K-means by modeling each cluster as a Gaussian distribution, assigning probabilistic (soft) memberships rather than hard assignments',
        ],
        tradeoffs: [
          'K-means is fast (O(n*K*d*i) per iteration) and scales well, but requires specifying K in advance and is sensitive to initialization and outliers',
          'DBSCAN automatically determines the number of clusters and finds arbitrary shapes, but is sensitive to its epsilon and min_samples parameters and struggles with varying-density clusters',
          'Hierarchical clustering provides a rich dendrogram visualization of cluster relationships but is O(n^2) in memory and O(n^3) in time, limiting it to smaller datasets',
        ],
        realWorld: [
          'Customer segmentation in marketing for targeted campaigns',
          'Image compression by quantizing pixel colors to K representative colors',
          'Document clustering for topic discovery in large text corpora',
        ],
      },
      {
        id: 'pca',
        name: 'Dimensionality Reduction (PCA)',
        description:
          'Principal Component Analysis (PCA) finds orthogonal directions of maximum variance in the data and projects onto the top K components, reducing dimensionality while preserving the most informative variation.',
        keyPoints: [
          'PCA computes the eigenvectors of the covariance matrix (or equivalently, the singular vectors via SVD); the eigenvector with the largest eigenvalue is the first principal component, capturing the most variance',
          'The proportion of variance explained by each component equals its eigenvalue divided by the sum of all eigenvalues; cumulative explained variance guides the choice of how many components to retain',
          'PCA is a linear transformation: it cannot capture non-linear structure. Kernel PCA applies the kernel trick to find non-linear components, similar to how kernel SVMs handle non-linear boundaries',
          'Centering the data (subtracting the mean) is required before PCA; standardization (dividing by standard deviation) is recommended when features have different scales to prevent high-variance features from dominating',
        ],
        tradeoffs: [
          'PCA is computationally efficient (SVD on n*d matrix) and has no hyperparameters beyond the number of components, but the components are linear combinations of all features, reducing interpretability',
          'PCA maximizes variance preservation but variance may not correspond to the most discriminative information for classification; Linear Discriminant Analysis (LDA) explicitly maximizes class separation instead',
          'Truncated SVD / randomized PCA can handle very large, sparse datasets efficiently, but the approximation introduces a small error in the explained variance',
        ],
        realWorld: [
          'Face recognition (eigenfaces) reducing high-dimensional pixel data to a compact representation',
          'Genomics reducing thousands of gene expression measurements to principal components for visualization and clustering',
          'Financial portfolio analysis identifying principal components of asset return covariance',
        ],
      },
      {
        id: 'tsne-umap',
        name: 't-SNE & UMAP Visualization',
        description:
          't-SNE and UMAP are non-linear dimensionality reduction techniques designed for visualizing high-dimensional data in 2D or 3D by preserving local neighborhood structure.',
        keyPoints: [
          't-SNE (t-distributed Stochastic Neighbor Embedding) models pairwise similarities as probability distributions in high and low dimensions, minimizing their KL divergence to preserve local structure',
          't-SNE uses a heavy-tailed Student-t distribution in the low-dimensional space to address the crowding problem, allowing dissimilar points to be placed far apart without squeezing similar points together',
          'The perplexity parameter in t-SNE controls the effective number of neighbors considered for each point; typical values are 5-50, and results can vary significantly with different perplexity settings',
          'UMAP (Uniform Manifold Approximation and Projection) is based on Riemannian geometry and algebraic topology, producing similar visualizations to t-SNE but much faster and with better preservation of global structure',
          'Both methods are stochastic and non-parametric: running the same algorithm twice may produce different layouts; they should be used for visualization and exploration, not as preprocessing for downstream models',
        ],
        tradeoffs: [
          't-SNE is excellent at revealing local cluster structure but distorts global distances and relative cluster sizes; UMAP better preserves global structure but is still a non-linear projection',
          't-SNE is O(n^2) in time and memory (Barnes-Hut approximation reduces to O(n*log(n))); UMAP is significantly faster and scales to millions of points',
          'Neither method preserves distances faithfully: clusters that appear close may not be close in the original space, and relative cluster sizes are not meaningful. Always validate with quantitative metrics',
        ],
        realWorld: [
          'Visualizing word embeddings (Word2Vec, GloVe) to explore semantic relationships',
          'Single-cell RNA sequencing analysis to identify cell types from gene expression data',
          'Exploring latent spaces of generative models (VAEs, GANs) to understand learned representations',
        ],
      },
    ],
  },

  // ============================================================
  // PART 3: Deep Learning (Topics 8-10)
  // ============================================================
  {
    id: 8,
    title: 'Neural Networks & Backpropagation',
    part: 3,
    partTitle: 'Deep Learning',
    summary:
      'Neural networks are compositions of linear transformations and non-linear activation functions organized in layers. Backpropagation computes gradients of the loss with respect to all parameters using the chain rule, enabling gradient-based optimization.',
    concepts: [
      {
        id: 'perceptrons-mlp',
        name: 'Perceptrons & Multilayer Networks',
        description:
          'A perceptron computes a weighted sum of inputs plus bias and applies a step function. Multilayer perceptrons (MLPs) stack multiple layers with non-linear activations, enabling them to learn any continuous function.',
        keyPoints: [
          'A single perceptron can only learn linearly separable functions (AND, OR) but cannot learn XOR; adding a hidden layer with non-linear activation solves this limitation',
          'The Universal Approximation Theorem states that an MLP with a single hidden layer and sufficient neurons can approximate any continuous function to arbitrary accuracy, though deeper networks are more parameter-efficient',
          'Each layer applies a linear transformation (weight matrix multiplication + bias) followed by a non-linear activation function; without non-linearity, multiple layers collapse to a single linear transformation',
          'Network architecture choices include width (neurons per layer), depth (number of layers), and connectivity patterns; deeper networks extract increasingly abstract hierarchical features',
          'Dropout randomly sets a fraction of neuron outputs to zero during training, acting as a regularizer by preventing co-adaptation of neurons and approximating an ensemble of sub-networks',
        ],
        tradeoffs: [
          'Wider networks have more capacity but are prone to memorization; deeper networks learn better representations but suffer from vanishing/exploding gradients and are harder to optimize',
          'MLPs treat input features as a flat vector with no spatial or temporal structure; CNNs and RNNs exploit structure (spatial locality, sequential order) for more efficient learning on appropriate data',
          'Neural networks are powerful universal function approximators but are black boxes; interpretability methods (SHAP, LIME, attention weights) provide post-hoc explanations but are not always faithful',
        ],
        realWorld: [
          'Tabular data classification and regression as an alternative to gradient boosting',
          'Function approximation in physics simulations and engineering design',
          'Embedding layers in recommendation systems that map users and items to dense vectors',
        ],
      },
      {
        id: 'backpropagation',
        name: 'Backpropagation & Chain Rule',
        description:
          'Backpropagation computes the gradient of the loss with respect to every weight in the network by applying the chain rule of calculus backward through the computational graph, from the output layer to the input layer.',
        keyPoints: [
          'The forward pass computes the output by propagating inputs through each layer; the backward pass computes gradients by propagating the loss gradient backward using the chain rule: dL/dw = dL/dz * dz/dw',
          'Automatic differentiation frameworks (PyTorch, TensorFlow) build a dynamic computational graph during the forward pass and traverse it in reverse to compute all gradients efficiently in O(N) time',
          'The vanishing gradient problem occurs when gradients shrink exponentially through many layers (sigmoid/tanh saturate), making early layers learn extremely slowly; ReLU, residual connections, and batch normalization mitigate this',
          'The exploding gradient problem occurs when gradients grow exponentially, causing numerical instability; gradient clipping (scaling gradients when their norm exceeds a threshold) is the standard solution',
          'Backpropagation through time (BPTT) unrolls recurrent networks across time steps and applies standard backpropagation, but the unrolled graph can be very deep, exacerbating gradient issues',
        ],
        tradeoffs: [
          'Backpropagation is efficient (one forward + one backward pass computes all gradients) but requires storing all intermediate activations, which is the main memory bottleneck for large networks',
          'Gradient checkpointing trades compute for memory by recomputing intermediate activations during the backward pass instead of storing them, reducing memory usage from O(L) to O(sqrt(L)) for L layers',
          'Second-order methods (Newton, L-BFGS) converge faster but require computing or approximating the Hessian matrix, which is prohibitively expensive for networks with millions of parameters',
        ],
        realWorld: [
          'Training every modern neural network from small classifiers to GPT-scale language models',
          'Differentiable programming in scientific computing for solving differential equations',
          'Meta-learning and neural architecture search that differentiate through the training process itself',
        ],
      },
      {
        id: 'activations-initialization',
        name: 'Activation Functions & Initialization',
        description:
          'Activation functions introduce non-linearity into neural networks, and weight initialization sets the starting point for optimization. Both critically affect training dynamics, convergence speed, and final model quality.',
        keyPoints: [
          'ReLU (max(0, x)) is the most widely used activation: computationally efficient, no saturation for positive values, but "dead neurons" (permanently zero output) occur when inputs are always negative',
          'Leaky ReLU, ELU, GELU, and Swish variants address the dying ReLU problem by allowing small gradients for negative inputs; GELU is standard in transformers, Swish in EfficientNet',
          'Xavier/Glorot initialization sets weights from a distribution with variance 2/(fan_in + fan_out), maintaining signal variance across layers for sigmoid/tanh activations',
          'Kaiming/He initialization uses variance 2/fan_in, designed specifically for ReLU activations where half the distribution is zeroed out, preventing the signal from shrinking through layers',
          'Batch normalization normalizes layer inputs to zero mean and unit variance within each mini-batch, allowing higher learning rates and reducing sensitivity to initialization',
        ],
        tradeoffs: [
          'ReLU is fast and works well in practice but creates dead neurons; variants like Leaky ReLU prevent this at a small computational cost',
          'Proper initialization is crucial for training deep networks without batch normalization; with batch normalization, the network is more robust to initialization choices',
          'Batch normalization adds computational overhead and behaves differently during training (batch statistics) and inference (running statistics), which can cause issues with small batch sizes',
        ],
        realWorld: [
          'GELU activation in BERT and GPT transformer models for natural language processing',
          'He initialization as the default for convolutional neural networks with ReLU activations',
          'Layer normalization (instead of batch normalization) in transformers where batch sizes vary or are small',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'CNNs & Computer Vision',
    part: 3,
    partTitle: 'Deep Learning',
    summary:
      'Convolutional neural networks exploit spatial locality through learned filters that detect features regardless of position. Modern architectures achieve superhuman performance on image classification, and transfer learning allows adapting pretrained models to new tasks.',
    concepts: [
      {
        id: 'conv-layers',
        name: 'Convolutional Layers & Pooling',
        description:
          'Convolutional layers apply learned filters (kernels) that slide across the input, detecting local patterns like edges and textures. Pooling layers downsample spatial dimensions, reducing computation and providing translation invariance.',
        keyPoints: [
          'A convolutional layer applies K learned filters of size (h, w, c_in) to produce K feature maps; each filter captures a specific pattern (edge, corner, texture) and the same weights are shared across all spatial positions',
          'Padding (adding zeros around the input) controls output spatial dimensions; stride (step size of the sliding window) controls downsampling; dilated convolutions increase the receptive field without adding parameters',
          'Max pooling takes the maximum value in each window, providing slight translation invariance; average pooling computes the mean; global average pooling reduces each feature map to a single value, replacing fully connected layers',
          'The receptive field is the region of the input that influences a single output neuron; it grows with network depth, allowing deeper layers to capture larger-scale patterns (objects vs edges)',
          'Depthwise separable convolutions (MobileNet) factorize standard convolution into a depthwise spatial convolution and a pointwise 1x1 convolution, reducing parameters and computation by ~8-9x',
        ],
        tradeoffs: [
          'More filters and larger kernels increase capacity but also parameters and computation; modern architectures use many small (3x3) filters instead of fewer large ones for better parameter efficiency',
          'Pooling reduces spatial resolution and computation but discards positional information; some architectures replace pooling with strided convolutions to learn what to downsample',
          'Weight sharing (same filter across all positions) gives translation equivariance but assumes patterns look the same everywhere; deformable convolutions learn position-dependent offsets for more flexibility',
        ],
        realWorld: [
          'Real-time object detection in autonomous vehicles and security cameras',
          'Medical image analysis for detecting tumors in X-rays, CT scans, and MRI images',
          'Image search engines using CNN features for visual similarity matching',
        ],
      },
      {
        id: 'cnn-architectures',
        name: 'CNN Architectures (ResNet/VGG/EfficientNet)',
        description:
          'The evolution of CNN architectures from shallow VGG to deep ResNet with skip connections and efficient EfficientNet with compound scaling represents key advances in deep learning for computer vision.',
        keyPoints: [
          'VGG (2014) showed that depth matters by using uniform 3x3 filters stacked deep (16-19 layers), but suffered from high parameter count (138M) and slow training',
          'ResNet (2015) introduced skip connections (residual blocks) that add the input to the output of each block: y = F(x) + x. This enables training networks with 100+ layers by solving the degradation problem',
          'Skip connections allow gradients to flow directly through the identity path, mitigating vanishing gradients and enabling the network to learn identity mappings easily (adding refinements rather than full transformations)',
          'EfficientNet (2019) uses compound scaling to simultaneously increase depth, width, and resolution in a principled way, achieving better accuracy than previous models with fewer parameters',
          'Modern architectures include ConvNeXt (adapting transformer design principles to CNNs), achieving competitive performance with Vision Transformers while maintaining the efficiency of convolutions',
        ],
        tradeoffs: [
          'Deeper networks capture more complex features but require skip connections to train; without them, adding layers can actually decrease accuracy (the degradation problem ResNet solved)',
          'ResNet variants (ResNeXt, DenseNet, ResNeSt) offer different accuracy-efficiency tradeoffs; DenseNet connects every layer to every other layer (maximum feature reuse but high memory cost)',
          'EfficientNet scales efficiently but the compound scaling coefficients are found by expensive grid search; once found, the architecture transfers well across different compute budgets',
        ],
        realWorld: [
          'ResNet-50 as the standard backbone for object detection (Faster R-CNN, YOLO) and segmentation (U-Net, Mask R-CNN)',
          'EfficientNet in mobile and edge deployment where computational budget is limited',
          'ImageNet pretrained features used as a starting point for nearly all computer vision applications',
        ],
      },
      {
        id: 'transfer-learning',
        name: 'Transfer Learning & Fine-tuning',
        description:
          'Transfer learning leverages features learned on a large source dataset (e.g., ImageNet) and adapts them to a different target task, dramatically reducing the data and compute needed to achieve good performance.',
        keyPoints: [
          'Feature extraction freezes the pretrained convolutional layers and trains only a new classification head on the target data, treating the CNN as a fixed feature extractor',
          'Fine-tuning unfreezes some or all pretrained layers and trains them with a very small learning rate on the target data, allowing the network to adapt its learned features to the new domain',
          'Progressive unfreezing starts by training only the new head, then gradually unfreezes deeper layers, preventing catastrophic forgetting of pretrained knowledge by maintaining stable early-layer features',
          'Domain similarity determines the strategy: similar domains (medical X-rays to CT scans) benefit from fine-tuning later layers; very different domains may only benefit from early-layer features or require training from scratch',
          'Data augmentation (random crops, flips, color jitter, mixup, cutout) artificially increases training set diversity and is essential when fine-tuning with limited target data to prevent overfitting',
        ],
        tradeoffs: [
          'Transfer learning can achieve excellent results with very few labeled examples (few-shot learning), but the pretrained model may carry biases from its source data that transfer to the new task',
          'Fine-tuning requires careful learning rate selection: too high destroys pretrained features (catastrophic forgetting), too low prevents adaptation. Discriminative learning rates (lower for earlier layers) help',
          'Models pretrained on ImageNet learn general visual features (edges, textures, shapes) that transfer broadly, but highly specialized domains (satellite imagery, microscopy) may benefit less from ImageNet features',
        ],
        realWorld: [
          'Medical imaging where labeled data is scarce and expensive to obtain but ImageNet pretraining provides useful visual features',
          'Custom product recognition for e-commerce using fine-tuned classification models',
          'Agricultural drone imagery analysis for crop disease detection using pretrained computer vision models',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'RNNs & Sequence Models',
    part: 3,
    partTitle: 'Deep Learning',
    summary:
      'Recurrent neural networks process sequential data by maintaining a hidden state that captures information from previous time steps. LSTMs and GRUs solve the vanishing gradient problem, and attention mechanisms enable selective focus on relevant parts of the input.',
    concepts: [
      {
        id: 'rnn',
        name: 'Recurrent Neural Networks',
        description:
          'An RNN processes sequences one element at a time, updating a hidden state vector that serves as the network memory. The same weights are applied at each time step, enabling the network to handle sequences of any length.',
        keyPoints: [
          'The hidden state update is h_t = tanh(W_hh * h_{t-1} + W_xh * x_t + b), where the same weight matrices W are shared across all time steps (weight tying)',
          'RNNs can process variable-length sequences and output at every step (many-to-many), at the final step (many-to-one), or from a single input to a sequence (one-to-many)',
          'The vanishing gradient problem causes RNNs to struggle with long-range dependencies: gradients shrink exponentially as they propagate through many time steps during backpropagation through time',
          'Bidirectional RNNs process the sequence in both forward and backward directions, concatenating the hidden states, allowing each output to depend on both past and future context',
          'Teacher forcing feeds the ground truth output at each step during training instead of the model prediction, accelerating convergence but creating a train-test discrepancy (exposure bias)',
        ],
        tradeoffs: [
          'RNNs naturally handle variable-length sequences but process them sequentially, preventing parallelization and making training slow compared to transformers',
          'The shared weights across time steps enable generalization across positions but make it hard to learn position-specific patterns without positional encoding',
          'Bidirectional RNNs improve accuracy by using full context but cannot be used for autoregressive generation (predicting the next token requires not knowing future tokens)',
        ],
        realWorld: [
          'Speech recognition systems processing audio spectrograms frame by frame',
          'Time series forecasting for stock prices, weather, and sensor data',
          'Music generation by predicting the next note in a sequence',
        ],
      },
      {
        id: 'lstm-gru',
        name: 'LSTMs & GRUs',
        description:
          'Long Short-Term Memory (LSTM) and Gated Recurrent Unit (GRU) networks use gating mechanisms to control information flow, solving the vanishing gradient problem and enabling learning of long-range dependencies.',
        keyPoints: [
          'LSTM introduces a cell state (memory) and three gates: forget gate (what to discard), input gate (what new information to store), and output gate (what to expose as the hidden state)',
          'The cell state acts as a highway for gradient flow, with only element-wise multiplication and addition operations; this linear pathway prevents gradients from vanishing over many time steps',
          'GRU simplifies LSTM by combining the forget and input gates into a single update gate and merging the cell state and hidden state, reducing parameters by ~25% with comparable performance',
          'Peephole connections (optional LSTM variant) allow gates to access the cell state directly, giving the gates more information to make gating decisions',
          'Stacking multiple LSTM/GRU layers creates a deep recurrent network where each layer processes the sequence of hidden states from the layer below, extracting increasingly abstract temporal features',
        ],
        tradeoffs: [
          'LSTMs are more expressive than GRUs with separate cell state and hidden state, but GRUs train faster and may perform equally well on shorter sequences with sufficient data',
          'Both LSTMs and GRUs are effective for sequences up to hundreds of steps, but transformers with attention have largely replaced them for tasks with very long sequences due to better parallelism and performance',
          'Gated architectures require ~4x (LSTM) or ~3x (GRU) more parameters per hidden unit compared to vanilla RNNs, trading model size for the ability to learn long-range dependencies',
        ],
        realWorld: [
          'Machine translation before the transformer era (Google Neural Machine Translation used stacked LSTMs)',
          'Named entity recognition and part-of-speech tagging in NLP pipelines',
          'Anomaly detection in sensor time series data using LSTM autoencoders',
        ],
      },
      {
        id: 'seq2seq-attention',
        name: 'Sequence-to-Sequence & Attention',
        description:
          'Sequence-to-sequence (seq2seq) models use an encoder to compress the input into a fixed-length vector and a decoder to generate the output sequence. Attention allows the decoder to dynamically focus on relevant parts of the input at each step.',
        keyPoints: [
          'The encoder processes the input sequence and compresses it into a context vector (typically the final hidden state); the decoder generates the output sequence one token at a time, conditioned on this context',
          'The information bottleneck problem occurs because the fixed-length context vector must capture the entire input sequence; longer sequences lose information, degrading performance',
          'Bahdanau attention (additive) computes attention weights a_t = softmax(score(h_decoder, h_encoder_j)) for each encoder hidden state, creating a weighted context vector that changes at each decoder step',
          'Luong attention (multiplicative) computes scores as dot products between decoder and encoder states, which is simpler and faster than additive attention and works equally well',
          'Attention weights are interpretable: they reveal which input tokens the model focuses on when generating each output token, providing a form of built-in explainability',
        ],
        tradeoffs: [
          'Attention solves the bottleneck problem and improves performance on long sequences, but adds O(n*m) computation where n and m are the source and target lengths',
          'Attention weights provide interpretable alignment but can be diffuse or misleading; they correlate with but do not directly cause the model behavior',
          'Seq2seq with attention was the dominant paradigm for machine translation from 2015-2017 but has been superseded by the Transformer architecture which uses attention throughout (no recurrence)',
        ],
        realWorld: [
          'Machine translation systems translating between natural languages',
          'Text summarization generating concise summaries from long documents',
          'Chatbots and dialogue systems generating contextually appropriate responses',
        ],
      },
    ],
  },

  // ============================================================
  // PART 4: Advanced Topics (Topics 11-13)
  // ============================================================
  {
    id: 11,
    title: 'Transformers & Attention',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Transformers replace recurrence with self-attention, enabling parallel processing of entire sequences. The architecture powers modern NLP (BERT, GPT) and increasingly vision and multimodal tasks, representing the foundation of modern AI.',
    concepts: [
      {
        id: 'self-attention',
        name: 'Self-Attention Mechanism',
        description:
          'Self-attention computes relationships between all pairs of positions in a sequence, producing a weighted representation of each position based on its relevance to every other position.',
        keyPoints: [
          'Each input token is transformed into three vectors: Query (Q), Key (K), and Value (V) via learned linear projections; attention scores are computed as Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) * V',
          'The scaling factor 1/sqrt(d_k) prevents dot products from growing large with dimensionality, which would push softmax into saturation regions with near-zero gradients',
          'Multi-head attention runs H parallel attention operations with different learned projections, allowing the model to attend to information from different representation subspaces simultaneously',
          'Self-attention is permutation equivariant (order-agnostic), so positional encodings (sinusoidal or learned) must be added to inject sequence order information',
          'The computational complexity of self-attention is O(n^2 * d) where n is sequence length and d is dimension, making it expensive for very long sequences (documents, genomics)',
        ],
        tradeoffs: [
          'Self-attention captures long-range dependencies in constant depth (any two positions interact directly), unlike RNNs where information must pass through O(n) steps',
          'The quadratic complexity in sequence length limits standard transformers to ~512-4096 tokens; efficient variants (Linformer, Performer, Flash Attention) reduce this to O(n) or O(n*sqrt(n))',
          'Multi-head attention increases the model expressiveness but adds parameters proportionally; the optimal number of heads depends on the model size and task',
        ],
        realWorld: [
          'Every large language model (GPT-4, Claude, Gemini) relies on self-attention as the core mechanism',
          'Vision Transformers (ViT) applying self-attention to image patches for classification',
          'Protein structure prediction (AlphaFold) using attention to model residue-residue interactions',
        ],
      },
      {
        id: 'transformer-architecture',
        name: 'Transformer Architecture',
        description:
          'The Transformer architecture consists of stacked encoder and/or decoder blocks, each containing multi-head self-attention, feed-forward networks, layer normalization, and residual connections.',
        keyPoints: [
          'Each encoder block: multi-head self-attention -> add & layer norm -> position-wise feed-forward network (two linear layers with ReLU/GELU) -> add & layer norm',
          'Each decoder block adds a masked self-attention layer (preventing attention to future positions for autoregressive generation) and cross-attention over encoder outputs',
          'Encoder-only (BERT): bidirectional context, best for understanding tasks (classification, NER). Decoder-only (GPT): autoregressive, best for generation. Encoder-decoder (T5): best for seq2seq tasks (translation)',
          'Layer normalization normalizes across features for each sample (unlike batch norm which normalizes across the batch), making it independent of batch size and suitable for variable-length sequences',
          'Residual connections (x + sublayer(x)) around each sub-layer enable gradient flow through deep transformer stacks (6-96+ layers) and allow each layer to learn refinements rather than full transformations',
        ],
        tradeoffs: [
          'Transformers process all positions in parallel (unlike sequential RNNs), enabling much faster training on GPUs, but self-attention is O(n^2) vs O(n) for RNNs',
          'Pre-norm (layer norm before attention) vs post-norm (layer norm after attention): pre-norm is easier to train for deep models but may have slightly lower quality; post-norm is standard but harder to train at depth',
          'The feed-forward dimension is typically 4x the model dimension, meaning most parameters and computation are in the feed-forward layers rather than the attention layers',
        ],
        realWorld: [
          'Large-scale language model pretraining (GPT-4 with ~1.8T parameters across 120 decoder layers)',
          'Machine translation achieving human-level quality on high-resource language pairs',
          'Code generation and understanding (Codex, GitHub Copilot) trained on code corpora',
        ],
      },
      {
        id: 'bert-gpt-llm',
        name: 'BERT, GPT & Large Language Models',
        description:
          'BERT (Bidirectional Encoder Representations from Transformers) and GPT (Generative Pre-trained Transformer) are foundational language models that learn general-purpose language representations through pretraining on massive text corpora.',
        keyPoints: [
          'BERT is pretrained with masked language modeling (predict 15% of masked tokens using bidirectional context) and next sentence prediction, then fine-tuned on downstream tasks',
          'GPT is pretrained with causal language modeling (predict the next token given all previous tokens) using a decoder-only architecture, enabling zero-shot and few-shot learning through prompting',
          'Scaling laws show that model performance improves predictably with more parameters, data, and compute following power laws, motivating the trend toward ever-larger models',
          'Instruction tuning (FLAN, InstructGPT) and RLHF (Reinforcement Learning from Human Feedback) align pretrained models with human preferences, producing helpful, harmless, and honest outputs',
          'Emergent abilities appear in sufficiently large models (>~100B parameters): chain-of-thought reasoning, in-context learning, and zero-shot task generalization that smaller models cannot perform',
        ],
        tradeoffs: [
          'BERT excels at understanding tasks (classification, QA, NER) but cannot generate text autoregressively; GPT excels at generation but uses only leftward context, missing bidirectional understanding',
          'Larger models are more capable but require proportionally more compute for training and inference, creating accessibility and environmental concerns (training GPT-4 cost ~$100M)',
          'Pretraining captures broad knowledge but the model may hallucinate (generate plausible but incorrect information), requiring retrieval augmentation (RAG) or verification for factual applications',
        ],
        realWorld: [
          'Search engines using BERT to understand query intent and passage relevance',
          'AI assistants (ChatGPT, Claude) using GPT-style models for conversational interactions',
          'Code completion tools using pretrained language models specialized on programming languages',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Generative Models',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Generative models learn the underlying data distribution and can generate new samples. GANs use adversarial training, VAEs use variational inference, and diffusion models iteratively denoise random noise into realistic outputs.',
    concepts: [
      {
        id: 'gans',
        name: 'GANs (Generative Adversarial Networks)',
        description:
          'A GAN trains two networks adversarially: a generator that creates fake samples from random noise, and a discriminator that distinguishes real from fake. The generator improves by trying to fool the discriminator.',
        keyPoints: [
          'The minimax objective: min_G max_D E[log(D(x))] + E[log(1 - D(G(z)))], where D tries to maximize its ability to distinguish real from fake, and G tries to minimize it',
          'Training alternates between updating the discriminator (with real and fake samples) and updating the generator (with fake samples and the discriminator gradient), requiring careful balancing',
          'Mode collapse occurs when the generator produces only a small subset of the possible outputs, ignoring diversity; techniques like minibatch discrimination, spectral normalization, and progressive growing mitigate this',
          'Conditional GANs (cGAN) condition both networks on additional information (class labels, text, images), enabling controlled generation like text-to-image or image-to-image translation (pix2pix)',
          'Wasserstein GAN (WGAN) replaces the JS divergence with the Wasserstein distance, providing smoother gradients and more stable training, with weight clipping or gradient penalty for enforcement',
        ],
        tradeoffs: [
          'GANs produce sharp, high-quality images but are notoriously difficult to train (mode collapse, training instability, sensitivity to hyperparameters)',
          'GANs do not provide a tractable likelihood or density estimate, making it hard to evaluate how well the model captures the full data distribution compared to VAEs',
          'GAN training is a two-player game with no clear convergence criterion; the discriminator loss alone does not correlate well with sample quality, complicating model selection',
        ],
        realWorld: [
          'StyleGAN generating photorealistic human faces with control over attributes like age, pose, and expression',
          'Image-to-image translation for style transfer, super-resolution, and domain adaptation',
          'Data augmentation generating synthetic training data for medical imaging and rare events',
        ],
      },
      {
        id: 'vae',
        name: 'Variational Autoencoders',
        description:
          'A VAE learns a probabilistic latent space by encoding inputs into a distribution (mean and variance), sampling from it, and decoding back. The model optimizes a lower bound on the data log-likelihood.',
        keyPoints: [
          'The encoder maps input x to parameters of a latent distribution q(z|x) = N(mu, sigma^2); the decoder maps sampled z back to a reconstruction p(x|z)',
          'The loss function (ELBO) has two terms: reconstruction loss (how well the decoded output matches the input) and KL divergence (how close the latent distribution is to the prior N(0,1))',
          'The reparameterization trick enables backpropagation through the stochastic sampling step: z = mu + sigma * epsilon, where epsilon ~ N(0,1), making the randomness independent of the learnable parameters',
          'The latent space is continuous and structured: interpolating between latent vectors produces smooth transitions between generated outputs, enabling semantic manipulation',
          'Beta-VAE increases the weight of the KL term, encouraging disentangled representations where individual latent dimensions correspond to interpretable factors of variation',
        ],
        tradeoffs: [
          'VAEs provide a principled probabilistic framework with tractable likelihood bounds, but generated samples tend to be blurrier than GAN outputs due to the reconstruction loss (typically MSE)',
          'The KL divergence term can cause posterior collapse in text generation, where the decoder ignores the latent variable and the encoder maps everything to the prior, producing a standard language model',
          'VAEs learn smooth, structured latent spaces useful for interpolation and manipulation, but the trade-off between reconstruction quality and latent space regularity (controlled by beta) is fundamental',
        ],
        realWorld: [
          'Drug discovery generating novel molecular structures by sampling from the latent space',
          'Anomaly detection using reconstruction error as an anomaly score',
          'Collaborative filtering in recommendation systems using VAE-based models for user preference modeling',
        ],
      },
      {
        id: 'diffusion-models',
        name: 'Diffusion Models',
        description:
          'Diffusion models learn to reverse a gradual noising process: the forward process adds Gaussian noise to data over many steps, and the reverse process (learned neural network) iteratively denoises random noise back into realistic samples.',
        keyPoints: [
          'The forward process q(x_t | x_{t-1}) adds small amounts of Gaussian noise over T steps (typically 1000), gradually transforming any data distribution into pure noise N(0, I)',
          'The reverse process p_theta(x_{t-1} | x_t) is parameterized by a neural network (typically U-Net) that predicts the noise added at each step, learning to denoise one step at a time',
          'The training objective simplifies to predicting the noise epsilon added at each step: L = E[||epsilon - epsilon_theta(x_t, t)||^2], a simple mean squared error loss',
          'Classifier-free guidance combines conditional and unconditional model predictions to improve sample quality: epsilon_guided = epsilon_uncond + s * (epsilon_cond - epsilon_uncond), where s > 1 amplifies the conditioning signal',
          'DDPM (Denoising Diffusion Probabilistic Models) requires many steps for sampling (slow); DDIM (Denoising Diffusion Implicit Models) enables deterministic, faster sampling with fewer steps',
        ],
        tradeoffs: [
          'Diffusion models produce state-of-the-art image quality surpassing GANs with more stable training (simple MSE loss, no adversarial dynamics), but sampling requires many forward passes through the network (slow)',
          'The iterative denoising process is flexible (can trade quality for speed by varying step count) but inference is inherently sequential, unlike GANs which generate in a single forward pass',
          'Latent diffusion (Stable Diffusion) performs the diffusion process in a compressed latent space rather than pixel space, dramatically reducing computational cost while maintaining quality',
        ],
        realWorld: [
          'Text-to-image generation (DALL-E 2, Stable Diffusion, Midjourney) creating images from natural language descriptions',
          'Video generation and editing with temporal consistency across frames',
          'Audio synthesis and music generation (AudioLDM, MusicGen) using diffusion in spectrogram space',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Reinforcement Learning',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Reinforcement learning trains agents to make sequential decisions by maximizing cumulative reward through interaction with an environment. From tabular Q-learning to deep RL and policy gradients, these methods underpin game-playing AI and robotics.',
    concepts: [
      {
        id: 'mdp-policy-value',
        name: 'MDPs & Policy/Value Functions',
        description:
          'A Markov Decision Process (MDP) formalizes sequential decision-making with states, actions, transition probabilities, and rewards. The agent learns a policy (action selection strategy) and value function (expected future reward) to maximize cumulative reward.',
        keyPoints: [
          'An MDP is defined by (S, A, P, R, gamma): states S, actions A, transition function P(s\'|s,a), reward function R(s,a), and discount factor gamma (0 < gamma <= 1) that weights future rewards',
          'The policy pi(a|s) maps states to action probabilities; a deterministic policy outputs a single action, a stochastic policy outputs a distribution over actions',
          'The state-value function V^pi(s) = E[sum(gamma^t * r_t) | s_0 = s, pi] gives the expected cumulative discounted reward starting from state s and following policy pi',
          'The action-value function Q^pi(s,a) = E[sum(gamma^t * r_t) | s_0 = s, a_0 = a, pi] gives the expected return of taking action a in state s and then following pi',
          'The Bellman equation decomposes value functions recursively: V(s) = max_a [R(s,a) + gamma * sum(P(s\'|s,a) * V(s\'))], enabling dynamic programming solutions when the MDP is known',
        ],
        tradeoffs: [
          'Model-based RL learns the transition model P(s\'|s,a) and plans using it (sample-efficient but model errors compound); model-free RL learns directly from experience (more robust but data-hungry)',
          'High discount factor gamma prioritizes long-term reward but makes learning harder (credit assignment over many steps); low gamma focuses on immediate reward but may miss long-term strategies',
          'The Markov property assumes the current state contains all relevant information; partially observable environments (POMDPs) require memory (e.g., recurrent policies) to handle hidden state',
        ],
        realWorld: [
          'Game-playing AI (AlphaGo, OpenAI Five) learning optimal strategies through self-play',
          'Robotic control learning locomotion, manipulation, and navigation from trial and error',
          'Recommendation systems optimizing long-term user engagement rather than immediate clicks',
        ],
      },
      {
        id: 'q-learning-dqn',
        name: 'Q-Learning & Deep Q-Networks',
        description:
          'Q-learning is a model-free algorithm that learns the optimal action-value function Q*(s,a) from experience using temporal difference updates. Deep Q-Networks (DQN) use neural networks to approximate Q for large state spaces.',
        keyPoints: [
          'The Q-learning update: Q(s,a) <- Q(s,a) + alpha * [r + gamma * max_a\' Q(s\',a\') - Q(s,a)], where the target is the TD target r + gamma * max Q and the error is the temporal difference',
          'Q-learning is off-policy: it learns about the optimal policy (via max) while following an exploratory policy (e.g., epsilon-greedy), enabling learning from diverse experience',
          'DQN (Mnih et al., 2015) uses a CNN to approximate Q(s,a) from raw pixel input, with two key innovations: experience replay (uniform random sampling from a buffer) and a target network (frozen copy updated periodically)',
          'Experience replay breaks temporal correlations in sequential data and enables multiple learning updates from each experience, dramatically improving sample efficiency and training stability',
          'Double DQN addresses the overestimation bias of standard DQN by decoupling action selection (online network) from action evaluation (target network): Q_target = r + gamma * Q_target(s\', argmax_a\' Q_online(s\', a\'))',
        ],
        tradeoffs: [
          'Q-learning converges to the optimal policy in tabular settings with sufficient exploration, but DQN with function approximation has no such guarantee and can be unstable',
          'Experience replay improves sample efficiency but requires large memory buffers (millions of transitions); prioritized experience replay samples important transitions more often but adds computational overhead',
          'DQN works with discrete action spaces; continuous actions require discretization (exponential in action dimensions) or alternative methods (DDPG, SAC) that learn continuous policies',
        ],
        realWorld: [
          'Atari game playing achieving superhuman performance on dozens of games from raw pixels',
          'Data center cooling optimization (Google DeepMind reducing energy consumption by 40%)',
          'Automated trading strategies learning to execute orders optimally in financial markets',
        ],
      },
      {
        id: 'policy-gradient-actor-critic',
        name: 'Policy Gradient & Actor-Critic',
        description:
          'Policy gradient methods directly optimize the policy parameters by computing the gradient of expected reward. Actor-critic methods combine a policy (actor) with a value function (critic) to reduce variance while maintaining the flexibility of policy gradients.',
        keyPoints: [
          'The REINFORCE algorithm estimates the policy gradient as E[sum(grad log pi(a|s) * G_t)], where G_t is the cumulative reward from step t; this is an unbiased but high-variance estimator',
          'A baseline (typically the value function V(s)) reduces variance without introducing bias: the advantage A(s,a) = Q(s,a) - V(s) measures how much better an action is compared to average',
          'Actor-critic methods use two networks: the actor (policy pi) selects actions and the critic (value function V or Q) evaluates them, combining low bias (policy gradient) with low variance (learned baseline)',
          'Proximal Policy Optimization (PPO) clips the policy ratio to prevent large updates that destabilize training: L = min(ratio * A, clip(ratio, 1-eps, 1+eps) * A), achieving stable learning with simple implementation',
          'A3C (Asynchronous Advantage Actor-Critic) runs multiple agent copies in parallel environments, collecting diverse experience and performing asynchronous gradient updates for faster, more stable training',
        ],
        tradeoffs: [
          'Policy gradient methods handle continuous actions naturally and can learn stochastic policies, but suffer from high variance requiring many samples; actor-critic reduces variance at the cost of potential bias from the critic',
          'PPO is the most widely used RL algorithm due to its simplicity and robustness, but it is on-policy (discards old experience after each update), making it less sample-efficient than off-policy methods like SAC',
          'Exploration in policy gradient methods comes from policy stochasticity; as the policy becomes more deterministic, exploration decreases, potentially getting stuck in local optima without entropy regularization',
        ],
        realWorld: [
          'RLHF for aligning large language models with human preferences (InstructGPT, Claude)',
          'Robotic locomotion and dexterous manipulation learning (OpenAI hand solving Rubik cube)',
          'Autonomous drone racing achieving champion-level performance through sim-to-real transfer',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find(t => t.id === id);
}
