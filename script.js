const is768 = window.screen.height == 768
const leftCoordinate = `calc(${ is768 ? '32000vw/683' : '50vw' })`
const topCoordinate = `calc(${ is768 ? '18000vw/683' : '28.125vw' })`
const iframes = document.querySelectorAll('iframe')
const inputs = document.querySelectorAll('input')

iframes.forEach(iframe => {
  iframe.style.width = leftCoordinate
  iframe.style.height = topCoordinate
})
iframes[1].style.left = leftCoordinate
iframes[2].style.top = topCoordinate
iframes[3].style.left = leftCoordinate
iframes[3].style.top = topCoordinate
inputs[1].style.left = leftCoordinate
inputs[2].style.top = topCoordinate
inputs[3].style.left = leftCoordinate
inputs[3].style.top = topCoordinate

const start = 'https://player.twitch.tv/?'
const muted = 'muted=true&'
const low = `quality=${ is768 ? '360p30' : '720p60' }&`
const high = `quality=${ is768 ? '720p60' : 'chunked' }&`
const middle = 'parent=rollanibrayev.github.io&channel='

let appearedIframesCounter = 0
inputs[4].addEventListener('input', event => {
  const fullscreen = () => !document.fullscreenElement ? document.body.requestFullscreen() : null
  if (appearedIframesCounter > 1) fullscreen()
  if (appearedIframesCounter < 1) event.target.removeAttribute('placeholder')
  const extractChannel = link => link.slice(22)
  iframes[++appearedIframesCounter - 1].src =
    start + muted + high + middle + extractChannel(event.target.value)
  event.target.value = ''
  if (appearedIframesCounter > iframes.length - 1)
    event.target.remove()
})

let mouseDownedInputIndex
inputs.forEach( (input, index) => {
  if (index > 3) return
  input.style.width = leftCoordinate
  input.style.height = topCoordinate
  input.addEventListener('mousedown', () => mouseDownedInputIndex = index )
  input.addEventListener('mouseup', () => {
    if (mouseDownedInputIndex == index) return
    const mouseUppedInputLeftCoordinate = iframes[index].style.left
    const mouseUppedInputTopCoordinate = iframes[index].style.top
    iframes[index].style.left = iframes[mouseDownedInputIndex].style.left
    iframes[index].style.top = iframes[mouseDownedInputIndex].style.top
    inputs[index].style.left = inputs[mouseDownedInputIndex].style.left
    inputs[index].style.top = inputs[mouseDownedInputIndex].style.top
    iframes[mouseDownedInputIndex].style.left = mouseUppedInputLeftCoordinate
    iframes[mouseDownedInputIndex].style.top = mouseUppedInputTopCoordinate
    inputs[mouseDownedInputIndex].style.left = mouseUppedInputLeftCoordinate
    inputs[mouseDownedInputIndex].style.top = mouseUppedInputTopCoordinate
  })
  input.addEventListener('input', event => {
    const value = event.target.value
    const iframe = iframes[index]
    const src = iframe.src
    const isMuted = src => src[26] == 'm' ? 1 : 0
    const isLowerQuality = src => {
      const indicator = low[8]
      return isMuted(src)
      ? src[45] == indicator
        ? 1
        : 0
      : src[34] == indicator
        ? 1
        : 0
    }
    switch (value.toUpperCase()) {
      case 'M':
        iframe.src =
          isMuted(src)
          ? start + src.slice(37)
          : start + muted + src.slice(26)
        break
      case 'Q':
        iframe.src =
          isLowerQuality(src)
          ? isMuted(src)
            ? start + muted + high + middle + src.slice(91)
            : start + high + middle + src.slice(80)
          : isMuted(src)
            ? start + muted + low + middle + src.slice(91)
            : start + low + middle + src.slice(80)
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
          iframe.src = start + muted + high + middle + extractChannel(value)
    }
    event.target.value = ''
  })
} )

const toggle = event => {
  event.preventDefault()
  document.fullscreenElement
  ? document.exitFullscreen()
  : document.body.requestFullscreen()
}
document.addEventListener('keydown', event => event.key.toUpperCase() == 'F' ? toggle(event) :1)
document.addEventListener('dblclick', toggle)
