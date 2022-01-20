import nodemailer from 'nodemailer'

export function otpGenerator(){
    let otp='';
    for(let i=0;i<4;i++){
      otp+= Math.round(Math.random()*9)
    }
    return otp;
  }

export const mailTransport = ()=>
        nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD
            }
        });

export const mailTemplate = (OTP) =>(
    `<!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      </head>
      <body style="font-family: sans-serif;">
        <div style="display: block; margin: auto; max-width: 600px; color: #272727;" class="main">
          <h1 style="font-size: 18px; padding:10px; font-weight: bold; margin-top: 20px">Welcome student!</h1>
          <p>Your Verification code for signing up is:</p>
          <p style="width: 80px; margin:0 auto; font-size:25px; font-weight:bold; text-align:center; background:#f6f6f6;">${OTP}</p>
          <p>Good luck!</p>
        </div>
        <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
        <style>
          .main { background-color: white; }
          a:hover { border-left-width: 1em; min-height: 2em; }
        </style>
      </body>
    </html>`
)