module.exports = (app) => {
    const admin = require('../controllers/profile-controller')
    const router = require('express').Router()

    router.get('/', admin.findAll)
    router.post('/', admin.create)
    router.get('/:id', admin.findOne)
    router.put('/:id', admin.update)
    router.delete('/:id', admin.delete)

    app.use('/api/admin', router)
}