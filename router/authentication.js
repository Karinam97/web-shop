const express = require('express')
const router = express.Router()

router.post('/account', (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username and password match the expected values
    if (username === 'test' && password === '123') {
      // Redirect to the account page upon successful login
      res.redirect('/account.html');
    } else {
      res.status(401).json({ error: 'Invalid credentials'});
    }
  });

module.exports = router
