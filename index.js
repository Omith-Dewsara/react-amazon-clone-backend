const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JRvZgBB7TaVdvcQ2YIPUfLpEm43hOr5XqLTGuiEEcIyNDQY1Bw1OIYZE7s9klC3QmpvkEmITUamZBrBSgTM8g9A00IUZXZ07O");

const app = express();

//middlewares
app.use(express.json());
app.use(cors({ origin: true }))

const port = process.env.PORT || 5000;

//api routes
app.get("/", (req, res) => {
	res.status(200).send("Hello world");
})

app.post("/payment/create", async (req, res) => {
	const total = req.query.total;
	console.log("Payment request recieved for this amount: ", total / 100);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: 'usd'
	})

	res.status(201).send({
		clientSecret: paymentIntent.client_secret,
	})
})

app.listen(port, () => console.log(`Sever is up and running on PORT ${port}`));
