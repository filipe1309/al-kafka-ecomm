import kafkaService from "./kafka-service"

async function run() {
    kafkaService("log-group", /ECOMMERCE.*/i, parse)
}

async function parse({ topic, partition, message }) {
    const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
    console.log(`- ${prefix} ${message.key}#${message.value}`)
    console.log("Logged")
}

run().catch(console.error)