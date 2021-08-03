import { Kafka } from "kafkajs"
import { name } from "../package.json"

/**
 * Kafka connection
 */
const kafka = new Kafka({
    clientId: name,
    brokers: ["kafka:9094"],
})

export default async function kafkaService(groupId, topic, parse) {
    const consumer = kafka.consumer({ groupId: groupId })
    await consumer.connect()
    await consumer.subscribe({ topic })
    await consumer.run({ eachMessage: parse })
}