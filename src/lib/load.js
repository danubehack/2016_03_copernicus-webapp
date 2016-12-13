$(document).ready(function () {

  var _setSizes = function () {
    var wHeight = $(window).height();
    var htmlPadding = +$("html").css("padding").replace(/[^-\d\.]/g, '');
    var bodyPadding = +$("body").css("padding").replace(/[^-\d\.]/g, '');
    var headerHeight = $(".app-header").css("height");
    if (typeof headerHeight === "undefined") {
      headerHeight = 70;
    } else {
      headerHeight = +headerHeight.replace(/[^-\d\.]/g, '');
    }
    var newHeight = wHeight - (2 * htmlPadding) + (2 * bodyPadding) - headerHeight - 50;
    $(".ol-viewport").css("height", newHeight);
  };

  $(window).resize(function () {
    _setSizes();
  });

  _setSizes();

});
