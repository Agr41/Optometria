const bcrypt = require('bcrypt')
const User = require('../models/Usuarios')
const path = require('path')

module.exports = async (req, res) => {
    console.log(req.body)
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (user) {
      const same = await bcrypt.compare(password, user.password);

      if (same) {
        req.session.userId = user._id
        
        req.session.role= user.role
        req.session.username = user.username

        res.redirect('/')
      } else {
        res.redirect('/LoginInicio')
      }
    } else {
      res.redirect('/LoginInicio')
    }
  } catch (error) {
    console.error(error);
    res.redirect('/LoginInicio')
  }
}
