const nodemailer = require("nodemailer");

const sendContactEmail = async (req, res) => {

    const { name, email, phone, subject, message } = req.body;

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });


        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form: ${subject}`,
            text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
            `
        });


        res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Email sending failed"
        });

    }
};


module.exports = { sendContactEmail }; 