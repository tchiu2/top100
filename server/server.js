const express = require('express');
const path = require('path');

const apiRouter = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/api', apiRouter);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));

app.listen(port, () => console.log(`Listening on port ${port}`));
