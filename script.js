document.appendChild(document.createElement('body'))
document.body.innerHTML = `
<title>Twitch Streams Viewer</title>
<iframe allowfullscreen = false></iframe>
<iframe allowfullscreen = false></iframe>
<iframe allowfullscreen = false></iframe>
<iframe allowfullscreen = false></iframe>
<div>drag a twitch stream thumbnail</div>
<div>drag 2 twitch stream thumbnails</div>
<div>drag 3 twitch stream thumbnails</div>
<input placeholder = 'drag 4 twitch stream thumbnails here'>
<style>
body {
    margin: 0;
    background-color: 000;
    overflow: hidden
}
iframe {
    display: block;
    width: 50vw;
    height: 28.125vw;
    border: 0;
    position: absolute
}
iframe:nth-of-type(1) { left:  0;   top:  0   }
iframe:nth-of-type(2) { left: 50vw; top:  0   }
iframe:nth-of-type(3) { left:  0;   top: 50vh }
iframe:nth-of-type(4) { left: 50vw; top: 50vh }
div {
    display: none;
    text-align: center;
    position: absolute;
    color: 808080;
    font-family: Calibri;
    top: 75vh;
    font-size: 4vh
}
div:nth-of-type(1) {
    width: 50vw;
    left: 50vw;
}
div:nth-of-type(2), div:nth-of-type(3) {
    width: 100vw;
}
input {
    position: absolute;
    background-color: transparent;
    width: 100vw;
    height: 100vh;
    font-size: 5.5vh;
    font-family: Calibri;
    border: 0;
    text-align: center;
    outline: none;
    caret-color: transparent;
    cursor: default;
    padding: 0
}
::placeholder { color: 808080 }
</style>
`
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
