const cds = require('@sap/cds');

cds.on('bootstrap', app => {
  const cors = require('cors');
  app.use(cors({
    origin: '*', // or specify: ['http://localhost:3000']
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
});

module.exports = cds.server;
