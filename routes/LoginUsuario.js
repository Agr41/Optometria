const bcrypt = require('bcrypt');
const User = require('../models/Usuarios');
const crypto = require('crypto'); // Para generar el token único

module.exports = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (user) {
            const same = await bcrypt.compare(password, user.password);
            if (same) {
                const sessionToken = crypto.randomBytes(64).toString('hex'); // Genera un token único
                user.sessionToken = sessionToken;
                await user.save();

                req.session.userId = user._id;
                req.session.role = user.role;
                req.session.username = user.username;
                req.session.nombre = user.Nombre;
                req.session.language = user.language;
                req.session.sessionToken = sessionToken;

                res.redirect('/HomeSessions');
            } else {
                res.redirect('/LoginInicio?error=true');
            }
        } else {
            res.redirect('/LoginInicio?error=true');
        }
    } catch (error) {
        console.error(error);
        res.redirect(`/LoginInicio?error=true`);
    }
}
