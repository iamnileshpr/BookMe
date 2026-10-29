import mongoose from 'mongoose';

const walletTransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        index: true,
    },
    withdrawId: {
        type: mongoose.Schema.Types.ObjectId,
        red: 'Withdraw',
        index: true,
    },
    type: {
        type: String,
        enum: ['booking_payout', 'withdrawl_hold', 'refund-reversal'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: 'inr',
    },
    status: {
        type: String,
        trim: true,
        // enum: ['pending', 'completed', 'failed'],
        default: '',
    }
}, { timestamps: true });

walletTransactionSchema.index({ userId: 1, type: 1 }, { unique: true, partialFilterExpression: { bookingId: { $exists: true } } });

const WalletTransaction = mongoose.model('WalletTransaction', walletTransactionSchema);

export default WalletTransaction;