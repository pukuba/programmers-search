const assert = require('assert')

module.exports = {
    register1: (req) => it('Sign Test1 Register', async () => {
        const query = `
        mutation{
            register(id:"test",pw:"test",name:"test"){
                id
            }
        }
    `

        const result = await req.post('/graphql')
            .send({ query })
            .expect(200)

        const json = JSON.parse(result.res.text)
        assert.strictEqual(json.errors[0].message, "Conflict")
        assert.strictEqual(json.errors[0].extensions.code, 409)
    }),

    register2: (req) => it(`Sign Test2 Register`, async () => {
        const query = `
            mutation{
                register(id:"x",pw:"test",name:"test"){
                    id
                }
            }
        `

        const result = await req.post('/graphql')
            .send({ query })
            .expect(200)

        const json = JSON.parse(result.res.text)
        assert.strictEqual(json.errors[0].extensions.code, 412)
    }),

    login1: (req) => it(`Sign Test3 Login`, async () => {
        const query = `
            mutation{
                login(id:"test",pw:"test"){
                    token
                    refreshToken
                }
            }
        `

        const result = await req.post('/graphql')
            .send({ query })
            .expect(200)

        const json = JSON.parse(result.res.text)
        assert(json.data.login.token)
        assert(json.data.login.refreshToken)
    }),

    login2: (req) => it(`Sign Test4 Login`, async () => {
        const query = `
        mutation{
            login(id:"a",pw:"a"){
                token
                refreshToken
            }
        }
        `

        const result = await req.post('/graphql')
            .send({ query })
            .expect(200)

        const json = JSON.parse(result.res.text)
        assert.strictEqual(json.errors[0].extensions.code, 401)

    })
}