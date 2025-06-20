const express = require('express');
const paymentController = require('../Controllers/PaymentController');
const authMiddleware = require('../Utili/AuthMiddelware');

const router = express.Router();

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  paymentController.stripeWebhook
);

router
  .route('/')
  .post(authMiddleware.protect, paymentController.createPayment)
  .get(authMiddleware.protect, paymentController.getAllPayments);

router
  .route('/:id')
  .get(authMiddleware.protect, paymentController.getPayment)
  .patch(authMiddleware.protect, paymentController.updatePayment)
  .delete(authMiddleware.protect, paymentController.deletePayment);

module.exports = router;
