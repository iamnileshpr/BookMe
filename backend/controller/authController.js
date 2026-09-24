import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from 'jsonwebtoken'
import User from "../model/User.js";
import { requestEmailOtp, verifyEmailOtp } from "../utils/emailOtp.js";
import slugify from "../utils/slug.js";

const createToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

const toUserResponse = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    slug: user.slug,
    businessName: user.businessName,
    businessDescription: user.businessDescription,
    brandTheme: user.brandTheme,
    brandAccent: user.brandAccent,
    timezone: user.timezone,
    googleCalendarConnected: user.googleCalendarConnected,
    googleCalendarId: user.googleCalendarId,
    payoutDetails: user.payoutDetails,
    stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
});

export const register = async(req, res) => {
    try {
        const { name, email, password, businessName, businessDescription, brandTheme, brandAccent, timezone } = req.body;

        if (!name || email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const otpResult = await verifyEmailOtp({
            email: normalizedEmail,
            purpose: 'registration',
            code: emailOtp,
            consume: true
        })

        if (!otpResult.verified) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const baseSlug = slugify(businessName || name);
        let finalSlug = baseSlug;
        let counter = -1;
        while (await User.findOne({ slug: finalSlug })) {
            counter++;
            finalSlug = `${baseSlug}-${counter}`;
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashPassword,
            slug: finalSlug,
            businessName: businessName || "",
            timezone: timezone || 'Asia/Kolkata',
        })

        const token = createToken(user._id);
        res.status(201).json({
            message: "Registration successful",
            token,
            user: toUserResponse(user)
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

export const requestRegisterOtp = async(req, res) => {
    try {
        const { email } = req.body;
        const normalizedEmail = email.toLowerCase().trim();

        if (!normalizedEmail) {
            return res.status(400).json({ message: 'Email is required' })
        }
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(400).json({ message: "email already exist" })
        }

        const result = await requestEmailOtp({
            email: normalizedEmail,
            purpose: 'registraion',
        })
        res.json({ message: 'verification code sent', result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const verifyRegistrationOtp = async(req, res) => {
    try {
        const { email, emailOtp } = req.body;
        const normalizedEmail = email.toLowerCase().trim();
        if (!normalizedEmail || !emailOtp) {
            return res.status(400).json({ message: " email and otp is required" })
        }
        const existingUser = await User.findOne({ email: normalizedEmail })
        if (existingUser) {
            return res.status(400).json({ message: "email is already varified" })
        }
        const otpResult = await verifyEmailOtp({
            email: normalizedEmail,
            purpose: 'registration',
            code: emailOtp,
            consume: false,
        })
        if (!otpResult.verified) {
            return res.status(400).json({
                message: otpResult.reason || 'invalid otp'
            })
            res.json({ message: "Otp is verified" })
        }

    } catch (error) {
        res.json(500).json({ message: 'server error', error: error.message })
    }
}

export const loginUser = async(req, res) => {
    try {
        const (email, password) = res.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password  are required' })
        }

        const normalizedEmail = email.toLowerCase().trim();

        if (!User) {
            return res.status(401).json({ message: 'Invalid credential' })

        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credential' })
        }
    } catch (error) {

    }
}