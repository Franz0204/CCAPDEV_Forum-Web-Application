import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;
const DBNAME = process.env.DB_NAME;

export function connectToDB (dbName = DBNAME) {
    return mongoose.connect(MONGO_URI, {dbName: dbName});
}

export function disconnect(){
    console.log('Disconnecting from Mongodb...');
    mongoose.disconnect();
}

export function signalHandler() {
    disconnect();
    process.exit();
}

process.on('SIGINT', signalHandler);
process.on('SIGQUIT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGKILL', signalHandler);

process.on('SIG', signalHandler);
