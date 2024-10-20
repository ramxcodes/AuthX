import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject:"verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Email sent successfully", response);
        
    } catch (error) {
        console.error(`Error Sending Verification`, error)
        throw new Error(`Error sending Verification Email: ${error}`)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}]
    try {
       
        const response = await mailtrapClient.send ({
            from: sender,
            to: recipient,
            template_uuid: "be53c495-b94e-44d0-8778-a30ba20387f1",
            template_variables: {
                "company_info_name": "AuthX",
                "name": name,
              }
        });
        console.log("Welcome Email sent successfully", response);

    } catch (error) {
        console.error(`Error Sending Welcome Email`, error)
        throw new Error(`Error sending Welcome Email: ${error}`)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{email}]
    try {
       
        const response = await mailtrapClient.send ({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "password Reset"
        });
        console.log("Welcome Email sent successfully", response);

    } catch (error) {
        console.error ("Error sending password reset email" ,error)
        throw new Error (`Error sending password reset email: ${error}` )
    }
}