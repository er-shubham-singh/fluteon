const { app } = require(".");
const { connectDb } = require("./config/db");

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
//       { label: "S", waist: 28, length: 38 },
//       { label: "M", waist: 30, length: 39 },
//       { label: "L", waist: 32, length: 40 },
//       { label: "XL", waist: 34, length: 41 },
//       { label: "XXL", waist: 36, length: 42 }
//     ]
//   },
//   {
//     category: "cotton_pants",
//     sizes: [
//       { label: "S", waist: 28, length: 37 },
//       { label: "M", waist: 30, length: 38 },
//       { label: "L", waist: 32, length: 39 },
//       { label: "XL", waist: 34, length: 40 },
//       { label: "XXL", waist: 36, length: 41 }
//     ]
//   },
//   {
//     category: "linen_pants",
//     sizes: [
//       { label: "S", waist: 28, length: 36 },
//       { label: "M", waist: 30, length: 37 },
//       { label: "L", waist: 32, length: 38 },
//       { label: "XL", waist: 34, length: 39 },
//       { label: "XXL", waist: 36, length: 40 }
//     ]
//   },
//   {
//     category: "cargos",
//     sizes: [
//       { label: "S", waist: 28, length: 38 },
//       { label: "M", waist: 30, length: 39 },
//       { label: "L", waist: 32, length: 40 },
//       { label: "XL", waist: 34, length: 41 },
//       { label: "XXL", waist: 36, length: 42 }
//     ]
//   },
//   {
//     category: "track_pants",
//     sizes: [
//       { label: "S", waist: 26, length: 38 },
//       { label: "M", waist: 28, length: 39 },
//       { label: "L", waist: 30, length: 40 },
//       { label: "XL", waist: 32, length: 41 },
//       { label: "XXL", waist: 34, length: 42 }
//     ]
//   },
//   {
//     category: "jeans",
//     sizes: [
//       { label: "S", waist: 28, length: 38 },
//       { label: "M", waist: 30, length: 39 },
//       { label: "L", waist: 32, length: 40 },
//       { label: "XL", waist: 34, length: 41 },
//       { label: "XXL", waist: 36, length: 42 }
//     ]
//   },
//   {
//     category: "formal_shirts",
//     sizes: [
//       { label: "S", bust: 36, waist: 32, length: 27 },
//       { label: "M", bust: 38, waist: 34, length: 28 },
//       { label: "L", bust: 40, waist: 36, length: 29 },
//       { label: "XL", bust: 42, waist: 38, length: 30 },
//       { label: "XXL", bust: 44, waist: 40, length: 31 }
//     ]
//   },
//   {
//     category: "satin_shirts",
//     sizes: [
//       { label: "S", bust: 36, waist: 32, length: 26 },
//       { label: "M", bust: 38, waist: 34, length: 27 },
//       { label: "L", bust: 40, waist: 36, length: 28 },
//       { label: "XL", bust: 42, waist: 38, length: 29 },
//       { label: "XXL", bust: 44, waist: 40, length: 30 }
//     ]
//   },
//   {
//     category: "hidden_button_shirts",
//     sizes: [
//       { label: "S", bust: 35, waist: 31, length: 27 },
//       { label: "M", bust: 37, waist: 33, length: 28 },
//       { label: "L", bust: 39, waist: 35, length: 29 },
//       { label: "XL", bust: 41, waist: 37, length: 30 },
//       { label: "XXL", bust: 43, waist: 39, length: 31 }
//     ]
//   },
//   {
//     category: "tanic_tops",
//     sizes: [
//       { label: "S", bust: 34, waist: 30, length: 24 },
//       { label: "M", bust: 36, waist: 32, length: 25 },
//       { label: "L", bust: 38, waist: 34, length: 26 },
//       { label: "XL", bust: 40, waist: 36, length: 27 },
//       { label: "XXL", bust: 42, waist: 38, length: 28 }
//     ]
//   },
//   {
//     category: "tank_tops",
//     sizes: [
//       { label: "S", bust: 32, waist: 28, length: 22 },
//       { label: "M", bust: 34, waist: 30, length: 23 },
//       { label: "L", bust: 36, waist: 32, length: 24 },
//       { label: "XL", bust: 38, waist: 34, length: 25 },
//       { label: "XXL", bust: 40, waist: 36, length: 26 }
//     ]
//   },
//   {
//     category: "peplum_tops",
//     sizes: [
//       { label: "S", bust: 34, waist: 28, hips: 36, length: 25 },
//       { label: "M", bust: 36, waist: 30, hips: 38, length: 26 },
//       { label: "L", bust: 38, waist: 32, hips: 40, length: 27 },
//       { label: "XL", bust: 40, waist: 34, hips: 42, length: 28 },
//       { label: "XXL", bust: 42, waist: 36, hips: 44, length: 29 }
//     ]
//   },
//   {
//     category: "crop_tops",
//     sizes: [
//       { label: "S", bust: 32, waist: 26, length: 16 },
//       { label: "M", bust: 34, waist: 28, length: 17 },
//       { label: "L", bust: 36, waist: 30, length: 18 },
//       { label: "XL", bust: 38, waist: 32, length: 19 },
//       { label: "XXL", bust: 40, waist: 34, length: 20 }
//     ]
//   },
//   {
//     category: "office_wear_kurtis",
//     sizes: [
//       { label: "S", bust: 36, waist: 32, hips: 38, length: 44 },
//       { label: "M", bust: 38, waist: 34, hips: 40, length: 45 },
//       { label: "L", bust: 40, waist: 36, hips: 42, length: 46 },
//       { label: "XL", bust: 42, waist: 38, hips: 44, length: 47 },
//       { label: "XXL", bust: 44, waist: 40, hips: 46, length: 48 }
//     ]
//   },
//   {
//     category: "a_line_kurtis",
//     sizes: [
//       { label: "S", bust: 36, waist: 32, hips: 40, length: 46 },
//       { label: "M", bust: 38, waist: 34, hips: 42, length: 47 },
//       { label: "L", bust: 40, waist: 36, hips: 44, length: 48 },
//       { label: "XL", bust: 42, waist: 38, hips: 46, length: 49 },
//       { label: "XXL", bust: 44, waist: 40, hips: 48, length: 50 }
//     ]
//   },
//   {
//     category: "kalamkari",
//     sizes: [
//       { label: "S", bust: 35, waist: 31, hips: 39, length: 45 },
//       { label: "M", bust: 37, waist: 33, hips: 41, length: 46 },
//       { label: "L", bust: 39, waist: 35, hips: 43, length: 47 },
//       { label: "XL", bust: 41, waist: 37, hips: 45, length: 48 },
//       { label: "XXL", bust: 43, waist: 39, hips: 47, length: 49 }
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