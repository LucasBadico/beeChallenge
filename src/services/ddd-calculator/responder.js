import { Responder, Requester } from '@LucasBadico/cote'
const responder = new Responder({ name: 'ddd-calculator' })

const parsePlan = (plan) => (str) => {
    if (!str.match(/(\w+).(\d+)/) || !str.match(plan)) throw new Error('Plano Inválido')
    return parseInt(str.match(/(\d+)/)[0], 10)
}

responder.on('say-hi-ddd-calculator', _ => Promise.resolve('hi, from the ddd-calculator'))

responder.on('calculator-fale-mais', async ({
    costByMinute,
    totalTime,
    plan,
}) => {    
    const freeTime = parsePlan('FaleMais')(plan)
    const notFreeTime = totalTime - freeTime
    return Promise.resolve(notFreeTime <= 0 ? 0 : notFreeTime * costByMinute * 1.1)
})

export {
    responder
}