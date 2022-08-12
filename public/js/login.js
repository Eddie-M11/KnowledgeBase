const nodemailer = require("nodemailer");

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

function sendEmails() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "outlook",
    // secure: false, // true for 465, false for other ports
    auth: {
      user: "KnowledgeBaseacct@outlook.com", // generated ethereal user
      pass: "PassWord4321!", //' generated ethereal password
    },
  });

  // send mail with defined transport object
  const emails = {
    from: "knowledgebaseacct@outlook.com", // sender address
    to: "Solen.Iyassu@gmail.com, baz@example.com", // list of receivers
    subject: "Welcome to KnowledgeBase ✔", // Subject line
    text: "Thank you for joining KnowledgeBase", // plain text body
    // html body
  };

  transporter.sendMail(emails, function (error, info) {
    if (error) {
      console.log(err);
      return;
    }

    // console.log("Message sent: %s", info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log(`sent:$ {info}.response`);
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
}

// main().catch(console.error);

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

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
