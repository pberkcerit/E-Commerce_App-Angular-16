const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Basket = require("../models/basket");
const response = require("../services/response.service");
const { v4: uuidv4 } = require("uuid");


//Add Order

router.post("/create", async (req, res) => {
    response(res, async () => {
        const { userId } = req.body;
        let baskets = await Basket.find({ userId: userId });

        for (const basket of baskets) {
            let order = new Order();
            order._id = uuidv4();
            order.productId = basket.productId;
            order.price = basket.price;
            order.quantity = basket.quantity;
            order.userId = userId;
            order.createdDate = new Date();

            await order.save();

            await Basket.findOneAndRemove(basket._id);
        }

        res.json({ message: "Order is successfully created" });
    });
});

//Get Order List

router.post("/", async (req, res) => {
    response(res, async () => {
        const { userId } = req.body;
        let orders = await Order.aggregate([
            {
                $match: { userId: userId }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                }
            }
        ])
            .sort({ createdDate: -1 });
        res.json(orders);
    })
})

module.exports = router;