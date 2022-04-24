const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(port, () => {
    console.log("listening on port " + port);
});