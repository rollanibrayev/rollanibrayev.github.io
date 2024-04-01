const is768 = window.screen.height == 768
const leftCoordinate = `calc(${is768 ? '32000vw/683' : '50vw'})`
const topCoordinate = `calc(${is768 ? '18000vw/683' : '28.125vw'})`
let appearedIframesCounter = 0
const iframes = document.querySelectorAll('iframe')
iframes.forEach(iframe => {
  iframe.style.width = leftCoordinate
  iframe.style.height = topCoordinate
})
const inputs = document.querySelectorAll('input')
inputs.forEach((input, index) => {
  if (index > inputs.length - 2) return
  input.style.width = leftCoordinate
  input.style.height = topCoordinate
})

iframes[1].style.left = leftCoordinate
iframes[2].style.top = topCoordinate
iframes[3].style.left = leftCoordinate
iframes[3].style.top = topCoordinate
inputs[1].style.left = leftCoordinate
inputs[2].style.top = topCoordinate
inputs[3].style.left = leftCoordinate
inputs[3].style.top = topCoordinate

const urlConfig = {
  start: 'https://player.twitch.tv/?',
  muted: 'muted=true&',
  quality: {
    low: `quality=${is768 ? '360p30' : '720p60'}&`,
    high: `quality=${is768 ? '720p60' : 'chunked'}&`
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
const toggle = event => {
  event.preventDefault()
  document.fullscreenElement
  ? document.exitFullscreen()
  : document.body.requestFullscreen()
}
const fullscreen = () => !document.fullscreenElement ? document.body.requestFullscreen() : null
inputs[4].addEventListener('input', event => {
  fullscreen()
  if (appearedIframesCounter < 1) event.target.removeAttribute('placeholder')
  iframes[++appearedIframesCounter - 1].src =
    urlConfig.start + urlConfig.muted + urlConfig.quality.high + urlConfig.middle2 + extractChannel(event.target.value)
  event.target.value = ''
  if (appearedIframesCounter > 3)
    event.target.remove(),
    appearedIframesCounter = undefined
})

let mouseDownedInput
inputs.forEach(
  (input, index) => {
    input.addEventListener('mousedown', () => mouseDownedInput = index )
    input.addEventListener('mouseup', () => {
      if (mouseDownedInput == index) return
      const mouseUppedQuarterLeftCoordinate = iframes[index].style.left
      const mouseUppedQuarterTopCoordinate = iframes[index].style.top
      iframes[index].style.left = iframes[mouseDownedInput].style.left
      iframes[index].style.top = iframes[mouseDownedInput].style.top
      inputs[index].style.left = inputs[mouseDownedInput].style.left
      inputs[index].style.top = inputs[mouseDownedInput].style.top
      iframes[mouseDownedInput].style.left = mouseUppedQuarterLeftCoordinate
      iframes[mouseDownedInput].style.top = mouseUppedQuarterTopCoordinate
      inputs[mouseDownedInput].style.left = mouseUppedQuarterLeftCoordinate
      inputs[mouseDownedInput].style.top = mouseUppedQuarterTopCoordinate
    })
    input.addEventListener('input', event => {
      const value = event.target.value
      const iframe = iframes[index]
      const src = iframe.src
      const i9 = urlConfig.middle2 + src.slice(91)
      const i8 = urlConfig.middle2 + src.slice(80)
      const sm = urlConfig.start + urlConfig.muted
      const l = urlConfig.quality.low
      const h = urlConfig.quality.high
      switch (value.toUpperCase()) {
        case 'M':
          iframe.src =
            isMuted(src)
            ? urlConfig.start + src.slice(37)
            : sm + src.slice(26)
          break
        case 'Q':
          iframe.src =
            isLowerQuality(src)
            ? isMuted(src)
              ? sm + h + i9
              : urlConfig.start + h + i8
            : isMuted(src)
              ? sm + l + i9
              : urlConfig.start + l + i8
          break
        case 'C':
          window.open(
            `https://www.twitch.tv/popout/${
              isMuted(src) ? src.slice(91) : src.slice(80)
            }/chat`,
            '_blank'
          )
          break
        case 'R':
          iframes.forEach(iframe => iframe.src = iframe.src)
          break
        case 'K':
          iframe.src = iframe.src
          break
        case 'D':
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
document.addEventListener('keydown', event => event.key.toUpperCase() == 'F' ? toggle(event) :1)
document.addEventListener('dblclick', toggle)
document.addEventListener('mousedown', () => mouseDownedInput = undefined)
