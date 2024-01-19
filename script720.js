// Variable to store previous channel names and quality
let prevChannels = {};

function generateIframes() {
let channel1 = extractChannelName(document.getElementById("channel1").value.trim());
  if (channel1) {
    createIframe("frame1", channel1);

    document.getElementById("channelForm").style.display = "none";
  } else {
    alert("Please enter at least one channel name.");
  }
}

function extractChannelName(fullText) {
  // If the text contains '/', extract the text after the last '/'
  let lastSlashIndex = fullText.lastIndexOf('/');
  return (lastSlashIndex !== -1) ? fullText.substring(lastSlashIndex + 1) : fullText;
}

function createIframe(id, channel) {
  let iframeContainer = document.getElementById("iframeContainer");
  let position = document.querySelector('input[name="position"]:checked').value;

  if (channel !== "" && (prevChannels[id] !== channel || prevQuality !== quality)) {
    let iframe = document.createElement("iframe");
    iframe.id = id;
    iframe.name = id;
    iframe.src = `https://player.twitch.tv/?channel=${channel}&enableExtensions=true&muted=false&parent=rollanibrayev.github.io&player=popout&quality=720p60&volume=1`;
    iframe.frameborder=0;
    iframe.allowfullscreen=true;
    //iframe.scrolling=no;
    iframe.height=720;
    iframe.width=1280;
    iframe.style = `border: 0`;

    iframeContainer.style = position;
    iframeContainer.appendChild(iframe);

    prevChannels[id] = channel;
  }
}
