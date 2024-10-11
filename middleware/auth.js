const jwt = require('jsonwebtoken');
// const localStorage = require('local-storage');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // const token = localStorage.getItem('token');
    // console.log(token, req.headers.authorization);
    
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = { authenticateJWT };
