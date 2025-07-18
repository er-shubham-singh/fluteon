// const express=require("express");
// const authenticate = require("../middleware/authenticat.js");
// const router=express.Router();
// const cartController=require("../controllers/cart.controller.js")

// // GET: /api/cart
// router.get("/", authenticate, cartController.findUserCart);

// // PUT: /api/cart/add
// router.put("/add", authenticate, cartController.addItemToCart);


// module.exports=router;

const express = require("express");
const authenticate = require("../middleware/authenticat.js");
const cartController = require("../controllers/cart.controller.js");

const router = express.Router();

router.get("/", authenticate, cartController.findUserCart);
router.put("/add", authenticate, cartController.addItemToCart);

module.exports = router;
