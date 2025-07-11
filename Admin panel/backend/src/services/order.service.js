const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItem = require("../models/orderItems.js");
const cartService = require("../services/cart.service.js");
const CartItem = require("../models/cartItem.model.js");
const mongoose = require("mongoose");
const { sendOrderConfirmationEmail } = require("../config/mailer.js");

// async function createOrder(user, shippAddress) {
//   let address;
//   if (shippAddress._id) {
//     let existedAddress = await Address.findById(shippAddress._id);
//     address = existedAddress;
//   } else {
//     address = new Address(shippAddress);
//     address.user = user;
//     await address.save();

//     user.addresses.push(address);
//     await user.save();
//   }

//   const cart = await cartService.findUserCart(user._id);
//   const orderItems = [];
//   const orderedProductIds = [];

//   for (const item of cart.cartItems) {
//     const orderItem = new OrderItem({
//       price: item.price,
//       product: item.product,
//       quantity: item.quantity,
//       size: item.size,
//       userId: item.userId,
//       discountedPrice: item.discountedPrice,
//     });

//     const createdOrderItem = await orderItem.save();
//     orderItems.push(createdOrderItem);
//     orderedProductIds.push(item.product._id.toString());
//   }

//   const createdOrder = new Order({
//     user,
//     orderItems,
//     totalPrice: cart.totalPrice,
//     totalDiscountedPrice: cart.totalDiscountedPrice,
//     discounte: cart.discounte,
//     totalItem: cart.totalItem,
//     shippingAddress: address,
//     orderDate: new Date(),
//     orderStatus: "PENDING",
//     "paymentDetails.status": "PENDING",
//     createdAt: new Date(),
//   });

//   const savedOrder = await createdOrder.save();

//   return savedOrder;
// }

// async function placedOrder(orderId) {
//   const order = await findOrderById(orderId);

//   // Do NOT update orderStatus here. Let it remain "PENDING"
// order.paymentDetails.paymentStatus = "COMPLETED"; // ✅ use correct key name
//   order.statusUpdatedAt = new Date();

//   const updatedOrder = await order.save();

//   // Send confirmation email after successful order placement and payment
//   if (updatedOrder?.user?.email) {
//     await sendOrderConfirmationEmail(updatedOrder.user.email, updatedOrder);
//   }

//   return updatedOrder;
// }

async function createOrder(user, shippAddress) {
  let address;
  if (shippAddress._id) {
    address = await Address.findById(shippAddress._id);
  } else {
    address = new Address(shippAddress);
    address.user = user;
    await address.save();
    user.addresses.push(address);
    await user.save();
  }

  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];
  const orderedProductIds = [];

  for (const item of cart.cartItems) {
    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });

    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
    orderedProductIds.push(item.product._id.toString());
  }

  // ✅ Create the order (status is PENDING, but not paid)
  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discounte: cart.discounte,
    totalItem: cart.totalItem,
    shippingAddress: address,
    orderDate: new Date(),
    orderStatus: "PENDING",
    paymentDetails: { paymentStatus: "PENDING" },
    createdAt: new Date(),
  });

  const savedOrder = await createdOrder.save();

  // ❌ DO NOT REMOVE CART ITEMS here — only after payment is done!
  return savedOrder; // this will give you order._id
}

// async function placedOrder(orderId) {
//   const order = await findOrderById(orderId);

//   if (!order) throw new Error("Order not found");

//   order.paymentDetails.paymentStatus = "COMPLETED";
//   order.statusUpdatedAt = new Date();
//   order.orderStatus = "CONFIRMED"; // ✅ Set CONFIRMED on payment

//   const updatedOrder = await order.save();

//   // ✅ Remove purchased items from cart after payment success
//   const productIds = order.orderItems.map((item) => item.product._id);
//   await CartItem.deleteMany({
//     userId: order.user._id,
//     product: { $in: productIds },
//   });

//   // ✅ Send order confirmation email
//   if (updatedOrder?.user?.email) {
//     await sendOrderConfirmationEmail(updatedOrder.user.email, updatedOrder);
//   }

//   return updatedOrder;
// }


// by gpt

async function placedOrder(orderId, paymentMeta = {}) {
  const order = await findOrderById(orderId);
  if (!order) throw new Error("Order not found");

  // ✅ Apply payment meta if provided
  if (paymentMeta.paymentId) order.paymentDetails.paymentId = paymentMeta.paymentId;
  if (paymentMeta.method) order.paymentDetails.paymentMethod = paymentMeta.method;
  if (paymentMeta.transactionId) order.paymentDetails.transactionId = paymentMeta.transactionId;

  order.paymentDetails.paymentStatus = "COMPLETED";
  order.statusUpdatedAt = new Date();
  order.orderStatus = "CONFIRMED";

  const updatedOrder = await order.save();

  // ✅ Clear cart items after payment success
  const productIds = order.orderItems.map((item) => item.product._id);
  await CartItem.deleteMany({
    userId: order.user._id,
    product: { $in: productIds },
  });

  // ✅ Send order confirmation email
  if (updatedOrder?.user?.email) {
    await sendOrderConfirmationEmail(updatedOrder.user.email, updatedOrder);
  }

  return updatedOrder;
}


async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIRMED";
  order.statusUpdatedAt = new Date();
  return await order.save();
}

async function shipOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "SHIPPED";
  order.statusUpdatedAt = new Date();
  return await order.save();
}

async function outForDelivery(orderId) {
  const order = await findOrderById(orderId);

  if (!order) {
    throw new Error("Order not found with ID: " + orderId);
  }

  order.orderStatus = "OUTFORDELIVERY";
  order.statusUpdatedAt = new Date();
  return await order.save();
}


async function deliveredOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "DELIVERED";
  order.statusUpdatedAt = new Date();
  return await order.save();
}

async function cancelledOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CANCELLED";
  order.statusUpdatedAt = new Date();
  return await order.save();
}


async function returnOrder(orderId, reason = "", description = "", imageUrls = []) {
  const order = await findOrderById(orderId);
  if (!order) throw new Error("Order not found with ID: " + orderId);

  if (order.orderStatus !== "DELIVERED") {
    throw new Error("Only delivered orders can be returned.");
  }

  order.orderStatus = "RETURNED_REQUESTED";
  order.statusUpdatedAt = new Date();
  order.returnRequestedAt = new Date();

  if (reason) order.returnReason = reason;
  if (description) order.returnDescription = description;
  if (imageUrls.length > 0) order.returnImages = imageUrls;

  const updatedOrder = await order.save();
  return updatedOrder;
}


async function approveReturnByAdmin(orderId, status, adminNote, rejectionMessage, returnTime)
 {
  const order = await findOrderById(orderId);
  if (!order) throw new Error("Order not Found with Id : " + orderId);

  if (order.orderStatus !== "RETURNED_REQUESTED") {
    throw new Error("Only requested returns can be handled.");
  }

if (status === "RETURN_APPROVED") {
  order.orderStatus = "RETURNED";
  order.returnApprovedAt = new Date();
   order.returnTime = returnTime;
} else if (status === "RETURN_REJECTED") {
  order.orderStatus = "RETURN_REJECTED";
  order.returnRejectedAt = new Date();
  order.rejectionMessage = rejectionMessage || ""; // ✅ Save it here
} else {
  throw new Error("Invalid return status.");
}


  order.statusUpdatedAt = new Date();

  // 👇 Save this field
order.adminNote = adminNote;
order.statusUpdatedAt = new Date();

  const updatedOrder = await order.save();
  return updatedOrder;
}




async function findOrderById(orderId) {
  console.log("🔍 [findOrderById] Searching for Order with ID:", orderId);

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    console.log("❌ Invalid orderId format:", orderId);
    return null;
  }

  try {
    const order = await Order.findById(orderId)
      .populate("user")
      .populate({ path: "orderItems", populate: { path: "product" } })
      .populate("shippingAddress");

    if (!order) {
      console.log("❌ No order found for ID:", orderId);
    } else {
      console.log("✅ Order found:", order._id);
    }

    return order;
  } catch (error) {
    console.error("🔥 Error in findOrderById:", error.message);
    throw error;
  }
}

const usersOrderHistory = async (userId) => {
  const orders = await Order.find({
    user: userId,
"paymentDetails.paymentStatus": "COMPLETED"
  })
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
      },
    })
    .sort({ createdAt: -1 })
    .lean();

  return orders;
};

// async function getAllOrders() {
//   return await Order.find()
//     .populate("user")
//     .populate("shippingAddress")
//     .populate({
//       path: "orderItems",
//       populate: {
//         path: "product",
//       },
//     })
//     .lean();
// }

// async function getAllOrders() {
//   return await Order.find({ "paymentDetails.paymentStatus": "COMPLETED" }) // ✅ only paid orders
//     .populate("user")
//     .populate("shippingAddress")
//     .populate({
//       path: "orderItems",
//       populate: {
//         path: "product",
//       },
//     })
//     .sort({ createdAt: -1 }) // optional: newest first
//     .lean();
// }


async function getAllOrders(page = 1, pageSize = 10) {
  const skip = (page - 1) * pageSize;

  const query = Order.find({ "paymentDetails.paymentStatus": "COMPLETED" })
    .populate("user")
    .populate("shippingAddress")
    .populate({
      path: "orderItems",
      populate: { path: "product" },
    })
    .sort({ createdAt: -1 });

  const totalOrders = await Order.countDocuments({ "paymentDetails.paymentStatus": "COMPLETED" });
  const totalPages = Math.ceil(totalOrders / pageSize);

  const orders = await query.skip(skip).limit(pageSize).lean();

  return {
    content: orders,
    currentPage: page,
    totalPages,
    totalOrders,
  };
}


async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  if (!order) throw new Error("order not found with id " + orderId);

  await Order.findByIdAndDelete(orderId);
}

module.exports = {
  createOrder,
  placedOrder,
  confirmedOrder,
  shipOrder,
  deliveredOrder,
  cancelledOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
  outForDelivery,
  returnOrder,
  approveReturnByAdmin
};
