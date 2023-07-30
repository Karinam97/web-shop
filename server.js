const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// Serve the static files from the public folder
app.use(express.static(path.join(__dirname, 'client')));

// POST endpoint for login
app.post('/account', (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password match the expected values
  if (username === 'karina_test' && password === 'karina_password') {
    // Redirect to the account page upon successful login
    res.redirect('/account.html');
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})