import mongoose from 'mongoose';
import events from 'events';

// Increase the maximum number of listeners globally
events.EventEmitter.defaultMaxListeners = 30; // Adjust as necessary

let isConnected = false; // Track the connection state

export async function connect() {
    if (isConnected) {
        return; // If already connected, return early
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!);

        const connection = mongoose.connection;

        connection.once('connected', () => {
            console.log('MongoDB connected successfully');
            isConnected = true; // Set the connection state
        });

        connection.once('error', (err) => {
            console.error('MongoDB connection failed:', err);
            process.exit(); // Exit with an error code
        });

    } catch (error) {
        console.error('Something went wrong:', error);
        process.exit(); // Exit with an error code
    }
}

// import mongoose from 'mongoose';

// export async function connect() {
//     try {
//         mongoose.connect(process.env.MONGO_URI!);
//         const connection = mongoose.connection;

//         connection.on('connected', () => {
//             console.log('MongoDB connected Successfully');
//         })

//         connection.on('error', (err) => {
//             console.log('MongoDB connection failed' + err);
//             process.exit();
//         })
            
            
//     } catch (error) {
//         console.log('Something went wrong');
//         console.log(error);        
//     }
// }