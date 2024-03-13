let generatedIframesCount = 0
const last = array => array[array.length - 1]
document.querySelector('input').addEventListener('input', event => {
    if (generatedIframesCount < 1) event.target.removeAttribute('placeholder')
    if (generatedIframesCount == 2) document.body.requestFullscreen();
    if (generatedIframesCount > 0) last(document.querySelectorAll('div')).remove()
    const iframe = document.querySelectorAll('iframe')[++generatedIframesCount - 1]
    iframe.src = `https://player.twitch.tv/?enableExtensions=true&muted=true&parent=rollanibrayev.github.io&player=popout&quality=chunked&volume=1&channel=${event.target.value.split('/').pop()}`
    event.target.value = ''
    if (generatedIframesCount < 4) last(document.querySelectorAll('div')).style = 'display: block'
    if (generatedIframesCount > 3) event.target.remove()
})
