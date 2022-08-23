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
            temp: {
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

    const Template = mongoose.model("templates", schema);
    return Template;

}