const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db');
const app = express()

app.use(cors());
app.use(express.json())

connectDB();

app.use('/api/auth', require('./routes/auth'))
app.use('/api/complaints', require('./routes/complaints'))
app.use('/api/dashboard', require('./routes/dashboard'))

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));