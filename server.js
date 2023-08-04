const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./router/authentication')
const path = require('path');
const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// Serve the static files from the public folder
app.use(express.static(path.join(__dirname, 'client')));

// POST endpoint for login
app.use(auth);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})