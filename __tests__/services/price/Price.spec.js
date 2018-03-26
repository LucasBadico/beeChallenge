import Price from '$/Price'

/*
* @todo add price.save test
*/



describe('Price class', () => {
    it('\'Price.all()\' return a list of \'Price\' objects', async done => {
        expect.assertions(6)
        const prices = await Price.all()
        expect(prices).toHaveLength(6)
        expect(prices[0]).toBeInstanceOf(Price)
        expect(prices[0]).toHaveProperty('id')
        expect(prices[0]).toHaveProperty('destination')
        expect(prices[0]).toHaveProperty('costByMinute')
        expect(prices[0]).toHaveProperty('origin')
        done()
    })

    it('\'Price.all()\' return a list of raw Objects ', async done => {
        expect.assertions(7)
        const prices = await Price.all(true)
        expect(prices).toHaveLength(6)
        expect(prices[0]).not.toBeInstanceOf(Price)
        expect(prices[0]).toBeInstanceOf(Object)
        expect(prices[0]).toHaveProperty('id')
        expect(prices[0]).toHaveProperty('destination')
        expect(prices[0]).toHaveProperty('costByMinute')
        expect(prices[0]).toHaveProperty('origin')
        done()
    })

    it('\'Price.findById()\' return a of \'Price\' object', async done => {
        expect.assertions(8)
        const prices = await Price.all(true)
        expect(prices).toHaveLength(6)
        expect(prices[0]).not.toBeInstanceOf(Price)
        const { id } = prices[0]
        const item = await Price.findById(id)
        expect(item).toBeInstanceOf(Price)
        expect(item).toBeInstanceOf(Object)
        expect(item).toHaveProperty('id')
        expect(item).toHaveProperty('destination')
        expect(item).toHaveProperty('costByMinute')
        expect(item).toHaveProperty('origin')
        done()
    })

    it('\'Price.findById()\' return a item of raw Object', async done => {
        expect.assertions(8)
        const prices = await Price.all(true)
        expect(prices).toHaveLength(6)
        expect(prices[0]).not.toBeInstanceOf(Price)
        
        const { id } = prices[0]
        const item = await Price.findById(id, true)
        expect(item).not.toBeInstanceOf(Price)
        expect(item).toBeInstanceOf(Object)
        expect(item).toHaveProperty('id')
        expect(item).toHaveProperty('destination')
        expect(item).toHaveProperty('costByMinute')
        expect(item).toHaveProperty('origin')
        done()
    })

    it('\'Price.findByOrigin()\' return a item of Price Object', async done => {
        expect.assertions(7)
        const result = await Price.findByOrigin('011')
        expect(result).toHaveLength(3)
        expect(result[0]).toBeInstanceOf(Price)
        expect(result[0]).toBeInstanceOf(Object)
        expect(result[0]).toHaveProperty('id')
        expect(result[0]).toHaveProperty('destination')
        expect(result[0]).toHaveProperty('costByMinute')
        expect(result[0]).toHaveProperty('origin')
        done()
    })

    it('\'Price.findByOrigin()\' return a item of raw Object', async done => {
        expect.assertions(7)
        const result = await Price.findByOrigin('011', true)
        expect(result).toHaveLength(3)
        expect(result[0]).not.toBeInstanceOf(Price)
        expect(result[0]).toBeInstanceOf(Object)
        expect(result[0]).toHaveProperty('id')
        expect(result[0]).toHaveProperty('destination')
        expect(result[0]).toHaveProperty('costByMinute')
        expect(result[0]).toHaveProperty('origin')
        done()
    })

    it('\'Price.findByDestination()\' return a item of Price Object', async done => {
        expect.assertions(7)
        const result = await Price.findByDestination('011')
        expect(result).toHaveLength(3)
        expect(result[0]).toBeInstanceOf(Price)
        expect(result[0]).toBeInstanceOf(Object)
        expect(result[0]).toHaveProperty('id')
        expect(result[0]).toHaveProperty('destination')
        expect(result[0]).toHaveProperty('costByMinute')
        expect(result[0]).toHaveProperty('origin')
        done()
    })

    it('\'Price.findByDestination()\' return a item of raw Object', async done => {
        expect.assertions(7)
        const result = await Price.findByDestination('011', true)
        expect(result).toHaveLength(3)
        expect(result[0]).not.toBeInstanceOf(Price)
        expect(result[0]).toBeInstanceOf(Object)
        expect(result[0]).toHaveProperty('id')
        expect(result[0]).toHaveProperty('destination')
        expect(result[0]).toHaveProperty('costByMinute')
        expect(result[0]).toHaveProperty('origin')
        done()
    })
  })