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
const element = (name, number) => {
  const elements = document.querySelectorAll(name)
  number == undefined
  ? elements
  : elements[number];
}
