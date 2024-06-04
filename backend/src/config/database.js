import mongoose from 'mongoose';

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_PATH, {
            retryWrites: true,
        });

        console.log('Connect success');
    } catch (error) {
        console.log('Connect failed',error);
    }
}

export default connect;