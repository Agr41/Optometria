const bcrypt = require('bcrypt');
const User = require('../models/Usuarios');

module.exports = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.send(`<script>alert("Las nuevas contraseñas no coinciden."); window.location.href='/cambiar_contrasena';</script>`);
    }

    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.send(`<script>alert("Usuario no encontrado."); window.location.href='/cambiar_contrasena';</script>`);
        }

        const same = await bcrypt.compare(currentPassword, user.password);
        if (!same) {
            return res.send(`<script>alert("La contraseña actual es incorrecta."); window.location.href='/cambiar_contrasena';</script>`);
        }

        user.password = newPassword;
        await user.save();

        res.send(`<script>alert("¡Contraseña cambiada con éxito!"); window.location.href='/HomeSessions';</script>`);
    } catch (error) {
        console.error(error);
        res.send(`<script>alert("Error al cambiar la contraseña."); window.location.href='/cambiar_contrasena';</script>`);
    }
};
