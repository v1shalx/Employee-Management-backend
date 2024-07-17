const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Body parser middleware

// MongoDB URI
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB database connection established successfully');
}).catch(err => console.error('MongoDB connection error:', err));

// Routes
const employeesRouter = require('./routes/employees');
app.use('/api/employees', employeesRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
