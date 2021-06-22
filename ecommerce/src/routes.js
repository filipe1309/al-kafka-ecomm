import express from "express"
import { CompressionTypes } from "kafkajs"

const routes = express.Router()

routes.post("/new-order", async(req, res) => {
    let topic = "ECOMMERCE_NEW_ORDER" //req.topic
    const message = "123,456,789" // req.message

    // Send ECOMMERCE_NEW_ORDER event
    const resultNewOrderEvent = await req.producer.send({
        topic,
        compression: CompressionTypes.GZIP,
        messages: [{ value: JSON.stringify(message) }],
    });

    // Send ECOMMERCE_SEND_EMAIL event
    topic = "ECOMMERCE_SEND_EMAIL" //req.topic
    const email = "Thank you for your order! We are processing your order";
    const resultSendEmailEvent = await req.producer.send({
        topic,
        compression: CompressionTypes.GZIP,
        messages: [{ key: email, value: email }],
    });

    return res.json({ ok: true, resultNewOrderEvent, resultSendEmailEvent })
})

export default routes