const db = require ('../models')
const Surat = db.letters;
const getRespond = require('../../utils/respond')
const fs = require('fs')


exports.findAll = (req, res) => {
    Surat.find()
        .then((result) => {
            res.send(getRespond(true, "Daftar Surat", result))
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Terdapat kesalahan saat mengambil data surat."
            })
        })
}

exports.create = (req, res) => {
    if (req.files.surat === undefined){
        const err = "Unggah Surat!"

        res.status(422).send({
            file: err,
            message: err.message || "Terdapat kesalahan saat menggunggah surat."
        })
    }

    const surat = new Surat({
        namaPemohon: req.body.namaPemohon,
        namaPenerima: req.body.namaPenerima,
        jenisSurat: req.body.jenisSurat,
        catatan: req.body.catatan, 
    })

    surat
        .save(surat)
        .then((result) => {
            res.send(getRespond(true, "Surat berhasil diunggah", result))
        })
        .catch((err) => {
            let namaPemohonError = "";
            let namaPenerimaError = "";
            let jenisSuratError = "";
            let catatanError = "";
            if (err.errors.namaPemohon){
                namaPemohonError = err.errors.namaPemohon.kind;
            }
            if (err.errors.namaPenerima){
                namaPenerimaError = err.errors.namaPenerima.kind;
            }
            if (err.errors.jenisSurat){
                jenisSuratError = err.errors.jenisSurat.kind;
            }
            if (err.errors.catatan){
                catatanError = err.errors.catatan.kind;
            }
            res.status(422).send({
                namaPemohon: namaPemohonError,
                namaPenerima: namaPenerimaError,
                jenisSurat: jenisSuratError,
                catatan: catatanError,
                message: err.message || "Terdapat kesalahan saat mengunggah surat"
            })

        })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Surat.findById(id)
        .then((result) => {
            res.send(getRespond(true, "Surat", result))
        })
        .catch((err) => {
            res.status(409).send({
                message: err.message || "Terdapat kesalahan saat menampilkan surat"
            })
        })
}

exports.findByName = (req, res) => {
    const namaPemohon = req.params.namaPemohon

    Surat.find({ search: { $regex: ".*" + namaPemohon.toLowerCase() + ".*" } })
        .then((result) => {
            res.send(getRespond(true, "Hasil Cari Surat"))
        })
        .catch((err) => {
            res.status(409).send({
                message: err.message || "Terdapat kesalahan saat menampilkan surat"
            })
        })
}


exports.delete = (req, res) => {
    const id = req.params.id

    Surat.findByIdAndRemove(id)
        .then((result) => {
            if(!result){
                res.status(404).send({
                    message: "Surat tidak ditemukan"
                })
            }
            try {
                fs.unlinkSync(result, namaPemohon)
                fs.unlinkSync(result, jenisSurat)
            } catch (err) {
                console.log(err.message)
            } 
            res.send({
                message: "Surat telah dihapus"
            })
        })
        .catch((err) => {
            res.status(409).send({
                message: err.message || "terjadi kesalahan saat memperbarui surat."
            })
        })
}

