const jwt = require('jsonwebtoken');

function verifyToken(token) {
    let secretKey = 'hakonamatata';
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null; // Token verification failed
    }
}


function authenticateAndAuthorize(userType) {

    return (req, res, next) => {
        const token = req.headers.authorization; // Get the token from the request header
        // console.log(token);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token missing' });
        }

        // Verify the token
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // Check user type
        if (decoded.userType !== userType) {
            return res.status(403).json({ message: 'Forbidden: Access denied' });
        }

        // Store user information in the request for further use
        req.userId = decoded.userId;
        req.userType = decoded.userType;

        next(); // Proceed to the next middleware or route
    };
}

module.exports = {
    authenticateAndAuthorize,
    verifyToken,
};
