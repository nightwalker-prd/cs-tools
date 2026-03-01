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
  // Topic 1: Descriptive Statistics (chapterId: 1)
  // ============================================================
  {
    id: "t1-q1",
    chapterId: 1,
    question:
      "A dataset of household incomes has a mean of $85,000 and a median of $55,000. What does this discrepancy indicate about the distribution?",
    options: [
      "The data is normally distributed",
      "The data is left-skewed with a long tail of low incomes",
      "The data is right-skewed — a small number of very high incomes pull the mean above the median",
      "The data has no outliers",
    ],
    answer: 2,
    explanation:
      "When the mean is substantially higher than the median, it indicates right (positive) skew. A few extremely high incomes (millionaires, billionaires) pull the mean upward while having minimal effect on the median. The median better represents the 'typical' household income because it is the middle value when sorted, unaffected by extreme values at the tail. This is why government agencies typically report median household income rather than mean.",
  },
  {
    id: "t1-q2",
    chapterId: 1,
    question:
      "Why is the interquartile range (IQR) preferred over standard deviation for skewed data?",
    options: [
      "IQR is always larger than standard deviation",
      "IQR is easier to calculate by hand",
      "IQR only measures the middle 50% of data and is not affected by extreme values in the tails, unlike standard deviation which incorporates every data point including outliers",
      "IQR works better with categorical data",
    ],
    answer: 2,
    explanation:
      "Standard deviation uses every data point in its calculation (squared deviations from the mean), so extreme outliers disproportionately inflate it. The IQR only considers the 25th and 75th percentiles, ignoring the most extreme values entirely. For skewed distributions — like income, housing prices, or website session durations — the IQR provides a more stable and representative measure of spread. This is also why box plots (which use IQR) are preferred for visualizing skewed distributions.",
  },
  {
    id: "t1-q3",
    chapterId: 1,
    question:
      "The Central Limit Theorem states that the sampling distribution of the mean approaches normal as sample size increases. Why is this important for data science?",
    options: [
      "It means all data is normally distributed",
      "It proves that larger samples are always more accurate",
      "It allows us to use normal-distribution-based statistical tests (z-tests, confidence intervals) for sample means regardless of the population's distribution, as long as the sample is large enough",
      "It eliminates the need for data cleaning",
    ],
    answer: 2,
    explanation:
      "The Central Limit Theorem (CLT) is foundational because it justifies the use of parametric statistical methods even when the underlying population distribution is unknown or non-normal. As sample sizes grow (typically n >= 30), the distribution of sample means becomes approximately normal. This enables confidence intervals, hypothesis tests, and regression inference that rely on normality assumptions — applied to the sampling distribution of the statistic, not the raw data itself. Without the CLT, most inferential statistics would require knowing the exact population distribution.",
  },

  // ============================================================
  // Topic 2: Probability Theory (chapterId: 2)
  // ============================================================
  {
    id: "t2-q1",
    chapterId: 2,
    question:
      "A medical test is 99% accurate (both sensitivity and specificity). The disease affects 1 in 1,000 people. If a person tests positive, what is approximately the probability they actually have the disease?",
    options: [
      "99%",
      "About 9% — because the low base rate means most positive results are false positives",
      "50%",
      "1%",
    ],
    answer: 1,
    explanation:
      "Using Bayes' theorem: P(disease|positive) = P(positive|disease) * P(disease) / P(positive). In a population of 100,000: 100 have the disease (99 test positive), and 99,900 are healthy (999 test positive due to 1% false positive rate). So P(disease|positive) = 99 / (99 + 999) = 99/1098 ≈ 9%. Despite the test being 99% accurate, the vast majority of positive results are false positives because the disease is rare. This is the base rate fallacy — ignoring the prior probability leads to dramatically wrong intuitions about test results.",
  },
  {
    id: "t2-q2",
    chapterId: 2,
    question:
      "When would you use a Poisson distribution instead of a Normal distribution to model data?",
    options: [
      "When data is continuous and symmetric",
      "When modeling the count of rare, independent events occurring in a fixed interval — such as server errors per hour or customer arrivals per minute",
      "When data has exactly two possible outcomes",
      "When the sample size is very large",
    ],
    answer: 1,
    explanation:
      "The Poisson distribution is specifically designed for count data — the number of discrete events occurring in a fixed interval of time or space. Its key assumptions are: events occur independently, the average rate is constant, and two events cannot occur at exactly the same instant. Examples include website visits per minute, typos per page, or defects per unit. The Normal distribution, by contrast, is for continuous data and can take negative values, making it inappropriate for non-negative counts, especially when the rate is low.",
  },
  {
    id: "t2-q3",
    chapterId: 2,
    question:
      "Why does the Law of Large Numbers guarantee that casinos are profitable in the long run?",
    options: [
      "Because casinos cheat",
      "Because each game has a positive expected value for the casino (house edge), and LLN ensures the actual average outcome converges to this expected value as the number of games increases",
      "Because gamblers always make irrational bets",
      "Because the Law of Large Numbers predicts individual outcomes",
    ],
    answer: 1,
    explanation:
      "Each casino game is designed with a positive expected value for the house — for example, European roulette has a house edge of 2.7%. While any individual spin is random, the Law of Large Numbers guarantees that the casino's average profit per game converges to 2.7% as thousands and millions of games are played. Individual players can win in the short run (high variance), but the casino's aggregate result becomes increasingly predictable and profitable with more games. This is the mathematical foundation of the insurance and gambling industries.",
  },

  // ============================================================
  // Topic 3: Inferential Statistics (chapterId: 3)
  // ============================================================
  {
    id: "t3-q1",
    chapterId: 3,
    question:
      "A study finds a statistically significant result with p = 0.03. Which interpretation is correct?",
    options: [
      "There is a 3% probability that the null hypothesis is true",
      "There is a 97% probability that the alternative hypothesis is true",
      "If the null hypothesis were true, there is a 3% probability of observing data as extreme as or more extreme than what was actually observed",
      "The effect size is 3%",
    ],
    answer: 2,
    explanation:
      "The p-value is the probability of observing the data (or more extreme data) assuming the null hypothesis is true. It is NOT the probability that H0 is true or false — that would require Bayesian analysis with a prior. P = 0.03 means: 'If there were truly no effect, we would see results this extreme only 3% of the time by chance alone.' This is evidence against H0, but the strength of evidence also depends on the study design, effect size, and prior plausibility of the hypothesis.",
  },
  {
    id: "t3-q2",
    chapterId: 3,
    question:
      "Why does a 95% confidence interval NOT mean 'there is a 95% probability that the true parameter is in this interval'?",
    options: [
      "Because confidence intervals are always wrong",
      "Because the true parameter is either in the interval or not — the 95% refers to the long-run proportion of intervals that would contain the parameter if sampling were repeated many times",
      "Because 95% is an arbitrary choice",
      "Because confidence intervals only work for normally distributed data",
    ],
    answer: 1,
    explanation:
      "Once a confidence interval is computed (e.g., [2.1, 4.7]), the true parameter is a fixed unknown value — it is either inside or outside this specific interval, so the probability is 0 or 1, not 95%. The 95% refers to the procedure: if you repeated the sampling and CI construction process many times, 95% of those intervals would contain the true value. This subtle distinction matters because a specific interval might be one of the 5% that misses the parameter. Bayesian credible intervals do provide the 'probability parameter is in the interval' interpretation.",
  },
  {
    id: "t3-q3",
    chapterId: 3,
    question:
      "A pharmaceutical company runs an underpowered clinical trial (30% power) and finds no significant difference. What is the main problem?",
    options: [
      "The drug definitely does not work",
      "The p-value is too high to draw any conclusion",
      "With only 30% power, there is a 70% chance of missing a real effect (Type II error) — the study cannot distinguish between 'no effect' and 'insufficient evidence to detect an effect'",
      "The significance level was set too high",
    ],
    answer: 2,
    explanation:
      "Statistical power of 30% means the study has only a 30% chance of detecting a true effect if one exists — equivalently, a 70% chance of a Type II error (false negative). A non-significant result from such a study is essentially uninformative: the drug might genuinely have no effect, or it might work but the study was too small to detect it. This is why power analysis before a study is essential — running an underpowered study wastes resources and patients' time while providing unreliable evidence. Standard practice requires at least 80% power.",
  },

  // ============================================================
  // Topic 4: Correlation & Regression Analysis (chapterId: 4)
  // ============================================================
  {
    id: "t4-q1",
    chapterId: 4,
    question:
      "A study finds a strong correlation (r = 0.85) between ice cream sales and drowning deaths. What is the most likely explanation?",
    options: [
      "Ice cream consumption causes drowning",
      "Drowning causes people to buy ice cream",
      "A confounding variable (summer heat/temperature) increases both ice cream sales and swimming activity, creating a spurious correlation between the two",
      "The correlation is a statistical error",
    ],
    answer: 2,
    explanation:
      "This is a classic example of confounding. Temperature is the lurking variable that drives both ice cream sales (people buy more when it's hot) and drowning deaths (more people swim when it's hot). The two variables are correlated but neither causes the other — they share a common cause. Establishing causation requires controlled experiments, natural experiments, or rigorous causal inference methods that account for confounders. Observational correlations alone can never prove causation, no matter how strong the correlation coefficient.",
  },
  {
    id: "t4-q2",
    chapterId: 4,
    question:
      "In multiple regression, what does 'holding all other variables constant' (ceteris paribus) mean for interpreting a coefficient?",
    options: [
      "All other variables are removed from the model",
      "The coefficient represents the average change in the outcome variable for a one-unit change in that predictor, assuming all other predictors remain at fixed values — isolating the individual effect of that predictor",
      "All other variables are set to zero",
      "The model only uses that one variable for prediction",
    ],
    answer: 1,
    explanation:
      "In multiple regression (y = a + b1*x1 + b2*x2 + ...), each coefficient bi represents the partial effect of xi on y when all other predictors are held constant. For example, if b1 = 2.5 for 'years of education' in a salary model that also includes 'years of experience', it means each additional year of education is associated with a $2,500 salary increase for people with the same experience level. This is the key advantage of multiple regression over simple regression — it controls for confounders included in the model.",
  },
  {
    id: "t4-q3",
    chapterId: 4,
    question:
      "When should you use a non-parametric test like Kruskal-Wallis instead of one-way ANOVA?",
    options: [
      "When you have exactly two groups to compare",
      "When sample sizes are very large",
      "When the data is ordinal, heavily skewed, or does not meet ANOVA's assumptions of normality and equal variances — Kruskal-Wallis compares rank distributions instead of means",
      "When you want to test for interaction effects between two factors",
    ],
    answer: 2,
    explanation:
      "ANOVA assumes that the dependent variable is approximately normally distributed within each group and that groups have similar variances (homoscedasticity). When these assumptions are violated — for example, with ordinal Likert scale data, highly skewed distributions, or small sample sizes where normality is hard to verify — the Kruskal-Wallis test is a robust alternative. It ranks all observations regardless of group, then tests whether rank distributions differ significantly. It has less statistical power than ANOVA when assumptions hold, but provides valid results when they don't.",
  },

  // ============================================================
  // Topic 5: Data Cleaning & Preprocessing (chapterId: 5)
  // ============================================================
  {
    id: "t5-q1",
    chapterId: 5,
    question:
      "Why is mean imputation generally considered a poor strategy for handling missing data?",
    options: [
      "It is computationally expensive",
      "It only works for categorical variables",
      "It preserves sample size but artificially reduces variance, weakens correlations between variables, and can introduce bias if data is not Missing Completely At Random (MCAR)",
      "It always removes too many rows from the dataset",
    ],
    answer: 2,
    explanation:
      "Mean imputation replaces missing values with the column mean, pulling values toward the center and shrinking the observed spread. This underestimates variance and standard errors, making confidence intervals too narrow and p-values too small. It also weakens correlations because imputed values have no relationship with other variables — if income is correlated with education, imputing income with the overall mean ignores this relationship. Multiple imputation is preferred because it creates multiple plausible values that preserve variability and inter-variable relationships.",
  },
  {
    id: "t5-q2",
    chapterId: 5,
    question:
      "What is the advantage of the IQR method over the z-score method for detecting outliers?",
    options: [
      "The IQR method is more computationally efficient",
      "The IQR method detects more outliers in every case",
      "The IQR method does not assume normality and is robust to the very outliers it tries to detect — unlike z-scores, which use the mean and standard deviation that are themselves distorted by outliers",
      "The IQR method works with categorical data",
    ],
    answer: 2,
    explanation:
      "The z-score method uses the mean and standard deviation, both of which are sensitive to outliers. An extreme outlier inflates the standard deviation, making it harder to flag that same outlier (the masking effect) — the outlier 'hides itself' by inflating the threshold. The IQR method uses Q1 and Q3, which are based on data ranks and are virtually unaffected by extreme values. This makes the IQR method distribution-free and self-consistent — it can reliably identify outliers regardless of how extreme they are.",
  },
  {
    id: "t5-q3",
    chapterId: 5,
    question:
      "Why is one-hot encoding problematic for a categorical feature with 50,000 unique values (e.g., ZIP codes)?",
    options: [
      "One-hot encoding does not work with string values",
      "It creates 50,000 binary columns — drastically increasing dimensionality, memory usage, and training time while creating extremely sparse data that can cause overfitting with insufficient training examples per category",
      "One-hot encoding removes the original feature",
      "It changes the data type from categorical to continuous",
    ],
    answer: 1,
    explanation:
      "One-hot encoding creates one binary column per unique category. With 50,000 ZIP codes, this produces 50,000 new columns — most of which are 0 for any given row (extreme sparsity). This consumes large amounts of memory, slows model training, and can cause overfitting because many ZIP codes appear in very few training examples. Alternatives for high-cardinality features include: target encoding (one column with mean target per category), frequency encoding, embedding layers (learned dense representations), or grouping categories into higher-level regions (e.g., ZIP to state).",
  },

  // ============================================================
  // Topic 6: Exploratory Data Analysis (chapterId: 6)
  // ============================================================
  {
    id: "t6-q1",
    chapterId: 6,
    question:
      "Why might a variable with a low Pearson correlation (r = 0.05) with the target still be a useful predictor in a machine learning model?",
    options: [
      "Because all variables with non-zero correlation are useful",
      "Because Pearson correlation only measures linear relationships — the variable might have a strong nonlinear relationship (quadratic, threshold-based) with the target, or it might be highly predictive in combination with other variables through interaction effects",
      "Because low correlation means low noise",
      "Because Pearson correlation is always inaccurate",
    ],
    answer: 1,
    explanation:
      "Pearson correlation captures only the linear component of association. A U-shaped relationship (e.g., both very low and very high ages might have higher medical costs) would show r near 0 despite a strong pattern. Additionally, a variable might be uninformative alone but powerful in combination — for example, 'owns a car' might not correlate with default risk alone, but 'owns a car AND lives in a rural area with no public transit' could be a strong predictor. Tree-based models and neural networks can capture these nonlinear and interaction effects automatically.",
  },
  {
    id: "t6-q2",
    chapterId: 6,
    question:
      "What does Anscombe's quartet demonstrate about relying solely on summary statistics?",
    options: [
      "That summary statistics are always accurate",
      "That larger datasets produce better statistics",
      "That four very different datasets can have identical means, standard deviations, correlations, and regression lines — proving that summary statistics alone can hide critical data patterns that only visualization reveals",
      "That descriptive statistics are unnecessary",
    ],
    answer: 2,
    explanation:
      "Anscombe's quartet consists of four datasets with nearly identical summary statistics: same mean of x and y, same variance, same correlation (r = 0.816), and same linear regression equation. Yet when plotted, they look completely different — one is linear, one is curved, one has an outlier driving the entire relationship, and one has a single influential point. This powerfully demonstrates that visualization is not optional in EDA — summary statistics can be identical for fundamentally different data patterns, and only plots reveal the true structure.",
  },
  {
    id: "t6-q3",
    chapterId: 6,
    question:
      "What is the primary purpose of a data profiling report when first receiving a new dataset?",
    options: [
      "To build a predictive model immediately",
      "To create visualizations for stakeholders",
      "To systematically assess data quality — identifying missing values, data type issues, cardinality, distributions, and anomalies across all columns before any analysis begins",
      "To select the best machine learning algorithm",
    ],
    answer: 2,
    explanation:
      "A data profiling report provides a comprehensive inventory of every column's characteristics: data types (are 'numbers' stored as strings?), missing value rates (is 20% of a key column null?), cardinality (does a 'gender' column have 47 unique values indicating data quality issues?), value distributions (are there impossible negative ages?), and patterns (are dates in consistent formats?). This systematic assessment catches data quality issues early — before they silently corrupt downstream analysis, cause model failures, or lead to incorrect business decisions. Automated tools like pandas-profiling generate these reports in seconds.",
  },

  // ============================================================
  // Topic 7: Feature Engineering (chapterId: 7)
  // ============================================================
  {
    id: "t7-q1",
    chapterId: 7,
    question:
      "Why is feature scaling necessary for K-Nearest Neighbors (KNN) but unnecessary for Random Forest?",
    options: [
      "KNN is a simpler algorithm that requires simpler data",
      "Random Forest uses more features than KNN",
      "KNN uses distance calculations where unscaled features with larger ranges dominate the distance metric — Random Forest uses decision thresholds on individual features that are invariant to monotonic transformations like scaling",
      "Random Forest automatically normalizes features internally",
    ],
    answer: 2,
    explanation:
      "KNN classifies points by finding the nearest neighbors using a distance metric (usually Euclidean). If salary ranges from 30,000 to 200,000 and age ranges from 18 to 80, salary will dominate the distance calculation simply because of its larger scale — not because it's more important. Scaling ensures all features contribute equally. Random Forest, by contrast, splits on individual features using thresholds (e.g., 'age > 35') — the split's quality depends only on ordering, not magnitude. Scaling doesn't change the ordering, so it has no effect on tree-based models.",
  },
  {
    id: "t7-q2",
    chapterId: 7,
    question:
      "What is target leakage in the context of target encoding, and how is it prevented?",
    options: [
      "Target leakage is when the model memorizes the training data",
      "Target leakage occurs when the target variable's values are used to encode features in a way that gives the model access to information it wouldn't have in production — prevented by computing target encoding statistics within cross-validation folds (leave-one-out or k-fold) rather than on the full training set",
      "Target leakage is when features are too correlated with each other",
      "Target leakage is when test data is included in the training set",
    ],
    answer: 1,
    explanation:
      "Target encoding replaces each category with the mean of the target variable for that category. If computed naively on the entire training set, the encoding for a specific row includes that row's own target value — creating circular logic. For rare categories (e.g., a ZIP code appearing 3 times), the encoding essentially reveals the target for those rows, causing dramatic overfitting. Leave-one-out encoding computes the mean excluding the current row; k-fold encoding computes statistics on out-of-fold data only. Additive smoothing blends the category mean with the global mean, reducing variance for rare categories.",
  },
  {
    id: "t7-q3",
    chapterId: 7,
    question:
      "Why does polynomial feature expansion require careful management of the resulting feature space?",
    options: [
      "Polynomial features are always less predictive than original features",
      "Polynomial expansion cannot be applied to categorical features",
      "The number of features grows combinatorially — degree-2 expansion of 20 features creates 230 features (20 original + 20 squared + 190 interactions), vastly increasing overfitting risk and requiring feature selection or regularization",
      "Polynomial features violate linearity assumptions",
    ],
    answer: 2,
    explanation:
      "For d features with degree-p polynomial expansion, the number of new features is C(d+p, p) — this grows extremely fast. With 20 features and degree 2, you get 20 original + 20 squared + C(20,2) = 190 pairwise interactions = 230 total features. Degree 3 would produce over 1,500 features. Most of these are noise — they don't have a meaningful relationship with the target. Without regularization (L1/Lasso to zero out useless features) or feature selection, the model will overfit to these spurious patterns. This is why polynomial expansion is typically combined with strong regularization.",
  },

  // ============================================================
  // Topic 8: Data Visualization Principles (chapterId: 8)
  // ============================================================
  {
    id: "t8-q1",
    chapterId: 8,
    question:
      "Why are pie charts generally considered inferior to bar charts for comparing quantities?",
    options: [
      "Pie charts use more ink than bar charts",
      "Pie charts cannot show negative values",
      "Humans judge angles and areas with approximately 10% error compared to 1-2% error for position along a common scale — making it difficult to compare similarly-sized pie slices accurately",
      "Pie charts are not supported by most visualization tools",
    ],
    answer: 2,
    explanation:
      "Research in graphical perception (Cleveland & McGill) has established a hierarchy of visual encoding accuracy: position along a common scale (bar chart) > length > angle/area (pie chart). When comparing 23% vs 27% as pie slices, most viewers cannot distinguish them — but as bars on a common axis, the difference is obvious. Pie charts are only acceptable when showing parts-of-a-whole with 2-3 categories of very different sizes (e.g., 80% vs 15% vs 5%). For any comparison requiring precision, bar charts or dot plots are superior.",
  },
  {
    id: "t8-q2",
    chapterId: 8,
    question:
      "Why should data visualizations avoid using red and green as the sole means of distinguishing categories?",
    options: [
      "Red and green are visually unappealing together",
      "Red and green are culturally inappropriate in some regions",
      "Approximately 8% of men have red-green color vision deficiency and cannot distinguish these colors — accessible visualizations use redundant encodings like shape, texture, or labels in addition to color",
      "Red and green require more processing power to render",
    ],
    answer: 2,
    explanation:
      "Red-green color blindness (deuteranopia and protanopia) affects about 8% of men and 0.5% of women. For these viewers, red and green appear as the same muddy brown/olive color, making charts that rely solely on this distinction unreadable. Accessible design uses redundant visual encodings: different shapes for scatter plot points, patterns/textures in bar charts, direct labels, or perceptually uniform color palettes like Viridis that remain distinguishable across all common forms of color vision deficiency. WCAG guidelines also specify minimum contrast ratios for text and graphical elements.",
  },
  {
    id: "t8-q3",
    chapterId: 8,
    question:
      "What is Tufte's data-ink ratio principle and why does it matter?",
    options: [
      "It measures the resolution of printed charts",
      "It is the ratio of chart area to text area on a page",
      "It suggests maximizing the proportion of ink that represents actual data versus decorative or redundant elements — removing chartjunk (unnecessary gridlines, borders, 3D effects) focuses attention on the data itself",
      "It determines the optimal number of colors in a visualization",
    ],
    answer: 2,
    explanation:
      "Edward Tufte's data-ink ratio = (ink used to present data) / (total ink used in the graphic). Every non-data element — heavy gridlines, 3D effects, gradient fills, decorative borders, redundant legends — uses ink without conveying information and can distract from or even distort the data. Maximizing this ratio means removing elements that don't help the viewer understand the data: lighter or fewer gridlines, removing chart borders, using direct labels instead of legends, and eliminating 3D effects that make accurate reading impossible. The goal is clarity and efficiency in visual communication.",
  },

  // ============================================================
  // Topic 9: Statistical Visualization (chapterId: 9)
  // ============================================================
  {
    id: "t9-q1",
    chapterId: 9,
    question:
      "What key distributional feature do box plots hide that violin plots reveal?",
    options: [
      "Outliers",
      "The median value",
      "Multimodality — a bimodal distribution (two peaks) looks like a wide box in a box plot, but the two peaks are clearly visible in a violin plot's KDE curves",
      "The interquartile range",
    ],
    answer: 2,
    explanation:
      "Box plots show five summary statistics (min, Q1, median, Q3, max) plus outliers — they are compact and excellent for comparing many groups. However, they completely hide the shape of the distribution between the quartiles. A perfectly bimodal distribution (two distinct peaks, like a mixture of two populations) produces a box plot identical to a wide unimodal distribution. Violin plots overlay mirrored KDE curves on the box plot, revealing multiple modes, skewness, and other distributional features that the summary statistics miss. The tradeoff is that violin plots use more space and require more audience familiarity.",
  },
  {
    id: "t9-q2",
    chapterId: 9,
    question:
      "When visualizing relationships in a scatter plot with 100,000 data points, what technique addresses the overplotting problem?",
    options: [
      "Making the points larger",
      "Using brighter colors",
      "Using transparency (alpha blending), hexbin plots, or 2D density contours — these techniques reveal the density structure where raw points overlap into an indistinguishable mass",
      "Adding a grid overlay",
    ],
    answer: 2,
    explanation:
      "With 100,000 points, a standard scatter plot becomes a solid mass of overlapping dots — you cannot see where data is concentrated versus sparse. Solutions include: (1) Alpha blending (transparency) where overlapping translucent points create darker regions showing density, (2) Hexbin plots that divide the space into hexagonal bins and color by count, revealing density patterns, (3) 2D KDE contour plots that show density as topographic lines. Each has tradeoffs: alpha blending preserves individual points but requires tuning, hexbin aggregates lose individual detail, and contours smooth over fine structure.",
  },
  {
    id: "t9-q3",
    chapterId: 9,
    question:
      "Why can choropleth maps be misleading when showing data like total crime counts by state?",
    options: [
      "Because choropleth maps cannot show numerical data",
      "Because color is hard to perceive accurately",
      "Because geographically large but sparsely populated regions dominate the visual — a large rural state with moderate crime draws more visual attention than a small densely populated state with higher crime, distorting the viewer's perception",
      "Because choropleth maps only work with categorical data",
    ],
    answer: 2,
    explanation:
      "Choropleth maps shade regions by data values, and the viewer's attention is naturally drawn to larger regions. Alaska and Montana are visually dominant despite small populations, while New Jersey and Connecticut are tiny despite high population density. When showing total counts (not rates), large states naturally have higher totals simply due to area, creating a misleading impression. Solutions include: showing rates per capita instead of totals, using cartograms that resize regions by population, or using dot density maps where each dot represents a fixed number. The choice of what to normalize by fundamentally changes the story.",
  },

  // ============================================================
  // Topic 10: Storytelling with Data (chapterId: 10)
  // ============================================================
  {
    id: "t10-q1",
    chapterId: 10,
    question:
      "According to the Minto Pyramid Principle, how should a data science presentation be structured for executive audiences?",
    options: [
      "Start with the methodology, then present results, then conclusions",
      "Start with the conclusion and recommendation first, then provide supporting arguments and evidence — executives want the 'so what' upfront and drill into details only if needed",
      "Start with raw data tables and let the audience draw their own conclusions",
      "Present all possible interpretations equally and let the audience choose",
    ],
    answer: 1,
    explanation:
      "The Minto Pyramid Principle, developed at McKinsey, structures communication top-down: lead with the answer (recommendation/conclusion), then group supporting arguments logically, then provide detailed evidence for each argument. This matches how busy executives process information — they want to know what to do first, then decide whether to examine the reasoning. A bottom-up approach (data -> analysis -> conclusion) forces the audience to hold all the details in mind before understanding why they matter. State the conclusion first, then defend it with data.",
  },
  {
    id: "t10-q2",
    chapterId: 10,
    question:
      "What is the key difference between an operational dashboard and an analytical dashboard?",
    options: [
      "Operational dashboards are more colorful",
      "Analytical dashboards are always interactive",
      "Operational dashboards monitor real-time metrics requiring immediate attention (server health, live sales), while analytical dashboards support strategic decisions with historical data, trends, and comparisons",
      "Operational dashboards use only bar charts",
    ],
    answer: 2,
    explanation:
      "Operational dashboards are designed for monitoring — they show current state metrics (server CPU, queue depth, live error rates) and use alerts, thresholds, and status indicators to draw immediate attention to problems. They are typically viewed continuously on wall screens. Analytical dashboards support exploration and decision-making — they show historical trends, comparisons across dimensions, and enable drill-downs. They are used periodically (weekly, monthly) for planning and strategy. The design principles differ: operational dashboards prioritize glanceability and alerting, while analytical dashboards prioritize exploration and context.",
  },
  {
    id: "t10-q3",
    chapterId: 10,
    question:
      "Why should chart titles state the insight rather than describe the chart type?",
    options: [
      "Because chart types are copyrighted",
      "Because audiences already know what type of chart they're looking at",
      "Because an insight-driven title ('Revenue grew 23% in Q3 driven by mobile') immediately communicates the takeaway and guides the viewer's interpretation, while a descriptive title ('Q3 Revenue by Channel') forces the viewer to derive the insight themselves",
      "Because shorter titles save space on the page",
    ],
    answer: 2,
    explanation:
      "Every chart in a presentation competes for limited audience attention. A descriptive title like 'Monthly Revenue 2023-2024' tells the viewer what the chart shows but not what it means — forcing them to study the chart, find the pattern, and draw their own conclusion (which may differ from yours). An insight-driven title like 'Mobile revenue doubled while desktop declined 15%' immediately communicates the key message, directing the viewer's attention to the relevant pattern. This is especially important in presentations where the audience may spend only seconds on each slide.",
  },

  // ============================================================
  // Topic 11: Data Pipelines & ETL (chapterId: 11)
  // ============================================================
  {
    id: "t11-q1",
    chapterId: 11,
    question:
      "Why has ELT largely replaced traditional ETL in modern cloud data architectures?",
    options: [
      "ELT is always faster than ETL",
      "ELT eliminates the need for data transformation",
      "Cloud data warehouses (Snowflake, BigQuery) provide cheap storage and elastic compute — making it more efficient to load raw data first and transform it using the warehouse's powerful SQL engine rather than maintaining separate transformation infrastructure",
      "ELT is required by data privacy regulations",
    ],
    answer: 2,
    explanation:
      "Traditional ETL evolved when warehouse storage was expensive and compute was limited — transforming data before loading saved precious warehouse resources. Modern cloud warehouses flipped this: storage is extremely cheap (pennies per GB/month) and compute scales elastically (spin up 100 nodes for a complex transformation, pay only for minutes used). ELT leverages this by loading raw data immediately (fast ingestion) and transforming in-place using SQL (leveraging the warehouse's optimized engine). Tools like dbt have made the transformation step software-engineering-grade with version control, testing, and documentation.",
  },
  {
    id: "t11-q2",
    chapterId: 11,
    question:
      "What problem does the Lambda architecture solve, and what is its main drawback?",
    options: [
      "Lambda architecture eliminates the need for a database",
      "Lambda architecture runs both a batch layer (accurate but slow) and a speed layer (fast but approximate) in parallel — solving the latency problem of batch-only systems, but its main drawback is the complexity of maintaining and debugging two separate codebases that must produce consistent results",
      "Lambda architecture replaces all manual data processing",
      "Lambda architecture only works with structured data",
    ],
    answer: 1,
    explanation:
      "Pure batch processing has high latency (results are hours or days old), while pure streaming can have accuracy issues (late data, ordering problems). Lambda architecture runs both: the batch layer periodically reprocesses all historical data to produce accurate 'batch views,' while the speed layer processes new data in real-time to produce approximate 'real-time views.' The serving layer merges both for queries. The major drawback is maintaining two parallel systems — transformation logic must be implemented and kept consistent in both a batch framework (Spark) and a streaming framework (Flink), doubling development and debugging effort. The Kappa architecture addresses this by using only streaming.",
  },
  {
    id: "t11-q3",
    chapterId: 11,
    question:
      "What is a data contract and why has it become important in modern data platforms?",
    options: [
      "A data contract is a legal agreement between a company and its customers about data usage",
      "A data contract is a type of database constraint",
      "A data contract is a formal specification between data producers and consumers defining the schema, quality expectations, SLAs, and change management process — preventing upstream changes from silently breaking downstream analytics and models",
      "A data contract is a backup and recovery agreement",
    ],
    answer: 2,
    explanation:
      "In organizations with many data teams, upstream changes frequently break downstream consumers: a renamed column breaks a dashboard, a changed data type crashes an ML pipeline, or a delayed delivery causes stale reports. Data contracts formalize the interface: the producer commits to a specific schema, data types, delivery schedule (SLA), and quality thresholds. Any breaking change requires notification and a migration period. This is analogous to API contracts in software engineering — it creates clear ownership, accountability, and stability in the data ecosystem. Tools like Schemata, Protobuf schemas, and dbt contracts enforce these agreements technically.",
  },

  // ============================================================
  // Topic 12: A/B Testing & Experimentation (chapterId: 12)
  // ============================================================
  {
    id: "t12-q1",
    chapterId: 12,
    question:
      "Why is running an A/A test (same version to both groups) important before launching an A/B test?",
    options: [
      "To check if the feature works correctly",
      "To estimate the expected effect size",
      "To verify that the randomization and measurement system work correctly — if an A/A test shows a significant difference between identical groups, it indicates a bug in the assignment or tracking system that would invalidate any A/B test results",
      "To train the statistical model",
    ],
    answer: 2,
    explanation:
      "An A/A test serves as a critical calibration step: both groups receive the identical experience, so any measured difference between them is definitively caused by a system error — not a real effect. Common issues caught by A/A tests include: biased randomization (the random assignment isn't truly random), tracking bugs (events are counted differently for each group), sample ratio mismatch (groups aren't equally sized as expected), and novelty effects from the assignment mechanism itself. If an A/A test shows p < 0.05, you cannot trust any future A/B results from that system until the root cause is found and fixed.",
  },
  {
    id: "t12-q2",
    chapterId: 12,
    question:
      "A test shows a statistically significant 0.02% lift in conversion rate (p = 0.04). Should you ship the change?",
    options: [
      "Yes, because the result is statistically significant at p < 0.05",
      "No, because the p-value is too close to 0.05",
      "Not necessarily — statistical significance does not imply practical significance; a 0.02% lift may not justify the engineering cost, maintenance burden, and code complexity of deploying the change, even if the effect is real",
      "Yes, because any positive improvement should be shipped",
    ],
    answer: 2,
    explanation:
      "Statistical significance (p < 0.05) only tells you the effect is probably not zero — it says nothing about whether the effect is large enough to matter. A 0.02% conversion lift might represent only a few dozen additional conversions per month, while the engineering cost of deploying, maintaining, and supporting the new code could be substantial. The decision should weigh: (1) the practical magnitude of the effect, (2) implementation and maintenance costs, (3) potential downstream effects on other metrics, and (4) opportunity cost — would engineering time be better spent on higher-impact features? Always evaluate practical significance alongside statistical significance.",
  },
  {
    id: "t12-q3",
    chapterId: 12,
    question:
      "How does Thompson Sampling balance exploration and exploitation in a multi-armed bandit?",
    options: [
      "It always shows the variant with the highest observed conversion rate",
      "It randomly shows each variant with equal probability",
      "It samples from the posterior distribution of each variant's success rate and shows the variant with the highest sample — naturally exploring uncertain variants more while gradually exploiting the likely best variant as evidence accumulates",
      "It switches between pure exploration and pure exploitation on a fixed schedule",
    ],
    answer: 2,
    explanation:
      "Thompson Sampling maintains a probability distribution (typically Beta distribution for conversion rates) representing the uncertainty about each variant's true success rate. For each incoming user, it draws a random sample from each variant's posterior distribution and shows the variant with the highest sampled value. A variant with high uncertainty (wide distribution) will occasionally draw high values, ensuring it gets explored. As more data accumulates, the posteriors narrow, and the truly best variant's samples consistently win, shifting traffic toward exploitation. This elegant approach automatically handles the explore-exploit tradeoff without manual tuning of exploration parameters.",
  },

  // ============================================================
  // Topic 13: Data Ethics & Governance (chapterId: 13)
  // ============================================================
  {
    id: "t13-q1",
    chapterId: 13,
    question:
      "Why does removing protected attributes (race, gender) from a model NOT guarantee fairness?",
    options: [
      "Because the model needs these features for accuracy",
      "Because removing features makes the model crash",
      "Because other features in the model can serve as proxies for protected attributes — ZIP code correlates with race due to residential segregation, name patterns correlate with ethnicity, and income correlates with gender, so the model can effectively reconstruct the protected attribute from its proxies",
      "Because fairness is only about equal representation in the dataset",
    ],
    answer: 2,
    explanation:
      "This approach, called 'fairness through unawareness,' is insufficient because real-world features are correlated with protected attributes due to historical and structural factors. ZIP code is correlated with race due to decades of housing discrimination. Name patterns correlate with ethnicity. Income and occupation correlate with gender. University prestige correlates with socioeconomic background. A model can learn these correlations and effectively discriminate based on proxies even without direct access to the protected attribute. True fairness requires measuring outcomes across groups and applying explicit fairness constraints or post-processing adjustments.",
  },
  {
    id: "t13-q2",
    chapterId: 13,
    question:
      "What is the fundamental limitation of k-anonymity as a privacy protection technique?",
    options: [
      "k-anonymity is too computationally expensive",
      "k-anonymity only works with numerical data",
      "k-anonymity protects against identity disclosure but not attribute disclosure — if all k records in a group share the same sensitive value (e.g., all have 'cancer'), an attacker learns the sensitive attribute despite not identifying the specific individual (homogeneity attack)",
      "k-anonymity requires deleting all identifying information",
    ],
    answer: 2,
    explanation:
      "k-anonymity guarantees that each person is indistinguishable from at least k-1 others based on quasi-identifiers (age, ZIP, gender). However, if all k records in a group have the same sensitive attribute value, an attacker who identifies the group learns the sensitive value with certainty. For example, if 5 people in a hospital dataset share age=35 and ZIP=10001, and all 5 have 'HIV positive,' then knowing someone with those demographics is in the dataset reveals their diagnosis. l-Diversity addresses this by requiring at least l different sensitive values per group, and t-closeness requires the distribution of sensitive values in each group to be close to the overall distribution.",
  },
  {
    id: "t13-q3",
    chapterId: 13,
    question:
      "Under GDPR, what is the 'right to be forgotten' and why is it technically challenging for data systems?",
    options: [
      "It means companies cannot store any data about European citizens",
      "It requires companies to forget their employees' passwords",
      "It grants individuals the right to request deletion of their personal data — which is technically challenging because data may exist in backups, replicas, caches, downstream systems, ML training sets, and third-party services, requiring comprehensive data lineage tracking and coordinated deletion across all copies",
      "It only applies to social media companies",
    ],
    answer: 2,
    explanation:
      "GDPR Article 17 gives individuals the right to request erasure of their personal data under certain conditions. While conceptually simple, implementation is enormously complex: data flows through ETL pipelines into warehouses, is copied to replicas and backups, cached in multiple layers, used to train ML models (where individual data points influence model weights), shared with third-party analytics services, and logged in audit trails. A deletion request must propagate to ALL of these systems — requiring comprehensive data lineage tracking, automated deletion workflows, and coordination with every downstream consumer. This is why 'privacy by design' (minimizing data collection and tracking lineage from the start) is far easier than retrofitting deletion capabilities.",
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
