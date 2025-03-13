// middlware controller checks to make sure there is at least one uppercase + tehre's a special character
const checkPasswordStrength = (req, res, next) => {
    try {
        // examples of regular expressions (regex)
        const uppercaseRegex = /[A-Z]/  // will match any uppercase letter
        const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/ // will match any of the symbols (some are escaped with \)

        const hasUpperCase = uppercaseRegex.test(req.body.password)
        const hasSymbol = symbolRegex.test(req.body.password)

        if (hasUpperCase && hasSymbol){
            next()
        } else {
            throw new Error("Password must contain at least one uppercase character and one special character.")
        }

    } catch (error) {
        next(error)
    }
}

module.exports = checkPasswordStrength;