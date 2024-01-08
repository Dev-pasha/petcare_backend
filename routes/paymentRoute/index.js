const express = require("express");
const router = express.Router();
const env = require('dotenv').config({ path: './.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


router.get('/getPublishableKey', async (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISH_KEY
    });
});



router.post('/create-payment-intent', async (req, res) => {
    const { paymentMethodType, currency, amount } = req.body;
    console.log("here ", req.body)
    // Create a PaymentIntent with the order amount and currency
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(amount) * 100,
            currency: currency,
            payment_method_types: [paymentMethodType],
        });

        console.log(paymentIntent)

        res.send({
            client_secret: paymentIntent.client_secret
        });

    } catch (error) {
        res.send({
            error: error.message
        });

    }
});

module.exports = router;
