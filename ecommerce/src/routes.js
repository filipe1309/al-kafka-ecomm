import express from "express"
import { v4 as uuidv4 } from "uuid"
import Email from "./email"
import { kafkaProducer } from "common-kafka"
import Order from "./order"

const routes = express.Router()

routes.post("/new-order", async(req, res) => {
    const userId = uuidv4()
    const orderId = uuidv4()
    const order = new Order(userId, orderId, Math.floor(Math.random() * 5000 + 1))

    const resultNewOrderEvent = await kafkaProducer(
        "ECOMMERCE_NEW_ORDER",
        userId,
        JSON.stringify(order)
    )

    const email = new Email(
        "Thank You",
        "Thank you for your order! We are processing your order"
    )
    const resultSendEmailEvent = await kafkaProducer(
        "ECOMMERCE_SEND_EMAIL",
        userId,
        email
    )

    return res.json({ ok: true, resultNewOrderEvent, resultSendEmailEvent })
})

export default routes