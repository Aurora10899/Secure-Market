import mongoose from 'mongoose';
import events from 'events';


events.EventEmitter.defaultMaxListeners = 30; // Adjust as necessary

let isConnected = false; 

export async function connect() {
    if (isConnected) {
        return; 
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!);

        const connection = mongoose.connection;

        connection.once('connected', () => {
            console.log('MongoDB connected successfully');
            isConnected = true; 
        });

        connection.once('error', (err) => {
            console.error('MongoDB connection failed:', err);
            process.exit(); 
        });

    } catch (error) {
        console.error('Something went wrong:', error);
        process.exit(); 
    }
}

