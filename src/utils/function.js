const jwt = require('jsonwebtoken');
function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined'){
        return res.sendStatus(403);
    }

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, 'my_secret_key', (err, data) => {
        if(err){
            return res.sendStatus(403);
        }
        req.token = bearerToken;
        req.user = data;
        next();
    });
}

module.exports = {
    ensureToken,
};