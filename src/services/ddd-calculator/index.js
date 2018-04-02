import { Responder, Requester } from 'cote'
const responder = new Responder({ name: 'ddd-calculator responder' })

const parsePlan = (plan) => (str) => {
    if (!str.match(/(\w+).(\d+)/) || !str.match(plan)) throw Error('Plano Inválido')
    return parseInt(str.match(/(\d+)/)[0], 10)
}

responder.on('say-hi-ddd-calculator', _ => Promise.resolve('hi, from the ddd-calculator'))
responder.on('calculator-fale-mais', ({ list, ...args }) => {
    const calcDDD = ({
        plan,
        totalTime,
        costByMinute,
    }) => {
        const freeTime = parsePlan('FaleMais')(plan)
        const notFreeTime = totalTime - freeTime
        const cost = notFreeTime <= 0 ? 0 : notFreeTime * costByMinute * 1.1
        return {
            cost,
            freeTime,
            notFreeTime,
            costByMinute,
        }

    }
    if (!!list && list instanceof Array) return Promise.resolve(list.map(calcDDD))
    return Promise.resolve(calcDDD(args).cost)
})

export {
    responder
}