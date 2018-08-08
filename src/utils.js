import { Base64 } from 'js-base64'
import { toFlowchart } from 'scl-to-mermaid';

export const base64ToState = (base64, search) => {
  // for backward compatibility
  const params = new window.URLSearchParams(search)
  const themeFromUrl = params.get('theme') || 'default'

  const str = Base64.decode(base64)
  let state
  try {
    state = JSON.parse(str)
    if (state.code === undefined) { // not valid json
      state = { code: str, mermaid: { theme: themeFromUrl } }
    }
  } catch (e) {
    state = { code: str, mermaid: { theme: themeFromUrl } }
  }
  return state
}

const defaultScl = `
Flux Capacitor
  is in A DeLorean
  <Enables> Time Travel

Time Travel
  <Can Prevent> Getting Shot By Libyans
`
export const defaultState = {
  scl: defaultScl,
  code: toFlowchart(defaultScl),
  mermaid: { theme: 'default' }
}
