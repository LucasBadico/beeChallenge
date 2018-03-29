import Router from 'koa-router'
import { Requester } from 'cote'

const requester = new Requester({ name: 'front-faced requester' })
const router = new Router()

router.get('/hello', (ctx, next) => {
    ctx.body = 'Hello World! from koa';
})

// prices
router.get('/prices/all', async (ctx, next) => {
    console.log('REQUEST INCOMING', ctx.request)    
    console.log('REQUEST BODY', ctx.request.body)    
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

router.post('/prices/minute', async (ctx, next) => {
    const prices = await requester.send({
        type: 'price-minute',
        origin: ctx.request.body.origin,
        destination: ctx.request.body.destination,
    })
    ctx.body = prices
})

router.post('/calculator/fale-mais', async (ctx, next) => {
    console.log('REQUEST INCOMING', ctx.request)
    const getCostByMinute = async (ctx) => {
        const {
            request: { 
             body: { costByMinute, origin, destination } 
            }
        } = ctx
        
        if (costByMinute) return { costByMinute }
        
        if (!origin && !destination) {
            ctx.throw(new Error('Não é possivel Calcular, envie custo do minuto ou a origem e o destino.'), 400)
        }

        return requester.send({
            type: 'price-minute',
            destination,
            origin,
        })

    }
    try {
        const { costByMinute } = await getCostByMinute(ctx)
        const {
            request: { 
                body: { plan, totalTime } 
               }
        } = ctx

        ctx.body = await requester.send({
            type: 'calculator-fale-mais',
            costByMinute,
            plan,
            totalTime,
        })
    } catch (err) {
        ctx.throw(err, 400)
    }
    
})



export default router