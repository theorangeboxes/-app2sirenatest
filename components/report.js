const nodemailer = require('nodemailer');

exports.sendReport = lista => {
  let mailOptions = {
    from: 'matiasalvarezpruebasirenaapp@gmail.com',
    to: 'matiasalvarezpruebasirenaapp@gmail.com',
    subject: 'Reporte',
    text: `
    TOP 5 REPORT

    Title: ${lista[0].title} | Viewers: ${lista[0].viewers}
    Title: ${lista[1].title} | Viewers: ${lista[1].viewers}
    Title: ${lista[2].title} | Viewers: ${lista[2].viewers}
    Title: ${lista[3].title} | Viewers: ${lista[3].viewers}
    Title: ${lista[4].title} | Viewers: ${lista[4].viewers}
    
    
    
    
    `,
  };

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'matiasalvarezpruebasirenaapp@gmail.com',
      pass: 'SirenaAppTest',
    },
  });

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
