const assert = require('assert')

module.exports = {
    get1: (req) => it(`Get API Test1`, async () => {

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
    }),

    get2: (req) => it(`Get API Test2`, async () => {

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
    }),

    get3: (req) => it(`Get API Test3`, async () => {
        const query = `
            query{
                findLevelByProblem(levels:[1,2]){
                    title
                    lv
                }
            }
        `

        const result = await req.post('/graphql')
            .send({ query })
            .expect(200)

        const json = JSON.parse(result.res.text)
        assert.strictEqual(Object.keys(json.data.findLevelByProblem).length, 117)
    })
}