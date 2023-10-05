const bcrypt = require('bcrypt')
const User = require('../models/Usuarios')
const path = require('path')

module.exports = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username  });
    if (user) {
      const same = await bcrypt.compare(password, user.password);

      if (same) {
        req.session.userId = user._id
        
        req.session.role= user.role
        req.session.username = user.username

        res.redirect('/HomeSessions')
      } else {
        res.redirect('/LoginInicio?error=true')
      }
    } else {
      res.redirect('/LoginInicio?error=true')
    }
  } catch (error) {
    console.error(error);
    res.redirect(`/LoginInicio?error=true&message=${error}`)
  }
}
