import express from "express"
import { Kafka } from "kafkajs"
import routes from "./routes"

const app = express()

/**
 * Kafka connection
 */
const kafka = new Kafka({
    clientId: "api",
    // brokers: ["localhost:9094"],
    brokers: ["kafka:9094"],
    retry: {
        initialRetryTime: 300,
        retries: 10,
    },
})

const producer = kafka.producer()
    // const consumer = kafka.consumer({ groupId: "certificate-group-receiver" })

/**
 * Allow kafka producer to all routes
 */
app.use((req, res, next) => {
    req.producer = producer
    return next()
})

/**
 * Register routes
 */
app.use(routes)

async function run() {
    await producer.connect()
        // await consumer.connect()
        // await consumer.subscribe({ topic: "CERTIFICATION_RESPONSE" })
        // await consumer.run({
        //     eachMessage: async({ topic, partition, message }) => {
        //         const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
        //         console.log(`- ${prefix} ${message.key}#${message.value}`)
        //     },
        // })

    app.listen(3333)
}

run().catch(console.error)