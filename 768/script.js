document.body.style = 'overflow: hidden'
let appearedIframesCounter = 0
const style = `
  width: calc(64000vw/683);
  height: calc(36000vw/683)
`
const iframes = document.querySelectorAll('iframe')
const inputs = document.querySelectorAll('input')
const urlConfig = {
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
  const indicator = urlConfig.quality.low[8]
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

const leftCoordinate = 'calc(32000vw/683)'
const topCoordinate = 'calc(18000vw/683)'
const iframesCoordinatesStyles = {
  0: { left: 0,              top: 0 },
  1: { left: leftCoordinate, top: 0 },
  2: { left: 0,              top: topCoordinate },
  3: { left: leftCoordinate, top: topCoordinate }
}

let mouseDownedIframeNumber

inputs.forEach(
  (input, index) => {
    input.addEventListener('mousedown', () => {
      mouseDownedIframeNumber = index
    } )
    input.addEventListener('mouseup', () => {
      if (mouseDownedIframeNumber == index) return
      iframes[index].style.left = iframesCoordinatesStyles[index].left
      iframes[index].style.top = iframesCoordinatesStyles[index].top
      iframes[mouseDownedIframeNumber].style.left = iframesCoordinatesStyles[mouseDownedIframeNumber].left
      iframes[mouseDownedIframeNumber].style.top = iframesCoordinatesStyles[mouseDownedIframeNumber].top
      mouseDownedIframeNumber = undefined
    })
    input.addEventListener('input', event => {
      const value = event.target.value
      const iframe = iframes[index]
      const src = iframe.src
      const i9 = urlConfig.middle2 + src.slice(91)
      const i8 = urlConfig.middle2 + src.slice(80)
      const sm = urlConfig.start + urlConfig.muted
      switch (value.toLowerCase()) {
        case 'm':
          iframe.src =
            isMuted(src)
            ? urlConfig.start + src.slice(37)
            : sm + src.slice(26)
          break
        case 'q':
          iframe.src =
            isLowerQuality(src)
            ? isMuted(src)
              ? sm + urlConfig.quality.high + i9
              : urlConfig.start + urlConfig.quality.high + i8
            : isMuted(src)
              ? sm + urlConfig.quality.low + i9
              : urlConfig.start + urlConfig.quality.low + i8
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
          if (value[1])
            iframe.src = sm + urlConfig.quality.high + urlConfig.middle2 + extractChannel(value)
      }
      event.target.value = ''
    })
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
    urlConfig.start + urlConfig.muted + urlConfig.quality.high + urlConfig.middle2 + extractChannel(event.target.value)
  if (appearedIframesCounter == 3) fullscreen()
  event.target.value = ''
  if (appearedIframesCounter > 3)
    fullscreen(),
    event.target.remove(),
    appearedIframesCounter = undefined
})
document.addEventListener('keydown', event => event.key.toLowerCase() == 'f' ? toggle(event) :1)
document.addEventListener('dblclick', toggle)
