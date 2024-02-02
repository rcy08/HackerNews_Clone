import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    upvotes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            type: String,
        }
    ]
});

const News = mongoose.models.News || mongoose.model('News', newsSchema);

export default News;



