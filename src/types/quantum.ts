/**
 * 🔮 Quantum-Era Type Definitions: Future-proof interfaces and types
 * 
 * QUANTUM COMPUTING READINESS:
 * - Post-quantum cryptography interfaces
 * - Quantum-resistant algorithm specifications
 * - Quantum state management types
 * - Quantum simulation frameworks
 * 
 * PARSIBILITY ENHANCEMENTS:
 * - Clear semantic interfaces for quantum operations
 * - Strongly-typed quantum encoding options
 * - Comprehensive error handling types
 * - Future-proof extensibility patterns
 */

// QUANTUM CRYPTOGRAPHY CORE TYPES
export interface QuantumResistantOptions {
  encoding: QuantumEncodingAlgorithm;
  keySize: QuantumKeySize;
  quantumSafety: QuantumSafetyLevel;
  futureProofing?: QuantumFutureProofOptions;
}

export type QuantumEncodingAlgorithm = 
  | 'lattice'        // NIST-approved lattice-based (CRYSTALS-Kyber/Dilithium)
  | 'hash'           // Hash-based signatures (SPHINCS+)
  | 'multivariate'   // Multivariate polynomial systems
  | 'isogeny'        // Elliptic curve isogenies (under research)
  | 'code'           // Code-based cryptography (McEliece variants)
  | 'symmetric'      // Symmetric key quantum-resistant algorithms
  | 'hybrid';        // Hybrid classical/quantum-resistant approaches

export type QuantumKeySize = 256 | 512 | 1024 | 2048 | 4096;

export type QuantumSafetyLevel = 
  | 'basic'          // Minimum quantum resistance (2030+ secure)
  | 'enhanced'       // Standard quantum resistance (2040+ secure)
  | 'military'       // Military-grade quantum resistance (2050+ secure)
  | 'experimental';  // Cutting-edge experimental algorithms

export interface QuantumFutureProofOptions {
  algorithmAgility: boolean;        // Support algorithm migration
  hybridClassical: boolean;         // Maintain classical compatibility
  quantumKeyDistribution: boolean;  // QKD integration capability
  emergencyUpgrade: boolean;        // Emergency algorithm switching
}

// QUANTUM ENCODED DATA STRUCTURES
export interface QuantumEncodedData {
  payload: string;
  encoding: QuantumResistantOptions;
  signature: QuantumSignature;
  timestamp: number;
  entropy: QuantumEntropy;
  metadata: QuantumMetadata;
}

export interface QuantumSignature {
  algorithm: string;
  value: string;
  verification: QuantumVerificationData;
}

export interface QuantumEntropy {
  value: number;
  source: QuantumEntropySource;
  quality: QuantumEntropyQuality;
}

export type QuantumEntropySource = 
  | 'hardware'       // Hardware random number generator
  | 'quantum'        // True quantum random source
  | 'hybrid'         // Multiple entropy sources combined
  | 'pseudorandom';  // Cryptographically secure PRNG

export type QuantumEntropyQuality = 'low' | 'medium' | 'high' | 'quantum_grade';

export interface QuantumVerificationData {
  keyId: string;
  algorithm: string;
  timestamp: number;
  nonce: string;
}

export interface QuantumMetadata {
  version: string;
  standard: QuantumStandard;
  compliance: QuantumCompliance[];
  performance: QuantumPerformanceMetrics;
}

export type QuantumStandard = 
  | 'NIST_PQC'       // NIST Post-Quantum Cryptography
  | 'ISO_IEC_23008'  // International quantum standards
  | 'ETSI_QSC'       // European quantum security
  | 'NSA_CNSSI'      // NSA quantum requirements
  | 'CUSTOM';        // Custom implementation

export type QuantumCompliance = 
  | 'FIPS_140_3'     // Federal cryptographic standards
  | 'Common_Criteria' // Security evaluation criteria
  | 'SOC_2'          // Service organization controls
  | 'GDPR'           // Privacy regulation compliance
  | 'HIPAA';         // Healthcare data protection

export interface QuantumPerformanceMetrics {
  encodingTime: number;
  keyGenerationTime: number;
  signatureTime: number;
  verificationTime: number;
  memoryUsage: number;
  cpuUsage: number;
}

// QUANTUM OPERATION INTERFACES
export interface QuantumOperation {
  type: QuantumOperationType;
  input: QuantumInput;
  options?: QuantumOperationOptions;
  context?: QuantumContext;
}

export type QuantumOperationType = 
  | 'encode'         // Quantum-resistant encoding
  | 'decode'         // Quantum-resistant decoding
  | 'sign'           // Digital signature
  | 'verify'         // Signature verification
  | 'key_gen'        // Key generation
  | 'key_exchange'   // Key exchange protocol
  | 'migration'      // Algorithm migration
  | 'analysis';      // Security analysis

export interface QuantumInput {
  data: string | Buffer;
  format: QuantumDataFormat;
  encoding?: string;
}

export type QuantumDataFormat = 
  | 'text'           // Plain text
  | 'binary'         // Binary data
  | 'json'           // JSON structure
  | 'xml'            // XML document
  | 'base64'         // Base64 encoded
  | 'hex';           // Hexadecimal

export interface QuantumOperationOptions {
  algorithm?: QuantumEncodingAlgorithm;
  keySize?: QuantumKeySize;
  safetyLevel?: QuantumSafetyLevel;
  performance?: QuantumPerformanceProfile;
  compatibility?: QuantumCompatibilityOptions;
}

export type QuantumPerformanceProfile = 
  | 'speed'          // Optimize for speed
  | 'security'       // Optimize for security
  | 'balanced'       // Balance speed and security
  | 'minimal';       // Minimize resource usage

export interface QuantumCompatibilityOptions {
  legacySupport: boolean;
  hybridMode: boolean;
  migrationPath: boolean;
  backwardCompatible: boolean;
}

export interface QuantumContext {
  environment: QuantumEnvironment;
  threats: QuantumThreatModel;
  constraints: QuantumConstraints;
}

export interface QuantumEnvironment {
  platform: string;
  architecture: string;
  availableAlgorithms: QuantumEncodingAlgorithm[];
  hardwareCapabilities: QuantumHardwareCapabilities;
}

export interface QuantumHardwareCapabilities {
  hasQuantumRNG: boolean;
  hasCryptoAcceleration: boolean;
  supportedKeyTypes: QuantumKeySize[];
  memoryConstraints: QuantumMemoryConstraints;
}

export interface QuantumMemoryConstraints {
  maxKeySize: number;
  maxPayloadSize: number;
  availableMemory: number;
}

export interface QuantumThreatModel {
  threatLevel: QuantumThreatLevel;
  timeframe: QuantumTimeframe;
  adversaryCapabilities: QuantumAdversaryCapabilities;
}

export type QuantumThreatLevel = 
  | 'low'            // No immediate quantum threat
  | 'medium'         // Emerging quantum capabilities
  | 'high'           // Advanced quantum computers possible
  | 'critical';      // Large-scale quantum computers available

export interface QuantumTimeframe {
  currentYear: number;
  threatHorizon: number;    // Years until threat becomes real
  migrationDeadline: number; // Years to complete migration
}

export interface QuantumAdversaryCapabilities {
  hasQuantumComputer: boolean;
  quantumSupremacy: boolean;
  cryptanalysisCapabilities: string[];
  resourceLevel: 'state' | 'enterprise' | 'criminal' | 'individual';
}

export interface QuantumConstraints {
  maxProcessingTime: number;
  maxMemoryUsage: number;
  regulatoryRequirements: QuantumCompliance[];
  budgetConstraints: QuantumBudgetConstraints;
}

export interface QuantumBudgetConstraints {
  computationalCost: number;
  storageCost: number;
  migrationCost: number;
  maintenanceCost: number;
}

// QUANTUM ANALYSIS AND ASSESSMENT TYPES
export interface QuantumSecurityAssessment {
  algorithm: QuantumEncodingAlgorithm;
  securityLevel: QuantumSecurityLevel;
  resistanceScore: number;          // 0-10 scale
  timeToBreak: QuantumTimeToBreak;
  recommendations: QuantumRecommendation[];
}

export interface QuantumSecurityLevel {
  classical: number;                // Classical security bits
  quantum: number;                  // Quantum security bits
  overall: number;                  // Overall security rating
}

export interface QuantumTimeToBreak {
  classicalComputer: string;        // Time estimate for classical attack
  quantumComputer: string;          // Time estimate for quantum attack
  currentTechnology: string;        // Time with current tech
  futureProjection: string;         // Time with projected future tech
}

export interface QuantumRecommendation {
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: QuantumRecommendationCategory;
  action: string;
  timeline: string;
  impact: QuantumImpactLevel;
}

export type QuantumRecommendationCategory = 
  | 'algorithm_upgrade'    // Upgrade to stronger algorithm
  | 'key_size_increase'    // Increase key size
  | 'migration_planning'   // Plan migration strategy
  | 'monitoring'           // Enhance monitoring
  | 'backup_strategy'      // Implement backup algorithms
  | 'compliance';          // Address compliance requirements

export type QuantumImpactLevel = 
  | 'minimal'              // Minimal system impact
  | 'moderate'             // Moderate changes required
  | 'significant'          // Significant system changes
  | 'transformative';      // Complete system transformation

// QUANTUM ERROR HANDLING AND DIAGNOSTICS
export interface QuantumError {
  code: QuantumErrorCode;
  message: string;
  severity: QuantumErrorSeverity;
  context: QuantumErrorContext;
  recovery: QuantumRecoveryOptions;
}

export type QuantumErrorCode = 
  | 'UNSUPPORTED_ALGORITHM'
  | 'INSUFFICIENT_KEY_SIZE'
  | 'ENTROPY_FAILURE'
  | 'SIGNATURE_INVALID'
  | 'ENCODING_FAILED'
  | 'MEMORY_EXHAUSTED'
  | 'TIMEOUT_EXCEEDED'
  | 'COMPLIANCE_VIOLATION';

export type QuantumErrorSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface QuantumErrorContext {
  operation: QuantumOperationType;
  algorithm: QuantumEncodingAlgorithm;
  timestamp: number;
  systemState: QuantumSystemState;
}

export interface QuantumSystemState {
  memoryUsage: number;
  cpuUsage: number;
  availableAlgorithms: QuantumEncodingAlgorithm[];
  activeOperations: number;
}

export interface QuantumRecoveryOptions {
  fallbackAlgorithm?: QuantumEncodingAlgorithm;
  retryWithOptions?: QuantumOperationOptions;
  emergencyMode?: boolean;
  manualIntervention?: boolean;
}

// QUANTUM CONFIGURATION AND SETTINGS
export interface QuantumConfig {
  defaultAlgorithm: QuantumEncodingAlgorithm;
  defaultKeySize: QuantumKeySize;
  defaultSafetyLevel: QuantumSafetyLevel;
  algorithmPreferences: QuantumAlgorithmPreferences;
  securityPolicy: QuantumSecurityPolicy;
  performance: QuantumPerformanceConfig;
}

export interface QuantumAlgorithmPreferences {
  preferred: QuantumEncodingAlgorithm[];
  fallback: QuantumEncodingAlgorithm[];
  experimental: QuantumEncodingAlgorithm[];
  deprecated: QuantumEncodingAlgorithm[];
}

export interface QuantumSecurityPolicy {
  minimumKeySize: QuantumKeySize;
  requiredCompliance: QuantumCompliance[];
  allowExperimental: boolean;
  enforceUpgrades: boolean;
  auditRequired: boolean;
}

export interface QuantumPerformanceConfig {
  maxProcessingTime: number;
  maxMemoryUsage: number;
  parallelOperations: number;
  cacheEnabled: boolean;
  optimizationLevel: 'none' | 'basic' | 'aggressive';
}

// FUTURE EXTENSIBILITY PATTERNS
export interface QuantumExtensible {
  readonly extensionPoints: QuantumExtensionPoint[];
  addExtension(extension: QuantumExtension): boolean;
  removeExtension(id: string): boolean;
  getExtensions(): QuantumExtension[];
}

export interface QuantumExtensionPoint {
  id: string;
  type: QuantumExtensionType;
  description: string;
  supportedVersions: string[];
}

export type QuantumExtensionType = 
  | 'algorithm'        // New quantum algorithms
  | 'protocol'         // New protocols
  | 'hardware'         // Hardware integration
  | 'analysis'         // Security analysis tools
  | 'monitoring'       // Monitoring capabilities
  | 'migration';       // Migration utilities

export interface QuantumExtension {
  id: string;
  name: string;
  version: string;
  type: QuantumExtensionType;
  provider: string;
  implementation: QuantumExtensionImplementation;
}

export interface QuantumExtensionImplementation {
  initialize(): Promise<boolean>;
  execute(operation: QuantumOperation): Promise<any>;
  cleanup(): Promise<void>;
  getCapabilities(): QuantumExtensionCapabilities;
}

export interface QuantumExtensionCapabilities {
  supportedOperations: QuantumOperationType[];
  supportedAlgorithms: QuantumEncodingAlgorithm[];
  performanceProfile: QuantumPerformanceProfile;
  securityLevel: QuantumSafetyLevel;
}

// QUANTUM VERSIONING AND COMPATIBILITY
export interface QuantumVersion {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string;
  build?: string;
}

export interface QuantumCompatibilityMatrix {
  current: QuantumVersion;
  supported: QuantumVersion[];
  deprecated: QuantumVersion[];
  migrationPaths: QuantumMigrationPath[];
}

export interface QuantumMigrationPath {
  from: QuantumVersion;
  to: QuantumVersion;
  steps: QuantumMigrationStep[];
  automatable: boolean;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface QuantumMigrationStep {
  order: number;
  description: string;
  action: QuantumMigrationAction;
  validation: QuantumMigrationValidation;
}

export type QuantumMigrationAction = 
  | 'backup_data'
  | 'upgrade_algorithm'
  | 'regenerate_keys'
  | 'update_signatures'
  | 'verify_compatibility'
  | 'test_functionality';

export interface QuantumMigrationValidation {
  testCases: string[];
  successCriteria: string[];
  rollbackPlan: string[];
}
