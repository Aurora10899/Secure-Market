import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    walletaddress: {
        type: String,
        required: [true, "Wallet address is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isVerifiedSeller: {
        type: Boolean,
        default: false,
    },
    isSeller: {
        type: Boolean,
        default: false,    
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },  
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;