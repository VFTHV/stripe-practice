const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    // here you need to check price of each item against values in database
    // and eventually calculate total amount
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntent.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
  });
  console.log(paymentIntent);
  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
