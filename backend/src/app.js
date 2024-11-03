require('dotenv').config();
const express = require('express');
const cors = require('cors')
const usersRoutes = require('./routes/usersRoutes');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middleware/errorHandler');


const app = express();
app.use(cors())

app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/posts', postRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});