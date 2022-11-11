const User = require ('../models/profile-model.js')
const router = require('express').Router()

router.get('/admin', async (req, res, next) => {
    try {
        const user = await User.find()
        res.send(user)
    } catch (err) {
        next(err)
    }
})


module.exports = router