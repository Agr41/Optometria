const User = require('../models/Usuarios');
const Joi = require('joi');

module.exports = async (req, res) => {
    try { 



        const userSchemaJoi = Joi.object({
            username: Joi.string().email({ tlds: { allow: false } }).lowercase().required()
            .custom((value, helpers) => {
                // Check if the value is the same as its lowercase conversion
                if (value !== value.toLowerCase()) {
                    return helpers.message('El campo de correo no puede contener mayúsculas.');
                }
                return value; // Return the value unchanged if it's all lowercase
            })
            .messages({
                'string.email': `El campo de correo debe ser un correo electrónico válido.`,
                'string.empty': `El campo de correo no puede estar vacío.`,
                'any.required': `El campo de correo es un campo obligatorio.`
            }),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required()
                .messages({
                    'string.pattern.base': `El campo de contraseña debe tener entre 8 y 30 caracteres y solo puede contener letras y números.`,
                    'string.empty': `El campo de contraseña no puede estar vacío.`,
                    'any.required': `El campo de contraseña es un campo obligatorio.`
                }),
            role: Joi.string().required().messages({
                'string.empty': `"role" no puede estar vacío.`,
                'any.required': `"role" es un campo obligatorio.`
            }),
            Nombre: Joi.string().regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/).required().messages({
                'string.pattern.base': `El "Nombre" solo debe contener letras, espacios y caracteres permitidos como 'ñ', 'ü'.`,
                'string.empty': `El campo "Nombre" no debe estar vacío.`,
                'any.required': `"Nombre" es un campo obligatorio.`
            }),
            ApellidoPaterno: Joi.string().regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/).required().messages({
                'string.pattern.base': `El "Apellido Paterno" solo debe contener letras, espacios y caracteres permitidos como 'ñ', 'ü'.`,
                'string.empty': `El campo "Apellido Paterno" no debe estar vacío.`,
                'any.required': `"Apellido Paterno" es un campo obligatorio.`
            }),
            ApellidoMaterno: Joi.string().regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]*$/).allow('').messages({
                'string.pattern.base': `El "Apellido Materno" puede contener letras, espacios y caracteres permitidos como 'ñ', 'ü'.`,
                'string.empty': `El campo "Apellido Materno" puede estar vacío.`
            }),
        });



        // Validate the request body against the schema
        const { error, value } = userSchemaJoi.validate(req.body, { abortEarly: false });

        if (error) {
            // Compile the error messages into a single string to display in the alert
            const errorMessage = error.details.map(detail => detail.message).join("\\n");
            // Directly throw with this detailed error message
            throw new Error(errorMessage);
        }

        console.log(value.username)
        console.log(await User.find({username:value.username }).count())
        if (await User.find({username:value.username }).count() > 0){
            throw new Error('¡Este correo ya está registrado!');

        }

        // Proceed with creating and updating the user if validation succeeds
        await User.create(value);
        await User.updateOne({ username: value.username }, { username: value.username });

        // Send success message
        res.send(`<script>alert("¡Usuario registrado con éxito!"); window.location.href='/HomeSessions';</script>`);

    } catch (err) {
        // Properly escape quotes and ensure the message displays correctly in JavaScript alerts
        const formattedMessage = err.message.replace(/"/g, '\\"').replace(/\n/g, '\\n');
        // Respond with a script that shows an alert with the error message and redirects
        res.send(`<script>alert("${formattedMessage}"); window.location.href='/registrarse';</script>`);
    }
};
