'use strict'

const express = require('express');

const controller = require('../controllers')

const router = express.Router();


router.get('/getCompanyData/:nickname', controller.getCompanyData );
router.get('/getCompanyArticles/:id', controller.getCompanyArticles );


module.exports = router;
