const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        
    },
    description: String,
    date: Date.now
})