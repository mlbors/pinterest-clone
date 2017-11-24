/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Routes - Users
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.24.11
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

var express = require('express');
var router = express.Router();

const dbUsers = require('../db/users')
const pinsHelper = require('../helpers/pins')
const usersHelper = require('../helpers/users')

/************************************************************/
/************************************************************/

/******************/
/***** STATUS *****/
/******************/

router.get('/status', (req, res) => {
  res.send({
    auth: req.isAuthenticated(),
    user: req.user
  })
})

/************************************************************/
/************************************************************/

/*******************/
/***** PROFILE *****/
/*******************/

router.get('/profile/:username', (req, res) => {

  usersHelper.getUserDataByUsername(req.params.username).then((data) => {
    return Promise.all([data, pinsHelper.getUserPins(data._id)])
  }).then(([data, userPins]) => {
    res.render('user-profile', {
      title: 'User profile',
      auth: req.isAuthenticated(),
      user: req.user,
      data: data,
      pins: userPins,
      error: null
    })
  }).catch((err) => {
    res.render('user-profile', {
      title: 'User profile',
      auth: req.isAuthenticated(),
      user: req.user,
      data: null,
      pins: null,
      error: (typeof err.error !== 'undefined' && err.error !== null && err.error !== '') ? err.error : 'Error: ' + err
    })
  })

})

/************************************************************/
/************************************************************/

/************************/
/***** EDIT PROFILE *****/
/************************/

router.get('/edit-profile/:id', (req, res) => {

  usersHelper.getUserData(req.params.id).then((data) => {

    res.render('edit-profile', {
      title: 'Edit profile',
      auth: req.isAuthenticated(),
      user: req.user,
      data: data,
      error: null
    })
  }).catch((err) => {
    res.render('edit-profile', {
      title: 'Edit profile',
      auth: req.isAuthenticated(),
      user: req.user,
      data: null,
      error: (typeof err.error !== 'undefined' && err.error !== null && err.error !== '') ? err.error : 'Error: ' + err
    })
  })
  
})

/************************************************************/
/************************************************************/

/************************/
/***** SAVE PROFILE *****/
/************************/

router.post('/save-profile', (req, res) => {

  const data = JSON.parse(req.body.data)

  dbUsers.update(req.user._id, data.bio, (err, result) => {
    res.send({
      auth: req.isAuthenticated(),
      info: null,
      result: result,
      error: err
    })
  })

})

/************************************************************/
/************************************************************/

/*******************/
/***** EXPORTS *****/
/*******************/

module.exports = router;
