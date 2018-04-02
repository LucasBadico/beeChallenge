import Router from 'koa-router'
import { Requester } from 'cote'

const requester = new Requester({ name: 'front-faced requester' })
const router = new Router()

router.get('/api/hello', (ctx, next) => {
    ctx.body = 'Hello World! from koa root/api/hello';
})

// prices
router.get('/api/prices/all', async (ctx, next) => {
    const allPrices = await requester.send({ type: 'prices-all' }) 
    ctx.body = allPrices
})

router.post('/api/prices/by-origin', async (ctx, next) => {
    const prices = await requester.send({ type: 'prices-by-origin', origin: ctx.request.body.origin })
    ctx.body = prices
})

router.post('/api/prices/by-destination', async (ctx, next) => {
    const prices = await requester.send({
        type: 'prices-by-destination',
        destination: ctx.request.body.destination,
    })
    ctx.body = prices
})

router.post('/api/prices/minute', async (ctx, next) => {
    const prices = await requester.send({
        type: 'price-minute',
        origin: ctx.request.body.origin,
        destination: ctx.request.body.destination,
    })
    ctx.body = prices
})

router.post('/api/calculator/fale-mais', async (ctx, next) => {
    // trocar essa logica pro responder
    const getCostByMinute = async (ctx) => {
        const {
            request: { 
             body: { costByMinute, origin, destination } 
            }
        } = ctx
        
        if (costByMinute) return { costByMinute }
        
        if (!origin && !destination) {
            ctx.throw(Error('Não é possivel Calcular, envie custo do minuto ou a origem e o destino.'), 400)
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

router.post('/api/calculator/fale-mais-list', async (ctx, next) => {
    // trocar essa logica pro responder
    try {
        const list = ctx.request.body
        ctx.body = await requester.send({
            type: 'calculator-fale-mais',
            list,
        })
    } catch (err) {
        ctx.throw(err, 400)
    }
    
})

router.post('/api/lead/add-demand', async (ctx, next) => {
    const lead = await requester.send({
        type: 'lead-add-demand',
        ...ctx.request.body,
    })
    ctx.body = lead
})

router.get('/api/leads/all', async (ctx, next) => {
    const allLeads = await requester.send({ type: 'leads-all' }) 
    ctx.body = allLeads
})

export default router