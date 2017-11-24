/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Routes - Index
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.24.11
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

var express = require('express')
var router = express.Router()

const auth = require('./auth')
const logout = require('./logout')
const pins = require('./pins')
const dbPins = require('../db/pins')

/************************************************************/
/************************************************************/

/****************/
/***** HOME *****/
/****************/

router.get('/', (req, res) => {
  dbPins.findAll((err, results) => {
    res.render('index', {
      title: 'Last pins',
      auth: req.isAuthenticated(),
      user: req.user,
      error: err,
      pins: results
    })
  })
})

/************************************************************/
/************************************************************/

/****************/
/***** AUTH *****/
/****************/

router.use('/auth', auth)

/************************************************************/
/************************************************************/

/******************/
/***** LOGOUT *****/
/******************/

router.use('/logout', logout)

/************************************************************/
/************************************************************/

/****************/
/***** PINS *****/
/****************/

router.use('/pins', pins)

/************************************************************/
/************************************************************/

/*******************/
/***** EXPORTS *****/
/*******************/

module.exports = router
