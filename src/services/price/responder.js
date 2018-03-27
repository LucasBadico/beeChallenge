import { Responder } from '@LucasBadico/cote'
import Price from './Price'

const responder = new Responder({ name: 'price-service' })
responder.on('say-hi', _ => Promise.resolve('hi, from the price-service'))

responder.on('price-all', async (...args) => {
    return Price.all(true)
})

responder.on('prices-by-origin', async ({ origin }) => { 
    return Price.findByOrigin(origin, true)
})

responder.on('prices-by-destination', async ({ destination }) => {
    return Price.findByDestination(destination, true)
})

responder.on('price-minute', async ({ destination, origin }) => {
    const result = await Price.byOriginAndDestination({ destination, origin }, true)
    return result[0]
})

export {
    responder
}
