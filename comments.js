// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock database
let comments = [
  { id: 1, text: 'This is a comment' },
  { id: 2, text: 'This is another comment' },
];

// Routes
app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const newComment = { id: comments.length + 1, text: req.body.text };
  comments.push(newComment);
  res.json(newComment);
});

app.delete('/comments/:id', (req, res) => {
  const commentId = parseInt(req.params.id);
  comments = comments.filter(comment => comment.id !== commentId);
  res.json({ message: 'Comment deleted' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});