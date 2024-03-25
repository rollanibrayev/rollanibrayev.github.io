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
middle = 'quality=720p60&parent=rollanibrayev.github.io&channel=',
extractChannel = url => url.split('/').pop(),
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
isMuted = src => src[26] == 'm' ? 1 : 0,
smallInput = (event, iframeNumber) => {
  const
  value = event.target.value,
  iframe = iframes[iframeNumber],
  src = iframe.src;
  value === 'm' || value === 'M' ?
    iframe.src =
      isMuted(src)
      ? start + src.slice(37)
      : start + muted + src.slice(26) :
  value === 'c' || value === 'C' ?
    window.open(
      `https://www.twitch.tv/popout/${
        isMuted(src) ? src.slice(91) : src.slice(80)
      }/chat`,
      '_blank'
    ) :
  value === 'r' || value === 'R' ?
    iframes.forEach(iframe => iframe.src = iframe.src) :
  value === 'k' || value === 'K' ?
    iframes[iframeNumber].src = iframes[iframeNumber].src :
  value === 'd' || value === 'D' ?
    iframes[iframeNumber].src = '' :
  value.length > 1 ?
    iframe.src = start + muted + middle + extractChannel(value) :
    null

  event.target.value = ''
}
inputs[4].addEventListener('input', event => {
  if (appearedIframesCounter < 1) {
    document.body.removeAttribute('style')
    event.target.removeAttribute('placeholder')
    fullscreen()
    iframes[0].style = style
  }
  switch (appearedIframesCounter) {
    case 1:
      window.scrollTo(0, 0)
      document.body.style = 'overflow: hidden'
      iframes[0].style = `
        top: calc(18000vw/683);
        transform: translateY(-50%)
      `
      document.fullscreenElement ? document.exitFullscreen() :1
    break
    case 2:
      [document.body, iframes[0]].forEach(e => e.removeAttribute('style'))
      iframes[1].style = 'top: 0; transform: translateY(0)'
    break
    case 3:
      iframes[2].style = 'left: 0'
      fullscreen()
  }
  iframes[++appearedIframesCounter - 1].src =
    start + muted + middle + extractChannel(event.target.value)
  if (appearedIframesCount == 3) fullscreen()
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
