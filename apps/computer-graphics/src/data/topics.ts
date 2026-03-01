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
  { id: 1, title: 'Math Foundations' },
  { id: 2, title: 'Rendering Pipeline' },
  { id: 3, title: 'Advanced Rendering' },
  { id: 4, title: 'Applied Graphics' },
];

export const topics: Topic[] = [
  // ─── Part 1: Math Foundations ───────────────────────────────────────
  {
    id: 1,
    title: 'Vectors & Matrix Operations',
    part: 1,
    partTitle: 'Math Foundations',
    summary:
      'Core linear algebra concepts that underpin every graphics computation, from positioning vertices to computing lighting normals.',
    concepts: [
      {
        id: 'vector-arithmetic',
        name: 'Vector Arithmetic & Dot/Cross Products',
        description:
          'Vectors represent direction and magnitude in 2D/3D space. The dot product and cross product are the two fundamental operations used to measure angles, project vectors, and compute surface normals.',
        keyPoints: [
          'The dot product of two vectors a and b equals |a||b|cos(theta), giving a scalar that indicates how aligned two directions are. A zero dot product means the vectors are perpendicular, which is essential for orthogonality tests in camera setup and lighting.',
          'The cross product of two 3D vectors produces a third vector perpendicular to both inputs. Its magnitude equals the area of the parallelogram formed by the two vectors, making it the standard way to compute face normals for triangles in a mesh.',
          'Vector normalization divides a vector by its magnitude to produce a unit vector. Normalized vectors are critical for lighting calculations because shading equations like Lambertian reflectance assume unit-length normal and light direction vectors.',
          'Linear interpolation (lerp) between two vectors blends them component-wise: lerp(a, b, t) = a + t(b - a). This operation is used constantly in rasterization to interpolate vertex attributes such as color, texture coordinates, and normals across a triangle.',
          'Basis vectors (i, j, k) define a coordinate frame. Any vector in 3D space can be expressed as a linear combination of three linearly independent basis vectors, which is the foundation for coordinate system transformations between object, world, and camera space.',
        ],
        tradeoffs: [
          'Storing vectors as 4-component (homogeneous) uses more memory but simplifies transformation math by unifying translation, rotation, and scale into a single matrix multiply.',
          'Using float32 for vector components is fast on GPUs but introduces floating-point precision errors that accumulate in long chains of transformations.',
        ],
        realWorld: [
          'Game engines use dot products to determine whether an enemy is within a player\'s field of view by comparing the forward vector with the direction to the enemy.',
          'Physics engines compute cross products to calculate torque when a force is applied at a distance from an object\'s center of mass.',
          'Navigation meshes in games interpolate positions along path edges using vector lerp to smoothly guide characters between waypoints.',
        ],
      },
      {
        id: 'matrix-operations',
        name: 'Matrix Multiplication & Inversion',
        description:
          'Matrices encode linear transformations and coordinate changes. Matrix multiplication chains multiple transformations, while matrix inversion reverses them.',
        keyPoints: [
          'Matrix multiplication is associative but not commutative: A * B != B * A in general. In graphics, this means the order of transformations matters -- rotating then translating produces a different result than translating then rotating.',
          'A 4x4 transformation matrix can encode rotation, scale, translation, and projection in a single structure. The upper-left 3x3 submatrix handles rotation and scale, while the rightmost column (or bottom row, depending on convention) handles translation.',
          'Matrix inversion computes the reverse transformation. For an orthonormal rotation matrix, the inverse is simply the transpose, which is computationally cheap. General inversion using cofactor expansion or Gaussian elimination is O(n^3).',
          'Composing multiple transformations into a single matrix via multiplication is more efficient than applying each transform sequentially. A vertex only needs one matrix-vector multiply instead of several, which is why engines precompute model-view-projection (MVP) matrices.',
          'Column-major vs. row-major storage order affects how matrices are laid out in memory and how they multiply with vectors. OpenGL uses column-major order while DirectX historically uses row-major, requiring care when porting shaders between APIs.',
        ],
        tradeoffs: [
          'Precomputing combined MVP matrices reduces per-vertex work but requires recomputation whenever any constituent matrix changes, such as when the camera moves.',
          'Using 4x4 matrices is universal but wasteful for rigid-body transforms where a 3x3 rotation plus a 3-vector translation (12 floats) would suffice compared to 16 floats.',
        ],
        realWorld: [
          'CAD software chains dozens of transformation matrices to position parts within assemblies, sub-assemblies within products, and products within factory layouts.',
          'Skeletal animation systems multiply a chain of bone matrices (parent-to-child) to compute the final world-space position of each joint in a character rig.',
          'Augmented reality frameworks invert the camera pose matrix to place virtual objects in the correct position relative to the real-world camera feed.',
        ],
      },
      {
        id: 'coordinate-systems',
        name: 'Coordinate Systems & Spaces',
        description:
          'Graphics pipelines transform geometry through a sequence of coordinate spaces: object, world, camera, clip, and screen. Understanding these spaces is essential for correct rendering.',
        keyPoints: [
          'Object space (model space) is the local coordinate system in which a mesh is authored. Vertices are defined relative to the model\'s own origin, making it easy to reuse the same mesh at different positions and orientations in a scene.',
          'World space is the global coordinate system shared by all objects. The model matrix transforms vertices from object space to world space by applying the object\'s position, rotation, and scale.',
          'Camera (view/eye) space places the camera at the origin looking down the negative-z axis (OpenGL convention). The view matrix is the inverse of the camera\'s world transform, effectively repositioning the entire scene relative to the viewer.',
          'Clip space is the output of the projection matrix, where coordinates are 4D homogeneous values. The GPU performs perspective division (dividing by w) to produce normalized device coordinates (NDC), which map to the [-1, 1] cube in OpenGL or [0, 1] in some APIs.',
          'Screen space maps NDC to pixel coordinates using the viewport transform. The viewport defines the rectangular region of the window where rendering appears, converting normalized coordinates to integer pixel positions for rasterization.',
        ],
        tradeoffs: [
          'Right-handed vs. left-handed coordinate systems affect cross-product direction and winding order conventions, requiring consistency across the entire pipeline to avoid flipped normals or backface culling errors.',
          'Performing lighting in world space is intuitive but requires transforming light positions every frame; performing lighting in view space avoids this but complicates multi-pass techniques that mix coordinate spaces.',
        ],
        realWorld: [
          'Unity uses a left-handed coordinate system with Y-up, while Blender uses right-handed with Z-up, requiring conversion when exporting models between tools.',
          'VR headsets require per-eye view matrices with slight horizontal offsets to create stereoscopic 3D, making the camera-space transformation a critical part of the rendering pipeline.',
          'Map applications convert latitude/longitude (spherical coordinates) to screen-space pixel positions through a chain of projection and viewport transforms.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Transformations & Homogeneous Coordinates',
    part: 1,
    partTitle: 'Math Foundations',
    summary:
      'How rotation, scaling, and translation are unified through homogeneous coordinates and 4x4 matrices to manipulate geometry in 3D space.',
    concepts: [
      {
        id: 'homogeneous-coordinates',
        name: 'Homogeneous Coordinates & the W Component',
        description:
          'Homogeneous coordinates extend 3D points to 4D by adding a w component, enabling translation to be expressed as matrix multiplication alongside rotation and scale.',
        keyPoints: [
          'A 3D point (x, y, z) becomes (x, y, z, 1) in homogeneous coordinates. Setting w=1 marks it as a position that should be affected by translation. A direction vector uses w=0, making it immune to translation while still responding to rotation and scale.',
          'Perspective division converts homogeneous coordinates back to Cartesian by dividing all components by w: (x/w, y/w, z/w). This operation is what creates the foreshortening effect in perspective projection, where distant objects appear smaller.',
          'The w component enables the perspective projection matrix to encode depth-dependent scaling. After multiplying by the projection matrix, the w component holds the original z-depth, so dividing by w naturally scales x and y inversely with distance.',
          'Points at infinity are representable as (x, y, z, 0) in homogeneous coordinates, which is useful for directional lights and vanishing points in perspective rendering. This elegantly handles cases that would require special-casing in Cartesian coordinates.',
          'Converting between homogeneous and Cartesian coordinates is the key step in the rasterization pipeline. The GPU hardware performs perspective division automatically after the vertex shader outputs clip-space coordinates.',
        ],
        tradeoffs: [
          'Homogeneous coordinates add a fourth component to every vertex, increasing memory usage by 33% compared to 3D coordinates, but the ability to unify all affine transforms into matrix multiplication more than compensates in computational savings.',
          'Numerical precision issues can arise when w values are very small (near-zero), causing extreme magnification after perspective division that manifests as visual artifacts near the camera.',
        ],
        realWorld: [
          'WebGL and Vulkan vertex shaders output gl_Position as a vec4 in homogeneous clip space, and the fixed-function hardware performs perspective division before rasterization.',
          'Robotics uses homogeneous transformation matrices to represent the position and orientation of each joint in a robotic arm, chaining them to compute end-effector pose.',
          'Photogrammetry software uses homogeneous coordinates in the camera projection model to map 3D world points to 2D image pixels during bundle adjustment.',
        ],
      },
      {
        id: 'affine-transforms',
        name: 'Rotation, Scale & Translation',
        description:
          'The three fundamental affine transformations -- rotation, scale, and translation -- can each be represented as 4x4 matrices and composed by multiplication to position objects in a scene.',
        keyPoints: [
          'Rotation matrices are orthonormal: their columns form an orthonormal basis, and the transpose equals the inverse. A rotation around the x-axis by angle theta places cos(theta) and sin(theta) in the y-z submatrix, preserving distances and angles.',
          'Euler angles represent rotation as three sequential rotations around coordinate axes (e.g., yaw-pitch-roll). They are intuitive but suffer from gimbal lock -- when two axes align, one degree of freedom is lost, causing erratic interpolation behavior.',
          'Quaternions represent rotations as 4D unit vectors (w, x, y, z) and avoid gimbal lock entirely. Spherical linear interpolation (slerp) between quaternions produces smooth, constant-speed rotation paths, making them the standard for animation.',
          'Non-uniform scaling along different axes can skew geometry and distort normals. When a model matrix includes non-uniform scale, normals must be transformed by the inverse-transpose of the upper-left 3x3 submatrix to remain perpendicular to the surface.',
          'Translation is not a linear transformation in 3D but becomes linear in 4D homogeneous coordinates. The translation vector occupies the fourth column (column-major) of a 4x4 matrix, and multiplying by a point with w=1 adds the translation to the position.',
        ],
        tradeoffs: [
          'Quaternions use 4 floats vs. 9 for a rotation matrix, saving memory, but quaternion math is less intuitive and harder to debug visually than inspecting a rotation matrix.',
          'Euler angles are human-readable and editor-friendly but require specifying a rotation order (XYZ, ZYX, etc.) and are prone to gimbal lock at pitch = +/-90 degrees.',
        ],
        realWorld: [
          'Game engines like Unreal store object transforms as separate position (vec3), rotation (quaternion), and scale (vec3) components, composing them into a matrix only when needed for rendering.',
          'Flight simulators use Euler angles for cockpit instruments (pitch/roll/yaw gauges) but quaternions internally to avoid gimbal lock during extreme maneuvers.',
          'CSS 3D transforms use a 4x4 matrix under the hood, exposing rotate(), scale(), and translate() as convenience functions that the browser composes into a single transform matrix.',
        ],
      },
      {
        id: 'transform-hierarchies',
        name: 'Scene Graphs & Transform Hierarchies',
        description:
          'Scene graphs organize objects in parent-child trees where each child\'s transform is relative to its parent, enabling complex articulated structures like characters and mechanical assemblies.',
        keyPoints: [
          'A scene graph is a directed acyclic graph (typically a tree) where each node stores a local transform relative to its parent. The world transform of any node is computed by multiplying all ancestor transforms from root to leaf.',
          'Transform inheritance means moving a parent node automatically moves all its children. This is how moving a car body also moves its wheels, or how rotating a shoulder joint rotates the entire arm, forearm, and hand.',
          'Matrix stacks (push/pop) were the classic OpenGL mechanism for traversing scene graphs. Before visiting children, the current matrix is pushed onto a stack; after processing children, it is popped to restore the parent\'s transform.',
          'Dirty flags optimize scene graph updates by marking nodes whose transforms have changed. Only nodes with dirty flags (and their descendants) need world-matrix recomputation, avoiding redundant recalculation of static branches.',
          'Flattening a scene graph -- precomputing world transforms for all nodes into a flat array -- improves cache performance at the cost of losing hierarchical editing. Many engines maintain both representations: a hierarchy for editing and a flat buffer for rendering.',
        ],
        tradeoffs: [
          'Deep hierarchies produce correct results but each additional level adds a matrix multiplication to the chain, increasing traversal cost and potential for floating-point drift in world-space positions.',
          'Flat transform arrays are cache-friendly and GPU-uploadable but lose the semantic structure that makes scene editing intuitive, requiring synchronization between the hierarchy and the flat buffer.',
        ],
        realWorld: [
          'Character animation rigs in games use 50-200 bone hierarchies where each bone\'s transform is relative to its parent, enabling natural joint articulation for skeletons.',
          'The HTML DOM is a transform hierarchy: a div with CSS transform affects all its children, and nested transforms compose to position deeply nested elements.',
          'Solar system simulations model moons orbiting planets orbiting stars using nested transform hierarchies, where each body\'s rotation and revolution are local to its parent.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Projections & Viewing Pipelines',
    part: 1,
    partTitle: 'Math Foundations',
    summary:
      'How 3D scenes are projected onto 2D screens through perspective and orthographic projections, and how the full viewing pipeline transforms vertices from world space to pixels.',
    concepts: [
      {
        id: 'perspective-projection',
        name: 'Perspective Projection',
        description:
          'Perspective projection simulates how the human eye perceives depth, making distant objects appear smaller. It is defined by a field of view, aspect ratio, and near/far clipping planes.',
        keyPoints: [
          'The perspective projection matrix maps the view frustum (a truncated pyramid) to a rectangular clip-space volume. The frustum is defined by the vertical field of view (fov), aspect ratio (width/height), near plane distance (n), and far plane distance (f).',
          'Foreshortening is the key visual effect: objects farther from the camera are scaled down proportionally. This happens because the projection matrix places the z-coordinate into the w component, and perspective division (x/w, y/w) reduces x and y for larger z values.',
          'The near and far planes define the depth range that is rendered. Objects closer than the near plane or farther than the far plane are clipped. A common mistake is setting the near plane too close to zero, which destroys z-buffer precision and causes z-fighting artifacts.',
          'The depth buffer stores non-linear z values after perspective projection. Most of the precision is concentrated near the near plane, leaving very little precision for distant geometry. Reversed-z (mapping near to 1.0 and far to 0.0) significantly improves far-plane precision.',
          'Infinite far planes are possible by taking the limit as f approaches infinity in the projection matrix. Combined with reversed-z and a floating-point depth buffer, this eliminates the need to choose a far plane distance while maintaining good depth precision.',
        ],
        tradeoffs: [
          'A wide field of view shows more of the scene but introduces more perspective distortion at the edges, resembling a fisheye effect that can feel unnatural in first-person games.',
          'Increasing the near/far ratio (f/n) degrades depth buffer precision, but bringing the near plane closer gives more rendering range. Reversed-z mitigates this but requires API support.',
        ],
        realWorld: [
          'First-person shooters typically use a 90-degree horizontal FOV for a natural feel, while racing games use wider FOVs (100-120) to convey speed through peripheral distortion.',
          'Architectural visualization uses two-point perspective projection (vertical lines remain parallel) to match how architects traditionally draw buildings.',
          'Google Maps uses perspective projection for 3D building views, transitioning to orthographic when zoomed out to maintain accurate geographic proportions.',
        ],
      },
      {
        id: 'orthographic-projection',
        name: 'Orthographic Projection',
        description:
          'Orthographic projection preserves parallel lines and does not exhibit foreshortening, making it ideal for technical drawings, UI elements, and 2D games rendered in a 3D pipeline.',
        keyPoints: [
          'The orthographic projection matrix maps a rectangular box (defined by left, right, bottom, top, near, far) directly to the NDC cube. Unlike perspective, it does not divide by w, so all objects appear the same size regardless of distance.',
          'Parallel lines in world space remain parallel after orthographic projection. This property is essential for CAD and engineering drawings where accurate measurements and proportional relationships must be preserved on screen.',
          'Orthographic projection is commonly used for UI overlays, text rendering, and 2D sprites in 3D engines. A separate orthographic camera renders the HUD on top of the perspective-rendered 3D scene in a second pass.',
          'Isometric projection is a special case of orthographic projection where the camera is rotated so that three axes are equally foreshortened (approximately 35.26 degrees from horizontal). Classic strategy games and pixel art games use isometric views.',
          'Shadow mapping with directional lights uses orthographic projection because directional light rays are parallel. The light\'s orthographic frustum must be sized to encompass the visible scene from the light\'s perspective for correct shadow coverage.',
        ],
        tradeoffs: [
          'Orthographic projection preserves measurements but loses depth cues, making it harder for viewers to understand spatial relationships in complex 3D scenes without additional visual aids like shading.',
          'Fitting the orthographic frustum tightly around the scene improves shadow map resolution but requires recalculation whenever the camera moves, adding CPU overhead for frustum fitting.',
        ],
        realWorld: [
          'Blender\'s engineering mode and AutoCAD use orthographic projection for top/front/side views, allowing precise measurement of object dimensions directly on screen.',
          'Classic RTS games like StarCraft and modern city builders use orthographic or near-orthographic projection to maintain consistent unit sizes across the map.',
          'Medical imaging software uses orthographic projection to display CT and MRI slices so that anatomical measurements in the image correspond to real physical dimensions.',
        ],
      },
      {
        id: 'viewing-pipeline',
        name: 'Clipping & Viewport Transform',
        description:
          'After projection, geometry is clipped against the view frustum boundaries and then mapped to screen pixels through the viewport transform, completing the journey from 3D world to 2D screen.',
        keyPoints: [
          'Frustum culling is a coarse optimization performed before vertex processing. Objects whose bounding volumes (spheres or boxes) lie entirely outside the view frustum are discarded early, avoiding unnecessary vertex shader and rasterization work.',
          'Clipping cuts triangles that partially extend beyond the clip-space boundaries (the six planes of the NDC cube). A triangle crossing a clip plane is split into one or two smaller triangles that fit entirely within the visible volume, using algorithms like Sutherland-Hodgman.',
          'Guard-band clipping is an optimization where the GPU allows triangles to extend slightly beyond the screen boundaries without clipping them. Only triangles that extend very far outside the viewport are geometrically clipped, reducing the cost of generating new vertices.',
          'The viewport transform maps x and y from NDC range ([-1,1] or [0,1]) to pixel coordinates based on the viewport rectangle. It also maps the z component to the depth range, typically [0,1], for depth buffer storage.',
          'Scissor testing is an additional per-pixel rejection step that discards fragments outside a programmer-defined rectangle. Unlike viewport clipping, scissor testing does not affect coordinate mapping and is used for effects like split-screen rendering or UI masking.',
        ],
        tradeoffs: [
          'Aggressive frustum culling with tight bounding volumes reduces GPU load but increases CPU cost for bounding volume tests, especially with many small objects. Hierarchical culling (BVH) amortizes this cost.',
          'Guard-band clipping reduces vertex processing cost but requires the rasterizer to handle larger triangles, which can increase overdraw for triangles mostly off-screen.',
        ],
        realWorld: [
          'Open-world games like Horizon cull thousands of objects per frame using hierarchical bounding volume tests against the camera frustum, rendering only the few hundred that are visible.',
          'Split-screen multiplayer games use different viewport rectangles for each player, with scissor tests preventing one player\'s rendering from bleeding into another\'s area.',
          'Video editing software uses viewport transforms to display multiple preview panels at different sizes and zoom levels, each showing a different region of the timeline.',
        ],
      },
    ],
  },

  // ─── Part 2: Rendering Pipeline ─────────────────────────────────────
  {
    id: 4,
    title: 'Rasterization & Scan Conversion',
    part: 2,
    partTitle: 'Rendering Pipeline',
    summary:
      'The process of converting projected 2D triangles into fragments (pixels), determining which pixels a triangle covers, and interpolating per-vertex attributes across the surface.',
    concepts: [
      {
        id: 'triangle-rasterization',
        name: 'Triangle Rasterization & Edge Functions',
        description:
          'Rasterization determines which pixels lie inside a projected triangle. Modern GPUs use edge functions -- linear equations derived from triangle edges -- to test pixel inclusion in parallel.',
        keyPoints: [
          'An edge function for a triangle edge from vertex A to vertex B evaluates a point P as E(P) = (B.x - A.x)(P.y - A.y) - (B.y - A.y)(P.x - A.x). If all three edge functions are positive (or all negative, depending on winding), the point is inside the triangle.',
          'The edge function approach is highly parallelizable because each pixel can be tested independently. Modern GPUs evaluate edge functions for entire 2x2 pixel quads simultaneously, which is essential for computing screen-space derivatives used in texture filtering.',
          'The bounding box of the triangle\'s screen-space vertices is computed first to limit the range of pixels tested. Only pixels within this axis-aligned rectangle are candidates, avoiding wasteful edge function evaluations for distant pixels.',
          'Top-left fill rules ensure that pixels exactly on a shared edge between two triangles are assigned to exactly one triangle, preventing both double-filling (which causes overdraw artifacts) and gaps (which appear as thin lines between adjacent triangles).',
          'Half-space rasterization is the modern approach where each edge defines a half-plane, and the triangle interior is the intersection of three half-planes. This formulation maps naturally to SIMD and GPU hardware, replacing older scanline algorithms.',
        ],
        tradeoffs: [
          'Bounding-box rasterization is simple and parallelizable but wastes work testing pixels outside the triangle. Hierarchical (tiled) rasterization first tests coarse blocks, reducing wasted pixel tests at the cost of additional per-tile logic.',
          'Processing 2x2 pixel quads enables derivative computation for mipmapping but wastes up to 75% of work for very thin triangles that occupy only one pixel per quad (quad overshading).',
        ],
        realWorld: [
          'Every GPU from mobile phones to workstations uses edge-function rasterization as the core algorithm for converting triangles to pixels, processing billions of triangles per second.',
          'Software renderers like Mesa\'s llvmpipe implement the same edge function algorithm on the CPU, enabling OpenGL support on systems without GPU drivers.',
          'Font rendering engines rasterize glyph outlines (Bezier curves decomposed into triangles) using similar scan-conversion techniques to produce crisp text on screen.',
        ],
      },
      {
        id: 'depth-buffering',
        name: 'Depth Buffering & Visibility',
        description:
          'The depth buffer (z-buffer) solves the visibility problem by storing the closest depth value at each pixel, ensuring that only the nearest surface is displayed.',
        keyPoints: [
          'The z-buffer stores a depth value for every pixel in the framebuffer. When a new fragment is generated, its depth is compared against the stored value. If the new fragment is closer, it replaces both the color and depth at that pixel; otherwise, it is discarded.',
          'Depth precision is non-linear after perspective projection, with most precision concentrated near the near plane. This causes z-fighting -- flickering artifacts where two surfaces at similar depths alternate which one is visible. Increasing the near-plane distance is the simplest mitigation.',
          'Early depth testing (early-z) is a GPU optimization that tests fragment depth before running the fragment shader. If the fragment will be occluded, the shader is skipped entirely, saving significant computation. However, shaders that write to gl_FragDepth or use discard disable early-z.',
          'Depth pre-pass is a rendering technique where the scene is first rendered with only depth writes (no color output), then rendered again with depth testing set to equal. This ensures every pixel runs the expensive fragment shader exactly once, eliminating overdraw.',
          'Hierarchical z-buffering (Hi-Z) stores a mipmap pyramid of depth values, enabling the GPU to quickly reject entire tiles or triangles that are fully occluded. This is a key hardware optimization in modern GPU architectures.',
        ],
        tradeoffs: [
          'A 24-bit depth buffer provides adequate precision for most scenes but struggles with very large depth ranges (e.g., space games). A 32-bit float depth buffer provides better precision but uses more memory bandwidth.',
          'Depth pre-pass doubles the vertex processing cost but can dramatically reduce fragment shading cost in overdraw-heavy scenes. It is most beneficial when fragment shaders are expensive.',
        ],
        realWorld: [
          'Cockpit view in flight simulators uses a two-pass approach with different near/far ranges -- one for the cockpit instruments (near) and one for the terrain (far) -- to avoid z-fighting across the extreme depth range.',
          'Occlusion culling in game engines like Unreal uses hierarchical z-buffer queries to determine whether objects behind walls are visible before submitting them for full rendering.',
          'Google Earth renders terrain tiles at vastly different scales (meters to thousands of kilometers) and uses logarithmic depth buffers to maintain precision across the entire range.',
        ],
      },
      {
        id: 'attribute-interpolation',
        name: 'Barycentric Interpolation',
        description:
          'Barycentric coordinates express any point inside a triangle as a weighted combination of its three vertices, enabling smooth interpolation of colors, normals, texture coordinates, and other attributes across the surface.',
        keyPoints: [
          'Barycentric coordinates (u, v, w) with u + v + w = 1 describe a point\'s position relative to a triangle\'s three vertices. A point P inside the triangle equals u*A + v*B + w*C, where each weight represents the fractional area of the sub-triangle opposite that vertex.',
          'Perspective-correct interpolation is essential for attributes like texture coordinates. Naively interpolating in screen space produces incorrect results because perspective projection distorts distances. The GPU divides each attribute by w before interpolating, then multiplies by w after, correcting for perspective distortion.',
          'Barycentric coordinates are computed alongside edge function evaluation during rasterization: the three edge function values at a point, normalized by the triangle\'s total area, directly give the barycentric weights. This makes interpolation nearly free once rasterization is complete.',
          'Flat shading assigns a single attribute value (typically from the provoking vertex) to the entire triangle, skipping interpolation. Smooth (Gouraud) shading interpolates per-vertex values, while Phong shading interpolates normals and evaluates lighting per-pixel for higher quality.',
          'Any per-vertex attribute can be interpolated using barycentric coordinates: position, normal, color, texture coordinates, tangent vectors, and even custom data. This generality is why the vertex-to-fragment data flow in modern shaders is called "varying" or "interpolated" values.',
        ],
        tradeoffs: [
          'Perspective-correct interpolation requires per-fragment division (by the interpolated 1/w), adding computational cost compared to affine (screen-space) interpolation, but the visual correctness is mandatory for textured surfaces.',
          'Gouraud shading is faster than Phong shading because lighting is computed per-vertex rather than per-pixel, but it produces visible Mach band artifacts on low-polygon models, especially with specular highlights.',
        ],
        realWorld: [
          'Texture mapping on every 3D surface you see in a game relies on perspective-correct barycentric interpolation of UV coordinates to correctly wrap images onto geometry.',
          'Terrain rendering systems interpolate elevation, normal, and material blend weights across terrain triangles using barycentric coordinates to create smooth landscapes.',
          'GPU debugging tools like RenderDoc display barycentric coordinates as a visualization mode, coloring pixels red/green/blue based on their proximity to each triangle vertex.',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Shading Models & Lighting',
    part: 2,
    partTitle: 'Rendering Pipeline',
    summary:
      'How light interacts with surfaces is modeled through shading equations ranging from simple Lambertian diffuse to physically-based rendering (PBR) with microfacet theory.',
    concepts: [
      {
        id: 'phong-lighting',
        name: 'Phong & Blinn-Phong Reflection Models',
        description:
          'The Phong reflection model decomposes surface appearance into ambient, diffuse, and specular components. Blinn-Phong replaces the reflection vector with a half-vector for improved efficiency and visual quality.',
        keyPoints: [
          'The diffuse component uses Lambert\'s cosine law: intensity is proportional to max(0, N dot L), where N is the surface normal and L is the light direction. This models matte surfaces that scatter light equally in all directions, and it is the foundation of all shading models.',
          'The specular component in Phong computes the reflection of the light vector about the normal (R = 2(N dot L)N - L) and raises the dot product R dot V to a shininess exponent: max(0, R dot V)^n. Higher exponents produce tighter, more mirror-like highlights.',
          'Blinn-Phong replaces the reflection vector with the half-vector H = normalize(L + V) and computes max(0, N dot H)^n. This is computationally cheaper (no reflection calculation), produces more physically plausible highlights for large angles, and is what most real-time pipelines use.',
          'The ambient term is a constant added to approximate indirect illumination: I_ambient = k_a * I_a. It prevents completely black shadows but is physically inaccurate. Modern renderers replace ambient with screen-space ambient occlusion (SSAO) or global illumination approximations.',
          'Multiple light sources sum their contributions linearly: total color = emission + ambient + sum_over_lights(diffuse + specular). This linearity is physically correct for direct lighting and allows the rendering of scenes with arbitrary numbers of lights.',
        ],
        tradeoffs: [
          'Phong/Blinn-Phong models are fast and intuitive but not energy-conserving: a surface can reflect more light than it receives, which looks wrong for realistic rendering.',
          'Increasing the specular exponent produces sharper highlights but can cause aliasing at glancing angles and does not capture the broadening of highlights seen on rough real surfaces.',
        ],
        realWorld: [
          'Classic video games from the PS2/PS3 era used Blinn-Phong as their primary shading model, and many mobile games still use it today for its simplicity and performance.',
          'OpenGL\'s fixed-function pipeline implemented Blinn-Phong shading in hardware, making it the default shading model for decades of graphics applications.',
          'Three.js\'s MeshPhongMaterial implements the Phong model for web-based 3D applications, providing a quick way to add lighting to WebGL scenes.',
        ],
      },
      {
        id: 'pbr-shading',
        name: 'Physically-Based Rendering (PBR)',
        description:
          'PBR uses microfacet theory and energy conservation to model how real materials interact with light, parameterized by roughness and metalness for artist-friendly workflows.',
        keyPoints: [
          'The Cook-Torrance microfacet BRDF models a surface as composed of tiny planar mirrors (microfacets). The specular term is D(h)*F(v,h)*G(l,v,h) / (4*(N dot L)*(N dot V)), where D is the microfacet distribution, F is the Fresnel term, and G is the geometry/shadowing term.',
          'The GGX (Trowbridge-Reitz) normal distribution function D(h) describes how microfacet normals are distributed around the surface normal. It produces a long tail of highlight falloff that matches real-world observations better than Phong or Beckmann distributions.',
          'The Fresnel effect (modeled by Schlick\'s approximation: F = F0 + (1-F0)(1 - cos(theta))^5) causes surfaces to become more reflective at grazing angles. F0 is the reflectance at normal incidence -- around 0.04 for dielectrics and 0.5-1.0 for metals.',
          'Energy conservation ensures a surface never reflects more light than it receives. In PBR, the diffuse and specular components are linked: as reflectance increases (higher metalness or grazing angle), diffuse contribution decreases proportionally, maintaining physical plausibility.',
          'The metallic-roughness workflow parameterizes materials with two scalars: metalness (0=dielectric, 1=metal) and roughness (0=mirror, 1=matte). Metals have colored specular reflections (F0 comes from the albedo) and zero diffuse, while dielectrics have white specular (F0 ~ 0.04) and colored diffuse.',
        ],
        tradeoffs: [
          'PBR produces consistent, realistic results across all lighting conditions but is more computationally expensive per pixel than Blinn-Phong due to the microfacet BRDF evaluation.',
          'The metallic-roughness workflow is simpler for artists (two parameters) but cannot represent layered materials or materials that are partially metallic, like painted metal, without additional maps.',
        ],
        realWorld: [
          'Unreal Engine, Unity, and Godot all use metallic-roughness PBR as their default shading model, making it the industry standard for games and real-time visualization.',
          'Disney\'s principled BRDF (used in their film pipeline and adopted by Blender) extends PBR with additional parameters like sheen, clearcoat, and subsurface scattering for cinematic quality.',
          'Substance Painter and Quixel Mixer are texturing tools built entirely around the PBR metallic-roughness workflow, generating albedo, roughness, metalness, and normal maps for game assets.',
        ],
      },
      {
        id: 'lighting-techniques',
        name: 'Light Types & Shadow Techniques',
        description:
          'Different light source types (directional, point, spot) and shadow mapping techniques determine how illumination and occlusion are computed in real-time rendering.',
        keyPoints: [
          'Directional lights represent infinitely distant sources like the sun, with parallel rays and no attenuation. They are the simplest and cheapest light type, requiring only a direction vector and using orthographic projection for shadow mapping.',
          'Point lights emit in all directions from a position and attenuate with distance, typically using inverse-square falloff: intensity / (1 + k_l*d + k_q*d^2). Shadow mapping for point lights requires rendering six shadow maps (one per cube face), called omnidirectional shadow mapping.',
          'Shadow mapping renders the scene from the light\'s perspective to create a depth map, then during the main render pass, compares each fragment\'s light-space depth to the stored shadow map depth. If the fragment is farther, it is in shadow. This technique works for any geometry but suffers from aliasing.',
          'Percentage-closer filtering (PCF) reduces shadow map aliasing by sampling multiple texels around the lookup point and averaging the binary shadow test results. This produces soft shadow edges at the cost of additional texture samples.',
          'Cascaded shadow maps (CSM) split the camera frustum into multiple depth ranges, each with its own shadow map from the directional light. Near cascades use higher resolution while far cascades use lower resolution, distributing precision where it matters most.',
        ],
        tradeoffs: [
          'Shadow maps are universal and efficient but resolution-dependent, producing blocky shadows (aliasing) when the shadow map resolution is too low relative to the screen area it covers.',
          'More shadow map cascades improve quality by reducing aliasing at all distances but multiply the rendering cost linearly with the number of cascades and require blending between cascade boundaries.',
        ],
        realWorld: [
          'Open-world games like The Witcher 3 use 4-cascade shadow maps for the sun, with cascade distances tuned to match typical view distances in gameplay.',
          'Indoor architectural visualizations use dozens of point lights with shadow maps to simulate realistic room lighting from fixtures, requiring careful shadow map resolution budgeting.',
          'Google Maps 3D view uses directional shadow mapping to cast building shadows that match real-world sun positions based on time of day and geographic location.',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Textures, Sampling & Filtering',
    part: 2,
    partTitle: 'Rendering Pipeline',
    summary:
      'How 2D images are mapped onto 3D surfaces, including UV coordinates, texture filtering, mipmapping, and advanced mapping techniques like normal and displacement maps.',
    concepts: [
      {
        id: 'texture-mapping',
        name: 'UV Mapping & Texture Coordinates',
        description:
          'Texture mapping assigns 2D coordinates (UVs) to each vertex of a 3D mesh, defining how a 2D image wraps onto the surface. UV unwrapping is the process of flattening 3D geometry into 2D for texturing.',
        keyPoints: [
          'UV coordinates range from (0,0) at one corner to (1,1) at the opposite corner of a texture. Each vertex stores a (u,v) pair, and the rasterizer interpolates UVs across the triangle to look up the corresponding texel (texture pixel) for each fragment.',
          'UV unwrapping creates seams where the 3D mesh is cut to lay flat in 2D, similar to unfolding a cardboard box. Minimizing seam length and distortion is important because visible seams cause texture discontinuities and wasted texture space.',
          'Texture wrapping modes control what happens when UV coordinates exceed the [0,1] range: repeat (GL_REPEAT) tiles the texture, clamp-to-edge (GL_CLAMP_TO_EDGE) stretches the border pixels, and mirrored-repeat (GL_MIRRORED_REPEAT) alternates flipped copies.',
          'Texture atlases pack multiple smaller textures into a single larger image to reduce draw calls and texture state changes. UV coordinates for each sub-image are offset and scaled to address the correct region within the atlas.',
          'Triplanar mapping projects textures from three orthogonal directions (X, Y, Z axes) and blends them based on the surface normal direction. This avoids UV unwrapping entirely and is commonly used for terrain and procedural surfaces.',
        ],
        tradeoffs: [
          'Manual UV unwrapping produces the best results for characters and props but is labor-intensive. Automatic unwrapping algorithms save time but often produce suboptimal layouts with more distortion and wasted space.',
          'Texture atlases reduce state changes but complicate mipmap filtering at atlas boundaries, where adjacent texels in the atlas belong to different images and can bleed into each other.',
        ],
        realWorld: [
          'Character artists in game studios spend significant time manually unwrapping character meshes to minimize texture distortion on faces and hands, where detail is most visible.',
          'Minecraft uses a texture atlas where all block textures are packed into a single image, and each block face\'s UVs point to the correct 16x16 pixel region.',
          'Terrain rendering in Unreal Engine uses triplanar mapping to texture cliffs and vertical surfaces where traditional UV projection from above would cause extreme stretching.',
        ],
      },
      {
        id: 'texture-filtering',
        name: 'Mipmapping & Texture Filtering',
        description:
          'Texture filtering determines how texel values are sampled when the texture is viewed at different sizes and angles. Mipmapping precomputes downscaled versions to prevent aliasing.',
        keyPoints: [
          'Nearest-neighbor filtering selects the single closest texel to the sample point, producing a blocky, pixelated appearance when the texture is magnified. It preserves hard edges and is used intentionally for pixel art and retro-style games.',
          'Bilinear filtering samples the four nearest texels and blends them based on the fractional UV position, producing smooth transitions when magnified. It eliminates the blocky look of nearest-neighbor but can appear blurry at high magnification.',
          'Mipmaps are a precomputed chain of progressively halved texture copies (512x512, 256x256, 128x128, etc.). The GPU selects the mip level where one texel approximately equals one pixel on screen, preventing the shimmering artifacts (moire patterns) caused by undersampling a high-resolution texture.',
          'Trilinear filtering extends bilinear by also interpolating between two adjacent mip levels, eliminating the visible seam where the GPU switches between mip levels. It adds one extra texture sample but produces much smoother results at mip transitions.',
          'Anisotropic filtering handles surfaces viewed at oblique angles (like a road stretching into the distance) by sampling more texels along the direction of greatest compression. Typical quality settings range from 2x to 16x anisotropic, with diminishing returns beyond 8x.',
        ],
        tradeoffs: [
          'Mipmaps consume 33% additional memory (the sum of the mip chain converges to 4/3 of the base texture) but dramatically improve visual quality and can actually improve performance by improving texture cache hit rates.',
          'Higher anisotropic filtering levels improve quality at oblique angles but increase texture bandwidth consumption, which can become a bottleneck on bandwidth-limited mobile GPUs.',
        ],
        realWorld: [
          'Racing games rely heavily on anisotropic filtering for road surfaces viewed at steep angles, where without it the texture would dissolve into a blurry mess just meters ahead of the car.',
          'Pixel art games like Celeste use nearest-neighbor filtering to preserve the crisp, blocky aesthetic of their hand-crafted sprites at any display resolution.',
          'Virtual reality applications require high-quality trilinear and anisotropic filtering because texture aliasing artifacts are much more noticeable and nauseating when viewed through a headset.',
        ],
      },
      {
        id: 'advanced-texturing',
        name: 'Normal, Displacement & PBR Texture Maps',
        description:
          'Beyond color, textures encode surface detail (normal maps), geometry displacement (height maps), and material properties (roughness, metalness) to create rich, detailed surfaces without adding geometry.',
        keyPoints: [
          'Normal maps store perturbed surface normals encoded as RGB colors (where R=X, G=Y, B=Z, mapped from [-1,1] to [0,1]). During shading, the per-texel normal replaces the interpolated vertex normal, creating the illusion of surface detail like bumps, scratches, and pores without additional geometry.',
          'Tangent space is the local coordinate system at each point on a surface, defined by the tangent (T), bitangent (B), and normal (N) vectors. Normal maps are typically stored in tangent space so they can be reused on deformable or reoriented geometry. The TBN matrix transforms the map\'s normals to world space for lighting.',
          'Displacement mapping actually moves vertices based on a height map, creating real geometric detail that produces correct silhouettes and self-occlusion. It is typically applied during tessellation and is more expensive than normal mapping but produces superior results at silhouette edges.',
          'Parallax occlusion mapping (POM) simulates depth by ray-marching through a height map in the fragment shader, offsetting UV coordinates based on the view angle. It produces convincing depth illusions (bricks, cobblestones) without adding geometry, but at higher per-pixel cost than simple normal mapping.',
          'PBR texture sets typically include albedo (base color), normal, roughness, metalness, and ambient occlusion maps. Together they fully describe a material\'s appearance. These maps are authored in tools like Substance Painter and sampled in the fragment shader to evaluate the PBR BRDF at each pixel.',
        ],
        tradeoffs: [
          'Normal maps are cheap and widely supported but fail at silhouette edges where the flat geometry is visible, breaking the illusion of depth. Displacement mapping fixes this but requires tessellation hardware support and is more expensive.',
          'Parallax occlusion mapping produces better depth than normal maps alone but is expensive per pixel and can produce artifacts at steep viewing angles, requiring careful tuning of step count and layer depth.',
        ],
        realWorld: [
          'AAA games like The Last of Us Part II use high-resolution normal maps baked from sculpted high-poly models to add skin pores, fabric weave, and surface scratches to game-ready meshes.',
          'Unreal Engine 5\'s Nanite system uses displacement maps combined with virtual geometry to render film-quality assets with billions of triangles, adaptively tessellating based on screen coverage.',
          'Substance 3D Painter is the industry-standard tool for authoring PBR texture sets, allowing artists to paint directly on 3D models and export albedo, normal, roughness, metalness, and AO maps.',
        ],
      },
    ],
  },

  // ─── Part 3: Advanced Rendering ─────────────────────────────────────
  {
    id: 7,
    title: 'Ray Tracing & Path Tracing',
    part: 3,
    partTitle: 'Advanced Rendering',
    summary:
      'Ray tracing simulates light transport by casting rays from the camera into the scene, naturally handling reflections, refractions, and shadows. Path tracing extends this with Monte Carlo sampling for global illumination.',
    concepts: [
      {
        id: 'ray-tracing-fundamentals',
        name: 'Ray Casting & Intersection Tests',
        description:
          'Ray tracing fires rays from the camera through each pixel and tests for intersections with scene geometry. The closest intersection determines pixel color, naturally solving visibility without a depth buffer.',
        keyPoints: [
          'A ray is defined as P(t) = O + t*D, where O is the origin (camera position), D is the direction (through the pixel), and t is the parametric distance. Finding the smallest positive t that intersects a surface gives the closest visible point.',
          'Ray-sphere intersection is solved analytically by substituting the ray equation into the sphere equation |P - C|^2 = r^2, producing a quadratic in t. The discriminant determines if the ray hits (two roots), grazes (one root), or misses (no real roots) the sphere.',
          'Ray-triangle intersection is commonly computed with the Moller-Trumbore algorithm, which uses barycentric coordinates to simultaneously determine if the ray hits the triangle\'s plane and whether the hit point lies inside the triangle, in a single set of cross products.',
          'Bounding volume hierarchies (BVH) accelerate ray-scene intersection from O(n) per ray to O(log n) by organizing geometry in a tree of axis-aligned bounding boxes. Rays first test against large bounding boxes and only descend into subtrees that are hit.',
          'Surface area heuristic (SAH) is the standard method for building high-quality BVHs. It estimates the probability of a ray hitting each child node based on its surface area relative to the parent, splitting geometry to minimize the expected cost of traversal.',
        ],
        tradeoffs: [
          'Ray tracing produces physically accurate results but is orders of magnitude slower than rasterization for primary visibility, because each pixel requires independent geometric intersection tests instead of amortized triangle setup.',
          'BVH build quality significantly affects traversal speed. High-quality SAH builds take longer to construct but produce trees that are 2-3x faster to traverse, making the build cost worthwhile for static scenes.',
        ],
        realWorld: [
          'NVIDIA RTX GPUs include dedicated RT cores that accelerate BVH traversal and ray-triangle intersection in hardware, enabling real-time ray tracing for reflections and shadows in games like Cyberpunk 2077.',
          'Pixar\'s RenderMan and Disney\'s Hyperion are production ray tracers that render feature films like Toy Story 4 and Frozen II, casting billions of rays per frame for photorealistic imagery.',
          'Medical visualization software uses ray casting to render volumetric CT and MRI data, accumulating color and opacity along each ray as it passes through the 3D volume.',
        ],
      },
      {
        id: 'path-tracing',
        name: 'Path Tracing & Monte Carlo Integration',
        description:
          'Path tracing extends ray tracing by randomly sampling light paths to solve the rendering equation. Monte Carlo integration converges to the correct global illumination solution with enough samples, producing photorealistic images.',
        keyPoints: [
          'The rendering equation (Kajiya 1986) states that outgoing light Lo at a point equals emitted light Le plus the integral of incoming light Li multiplied by the BRDF and a cosine factor over the hemisphere: Lo = Le + integral(Li * f * cos(theta) * dw). Path tracing solves this integral numerically.',
          'Monte Carlo integration estimates the hemisphere integral by averaging random samples: each sample casts a ray in a random direction, evaluates the incoming light, multiplies by the BRDF and cosine, and divides by the probability density function (PDF) of the sample direction.',
          'Importance sampling reduces variance by directing more samples toward directions where the BRDF or incoming light is large. For example, sampling proportional to the cosine-weighted hemisphere for diffuse surfaces or proportional to the GGX distribution for glossy surfaces.',
          'Russian roulette is a technique to stochastically terminate paths after a certain depth, preventing infinite recursion. At each bounce, the path has a probability p of continuing (weighted by the surface albedo) and the surviving paths are weighted by 1/p to maintain an unbiased estimate.',
          'Path tracing naturally produces soft shadows, color bleeding (diffuse interreflection), caustics, and depth of field. These effects emerge automatically from sampling the rendering equation and do not require special-case code, unlike rasterization-based approaches.',
        ],
        tradeoffs: [
          'Path tracing is unbiased and converges to the ground truth but requires hundreds or thousands of samples per pixel for noise-free results, making it slow for real-time use without denoising.',
          'Importance sampling dramatically reduces noise for specific material types but requires the PDF to match the integrand well. Poorly chosen sampling strategies can be worse than uniform sampling.',
        ],
        realWorld: [
          'Blender\'s Cycles renderer is a GPU-accelerated path tracer used by hobbyists and studios alike. It traces paths through the scene, accumulating samples progressively until the image converges.',
          'Arnold Renderer (used by Marvel, Sony Pictures) is a production path tracer that handles complex scenes with millions of polygons, volumetric effects, and subsurface scattering for film VFX.',
          'Intel\'s Open Image Denoise and NVIDIA\'s OptiX Denoiser use machine learning to clean up noisy path-traced images after just a few samples per pixel, enabling near-real-time previews in 3D modeling applications.',
        ],
      },
      {
        id: 'ray-tracing-effects',
        name: 'Reflections, Refractions & Caustics',
        description:
          'Ray tracing excels at simulating optical phenomena: mirror reflections, glass refractions, total internal reflection, and caustics (focused light patterns) that are difficult or impossible to achieve with rasterization.',
        keyPoints: [
          'Perfect specular reflection is computed by reflecting the incoming ray direction about the surface normal: R = I - 2(I dot N)N. The reflected ray is then traced recursively to find what is visible in the mirror, with each bounce attenuating by the surface\'s reflectance.',
          'Refraction follows Snell\'s law: n1*sin(theta_i) = n2*sin(theta_r), where n1 and n2 are the refractive indices of the two media. The refracted ray direction is computed from the incident direction, normal, and the ratio n1/n2. Glass (n~1.5), water (n~1.33), and diamond (n~2.42) have different indices.',
          'Total internal reflection occurs when light attempts to exit a denser medium at a steep angle. When the incidence angle exceeds the critical angle (arcsin(n2/n1)), no refraction occurs and all light is reflected, creating the shiny look of water surfaces viewed at low angles.',
          'The Fresnel equations determine how much light is reflected vs. refracted at an interface. Schlick\'s approximation (F0 + (1-F0)(1-cos(theta))^5) is commonly used. At normal incidence, glass reflects about 4% of light; at grazing angles, it reflects nearly 100%.',
          'Caustics are concentrated patterns of light created when reflective or refractive surfaces focus light onto nearby surfaces, like the bright patterns at the bottom of a swimming pool. Path tracing can simulate them naturally, but they converge very slowly; photon mapping or specialized algorithms handle them more efficiently.',
        ],
        tradeoffs: [
          'Recursive ray tracing for reflections/refractions can spawn exponential numbers of rays at each glass surface (both reflected and refracted), requiring a maximum recursion depth limit that can cause energy loss in complex optical scenarios.',
          'Caustics are beautiful but extremely expensive to render with unidirectional path tracing because the probability of a camera ray finding the narrow caustic paths is very low. Bidirectional methods or photon mapping are much more efficient but more complex to implement.',
        ],
        realWorld: [
          'Architectural visualization renders glass curtain walls and polished floors with ray-traced reflections to show clients how natural light interacts with proposed building materials.',
          'Jewelry rendering uses ray tracing with accurate refractive indices and dispersion (splitting white light into spectral colors) to showcase how diamonds and gemstones will sparkle.',
          'Underwater scenes in films like Finding Nemo use caustic simulation to create the dappled light patterns on the ocean floor that audiences intuitively associate with underwater environments.',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Global Illumination & Radiosity',
    part: 3,
    partTitle: 'Advanced Rendering',
    summary:
      'Global illumination simulates how light bounces between surfaces, creating soft indirect lighting, color bleeding, and ambient occlusion. Radiosity solves for diffuse interreflection on static scenes.',
    concepts: [
      {
        id: 'indirect-illumination',
        name: 'Indirect Lighting & Color Bleeding',
        description:
          'Indirect illumination accounts for light that has bounced off one or more surfaces before reaching the viewer. It creates subtle but essential effects like color bleeding, where a red wall tints nearby surfaces pink.',
        keyPoints: [
          'Direct illumination considers only light traveling straight from a source to a surface. Indirect illumination adds all light that arrives after bouncing off other surfaces. The sum of direct and all indirect bounces is called global illumination (GI), and it is what makes rendered scenes look natural.',
          'Color bleeding occurs when light bouncing off a colored surface picks up that surface\'s color and deposits it on nearby surfaces. A classic example is the Cornell Box, where the red and green walls tint the white surfaces beside them, proving that indirect illumination is essential for realism.',
          'Light probes are precomputed spherical images or spherical harmonic coefficients stored at points in the scene that approximate local indirect lighting. Dynamic objects sample the nearest probes to receive approximate GI without the cost of real-time GI computation.',
          'Screen-space global illumination (SSGI) approximates indirect bounces using only the information in the current frame\'s color and depth buffers. It is fast but cannot account for light bouncing from off-screen surfaces, causing missing reflections and incomplete illumination at screen edges.',
          'Irradiance caching stores computed indirect illumination at sparse sample points and interpolates between them for nearby points with similar normals. This exploits the fact that indirect lighting varies slowly across diffuse surfaces, dramatically reducing the number of ray-traced GI samples needed.',
        ],
        tradeoffs: [
          'Precomputed GI (light probes, lightmaps) provides high-quality indirect lighting at zero runtime cost but cannot handle dynamic scene changes without rebaking, making it unsuitable for destructible environments.',
          'Real-time GI techniques like SSGI and voxel cone tracing provide dynamic indirect lighting but are approximate, often missing contributions from occluded or off-screen geometry.',
        ],
        realWorld: [
          'Unreal Engine\'s Lumen system combines screen-space tracing with software ray tracing and a surface cache to provide real-time global illumination that responds dynamically to moving lights and geometry.',
          'Architectural visualization firms bake lightmaps for interior scenes to capture how sunlight bouncing off floors illuminates ceilings, creating the warm, soft lighting clients expect in home renderings.',
          'Film rendering pipelines in studios like ILM use full path-traced global illumination with thousands of bounce paths to achieve the photorealistic quality expected in blockbuster visual effects.',
        ],
      },
      {
        id: 'radiosity',
        name: 'Radiosity & Form Factors',
        description:
          'Radiosity is a finite-element method that solves for diffuse interreflection in a scene by computing form factors between surface patches, producing view-independent soft lighting solutions.',
        keyPoints: [
          'The radiosity method discretizes scene surfaces into patches and computes how much energy each patch transfers to every other patch. The form factor F_ij represents the fraction of energy leaving patch i that arrives at patch j, determined by their relative size, distance, and orientation.',
          'Form factors are purely geometric and depend on the mutual visibility, distance, and angle between two patches. The hemicube method approximates form factors by rendering the scene from each patch\'s center onto a half-cube and counting how many pixels each other patch covers.',
          'The radiosity equation for each patch is B_i = E_i + rho_i * sum(F_ij * B_j), where B is radiosity (outgoing flux), E is emission, and rho is reflectance. This forms a system of linear equations that can be solved iteratively using Gauss-Seidel or by shooting energy from the brightest patches first.',
          'Progressive radiosity improves convergence by always shooting energy from the patch with the most unshot radiosity. After each shot, all receiving patches update their radiosity. This produces a usable solution after just a few iterations, making it practical for interactive previews.',
          'Radiosity is view-independent: once solved, the scene can be viewed from any angle without recomputation. This made it popular for architectural walkthroughs in the 1990s, where a level could be pre-lit and then explored in real time.',
        ],
        tradeoffs: [
          'Radiosity produces beautiful soft diffuse lighting but only handles perfectly diffuse (Lambertian) surfaces. Specular reflections and glossy materials require supplementing radiosity with ray tracing or other techniques.',
          'The O(n^2) form factor computation makes radiosity impractical for scenes with millions of patches. Hierarchical radiosity reduces this to O(n log n) by clustering distant patches but adds implementation complexity.',
        ],
        realWorld: [
          'Early versions of Quake and Half-Life used precomputed radiosity lightmaps to create their atmospheric, softly lit environments, stored as texture maps applied to level surfaces.',
          'Architectural lighting simulation tools like Radiance use radiosity-like methods to predict illuminance levels in buildings, helping architects meet building code daylight requirements.',
          'Dental and medical 3D visualization tools use radiosity for realistic soft lighting of tooth and tissue models because the materials are predominantly diffuse and view-independent rendering allows free camera movement.',
        ],
      },
      {
        id: 'ambient-occlusion',
        name: 'Ambient Occlusion',
        description:
          'Ambient occlusion (AO) approximates how exposed each point is to ambient light by measuring the amount of surrounding geometry that occludes it. It adds depth and contact shadows without full GI.',
        keyPoints: [
          'AO is computed by casting rays from each surface point across the hemisphere and counting how many are blocked by nearby geometry. The ratio of unblocked rays gives the occlusion factor (0 = fully occluded, 1 = fully exposed), which darkens concavities, creases, and contact points.',
          'Screen-space ambient occlusion (SSAO) approximates AO using only the depth buffer. For each pixel, it samples nearby depth values and compares them to the current pixel\'s depth. Points surrounded by closer geometry are considered more occluded. SSAO is fast but can produce haloing and misses occlusion from off-screen geometry.',
          'Horizon-based ambient occlusion (HBAO+) improves on SSAO by tracing rays along the depth buffer to find the horizon angle in multiple directions, then integrating the obscured solid angle. It produces more physically accurate results with fewer artifacts than random-sample SSAO.',
          'Ground truth ambient occlusion (GTAO) further improves accuracy by using the actual analytic integration of occlusion over the visible hemisphere, rather than stochastic sampling. It runs efficiently on modern GPUs and produces results close to ray-traced AO.',
          'Baked ambient occlusion stores precomputed AO values in a texture or per-vertex attribute. It provides perfect-quality AO with zero runtime cost but only works for static geometry. Many games combine baked AO for static environments with real-time SSAO for dynamic objects.',
        ],
        tradeoffs: [
          'Ray-traced AO produces the most accurate results but is expensive: hundreds of rays per pixel are needed for noise-free output. Screen-space methods are much faster but approximate.',
          'SSAO applies uniformly to all lighting, darkening surfaces even when the actual light source is unobstructed. This can look wrong in bright areas but is generally accepted as a visually pleasing approximation.',
        ],
        realWorld: [
          'Games like Skyrim and Dark Souls use SSAO or HBAO+ to add depth to stone corridors and character armor, making crevices darker and edges more defined without expensive per-light shadow computation.',
          'Product visualization (e.g., car configurators) bakes AO into model textures to make panel gaps, wheel wells, and interior folds visually pop, even under simple environment lighting.',
          'Blender, Maya, and 3ds Max offer AO baking tools that generate AO textures for game assets, typically at the end of the modeling pipeline before export to a game engine.',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'GPU Architecture & Shader Programming',
    part: 3,
    partTitle: 'Advanced Rendering',
    summary:
      'Modern GPUs are massively parallel processors designed for throughput over latency. Shader programs run on GPU cores to process vertices, fragments, and compute workloads with thousands of threads.',
    concepts: [
      {
        id: 'gpu-architecture',
        name: 'GPU Execution Model & Parallelism',
        description:
          'GPUs execute thousands of lightweight threads simultaneously using a SIMT (Single Instruction, Multiple Threads) architecture, where groups of threads (warps/wavefronts) execute the same instruction on different data.',
        keyPoints: [
          'A GPU contains many Streaming Multiprocessors (SMs), each with ALUs, register files, and shared memory. Each SM executes hundreds of threads concurrently, and a modern GPU can have 50-100+ SMs, enabling tens of thousands of threads in flight simultaneously.',
          'SIMT execution groups 32 threads (NVIDIA warp) or 64 threads (AMD wavefront) that execute the same instruction in lockstep. Thread divergence (different threads taking different branches) forces sequential execution of both paths, wasting throughput. Minimizing divergence is critical for GPU performance.',
          'Latency hiding is the GPU\'s primary strategy: when one warp stalls on a memory access, the SM switches to another ready warp with zero context-switch cost. This requires many in-flight warps (high occupancy) to keep ALUs busy while memory operations complete.',
          'GPU memory hierarchy includes registers (fastest, per-thread), shared memory (fast, per-SM block), L1/L2 caches, and global memory (VRAM, high bandwidth but high latency). Textures use a separate read path with hardware-accelerated filtering and a specialized cache optimized for 2D spatial locality.',
          'The GPU pipeline is a fixed sequence: input assembly, vertex shader, tessellation (optional), geometry shader (optional), rasterization, fragment shader, and output merger. Each stage is either programmable (shaders) or fixed-function (rasterization, depth test), and data flows from one stage to the next.',
        ],
        tradeoffs: [
          'GPUs achieve massive parallelism but are poor at serial, branching, or recursive algorithms. Tasks with heavy thread divergence or irregular memory access patterns (e.g., tree traversal) are much slower on GPUs than CPUs.',
          'High occupancy improves latency hiding but requires fewer registers per thread, forcing a tradeoff between per-thread compute complexity and overall throughput.',
        ],
        realWorld: [
          'Machine learning training on GPUs like the A100 exploits the same SIMT architecture designed for graphics, using the thousands of ALUs for matrix multiplications in neural network forward and backward passes.',
          'Cryptocurrency mining exploited GPU parallelism for hash computation, driving GPU shortages in 2017-2021 because the embarrassingly parallel hashing algorithm perfectly matched GPU SIMT execution.',
          'Video encoding (NVENC, AMD VCE) uses fixed-function hardware units on the GPU alongside the programmable cores to accelerate H.264/H.265 encoding for game streaming and video editing.',
        ],
      },
      {
        id: 'shader-programming',
        name: 'Vertex & Fragment Shaders',
        description:
          'Vertex shaders transform per-vertex attributes (position, normal, UV) and pass them to the rasterizer. Fragment shaders compute per-pixel color using interpolated attributes, textures, and lighting equations.',
        keyPoints: [
          'Vertex shaders run once per vertex and must output clip-space position (gl_Position in GLSL). They typically transform position by the MVP matrix, transform normals by the normal matrix, and pass UVs and other attributes to the next stage as varyings.',
          'Fragment (pixel) shaders run once per fragment generated by rasterization and output one or more color values. They sample textures, compute lighting, apply effects, and determine the final pixel color. Complex fragment shaders are the primary bottleneck in fill-rate-limited rendering.',
          'Uniforms are read-only values set by the CPU and shared across all invocations of a shader (e.g., matrices, light positions, material properties). They are stored in constant buffers and broadcast to all threads efficiently.',
          'Varyings (in/out variables between stages) are per-vertex outputs from the vertex shader that the rasterizer interpolates across the triangle for each fragment. The interpolation is perspective-correct by default and driven by barycentric coordinates.',
          'Shader compilation happens at runtime in OpenGL (GLSL compiled by the driver) or at build time in Vulkan/DirectX 12 (SPIR-V/DXIL precompiled). Precompilation avoids runtime stalls but requires compiling for each target GPU architecture, increasing build complexity.',
        ],
        tradeoffs: [
          'Performing lighting calculations in the vertex shader (Gouraud shading) is cheaper but produces visible interpolation artifacts on low-poly meshes. Per-fragment lighting (Phong shading) is more expensive but produces correct results regardless of polygon count.',
          'Uber-shaders (single shaders with many branches controlled by uniforms) simplify pipeline management but increase thread divergence. Shader permutations (many specialized shaders) improve GPU utilization but explode the number of shader variants to compile and manage.',
        ],
        realWorld: [
          'Shadertoy.com is an online platform where developers create entire procedural scenes using only a fragment shader, demonstrating the power of per-pixel computation for art and prototyping.',
          'Unity\'s Shader Graph and Unreal\'s Material Editor provide visual node-based interfaces that generate HLSL/GLSL shader code, making shader creation accessible to artists without programming experience.',
          'Mobile games often use simpler fragment shaders (e.g., single texture with vertex-lit shading) to stay within the performance budget of mobile GPUs, which have lower fill rates than desktop GPUs.',
        ],
      },
      {
        id: 'compute-shaders',
        name: 'Compute Shaders & GPGPU',
        description:
          'Compute shaders provide general-purpose GPU computation outside the graphics pipeline, enabling physics simulation, particle systems, post-processing, and parallel algorithms directly on the GPU.',
        keyPoints: [
          'Compute shaders launch a 3D grid of thread groups (workgroups), each containing a fixed number of threads. Unlike graphics shaders, they have no fixed input/output and can read/write arbitrary buffers and images, making them flexible for non-rendering tasks.',
          'Shared memory (groupshared/shared) is a small, fast memory block accessible to all threads within a workgroup. It enables cooperative algorithms like parallel reduction, prefix sum, and histogram computation where threads exchange intermediate results.',
          'Atomic operations (atomicAdd, atomicMin, etc.) allow threads to safely modify shared or global memory without race conditions. They are essential for algorithms like histogram building, where multiple threads increment the same counter, but are serialized and should be minimized for performance.',
          'Compute shaders are used for post-processing effects like bloom, tone mapping, and depth of field. They are often more efficient than fragment shaders for full-screen effects because they avoid the overhead of rasterization and can use shared memory for filter kernels.',
          'GPU-driven rendering uses compute shaders to perform culling, LOD selection, and draw call generation on the GPU, avoiding the CPU bottleneck of issuing individual draw commands. The compute shader writes indirect draw arguments that the GPU then executes autonomously.',
        ],
        tradeoffs: [
          'Compute shaders offer maximum flexibility but lack the automatic input assembly, rasterization, and blending that the graphics pipeline provides. Implementing rasterization-like behavior in compute is possible but usually less efficient.',
          'Shared memory enables fast inter-thread communication within a workgroup but is limited in size (typically 16-48 KB per SM). Algorithms requiring more shared data must tile their computation or spill to global memory.',
        ],
        realWorld: [
          'Physics engines like NVIDIA PhysX and Havok offload rigid body simulation, collision detection, and cloth simulation to GPU compute shaders, handling thousands of interacting objects in real time.',
          'Real-time video effects in applications like OBS and Adobe Premiere use compute shaders for color grading, noise reduction, and chroma keying, processing 4K frames in milliseconds.',
          'AI inference on GPU (e.g., NVIDIA TensorRT) uses compute shaders or CUDA kernels to execute neural network layers, leveraging the same parallel hardware used for graphics rendering.',
        ],
      },
    ],
  },

  // ─── Part 4: Applied Graphics ───────────────────────────────────────
  {
    id: 10,
    title: 'Color Science & HDR',
    part: 4,
    partTitle: 'Applied Graphics',
    summary:
      'Color in computer graphics involves perceptual models, color spaces, gamut mapping, and high dynamic range (HDR) workflows that bridge the gap between physical light and displayed images.',
    concepts: [
      {
        id: 'color-spaces',
        name: 'Color Spaces & Gamut',
        description:
          'Color spaces define how numerical values map to perceived colors. Different spaces (sRGB, linear RGB, Display P3, ACEScg) have different gamuts and transfer functions, and converting between them is essential for correct rendering.',
        keyPoints: [
          'sRGB is the standard color space for the web and most consumer displays. It uses a nonlinear transfer function (gamma curve, approximately gamma 2.2) that compresses dark values to allocate more precision to shadows, where human vision is most sensitive.',
          'Linear RGB uses a linear transfer function where doubling a value doubles the physical light intensity. All lighting calculations must be performed in linear space because light addition is linear; performing them in gamma-encoded sRGB produces incorrect, overly dark results.',
          'The rendering pipeline should convert sRGB textures to linear on input (sRGB texture sampling), perform all lighting and blending in linear space, and convert back to sRGB as the final step (gamma correction). GPUs handle sRGB-to-linear conversion in hardware when using sRGB texture formats.',
          'Color gamut defines the range of colors a color space can represent, typically visualized as a triangle on the CIE chromaticity diagram. Display P3 covers about 25% more area than sRGB, and Rec. 2020 covers even more. Rendering in a wide gamut preserves vivid colors that sRGB would clip.',
          'CIE XYZ is the foundational color space from which all others derive. It is designed so that Y represents luminance, and the X and Z components span all visible chromaticities. Conversion between any two RGB color spaces goes through XYZ as an intermediary using 3x3 matrices.',
        ],
        tradeoffs: [
          'Working in sRGB is simple and ubiquitous but clips vivid colors that wide-gamut displays can show. Working in a wider gamut preserves more colors but requires careful gamut mapping when outputting to sRGB displays.',
          'Higher bit depth (16-bit float vs. 8-bit integer) preserves more precision in linear space but doubles or quadruples memory usage for textures and framebuffers.',
        ],
        realWorld: [
          'Apple devices use Display P3 as their default color space, and iOS apps that don\'t account for this may show oversaturated colors on P3 displays or washed-out colors on sRGB displays.',
          'Netflix and Disney+ master content in Dolby Vision using a wide color gamut (Rec. 2020) and high dynamic range, requiring displays that support these standards for the intended viewing experience.',
          'Web browsers perform color management, converting images tagged with ICC profiles to the display\'s color space. An sRGB-tagged image and a Display P3-tagged image with the same red (255,0,0) will appear at different saturations.',
        ],
      },
      {
        id: 'hdr-rendering',
        name: 'High Dynamic Range & Tone Mapping',
        description:
          'HDR rendering computes lighting in unbounded floating-point values and then compresses the result to displayable range via tone mapping, preserving detail in both bright highlights and dark shadows.',
        keyPoints: [
          'Real-world luminance spans 14+ orders of magnitude (starlight to direct sunlight). Standard 8-bit framebuffers can only represent about 2 orders of magnitude (256 levels). HDR rendering uses 16-bit or 32-bit float framebuffers to capture the full range before compression.',
          'Tone mapping compresses HDR values to the [0,1] displayable range while preserving contrast and detail. The Reinhard operator (L / (1 + L)) is a simple global tone mapper. ACES (Academy Color Encoding System) provides an industry-standard filmic curve with a pleasing S-shape.',
          'Local tone mapping varies the compression spatially, allowing bright areas to be compressed more than dark areas. This mimics how the human eye adapts differently across the visual field but can produce halo artifacts around high-contrast edges if not carefully implemented.',
          'Bloom is an HDR-related effect where bright areas bleed light into surrounding pixels, simulating the scattering of light in camera lenses and the human eye. It is implemented by extracting pixels above a brightness threshold, blurring them, and adding the result back to the image.',
          'Exposure control adjusts the overall brightness of the HDR image before tone mapping, analogous to a camera\'s exposure setting. Auto-exposure (eye adaptation) measures the scene\'s average luminance and gradually adjusts exposure over time, simulating how the human eye adapts to changing light conditions.',
        ],
        tradeoffs: [
          'Global tone mapping is fast and consistent but can lose detail in scenes with extreme contrast. Local tone mapping preserves more detail but is slower and can introduce halo artifacts.',
          'Auto-exposure creates a cinematic feel but can be disorienting in games if it responds too quickly or incorrectly, such as when a bright sky temporarily darkens the entire view when the player looks up.',
        ],
        realWorld: [
          'Smartphone cameras use HDR imaging by capturing multiple exposures and merging them to create photos with detail in both shadows and highlights, then tone mapping the result for the display.',
          'Games like God of War and Red Dead Redemption 2 support HDR displays, rendering in wide color gamut with HDR tone mapping to display bright fire and dark caves with unprecedented contrast.',
          'Film color grading software like DaVinci Resolve works in 32-bit float linear light internally, applying tone mapping only at the final output stage to preserve maximum latitude for creative adjustments.',
        ],
      },
      {
        id: 'perceptual-color',
        name: 'Perceptual Uniformity & Color Models',
        description:
          'Perceptually uniform color spaces like CIELAB and OKLab ensure that equal numerical differences correspond to equal perceived color differences, enabling meaningful color manipulation and comparison.',
        keyPoints: [
          'CIELAB (L*a*b*) is a perceptually uniform color space where L* is lightness (0-100), a* is green-red, and b* is blue-yellow. A Euclidean distance of 1 unit (Delta E) in CIELAB corresponds to approximately the smallest color difference a trained observer can perceive.',
          'OKLab (Bjorn Ottosson, 2020) improves on CIELAB with better perceptual uniformity, especially for saturated colors and blues. Its cylindrical form OKLCh provides intuitive hue, chroma, and lightness controls, making it the recommended color space for CSS Color Level 4 perceptual color manipulation.',
          'HSL and HSV are intuitive for color pickers but are not perceptually uniform: changing the hue at constant saturation and lightness produces visible brightness variations (yellow appears brighter than blue at the same HSL lightness). OKLCh solves this problem.',
          'Color difference metrics (Delta E) quantify how different two colors appear. CIEDE2000 is the current standard, improving on the Euclidean CIELAB distance with corrections for hue, chroma, and lightness non-uniformities that the original CIELAB space does not fully capture.',
          'Gamut mapping -- converting out-of-gamut colors to the nearest displayable color -- should be performed in a perceptually uniform space to minimize visible distortion. Mapping in linear RGB can shift hues; mapping in OKLCh preserves hue while reducing chroma, which is more visually acceptable.',
        ],
        tradeoffs: [
          'Perceptually uniform spaces like CIELAB are essential for meaningful color operations but computationally expensive to convert to/from, involving nonlinear transformations through XYZ intermediate space.',
          'OKLab is simpler and more uniform than CIELAB but is newer and less supported in existing toolchains and standards that were built around CIELAB/CIEDE2000.',
        ],
        realWorld: [
          'CSS Color Level 4 introduces the oklch() and oklab() functions, enabling web developers to create perceptually uniform gradients and accessible color palettes directly in stylesheets.',
          'Brand guidelines specify colors with Delta E tolerances (e.g., "Coca-Cola red must have Delta E < 2.0 from the reference") to ensure consistent color reproduction across print, screen, and product packaging.',
          'Accessibility tools use CIELAB lightness to check contrast ratios between text and background colors, ensuring readability for users with visual impairments regardless of hue.',
        ],
      },
    ],
  },
  {
    id: 11,
    title: 'Animation & Interpolation',
    part: 4,
    partTitle: 'Applied Graphics',
    summary:
      'Animation in computer graphics combines mathematical interpolation methods with skeletal rigs, keyframes, and physics to create believable motion for characters, cameras, and objects.',
    concepts: [
      {
        id: 'keyframe-interpolation',
        name: 'Keyframes & Interpolation Curves',
        description:
          'Keyframe animation defines values at specific time points and interpolates between them. Different interpolation functions (linear, ease-in/out, spline) control the character and timing of motion.',
        keyPoints: [
          'Linear interpolation (lerp) produces constant-speed transitions between keyframes: value(t) = (1-t)*a + t*b. It is computationally trivial but creates jarring, mechanical motion with abrupt starts and stops at keyframe boundaries.',
          'Cubic Bezier curves control timing in animation editors and CSS transitions. The curve maps input time to output progress using four control points. Common presets include ease-in (slow start, fast end), ease-out (fast start, slow end), and ease-in-out (smooth acceleration and deceleration).',
          'Catmull-Rom splines pass through all control points (unlike Bezier) and provide C1 continuity, making them ideal for camera paths and object trajectories where the path must exactly hit specified positions. The tangent at each point is derived from its neighbors.',
          'B-splines and NURBS (Non-Uniform Rational B-Splines) provide smooth curves that approximate control points without passing through them. They offer local control (moving one control point only affects the nearby curve segment) and are the standard for modeling and animation curves in professional DCC tools.',
          'Frame rate independence is achieved by parameterizing animation by time (seconds) rather than frame count. The animation system evaluates curves at the current time, producing smooth motion regardless of whether the application runs at 30, 60, or variable FPS.',
        ],
        tradeoffs: [
          'Bezier curves are versatile and widely supported but require careful control point placement to avoid overshoot and oscillation. Clamped splines prevent overshoot but can flatten the curve near keyframes.',
          'Higher-order splines produce smoother curves but are harder to intuit and control. Most animation tools use cubic (order 4) as a practical balance between smoothness and controllability.',
        ],
        realWorld: [
          'CSS transitions and Web Animations API use cubic Bezier timing functions to control element animations, with the four control points defining the acceleration curve.',
          'Maya\'s Graph Editor displays animation curves as Bezier splines, allowing animators to fine-tune the timing and spacing of every keyframed property on a character.',
          'Camera flythrough sequences in games and architectural walkthroughs use Catmull-Rom splines to create smooth paths through waypoints placed by level designers.',
        ],
      },
      {
        id: 'skeletal-animation',
        name: 'Skeletal Animation & Skinning',
        description:
          'Skeletal animation drives mesh deformation through a hierarchy of bones. Skinning assigns each vertex to one or more bones with blend weights, and the vertex position is computed as a weighted sum of bone transformations.',
        keyPoints: [
          'A skeleton is a hierarchy of joints (bones) where each joint has a local transform relative to its parent. Animators create keyframes for joint rotations, and the animation system interpolates between them. The skeleton\'s world-space pose is computed by multiplying transforms from root to each joint.',
          'Linear blend skinning (LBS) computes each vertex\'s world position as a weighted sum of the vertex transformed by each influencing bone\'s matrix. Typically 4 bones per vertex suffice. The weights sum to 1, ensuring smooth blending. LBS is fast and GPU-friendly but can produce volume loss (candy-wrapper) artifacts at extreme joint rotations.',
          'Dual quaternion skinning replaces matrix blending with dual quaternion blending, which preserves volume better than LBS. It eliminates the candy-wrapper artifact at twisted joints but is more expensive computationally and does not handle non-uniform scale correctly.',
          'Blend shapes (morph targets) store per-vertex position offsets for different facial expressions or body shapes. They are linearly combined with scalar weights to produce the final vertex position. Facial animation typically uses 40-80 blend shapes for a full range of expressions.',
          'Animation blending combines multiple animations (e.g., walking + waving) by interpolating their skeletal poses. Blend trees allow smooth transitions between states (idle to walk to run) based on parameters like speed, with each leaf node being a clip and internal nodes performing weighted interpolation.',
        ],
        tradeoffs: [
          'LBS is extremely fast (a few matrix multiplies per vertex) and runs on all GPU hardware but produces artifacts at extreme joint angles. Dual quaternion skinning fixes volume loss but adds computational overhead and complexity.',
          'More blend shapes improve facial expressiveness but linearly increase memory usage and animation data size. Compression and streaming mitigate this but add implementation complexity.',
        ],
        realWorld: [
          'Every 3D game character uses skeletal animation with LBS for body movement. AAA titles like Elden Ring use skeletons with 100+ bones for detailed finger, face, and clothing deformation.',
          'Apple\'s ARKit and MetaHuman use blend shapes driven by facial tracking to animate digital faces in real time, mapping camera-captured expressions to 52 facial blend shape coefficients.',
          'Motion capture studios use skeletal rigs that match the proportions of actors wearing marker suits, retargeting captured joint angles to game character skeletons with different body proportions.',
        ],
      },
      {
        id: 'physics-animation',
        name: 'Physics-Based Animation',
        description:
          'Physics simulation adds realism by computing motion from forces: gravity, collisions, constraints, and springs. It drives secondary motion like cloth, hair, ragdoll, and fluid effects.',
        keyPoints: [
          'The Verlet integration method computes the next position from the current and previous positions: x(t+dt) = 2*x(t) - x(t-dt) + a*dt^2. It is popular for cloth and particle simulations because it is stable, simple, and implicitly handles velocity without storing it separately.',
          'Constraint satisfaction iteratively corrects particle positions to maintain distance constraints (for cloth), joint limits (for ragdolls), and collision boundaries. Multiple iterations of relaxation per frame converge toward a valid configuration, with more iterations producing stiffer results.',
          'Ragdoll physics replaces animated skeletons with rigid-body simulations constrained at joints when a character dies or is hit. Each bone becomes a rigid body with mass and collision shape, connected to neighbors by angular constraints that limit joint rotation to anatomically plausible ranges.',
          'Cloth simulation models fabric as a grid of particles connected by springs: structural springs (grid neighbors), shear springs (diagonals), and bend springs (skip-one neighbors). Wind forces and collisions with the character body produce realistic draping and fluttering.',
          'Inverse kinematics (IK) solves for joint angles that place an end effector (hand, foot) at a target position. Algorithms like CCD (Cyclic Coordinate Descent) and FABRIK (Forward And Backward Reaching IK) iteratively adjust joints from tip to root, enabling characters to reach for objects or plant feet on uneven terrain.',
        ],
        tradeoffs: [
          'More physics iterations per frame produce stiffer, more accurate cloth and ragdoll behavior but consume more CPU/GPU time, requiring careful budgeting in real-time applications.',
          'Full physics simulation is realistic but unpredictable, making it hard to art-direct. Many games blend physics with animation, using physics for secondary motion while keeping primary motion keyframed and controllable.',
        ],
        realWorld: [
          'Naughty Dog\'s The Last of Us uses a blend of keyframed animation and physics-based ragdoll for combat, switching seamlessly from animation to physics when a character takes a hit.',
          'Unreal Engine\'s Chaos cloth system simulates thousands of cloth particles per character, using GPU compute to keep the simulation fast enough for real-time games on current-gen consoles.',
          'VR games like Half-Life: Alyx use IK extensively to position the player\'s virtual hands accurately based on controller positions, making interactions with objects feel natural.',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Real-Time Rendering Techniques',
    part: 4,
    partTitle: 'Applied Graphics',
    summary:
      'Real-time rendering must produce images at 30-60+ FPS, requiring aggressive optimization techniques: level-of-detail, culling, deferred shading, and efficient draw call management.',
    concepts: [
      {
        id: 'deferred-rendering',
        name: 'Deferred Shading & G-Buffer',
        description:
          'Deferred shading separates geometry rendering from lighting by first writing surface attributes to a G-buffer (geometry buffer), then computing lighting in screen space. This decouples lighting cost from scene complexity.',
        keyPoints: [
          'The G-buffer consists of multiple render targets storing per-pixel surface data: typically world-space position (or reconstructed from depth), normal, albedo, roughness, metalness, and emissive. All of this data is written in a single geometry pass with no lighting computation.',
          'The lighting pass runs a full-screen quad (or light volume geometry) for each light, reading G-buffer values to compute that light\'s contribution. Because lighting is done per-pixel in screen space, the cost depends on screen resolution and light count, not scene geometric complexity.',
          'Deferred shading makes multi-light scenes efficient: 100+ lights cost 100 lighting passes on a fixed-resolution G-buffer, whereas forward rendering would require evaluating all 100 lights per fragment for every piece of geometry, with overdraw multiplying the cost.',
          'The main disadvantage of deferred shading is that it does not natively support transparency or MSAA. Transparent objects must be rendered in a separate forward pass, and anti-aliasing requires alternatives like FXAA, TAA, or SMAA applied as post-processing.',
          'The G-buffer consumes significant memory bandwidth: at 1080p with 5 render targets of 4 bytes each, the G-buffer is about 40 MB. At 4K, this quadruples to 160 MB. Bandwidth is often the bottleneck, leading to techniques like packing normal into two components and reconstructing position from depth.',
        ],
        tradeoffs: [
          'Deferred shading excels with many lights but wastes bandwidth writing unused G-buffer data for pixels that will be overdrawn. A depth pre-pass mitigates this but adds a geometry pass.',
          'Forward+ (tiled forward) retains forward rendering\'s transparency and MSAA support while using a compute shader to bin lights into screen-space tiles, making it competitive with deferred for many use cases.',
        ],
        realWorld: [
          'Unreal Engine uses deferred shading as its default rendering path, with G-buffer outputs including base color, metallic, roughness, world normal, and custom data channels for special materials.',
          'S.T.A.L.K.E.R. (2007) was one of the first mainstream games to use deferred shading, enabling its atmospheric lighting with dozens of dynamic light sources in underground environments.',
          'Unity offers both forward and deferred rendering paths, letting developers choose based on their game\'s needs: forward for mobile/VR and deferred for complex PC/console scenes.',
        ],
      },
      {
        id: 'lod-culling',
        name: 'Level of Detail & Culling',
        description:
          'LOD systems reduce rendering cost by displaying simpler versions of distant objects. Culling eliminates objects that cannot contribute to the final image, avoiding unnecessary processing entirely.',
        keyPoints: [
          'Discrete LOD switches between precomputed mesh versions at distance thresholds: a character might use 10,000 triangles up close, 1,000 at medium distance, and 100 far away. Hysteresis (different switch-in and switch-out distances) prevents visible popping at the boundary.',
          'Continuous LOD algorithms like progressive meshes collapse edges incrementally based on screen-space error metrics, producing a smooth degradation without discrete LOD switches. Nanite (Unreal Engine 5) uses a virtualized geometry system that streams triangles at pixel-level granularity.',
          'Frustum culling tests each object\'s bounding volume against the camera\'s view frustum. Objects entirely outside are skipped. Hierarchical culling using a bounding volume hierarchy (BVH) can cull entire branches of the scene tree in a single test, handling millions of objects efficiently.',
          'Occlusion culling determines which objects are hidden behind other objects. Hardware occlusion queries render bounding boxes with depth test only and read back whether any pixels passed. Software occlusion (like the one in Assassin\'s Creed) rasterizes simplified occluders on the CPU to build a coarse depth buffer.',
          'Draw call batching reduces CPU overhead by combining multiple objects that share the same material into a single draw call. Static batching pre-merges geometry at load time, while dynamic batching merges small meshes each frame. GPU instancing renders many copies of the same mesh with different transforms in a single draw call.',
        ],
        tradeoffs: [
          'Aggressive LOD reduces triangle count significantly but can be visible to players if transitions are abrupt. Cross-fade (alpha blending between LOD levels) hides transitions but temporarily doubles the fragment cost during the blend.',
          'Occlusion culling saves GPU work but adds CPU cost for the culling tests. In scenes with few large occluders (open landscapes), occlusion culling provides little benefit and the CPU cost is wasted.',
        ],
        realWorld: [
          'Unreal Engine 5\'s Nanite eliminates manual LOD authoring by automatically streaming and rendering only the triangles needed for each pixel, handling billions of source triangles in film-quality assets.',
          'Google Earth uses aggressive LOD for terrain and building meshes, streaming higher-detail tiles as the user zooms in and replacing them with simplified versions as they zoom out.',
          'City-building games like Cities: Skylines use LOD extensively, rendering simplified building and vehicle models for the thousands of distant objects visible in a high-altitude overview.',
        ],
      },
      {
        id: 'post-processing',
        name: 'Post-Processing Effects',
        description:
          'Post-processing applies full-screen image effects to the rendered frame before display: anti-aliasing, motion blur, depth of field, bloom, and color grading enhance visual quality and cinematic feel.',
        keyPoints: [
          'Temporal anti-aliasing (TAA) accumulates samples across multiple frames using per-pixel motion vectors to reproject previous frames. It produces smooth, stable edges with minimal performance cost but can introduce ghosting on fast-moving objects and slight blurriness that requires a sharpening pass.',
          'Motion blur simulates the streaking effect of fast movement by sampling along per-pixel velocity vectors. Per-object motion blur uses the difference between current and previous frame transforms, while camera motion blur uses the camera\'s velocity. It adds cinematic quality but can reduce visual clarity.',
          'Depth of field (DoF) simulates camera lens focus by blurring objects outside the focal range. The circle of confusion (CoC) for each pixel is computed from its depth relative to the focal distance, and a blur proportional to the CoC is applied. Bokeh shapes (circles, hexagons) add realism.',
          'Screen-space reflections (SSR) trace rays through the depth buffer to find reflected surfaces. They are efficient and produce accurate reflections for on-screen geometry but fail for off-screen objects and require fallback to reflection probes or environment maps for missing data.',
          'Color grading applies a lookup table (LUT) -- typically a 3D texture encoding input-to-output color mapping -- to the final image. This allows filmmakers and game designers to establish mood (warm sunset, cold horror, desaturated realism) without modifying individual material colors.',
        ],
        tradeoffs: [
          'TAA provides the best anti-aliasing quality-to-performance ratio but introduces temporal artifacts. MSAA provides cleaner edges without temporal issues but is expensive with deferred rendering and does not anti-alias shader edges.',
          'Excessive post-processing (bloom + DOF + motion blur + vignette) can make games look cinematic but reduces visual clarity and responsiveness, which is especially problematic for competitive multiplayer games where visibility matters.',
        ],
        realWorld: [
          'The Uncharted series pioneered heavy post-processing in console games, using motion blur, depth of field, and color grading to achieve a cinematic visual style that influenced an entire generation of action-adventure games.',
          'Competitive FPS players often disable motion blur, DOF, and bloom in settings to maximize visual clarity and reaction time, demonstrating the tension between cinematic quality and gameplay function.',
          'Instagram and Snapchat filters are essentially real-time post-processing pipelines running on mobile GPUs, applying color grading, bokeh simulation, and facial effect compositing to camera feeds.',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Image Processing & Computational Photography',
    part: 4,
    partTitle: 'Applied Graphics',
    summary:
      'Image processing operates on 2D pixel grids using convolution, frequency analysis, and computational techniques to enhance, analyze, and transform images, bridging the gap between captured photos and rendered graphics.',
    concepts: [
      {
        id: 'convolution-filters',
        name: 'Convolution & Kernel Filters',
        description:
          'Image convolution slides a small matrix (kernel) over every pixel, computing weighted sums of neighboring pixels. Different kernels produce blur, sharpen, edge detection, and emboss effects.',
        keyPoints: [
          'A convolution kernel is a small matrix (typically 3x3, 5x5, or 7x7) of weights. For each pixel, the kernel is centered on it, each neighboring pixel is multiplied by the corresponding kernel weight, and the results are summed to produce the output pixel value.',
          'A Gaussian blur kernel approximates the bell curve, weighting the center pixel most and falling off smoothly. It removes high-frequency noise and is separable: a 2D Gaussian blur can be decomposed into two sequential 1D passes (horizontal then vertical), reducing an NxN operation to 2*N.',
          'The Sobel operator detects edges by computing horizontal and vertical gradients using two 3x3 kernels. The gradient magnitude sqrt(Gx^2 + Gy^2) highlights edges while the gradient direction atan2(Gy, Gx) indicates edge orientation, forming the basis of the Canny edge detector.',
          'Unsharp masking sharpens images by subtracting a blurred version from the original: sharp = original + amount*(original - blurred). This amplifies edges and fine detail. The "amount" parameter controls sharpening strength, and the blur radius determines which spatial frequencies are enhanced.',
          'Separable filters dramatically reduce computation: a 7x7 convolution requires 49 multiplications per pixel, but if the kernel can be decomposed into a 7x1 and a 1x7 pass, only 14 multiplications are needed. Gaussian, box, and tent filters are all separable, making them efficient for large radii.',
        ],
        tradeoffs: [
          'Larger kernels capture more spatial context and produce smoother blurs but increase computation quadratically (or linearly if separable) and can cause visible blurring of fine detail near edges.',
          'Sharpening enhances detail but amplifies noise equally, making it essential to balance sharpening strength against noise levels, especially in low-light photography.',
        ],
        realWorld: [
          'Photoshop\'s Gaussian Blur and Unsharp Mask filters use GPU-accelerated separable convolutions to process high-resolution images in real time, enabling interactive editing of 50+ megapixel photographs.',
          'Computer vision systems in self-driving cars apply Sobel and Canny edge detection to camera feeds to identify lane markings, obstacles, and traffic signs in real time.',
          'Instagram\'s blur and tilt-shift effects use Gaussian blur with spatially varying kernel sizes to simulate depth-of-field, applied as a post-processing step on the GPU.',
        ],
      },
      {
        id: 'frequency-domain',
        name: 'Frequency Domain & Fourier Transform',
        description:
          'The Fourier transform decomposes an image into spatial frequency components (sine waves). Operations like filtering, compression, and deconvolution are often more intuitive or efficient in the frequency domain.',
        keyPoints: [
          'The 2D Discrete Fourier Transform (DFT) converts an image from spatial domain (pixels) to frequency domain (amplitude and phase of spatial sine waves). Low frequencies represent smooth gradients, high frequencies represent edges and fine detail. The DC component (0,0) is the average image brightness.',
          'The Fast Fourier Transform (FFT) computes the DFT in O(N log N) instead of O(N^2), making frequency-domain processing practical for large images. Power-of-two image dimensions enable the most efficient radix-2 FFT, which is why image sizes like 512, 1024, 2048 are common.',
          'Frequency-domain filtering multiplies the image\'s Fourier transform by a filter function (mask). A low-pass filter (keeping only low frequencies) blurs the image; a high-pass filter (keeping only high frequencies) extracts edges. This is equivalent to convolution in the spatial domain but can be faster for large kernels.',
          'The convolution theorem states that convolution in the spatial domain equals multiplication in the frequency domain (and vice versa). This means a large spatial convolution (e.g., 128x128 kernel) can be computed as three FFTs (two forward, one inverse) plus a pointwise multiply, which is often faster.',
          'JPEG compression uses the Discrete Cosine Transform (DCT), a variant of the Fourier transform that produces real-valued coefficients. Each 8x8 image block is transformed, and high-frequency coefficients are quantized (rounded to fewer levels) to achieve compression, exploiting the fact that most image energy is in low frequencies.',
        ],
        tradeoffs: [
          'Frequency-domain filtering is efficient for large kernels but has overhead from the FFT and inverse FFT. For small kernels (3x3, 5x5), direct spatial convolution is faster.',
          'Aggressive JPEG quantization of high-frequency DCT coefficients produces small files but introduces blocking artifacts and ringing (Gibbs phenomenon) around sharp edges.',
        ],
        realWorld: [
          'MRI scanners directly sample data in frequency domain (k-space) and use inverse FFT to reconstruct the spatial image, making the Fourier transform physically fundamental to medical imaging.',
          'JPEG, WebP, and HEIF image formats all use frequency-domain transforms (DCT or wavelet) to compress images, exploiting the concentration of image energy in low frequencies to achieve 10:1 or higher compression ratios.',
          'Audio spectrum analyzers visualize sound using FFT, and the same mathematics applied to 1D audio signals extends directly to 2D image frequency analysis, with spatial frequency replacing temporal frequency.',
        ],
      },
      {
        id: 'computational-photography',
        name: 'Computational Photography Techniques',
        description:
          'Computational photography uses software algorithms to enhance or extend the capabilities of camera hardware, producing results impossible with optics alone: HDR merging, panoramic stitching, denoising, and neural image enhancement.',
        keyPoints: [
          'HDR image merging combines multiple exposures of the same scene (e.g., 1/1000s, 1/60s, 1s) into a single high dynamic range image. Each exposure contributes detail in a different brightness range: short exposures capture highlights without clipping, long exposures reveal shadow detail without noise.',
          'Image denoising removes sensor noise (especially prominent in low-light photos) while preserving edges and detail. Classical methods like bilateral filtering blur smooth regions while respecting edges. Modern approaches use deep learning (e.g., DnCNN) to learn the noise characteristics and remove noise more effectively.',
          'Panoramic stitching aligns and blends multiple overlapping photos into a single wide-angle image. Feature matching (SIFT, ORB) identifies corresponding points between images, homography estimation aligns them, and multi-band blending (Laplacian pyramids) hides seams.',
          'Depth estimation from a single image uses monocular depth cues (perspective, occlusion, relative size) learned by neural networks. Models like MiDaS produce per-pixel depth maps from single photos, enabling portrait mode bokeh simulation, 3D photo effects, and AR object placement.',
          'Neural radiance fields (NeRF) learn a continuous 3D scene representation from a set of 2D photographs. A neural network maps 3D coordinates and viewing direction to color and density, enabling photorealistic novel-view synthesis by volume rendering through the learned field.',
        ],
        tradeoffs: [
          'Multi-frame HDR requires a static scene; moving objects cause ghosting artifacts that require deghosting algorithms, adding complexity. Single-shot HDR avoids this but has less dynamic range improvement.',
          'Neural approaches (denoising, depth estimation, NeRF) produce impressive results but require significant GPU compute, are slower than traditional methods, and can hallucinate plausible but incorrect details.',
        ],
        realWorld: [
          'Google\'s Night Sight captures and merges up to 15 frames in near-total darkness, using computational photography to produce handheld low-light photos that would be impossible with hardware alone.',
          'Apple\'s Portrait Mode uses dual cameras for stereo depth estimation (or LiDAR on Pro models) combined with neural segmentation to simulate bokeh depth-of-field on smartphone cameras.',
          'Google Maps Immersive View uses NeRF-like neural rendering to create flythrough 3D views of cities from collections of Street View and satellite imagery, synthesizing novel viewpoints that were never directly photographed.',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find((t) => t.id === id);
}
