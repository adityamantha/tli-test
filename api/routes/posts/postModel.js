'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = exports.schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],  
    dateCreated: Date,
    dateUpdated: Date,
});

exports.model = mongoose.model('Posts', postSchema);