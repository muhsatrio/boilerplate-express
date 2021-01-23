var express = require('express');
var router = express.Router();


const authMiddleware = (req, res, next) => {
  console.log(req.cookies);
  if (!req.cookies.userLogged) {
    console.log(req.cookies);
    res.redirect('/login');
  }
  next();
}

const unauthMiddleware = (req, res, next) => {
  if (req.cookies.userLogged) {
    res.redirect('/');
  }
  next();
}

/* GET home page. */
router.get('/', authMiddleware, function(_, res) {
  res.render("index");
});

router.get('/login', unauthMiddleware, (_, res) => {
  res.render('login');
});

router.get('/register', unauthMiddleware, (_, res) => {
  res.render('registrasi');
});

router.get('/logout', authMiddleware, (_, res) => {
  res.clearCookie('userLogged');
  res.redirect("/login");
})


module.exports = router;
