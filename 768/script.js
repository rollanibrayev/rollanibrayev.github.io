document.body.style = 'overflow: hidden'
let appearedIframesCounter = 0
const style = `
  width: calc(64000vw/683);
  height: calc(36000vw/683)
`
const iframes = document.querySelectorAll('iframe')
const inputs = document.querySelectorAll('input')
const start = 'https://player.twitch.tv/?'
const muted = 'muted=true&'
const lowerQuality = 'quality=360p30&'
const quality = 'quality=720p60&'
const middle2 = 'parent=rollanibrayev.github.io&channel='
const isMuted = src => src[26] == 'm' ? 1 : 0
const isLowerQuality = url =>
  isMuted(url)
  ? url[45] == 4
    ? 1
    : 0
  : url[34] == 4
    ? 1
    : 0
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
  const
  value = event.target.value
  ,
  iframe = iframes[iframeNumber]
  ,
  src = iframe.src
  ,
  i9 = middle2 + src.slice(91)
  ,
  i8 = middle2 + src.slice(80)
  ,
  sm = start + muted
  ;
  switch (value.toLowerCase()) {
    case 'm':
      iframe.src =
        isMuted(src)
        ? start + src.slice(37)
        : sm + src.slice(26)
      break
    case 'q':
      iframe.src =
        isLowerQuality(src)
        ? isMuted(src)
          ? sm + quality + i9
          : start + quality + i8
        : isMuted(src)
          ? sm + lowerQuality + i9
          : start + lowerQuality + i8
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
      iframe.src = sm + quality + middle2 + extractChannel(value)
  }
  event.target.value = ''
}

const copyToClipboard = text => {
  let textarea = document.createElement("textarea")
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = 0
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand("copy")
  document.body.removeChild(textarea)
}

const smallInputClick = iframeNumber =>
  copyToClipboard(iframeNumber)

const smallInputMouseUp = iframeNumber => {
  let text
  navigator.clipboard.readText()
    .then(text => {
      text = text
    })
  const mouseUppedIframeSrc = iframes[iframeNumber].src
  const clickedIframeSrc = iframes[text].src
  if (text = iframeNumber) return
  iframes[text].src = mouseUppedIframeSrc
  iframes[iframeNumber].src = clickedIframeSrc
}

inputs[0].addEventListener('click', event => smallInputClick(0))
inputs[1].addEventListener('click', event => smallInputClick(1))
inputs[2].addEventListener('click', event => smallInputClick(2))
inputs[3].addEventListener('click', event => smallInputClick(3))

inputs[0].addEventListener('mouseup', event => smallInputMouseUp(0))
inputs[1].addEventListener('mouseup', event => smallInputMouseUp(1))
inputs[2].addEventListener('mouseup', event => smallInputMouseUp(2))
inputs[3].addEventListener('mouseup', event => smallInputMouseUp(3))

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
    start + muted + quality + middle2 + extractChannel(event.target.value)
  if (appearedIframesCounter == 3) fullscreen()
  event.target.value = ''
  if (appearedIframesCounter > 3)
    fullscreen(),
    event.target.remove()
})
document.addEventListener('keydown', event => event.key.toLowerCase() == 'f' ? toggle(event) :1)
document.addEventListener('dblclick', toggle)
inputs[0].addEventListener('input', event => smallInput(event, 0))
inputs[1].addEventListener('input', event => smallInput(event, 1))
inputs[2].addEventListener('input', event => smallInput(event, 2))
inputs[3].addEventListener('input', event => smallInput(event, 3))

