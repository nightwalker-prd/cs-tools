export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Edge Computing Fundamentals
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'What is the primary difference between fog computing and edge computing?',
    options: [
      'Fog computing is faster than edge computing',
      'Fog computing uses intermediate network nodes (gateways, routers) between devices and the cloud, while edge computing processes data at or near the device itself',
      'Edge computing requires a constant internet connection while fog computing does not',
      'Fog computing is a proprietary AWS service',
    ],
    answer: 1,
    explanation: 'Fog computing, a term coined by Cisco, extends cloud capabilities to intermediate network infrastructure (gateways, routers, local servers) closer to edge devices. Edge computing places compute directly at or near the data source. Fog occupies the middle tier in the cloud-fog-edge-device continuum, aggregating and pre-processing data before forwarding summaries to the cloud.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'Why is edge computing essential for autonomous vehicles?',
    options: [
      'It reduces the cost of cloud subscriptions',
      'Autonomous vehicles generate 1-5 TB of sensor data per hour, and safety-critical driving decisions require sub-10ms latency that cloud round-trips cannot reliably provide',
      'Edge computing makes vehicles lighter by removing onboard computers',
      'Cloud computing is not allowed in vehicles by regulation',
    ],
    answer: 1,
    explanation: 'Autonomous vehicles generate massive amounts of sensor data (1-5 TB/hour from cameras, LiDAR, radar) and must make split-second safety decisions. Cloud round-trip latency (20-100ms minimum) is too slow for real-time driving control that requires sub-10ms response. Processing data locally on the vehicle edge compute platform is physically necessary for safe autonomous operation.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'In the data gravity pattern for edge architecture, what principle does it follow?',
    options: [
      'Data should always be moved to the largest data center for processing',
      'Analytics and processing move to where data is generated, minimizing data movement rather than moving data to where processing exists',
      'Heavier data files should be stored at the bottom of the network hierarchy',
      'Data is automatically compressed based on its size',
    ],
    answer: 1,
    explanation: 'The data gravity pattern recognizes that moving massive volumes of IoT/sensor data is expensive and slow. Instead of sending data to processing (cloud), the pattern brings processing to where data is generated (edge). This minimizes network bandwidth consumption and latency by co-locating compute with data sources.',
  },

  // Chapter 2: IoT Devices & Protocols
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'What is the key advantage of an MCU like the ESP32 over a single-board computer like Raspberry Pi for IoT sensor deployments?',
    options: [
      'The ESP32 has more RAM and faster processors',
      'The ESP32 runs a full Linux operating system with Docker support',
      'The ESP32 draws only milliwatts of power with deep sleep modes drawing ~10 microamps, enabling years of battery-powered operation',
      'The ESP32 costs more but provides better graphics capabilities',
    ],
    answer: 2,
    explanation: 'ESP32 microcontrollers excel in battery-powered IoT sensor deployments because of their ultra-low power consumption. Deep sleep mode draws only ~10 microamps, enabling years of operation on batteries. While Raspberry Pi provides more compute power (full Linux, Docker, ML frameworks), it draws watts of power and requires a constant power supply, making it unsuitable for battery-powered field sensors.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'Which MQTT QoS level guarantees exactly-once delivery?',
    options: [
      'QoS 0 (at most once)',
      'QoS 1 (at least once)',
      'QoS 2 (exactly once)',
      'QoS 3 (guaranteed order)',
    ],
    answer: 2,
    explanation: 'MQTT supports three QoS levels: QoS 0 (at most once, fire-and-forget, no acknowledgment), QoS 1 (at least once, acknowledged but may produce duplicates), and QoS 2 (exactly once, using a four-step handshake to prevent duplicates). QoS 2 has the highest overhead but guarantees each message is received exactly once. There is no QoS 3 in the MQTT specification.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'What does the device twin/shadow pattern enable in IoT device management?',
    options: [
      'Running two identical physical devices for redundancy',
      'Maintaining a cloud-side virtual representation of device state that enables configuration pushes even when devices are offline, with changes syncing when connectivity resumes',
      'Creating a physical backup copy of the device hardware',
      'Mirroring device displays to a remote monitoring screen',
    ],
    answer: 1,
    explanation: 'The device twin (Azure) or device shadow (AWS) pattern maintains a virtual representation of each physical device state in the cloud. When an operator changes a configuration, the desired state is updated in the twin. If the device is offline, the change is queued and automatically synced when the device reconnects, reconciling the desired and reported states.',
  },

  // Chapter 3: Embedded Systems & RTOS
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'What makes FreeRTOS suitable for edge IoT devices compared to general-purpose operating systems like Linux?',
    options: [
      'FreeRTOS has a better graphical user interface',
      'FreeRTOS supports more programming languages',
      'FreeRTOS kernel is under 10KB, provides deterministic scheduling with sub-microsecond context switches, and runs on MCUs with as little as 32KB RAM',
      'FreeRTOS includes built-in web browser and multimedia support',
    ],
    answer: 2,
    explanation: 'FreeRTOS is designed for resource-constrained MCUs, with a kernel under 10KB of flash. It provides hard real-time guarantees with deterministic preemptive scheduling and sub-microsecond context switch times on ARM Cortex-M processors. Linux requires minimum 8-16MB RAM and cannot provide hard real-time guarantees without RT-PREEMPT patches. FreeRTOS runs on 40%+ of MCUs shipped worldwide.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'Why is static memory allocation strongly preferred over dynamic allocation (malloc/free) in embedded systems?',
    options: [
      'Static allocation is faster to write code for',
      'Dynamic allocation is not supported by any MCU',
      'Static allocation avoids heap fragmentation, memory leaks, and non-deterministic allocation times that can violate real-time constraints in long-running embedded systems',
      'Static allocation uses more memory, which is beneficial',
    ],
    answer: 2,
    explanation: 'In embedded systems that must run continuously for years, dynamic memory allocation (malloc/free) risks heap fragmentation (allocatable memory becomes scattered into unusable small blocks), memory leaks (forgotten frees), and non-deterministic timing (allocation time varies based on heap state). Static allocation guarantees memory availability at compile time and ensures deterministic behavior, critical for safety-certified real-time systems.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'How do energy-harvesting IoT devices achieve perpetual operation without batteries?',
    options: [
      'They use nuclear micro-reactors',
      'They scavenge ambient energy from solar, vibration, or thermal sources, operating within ultra-low power budgets of 100 microwatts or less',
      'They download energy from the cloud via Wi-Fi signals',
      'They use superconducting materials that eliminate power consumption',
    ],
    answer: 1,
    explanation: 'Energy harvesting devices collect ambient energy from their environment — solar cells, piezoelectric vibration harvesters, thermoelectric generators, or even RF energy. By designing systems that operate within extremely tight power budgets (100 microwatts or less), these devices can run perpetually without batteries or wiring. EnOcean switches, for example, generate enough energy from a button press to transmit a wireless command.',
  },

  // Chapter 4: Edge Platforms
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'What is the key capability that both AWS IoT Greengrass and Azure IoT Edge provide for disconnected operation?',
    options: [
      'They switch to satellite internet automatically',
      'They store-and-forward: messages are queued locally during cloud connectivity loss and automatically synced when connectivity resumes',
      'They shut down gracefully until connectivity returns',
      'They switch to Bluetooth communication with nearby devices',
    ],
    answer: 1,
    explanation: 'Both AWS IoT Greengrass and Azure IoT Edge implement store-and-forward capability. When cloud connectivity is lost, local processing continues and messages are queued in local persistent storage. Once connectivity resumes, the queued messages are automatically forwarded to the cloud in order. This enables continuous edge operation even in environments with intermittent connectivity.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'Why do Cloudflare Workers achieve sub-5ms cold start times?',
    options: [
      'They use specially designed hardware accelerators',
      'They pre-warm all functions in every region',
      'They run on V8 isolates instead of containers, sharing a single process with thousands of isolates at a fraction of container startup overhead',
      'They cache the compiled code in every browser worldwide',
    ],
    answer: 2,
    explanation: 'Cloudflare Workers use V8 isolates (the JavaScript engine from Chrome) rather than containers or virtual machines. V8 isolates provide strong security isolation at the process level while sharing the same runtime instance, enabling sub-5ms cold starts versus the milliseconds-to-seconds required to start a container. This architecture allows thousands of concurrent isolates per server with minimal overhead.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'What is the JAMstack architecture in the context of CDN edge computing?',
    options: [
      'A JavaScript framework for building mobile applications',
      'A hardware architecture for edge servers',
      'An architecture that pre-renders static pages at build time and enhances them with edge functions for dynamic personalization and API proxying, leveraging CDN distribution',
      'A proprietary AWS deployment model for Lambda functions',
    ],
    answer: 2,
    explanation: 'JAMstack (JavaScript, APIs, Markup) pre-renders static HTML at build time for CDN distribution, then enhances pages with client-side JavaScript and edge functions for dynamic features. This approach combines the performance and reliability of static CDN delivery with the flexibility of dynamic server-side logic running at edge locations, enabling personalization, A/B testing, and API proxying without origin server round-trips.',
  },

  // Chapter 5: Containerization at the Edge
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'What makes K3s suitable for edge deployments compared to standard Kubernetes?',
    options: [
      'K3s supports more cloud providers than standard Kubernetes',
      'K3s is a single 70MB binary that replaces etcd with SQLite, runs on ARM and x86 with 512MB minimum RAM, while maintaining CNCF-certified Kubernetes compatibility',
      'K3s removes container support and runs applications directly on the OS',
      'K3s only works with Docker containers, not other runtimes',
    ],
    answer: 1,
    explanation: 'K3s (by Rancher/SUSE) packages Kubernetes into a single 70MB binary optimized for edge: it replaces etcd with lightweight SQLite, removes legacy cloud-provider APIs and storage drivers, and runs on both ARM and x86 architectures with as little as 512MB RAM. Despite these optimizations, K3s maintains full CNCF-certified Kubernetes API compatibility, so standard Kubernetes manifests work unchanged.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'What is the primary advantage of WebAssembly (WASM) over containers for edge computing?',
    options: [
      'WASM supports more programming languages than containers',
      'WASM modules start in microseconds and consume KBs of memory versus milliseconds-seconds and MBs for containers, providing dramatically better density and startup time',
      'WASM provides root-level access to the host operating system',
      'WASM eliminates the need for any runtime environment',
    ],
    answer: 1,
    explanation: 'WebAssembly modules start in microseconds (vs milliseconds-to-seconds for containers) and consume kilobytes of memory (vs megabytes for containers). This enables massive concurrency — a single edge server can run thousands of WASM instances simultaneously. The sandbox isolation is also more secure by default, using capability-based access control where modules must be explicitly granted access to resources.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'How does KubeEdge handle disconnected edge nodes?',
    options: [
      'It migrates all pods to the cloud when edge nodes disconnect',
      'It shuts down all workloads until connectivity resumes',
      'Edge nodes continue running pods autonomously using local metadata persistence, reconciling state with the cloud control plane when connectivity resumes',
      'It requires manual intervention to restart pods after reconnection',
    ],
    answer: 2,
    explanation: 'KubeEdge extends Kubernetes with autonomous edge node capability. When an edge node loses connectivity to the cloud control plane, it continues running its assigned pods using locally persisted metadata (pod specs, configmaps, secrets). The EdgeCore component maintains pod lifecycle independently. When connectivity resumes, the node reconciles its state with the cloud-side CloudCore, synchronizing any changes.',
  },

  // Chapter 6: Networking & Connectivity
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'What are the three service classes defined by 5G?',
    options: [
      'Voice, Data, and Video',
      'eMBB (enhanced Mobile Broadband), URLLC (Ultra-Reliable Low-Latency), and mMTC (massive Machine-Type Communications)',
      'Public, Private, and Hybrid',
      'Indoor, Outdoor, and Mobile',
    ],
    answer: 1,
    explanation: '5G defines three service classes: eMBB (enhanced Mobile Broadband) providing 1-10 Gbps for high-bandwidth applications like video streaming; URLLC (Ultra-Reliable Low-Latency Communication) providing sub-1ms latency for autonomous vehicles and industrial control; and mMTC (massive Machine-Type Communications) supporting up to 1 million devices per square kilometer for IoT sensor networks.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'What is the key benefit of the Matter smart home standard?',
    options: [
      'It provides faster Wi-Fi speeds for smart home devices',
      'It enables interoperability between Apple, Google, Amazon, and Samsung ecosystems by defining an application-layer standard that runs over Thread, Wi-Fi, and Ethernet',
      'It replaces all existing smart home protocols with a single new radio technology',
      'It provides free cloud storage for smart home data',
    ],
    answer: 1,
    explanation: 'Matter (formerly Project CHIP) is an application-layer interoperability standard developed by the Connectivity Standards Alliance with Apple, Google, Amazon, Samsung, and 200+ other companies. It defines common device types and interactions that work across ecosystems, running over existing transport protocols (Thread for low-power, Wi-Fi for high-bandwidth, Ethernet for infrastructure). A Matter-certified device works with all major smart home platforms.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'What does Time-Sensitive Networking (TSN) provide for industrial edge networks?',
    options: [
      'Higher Wi-Fi speeds for factory floors',
      'Deterministic Ethernet with guaranteed bounded latency and zero packet loss, essential for motion control and synchronized robotics',
      'Automatic network cable installation',
      'Free bandwidth for industrial IoT devices',
    ],
    answer: 1,
    explanation: 'Time-Sensitive Networking (TSN, IEEE 802.1 suite) extends standard Ethernet with deterministic capabilities: time synchronization (802.1AS), scheduled traffic (802.1Qbv), frame preemption (802.1Qbu), and stream reservation (802.1Qav). This guarantees bounded latency (typically microseconds) and zero packet loss for critical traffic, essential for industrial applications like synchronized multi-axis robot control where microsecond timing precision is required.',
  },

  // Chapter 7: Edge Data Processing
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'What is Complex Event Processing (CEP) used for at the edge?',
    options: [
      'Compressing large files for cloud upload',
      'Detecting temporal patterns across multiple event streams to trigger automated responses, such as correlating rising temperature with vibration exceeding a threshold within a time window',
      'Encrypting event data before transmission',
      'Scheduling batch processing jobs in the cloud',
    ],
    answer: 1,
    explanation: 'Complex Event Processing (CEP) engines analyze continuous streams of events in real-time, detecting patterns that span multiple streams and time windows. For example, a CEP rule might trigger an alert when "temperature rises above 80C within 5 minutes while vibration exceeds threshold" — correlating data from multiple sensors to detect situations that no single sensor measurement could identify alone.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'How does downsampling reduce edge data storage and bandwidth requirements?',
    options: [
      'By compressing all data using ZIP format',
      'By deleting all historical data after 24 hours',
      'By aggregating raw high-frequency readings into lower-frequency summaries (e.g., 1-second readings into 1-minute averages, min, max), reducing volume by up to 60x while preserving trends',
      'By converting data from digital to analog format',
    ],
    answer: 2,
    explanation: 'Downsampling aggregates raw high-frequency sensor data into lower-frequency statistical summaries. For example, raw 1-second temperature readings (86,400/day) can be downsampled to 1-minute averages, minimums, maximums, and counts (1,440/day) — a 60x reduction. This preserves important trends and extremes while dramatically reducing storage and bandwidth requirements at the edge.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'What is the dead-band filtering technique in edge data processing?',
    options: [
      'Filtering out data from devices that have lost connectivity',
      'Only transmitting data when a value changes by more than a configured threshold, eliminating redundant transmissions during steady-state operation',
      'Removing audio frequencies outside the human hearing range',
      'Blocking data from unauthorized devices',
    ],
    answer: 1,
    explanation: 'Dead-band filtering (also called deadband suppression) only transmits data when a sensor value changes by more than a configured threshold from the last transmitted value. A temperature sensor reporting every second with a 0.5C dead-band only sends updates when temperature changes by at least 0.5C. During steady-state operation, this can reduce network traffic by 90%+ while still capturing all meaningful changes.',
  },

  // Chapter 8: Edge AI & ML Inference
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'What is TinyML and what hardware does it target?',
    options: [
      'A cloud-based ML training platform for small datasets',
      'Machine learning that runs on microcontrollers with as little as 256KB flash and 32KB RAM, enabling always-on inference for tasks like keyword detection and anomaly detection at milliwatt power levels',
      'A JavaScript ML library for web browsers',
      'A technique for training ML models with very few examples',
    ],
    answer: 1,
    explanation: 'TinyML brings machine learning inference to microcontrollers (MCUs) with extremely limited resources — as little as 256KB flash and 32KB RAM. Using frameworks like TensorFlow Lite Micro (~20KB runtime), TinyML enables always-on inference for keyword spotting, gesture recognition, and anomaly detection at power levels of ~1mW. Models are trained in the cloud and then quantized and optimized for the target MCU.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'What does INT8 quantization achieve for edge ML model deployment?',
    options: [
      'It increases model accuracy by 8%',
      'It reduces model weights from 32-bit floating point to 8-bit integers, reducing model size by 4x and enabling faster inference on integer-only hardware with typically under 1% accuracy loss',
      'It splits the model into 8 separate components for parallel processing',
      'It limits the model to processing only 8 inputs at a time',
    ],
    answer: 1,
    explanation: 'INT8 quantization converts model weights and activations from 32-bit floating point (FP32) to 8-bit integers, reducing model size by 4x (32/8 = 4) and enabling inference on hardware with integer-only compute units (NPUs, DSPs). Modern quantization techniques (post-training quantization or quantization-aware training) typically preserve accuracy within 1% of the original FP32 model while dramatically improving inference speed and reducing memory footprint.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'What metric is used to measure NPU (Neural Processing Unit) performance?',
    options: [
      'GHz (clock speed)',
      'FPS (frames per second)',
      'TOPS (trillion operations per second), measuring how many multiply-accumulate operations the NPU can perform per second',
      'MB/s (megabytes per second)',
    ],
    answer: 2,
    explanation: 'Neural Processing Units are rated in TOPS (Tera Operations Per Second, or trillion operations per second). This measures the throughput of multiply-accumulate (MAC) operations that dominate neural network inference. For example, Google Coral Edge TPU delivers 4 TOPS at 2W, Apple Neural Engine delivers 15-35 TOPS, and NVIDIA Jetson Orin delivers 275 TOPS. TOPS/watt is also important for comparing energy efficiency across NPU architectures.',
  },

  // Chapter 9: Digital Twins
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'What distinguishes a digital twin from a simple monitoring dashboard?',
    options: [
      'A digital twin costs more to build',
      'A digital twin is a dynamic virtual model that incorporates physics-based simulation, behavioral models, and real-time sensor data to not only show current state but also predict future behavior and simulate what-if scenarios',
      'A digital twin only shows historical data while dashboards show real-time data',
      'A digital twin runs on specialized hardware while dashboards run on web browsers',
    ],
    answer: 1,
    explanation: 'While a monitoring dashboard displays current and historical sensor data, a digital twin is a dynamic virtual model that mirrors a physical asset using CAD geometry, material properties, physics equations, and behavioral models continuously synchronized with real-time sensor data. This enables not just monitoring but prediction (remaining useful life), simulation (what-if scenarios), and optimization (testing changes virtually before applying them physically).',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'What role do Kalman filters play in digital twin synchronization?',
    options: [
      'They compress data for faster transmission',
      'They fuse noisy, incomplete sensor data into coherent state estimates, handling sensor failures and data gaps gracefully through mathematical state estimation',
      'They filter out unwanted network traffic',
      'They remove duplicate sensor readings',
    ],
    answer: 1,
    explanation: 'Kalman filters are state estimation algorithms that fuse multiple noisy, incomplete sensor measurements into an optimal estimate of the true system state. For digital twins, they handle sensor noise (readings fluctuating around the true value), missing data (sensor failures or communication gaps), and sensor fusion (combining data from multiple sensor types). The filter maintains a probabilistic state estimate that is updated with each new measurement.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'How does predictive maintenance using digital twins differ from preventive maintenance?',
    options: [
      'Predictive maintenance is performed by robots while preventive maintenance is performed by humans',
      'Predictive maintenance uses real-time sensor data and degradation models to forecast when a component will actually fail, enabling just-in-time maintenance, while preventive maintenance follows fixed time schedules regardless of actual condition',
      'Predictive maintenance is cheaper because it requires no sensors',
      'Preventive maintenance uses AI while predictive maintenance uses manual inspection',
    ],
    answer: 1,
    explanation: 'Preventive maintenance replaces components on fixed schedules (e.g., every 6 months) regardless of actual condition — this wastes parts with remaining life and still risks unexpected failures between intervals. Predictive maintenance uses edge sensors, digital twin models, and degradation analysis to estimate remaining useful life (RUL) and schedule maintenance just before predicted failure. This reduces downtime by 30-50% and maintenance costs by 20-40%.',
  },

  // Chapter 10: Edge Analytics
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'Why are isolation forests effective for anomaly detection on edge hardware?',
    options: [
      'They require the most training data of any anomaly detection method',
      'They are efficient (O(n log n)), require no labeled training data, and identify anomalies as data points that are easily separated from the rest of the dataset',
      'They only work on cloud servers with GPUs',
      'They can only detect one type of anomaly at a time',
    ],
    answer: 1,
    explanation: 'Isolation forests work by randomly partitioning data — anomalies, being different from normal data, require fewer random partitions to isolate. The algorithm is computationally efficient (O(n log n) complexity), requires no labeled anomaly examples for training (unsupervised), and has a small memory footprint. These properties make it well-suited for edge hardware where compute and memory are limited and labeled anomaly data is scarce.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'In federated learning, what is sent from edge devices to the central server?',
    options: [
      'The complete raw training dataset from each device',
      'Only model weight updates (gradients), never raw data — the server aggregates updates from all devices to improve the global model',
      'Encrypted copies of all sensor readings',
      'Summary statistics like mean and variance of the data',
    ],
    answer: 1,
    explanation: 'In federated learning, each edge device trains a local model on its private data and sends only the model weight updates (gradients) to a central aggregation server. The server combines gradients from all participating devices (using algorithms like Federated Averaging) to produce an improved global model, which is then distributed back to devices. Raw data never leaves the device, preserving privacy.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'What does homomorphic encryption enable in privacy-preserving edge computation?',
    options: [
      'Faster encryption speeds compared to AES',
      'Computation on encrypted data without decrypting it — edge devices encrypt data, cloud servers process the ciphertext, and results are decrypted locally',
      'Automatic key distribution to all devices in the network',
      'Converting between different encryption standards',
    ],
    answer: 1,
    explanation: 'Homomorphic encryption (HE) allows mathematical operations to be performed directly on encrypted ciphertext. The result, when decrypted, matches what would have been obtained by performing the same operations on the plaintext. This means edge devices can encrypt sensitive sensor data, send it to cloud servers for processing, and receive encrypted results — the cloud never sees the plaintext. However, HE is currently 1000-10000x slower than plaintext operations.',
  },

  // Chapter 11: Industrial IoT (IIoT)
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'What is the Purdue Model (ISA-95) in the context of industrial edge computing?',
    options: [
      'A machine learning model for predicting industrial equipment failures',
      'A network segmentation framework defining levels from Level 0 (physical process) to Level 5 (enterprise), where edge computing bridges OT (Levels 0-2) and IT (Levels 4-5) at Level 3',
      'A financial model for calculating ROI on edge computing investments',
      'A manufacturing process optimization algorithm',
    ],
    answer: 1,
    explanation: 'The Purdue Model (ISA-95/IEC 62264) defines hierarchical network segmentation levels for industrial systems: Level 0 (physical process), Level 1 (sensors/actuators), Level 2 (control systems/PLCs), Level 3 (site operations), Level 4 (business planning), Level 5 (enterprise). Edge computing typically operates at Level 3, bridging the gap between OT networks (Levels 0-2) and IT networks (Levels 4-5) while maintaining security boundaries.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'What advantage does OPC-UA Pub/Sub provide over traditional OPC-UA client-server communication?',
    options: [
      'It is simpler to implement on microcontrollers',
      'It enables efficient one-to-many communication using MQTT or UDP transport, avoiding the overhead of individual client-server polling for high-throughput sensor data distribution',
      'It provides stronger encryption than client-server OPC-UA',
      'It eliminates the need for network infrastructure',
    ],
    answer: 1,
    explanation: 'Traditional OPC-UA client-server requires each consumer to establish an individual session and poll for data changes, creating N connections for N consumers. OPC-UA Pub/Sub allows a single publisher to efficiently distribute data to many subscribers using MQTT or UADP (UDP) transport without maintaining per-subscriber sessions. This is critical for high-throughput sensor data distribution in industrial settings where hundreds of consumers need the same data streams.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'What does machine vision at the edge enable in Industry 4.0 manufacturing?',
    options: [
      'Remote video conferencing for factory workers',
      'Real-time quality inspection at production speed (60+ parts/second), detecting defects with 99.9%+ accuracy and replacing slow manual inspection processes',
      'Generating 3D models of products for marketing materials',
      'Monitoring employee productivity through facial recognition',
    ],
    answer: 1,
    explanation: 'Edge AI-powered machine vision systems inspect products at full production speed (60+ parts per second), detecting surface defects, dimensional errors, and assembly issues with 99.9%+ detection rates. Processing occurs locally on the production line using edge AI accelerators, providing immediate pass/fail decisions and automatic rejection. This replaces manual visual inspection which is slower, less consistent, and cannot scale with production speed.',
  },

  // Chapter 12: Smart Cities & Infrastructure
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'What is V2X communication in the context of autonomous vehicles and smart cities?',
    options: [
      'A video encoding format for traffic cameras',
      'Vehicle-to-Everything communication using C-V2X or DSRC, enabling vehicles to exchange position, speed, and intent data with nearby vehicles (V2V) and infrastructure (V2I) at sub-10ms latency',
      'A vehicle navigation system using satellite GPS',
      'A vehicle diagnostic protocol for maintenance shops',
    ],
    answer: 1,
    explanation: 'V2X (Vehicle-to-Everything) encompasses V2V (Vehicle-to-Vehicle), V2I (Vehicle-to-Infrastructure), V2P (Vehicle-to-Pedestrian), and V2N (Vehicle-to-Network) communication. Using either C-V2X (cellular) or DSRC (dedicated short-range) radio technology, vehicles exchange real-time position, speed, heading, and intent data at sub-10ms latency, enabling cooperative awareness, collision avoidance, and traffic signal coordination.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'How do LoRaWAN sensor networks enable cost-effective city-wide environmental monitoring?',
    options: [
      'By using expensive high-bandwidth cellular connections for each sensor',
      'By requiring sensors to be plugged into wired Ethernet networks',
      'A single gateway covers 5-15km, sensors run for 5-10 years on batteries transmitting readings every 15 minutes, and the protocol operates on free unlicensed ISM bands',
      'By processing all sensor data in a central cloud data center',
    ],
    answer: 2,
    explanation: 'LoRaWAN provides an ideal combination for city-wide environmental monitoring: long range (5-15km per gateway in urban areas), ultra-low power (5-10 year battery life with periodic transmissions), low cost (sensors cost $10-50, operate on free unlicensed ISM spectrum bands), and adequate data rate for environmental readings (temperature, humidity, air quality values are small payloads requiring only a few bytes per transmission).',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'What is a microgrid controller in the context of smart energy infrastructure?',
    options: [
      'A small circuit breaker for residential homes',
      'An edge computing system that autonomously manages local generation, storage, and loads during both grid-connected and islanded (disconnected) operation modes',
      'A remote control for adjusting thermostat settings',
      'A billing system for electricity customers',
    ],
    answer: 1,
    explanation: 'A microgrid controller is an edge computing system that manages a local energy ecosystem (solar panels, battery storage, generators, loads) in real-time. It optimizes energy flow in grid-connected mode (buying/selling energy based on price signals) and seamlessly transitions to islanded mode during grid outages, maintaining power to critical loads using local generation and storage. Edge AI enables predictive load balancing and renewable integration.',
  },

  // Chapter 13: Security & Reliability
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'What does a Hardware Root of Trust (HRoT) provide for edge device security?',
    options: [
      'A physical lock that prevents device theft',
      'A tamper-resistant hardware foundation for cryptographic key storage, secure boot, and measured launch — the trust chain starts in hardware rather than software',
      'A cloud-based authentication service for devices',
      'An antivirus scanner embedded in the device firmware',
    ],
    answer: 1,
    explanation: 'A Hardware Root of Trust (using TPM chips or embedded secure elements) provides a tamper-resistant foundation that cannot be modified by software attacks. It stores cryptographic keys in hardware, verifies each boot stage against signed measurements (secure boot), and generates cryptographic proof of device state (attestation). Because trust is rooted in hardware rather than software, even a fully compromised OS cannot forge device identity or bypass boot verification.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'What are Conflict-free Replicated Data Types (CRDTs) used for in edge computing?',
    options: [
      'Compressing data for efficient storage at the edge',
      'Enabling automatic conflict resolution for distributed state, allowing edge nodes to operate independently during network partitions and converge to consistent state when reconnected',
      'Encrypting data types for secure transmission',
      'Converting between different data formats at the edge',
    ],
    answer: 1,
    explanation: 'CRDTs are data structures (counters, sets, registers, maps) that are mathematically guaranteed to converge to the same state regardless of the order in which operations are applied. This enables edge nodes to operate independently during network partitions, making local updates without coordination, and automatically merge to a consistent state when connectivity resumes — without any conflict resolution logic needed from the application developer.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'What is the A/B partition (dual-bank) firmware update scheme?',
    options: [
      'Running two different firmware versions simultaneously on the same device',
      'Writing new firmware to the inactive partition, verifying integrity, then atomically switching boot target — if the new firmware fails, the device reverts to the previous working partition',
      'Splitting firmware into two parts that are downloaded separately',
      'Alternating between two cloud servers for firmware distribution',
    ],
    answer: 1,
    explanation: 'A/B partition updating maintains two complete firmware partitions on the device. The active partition runs the current firmware while the update is written to the inactive partition. After successful verification (hash check, signature validation), the bootloader atomically switches to boot from the newly updated partition. If the new firmware fails to boot or pass health checks, the device automatically reverts to the previous working partition, preventing bricked devices.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
