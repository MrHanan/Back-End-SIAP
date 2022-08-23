module.exports = (app) => {
    const surat = require('../controllers/surat-controller')
    const router = require('express').Router()

    router.get('/', surat.findAll)
    router.post('/', surat.create)
    router.get('/:id', surat.findOne) 
    router.put('/:id', surat.update)
    router.delete('/:id', surat.delete)


    app.use("/api/surat", router)
}