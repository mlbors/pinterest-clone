/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Actions Handler
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.24.11
 * @for freeCodeCamp
 */

/****************/
/***** MAIN *****/
/****************/

const ActionsHandler = () => {

  /**********/
  /********** VARS **********/
  /**********/

  /*
   * @var Object _uiHandler Object that handles UI
   */

  let _uiHandler

  /************************************************************/
  /************************************************************/

  /**********/
  /********** MAKE REQUEST **********/
  /**********/

  /*
   * @var String url
   * @var String type
   * @var String action
   * @var Object data
   */

  _makeRequest = (url, type, action, data) => {
    return $.ajax({
      url: window.location.origin + url,
      type: type,
      cache: false,
      dataType: 'json',
      data: {
        action,
        data
      },
      succes: (result) => {
        return result
      },
      error: (err) => {
        return {error: err}
      }
    })
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** HANDLE ACTION RESULT **********/
  /**********/

  /*
   * @var Object target
   * @var String action
   * @var Object data
   * @return Promise
   */

  _handleActionResult = (target, action, data) => {

    return new Promise((resolve, reject) => {

      switch (action) {
        case 'delete-pin':
          _uiHandler.manageMessageInfo(1, 'success', 'Pin deleted!')
          $('.grid div#' + data.pin).remove()
          $('.grid').masonry('reloadItems')
          $('.grid').masonry()
          resolve()
          break

        case 'like-pin':
          $('.grid div#' + data.pin).find('a.like').remove()
          
          str = '<a class="dislike action" href="#" data-action="dislike-pin" data-id="' + data.pin + '">'
          str += '<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>'
          str += '</a>'

          $('.grid div#' + data.pin + ' .like-actions').append(str)

          resolve()
          break

        case 'dislike-pin':

          $('.grid div#' + data.pin).find('a.dislike').remove()
          
          str = '<a class="like action" href="#" data-action="like-pin" data-id="' + data.pin + '">'
          str += '<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>'
          str += '</a>'

          $('.grid div#' + data.pin + ' .like-actions').append(str)

          resolve()
          break

        case 'save-profile':
          _uiHandler.manageMessageInfo(1, 'success', 'Profile saved!')
          resolve({redirection: window.location.origin + '/users/profile/' + data.username})
          break

        case 'add-pin':
          _uiHandler.manageMessageInfo(1, 'success', 'Pin added!')
          $('#pin-form').find("input[type=text], textarea").val('')
          resolve({redirection: window.location.origin})
          break

        case 'edit-pin':
          _uiHandler.manageMessageInfo(1, 'success', 'Pin edited!')
          resolve({redirection: window.location.origin})
          break
      }
      
    })

  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** PREPARE ACTION **********/
  /**********/

  /*
   * @var Object target
   * @var String action
   * @return Promise
   */

  _prepareAction = (target, action) => {
    return new Promise((resolve, reject) => {

      let dataAction = {}
      
      let url = ''
      let type = ''
      let data = {}
  
      switch (action) {
        case 'delete-pin':
          url = '/pins/delete'
          type = 'DELETE'
          data = {
            pin: target.attr('data-id')
          }
          break

        case 'like-pin':
          url = '/pins/like'
          type = 'POST'
          data = {
            pin: target.attr('data-id')
          }
          break

        case 'dislike-pin':
          url = '/pins/dislike'
          type = 'POST'
          data = {
            pin: target.attr('data-id')
          }
          break
  
        case 'save-profile':
          url = '/users/save-profile'
          type = 'POST'
          data = {
            bio: $('#profil-form #bio').val(),
            username: $('#profil-form #username').val()
          }
          break
  
        case 'add-pin':
          url = '/pins/add'
          type = 'POST'
          data = {
            title: $('#pin-form #title').val(),
            image: $('#pin-form #image').val(),
            description: $('#pin-form #description').val()
          }
          break
  
        case 'edit-pin':
          url = '/pins/update'
          type = 'POST'
          data = {
            title: $('#pin-form #title').val(),
            image: $('#pin-form #image').val(),
            description: $('#pin-form #description').val(),
            pin: $('#pin-form #pin').val()
          }
          break
      }
  
      dataAction = {
        url: url,
        type: type,
        data: data
      }
  
      resolve(dataAction)

    })
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** ACTION SUBMIT **********/
  /**********/

  /*
   * @return Bool
   */
  
  _actionSubmit = () => {
    $(document).on('submit', 'form.action-form', (e) => {
      e.preventDefault()

      _uiHandler.manageMessageInfo(0, null, null)

      const target = $(e.currentTarget)
      const action = target.attr('data-action')

      _prepareAction(target, action).then((dataAction) => {

        _makeRequest(dataAction.url, dataAction.type, action, JSON.stringify(dataAction.data)).then((result) => {
          
          if (result.error !== null) {
            console.warn('Error during request...')
            console.error(result.error)
            _uiHandler.manageMessageInfo(1, 'danger', result.error)
            return false
          }
  
          if (result.info === null) {

            _handleActionResult(target, action, dataAction.data).then((handleResult) => {
              setTimeout(() => {
                if (typeof handleResult.redirection !== 'undefined' && handleResult.redirection !== null) {
                  _uiHandler.manageMessageInfo(0, null, null)
                  window.location.replace(handleResult.redirection)
                }
              }, 5000)
              return false
            }).catch((err) => {
              console.warn('Error during request...')
              console.error(err)
              _uiHandler.manageMessageInfo(1, 'danger', result.error)
              return false
            })

          } else {
            console.log(result.info)
            _uiHandler.manageMessageInfo(1, 'warning', result.info)
            return false
          }

        }).catch((err) => {
          console.warn('Error during request...')
          console.error(err)
          _uiHandler.manageMessageInfo(1, 'danger', result.error)
          return false
        })

      }).catch((err) => {
        console.warn('Error while preparing data...')
        console.error(err)
        _uiHandler.manageMessageInfo(1, 'danger', result.error)
        return false
      })

    })
  } 
   
  /************************************************************/
  /************************************************************/

  /**********/
  /********** ACTION CLICK **********/
  /**********/

  /*
   * @return Bool
   */

  _actionClick = () => {
    $(document).on('click', 'a.action', (e) => {
      e.preventDefault()

      _uiHandler.manageMessageInfo(0, null, null)

      const target = $(e.currentTarget)
      const action = target.attr('data-action')

      _prepareAction(target, action).then((dataAction) => {

        _makeRequest(dataAction.url, dataAction.type, action, JSON.stringify(dataAction.data)).then((result) => {
          
          if (result.error !== null) {
            console.warn('Error during request...')
            console.error(result.error)
            _uiHandler.manageMessageInfo(1, 'danger', result.error)
            return false
          }
  
          if (result.info === null) {

            _handleActionResult(target, action, dataAction.data).then(() => {
              setTimeout(() => {
                _uiHandler.manageMessageInfo(0, null, null)
              }, 5000)
              return false
            }).catch((err) => {
              console.warn('Error during request...')
              console.error(err)
              _uiHandler.manageMessageInfo(1, 'danger', result.error)
              return false
            })

          } else {
            console.log(result.info)
            _uiHandler.manageMessageInfo(1, 'warning', result.info)
            return false
          }

        }).catch((err) => {
          console.warn('Error during request...')
          console.error(err)
          _uiHandler.manageMessageInfo(1, 'danger', result.error)
          return false
        })

      }).catch((err) => {
        console.warn('Error while preparing data...')
        console.error(err)
        _uiHandler.manageMessageInfo(1, 'danger', result.error)
        return false
      })

    })
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** HANDLE SUBMIT **********/
  /**********/

  _handleActionsSubmit = () => {
    return () => {
      _actionSubmit()
    }
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** HANDLE CLICK **********/
  /**********/

  _handleActionsClick = () => {
    return () => {
      _actionClick()
    }
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** SET UI HANDLER **********/
  /**********/

  /*
   * @var Object uiHandler Object that handles UI
   */

  _setUiHandler = (uiHandler) => {
    _uiHandler = uiHandler
  }

  /************************************************************/
  /************************************************************/

  return {

    /**********/
    /********** INIT **********/
    /**********/

    /*
     * @var Object uiHandler Object that handles UI
     */

    init: (uiHandler) => {
      _setUiHandler(uiHandler)
      const actionsHandler = _handleActionsClick()
      const submitHandler = _handleActionsSubmit()
      actionsHandler()
      submitHandler()
    }

  }

}