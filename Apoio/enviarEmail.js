const nodemailer = require('nodemailer');
const html = require('./util/html')

const enviarEmail = async (arrayEmail, number, data) => {
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
        html: html(data)
    }
        return new Promise((resolve,reject)=>{
            transporter.sendMail(mailOptions, function(err,data){
                if(err){
                    if(err.response){
                        reject(err.response)
                    }else if(err.code === 'ESOCKET'){
                        reject(err.code)
                        console.log(err.code, "Erro ao conectar ao servidor, verifique se os parâmetros no options estão corretos")
                    }
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
}

module.exports = enviarEmail