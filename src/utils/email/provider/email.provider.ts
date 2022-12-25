import * as nodemailer from 'nodemailer';
export const MailerProvider = {
    provide: "MAILER_PROVIDER",
    useFactory: () => {
        const obj = {
            port: 587,
            secure: true,
            tls: {
                ciphers: 'SSLv3'
            }
        }
        const address = "smtp://info@novintex.info:1958+@OHParw@smtp.office365.com?" + new URLSearchParams(JSON.stringify(obj)).toString();
        const transporter = nodemailer.createTransport(address)
        return transporter
    }
}