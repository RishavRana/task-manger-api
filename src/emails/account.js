const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)



const sendWelcomeMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rishavr10000@gmail.com',
        subject: 'Thanks For Joining',
        text: 'Welcome to app ,' + name + ' , We will better together.',
    })
}

const sendCancelMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rishavr10000@gmail.com',
        subject: 'Sorry to See you GO!! ',
        text: 'Goodbye ' + name + ' I hope to see you back some time soon!!!!! ;)'
    })
}



module.exports = {
    sendWelcomeMail,
    sendCancelMail
}