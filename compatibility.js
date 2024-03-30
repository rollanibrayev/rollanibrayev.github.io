const is768 = window.screen.height == 768
const leftCoordinate = `calc(${is768 ? '32000vw/683' : '50vw'})`
const topCoordinate = `calc(${is768 ? '18000vw/683' : '28.125vw'})`
const quality = {
  low: `quality=${is768 ? '360p30' : '720p60'}&`,
  high: `quality=${is768 ? '720p60' : '1080p60'}&`
}
