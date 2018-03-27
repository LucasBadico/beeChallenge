import { Responder, Requester } from '@LucasBadico/cote'
const responder = new Responder({ name: 'ddd-calculator' })
const requester = new Requester({ name: 'ddd-calculator' })

const parsePlan = str => parseInt(srt.slice(str.length - 2), 10)

responder.on('say-hi', _ => Promise.resolve('hi, from the ddd-calculator'))

responder.on('calc-full', async ({
    origin,
    destination,
    totalTime,
    plan,
}) => {
    const { costByMinute } = await requester.send({ type: 'price-minute', origin, destination })
    const freeTime = parsePlan(plan)
    const notFreeTime = totalTime - freeTime
    return notFreeTime <= 0 ? 0 : notFreeTime * costByMinute * 1.1
})