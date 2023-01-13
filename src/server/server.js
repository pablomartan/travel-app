const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../../dist'));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
