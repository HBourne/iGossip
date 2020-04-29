var mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose);

// Define the schema for how you want the document to be structured in the collection
// For more details, refer to https://mongoosejs.com/docs/guide.html
const courseSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    Hash_Val: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    gpa: {
        type: Float,
        required: true
    }

})

// This would create a collection called comments in your database
// Notice that the name would be comments instead of comment
module.exports = mongoose.model('course', courseSchema);
