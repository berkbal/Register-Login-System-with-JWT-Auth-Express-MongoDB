
module.exports.register_get = (req,res,next) => {
    res.render("register")
}

module.exports.register_post = (req,res,next) => {
    const { id, pw } = req.body
    console.log(id, pw)
}

module.exports.login_get = (req,res,next) => {
    res.render("login")
}

module.exports.login_post = (req,res,next) => {
    const { id, pw } = req.body
    console.log(id, pw)
}