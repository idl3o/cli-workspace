/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { zen } from '../src/index.js'
import { ZenCore } from '../src/utils/helpers.js'

describe('zen-cli', () => {
  it('should export zen instance', () => {
    expect(zen).to.be.instanceOf(ZenCore)
  })

  it('should track intentions', () => {
    const initialCount = zen.getIntentionCount()
    zen.recordIntent()
    expect(zen.getIntentionCount()).to.equal(initialCount + 1)
  })

  it('should have core methods', () => {
    expect(zen.think).to.be.a('function')
    expect(zen.evolve).to.be.a('function')
    expect(zen.flow).to.be.a('function')
  })
})
