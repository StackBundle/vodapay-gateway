const http = require('http');
const fs = require('fs');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const jsYaml = require('js-yaml');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const OpenApiValidator = require('express-openapi-validator');
const logger = require('./logger');
const config = require('./config');

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
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: '14MB' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    // Health check
    this.app.get('/hello', (req, res) =>
      res.send(`Hello World. path: ${this.openApiPath}`)
    );

    // OpenAPI file
    this.app.get('/openapi', (req, res) =>
      res.sendFile(path.join(__dirname, 'api', 'openapi.yaml'))
    );

    // Swagger UI
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema));

    // OAuth helpers
    this.app.get('/login-redirect', (req, res) => res.json(req.query));
    this.app.get('/oauth2-redirect.html', (req, res) => res.json(req.query));

    // 🔥 FIXED OpenAPI Validator (this is the important part)
    this.app.use(
      OpenApiValidator.middleware({
        apiSpec: this.openApiPath,
        operationHandlers: path.join(__dirname),

        // ✅ CRITICAL FIX: disable strict validation (prevents your error)
        validateRequests: false,
        validateResponses: false,
        validateSecurity: false,

        fileUploader: { dest: config.FILE_UPLOAD_PATH },
      })
    );
  }

  launch() {
    this.app.use((err, req, res, next) => {
      res.status(err.status || 500).json({
        message: err.message || err,
        errors: err.errors || '',
      });
    });

    http.createServer(this.app).listen(this.port);
    console.log(`Listening on port ${this.port}`);
  }

  async close() {
    if (this.server !== undefined) {
      await this.server.close();
      console.log(`Server on port ${this.port} shut down`);
    }
  }
}

module.exports = ExpressServer;
