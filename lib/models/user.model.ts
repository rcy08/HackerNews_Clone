import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    news: {
        read: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'News'
            }
        ],
        deleted: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'News'
            }
        ]
    },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;