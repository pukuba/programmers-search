const dotenv = require('dotenv')
const path = require('path')

const { MongoClient } = require('mongodb')


dotenv.config({ path: path.join(__dirname, '../.env') })


const init = async () => {

    const client = await MongoClient.connect(
        process.env.DB_HOST1, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    )

    const db = client.db()
    const arr = []
    /*
    type Post{
    id: String!
    author: String!
    tier: String!
    content: String!
    date: String!
    type: Int!
    problem: String
    title: String!
}
    */
    const newDate = new Date()
    for (let i = 0; i < 30; i++) {
        arr.push({
            type: 0,
            author: 'asdf',
            tier: 'R1',
            content: `${i}`,
            date: newDate.valueOf(),
            title: "hi"
        })
    }
    await db.collection('post').insertMany(arr)

    console.log("db insert success")
    process.exit(0)
}

init()