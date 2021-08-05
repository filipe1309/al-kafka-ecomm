import { Kafka } from "kafkajs"
import { v4 as uuidv4 } from "uuid"

const name = "kafka-consumer - " + uuidv4()

/**
 * Kafka connection
 */
const kafka = new Kafka({
    clientId: name,
    brokers: ["kafka:9094"],
})

export default async function kafkaConsumer(groupId, topic, parse) {
    const consumer = kafka.consumer({ groupId: groupId })
    await consumer.connect()
    await consumer.subscribe({ topic })
    await consumer.run({ eachMessage: parse })
}