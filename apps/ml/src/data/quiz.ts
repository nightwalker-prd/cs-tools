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
  // Topic 1: Linear Regression & Gradient Descent (chapterId: 1)
  // ============================================================
  {
    id: "t1-q1",
    chapterId: 1,
    question:
      "Why is the closed-form OLS solution w = (X^T X)^(-1) X^T y often impractical for large feature sets?",
    options: [
      "It requires the data to be standardized first",
      "Inverting the X^T X matrix is O(n^3) in the number of features and can be numerically unstable when features are correlated",
      "It can only handle binary classification targets",
      "It does not minimize the mean squared error loss",
    ],
    answer: 1,
    explanation:
      "The closed-form OLS solution requires inverting the (d x d) matrix X^T X, which is O(d^3) in computation and O(d^2) in memory. When d is large (thousands of features), this is prohibitively expensive. Additionally, if features are highly correlated (multicollinearity), X^T X becomes nearly singular, making the inversion numerically unstable. Gradient descent avoids matrix inversion entirely, iteratively updating weights with O(n*d) cost per step.",
  },
  {
    id: "t1-q2",
    chapterId: 1,
    question:
      "What is the key difference between batch gradient descent and stochastic gradient descent (SGD)?",
    options: [
      "Batch gradient descent uses L2 regularization while SGD uses L1",
      "SGD uses the entire dataset for each update while batch uses one sample",
      "Batch gradient descent computes the gradient over the entire dataset per step (stable but slow), while SGD uses a single random sample per step (noisy but fast)",
      "Batch gradient descent can only be used with linear models",
    ],
    answer: 2,
    explanation:
      "Batch gradient descent computes the average gradient across all N training examples before making a single update — giving a precise gradient estimate but requiring a full pass through the data per step. SGD randomly selects one sample per step, computing a noisy but unbiased gradient estimate. This noise actually helps escape local minima and saddle points. Mini-batch SGD (typically 32-256 samples) is the practical compromise used in most deep learning, balancing gradient accuracy with update frequency.",
  },
  {
    id: "t1-q3",
    chapterId: 1,
    question:
      "Why does adding polynomial features (x^2, x^3) to a linear regression model require feature scaling?",
    options: [
      "Polynomial features change the loss function from MSE to cross-entropy",
      "Polynomial features are always negative and need to be shifted",
      "Higher-degree terms (x^2, x^3) can have vastly different magnitudes than the original features, causing gradient descent to oscillate or converge very slowly along poorly-scaled dimensions",
      "Polynomial features cannot be used without PCA preprocessing",
    ],
    answer: 2,
    explanation:
      "If x ranges from 0 to 1000, then x^2 ranges from 0 to 1,000,000 and x^3 from 0 to 1,000,000,000. The gradients for the coefficients of these features differ by orders of magnitude, creating an elongated loss surface. Gradient descent either takes tiny steps (if learning rate is set for the large-magnitude features) or overshoots and diverges (if set for the small-magnitude features). Feature scaling (standardization or min-max normalization) brings all features to comparable ranges, creating a more symmetric loss surface that gradient descent can navigate efficiently.",
  },

  // ============================================================
  // Topic 2: Classification & Logistic Regression (chapterId: 2)
  // ============================================================
  {
    id: "t2-q1",
    chapterId: 2,
    question:
      "Why is the binary cross-entropy loss -[y*log(p) + (1-y)*log(1-p)] preferred over MSE for logistic regression?",
    options: [
      "Cross-entropy is faster to compute than MSE",
      "MSE with the sigmoid output creates a non-convex loss surface with many local minima, while cross-entropy is convex and produces larger gradients when the model is confidently wrong",
      "Cross-entropy automatically regularizes the weights",
      "MSE cannot handle probabilities between 0 and 1",
    ],
    answer: 1,
    explanation:
      "The sigmoid function saturates (gradient near zero) for large positive or negative inputs. When combined with MSE, this creates near-zero gradients even when the prediction is confidently wrong, stalling learning. Cross-entropy avoids this: -log(p) produces very large loss and gradient when the model predicts p near 0 for a true positive (y=1), penalizing confident wrong predictions heavily. Additionally, cross-entropy with sigmoid is convex in the model parameters, guaranteeing a single global minimum.",
  },
  {
    id: "t2-q2",
    chapterId: 2,
    question:
      "What does the temperature parameter T in softmax(z/T) control?",
    options: [
      "The number of output classes",
      "The learning rate during training",
      "The sharpness of the probability distribution — lower T makes predictions more confident (peaked), higher T makes them more uniform (smooth)",
      "The regularization strength applied to the weights",
    ],
    answer: 2,
    explanation:
      "Dividing the logits by temperature T before softmax controls the entropy of the output distribution. With T=1 (standard), softmax behaves normally. As T approaches 0, the distribution becomes a one-hot vector (all probability mass on the largest logit). As T increases, the distribution approaches uniform. This is used in knowledge distillation (T=2-20 to produce soft labels that reveal inter-class similarities), in exploration for reinforcement learning, and in controlling text generation diversity.",
  },
  {
    id: "t2-q3",
    chapterId: 2,
    question:
      "Why might a classification threshold of 0.5 be suboptimal for imbalanced datasets?",
    options: [
      "The sigmoid function cannot output values near 0.5",
      "A 0.5 threshold always leads to overfitting on imbalanced data",
      "When classes are imbalanced, the model learns to bias predictions toward the majority class, so a lower threshold is often needed to catch minority class instances that the model assigns lower but still meaningful probabilities",
      "The 0.5 threshold only works for linear classifiers",
    ],
    answer: 2,
    explanation:
      "With severe class imbalance (e.g., 99% negative, 1% positive), the model learns that predicting negative is almost always correct. Even for true positive instances, the model may output probabilities like 0.3 or 0.4 — below the 0.5 threshold. Lowering the threshold to 0.2 or 0.3 catches these cases, improving recall on the minority class at the cost of some precision. The optimal threshold should be selected using the precision-recall curve or by optimizing a business-specific cost function on a validation set.",
  },

  // ============================================================
  // Topic 3: Model Evaluation & Validation (chapterId: 3)
  // ============================================================
  {
    id: "t3-q1",
    chapterId: 3,
    question:
      "Why must feature scaling be performed inside the cross-validation loop rather than before splitting?",
    options: [
      "Scaling inside the loop is computationally faster",
      "If scaling uses statistics (mean, std) from the entire dataset before splitting, the validation fold information leaks into the training process through the scaling parameters, giving an optimistically biased performance estimate",
      "Feature scaling only works on training data",
      "Cross-validation automatically handles feature scaling",
    ],
    answer: 1,
    explanation:
      "Data leakage occurs when information from the test/validation set influences the model during training. If you compute the mean and standard deviation for scaling using all data (including validation folds), the training data is implicitly informed about the validation data distribution. This makes the model appear to generalize better than it actually does. The correct approach is to fit the scaler on the training fold only and apply it to the validation fold — this is what sklearn's Pipeline with cross_val_score does automatically.",
  },
  {
    id: "t3-q2",
    chapterId: 3,
    question:
      "When would you prefer the precision-recall AUC over the ROC AUC?",
    options: [
      "When you have a perfectly balanced dataset",
      "When the model only outputs binary predictions (no probabilities)",
      "When classes are highly imbalanced — PR AUC focuses on the minority class performance, while ROC AUC can be deceptively high when the model correctly classifies the abundant negatives",
      "When you need to evaluate regression models",
    ],
    answer: 2,
    explanation:
      "ROC AUC uses false positive rate (FPR = FP / (FP + TN)) on the x-axis. With many negatives (e.g., 99.9% of samples), even a large number of false positives barely moves the FPR. This makes the ROC curve look excellent even when precision is poor. The precision-recall curve directly measures performance on the positive class — if precision drops with recall, PR AUC reflects this immediately. For fraud detection (0.1% positive), a model with 50% precision and 80% recall might have ROC AUC > 0.99 but PR AUC around 0.55, which more honestly reflects its utility.",
  },
  {
    id: "t3-q3",
    chapterId: 3,
    question:
      "What is the purpose of nested cross-validation and when is it necessary?",
    options: [
      "It trains the model faster by using parallel processing",
      "It uses an inner loop for hyperparameter tuning and an outer loop for performance estimation — preventing the optimistic bias that occurs when the same data is used to both select hyperparameters and estimate performance",
      "It automatically selects the best number of folds K",
      "It is only needed for deep learning models",
    ],
    answer: 1,
    explanation:
      "When you use K-fold cross-validation to both tune hyperparameters (e.g., grid search over C in SVM) and estimate performance, the selected hyperparameters are optimized for the specific folds, leaking information. The reported cross-validated score is optimistically biased because you chose the best-performing configuration. Nested CV fixes this: the inner loop (e.g., 5-fold) tunes hyperparameters, and the outer loop (e.g., 10-fold) evaluates the entire tuning procedure on held-out data that was never used for selection, providing an unbiased performance estimate.",
  },

  // ============================================================
  // Topic 4: Regularization & Feature Engineering (chapterId: 4)
  // ============================================================
  {
    id: "t4-q1",
    chapterId: 4,
    question:
      "Why does L1 regularization (Lasso) produce sparse solutions with some weights exactly zero, while L2 (Ridge) does not?",
    options: [
      "L1 uses a larger penalty coefficient",
      "The L1 penalty creates a diamond-shaped constraint region whose corners lie on the axes, making it likely that the optimal point occurs at a corner where some weights are exactly zero",
      "L2 regularization increases all weights equally",
      "L1 only works with binary features",
    ],
    answer: 1,
    explanation:
      "Geometrically, L1 regularization constrains weights to lie within a diamond (L1 ball) while L2 constrains them within a circle (L2 ball). The loss function contours (ellipses for MSE) are more likely to first touch the diamond at a corner (where one or more weights are zero) than at a non-axis point. The circle has no corners, so the intersection typically occurs at a point where all weights are non-zero but shrunk. Mathematically, the L1 gradient is a constant magnitude regardless of weight size, so small weights receive proportionally larger pushes toward zero.",
  },
  {
    id: "t4-q2",
    chapterId: 4,
    question:
      "When should you use robust scaling (median/IQR) instead of standard scaling (mean/std)?",
    options: [
      "When all features follow a Gaussian distribution",
      "When you want to scale features to the [0, 1] range",
      "When the data contains significant outliers — the median and IQR are resistant to extreme values, unlike the mean and standard deviation which are pulled by outliers",
      "When features are binary or categorical",
    ],
    answer: 2,
    explanation:
      "The mean and standard deviation are heavily influenced by outliers. A single extreme value can shift the mean substantially and inflate the standard deviation, causing most data points to be squished into a narrow range after standardization. The median is the 50th percentile (unaffected by outlier magnitude) and the IQR (75th - 25th percentile) measures spread without being influenced by extreme tails. Robust scaling preserves the relative differences among the majority of data points while preventing outliers from distorting the transformation.",
  },
  {
    id: "t4-q3",
    chapterId: 4,
    question:
      "What is the key advantage of embedded feature selection methods (e.g., L1 regularization, tree-based importance) over wrapper methods (e.g., recursive feature elimination)?",
    options: [
      "Embedded methods always select more features",
      "Embedded methods perform feature selection during model training, making them computationally efficient compared to wrapper methods that require training a separate model for each feature subset evaluated",
      "Embedded methods do not require labeled data",
      "Embedded methods work with any machine learning algorithm",
    ],
    answer: 1,
    explanation:
      "Wrapper methods evaluate feature subsets by training and evaluating a model for each candidate subset. Forward selection with d features requires O(d^2) model training runs; exhaustive search requires O(2^d). Embedded methods integrate selection into the training process itself: L1 regularization naturally drives irrelevant feature weights to zero during optimization, and tree-based methods compute feature importance as a byproduct of tree construction. This makes embedded methods orders of magnitude faster while still accounting for feature interactions that filter methods (which score features independently) miss.",
  },

  // ============================================================
  // Topic 5: Decision Trees & Ensembles (chapterId: 5)
  // ============================================================
  {
    id: "t5-q1",
    chapterId: 5,
    question:
      "Why are individual decision trees considered high-variance models?",
    options: [
      "Decision trees always have high bias on any dataset",
      "Decision trees cannot handle categorical features",
      "Small changes in the training data can produce completely different tree structures because each split greedily depends on the data distribution at that node, and early split changes cascade through all subsequent splits",
      "Decision trees require feature scaling to work correctly",
    ],
    answer: 2,
    explanation:
      "Decision trees use greedy, top-down splitting where the choice at each node depends on exactly which samples reach it. If the training data changes slightly (e.g., a few samples added or removed), the best split at the root might change, which changes which samples flow to the left vs. right child, which changes their best splits, cascading through the entire tree. This sensitivity to data perturbation is high variance. Random forests reduce this variance by averaging many trees trained on different bootstrap samples, which stabilizes the predictions.",
  },
  {
    id: "t5-q2",
    chapterId: 5,
    question:
      "How does random forest reduce the variance of individual decision trees without increasing bias?",
    options: [
      "By pruning each tree more aggressively",
      "By training each tree on the full dataset with all features",
      "By training many trees on bootstrap samples (bagging) and using random feature subsets at each split, then averaging predictions — averaging reduces variance while each tree remains unbiased",
      "By using gradient descent to optimize the tree structure",
    ],
    answer: 2,
    explanation:
      "Averaging N independent estimates with variance sigma^2 gives variance sigma^2/N. However, trees trained on the same data are correlated, and averaging correlated estimates does not reduce variance as much. Random forests decorrelate trees in two ways: (1) bagging trains each tree on a different bootstrap sample, and (2) random feature selection at each split prevents the same dominant features from appearing in every tree. Together these make trees more independent, so averaging more effectively reduces variance. Each individual tree remains unbiased (grown deep), so the ensemble bias stays low.",
  },
  {
    id: "t5-q3",
    chapterId: 5,
    question:
      "What fundamental difference makes gradient boosting more prone to overfitting than random forests?",
    options: [
      "Gradient boosting uses deeper trees",
      "Gradient boosting trains each tree on the full dataset",
      "Each boosting tree specifically targets the remaining errors (residuals) of the ensemble, which may include noise in the training data — unlike random forests where trees are independent and errors average out",
      "Gradient boosting cannot use regularization",
    ],
    answer: 2,
    explanation:
      "In gradient boosting, each new tree is fitted to the pseudo-residuals (negative gradient) of the current ensemble's loss. As the ensemble improves, the residuals become smaller and increasingly dominated by noise rather than signal. Later trees may learn to fit this noise, overfitting the training data. Random forests, by contrast, train each tree independently on a bootstrap sample — individual tree errors are random and tend to cancel when averaged. This is why gradient boosting requires careful regularization (learning rate, max depth, early stopping) while random forests are robust with default settings.",
  },

  // ============================================================
  // Topic 6: Support Vector Machines (chapterId: 6)
  // ============================================================
  {
    id: "t6-q1",
    chapterId: 6,
    question:
      "What does the regularization parameter C control in a soft-margin SVM?",
    options: [
      "The dimensionality of the feature space",
      "The number of support vectors selected",
      "The tradeoff between maximizing the margin and minimizing classification errors — high C penalizes misclassifications more (narrower margin, fewer errors), low C allows more violations (wider margin, more errors)",
      "The kernel function used for non-linear classification",
    ],
    answer: 2,
    explanation:
      "In the soft-margin SVM objective, C multiplies the sum of slack variables (xi_i) that measure how much each point violates the margin. High C makes violations expensive, forcing the SVM to classify more training points correctly but with a narrower margin (lower bias, higher variance). Low C tolerates more margin violations, producing a wider margin that may misclassify some training points but generalizes better (higher bias, lower variance). This is analogous to the regularization strength lambda in ridge regression, with C = 1/lambda.",
  },
  {
    id: "t6-q2",
    chapterId: 6,
    question:
      "How does the kernel trick avoid explicitly computing the high-dimensional feature mapping?",
    options: [
      "It approximates the mapping using random projections",
      "It uses a polynomial expansion that compresses features",
      "The SVM optimization and prediction only depend on dot products between data points — the kernel function K(x_i, x_j) computes this dot product in the transformed space without ever materializing the transformed vectors",
      "It reduces the problem to a linear one by removing non-linear features",
    ],
    answer: 2,
    explanation:
      "The SVM dual formulation expresses the optimization problem and prediction function entirely in terms of dot products between data points: sum(alpha_i * y_i * K(x_i, x)) + b. The kernel function K(x_i, x_j) = phi(x_i) . phi(x_j) computes the dot product in the high-dimensional space directly, without explicitly computing phi(x). For the RBF kernel, phi maps to infinite-dimensional space — computing K is O(d) (original dimension), while explicitly computing and dotting infinite-dimensional vectors would be impossible.",
  },
  {
    id: "t6-q3",
    chapterId: 6,
    question:
      "Why is one-class SVM useful for anomaly detection when you only have examples of normal behavior?",
    options: [
      "It can generate synthetic anomalies for training",
      "It uses clustering to find outliers in the normal data",
      "It learns a decision boundary that encloses the normal data in feature space — new points falling outside this boundary are classified as anomalies, without needing labeled anomaly examples",
      "It compares each new point against all training examples using KNN",
    ],
    answer: 2,
    explanation:
      "One-class SVM maps normal data to a high-dimensional space (using a kernel, typically RBF) and finds the hyperplane that separates the data from the origin with maximum margin. This creates a tight boundary around the normal data distribution. The parameter nu controls what fraction of training data can fall outside the boundary (expected outlier fraction). At inference time, any new point that falls on the origin side of the boundary is flagged as an anomaly. This is ideal for scenarios like network intrusion detection where you have abundant normal traffic but no (or very few) examples of attacks.",
  },

  // ============================================================
  // Topic 7: Unsupervised Learning (chapterId: 7)
  // ============================================================
  {
    id: "t7-q1",
    chapterId: 7,
    question:
      "Why is K-means sensitive to the initial placement of centroids, and how does K-means++ address this?",
    options: [
      "K-means always converges to the global optimum regardless of initialization",
      "K-means++ simply runs K-means multiple times with random starts",
      "K-means converges to a local minimum that depends on the starting centroids; K-means++ selects initial centroids that are spread apart by choosing each subsequent centroid with probability proportional to its squared distance from the nearest existing centroid",
      "K-means++ uses a grid search to find optimal K before clustering",
    ],
    answer: 2,
    explanation:
      "K-means alternates between assignment and update steps, converging to a fixed point that depends on initialization. Poor initialization (e.g., all centroids in one region) can produce suboptimal clusters where the algorithm gets stuck in a local minimum of the within-cluster sum of squares. K-means++ addresses this: the first centroid is random, then each subsequent centroid is chosen from the remaining points with probability proportional to D(x)^2 (squared distance to the nearest existing centroid). This spreads centroids across the data, typically producing much better results and faster convergence.",
  },
  {
    id: "t7-q2",
    chapterId: 7,
    question:
      "What does PCA maximize, and why might this not be optimal for classification?",
    options: [
      "PCA maximizes the classification accuracy on the training set",
      "PCA maximizes the number of features retained",
      "PCA maximizes the variance captured in the projected data — but high-variance directions may correspond to noise or irrelevant variation, not the directions that best separate classes",
      "PCA maximizes the distance between cluster centroids",
    ],
    answer: 2,
    explanation:
      "PCA finds the orthogonal directions of maximum variance in the data. However, variance and class discriminability are different objectives. Imagine two classes that differ along a low-variance direction and share high variance in another direction (e.g., noise). PCA would keep the high-variance noise direction and discard the low-variance discriminative one. Linear Discriminant Analysis (LDA) explicitly maximizes the ratio of between-class to within-class variance, directly optimizing for class separation. PCA is best for visualization and compression; LDA is better as a preprocessing step for classification.",
  },
  {
    id: "t7-q3",
    chapterId: 7,
    question:
      "Why should you not interpret distances between clusters in a t-SNE visualization as meaningful?",
    options: [
      "t-SNE always places clusters equidistant from each other",
      "t-SNE uses random initialization so distances are arbitrary",
      "t-SNE prioritizes preserving local neighborhood structure (nearby points stay nearby) but distorts global distances — clusters that appear far apart may be close in the original space, and relative cluster sizes are not preserved",
      "t-SNE only works with two-dimensional data",
    ],
    answer: 2,
    explanation:
      "t-SNE's objective function (KL divergence between high-dimensional and low-dimensional probability distributions) uses a heavy-tailed Student-t distribution in the low-dimensional space. This allows the algorithm to push dissimilar points far apart to create clear cluster separation, but the distances between clusters do not reflect their actual distances in the original space. Similarly, cluster sizes are distorted because t-SNE focuses on preserving local neighborhoods, not global geometry. Two clusters that appear far apart and different in size might be equidistant and similarly sized in the original high-dimensional space.",
  },

  // ============================================================
  // Topic 8: Neural Networks & Backpropagation (chapterId: 8)
  // ============================================================
  {
    id: "t8-q1",
    chapterId: 8,
    question:
      "Why can't a network of stacked linear layers (without non-linear activations) learn XOR?",
    options: [
      "XOR requires more than two input features",
      "Linear layers cannot be stacked more than once",
      "Any composition of linear transformations is itself a linear transformation — multiple linear layers collapse to a single linear mapping which can only represent linearly separable functions, and XOR is not linearly separable",
      "XOR requires recurrent connections that linear layers lack",
    ],
    answer: 2,
    explanation:
      "If layer 1 computes y1 = W1*x + b1 and layer 2 computes y2 = W2*y1 + b2, the composition is y2 = W2*(W1*x + b1) + b2 = (W2*W1)*x + (W2*b1 + b2) = W_combined*x + b_combined. No matter how many linear layers you stack, the result is a single linear transformation. XOR cannot be separated by any hyperplane in 2D input space — it requires a non-linear decision boundary. Adding a non-linear activation (ReLU, sigmoid) between layers breaks the linearity, enabling the network to learn non-linear functions like XOR.",
  },
  {
    id: "t8-q2",
    chapterId: 8,
    question:
      "What causes the vanishing gradient problem in deep networks with sigmoid activations?",
    options: [
      "The sigmoid function outputs values larger than 1",
      "Sigmoid activations cause weights to grow exponentially",
      "The sigmoid derivative is at most 0.25 (at z=0) and approaches 0 for large |z| — when many such derivatives are multiplied during backpropagation through many layers, the gradient shrinks exponentially toward zero",
      "The sigmoid function is not differentiable",
    ],
    answer: 2,
    explanation:
      "The chain rule in backpropagation multiplies the local gradients at each layer: dL/dw1 = dL/dy * dy/dh_n * dh_n/dh_{n-1} * ... * dh_2/dh_1 * dh_1/dw1. For sigmoid, each dh_k/dh_{k-1} includes sigmoid'(z) which has a maximum of 0.25. For 10 layers, the gradient is multiplied by (0.25)^10 = 9.5e-7, making it negligibly small. Early layers receive vanishingly small gradients and barely update. ReLU (derivative = 1 for positive inputs) avoids this multiplication-by-small-numbers problem, which is why it became the default activation for deep networks.",
  },
  {
    id: "t8-q3",
    chapterId: 8,
    question:
      "Why is Kaiming/He initialization specifically designed for ReLU networks rather than using Xavier/Glorot?",
    options: [
      "Kaiming initialization uses larger random values that converge faster",
      "Xavier initialization was designed for linear networks only",
      "ReLU zeros out approximately half of its inputs — Xavier initialization does not account for this, causing the signal variance to halve at each layer; Kaiming doubles the variance (2/fan_in) to compensate",
      "Kaiming initialization only works with GPUs",
    ],
    answer: 2,
    explanation:
      "Xavier initialization sets weight variance to 2/(fan_in + fan_out) to maintain signal variance through layers with symmetric activations (sigmoid, tanh). But ReLU sets all negative activations to zero, effectively halving the variance of the output at each layer. With Xavier initialization, the signal shrinks by a factor of 2 per layer, potentially vanishing in deep networks. Kaiming initialization uses variance 2/fan_in (twice Xavier for the input dimension), exactly compensating for the factor-of-2 reduction from ReLU's zeroing of negative values.",
  },

  // ============================================================
  // Topic 9: CNNs & Computer Vision (chapterId: 9)
  // ============================================================
  {
    id: "t9-q1",
    chapterId: 9,
    question:
      "What is the 'receptive field' in a CNN and why does it grow with network depth?",
    options: [
      "The receptive field is the number of filters in each layer",
      "The receptive field is the total number of parameters in the network",
      "The receptive field is the region of the input image that influences a single neuron's output — it grows with depth because each layer's neurons look at a small window of the previous layer's output, and these windows compose across layers to cover increasingly large input regions",
      "The receptive field is the size of the output feature map",
    ],
    answer: 2,
    explanation:
      "A 3x3 convolution in layer 1 gives each neuron a 3x3 receptive field on the input. A 3x3 convolution in layer 2 looks at a 3x3 region of layer 1's output, and each of those neurons covers 3x3 of the input — so layer 2 neurons have a 5x5 effective receptive field on the input. With each additional 3x3 layer, the receptive field grows by 2 pixels in each direction. Pooling and strided convolutions increase it faster. This hierarchical growth enables early layers to detect edges (small receptive field), middle layers to detect textures and parts, and deep layers to detect entire objects (large receptive field).",
  },
  {
    id: "t9-q2",
    chapterId: 9,
    question:
      "How do skip connections (residual connections) in ResNet solve the degradation problem?",
    options: [
      "Skip connections allow the network to skip poorly performing layers",
      "Skip connections add the input of a block directly to its output (y = F(x) + x) — if the optimal transformation is close to identity, the network only needs to learn the small residual F(x) near zero rather than learning the full transformation from scratch",
      "Skip connections reduce the number of parameters in the network",
      "Skip connections replace batch normalization in deep networks",
    ],
    answer: 1,
    explanation:
      "Before ResNet, adding more layers to a CNN could actually decrease training accuracy (not just test accuracy) — deeper networks performed worse than shallower ones even on training data. This degradation problem occurs because learning an identity mapping through a stack of non-linear layers is surprisingly difficult. Skip connections solve this: if the optimal function is identity, the layers only need to learn F(x) = 0, which is easy (just drive all weights toward zero). This allows the network to be as deep as needed — if extra layers aren't useful, they learn to pass input through unchanged. This also provides a direct gradient highway, mitigating vanishing gradients.",
  },
  {
    id: "t9-q3",
    chapterId: 9,
    question:
      "When fine-tuning a pretrained model, why should you use a much smaller learning rate than when training from scratch?",
    options: [
      "Pretrained models have more parameters that require smaller updates",
      "Smaller learning rates prevent GPU memory issues during fine-tuning",
      "The pretrained weights are already near a good solution — a large learning rate would drastically change them, destroying the learned features (catastrophic forgetting); a small learning rate makes gentle adjustments that adapt features to the new task while preserving useful pretrained knowledge",
      "Fine-tuning always uses fewer training examples, requiring smaller learning rates",
    ],
    answer: 2,
    explanation:
      "Pretrained weights encode valuable visual features (edges, textures, shapes, object parts) learned from millions of images. These features are generally useful and only need slight adaptation for the new task. A large learning rate makes large weight updates that can destroy these carefully learned representations in just a few gradient steps — a phenomenon called catastrophic forgetting. A learning rate 10-100x smaller than the original training rate makes gentle adjustments. Discriminative learning rates (even smaller for early layers, slightly larger for later layers) further help, since early-layer features (edges) are more universal and need less adaptation than later-layer features.",
  },

  // ============================================================
  // Topic 10: RNNs & Sequence Models (chapterId: 10)
  // ============================================================
  {
    id: "t10-q1",
    chapterId: 10,
    question:
      "What is the fundamental limitation of vanilla RNNs that LSTMs were designed to solve?",
    options: [
      "RNNs cannot process variable-length sequences",
      "RNNs require labeled data for every time step",
      "The vanishing gradient problem causes RNNs to struggle with long-range dependencies — gradients shrink exponentially through time steps, making it nearly impossible to learn relationships between events separated by many steps",
      "RNNs cannot be trained with backpropagation",
    ],
    answer: 2,
    explanation:
      "In backpropagation through time, the gradient flowing from time step t back to step t-k includes a product of k weight matrices and activation derivatives. For vanilla RNNs with tanh activation, these products typically shrink exponentially (vanishing gradients), making the gradient at early time steps negligibly small. This means the network cannot learn that an input at step 1 is important for the output at step 100. LSTMs solve this with a cell state that has a direct, additive gradient path (gated by forget and input gates), preventing the exponential shrinkage and enabling learning over hundreds of time steps.",
  },
  {
    id: "t10-q2",
    chapterId: 10,
    question:
      "How does the LSTM forget gate prevent the vanishing gradient problem?",
    options: [
      "The forget gate uses a larger learning rate for older time steps",
      "The forget gate eliminates the recurrent weight matrix entirely",
      "The cell state update is additive (c_t = f_t * c_{t-1} + i_t * c_tilde) rather than multiplicative — the forget gate f_t is a value near 1 for important information, creating a nearly linear path for gradient flow through time",
      "The forget gate randomly drops connections to prevent overfitting",
    ],
    answer: 2,
    explanation:
      "In a vanilla RNN, the hidden state is completely rewritten at each step: h_t = tanh(W_h * h_{t-1} + W_x * x_t). The gradient through this involves multiplying by W_h and tanh' at every step. In an LSTM, the cell state update is c_t = f_t * c_{t-1} + i_t * g_t — an element-wise gate and addition. When the forget gate f_t is close to 1, the gradient flows through the cell state almost unchanged (dc_t/dc_{t-1} = f_t near 1), creating a gradient highway analogous to skip connections in ResNets. This additive structure is the key innovation that enables learning over long sequences.",
  },
  {
    id: "t10-q3",
    chapterId: 10,
    question:
      "What problem does the attention mechanism solve in sequence-to-sequence models?",
    options: [
      "Attention speeds up the encoder by processing tokens in parallel",
      "Attention eliminates the need for a decoder network",
      "Attention solves the information bottleneck — instead of compressing the entire input into a single fixed-length vector, the decoder can directly access any encoder hidden state at each generation step through learned attention weights",
      "Attention replaces the recurrent connections in the encoder",
    ],
    answer: 2,
    explanation:
      "In vanilla seq2seq, the encoder compresses the entire input sequence into a single context vector (the final hidden state). For long inputs, this vector cannot retain all information — performance degrades significantly for sentences longer than ~20 words. Attention allows the decoder to compute a weighted combination of ALL encoder hidden states at each step, with weights proportional to relevance. When translating the word 'cat' in the output, the decoder can attend strongly to the corresponding word in the input, regardless of how long the sentence is. This effectively removes the sequence length limitation.",
  },

  // ============================================================
  // Topic 11: Transformers & Attention (chapterId: 11)
  // ============================================================
  {
    id: "t11-q1",
    chapterId: 11,
    question:
      "Why do transformers need positional encodings when RNNs do not?",
    options: [
      "Positional encodings reduce the number of parameters in the transformer",
      "RNNs are more powerful and do not need position information",
      "Self-attention is permutation equivariant — it computes the same output regardless of input order. Without positional encodings, the transformer cannot distinguish 'dog bites man' from 'man bites dog'. RNNs inherently process tokens sequentially, encoding position through time steps.",
      "Positional encodings are only needed for translation tasks",
    ],
    answer: 2,
    explanation:
      "Self-attention computes Attention(Q,K,V) = softmax(QK^T/sqrt(d)) * V. If you permute the input tokens, Q, K, and V are permuted identically, and the attention output is just a permutation of the original output — the computation is completely order-agnostic. RNNs process tokens one at a time, with each step building on the previous hidden state, so position is implicit in the sequential processing. Transformers add positional encodings (sinusoidal functions or learned embeddings) to the input embeddings so the model can distinguish positions and learn order-dependent patterns like syntax and grammar.",
  },
  {
    id: "t11-q2",
    chapterId: 11,
    question:
      "Why is the self-attention scaling factor 1/sqrt(d_k) important?",
    options: [
      "It normalizes the output to have unit variance",
      "It reduces the number of computations from O(n^2) to O(n)",
      "Without scaling, the dot products QK^T grow in magnitude with the dimensionality d_k, pushing softmax into extreme regions where gradients are near zero — scaling by 1/sqrt(d_k) keeps the dot products at a reasonable magnitude for stable softmax gradients",
      "It controls the number of attention heads used in multi-head attention",
    ],
    answer: 2,
    explanation:
      "If Q and K entries are independent with zero mean and unit variance, the dot product q.k = sum(q_i * k_i) has variance d_k (sum of d_k terms, each with variance 1). For large d_k (e.g., 64 or 128), dot products can be very large in magnitude. Softmax converts these into probabilities: with large inputs, softmax saturates (one value gets nearly all probability mass), producing near-zero gradients for most positions. Dividing by sqrt(d_k) normalizes the variance of the dot products back to 1, keeping softmax in its well-behaved regime with informative gradients.",
  },
  {
    id: "t11-q3",
    chapterId: 11,
    question:
      "What is the key architectural difference between BERT (encoder-only) and GPT (decoder-only)?",
    options: [
      "BERT uses attention while GPT uses recurrence",
      "GPT has more parameters than BERT",
      "BERT uses bidirectional self-attention (each token attends to all other tokens) and is pretrained with masked language modeling; GPT uses causal (masked) self-attention (each token attends only to previous tokens) and is pretrained to predict the next token",
      "BERT can only process English text while GPT is multilingual",
    ],
    answer: 2,
    explanation:
      "BERT's bidirectional attention means when processing the word 'bank' in 'I went to the bank to deposit money', it sees both 'went to the' (left context) and 'to deposit money' (right context) simultaneously, enabling rich contextual understanding. GPT's causal masking ensures each position can only attend to itself and earlier positions — when generating the word 'deposit', it only sees 'I went to the bank to'. This left-to-right constraint is necessary for autoregressive generation (you can't look at future words you haven't generated yet) but means GPT misses bidirectional context. BERT is better for understanding; GPT is better for generation.",
  },

  // ============================================================
  // Topic 12: Generative Models (chapterId: 12)
  // ============================================================
  {
    id: "t12-q1",
    chapterId: 12,
    question:
      "What is mode collapse in GANs and why does it occur?",
    options: [
      "Mode collapse happens when the discriminator becomes too strong and rejects all generated samples",
      "Mode collapse is when the GAN runs out of training data",
      "Mode collapse occurs when the generator learns to produce only a small subset of possible outputs that successfully fool the discriminator, ignoring the full diversity of the data distribution — it happens because the generator can minimize its loss by specializing in a few 'safe' outputs",
      "Mode collapse is caused by using too many training epochs",
    ],
    answer: 2,
    explanation:
      "The generator's objective is to fool the discriminator — not to reproduce the full data distribution. If the generator finds a few outputs that consistently fool the discriminator, it can achieve low loss by producing only these outputs, ignoring the vast majority of the data distribution. For example, a face generator might produce only young white female faces if those consistently fool the discriminator. The discriminator then adapts, the generator shifts to another mode, and the cycle continues. Solutions include minibatch discrimination (forcing the generator to produce diverse batches), unrolled GANs, and Wasserstein distance which provides gradients even when distributions don't overlap.",
  },
  {
    id: "t12-q2",
    chapterId: 12,
    question:
      "What does the reparameterization trick in VAEs enable, and why is it necessary?",
    options: [
      "It allows the VAE to use convolutional layers instead of fully connected layers",
      "It speeds up training by reducing the number of parameters",
      "It enables backpropagation through the stochastic sampling step by expressing the random sample z as a deterministic function of the encoder outputs (mu, sigma) and an independent noise variable: z = mu + sigma * epsilon, where epsilon ~ N(0,1)",
      "It converts continuous latent variables into discrete ones",
    ],
    answer: 2,
    explanation:
      "VAEs sample z from q(z|x) = N(mu, sigma^2) during the forward pass. The problem is that backpropagation cannot flow through a random sampling operation — the gradient of 'sample from N(mu, sigma)' with respect to mu and sigma is undefined in the standard sense. The reparameterization trick rewrites the sampling as z = mu + sigma * epsilon where epsilon ~ N(0,1) is sampled independently. Now z is a deterministic, differentiable function of mu and sigma (given epsilon), so gradients flow through mu and sigma normally. The randomness is moved to epsilon, which doesn't depend on any learnable parameters.",
  },
  {
    id: "t12-q3",
    chapterId: 12,
    question:
      "Why do diffusion models produce higher-quality images than GANs despite using a simpler training objective?",
    options: [
      "Diffusion models use more parameters than GANs",
      "Diffusion models train faster and require less data than GANs",
      "Diffusion models use a simple MSE denoising loss at each step (stable, well-behaved optimization) and iteratively refine over many steps — unlike GANs which must balance a two-player adversarial game that is inherently unstable and prone to mode collapse",
      "Diffusion models do not need a neural network for generation",
    ],
    answer: 2,
    explanation:
      "GAN training is a minimax game between generator and discriminator, requiring careful balancing: if the discriminator gets too strong, the generator receives vanishing gradients; if too weak, the generator receives poor feedback. This adversarial dynamic is inherently unstable. Diffusion models instead train a single network with a simple denoising objective (MSE between predicted and actual noise), which is as stable as training any supervised regression model. The iterative sampling process (1000 steps) allows the model to make small, correctable refinements at each step, avoiding the need to generate a perfect image in one shot. The tradeoff is sampling speed — diffusion models are 100-1000x slower at inference.",
  },

  // ============================================================
  // Topic 13: Reinforcement Learning (chapterId: 13)
  // ============================================================
  {
    id: "t13-q1",
    chapterId: 13,
    question:
      "What is the exploration-exploitation tradeoff in reinforcement learning?",
    options: [
      "The tradeoff between training speed and model accuracy",
      "The tradeoff between using CPU and GPU resources",
      "The agent must balance exploiting actions known to give high reward (using current knowledge) versus exploring new actions that might lead to even higher reward (gaining new knowledge) — too much exploitation misses better strategies, too much exploration wastes time on poor actions",
      "The tradeoff between model size and inference speed",
    ],
    answer: 2,
    explanation:
      "An RL agent that always chooses the action with the highest estimated value (greedy exploitation) may never discover that an unexplored action is actually better — getting stuck in a local optimum. An agent that always explores randomly learns slowly because it wastes time on clearly poor actions. Epsilon-greedy balances this: exploit the best-known action with probability 1-epsilon, explore randomly with probability epsilon. More sophisticated methods like Upper Confidence Bound (UCB) or Thompson sampling quantify uncertainty about each action's value, exploring more when uncertainty is high and exploiting when confident.",
  },
  {
    id: "t13-q2",
    chapterId: 13,
    question:
      "Why did DQN introduce experience replay and a target network, and what problems do they solve?",
    options: [
      "Experience replay reduces memory usage and the target network speeds up training",
      "Experience replay stores gameplay recordings and the target network generates training labels",
      "Experience replay breaks temporal correlations in sequential data (which violate the i.i.d. assumption of SGD), and the target network stabilizes the TD target by preventing the moving-target problem where both the prediction and target change simultaneously",
      "Experience replay enables multi-player training and the target network handles multiple agents",
    ],
    answer: 2,
    explanation:
      "Two problems make naive deep Q-learning unstable: (1) Consecutive game frames are highly correlated — training on sequential data violates SGD's assumption of independent samples, causing the network to overfit to recent experience. Experience replay stores transitions in a buffer and samples uniformly, breaking correlations and enabling reuse. (2) The TD target r + gamma * max Q(s', a') uses the same network that is being updated — as Q changes, the target changes, creating a moving target that can cause divergence. The target network is a frozen copy updated only every N steps, providing a stable target for learning.",
  },
  {
    id: "t13-q3",
    chapterId: 13,
    question:
      "Why is PPO (Proximal Policy Optimization) the most widely used policy gradient algorithm in practice?",
    options: [
      "PPO achieves the highest possible reward on all tasks",
      "PPO requires no hyperparameter tuning",
      "PPO clips the policy update ratio to prevent destructively large changes — this is simpler and more robust than TRPO's constrained optimization, while still ensuring stable training by keeping the new policy close to the old policy",
      "PPO is the only algorithm that works with continuous action spaces",
    ],
    answer: 2,
    explanation:
      "Policy gradient methods suffer from instability: a single bad update can catastrophically change the policy, from which recovery is difficult because the new policy generates very different data. TRPO (Trust Region Policy Optimization) prevents this by constraining the KL divergence between old and new policies, but this requires computing second-order derivatives (expensive). PPO achieves a similar effect with a simple first-order method: it clips the probability ratio pi_new/pi_old to [1-eps, 1+eps], preventing the policy from changing too much in a single update. This clipping is trivial to implement, works well across diverse tasks (Atari, robotics, RLHF), and has become the default choice for RL practitioners.",
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
