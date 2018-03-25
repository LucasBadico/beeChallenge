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
import createStore from './src/store'

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
export default (ctx, next) => {
  const memoryHistory = createMemoryHistory(ctx.url)
  const store = createStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)
  
  match({
    history,
    routes,
    location: ctx.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      ctx.throw(500, error.message)
    } else if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const html = renderToString(
        //<ApolloProvider store={store.data} client={ApolloClientSingleton}>
          <RouterContext {...renderProps} />
        //</ApolloProvider>
        )
      ctx.body = renderIndex(html, '', assetMap, store)
      ctx.type = 'text/html; charset=utf-8'
    } else {
      ctx.throw(404, 'Not found')
    }
  })
}
