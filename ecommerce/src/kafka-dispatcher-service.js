import { Kafka, CompressionTypes } from "kafkajs"
import { name } from "../package.json"

/**
 * Kafka connection
 */
const kafka = new Kafka({
    clientId: name,
    // brokers: ["localhost:9094"],
    brokers: ["kafka:9094"],
    retry: {
        initialRetryTime: 300,
        retries: 10,
    },
})

export default async function kafkaDispatcherService(topic, key, value) {
    const producer = kafka.producer()
    await producer.connect()
    return await producer.send({
        topic,
        compression: CompressionTypes.GZIP,
        messages: [{ key, value: JSON.stringify(value) }],
    })
}