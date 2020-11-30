const supertest = require('supertest')
const app = require('../server')
const assert = require('assert')
const { register1, register2, login1, login2, get1, get2, get3, logout1 } = require('./test-codes')
const log = console.log
const req = supertest(app)

const delay = ms => new Promise(res => setTimeout(res, ms));

describe('Server Run', async () => {

    it(`wait server`, async () => {
        await delay(2000)
    })

    it(`Server On test`, async () => {
        const query = `
            query{
                test
            }
        `

        const result = await req.post('/graphql')
            .send({ query })
            .expect(200)


        const json = JSON.parse(result.res.text)
        assert.strictEqual(json.data.test, "serverOn")
    })
})

describe(`Server Get API`, async () => {
    get1(req)

    get2(req)

    get3(req)
})

describe(`Server Sign API`, async () => {
    register1(req)

    register2(req)

    login1(req)

    login2(req)

    logout1(req)
})
