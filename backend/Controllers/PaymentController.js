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
  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

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
      sessionId: session.id,
      url: session.url,
    },
  });
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
