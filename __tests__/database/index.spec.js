import db from '$/'

const r = db()
const TABLE = 'dummie'

const DATA = [
    { name: "William Adama", tv_show: "Battlestar Galactica",
      posts: [
        {title: "Decommissioning speech", content: "The Cylon War is long over..."},
        {title: "We are at war", content: "Moments ago, this ship received word..."},
        {title: "The new Earth", content: "The discoveries of the past few days..."}
      ]
    },
    { name: "Laura Roslin", tv_show: "Battlestar Galactica",
      posts: [
        {title: "The oath of office", content: "I, Laura Roslin, ..."},
        {title: "They look like us", content: "The Cylons have the ability..."}
      ]
    },
    { name: "Jean-Luc Picard", tv_show: "Star Trek TNG",
      posts: [
        {title: "Civil rights", content: "There are some words I've known since..."}
      ]
    }
]
describe('Database connection', () => {
    beforeAll(async () => {
       await r.tableCreate(TABLE).run()
       return true
    })

    afterAll(async() => {
        await r.tableDrop(TABLE).run()
        return true
    })


    it('should insert and access data on \'dummie\' table', async done => {
        expect.assertions(1)
        await r.table(TABLE).insert(DATA)
        const tableContent =  await r.table(TABLE)
        expect(tableContent.length).toBe(3)
        done()
    })
  })