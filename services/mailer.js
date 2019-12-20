const nodemailer = require('nodemailer');


async function sendMailPromise(data) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      pool: true,
      auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS,
      },
    });

    const mailOptions = {
      from: 'raf.mailit@gmail.com',
      to: 'dusangp@gmail.com',
      subject: 'Test',
      html: `<p><strong>${data}</strong></p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      transporter.close();
      if (err) reject(new Error('Failed to send mail'));
      else {
        console.log(info);
        resolve(true);
      }
    });
  });
}
async function sendMail(data) {
  await sendMailPromise(data);
}

module.exports = sendMail;
