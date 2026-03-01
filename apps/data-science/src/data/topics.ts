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
  { id: 1, title: 'Statistics & Probability' },
  { id: 2, title: 'Data Wrangling & Analysis' },
  { id: 3, title: 'Visualization & Communication' },
  { id: 4, title: 'Data Engineering & Experimentation' },
];

export const topics: Topic[] = [
  // ============================================================
  // PART 1: Statistics & Probability (Topics 1-4)
  // ============================================================
  {
    id: 1,
    title: 'Descriptive Statistics',
    part: 1,
    partTitle: 'Statistics & Probability',
    summary:
      'Descriptive statistics summarize and describe the main features of a dataset — providing measures of central tendency, variability, and shape that form the foundation of all quantitative analysis.',
    concepts: [
      {
        id: 'central-tendency',
        name: 'Measures of Central Tendency',
        description:
          'Mean, median, and mode capture the "center" of a distribution, each suited to different data characteristics and use cases.',
        keyPoints: [
          'The arithmetic mean sums all values and divides by count — it uses every data point but is sensitive to outliers, making it unreliable for skewed distributions like income data',
          'The median is the middle value when data is sorted — it is robust to outliers and preferred for skewed data (e.g., median home price gives a better sense of typical cost than mean)',
          'The mode is the most frequently occurring value — it is the only measure of central tendency applicable to categorical (nominal) data like favorite color or product category',
          'The geometric mean multiplies all values and takes the nth root — it is appropriate for multiplicative processes like compound interest rates, growth rates, and ratios',
          'Trimmed means discard a fixed percentage of extreme values before computing the mean, offering a compromise between the sensitivity of the mean and the robustness of the median',
        ],
        tradeoffs: [
          'Mean is mathematically convenient (additive, differentiable) but misleading with skewed data — median is robust but harder to use in algebraic formulas',
          'Mode can be multimodal or undefined for continuous data — it works best with discrete or categorical variables where frequencies are meaningful',
        ],
        realWorld: [
          'Median household income reporting',
          'Average customer rating on e-commerce platforms',
          'Geometric mean for investment returns',
        ],
      },
      {
        id: 'measures-of-spread',
        name: 'Measures of Spread',
        description:
          'Variance, standard deviation, range, and IQR quantify how dispersed data points are around the center — critical for understanding data reliability and variability.',
        keyPoints: [
          'Variance measures the average squared deviation from the mean — squaring penalizes large deviations disproportionately and ensures the measure is always non-negative',
          'Standard deviation is the square root of variance, restoring the original units — approximately 68% of data falls within one standard deviation of the mean in a normal distribution (the empirical rule)',
          'The interquartile range (IQR) is Q3 minus Q1 — it captures the middle 50% of data and is resistant to outliers, making it the preferred spread measure for skewed distributions',
          'Range (max minus min) is the simplest spread measure but is completely determined by the two most extreme values, making it highly sensitive to outliers and unreliable for most analyses',
          'Coefficient of variation (CV = std dev / mean) enables comparing variability across datasets with different units or scales — e.g., comparing the variability of height in centimeters vs. weight in kilograms',
        ],
        tradeoffs: [
          'Standard deviation is intuitive and widely used but assumes symmetric data — IQR is better for skewed distributions but discards information about tails',
          'Variance is essential for mathematical derivations (additive for independent variables) but its squared units make direct interpretation difficult',
        ],
        realWorld: [
          'Stock volatility measured as standard deviation of returns',
          'Quality control using control charts with sigma limits',
          'IQR-based outlier detection in box plots',
        ],
      },
      {
        id: 'distributions-skewness',
        name: 'Distributions & Skewness',
        description:
          'The shape of a data distribution — whether symmetric, left-skewed, or right-skewed — determines which statistical methods and summary measures are appropriate.',
        keyPoints: [
          'A normal (Gaussian) distribution is symmetric and bell-shaped — the mean, median, and mode are all equal, and the distribution is fully described by its mean and standard deviation',
          'Right (positive) skew means a long tail to the right with most data concentrated on the left — the mean is pulled toward the tail and is greater than the median (e.g., income distribution)',
          'Left (negative) skew means a long tail to the left — the mean is less than the median (e.g., age at retirement in a population where most people retire around 65 but some retire very young)',
          'Kurtosis measures the "tailedness" of a distribution — high kurtosis (leptokurtic) indicates heavy tails and more extreme outliers than a normal distribution, critical for risk assessment in finance',
          'The Central Limit Theorem states that the sampling distribution of the mean approaches normal as sample size increases, regardless of the population distribution — this is why many statistical tests assume normality of sample means',
        ],
        tradeoffs: [
          'Assuming normality simplifies analysis enormously but can lead to wrong conclusions if the data is heavily skewed — always visualize your data before applying parametric tests',
          'Log transformations can normalize right-skewed data but change the interpretation — results must be back-transformed for meaningful communication',
        ],
        realWorld: [
          'Income and wealth distributions (right-skewed)',
          'Exam score distributions in education',
          'Financial returns and tail risk modeling',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Probability Theory',
    part: 1,
    partTitle: 'Statistics & Probability',
    summary:
      'Probability theory provides the mathematical framework for reasoning about uncertainty — from Bayes\' theorem for updating beliefs to probability distributions that model random phenomena.',
    concepts: [
      {
        id: 'bayes-theorem',
        name: "Bayes' Theorem & Conditional Probability",
        description:
          'Bayes\' theorem provides a principled way to update the probability of a hypothesis as new evidence is observed, forming the foundation of Bayesian inference.',
        keyPoints: [
          'Bayes\' theorem states P(A|B) = P(B|A) * P(A) / P(B) — it inverts conditional probabilities, allowing you to compute the probability of a cause given an observed effect',
          'The prior P(A) represents your initial belief before seeing data — the likelihood P(B|A) measures how well the hypothesis explains the data — the posterior P(A|B) is the updated belief',
          'Conditional probability P(A|B) is the probability of A given that B has occurred — it is NOT the same as P(B|A), a confusion known as the prosecutor\'s fallacy',
          'The base rate fallacy occurs when people ignore the prior probability — e.g., a 99% accurate medical test still yields mostly false positives when the disease prevalence is 0.1%',
        ],
        tradeoffs: [
          'Bayesian methods incorporate prior knowledge naturally but require choosing a prior, which can be subjective — frequentist methods avoid priors but cannot express beliefs about parameters',
          'Computing exact posteriors is often intractable for complex models — approximate methods like MCMC or variational inference trade accuracy for computational feasibility',
        ],
        realWorld: [
          'Spam filters updating word probabilities',
          'Medical diagnostic test interpretation',
          'A/B testing with Bayesian frameworks',
        ],
      },
      {
        id: 'probability-distributions',
        name: 'Probability Distributions',
        description:
          'Probability distributions describe how likely different outcomes are — the Normal, Binomial, and Poisson distributions are the workhorses of applied statistics and data science.',
        keyPoints: [
          'The Normal distribution is parameterized by mean and standard deviation — it arises naturally from the sum of many independent random variables (CLT) and underlies most parametric statistical tests',
          'The Binomial distribution models the number of successes in n independent yes/no trials with probability p — e.g., number of heads in 10 coin flips or conversion rate from 1000 website visitors',
          'The Poisson distribution models the count of rare events in a fixed interval — e.g., number of server errors per hour or customer arrivals per minute — parameterized by a single rate lambda',
          'The exponential distribution models the time between Poisson events — e.g., time until the next server failure — it is memoryless, meaning the probability of the next event does not depend on elapsed time',
          'Choosing the right distribution requires understanding your data-generating process — count data often follows Poisson, proportions follow Binomial, and continuous measurements often approximate Normal',
        ],
        tradeoffs: [
          'The Normal distribution is convenient and well-understood but many real datasets (counts, proportions, survival times) violate its assumptions — using it incorrectly leads to invalid confidence intervals and p-values',
          'Simple distributions (Poisson, Binomial) assume independence and constant rates — real-world processes often exhibit overdispersion or time-varying rates, requiring more complex models like Negative Binomial',
        ],
        realWorld: [
          'Quality control defect counts (Poisson)',
          'Click-through rate modeling (Binomial)',
          'Standardized test scores (Normal)',
        ],
      },
      {
        id: 'expected-value-lln',
        name: 'Expected Value & Law of Large Numbers',
        description:
          'Expected value gives the long-run average outcome of a random process, and the Law of Large Numbers guarantees that sample averages converge to the true expected value as sample size grows.',
        keyPoints: [
          'Expected value E[X] is the probability-weighted average of all possible outcomes — for discrete variables, E[X] = sum of x * P(x) — it represents what you would "expect" on average over many repetitions',
          'The Law of Large Numbers (LLN) states that the sample mean converges to the population mean as sample size approaches infinity — this is why casinos are profitable and insurance companies are viable',
          'Linearity of expectation states E[X + Y] = E[X] + E[Y] regardless of whether X and Y are independent — this powerful property simplifies many calculations in probability and statistics',
          'Expected value does not account for risk or variability — two investments with the same expected return but different variances are not equivalent, which is why variance and utility theory matter',
        ],
        tradeoffs: [
          'Expected value is the optimal criterion for repeated decisions but can be misleading for one-shot decisions — the expected value of a lottery ticket is negative, but a single ticket could still win',
          'LLN guarantees convergence but says nothing about the speed — for heavy-tailed distributions, convergence can be extremely slow, requiring very large sample sizes for reliable estimates',
        ],
        realWorld: [
          'Casino house edge calculations',
          'Insurance premium pricing',
          'Monte Carlo simulation for risk analysis',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Inferential Statistics',
    part: 1,
    partTitle: 'Statistics & Probability',
    summary:
      'Inferential statistics uses sample data to draw conclusions about populations — through hypothesis testing, confidence intervals, and understanding the types of errors that arise from making decisions under uncertainty.',
    concepts: [
      {
        id: 'hypothesis-testing',
        name: 'Hypothesis Testing & p-values',
        description:
          'Hypothesis testing provides a formal framework for deciding whether observed data provides sufficient evidence against a null hypothesis, with the p-value quantifying the strength of that evidence.',
        keyPoints: [
          'The null hypothesis (H0) represents the status quo or no-effect assumption — the alternative hypothesis (H1) is what you want to demonstrate — the test evaluates evidence against H0',
          'The p-value is the probability of observing data as extreme as (or more extreme than) the actual data, assuming H0 is true — it is NOT the probability that H0 is true',
          'A significance level (alpha, typically 0.05) is the threshold below which you reject H0 — this means you accept a 5% chance of falsely rejecting a true null hypothesis (Type I error)',
          'Statistical significance does not imply practical significance — a massive sample can detect a trivially small effect with p < 0.001, but that effect might be meaningless in context',
          'Multiple testing inflates false positive rates — testing 20 hypotheses at alpha=0.05 yields an expected 1 false positive even if all null hypotheses are true — corrections like Bonferroni or FDR control are essential',
        ],
        tradeoffs: [
          'Lower alpha reduces false positives but increases false negatives (Type II errors) — the choice of alpha should reflect the relative costs of each type of error in your specific context',
          'p-values provide a standardized framework but are widely misinterpreted — effect sizes and confidence intervals often communicate results more clearly and are increasingly preferred in reporting',
        ],
        realWorld: [
          'Clinical trials for drug approval',
          'A/B testing for product features',
          'Scientific research publication standards',
        ],
      },
      {
        id: 'confidence-intervals',
        name: 'Confidence Intervals',
        description:
          'A confidence interval provides a range of plausible values for a population parameter, communicating both the estimate and the uncertainty around it.',
        keyPoints: [
          'A 95% confidence interval means that if you repeated the sampling process many times, 95% of the intervals constructed would contain the true population parameter — it does NOT mean there is a 95% probability the parameter is in this specific interval',
          'The width of a confidence interval depends on sample size (n), variability (standard deviation), and confidence level — larger n narrows the interval, higher confidence widens it',
          'Confidence intervals and hypothesis tests are dual — a 95% CI excludes values that a two-sided test at alpha=0.05 would reject, so if the CI for a mean difference excludes zero, the test is significant',
          'Bootstrap confidence intervals use resampling to estimate the sampling distribution without parametric assumptions — making them applicable to complex statistics like medians, ratios, or model parameters',
        ],
        tradeoffs: [
          'Higher confidence levels (99% vs 95%) provide more certainty but produce wider intervals that may be too imprecise to be actionable — the choice should balance precision and reliability',
          'Parametric CIs assume a specific distribution (usually normal) and can be misleading for small or skewed samples — bootstrap CIs are more flexible but computationally intensive',
        ],
        realWorld: [
          'Polling margin of error in elections',
          'Clinical trial efficacy estimates',
          'Revenue forecast uncertainty bands',
        ],
      },
      {
        id: 'type-errors',
        name: 'Type I & Type II Errors',
        description:
          'Every statistical decision carries the risk of two kinds of mistakes: rejecting a true null hypothesis (Type I) or failing to reject a false one (Type II) — understanding and managing these errors is central to study design.',
        keyPoints: [
          'A Type I error (false positive) occurs when you reject H0 even though it is true — the probability of this is alpha (significance level), which you set before the test',
          'A Type II error (false negative) occurs when you fail to reject H0 even though H1 is true — the probability of this is beta, and it depends on effect size, sample size, and variability',
          'Statistical power (1 - beta) is the probability of correctly detecting a true effect — a well-designed study aims for at least 80% power, meaning no more than a 20% chance of missing a real effect',
          'Power analysis before a study determines the sample size needed to detect a specified effect size with desired power and alpha — running an underpowered study wastes resources because it cannot reliably detect the effect',
          'The tradeoff between Type I and Type II errors is fundamental — reducing alpha (fewer false positives) automatically increases beta (more false negatives) for a given sample size and effect size',
        ],
        tradeoffs: [
          'In medical testing, Type II errors (missing a disease) may be more costly than Type I (false alarm), favoring higher alpha — in criminal justice, Type I errors (convicting the innocent) are considered worse, favoring lower alpha',
          'Increasing sample size reduces both error types simultaneously but at increasing cost — the relationship between sample size and power is not linear, with diminishing returns for very large n',
        ],
        realWorld: [
          'FDA drug approval criteria',
          'Manufacturing defect detection',
          'Security alarm systems (sensitivity vs. specificity)',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Correlation & Regression Analysis',
    part: 1,
    partTitle: 'Statistics & Probability',
    summary:
      'Correlation and regression quantify relationships between variables — from measuring the strength of association to building predictive models and testing group differences through statistical tests.',
    concepts: [
      {
        id: 'correlation-vs-causation',
        name: 'Correlation vs Causation',
        description:
          'Correlation measures the strength and direction of the linear relationship between two variables, but establishing causation requires additional evidence beyond statistical association.',
        keyPoints: [
          'Pearson correlation (r) ranges from -1 to +1 — it measures the linear relationship between two continuous variables, where r=0 means no linear relationship (but nonlinear relationships may still exist)',
          'Spearman rank correlation measures the monotonic relationship between variables — it is robust to outliers and works with ordinal data, making it preferable when data is not normally distributed',
          'Confounding variables can create spurious correlations — ice cream sales and drowning deaths are correlated because both increase in summer (temperature is the confounder), not because one causes the other',
          'Establishing causation requires controlled experiments (randomized controlled trials), natural experiments, or rigorous causal inference techniques like instrumental variables, regression discontinuity, or difference-in-differences',
        ],
        tradeoffs: [
          'Pearson correlation assumes linearity and is sensitive to outliers — a strong nonlinear relationship (like a U-shape) can have r close to zero, hiding a meaningful pattern',
          'Randomized experiments are the gold standard for causation but are often impractical or unethical — observational causal inference methods are powerful but require strong, untestable assumptions',
        ],
        realWorld: [
          'Smoking and lung cancer causation studies',
          'Social media usage and mental health research',
          'Marketing attribution modeling',
        ],
      },
      {
        id: 'regression-analysis',
        name: 'Simple & Multiple Regression',
        description:
          'Regression models the relationship between a dependent variable and one or more independent variables, enabling prediction and quantifying the effect of each predictor while controlling for others.',
        keyPoints: [
          'Simple linear regression fits a line y = a + bx that minimizes the sum of squared residuals — the slope b represents the average change in y for a one-unit change in x',
          'Multiple regression extends this to multiple predictors: y = a + b1*x1 + b2*x2 + ... — each coefficient represents the effect of that variable holding all other variables constant (ceteris paribus)',
          'R-squared measures the proportion of variance in y explained by the model (0 to 1) — but adding more predictors always increases R-squared, so adjusted R-squared penalizes model complexity',
          'Regression assumptions include linearity, independence of errors, homoscedasticity (constant error variance), and normality of residuals — violating these can invalidate standard errors and hypothesis tests',
          'Multicollinearity occurs when predictors are highly correlated with each other — it inflates standard errors and makes individual coefficient estimates unstable, even though predictions may remain accurate',
        ],
        tradeoffs: [
          'Linear models are interpretable and computationally efficient but cannot capture nonlinear relationships — polynomial or interaction terms add flexibility at the cost of interpretability and overfitting risk',
          'Including more predictors can improve fit but risks overfitting to training data — regularization techniques (Lasso, Ridge) shrink coefficients to prevent overfitting while retaining multiple predictors',
        ],
        realWorld: [
          'Housing price prediction models',
          'Salary analysis controlling for experience and education',
          'Advertising spend vs. sales forecasting',
        ],
      },
      {
        id: 'anova-statistical-tests',
        name: 'ANOVA & Statistical Tests',
        description:
          'ANOVA and related tests compare means across groups, extending hypothesis testing beyond two-sample comparisons to multi-group and multi-factor experimental designs.',
        keyPoints: [
          'One-way ANOVA tests whether the means of three or more groups differ significantly — it compares between-group variance to within-group variance via the F-statistic',
          'Two-way ANOVA tests the effects of two factors and their interaction — e.g., does both drug type AND dosage level affect patient outcomes, and does the drug effect depend on dosage?',
          'Post-hoc tests (Tukey HSD, Bonferroni) identify which specific pairs of groups differ after ANOVA finds a significant overall effect — they adjust for multiple comparisons to control false positive rates',
          'Non-parametric alternatives like Kruskal-Wallis (for ANOVA) and Mann-Whitney U (for t-test) make no distributional assumptions — they compare ranks instead of means and are appropriate for ordinal data or small samples with non-normal distributions',
          'Chi-square tests assess associations between categorical variables — the test of independence compares observed frequencies to expected frequencies under the assumption of no association',
        ],
        tradeoffs: [
          'Parametric tests (ANOVA, t-test) are more powerful when assumptions are met but can give misleading results when they are violated — non-parametric tests are safer but have lower statistical power',
          'ANOVA assumes equal variances across groups (homogeneity of variance) — Welch\'s ANOVA is robust to this violation but may have slightly less power when variances truly are equal',
        ],
        realWorld: [
          'Clinical trials comparing multiple treatments',
          'Marketing campaign effectiveness across regions',
          'A/B/C testing in product development',
        ],
      },
    ],
  },

  // ============================================================
  // PART 2: Data Wrangling & Analysis (Topics 5-7)
  // ============================================================
  {
    id: 5,
    title: 'Data Cleaning & Preprocessing',
    part: 2,
    partTitle: 'Data Wrangling & Analysis',
    summary:
      'Data cleaning and preprocessing transform raw, messy data into a structured format suitable for analysis — handling missing values, detecting outliers, and converting data types to ensure data quality and reliability.',
    concepts: [
      {
        id: 'handling-missing-data',
        name: 'Handling Missing Data',
        description:
          'Missing data is ubiquitous in real datasets and must be handled carefully — the strategy depends on the mechanism of missingness and the downstream analysis requirements.',
        keyPoints: [
          'Missing data mechanisms: MCAR (Missing Completely At Random — missingness is independent of all variables), MAR (Missing At Random — missingness depends on observed variables), and MNAR (Missing Not At Random — missingness depends on the missing value itself)',
          'Listwise deletion (dropping rows with any missing values) is simple but can discard large amounts of data and introduce bias if data is not MCAR — it reduces statistical power proportionally',
          'Mean/median imputation replaces missing values with the column average — it preserves sample size but underestimates variance and can distort correlations between variables',
          'Multiple imputation creates several plausible datasets, analyzes each separately, and pools results — it properly accounts for imputation uncertainty and is considered the gold standard for MAR data',
          'Indicator variables (adding a binary "was_missing" column) can capture the information that a value was missing, which may itself be predictive — e.g., customers who skip optional survey fields may differ systematically',
        ],
        tradeoffs: [
          'Simple imputation (mean/median) is fast and preserves sample size but introduces bias and underestimates uncertainty — multiple imputation is statistically principled but computationally expensive and complex to implement',
          'Dropping rows preserves data integrity of remaining observations but wastes information — in datasets with many partially-complete rows, this can eliminate the majority of data',
        ],
        realWorld: [
          'Healthcare records with missing lab results',
          'Survey data with skipped questions',
          'Sensor data with transmission gaps',
        ],
      },
      {
        id: 'outlier-detection',
        name: 'Outlier Detection & Treatment',
        description:
          'Outliers are data points that deviate significantly from the rest — they may represent errors, rare events, or genuine extreme values, and the appropriate treatment depends on the cause and context.',
        keyPoints: [
          'The IQR method flags values below Q1 - 1.5*IQR or above Q3 + 1.5*IQR as outliers — it is distribution-free and robust, forming the basis of box plot whiskers',
          'Z-score method flags values more than 2-3 standard deviations from the mean — it assumes normality and is sensitive to the very outliers it tries to detect (masking effect)',
          'Isolation Forest and DBSCAN are machine learning approaches for multivariate outlier detection — they can detect outliers that are normal in individual dimensions but unusual in combination',
          'Treatment options include removal (if errors), capping/winsorizing (replacing with boundary values), transformation (log, sqrt), or separate modeling — the choice depends on whether outliers are informative or erroneous',
          'Domain knowledge is essential — an outlier in one context (a $10M transaction for a small business) may be normal in another (institutional trading), so automated detection must be validated by subject matter experts',
        ],
        tradeoffs: [
          'Removing outliers can improve model fit and reduce noise but risks discarding legitimate rare events — in fraud detection, the outliers ARE the signal, so removing them defeats the purpose',
          'Statistical methods (IQR, z-score) are objective and reproducible but may not capture domain-specific definitions of "unusual" — domain-driven thresholds are more relevant but harder to standardize',
        ],
        realWorld: [
          'Fraud detection in financial transactions',
          'Manufacturing defect identification',
          'Removing sensor errors from IoT data',
        ],
      },
      {
        id: 'data-type-encoding',
        name: 'Data Type Conversion & Encoding',
        description:
          'Converting data types and encoding categorical variables into numerical representations are essential preprocessing steps that directly impact model performance and interpretation.',
        keyPoints: [
          'Numeric type conversion (string to int/float) must handle locale-specific formats — commas as thousand separators vs decimal points, currency symbols, and percentage signs all need parsing logic',
          'Date/time parsing requires specifying formats explicitly — ambiguous dates like "01/02/2024" differ between US (January 2) and European (February 1) conventions, leading to silent data errors',
          'Label encoding assigns integers to categories (red=0, blue=1, green=2) — this implies an ordinal relationship that may not exist, potentially misleading distance-based algorithms',
          'One-hot encoding creates binary columns for each category — it avoids false ordinality but increases dimensionality dramatically for high-cardinality features (e.g., a city column with 10,000 unique values creates 10,000 columns)',
          'Target encoding replaces each category with the mean of the target variable for that category — it is low-dimensional and captures predictive information but can overfit if not regularized with techniques like leave-one-out or additive smoothing',
        ],
        tradeoffs: [
          'One-hot encoding is safe and assumption-free but creates sparse, high-dimensional data — target encoding is compact but can leak information from the target variable, requiring careful cross-validation',
          'Automatic type inference (as in pandas read_csv) is convenient but can silently misclassify columns — explicit type specification is more work but prevents downstream errors',
        ],
        realWorld: [
          'ETL pipelines parsing CSV/JSON data from multiple sources',
          'Feature engineering for ML model training',
          'Data warehouse schema design with proper types',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Exploratory Data Analysis',
    part: 2,
    partTitle: 'Data Wrangling & Analysis',
    summary:
      'Exploratory Data Analysis (EDA) is the process of systematically examining datasets to discover patterns, spot anomalies, test hypotheses, and check assumptions — using summary statistics and visualization before formal modeling.',
    concepts: [
      {
        id: 'univariate-bivariate',
        name: 'Univariate & Bivariate Analysis',
        description:
          'Univariate analysis examines each variable individually, while bivariate analysis explores relationships between pairs of variables — together they form the first layer of understanding a dataset.',
        keyPoints: [
          'Univariate analysis for continuous variables includes histograms (distribution shape), box plots (quartiles and outliers), and summary statistics (mean, median, std dev, skewness, kurtosis)',
          'Univariate analysis for categorical variables includes frequency tables, bar charts, and proportion analysis — checking for class imbalance is critical before modeling',
          'Bivariate analysis between continuous variables uses scatter plots and correlation coefficients — nonlinear relationships may have low correlation but strong visual patterns',
          'Bivariate analysis between categorical and continuous variables uses grouped box plots, violin plots, or comparison of group means — this reveals how a continuous outcome differs across categories',
          'Pair plots (scatter plot matrices) provide a systematic overview of all pairwise relationships in a dataset — they are especially useful for datasets with 5-15 numeric variables',
        ],
        tradeoffs: [
          'Thorough EDA catches data quality issues early but can be time-consuming for wide datasets — automated EDA tools (pandas-profiling, sweetviz) speed up the process but may miss domain-specific insights',
          'Bivariate analysis reveals pairwise relationships but can miss multi-way interactions — a variable might be unrelated to the target alone but highly predictive in combination with another variable',
        ],
        realWorld: [
          'Initial data assessment in consulting engagements',
          'Feature selection before machine learning',
          'Quality audit of data warehouse tables',
        ],
      },
      {
        id: 'feature-distributions',
        name: 'Feature Distributions & Relationships',
        description:
          'Understanding how features are distributed and how they relate to each other guides modeling decisions, reveals data quality issues, and informs feature engineering strategies.',
        keyPoints: [
          'Correlation matrices (heatmaps) visualize pairwise Pearson correlations across all numeric features — clusters of highly correlated features suggest redundancy and potential multicollinearity issues',
          'Distribution shape analysis determines which transformations (log, Box-Cox, Yeo-Johnson) might normalize skewed features — many algorithms perform better with approximately normal inputs',
          'Categorical feature analysis includes examining cardinality (number of unique values), frequency distribution (is one category dominant?), and rare categories that may cause issues during train/test splits',
          'Interaction effects occur when the relationship between one feature and the target depends on the value of another feature — visualized with faceted plots or interaction plots and tested with multiplicative terms in regression',
        ],
        tradeoffs: [
          'Extensive distribution analysis ensures appropriate modeling choices but can lead to analysis paralysis — a practical approach is to focus on features with high expected predictive power first',
          'Transforming features to normality improves some algorithms (linear regression, PCA) but is unnecessary for tree-based models — the effort should match the modeling approach being used',
        ],
        realWorld: [
          'Credit scoring feature analysis',
          'Healthcare data exploration before clinical studies',
          'Marketing mix modeling variable assessment',
        ],
      },
      {
        id: 'summary-stats-profiling',
        name: 'Summary Statistics & Data Profiling',
        description:
          'Data profiling automates the generation of comprehensive summary statistics, data quality metrics, and metadata for every column in a dataset — providing a foundation for data governance and analysis.',
        keyPoints: [
          'Data profiling reports include: data types, missing value counts and percentages, unique value counts (cardinality), min/max/mean/median, distribution characteristics, and sample values for each column',
          'Data quality metrics track completeness (% non-null), uniqueness (% distinct), consistency (adherence to patterns/rules), and validity (values within expected ranges or domains)',
          'Automated profiling tools (pandas-profiling / ydata-profiling, Great Expectations, dbt tests) generate reports that would take hours to produce manually, enabling rapid dataset assessment',
          'Profiling over time (data drift detection) compares current distributions to historical baselines — shifts in feature distributions can degrade model performance and indicate upstream data issues',
        ],
        tradeoffs: [
          'Automated profiling is fast and comprehensive but can overwhelm with information — effective profiling requires filtering and prioritizing findings based on relevance to the analysis goal',
          'Statistical summaries can hide important patterns — identical means and standard deviations can describe very different distributions (Anscombe\'s quartet), reinforcing the importance of visualization alongside statistics',
        ],
        realWorld: [
          'Data quality dashboards in enterprise data platforms',
          'New dataset onboarding in data teams',
          'Regulatory data audits in financial services',
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Feature Engineering',
    part: 2,
    partTitle: 'Data Wrangling & Analysis',
    summary:
      'Feature engineering transforms raw data into informative features that improve model performance — encompassing mathematical transformations, categorical encoding strategies, and the creation of interaction and polynomial features.',
    concepts: [
      {
        id: 'feature-transformation',
        name: 'Feature Transformation & Scaling',
        description:
          'Scaling and transforming features ensures that variables are on comparable ranges and have appropriate distributions, which is critical for many machine learning algorithms.',
        keyPoints: [
          'Min-max scaling rescales values to [0, 1] — it preserves the original distribution shape but is sensitive to outliers, as a single extreme value compresses all other values into a narrow range',
          'Standard scaling (z-score normalization) subtracts the mean and divides by standard deviation — it centers data at zero with unit variance, which is required by algorithms assuming standardized inputs (PCA, SVM, regularized regression)',
          'Robust scaling uses the median and IQR instead of mean and std dev — it is not affected by outliers and is preferred when the data contains extreme values that should not dominate the scaling',
          'Log transformation compresses right-skewed data (e.g., income, page views) — it stabilizes variance, makes multiplicative relationships additive, and can approximate normality for positive-valued skewed features',
          'Box-Cox and Yeo-Johnson transformations find the optimal power transformation to approximate normality — Box-Cox requires positive values while Yeo-Johnson handles zero and negative values',
        ],
        tradeoffs: [
          'Scaling is essential for distance-based (KNN, SVM) and gradient-based (neural networks) algorithms but unnecessary for tree-based models (Random Forest, XGBoost) — unnecessary scaling adds complexity without benefit',
          'Log transformation is intuitive and interpretable but only works for positive values — adding a constant before logging (log(x+1)) handles zeros but distorts the transformation for small values',
        ],
        realWorld: [
          'Normalizing pixel values for image processing (0-255 to 0-1)',
          'Standardizing financial metrics for cross-company comparison',
          'Log-transforming web traffic data for regression',
        ],
      },
      {
        id: 'categorical-encoding',
        name: 'Categorical Encoding Strategies',
        description:
          'Encoding categorical variables into numerical form is a critical preprocessing step — different encoding methods preserve different properties and suit different algorithms and cardinality levels.',
        keyPoints: [
          'One-hot encoding creates K binary columns for K categories — it is the safest default for nominal (unordered) variables with low cardinality, preserving all information without imposing false ordinal relationships',
          'Ordinal encoding assigns integers respecting a natural order (low=1, medium=2, high=3) — appropriate only when categories have a meaningful ordering, as models will interpret the numeric distances literally',
          'Target encoding replaces each category with the mean target value for that category — it is compact (one column) and captures predictive signal, but requires regularization to prevent overfitting on rare categories',
          'Frequency encoding replaces each category with its count or proportion in the training data — it is simple, low-dimensional, and captures the "commonness" of a category without target leakage',
          'Binary encoding converts category integers to binary and creates one column per bit — it produces log2(K) columns instead of K, offering a middle ground between one-hot (K columns) and label encoding (1 column) for high-cardinality features',
        ],
        tradeoffs: [
          'One-hot encoding is safe but creates sparse, high-dimensional data that can slow training and cause overfitting for high-cardinality features — dimensionality reduction or embedding layers may be needed',
          'Target encoding is powerful but introduces target leakage if not done within cross-validation folds — leave-one-out encoding and additive smoothing mitigate this but add implementation complexity',
        ],
        realWorld: [
          'Encoding product categories in recommendation systems',
          'ZIP code encoding for geographic features',
          'User-agent string encoding in web analytics',
        ],
      },
      {
        id: 'feature-interaction',
        name: 'Feature Interaction & Polynomial Features',
        description:
          'Creating interaction and polynomial features captures nonlinear relationships and synergies between variables that linear models cannot represent with original features alone.',
        keyPoints: [
          'Interaction features multiply two or more variables together (e.g., size * location) — they capture synergistic effects where the impact of one variable depends on the value of another',
          'Polynomial features (x^2, x^3) allow linear models to fit curves — a degree-2 polynomial with 10 features creates 10 squared terms + 45 interaction terms + 10 original = 65 features',
          'Feature crossing in deep learning concatenates categories (e.g., "country_age_group") — it creates explicit combined features that embedding layers can learn to represent efficiently',
          'Automated feature generation tools (Featuretools, autofeat) systematically create and evaluate interaction and transformation features — they explore combinations that manual engineering might miss',
          'Feature selection after generation is critical — polynomial expansion creates many features, most of which are noise — L1 regularization (Lasso), mutual information, or tree-based importance scores identify the useful ones',
        ],
        tradeoffs: [
          'Polynomial and interaction features can dramatically improve linear model performance but grow combinatorially — degree-3 polynomials with 20 features create thousands of terms, risking overfitting and slow training',
          'Manual feature engineering leverages domain knowledge to create targeted, interpretable features — automated generation explores more combinations but produces features that may lack business meaning',
        ],
        realWorld: [
          'Price elasticity models (price * brand interaction)',
          'Genomics interaction effects between genes',
          'Marketing mix models with channel interactions',
        ],
      },
    ],
  },

  // ============================================================
  // PART 3: Visualization & Communication (Topics 8-10)
  // ============================================================
  {
    id: 8,
    title: 'Data Visualization Principles',
    part: 3,
    partTitle: 'Visualization & Communication',
    summary:
      'Effective data visualization translates complex data into clear visual narratives — guided by principles of chart selection, color theory, and perceptual psychology that ensure accuracy and accessibility.',
    concepts: [
      {
        id: 'chart-selection',
        name: 'Chart Selection & Visual Encoding',
        description:
          'Choosing the right chart type and mapping data to appropriate visual channels (position, length, color, angle) is the most important decision in data visualization.',
        keyPoints: [
          'Position along a common scale (bar charts, dot plots) is the most accurately perceived visual encoding — humans can judge position differences with ~1-2% error, compared to ~10% for angles (pie charts)',
          'Bar charts compare categorical quantities, line charts show trends over ordered dimensions (usually time), scatter plots reveal relationships between two continuous variables, and histograms show distributions',
          'Pie charts are widely used but perceptually inferior to bar charts for comparison — they are only acceptable for showing parts of a whole when there are 2-3 categories with very different proportions',
          'Small multiples (faceted plots) display the same chart type across subgroups — they enable comparison across categories without the clutter of overlapping data on a single plot',
          'The data-ink ratio (Tufte) suggests maximizing the proportion of ink used to present data versus decorative elements — remove gridlines, borders, and backgrounds that do not aid comprehension',
        ],
        tradeoffs: [
          'Familiar chart types (bar, line, pie) are understood by broad audiences but may not be the most efficient for the data — novel visualizations (violin plots, beeswarm plots) convey more information but require audience education',
          'Interactive charts (tooltips, zoom, filter) enable exploration but add development complexity and may not work in static reports — static charts are universally accessible but cannot adapt to different user questions',
        ],
        realWorld: [
          'Business dashboards for executive reporting',
          'Scientific publication figures',
          'Journalism data visualization',
        ],
      },
      {
        id: 'color-theory',
        name: 'Color Theory & Accessibility',
        description:
          'Color choice in data visualization affects both aesthetic appeal and comprehension — proper use of sequential, diverging, and qualitative palettes ensures that color conveys meaning accurately and inclusively.',
        keyPoints: [
          'Sequential palettes (light-to-dark) represent ordered data from low to high — they should vary in luminance (brightness) so the pattern is visible in grayscale and to colorblind viewers',
          'Diverging palettes (two hues meeting at a neutral midpoint) represent data with a meaningful center — e.g., temperature anomalies (blue-white-red) or profit/loss (red-white-green)',
          'Qualitative palettes use distinct hues with similar luminance for categorical data — limit to 7-10 colors maximum, as humans cannot reliably distinguish more than about 7 categories by color alone',
          'Approximately 8% of men and 0.5% of women have color vision deficiency — red-green is the most common type, so avoid using red and green as the only differentiator; use texture, shape, or position as redundant encodings',
          'Tools like ColorBrewer, Viridis (perceptually uniform), and the WCAG contrast ratio guidelines (minimum 4.5:1 for text) help ensure accessible color choices',
        ],
        tradeoffs: [
          'Perceptually uniform palettes (Viridis) ensure accurate data reading but may be less visually striking — brand-aligned colors improve aesthetics but may sacrifice perceptual accuracy',
          'Using more colors enables finer categorical distinctions but increases cognitive load — grouping small categories into "Other" reduces clutter at the cost of some detail',
        ],
        realWorld: [
          'Geographical heatmaps and choropleth maps',
          'Dashboard design for colorblind-accessible analytics',
          'Weather and climate data visualization',
        ],
      },
      {
        id: 'gestalt-principles',
        name: 'Gestalt Principles & Layout',
        description:
          'Gestalt principles describe how humans perceive visual elements as organized patterns — applying these principles to dashboard and chart layout improves comprehension and reduces cognitive effort.',
        keyPoints: [
          'Proximity: elements placed close together are perceived as a group — use spatial grouping to organize related metrics on dashboards rather than relying solely on labels or borders',
          'Similarity: elements sharing visual properties (color, shape, size) are perceived as related — use consistent encoding across charts so the same color always represents the same category',
          'Enclosure: elements within a shared boundary are perceived as a group — subtle background shading or light borders can group related visualizations without heavy visual weight',
          'Continuity: the eye follows smooth paths — align chart axes and gridlines across small multiples so the viewer can track patterns smoothly across panels',
          'The F-pattern and Z-pattern describe common eye-scanning behavior — place the most important information in the top-left (where scanning starts) and key conclusions in visually prominent positions',
        ],
        tradeoffs: [
          'Strict adherence to Gestalt principles creates clean, intuitive layouts but may feel rigid — creative layouts can be more engaging but risk confusing the viewer if principles are violated without purpose',
          'White space improves readability and reduces cognitive load but uses valuable screen real estate — dense dashboards fit more information but can overwhelm users and reduce comprehension',
        ],
        realWorld: [
          'Corporate dashboard design',
          'Data journalism visual stories',
          'Academic poster and figure layout',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Statistical Visualization',
    part: 3,
    partTitle: 'Visualization & Communication',
    summary:
      'Statistical visualizations go beyond basic charts to reveal distributions, relationships, and temporal patterns — from histograms and KDE plots to heatmaps and time series decompositions.',
    concepts: [
      {
        id: 'distribution-plots',
        name: 'Distribution Plots (Histogram, KDE, Box)',
        description:
          'Distribution plots reveal the shape, spread, and central tendency of data — each type offers different tradeoffs between detail, compactness, and ease of comparison.',
        keyPoints: [
          'Histograms bin continuous data into intervals and show frequency counts — bin width critically affects the visual impression: too few bins hide structure, too many create noise — Sturges\' and Freedman-Diaconis rules provide data-driven defaults',
          'Kernel Density Estimation (KDE) creates a smooth continuous estimate of the distribution — it avoids binning artifacts but the bandwidth parameter controls smoothness (similar tradeoff to bin width)',
          'Box plots compactly show median, quartiles, and outliers — they are ideal for comparing distributions across groups but hide multimodality (a bimodal distribution looks like a wide box)',
          'Violin plots combine box plots with mirrored KDE curves — they reveal distribution shape (bimodality, skewness) while still enabling group comparison, though they require more space and viewer familiarity',
          'Empirical CDF (ECDF) plots show the cumulative proportion of data below each value — they display the exact distribution without binning and are excellent for comparing two distributions or assessing normality',
        ],
        tradeoffs: [
          'Histograms are universally understood but bin width is subjective and can mislead — KDE removes binning but introduces bandwidth sensitivity and can suggest impossible values (e.g., negative for strictly positive data)',
          'Box plots are compact and great for many-group comparisons but hide distributional details — violin or ridge plots reveal more but consume more space and are less familiar to non-technical audiences',
        ],
        realWorld: [
          'Salary distribution analysis across departments',
          'Response time distribution in performance monitoring',
          'Gene expression level distributions in bioinformatics',
        ],
      },
      {
        id: 'relationship-plots',
        name: 'Relationship Plots (Scatter, Heatmap, Pair)',
        description:
          'Relationship plots visualize how variables co-vary — scatter plots for pairwise continuous relationships, heatmaps for correlation matrices, and pair plots for systematic multi-variable overview.',
        keyPoints: [
          'Scatter plots are the primary tool for visualizing the relationship between two continuous variables — adding a regression line, confidence band, and coloring by a third variable enriches the story',
          'Overplotting (too many overlapping points) is solved by transparency (alpha), jittering, hexbin plots, or 2D density contours — without these techniques, dense regions are indistinguishable',
          'Correlation heatmaps display pairwise Pearson or Spearman correlations as a color-coded matrix — mask the upper triangle (symmetric), annotate cells with values, and use a diverging palette centered at zero',
          'Pair plots (scatter plot matrices) show all pairwise scatter plots with histograms or KDE on the diagonal — they are essential for initial EDA but become unwieldy with more than 10-15 variables',
        ],
        tradeoffs: [
          'Scatter plots show individual data points but can be misleading with large datasets due to overplotting — aggregated views (hexbin, contour) reveal density patterns but hide individual outliers',
          'Correlation heatmaps provide a quick overview of all pairwise relationships but only capture linear associations — nonlinear relationships (U-shapes, thresholds) will appear as low correlation despite strong dependence',
        ],
        realWorld: [
          'Customer segmentation analysis',
          'Feature correlation analysis before model building',
          'Scientific experiment result visualization',
        ],
      },
      {
        id: 'time-series-geo',
        name: 'Time Series & Geospatial Visualization',
        description:
          'Specialized visualization techniques for temporal and spatial data reveal trends, seasonality, and geographic patterns that standard charts cannot capture effectively.',
        keyPoints: [
          'Time series line charts should use a consistent time axis, handle gaps appropriately (interpolate or break the line), and include reference lines (targets, historical averages) for context',
          'Seasonal decomposition plots separate a time series into trend, seasonal, and residual components — this reveals whether changes are structural trends or recurring patterns',
          'Choropleth maps shade geographic regions by a variable value — they are effective for showing geographic patterns but can be misleading because large, sparsely populated regions visually dominate',
          'Cartograms resize geographic regions by a variable (e.g., population) to counteract the area bias of choropleth maps — they are more accurate but less intuitive for audiences unfamiliar with the distortion',
          'Animated and small-multiple maps can show geographic patterns changing over time — animation is engaging but makes comparison difficult, while small multiples enable precise comparison but require more space',
        ],
        tradeoffs: [
          'Line charts for time series are intuitive but can be cluttered with many series — area charts or stacked area charts show composition over time but make it hard to read individual series values',
          'Choropleth maps are familiar but bias attention toward large regions — bubble maps or dot density maps are more accurate representations but are less visually striking',
        ],
        realWorld: [
          'Stock market performance dashboards',
          'COVID-19 case tracking by region',
          'Retail sales seasonality analysis',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Storytelling with Data',
    part: 3,
    partTitle: 'Visualization & Communication',
    summary:
      'Data storytelling combines data, visuals, and narrative to drive action — effective stories have a clear structure, well-designed dashboards, and presentations tailored to the audience\'s needs and expertise level.',
    concepts: [
      {
        id: 'narrative-structure',
        name: 'Narrative Structure & Audience',
        description:
          'Effective data stories have a deliberate narrative arc — from establishing context and building tension with data to resolving with actionable insights, all calibrated to the audience\'s expertise and needs.',
        keyPoints: [
          'The narrative arc follows: context (why this matters) -> complication (what the data reveals) -> resolution (what to do about it) — this mirrors classic storytelling structure and keeps the audience engaged',
          'Know your audience: executives want conclusions and recommendations first (pyramid principle), technical teams want methodology and evidence, and external stakeholders want impact and validation',
          'Lead with the "so what" — state the key finding or recommendation upfront, then provide supporting evidence — busy stakeholders may not read past the first paragraph',
          'Annotations on charts (callouts, arrows, highlighted regions) guide the viewer to the insight you want them to see — without annotations, audiences may draw different or incorrect conclusions from the same chart',
        ],
        tradeoffs: [
          'Strong narrative makes data compelling but risks cherry-picking — present contradictory evidence alongside your conclusions to maintain credibility and enable informed decision-making',
          'Simplifying for non-technical audiences improves accessibility but can lose important nuances — provide appendices or drill-down capabilities for those who want the details',
        ],
        realWorld: [
          'Board-level data presentations',
          'Data journalism articles',
          'Product analytics review meetings',
        ],
      },
      {
        id: 'dashboard-design',
        name: 'Dashboard Design & Interactivity',
        description:
          'Dashboards aggregate multiple visualizations into a coherent, interactive interface — good dashboard design balances information density with clarity and enables both monitoring and exploration.',
        keyPoints: [
          'The information hierarchy principle: place the most critical KPIs prominently at the top, supporting details below, and filters/controls in a consistent location (typically left sidebar or top bar)',
          'Progressive disclosure layers detail — start with high-level summaries and allow users to drill down into specifics on demand, preventing information overload while enabling deep exploration',
          'Real-time vs. batch dashboards serve different purposes — real-time dashboards monitor operational metrics (server health, live sales) while analytical dashboards support strategic decision-making with historical data',
          'Cross-filtering (clicking one chart filters all others) creates a powerful exploration experience — but ensure users understand that filters are active (visual indicators) to prevent misinterpretation of filtered views',
          'Dashboard performance matters — slow-loading dashboards are abandoned — optimize queries, cache results, and pre-aggregate data to keep response times under 2-3 seconds',
        ],
        tradeoffs: [
          'Dense dashboards pack more information but overwhelm users — focused dashboards with 4-6 key visualizations are more likely to drive action than sprawling dashboards with 20+ charts',
          'Custom-built dashboards (D3.js, React) offer maximum flexibility but require significant development time — BI tools (Tableau, Looker, Power BI) are faster to build but constrain design choices',
        ],
        realWorld: [
          'Executive KPI dashboards',
          'Marketing campaign performance monitors',
          'DevOps observability dashboards',
        ],
      },
      {
        id: 'presentation-reporting',
        name: 'Presentation & Reporting Best Practices',
        description:
          'Delivering data insights effectively requires tailored presentation formats, clear visual hierarchy, and a focus on actionable takeaways rather than raw data dumps.',
        keyPoints: [
          'One chart, one message — each slide or section should make a single clear point, with the chart title stating the insight (not the chart type) — "Revenue grew 23% in Q3" not "Q3 Revenue Chart"',
          'The Minto Pyramid Principle structures communication top-down: conclusion first, then supporting arguments, then evidence — this matches how executives process information',
          'Reproducible reports (R Markdown, Jupyter Notebooks, Observable) combine code, data, and narrative — they ensure transparency, enable peer review, and allow re-running with updated data',
          'Executive summaries should be standalone — assume the reader will not read beyond the first page and include: key finding, business impact, recommended action, and confidence level',
        ],
        tradeoffs: [
          'Polished slide decks are persuasive and professional but time-consuming to create — automated reporting saves time but may lack the narrative framing that drives action',
          'Interactive reports enable exploration but require the audience to have analytical skills — static reports control the narrative but cannot answer follow-up questions dynamically',
        ],
        realWorld: [
          'Quarterly business review presentations',
          'Data science project final deliverables',
          'Regulatory compliance reports',
        ],
      },
    ],
  },

  // ============================================================
  // PART 4: Data Engineering & Experimentation (Topics 11-13)
  // ============================================================
  {
    id: 11,
    title: 'Data Pipelines & ETL',
    part: 4,
    partTitle: 'Data Engineering & Experimentation',
    summary:
      'Data pipelines move and transform data from source systems to analytical destinations — understanding ETL vs ELT patterns, batch vs streaming processing, and data quality validation is essential for reliable data infrastructure.',
    concepts: [
      {
        id: 'etl-elt-patterns',
        name: 'ETL vs ELT Patterns',
        description:
          'ETL (Extract-Transform-Load) and ELT (Extract-Load-Transform) are the two fundamental approaches to data pipeline design, differing in where transformation occurs and what infrastructure is leveraged.',
        keyPoints: [
          'ETL transforms data before loading into the destination — transformations happen in an external processing engine (Spark, Python, Informatica), and only clean, structured data enters the warehouse',
          'ELT loads raw data into the destination first, then transforms it using the warehouse\'s own compute engine (SQL, dbt) — this leverages the scalability of modern cloud warehouses (Snowflake, BigQuery, Redshift)',
          'ETL was dominant when storage was expensive and warehouse compute was limited — ELT has become preferred as cloud warehouse storage became cheap and compute became elastic',
          'dbt (data build tool) has become the standard for the T in ELT — it enables version-controlled, tested, documented SQL transformations that run inside the warehouse, treating analytics code like software',
          'Idempotent pipelines produce the same result when run multiple times with the same input — this is critical for reliability, as pipelines frequently need to be re-run due to failures or data corrections',
        ],
        tradeoffs: [
          'ETL reduces warehouse storage costs and ensures data quality before loading but requires dedicated transformation infrastructure — ELT simplifies the pipeline but may load low-quality or sensitive data into the warehouse',
          'ELT enables faster iteration (transform with SQL in the warehouse) but can lead to "data swamps" if raw data is loaded without governance — ETL enforces structure upfront but slows down time to first insight',
        ],
        realWorld: [
          'Cloud data warehouse migrations (on-prem ETL to cloud ELT)',
          'dbt-based analytics engineering workflows',
          'Real-time data ingestion with Kafka to data lake',
        ],
      },
      {
        id: 'batch-stream-processing',
        name: 'Batch vs Stream Processing',
        description:
          'Batch processing handles data in scheduled chunks, while stream processing handles data continuously as it arrives — the choice depends on latency requirements, complexity, and cost.',
        keyPoints: [
          'Batch processing runs at scheduled intervals (hourly, daily) on accumulated data — it is simpler, more cost-effective, and easier to debug, making it suitable for most analytical workloads',
          'Stream processing handles events in real-time (sub-second to seconds latency) — it is necessary for use cases like fraud detection, live dashboards, and recommendation engines that require immediate responses',
          'The Lambda architecture maintains both batch (accurate) and streaming (approximate) pipelines — the batch layer periodically corrects the streaming layer\'s results, but maintaining two codebases is complex',
          'The Kappa architecture simplifies by using only a streaming pipeline that can also reprocess historical data — frameworks like Apache Kafka, Flink, and Spark Structured Streaming support this unified approach',
          'Exactly-once processing semantics ensure each event is processed exactly once despite failures — this is the hardest guarantee to provide and often requires idempotent operations or transactional sinks',
        ],
        tradeoffs: [
          'Streaming provides lower latency but is more complex, expensive, and harder to debug than batch — for most analytical use cases, hourly or daily batch processing is sufficient and much simpler',
          'Lambda architecture provides both speed and accuracy but doubles infrastructure and maintenance costs — Kappa architecture is simpler but requires a streaming engine powerful enough to handle backfill/reprocessing',
        ],
        realWorld: [
          'Real-time fraud detection in banking',
          'Live sports statistics and betting odds',
          'IoT sensor data processing for predictive maintenance',
        ],
      },
      {
        id: 'data-quality-validation',
        name: 'Data Quality & Validation',
        description:
          'Data quality validation ensures that data meets expected standards of accuracy, completeness, consistency, and timeliness — catching issues before they propagate to downstream analyses and models.',
        keyPoints: [
          'Schema validation checks that data conforms to expected types, formats, and constraints — e.g., dates are in ISO format, email fields match a regex pattern, and required fields are non-null',
          'Statistical validation compares incoming data against historical baselines — row count deviations beyond a threshold, column mean shifts, or new category values trigger alerts before data is used',
          'Great Expectations is a popular open-source framework that defines data quality rules as "expectations" — these are versioned, tested, and produce data quality reports alongside the pipeline',
          'Data contracts formalize agreements between data producers and consumers — they specify schema, SLAs (freshness, availability), quality thresholds, and notification procedures for breaking changes',
          'Circuit breaker patterns halt downstream processing when data quality fails — rather than propagating bad data, the pipeline stops and alerts operators, preventing cascading failures in models and dashboards',
        ],
        tradeoffs: [
          'Strict validation catches problems early but can block pipelines for minor issues — overly sensitive checks create alert fatigue and slow delivery, so thresholds must balance sensitivity and practicality',
          'Comprehensive data testing requires ongoing maintenance as data evolves — new columns, changing distributions, and upstream changes require continuous updates to validation rules',
        ],
        realWorld: [
          'dbt tests for analytics data warehouses',
          'ML feature store validation pipelines',
          'Financial reporting data quality audits',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'A/B Testing & Experimentation',
    part: 4,
    partTitle: 'Data Engineering & Experimentation',
    summary:
      'A/B testing and experimentation provide a rigorous framework for making data-driven decisions — from designing experiments with proper sample sizes to interpreting results with statistical rigor and exploring alternatives like multi-armed bandits.',
    concepts: [
      {
        id: 'experiment-design',
        name: 'Experiment Design & Sample Size',
        description:
          'Proper experiment design determines randomization, sample size, duration, and guard rails before the test begins — flawed design invalidates results regardless of the analysis.',
        keyPoints: [
          'Random assignment is the foundation — each user must have an equal probability of being in control or treatment, and assignment must be consistent (a user stays in their group throughout the experiment)',
          'Sample size calculation requires specifying: minimum detectable effect (MDE), significance level (alpha, usually 0.05), statistical power (1-beta, usually 0.80), and baseline metric variance',
          'The minimum detectable effect should be the smallest change that would be practically meaningful — detecting a 0.01% conversion rate change is statistically possible but may require millions of users and weeks of runtime',
          'Experiment duration must account for weekly cycles (weekday vs weekend behavior differs), novelty effects (users initially engage more with any change), and seasonal patterns',
          'Pre-experiment checks include A/A tests (running the same version to both groups to verify no inherent bias) and sample ratio mismatch (SRM) checks to confirm randomization is working correctly',
        ],
        tradeoffs: [
          'Smaller MDE requires larger samples and longer duration but detects subtle improvements — larger MDE runs faster but may miss meaningful small effects that compound over time',
          'Running experiments longer increases confidence but delays decision-making — early stopping rules (sequential testing) allow faster decisions but require statistical adjustments to maintain valid error rates',
        ],
        realWorld: [
          'Feature rollout testing at tech companies',
          'Marketing email subject line testing',
          'Pricing experiment design in e-commerce',
        ],
      },
      {
        id: 'statistical-significance-power',
        name: 'Statistical Significance & Power',
        description:
          'Statistical significance indicates whether an observed effect is likely real rather than due to chance, while statistical power determines whether the experiment can detect a real effect if one exists.',
        keyPoints: [
          'A statistically significant result (p < alpha) means the observed difference is unlikely under the null hypothesis — but it does not tell you the size of the effect or whether it matters practically',
          'Effect size measures the magnitude of the difference — Cohen\'s d for means (small=0.2, medium=0.5, large=0.8) and relative lift for proportions — always report effect size alongside p-values',
          'Statistical power (typically 80%) is the probability of detecting a true effect — underpowered experiments frequently fail to find real effects, wasting time and resources while potentially discarding winning variants',
          'Multiple testing corrections are necessary when running many simultaneous tests — Bonferroni divides alpha by the number of tests (conservative), while Benjamini-Hochberg controls the false discovery rate (less conservative)',
          'Practical significance should drive decisions, not statistical significance alone — a statistically significant 0.1% improvement in conversion rate may not justify the engineering cost of deploying the change',
        ],
        tradeoffs: [
          'Higher power requires larger samples (more time and traffic) but reduces the risk of missing real improvements — lower power saves resources but means most true effects go undetected',
          'Strict multiple testing correction reduces false positives but increases false negatives — in exploratory analyses, a more lenient correction (FDR) may be appropriate to generate hypotheses',
        ],
        realWorld: [
          'Optimizely/LaunchDarkly experiment analysis',
          'Pharmaceutical clinical trial power analysis',
          'Search engine ranking algorithm testing',
        ],
      },
      {
        id: 'bandits-bayesian',
        name: 'Multi-armed Bandits & Bayesian Testing',
        description:
          'Multi-armed bandits and Bayesian A/B testing offer alternatives to classical hypothesis testing — dynamically allocating traffic or providing probabilistic conclusions instead of binary pass/fail decisions.',
        keyPoints: [
          'Multi-armed bandits balance exploration (testing variants) and exploitation (serving the current best variant) — they gradually shift traffic toward the winning variant, reducing opportunity cost during the experiment',
          'Thompson Sampling is a Bayesian bandit algorithm that samples from the posterior distribution of each variant\'s success rate and plays the variant with the highest sample — it naturally balances exploration and exploitation',
          'Bayesian A/B testing computes the posterior probability that each variant is best — instead of a p-value, it answers "what is the probability that variant B is better than A?" which is often more intuitive for stakeholders',
          'Contextual bandits extend multi-armed bandits by considering user context (demographics, behavior) — they personalize the variant shown to each user, optimizing for individual rather than average effects',
          'The explore-exploit tradeoff is fundamental — pure exploitation (always showing the best variant so far) misses potentially better options, while pure exploration (equal traffic split) wastes traffic on losing variants',
        ],
        tradeoffs: [
          'Bandits minimize regret during the experiment but make it harder to measure the final effect size with the same rigor as a fixed-horizon A/B test — they are better for optimization than measurement',
          'Bayesian methods provide intuitive probability statements but require choosing priors and are computationally more expensive — frequentist methods are simpler but answer a less intuitive question',
        ],
        realWorld: [
          'Ad creative optimization in real-time bidding',
          'Personalized content recommendation',
          'Dynamic pricing and promotion testing',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Data Ethics & Governance',
    part: 4,
    partTitle: 'Data Engineering & Experimentation',
    summary:
      'Data ethics and governance address the responsible collection, use, and management of data — encompassing bias detection, privacy protection, and compliance frameworks that ensure data practices are fair, transparent, and legally sound.',
    concepts: [
      {
        id: 'bias-fairness',
        name: 'Bias & Fairness in Data',
        description:
          'Bias in data and algorithms can systematically disadvantage certain groups — identifying, measuring, and mitigating bias is both an ethical imperative and a practical requirement for trustworthy data science.',
        keyPoints: [
          'Selection bias occurs when the data collection process systematically excludes certain populations — e.g., a survey conducted online excludes people without internet access, skewing results toward younger, wealthier demographics',
          'Historical bias embeds past discrimination into training data — a hiring model trained on historical decisions learns to discriminate against groups that were historically disadvantaged, perpetuating inequity',
          'Measurement bias arises when proxy variables imperfectly capture the quantity of interest — using ZIP code as a proxy for creditworthiness can encode racial segregation patterns into credit decisions',
          'Fairness metrics include demographic parity (equal positive rates across groups), equalized odds (equal true positive and false positive rates), and calibration (predicted probabilities reflect actual outcomes within each group) — these metrics often conflict with each other',
          'Bias mitigation strategies operate at three stages: pre-processing (resampling, reweighting data), in-processing (adding fairness constraints to the model objective), and post-processing (adjusting predictions to equalize outcomes)',
        ],
        tradeoffs: [
          'Achieving perfect fairness by one metric often violates another — demographic parity and calibration are mathematically incompatible except in trivial cases, so the choice of fairness criterion is a value judgment',
          'Removing protected attributes (race, gender) from models does not eliminate bias because other features (ZIP code, name) can serve as proxies — "fairness through unawareness" is generally insufficient',
        ],
        realWorld: [
          'Criminal justice risk assessment tools',
          'Hiring and resume screening algorithms',
          'Healthcare resource allocation models',
        ],
      },
      {
        id: 'privacy-anonymization',
        name: 'Privacy & Anonymization',
        description:
          'Protecting individual privacy while enabling data analysis requires techniques ranging from anonymization and pseudonymization to differential privacy, each offering different guarantees and limitations.',
        keyPoints: [
          'Anonymization removes or generalizes identifying information — but re-identification attacks have shown that "anonymous" datasets can often be linked back to individuals using auxiliary data (e.g., Netflix prize dataset re-identification)',
          'k-Anonymity ensures each record is indistinguishable from at least k-1 other records on quasi-identifiers (age, ZIP, gender) — it protects against record linkage but is vulnerable to homogeneity attacks when all k records share the same sensitive value',
          'Differential privacy adds calibrated noise to query results or model outputs — it provides a mathematical guarantee that any individual\'s inclusion or exclusion does not significantly change the output, regardless of auxiliary information',
          'The privacy-utility tradeoff is fundamental — stronger privacy protections (more noise, more generalization) reduce the accuracy and utility of the data for analysis, so the right balance depends on the sensitivity of the data and the analysis requirements',
          'Data minimization (collect only what is needed), purpose limitation (use data only for stated purposes), and retention limits (delete data after its useful life) are core principles of privacy-by-design',
        ],
        tradeoffs: [
          'Strong anonymization protects privacy but can render data useless for detailed analysis — synthetic data generation attempts to preserve statistical properties while eliminating re-identification risk, but faithfulness varies',
          'Differential privacy provides the strongest formal guarantees but requires significant expertise to implement correctly and can add substantial noise to small-sample or rare-event analyses',
        ],
        realWorld: [
          'US Census Bureau differential privacy implementation',
          'HIPAA-compliant healthcare data sharing',
          'Apple and Google local differential privacy for telemetry',
        ],
      },
      {
        id: 'data-governance-compliance',
        name: 'Data Governance & Compliance',
        description:
          'Data governance establishes policies, processes, and standards for managing data assets across an organization — ensuring data quality, security, compliance with regulations, and alignment with business objectives.',
        keyPoints: [
          'GDPR (EU) grants individuals rights over their data: access, rectification, erasure ("right to be forgotten"), portability, and the right to an explanation of automated decisions — violations can result in fines up to 4% of global annual revenue',
          'CCPA/CPRA (California) gives consumers the right to know what data is collected, opt out of data sales, and request deletion — it applies to businesses meeting revenue or data volume thresholds',
          'Data lineage tracks where data comes from, how it is transformed, and where it flows — it is essential for impact analysis (what breaks if a source changes?), debugging, and regulatory audit trails',
          'Data catalogs (Alation, DataHub, Amundsen) provide a searchable inventory of all data assets with metadata, ownership, quality scores, and usage statistics — they enable data discovery and reduce duplication',
          'Role-based access control (RBAC) and column-level security ensure that users can only access data appropriate to their role — combined with audit logging, this creates accountability and prevents unauthorized data exposure',
        ],
        tradeoffs: [
          'Comprehensive governance improves data quality and compliance but adds friction to data access and slows down exploratory analysis — overly bureaucratic processes can stifle innovation and drive users to create shadow data systems',
          'Centralized data governance ensures consistency and control but can bottleneck data teams — federated governance distributes ownership to domain teams but risks inconsistency and duplication',
        ],
        realWorld: [
          'GDPR compliance programs at multinational companies',
          'Data mesh implementation with domain ownership',
          'SOX compliance for financial data integrity',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find(t => t.id === id);
}
