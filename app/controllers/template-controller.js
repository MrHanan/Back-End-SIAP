const db = require ('../models')
const Template = db.templates;
const getRespond = require('../../utils/respond')
const fs = require('fs')


exports.findAll = (req, res) => {
    Template.find()
        .then((result) => {
            res.send(getRespond(true, "Daftar Template Surat", result))
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Terdapat kesalahan saat mengambil data template surat."
            })
        })
}

exports.create = (req, res) => {
    console.log(req)
    if (req.files.temp === undefined){
        const err = "Unggah Template!"

        res.status(422).send({
            file: err,
            message: err.message || "Terdapat kesalahan saat menggunggah template surat."
        })
    }

    console.log(req.files)
    const template = new Template({
        nama: req.body.nama,
        desc: req.body.desc,
        temp: req.files.temp[0].path.replace("\\", "/"), 
    })

    template
        .save(template)
        .then((result) => {
            res.send(getRespond(true, "Template berhasil diunggah", result))
        })
        .catch((err) => {
            let namaError= "";
            let descError= "";
            if (err.errors.nama){
                namaError = err.errors.nama.kind;
            }
            if (err.errors.desc){
                descError = err.errors.desc.kind;
            }
            res.status(422).send({
                nama: namaError,
                desc: descError,
                message: err.message || "Terdapat kesalahan saat mengunggah template surat"
            })

        })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Template.findById(id)
        .then((result) => {
            res.send(getRespond(true, "Template", result))
        })
        .catch((err) => {
            res.status(409).send({
                message: err.message || "Terdapat kesalahan saat menampilkan template"
            })
        })
}

exports.findByName = (req, res) => {
    const nama = req.query.nama

    Template.find({ search: { $regex: ".*" + nama.toLowerCase() + ".*" } })
        .then((result) => {
            res.send(getRespond(true, "Hasil Cari Template"))
        })
        .catch((err) => {
            res.status(409).send({
                message: err.message || "Terdapat kesalahan saat menampilkan template"
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id

    let temp = null

    if(req.files.temp === undefined){
        temp = req.body.temp
    } else {
        temp = req.files.temp[0].path.replace("\\", "/")
    }

    const template = {
        nama: req.body.nama,
        desc: req.body.desc,
        temp,
    }
    
    Template.findByIdAndUpdate(id, template)
        .then((result) => {
            if(!result){
                res.status(404).send({
                    message: "Template surat tidak ditemukan"
                })
            }
            res.send({
                message: "Template surat telah diperbarui"
            })
        })
        .catch((err) => {
            res.status(409).send({
                message: err.message || "terjadi kesalahan saat memperbarui template."
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Template.findByIdAndRemove(id)
        .then((result) => {
            if(!result){
                res.status(404).send({
                    message: "Template surat tidak ditemukan"
                })
            }
            try {
                fs.unlinkSync(result.temp)
            } catch (err) {
                console.log(err.message)
            } 
            res.send({
                message: "Template surat telah dihapus"
            })
        })
        .catch((err) => {
            res.status(409).send({
                message: err.message || "terjadi kesalahan saat memperbarui template."
            })
        })
}


