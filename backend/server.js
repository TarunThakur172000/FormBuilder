    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    require('dotenv').config();
    
    const app = express();
    const port = process.env.PORT || 5000;
    
    app.use(cors());
    app.use(bodyParser.json());
    
    // Import routes
    const formRoutes = require('./routes/formRoutes');
    const responseRoutes = require('./routes/responseRoutes');
    
    // Database connection
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Database connection failed:', err);
    });
    
    // Use routes
    app.use('/form', formRoutes);
    app.use('/form', responseRoutes);
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    