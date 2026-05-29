const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.json());

const registeredEmails  = ['user@example.com', 'user2@example.com'];

app.post('/validate', (req, res) => {
  const { email } = req.body;

  if (registeredEmails.includes(email)) {
  res.json({ valid: true, message: 'Email is already registered.' });
} else {
  res.json({ valid: false, message: 'Email is not registered.' });
}

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});