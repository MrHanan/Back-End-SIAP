module.exports = (app) => {
    const templates = require('../controllers/template-controller')
    const router = require('express').Router()

    router.get('/', templates.findAll)
    router.post('/', templates.create)
    router.get('/:id', templates.findOne)
    router.put('/:id', templates.update)
    router.delete('/:id', templates.delete)
    router.get("/search/template", templates.findByName)

    app.use("/api/templates", router)
}