/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Db - Pins
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
const usersHelpers = require('../helpers/users')

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

  /********************/
  /***** FIND ALL *****/
  /********************/

  /*
   * @var Function callback a callback function
   * @return Array
   */

  findAll: (callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {
    
      if (err) return callback(err)
      
      db.collection('pins')
      .find({})
      .sort({'date': -1})
      .toArray((err, result) => {
        if (err) return callback(err)
        db.close()
        return callback(null, result)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /**********************/
  /***** FIND BY ID *****/
  /**********************/

  /*
   * @var String id pin's id
   * @var Function callback a callback function
   */

  findById: (id, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err) return callback(err)
      
      db.collection('pins').findOne({
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
      
      db.collection('pins')
      .find(query)
      .sort({'date': -1})
      .toArray((err, result) => {
        if (err) return callback(err)
        db.close()
        return callback(null, result)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /*******************/
  /***** ADD PIN *****/
  /*******************/

  /*
   * @var String title
   * @var String description
   * @var String image
   * @var String user
   * @var Function callback a callback function
   */

  add: (title, description, image, user, callback) => {

    MongoClient.connect(dbUrl, (err, db) => {
      
      if (err) return callback(err)

      usersHelpers.getUserData(user).then((userData) => {

        db.collection('pins').insertOne({
          _id: shortid.generate(),
          date: new Date(),
          title: title,
          description: description,
          image: image,
          user: user,
          userData: {
            username: userData.username,
            displayName: userData.displayName
          },
          favorites: []
        },
        (err, res) => {
          db.close()
          return callback(err, res)
        })

      }).catch((err) => {
        db.close()
        return callback(err, res)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /******************/
  /***** UPDATE *****/
  /******************/

  /*
   * @var String pin's id
   * @var String title
   * @var String description
   * @var Function callback a callback function
   */

  update: (id, title, description, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {
      
      if (err) return callback(err)
      
      db.collection('pins').updateOne({
        _id: id
      },
      {
        $set: {
          title: title,
          description: description
        }
      },
      (err, res) => {
        db.close()
        return callback(err, res)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /**********************/
  /***** DELETE PIN *****/
  /**********************/

  /*
   * @var String pin's id
   * @var Function callback a callback function
   */

  delete: (id, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err) return callback(err)
      
      db.collection('pins').deleteOne({
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

  /**********************/
  /***** DELETE ALL *****/
  /**********************/

  /*
   * @var Function callback a callback function
   */

  deleteAll: (callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err) return callback(err) 
      
      db.collection('pins').deleteMany({}, (err, result) => {
        
        if (err) return callback(err)

        db.close()
        return callback(null, result)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /****************/
  /***** LIKE *****/
  /****************/

  /*
   * @var String pin 
   * @var String user
   * @var Function callback a callback function
   */

  like: (pin, user, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err) return callback(err)
      
      db.collection('pins').update(
        {
          "_id": pin
        },
        {
          $addToSet: {
            favorites: user
          }
        },
        (err, res) => {
          db.close()
          return callback(err, res)
        }
      )
    })
  },

  /************************************************************/
  /************************************************************/

  /*******************/
  /***** DISLIKE *****/
  /*******************/

  /*
   * @var String pin 
   * @var String user
   * @var Function callback a callback function
   */

  dislike: (pin, user, callback) => {
    
    MongoClient.connect(dbUrl, (err, db) => {

      if (err) return callback(err)
      
      db.collection('pins').update(
        {
          "_id": pin
        },
        {
          $pull: {
            favorites: user
          }
        },
        (err, res) => {
          db.close()
          return callback(err, res)
        }
      )
    })
  },

}