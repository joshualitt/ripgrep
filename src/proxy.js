import { HttpProxyAgent } from 'http-proxy-agent'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { getProxyForUrl } from 'proxy-from-env'

export const getGotAgentOptions = (url) => {
  const proxyUrl = getProxyForUrl(url)
  if (!proxyUrl) {
    return {}
  }
  return {
    agent: {
      http: new HttpProxyAgent(proxyUrl),
      https: new HttpsProxyAgent(proxyUrl),
    },
  }
}
