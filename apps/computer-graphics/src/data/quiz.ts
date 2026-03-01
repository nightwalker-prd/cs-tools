export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ─── Topic 1: Vectors & Matrix Operations ──────────────────────────
  {
    id: 't1-q1',
    chapterId: 1,
    question: 'What does a dot product of zero between two vectors indicate?',
    options: [
      'The vectors are perpendicular (orthogonal)',
      'The vectors are parallel',
      'The vectors have equal magnitude',
      'One of the vectors is a zero vector',
    ],
    answer: 0,
    explanation:
      'The dot product equals |a||b|cos(theta). When the dot product is zero and neither vector is the zero vector, cos(theta) = 0, meaning theta = 90 degrees. This means the vectors are perpendicular (orthogonal) to each other.',
  },
  {
    id: 't1-q2',
    chapterId: 1,
    question: 'Why must matrix multiplication order be carefully considered in graphics?',
    options: [
      'Because matrices are always square',
      'Because multiplication is commutative',
      'Because the determinant changes with multiplication order',
      'Because multiplication is not commutative -- rotating then translating differs from translating then rotating',
    ],
    answer: 3,
    explanation:
      'Matrix multiplication is associative but not commutative: A * B != B * A in general. In graphics, this means applying a rotation followed by a translation produces a different result than a translation followed by a rotation, so transformation order matters.',
  },
  {
    id: 't1-q3',
    chapterId: 1,
    question: 'What does the view matrix represent in the graphics pipeline?',
    options: [
      'The projection from 3D to 2D',
      'The conversion from object space to world space',
      'The inverse of the camera\'s world transform, repositioning the scene relative to the viewer',
      'The viewport mapping from NDC to pixel coordinates',
    ],
    answer: 2,
    explanation:
      'The view matrix is the inverse of the camera\'s world transform. It effectively repositions the entire scene so that the camera is at the origin looking down the negative-z axis (in OpenGL convention), which is required for subsequent projection.',
  },

  // ─── Topic 2: Transformations & Homogeneous Coordinates ─────────────
  {
    id: 't2-q1',
    chapterId: 2,
    question: 'Why is the w component set to 0 for direction vectors in homogeneous coordinates?',
    options: [
      'To reduce memory usage',
      'To indicate the vector has zero length',
      'To enable perspective division',
      'To make the vector immune to translation while still allowing rotation and scale',
    ],
    answer: 3,
    explanation:
      'Setting w=0 for direction vectors means that when multiplied by a 4x4 transformation matrix, the translation column has no effect (it is multiplied by 0). The vector still responds to the rotation and scale in the upper-left 3x3 submatrix, which is the correct behavior for directions.',
  },
  {
    id: 't2-q2',
    chapterId: 2,
    question: 'What is the primary advantage of quaternions over Euler angles for representing rotations?',
    options: [
      'Quaternions use fewer floating-point values',
      'Quaternions avoid gimbal lock and enable smooth interpolation via slerp',
      'Quaternions are easier for humans to understand',
      'Quaternions can represent non-uniform scaling',
    ],
    answer: 1,
    explanation:
      'Quaternions avoid gimbal lock (the loss of a degree of freedom that occurs with Euler angles when two axes align) and support spherical linear interpolation (slerp), which produces smooth, constant-speed rotation paths -- making them the standard for animation.',
  },
  {
    id: 't2-q3',
    chapterId: 2,
    question: 'How do dirty flags optimize scene graph traversal?',
    options: [
      'They mark nodes whose transforms have changed, so only those nodes and their descendants need world-matrix recomputation',
      'They mark nodes that should be deleted from the scene',
      'They indicate which textures need reloading',
      'They flag nodes that are outside the view frustum',
    ],
    answer: 0,
    explanation:
      'Dirty flags mark nodes whose local transforms have changed since the last update. During scene graph traversal, only nodes with dirty flags (and their descendants) need their world matrices recomputed, avoiding redundant recalculation of static branches.',
  },

  // ─── Topic 3: Projections & Viewing Pipelines ──────────────────────
  {
    id: 't3-q1',
    chapterId: 3,
    question: 'What causes z-fighting artifacts in perspective rendering?',
    options: [
      'Using too wide a field of view',
      'Incorrect aspect ratio settings',
      'Non-linear depth precision that concentrates most precision near the near plane, leaving insufficient precision for distant surfaces',
      'Using orthographic instead of perspective projection',
    ],
    answer: 2,
    explanation:
      'After perspective projection, depth values are distributed non-linearly with most precision near the near plane. When two surfaces at similar depths in the far field share the same discrete depth value, they alternate which one is visible, creating flickering z-fighting artifacts.',
  },
  {
    id: 't3-q2',
    chapterId: 3,
    question: 'Why is orthographic projection used for shadow mapping with directional lights?',
    options: [
      'Because orthographic projection is faster to compute',
      'Because directional light rays are parallel, and orthographic projection preserves parallel rays',
      'Because orthographic projection has higher depth precision',
      'Because shadow maps require square aspect ratios',
    ],
    answer: 1,
    explanation:
      'Directional lights represent infinitely distant sources with parallel rays (like the sun). Orthographic projection naturally models parallel projection, making it the correct choice for rendering the scene from a directional light\'s perspective to create a shadow depth map.',
  },
  {
    id: 't3-q3',
    chapterId: 3,
    question: 'What does the Sutherland-Hodgman algorithm accomplish in the rendering pipeline?',
    options: [
      'It sorts triangles by depth for the painter\'s algorithm',
      'It computes barycentric coordinates for rasterization',
      'It determines the optimal field of view for the scene',
      'It clips polygons against the boundaries of the view frustum, splitting partially visible triangles',
    ],
    answer: 3,
    explanation:
      'The Sutherland-Hodgman algorithm clips polygons against each plane of the clip volume. When a triangle partially extends beyond the view frustum, the algorithm splits it into one or two smaller triangles that fit entirely within the visible volume.',
  },

  // ─── Topic 4: Rasterization & Scan Conversion ─────────────────────
  {
    id: 't4-q1',
    chapterId: 4,
    question: 'What is the purpose of the top-left fill rule in triangle rasterization?',
    options: [
      'To ensure triangles are rendered from top to bottom for cache efficiency',
      'To prioritize rendering the top-left quadrant of the screen first',
      'To determine which vertex is the provoking vertex for flat shading',
      'To ensure pixels exactly on a shared edge between two triangles are assigned to exactly one triangle, preventing gaps or double-filling',
    ],
    answer: 3,
    explanation:
      'The top-left fill rule guarantees that when two adjacent triangles share an edge, each pixel on that edge is assigned to exactly one triangle. Without this rule, shared-edge pixels could be drawn twice (causing overdraw artifacts) or not at all (causing visible gap lines).',
  },
  {
    id: 't4-q2',
    chapterId: 4,
    question: 'Why does early depth testing (early-z) improve rendering performance?',
    options: [
      'It tests fragment depth before running the fragment shader, skipping shading for occluded fragments',
      'It reduces the number of vertices processed by the vertex shader',
      'It eliminates the need for a depth buffer entirely',
      'It performs depth testing on the CPU instead of the GPU',
    ],
    answer: 0,
    explanation:
      'Early-z tests a fragment\'s depth against the depth buffer before executing the fragment shader. If the fragment will be occluded (its depth is farther than the stored value), the shader is skipped entirely, saving significant computation on complex fragment shaders.',
  },
  {
    id: 't4-q3',
    chapterId: 4,
    question: 'Why is perspective-correct interpolation necessary for texture coordinates?',
    options: [
      'Because textures are stored in a compressed format',
      'Because the GPU cannot perform linear interpolation',
      'Because screen-space interpolation distorts texture mapping due to perspective projection\'s non-linear distance scaling',
      'Because texture coordinates always exceed the [0,1] range',
    ],
    answer: 2,
    explanation:
      'Perspective projection distorts distances non-linearly. Naively interpolating texture coordinates in screen space produces incorrect results (visible warping). Perspective-correct interpolation divides attributes by w before interpolation and multiplies back after, correcting for the distortion.',
  },

  // ─── Topic 5: Shading Models & Lighting ────────────────────────────
  {
    id: 't5-q1',
    chapterId: 5,
    question: 'How does Blinn-Phong differ from the original Phong reflection model?',
    options: [
      'Blinn-Phong uses a different ambient term',
      'Blinn-Phong replaces the reflection vector with the half-vector H = normalize(L + V), which is cheaper and more physically plausible',
      'Blinn-Phong removes the specular component entirely',
      'Blinn-Phong adds a subsurface scattering term',
    ],
    answer: 1,
    explanation:
      'Blinn-Phong replaces the reflection vector R (which requires a reflection calculation) with the half-vector H = normalize(L + V). Computing N dot H is cheaper than R dot V, and the resulting highlights are more physically plausible at large angles.',
  },
  {
    id: 't5-q2',
    chapterId: 5,
    question: 'What does energy conservation mean in physically-based rendering?',
    options: [
      'The rendering engine uses less power on the GPU',
      'Materials are limited to using only two texture maps',
      'Lights automatically turn off when not visible to the camera',
      'A surface never reflects more light than it receives; as reflectance increases, diffuse contribution decreases proportionally',
    ],
    answer: 3,
    explanation:
      'Energy conservation ensures physical plausibility by guaranteeing a surface does not reflect more light energy than it receives. In PBR, the diffuse and specular components are linked: as specular reflection increases (higher metalness or grazing angle), the diffuse contribution decreases proportionally.',
  },
  {
    id: 't5-q3',
    chapterId: 5,
    question: 'What problem do cascaded shadow maps (CSM) solve?',
    options: [
      'They distribute shadow map precision across the camera\'s depth range, using higher resolution for nearby geometry',
      'They enable colored shadows from transparent objects',
      'They eliminate the need for a depth buffer',
      'They convert point lights into directional lights',
    ],
    answer: 0,
    explanation:
      'Cascaded shadow maps split the camera frustum into multiple depth ranges (cascades), each with its own shadow map rendered from the directional light. Near cascades use higher effective resolution while far cascades use lower, distributing shadow precision where it matters most.',
  },

  // ─── Topic 6: Textures, Sampling & Filtering ──────────────────────
  {
    id: 't6-q1',
    chapterId: 6,
    question: 'Why does a mipmap chain consume only about 33% more memory than the base texture?',
    options: [
      'Because mipmaps use a different compression format',
      'Because mipmaps store only luminance, not full color',
      'Because each level is half the resolution, so the sum of areas (1/4 + 1/16 + ...) converges to 1/3 of the base',
      'Because the GPU compresses mipmaps automatically at no cost',
    ],
    answer: 2,
    explanation:
      'Each mipmap level has 1/4 the pixels of the previous level (half width times half height). The total extra memory is 1/4 + 1/16 + 1/64 + ... which converges to 1/3 of the base texture size, so the complete mipmap chain is approximately 4/3 times the base texture memory.',
  },
  {
    id: 't6-q2',
    chapterId: 6,
    question: 'What advantage does triplanar mapping have over traditional UV unwrapping?',
    options: [
      'It produces higher-resolution textures',
      'It avoids the need for UV unwrapping entirely by projecting textures from three orthogonal directions and blending by normal',
      'It uses less GPU memory than standard texture mapping',
      'It supports animated textures while UV mapping does not',
    ],
    answer: 1,
    explanation:
      'Triplanar mapping projects textures from the X, Y, and Z axes simultaneously and blends them based on the surface normal direction. This eliminates the need to manually unwrap complex meshes and is commonly used for terrain and procedural surfaces.',
  },
  {
    id: 't6-q3',
    chapterId: 6,
    question: 'How does a normal map create the illusion of surface detail?',
    options: [
      'It displaces vertices to change the actual geometry',
      'It modifies the depth buffer to change visibility',
      'It adds additional polygons at runtime through tessellation',
      'It stores perturbed surface normals that replace interpolated vertex normals during shading, affecting how light interacts with the surface',
    ],
    answer: 3,
    explanation:
      'Normal maps store perturbed normals encoded as RGB values. During fragment shading, these per-texel normals replace the smooth interpolated vertex normals, causing the lighting calculation to react as if the surface has bumps, scratches, or fine detail, even though the underlying geometry is flat.',
  },

  // ─── Topic 7: Ray Tracing & Path Tracing ───────────────────────────
  {
    id: 't7-q1',
    chapterId: 7,
    question: 'How does a bounding volume hierarchy (BVH) accelerate ray tracing?',
    options: [
      'It converts all geometry to spheres for faster intersection',
      'It precomputes all possible ray paths through the scene',
      'It reduces ray-scene intersection from O(n) to O(log n) by organizing geometry in a tree of bounding boxes that rays test hierarchically',
      'It limits the number of rays cast per pixel to a fixed maximum',
    ],
    answer: 2,
    explanation:
      'A BVH organizes scene geometry in a tree of axis-aligned bounding boxes. Rays first test against large bounding boxes and only descend into subtrees that are hit. This reduces the average cost from O(n) per ray (testing every triangle) to O(log n) per ray.',
  },
  {
    id: 't7-q2',
    chapterId: 7,
    question: 'What is the purpose of Russian roulette in path tracing?',
    options: [
      'To randomly select which light source to sample',
      'To choose between reflection and refraction at glass surfaces',
      'To select which pixel to sample next',
      'To stochastically terminate paths after a certain depth, preventing infinite recursion while maintaining an unbiased estimate',
    ],
    answer: 3,
    explanation:
      'Russian roulette gives each path bounce a probability p of continuing (based on surface albedo). Terminated paths are not traced further, preventing infinite recursion. Surviving paths are weighted by 1/p to compensate, maintaining an unbiased estimate of the rendering equation.',
  },
  {
    id: 't7-q3',
    chapterId: 7,
    question: 'What physical law governs the direction of a refracted ray through glass?',
    options: [
      'Lambert\'s cosine law',
      'Snell\'s law: n1*sin(theta_i) = n2*sin(theta_r)',
      'The inverse square law',
      'Beer\'s law of light absorption',
    ],
    answer: 1,
    explanation:
      'Snell\'s law (n1*sin(theta_i) = n2*sin(theta_r)) describes how light bends when crossing the boundary between two media with different refractive indices (n1 and n2). The ratio of indices determines the angle of refraction.',
  },

  // ─── Topic 8: Global Illumination & Radiosity ─────────────────────
  {
    id: 't8-q1',
    chapterId: 8,
    question: 'What is color bleeding in the context of global illumination?',
    options: [
      'When colors overflow beyond the [0,1] range causing clipping',
      'When anti-aliasing causes edge colors to blend with the background',
      'When light bouncing off a colored surface picks up that color and deposits it on nearby surfaces',
      'When HDR tone mapping shifts all colors toward a single hue',
    ],
    answer: 2,
    explanation:
      'Color bleeding is an indirect illumination effect where light reflecting off a colored surface carries that color to nearby surfaces. For example, a red wall tinting an adjacent white surface pink, as famously demonstrated in the Cornell Box scene.',
  },
  {
    id: 't8-q2',
    chapterId: 8,
    question: 'Why is radiosity described as view-independent?',
    options: [
      'Because once the diffuse interreflection is solved, the scene can be viewed from any angle without recomputation',
      'Because it only works for flat 2D scenes',
      'Because it ignores the camera position entirely',
      'Because it computes lighting only at the vertices, not at pixels',
    ],
    answer: 0,
    explanation:
      'Radiosity solves for the equilibrium distribution of diffuse light energy across all surface patches in the scene. Since diffuse reflection is the same from all viewing directions, the solution is valid regardless of camera position, allowing real-time walkthroughs of pre-lit scenes.',
  },
  {
    id: 't8-q3',
    chapterId: 8,
    question: 'How does screen-space ambient occlusion (SSAO) estimate occlusion?',
    options: [
      'By casting rays from each vertex into the scene geometry',
      'By precomputing AO values into a texture during asset creation',
      'By using the surface normal to calculate a fixed darkening factor',
      'By sampling nearby depth values around each pixel and comparing them to detect surrounding geometry',
    ],
    answer: 3,
    explanation:
      'SSAO works entirely in screen space, using only the depth buffer. For each pixel, it samples nearby depth values and compares them to the current pixel\'s depth. Points surrounded by closer geometry (indicating concavities or nearby surfaces) are considered more occluded and darkened.',
  },

  // ─── Topic 9: GPU Architecture & Shader Programming ───────────────
  {
    id: 't9-q1',
    chapterId: 9,
    question: 'What is thread divergence and why is it problematic on GPUs?',
    options: [
      'When threads run at different clock speeds, causing synchronization issues',
      'When threads in a warp take different branches, forcing sequential execution of both paths and wasting throughput',
      'When threads access memory in non-contiguous locations',
      'When more threads are launched than the GPU has physical cores',
    ],
    answer: 1,
    explanation:
      'In SIMT execution, a warp (32 threads on NVIDIA) must execute the same instruction. When threads take different branches (diverge), the GPU must execute both paths sequentially with inactive threads masked off, wasting up to half the throughput.',
  },
  {
    id: 't9-q2',
    chapterId: 9,
    question: 'What is the key difference between uniforms and varyings in shader programming?',
    options: [
      'Uniforms are written by the GPU while varyings are written by the CPU',
      'Uniforms are used only in vertex shaders while varyings are used only in fragment shaders',
      'Uniforms are constant across all shader invocations while varyings are per-vertex values interpolated across the triangle for each fragment',
      'Uniforms support integer types while varyings support only floating-point types',
    ],
    answer: 2,
    explanation:
      'Uniforms are read-only values set by the CPU that remain constant across all invocations of a shader (e.g., matrices, light positions). Varyings are per-vertex outputs from the vertex shader that the rasterizer interpolates (perspective-correct) for each fragment.',
  },
  {
    id: 't9-q3',
    chapterId: 9,
    question: 'What advantage do compute shaders have over fragment shaders for full-screen post-processing?',
    options: [
      'Compute shaders have access to more texture units',
      'Compute shaders automatically run on the CPU when the GPU is busy',
      'Compute shaders produce higher-quality output due to more precision',
      'Compute shaders can use shared memory for cooperative algorithms and avoid rasterization overhead',
    ],
    answer: 3,
    explanation:
      'Compute shaders can use shared memory (fast, per-workgroup storage) for cooperative algorithms like filter kernels, and they skip the overhead of the rasterization pipeline (vertex processing, primitive setup, etc.). This makes them more efficient for many full-screen effects like bloom and tone mapping.',
  },

  // ─── Topic 10: Color Science & HDR ─────────────────────────────────
  {
    id: 't10-q1',
    chapterId: 10,
    question: 'Why must lighting calculations be performed in linear RGB rather than sRGB?',
    options: [
      'Because linear RGB uses less memory than sRGB',
      'Because light addition is physically linear; performing math in gamma-encoded sRGB produces incorrect, overly dark results',
      'Because GPUs cannot process sRGB values',
      'Because sRGB does not support the color red',
    ],
    answer: 1,
    explanation:
      'Light physically combines linearly -- doubling the intensity of a light source doubles its energy. sRGB uses a nonlinear gamma curve that compresses values. Performing linear operations (addition, multiplication) on gamma-encoded values produces mathematically incorrect results that appear unnaturally dark.',
  },
  {
    id: 't10-q2',
    chapterId: 10,
    question: 'What is the purpose of tone mapping in an HDR rendering pipeline?',
    options: [
      'To increase the dynamic range of the captured image',
      'To convert between color spaces like sRGB and Display P3',
      'To compress HDR floating-point values to the displayable [0,1] range while preserving contrast and detail',
      'To add artificial lens flare and bloom effects',
    ],
    answer: 2,
    explanation:
      'Tone mapping compresses high dynamic range values (which can far exceed 1.0) down to the [0,1] range that displays can show. Good tone mappers like ACES preserve contrast and detail in both highlights and shadows, producing natural-looking images from HDR data.',
  },
  {
    id: 't10-q3',
    chapterId: 10,
    question: 'What problem does OKLab solve compared to HSL for color manipulation?',
    options: [
      'OKLab is perceptually uniform, meaning equal numerical changes produce equal perceived color changes, unlike HSL where brightness varies with hue',
      'OKLab supports a wider color gamut than HSL',
      'OKLab uses fewer bytes per pixel than HSL',
      'OKLab can represent colors outside the visible spectrum',
    ],
    answer: 0,
    explanation:
      'HSL is not perceptually uniform: changing the hue at constant saturation and lightness produces visible brightness variations (e.g., yellow appears brighter than blue). OKLab is designed so that equal numerical differences correspond to equal perceived color differences, enabling consistent color manipulation.',
  },

  // ─── Topic 11: Animation & Interpolation ───────────────────────────
  {
    id: 't11-q1',
    chapterId: 11,
    question: 'What property makes Catmull-Rom splines particularly useful for camera paths?',
    options: [
      'They always produce straight lines between control points',
      'They require fewer control points than Bezier curves',
      'They pass through all control points while maintaining C1 continuity (smooth tangents)',
      'They automatically avoid obstacles in the scene',
    ],
    answer: 2,
    explanation:
      'Catmull-Rom splines interpolate through all control points (unlike B-splines which approximate) and maintain C1 continuity, meaning the curve has smooth tangents at each point. This makes them ideal for camera paths where the camera must pass through specific positions smoothly.',
  },
  {
    id: 't11-q2',
    chapterId: 11,
    question: 'What is the "candy-wrapper" artifact in linear blend skinning?',
    options: [
      'Texture stretching on animated surfaces',
      'Volume loss at extreme joint rotations where the mesh collapses inward, resembling a twisted candy wrapper',
      'Color banding in the skin shader',
      'Jittering of vertices near bone endpoints',
    ],
    answer: 1,
    explanation:
      'Linear blend skinning (LBS) blends transformation matrices linearly, which does not correctly interpolate rotations. At extreme joint rotations (like a forearm twist), the interpolated matrices can cause the mesh to collapse inward, losing volume in a way that resembles a twisted candy wrapper.',
  },
  {
    id: 't11-q3',
    chapterId: 11,
    question: 'How does Verlet integration differ from traditional Euler integration for physics simulation?',
    options: [
      'Verlet integration uses acceleration and velocity while Euler only uses velocity',
      'Verlet integration only works in 2D',
      'Verlet integration is more accurate but requires double the memory',
      'Verlet computes the next position from current and previous positions without explicitly storing velocity, providing better stability',
    ],
    answer: 3,
    explanation:
      'Verlet integration computes the next position as x(t+dt) = 2*x(t) - x(t-dt) + a*dt^2, using the current and previous positions instead of explicitly storing and integrating velocity. This implicit velocity handling makes it more stable than Euler integration and simpler to implement for constraint-based simulations.',
  },

  // ─── Topic 12: Real-Time Rendering Techniques ─────────────────────
  {
    id: 't12-q1',
    chapterId: 12,
    question: 'What is the primary advantage of deferred shading over forward rendering?',
    options: [
      'Deferred shading supports transparency natively',
      'Deferred shading uses less memory than forward rendering',
      'Deferred shading decouples lighting cost from scene geometric complexity, making many-light scenes efficient',
      'Deferred shading enables MSAA anti-aliasing',
    ],
    answer: 2,
    explanation:
      'In deferred shading, geometry is rendered once to a G-buffer, and each light is computed in screen space. The lighting cost depends on screen resolution and light count, not scene complexity. This makes scenes with 100+ dynamic lights feasible, whereas forward rendering would evaluate every light for every fragment.',
  },
  {
    id: 't12-q2',
    chapterId: 12,
    question: 'How does GPU instancing reduce rendering overhead?',
    options: [
      'By rendering many copies of the same mesh with different transforms in a single draw call',
      'By compressing mesh data on the GPU',
      'By reducing the polygon count of each mesh automatically',
      'By skipping the vertex shader for repeated meshes',
    ],
    answer: 0,
    explanation:
      'GPU instancing renders multiple copies of the same mesh geometry with different per-instance data (transforms, colors, etc.) in a single draw call. This dramatically reduces CPU overhead from issuing individual draw calls, which is often the bottleneck when rendering many similar objects like trees, particles, or crowd characters.',
  },
  {
    id: 't12-q3',
    chapterId: 12,
    question: 'What is the main drawback of temporal anti-aliasing (TAA)?',
    options: [
      'It only works on static scenes',
      'It doubles the GPU memory usage',
      'It is incompatible with deferred shading',
      'It can introduce ghosting on fast-moving objects and slight blurriness that requires a sharpening pass',
    ],
    answer: 3,
    explanation:
      'TAA accumulates samples across frames using motion vectors to reproject previous frames. When motion estimation is imperfect (fast movement, disocclusions), artifacts like ghosting appear. The temporal accumulation also tends to blur the image slightly, requiring a sharpening pass (like CAS or RCAS) to restore crispness.',
  },

  // ─── Topic 13: Image Processing & Computational Photography ───────
  {
    id: 't13-q1',
    chapterId: 13,
    question: 'Why is a Gaussian blur filter described as "separable"?',
    options: [
      'Because it can be split into color channels and processed independently',
      'Because the blur can be applied partially to selected regions',
      'Because the 2D Gaussian kernel can be decomposed into two sequential 1D passes (horizontal then vertical), reducing computation from NxN to 2*N operations per pixel',
      'Because Gaussian blur separates edges from smooth areas',
    ],
    answer: 2,
    explanation:
      'A 2D Gaussian kernel is the outer product of two 1D Gaussians, so it can be applied as a horizontal 1D pass followed by a vertical 1D pass with identical results. This reduces computation from N*N multiplications per pixel to 2*N, making large-radius blurs practical.',
  },
  {
    id: 't13-q2',
    chapterId: 13,
    question: 'What does the convolution theorem state about the relationship between spatial and frequency domains?',
    options: [
      'That all images can be perfectly reconstructed from their Fourier transform',
      'That high-frequency signals cannot be represented in the spatial domain',
      'That the Fourier transform of a Gaussian is always another Gaussian',
      'That convolution in the spatial domain equals pointwise multiplication in the frequency domain, and vice versa',
    ],
    answer: 3,
    explanation:
      'The convolution theorem states that convolution in one domain corresponds to multiplication in the other domain. This means a large spatial convolution can be computed as two FFTs, a pointwise multiply, and one inverse FFT, which is often faster for large filter kernels.',
  },
  {
    id: 't13-q3',
    chapterId: 13,
    question: 'What is a Neural Radiance Field (NeRF)?',
    options: [
      'A neural network that classifies images into categories',
      'A neural network that learns a continuous 3D scene representation from 2D photos, enabling photorealistic novel-view synthesis',
      'A GPU architecture designed specifically for neural network inference',
      'A type of convolutional filter trained to denoise images',
    ],
    answer: 1,
    explanation:
      'NeRF trains a neural network to map 3D coordinates and viewing direction to color and density, creating a continuous volumetric scene representation from a set of input photographs. New views can then be synthesized by volume rendering through this learned field, producing photorealistic images from viewpoints not in the original photo set.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
