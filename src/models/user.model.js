import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 25
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: "/profile.png"
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts"
        }
    ]
        
    ,
    
    resetToken: {
        type: String
    },
    expireToken: {
        type: Date
    }
}, {
    timestamps: true
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;