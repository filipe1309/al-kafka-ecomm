import { kafkaConsumer } from "common-kafka"

async function run() {
    kafkaConsumer("log-group", /ECOMMERCE.*/i, parse)
}

async function parse({ topic, partition, message }) {
    const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
    console.log(`- ${prefix} ${message.key}#${message.value}`)
    console.log("Logged")
}

run().catch(console.error)