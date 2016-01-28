// Unobtrusive flash UI implementation, design agnostic
// Remember to link unobtrusive_flash_ui.css as well
//
// Shows flash messages as translucent bars on top of the page
window.UnobtrusiveFlash.flashOptions = {type: 'notice', timeout: 0, showCloseIcon: 'auto'};

window.UnobtrusiveFlash.containerHtml = $('<div id="unobtrusive-flash-messages"></div>');
window.UnobtrusiveFlash.flashHtml = $('<div class="unobtrusive-flash-message"></div>');
window.UnobtrusiveFlash.closeIconHtml = $('<i class="fa fa-times"></i>');

(function(){

  function hideFlash($flash) {
    $flash.slideUp(100,function(){
      $flash.remove();
    });
  }

  UnobtrusiveFlash.showFlashMessage = function(message, options) {
    options = $.extend(UnobtrusiveFlash.flashOptions, options);

    var $flashContainer = UnobtrusiveFlash.containerHtml;
    if ($flashContainer.closest(document.documentElement).length==0) { // Not yet in DOM
      $flashContainer.prependTo('body');
    }

    var $flash = UnobtrusiveFlash.flashHtml.clone().addClass('unobtrusive-flash-' + options.type).html(message).appendTo($flashContainer);

    if(options.showCloseIcon || (options.showCloseIcon == 'auto' && options.timeout == 0)) {
      // Prepend the close icon IF timeout is not set - to make it clearer for users they need to click to close
      UnobtrusiveFlash.closeIconHtml.prependTo($flash);
    }

    $flash.hide().delay(300).slideDown(100);

    $flash.click(function() {
      hideFlash($flash);
    });

    if (options.timeout > 0) {
      setTimeout(function() {
        hideFlash($flash);
      },options.timeout);
    }
  };

  flashHandler = function(e, params) {
    UnobtrusiveFlash.showFlashMessage(params.message, {type: params.type});
  };

  $(window).bind('rails:flash', flashHandler);

})();
