/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Main
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.24.11
 * @for freeCodeCamp
 */

/****************/
/***** MAIN *****/
/****************/

const Main = () => {

  /**********/
  /********** VARS **********/
  /**********/

  /*
   * @var Object _actionsHandler object that handles actions on buttons
   * @var Object _uiHandler Object that handles UI
   * @var Object _usersHandler Object that handles user's data
   */

  let _actionsHandler = ActionsHandler()
  let _uiHandler = UIHandler()
  let _usersHandler = UsersHandler()

  /************************************************************/
  /************************************************************/

  /**********/
  /********** LOAD **********/
  /**********/

  _load = () => {
    
    $(window).on('load', () => {
      _uiHandler.initMasonry()
    })

  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** READY **********/
  /**********/

  _ready = () => {

    $(document).ready(() => {

      _usersHandler.getStatus().then((userData) => {

        _uiHandler.init()
        _actionsHandler.init(_uiHandler)
        
      }).catch((e) => {
        console.warn('Error while getting user data...')
        console.error(err)
        return false
      })

    })

  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** AJAX **********/
  /**********/

  _ajax = () => {
    
    $(document).on('ajaxComplete', () => {
      _uiHandler.checkImages()
    })

  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** INIT **********/
  /**********/

  return {
    init: () => {
      _load()
      _ready()
      _ajax()
    }
  }

}

/************************************************************/
/************************************************************/

/****************/
/***** INIT *****/
/****************/

const main = Main()
main.init()
