const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

app.get('/metrics', (req, res) => {
    fs.readFile('/var/www/html/data.csv', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
