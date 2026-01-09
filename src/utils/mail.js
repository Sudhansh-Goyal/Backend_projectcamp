import Mailgen from "mailgen";
import nodemailer from "nodemailer"


const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagelink.com"
        }
    });


    // Generate HTML email
    const emailHtml = mailGenerator.generate(options.mailgenContent);

    // Generate plain text email
    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);



const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: Number(process.env.MAILTRAP_SMTP_PORT),
    auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS
    }
});

const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml
};

try {
    await transporter.sendMail(mail);
} catch (error) {
    console.error("Error sending email:", error);
    
}
}

const emailVerificationmailgenContent=(username,url)=>{
    return {
        body:
        {
            name: username,
            intro: "welcome to our website , its great to have u here",
            action:{
                instructions: "to proceed further please click on the link given below",
                button:{
                    color:"green",
                    text:"verify your mail",
                    url: url
                },
            },
            outro: "incase of any doubts please reply back to our mail"
        }
    }
}


const forgotpasswordmailgenContent=(username,passwordreseturl)=>{
    return {
        body:
        {
            name: username,
            intro: "request to generate password",
            action:{
                instructions: "to proceed further please click on the link given below",
                button:{
                    color:"green",
                    text:"reset password",
                    url: passwordreseturl
                },
            },
            outro: "incase of any doubts please reply back to our mail"
        }
    }
}

export  {forgotpasswordmailgenContent,emailVerificationmailgenContent,sendEmail}