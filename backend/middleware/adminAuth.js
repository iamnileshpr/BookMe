import jwt from 'jsonwebtoken';
const adminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        req.admin = { email: decoded.email }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
}

export default adminAuth;