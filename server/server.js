const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
connectDB();

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});