const nodemailer = require('nodemailer');
const { EmailTemplate } = require('email-templates');
const path = require('path');

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

    const myTemplate = new EmailTemplate(path.join(__dirname, '../templates'));
    const locals = {
      name: data.name,
      currencies: data.currencies,
    };
    myTemplate.render(locals, (err, result) => {
      if (err) {
        console.error(err);
      }
      const mailOptions = {
        from: 'raf.mailit@gmail.com',
        to: data.email,
        subject: 'Test',
        html: result.html,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(new Error('Failed to send mail'));
        }
        console.log(info);
        resolve(true);
      });
    });

    // transporter.sendMail(mailOptions, (err, info) => {
    //   transporter.close();
    //   if (err) reject(new Error('Failed to send mail'));
    //   else {
    //     console.log(info);
    //     resolve(true);
    //   }
    // });
  });
}

async function sendMail(data) {
  await sendMailPromise(data);
}

module.exports = sendMail;
