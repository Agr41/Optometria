const User = require('../models/Usuarios');

module.exports = async (req, res, next) => {
    if (!req.session.userId || !req.session.sessionToken) {
        return res.redirect('/LoginInicio');
    }

    try {
        const user = await User.findById(req.session.userId);
        if (user && user.sessionToken === req.session.sessionToken) {
            next();
        } else {
            req.session.destroy(() => {
                res.redirect('/LoginInicio');
            });
        }
    } catch (error) {
        console.error(error);
        req.session.destroy(() => {
            res.redirect('/LoginInicio');
        });
    }
}
