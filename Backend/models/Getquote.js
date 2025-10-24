import mongoose from 'mongoose'

const getquoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

}, { timestamps: true })

export default mongoose.model('Getquote', getquoteSchema)
   