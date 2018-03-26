import { Responder } from '@LucasBadico/cote'
import Price from './Price'

const responder = new Responder({ name: 'price-service' })
responder.on('*', console.log)
responder.on('say-hi', _ => Promise.resolve('hi, from the price-service'))

responder.on('all-prices', async (args) => Price.all())

responder.on('by-origin', async (args, fn) => { 
    console.log('getCTX', { args, fn, ctx: fn() })
    return Price.findByOrigin( args.origin || '011')
})

responder.on('by-destination', async ({ destination, getCtx }) => Price.findByDestination( destination || getCtx().request.body.destination))

export {
    responder
}
