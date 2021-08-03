import kafkaService from "./kafka-service"

async function run() {
    kafkaService("antifraud-group", "ECOMMERCE_NEW_ORDER", parse)
}

async function parse({ topic, partition, message }) {
    const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
    console.log(`- ${prefix} ${message.key}#${message.value}`)
    await new Promise((resolve) => setTimeout(resolve, 5000))
    console.log("Antifraud checked")
}

run().catch(console.error)