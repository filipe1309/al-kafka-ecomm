import express from "express"
import { CompressionTypes } from "kafkajs"

const routes = express.Router()

routes.post("/new-order", async(req, res) => {
    const topic = "ECOMMERCE_NEW_ORDER" //req.topic
    const message = "123,456,789" // req.message

    // Call micro service
    const result = await req.producer.send({
        topic,
        compression: CompressionTypes.GZIP,
        messages: [{ value: JSON.stringify(message) }],
    })

    return res.json({ ok: true, result })
})

export default routes