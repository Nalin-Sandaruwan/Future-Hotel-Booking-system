const Payment = require('../Models/Payment');
const Booking = require('../Models/Booking');
const CatchAsync = require('../Utili/CatchAsync');
const AppError = require('../Utili/AppError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a new payment using Stripe Checkout Session
exports.createPayment = CatchAsync(async (req, res, next) => {
  const { bookingId, amount } = req.body;

  // Verify booking exists
  const booking = await Booking.findById(bookingId);
  // if (!booking) {
  //   return next(new AppError('No booking found with that ID', 404));
  // }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'lkr',
          product_data: {
            name: 'Hotel Booking',
          },
          unit_amount: amount * 100, // Amount in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/success`, // Replace with your success URL
    cancel_url: `${req.protocol}://${req.get('host')}/cancel`, // Replace with your cancel URL
    client_reference_id: bookingId,
  });

  res.status(200).json({
    status: 'success',
    data: {
      allData :session,
      sessionId: session.id,
      url: session.url,
    },
    
  });
  // {"status":"success","data":{"allData":{"id":"cs_test_a1n96Pq9TIAOR4cTRLdXyrmJcE6Q4Atqhu0lHwyDOfUsyfFCQqGY6nY9VO","object":"checkout.session","adaptive_pricing":{"enabled":true},"after_expiration":null,"allow_promotion_codes":null,"amount_subtotal":500000,"amount_total":500000,"automatic_tax":{"enabled":false,"liability":null,"provider":null,"status":null},"billing_address_collection":null,"cancel_url":"http://127.0.0.1:3000/cancel","client_reference_id":"614f3ef5a6d34b001f1c441c","client_secret":null,"collected_information":null,"consent":null,"consent_collection":null,"created":1750436570,"currency":"lkr","currency_conversion":null,"custom_fields":[],"custom_text":{"after_submit":null,"shipping_address":null,"submit":null,"terms_of_service_acceptance":null},"customer":null,"customer_creation":"if_required","customer_details":null,"customer_email":null,"discounts":[],"expires_at":1750522970,"invoice":null,"invoice_creation":{"enabled":false,"invoice_data":{"account_tax_ids":null,"custom_fields":null,"description":null,"footer":null,"issuer":null,"metadata":{},"rendering_options":null}},"livemode":false,"locale":null,"metadata":{},"mode":"payment","payment_intent":null,"payment_link":null,"payment_method_collection":"if_required","payment_method_configuration_details":null,"payment_method_options":{"card":{"request_three_d_secure":"automatic"}},"payment_method_types":["card"],"payment_status":"unpaid","permissions":null,"phone_number_collection":{"enabled":false},"recovered_from":null,"saved_payment_method_options":null,"setup_intent":null,"shipping_address_collection":null,"shipping_cost":null,"shipping_options":[],"status":"open","submit_type":null,"subscription":null,"success_url":"http://127.0.0.1:3000/success","total_details":{"amount_discount":0,"amount_shipping":0,"amount_tax":0},"ui_mode":"hosted","url":"https://checkout.stripe.com/c/pay/cs_test_a1n96Pq9TIAOR4cTRLdXyrmJcE6Q4Atqhu0lHwyDOfUsyfFCQqGY6nY9VO#fidkdWxOYHwnPyd1blpxYHZxWjA0V2YyTmtUQFE9bDQzc09yV2ppaEdXNXJySlZ8QmlyMmBEMTBSSUIzRE4xSTZcfVxsd2pHMEk3VUN8X09TUW5nU1JfY250TH1QfXViZG00XX9SYmdsaDd3NTV%2FREZcfU9HTScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl","wallet_options":null},"sessionId":"cs_test_a1n96Pq9TIAOR4cTRLdXyrmJcE6Q4Atqhu0lHwyDOfUsyfFCQqGY6nY9VO","url":"https://checkout.stripe.com/c/pay/cs_test_a1n96Pq9TIAOR4cTRLdXyrmJcE6Q4Atqhu0lHwyDOfUsyfFCQqGY6nY9VO#fidkdWxOYHwnPyd1blpxYHZxWjA0V2YyTmtUQFE9bDQzc09yV2ppaEdXNXJySlZ8QmlyMmBEMTBSSUIzRE4xSTZcfVxsd2pHMEk3VUN8X09TUW5nU1JfY250TH1QfXViZG00XX9SYmdsaDd3NTV%2FREZcfU9HTScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"}}
});

exports.stripeWebhook = CatchAsync(async (req, res, next) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const bookingId = session.client_reference_id;
    const paymentIntent = session.payment_intent;

    await Payment.create({
      bookingId: bookingId,
      amount: session.amount_total / 100,
      paymentMethod: 'card',
      transactionId: paymentIntent,
      paymentStatus: 'completed',
    });

    // Update booking status if needed
    await Booking.findByIdAndUpdate(bookingId, { paymentStatus: 'completed' });
  }

  res.status(200).json({ received: true });
});

// Get a specific payment
exports.getPayment = CatchAsync(async (req, res, next) => {
  const payment = await Payment.findById(req.params.id);

  if (!payment) {
    return next(new AppError('No payment found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      payment,
    },
  });
});

// Get all payments
exports.getAllPayments = CatchAsync(async (req, res, next) => {
  const payments = await Payment.find();

  res.status(200).json({
    status: 'success',
    results: payments.length,
    data: {
      payments,
    },
  });
});

// Update a payment
exports.updatePayment = CatchAsync(async (req, res, next) => {
  const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!payment) {
    return next(new AppError('No payment found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      payment,
    },
  });
});

// Delete a payment
exports.deletePayment = CatchAsync(async (req, res, next) => {
  const payment = await Payment.findByIdAndDelete(req.params.id);

  if (!payment) {
    return next(new AppError('No payment found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
