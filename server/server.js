const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});