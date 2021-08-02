import { Kafka } from "kafkajs"

/**
 * Kafka connection
 */
const kafka = new Kafka({
    clientId: "antifraud",
    brokers: ["kafka:9094"],
})

const topic = "ECOMMERCE_NEW_ORDER"
const consumer = kafka.consumer({ groupId: "antifraud-group" })
    //max.poll.records: 1 https://github.com/tulios/kafkajs/issues/420

// const producer = kafka.producer()

async function run() {
    // await producer.connect()
    await consumer.connect()
    await consumer.subscribe({ topic })
    await consumer.run({
        eachMessage: async({ topic, partition, message }) => {
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
            console.log(`- ${prefix} ${message.key}#${message.value}`)

            await new Promise((resolve) => setTimeout(resolve, 5000))

            console.log("Antifraud checked")
                // const payload = JSON.parse(message.value)

            // setTimeout(() => {
            // producer.send({
            //         topic: "CERTIFICATION_RESPONSE",
            //         messages: [{
            //             value: `Certificate of ${payload.user.name}, course ${payload.course}, generated!`,
            //         }, ],
            //     })
            // }, 3000)
        },
    })
}

run().catch(console.error)