import Lead from '$/Lead'
import db from '~/database'

/*
* @todo add lead.save
*
*/
describe('Lead class', () => {
    beforeAll(async () => {
        await db().table('leads').delete()
        return true
    })

    afterAll(async () => {
        await db().table('leads').delete()
        return true
    })

    it('\'Lead.all()\' return a empty list', async done => {
        expect.assertions(1)
        const leads = await Lead.all()
        expect(leads).toHaveLength(0)
        done()
    })

    // create a lead
    it('\'Lead.save()\' return a empty list', async done => {
        expect.assertions(6)
        const data = {
            fullName: 'Lucas Gomes',
            email: 'lucas@gmail.com',
            demands: [{
                origin: '075',
                destination: '011',
            }]
        }

        const lead = new Lead(data)
        expect(lead).toBeInstanceOf(Lead)
        expect(lead).toHaveProperty('email', data.email)
        expect(lead).toHaveProperty('fullName', data.fullName)
        expect(lead).toHaveProperty('firstName', data.firstName)
        expect(lead).toHaveProperty('demands', data.demands)

        await lead.save()

        const leads = await Lead.all()
        expect(leads).toHaveLength(1)
        done()
    })

    it('\'Lead.addDemand()\' return updated lead', async done => {
        expect.assertions(7)
        const demand = {
            origin: '011',
            destination: '075',
        }

        const [lead, ...none] = await Lead.all()
        expect(lead).toBeInstanceOf(Lead)
        expect(lead).toHaveProperty('email')
        expect(lead).toHaveProperty('fullName')
        expect(lead).toHaveProperty('demands')
        expect(lead.demands).toHaveLength(1)


        await lead.addDemand(demand)
        expect(lead.demands).toHaveLength(2)

        const leads = await Lead.all()
        expect(leads).toHaveLength(1)
        done()
    })



    it('\'Lead.all()\' return a list of \'Lead\' objects', async done => {
        expect.assertions(6)
        const leads = await Lead.all()
        expect(leads).toHaveLength(1)
        expect(leads[0]).toBeInstanceOf(Lead)
        expect(leads[0]).toHaveProperty('id')
        expect(leads[0]).toHaveProperty('email')
        expect(leads[0]).toHaveProperty('fullName')
        // expect(leads[0]).toHaveProperty('firstName')
        expect(leads[0]).toHaveProperty('demands')
        done()
    })

    it('\'Lead.all()\' return a list of raw Objects ', async done => {
        expect.assertions(7)
        const leads = await Lead.all(true)
        expect(leads).toHaveLength(1)
        expect(leads[0]).not.toBeInstanceOf(Lead)
        expect(leads[0]).toBeInstanceOf(Object)
        expect(leads[0]).toHaveProperty('id')
        expect(leads[0]).toHaveProperty('email')
        expect(leads[0]).toHaveProperty('fullName')
        // expect(leads[0]).toHaveProperty('fullName')
        expect(leads[0]).toHaveProperty('demands')
        done()
    })

    
  })