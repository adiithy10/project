const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        
        const atlasURI = "mongodb://adithy:I85iFoURa37MNIqd@ac-qylz4c5-shard-00-00.fvyskw9.mongodb.net:27017,ac-qylz4c5-shard-00-01.fvyskw9.mongodb.net:27017,ac-qylz4c5-shard-00-02.fvyskw9.mongodb.net:27017/complaint_db?ssl=true&replicaSet=atlas-xt3daj-shard-0&authSource=admin&appName=Cluster0";
        
        await mongoose.connect(atlasURI);
        console.log('MongoDB Atlas Cloud Connected Successfully');
    } catch (err) {
        console.error('Database Connection Error: ', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;