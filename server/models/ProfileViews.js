import mongoose from "mongoose";
const ProflieViewsSchema = new mongoose.Schema({
    profileid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    whoviewid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{ timestamps: true })

const proflieViews= mongoose.model("proflieViews",ProflieViewsSchema);
export default proflieViews;