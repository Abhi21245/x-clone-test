// import nodemailer from 'nodemailer'
// import otpStore from '../otpStore.js';


// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//     // user: "bot54231h@gmail.com",
//     // pass: "ukbmsvkhuahjzths",

//   }


// })


// const sendCodeAndCheck = (email) => {

//   if (!email) {
//     return
//   }

//   const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
//   const expires = Date.now() + 10 * 60 * 1000;
//   console.log(otpCode);


//   otpStore.set(email, { otpCode, expires });


//   const mailOptions = {
//     from: `X <${process.env.EMAIL_USER}>`,
//     to: `${email}`,
//     subject: `${otpCode} is your verification code`,
//     text: `Please enter this verification code to get started: ${otpCode}. Codes expire after two hours.`, // Plain text for email clients that don't render HTML


//     html: `
//     <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333; background-color: #f7f7f7; padding: 20px;">
//       <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        
//         <h1 style="font-size: 24px; font-weight: bold; color: #222; margin-top: 0;">Confirm your email address</h1>
        
//         <p>There’s one quick step you need to complete before creating your account. Please enter this verification code to get started:</p>
        
//         <div style="font-size: 36px; font-weight: bold; letter-spacing: 4px; text-align: center; margin: 30px 0; padding: 15px; background-color: #f0f0f0; border-radius: 5px;">
//           ${otpCode}
//         </div>
        
//         <p style="font-size: 14px; color: #555;">Verification codes expire after two hours.</p>
        
//         <p style="margin-top: 30px;">Thanks,<br>The X Team</p>

//         <p style="font-size: 10px color: #373737ff " > This is a not a offical x Team this is meant for testing purposes </p>
        
//       </div>
//     </div>
//   `,
//   };

//   const sendMail = async () => {
//     try {
//       await transporter.sendMail(mailOptions);

//       console.log('Email sent successfully!',email);
      
//     } catch (error) {
//       console.error('Error sending email:', error);
//       throw error
//     }
//   };

//   sendMail()
  

// }


// export default sendCodeAndCheck



// import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
// import otpStore from '../otpStore.js';


// const emailAPI = new TransactionalEmailsApi();
// // emailAPI.authentications.apiKey.apiKey = "G8cJHX3LTjgZwzNO"
// emailAPI.authentications['apiKey'].apiKey = "G8cJHX3LTjgZwzNO";


// export const sendOtpEmail = async (email) => {
  
//   console.log("successfully entered in sendotpemail this is the user",email)
  
//   const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
//   const expires = Date.now() + 10 * 60 * 1000;
//   console.log(otpCode);


//   otpStore.set(email, { otpCode, expires });
  
  
//   const message = new SendSmtpEmail();




//   message.sender = { name: "X", email: "abhi676667@gmail.com" };
//   // message.sender = { name: "X", email: process.env.EMAIL_USER };
//   message.to = [{ email, name: email }];
//   message.subject = `${otpCode} is your verification code`;

//   message.textContent = `Please enter this verification code to get started: ${otpCode}. Codes expire after two hours.`;

//   message.htmlContent = `
//     <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333; background-color: #f7f7f7; padding: 20px;">
//       <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        
//         <h1 style="font-size: 24px; font-weight: bold; color: #222; margin-top: 0;">Confirm your email address</h1>
        
//         <p>There’s one quick step you need to complete before creating your account. Please enter this verification code to get started:</p>
        
//         <div style="font-size: 36px; font-weight: bold; letter-spacing: 4px; text-align: center; margin: 30px 0; padding: 15px; background-color: #f0f0f0; border-radius: 5px;">
//           ${otpCode}
//         </div>
        
//         <p style="font-size: 14px; color: #555;">Verification codes expire after two hours.</p>
        
//         <p style="margin-top: 30px;">Thanks,<br>The X Team</p>

//         <p style="font-size: 10px; color: #373737;">This is not an official X Team email. This is meant for testing purposes.</p>
        
//       </div>
//     </div>
//   `;

//   try {
//     const response = await emailAPI.sendTransacEmail(message);
//     console.log('✅ Email sent successfully:', response);
//     return true
//   } catch (error) {
    
//     console.error('❌ Failed to send email:', error);
//     return false
//   }
// };
// 1. Only use the main import for the full SDK object, and the named imports for types.
// We use named imports directly from the package for TransactionalEmailsApi and SendSmtpEmail.
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
import otpStore from '../otpStore.js'; // Assuming this path is correct

// 2. We no longer use SibApiV3Sdk.ApiClient.instance, so we can delete the
//    lines related to defaultClient and apiKey (which cause the error).

// 3. Instantiate the Transactional Emails API DIRECTLY
// The API Key is attached to the instance's 'authentications' property.
const apiInstance = new TransactionalEmailsApi(); // Use the named import
apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_SECRET_KEY; // Authenticate here!


/**
 * Sends an OTP email to a specific user.
 * @param {string} recipientEmail - The user's email address (where the OTP goes).
 */
// 4. Correct the function definition and export syntax.
export const sendOtpEmail = async (recipientEmail) => { 
    // 5. FIX: 'email' is undefined. Use the 'recipientEmail' argument.
    console.log("successfully entered in sendotpemail this is the user", recipientEmail); 
    
    // ... (rest of OTP generation logic remains the same)
    const senderEmail = 'abhi676667@gmail.com'; // ⬅️ MUST be a verified Brevo Sender
    const senderName = 'x';
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = Date.now() + 10 * 60 * 1000;
    console.log(otpCode);
    otpStore.set(recipientEmail, { otpCode, expires });
    
    // Create the data model for the email
    const sendSmtpEmail = new SendSmtpEmail(); // Use the named import
    
    sendSmtpEmail.subject = 'Your One-Time Password (OTP)';
    sendSmtpEmail.htmlContent = `
        <p>Hello,</p>
        <p>Your One-Time Password is: <strong>${otpCode}</strong></p>
        <p>This code is valid for 5 minutes.</p>
    `;
    
    // Who the email is going to:
    sendSmtpEmail.to = [{ 
        email: recipientEmail 
    }];
    
    // Who the email is coming from:
    sendSmtpEmail.sender = {
        name: senderName, 
        email: senderEmail
    };

    try {
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('OTP Email sent successfully. Message ID:', data.messageId);
        return true;
    } catch (error) {
        console.error('Error sending OTP email:', error.response ? error.response.body : error.message);
        return false;
    }
}