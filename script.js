document.body.style = 'overflow: hidden'
let appearedIframesCount = 0
const
iframes = document.querySelectorAll('iframe'),
fullscreen = event => !document.fullscreenElement ? document.body.requestFullscreen() :1,
toggle = event => {
  event.preventDefault()
  document.fullscreenElement
    ? document.exitFullscreen()
    : document.body.requestFullscreen()
},
listener = event => event.key === 'F' || event.key === 'f' ? toggle(event) :1,
u = (m, ...a) => {
  let n =
    m[0] == 'r'
    ? 2
    : 3
  for (let i = 0; i < a.length; i += n)
    a[i][m](
      n == 2
      ? a[i + 1]
      : a[i + 1], a[i + 2]
    )
},
inputListener = event => {
  if (appearedIframesCount < 1)
    u( 'removeAttribute',
      document.body, 'style',
      event.target, 'placeholder'
    ),
    fullscreen(),
    iframes[0].style = `
      width: 100vw;
      height: 56.25vw
    `
  if (appearedIframesCount == 1) {
    window.scrollTo(0, 0)
    document.body.style = 'overflow: hidden'
    iframes[0].style = `
      top: 50.000vh;
      transform: translateY(-50%)
    `
    document.fullscreenElement ? document.exitFullscreen() :1
  }
  if (appearedIframesCount == 2)
    [document.body, iframes[0]].forEach(e => u('removeAttribute', e, 'style')), 
    iframes[1].style = 'top: 0; transform: translateY(0)'
  if (appearedIframesCount == 3) iframes[2].style = 'left: 0'
  iframes[++appearedIframesCount - 1].src =
    'https://player.twitch.tv/?muted=true&volume=0.25&quality=chunked&' +
    'parent=rollanibrayev.github.io&channel=' +
    event.target.value.split('/').pop()
  appearedIframesCount == 3 ? fullscreen() :1
  event.target.value = ''
  if (appearedIframesCount > 3)
    fullscreen(),
    event.target.setAttribute('readonly', true),
    event.target.removeEventListener('input', inputListener)
}
u( 'addEventListener',
  document.querySelector('input'), 'input', inputListener,
  document, 'keydown', listener,
  document, 'dblclick', toggle
)
