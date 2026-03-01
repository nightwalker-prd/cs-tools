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
  { id: 1, title: 'Linear Algebra' },
  { id: 2, title: 'Matrix Methods' },
  { id: 3, title: 'Optimization' },
  { id: 4, title: 'Numerical Computing' },
];

export const topics: Topic[] = [
  // ─── Part 1: Linear Algebra ───
  {
    id: 1,
    title: 'Vectors, Matrices & Operations',
    part: 1,
    partTitle: 'Linear Algebra',
    summary:
      'Foundation of numerical methods covering vector spaces, matrix arithmetic, and the algebraic properties that govern computation with structured data.',
    concepts: [
      {
        id: 'vector-spaces',
        name: 'Vector Spaces & Subspaces',
        description:
          'A vector space is a set of objects (vectors) that can be added together and scaled by numbers (scalars) while satisfying closure, associativity, and distributivity axioms. Subspaces are subsets that are themselves vector spaces under the same operations.',
        keyPoints: [
          'A vector space over a field F requires closure under addition and scalar multiplication, an additive identity (zero vector), and additive inverses for every element. Common examples include R^n, the space of polynomials of degree at most n, and the space of m-by-n matrices.',
          'A subspace must contain the zero vector and be closed under addition and scalar multiplication. The column space, row space, and null space of a matrix are all important subspaces that characterize the matrix\'s behavior.',
          'The span of a set of vectors is the smallest subspace containing them, formed by all possible linear combinations. A basis is a linearly independent spanning set, and its size defines the dimension of the space.',
          'Linear independence means no vector in the set can be written as a linear combination of the others. Equivalently, the only solution to c_1*v_1 + ... + c_k*v_k = 0 is all coefficients being zero.',
          'The four fundamental subspaces of a matrix A (column space, null space, row space, left null space) are related by the rank-nullity theorem: rank(A) + nullity(A) = n, where n is the number of columns.',
        ],
        tradeoffs: [
          'Abstract vector space theory provides generality but can obscure concrete computational techniques needed for implementation.',
          'Working in higher-dimensional spaces offers modeling flexibility but makes visualization and geometric intuition harder to maintain.',
        ],
        realWorld: [
          'RGB color spaces form a 3D vector space where adding colors and adjusting brightness correspond to vector addition and scalar multiplication.',
          'In machine learning, feature vectors in R^n represent data points, and subspaces capture lower-dimensional structure in the data.',
          'Signal processing represents audio signals as vectors in high-dimensional spaces where operations like filtering become linear transformations.',
        ],
      },
      {
        id: 'matrix-operations',
        name: 'Matrix Arithmetic & Properties',
        description:
          'Matrices encode linear maps between vector spaces, and their arithmetic (addition, multiplication, transposition, inversion) governs how transformations compose and interact.',
        keyPoints: [
          'Matrix multiplication AB is defined when the number of columns of A equals the number of rows of B. The (i,j) entry of AB is the dot product of the i-th row of A with the j-th column of B, giving O(n^3) complexity for n-by-n matrices.',
          'Matrix multiplication is associative (A(BC) = (AB)C) and distributive (A(B+C) = AB + AC) but not commutative in general (AB != BA). This non-commutativity has deep consequences for numerical algorithms.',
          'The transpose of a product reverses order: (AB)^T = B^T A^T. A matrix is symmetric if A = A^T, and symmetric matrices have real eigenvalues and orthogonal eigenvectors, making them especially well-behaved numerically.',
          'A square matrix A is invertible if and only if det(A) != 0, equivalently if its columns are linearly independent. Computing the inverse explicitly via A^{-1} is almost never done in practice; solving Ax = b directly is more stable and efficient.',
          'Special matrix structures (diagonal, triangular, banded, sparse) enable dramatically faster algorithms. Triangular systems solve in O(n^2) via forward/back substitution instead of O(n^3) for general systems.',
        ],
        tradeoffs: [
          'Dense matrix storage provides simple indexing but wastes memory for sparse problems; sparse formats save memory but add indexing overhead.',
          'Computing A^{-1} explicitly is conceptually clear but numerically inferior to factorization-based approaches for solving linear systems.',
          'Block matrix algorithms improve cache utilization but add implementation complexity and require tuning for specific hardware.',
        ],
        realWorld: [
          'Computer graphics use 4x4 transformation matrices to compose rotations, translations, and projections for 3D rendering pipelines.',
          'Adjacency matrices represent graphs in social networks where matrix powers reveal path counts between users.',
          'Economic input-output models use matrices to track how industries supply goods to each other, with the Leontief inverse capturing total economic impact.',
        ],
      },
      {
        id: 'norms-inner-products',
        name: 'Norms, Inner Products & Orthogonality',
        description:
          'Norms measure vector and matrix sizes, inner products define angles and projections, and orthogonality provides the geometric backbone for decompositions and least-squares methods.',
        keyPoints: [
          'The L2 (Euclidean) norm ||x||_2 = sqrt(sum x_i^2) is the most common, but the L1 norm (sum |x_i|) promotes sparsity in optimization and the L-infinity norm (max |x_i|) measures worst-case error. Each norm induces a different geometry on the space.',
          'An inner product <u, v> generalizes the dot product and defines orthogonality (<u,v> = 0), angles (cos(theta) = <u,v>/(||u|| ||v||)), and projections. The Cauchy-Schwarz inequality |<u,v>| <= ||u|| ||v|| is fundamental to all inner product spaces.',
          'Orthogonal vectors are linearly independent, and an orthonormal basis (orthogonal unit vectors) simplifies nearly every computation: projections become dot products, coordinates become inner products, and matrices become easy to invert.',
          'The Gram-Schmidt process converts any basis into an orthonormal one by iteratively subtracting projections. Modified Gram-Schmidt is numerically more stable because it reduces accumulation of rounding errors.',
          'Matrix norms (Frobenius, spectral, etc.) measure how much a matrix can stretch vectors. The condition number kappa(A) = ||A|| ||A^{-1}|| quantifies sensitivity of solving Ax = b to perturbations in A or b.',
        ],
        tradeoffs: [
          'The L2 norm is differentiable everywhere and analytically convenient, but the L1 norm produces sparser solutions in regularization problems.',
          'Orthogonalization via Gram-Schmidt is straightforward but loses accuracy in floating point; Householder reflections are more stable but harder to implement.',
          'High condition numbers signal ill-conditioning but computing kappa(A) itself requires knowing ||A^{-1}||, which can be expensive.',
        ],
        realWorld: [
          'Recommendation systems use cosine similarity (derived from inner products) to find users or items with similar preference vectors.',
          'GPS positioning relies on least-squares fitting where orthogonal projections minimize the distance between measured and predicted satellite signals.',
          'Image compression via PCA depends on orthogonal projections onto principal components, which are eigenvectors of the covariance matrix.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Linear Transformations & Rank',
    part: 1,
    partTitle: 'Linear Algebra',
    summary:
      'Understanding how matrices represent linear maps, how rank characterizes the dimensionality of the image, and how changes of basis reveal the structure of transformations.',
    concepts: [
      {
        id: 'linear-transformations',
        name: 'Linear Maps & Matrix Representation',
        description:
          'A linear transformation T: V -> W satisfies T(au + bv) = aT(u) + bT(v). Every linear map between finite-dimensional spaces can be represented as a matrix once bases are chosen.',
        keyPoints: [
          'A function T is linear if and only if T(alpha*u + beta*v) = alpha*T(u) + beta*T(v) for all scalars alpha, beta and vectors u, v. This single condition encapsulates both additivity and homogeneity.',
          'The matrix representation of T depends on the choice of bases for the domain and codomain. Changing bases via invertible matrices P and Q gives the new representation as Q^{-1}AP, allowing us to find the simplest form.',
          'The kernel (null space) of T is the set of vectors mapped to zero, and the image (range) is the set of all possible outputs. The rank-nullity theorem states dim(ker T) + dim(im T) = dim(V).',
          'Composition of linear maps corresponds to matrix multiplication. If T: U -> V and S: V -> W, then (S compose T)(x) = S(T(x)) is represented by the matrix product BA where B represents S and A represents T.',
          'Injective (one-to-one) maps have trivial kernels, surjective (onto) maps have images equal to the entire codomain, and bijective maps are exactly the invertible linear transformations represented by invertible matrices.',
        ],
        tradeoffs: [
          'Matrix representations are concrete and computable but hide the basis-independent nature of the underlying linear map.',
          'Working with abstract linear maps provides conceptual clarity but requires choosing bases to perform actual computations.',
          'Dense matrix representations are simple but wasteful for transformations with special structure like permutations or circulant maps.',
        ],
        realWorld: [
          'Neural network layers without activation functions are linear transformations; the weight matrix is the matrix representation of the map from input features to output features.',
          'Finite impulse response (FIR) filters in signal processing are linear maps represented by Toeplitz matrices, where each output sample is a linear combination of input samples.',
          'Coordinate transformations in robotics use rotation and translation matrices to map points between sensor frames, joint frames, and world frames.',
        ],
      },
      {
        id: 'rank-nullity',
        name: 'Rank, Nullity & Fundamental Theorem',
        description:
          'The rank of a matrix is the dimension of its column space (equivalently, row space), and the rank-nullity theorem partitions the domain into the null space and a complement isomorphic to the range.',
        keyPoints: [
          'The rank of A equals the number of linearly independent columns, which equals the number of linearly independent rows, which equals the number of pivots in row echelon form. Rank can also be characterized as the number of nonzero singular values.',
          'The nullity of A is the dimension of its null space (kernel). The rank-nullity theorem states rank(A) + nullity(A) = n for an m-by-n matrix, providing a fundamental constraint on solutions to Ax = b.',
          'A system Ax = b is consistent if and only if b lies in the column space of A. When consistent, the solution set is a coset x_p + null(A), where x_p is any particular solution and null(A) captures all degrees of freedom.',
          'Row reduction (Gaussian elimination) is the standard method for computing rank, finding bases for the fundamental subspaces, and determining whether a system has zero, one, or infinitely many solutions.',
          'Low-rank matrices arise naturally in data: a rank-r matrix can be stored using O(r(m+n)) values instead of O(mn), which is the basis for low-rank approximation and matrix completion algorithms.',
        ],
        tradeoffs: [
          'Gaussian elimination is numerically reliable with partial pivoting but requires O(n^3) operations and does not exploit sparsity without specialized implementations.',
          'Determining numerical rank is complicated by floating-point errors; a threshold must be chosen to decide which singular values are "effectively zero."',
          'Low-rank approximations compress data dramatically but discard information that may be important for certain downstream tasks.',
        ],
        realWorld: [
          'Netflix-style recommendation engines model user-item rating matrices as approximately low-rank, filling in missing entries by exploiting this structure.',
          'In structural engineering, rank deficiency of a stiffness matrix indicates a mechanism (unrestrained motion) in the structure, signaling an underconstrained design.',
          'Dimensionality reduction in genomics uses rank to identify the effective number of independent gene expression patterns across thousands of samples.',
        ],
      },
      {
        id: 'change-of-basis',
        name: 'Change of Basis & Similarity',
        description:
          'Changing the coordinate system via an invertible matrix P transforms the matrix representation A to P^{-1}AP. Similar matrices represent the same linear map in different bases and share eigenvalues, determinant, and trace.',
        keyPoints: [
          'If A represents a linear map T in basis B, then P^{-1}AP represents T in basis B\' where P is the change-of-basis matrix whose columns are the new basis vectors expressed in the old basis.',
          'Similar matrices (A and P^{-1}AP for invertible P) have the same eigenvalues, determinant, trace, rank, and characteristic polynomial. These are basis-independent invariants of the underlying linear map.',
          'Diagonalization A = PDP^{-1} is possible when A has n linearly independent eigenvectors. The columns of P are the eigenvectors and D is diagonal with eigenvalues on the diagonal, making matrix powers trivial: A^k = PD^kP^{-1}.',
          'Not all matrices are diagonalizable. The Jordan normal form generalizes diagonalization and exists for every square matrix, using Jordan blocks to handle cases where there are not enough independent eigenvectors.',
          'Choosing the right basis can transform a complicated problem into a simple one. For example, the Fourier basis diagonalizes circulant matrices, and the eigenbasis diagonalizes symmetric matrices.',
        ],
        tradeoffs: [
          'Diagonalization provides the simplest matrix form but is not always possible and can be numerically unstable when eigenvectors are nearly parallel.',
          'The Jordan form always exists but is extremely sensitive to perturbations and is not used in numerical computation; the Schur decomposition is preferred.',
          'Orthogonal changes of basis (P^{-1} = P^T) are numerically stable but restrict the set of achievable canonical forms.',
        ],
        realWorld: [
          'Principal component analysis (PCA) finds an orthogonal change of basis that diagonalizes the covariance matrix, aligning axes with directions of maximum variance in the data.',
          'In quantum mechanics, changing from the position basis to the momentum basis (via Fourier transform) is a change of basis that simplifies the Schrodinger equation for free particles.',
          'Modal analysis in mechanical engineering changes to the eigenbasis of the mass-stiffness system, decoupling coupled oscillators into independent modes of vibration.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Eigenvalues & Eigenvectors',
    part: 1,
    partTitle: 'Linear Algebra',
    summary:
      'Eigenvalues and eigenvectors reveal the intrinsic axes and scaling factors of linear transformations, powering spectral methods across science and engineering.',
    concepts: [
      {
        id: 'eigenvalue-basics',
        name: 'Eigenvalue Problems & Characteristic Equation',
        description:
          'An eigenvector v of matrix A satisfies Av = lambda*v for some scalar eigenvalue lambda. The eigenvalues are roots of the characteristic polynomial det(A - lambda*I) = 0.',
        keyPoints: [
          'The equation Av = lambda*v means A stretches v by the factor lambda without changing its direction (or flipping it if lambda < 0). Eigenvectors define the natural coordinate axes of the transformation.',
          'The characteristic polynomial det(A - lambda*I) = 0 is a degree-n polynomial for an n-by-n matrix. By the fundamental theorem of algebra it has exactly n roots (counted with multiplicity) in the complex numbers.',
          'The trace of A equals the sum of eigenvalues and the determinant equals their product. These trace-determinant relationships provide quick checks and insights without computing all eigenvalues.',
          'The algebraic multiplicity of an eigenvalue is its multiplicity as a root of the characteristic polynomial. The geometric multiplicity is the dimension of the eigenspace. When geometric < algebraic, the matrix is not diagonalizable.',
          'The spectral radius rho(A) = max|lambda_i| governs the long-term behavior of A^k: the iteration x_{k+1} = Ax_k converges to zero if rho(A) < 1, diverges if rho(A) > 1, and the dominant eigenvector determines the direction for rho(A) = 1.',
        ],
        tradeoffs: [
          'The characteristic polynomial provides theoretical insight but finding its roots is numerically unstable for large n; iterative methods (QR algorithm) are always preferred in practice.',
          'Real matrices can have complex eigenvalues (in conjugate pairs), requiring complex arithmetic even when all inputs are real.',
          'Computing all eigenvalues costs O(n^3) with the QR algorithm; when only a few extreme eigenvalues are needed, iterative methods like Lanczos or Arnoldi are much faster.',
        ],
        realWorld: [
          'Google\'s PageRank algorithm computes the dominant eigenvector of a modified web link matrix to rank web pages by importance.',
          'Vibrational analysis of buildings and bridges finds eigenvalues of the structure\'s stiffness matrix to determine natural frequencies and avoid resonance.',
          'Stability analysis of control systems checks whether all eigenvalues of the system matrix have negative real parts, ensuring the system returns to equilibrium after perturbation.',
        ],
      },
      {
        id: 'spectral-theorem',
        name: 'Spectral Theorem & Symmetric Matrices',
        description:
          'The spectral theorem guarantees that every real symmetric matrix has real eigenvalues and a complete set of orthonormal eigenvectors, enabling the decomposition A = Q Lambda Q^T.',
        keyPoints: [
          'A real symmetric matrix A = A^T always has real eigenvalues and orthogonal eigenvectors. This means A = Q*Lambda*Q^T where Q is orthogonal (Q^T Q = I) and Lambda is diagonal with eigenvalues on the diagonal.',
          'Symmetric matrices arise naturally as Hessians of scalar functions, covariance matrices of random vectors, Gram matrices X^T X, and graph Laplacians. Their special structure makes them the best-behaved class of matrices numerically.',
          'The Rayleigh quotient R(x) = x^T A x / x^T x has the property that its stationary points are exactly the eigenvectors, and the stationary values are the corresponding eigenvalues. The minimum is lambda_min and the maximum is lambda_max.',
          'Positive definite matrices (symmetric with all eigenvalues > 0) define valid inner products and norms. They appear as covariance matrices, Hessians at minima, and kernel matrices. The Cholesky decomposition A = LL^T exploits positive definiteness.',
          'The min-max theorem (Courant-Fischer) characterizes eigenvalues variationally: lambda_k = min over k-dimensional subspaces S of max over unit vectors x in S of x^T A x. This provides bounds without computing eigenvalues explicitly.',
        ],
        tradeoffs: [
          'Symmetric eigenvalue algorithms are about 3x faster and more accurate than general-purpose ones, but the symmetry must be preserved throughout computation.',
          'The Cholesky factorization is 2x faster than LU for positive definite systems but fails if the matrix is not truly positive definite, which can happen with numerical perturbations.',
          'Storing the full spectral decomposition costs O(n^2) for the eigenvector matrix; for large sparse matrices, only a few eigenpairs are typically computed.',
        ],
        realWorld: [
          'Principal component analysis decomposes the symmetric covariance matrix to find orthogonal directions of maximum variance for dimensionality reduction in data science.',
          'Finite element methods in physics produce large symmetric positive definite stiffness matrices whose eigenvalues correspond to natural frequencies of the simulated structure.',
          'Spectral graph clustering uses eigenvectors of the symmetric graph Laplacian to partition networks into communities, as in social network analysis.',
        ],
      },
      {
        id: 'power-iteration',
        name: 'Power Method & Iterative Eigensolvers',
        description:
          'The power method repeatedly multiplies a vector by A to converge to the dominant eigenvector. Modern iterative methods (Lanczos, Arnoldi, QR iteration) extend this idea to find multiple eigenvalues efficiently.',
        keyPoints: [
          'The power method computes x_{k+1} = Ax_k / ||Ax_k|| starting from a random x_0. It converges to the eigenvector with the largest |lambda| at a rate proportional to |lambda_2/lambda_1|, where lambda_1 and lambda_2 are the two largest eigenvalues.',
          'Inverse iteration applies the power method to A^{-1} (by solving Ax_{k+1} = x_k) to find the smallest eigenvalue. Shifted inverse iteration (A - sigma I)^{-1} converges to the eigenvalue closest to sigma, enabling targeted eigenvalue computation.',
          'The QR algorithm transforms A into a sequence of similar matrices that converge to (quasi-)upper triangular form, revealing all eigenvalues simultaneously. With shifts, it achieves cubic convergence and is the workhorse of dense eigenvalue computation.',
          'The Lanczos algorithm is the method of choice for large sparse symmetric matrices. It builds an orthonormal basis for the Krylov subspace {b, Ab, A^2b, ...} and reduces A to a tridiagonal matrix whose eigenvalues approximate those of A.',
          'Arnoldi iteration generalizes Lanczos to nonsymmetric matrices, reducing A to upper Hessenberg form. ARPACK and its successors implement these methods and are used inside MATLAB\'s eigs and Python\'s scipy.sparse.linalg.',
        ],
        tradeoffs: [
          'The power method is simple and memory-efficient (one vector) but only finds one eigenvalue and converges slowly when the eigenvalue gap is small.',
          'The QR algorithm finds all eigenvalues reliably for dense matrices but costs O(n^3) per step and requires the full matrix in memory, making it impractical for large sparse problems.',
          'Lanczos/Arnoldi methods handle sparse matrices efficiently but suffer from loss of orthogonality in finite-precision arithmetic, requiring reorthogonalization strategies that add cost.',
        ],
        realWorld: [
          'Google\'s original PageRank computation used the power method on a matrix with billions of rows, exploiting the sparsity of the web graph and the method\'s low memory footprint.',
          'Quantum chemistry packages use Lanczos-type methods to find the ground state energy (smallest eigenvalue) of enormous Hamiltonian matrices representing molecular systems.',
          'Structural engineers use ARPACK-based solvers to find the lowest vibrational modes of finite element models with millions of degrees of freedom.',
        ],
      },
    ],
  },

  // ─── Part 2: Matrix Methods ───
  {
    id: 4,
    title: 'Matrix Decompositions (LU, QR, SVD)',
    part: 2,
    partTitle: 'Matrix Methods',
    summary:
      'Matrix factorizations break a matrix into products of simpler matrices, enabling efficient and stable solutions to linear systems, least-squares problems, and low-rank approximations.',
    concepts: [
      {
        id: 'lu-decomposition',
        name: 'LU Decomposition & Gaussian Elimination',
        description:
          'LU decomposition factors a matrix A = LU (or PA = LU with pivoting) into a lower triangular L and upper triangular U, systematizing Gaussian elimination for solving linear systems.',
        keyPoints: [
          'LU decomposition encodes Gaussian elimination: L records the multipliers used in elimination and U is the resulting row echelon form. Once computed in O(n^3/3) operations, any system Ax = b can be solved in O(n^2) by forward and back substitution.',
          'Partial pivoting (PA = LU) swaps rows to ensure the pivot element is the largest in the column, preventing division by small numbers that amplify rounding errors. In practice, partial pivoting is almost always sufficient for numerical stability.',
          'The LU factorization exists and is unique for any nonsingular matrix when combined with pivoting. Without pivoting, existence requires all leading principal minors to be nonzero.',
          'For symmetric positive definite matrices, the Cholesky decomposition A = LL^T is a specialized LU factorization that is twice as fast, requires half the storage, and is guaranteed to exist without pivoting.',
          'Band matrices (nonzeros confined near the diagonal) have LU factors that preserve the band structure, reducing the cost from O(n^3) to O(nb^2) where b is the bandwidth. This is crucial for finite element and finite difference discretizations.',
        ],
        tradeoffs: [
          'LU is the fastest general-purpose factorization for solving Ax = b but does not provide orthogonality or reveal rank as well as QR or SVD.',
          'Partial pivoting adds row swaps and bookkeeping but is essential for stability; complete pivoting is more stable but rarely worth the extra O(n^3) comparison cost.',
          'Storing L and U separately doubles memory compared to in-place factorization, but in-place variants overwrite A and lose the original matrix.',
        ],
        realWorld: [
          'Circuit simulation software (SPICE) solves millions of sparse linear systems per simulation using LU factorization of the circuit\'s nodal admittance matrix.',
          'Computational fluid dynamics codes factor large sparse systems arising from discretized Navier-Stokes equations using sparse LU (SuperLU, UMFPACK).',
          'Financial risk models solve systems of equations for portfolio optimization where the coefficient matrix changes slightly each day, and LU updates avoid full refactorization.',
        ],
      },
      {
        id: 'qr-decomposition',
        name: 'QR Decomposition & Orthogonalization',
        description:
          'QR decomposition factors A = QR into an orthogonal matrix Q and upper triangular R, providing numerical stability for solving least-squares problems and computing eigenvalues.',
        keyPoints: [
          'The QR factorization writes A = QR where Q has orthonormal columns and R is upper triangular. For an m-by-n matrix with m >= n, Q is m-by-n (thin QR) and R is n-by-n.',
          'Three main algorithms compute QR: Gram-Schmidt (conceptually simple, O(2mn^2)), Householder reflections (most commonly used, stable, O(2mn^2 - 2n^3/3)), and Givens rotations (best for sparse matrices or introducing zeros selectively).',
          'The QR factorization solves the least-squares problem min ||Ax - b||^2 stably: from A = QR, the normal equation becomes Rx = Q^T b, which is triangular and easy to solve without forming A^T A.',
          'QR iteration is the foundation of modern eigenvalue computation. Repeatedly factoring A_k = Q_k R_k and forming A_{k+1} = R_k Q_k converges to a triangular matrix (Schur form) with eigenvalues on the diagonal.',
          'Householder reflections H = I - 2vv^T are orthogonal matrices that zero out entries below the diagonal one column at a time. They are preferred over Gram-Schmidt because rounding errors do not accumulate across columns.',
        ],
        tradeoffs: [
          'QR is more stable than LU for least-squares and eigenvalue problems but costs about twice as much (2mn^2 vs mn^2) for solving square systems.',
          'Modified Gram-Schmidt is easier to implement and parallelize but still less stable than Householder for very ill-conditioned matrices.',
          'Householder QR cannot exploit sparsity well because reflections tend to fill in zeros; Givens rotations or sparse QR methods are needed for sparse problems.',
        ],
        realWorld: [
          'MATLAB and NumPy use Householder QR internally for their backslash operator when solving overdetermined systems (more equations than unknowns).',
          'Wireless communication systems use QR decomposition in MIMO detectors to separate signals from multiple antennas, reducing interference.',
          'Kalman filters in navigation systems use QR-based square-root filtering to maintain numerical stability in the covariance matrix update step.',
        ],
      },
      {
        id: 'svd',
        name: 'Singular Value Decomposition (SVD)',
        description:
          'The SVD factors any m-by-n matrix as A = U Sigma V^T, where U and V are orthogonal and Sigma is diagonal with nonnegative singular values. It is the most informative and versatile matrix decomposition.',
        keyPoints: [
          'The SVD A = U*Sigma*V^T exists for every matrix (any shape, any rank). The singular values sigma_1 >= sigma_2 >= ... >= 0 on the diagonal of Sigma measure the "importance" of each rank-1 component u_i * sigma_i * v_i^T.',
          'The rank of A equals the number of nonzero singular values. The condition number is sigma_max / sigma_min. The Frobenius norm is sqrt(sum of sigma_i^2). The SVD simultaneously reveals rank, conditioning, and the four fundamental subspaces.',
          'The Eckart-Young theorem states that the best rank-k approximation to A (in both the Frobenius and spectral norms) is obtained by keeping only the k largest singular values: A_k = sum_{i=1}^{k} sigma_i * u_i * v_i^T.',
          'Computing the full SVD costs O(min(m,n)^2 * max(m,n)) operations. Truncated SVD algorithms (randomized SVD, Lanczos bidiagonalization) compute only the top k singular values/vectors in O(mnk) time.',
          'The pseudoinverse A^+ = V Sigma^+ U^T (where Sigma^+ inverts nonzero singular values) gives the minimum-norm least-squares solution to Ax = b, handling rank-deficient systems gracefully.',
        ],
        tradeoffs: [
          'The SVD provides maximal information about a matrix but is the most expensive standard decomposition, roughly 4-10x slower than LU for square matrices.',
          'Truncated/randomized SVD is dramatically faster for low-rank approximation but provides only approximate singular values and requires choosing the target rank k.',
          'The SVD is basis-independent and optimal for low-rank approximation, but the singular vectors may lack interpretability compared to methods like NMF that enforce non-negativity.',
        ],
        realWorld: [
          'Image compression via SVD stores only the top k singular value triplets, reducing a 1000x1000 image from 1M values to about 2000k + k values with controllable quality.',
          'Latent semantic analysis (LSA) in natural language processing applies SVD to term-document matrices to discover hidden topic structure in text corpora.',
          'Noise reduction in sensor data retains only the dominant singular values, separating signal (large singular values) from noise (small singular values).',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Solving Linear Systems',
    part: 2,
    partTitle: 'Matrix Methods',
    summary:
      'Methods for solving Ax = b range from direct factorization approaches to iterative methods that exploit matrix structure, with the choice depending on size, sparsity, and conditioning.',
    concepts: [
      {
        id: 'direct-methods',
        name: 'Direct Methods (Factorization-Based)',
        description:
          'Direct methods compute an exact solution (up to rounding) by factoring the coefficient matrix. LU, Cholesky, and QR factorizations are the workhorses for dense systems.',
        keyPoints: [
          'The standard approach is: factor A once (O(n^3)), then solve for each right-hand side b via substitution (O(n^2)). This amortizes the expensive factorization cost when solving multiple systems with the same A.',
          'For symmetric positive definite systems, the Cholesky factorization A = LL^T is preferred: it is half the cost of LU, numerically stable without pivoting, and preserves positive definiteness.',
          'Sparse direct solvers (SuperLU, CHOLMOD, MUMPS) use fill-reducing orderings (approximate minimum degree, nested dissection) to minimize fill-in during factorization, keeping the factors sparse.',
          'The computational cost of sparse factorization depends heavily on the sparsity pattern. For 2D PDE discretizations on n-point meshes, nested dissection achieves O(n^{3/2}) complexity; for 3D problems, O(n^2).',
          'Pivoting strategies (partial, complete, rook) trade stability for cost. Partial pivoting (O(n^2) comparisons) is almost always sufficient; complete pivoting (O(n^3) comparisons) is needed only for very ill-conditioned matrices.',
        ],
        tradeoffs: [
          'Direct methods give solutions to machine precision but require O(n^3) time and O(n^2) memory for dense matrices, limiting them to moderate sizes (n < ~50,000).',
          'Sparse direct solvers handle millions of unknowns for 2D problems but fill-in makes them impractical for large 3D problems where iterative methods are preferred.',
          'Factorization is a one-time cost that pays off when solving many systems with the same A, but is wasteful if only one solve is needed and iterative methods converge quickly.',
        ],
        realWorld: [
          'Structural analysis software (NASTRAN, ABAQUS) solves sparse symmetric positive definite systems from finite element models using Cholesky factorization with fill-reducing orderings.',
          'Power grid simulation solves sparse linear systems representing Kirchhoff\'s laws at thousands of nodes using sparse LU factorization.',
          'Dense linear systems arise in boundary element methods for electromagnetic scattering, where direct solvers are used for moderate-size problems.',
        ],
      },
      {
        id: 'iterative-methods',
        name: 'Iterative Methods (Krylov Subspace)',
        description:
          'Iterative methods generate a sequence of approximate solutions that converge to the true solution, using only matrix-vector products. They are essential for large sparse systems where direct methods are too expensive.',
        keyPoints: [
          'Krylov subspace methods (CG, GMRES, BiCGSTAB) build solutions in the subspace span{b, Ab, A^2b, ..., A^{k-1}b}. They only need matrix-vector products with A (never the matrix entries themselves), making them ideal for implicitly defined operators.',
          'Conjugate Gradient (CG) is the gold standard for symmetric positive definite systems. It minimizes ||x - x*||_A over the Krylov subspace and converges in at most n steps (exactly in exact arithmetic), with convergence rate governed by sqrt(kappa(A)).',
          'GMRES handles general nonsymmetric systems by minimizing the residual ||b - Ax_k|| over the Krylov subspace. It stores all previous search directions (growing memory), so restarted GMRES(m) caps storage at m vectors at the cost of slower convergence.',
          'Preconditioning transforms the system to M^{-1}Ax = M^{-1}b where M approximates A and M^{-1} is cheap to apply. Good preconditioners (ILU, algebraic multigrid, domain decomposition) can reduce iteration counts from thousands to tens.',
          'Multigrid methods solve elliptic PDEs in O(n) operations by combining smoothing iterations on fine grids with coarse-grid corrections that eliminate low-frequency error components. They achieve optimal complexity for many structured problems.',
        ],
        tradeoffs: [
          'Iterative methods use O(n) memory per iteration (just vectors) but convergence is not guaranteed and depends on the spectrum and conditioning of A.',
          'CG is optimal for SPD systems but does not apply to nonsymmetric or indefinite systems; GMRES is general but memory grows with iterations.',
          'Preconditioning is essential for fast convergence but designing a good preconditioner is problem-specific and can be as difficult as solving the original problem.',
        ],
        realWorld: [
          'Weather prediction models solve enormous sparse linear systems (billions of unknowns) from atmospheric discretizations using preconditioned GMRES or CG.',
          'Machine learning frameworks use CG to solve large kernel systems in Gaussian process regression without forming the full kernel matrix.',
          'Reservoir simulation in oil and gas engineering uses algebraic multigrid preconditioned iterative solvers for coupled pressure-saturation equations.',
        ],
      },
      {
        id: 'conditioning-stability',
        name: 'Conditioning & Numerical Stability',
        description:
          'The condition number of a matrix quantifies how much input perturbations are amplified in the solution. Numerically stable algorithms ensure that rounding errors behave like small input perturbations.',
        keyPoints: [
          'The condition number kappa(A) = ||A|| * ||A^{-1}|| measures the worst-case relative amplification: a relative perturbation epsilon in b can cause a relative change up to kappa(A)*epsilon in the solution x of Ax = b.',
          'A matrix with kappa(A) ~ 10^k causes a loss of about k digits of accuracy in the solution. If kappa(A) ~ 10^{16}/epsilon_mach in double precision, the solution has no reliable digits.',
          'Backward stability means an algorithm computes the exact solution to a slightly perturbed problem: (A + delta_A)x_computed = b + delta_b where ||delta_A||/||A|| and ||delta_b||/||b|| are O(epsilon_mach). Gaussian elimination with partial pivoting is backward stable.',
          'The residual r = b - Ax_computed can be small even when the error ||x - x_computed|| is large, if A is ill-conditioned. Conversely, a small residual combined with a well-conditioned A guarantees a small error.',
          'Iterative refinement computes x_0 via direct solve, then repeatedly solves A*delta = b - Ax_k in higher precision to improve the solution. Mixed-precision iterative refinement (factor in single, refine in double) combines speed and accuracy.',
        ],
        tradeoffs: [
          'Well-conditioned problems are easy to solve accurately but many real-world problems (e.g., inverse problems, polynomial interpolation) are inherently ill-conditioned.',
          'Computing the exact condition number requires the SVD (O(n^3)); cheap estimates (e.g., LAPACK\'s condition estimator) provide O(n^2) approximations that are usually within a factor of 10.',
          'Iterative refinement improves accuracy cheaply but requires the residual to be computed in higher precision to be effective, which adds implementation complexity.',
        ],
        realWorld: [
          'Medical imaging (CT, MRI reconstruction) involves ill-conditioned inverse problems where regularization is essential to obtain meaningful solutions from noisy data.',
          'Geodetic surveying solves nearly singular normal equations when GPS satellite geometry is poor (high GDOP), and the condition number directly predicts positioning accuracy.',
          'Financial derivative pricing solves PDEs whose discretizations can become ill-conditioned near boundaries, requiring careful mesh design and stabilization.',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Least Squares & Linear Regression',
    part: 2,
    partTitle: 'Matrix Methods',
    summary:
      'Least squares finds the best-fit solution when a system is overdetermined, forming the mathematical basis for linear regression and many data fitting applications.',
    concepts: [
      {
        id: 'least-squares-formulation',
        name: 'Least Squares Problem & Normal Equations',
        description:
          'The least squares problem minimizes ||Ax - b||^2 for overdetermined systems (more equations than unknowns). The solution satisfies the normal equations A^T A x = A^T b.',
        keyPoints: [
          'When Ax = b has no exact solution (b is not in the column space of A), the least squares solution x* minimizes the sum of squared residuals: ||Ax - b||_2^2 = sum (a_i^T x - b_i)^2. Geometrically, Ax* is the projection of b onto the column space of A.',
          'The normal equations A^T A x = A^T b are derived by setting the gradient of ||Ax - b||^2 to zero. When A has full column rank, A^T A is symmetric positive definite and the solution is unique.',
          'Solving via normal equations (form A^T A, then Cholesky-solve) costs O(mn^2 + n^3/3) and is the fastest method, but squaring the condition number (kappa(A^T A) = kappa(A)^2) can cause accuracy loss for ill-conditioned problems.',
          'QR-based solution (factor A = QR, solve Rx = Q^T b) avoids forming A^T A and has condition number kappa(A) instead of kappa(A)^2. SVD-based solution (via pseudoinverse) handles rank-deficient cases and provides the minimum-norm solution.',
          'Weighted least squares minimizes sum w_i(a_i^T x - b_i)^2 by solving (A^T W A)x = A^T W b where W = diag(w_1, ..., w_m). This accounts for varying measurement reliability.',
        ],
        tradeoffs: [
          'Normal equations are fastest but numerically risky for ill-conditioned A; QR is 2x slower but much more stable; SVD is 5-10x slower but handles rank deficiency.',
          'Least squares assumes Gaussian errors to be statistically optimal (BLUE); for heavy-tailed distributions, robust regression (L1, Huber) is more appropriate but harder to solve.',
          'Adding more data points improves statistical reliability but increases computation; online/recursive least squares can update solutions incrementally.',
        ],
        realWorld: [
          'GPS positioning solves an overdetermined least squares system from satellite range measurements, minimizing the sum of squared range residuals to estimate receiver position.',
          'Calibration of scientific instruments fits sensor readings to reference standards using least squares, determining gain and offset parameters.',
          'Computer vision uses least squares to estimate camera parameters (focal length, position, orientation) from point correspondences between images.',
        ],
      },
      {
        id: 'linear-regression',
        name: 'Linear Regression & Statistical Inference',
        description:
          'Linear regression models the relationship y = X*beta + epsilon where epsilon is random noise. Least squares estimation of beta provides the best linear unbiased estimator (BLUE) under the Gauss-Markov conditions.',
        keyPoints: [
          'The design matrix X has rows corresponding to observations and columns to features (including a column of ones for the intercept). The least squares estimate beta_hat = (X^T X)^{-1} X^T y minimizes the residual sum of squares.',
          'The Gauss-Markov theorem states that among all linear unbiased estimators of beta, the least squares estimator has the smallest variance (it is BLUE) when errors are uncorrelated with zero mean and constant variance.',
          'The coefficient of determination R^2 = 1 - SS_res/SS_tot measures the fraction of variance explained by the model. Adjusted R^2 penalizes for the number of predictors to guard against overfitting.',
          'Multicollinearity (highly correlated predictors) inflates the variance of beta_hat and makes coefficients unreliable. The variance inflation factor (VIF) quantifies this, and regularization (ridge, lasso) mitigates it.',
          'Hypothesis tests on individual coefficients use the t-statistic beta_hat_j / se(beta_hat_j), where the standard error depends on the residual variance estimate and (X^T X)^{-1}. The F-test assesses the overall significance of the model.',
        ],
        tradeoffs: [
          'Simple linear regression is interpretable and computationally cheap but assumes linearity, which may not hold for complex relationships.',
          'Adding more features improves in-sample fit but risks overfitting; cross-validation or information criteria (AIC, BIC) help select the right model complexity.',
          'Ordinary least squares assumes homoscedastic uncorrelated errors; when violated, generalized least squares (GLS) or heteroscedasticity-robust standard errors are needed.',
        ],
        realWorld: [
          'Epidemiological studies use multiple regression to estimate the effect of risk factors (smoking, diet, exercise) on health outcomes while controlling for confounders.',
          'Real estate valuation models predict house prices from features like square footage, location, and number of bedrooms using linear regression.',
          'A/B testing in tech companies often uses regression to estimate treatment effects while controlling for user demographics and behavior covariates.',
        ],
      },
      {
        id: 'regularization',
        name: 'Regularization (Ridge, Lasso, Elastic Net)',
        description:
          'Regularization adds a penalty to the least squares objective to prevent overfitting and handle ill-conditioning. Ridge (L2), Lasso (L1), and Elastic Net combine bias for reduced variance.',
        keyPoints: [
          'Ridge regression minimizes ||Ax - b||^2 + lambda*||x||^2, giving the solution x = (A^T A + lambda I)^{-1} A^T b. The regularization parameter lambda shifts all singular values away from zero, improving conditioning at the cost of introducing bias.',
          'Lasso regression minimizes ||Ax - b||^2 + lambda*||x||_1, which promotes sparsity: many coefficients are driven exactly to zero, performing automatic feature selection. The L1 penalty makes the problem non-smooth, requiring specialized solvers (coordinate descent, ISTA/FISTA).',
          'Elastic Net combines L1 and L2 penalties: ||Ax - b||^2 + lambda_1*||x||_1 + lambda_2*||x||^2. It inherits sparsity from Lasso and grouping from Ridge, handling correlated features better than Lasso alone.',
          'The regularization parameter lambda (or alpha) controls the bias-variance tradeoff. Cross-validation (k-fold or leave-one-out) is the standard method for selecting lambda: too small gives overfitting, too large gives underfitting.',
          'From a Bayesian perspective, Ridge corresponds to a Gaussian prior on beta and Lasso to a Laplace prior. The maximum a posteriori (MAP) estimate under these priors coincides with the regularized least squares solution.',
        ],
        tradeoffs: [
          'Ridge shrinks all coefficients toward zero but never sets them exactly to zero; Lasso produces sparse solutions but can be unstable when features are correlated, arbitrarily selecting one from a correlated group.',
          'Stronger regularization reduces variance and prevents overfitting but increases bias, potentially missing real signal in the data.',
          'Cross-validation for lambda selection is robust but computationally expensive, requiring many refits; the regularization path (computing solutions for all lambda) via LARS or warm-starting amortizes this cost.',
        ],
        realWorld: [
          'Genomics uses Lasso regression to identify a small number of gene expression features (out of thousands) that predict disease outcomes.',
          'Finance uses Ridge regression to stabilize portfolio optimization when the covariance matrix is poorly estimated from limited historical data.',
          'Natural language processing applies Elastic Net to select relevant features from high-dimensional bag-of-words representations for text classification.',
        ],
      },
    ],
  },

  // ─── Part 3: Optimization ───
  {
    id: 7,
    title: 'Gradient Descent & Variants',
    part: 3,
    partTitle: 'Optimization',
    summary:
      'Gradient descent iteratively moves in the direction of steepest descent to minimize objective functions, with variants addressing convergence speed, stochasticity, and adaptive learning rates.',
    concepts: [
      {
        id: 'gradient-descent-basics',
        name: 'Gradient Descent Fundamentals',
        description:
          'Gradient descent updates x_{k+1} = x_k - alpha * grad f(x_k), moving in the direction of steepest descent of the objective function f. The learning rate alpha controls step size.',
        keyPoints: [
          'The gradient grad f(x) points in the direction of steepest ascent; negating it gives steepest descent. For a function with Lipschitz-continuous gradient (constant L), a learning rate alpha < 2/L guarantees convergence.',
          'Convergence rate for convex functions with learning rate 1/L is O(1/k) for function values. For strongly convex functions (condition number kappa), the rate improves to O((1 - 1/kappa)^k), which is linear (exponential decrease in error).',
          'The learning rate is the most critical hyperparameter. Too large causes divergence (overshooting), too small causes very slow convergence. Line search methods (backtracking, Wolfe conditions) adaptively choose the step size each iteration.',
          'The condition number kappa = L/mu (ratio of largest to smallest curvature) controls convergence speed. Ill-conditioned problems create elongated "valleys" in the loss landscape, causing gradient descent to zigzag slowly toward the minimum.',
          'Gradient descent only finds local minima in general. For convex functions, every local minimum is global, guaranteeing convergence to the optimal solution. For non-convex problems (neural networks), multiple restarts or stochastic methods help escape bad local minima.',
        ],
        tradeoffs: [
          'Gradient descent is simple and has low per-iteration cost (one gradient evaluation) but can be very slow for ill-conditioned problems compared to Newton\'s method.',
          'Fixed learning rates are simple but suboptimal; adaptive methods add overhead but converge faster in practice.',
          'Full-batch gradient descent uses exact gradients but is expensive when the dataset is large; mini-batch methods trade accuracy for computational efficiency.',
        ],
        realWorld: [
          'Training neural networks uses gradient descent (and its variants) to minimize the loss function over millions of parameters and billions of training examples.',
          'Logistic regression for classification is solved by gradient descent on the cross-entropy loss, converging to the maximum likelihood estimate.',
          'Hyperparameter optimization in AutoML uses gradient-based methods when the hyperparameter-to-validation-loss mapping is differentiable.',
        ],
      },
      {
        id: 'sgd-momentum',
        name: 'Stochastic Gradient Descent & Momentum',
        description:
          'SGD approximates the full gradient with a random subset (mini-batch), enabling training on massive datasets. Momentum accelerates convergence by accumulating velocity from past gradients.',
        keyPoints: [
          'SGD replaces the true gradient with an unbiased estimate from a random mini-batch of size B. The variance of the estimate is O(sigma^2/B), so larger batches give more accurate but more expensive gradient estimates.',
          'SGD converges at rate O(1/sqrt(k)) for convex problems (slower than full gradient descent\'s O(1/k)) but each iteration costs O(B) instead of O(n), making the total work per unit improvement much less when n >> B.',
          'Momentum v_{k+1} = beta*v_k + grad f(x_k), x_{k+1} = x_k - alpha*v_{k+1} accumulates past gradients like a ball rolling downhill. With momentum parameter beta ~ 0.9, it accelerates convergence through narrow valleys by filtering out oscillations.',
          'Nesterov accelerated gradient (NAG) evaluates the gradient at the "look-ahead" position x_k - alpha*beta*v_k instead of x_k, achieving the optimal O(1/k^2) convergence rate for smooth convex functions.',
          'Learning rate schedules (step decay, cosine annealing, warm-up) are essential for SGD in practice. Starting with a larger learning rate for exploration and gradually reducing it for fine-tuning often outperforms fixed rates.',
        ],
        tradeoffs: [
          'SGD is noisy but the noise helps escape sharp local minima and find flatter minima that generalize better; full-batch gradient descent converges to the nearest minimum which may generalize poorly.',
          'Larger mini-batches reduce gradient variance and enable parallelism but require proportionally larger learning rates and can degrade generalization.',
          'Momentum speeds convergence but adds a hyperparameter (beta) and can overshoot the minimum if the learning rate is not reduced appropriately.',
        ],
        realWorld: [
          'All major deep learning frameworks (PyTorch, TensorFlow, JAX) use SGD with momentum as their foundational optimizer, training models from GPT to ResNet.',
          'Online recommendation systems use SGD to update models incrementally as new user interactions arrive, avoiding expensive full retraining.',
          'Reinforcement learning algorithms (policy gradient, PPO) use stochastic gradient estimates from sampled trajectories to optimize agent behavior.',
        ],
      },
      {
        id: 'adaptive-optimizers',
        name: 'Adaptive Methods (Adam, RMSProp, AdaGrad)',
        description:
          'Adaptive optimizers maintain per-parameter learning rates that adjust based on gradient history, reducing the need for manual learning rate tuning.',
        keyPoints: [
          'AdaGrad divides the learning rate for each parameter by the square root of the sum of all past squared gradients. This gives smaller updates to frequently updated parameters and larger updates to rare ones, which is ideal for sparse features.',
          'RMSProp fixes AdaGrad\'s monotonically decreasing learning rate by using an exponential moving average of squared gradients: v_k = beta*v_{k-1} + (1-beta)*g_k^2. This "forgets" old gradients and adapts to the recent loss landscape.',
          'Adam combines momentum (first moment m_k) with RMSProp (second moment v_k) and includes bias correction for the initial steps: m_hat = m_k/(1-beta_1^k), v_hat = v_k/(1-beta_2^k), then updates x -= alpha * m_hat / (sqrt(v_hat) + epsilon).',
          'Adam\'s default hyperparameters (beta_1=0.9, beta_2=0.999, epsilon=1e-8) work well across a wide range of problems. However, Adam can fail to converge to the true optimum in some cases; AMSGrad and AdamW (with decoupled weight decay) address these issues.',
          'The choice between SGD+momentum and Adam is problem-dependent. SGD+momentum often achieves better final generalization in supervised learning with careful tuning, while Adam converges faster and requires less tuning, making it preferred for research and prototyping.',
        ],
        tradeoffs: [
          'Adaptive methods converge faster with less tuning but use 2-3x more memory (storing moment estimates per parameter) and can converge to sharper minima with worse generalization.',
          'AdaGrad is ideal for sparse problems but its learning rate can decay to zero too quickly for dense, non-convex optimization.',
          'Adam\'s fast initial convergence is appealing but SGD+momentum with a tuned schedule often produces better test accuracy for image classification and other well-studied tasks.',
        ],
        realWorld: [
          'Transformer models (BERT, GPT, T5) are almost universally trained with AdamW, which combines Adam\'s adaptive learning rates with proper L2 regularization.',
          'Natural language processing tasks with sparse word embeddings benefit from AdaGrad-like methods that give rare words larger updates.',
          'Generative adversarial networks (GANs) use Adam for both generator and discriminator training, where the adaptive rates help navigate the unstable min-max optimization landscape.',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Convex Optimization',
    part: 3,
    partTitle: 'Optimization',
    summary:
      'Convex optimization problems have the powerful property that every local minimum is a global minimum, enabling efficient and reliable algorithms with theoretical guarantees.',
    concepts: [
      {
        id: 'convexity-fundamentals',
        name: 'Convex Sets, Functions & Problems',
        description:
          'A convex function satisfies f(tx + (1-t)y) <= tf(x) + (1-t)f(y) for t in [0,1]. Minimizing a convex function over a convex set guarantees a unique global minimum (if it exists).',
        keyPoints: [
          'A set C is convex if the line segment between any two points in C lies entirely within C. A function f is convex if its epigraph {(x,t) : t >= f(x)} is a convex set, equivalently if f(tx + (1-t)y) <= tf(x) + (1-t)f(y).',
          'For twice-differentiable functions, convexity is equivalent to the Hessian being positive semidefinite everywhere. Strong convexity (Hessian >= mu*I for mu > 0) guarantees a unique minimizer and faster convergence rates.',
          'Standard convex problem forms include linear programs (LP: linear objective and constraints), quadratic programs (QP: quadratic objective, linear constraints), and semidefinite programs (SDP: matrix inequality constraints).',
          'Convexity is preserved under nonnegative weighted sums, composition with affine maps, pointwise maximum, and partial minimization. These rules help verify convexity and construct complex convex models from simple building blocks.',
          'Duality theory associates every convex minimization problem with a dual maximization problem. The dual bound is always <= the primal optimal, and under mild conditions (Slater\'s constraint qualification), strong duality holds: the gap is zero.',
        ],
        tradeoffs: [
          'Convex problems have strong theoretical guarantees but many practical problems (neural networks, combinatorial optimization) are inherently non-convex.',
          'More general convex problem classes (SDP > SOCP > QP > LP) can model more situations but have increasingly expensive solvers.',
          'Duality provides powerful analytical tools and certificates of optimality, but formulating and solving the dual can be nontrivial for complex problems.',
        ],
        realWorld: [
          'Portfolio optimization (Markowitz mean-variance) minimizes a convex quadratic risk function subject to linear constraints on expected return and budget.',
          'Support vector machines (SVMs) solve a convex QP to find the maximum-margin hyperplane separating two classes.',
          'Network flow optimization (min-cost flow, max flow) is inherently a linear program, solvable efficiently even for very large networks.',
        ],
      },
      {
        id: 'second-order-methods',
        name: 'Newton\'s Method & Second-Order Optimization',
        description:
          'Newton\'s method uses the Hessian (second derivatives) to take steps x_{k+1} = x_k - H^{-1} grad f(x_k), achieving quadratic convergence near the optimum at the cost of computing and inverting the Hessian.',
        keyPoints: [
          'Newton\'s method locally approximates f by a quadratic and exactly minimizes it, giving the update x_{k+1} = x_k - [nabla^2 f(x_k)]^{-1} * nabla f(x_k). Near a minimum with positive definite Hessian, convergence is quadratic: the error squares each iteration.',
          'The Newton step accounts for curvature, automatically scaling the step size in each direction by the inverse curvature. This eliminates the ill-conditioning that plagues gradient descent, making Newton independent of the condition number.',
          'Computing and factoring the n-by-n Hessian costs O(n^2) storage and O(n^3) factorization, limiting pure Newton to moderate dimensions (n < ~10,000). Quasi-Newton methods approximate the Hessian to reduce cost.',
          'L-BFGS (limited-memory BFGS) is the most popular quasi-Newton method. It stores only the last m gradient differences (typically m = 5-20) and implicitly approximates the inverse Hessian, requiring only O(mn) memory and O(mn) per step.',
          'Damped Newton and trust-region methods ensure global convergence by limiting step sizes when the quadratic model is not accurate. Trust-region methods solve a constrained subproblem min_p m_k(p) subject to ||p|| <= delta_k at each step.',
        ],
        tradeoffs: [
          'Newton converges in far fewer iterations than gradient descent but each iteration is much more expensive; the crossover depends on problem size and structure.',
          'Quasi-Newton methods (BFGS, L-BFGS) approximate second-order convergence with first-order cost but can be less effective for highly non-convex or stochastic problems.',
          'Trust-region methods are more robust than line-search Newton but add the overhead of solving a constrained subproblem at each iteration.',
        ],
        realWorld: [
          'Interior-point methods for linear and semidefinite programming use Newton\'s method on a barrier function to solve optimization problems in polynomial time.',
          'Large-scale logistic regression in industry uses L-BFGS as the default solver (scikit-learn, liblinear) because it converges in tens of iterations with minimal tuning.',
          'Robotics trajectory optimization uses trust-region Newton methods to find dynamically feasible paths that minimize energy or time.',
        ],
      },
      {
        id: 'interior-point-methods',
        name: 'Interior-Point Methods',
        description:
          'Interior-point methods solve constrained convex problems by following a central path through the interior of the feasible region, achieving polynomial-time complexity and excellent practical performance.',
        keyPoints: [
          'Interior-point (barrier) methods replace inequality constraints g_i(x) <= 0 with a logarithmic barrier: minimize f(x) - (1/t)*sum log(-g_i(x)). As t -> infinity, the barrier solution approaches the constrained optimum.',
          'The central path is the curve of optimal solutions x*(t) parameterized by the barrier parameter t. Interior-point methods follow this path by approximately solving the barrier problem for increasing values of t using Newton steps.',
          'Each Newton step on the barrier problem (one iteration of the inner loop) costs O(n^3) for dense problems or less for structured/sparse problems. The total number of Newton steps to achieve epsilon accuracy is O(sqrt(m) * log(1/epsilon)) where m is the number of constraints.',
          'Primal-dual interior-point methods simultaneously solve the primal and dual problems, using the duality gap as a convergence criterion. They are the most efficient variant in practice, requiring 20-80 Newton steps regardless of problem size.',
          'Modern interior-point solvers (MOSEK, Gurobi, CPLEX) exploit problem structure (sparsity, conic structure) and use sophisticated linear algebra (sparse Cholesky, iterative solvers) to handle problems with millions of variables and constraints.',
        ],
        tradeoffs: [
          'Interior-point methods have polynomial worst-case complexity and are fast for large problems, but their per-iteration cost (Newton step) is higher than simplex pivots for small problems.',
          'The barrier approach requires a strictly feasible starting point, which may be hard to find; phase-I methods or self-dual embedding address this at additional cost.',
          'Interior-point methods find a single optimal point and cannot easily enumerate vertices or perform sensitivity analysis, unlike the simplex method which naturally identifies active constraints.',
        ],
        realWorld: [
          'Airlines use interior-point solvers for crew scheduling problems with millions of variables, minimizing operational costs subject to regulatory and labor constraints.',
          'Chip design (VLSI placement) solves convex relaxations of placement problems using interior-point methods to minimize wire length.',
          'Energy grid operators use interior-point LP solvers for optimal power flow, dispatching generation to minimize cost while satisfying demand and transmission constraints.',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Constrained Optimization (Lagrange, KKT)',
    part: 3,
    partTitle: 'Optimization',
    summary:
      'Lagrange multipliers and KKT conditions provide the theoretical framework for optimizing functions subject to equality and inequality constraints, unifying constrained optimization theory.',
    concepts: [
      {
        id: 'lagrange-multipliers',
        name: 'Lagrange Multipliers & Equality Constraints',
        description:
          'The method of Lagrange multipliers converts a constrained optimization problem into an unconstrained one by introducing dual variables (multipliers) for each constraint. At the optimum, the gradient of the objective is a linear combination of constraint gradients.',
        keyPoints: [
          'For min f(x) subject to h_i(x) = 0 (i = 1,...,p), the Lagrangian is L(x, lambda) = f(x) + sum lambda_i h_i(x). The necessary conditions for optimality are grad_x L = 0 and h_i(x) = 0 for all i.',
          'The condition grad f(x*) = -sum lambda_i grad h_i(x*) means the objective gradient lies in the span of the constraint gradients at the optimum. Geometrically, the level set of f is tangent to the constraint surface.',
          'The Lagrange multiplier lambda_i has an economic interpretation: it measures the rate of change of the optimal objective value with respect to a perturbation in the i-th constraint (the "shadow price" of relaxing the constraint).',
          'The constraint qualification (e.g., linear independence of constraint gradients, LICQ) must hold for the Lagrange conditions to be necessary. Without it, the multipliers may not exist or may be non-unique.',
          'For quadratic objectives with linear equality constraints (min x^T H x / 2 + c^T x s.t. Ax = b), the Lagrange conditions give the KKT system [H, A^T; A, 0][x; lambda] = [-c; b], a structured saddle-point system.',
        ],
        tradeoffs: [
          'Lagrange multipliers elegantly reduce constrained problems to systems of equations, but the resulting system may be larger, indefinite, and harder to solve than the original problem.',
          'The multiplier values provide valuable sensitivity information but only at the cost of solving for them alongside the primal variables.',
          'Augmented Lagrangian methods improve convergence by adding a penalty term, but introduce a penalty parameter that must be tuned.',
        ],
        realWorld: [
          'Thermodynamic equilibrium calculations minimize Gibbs free energy subject to conservation of mass constraints, with Lagrange multipliers representing chemical potentials.',
          'Antenna array beamforming minimizes interference subject to signal constraints, where Lagrange multipliers determine the optimal trade-off between signal preservation and noise rejection.',
          'Constrained statistical estimation (e.g., maximum entropy distributions) uses Lagrange multipliers to enforce moment constraints, with multipliers determining the distribution parameters.',
        ],
      },
      {
        id: 'kkt-conditions',
        name: 'KKT Conditions & Inequality Constraints',
        description:
          'The Karush-Kuhn-Tucker (KKT) conditions extend Lagrange multipliers to handle inequality constraints, introducing complementary slackness as the key additional condition.',
        keyPoints: [
          'For min f(x) subject to g_i(x) <= 0 and h_j(x) = 0, the KKT conditions are: (1) stationarity: grad f + sum mu_i grad g_i + sum lambda_j grad h_j = 0, (2) primal feasibility, (3) dual feasibility: mu_i >= 0, and (4) complementary slackness: mu_i g_i(x) = 0.',
          'Complementary slackness means each inequality constraint is either active (g_i = 0, mu_i >= 0) or inactive (g_i < 0, mu_i = 0). This partitions constraints into binding and non-binding ones at the solution.',
          'For convex problems, the KKT conditions are both necessary and sufficient for global optimality (given a constraint qualification). For non-convex problems, they are only necessary conditions for local optimality.',
          'The dual feasibility condition mu_i >= 0 reflects that inequality constraints can only "push" in one direction. Violating this would mean the constraint is trying to pull the solution into the infeasible region.',
          'Active set methods solve the KKT system by guessing which constraints are active, solving the equality-constrained subproblem, and iterating. The simplex method for LP is a specialized active set method that moves along vertices of the feasible polytope.',
        ],
        tradeoffs: [
          'KKT conditions provide a complete characterization of optimality for convex problems but only necessary conditions for non-convex ones, potentially admitting non-optimal KKT points.',
          'Active set methods work well when the active set is small but their worst-case complexity can be exponential (as with the simplex method, which is exponential in theory but fast in practice).',
          'Penalty methods avoid explicitly handling constraints but require increasingly large penalty parameters that cause numerical ill-conditioning.',
        ],
        realWorld: [
          'Support vector machines identify support vectors (data points where the KKT complementary slackness condition mu_i > 0 and g_i = 0 holds) as the critical points defining the decision boundary.',
          'Economic equilibrium models use KKT conditions to determine market clearing prices, where complementary slackness corresponds to the economic principle that excess supply implies zero price.',
          'Structural optimization uses KKT conditions to find minimum-weight designs subject to stress and displacement constraints, with multipliers indicating which constraints drive the design.',
        ],
      },
      {
        id: 'duality-theory',
        name: 'Duality & Sensitivity Analysis',
        description:
          'Every constrained optimization problem has an associated dual problem. Strong duality (zero gap between primal and dual optima) holds for convex problems and provides optimality certificates and sensitivity information.',
        keyPoints: [
          'The Lagrangian dual function g(lambda, mu) = inf_x L(x, lambda, mu) provides a lower bound on the optimal primal value for any dual-feasible (lambda, mu >= 0). The dual problem maximizes this lower bound: max g(lambda, mu) subject to mu >= 0.',
          'Weak duality (dual optimal <= primal optimal) always holds. Strong duality (equality) holds for convex problems satisfying Slater\'s condition (existence of a strictly feasible point). The duality gap is zero at optimality.',
          'The dual variables at optimality (lambda*, mu*) are exactly the Lagrange/KKT multipliers. They provide sensitivity information: the optimal value changes by approximately lambda_i * delta_b_i when constraint i is perturbed by delta_b_i.',
          'Linear programming has particularly strong duality: the dual of a LP is also a LP, strong duality always holds (no constraint qualification needed), and complementary slackness connects primal and dual solutions directly.',
          'Semidefinite programming (SDP) duality extends LP duality to matrix-valued variables and constraints. SDP duality underpins relaxations for NP-hard combinatorial problems (MAX-CUT, graph coloring) and provides provable approximation guarantees.',
        ],
        tradeoffs: [
          'The dual problem can be easier to solve than the primal (e.g., fewer variables, simpler constraints) but deriving and implementing the dual adds analytical effort.',
          'Strong duality provides exact optimality certificates, but Slater\'s condition may be hard to verify for complex problem formulations.',
          'Sensitivity analysis via dual variables is local (first-order) and may not predict behavior under large perturbations; parametric programming provides global sensitivity but is much more expensive.',
        ],
        realWorld: [
          'Telecommunications network design uses dual decomposition to break a large optimization into smaller subproblems that can be solved independently on different processors.',
          'Electricity market pricing derives from dual variables of the optimal power flow problem: the Lagrange multiplier for power balance at each node is the locational marginal price.',
          'Machine learning uses duality to derive the kernel trick for SVMs: the dual formulation depends on data only through inner products, enabling nonlinear classification via kernel functions.',
        ],
      },
    ],
  },

  // ─── Part 4: Numerical Computing ───
  {
    id: 10,
    title: 'Floating Point & Error Analysis',
    part: 4,
    partTitle: 'Numerical Computing',
    summary:
      'Computers represent real numbers with finite precision using the IEEE 754 floating-point standard. Understanding rounding errors, cancellation, and error propagation is essential for writing reliable numerical software.',
    concepts: [
      {
        id: 'ieee-754',
        name: 'IEEE 754 Floating-Point Representation',
        description:
          'IEEE 754 represents real numbers as (-1)^s * 1.mantissa * 2^{exponent}, with fixed bit widths for sign (1), exponent (8 or 11), and mantissa (23 or 52) in single or double precision.',
        keyPoints: [
          'Double precision (64 bits) uses 1 sign bit, 11 exponent bits (biased by 1023), and 52 mantissa bits (with an implicit leading 1). This gives about 15-16 decimal digits of precision and a range from ~5e-324 to ~1.8e+308.',
          'Machine epsilon (epsilon_mach ~ 2.2e-16 for double) is the smallest number such that fl(1 + epsilon_mach) != 1 in floating-point. Every real number x in the representable range satisfies |fl(x) - x| / |x| <= epsilon_mach / 2.',
          'Special values include +/- infinity (overflow), NaN (0/0, sqrt(-1)), and subnormal numbers (gradual underflow near zero with reduced precision). Proper handling of these values prevents silent numerical failures.',
          'Floating-point arithmetic is not associative: (a + b) + c != a + (b + c) in general because rounding occurs after each operation. This means results can depend on the order of operations and even on compiler optimizations.',
          'The IEEE 754 standard mandates that the basic operations (+, -, *, /, sqrt) produce the correctly rounded result: the output is the nearest representable floating-point number to the exact mathematical result. This determinism is the foundation of backward error analysis.',
        ],
        tradeoffs: [
          'Double precision provides ample range and precision for most applications but uses 8 bytes per number; half precision (16 bits) and single precision (32 bits) save memory and bandwidth at the cost of accuracy.',
          'Subnormal numbers prevent a "gap" at zero but are much slower on some hardware (up to 100x), leading some high-performance codes to flush subnormals to zero.',
          'Strict IEEE 754 compliance ensures reproducibility but prevents some compiler optimizations (e.g., fused multiply-add, reassociation) that could improve performance.',
        ],
        realWorld: [
          'GPU-accelerated deep learning uses mixed precision (FP16 computation, FP32 accumulation) to double throughput while maintaining model accuracy through loss scaling.',
          'Financial calculations require careful rounding: the Patriot missile failure in 1991 was caused by accumulated floating-point error in a time counter, resulting in a 0.34-second tracking error.',
          'Climate models run for millions of time steps where floating-point error accumulation can affect long-term predictions, requiring careful algorithm design and validation.',
        ],
      },
      {
        id: 'error-propagation',
        name: 'Catastrophic Cancellation & Error Propagation',
        description:
          'Catastrophic cancellation occurs when subtracting nearly equal numbers, destroying significant digits. Error propagation analysis tracks how input and intermediate errors affect the final result.',
        keyPoints: [
          'Subtracting two nearly equal numbers a and b magnifies their relative error. If a and b agree in their first k digits, then a - b has at most (16 - k) significant digits in double precision. This is catastrophic cancellation.',
          'The classic example is the quadratic formula: for b^2 >> 4ac, one root x = (-b + sqrt(b^2-4ac))/(2a) suffers cancellation. The fix uses the identity x1*x2 = c/a to compute the second root from the first without cancellation.',
          'Forward error analysis tracks absolute or relative error from inputs to outputs: if x has error delta_x, then f(x + delta_x) - f(x) ~ f\'(x)*delta_x. The condition number |x*f\'(x)/f(x)| determines the amplification factor.',
          'Backward error analysis asks: for what perturbed input x_tilde does the computed result equal f(x_tilde) exactly? A backward stable algorithm produces small backward errors, and the forward error is then bounded by the condition number times the backward error.',
          'Compensated summation (Kahan summation) maintains a running compensation variable to track the rounding error at each addition, reducing the error of summing n numbers from O(n * epsilon) to O(epsilon) regardless of n.',
        ],
        tradeoffs: [
          'Rearranging formulas to avoid cancellation improves accuracy but can make code less readable and harder to maintain.',
          'Kahan summation is effective and low-overhead but requires careful implementation and may be defeated by aggressive compiler optimizations that reorder operations.',
          'Using higher precision (e.g., double-double or quad precision) is a simple fix for precision issues but is 2-10x slower and not always available in hardware.',
        ],
        realWorld: [
          'Computing sample variance using the naive formula sum(x_i^2)/n - mean^2 suffers catastrophic cancellation when the variance is small relative to the mean; Welford\'s online algorithm avoids this.',
          'Numerical integration of oscillatory functions can accumulate cancellation errors over many subintervals, requiring specialized methods like Filon or Levin integration.',
          'Geophysical inversion problems involve subtraction of large, nearly equal geological measurements where cancellation can destroy the signal of interest.',
        ],
      },
      {
        id: 'numerical-stability',
        name: 'Stability of Algorithms & Mixed Precision',
        description:
          'An algorithm is numerically stable if it produces results that are the exact answer to a nearby problem. Stability analysis guides algorithm selection and the emerging use of mixed-precision computing.',
        keyPoints: [
          'A numerically stable algorithm ensures that rounding errors behave as if the input were slightly perturbed. Combined with a well-conditioned problem, this guarantees accurate results. An unstable algorithm can produce large errors even for well-conditioned problems.',
          'Gaussian elimination without pivoting is unstable (errors can grow exponentially), but with partial pivoting, the growth factor is bounded by 2^{n-1} in theory and rarely exceeds ~10 in practice, making it stable for all practical purposes.',
          'Orthogonal transformations (Householder, Givens) are perfectly conditioned (condition number 1 for orthogonal matrices), making QR-based algorithms inherently more stable than LU-based ones for least-squares and eigenvalue problems.',
          'Mixed-precision computing performs bulk computation in low precision (FP16 or FP32) and uses high precision (FP64) for critical accumulations and refinements. This can provide 2-4x speedup while maintaining the accuracy of full double precision.',
          'Interval arithmetic replaces each number with an interval guaranteed to contain the true value, providing rigorous error bounds. It is expensive (2x the operations, limited hardware support) but essential when verified results are required.',
        ],
        tradeoffs: [
          'Stable algorithms are preferred but may be slower than unstable ones; for example, Householder QR is more stable than classical Gram-Schmidt but harder to parallelize.',
          'Mixed-precision methods offer significant speedups on modern GPUs but require careful analysis to ensure the low-precision errors do not accumulate beyond acceptable levels.',
          'Interval arithmetic provides guaranteed bounds but produces overly pessimistic intervals for long computations due to the wrapping effect, and is 2-10x slower than standard floating-point.',
        ],
        realWorld: [
          'Modern GPU architectures (NVIDIA Tensor Cores) are explicitly designed for mixed-precision computation, offering 8x throughput for FP16 compared to FP64.',
          'Safety-critical systems (avionics, nuclear reactor control) use interval arithmetic to verify that numerical results are within acceptable tolerances regardless of rounding.',
          'The LAPACK numerical linear algebra library chooses between algorithms (e.g., Householder vs. Givens QR) based on stability and performance trade-offs for different matrix structures.',
        ],
      },
    ],
  },
  {
    id: 11,
    title: 'Interpolation & Approximation',
    part: 4,
    partTitle: 'Numerical Computing',
    summary:
      'Interpolation constructs functions that pass through given data points, while approximation finds the best fit in some norm. The choice of basis functions and node placement critically affects accuracy and stability.',
    concepts: [
      {
        id: 'polynomial-interpolation',
        name: 'Polynomial Interpolation & Runge\'s Phenomenon',
        description:
          'Given n+1 data points, there exists a unique polynomial of degree at most n passing through all of them. However, high-degree polynomial interpolation on uniformly spaced points can diverge wildly (Runge\'s phenomenon).',
        keyPoints: [
          'The Lagrange interpolation formula expresses the interpolating polynomial as p(x) = sum y_i * L_i(x) where L_i(x) = prod_{j!=i} (x-x_j)/(x_i-x_j). Each L_i is 1 at x_i and 0 at all other nodes.',
          'Newton\'s divided difference form p(x) = sum c_i * prod_{j<i}(x - x_j) allows incremental construction: adding a new point requires only one new coefficient. The divided differences can be computed in O(n^2) with a triangular table.',
          'Runge\'s phenomenon: interpolating f(x) = 1/(1+25x^2) on [-1,1] with uniformly spaced points causes oscillations near the endpoints that grow exponentially with degree. This is a fundamental limitation of polynomial interpolation on uniform grids.',
          'Chebyshev nodes x_k = cos((2k+1)pi/(2n+2)) cluster near the endpoints of [-1,1] and minimize the maximum interpolation error. They eliminate Runge\'s phenomenon and achieve near-optimal polynomial approximation.',
          'The Lebesgue constant Lambda_n = max ||sum |L_i(x)| || measures how much interpolation amplifies data perturbations. For uniform nodes, Lambda_n grows exponentially; for Chebyshev nodes, it grows only as O(log n).',
        ],
        tradeoffs: [
          'Polynomial interpolation is simple and well-understood but poorly suited for large numbers of points on uniform grids due to Runge\'s phenomenon.',
          'Chebyshev nodes provide near-optimal approximation but require freedom to choose node locations, which is not always available with experimental data.',
          'Lagrange form is elegant but numerically unstable for evaluation; barycentric Lagrange interpolation is O(n) per evaluation and numerically stable.',
        ],
        realWorld: [
          'Spectral methods in computational physics use Chebyshev interpolation to solve differential equations with exponential convergence for smooth solutions.',
          'Computer-aided design (CAD) systems use polynomial interpolation to construct smooth curves through user-specified control points.',
          'Numerical quadrature rules (Gauss-Legendre, Clenshaw-Curtis) are derived from polynomial interpolation at optimally chosen nodes.',
        ],
      },
      {
        id: 'spline-interpolation',
        name: 'Spline Interpolation',
        description:
          'Splines are piecewise polynomials that join smoothly at the data points (knots). Cubic splines provide C^2 continuity with low-degree pieces, avoiding the oscillation problems of high-degree polynomials.',
        keyPoints: [
          'A cubic spline is a piecewise cubic polynomial with continuous first and second derivatives at each interior knot. On n+1 points, this gives 4n coefficients determined by 4n conditions (interpolation, continuity, and two boundary conditions).',
          'Natural splines set the second derivative to zero at the endpoints (S\'\'(x_0) = S\'\'(x_n) = 0). Not-a-knot splines enforce continuity of the third derivative at the second and penultimate knots. Clamped splines specify the first derivative at the endpoints.',
          'The cubic spline coefficients are determined by solving a tridiagonal linear system, which costs only O(n) operations via the Thomas algorithm. This makes spline interpolation efficient even for large datasets.',
          'Spline interpolation error for a function f with bounded fourth derivative satisfies |f(x) - S(x)| <= (5/384) * h^4 * max|f^{(4)}|, where h is the maximum knot spacing. This O(h^4) convergence is excellent for smooth functions.',
          'B-splines provide a numerically stable basis for the space of splines. Each B-spline B_i(x) has compact support (nonzero on only a few intervals), leading to sparse matrices and efficient computation. NURBS (Non-Uniform Rational B-Splines) extend B-splines to model conic sections exactly.',
        ],
        tradeoffs: [
          'Cubic splines avoid Runge\'s phenomenon and provide C^2 smoothness but cannot achieve the exponential convergence of Chebyshev interpolation for analytic functions.',
          'B-spline bases are numerically stable and lead to sparse systems but require more sophisticated data structures than simple polynomial interpolation.',
          'Higher-order splines (quintic, etc.) provide smoother interpolants but the increased degree adds complexity without proportional benefit for most applications.',
        ],
        realWorld: [
          'Font rendering (TrueType, OpenType) uses quadratic and cubic B-splines to define the outlines of each glyph, enabling smooth scaling to any size.',
          'Robot path planning uses cubic splines to create smooth, continuous trajectories through waypoints that respect velocity and acceleration limits.',
          'Financial yield curve construction uses cubic spline interpolation to produce smooth interest rate curves from a discrete set of market-observed rates.',
        ],
      },
      {
        id: 'approximation-theory',
        name: 'Best Approximation & Least-Squares Fitting',
        description:
          'Approximation theory seeks the best representation of a function in a simpler class (polynomials, trigonometric polynomials). The choice of norm (L2, L-infinity, L1) leads to different optimal approximations.',
        keyPoints: [
          'The Weierstrass approximation theorem guarantees that any continuous function on [a,b] can be uniformly approximated to arbitrary accuracy by polynomials. However, the rate of convergence depends on the smoothness of the function.',
          'Least-squares (L2) approximation minimizes the integral of the squared error and produces the orthogonal projection onto the approximation subspace. For polynomial approximation, using orthogonal polynomials (Legendre, Chebyshev) as a basis ensures a well-conditioned system.',
          'Minimax (L-infinity) approximation minimizes the maximum error and is characterized by the equioscillation theorem: the best degree-n polynomial approximation equioscillates (attains its maximum error with alternating sign) at least n+2 times.',
          'Fourier series approximate periodic functions using trigonometric polynomials. The coefficients are computed via inner products, and the rate of decay of Fourier coefficients reflects the smoothness of the function (faster decay for smoother functions).',
          'Pade approximation uses rational functions (ratio of polynomials) instead of polynomials, providing much better approximation for functions with poles or branch points. The [m/n] Pade approximant matches the first m+n+1 Taylor coefficients.',
        ],
        tradeoffs: [
          'L2 approximation is computationally straightforward (linear systems) but can tolerate large pointwise errors; L-infinity gives uniform accuracy but requires iterative algorithms (Remez).',
          'Polynomial approximation converges exponentially for analytic functions but only algebraically for functions with limited smoothness; piecewise approximation (splines) handles non-smooth functions better.',
          'Rational approximation is far more powerful than polynomial for certain function classes but introduces nonlinearity and potential poles that complicate computation.',
        ],
        realWorld: [
          'Math library implementations of sin, cos, exp, log use minimax polynomial or rational approximations optimized via the Remez algorithm to achieve machine-precision accuracy in a few floating-point operations.',
          'Signal processing uses Fourier series and windowed Fourier transforms to analyze frequency content of signals, with approximation theory governing spectral leakage and resolution.',
          'Medical imaging reconstruction uses approximation theory to determine how many measurements (projections) are needed to reconstruct an image to a desired resolution.',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Numerical Integration & ODEs',
    part: 4,
    partTitle: 'Numerical Computing',
    summary:
      'Numerical integration (quadrature) approximates definite integrals, while ODE solvers approximate solutions to differential equations. Both trade accuracy for computational cost through step size and method order.',
    concepts: [
      {
        id: 'numerical-quadrature',
        name: 'Numerical Quadrature (Integration)',
        description:
          'Quadrature rules approximate integrals as weighted sums of function evaluations: integral of f ~ sum w_i f(x_i). The choice of nodes x_i and weights w_i determines the accuracy and efficiency.',
        keyPoints: [
          'Newton-Cotes rules use equally spaced nodes: the trapezoidal rule (2 nodes, error O(h^2)) and Simpson\'s rule (3 nodes, error O(h^4)) are the most common. Composite rules apply a basic rule on each subinterval, achieving global error O(h^p) for a rule of order p.',
          'Gaussian quadrature chooses both nodes and weights to maximize the polynomial degree of exactness. n-point Gauss-Legendre quadrature is exact for polynomials up to degree 2n-1, giving O(h^{2n}) error vs. O(h^{n+1}) for n-point Newton-Cotes.',
          'Adaptive quadrature compares two estimates of different orders (e.g., Simpson and trapezoidal) to estimate the local error, then subdivides intervals where the error exceeds a tolerance. This concentrates effort where the integrand varies rapidly.',
          'Romberg integration applies Richardson extrapolation to the trapezoidal rule, systematically eliminating error terms to achieve high accuracy. It combines the simplicity of the trapezoidal rule with the accuracy of high-order methods.',
          'Singular and oscillatory integrands require specialized methods. For integrands with endpoint singularities, Gauss-Jacobi quadrature or variable transformations (e.g., tanh-sinh) are effective. For oscillatory integrands, Filon or Levin methods exploit the oscillation structure.',
        ],
        tradeoffs: [
          'Newton-Cotes rules are simple and use uniform spacing but become unstable at high orders (negative weights for n >= 9); Gaussian quadrature is more efficient but requires non-uniform, problem-specific node placement.',
          'Adaptive methods are robust and efficient but harder to parallelize than fixed-rule methods because the subdivision is data-dependent.',
          'Higher-order rules are more efficient for smooth integrands but offer no benefit (and may be worse) for non-smooth or discontinuous functions.',
        ],
        realWorld: [
          'Finite element methods evaluate element stiffness matrices using Gaussian quadrature, with the number of quadrature points matched to the element polynomial order.',
          'Monte Carlo integration handles high-dimensional integrals (e.g., path integrals in quantum mechanics) where deterministic quadrature suffers from the curse of dimensionality.',
          'Bayesian statistics computes posterior expectations and marginal likelihoods via numerical integration (quadrature for low dimensions, MCMC for high dimensions).',
        ],
      },
      {
        id: 'ode-initial-value',
        name: 'ODE Initial Value Problems',
        description:
          'Initial value problems (IVPs) y\'(t) = f(t, y), y(0) = y_0 are solved by stepping methods that advance the solution from one time point to the next. Methods are characterized by order, stability, and whether they are explicit or implicit.',
        keyPoints: [
          'Euler\'s method y_{n+1} = y_n + h*f(t_n, y_n) is the simplest first-order method with local error O(h^2) and global error O(h). It is explicit (no equation to solve at each step) but has limited stability, restricting the step size for stiff problems.',
          'Runge-Kutta methods evaluate f at multiple points within each step to achieve higher order. The classic RK4 method uses 4 function evaluations per step and achieves 4th-order accuracy (global error O(h^4)), making it the workhorse for non-stiff problems.',
          'Embedded Runge-Kutta pairs (e.g., Dormand-Prince, RK45) compute two estimates of different orders simultaneously and use their difference to estimate the local error, enabling adaptive step size control that maintains a target accuracy efficiently.',
          'Stiff ODEs have widely separated time scales (e.g., fast transients and slow dynamics). Explicit methods require impractically small step sizes for stability; implicit methods (backward Euler, BDF, implicit Runge-Kutta) solve a nonlinear system at each step but remain stable with large steps.',
          'Multistep methods (Adams-Bashforth, Adams-Moulton, BDF) reuse function evaluations from previous steps to achieve high order with only one new evaluation per step. They are efficient for smooth problems but require special starting procedures and have limited stability regions at high orders.',
        ],
        tradeoffs: [
          'Explicit methods are simple and cheap per step but constrained by stability; implicit methods are stable but require solving (possibly nonlinear) systems at each step.',
          'Higher-order methods take fewer steps for a given accuracy but each step is more expensive; the optimal order depends on the required accuracy and the cost of evaluating f.',
          'Adaptive step size control adds overhead but dramatically improves efficiency by taking large steps when the solution is smooth and small steps during rapid changes.',
        ],
        realWorld: [
          'Spacecraft trajectory computation uses high-order Runge-Kutta methods with adaptive stepping to propagate orbits accurately over long time spans.',
          'Chemical kinetics simulations of combustion involve stiff ODEs where reaction rates span 10+ orders of magnitude, requiring implicit solvers (LSODE, CVODE).',
          'Weather forecasting integrates systems of millions of coupled ODEs representing atmospheric dynamics, using semi-implicit methods that treat fast gravity waves implicitly.',
        ],
      },
      {
        id: 'stability-stiffness',
        name: 'Stability Regions & Stiffness',
        description:
          'The stability region of a numerical method is the set of h*lambda values (step size times eigenvalue) for which the method does not amplify errors. Stiff problems have eigenvalues requiring implicit methods for practical step sizes.',
        keyPoints: [
          'Applying a method to the test equation y\' = lambda*y (lambda complex) gives y_{n+1} = R(h*lambda)*y_n where R is the stability function. The stability region is {z in C : |R(z)| <= 1}. The method is stable when h*lambda lies inside this region.',
          'Euler\'s method has a circular stability region of radius 1 centered at -1. RK4 has a larger region roughly covering the left half-plane out to |z| ~ 2.8. These limitations force small step sizes when eigenvalues have large negative real parts.',
          'A-stability means the entire left half-plane is in the stability region (all decaying modes remain stable regardless of step size). The trapezoidal rule and backward Euler are A-stable. No explicit Runge-Kutta method can be A-stable.',
          'Stiffness occurs when the system has eigenvalues with very different magnitudes. The stiffness ratio |lambda_max/lambda_min| indicates how constrained explicit methods are. For ratios > ~1000, implicit methods become essential.',
          'L-stability strengthens A-stability by requiring |R(z)| -> 0 as Re(z) -> -infinity, ensuring that highly damped modes are properly suppressed. BDF methods of order 1-2 are L-stable; the trapezoidal rule is A-stable but not L-stable.',
        ],
        tradeoffs: [
          'A-stable implicit methods allow arbitrary step sizes but require solving systems at each step, which can be expensive for large systems.',
          'BDF methods of order > 2 are not A-stable (their stability regions exclude parts of the left half-plane), limiting the maximum usable order for stiff problems.',
          'Stiffness detection is not always straightforward; eigenvalue estimates or step size ratio heuristics help identify stiff regions automatically.',
        ],
        realWorld: [
          'Electronic circuit simulation (SPICE) uses BDF methods to handle stiff systems where fast switching transients coexist with slow RC time constants.',
          'Atmospheric chemistry models couple fast photochemical reactions (seconds) with slow transport processes (hours), creating extreme stiffness ratios of 10^8 or more.',
          'Biological neuron models (Hodgkin-Huxley) exhibit stiffness when fast sodium channel dynamics couple with slow potassium recovery, requiring implicit solvers for efficient simulation.',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Fast Fourier Transform',
    part: 4,
    partTitle: 'Numerical Computing',
    summary:
      'The FFT computes the Discrete Fourier Transform in O(n log n) operations instead of O(n^2), enabling efficient spectral analysis, filtering, polynomial multiplication, and convolution across science and engineering.',
    concepts: [
      {
        id: 'dft-definition',
        name: 'Discrete Fourier Transform (DFT)',
        description:
          'The DFT transforms a sequence of n complex numbers into another sequence of n complex numbers representing frequency components. It decomposes a signal into its constituent sinusoidal frequencies.',
        keyPoints: [
          'The DFT of x[0], ..., x[n-1] is X[k] = sum_{j=0}^{n-1} x[j] * omega^{-jk} where omega = e^{2*pi*i/n} is a primitive n-th root of unity. The inverse DFT is x[j] = (1/n) sum_{k=0}^{n-1} X[k] * omega^{jk}.',
          'The DFT is a linear transformation representable as multiplication by the n-by-n DFT matrix F with entries F_{jk} = omega^{-jk}. This matrix is symmetric and unitary (up to scaling): F*F^* = nI.',
          'X[k] represents the amplitude and phase of the frequency k/n cycles per sample. The magnitude |X[k]| gives the amplitude spectrum, and arg(X[k]) gives the phase spectrum. For real input, X[k] = conj(X[n-k]), so only half the spectrum is independent.',
          'The DFT establishes a duality between time/space domain (x) and frequency domain (X). Operations like convolution in time become multiplication in frequency, and differentiation becomes multiplication by ik, leading to efficient spectral methods.',
          'The sampling theorem (Nyquist-Shannon) states that a bandlimited signal can be perfectly reconstructed from samples taken at twice the maximum frequency. Aliasing occurs when the sampling rate is insufficient, causing high frequencies to appear as low frequencies in the DFT.',
        ],
        tradeoffs: [
          'The DFT assumes the signal is periodic with period n, which introduces spectral leakage for non-periodic signals. Windowing functions (Hanning, Hamming, Blackman) reduce leakage at the cost of frequency resolution.',
          'Longer transforms (larger n) give finer frequency resolution but require more data and computation. Zero-padding increases the apparent resolution but does not add true information.',
          'The DFT operates on discrete, finite data; connecting DFT results to continuous-frequency Fourier analysis requires careful attention to normalization, sampling, and boundary effects.',
        ],
        realWorld: [
          'Audio equalizers decompose sound into frequency bands using the DFT, allowing independent volume control of bass, midrange, and treble frequencies.',
          'Medical imaging (MRI) acquires data in the frequency domain (k-space) and uses the inverse DFT to reconstruct spatial images of the body.',
          'Vibration analysis of machinery decomposes acceleration signals into frequency components to identify bearing faults, gear mesh frequencies, and resonances.',
        ],
      },
      {
        id: 'fft-algorithm',
        name: 'FFT Algorithm (Cooley-Tukey)',
        description:
          'The Cooley-Tukey FFT algorithm computes the DFT in O(n log n) operations by recursively splitting the transform into smaller sub-transforms, exploiting the symmetry and periodicity of the roots of unity.',
        keyPoints: [
          'The radix-2 Cooley-Tukey algorithm splits an n-point DFT (n = 2^m) into two n/2-point DFTs: one on even-indexed inputs and one on odd-indexed inputs. The recurrence T(n) = 2T(n/2) + O(n) gives T(n) = O(n log n).',
          'The "butterfly" operation combines pairs of sub-transform outputs: X[k] = E[k] + omega^k * O[k] and X[k+n/2] = E[k] - omega^k * O[k], where E and O are the even and odd sub-transforms. Each butterfly requires one complex multiplication and two additions.',
          'The decimation-in-time (DIT) variant splits the input by index parity and combines outputs; decimation-in-frequency (DIF) splits the output. Both achieve the same O(n log n) complexity with different data access patterns.',
          'Mixed-radix FFTs handle non-power-of-2 sizes by factoring n = r_1 * r_2 * ... * r_k and applying the Cooley-Tukey decomposition for each factor. Prime-size transforms use Rader\'s algorithm or Bluestein\'s chirp-z transform.',
          'The inverse FFT is computed by the same algorithm with omega replaced by omega^{-1} (or equivalently, conjugating the input, applying FFT, conjugating the output, and dividing by n), making it equally efficient.',
        ],
        tradeoffs: [
          'The FFT reduces O(n^2) to O(n log n) but requires n to have small prime factors for maximum efficiency; power-of-2 sizes are ideal, and large prime sizes can require O(n^2) fallback or Bluestein\'s algorithm.',
          'In-place FFT implementations save memory but require bit-reversal permutation of the data, which can cause cache misses on modern processors.',
          'Highly optimized FFT libraries (FFTW, MKL) auto-tune for specific hardware, achieving near-peak performance, but the tuning process itself takes time and the code is complex.',
        ],
        realWorld: [
          'FFTW ("Fastest Fourier Transform in the West") is the most widely used FFT library, adapting its algorithm to the hardware at runtime and used in MATLAB, NumPy, and countless scientific applications.',
          'Telecommunications (4G/5G OFDM) uses the FFT/IFFT at the core of signal modulation: the IFFT generates the transmitted signal and the FFT recovers it at the receiver, with millions of transforms per second.',
          'Polynomial multiplication in computer algebra and big-integer arithmetic uses FFT-based convolution to multiply degree-n polynomials in O(n log n) instead of O(n^2).',
        ],
      },
      {
        id: 'fft-applications',
        name: 'FFT Applications & Spectral Methods',
        description:
          'The FFT enables efficient convolution, correlation, spectral analysis, and PDE solving. Spectral methods use the FFT to achieve exponential convergence for smooth problems.',
        keyPoints: [
          'Circular convolution (x * y)[n] = sum x[k]y[n-k] can be computed in O(n log n) via FFT: transform both sequences, multiply pointwise, and inverse transform. Linear convolution is obtained by zero-padding to length >= len(x) + len(y) - 1 before the circular convolution.',
          'The power spectral density P[k] = |X[k]|^2 / n estimates the distribution of signal power across frequencies. Welch\'s method averages periodograms from overlapping windowed segments to reduce variance at the cost of frequency resolution.',
          'The short-time Fourier transform (STFT) applies the DFT to overlapping windowed segments of a signal, producing a time-frequency representation (spectrogram). The window size controls the time-frequency resolution trade-off (uncertainty principle).',
          'Spectral methods for PDEs expand the solution in Fourier modes, convert differential equations to algebraic equations in frequency space (differentiation becomes multiplication by ik), and use the FFT for transforms. For smooth, periodic problems, they achieve exponential convergence.',
          'The FFT is used in fast multiplication algorithms: Schonhage-Strassen multiplies n-digit integers in O(n log n log log n) using number-theoretic transforms (FFT over finite fields), and Harvey-van der Hoeven achieves O(n log n).',
        ],
        tradeoffs: [
          'FFT-based convolution is asymptotically faster than direct convolution but has higher overhead for short sequences (crossover typically around n ~ 32-64).',
          'Spectral methods achieve the best convergence for smooth periodic problems but handle non-periodic boundaries and discontinuities poorly without modifications (e.g., spectral element methods).',
          'The STFT has a fixed time-frequency resolution determined by the window size; wavelets provide multi-resolution analysis but are more complex and problem-specific.',
        ],
        realWorld: [
          'Image processing uses 2D FFTs for filtering (blur, sharpen, edge detection), compression (JPEG uses a related transform, the DCT), and pattern matching via cross-correlation.',
          'Gravitational N-body simulations use FFT-based methods (particle-mesh, P3M) to compute gravitational potentials in O(n log n) instead of O(n^2) direct summation.',
          'Seismology uses FFTs to analyze earthquake seismograms, identify frequency content, and perform deconvolution to extract Earth structure information from recorded waves.',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find((t) => t.id === id);
}
