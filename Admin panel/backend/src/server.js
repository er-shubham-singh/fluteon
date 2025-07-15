const { app } = require(".");
const { connectDb } = require("./config/db");
const couponModel = require("./models/coupon.model");

const PORT=8000;
app.listen(PORT,async ()=>{
    await connectDb()
    console.log("ecommerce api listing on port ",PORT)
})



// const { app } = require(".");
// const { connectDb } = require("./config/db");
// const sizeChart = require("../src/models/sizeChart")
// const mongoDbUrl = process.env.MONGODB_NAME;
// const mongoose = require("mongoose")
// const PORT=8000;
// // app.listen(PORT,async ()=>{
// //     await connectDb()
// //     console.log("ecommerce api listing on port ",PORT)
// // })


// const dummySizeCharts = [
//   {
//     category: "formal_pants",
//     sizes: [
//       { label: "S", waist: 26, },
//       { label: "M", waist: 28, },
//       { label: "L", waist: 30, },
//       { label: "XL", waist: 32, },
//       { label: "XXL", waist: 34, },
//       { label: "3XL", waist: 36, },
//       { label: "4XL", waist: 38, },
//       { label: "5XL", waist: 40, }
//     ]
//   },
//   {
//     category: "cotton_pants",
//     sizes: [
//       { label: "S", waist: 26, },
//       { label: "M", waist: 28, },
//       { label: "L", waist: 30, },
//       { label: "XL", waist: 32, },
//       { label: "XXL", waist: 34, },
//       { label: "3XL", waist: 36, },
//       { label: "4XL", waist: 38, },
//       { label: "5XL", waist: 40, }
//     ]
//   },
//   {
//     category: "linen_pants",
//     sizes: [
//       { label: "S", waist: 26, },
//       { label: "M", waist: 28, },
//       { label: "L", waist: 30, },
//       { label: "XL", waist: 32, },
//       { label: "XXL", waist: 34, },
//       { label: "3XL", waist: 36, },
//       { label: "4XL", waist: 38, },
//       { label: "5XL", waist: 40, }
//     ]
//   },
//   {
//     category: "cargos",
//     sizes: [
//       { label: "S", waist: 26, },
//       { label: "M", waist: 28, },
//       { label: "L", waist: 30, },
//       { label: "XL", waist: 32, },
//       { label: "XXL", waist: 34, },
//       { label: "3XL", waist: 36, },
//       { label: "4XL", waist: 38, },
//       { label: "5XL", waist: 40, }
//     ]
//   },
//   {
//     category: "track_pants",
//     sizes: [
//       { label: "S", waist: 26, },
//       { label: "M", waist: 28, },
//       { label: "L", waist: 30, },
//       { label: "XL", waist: 32, },
//       { label: "XXL", waist: 34, },
//       { label: "3XL", waist: 36, },
//       { label: "4XL", waist: 38, },
//       { label: "5XL", waist: 40, }
//     ]
//   },
// {
//   category: "blazers",
//   sizes: [
//     { label: "S", bust: 34, shoulder: 14 },
//     { label: "M", bust: 36, shoulder: 14.5 },
//     { label: "L", bust: 38, shoulder: 15 },
//     { label: "XL", bust: 40, shoulder: 15.5 },
//     { label: "XXL", bust: 42, shoulder: 16 },
//     { label: "3XL", bust: 44, shoulder: 16.5 },
//     { label: "4XL", bust: 46, shoulder: 17 },
//     { label: "5XL", bust: 48, shoulder: 17.5 }
//   ]
// },
// {
//   category: "blazers_sets",
//   sizes: [
//     { label: "S", bust: 34, shoulder: 14, waist: 26, hip: 36 },
//     { label: "M", bust: 36, shoulder: 14.5, waist: 28, hip: 38 },
//     { label: "L", bust: 38, shoulder: 15, waist: 30, hip: 40 },
//     { label: "XL", bust: 40, shoulder: 15.5, waist: 32, hip: 42 },
//     { label: "XXL", bust: 42, shoulder: 16, waist: 34, hip: 44 },
//     { label: "3XL", bust: 44, shoulder: 16.5, waist: 36, hip: 46 },
//     { label: "4XL", bust: 46, shoulder: 17, waist: 38, hip: 48 },
//     { label: "5XL", bust: 48, shoulder: 17.5, waist: 40, hip: 50 }
//   ]
// },

//   {
//     category: "jeans",
//     sizes: [
//        { label: "S", waist: 26, },
//       { label: "M", waist: 28, },
//       { label: "L", waist: 30, },
//       { label: "XL", waist: 32, },
//       { label: "XXL", waist: 34, },
//       { label: "3XL", waist: 36, },
//       { label: "4XL", waist: 38, },
//       { label: "5XL", waist: 40, }
//     ]
//   },
//   {
//     category: "formal_shirts",
//     sizes: [
//       { label: "S", bust: 36, waist: 32, },
//       { label: "M", bust: 38, waist: 34, },
//       { label: "L", bust: 40, waist: 36, },
//       { label: "XL", bust: 42, waist: 38, },
//       { label: "2XL", bust: 44, waist: 40, },
//       { label: "3XL", bust: 46, waist: 42, },
//       { label: "4XL", bust: 48, waist: 44, },
//       { label: "5XL", bust: 50, waist: 46, }
//     ]
//   },
//   {
//     category: "satin_shirts",
//     sizes: [
//       { label: "S", bust: 36, waist: 32, },
//       { label: "M", bust: 38, waist: 34, },
//       { label: "L", bust: 40, waist: 36, },
//       { label: "XL", bust: 42, waist: 38, },
//       { label: "2XL", bust: 44, waist: 40, },
//       { label: "3XL", bust: 46, waist: 42, },
//       { label: "4XL", bust: 48, waist: 44, },
//       { label: "5XL", bust: 50, waist: 46, }
//     ]
//   },
//   {
//     category: "hidden_button_shirts",
//     sizes: [
//       { label: "S", bust: 36, waist: 32, },
//       { label: "M", bust: 38, waist: 34, },
//       { label: "L", bust: 40, waist: 36, },
//       { label: "XL", bust: 42, waist: 38, },
//       { label: "2XL", bust: 44, waist: 40, },
//       { label: "3XL", bust: 46, waist: 42, },
//       { label: "4XL", bust: 48, waist: 44, },
//       { label: "5XL", bust: 50, waist: 46, }
//     ]
//   },
//   {
//     category: "tunic_tops",
//     sizes: [
//       { label: "S", bust: 36, waist: 32, },
//       { label: "M", bust: 38, waist: 34, },
//       { label: "L", bust: 40, waist: 36, },
//       { label: "XL", bust: 42, waist: 38, },
//       { label: "2XL", bust: 44, waist: 40, },
//       { label: "3XL", bust: 46, waist: 42, },
//       { label: "4XL", bust: 48, waist: 44, },
//       { label: "5XL", bust: 50, waist: 46, }
//     ]
//   },
//   {
//     category: "tank_tops",
//     sizes: [

//     ]
//   },
//   {
//     category: "peplum_tops",
//     sizes: [
//       { label: "S", bust: 36, waist: 32, },
//       { label: "M", bust: 38, waist: 34, },
//       { label: "L", bust: 40, waist: 36, },
//       { label: "XL", bust: 42, waist: 38, },
//       { label: "2XL", bust: 44, waist: 40, },
//       { label: "3XL", bust: 46, waist: 42, },
//       { label: "4XL", bust: 48, waist: 44, },
//       { label: "5XL", bust: 50, waist: 46, }
    
//     ]
//   },
//   {
//     category: "crop_tops",
//     sizes: [
//       { label: "S", bust: 36, waist: 32, },
//       { label: "M", bust: 38, waist: 34, },
//       { label: "L", bust: 40, waist: 36, },
//       { label: "XL", bust: 42, waist: 38, },
//       { label: "2XL", bust: 44, waist: 40, },
//       { label: "3XL", bust: 46, waist: 42, },
//       { label: "4XL", bust: 48, waist: 44, },
//       { label: "5XL", bust: 50, waist: 46, }
//     ]
//   },
//   {
//     category: "office_wear_kurtis",
//     sizes: [
//       { label: "S", bust: 36, waist: 32, hips: 38, },
//       { label: "M", bust: 38, waist: 34, hips: 40, },
//       { label: "L", bust: 40, waist: 36, hips: 42, },
//       { label: "XL", bust: 42, waist: 38, hips: 44, },
//       { label: "XXL", bust: 44, waist: 40, hips: 46, },
//       { label: "3XL", bust: 46, waist: 42, hips: 48, },
//       { label: "4XL", bust: 48, waist: 44, hips: 50, },
//       { label: "5XL", bust: 50, waist: 48, hips: 52, },


//     ]
//   },
//   {
//     category: "a_line_kurtis",
//     sizes: [
//       { label: "S", bust: 36, waist: 32, hips: 38, },
//       { label: "M", bust: 38, waist: 34, hips: 40, },
//       { label: "L", bust: 40, waist: 36, hips: 42, },
//       { label: "XL", bust: 42, waist: 38, hips: 44, },
//       { label: "XXL", bust: 44, waist: 40, hips: 46, },
//       { label: "3XL", bust: 46, waist: 42, hips: 48, },
//       { label: "4XL", bust: 48, waist: 44, hips: 50, },
//       { label: "5XL", bust: 50, waist: 48, hips: 52, },
//     ]
//   },
//   {
//     category: "kalamkari",
//     sizes: [
//       { label: "S", bust: 36, waist: 32, hips: 38, },
//       { label: "M", bust: 38, waist: 34, hips: 40, },
//       { label: "L", bust: 40, waist: 36, hips: 42, },
//       { label: "XL", bust: 42, waist: 38, hips: 44, },
//       { label: "XXL", bust: 44, waist: 40, hips: 46, },
//       { label: "3XL", bust: 46, waist: 42, hips: 48, },
//       { label: "4XL", bust: 48, waist: 44, hips: 50, },
//       { label: "5XL", bust: 50, waist: 48, hips: 52, },
//     ]
//   }
// ];


// mongoose.connect(mongoDbUrl,{
//     useNewUrlPArser:true,
//     useUnifiedTopology:true
// })
//     .then(async()=>{
//         console.log("mongo db connected" )
//         await sizeChart.deleteMany()
//         await sizeChart.insertMany(dummySizeCharts);
//         console.log("size chart inserted")
//         process.exit()
//     })
//     .catch((err)=>{
//         console.log("error",err)
//         process.exit(1)
//     })




// To inser dummy code

// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();

// const Coupon = require("./models/coupon.model"); // make sure path is correct

// const mongoDbUrl = process.env.MONGODB_NAME;

// const seedCoupons = async () => {
//   const coupons = [
//     {
//       code: "Fluteon100",
//       discountType: "flat",
//       discountValue: 100,
//       minOrderAmount: 500,
//       usageLimit: 100,
//       expiresAt: new Date("2025-12-31"),
//     },
//     {
//       code: "Fluteon200",
//       discountType: "flat",
//       discountValue: 200,
//       maxDiscountAmount: 200,
//       minOrderAmount: 1000,
//       usageLimit: 50,
//       expiresAt: new Date("2025-10-01"),
//     },
//   ];

//   for (let coupon of coupons) {
//     const exists = await Coupon.findOne({ code: coupon.code });
//     if (!exists) {
//       await new Coupon(coupon).save();
//       console.log(`✅ Inserted: ${coupon.code}`);
//     } else {
//       console.log(`⚠️ Already exists: ${coupon.code}`);
//     }
//   }
// };

// mongoose
//   .connect(mongoDbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(async () => {
//     console.log("✅ MongoDB connected");
//     console.log("📦 Seeding coupons...");
//     await seedCoupons();
//     console.log("🎉 Done seeding coupons!");
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   });
