let appearedIframesCounter = 0
const iframes = document.querySelectorAll('iframe')
iframes.forEach(iframe => {
  iframe.style.width = leftCoordinate
  iframe.style.height = topCoordinate
})
const inputs = document.querySelectorAll('input')
inputs.forEach(input => {
  input.style.width = leftCoordinate
  input.style.height = topCoordinate
})
input[4].style.width = '100vw'
input[4].style.height = '100vh'
const urlConfig = {
  start: 'https://player.twitch.tv/?',
  muted: 'muted=true&',
  middle2: 'parent=rollanibrayev.github.io&channel='
}
const isMuted = src => src[26] == 'm' ? 1 : 0
const isLowerQuality = url => {
  const indicator = quality.low[8]
  return isMuted(url)
  ? url[45] == indicator
    ? 1
    : 0
  : url[34] == indicator
    ? 1
    : 0
}
const extractChannel = url => url.split('/').pop()
const fullscreen = () => !document.fullscreenElement ? document.body.requestFullscreen() :1
const toggle = event => {
  event.preventDefault()
  document.fullscreenElement
  ? document.exitFullscreen()
  : document.body.requestFullscreen()
}

inputs[4].addEventListener('input', event => {
  fullscreen()
  if (appearedIframesCounter < 1) event.target.removeAttribute('placeholder')
  iframes[++appearedIframesCounter - 1].src =
    urlConfig.start + urlConfig.muted + quality.high + urlConfig.middle2 + extractChannel(event.target.value)
  event.target.value = ''
  if (appearedIframesCounter > 3)
    event.target.remove(),
    appearedIframesCounter = undefined
})


iframes[1].style.left = leftCoordinate
iframes[2].style.top = topCoordinate
iframes[3].style.left = leftCoordinate
iframes[3].style.top = topCoordinate
inputs[1].style.left = leftCoordinate
inputs[2].style.top = topCoordinate
inputs[3].style.left = leftCoordinate
inputs[3].style.top = topCoordinate

let mouseDownedQuarter
inputs.forEach(
  (input, index) => {
    input.addEventListener('mousedown', () => mouseDownedQuarter = index )
    input.addEventListener('mouseup', () => {
      if (mouseDownedQuarter == index) return
      const mouseUppedQuarterLeftCoordinate = iframes[index].style.left
      const mouseUppedQuarterTopCoordinate = iframes[index].style.top
      iframes[index].style.left = iframes[mouseDownedQuarter].style.left
      iframes[index].style.top = iframes[mouseDownedQuarter].style.top
      inputs[index].style.left = inputs[mouseDownedQuarter].style.left
      inputs[index].style.top = inputs[mouseDownedQuarter].style.top
      iframes[mouseDownedQuarter].style.left = mouseUppedQuarterLeftCoordinate
      iframes[mouseDownedQuarter].style.top = mouseUppedQuarterTopCoordinate
      inputs[mouseDownedQuarter].style.left = mouseUppedQuarterLeftCoordinate
      inputs[mouseDownedQuarter].style.top = mouseUppedQuarterTopCoordinate
      mouseDownedQuarter = undefined
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
              ? sm + quality.high + i9
              : urlConfig.start + quality.high + i8
            : isMuted(src)
              ? sm + quality.low + i9
              : urlConfig.start + quality.low + i8
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
            iframe.src = sm + quality.high + urlConfig.middle2 + extractChannel(value)
      }
      event.target.value = ''
    })
  }
)
document.addEventListener('keydown', event => event.key.toLowerCase() == 'f' ? toggle(event) :1)
document.addEventListener('dblclick', toggle)
