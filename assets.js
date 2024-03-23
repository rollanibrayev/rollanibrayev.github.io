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
