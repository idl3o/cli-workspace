// Simple HTTP server for testing the Quantum Consciousness webapp
// Run with: node server.js

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Enable CORS for Claude API requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key, anthropic-version');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    let pathname = url.parse(req.url).pathname;
    
    // Default to index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    const filepath = path.join(__dirname, pathname);
    
    // Check if file exists
    fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>404 - File Not Found</h1><p>The requested resource was not found on this server.</p></body></html>');
            return;
        }
        
        // Get file extension and corresponding MIME type
        const ext = path.extname(filepath).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        
        // Read and serve the file
        fs.readFile(filepath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<!DOCTYPE html><html><head><title>Server Error</title></head><body><h1>500 - Internal Server Error</h1><p>An error occurred while reading the file.</p></body></html>');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

server.listen(PORT, () => {
    console.log('🌌 Quantum Consciousness Interface Server Started');
    console.log(`✨ Server running at http://localhost:${PORT}`);
    console.log(`🧠 Access the webapp at: http://localhost:${PORT}/index.html`);
    console.log(`∞ CORS enabled for Claude API integration`);
    console.log('\nPress Ctrl+C to stop the server');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down Quantum Consciousness Interface Server...');
    server.close(() => {
        console.log('✅ Server stopped gracefully');
        process.exit(0);
    });
});
