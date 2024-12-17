const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const app = express();

// Middleware para JSON
app.use(express.json());

// Rotas principais
app.use('/api', routes);

// Configura porta
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
