module.exports = (app) => {
    const template = require('../controllers/template-controller')
    const router = require('express').Router()

    router.get('/', template.findAll)
    router.post('/', template.create)
    router.get('/:id', template.findOne)
    router.put('/:id', template.update)
    router.delete('/:id', template.delete)
    router.get("/search/template", template.findByName)

    app.use("/api/templates", router)
}