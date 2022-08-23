module.exports = (app) => {
    const surat = require('../controllers/surat-controlller')
    const router = require('express').Router()

    router.get('/', letters.findAll)
    router.post('/', letters.create)
    router.get('/:id', letters.findOne)
    router.delete('/:id', letters.delete)
    router.get('/search/surat', letters.findByName)


    app.use("/api/letters", router)
}