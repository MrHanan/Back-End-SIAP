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
        message: err.message || "Terdapat kesalahan saat mengambil data surat surat"
      })
    })
}

// Misalkan tambahkan export surat acc
// copas update ganti cuma signature

exports.create = (req, res) => {
    // if (req.files.surat === undefined){
    //     const err = "Unggah Surat!"

    //     res.status(422).send({
    //         file: err,
    //         message: err.message || "Terdapat kesalahan saat menggunggah surat."
    //     })
    // }

  const surat = new Surat({
    nomorSurat: req.body.nomorSurat,
    namaPemohon: req.body.namaPemohon,
    namaPenerima: req.body.namaPenerima,
    jenisSurat: req.body.jenisSurat,
    tanggalSurat: req.body.tanggalSurat,
    hariKegiatan: req.body.hariKegiatan,
    tanggalKegiatan: req.body.tanggalKegiatan,
    waktuKegiatan: req.body.waktuKegiatan,
    tempatKegiatan: req.body.tempatKegiatan,
  })

  surat
    .save(surat)
    .then((result) => {
      res.send(getRespond(true, "Surat telah diunggah", result))
    })
    .catch((err) => {
      let nomorSuratError = "";
      let namaPemohonError = "";
      let namaPenerimaError = "";
      let jenisSuratError = "";
      let tanggalSuratError = "";
      let hariKegiatanError = "";
      let tanggalKegiatanError = "";
      let waktuKegiatanError = "";
      let tempatKegiatanError = "";

      if (err.errors.nomorSurat){
        nomorSuratError = err.errors.nomorSurat.kind;
      }
      if (err.errors.namaPemohon){
        namaPemohonError = err.errors.namaPemohon.kind;
      }
      if (err.errors.namaPenerima){
        namaPenerimaError = err.errors.namaPenerima.kind;
      }
      if (err.errors.jenisSurat){
        jenisSuratError = err.errors.jenisSurat.kind;
      }
      if (err.errors.tanggalSurat){
        tanggalSuratError = err.errors.tanggalSurat.kind;
      }
      if (err.errors.hariKegiatan){
        hariKegiatanError = err.errors.hariKegiatan.kind;
      }
      if (err.errors.tanggalKegiatan){
        tanggalKegiatanError = err.errors.tanggalKegiatan.kind;
      }
      if (err.errors.waktuKegiatan){
        waktuKegiatanError = err.errors.waktuKegiatan.kind;
      }
      if (err.errors.tempatKegiatan){
        tempatKegiatanError = err.errors.tempatKegiatan.kind;
      }


      res.status(409).send({
        message: err.message || "Terdapat kesalahan saat membuat surat surat."
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
        message: err.message || "Terdapat kesalahan saat menampilkan surat surat"
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
        nomorSurat: req.body.nomorSurat,
        namaPemohon: req.body.namaPemohon,
        namaPenerima: req.body.namaPenerima,
        jenisSurat: req.body.jenisSurat,
        tanggalSurat: req.body.tanggalSurat,
        hariKegiatan: req.body.hariKegiatan,
        tanggalKegiatan: req.body.tanggalKegiatan,
        waktuKegiatan: req.body.waktuKegiatan,
        tempatKegiatan: req.body.tempatKegiatan,
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

// Update ACC
exports.updateAcc = (req, res) => {
  const id = req.params.id;

  let pesan = "";
  let signature = "";

  if(req.body.pesan != null){
    pesan = req.body.pesan
  } else {
    signature = "http://localhost:5000/image/kepsek.png";
  }
  
  const surat = {
      pesan : pesan,
      signature: signature, //Masukin gambar
      //Tambahkan pesan
  }

  Surat.findByIdAndUpdate(id, surat)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Tanda tangan tidak diketahui",
        });
      } 
      if (req.body.pesan != null){
        res.send({
          message: "Surat telah ditolak",
        });
      } else {
        res.send({
          message: "Surat telah ditandatangani",
        });
      }
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
          message: err.message || "Terdapat kesalahan saat menghapus surat.",
        });
      });
};
  
