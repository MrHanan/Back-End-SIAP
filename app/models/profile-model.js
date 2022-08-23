module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            Name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
            instansi: {
                type: String,
                required: true,
            },
            alamat: {
                type: String,
                required: true,
            },
            tlp: {
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

    const Profile = mongoose.model("profile", schema);
    return Profile;
}