import express from "express"
import routes from "./routes"

const app = express()

/**
 * Register routes
 */
app.use(routes)

async function run() {
    app.listen(3333)
}

run().catch(console.error)