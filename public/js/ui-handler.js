/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * UI Handler
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.24.11
 * @for freeCodeCamp
 */

/****************/
/***** MAIN *****/
/****************/

const UIHandler = () => {

  /**********/
  /********** VARS **********/
  /**********/

  /************************************************************/
  /************************************************************/

  /**********/
  /********** HANDLE CLICK **********/
  /**********/

  _handleUIClick = () => {
    return () => {
      
    }
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** MASONRY **********/
  /**********/

  _initMasonry = () => {
    return () => {
      $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 10
      })
    }
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** CHECK IMAGES **********/
  /**********/

  _checkImages = () => {
    return () => {
      if ($('.pin-image').length > 0) {
        $('img.pin-image').on('error', (e) => {
          $(e.currentTarget).attr('src', 'http://via.placeholder.com/320x240')
        })
      }
    }
  }

  /************************************************************/
  /************************************************************/

  return {

    /**********/
    /********** INIT **********/
    /**********/

    init: () => {
      const handler = _handleUIClick()
      handler()
    },

    /************************************************************/
    /************************************************************/

    /**********/
    /********** INIT MASONRY **********/
    /**********/

    initMasonry: () => {
      const masonry = _initMasonry()
      masonry()
    },

    /************************************************************/
    /************************************************************/

    /**********/
    /********** CHECK IMAGES **********/
    /**********/

    checkImages: () => {
      const imagesHandler = _checkImages()
      imagesHandler()
    },

    /************************************************************/
    /************************************************************/

    /**********/
    /********** MANAGE MESSAGE INFO **********/
    /**********/

    manageMessageInfo: (state, type, content) => {

      if ($('#message-info').length > 0) {

        switch(state) {
          case 0:
            $('#message-info').hide()
            $('#message-info .content').removeClass('alert-success alert-info alert-warning alert-danger')
            $('#message-info .content p').html('')
            break

          case 1:
            $('#message-info .content').addClass('alert-' + type)
            $('#message-info .content p').html(content)
            $('#message-info').show()
            break
        }

      }

    }

  }

}