import { Schema, model } from 'mongoose';

let heartSchema = new Schema({
    hospital: {
        id:{
            type:Schema.Types.ObjectId,
            ref:"Hospital"
        },
    },
    date: String,
    donorAge: Number,
});

export default model('heartSchema', heartSchema)