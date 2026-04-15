const express = require("express");
const router = express.Router();

// Import your VodaPay service (adjust path if needed)
const vodapayService = require("../services/vodapayService");

/**
 * Ecwid webhook handler
 * Triggered when an order is placed
 */
router.post("/ecwid-order", async (req, res) => {
  try {
    const order = req.body;

    console.log("Ecwid Order Received:", order);

    const orderId = order.id;
    const amount = order.total;
    const email = order.email;

    if (!orderId || !amount) {
      return res.status(400).json({
        error: "Missing order data"
      });
    }

    // STEP 1: create VodaPay payment session
    const paymentSession = await vodapayService.createPayment({
      orderId,
      amount,
      email
    });

    console.log("VodaPay session created:", paymentSession);

    // STEP 2: return redirect URL to Ecwid
    return res.json({
      paymentUrl: paymentSession.redirectUrl
    });

  } catch (err) {
    console.error("Webhook error:", err);

    return res.status(500).json({
      error: "Webhook failed"
    });
  }
});

module.exports = router;
