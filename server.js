const Vue = require('vue')
const server = require('express')()

const template = require('fs').readFileSync('./index.template.html', 'utf-8')

const render = require('vue-server-renderer').createRenderer({
  template,
})

const context = {
  title: 'vue ssr',
  meta: `
    <meta name="keyword" content="vue,ssr">
    <meta name="description" content="vue srr demo">
  `,
}

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`,
  })

  render.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.set('Content-Type', 'text/html')
    res.end(html)
  })
})

server.listen(8080, () => {
  console.log('server is listening at http://127.0.0.1:8080')
})
