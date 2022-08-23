module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            namaPemohon: {
                type: String,
                required: true
            },
            namaPenerima: {
                type: String,
            },
            jenisSurat: {
                type: String,
                required: true,
            },
            catatan: {
                type: String,
            },
            surat: {
                type: String,
                required: true
            },

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