var contactForm = function() {
  var el = $('#contact form')
  var emailEl = $('input[name="email"]', el)
  var messageEl = $('textarea', el)
  var buttonEl = $('button', el)

  el.on('submit', function(e) {
    buttonEl.addClass('is-loading')

    $.ajax({
      url: 'https://formspree.io/me@akrasia.me',
      method: 'POST',
      dataType: 'json',
      data: {
        email: emailEl.val(),
        message: messageEl.val()
      },
      success: function() {
        buttonEl.removeClass('is-loading')
        messageEl.val('').focus()
      }
    })

    e.preventDefault()
  })

  emailEl.focus()
}

$(function() {
  $('#that-one-thing').smoothState({
    prefetch: true,
    blacklist: '.not-smooth',
    forms: '.smooth-form',
    onAfter: function() {
      contactForm()

      if (hljs) {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block)
        })
      }
    }
  })

  contactForm()
})

if (hljs) {
  hljs.initHighlightingOnLoad()
}
