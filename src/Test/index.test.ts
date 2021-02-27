import assert from "assert"
import app from "server"
import request from "supertest"


describe(`GQL Server Test`, () => {
    it(`getAllProblemCount API Test`, async () => {
        const query = `
        query{
            getAllProblemCount
          }
        `
        const response = await request(app)
            .get(`/graphql?query=${query}`)
            .expect(200)
        const data = response.body.data.getAllProblemCount

        assert.strictEqual(data, 203)
    })

    it(`getRandomProblem API Test`, async () => {
        const query = `
            query{
                getRandomProblem{
                  lv
                }
              }
            `

        const response = await request(app)
            .get(`/graphql?query=${query}`)
            .expect(200)

        const data = response.body.data.getRandomProblem
        assert(data.lv)
    })

    it(`findLevelByProblem API Test`, async () => {
        const query = `
            query{
                findLevelByProblem(levels:[1,2,3,4,5]){
                  lv
                }
              }
              `

        const response = await request(app)
            .get(`/graphql?query=${query}`)
            .expect(200)

        const data = response.body.data.findLevelByProblem
        assert.strictEqual(data.length, 203)
        assert.strictEqual(~~data[0].lv, 1)
    })

    it(`findProblem API Test`, async () => {
        const query = `
            query{
                findProblem(text:"a"){
                  id
                  lv
                  title
                }
              }
            `

        const response: any = await request(app)
            .get(`/graphql?query=${query}`)
            .expect(200)

        const data = await response.body.data.findProblem[0]

        assert.strict(data.id)
        assert.strictEqual(~~data.lv, 2)
        assert.strictEqual(data.title, "JadenCase 문자열 만들기")
    })
})