const textInput = document.querySelector('input[type="text"]');
function finalizeIframe() {
  let fullText = textInput.value.trim(),
      lastSlashIndex = fullText.lastIndexOf('/'),
      channel = (lastSlashIndex !== -1) ? fullText.substring(lastSlashIndex + 1) : fullText;
  if (channel) {
    const iframe = document.querySelector('iframe');
    iframe.src = `https://player.twitch.tv/?channel=${channel}&muted=false&parent=rollanibrayev.github.io&player=popout&quality=chunked&volume=1`;
    iframe.style = 'display: block';
    document.querySelector('form').style.display = 'none';
    document.body.style.justifyContent = 'left';
    document.body.style.alignItems = 'start';
  } else {
    alert('Please enter a channel name');
  }
}
textInput.focus();
document.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {
    event.preventDefault();
    finalizeIframe();
  }
});
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey) {
    document.addEventListener('keypress', (event) => {
      if (event.keyCode == 'v') {
        finalizeIframe();
      }
    });
  }
});
document.querySelector('input[type="button"]').addEventListener('click', finalizeIframe);