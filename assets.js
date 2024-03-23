const u = (m, ...a) => {
  let n =
    m[0] == 'r'
    ? 2
    : 3
  for (let i = 0; i < a.length; i += n)
    a[i][m](
      n == 2
      ? a[i + 1]
      : a[i + 1], a[i + 2]
    )
}
const elements = (name, number) => {
  const elements = document.querySelectorAll(name)
  return number == undefined
  ? elements
  : elements[number]
}
const addInputListeners = (...a) => {
  for (let i = 0; i < a.length; i += 2)
    elements('input', a[i]).addEventListener('input', a[i + 1])
}
const addEventListeners = (...a) => {
  for (let i = 0; i < a.length; i += 3)
    a[i].addEventListener(
      a[i + 1], a[i + 2]
    )
}
const changeChannel = (iframeNumber, channel) =>
  iframes[iframeNumber - 1].src = start + muted + 'quality=720p60&' +
  'parent=rollanibrayev.github.io&channel=' + channel.split('/').pop()
const listener = event => event.key === 'F' || event.key === 'f' ? toggle(event) :1
const toggleSound = iframeNumbers => {
  Array.from(String(iframeNumbers)).forEach(iframeNumber => {
    const
    iframe = iframes[iframeNumber - 1],
    src = iframe.src;
    iframe.src =
      src[26] == 'm'
      ? start + src.slice(37)
      : start + 'muted=true&' + src.slice(25)
  })
}