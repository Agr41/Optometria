const User = require('../models/Usuarios')

module.exports = async (req,res) =>{
  const { language } = req.body;

  try {
      const user = await User.findById(req.session.userId);
      if (user) {
          user.language = language;
          await user.save();

          // Actualizar el idioma en la sesión
          req.session.language = language;
          req.i18n.changeLanguage(language);

          const referer = req.headers.referer || '/';
          res.redirect(referer);      } else {
          res.status(404).json({ message: 'Usuario no encontrado.' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el idioma.' });
  }
}

/*

*/