import express from "express"
import { v4 as uuidv4 } from "uuid"
import kafkaDispatcherService from "./kafka-dispatcher-service"

const routes = express.Router()

routes.post("/new-order", async(req, res) => {
    const key = uuidv4()

    const resultNewOrderEvent = await kafkaDispatcherService(
        "ECOMMERCE_NEW_ORDER",
        key,
        "123,456,789"
    )
    const resultSendEmailEvent = await kafkaDispatcherService(
        "ECOMMERCE_SEND_EMAIL",
        key,
        "Thank you for your order! We are processing your order"
    )

    return res.json({ ok: true, resultNewOrderEvent, resultSendEmailEvent })
})

export default routes