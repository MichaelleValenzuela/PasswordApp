import { createTransport } from '../config/nodemailer.js'

export async function envioEmailVerificacion({name, email, token}){
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
        )

    //Enviar email
    const info = await transporter.sendMail({
        from: 'PasswordApp <cuentas@passwordapp.com>',
        to: email,
        subject: "PasswordApp - Confirma tu cuenta",
        text: "PasswordApp - Confirma tu cuenta",
        html: `<p>Hola: ${name}, confirma tu cuenta en PasswordApp</p>
        <p>Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>`
    })

    console.log('Mensaje enviado', info.messageId)
}
