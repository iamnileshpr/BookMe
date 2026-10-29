import User from '../model/User.js';
import {
    getGoogleAuthUrl,
    getGoogleTokens
} from '../utils/googleCalendarLink.js';

export const getGoogleConnectUrl = async(req, res) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REDIRECT_URI) {
        return res.status(503).json({ message: 'Google OAuth credentials are not set in environment variables.' });
    }
    res.json({ url: getGoogleAuthUrl(req.user._id) });
}

export const handleGoogleCallback = async(req, res) => {
    try {
        const { code, state } = req.user;

        if (!code || !state) {
            return res.redirect(`${process.env.CLIENT_URL||'http://localhost:5273'}/profile?calendra=failed`);
        }
        const token = await getGoogleTokens(code);

        if (!token.refresh_token) {
            return res.redirect(`${process.env.CLIENT_URL||'http://localhost:5173'}/profile?calendra=missing-refresh_token`);
        }
        await User.findByIdAndUpdate(state, {
            googleRecalendarConnected: true,
            googleCalendarId: 'primary',
            googleRefreshToken: token.refresh_token,
        });
        res.redirect(`${process.env.CLIENT_URL||'http://localhost:5173'}/profile?calendra=success`);
    } catch (error) {
        res.redirect(`${process.env.CLIENT_URL||'http://localhost:5173'}/profile?calendra=failed`);
    }
}