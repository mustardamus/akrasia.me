var validateEmail = function(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 return re.test(email)
}

var contactForm = function() {
  var el = $('#contact form')
  var emailEl = $('input[name="email"]', el)
  var messageEl = $('textarea', el)
  var buttonEl = $('button', el)

  el.on('submit', function(e) {
    var emailVal = emailEl.val()
    var messageVal = messageEl.val()

    if (emailVal.length !== 0 && messageVal.length !== 0 && validateEmail(emailVal)) {
      buttonEl.addClass('is-loading')

      $.ajax({
        url: 'https://formspree.io/me@akrasia.me',
        method: 'POST',
        dataType: 'json',
        data: {
          email: emailVal,
          message: messageVal
        },
        success: function() {
          buttonEl.removeClass('is-loading')
          emailEl.removeClass('is-danger')
          messageEl.removeClass('is-danger')
          
          messageEl.val('').focus()
        }
      })
    } else {
      if (emailVal.length === 0 || !validateEmail(emailVal)) {
        emailEl.addClass('is-danger')
      } else {
        emailEl.removeClass('is-danger')
      }

      if (messageVal.length === 0) {
        messageEl.addClass('is-danger')
      } else {
        messageEl.removeClass('is-danger')
      }
    }

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
