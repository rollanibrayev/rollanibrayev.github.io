document.querySelectorAll('img').forEach(img => {
  img.addEventListener('click', () => {
    navigator.clipboard.writeText(`[emote:${
      img
        .getAttribute('src')
        .split('/')
        .pop()
        .split('.')
        .slice(0, -1)
        .join('.')
        .substring(2)
    }:]`)
  })
})
