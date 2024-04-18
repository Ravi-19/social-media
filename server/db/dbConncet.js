const mongoose = require('mongoose') ; 


const dbConnect = async() => {
   // const mongoUri  = process.env.MONGODB_URI;
    const mongoUri  = `mongodb+srv://ravishekhawatofficial:AXRaiLwyLLu4LXcP@cluster0.8hneive.mongodb.net/`;
    console.log("mongo uri " , mongoUri) ; 
    try {
        const connectionInstance = await mongoose.connect(mongoUri) ; 
        console.log(`mongo DB connected !! DB HOST : ${connectionInstance.connection.host}`) ;        
    } catch (error) {
        console.log(`DB error : ${error}`) ; 
        process.exit(1) ; 
    }
}
module.exports = dbConnect; 