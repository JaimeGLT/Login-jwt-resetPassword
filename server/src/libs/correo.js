const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "jaimeguzmanlt@gmail.com",
    pass: "gyes wdfu hjax mqhi",
  },
});

async function main(email, token) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Forgot Password 👻" <maddison53@ethereal.email>', // sender address
      to: email, // list of receivers
      subject: "Forgot Password  ✔", // Subject line
      html: `
      <b>Ingresa a este enlace para cambiar tu contraseña</b> 
      <a href="http://5173/change-password/${token}">Cambiar Contraseña</a>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>}
}

module.exports = main;
