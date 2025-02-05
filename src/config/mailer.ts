import nodemailer from "nodemailer";

const mailSender = process.env.MAIL_SENDER;
const mailToken = process.env.MAIL_TOKEN;
const clientId = process.env.CLIENT_ID;
const refreshToken = process.env.REFRESH_TOKEN;


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: mailSender,
    clientSecret: mailToken,
    clientId: clientId,
    refreshToken: refreshToken,
  },
});

export class Mailer {
  static createMessageObject(
    emailToBeSendedTo: string,
    subject: string,
    messageText: string
  ) {
    const messageObject = {
      from: mailSender,
      to: emailToBeSendedTo,
      subject: subject,
      text: messageText,
    };

    return messageObject;
  }

  public static sendEmail(
    emailToBeSendedTo: string,
    subject: string,
    messageText: string
  ) {

    const messageObject = Mailer.createMessageObject(
      emailToBeSendedTo,
      subject,
      messageText
    );

    transporter.sendMail(messageObject, (error, info) => {
      if (error) {
        console.error("Email sending failed:", error.message);
        throw error;
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
  }
}