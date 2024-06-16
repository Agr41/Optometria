const User = require('../models/Usuarios');
const Joi = require('joi');

module.exports = async (req, res) => {
    const { currentEmail, newEmail, confirmEmail } = req.body;

    // Validar que los nuevos correos coincidan
    if (newEmail !== confirmEmail) {
        return res.send(`<script>alert("Los nuevos correos no coinciden."); window.location.href='/actualizar_correo';</script>`);
    }

    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.send(`<script>alert("Usuario no encontrado."); window.location.href='/actualizar_correo';</script>`);
        }

        // Validar que el correo actual coincida
        if (user.username !== currentEmail) {
            return res.send(`<script>alert("El correo actual es incorrecto."); window.location.href='/actualizar_correo';</script>`);
        }

        // Validar el nuevo correo electrónico
        const emailSchema = Joi.string().email({ tlds: { allow: false } }).required()
            .messages({
                'string.email': `El nuevo correo debe ser un correo electrónico válido.`,
                'any.required': `El nuevo correo es un campo obligatorio.`
            });

        const { error } = emailSchema.validate(newEmail);
        if (error) {
            return res.send(`<script>alert("${error.details[0].message}"); window.location.href='/actualizar_correo';</script>`);
        }

        // Actualizar el correo en la base de datos
        user.username = newEmail;
        await user.save();

        res.send(`<script>alert("¡Correo actualizado con éxito!"); window.location.href='/HomeSessions';</script>`);
    } catch (error) {
        console.error(error);
        res.send(`<script>alert("Error al actualizar el correo."); window.location.href='/actualizar_correo';</script>`);
    }
};
