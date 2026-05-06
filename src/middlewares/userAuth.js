const userAuth = (req, res, next) => {
    console.log("Check USer Auth")
    const token = "Rishi"
    const isUserAuth = token === "Rishi"

    if (!isUserAuth) {
        res.status(401).send("Acces Denined for USer")
    } else {
        next()
    }
}

module.exports = {
    userAuth
}