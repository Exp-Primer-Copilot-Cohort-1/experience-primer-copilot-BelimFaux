// Create web server
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
    }
    res.send(data);
  });
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
    }
    const comments = JSON.parse(data);
    comments.push(comment);
    fs.writeFile('data.json', JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('Server error');
      }
      res.send('Comment added');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});