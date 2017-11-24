/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Routes - Pins
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.24.11
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

const express = require('express')
const router = express.Router()

const dbPins = require('../db/pins')

/************************************************************/
/************************************************************/

/****************/
/***** LIST *****/
/****************/

router.get('/', (req, res) => {
  dbPins.findAll((err, results) => {
    res.send({
      pins: results,
      info: null,
      auth: req.isAuthenticated(),
      user: req.user,
      error: err
    })
  })
})

/************************************************************/
/************************************************************/

/***************/
/***** ADD *****/
/***************/

router.get('/add-pin', (req, res) => {

  res.render('pin-form', {
    title: 'Add pin',
    auth: req.isAuthenticated(),
    user: req.user,
    dataAction: 'add-pin',
    action: '/pins/add',
    submit: 'Add',
    pin: null,
    error: null
  })

})

/************************************************************/
/************************************************************/

/****************/
/***** EDIT *****/
/****************/

router.get('/edit/:id', (req, res) => {

  dbPins.findById(req.params.id, (err, result) => {
    res.render('pin-form', {
      title: 'Edit pin',
      auth: req.isAuthenticated(),
      user: req.user,
      dataAction: 'edit-pin',
      action: '/pins/update',
      submit: 'Update',
      pin: result,
      error: err
    })
  })

})
  
/************************************************************/
/************************************************************/

/***************/
/***** ADD *****/
/***************/

router.post('/add', (req, res) => {

  const data = JSON.parse(req.body.data)

  dbPins.add(data.title, data.description, data.image, req.user._id, (err, result) => {
    res.send({
      result: result,
      info: null,
      auth: req.isAuthenticated(),
      error: err
    })
  })

})

/************************************************************/
/************************************************************/

/*********************/
/***** SAVE EDIT *****/
/*********************/

router.post('/update', (req, res) => {
  const data = JSON.parse(req.body.data)

  dbPins.update(data.pin, data.title, data.description, (err, result) => {
    res.send({
      result: result,
      info: null,
      auth: req.isAuthenticated(),
      error: err
    })
  })

})

/************************************************************/
/************************************************************/

/******************/
/***** DELETE *****/
/******************/

router.delete('/delete', (req, res) => {

  const data = JSON.parse(req.body.data)

  dbPins.delete(data.pin, (err, result) => {
    res.send({
      result: result,
      info: null,
      auth: req.isAuthenticated(),
      error: err
    })
  })

})

/************************************************************/
/************************************************************/

/****************/
/***** LIKE *****/
/****************/

router.post('/like', (req, res) => {
  
  const data = JSON.parse(req.body.data)

  dbPins.like(data.pin, req.user._id, (err, result) => {
    res.send({
      result: result,
      info: null,
      auth: req.isAuthenticated(),
      error: err
    })
  })

})
  
/************************************************************/
/************************************************************/

/*******************/
/***** DISLIKE *****/
/*******************/

router.post('/dislike', (req, res) => {
  
  const data = JSON.parse(req.body.data)

  dbPins.dislike(data.pin, req.user._id, (err, result) => {
    res.send({
      result: result,
      info: null,
      auth: req.isAuthenticated(),
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