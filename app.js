'use strict'

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const { getCompanyData, getArticles } = require('./getData');


// const getInfo = async () => {

//     const companyData = await getCompanyData ('CELULANDIA STORE');

//     const { meli_id } = companyData;

//     const articlesData = await getArticles(meli_id);

//     console.log(articlesData)

// }

// getInfo();


// middleware
app.use( express.static(__dirname + '/public'));


app.listen(PORT, () => {
    console.log(`Server has started, listening on port ${PORT}`)
});
