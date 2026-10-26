import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail=async(options)=>{
    const mailGenerator=new Mailgen({
        theme:"default",
        product:{
            name:"Task Manager",
            link:"https://google.com"

        }
    })

    const emailTextual=mailGenerator.generatePlaintext(options.mailgenContent);
    const emailTextualHTML=mailGenerator.generate(options.mailgenContent)


    const transporter=nodemailer.createTransport({
        host:proccess.env.MAILTRAP_SMTP_HOST,
        port:proccess.env.MAILTRAP_SMTP_PORT,
        auth:{
            user:proccess.env.MAILTRAP_SMTP_USER,
            pass:proccess.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail={
        from:"mail.taskmanager@email.com",
        to:options.email,
        subject:options.subject,
        text:emailTextual,
        html:emailTextualHTML
    }
    try{
        await transporter.sendMail(mail)
    }catch(error){
        console.error("Email service failed silently Make sure about credentials or mail trap credentials");
        console.error(error);
    }
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
                    text: "Reset Button",
                    link: PasswordResetUrl
                }
            },
            outro:"Need Help or have questions ? just reply to the email "
        }
    }
};

export {emailVerificationMailgenContent,forgotPasswordMailgenContent,sendEmail};