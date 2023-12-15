const aws = require("aws-sdk");
const endpoint = new aws.Endpoint(process.env.BACKBLAZE_URL);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        secretAccessKey: process.env.BACKBLAZE_APPLICATIONKEY,
        accessKeyId: process.env.BACKBLAZE_KEYID
    }
})

module.exports = s3;