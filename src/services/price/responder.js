import { Responder } from 'cote'
import Price from './Price'

const responder = new Responder({ name: 'price-service' })
// responder.on('*', console.log)
responder.on('say-hi', _ => Promise.resolve('hi, from the price-service'))

responder.on('all-prices', async (args) => Price.all())

responder.on('by-origin', async ({ origin, ctx }) => Price.findByOrigin( origin || ctx().request.body.origin))

responder.on('by-destination', async ({ destination, ctx }) => Price.findByDestination( destination || ctx().request.body.destination))

export {
    responder
}
