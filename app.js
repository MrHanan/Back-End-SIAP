const express = require("express");
const cors = require("cors");
const multer = require("multer");


const app = express();
const PORT = 5000;
const ADDRESS = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";   

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        //Setting destination of uploading files
        if(file.fieldname === "temp"){
            // If uploading template
            cb(null, "public/templates")  
        } else if (file.fieldname === "surat"){
            //if uploading surat
            cb(null, "public/letters")
        } 
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + "-" + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "temp"){
        if(
            file.mimetype === "application/pdf" ||
            file.mimetype === "application/msword" ||
            file.mimetype ===  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ){
            cb(null, true)
        } else {
            cb(null, false)
        }
    } else if(file.fieldname === "surat"){
        if(
            file.mimetype === "application/pdf" ||
            file.mimetype === "application/msword" ||
            file.mimetype ===  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ){
            cb(null, true)
        } else {
            cb(null, false)
        }
    } else {
        cb(null, false)
    }   
}

app.use(
    cors({
        origin: "*"
    })
)

app.use(express.json({
    limit: "50mb",
    extended: true
}))

app.use(express.urlencoded({
    limit: "500mb",
    parameterLimit: 100000,
    extended: true
}))

//change directory to public
app.use("/public/template", express.static("/public/template"))
app.use("/public/letter", express.static("/public/letter"))

// // Setup pdf-thumbnail
// app.get('/thumbnail', (req, res) => {
//     const { filename } = req.query

//     const inputPath  = path.resolve(__dirname, `../public/template//${filename}`)
//     const outputPath = path.resolve(__dirname, `../public/template//${filename}.png`)

//     const getThumbFromPDF = async () => {
//         const doc = await PDFNet.PDFDoc.createFromFilePath(inputPath)
//         await doc.initSecurityHandler()
//         const PDFDraw = await PDFNet.PDFDoc.create(92)
//         const currPage = await doc.getPage(1)
//         await PDFDraw.export(currPage, outputPath, 'PNG')
//     }

//     PDFNet.runWithCleanup(getThumbFromPDF).then(() => {
//         fs.readFIle(outputPath, (err, data) => {
//             if(err){
//                 res.statusCode = 500
//                 res.end(err)
//             } else {
//                 res.setHeader('ContentType', 'image/png')
//                 res.end(data)
//             }
//         })
//     }).catch(err => {
//         res.statusCode = 500
//         res.end(err)
//     })
// })


// Setup middleware multer

app.use(
    multer({
        storage: fileStorage,
        fileFilter: fileFilter,
    }).fields([
        {
            name: "temp",
            maxCount: 1
        },
        {
            name: "surat",
            maxCount: 1
        }
    ])
)

// Configurasi mongoose
const db = require("./app/models/");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected")
    })
    .catch((err) => {
        console.log("Cannot connect to the database", err)
        process.exit()
    })

// Directory Home
app.get("/", (req, res) => {
    res.json({
        message: "welcome to API"
    })
})


//Call routes surat
require("./app/routes/surat-route")(app)

//Call routes profile
require("./app/routes/profile-route")(app)

//Call routes template
require("./app/routes/template-route")(app)

//Setup listen port
app.listen(PORT, ADDRESS, () => {
    console.log(`Server is running on http://${ADDRESS}:${PORT}`)
})