import express from "express"
import { v4 as uuidv4 } from "uuid"
import kafkaDispatcherService from "./kafka-dispatcher-service"
import Order from "./order"

const routes = express.Router()

routes.post("/new-order", async(req, res) => {
    const userId = uuidv4()
    const orderId = uuidv4()
    const order = new Order(userId, orderId, Math.floor(Math.random() * 100 + 1))

    const resultNewOrderEvent = await kafkaDispatcherService(
        "ECOMMERCE_NEW_ORDER",
        userId,
        JSON.stringify(order)
    )
    const resultSendEmailEvent = await kafkaDispatcherService(
        "ECOMMERCE_SEND_EMAIL",
        userId,
        "Thank you for your order! We are processing your order"
    )

    return res.json({ ok: true, resultNewOrderEvent, resultSendEmailEvent })
})

export default routes