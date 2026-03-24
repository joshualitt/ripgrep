import { HttpProxyAgent } from 'http-proxy-agent'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { getGotAgentOptions } from '../src/proxy.js'

const ORIGINAL_ENV = { ...process.env }

afterEach(() => {
  process.env = { ...ORIGINAL_ENV }
})

test('returns proxy agents when HTTPS_PROXY is configured', () => {
  process.env.HTTPS_PROXY = 'http://127.0.0.1:8080'
  delete process.env.NO_PROXY

  const options = getGotAgentOptions('https://github.com/joshualitt/ripgrep')

  expect(options.agent.http).toBeInstanceOf(HttpProxyAgent)
  expect(options.agent.https).toBeInstanceOf(HttpsProxyAgent)
})

test('respects NO_PROXY exclusions', () => {
  process.env.HTTPS_PROXY = 'http://127.0.0.1:8080'
  process.env.NO_PROXY = 'github.com'

  expect(getGotAgentOptions('https://github.com/joshualitt/ripgrep')).toEqual(
    {},
  )
})
