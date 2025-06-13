const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {
    //create Tranceporter
    const transporter = nodeMailer.createTransport({
        host : process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })

    //Difine the Email option
    const mailOptions = {
        from:`Natours <${process.env.EMAIL_USER}>`,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    //Actualy send the Email
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;