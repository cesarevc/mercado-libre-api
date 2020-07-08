'use strict'

const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

// const { getCompanyData, getArticles } = require('./getData');

const routes = require('./routes')

// middleware
app.use( express.static(__dirname + '/public'));


// routes prefix
app.use('/api', routes)


app.listen(PORT, () => {
    console.log(`Server has started, listening on port ${PORT}`)
});
