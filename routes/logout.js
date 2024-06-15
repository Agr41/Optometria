const User = require('../models/Usuarios');

module.exports = async (req, res) => {
    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);
            if (user) {
                user.sessionToken = null;
                await user.save();
            }
        } catch (error) {
            console.error(error);
        }
    }

    req.session.destroy(() => {
        res.redirect('/');
    });
}
