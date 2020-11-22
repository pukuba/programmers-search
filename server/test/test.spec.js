const supertest = require('supertest')
const app = require('../server')
const assert = require('assert')

const log = console.log
const req = supertest(app)

const delay = ms => new Promise(res => setTimeout(res, ms));

const { MongoClient } = require('mongodb')


describe('TEST', async () => {

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

    it(`API test1`, async () => {

        const query = `
        query{
            getAllProblem{
                title
                lv
                url
                tag
            }
        }`

        const result = await req.post('/graphql')
            .send({ query })
            .expect(200)

        const json = JSON.parse(result.res.text)
        assert.strictEqual((Object.keys(json.data.getAllProblem).length), 203)

    })

    it(`API test2`, async () => {

        const query = `
            query{
                findProblem(text:"주식가격"){
                    title
                    lv
                    url
                    tag
                }
            }
        `

        const result = await req.post('/graphql')
            .send({ query })
            .expect(200)

        const json = JSON.parse(result.res.text)
        assert.strictEqual(json.data.findProblem[0].title, "주식가격")
        assert.strictEqual(json.data.findProblem[0].lv, "2")
        assert.strictEqual(json.data.findProblem[0].url, "https://programmers.co.kr/learn/courses/30/lessons/42584")
        assert.strictEqual(json.data.findProblem[0].tag, "스택/큐")
    })

})
