document.addEventListener('DOMContentLoaded', function() {
  let main = document.querySelector('main')
  if (main) {
    let btnSignIn = main.querySelector('[data-target="signin"]')
    let btnSignUp = main.querySelector('[data-target="signup"]')
    main.addEventListener('click', function(e) {
      if (e.target.matches('[data-target]')) {
        console.info('点击到了某个要切换的按钮')
        let current = main.dataset.active === 'signup' ? 'signup' : 'signin'
        if (current === e.target.dataset.target) {
          return
        }
        main.setAttribute('data-active', `${e.target.dataset.target}-end`)
        setTimeout(function() {
          main.setAttribute('data-active', e.target.dataset.target)
        }, 0)
      }
    })
  }
})

function searchEl() {

}