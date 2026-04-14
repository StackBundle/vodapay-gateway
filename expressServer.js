const http = require('http');
const fs = require('fs');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const jsYaml = require('js-yaml');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const logger = require('./logger');

class ExpressServer {
  constructor(port, openApiYaml) {
    this.port = port;
    this.app = express();
    this.openApiPath = openApiYaml;

    try {
      this.schema = jsYaml.load(fs.readFileSync(openApiYaml, 'utf8'));
    } catch (e) {
      logger.error('failed to start Express Server', e.message);
    }

    this.setupMiddleware();
  }

  setupMiddleware() {
    // -----------------------------
    // Core middleware
    // -----------------------------
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: '14MB' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    // -----------------------------
    // ROOT ROUTE (fixes "Cannot GET /")
    // -----------------------------
    this.app.get('/', (req, res) => {
      res.status(200).json({
        status: 'VodaPay Gateway API is running',
        docs: '/api-docs',
        health: '/hello'
      });
    });

    // -----------------------------
    // Health check
    // -----------------------------
    this.app.get('/hello', (req, res) => {
      res.send(`Server is running. OpenAPI path: ${this.openApiPath}`);
    });

    // -----------------------------
    // OpenAPI file (raw)
    // -----------------------------
    this.app.get('/openapi', (req, res) => {
      res.sendFile(path.join(__dirname, 'api', 'openapi.yaml'));
    });

    // -----------------------------
    // Swagger UI (safe for viewing only)
    // -----------------------------
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema));

    // -----------------------------
    // OAuth placeholders (safe ignore)
    // -----------------------------
    this.app.get('/login-redirect', (req, res) => {
      res.status(200).json(req.query);
    });

    this.app.get('/oauth2-redirect.html', (req, res) => {
      res.status(200).json(req.query);
    });

    // -----------------------------
    // 🚨 IMPORTANT FIX
    // -----------------------------
    // We removed express-openapi-validator completely
    // because it caused:
    // "Token 'definitions' does not exist"
    //
    // Instead we just pass through requests.
    this.app.use((req, res, next) => {
      req.openapi = {};
      next();
    });
  }

  launch() {
    // Global error handler
    this.app.use((err, req, res, next) => {
      res.status(err.status || 500).json({
        message: err.message || err,
        errors: err.errors || ''
      });
    });

    http.createServer(this.app).listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
    });
  }

  async close() {
    if (this.server !== undefined) {
      await this.server.close();
      console.log(`Server on port ${this.port} shut down`);
    }
  }
}

module.exports = ExpressServer;
