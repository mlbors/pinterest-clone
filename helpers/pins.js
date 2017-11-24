/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Helpers - Pins
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.24.11
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

const dbPins = require('../db/pins')

/************************************************************/
/************************************************************/

const self = module.exports = {

  /*************************/
  /***** GET USER PINS *****/
  /*************************/

  /*
   * @var String id
   * @return Promise
   */

  getUserPins: (id) => {
    return new Promise((resolve, reject) => {

      if (typeof id !== 'undefined' && id !== null && id) {

        dbPins.findBy({user: id}, (err, data) => {
          if (err) reject(err)
          resolve(data)
        })  

      } else {
        resolve(null)
      }

    })
  },

  /************************************************************/
  /************************************************************/

  /*******************/
  /***** GET PIN *****/
  /*******************/

  /*
   * @var String id
   * @return Promise
   */

  getPin: (id) => {
    return new Promise((resolve, reject) => {

      if (typeof id !== 'undefined' && id !== null && id) {

        dbBooks.findById(id, (err, data) => {
          if (err) reject(err)
          resolve(data)
        })  

      } else {
        resolve(null)
      }

    })
  }

}