export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Robot Anatomy & Types
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'What is the primary advantage of a servo motor over a stepper motor in robotic applications?',
    options: [
      'Servo motors are cheaper and simpler to wire',
      'Servo motors use closed-loop feedback to maintain precise position, while steppers run open-loop and can lose steps under load',
      'Servo motors do not require a motor driver',
      'Servo motors spin faster than stepper motors',
    ],
    answer: 1,
    explanation: 'Servo motors incorporate feedback (encoder or potentiometer) that continuously measures the actual shaft position and corrects errors. Stepper motors move in discrete steps without feedback, so if a step is missed under high load, the controller has no way to detect or correct the position error.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'What does LIDAR measure to create 3D point clouds?',
    options: [
      'The intensity of reflected radio waves',
      'The time-of-flight of emitted laser pulses reflected from surfaces',
      'The magnetic field variations around objects',
      'The ultrasonic echo from nearby objects',
    ],
    answer: 1,
    explanation: 'LIDAR (Light Detection and Ranging) emits laser pulses and measures the time it takes for each pulse to travel to a surface and return. Using the speed of light and the measured round-trip time, the sensor computes precise distance to each point, building dense 3D point cloud representations of the environment.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'What distinguishes a collaborative robot (cobot) from a traditional industrial robot?',
    options: [
      'Cobots are always smaller and less powerful',
      'Cobots are designed to work safely alongside humans without cages, featuring force-limited joints and compliance with ISO/TS 15066',
      'Cobots can only be programmed through teach pendants',
      'Cobots use different programming languages than industrial robots',
    ],
    answer: 1,
    explanation: 'Collaborative robots are specifically designed with safety features (force/torque sensors, rounded surfaces, force-limited joints) that allow them to operate in shared workspaces with humans without protective fences. They comply with ISO/TS 15066 power and force limiting requirements, keeping contact forces below injury thresholds.',
  },

  // Chapter 2: Kinematics & Motion
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'Why is inverse kinematics (IK) fundamentally harder than forward kinematics (FK)?',
    options: [
      'IK requires more expensive hardware',
      'IK may have multiple solutions, no solution, or singularities, whereas FK always produces a unique result',
      'IK can only be solved for 3-DOF robots',
      'FK requires numerical methods while IK has analytical solutions',
    ],
    answer: 1,
    explanation: 'Forward kinematics maps joint angles to a unique end-effector pose using matrix multiplication. Inverse kinematics does the reverse, but a given end-effector pose may correspond to multiple joint configurations (elbow up/down), may be unreachable (outside workspace), or may be at a singularity where the Jacobian loses rank.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'What is the purpose of an S-curve velocity profile compared to a trapezoidal profile?',
    options: [
      'S-curves allow the robot to move faster',
      'S-curves add jerk limits, producing continuous acceleration that reduces mechanical vibration',
      'S-curves require fewer computation resources',
      'S-curves are only used for linear actuators',
    ],
    answer: 1,
    explanation: 'Trapezoidal velocity profiles have discontinuous acceleration (instantaneous jumps), which cause mechanical vibration and stress. S-curve (7-segment) profiles add jerk limits that smooth the acceleration transitions, producing continuous acceleration. This dramatically reduces vibration and is standard in CNC and semiconductor equipment.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'What does the Jacobian matrix relate in robotic kinematics?',
    options: [
      'Joint torques to end-effector forces',
      'Joint velocities to end-effector velocities',
      'Link masses to total robot weight',
      'Motor currents to joint angles',
    ],
    answer: 1,
    explanation: 'The Jacobian matrix J relates the joint velocity vector to the end-effector velocity vector: v = J * dq/dt. It is central to velocity-level control, numerical inverse kinematics, and singularity analysis. When the Jacobian loses rank (at singularities), the robot loses one or more degrees of freedom.',
  },

  // Chapter 3: Control Systems
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'In a PID controller, what problem does the integral term solve?',
    options: [
      'It reduces overshoot and oscillation',
      'It eliminates steady-state error by accumulating past errors over time',
      'It predicts future error for faster response',
      'It limits the maximum control output',
    ],
    answer: 1,
    explanation: 'The integral term accumulates the error over time. Even when the proportional term produces too small a correction to close the remaining gap (steady-state error), the integral term keeps growing until the error is driven to zero. This is essential for applications like maintaining a precise temperature or robot joint position under gravity.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'What does computed torque control achieve in a robotic arm?',
    options: [
      'It measures the actual torque at each joint',
      'It uses the inverse dynamic model to compute feedforward torques that linearize and decouple the nonlinear robot dynamics',
      'It limits maximum torque to prevent motor damage',
      'It computes the minimum torque needed to hold a payload',
    ],
    answer: 1,
    explanation: 'Computed torque control (inverse dynamics) calculates tau = M(q)*q_ddot_desired + C(q,q_dot)*q_dot + g(q), which compensates for the robot\'s inertia, Coriolis/centrifugal effects, and gravity. This linearizes and decouples the inherently nonlinear, coupled robot dynamics, allowing simple PD controllers on each joint independently.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'What is the primary advantage of the Extended Kalman Filter (EKF) over a basic complementary filter for IMU sensor fusion?',
    options: [
      'EKF runs faster on microcontrollers',
      'EKF optimally combines multiple sensors with different noise characteristics and handles nonlinear dynamics, providing uncertainty estimates',
      'EKF does not require any tuning parameters',
      'EKF only needs a gyroscope, not an accelerometer',
    ],
    answer: 1,
    explanation: 'The EKF handles arbitrary nonlinear system dynamics, fuses any number of sensors optimally based on their noise characteristics (via the Kalman gain), tracks state uncertainty (covariance matrix), and adapts its trust in each sensor. A complementary filter only blends two sensors with a fixed-bandwidth trade-off and provides no uncertainty estimate.',
  },

  // Chapter 4: Computer Vision for Robotics
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'Why is camera calibration essential before using a camera for robotic measurement?',
    options: [
      'To increase the camera resolution',
      'To determine intrinsic parameters (focal length, distortion) and extrinsic parameters (pose) needed to map between 3D world points and 2D image pixels',
      'To connect the camera to the robot controller',
      'To enable autofocus on the camera',
    ],
    answer: 1,
    explanation: 'Camera calibration determines the intrinsic matrix K (focal length, principal point, distortion coefficients) that models how the camera forms images, and the extrinsic pose [R|t] that relates the camera to the robot coordinate frame. Without calibration, pixel measurements cannot be converted to accurate metric 3D positions.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What is the key difference between single-stage (YOLO) and two-stage (Faster R-CNN) object detectors?',
    options: [
      'YOLO can only detect one object per image',
      'YOLO directly predicts boxes and classes in one pass (faster), while Faster R-CNN first generates proposals then classifies them (more accurate)',
      'Faster R-CNN works only on grayscale images',
      'Single-stage detectors require more GPU memory',
    ],
    answer: 1,
    explanation: 'Two-stage detectors like Faster R-CNN first generate candidate regions (proposals) then classify each one, achieving higher accuracy especially on small and occluded objects. Single-stage detectors like YOLO predict bounding boxes and class probabilities directly from the feature map in a single forward pass, achieving 10-100x faster inference at some cost to accuracy.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'Why do structured light depth sensors fail in direct sunlight?',
    options: [
      'Sunlight damages the sensor hardware',
      'Ambient sunlight overwhelms the projected infrared pattern, making it invisible to the sensor',
      'The sensor overheats in direct sunlight',
      'Sunlight causes the sensor to focus incorrectly',
    ],
    answer: 1,
    explanation: 'Structured light sensors project a known infrared pattern onto the scene and analyze its deformation to compute depth. In direct sunlight, the solar infrared radiation is far stronger than the projected pattern, drowning it out and making depth computation impossible. This is why structured light is primarily an indoor technology.',
  },

  // Chapter 5: SLAM & Mapping
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'What is loop closure in SLAM and why is it critical?',
    options: [
      'Closing all loops in the robot\'s wiring to prevent short circuits',
      'Detecting when the robot revisits a previously mapped area, triggering graph optimization that corrects accumulated drift in the entire trajectory',
      'Shutting down the SLAM algorithm when mapping is complete',
      'Connecting the start and end points of a circular path',
    ],
    answer: 1,
    explanation: 'As a robot navigates, small errors in odometry accumulate (drift), causing the map to gradually distort. Loop closure detects when the robot returns to a previously visited location, creating a constraint that the position must match. Graph optimization then distributes this correction across the entire trajectory, fixing the accumulated drift.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'What is the main advantage of LIDAR SLAM over visual SLAM?',
    options: [
      'LIDAR SLAM is cheaper to deploy',
      'LIDAR SLAM provides centimeter-level accuracy, works in darkness, and produces metrically accurate maps regardless of lighting conditions',
      'LIDAR SLAM requires no calibration',
      'LIDAR SLAM uses less computational power',
    ],
    answer: 1,
    explanation: 'LIDAR provides direct, precise distance measurements (1-5 cm accuracy) using laser pulses, independent of ambient lighting. It works equally well in total darkness or bright sunlight. Visual SLAM depends on camera features that are affected by lighting changes, motion blur, and textureless environments.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'How does OctoMap efficiently represent 3D environments?',
    options: [
      'By storing every voxel at the same resolution',
      'Using an octree data structure that adaptively allocates fine resolution near surfaces and coarse resolution in open/unknown space',
      'By converting all data to 2D images',
      'By only storing the surfaces and deleting everything else',
    ],
    answer: 1,
    explanation: 'OctoMap uses an octree (recursive 3D subdivision) where each node can be subdivided into 8 children. Large uniform regions (open space, unknown areas) are represented by single large nodes, while detailed surfaces use fine-resolution leaf nodes. This adaptive representation reduces memory by orders of magnitude compared to uniform voxel grids.',
  },

  // Chapter 6: Motion Planning
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'What is configuration space (C-space) in motion planning?',
    options: [
      'The physical workspace the robot occupies',
      'A mathematical space where each point represents a unique robot configuration, with obstacles mapped as forbidden regions',
      'The settings menu of the robot controller',
      'The space between the robot and the nearest obstacle',
    ],
    answer: 1,
    explanation: 'Configuration space transforms the problem of moving a complex multi-link robot through 3D space into finding a path for a single point through an abstract n-dimensional space (n = number of joints). Physical obstacles are mapped into C-space as forbidden regions. A collision-free path in C-space corresponds to a collision-free motion in physical space.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'How does RRT (Rapidly-exploring Random Tree) explore the configuration space?',
    options: [
      'It exhaustively checks every possible configuration',
      'It repeatedly samples random configurations, extends the nearest tree node toward them, and adds collision-free extensions to the tree',
      'It follows a grid pattern across the entire space',
      'It only explores straight-line paths between start and goal',
    ],
    answer: 1,
    explanation: 'RRT grows a tree by: (1) sampling a random point in C-space, (2) finding the nearest existing tree node, (3) extending from that node toward the sample by a fixed step size, (4) adding the new configuration if it is collision-free. This Voronoi bias causes the tree to rapidly explore toward large unexplored regions of C-space.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'What advantage does D* Lite have over running A* from scratch for dynamic replanning?',
    options: [
      'D* Lite always finds shorter paths than A*',
      'D* Lite efficiently repairs only the affected portion of the path when obstacles change, instead of replanning from scratch',
      'D* Lite does not require a map',
      'D* Lite works without knowing the goal position',
    ],
    answer: 1,
    explanation: 'D* Lite maintains the search graph between planning calls. When edge costs change (new obstacles detected or obstacles removed), it only recomputes the portion of the path affected by the change. This incremental approach is orders of magnitude faster than running A* from scratch, enabling real-time replanning at 10-100 Hz for mobile robots.',
  },

  // Chapter 7: ROS (Robot Operating System)
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'What communication pattern do ROS topics use?',
    options: [
      'Request-response (client-server)',
      'Publish-subscribe, where publishers send messages to named channels and any number of subscribers receive them independently',
      'Peer-to-peer file transfer',
      'Shared memory with locks',
    ],
    answer: 1,
    explanation: 'ROS topics use asynchronous publish-subscribe communication. A publisher sends typed messages to a named topic, and any number of subscribers independently receive copies. The publisher does not know or care how many subscribers exist, enabling loose coupling between modules. This pattern is ideal for streaming sensor data.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'What major architectural improvement does ROS 2 bring over ROS 1?',
    options: [
      'ROS 2 uses Python instead of C++',
      'ROS 2 replaces the single-point-of-failure roscore/master with DDS-based peer-to-peer discovery, plus configurable Quality of Service policies',
      'ROS 2 eliminates the need for message types',
      'ROS 2 only runs on embedded systems',
    ],
    answer: 1,
    explanation: 'ROS 1 required a running roscore (master) for node discovery — if it died, the entire system failed. ROS 2 uses the DDS (Data Distribution Service) standard which provides decentralized, peer-to-peer discovery with no single point of failure. Additionally, DDS QoS policies allow tuning reliability, durability, and deadline for each communication channel.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'What is the primary purpose of Gazebo in robotics development?',
    options: [
      'To program robot controllers in a visual interface',
      'To simulate robot physics, sensors, and environment interactions in a virtual world, publishing data on the same ROS topics as real hardware',
      'To monitor real robot performance in production',
      'To compile and build ROS packages',
    ],
    answer: 1,
    explanation: 'Gazebo simulates robot dynamics using physics engines (ODE, Bullet, DART), generates realistic sensor measurements (camera, LIDAR, IMU with configurable noise), and models environment interactions (friction, contact). Crucially, it publishes data on the same ROS topics as real hardware, so the same ROS code runs in simulation and on the real robot.',
  },

  // Chapter 8: Embedded Systems
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'Why is an STM32 microcontroller preferred over an Arduino for industrial motor control?',
    options: [
      'STM32 is cheaper than Arduino',
      'STM32 provides hardware timers for precise PWM, DMA for CPU-free data transfer, 32-bit performance at 72-480 MHz, and hardware floating-point support',
      'Arduino cannot generate PWM signals',
      'STM32 has built-in WiFi and Bluetooth',
    ],
    answer: 1,
    explanation: 'STM32 ARM Cortex-M MCUs provide hardware timer peripherals that generate sub-microsecond-precision PWM for motor drives, DMA that transfers sensor data without CPU intervention, 32-bit processing at up to 480 MHz with hardware FPU, and the HAL/LL libraries for register-level control. Arduino\'s 8-bit AVR at 16 MHz lacks the timer resolution and processing power for precise real-time motor control.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'What is priority inversion in an RTOS and how does FreeRTOS mitigate it?',
    options: [
      'When low-priority tasks run before high-priority tasks due to a bug; fixed by restarting the system',
      'When a high-priority task waits for a resource held by a low-priority task; mitigated by FreeRTOS mutex priority inheritance that temporarily boosts the low-priority task\'s priority',
      'When two tasks have the same priority; fixed by assigning unique priorities',
      'When tasks execute in reverse order; fixed by disabling preemption',
    ],
    answer: 1,
    explanation: 'Priority inversion occurs when a high-priority task blocks waiting for a mutex held by a low-priority task, and a medium-priority task preempts the low-priority task, indefinitely delaying the high-priority task. FreeRTOS mutexes implement priority inheritance: the low-priority task temporarily inherits the high-priority task\'s priority while holding the mutex, preventing medium-priority tasks from preempting it.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'What is the complementary filter approach for IMU attitude estimation?',
    options: [
      'Using two identical sensors and averaging their outputs',
      'Blending gyroscope (accurate short-term, drifts long-term) with accelerometer (noisy short-term, accurate long-term) using a weighted sum: angle = alpha*(angle + gyro*dt) + (1-alpha)*accel_angle',
      'Running two Kalman filters and choosing the better result',
      'Using only the magnetometer for heading estimation',
    ],
    answer: 1,
    explanation: 'The complementary filter exploits the fact that gyroscope integration is accurate at high frequencies (short-term) but drifts at low frequencies, while the accelerometer-derived angle is accurate at low frequencies (long-term) but noisy at high frequencies. The filter blends both: trusting the gyroscope for fast changes and the accelerometer for long-term reference, using a single tuning parameter alpha.',
  },

  // Chapter 9: Robot Learning
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'What is the major challenge of using reinforcement learning for real robot training?',
    options: [
      'RL algorithms are too simple for robotic tasks',
      'Sample efficiency — model-free RL requires millions of interactions, which is impractically slow, expensive, and potentially dangerous on real hardware',
      'RL can only learn discrete actions, not continuous motor commands',
      'RL requires labeled datasets that are expensive to create',
    ],
    answer: 1,
    explanation: 'Model-free RL algorithms like PPO require millions of environment interactions to learn even simple tasks. On a real robot, each interaction happens in real-time, risks damaging the hardware during random exploration, and causes mechanical wear. This is why most robotic RL is trained in simulation and then transferred to the real robot (sim-to-real).',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'What is the compounding error problem in behavioral cloning?',
    options: [
      'Errors in the training data compound during the recording process',
      'Small deviations from the expert trajectory lead to unfamiliar states, causing increasingly worse predictions that cascade into failure',
      'The policy becomes more accurate over time, compounding improvements',
      'Multiple experts provide conflicting demonstrations',
    ],
    answer: 1,
    explanation: 'Behavioral cloning trains a policy to predict expert actions from observations. When deployed, small prediction errors cause the robot to deviate from the expert trajectory. Since the policy was never trained on these deviated states, it makes worse predictions, causing further deviation. This cascading failure is the fundamental limitation of pure behavioral cloning.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'How does domain randomization enable sim-to-real transfer?',
    options: [
      'By making the simulation identical to the real world',
      'By varying simulation parameters (friction, mass, lighting, textures, noise) during training so the policy learns to be robust to variation, treating the real world as just another randomized instance',
      'By training only on real-world data and ignoring simulation',
      'By randomizing the reward function to prevent overfitting',
    ],
    answer: 1,
    explanation: 'Domain randomization exposes the policy to many simulated variations of physics, appearance, and sensor characteristics during training. The trained policy becomes robust to these variations rather than overfitting to one simulation setting. When deployed on the real robot, the real-world conditions fall within the range of randomized training conditions, enabling successful transfer without real-world training data.',
  },

  // Chapter 10: Swarm Robotics
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'What is stigmergy and how does it enable swarm coordination?',
    options: [
      'A type of sensor used in swarm robots',
      'Indirect communication through environmental modifications (like ant pheromone trails) that enables scalable coordination without explicit robot-to-robot communication',
      'A centralized control algorithm for robot swarms',
      'A method of charging multiple robots simultaneously',
    ],
    answer: 1,
    explanation: 'Stigmergy (from Greek: stigma "mark" + ergon "work") is coordination through the environment. Real ants deposit pheromone trails that recruit other ants to food sources. Robot swarms can use virtual pheromones, physical markers, or environmental modifications for the same purpose. This scales to unlimited swarm sizes because robots communicate through the shared environment rather than direct messaging.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'What three rules produce emergent flocking behavior in Reynolds\' Boids model?',
    options: [
      'Move, stop, turn',
      'Separation (avoid crowding neighbors), alignment (match neighbor velocity), and cohesion (steer toward neighbor center)',
      'Lead, follow, scatter',
      'Attract, repel, orbit',
    ],
    answer: 1,
    explanation: 'Reynolds\' 1987 Boids model demonstrates that realistic flocking emerges from three purely local rules: (1) Separation — steer away from nearby neighbors to avoid collision, (2) Alignment — match the velocity of nearby neighbors, (3) Cohesion — steer toward the center of mass of nearby neighbors. No global coordination or leader is required.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'Why is Byzantine fault tolerance important for safety-critical robot swarms?',
    options: [
      'It helps robots navigate Byzantine-era architecture',
      'It enables the swarm to reach correct consensus even when some robots are malfunctioning or sending incorrect information, requiring at least 3f+1 robots to tolerate f faulty nodes',
      'It prevents robots from running out of battery',
      'It encrypts communication between swarm members',
    ],
    answer: 1,
    explanation: 'In safety-critical swarm applications, some robots may malfunction (sending incorrect sensor data) or be compromised (sending malicious commands). Byzantine fault tolerant consensus ensures the swarm reaches correct collective decisions despite up to f faulty nodes, as long as at least 3f+1 total robots participate. Without BFT, a single faulty robot could corrupt the entire swarm\'s decision.',
  },

  // Chapter 11: Autonomous Vehicles
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'What is mid-level fusion in autonomous vehicle perception?',
    options: [
      'Fusing data from sensors mounted at the middle of the vehicle',
      'Fusing learned features at intermediate neural network layers across sensor modalities, combining the strengths of each sensor before final detection',
      'Using only medium-range sensors',
      'Averaging the outputs of different sensors',
    ],
    answer: 1,
    explanation: 'Mid-level fusion (BEVFusion, TransFusion) runs independent feature extraction on each sensor modality (camera, LIDAR, radar), then fuses the intermediate feature representations before the final detection head. This preserves each sensor\'s unique information (camera color/texture, LIDAR geometry, radar velocity) while allowing the network to learn optimal cross-modal correlations.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'What is the Responsibility-Sensitive Safety (RSS) framework?',
    options: [
      'A framework for responsible AI development by tech companies',
      'A mathematical model that formally defines safe driving rules, guaranteeing the autonomous vehicle will not be at fault in a collision if it follows RSS constraints',
      'A method for testing vehicle crash safety',
      'A regulatory requirement for vehicle insurance',
    ],
    answer: 1,
    explanation: 'RSS, developed by Mobileye (Intel), provides mathematical formulas for safe following distances, right-of-way rules, and collision avoidance. If the AV follows RSS constraints, it can be formally proven that the AV will not cause a collision. RSS provides a safety guarantee layer that sits above the main planning system, vetoing unsafe plans.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'What is the fundamental challenge of maintaining HD maps for autonomous driving?',
    options: [
      'HD maps are too large to store on vehicle computers',
      'The real world constantly changes (construction, new signs, lane changes), requiring continuous expensive updates to keep maps current',
      'HD maps cannot represent three-dimensional road features',
      'HD maps are only available in the United States',
    ],
    answer: 1,
    explanation: 'HD maps must accurately represent lane geometry, traffic signs, signals, and road features at centimeter accuracy. But roads change constantly: construction zones appear, new signs are installed, lanes are reconfigured, and seasonal changes (snow, vegetation) alter the appearance. Keeping maps current across entire operating domains requires massive fleet-sourced data collection and processing infrastructure.',
  },

  // Chapter 12: Drones & Aerial Robotics
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'What does the motor mixer in a drone flight controller do?',
    options: [
      'It physically combines fuel with air for the motors',
      'It translates commanded thrust and torques (roll, pitch, yaw) into individual motor speed commands based on the frame geometry',
      'It adjusts the motor voltage to prevent overheating',
      'It synchronizes all motors to spin at the same speed',
    ],
    answer: 1,
    explanation: 'The motor mixer converts the controller\'s abstract commands (total thrust, roll torque, pitch torque, yaw torque) into the specific speed for each motor. For a quadrotor, each motor contributes differently to roll, pitch, and yaw based on its position. The mixing matrix encodes these geometric relationships so the right combination of motor speeds produces the desired forces and moments.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'Why is Visual-Inertial Odometry (VIO) essential for indoor drone navigation?',
    options: [
      'Indoor environments have too many obstacles for LIDAR',
      'GPS is unavailable or unreliable indoors, so VIO fuses camera and IMU data to estimate the drone\'s position and orientation without GPS',
      'VIO is only needed for photography drones',
      'Indoor drones cannot use any electronic sensors',
    ],
    answer: 1,
    explanation: 'GPS signals cannot penetrate buildings reliably, making GPS-based navigation unusable indoors. VIO (Visual-Inertial Odometry) estimates the drone\'s 6DOF pose by tracking visual features across camera frames and fusing this with IMU acceleration and angular rate measurements. The IMU provides high-rate motion estimates during fast maneuvers, while vision corrects IMU drift.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'What is NDVI and why is it useful in drone-based agriculture?',
    options: [
      'A type of drone camera sensor',
      'Normalized Difference Vegetation Index, computed from NIR and Red spectral bands, which detects crop health and stress before it is visible to the human eye',
      'A navigation system for agricultural drones',
      'A standard for drone communication in rural areas',
    ],
    answer: 1,
    explanation: 'NDVI = (NIR - Red) / (NIR + Red), where NIR is near-infrared reflectance and Red is visible red reflectance. Healthy vegetation strongly reflects NIR and absorbs red light (high NDVI), while stressed or dying vegetation reflects less NIR (low NDVI). Multispectral cameras on drones compute NDVI maps that reveal crop stress, disease, and irrigation issues days to weeks before they become visible.',
  },

  // Chapter 13: Ethics & Safety
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'What are the four collaborative operation modes defined in ISO/TS 15066?',
    options: [
      'Manual, semi-automatic, automatic, and fully autonomous',
      'Safety-rated monitored stop, hand guiding, speed and separation monitoring, and power and force limiting',
      'Emergency stop, pause, slow, and full speed',
      'Visual monitoring, audio warning, physical barrier, and software lock',
    ],
    answer: 1,
    explanation: 'ISO/TS 15066 defines four modes for robots operating near humans: (1) Safety-rated monitored stop — robot stops when human enters workspace, (2) Hand guiding — human physically guides the robot, (3) Speed and separation monitoring — robot adjusts speed based on human proximity, (4) Power and force limiting — robot limits contact forces below injury thresholds.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'Why are Asimov\'s Three Laws of Robotics impractical as actual engineering specifications?',
    options: [
      'They were written for entertainment, not engineering',
      'They require solving unsolved problems: value alignment (defining "harm"), natural language understanding (interpreting "orders"), and omniscient prediction (foreseeing all consequences of actions)',
      'They only apply to humanoid robots',
      'Modern robots are not advanced enough to follow any rules',
    ],
    answer: 1,
    explanation: 'Asimov\'s Laws sound simple but implementing them requires: (1) defining "harm" across all possible scenarios (the value alignment problem), (2) understanding natural language orders and their intent (an unsolved NLP problem), and (3) predicting all consequences of actions to prevent harm through inaction (requiring omniscient foresight). Even Asimov\'s own stories explored how these laws fail in practice.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'What does the EU AI Act classify as "high-risk AI systems" in the context of robotics?',
    options: [
      'Any robot that costs more than 10,000 euros',
      'Autonomous robots in safety-critical applications (medical, transportation, critical infrastructure) requiring conformity assessments, transparency, and human oversight',
      'Robots that use deep learning algorithms',
      'Only military and law enforcement robots',
    ],
    answer: 1,
    explanation: 'The EU AI Act (2024) classifies AI systems by risk level. Autonomous robots operating in safety-critical domains — medical devices, transportation (autonomous vehicles), critical infrastructure, and law enforcement — are classified as "high-risk" and must undergo conformity assessments, maintain transparency documentation, implement human oversight mechanisms, and meet accuracy and robustness requirements.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
