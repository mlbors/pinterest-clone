/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Db - Users
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.24.11
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

const mongodb = require('mongodb')
const shortid = require('shortid')

const dbInfo = require('./db')

/************************************************************/
/************************************************************/

/********************/
/***** DATABASE *****/
/********************/

const MongoClient = mongodb.MongoClient
const dbUrl = dbInfo.info.url

/************************************************************/
/************************************************************/

const self = module.exports = {

  /**********************/
  /***** FIND BY ID *****/
  /**********************/

  /*
   * @var String id user's id
   * @var Function callback a callback function
   */

  findById: (id, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err) return callback(err) 
      
      db.collection('users').findOne({
        _id: id
      }, (err, result) => {
        
        if (err) return callback(err)

        db.close()
        return callback(null, result)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /*******************/
  /***** FIND BY *****/
  /*******************/

  /*
   * @var Object query
   * @var Function callback a callback function
   */

  findBy: (query, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err)  return callback(err) 
      
      db.collection('users').findOne(query, (err, result) => {
        
        if (err) return callback(err)

        db.close()
        return callback(null, result)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /******************/
  /***** UPDATE *****/
  /******************/

  /*
   * @var String id
   * @var String bio
   * @var Function callback a callback function
   */

  update: (id, bio, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {
      
      if (err) return callback(err)
      
      db.collection('users').updateOne({
        _id: id
      },
      {
        $set: {
          bio: bio
        }
      },
      (err, res) => {
        db.close()
        return callback(err, res)
      })

    })

  }

}