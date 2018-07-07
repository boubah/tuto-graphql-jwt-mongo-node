import mongoose from "mongoose";

export function ConnectDatabase() {

    const promise = mongoose.connect('mongodb://boubahuser:boubahuser02@ds263460.mlab.com:63460/dbboubah001', {
        useNewUrlParser: true
    });

    const db = mongoose.connection;

    db.on('error', ()=> {
        console.log('Failed to connect to mongoose')
    })
    .once('open', () => {
        console.log('Connected to mongoose')
    });
}