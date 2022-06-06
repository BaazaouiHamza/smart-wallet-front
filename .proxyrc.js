const { createProxyMiddleware } = require('http-proxy-middleware')
// var cookieParser = require('cookie-parser')

module.exports = function (app) {
  // app.use(cookieParser())
  app.use(
    createProxyMiddleware('/auth', {
      target: 'https://testing.prosperus.tech:4003',
      changeOrigin: true,
      headers: {
        host: 'localhost:1234',
      },
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    })
  )
  app.use(
    createProxyMiddleware('/api/web-wallet', {
      target: 'https://testing.prosperus.tech:4003',
      changeOrigin: true,
      headers: {
        host: 'localhost:1234',
      },
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    })
  )
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://testing.prosperus.tech:4003',
      changeOrigin: true,
      headers: {
        host: 'localhost:1234',
      },
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    })
  )
  app.use(
    createProxyMiddleware('/management', {
      target: 'https://testing.prosperus.tech:4003',
      changeOrigin: true,
      headers: {
        host: 'localhost:1234',
      },
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    })
  )
  app.use(
    createProxyMiddleware('/uaa', {
      target: 'https://testing.prosperus.tech:4003',
      changeOrigin: true,
      headers: {
        host: 'localhost:1234',
      },
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    })
  )
  app.use(
    createProxyMiddleware('/cloudwallet', {
      target: 'https://testing.prosperus.tech:4003',
      changeOrigin: true,
      headers: {
        host: 'localhost:1234',
      },
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    })
  )
  app.use(
    createProxyMiddleware('/kiko', {
      target: 'https://testing.prosperus.tech:4003',
      changeOrigin: true,
      headers: {
        host: 'localhost:1234',
      },
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    })
  )
  app.use(
    createProxyMiddleware('/dcn', {
      target: 'https://testing.prosperus.tech:4003',
      changeOrigin: true,
      headers: {
        host: 'localhost:1234',
      },
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    })
  )
  app.use(
    createProxyMiddleware('/dis', {
      target: 'https://testing.prosperus.tech:4003',
      changeOrigin: true,
      headers: {
        host: 'localhost:1234',
      },
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    })
  )
  app.use(
    createProxyMiddleware('/dispatcher', {
      target: 'https://testing.prosperus.tech:4003',
      changeOrigin: true,
      headers: {
        host: 'localhost:1234',
      },
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    })
  )
  app.use(
    createProxyMiddleware('/1.0', {
      target: 'https://testing.prosperus.tech:4003',
      changeOrigin: true,
      headers: {
        host: 'localhost:1234',
      },
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    })
  )
  app.use(
    createProxyMiddleware('/smart-wallet', {
      target: 'http://localhost:4000',
      changeOrigin: true,
      headers: {
        host: 'localhost:1234',
      },
      pathRewrite: {
        '^/smart-wallet': '',
      },
      cookieDomainRewrite: {
        '*': 'localhost',
      },
      onProxyReq: async (proxyReq, req) => {
        const accessToken = req.headers.cookie
          .split(';')
          .map((ck) => ck.split('='))
          .map(([name, value]) => {
            console.log(name, value)
            return [name.trimEnd().trimStart(), value.trimEnd().trimStart()]
          })
          .find(([name, _]) => name === 'access_token')

        console.log('access_token', accessToken)
        if (accessToken?.[1]) {
          proxyReq.setHeader('Authorization', `Bearer ${accessToken?.[1]}`)
        }
      },
    })
  )
}
