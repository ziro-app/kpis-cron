const nodemailer = require('nodemailer');
const html = require('./util/html')

const enviarEmail = async (arrayEmail, number, data, dataMes, dataDia) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.user,
            pass: process.env.pass
        }
    });

    // Options para mandar o e-mail

    let mailOptions = {
        from: 'relatorios.ziro@gmail.com',
        to: arrayEmail[number],
        subject: `VENDAS ${data.values[1][1]}`,
        html: html(data, dataMes, dataDia)
    }
        return new Promise((resolve,reject)=>{
            transporter.sendMail(mailOptions, function(err,data){
                if(err){
                    reject()
                    console.log("Deu erro", err)
                }else{
                    resolve("Enviado com sucesso!", data)
                }
            })
        })
}

module.exports = enviarEmail