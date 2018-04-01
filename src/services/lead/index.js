import { Responder } from 'cote'
import Lead from './Lead'

const responder = new Responder({ name: 'Lead-service responder' })

responder.on('say-hi-lead', _ => Promise.resolve('hi, from the lead-service'))

responder.on('leads-all', async (...args) => {
    return Lead.all(true)
})


responder.on('lead-add-demand', async ({
    fullName,
    email,
    demand:{ origin, destination }
}) => {
    try {
        const lead = await Lead.findByEmail(email)
        await lead.addDemand({ origin, destination })
        return lead.raw()
    } catch (err) {
        console.log('Error on getByEmail', err)
        if (err === 'Lead not finded') {
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
            return lead.raw()
        }
        throw new Error(err)
    }
})

export {
    responder
}
