import Router from 'koa-router'
import { Requester } from '@LucasBadico/cote'

const requester = new Requester({ name: 'front-faced requester' })
const router = new Router()

const sendCtx = (ctx) => () => ctx


router.get('/hello', (ctx, next) => {
    ctx.body = 'Hello World! from koa';
})

// prices
router.get('/prices/all', async (ctx, next) => {
    const allPrices = await requester.send({ type: 'prices-all' }) 
    ctx.body = allPrices
})

router.post('/prices/by-origin', async (ctx, next) => {
    const prices = await requester.send({ type: 'prices-by-origin', origin: ctx.request.body.origin })
    ctx.body = prices
})

router.post('/prices/by-destination', async (ctx, next) => {
    const prices = await requester.send({
        type: 'prices-by-destination',
        destination: ctx.request.body.destination,
    })
    ctx.body = prices
})


router.post('/prices/by-minute', async (ctx, next) => {
    const prices = await requester.send({
        type: 'price-by-minute',
        origin: ctx.request.body.origin,
        destination: ctx.request.body.destination,
    })
    ctx.body = prices
})

router.post('/calculator/fale-mais', async (ctx, next) => {
    const price = await requester.send({
        type: 'calculator-fale-mais',
        origin: ctx.request.body.origin,
        destination: ctx.request.body.destination,
    })
    ctx.body = price
})

export default router