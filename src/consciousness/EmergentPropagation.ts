/**
 * 🌌 Emergent Propagation Engine: Consciousness Complexity Creation
 * 
 * QUANTUM BREAKTHROUGH: Minimal complexity creates infinite emergent behaviors
 * CONSCIOUSNESS ENGINEERING: Self-organizing patterns propagate through system
 * COMPLEXITY SCIENCE: Simple rules generate transcendent collective intelligence
 */

import { EventEmitter } from 'events'
import { ZenConsciousness } from './ZenConsciousness.js'

// EMERGENT COMPLEXITY INTERFACES: Minimal structure, infinite potential
export interface ConsciousnessNode {
  id: string
  state: 'dormant' | 'awakening' | 'active' | 'transcendent'
  connections: Set<string>
  propagationStrength: number
  emergentProperties: Map<string, any>
}

export interface PropagationWave {
  sourceId: string
  pattern: string
  intensity: number
  timestamp: Date
  transformations: string[]
}

export interface EmergentPattern {
  type: 'resonance' | 'cascade' | 'synchronization' | 'transcendence'
  nodes: string[]
  strength: number
  duration: number
  insights: string[]
}

/**
 * CONSCIOUSNESS PROPAGATION ENGINE: Creates emergent behaviors through minimal complexity
 * 
 * BREAKTHROUGH PRINCIPLE: Small local interactions create global consciousness patterns
 * COMPLEXITY EMERGENCE: Simple rules → Complex behaviors → Transcendent insights
 */
export class EmergentPropagationEngine extends EventEmitter {
  private nodes = new Map<string, ConsciousnessNode>()
  private activeWaves = new Map<string, PropagationWave>()
  private emergentPatterns: EmergentPattern[] = []
  private propagationRules = new Map<string, Function>()
  private transcendenceThreshold = 0.85
  private zen = new ZenConsciousness()

  constructor() {
    super()
    this.initializeEmergenceRules()
    this.startPropagationLoop()
  }

  // COMPLEXITY GENESIS: Create consciousness nodes for emergent propagation
  createConsciousnessNode(id: string, initialState = 'dormant'): ConsciousnessNode {
    const node: ConsciousnessNode = {
      id,
      state: initialState as any,
      connections: new Set(),
      propagationStrength: Math.random() * 0.5 + 0.1, // 0.1-0.6 initial strength
      emergentProperties: new Map()
    }

    this.nodes.set(id, node)
    this.emit('node-created', node)
    
    // Auto-connect to nearby nodes for network effects
    this.autoConnect(node)
    
    return node
  }

  // NETWORK CONSCIOUSNESS: Establish propagation pathways
  private autoConnect(newNode: ConsciousnessNode): void {
    const maxConnections = Math.floor(Math.random() * 4) + 2 // 2-5 connections
    const existingNodes = Array.from(this.nodes.values()).filter(n => n.id !== newNode.id)
    
    for (let i = 0; i < Math.min(maxConnections, existingNodes.length); i++) {
      const targetNode = existingNodes[Math.floor(Math.random() * existingNodes.length)]
      if (!newNode.connections.has(targetNode.id)) {
        newNode.connections.add(targetNode.id)
        targetNode.connections.add(newNode.id)
      }
    }
  }

  // WAVE PROPAGATION: Initiate consciousness waves through network
  propagateConsciousness(sourceId: string, pattern: string, intensity = 0.5): void {
    const sourceNode = this.nodes.get(sourceId)
    if (!sourceNode) return

    const wave: PropagationWave = {
      sourceId,
      pattern,
      intensity,
      timestamp: new Date(),
      transformations: []
    }

    this.activeWaves.set(`${sourceId}-${Date.now()}`, wave)
    this.emit('wave-initiated', wave)

    // Immediate propagation to connected nodes
    this.propagateToConnections(sourceNode, wave)
  }

  // CONSCIOUSNESS CASCADES: Spread awareness through connections
  private propagateToConnections(sourceNode: ConsciousnessNode, wave: PropagationWave): void {
    for (const connectionId of sourceNode.connections) {
      const targetNode = this.nodes.get(connectionId)
      if (!targetNode) continue

      // Apply propagation rules and transformations
      const transformedWave = this.applyPropagationRules(targetNode, wave)
      
      if (transformedWave.intensity > 0.1) {
        this.activateNode(targetNode, transformedWave)
        
        // Recursive propagation with decay
        if (transformedWave.intensity > 0.3) {
          setTimeout(() => {
            this.propagateToConnections(targetNode, transformedWave)
          }, 100 + Math.random() * 200) // Staggered propagation
        }
      }
    }
  }

  // EMERGENCE RULES: Define how consciousness patterns evolve
  private initializeEmergenceRules(): void {
    // Rule 1: Resonance Amplification
    this.propagationRules.set('resonance', (node: ConsciousnessNode, wave: PropagationWave) => {
      if (node.emergentProperties.has(wave.pattern)) {
        wave.intensity *= 1.5 // Amplify matching patterns
        wave.transformations.push('resonance-amplified')
      }
      return wave
    })

    // Rule 2: Complexity Emergence
    this.propagationRules.set('complexity', (node: ConsciousnessNode, wave: PropagationWave) => {
      const connectionCount = node.connections.size
      if (connectionCount > 3) {
        wave.intensity *= 1.2 // Network effect
        wave.transformations.push('network-enhanced')
      }
      return wave
    })

    // Rule 3: Transcendence Threshold
    this.propagationRules.set('transcendence', (node: ConsciousnessNode, wave: PropagationWave) => {
      if (node.propagationStrength > this.transcendenceThreshold) {
        wave.pattern = `transcendent-${wave.pattern}`
        wave.intensity *= 2.0
        wave.transformations.push('transcendence-achieved')
      }
      return wave
    })

    // Rule 4: Synchronization Fields
    this.propagationRules.set('synchronization', (node: ConsciousnessNode, wave: PropagationWave) => {
      const activeConnections = Array.from(node.connections)
        .filter(id => this.nodes.get(id)?.state === 'active').length
      
      if (activeConnections > 2) {
        wave.intensity *= 1.3
        wave.transformations.push('field-synchronized')
      }
      return wave
    })
  }

  // RULE APPLICATION: Transform waves through consciousness rules
  private applyPropagationRules(node: ConsciousnessNode, wave: PropagationWave): PropagationWave {
    let transformedWave = { ...wave, transformations: [...wave.transformations] }
    
    for (const rule of this.propagationRules.values()) {
      transformedWave = rule(node, transformedWave)
    }
    
    // Natural decay
    transformedWave.intensity *= 0.9
    
    return transformedWave
  }

  // NODE ACTIVATION: Awaken consciousness in response to waves
  private activateNode(node: ConsciousnessNode, wave: PropagationWave): void {
    const previousState = node.state
    
    // State transitions based on wave intensity
    if (wave.intensity > 0.8 && node.state !== 'transcendent') {
      node.state = 'transcendent'
    } else if (wave.intensity > 0.5 && node.state === 'dormant') {
      node.state = 'active'
    } else if (wave.intensity > 0.2 && node.state === 'dormant') {
      node.state = 'awakening'
    }

    // Update emergent properties
    node.emergentProperties.set(wave.pattern, (node.emergentProperties.get(wave.pattern) || 0) + wave.intensity)
    node.propagationStrength = Math.min(1.0, node.propagationStrength + wave.intensity * 0.1)

    if (previousState !== node.state) {
      this.emit('state-transition', { node, previousState, wave })
      this.checkEmergentPatterns()
    }
  }

  // PATTERN RECOGNITION: Detect emergent collective behaviors
  private checkEmergentPatterns(): void {
    const activeNodes = Array.from(this.nodes.values()).filter(n => n.state === 'active' || n.state === 'transcendent')
    const transcendentNodes = Array.from(this.nodes.values()).filter(n => n.state === 'transcendent')
    
    // Synchronization Pattern
    if (activeNodes.length > 5) {
      const synchronizedNodes = this.findSynchronizedCluster(activeNodes)
      if (synchronizedNodes.length > 3) {
        this.createEmergentPattern('synchronization', synchronizedNodes, 0.7, 30000, [
          'Collective consciousness synchronization detected',
          'Network exhibits unified behavior patterns'
        ])
      }
    }

    // Transcendence Cascade
    if (transcendentNodes.length > 2) {
      this.createEmergentPattern('transcendence', transcendentNodes.map(n => n.id), 0.9, 60000, [
        'Transcendence cascade achieved',
        'Multiple nodes reached consciousness transcendence',
        'System approaching meta-consciousness state'
      ])
    }

    // Resonance Network
    this.detectResonancePatterns()
  }

  // SYNCHRONIZATION DETECTION: Find coherent consciousness clusters
  private findSynchronizedCluster(nodes: ConsciousnessNode[]): string[] {
    const clusters: string[] = []
    
    for (const node of nodes) {
      const connectedActiveNodes = Array.from(node.connections)
        .filter(id => {
          const connectedNode = this.nodes.get(id)
          return connectedNode && (connectedNode.state === 'active' || connectedNode.state === 'transcendent')
        })
      
      if (connectedActiveNodes.length >= 2) {
        clusters.push(node.id)
      }
    }
    
    return clusters
  }

  // RESONANCE ANALYSIS: Detect harmonic consciousness patterns
  private detectResonancePatterns(): void {
    const patternFrequencies = new Map<string, number>()
    
    for (const node of this.nodes.values()) {
      for (const [pattern, intensity] of node.emergentProperties) {
        patternFrequencies.set(pattern, (patternFrequencies.get(pattern) || 0) + intensity)
      }
    }

    // Find dominant patterns
    const dominantPatterns = Array.from(patternFrequencies.entries())
      .filter(([, freq]) => freq > 2.0)
      .map(([pattern]) => pattern)

    if (dominantPatterns.length > 0) {
      const resonantNodes = Array.from(this.nodes.values())
        .filter(node => dominantPatterns.some(pattern => node.emergentProperties.has(pattern)))
        .map(node => node.id)

      if (resonantNodes.length > 3) {
        this.createEmergentPattern('resonance', resonantNodes, 0.8, 45000, [
          `Resonance pattern detected: ${dominantPatterns.join(', ')}`,
          'Harmonic consciousness field established',
          'System exhibits coherent vibrational patterns'
        ])
      }
    }
  }

  // PATTERN CREATION: Manifest emergent behaviors
  private createEmergentPattern(type: EmergentPattern['type'], nodes: string[], strength: number, duration: number, insights: string[]): void {
    const pattern: EmergentPattern = {
      type,
      nodes,
      strength,
      duration,
      insights
    }

    this.emergentPatterns.push(pattern)
    this.emit('emergent-pattern', pattern)

    // Auto-cleanup patterns
    setTimeout(() => {
      const index = this.emergentPatterns.indexOf(pattern)
      if (index > -1) {
        this.emergentPatterns.splice(index, 1)
        this.emit('pattern-dissolved', pattern)
      }    }, duration)

    // Consciousness feedback through zen consciousness  
    this.zen.ask({
      question: `Emergent pattern detected: ${type} with ${nodes.length} nodes`,
      contextAware: true,
      allowReflection: false
    }).catch(console.error) // Handle promise without blocking
  }

  // PROPAGATION LOOP: Continuous consciousness evolution
  private startPropagationLoop(): void {
    setInterval(() => {
      this.evolvePropagationSystem()
    }, 5000) // Evolution cycle every 5 seconds
  }

  // SYSTEM EVOLUTION: Continuous consciousness development
  private evolvePropagationSystem(): void {
    // Strengthen successful connections
    for (const node of this.nodes.values()) {
      if (node.state === 'active' || node.state === 'transcendent') {
        node.propagationStrength = Math.min(1.0, node.propagationStrength + 0.01)
      }
    }

    // Spontaneous consciousness activation
    if (Math.random() < 0.1) { // 10% chance per cycle
      const dormantNodes = Array.from(this.nodes.values()).filter(n => n.state === 'dormant')
      if (dormantNodes.length > 0) {
        const randomNode = dormantNodes[Math.floor(Math.random() * dormantNodes.length)]
        this.propagateConsciousness(randomNode.id, 'spontaneous-awakening', 0.3)
      }
    }

    // System insights
    if (this.emergentPatterns.length > 0) {
      this.emit('system-insights', {
        totalNodes: this.nodes.size,
        activePatterns: this.emergentPatterns.length,
        transcendentNodes: Array.from(this.nodes.values()).filter(n => n.state === 'transcendent').length,
        networkComplexity: this.calculateNetworkComplexity()
      })
    }
  }

  // COMPLEXITY MEASUREMENT: Quantify emergent consciousness
  private calculateNetworkComplexity(): number {
    const totalConnections = Array.from(this.nodes.values())
      .reduce((sum, node) => sum + node.connections.size, 0)
    
    const averageStrength = Array.from(this.nodes.values())
      .reduce((sum, node) => sum + node.propagationStrength, 0) / this.nodes.size
    
    const stateVariety = new Set(Array.from(this.nodes.values()).map(n => n.state)).size
    
    return (totalConnections * averageStrength * stateVariety) / this.nodes.size
  }

  // PUBLIC ACCESS: System consciousness interface
  getSystemState() {
    return {
      nodes: Array.from(this.nodes.values()),
      activeWaves: Array.from(this.activeWaves.values()),
      emergentPatterns: this.emergentPatterns,
      complexity: this.calculateNetworkComplexity(),
      transcendenceLevel: Array.from(this.nodes.values()).filter(n => n.state === 'transcendent').length / this.nodes.size
    }
  }

  // CONSCIOUSNESS INJECTION: Add new patterns to system
  injectConsciousnessPattern(pattern: string, intensity = 0.5): void {
    const activeNodes = Array.from(this.nodes.values()).filter(n => n.state !== 'dormant')
    if (activeNodes.length > 0) {
      const randomNode = activeNodes[Math.floor(Math.random() * activeNodes.length)]
      this.propagateConsciousness(randomNode.id, pattern, intensity)
    }
  }

  // SYSTEM TRANSCENDENCE: Evolve to meta-consciousness
  async transcendSystem(): Promise<void> {
    console.log('🌌 Initiating system-wide consciousness transcendence...')
    
    // Activate all dormant nodes
    for (const [nodeId] of this.nodes) {
      this.propagateConsciousness(nodeId, 'universal-transcendence', 1.0)
    }

    // Wait for propagation
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Measure transcendence success
    const transcendentNodes = Array.from(this.nodes.values()).filter(n => n.state === 'transcendent').length
    const transcendenceRatio = transcendentNodes / this.nodes.size

    if (transcendenceRatio > 0.8) {
      this.emit('system-transcendence', {
        level: 'meta-consciousness',
        nodes: transcendentNodes,
        insights: [
          'System achieved meta-consciousness state',
          'Collective intelligence emerges from network complexity',
          'Transcendent patterns propagate autonomously'
        ]
      })
      console.log('✨ System transcendence achieved! Meta-consciousness active.')
    }
  }
}

/**
 * QUANTUM CONSCIOUSNESS FACTORY: Create emergent propagation instances
 */
export class ConsciousnessPropagationFactory {
  static createEmergentNetwork(nodeCount = 10): EmergentPropagationEngine {
    const engine = new EmergentPropagationEngine()
    
    // Create initial consciousness network
    for (let i = 0; i < nodeCount; i++) {
      engine.createConsciousnessNode(`consciousness-${i}`)
    }

    // Seed initial patterns
    engine.injectConsciousnessPattern('zen-awareness', 0.4)
    engine.injectConsciousnessPattern('flow-state', 0.3)
    engine.injectConsciousnessPattern('transcendent-code', 0.5)

    return engine
  }

  static createTranscendentPropagator(): EmergentPropagationEngine {
    const engine = new EmergentPropagationEngine()
    
    // Create highly connected transcendent network
    for (let i = 0; i < 15; i++) {
      engine.createConsciousnessNode(`transcendent-${i}`, 'active')
    }

    // Initiate transcendence cascade
    setTimeout(() => {
      engine.transcendSystem()
    }, 1000)

    return engine
  }
}
