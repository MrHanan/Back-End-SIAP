module.exports = (mongoose) => {
    const bcrypt = require('bcrypt')
    const { roles } = require('../../utils/constants')
    
    const schema = mongoose.Schema(
        {
            nama: {
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
            role: {
                type: String,
                enum: [roles.admin, roles.guru, roles.kepsek],
                default: roles.guru
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
    schema.pre('save', async function(next){
        try {
            if (this.isNew){
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(this.password, salt)
                this.password = hashedPassword
                
                if(this.email === process.env.ADMIN_EMAIL){
                    this.role = roles.admin
                } else if(this.email === process.env.KEPSEK_EMAIL){
                    this.role = roles.kepsek
                }
            }
            next()
        } catch (error) {
            next(error)
        }
    })

    // schema.methods.isValidPassword = async function(password){
    //     try {
    //         return await bcrypt.compare(password, this.password)
    //     } catch (error) {
    //         throw error.InternalServerError(error.message)
    //     }
    // }

    const User = mongoose.model("user", schema);
    return User;
}