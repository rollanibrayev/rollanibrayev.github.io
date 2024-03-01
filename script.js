d =
document
textInput =        d.querySelector('input[type="text"]');
function finalizeIframe() {
  fullText = textInput.value.trim()
  lastSlashIndex = fullText.lastIndexOf('/')
  channel = (lastSlashIndex !== -1) ? fullText.substring(lastSlashIndex + 1) : fullText
  if (channel) {
    iframe =        d.querySelector('iframe')
    i =
    iframe
         i.src = `https://player.twitch.tv/?channel=${channel}&muted=false&parent=rollanibrayev.github.io&player=popout&quality=chunked&volume=1`
         i.style = 'display: block'
           d.querySelector('form').style.display = 'none'
    b =    d.body
    s =         b.style
                      s.justifyContent = 'left'
                      s.alignItems = 'start'
                b.requestFullscreen()
    return
  }
  alert('Please enter a channel name')
}
textInput.focus()
       d.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key == 'v') {
    setTimeout(finalizeIframe, 1)
    return
  }
  if (event.key == 'Enter') {
    event.preventDefault()
    finalizeIframe()
  }
})
       d.querySelector('input[type="button"]').addEventListener('click', finalizeIframe)
