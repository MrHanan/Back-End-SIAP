module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            nama: {
                type: String,
                required: true,
            },
            desc: {
                type: String,
                required: true,
            },
            surat: {
                type: String,
                required: true,
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

    const Template = mongoose.model("template", schema);
    return Template;

}