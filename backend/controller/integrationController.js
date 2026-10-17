import User from '../models/userModel.js';
import { getGoogleAuthUrl, get } from '../utils/googleCalendarLink.js';

export const getGoogleAuthUrlController = async(req, res) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REDIRECT_URI) {
        return res.status(503).json({ message: 'Google OAuth credentials are not set in environment variables.' });
    }
    res.json({ url: getGoogleAuthUrl(req.user._id) });
}

export const handleGoogleOAuthCallback = async(req, res) => {
    try {
        const { code, state } = req.user;

        if (!code || !state) {
            return res.redirect(`${process.env.CLIENT_URL||'http://localhost:5273'}/profile?calendra=failed`);
        }
        const token = await getGoogleTokens(code);

        if (!token.refresh_token) {
            return res.redirect(`${process.env.CLIENT_URL||'http://localhost:5173'}/profile?calendra=missing-refresh_token`);
        }
    } catch (error) {

    }
}