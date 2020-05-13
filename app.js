const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
var parseString = require('xml2js').parseString;

const app = express();

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

app.set("view engine", "ejs");

const port = 8555;

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/base.html')));

app.get('/:url', (req, res) => {
    let url  = decodeURI(req.params.url);

    axios.get(url)
    .then(function (response) {
        parseString(response.data, function (err, result) {
            if (err) {
                return res.status(500).json({
                    errors: err,
                });
            }

            return res.json({ data: result });
        });
    });
});

const server = app.listen(port, () => console.log('Order api listening on port ' + port));

module.exports = server;
