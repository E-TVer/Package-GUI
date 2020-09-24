export default function parseJSON (str: string): any { // eslint-disable-line
  let result = null
  try {
    result = JSON.parse(str)
  } catch (e) {
    console.error('JSON error', str, '#')
    return null
  }
  return result
}
