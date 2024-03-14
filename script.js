let generatedIframesCount = 0
document.querySelector('input').addEventListener('input', event => {
    if (generatedIframesCount < 1) event.target.removeAttribute('placeholder')
    if (generatedIframesCount == 2) {
        document.body.requestFullscreen()
        document.querySelectorAll('iframe')[0].style = 'left:  0'
    }
    const iframe = document.querySelectorAll('iframe')[++generatedIframesCount - 1]
    iframe.src =
        'https://player.twitch.tv/?enableExtensions=true&muted=true&' +
        'parent=rollanibrayev.github.io&player=popout&quality=chunked&volume=1&channel=' +
        event.target.value.split('/').pop()
    event.target.value = ''
    if (generatedIframesCount > 3) event.target.remove()
})
// iframe:nth-of-type(1) { left:  0;   top:  0   }
// iframe:nth-of-type(2) { left: 50vw; top:  0   }
// iframe:nth-of-type(3) { left:  0;   top: 50vh }
// iframe:nth-of-type(4) { left: 50vw; top: 50vh }