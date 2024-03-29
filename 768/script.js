document.body.style = 'overflow: hidden'
let appearedIframesCounter = 0
const style = `
  width: calc(64000vw/683);
  height: calc(36000vw/683)
`
const iframes = document.querySelectorAll('iframe')
const inputs = document.querySelectorAll('input')
const url = {
  start: 'https://player.twitch.tv/?',
  muted: 'muted=true&',
  quality: {
    low: 'quality=360p30&',
    high: 'quality=720p60&'
  },
  middle2: 'parent=rollanibrayev.github.io&channel='
}
const isMuted = src => src[26] == 'm' ? 1 : 0
const isLowerQuality = url => {
  const indicator = url.quality.low[8]
  return isMuted(url)
  ? url[45] == indicator
    ? 1
    : 0
  : url[34] == indicator
    ? 1
    : 0
}
const extractChannel = url => url.split('/').pop()
const fullsize = iframeNumber => {
  const iframe = iframes[iframeNumber]
  iframe.style += style
}
const fullscreen = () => !document.fullscreenElement ? document.body.requestFullscreen() :1
const toggle = event => {
  event.preventDefault()
  document.fullscreenElement
    ? document.exitFullscreen()
    : document.body.requestFullscreen()
}
const smallInput = (event, iframeNumber) => {
  const value = event.target.value
  const iframe = iframes[iframeNumber]
  const src = iframe.src
  const i9 = url.middle2 + src.slice(91)
  const i8 = url.middle2 + src.slice(80)
  const sm = url.start + url.muted
  switch (value.toLowerCase()) {
    case 'm':
      iframe.src =
        isMuted(src)
        ? url.start + src.slice(37)
        : sm + src.slice(26)
      break
    case 'q':
      iframe.src =
        isLowerQuality(src)
        ? isMuted(src)
          ? sm + url.quality.high + i9
          : url.start + url.quality.high + i8
        : isMuted(src)
          ? sm + url.quality.low + i9
          : url.start + url.quality.low + i8
      break
    case 'c':
      window.open(
        `https://www.twitch.tv/popout/${
          isMuted(src) ? src.slice(91) : src.slice(80)
        }/chat`,
        '_blank'
      )
      break
    case 'r':
      iframes.forEach(iframe => iframe.src = iframe.src)
      break
    case 'k':
      iframe.src = iframe.src
      break
    case 'd':
      iframe.removeAttribute('src')
      break
    default:
      if (value.length > 1)
        iframe.src = sm + url.quality.high + url.middle2 + extractChannel(value)
  }
  event.target.value = ''
}

let mouseDownedIframeNumber
const smallInputMouseUp = iframeNumber => {
  if (mouseDownedIframeNumber == iframeNumber) return
  const mouseUppedIframeSrc = iframes[iframeNumber].src
  iframes[iframeNumber].src = iframes[mouseDownedIframeNumber].src
  iframes[mouseDownedIframeNumber].src = mouseUppedIframeSrc
}

inputs.forEach(
  (input, index) => {
    input.addEventListener('mousedown', () => mouseDownedIframeNumber = index )
    input.addEventListener('mouseup', () => smallInputMouseUp(index))
    input.addEventListener('input', event => smallInput(event, index))
  }
)

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
    url.start + url.muted + url.quality.high + url.middle2 + extractChannel(event.target.value)
  if (appearedIframesCounter == 3) fullscreen()
  event.target.value = ''
  if (appearedIframesCounter > 3)
    fullscreen(),
    event.target.remove()
})
document.addEventListener('keydown', event => event.key.toLowerCase() == 'f' ? toggle(event) :1)
document.addEventListener('dblclick', toggle)
