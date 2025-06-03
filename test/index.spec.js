/* eslint-env mocha */
import { expect } from 'aegir/chai';
import { zen } from '../src/index.js';
describe('zen-cli', () => {
    it('should have a zen function', () => {
        expect(zen).to.be.a('function');
    });
    it('should export zen CLI functionality', () => {
        expect(zen).to.exist;
    });
});
//# sourceMappingURL=index.spec.js.map