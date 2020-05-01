var mongoose = require("mongoose");

// Define the schema for how you want the document to be structured in the collection
// For more details, refer to https://mongoosejs.com/docs/guide.html
const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    hash_val: {
        type: String,
        reuired: true
    },
    course_name: {
        type: String,
        required: true
    },
    course_number: {
        type: String,
        required: true
    },
    course_subject: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: false
    }
}, {
    timestamps: {
        createdAt: 'created_at'
    }
})

// This would create a collection called comments in your database
// Notice that the name would be comments instead of comment
module.exports = mongoose.model('comment', commentSchema);