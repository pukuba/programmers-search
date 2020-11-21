const supertest = require('supertest')
const app = require('../server')
const assert = require('assert')

describe('TEST', () => {
    const req = supertest(app)

    it(`Server On test`, async () => {
        const query = `
        query{
            test
        }`

        const result = await req.post('/graphql')
            .send({ query })
            .expect(200)

        const json = JSON.parse(result.res.text)
        assert.strictEqual(json.data.test, "test")
    })



    it(`Search API test1`, async () => {

        const query = `
            query{
                searchProblem(title:"주식가격"){
                    title
                    lv
                    url
                }
            }
        `

        const result = await req.post('/graphql')
            .send({ query })
            .expect(200)

        const json = JSON.parse(result.res.text)
        assert.strictEqual(json.data.searchProblem.title, "주식가격")
        assert.strictEqual(json.data.searchProblem.lv, "2")
        assert.strictEqual(json.data.searchProblem.url,"https://programmers.co.kr/learn/courses/30/lessons/42584")
        
    })

})
