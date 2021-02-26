import { ApolloServer } from "apollo-server-express"
import express from "express"
import expressPlayground from "graphql-playground-middleware-express"
import { readFileSync } from "fs"
import { createServer } from "http"
import dotenv from "dotenv"
dotenv.config()
import DB from "config/connectDB"
import depthLimit from "graphql-depth-limit"
import resolvers from "resolvers"
const typeDefs = readFileSync("src/typeDefs.graphql", "utf-8")

const app = express()

const start = async () => {
    const db = await DB.get()

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

    app.get("/", expressPlayground({ endpoint: "/graphql" }))
    app.get("/playground", expressPlayground({ endpoint: "/graphql" }))

    const httpServer = createServer(app)
    httpServer.timeout = 5000
    httpServer.listen({ port: process.env.PORT || 8080 }, () => {
        console.log(`GraphQL Server Running at http://localhost:${process.env.PORT || 8080}${server.graphqlPath}`)
    })
}

start()