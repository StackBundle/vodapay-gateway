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

// 👉 IMPORT YOUR PAYMENT SERVICE (IMPORTANT)
const PayProcessService = require('./services/PayProcessService');

class ExpressServer {
  constructor(port, openApiYaml) {
    this.port = port;
    this.app = express();
    this.openApiPath = openApiYaml;
    this.server = null;

    try {
      this.schema = jsYaml.load(fs.readFileSync(openApiYaml, 'utf8'));
    } catch (e) {
      logger.error('failed to start Express Server', e.message);
    }

    this.setupMiddleware();
    this.setupRoutes(); // 👈 ADD ROUTES HERE
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: '14MB' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    this.app.use((req, res, next) => {
      req.openapi = {};
      next();
    });
  }

  setupRoutes() {

    // ROOT
    this.app.get('/', (req, res) => {
      res.status(200).json({
        status: 'VodaPay Gateway API is running',
        docs: '/api-docs',
        health: '/hello'
      });
    });

    // HEALTH
    this.app.get('/hello', (req, res) => {
      res.send(`Server is running. OpenAPI path: ${this.openApiPath}`);
    });

    // OPENAPI
    this.app.get('/openapi', (req, res) => {
      res.sendFile(path.join(__dirname, 'api', 'openapi.yaml'));
    });

    // SWAGGER
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema));

    // OAUTH
    this.app.get('/login-redirect', (req, res) => {
      res.status(200).json(req.query);
    });

    this.app.get('/oauth2-redirect.html', (req, res) => {
      res.status(200).json(req.query);
    });

    // ======================================================
    // ✅ PAYMENT ENDPOINT (THIS FIXES YOUR 404 ERROR)
    // ======================================================
    this.app.post('/create-payment', async (req, res) => {
      try {
        const { orderId } = req.body;

        if (!orderId) {
          return res.status(400).json({
            error: 'orderId is required'
          });
        }

        const service = new PayProcessService();

        const result = await service.createPayment(orderId);

        return res.json(result);

      } catch (err) {
        logger.error('create-payment error', err);
        return res.status(500).json({
          error: 'Payment creation failed',
          details: err.message
        });
      }
    });

  }

  launch() {
    this.server = http.createServer(this.app);

    this.server.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
    });
  }

  async close() {
    if (this.server) {
      await this.server.close();
      console.log(`Server on port ${this.port} shut down`);
    }
  }
}

module.exports = ExpressServer;
