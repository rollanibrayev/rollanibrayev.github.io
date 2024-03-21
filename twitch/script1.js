for (
  var entries = document.cookie.split('; '),
    cookies = {},
    i = entries.length - 1;
  i >= 0;
  i--
) {
  var entry = entries[i].split('=', 2)
  cookies[entry[0]] = entry[1]
}
function fetchlike(e) {
  return 'function' == typeof fetch
    ? fetch('https://gql.twitch.tv/gql', e)
    : new Promise(function (a, t) {
        var o = new XMLHttpRequest()
        o.open('POST', 'https://gql.twitch.tv/gql'),
          Object.keys(e.headers).forEach(function (a) {
            try {
              o.setRequestHeader(a, e.headers[a])
            } catch (e) {
              console.error(e)
            }
          }),
          (o.withCredentials = 'include' === e.credentials),
          (o.onerror = t),
          (o.onload = function () {
            var e = {
              status: o.status,
              statusText: o.statusText,
              body: o.response || o.responseText,
              ok: o.status >= 200 && o.status < 300,
              json: function () {
                return new Promise(function (a, t) {
                  try {
                    a(JSON.parse(e.body))
                  } catch (e) {
                    t(e)
                  }
                })
              }
            }
            a(e)
          }),
          o.send(e.body)
      })
}
var vodID,
  channelName,
  authorization = cookies['auth-token']
    ? 'OAuth ' + cookies['auth-token']
    : void 0,
  clientId = 'kimne78kx3ncx6brgo4mv6wki5h1ko',
  commonOptions = {
    method: 'POST',
    headers: {
      'Accept-Language': 'en-US',
      Accept: '*/*',
      Authorization: authorization,
      'Client-ID': clientId,
      'Content-Type': 'text/plain; charset=UTF-8',
      'Device-ID': cookies.unique_id
    }
  },
  playerType = 'site',
  channelMatch = window.location.search.match(/channel=([A-Za-z0-9]+)(?:&|$)/)
channelMatch && channelMatch[1] && (channelName = channelMatch[1])
var videoMatch = window.location.search.match(/video=([A-Za-z0-9]+)(?:&|$)/)
videoMatch &&
  videoMatch[1] &&
  (vodID = videoMatch[1].startsWith('v')
    ? videoMatch[1].substr(1)
    : videoMatch[1])
var query =
    'query PlaybackAccessToken_Template($login: String!, $isLive: Boolean!, $vodID: ID!, $isVod: Boolean!, $playerType: String!) {  streamPlaybackAccessToken(channelName: $login, params: {platform: "web", playerBackend: "mediaplayer", playerType: $playerType}) @include(if: $isLive) {    value    signature   authorization { isForbidden forbiddenReasonCode }   __typename  }  videoPlaybackAccessToken(id: $vodID, params: {platform: "web", playerBackend: "mediaplayer", playerType: $playerType}) @include(if: $isVod) {    value    signature   __typename  }}',
  bodyBase = { operationName: 'PlaybackAccessToken_Template', query: query }
if (vodID) {
  var body = JSON.stringify(
    Object.assign({}, bodyBase, {
      variables: {
        isLive: !1,
        login: '',
        isVod: !0,
        vodID: vodID,
        playerType: playerType
      }
    })
  )
  window.__vat = {
    contentType: 'vod',
    id: vodID,
    playerType: playerType,
    request: fetchlike(Object.assign({}, commonOptions, { body: body }))
  }
} else if (channelName) {
  body = JSON.stringify(
    Object.assign({}, bodyBase, {
      variables: {
        isLive: !0,
        login: channelName,
        isVod: !1,
        vodID: '',
        playerType: playerType
      }
    })
  )
  window.__vat = {
    contentType: 'live',
    id: channelName,
    playerType: playerType,
    request: fetchlike(Object.assign({}, commonOptions, { body: body }))
  }
}
