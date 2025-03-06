require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const config = require('./config/config');

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', authRoutes);

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas connection successful'))
.catch(err => console.log(`MongoDB connection error: ${err.message}`));

app.listen(4000, () => {
  console.log('Server started on port 4000');
});
