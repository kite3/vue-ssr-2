const Vue = require('vue')
const path = require('path')
const express = require('express')
const server = express()
server.use(express.static('dist'));
// TODO
// const createApp = require('/path/to/built-server-bundle.js')

const template = require('fs').readFileSync('./index.template.html', 'utf-8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

// const render = require('vue-server-renderer').createRenderer({
//   template,
// })
const { createBundleRenderer } = require('vue-server-renderer')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest, // （可选）客户端构建 manifest
})

server.get('*', (req, res) => {
  const context = { url: req.url }

  // createApp(context).then((app) => {
  //   render.renderToString(app, context, (err, html) => {
  //     if (err) {
  //       if (err.code === 404) {
  //         res.status(404).end('Page not found')
  //       } else {
  //         res.status(500).end('Internal Server Error')
  //       }
  //     } else {
  //       res.set('Content-Type', 'text/html')
  //       res.end(html)
  //     }
  //   })
  // })

  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.set('Content-Type', 'text/html')
      res.end(html)
    }
  })
})

server.listen(8080, () => {
  console.log('server is listening at http://127.0.0.1:8080')
})
