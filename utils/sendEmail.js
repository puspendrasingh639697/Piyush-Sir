import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // 1. Transporter banao (Gmail use kar rahe hain)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    // YE WALA PART ADD KARO 👇
    tls: {
        rejectUnauthorized: false
    }
});

    // 2. Email options set karo
    const mailOptions = {
        from: `E-Shop Noida <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // 3. Email bhejo
    await transporter.sendMail(mailOptions);
};

export default sendEmail;