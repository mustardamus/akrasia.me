var expandThumb = function (el) {
  var thumbUrl = el.data().thumb
  var fullUrl = thumbUrl.replace('_thumb', '')

  el.append('<a class="not-smooth" rel="pics" href="' + fullUrl + '"><img src="' + thumbUrl + '"></a>')
  el.show()
}

var expandFirstThumbs = function () {
  for (var city of $('.city')) {
    for (var i = 0; i < 5; i++) {
      var el = $(city).find('.pictures li').eq(i)

      if (el.length && el.data().thumb) {
        expandThumb(el)
      }
    }
  }
}

var expandThumbs = function (els) {
  for (var el of els) {
    el = $(el)

    if (!el.find('img').length && !el.hasClass('more')) {
      expandThumb(el)
    }
  }
}

$(function() {
  $('.pictures a').fancybox({
    padding : 0,
    closeBtn: false,
    helpers : { overlay: { locked: false }}
  })

  expandFirstThumbs()

  $('.pictures .more a').on('click', function (e) {
    var els = $(this).parent().parent().children('li')

    els.last().remove() // more button li
    expandThumbs(els)

    e.preventDefault()
    return false
  })
})
