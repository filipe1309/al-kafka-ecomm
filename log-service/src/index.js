import { Kafka } from "kafkajs"

/**
 * Kafka connection
 */
const kafka = new Kafka({
    clientId: "email",
    brokers: ["kafka:9094"],
})

const consumer = kafka.consumer({ groupId: "log-group" })

async function run() {
    await consumer.connect()
    await consumer.subscribe({ topic: /ECOMMERCE.*/i })
    await consumer.run({
        eachMessage: async({ topic, partition, message }) => {
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
            console.log(`- ${prefix} ${message.key}#${message.value}`)
            console.log('Logged');
        },
    })
}

run().catch(console.error)