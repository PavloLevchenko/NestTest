// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

import * as sgMail from "@sendgrid/mail";
import { authConstants } from "src/auth/constants";

sgMail.setApiKey(authConstants.sendGridApiKey!);

export const sendVerificationMail = (
  email: string,
  verificationUrl: string,
) => {
  const msg = {
    to: email, // Change to your recipient
    from: authConstants.sendGridMail!, // Change to your verified sender
    subject: "Email verification from phonebook",
    html: `<div style="text-align:center;">
        <p>By clicking on the following link, you are confirming your email address.</p>
        <a href="${verificationUrl}" target="_blank" rel="noopener noreferrer">
          <Button type="Button">Confirm email address</Button>
        </a>
      </div>`,
    trackingSettings: {
      clickTracking: {
        enable: false,
        enableText: false,
      },
      openTracking: {
        enable: false,
      },
    },
  };
  return sgMail.send(msg);
};
