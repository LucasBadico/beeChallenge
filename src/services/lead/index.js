import { Responder } from 'cote'
import Lead from './Lead'
import log from 'log'
const responder = new Responder({ name: 'Lead-service responder' })

responder.on('say-hi-lead', _ => Promise.resolve('hi, from the lead-service'))

responder.on('leads-all', async (...args) => {
    return Lead.all(true)
})

responder.on('lead-add-demand', async ({
    fullName,
    email,
    demand: { origin, destination }
}) => {
    try {
        const lead = await Lead.findByEmail(email)
        await lead.addDemand({ origin, destination })
        return Promise.resolve(lead.raw())
    } catch (err) {
        log(err)
        const MESSAGE = 'Lead by email not finded - email'
        const errMessage = err.message.slice(0, MESSAGE.length)
        if (errMessage === MESSAGE) {
            const leadData = {
                firstName: fullName.split(' ')[0],
                fullName,
                email,
                demands: [{
                    origin,
                    destination,
                }],
            }
            const lead = new Lead(leadData)
            await lead.save()
            return Promise.resolve(lead.raw())
        }
        throw Error(err)
    }
})

export {
    responder
}
