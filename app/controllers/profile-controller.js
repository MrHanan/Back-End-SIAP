const db = require ('../models')
const User = db.user;
const getRespond = require('../../utils/respond')
const fs = require('fs')


exports.findAll = (req, res) => {
  User.find()
    .then((result) => {
      console.log(result)
      res.send(getRespond(true, "", result))
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "terjadi kesalahan saat mengambil data pengguna"
      })
    })
}

exports.create = (req, res) => {
  const user = new User({
    nama: req.body.nama,
    email: req.body.email,
    password: req.body.password,
    instansi: req.body.instansi,
    alamat: req.body.alamat,
    tlp: req.body.tlp,
    role: req.body.role
  })

  user
    .save(user)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      let namaError = "";
      let emailError = "";
      let passwordError = "";
      let instansiError = "";
      let alamatError = "";
      let tlpError = "";
      let roleError = "";
      if (err.errors.nama){
        namaError = err.errors.nama.kind;
      }
      if (err.errors.email){
        emailError = err.errors.email.kind;
      }
      if (err.errors.password){
        passwordError = err.errors.password.kind;
      }
      if (err.errors.instansi){
        instansiError = err.errors.instansi.kind;
      }
      if (err.errors.alamat){
        alamatError = err.errors.alamat.kind;
      }
      if (err.errors.tlp){
        tlpError = err.errors.tlp.kind;
      }
      if (err.errors.role){
        roleError = err.errors.role.kind;
      }
      res.status(409).send({
        message: err.message || "Terjadi kesalahan saat membuat pengguna."
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  User.findById(id)
    .then((result) => {
      res.send(getRespond(true, "User", result))
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Terjadi kesalahan saat menampilkan pengguna"
      })
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
  
    User.findByIdAndUpdate(id, req.body)
      .then((result) => {
        if (!result) {
          res.status(404).send({
            message: "Pengguna tidak diketahui",
          });
        } 
        res.send({
          message: "Pengguna telah diperbarui",
        });
      })
      .catch((err) => {
        res.status(409).send({
          message: err.message || "Terdapat kesalahan saat memperbarui pengguna.",
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.findByIdAndRemove(id)
      .then((result) => {
        if (!result) {
          res.status(404).send({
            message: "Pengguna tidak diketahui",
          });
        } 
        res.send({
          message: "Pengguna telah dihapus",
        });
      })
      .catch((err) => {
        res.status(409).send({
          message: err.message || "Terdapat kesalahan saat menghapus pengguna.",
        });
      });
};
  
