import { Kafka } from "kafkajs"

/**
 * Kafka connection
 */
const kafka = new Kafka({
    clientId: "email",
    brokers: ["kafka:9094"],
})

const topic = "ECOMMERCE_SEND_EMAIL"
const consumer = kafka.consumer({ groupId: "email-group" })

// const producer = kafka.producer()

async function run() {
    // await producer.connect()
    await consumer.connect()
    await consumer.subscribe({ topic })
    await consumer.run({
        eachMessage: async({ topic, partition, message }) => {
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
            console.log(`- ${prefix} ${message.key}#${message.value}`)

            await new Promise(resolve => setTimeout(resolve, 5000));

            console.log('Email sent');
        },
    })
}

run().catch(console.error)