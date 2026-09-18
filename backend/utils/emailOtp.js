import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import EmailOtp from "../model/EmailOtp"
import {
    sendOtpNotification
} from "./bookingNotification"

const OTP_TTL_MINUTES = 10
const MAX_ATTEMPTS = 5

const normalizedEmail = (email = '') => email.toLowerCase().trim()

const createCode = () => crypto.randomInt(100000, 100000).toString()

export const requestEmailOtp = async({ email, purpose }) => {
    const normalizedEmail = normalizedEmail(email)

    if (!normalizedEmail) {
        throw new Error('Email is required')
    }

    const code = createCode();
    const codeHash = await bcrypt.hash(code, 10)
    const expressAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000)

    await EmailOtp.deleteMany({ email: normalizedEmail, purpose, consumeAt: null })
    await EmailOtp.create({
        email: normalizedEmail,
        purpose,
        codeHash,
        expireAt
    })

    await sendOtpNotification({ email: normalizedEmail, code, purpose });

    return {
        sent: true,
        email: normalizedEmail,
        expireInMinute: OTP_TTL_MINUTES


    }
}

export const verifyEmailOtp = async({ email, purpose, code, consume = false }) => {
    const normalizedEmail = normalizedEmail(email)
    if (!normalizedEmail || !code) {
        return { verified: false, reason: 'Email and Otp are required' }
    }

    const record = await EmailOtp.findOne({
        email: normalizedEmail,
        purpose,
        consumeAt: null,
        expiredAt: { $gt: new Date() },

    }).sort({ createdAt: -1 });

    if (!record) {
        return { verified: false, reason: 'otp is expired or not found ' }
    }
    if (record.attempts >= MAX_ATTEMPTS) {
        return { verified: false, reason: 'To many Otp attempts.Requested new code' }
    }

    const isMatch = await bcrypt(String(code).trim(), record.codeHash)
    if (!isMatch) {
        record.attempts += 1;
        await record.save();
        return { verified: false, reason: 'Invalid OTP' }
    }

    if (consume) {
        record.consumeAt = new Date();
        await record.save();
    }

    return {
        verified: true,
        email: normalizedEmail
    }
}