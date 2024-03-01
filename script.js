const textInput = document.querySelector('input[type="text"]');
function finalizeIframe() {
  let fullText = textInput.value.trim(),
      lastSlashIndex = fullText.lastIndexOf('/'),
      channel = (lastSlashIndex !== -1) ? fullText.substring(lastSlashIndex + 1) : fullText;
  if (channel) {
    const iframe = document.querySelector('iframe'),
          d = document;
    iframe.src = `https://player.twitch.tv/?channel=${channel}&muted=false&parent=rollanibrayev.github.io&player=popout&quality=chunked&volume=1`;
    iframe.style = 'display: block';
    d.querySelector('form').style.display = 'none';
    d.b = d.body;
    d.b.s = d.b.style;
    d.b.s.justifyContent = 'left';
    d.b.s.alignItems = 'start';
    d.b.requestFullscreen();
  } else {
    alert('Please enter a channel name');
  }
}
textInput.focus();
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key == 'v') {
    setTimeout(finalizeIframe, 1);
    return;
  }
  if (event.key == 'Enter') {
    event.preventDefault();
    finalizeIframe();
  }
});
document.querySelector('input[type="button"]').addEventListener('click', finalizeIframe);
