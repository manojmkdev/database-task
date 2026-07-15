const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = 3000;
app.use(express.json());


const MONGO_URI = 'mongodb://manojmk2910:root@ac-mpuhdv6-shard-00-00.sttol79.mongodb.net:27017,ac-mpuhdv6-shard-00-01.sttol79.mongodb.net:27017,ac-mpuhdv6-shard-00-02.sttol79.mongodb.net:27017/?ssl=true&replicaSet=atlas-59wul8-shard-0&authSource=admin&retryWrites=true&w=majority&appName=database-task';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB connection error:', err));


app.use('/', postRoutes);


app.get('/', (req, res) => {
    res.send('Database Task API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
