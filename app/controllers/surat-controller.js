const db = require ('../models')
const Surat = db.surat;
const getRespond = require('../../utils/respond')
const fs = require('fs')


exports.findAll = (req, res) => {
  Surat.find()
    .then((result) => {
      console.log(result)
      res.send(getRespond(true, "Daftar Surat", result))
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error while retrieving letter"
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
    surat: req.files.surat[0].path.replace("\\", "/"),
  })

  surat
    .save(surat)
    .then((result) => {
      res.send(getRespond(true, "Surat telah diunggah", result))
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

      res.status(409).send({
        message: err.message || "Some error while create letter."
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  Surat.findById(id)
    .then((result) => {
        console.log(result)
      res.send(getRespond(true, "Surat", result))
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while show surat"
      })
    })
}

exports.update = (req, res) => {
    const id = req.params.id;

    let letter = null
    if (req.files.letter === undefined) {
        letter = req.body.letter;
    } else {
        letter = req.files.letter[0].path.replace("\\", "/");
    }

    const surat = {
        namaPemohon: req.body.namaPemohon,
        namaPenerima: req.body.namaPenerima,
        jenisSurat: req.body.jenisSurat,
        catatan: req.body.catatan,
        letter,
    }
  
    Surat.findByIdAndUpdate(id, req.body)
      .then((result) => {
        if (!result) {
          res.status(404).send({
            message: "Surat tidak diketahui",
          });
        } 
        res.send({
          message: "Surat telah diperbarui",
        });
      })
      .catch((err) => {
        res.status(409).send({
          message: err.message || "Terdapat kesalahan saat memperbarui surat.",
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Surat.findByIdAndRemove(id)
      .then((result) => {
        if (!result) {
          res.status(404).send({
            message: "Surat tidak diketahui",
          });
        }
        try {
            fs.unlinkSync(result.surat)
        } catch (err) {
            console.log(err.message)
        }  
        res.send({
          message: "Surat telah dihapus",
        });
      })
      .catch((err) => {
        res.status(409).send({
          message: err.message || "Terdapat kesalahan saat memperbarui surat.",
        });
      });
};
  
