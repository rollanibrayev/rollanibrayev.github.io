function extractChannelName(fullText) {
  let lastSlashIndex = fullText.lastIndexOf('/');
  return (lastSlashIndex !== -1) ? fullText.substring(lastSlashIndex + 1) : fullText;
}
  
function giveIframeChannel(channel) {
  const iframe = document.getElementById("iframe");
  iframe.src = `https://player.twitch.tv/?channel=${channel}&enableExtensions=true&muted=false&parent=rollanibrayev.github.io&player=popout&quality=720p60&volume=1`;
  iframe.style = `display: block`;
}

function generateIframes() {
  let channel = extractChannelName(document.getElementById("channel").value.trim());
  if (channel) {
    giveIframeChannel(channel);
    document.getElementById("channelForm").style.display = "none";
  } else {
    alert("Please enter a channel name.");
  }
}
