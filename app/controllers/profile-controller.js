const db = require ('../models')
const Admin = db.admin;
const getRespond = require('../../utils/respond')


exports.findAll = (req, res) => {
  Admin.find()
    .then((result) => {
      console.log(result)
      res.send(getRespond(true, "", result))
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error while retrieving posts"
      })
    })
}

exports.create = (req, res) => {
  const admin = new Admin({
    nama: req.body.nama,
    email: req.body.email,
    password: req.body.password,
    instansi: req.body.instansi,
    alamat: req.body.alamat,
    tlp: req.body.tlp
  })

  admin
    .save(admin)
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
      res.status(409).send({
        message: err.message || "Some error while create user."
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  Admin.findById(id)
    .then((result) => {
      res.send(getRespond(true, "Admin", result))
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while show user"
      })
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
  
    Admin.findByIdAndUpdate(id, req.body)
      .then((result) => {
        if (!result) {
          res.status(404).send({
            message: "Profil tidak diketahui",
          });
        } 
        res.send({
          message: "Profil telah diperbarui",
        });
      })
      .catch((err) => {
        res.status(409).send({
          message: err.message || "Terdapat kesalahan saat memperbarui profil.",
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Admin.findByIdAndRemove(id)
      .then((result) => {
        if (!result) {
          res.status(404).send({
            message: "Profil tidak diketahui",
          });
        } 
        res.send({
          message: "Profil telah dihapus",
        });
      })
      .catch((err) => {
        res.status(409).send({
          message: err.message || "Terdapat kesalahan saat memperbarui profil.",
        });
      });
};
  
