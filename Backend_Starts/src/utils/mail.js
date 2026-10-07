import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail=async(options)=>{
    
}

const emailVerificationMailgenContent=(username,
    verficationUrl
)=>{
    return{
        body: {
            name:username,
            intro:"Welcome to Our App! ",
            action:{
                instructions: "To Verify your account please proceed",
                button:{
                    color:"#22BC66",
                    text: "Verify your email",
                    link: verficationUrl
                }
            },
            outro:"Need Help or have questions ? just reply to the email "
        }
    }
};

const forgotPasswordMailgenContent=(username,
    PasswordResetUrl
)=>{
    return{
        body: {
            name:username,
            intro:"reset ur acc",
            action:{
                instructions: "To reset your account please proceed",
                button:{
                    color:"#22BC66",
                    text: "Verify your email",
                    link: PasswordResetUrl
                }
            },
            outro:"Need Help or have questions ? just reply to the email "
        }
    }
};

export {emailVerificationMailgenContent,forgotPasswordMailgenContent};