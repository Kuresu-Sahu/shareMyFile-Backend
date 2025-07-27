const nodemailer = require('nodemailer');

module.exports = async ({ to, subject, text, html }) => {
    console.log("📤 Preparing to send email...");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("From (your Gmail):", process.env.MAIL_USER);

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    try {
        let info = await transporter.sendMail({
            from: `shareMyFile <${process.env.MAIL_USER}>`,
            to: to,
            subject: subject,
            text: text,
            html: html,
        });

        console.log("✅ Email sent successfully:", info.messageId);
    } catch (err) {
        console.error("❌ Error sending email:", err);
    }
};
