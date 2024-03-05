let textInput = document.querySelector('input[type="text"]')
textInput.focus()
let finalizeIframe = () => {
  let
  trimmedText = textInput.value.trim(),
  lastIndexOf = trimmedText.lastIndexOf('/'),
  channel = (lastIndexOf !== -1) ? trimmedText.substring(lastIndexOf + 1) : trimmedText
  if (channel) {
    iframe = document.querySelector('iframe')
    iframe.src = `https://player.twitch.tv/?channel=${channel}&muted=false&parent=rollanibrayev.github.io&player=popout&quality=chunked&volume=1`
    iframe.style = 'display: block'
    document.querySelector('form').style.display = 'none'
    document.body.style.justifyContent = 'left'
    document.body.style.alignItems = 'start'
    document.body.requestFullscreen()
    return
  }
  alert('Please enter a channel name')
}
document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.key == 'v')
    setTimeout(finalizeIframe, 1)
  else
    if (event.key == 'Enter') {
      event.preventDefault()
      finalizeIframe()
    }
})
document.querySelector('input[type=`button`]').addEventListener('click', finalizeIframe)
