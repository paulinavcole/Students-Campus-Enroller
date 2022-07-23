const { syncAndSeed } = require('./db');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
}); 

app.use('/api', require('./api/routes'));

app.use((req, res, next) => {
    const error = Error('page not found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error!');
});

const init = async() => {
    try {
        await syncAndSeed();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`listening on port ${PORT}`));
    }
    catch(error) {
        console.log(error);
    }
};

init()
