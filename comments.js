// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const comments = require('./comments.json');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    const newComment = req.body;
    comments.push(newComment);

    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Something went wrong' });
        } else {
            res.json({ message: 'Comment successfully added!' });
        }
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});