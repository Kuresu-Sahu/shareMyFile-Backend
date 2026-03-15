const nodemailer = require('nodemailer');

module.exports = async ({ to, subject, text, html }) => {

    console.log("Preparing to send email...");

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    try {

        await transporter.verify();
        console.log("SMTP connection established");

        let info = await transporter.sendMail({
            from: `shareMyFile <${process.env.MAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("Email sent:", info.response);

    } catch (err) {
        console.error("Mail error:", err);
    }
};
