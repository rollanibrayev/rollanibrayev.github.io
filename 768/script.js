document.body.style = 'overflow: hidden'
let appearedIframesCounter = 0
const
start = 'https://player.twitch.tv/?',
style = `
  width: calc(64000vw/683);
  height: calc(36000vw/683)
`,
iframes = document.querySelectorAll('iframe'),
inputs = document.querySelectorAll('input'),
muted = 'muted=true&',
middle = 'quality=720p60&parent=rollanibrayev.github.io&channel='
fullsize = iframeNumber => {
  const iframe = iframes[iframeNumber]
  iframe.style += style
},
fullscreen = event => !document.fullscreenElement ? document.body.requestFullscreen() :1,
toggle = event => {
  event.preventDefault()
  document.fullscreenElement
    ? document.exitFullscreen()
    : document.body.requestFullscreen()
},
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
isMuted = src => src[26] == 'm' ? 1 : 0,
smallInput = (event, iframeNumber) => {
  const value = event.target.value
  if (value == 'm' || value == 'M') {
    const
    iframe = iframes[iframeNumber],
    src = iframe.src
    iframe.src =
      isMuted(src)
        ? start + src.slice(37)
        : start + muted + src.slice(26)
  }
  if (value == 'c' || value == 'C') {
    let channel
    let url = `https://www.twitch.tv/popout/${channel}/chat`
    channel =
      isMuted(iframes[iframeNumber].src)
     // ? 
      //: [80] first channel symbol
    window.open(url, '_blank')
  }
  if (value.length > 1) {
    iframes[iframeNumber].src =
      start + muted + middle +
      value.split('/').pop()
  }
  if (value == 'r' || value == 'R')
    for (let i = 0; i < iframes.length; i++)
      iframes[i].src = iframes[i].src
  event.target.value = ''
}
inputs[4].addEventListener('input', event => {
  if (appearedIframesCounter < 1)
    u( 'removeAttribute',
      document.body, 'style',
      event.target, 'placeholder'
    ),
    fullscreen(),
    iframes[0].style = style
  if (appearedIframesCounter == 1) {
    window.scrollTo(0, 0)
    document.body.style = 'overflow: hidden'
    iframes[0].style = `
      top: calc(18000vw/683);
      transform: translateY(-50%)
    `
    document.fullscreenElement ? document.exitFullscreen() :1
  }
  if (appearedIframesCounter == 2)
    [document.body, iframes[0]].forEach(e => u('removeAttribute', e, 'style')), 
    iframes[1].style = 'top: 0; transform: translateY(0)'
  if (appearedIframesCounter == 3) iframes[2].style = 'left: 0'
  iframes[++appearedIframesCounter - 1].src =
    start + muted + middle +
    event.target.value.split('/').pop()
  appearedIframesCounter == 3 ? fullscreen() :1
  event.target.value = ''
  if (appearedIframesCounter > 3)
    fullscreen(),
    event.target.remove()
})
document.addEventListener('keydown', event => event.key === 'F' || event.key === 'f' ? toggle(event) :1)
document.addEventListener('dblclick', toggle)
inputs[0].addEventListener('input', event => smallInput(event, 0))
inputs[1].addEventListener('input', event => smallInput(event, 1))
inputs[2].addEventListener('input', event => smallInput(event, 2))
inputs[3].addEventListener('input', event => smallInput(event, 3))
