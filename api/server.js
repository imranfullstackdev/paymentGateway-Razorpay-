const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());
const Razorpay = require("razorpay");
const shortid = require("shortid");

var razorpay = new Razorpay({
  key_id: "rzp_test_EijUUOTqaGBUXs",
  key_secret: "xCeSqTdE6THc93Jgq4z1KSJk",
});
app.get("/logo", (req, res) =>
  res.sendFile(path.join(__dirname, "./logo.png"))
);
app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";
  const options = {
    amount: amount * 100,
    currency: currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
        id:response.id,
        currency:response.currency,
        amount:response.amount

    });
  } catch {
    console.log("gfhdfdh");
  }
});
app.listen(8000,()=>{
  console.log('listening on the port at 8000');
})