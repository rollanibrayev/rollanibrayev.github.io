t = document.querySelector(`input[type='text']`);
i = () => {
  f = t.value.trim()
  l = f.lastIndexOf(`/`)
  c = (l !== -1) ? f.substring(l + 1) : f
  if (c) {
    r = document.querySelector(`iframe`)
    r.src = `https://player.twitch.tv/?channel=${c}&muted=false&parent=rollanibrayev.github.io&player=popout&quality=chunked&volume=1`
    r.style = `display: block`
    document.querySelector(`form`).style.display = `none`
    document.body.style.justifyContent = `left`
    document.body.style.alignItems = `start`
    document.body.requestFullscreen()
    return
  }
  alert(`Please enter a channel name`)
}
t.focus()
document.addEventListener(`keydown`, (e) => {
  if (e.ctrlKey && e.key == `v`) {
    setTimeout(i, 1)
    return
  }
  if (e.key == `Enter`) {
    e.preventDefault()
    i()
  }
})
document.querySelector(`input[type='button']`).addEventListener(`click`, i)
