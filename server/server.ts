import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import expressPlayground from 'graphql-playground-middleware-express'
import { MongoClient } from 'mongodb'
import { readFileSync } from 'fs'
import { createServer } from 'http'
import dotenv from 'dotenv'
dotenv.config()
import depthLimit from 'graphql-depth-limit'
import * as resolvers from './resolvers'
const typeDefs = readFileSync('./typeDefs.graphql', 'utf-8')

import cors from 'cors'
const app = express()

const start = async () => {
    const client = await MongoClient.connect(
        String(process.env.DB_HOST1), {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    )
    const db = client.db()
    const corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200,
    }
    const server = new ApolloServer({
        typeDefs,
        resolvers,

        context: () => {
            return { db }
        },
        validationRules: [
            depthLimit(7)
        ]
    })
    server.applyMiddleware({ app })

    app.get('/', expressPlayground({ endpoint: '/graphql' }))
    app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
    app.use(cors(corsOptions))

    const httpServer = createServer(app)
    httpServer.timeout = 5000
    httpServer.listen({ port: process.env.PORT }, () => {
        console.log(`GraphQL Server Running at http://localhost:${process.env.PORT}${server.graphqlPath}`)
    })
}

start()