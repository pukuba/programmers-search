import assert from "assert"
import fetch from "node-fetch"
const server = `http://localhost:8080/graphql`

describe(`GQL Server Test`, () => {
    it(`getAllProblemCount API Test`, async () => {
        const query = `
        query{
            getAllProblemCount
          }
        `
        const response: any = await fetch(server, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        })
        const data = await response.json()
        assert.strictEqual(response.status, 200)
        assert.strictEqual(data.data.getAllProblemCount, 203)

    })

    it(`getRandomProblem API Test`, async () => {
        const query = `
        query{
            getRandomProblem{
              lv
            }
          }
        `

        const response: any = await fetch(server, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        })
        const data = await response.json()
        assert.strictEqual(response.status, 200)
        assert(data.data.getRandomProblem.lv)
    })

    it(`getRandomProblem API Test`, async () => {
        const query = `
        query{
            getRandomProblem{
              lv
            }
          }
        `

        const response: any = await fetch(server, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        })
        const data = await response.json()
        assert.strictEqual(response.status, 200)
        assert(data.data.getRandomProblem.lv)
    })

    it(`findLevelByProblem API Test`, async () => {
        const query = `
        query{
            findLevelByProblem(levels:[1,2,3,4,5]){
              lv
            }
          }
          `

        const response: any = await fetch(server, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        })
        const data = await response.json()
        assert.strictEqual(response.status, 200)
        assert.strictEqual(data.data.findLevelByProblem.length, 203)
        assert.strictEqual(~~data.data.findLevelByProblem[0].lv, 1)
    })

    it(`findProblem API Test`, async () => {
        const query = `
        query{
            findProblem(text:"주식"){
              id
              lv
              title
            }
          }
          `

        const response: any = await fetch(server, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        })
        const data = await response.json()
        assert.strictEqual(response.status, 200)
        assert.strict(data.data.findProblem[0].id)
        assert.strictEqual(~~data.data.findProblem[0].lv, 2)
        assert.strictEqual(data.data.findProblem[0].title, "주식가격")
    })
})