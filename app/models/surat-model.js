module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            nomorSurat: {
                type: String,
                required: true
            },
            namaPemohon: {
                type: String,
                required: true
            },
            namaPenerima: {
                type: String,
                required: true
            },
            jenisSurat: {
                type: String,
                required: true,
            },
            tanggalSurat: {
                type: String,
                required: true
            },
            hariKegiatan: {
                type: String,
                required: true
            },
            tanggalKegiatan: {
                type: String,
                required: true
            },
            waktuKegiatan: {
                type: String,
                required: true
            },
            tempatKegiatan: {
                type: String,
                required: true
            },
            signature: {
                type: String,
            },
            pesan: {
                type: String
            }

        },
        {
            timestamps: true,
        }
    )
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Letter = mongoose.model("letter", schema);
    return Letter;

}