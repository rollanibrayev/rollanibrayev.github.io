textInput = document.querySelector(`input[type='text']`);
finalizeIframe = () => {
  trimmedText = t.value.trim()
  lastIndexOf = trimmedText.lastIndexOf('/')
  channel = (lastIndexOf !== -1) ? trimmedText.substring(lastIndexOf + 1) : trimmedText
  if (channel) {
    r = document.querySelector('iframe')
    r.src = `https://player.twitch.tv/?channel=${channel}&muted=false&parent=rollanibrayev.github.io&player=popout&quality=chunked&volume=1`
    r.style = 'display: block'
    document.querySelector('form').style.display = 'none'
    document.body.style.justifyContent = 'left'
    document.body.style.alignItems = 'start'
    document.body.requestFullscreen()
    return
  }
  alert('Please enter a channel name')
}
textInput.focus()
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key == 'v') {
    setTimeout(finalizeIframe, 1)
  } else if (event.key == 'Enter') {
    event.preventDefault()
    finalizeIframe()
  }
})
document.querySelector('input[type=`button`]').addEventListener('click', finalizeIframe)
