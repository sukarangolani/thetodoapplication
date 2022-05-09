const express = require('express');
const bodyParser = require("body-parser");
const path = require("path")

const router = require('./src/routes/router');
const errorLogger = require('./src/utilities/errorlogger')
const requestLogger = require('./src/utilities/requestlogger')

const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);

if (process.env.NODE_ENV === 'production') {
    app.use('/',express.static('./client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening in port ${port}`));