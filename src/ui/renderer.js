import React from 'react'
import fs from 'fs'
import path from 'path'

import { renderToString } from 'react-dom/server'
import { syncHistoryWithStore } from 'react-router-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
// import { ApolloProvider } from 'react-apollo'
// import ApolloClientSingleton from '../../network/apollo-client-singleton'

import routes from './src/routes'
import renderIndex from './render-index'
import Store from './src/store'
import wrap from './wrap'

let assetMap = {
  'bundle.js': 'bundle.js'
}
if (process.env.NODE_ENV === 'production') {
  assetMap = JSON.parse(
    fs.readFileSync(
      path.join(process.env.ASSETS_DIR, process.env.ASSETS_MAP_FILE)
    )
  )
}
export default wrap(async (ctx, next) => {
  const req = ctx.request
  const res = ctx.response
  
  const memoryHistory = createMemoryHistory(req.url)
  const store = new Store(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store.data)

  match({
    history,
    routes,
    location: req.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const html = renderToString(
        //<ApolloProvider store={store.data} client={ApolloClientSingleton}>
          <RouterContext {...renderProps} />
        //</ApolloProvider>
        )
      res.send(renderIndex(html, '', assetMap, store.data))
    } else {
      res.status(404).send('Not found')
    }
  })
})
