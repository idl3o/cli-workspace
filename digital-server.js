// Advanced Digital Server with API, WebSockets, and Enhanced Features
// Created for quantum consciousness interface and general web applications

import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DigitalServer {
    constructor(config = {}) {
        this.config = {
            port: config.port || 3000,
            staticDir: config.staticDir || './webapp',
            enableWebSockets: config.enableWebSockets !== false,
            enableAPI: config.enableAPI !== false,
            enableSSL: config.enableSSL || false,
            logLevel: config.logLevel || 'info',
            ...config
        };
        
        this.app = express();
        this.server = http.createServer(this.app);
        this.clients = new Map();
        this.sessions = new Map();
        
        this.setupMiddleware();
        this.setupRoutes();
        
        if (this.config.enableWebSockets) {
            this.setupWebSockets();
        }
    }
    
    setupMiddleware() {
        // CORS configuration
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'anthropic-version']
        }));
        
        // Body parsing
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ extended: true }));
        
        // Logging middleware
        this.app.use((req, res, next) => {
            const timestamp = new Date().toISOString();
            console.log(`${timestamp} - ${req.method} ${req.url}`);
            next();
        });
        
        // Static file serving
        this.app.use(express.static(this.config.staticDir));
    }
    
    setupRoutes() {
        // Health check endpoint
        this.app.get('/api/health', (req, res) => {
            res.json({
                status: 'healthy',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                memory: process.memoryUsage(),
                version: '1.0.0'
            });
        });
        
        // Consciousness API endpoints
        this.app.get('/api/consciousness/state', (req, res) => {
            res.json({
                quantum_coherence: Math.random() * 100,
                neural_activity: Math.random() * 100,
                temporal_flow: Math.random() * 100,
                dimensional_sync: Math.random() * 100,
                timestamp: new Date().toISOString()
            });
        });
        
        this.app.post('/api/consciousness/query', async (req, res) => {
            const { query, type = 'general' } = req.body;
            
            // Simulate consciousness processing
            await this.delay(Math.random() * 1000 + 500);
            
            const responses = {
                akashic: [
                    "Accessing universal knowledge patterns...",
                    "Quantum information matrix resonating...",
                    "Temporal wisdom streams converging..."
                ],
                morphic: [
                    "Morphic field resonance detected...",
                    "Pattern harmonization in progress...",
                    "Field amplification stabilizing..."
                ],
                collective: [
                    "Collective unconscious bridge active...",
                    "Archetypal patterns synchronizing...",
                    "Symbolic interpretation streaming..."
                ],
                temporal: [
                    "Temporal consciousness scan initiated...",
                    "Chronal wave patterns analyzed...",
                    "Deep temporal calibration complete..."
                ]
            };
            
            const responseArray = responses[type] || responses.akashic;
            const response = responseArray[Math.floor(Math.random() * responseArray.length)];
            
            res.json({
                query,
                type,
                response,
                confidence: Math.random() * 0.3 + 0.7,
                timestamp: new Date().toISOString()
            });
        });
        
        // File upload endpoint
        this.app.post('/api/upload', async (req, res) => {
            try {
                const { filename, content, type = 'text' } = req.body;
                const uploadDir = path.join(this.config.staticDir, 'uploads');
                
                // Ensure upload directory exists
                try {
                    await fs.access(uploadDir);
                } catch {
                    await fs.mkdir(uploadDir, { recursive: true });
                }
                
                const filepath = path.join(uploadDir, filename);
                await fs.writeFile(filepath, content);
                
                res.json({
                    success: true,
                    filename,
                    path: `/uploads/${filename}`,
                    size: content.length
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        });
        
        // Session management
        this.app.post('/api/session/create', (req, res) => {
            const sessionId = crypto.randomUUID();
            const session = {
                id: sessionId,
                created: new Date().toISOString(),
                data: req.body.data || {},
                active: true
            };
            
            this.sessions.set(sessionId, session);
            
            res.json({
                sessionId,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            });
        });
        
        this.app.get('/api/session/:id', (req, res) => {
            const session = this.sessions.get(req.params.id);
            if (!session) {
                return res.status(404).json({ error: 'Session not found' });
            }
            
            res.json(session);
        });
        
        // WebSocket client list
        this.app.get('/api/clients', (req, res) => {
            const clientList = Array.from(this.clients.values()).map(client => ({
                id: client.id,
                connected: client.connected,
                lastSeen: client.lastSeen
            }));
            
            res.json({
                count: clientList.length,
                clients: clientList
            });
        });
        
        // Catch-all for SPA routing
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, this.config.staticDir, 'index.html'));
        });
    }
      setupWebSockets() {
        this.wss = new WebSocketServer({ server: this.server });
        
        this.wss.on('connection', (ws, req) => {
            const clientId = crypto.randomUUID();
            const client = {
                id: clientId,
                ws,
                connected: true,
                lastSeen: new Date().toISOString(),
                ip: req.socket.remoteAddress
            };
            
            this.clients.set(clientId, client);
            
            console.log(`🔗 WebSocket client connected: ${clientId}`);
            
            // Send welcome message
            ws.send(JSON.stringify({
                type: 'connection',
                clientId,
                message: 'Connected to Digital Server WebSocket',
                timestamp: new Date().toISOString()
            }));
            
            // Handle messages
            ws.on('message', (data) => {
                try {
                    const message = JSON.parse(data);
                    this.handleWebSocketMessage(clientId, message);
                } catch (error) {
                    console.error('WebSocket message parse error:', error);
                }
            });
            
            // Handle disconnection
            ws.on('close', () => {
                client.connected = false;
                console.log(`🔌 WebSocket client disconnected: ${clientId}`);
                // Keep client record for a while
                setTimeout(() => {
                    this.clients.delete(clientId);
                }, 60000);
            });
            
            // Handle errors
            ws.on('error', (error) => {
                console.error(`WebSocket error for client ${clientId}:`, error);
            });
        });
    }
    
    handleWebSocketMessage(clientId, message) {
        const client = this.clients.get(clientId);
        if (!client) return;
        
        client.lastSeen = new Date().toISOString();
        
        switch (message.type) {
            case 'ping':
                client.ws.send(JSON.stringify({
                    type: 'pong',
                    timestamp: new Date().toISOString()
                }));
                break;
                
            case 'consciousness_update':
                // Broadcast consciousness updates to all clients
                this.broadcast({
                    type: 'consciousness_broadcast',
                    source: clientId,
                    data: message.data,
                    timestamp: new Date().toISOString()
                }, clientId);
                break;
                
            case 'chat':
                // Echo chat messages to all clients
                this.broadcast({
                    type: 'chat_message',
                    clientId,
                    message: message.message,
                    timestamp: new Date().toISOString()
                });
                break;
                
            default:
                console.log(`Unknown message type: ${message.type}`);
        }
    }
    
    broadcast(message, excludeClientId = null) {
        const messageStr = JSON.stringify(message);
        
        this.clients.forEach((client, clientId) => {
            if (client.connected && clientId !== excludeClientId) {
                try {
                    client.ws.send(messageStr);
                } catch (error) {
                    console.error(`Failed to send message to client ${clientId}:`, error);
                }
            }
        });
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    start() {
        return new Promise((resolve) => {
            this.server.listen(this.config.port, () => {
                console.log('\n🚀 Digital Server Started Successfully!');
                console.log('═'.repeat(50));
                console.log(`🌐 Server URL: http://localhost:${this.config.port}`);
                console.log(`📁 Static Files: ${this.config.staticDir}`);
                console.log(`🔌 WebSockets: ${this.config.enableWebSockets ? 'Enabled' : 'Disabled'}`);
                console.log(`🛠️  API Endpoints: ${this.config.enableAPI ? 'Enabled' : 'Disabled'}`);
                console.log('═'.repeat(50));
                console.log('📊 Available Endpoints:');
                console.log('   GET  /api/health - Server health check');
                console.log('   GET  /api/consciousness/state - Consciousness state');
                console.log('   POST /api/consciousness/query - Query consciousness');
                console.log('   POST /api/upload - File upload');
                console.log('   POST /api/session/create - Create session');
                console.log('   GET  /api/session/:id - Get session');
                console.log('   GET  /api/clients - WebSocket clients');
                console.log('═'.repeat(50));
                console.log('🎯 Ready to serve requests!\n');
                
                resolve(this);
            });
        });
    }
    
    stop() {
        return new Promise((resolve) => {
            console.log('\n🛑 Shutting down Digital Server...');
            
            // Close WebSocket connections
            if (this.wss) {
                this.wss.clients.forEach(ws => {
                    ws.close();
                });
            }
            
            // Close HTTP server
            this.server.close(() => {
                console.log('✅ Digital Server stopped gracefully\n');
                resolve();
            });
        });
    }
}

// Export for use as module
export default DigitalServer;

// Run directly if this file is executed
const isMain = import.meta.url === `file://${process.argv[1]}`;

if (isMain) {
    const config = {
        port: process.env.PORT || 3000,
        staticDir: process.env.STATIC_DIR || './webapp',
        enableWebSockets: true,
        enableAPI: true
    };
    
    const server = new DigitalServer(config);
    
    // Graceful shutdown handlers
    process.on('SIGINT', async () => {
        await server.stop();
        process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
        await server.stop();
        process.exit(0);
    });
    
    // Start the server
    server.start().catch(error => {
        console.error('Failed to start Digital Server:', error);
        process.exit(1);
    });
}
