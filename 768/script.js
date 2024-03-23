document.body.style = 'overflow: hidden'
const
start = 'https://player.twitch.tv/?',
style = `
  width: calc(64000vw/683);
  height: calc(36000vw/683)
`,
iframes = document.querySelectorAll('iframe'),
inputs = document.querySelectorAll('input'),
muted = 'muted=true&',
toggleSound = iframeNumbers => {
  Array.from(String(iframeNumbers)).forEach(iframeNumber => {
    const
    iframe = iframes[iframeNumber - 1],
    src = iframe.src;
    iframe.src =
      src[26] == 'm'
      ? start + src.slice(37)
      : start + 'muted=true&' + src.slice(25)
  })
},
fullsize = iframeNumber => {
  const iframe = iframes[iframeNumber]
  iframe.style += style
},
channels = [],
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
  if (channels.length < 1)
    u( 'removeAttribute',
      document.body, 'style',
      event.target, 'placeholder'
    ),
    fullscreen(),
    iframes[0].style = style
  if (channels.length == 1) {
    window.scrollTo(0, 0)
    document.body.style = 'overflow: hidden'
    iframes[0].style = `
      top: calc(18000vw/683);
      transform: translateY(-50%)
    `
    document.fullscreenElement ? document.exitFullscreen() :1
  }
  if (channels.length == 2)
    [document.body, iframes[0]].forEach(e => u('removeAttribute', e, 'style')), 
    iframes[1].style = 'top: 0; transform: translateY(0)'
  if (channels.length == 3) iframes[2].style = 'left: 0'
  channels.push(event.target.value.split('/').pop())
  iframes[channels.length - 1].src =
    start + muted + 'quality=720p60&' +
    'parent=rollanibrayev.github.io&channel=' +
    channels[channels.length - 1]
  channels.length == 3 ? fullscreen() :1
  event.target.value = ''
  if (channels.length > 3)
    fullscreen(),
    event.target.remove()
},
smallInput = (event, iframeNumber) => {
  if (event.target.value == 'm' || event.target.value == 'M')
    toggleSound(iframeNumber)
  if (event.target.value.length > 1) {
    iframes[iframeNumber - 1].src = start + muted + 'quality=720p60&' +
    'parent=rollanibrayev.github.io&channel=' + event.target.value.split('/').pop()
  }
  if (event.target.value == 'r' || event.target.value == 'R')
    for (let i = 0; i < iframes.length; i++)
      iframes[i].src = iframes[i].src
  event.target.value = ''
}
inputs[5 - 1].addEventListener('input', inputListener)
document.addEventListener('keydown', listener)
document.addEventListener('dblclick', toggle)
inputs[1 - 1].addEventListener('input', event => smallInput(event, 1))
inputs[2 - 1].addEventListener('input', event => smallInput(event, 2))
inputs[3 - 1].addEventListener('input', event => smallInput(event, 3))
inputs[4 - 1].addEventListener('input', event => smallInput(event, 4))
