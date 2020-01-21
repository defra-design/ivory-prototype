/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}


if (/Mobi|Android/i.test(navigator.userAgent)) {
  $('html').addClass('is-mobile');
} else {
  $('html').addClass('is-desktop');
}



$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})
