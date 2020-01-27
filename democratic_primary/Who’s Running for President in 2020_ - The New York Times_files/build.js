(function() {
  var footerBylines = document.querySelector('.story-footer .interactive-byline');
  if ( footerBylines ) {
    footerBylines.parentNode.removeChild(footerBylines);
    document.querySelector('.story-meta-footer.interactive-meta-footer').insertAdjacentHTML('afterbegin', footerBylines.outerHTML);
    var dateline = document.querySelector('.dateline');
    dateline.parentNode.removeChild(dateline);
    document.querySelector('.byline-dateline').insertAdjacentHTML('beforeend', dateline.outerHTML);
  }

  // var scrollOffset = innerWidth < 767 ? 75 : 210;
  // var scrollOffset = innerWidth < 767 ? 75 : 123;
  // var scrollOffset = innerWidth < 767 ? 55 : 75;
  var scrollOffset = innerWidth < 740 ? 55 : 125;

  // $(".g-overview-new .g-cand").click(function() {
  $(".g-overview .g-cand").click(function() {
    var cand = $(this).data("cand");
    $("html, body").animate({
      scrollTop: $("#g-" + cand).offset().top - scrollOffset
    }, 1000);
  })

  // balanceText(['.interactive-heading']);
})();
define("script", function(){});

