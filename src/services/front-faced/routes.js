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
    const allPrices = await requester.send({ type: 'all-prices' }) 
    ctx.body = allPrices
})

router.post('/prices/by-origin', async (ctx, next) => {
    console.log('ctx || ', { ctx }, sendCtx(ctx))
    const prices = await requester.send({ type: 'by-origin' }, sendCtx(ctx))
    ctx.body = prices
})

router.post('/prices/by-destination', async (ctx, next) => {
    const prices = await requester.send({
        type: 'by-destination',
        ...sendCtx(ctx),
    })
    ctx.body = prices
})

export default router