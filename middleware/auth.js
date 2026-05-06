const adminAuth = (req, res, next) => {
    const token = "Rishi"
    const isAuth = token === "RishiXX"

    if (!isAuth) {
        res.status(401).send("Access Denined")
    }
    else {
        next()
    }
}

module.exports = {
    adminAuth
}