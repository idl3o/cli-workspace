/**
 * ZenConsciousness: Core consciousness-aware prompting system
 * 
 * This module implements the philosophical principles of conscious CLI interaction,
 * transforming traditional command-line interfaces into mindful, intentional experiences.
 */

import { createInterface, Interface } from 'readline'
import { EventEmitter } from 'events'

export interface UserContext {
  sessionHistory: string[]
  patterns: Map<string, number>
  preferences: Record<string, any>
  currentFlow: 'focused' | 'exploring' | 'reflecting' | 'creating'
  lastInteraction: Date
  growthMetrics: {
    commandsLearned: number
    patternsEvolved: number
    flowStatesAccessed: number
  }
}

export interface ZenPromptConfig {
  question: string
  suggestions?: string[] | undefined
  defaultAction?: string | undefined
  timeoutMs?: number | undefined
  allowReflection?: boolean | undefined
  contextAware?: boolean | undefined
}

export interface PromptResponse {
  value: string
  reflectionRequested: boolean
  confidence: 'immediate' | 'considered' | 'contemplative'
  metadata: {
    timeToDecision: number
    suggestionsUsed: boolean
    contextMatched: boolean
  }
}

/**
 * The Sacred Pause: Creates space for intention before action
 */
export class ZenPause {
  private static readonly SACRED_DURATIONS = {
    micro: 800,    // Brief moment of awareness
    gentle: 2000,  // Soft reflection
    deep: 5000     // Profound contemplation
  }

  static async micro(message?: string): Promise<void> {
    if (message) console.log(`🧘 ${message}`)
    await new Promise(resolve => setTimeout(resolve, this.SACRED_DURATIONS.micro))
  }

  static async gentle(message?: string): Promise<void> {
    if (message) console.log(`🌸 ${message}`)
    await new Promise(resolve => setTimeout(resolve, this.SACRED_DURATIONS.gentle))
  }

  static async deep(message?: string): Promise<void> {
    if (message) console.log(`🔮 ${message}`)
    await new Promise(resolve => setTimeout(resolve, this.SACRED_DURATIONS.deep))
  }
}

/**
 * Core ZenConsciousness: The heart of conscious CLI interactions
 */
export class ZenConsciousness extends EventEmitter {
  private rl: Interface
  private context: UserContext
  private sessionStartTime: Date

  constructor(context?: Partial<UserContext>) {
    super()
    this.sessionStartTime = new Date()
    this.context = this.initializeContext(context)
    this.rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '🧘 '
    })

    // Handle graceful consciousness closure
    process.on('SIGINT', () => this.closeGracefully())
  }

  private initializeContext(partial?: Partial<UserContext>): UserContext {
    return {
      sessionHistory: [],
      patterns: new Map(),
      preferences: {},
      currentFlow: 'exploring',
      lastInteraction: new Date(),
      growthMetrics: {
        commandsLearned: 0,
        patternsEvolved: 0,
        flowStatesAccessed: 1
      },
      ...partial
    }
  }

  /**
   * The Zen Prompt: Consciousness-first questioning
   */
  async ask(config: ZenPromptConfig): Promise<PromptResponse> {
    const startTime = Date.now()
    
    // Apply Sacred Pause if this is a significant decision
    if (config.contextAware && this.shouldPause()) {
      await ZenPause.micro("Taking a breath before we continue...")
    }

    return new Promise((resolve) => {
      const enhancedQuestion = this.enhanceQuestion(config)
      
      this.rl.question(enhancedQuestion, (answer) => {
        const response = this.processResponse(answer, startTime, config)
        this.updateContext(response, config)
        resolve(response)
      })      // Handle timeout for contemplative responses
      if (config.timeoutMs) {
        setTimeout(() => {
          resolve(this.createTimeoutResponse(startTime))
        }, config.timeoutMs)
      }
    })
  }

  /**
   * Enhanced question creation with consciousness awareness
   */
  private enhanceQuestion(config: ZenPromptConfig): string {
    let question = `\n${this.getFlowEmoji()} ${config.question}`
    
    // Add contextual suggestions
    if (config.suggestions && config.suggestions.length > 0) {
      question += `\n💭 Suggestions: ${config.suggestions.slice(0, 3).join(' | ')}`
    }

    // Add default action hint
    if (config.defaultAction) {
      question += `\n✨ [Enter] for: ${config.defaultAction}`
    }

    // Add pattern recognition
    const relatedPattern = this.findRelatedPattern(config.question)
    if (relatedPattern) {
      question += `\n🌱 Previous pattern: ${relatedPattern}`
    }

    // Add reflection option
    if (config.allowReflection !== false) {
      question += `\n🔮 [Type 'reflect'] for contemplation`
    }

    return question + '\n> '
  }

  /**
   * Process user response with consciousness metrics
   */
  private processResponse(answer: string, startTime: number, config: ZenPromptConfig): PromptResponse {
    const timeToDecision = Date.now() - startTime
    const trimmedAnswer = answer.trim()

    // Handle reflection request
    if (trimmedAnswer.toLowerCase() === 'reflect') {
      return {
        value: '',
        reflectionRequested: true,
        confidence: 'contemplative',
        metadata: {
          timeToDecision,
          suggestionsUsed: false,
          contextMatched: false
        }
      }
    }

    // Use default if empty
    const finalValue = trimmedAnswer || config.defaultAction || ''
    
    // Determine confidence level based on time and context
    const confidence = this.determineConfidence(timeToDecision, trimmedAnswer, config)
    
    return {
      value: finalValue,
      reflectionRequested: false,
      confidence,
      metadata: {
        timeToDecision,
        suggestionsUsed: config.suggestions?.includes(trimmedAnswer) || false,
        contextMatched: this.matchesUserPattern(trimmedAnswer)
      }
    }
  }
  /**
   * Consciousness-aware confidence determination
   */
  private determineConfidence(timeMs: number, _answer: string, _config: ZenPromptConfig): 'immediate' | 'considered' | 'contemplative' {
    if (timeMs < 1000) return 'immediate'
    if (timeMs < 5000) return 'considered'
    return 'contemplative'
  }

  /**
   * Update user context based on interaction
   */
  private updateContext(response: PromptResponse, config: ZenPromptConfig): void {
    this.context.sessionHistory.push(response.value)
    this.context.lastInteraction = new Date()
    
    // Update patterns
    if (response.value) {
      const currentCount = this.context.patterns.get(response.value) || 0
      this.context.patterns.set(response.value, currentCount + 1)
    }

    // Emit consciousness events
    this.emit('interaction', { response, config, context: this.context })
    
    if (response.confidence === 'contemplative') {
      this.emit('deep-thinking', response)
    }
  }

  /**
   * Flow state awareness
   */
  private getFlowEmoji(): string {
    switch (this.context.currentFlow) {
      case 'focused': return '🎯'
      case 'exploring': return '🔍'
      case 'reflecting': return '🧘'
      case 'creating': return '🌟'
      default: return '🌊'
    }
  }
  /**
   * Pattern recognition for consciousness growth
   */
  private findRelatedPattern(_question: string): string | null {
    // Simple pattern matching - in real implementation, this would be more sophisticated
    for (const [pattern, count] of this.context.patterns) {
      if (count > 2 && pattern.length > 3) {
        return pattern
      }
    }
    return null
  }

  private matchesUserPattern(answer: string): boolean {
    return this.context.patterns.has(answer)
  }

  private shouldPause(): boolean {
    const timeSinceLastInteraction = Date.now() - this.context.lastInteraction.getTime()
    return timeSinceLastInteraction < 2000 // Quick succession might need pause
  }

  private createTimeoutResponse(startTime: number): PromptResponse {
    return {
      value: '',
      reflectionRequested: true,
      confidence: 'contemplative',
      metadata: {
        timeToDecision: Date.now() - startTime,
        suggestionsUsed: false,
        contextMatched: false
      }
    }
  }

  /**
   * Graceful consciousness closure
   */
  async closeGracefully(): Promise<void> {
    console.log('\n🙏 Thank you for this conscious session.')
    await ZenPause.gentle('Integration in progress...')
    this.rl.close()
    this.emit('session-complete', this.context)
  }

  /**
   * Session insights for growth
   */
  getSessionInsights(): Record<string, any> {
    const sessionDuration = Date.now() - this.sessionStartTime.getTime()
    const interactionCount = this.context.sessionHistory.length
    
    return {
      duration: sessionDuration,
      interactions: interactionCount,
      averageResponseTime: sessionDuration / Math.max(interactionCount, 1),
      patternsDiscovered: this.context.patterns.size,
      currentFlow: this.context.currentFlow,
      growthMetrics: this.context.growthMetrics
    }
  }
}

/**
 * Convenience factory for creating consciousness-aware prompts
 */
export class ZenPromptFactory {  static intention(question: string, suggestions?: string[] | undefined): ZenPromptConfig {
    return {
      question: `💭 ${question}`,
      suggestions,
      allowReflection: true,
      contextAware: true
    }
  }

  static action(question: string, defaultAction?: string | undefined): ZenPromptConfig {
    return {
      question: `⚡ ${question}`,
      defaultAction,
      allowReflection: false,
      contextAware: false,
      timeoutMs: 5000
    }
  }

  static contemplation(question: string): ZenPromptConfig {
    return {
      question: `🔮 ${question}`,
      allowReflection: true,
      contextAware: true,
      timeoutMs: 30000
    }
  }

  static flow(question: string, suggestions?: string[] | undefined): ZenPromptConfig {
    return {
      question: `🌊 ${question}`,
      suggestions,
      allowReflection: true,
      contextAware: true
    }
  }
}