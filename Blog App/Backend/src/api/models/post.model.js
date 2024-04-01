const mongoose  = require("mongoose");

//Defining Post Schema
const postSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true, 
            min : 50,
            trim: true
        },
        content: { 
            type: String, 
            required: true, 
            min : 100
        },
        ImageURL: { 
            type:String, 
            required: false          
        },
        author: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: false, 
        },
        category: { 
            type: String, 
            enum: ['Technology', 'Travel','Lifstyle'],
            default: 'Technology',
            required: false
        },
    },{
        timestamps : true
    }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
