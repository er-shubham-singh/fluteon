const express=require("express");
const authenticate = require("../middleware/authenticat.js");
const router=express.Router();
const paymentController=require("../controllers/payment.controller.js");

router.post("/:id",authenticate,paymentController.createPaymentLink);
router.get("/",authenticate,paymentController.updatePaymentInformation);
router.get("/payment-history/:userId", paymentController.getUserPaymentHistory);
module.exports=router;