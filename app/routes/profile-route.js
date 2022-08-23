module.exports = (app) => {
    const profil = require('../controllers/profile-controller')
    const router = require('express').Router()

    router.get('/', profiles.findAll)
    router.post('/', profiles.create)
    router.get('/:id', profiles.findOne)
    router.put('/:id', profiles.update)
    router.delete('/:id', profiles.delete)

    app.use('/api/profiles', router)
}