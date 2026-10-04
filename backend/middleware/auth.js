import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
    const authHeader = req.header.authorization;

    if (!authHeader || !authHeader.this.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId }; // Attach the decoded user information to the request object
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

export default auth;