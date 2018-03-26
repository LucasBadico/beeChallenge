import Router from 'koa-router'
import { Requester } from 'cote'

const requester = new Requester({ name: 'front-faced requester' })
const router = new Router()

const getCtx = (ctx) => () => ctx


router.get('/hello', (ctx, next) => {
    ctx.body = 'Hello World! from koa';
})

// prices
router.get('/prices/all', async (ctx, next) => {
    const allPrices = await requester.send({ type: 'all-prices'}) 
    console.log('allPrices route', allPrices)
    ctx.body = allPrices
})

router.post('/prices/by-origin', async (ctx, next) => {
    const prices = await requester.send({ type: 'by-origin' }, getCtx(ctx))
    ctx.body = prices
})

router.post('/prices/by-destination', async (ctx, next) => {
    const prices = await requester.send({ type: 'by-destination' }, ctx)
    ctx.body = prices
})

export default router