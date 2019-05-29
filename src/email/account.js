const sgMail = require('@sendgrid/mail');

// set api key to use
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'sushycom@gmail.com',
        subject: 'Welcome to Task Manager App',
        text: `Welcome ${name} to the Task Manager App. Manage your tasks using our latest api !`
    };
    sgMail.send(msg);
}

const sendAccDeleteEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'sushycom@gmail.com',
        subject: 'Welcome to Task Manager App',
        text: `Good Bye ${name}! 
        Please let us know your feedback or the reason to delete account. We'll definitely work on it.`
    };
    sgMail.send(msg);
}

module.exports = {
    sendWelcomeEmail,
    sendAccDeleteEmail
}