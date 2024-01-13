const express = require('express');
const connectDB = require('./utils/db');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');  

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using the correct URI from the config file
connectDB();

app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
