const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};
console.log("Logged In Successfully");



const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();

  if (name && email && password && username) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
      main();
    } else {
      alert("User Not Created");
      sendEmails();
    }
  }
};
function sendEmails() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "https://outlook.live.com/mail/0/",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'KnowledgeBaseAcct@outlook.com', // generated ethereal user
      pass: 'PassWord4321!', // generated ethereal password
    },
    tls: {
      rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Nodemailer" <KnowledgeBaseAcct@outlook.com.com>', // sender address
    to: "Solen.Iyassu@gmail.com, baz@example.com", // list of receivers
    subject: "Welcome to KnowledgeBase ✔", // Subject line
    text: "Thank you for joining Knowledge Base. We want to welcome you to our site, feel free to use our services", // plain text body
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent:
  // Preview only available when sending 
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL
  res.render('contact', {msg:'Confirmation has been sent!'});
}

sendEmails().catch(console.error);

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler, sendEmails);
