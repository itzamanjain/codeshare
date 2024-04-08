import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max:255
    },
    code: {
        type: String,
        required: true,
        
    },
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    
    }
});

const Post = mongoose.models.posts || mongoose.model("posts", userSchema);

export default Post;