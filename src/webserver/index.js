// Create simple webserver with express and serve index.html which is located one level up in the frontend folder:
const express = require('express');
require('./faceDetection.js');

const app = express();

app.use(express.static('../frontend'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
