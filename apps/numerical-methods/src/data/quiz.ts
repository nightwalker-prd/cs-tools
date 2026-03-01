export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ─── Topic 1: Vectors, Matrices & Operations ───
  {
    id: 't1-q1',
    chapterId: 1,
    question:
      'What does the rank-nullity theorem state for an m-by-n matrix A?',
    options: [
      'rank(A) + nullity(A) = m',
      'rank(A) + nullity(A) = n',
      'rank(A) * nullity(A) = n',
      'rank(A) - nullity(A) = m - n',
    ],
    answer: 1,
    explanation:
      'The rank-nullity theorem states rank(A) + nullity(A) = n, where n is the number of columns of A. The rank is the dimension of the column space and the nullity is the dimension of the null space.',
  },
  {
    id: 't1-q2',
    chapterId: 1,
    question:
      'Why is computing A^{-1} explicitly generally avoided when solving Ax = b?',
    options: [
      'The inverse does not exist for most matrices',
      'It is numerically less stable and more expensive than factorization-based methods',
      'Matrix inversion requires complex number arithmetic',
      'The inverse has more nonzero entries than A',
    ],
    answer: 1,
    explanation:
      'Computing A^{-1} explicitly is roughly 3x more expensive than LU factorization and introduces unnecessary rounding errors. Solving via LU factorization (forward/back substitution) is both faster and more numerically stable.',
  },
  {
    id: 't1-q3',
    chapterId: 1,
    question:
      'Which norm is most commonly associated with promoting sparsity in optimization?',
    options: [
      'L2 (Euclidean) norm',
      'Frobenius norm',
      'L1 (Manhattan) norm',
      'L-infinity (max) norm',
    ],
    answer: 2,
    explanation:
      'The L1 norm (sum of absolute values) promotes sparsity because its unit ball has corners on the coordinate axes. Minimizing an objective plus an L1 penalty tends to drive many components exactly to zero.',
  },

  // ─── Topic 2: Linear Transformations & Rank ───
  {
    id: 't2-q1',
    chapterId: 2,
    question: 'What is a necessary condition for a linear map T: V -> W to be injective (one-to-one)?',
    options: [
      'The dimension of W must be less than the dimension of V',
      'The kernel of T must be trivial (only the zero vector)',
      'T must be represented by a square matrix',
      'The rank of T must equal the dimension of W',
    ],
    answer: 1,
    explanation:
      'A linear map is injective if and only if its kernel (null space) contains only the zero vector. If any nonzero vector maps to zero, then distinct vectors can map to the same output, violating injectivity.',
  },
  {
    id: 't2-q2',
    chapterId: 2,
    question:
      'Which of the following is NOT an invariant shared by similar matrices A and P^{-1}AP?',
    options: [
      'Eigenvalues',
      'Determinant',
      'Individual matrix entries',
      'Trace',
    ],
    answer: 2,
    explanation:
      'Similar matrices share eigenvalues, determinant, trace, rank, and characteristic polynomial because they represent the same linear map in different bases. However, the individual entries typically change when the basis changes.',
  },
  {
    id: 't2-q3',
    chapterId: 2,
    question:
      'A matrix A is diagonalizable (A = PDP^{-1}) if and only if:',
    options: [
      'A is symmetric',
      'A has n distinct eigenvalues',
      'A has n linearly independent eigenvectors',
      'A is invertible',
    ],
    answer: 2,
    explanation:
      'A matrix is diagonalizable if and only if it has a full set of n linearly independent eigenvectors (which form the columns of P). Having n distinct eigenvalues is sufficient but not necessary; symmetric matrices are always diagonalizable but that is a stronger condition.',
  },

  // ─── Topic 3: Eigenvalues & Eigenvectors ───
  {
    id: 't3-q1',
    chapterId: 3,
    question:
      'For an n-by-n matrix A, the characteristic polynomial det(A - lambda*I) has degree:',
    options: ['n - 1', 'n', 'n + 1', '2n'],
    answer: 1,
    explanation:
      'The characteristic polynomial det(A - lambda*I) is a polynomial of degree n in lambda, where n is the size of the square matrix. By the fundamental theorem of algebra, it has exactly n roots (counted with multiplicity) in the complex numbers.',
  },
  {
    id: 't3-q2',
    chapterId: 3,
    question:
      'The spectral theorem guarantees that every real symmetric matrix has:',
    options: [
      'All positive eigenvalues',
      'Complex eigenvalues in conjugate pairs',
      'Real eigenvalues and orthogonal eigenvectors',
      'A single dominant eigenvalue',
    ],
    answer: 2,
    explanation:
      'The spectral theorem states that every real symmetric matrix A = A^T has all real eigenvalues and a complete set of orthonormal eigenvectors, enabling the decomposition A = Q*Lambda*Q^T where Q is orthogonal.',
  },
  {
    id: 't3-q3',
    chapterId: 3,
    question:
      'The power method converges to the eigenvector associated with the eigenvalue that has the:',
    options: [
      'Smallest absolute value',
      'Largest real part',
      'Largest absolute value',
      'Most negative real part',
    ],
    answer: 2,
    explanation:
      'The power method x_{k+1} = Ax_k / ||Ax_k|| converges to the eigenvector corresponding to the eigenvalue with the largest absolute value (dominant eigenvalue). The convergence rate depends on the ratio |lambda_2/lambda_1|.',
  },

  // ─── Topic 4: Matrix Decompositions (LU, QR, SVD) ───
  {
    id: 't4-q1',
    chapterId: 4,
    question:
      'What is the primary advantage of LU decomposition over directly solving Ax = b by Gaussian elimination?',
    options: [
      'LU decomposition is more numerically stable',
      'Once factored, additional right-hand sides b can be solved in O(n^2) instead of O(n^3)',
      'LU decomposition works for non-square matrices',
      'LU decomposition requires less memory',
    ],
    answer: 1,
    explanation:
      'The key advantage is amortization: the O(n^3) factorization is done once, and then each new right-hand side b requires only O(n^2) work (forward and back substitution). This is far cheaper than repeating Gaussian elimination for each b.',
  },
  {
    id: 't4-q2',
    chapterId: 4,
    question:
      'Which QR factorization algorithm is generally preferred for numerical stability?',
    options: [
      'Classical Gram-Schmidt',
      'Modified Gram-Schmidt',
      'Householder reflections',
      'Givens rotations',
    ],
    answer: 2,
    explanation:
      'Householder reflections are generally preferred because they are orthogonal transformations (condition number 1) and rounding errors do not accumulate across columns. Modified Gram-Schmidt is more stable than classical but still inferior to Householder for ill-conditioned matrices.',
  },
  {
    id: 't4-q3',
    chapterId: 4,
    question:
      'According to the Eckart-Young theorem, the best rank-k approximation to a matrix A (in the Frobenius norm) is obtained by:',
    options: [
      'Keeping the k largest diagonal entries of A',
      'Computing the first k columns of the QR factorization',
      'Keeping the k largest singular values and their corresponding singular vectors',
      'Projecting A onto its k largest eigenvectors',
    ],
    answer: 2,
    explanation:
      'The Eckart-Young theorem states that the best rank-k approximation A_k = sum_{i=1}^{k} sigma_i u_i v_i^T is obtained from the SVD by retaining only the k largest singular values. This is optimal in both the Frobenius and spectral norms.',
  },

  // ─── Topic 5: Solving Linear Systems ───
  {
    id: 't5-q1',
    chapterId: 5,
    question:
      'For symmetric positive definite systems, which factorization is preferred over general LU?',
    options: [
      'QR decomposition',
      'SVD',
      'Cholesky decomposition (A = LL^T)',
      'Schur decomposition',
    ],
    answer: 2,
    explanation:
      'The Cholesky decomposition A = LL^T is preferred for SPD systems because it is about half the cost of LU, requires no pivoting (guaranteed stability), and preserves the positive definiteness structure.',
  },
  {
    id: 't5-q2',
    chapterId: 5,
    question:
      'Which iterative method is considered the gold standard for large sparse symmetric positive definite systems?',
    options: [
      'Jacobi iteration',
      'GMRES',
      'Conjugate Gradient (CG)',
      'Gauss-Seidel iteration',
    ],
    answer: 2,
    explanation:
      'Conjugate Gradient (CG) is the gold standard for SPD systems. It minimizes the A-norm of the error over the Krylov subspace, converges in at most n iterations in exact arithmetic, and requires only matrix-vector products and vector operations.',
  },
  {
    id: 't5-q3',
    chapterId: 5,
    question:
      'A matrix with condition number kappa(A) ~ 10^8 in double precision (epsilon ~ 10^{-16}) can be expected to produce solutions with approximately how many correct digits?',
    options: [
      'About 16 digits',
      'About 8 digits',
      'About 4 digits',
      'No reliable digits',
    ],
    answer: 1,
    explanation:
      'The rule of thumb is that a condition number of 10^k causes a loss of about k digits of accuracy. With kappa ~ 10^8 and 16 digits of machine precision, the solution retains about 16 - 8 = 8 reliable digits.',
  },

  // ─── Topic 6: Least Squares & Linear Regression ───
  {
    id: 't6-q1',
    chapterId: 6,
    question:
      'Solving least squares via the normal equations A^T A x = A^T b has what numerical disadvantage?',
    options: [
      'It only works for square matrices',
      'It squares the condition number: kappa(A^T A) = kappa(A)^2',
      'It requires computing the SVD',
      'It is slower than QR-based methods',
    ],
    answer: 1,
    explanation:
      'Forming A^T A squares the condition number (kappa(A^T A) = kappa(A)^2), which can cause significant loss of precision for ill-conditioned problems. QR-based and SVD-based methods avoid this squaring.',
  },
  {
    id: 't6-q2',
    chapterId: 6,
    question:
      'The Gauss-Markov theorem states that the ordinary least squares estimator is:',
    options: [
      'The maximum likelihood estimator under any error distribution',
      'The best linear unbiased estimator (BLUE) when errors are uncorrelated with equal variance',
      'Always consistent regardless of the error distribution',
      'The minimum variance estimator among all estimators (linear or not)',
    ],
    answer: 1,
    explanation:
      'The Gauss-Markov theorem states that among all linear unbiased estimators, OLS has the smallest variance (is BLUE) when errors are uncorrelated with zero mean and constant variance. It does not require normality or apply to nonlinear estimators.',
  },
  {
    id: 't6-q3',
    chapterId: 6,
    question: 'Lasso regression (L1 penalty) differs from Ridge regression (L2 penalty) primarily in that Lasso:',
    options: [
      'Always produces a unique solution',
      'Produces sparse solutions by driving some coefficients exactly to zero',
      'Is computationally cheaper to solve',
      'Has a closed-form solution',
    ],
    answer: 1,
    explanation:
      'The L1 penalty in Lasso drives some coefficients to exactly zero, effectively performing feature selection. Ridge shrinks all coefficients toward zero but never sets them exactly to zero. Lasso does not have a closed-form solution and may not produce unique solutions when features are correlated.',
  },

  // ─── Topic 7: Gradient Descent & Variants ───
  {
    id: 't7-q1',
    chapterId: 7,
    question:
      'For a convex function with condition number kappa, gradient descent with optimal fixed step size converges at rate:',
    options: [
      'O(1/k^2)',
      'O((1 - 1/kappa)^k)',
      'O(1/k)',
      'O(e^{-k})',
    ],
    answer: 1,
    explanation:
      'For strongly convex functions with condition number kappa = L/mu, gradient descent with step size 1/L converges linearly: the error decreases by a factor of (1 - 1/kappa) per iteration, giving O((1 - 1/kappa)^k) convergence. Larger kappa means slower convergence.',
  },
  {
    id: 't7-q2',
    chapterId: 7,
    question:
      'What is the primary reason stochastic gradient descent (SGD) often generalizes better than full-batch gradient descent in deep learning?',
    options: [
      'SGD always converges to the global minimum',
      'SGD computes exact gradients more efficiently',
      'The noise in SGD helps escape sharp local minima, finding flatter minima that generalize better',
      'SGD uses second-order information implicitly',
    ],
    answer: 2,
    explanation:
      'The stochastic noise in SGD acts as implicit regularization, helping the optimizer escape sharp minima (which tend to generalize poorly) and settle in flat minima (which tend to generalize well). Full-batch gradient descent converges to the nearest minimum regardless of its geometry.',
  },
  {
    id: 't7-q3',
    chapterId: 7,
    question:
      'The Adam optimizer combines which two techniques?',
    options: [
      'Momentum and Nesterov acceleration',
      'AdaGrad and learning rate warmup',
      'Momentum (first moment) and RMSProp (second moment) with bias correction',
      'Line search and trust region methods',
    ],
    answer: 2,
    explanation:
      'Adam maintains exponential moving averages of both the first moment (gradient mean, like momentum) and second moment (squared gradient mean, like RMSProp), with bias correction for the initial steps. This combination adapts learning rates per-parameter while benefiting from momentum.',
  },

  // ─── Topic 8: Convex Optimization ───
  {
    id: 't8-q1',
    chapterId: 8,
    question:
      'For a twice-differentiable function, convexity is equivalent to:',
    options: [
      'The gradient being zero at some point',
      'The Hessian being positive semidefinite everywhere',
      'The function having exactly one critical point',
      'The function being bounded below',
    ],
    answer: 1,
    explanation:
      'A twice-differentiable function is convex if and only if its Hessian matrix is positive semidefinite (all eigenvalues >= 0) at every point. This condition ensures the function curves upward in all directions.',
  },
  {
    id: 't8-q2',
    chapterId: 8,
    question:
      'What convergence rate does Newton\'s method achieve near the optimum for a function with Lipschitz-continuous Hessian?',
    options: [
      'Linear convergence',
      'Superlinear convergence',
      'Quadratic convergence',
      'Cubic convergence',
    ],
    answer: 2,
    explanation:
      'Newton\'s method achieves quadratic convergence near the optimum: the error squares at each iteration (||x_{k+1} - x*|| <= C ||x_k - x*||^2). This means the number of correct digits roughly doubles each iteration, but this fast rate only holds in a neighborhood of the solution.',
  },
  {
    id: 't8-q3',
    chapterId: 8,
    question:
      'Interior-point methods typically require how many Newton steps to converge for practical problems?',
    options: [
      '1-5 steps',
      '20-80 steps, largely independent of problem size',
      'O(n) steps where n is the number of variables',
      'O(n^2) steps',
    ],
    answer: 1,
    explanation:
      'Primal-dual interior-point methods typically converge in 20-80 Newton steps regardless of problem size. This near-constant iteration count, combined with the polynomial per-iteration cost, makes them extremely effective for large-scale optimization.',
  },

  // ─── Topic 9: Constrained Optimization (Lagrange, KKT) ───
  {
    id: 't9-q1',
    chapterId: 9,
    question:
      'The Lagrange multiplier lambda_i for the constraint h_i(x) = 0 can be interpreted as:',
    options: [
      'The optimal value of the objective function',
      'The rate of change of the optimal objective value with respect to perturbation of the constraint',
      'The step size needed to satisfy the constraint',
      'The distance from the current point to the constraint surface',
    ],
    answer: 1,
    explanation:
      'The Lagrange multiplier lambda_i measures the sensitivity (shadow price) of the optimal objective value to small perturbations in constraint i. If the constraint is relaxed from h_i = 0 to h_i = epsilon, the optimal value changes by approximately lambda_i * epsilon.',
  },
  {
    id: 't9-q2',
    chapterId: 9,
    question:
      'Which of the following is one of the four KKT conditions for inequality-constrained optimization?',
    options: [
      'The objective function must be convex',
      'Complementary slackness: mu_i * g_i(x) = 0 for each inequality constraint',
      'The Hessian must be positive definite',
      'All constraints must be active at the optimum',
    ],
    answer: 1,
    explanation:
      'Complementary slackness (mu_i * g_i(x) = 0) is one of the four KKT conditions, along with stationarity, primal feasibility, and dual feasibility (mu_i >= 0). It means each constraint is either active (g_i = 0) with mu_i >= 0, or inactive (g_i < 0) with mu_i = 0.',
  },
  {
    id: 't9-q3',
    chapterId: 9,
    question: 'Strong duality (zero duality gap) is guaranteed for convex problems when which condition holds?',
    options: [
      'The objective function is differentiable',
      'All constraints are linear',
      'Slater\'s condition: there exists a strictly feasible point',
      'The problem has a finite number of constraints',
    ],
    answer: 2,
    explanation:
      'Slater\'s constraint qualification requires the existence of a point strictly satisfying all inequality constraints (g_i(x) < 0). When this holds for convex problems, strong duality is guaranteed: the dual optimal value equals the primal optimal value.',
  },

  // ─── Topic 10: Floating Point & Error Analysis ───
  {
    id: 't10-q1',
    chapterId: 10,
    question:
      'Machine epsilon for IEEE 754 double precision is approximately:',
    options: ['1.2e-7', '2.2e-16', '1.1e-19', '5.0e-324'],
    answer: 1,
    explanation:
      'Machine epsilon for double precision (64-bit) is approximately 2.2 x 10^{-16}, corresponding to the 52-bit mantissa. This means every representable real number has at most about half a unit in the last place (ULP) of rounding error.',
  },
  {
    id: 't10-q2',
    chapterId: 10,
    question:
      'Catastrophic cancellation occurs when:',
    options: [
      'Multiplying two very large numbers',
      'Dividing by a number close to zero',
      'Subtracting two nearly equal floating-point numbers',
      'Adding numbers of vastly different magnitudes',
    ],
    answer: 2,
    explanation:
      'Catastrophic cancellation occurs when subtracting two nearly equal numbers, because the leading significant digits cancel and the result is dominated by rounding errors in the trailing digits. For example, if a and b agree in 12 digits, a - b retains only about 4 significant digits in double precision.',
  },
  {
    id: 't10-q3',
    chapterId: 10,
    question:
      'Kahan (compensated) summation reduces the error of summing n floating-point numbers from:',
    options: [
      'O(n^2 * epsilon) to O(n * epsilon)',
      'O(n * epsilon) to O(epsilon)',
      'O(sqrt(n) * epsilon) to O(epsilon)',
      'O(n * epsilon) to O(n * epsilon^2)',
    ],
    answer: 1,
    explanation:
      'Naive summation of n numbers accumulates O(n * epsilon) rounding error. Kahan summation uses a compensation variable to track the running rounding error, reducing the total to O(epsilon) regardless of n. This is a dramatic improvement for large n.',
  },

  // ─── Topic 11: Interpolation & Approximation ───
  {
    id: 't11-q1',
    chapterId: 11,
    question: 'Runge\'s phenomenon is best avoided by:',
    options: [
      'Using higher-degree polynomials on uniform grids',
      'Increasing the number of uniformly spaced points',
      'Using Chebyshev nodes that cluster near the endpoints',
      'Decreasing the interpolation interval',
    ],
    answer: 2,
    explanation:
      'Chebyshev nodes x_k = cos((2k+1)*pi/(2n+2)) cluster near the endpoints of the interval, minimizing the Lebesgue constant (which grows only as O(log n) instead of exponentially). This eliminates the wild oscillations near endpoints that characterize Runge\'s phenomenon on uniform grids.',
  },
  {
    id: 't11-q2',
    chapterId: 11,
    question:
      'The cubic spline coefficients are determined by solving what type of linear system?',
    options: [
      'A dense symmetric system',
      'A tridiagonal system',
      'An upper triangular system',
      'A block diagonal system',
    ],
    answer: 1,
    explanation:
      'The continuity conditions for cubic splines (matching function values, first and second derivatives at interior knots) produce a tridiagonal linear system, which can be solved in O(n) operations using the Thomas algorithm. This makes cubic spline interpolation very efficient.',
  },
  {
    id: 't11-q3',
    chapterId: 11,
    question:
      'The equioscillation theorem characterizes the best polynomial approximation in which norm?',
    options: [
      'L1 norm',
      'L2 norm',
      'L-infinity (minimax) norm',
      'Frobenius norm',
    ],
    answer: 2,
    explanation:
      'The equioscillation theorem states that the best degree-n polynomial approximation in the L-infinity (minimax) norm equioscillates at least n+2 times, meaning the error attains its maximum magnitude with alternating signs. This characterization is the basis of the Remez algorithm.',
  },

  // ─── Topic 12: Numerical Integration & ODEs ───
  {
    id: 't12-q1',
    chapterId: 12,
    question:
      'How many function evaluations does the classic RK4 (4th-order Runge-Kutta) method use per step?',
    options: ['1', '2', '4', '8'],
    answer: 2,
    explanation:
      'The classic RK4 method uses 4 function evaluations (stages) per step to achieve 4th-order accuracy (global error O(h^4)). Each evaluation samples the derivative at a different point within the step interval to build an accurate weighted average.',
  },
  {
    id: 't12-q2',
    chapterId: 12,
    question:
      'A-stability in an ODE solver means:',
    options: [
      'The method converges for all step sizes',
      'The entire left half of the complex plane is in the stability region',
      'The method is accurate to machine precision',
      'The method is explicit and requires no linear system solves',
    ],
    answer: 1,
    explanation:
      'A-stability means the stability region contains the entire left half of the complex plane {z : Re(z) <= 0}. This ensures that all decaying exponential modes (eigenvalues with negative real parts) remain stable regardless of the step size, which is essential for stiff problems.',
  },
  {
    id: 't12-q3',
    chapterId: 12,
    question:
      'n-point Gaussian quadrature is exact for polynomials up to degree:',
    options: ['n - 1', 'n', 'n + 1', '2n - 1'],
    answer: 3,
    explanation:
      'n-point Gaussian quadrature achieves the maximum possible algebraic degree of exactness by optimally choosing both nodes and weights. It is exact for polynomials up to degree 2n - 1, compared to degree n - 1 for n-point Newton-Cotes rules with prescribed (uniform) nodes.',
  },

  // ─── Topic 13: Fast Fourier Transform ───
  {
    id: 't13-q1',
    chapterId: 13,
    question:
      'The FFT reduces the DFT computation from O(n^2) to:',
    options: ['O(n)', 'O(n log n)', 'O(n sqrt(n))', 'O(n log^2 n)'],
    answer: 1,
    explanation:
      'The Cooley-Tukey FFT algorithm computes the n-point DFT in O(n log n) operations by recursively splitting the transform into smaller sub-transforms. For n = 2^20 (~1 million), this is a speedup of about 50,000x over the naive O(n^2) computation.',
  },
  {
    id: 't13-q2',
    chapterId: 13,
    question:
      'Computing the linear convolution of two sequences of length n via FFT requires:',
    options: [
      'One FFT of length n',
      'Two FFTs and one inverse FFT, each of length at least 2n - 1',
      'One FFT and one inverse FFT of length n',
      'n separate FFTs of length 1',
    ],
    answer: 1,
    explanation:
      'Linear convolution via FFT requires: (1) zero-pad both sequences to length >= 2n - 1 to avoid circular aliasing, (2) FFT both padded sequences, (3) multiply pointwise in frequency domain, (4) inverse FFT the product. This is three transforms total (two forward, one inverse).',
  },
  {
    id: 't13-q3',
    chapterId: 13,
    question:
      'Spectral methods for PDEs achieve what type of convergence for smooth, periodic problems?',
    options: [
      'Linear convergence',
      'Quadratic convergence',
      'Polynomial convergence',
      'Exponential (spectral) convergence',
    ],
    answer: 3,
    explanation:
      'Spectral methods achieve exponential (spectral) convergence for smooth, periodic problems: the error decreases as O(c^n) for some c < 1, where n is the number of modes. This is much faster than the algebraic convergence O(h^p) of finite difference or finite element methods, but requires smoothness.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
