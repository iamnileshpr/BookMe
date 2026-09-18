import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: ture
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uniqque: true,
        lowercase: true
    },
    buisnessName: {
        type: String,
        default: "",
        trim: true
    },
    buisnessDescription: {
        type: String,
        default: "",
        trim: true
    },
    brandTeme: {
        type: String,
        enum: ['emerald', 'indigo', 'rose', 'amber', 'slate'],
        default: 'emerald'
    },
    brandAccent: {
        type: String,
        default: '#47857'
    },
    timeZone: {
        type: String,
        default: 'Asia/Kolkata'
    },
    googleRefreshToken: {
        type: String,
        default: ''
    },
    googleCalendarConnected: {
        type: Boolean,
        default: false
    },
    googleCalendarId: {
        type: String,
        default: 'primary'
    },
    payoutDetails: {
        accountHolderName: {
            type: String,
            default: '',
            trim: true
        },
        bankName: {
            type: String,
            default: '',
        },
        accountLast4: {
            type: String,
            default: ''
        },
        ifsc: {
            type: String,
            default: '',
            uppercase: true,
            trim: true
        },
        upiId: {
            type: String,
            default: '',
            trim: true
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        updatedAt: {
            type: Date,
        }

    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;