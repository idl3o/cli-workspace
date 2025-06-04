// Auto-Test Runner for Consciousness Components
// Run this in browser console: runConsciousnessTests()

function runConsciousnessTests() {
    console.clear();
    console.log('%c🌌 QUANTUM CONSCIOUSNESS COMPONENT TESTING INITIATED', 'color: #00ffff; font-size: 16px; font-weight: bold;');
    
    // Wait for consciousness to be fully initialized
    setTimeout(() => {
        if (typeof consciousnessInterface !== 'undefined' && typeof ConsciousnessComponentTester !== 'undefined') {
            const tester = new ConsciousnessComponentTester();
            tester.initialize(consciousnessInterface);
            tester.runAllTests();
        } else {
            console.error('❌ Consciousness interface or tester not available');
            console.log('Available objects:', Object.keys(window).filter(key => key.includes('consciousness') || key.includes('Consciousness')));
        }
    }, 2000);
}

// Auto-run tests when page loads (optional)
function autoTestOnLoad() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            console.log('%c🧠 Consciousness components loaded. Run runConsciousnessTests() to test functionality.', 'color: #ff00ff; font-weight: bold;');
        }, 3000);
    });
}

// Initialize auto-test functionality
autoTestOnLoad();

// Export function to global scope
window.runConsciousnessTests = runConsciousnessTests;
