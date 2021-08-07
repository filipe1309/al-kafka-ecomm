import { kafkaConsumer } from "common-kafka"

async function run() {
    kafkaConsumer("email-group", "ECOMMERCE_SEND_EMAIL", parse)
}

async function parse({ topic, partition, message }) {
    const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
    console.log(`- ${prefix} ${message.key}#${message.value}`)
    await new Promise((resolve) => setTimeout(resolve, 5000))
    console.log("Email sent")
}

run().catch(console.error)