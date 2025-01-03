const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'mail.contabilidadebicalho.com.br',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, message) => {

  const formattedMessage = message.replace(/\n/g, '<br>');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
      <div style="text-align: left; border-bottom: 1px solid #ccc;">
        <h1 style="font-size: 24px; color: #333;">${subject}</h1>
      </div>
      <div style="color: #333; line-height: 1.5;">
        <p>${formattedMessage}</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: '"Oxygenserver" <rocks@oxygenserver.com>',
    to,
    subject,
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = sendEmail;