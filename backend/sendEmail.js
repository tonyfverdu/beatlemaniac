import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()


export default async function sendMail(mail, token) {
  // Email Daten aus .env laden
  const { MAIL_HOST, MAIL_PW, MAIL_USER } = process.env

  // Konfiguration für deinen Email Anbieter
  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: 465, // meistens 465 für verschlüsselte Kommunikation
    secure: true, // true for 465, false for other ports
    auth: {
      user: MAIL_USER, // Deine Benutzername
      pass: MAIL_PW // Dein Passwort
    }
  })

  // Die Email, die verschickt wird
  const info = await transporter.sendMail({
    from: '"Christoph 👻"', // Wir
    to: mail, // Empfänger
    subject: "Aktiviere deine Email bei uns ✔", // Betreffzeile
    text: `Zur Aktivierung folgenden Link klicken: http://localhost:3001/user/email-val/${token}`, // Inhalt als reiner Text (falls html beim Nutzer ausgeschaltet ist)
    html: `<p>Zur Aktivierung deiner Email klicke folgenden <a href="http://localhost:3001/user/email-val/${token}">Link</a></p>` // Inhalt als html formatiert
  })

  // Rückgabeinformationen für das Backend (u.a. messageId für speichern in logs etc.)
  return info
}

// Die Funktion per Hand starten zum Testen
// const result = await sendMail('meineMail@mich.de', 'asdfeghjsd.1232762423as.hskjdhsd')
// console.log(result)