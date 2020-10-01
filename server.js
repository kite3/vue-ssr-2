const Vue = require('vue')
const server = require('express')()
// TODO
const createApp = require('/path/to/built-server-bundle.js')

const template = require('fs').readFileSync('./index.template.html', 'utf-8')

const render = require('vue-server-renderer').createRenderer({
  template,
})

server.get('*', (req, res) => {
  const context = { url: req.url }

  createApp(context).then((app) => {
    render.renderToString(app, context, (err, html) => {
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
})

server.listen(8080, () => {
  console.log('server is listening at http://127.0.0.1:8080')
})
