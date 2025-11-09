const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const articleRoutes = require('./routes/article.routes');
const avisRoutes = require('./routes/avis.routes');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/avis', avisRoutes);

app.get('/', (req, res) => res.send({ ok: true, msg: 'La Foire API' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
