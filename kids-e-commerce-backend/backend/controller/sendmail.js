const nodemailer = require("nodemailer");
const cron = require("node-cron");

const sendmail = async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: 'ezequiel10@ethereal.email',
        pass: 'X42EHU4A7WxxpGkjca'
      },
    });

    transporter.sendMail({
      from: "ezequiel10@ethereal.email",
      to: "abhishektomar9211@gmail.com",
      subject: "chalo hello ✔",
      text: "Hello world okay",
      html: "<b>Hello world okay ok</b>",
    }, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).send("An error occurred while sending the email.");
      } else {
        console.log("Email sent:", info.response);
        res.send(info);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while sending the email.");
  }
};

// Schedule the task to run after a delay of 1 minute
const cronJob = cron.schedule("* * * * *", () => {
  sendmail();
}, {
  scheduled: false, // Prevent immediate execution
});

// Start the scheduler with a delay of 1 minute
setTimeout(() => {
  // cronJob.start();
  
  // Stop the scheduler after 5 minutes
  setTimeout(() => {
    // cronJob.stop();
    console.log("Scheduler stopped after 5 minutes.");
  }, 5 * 60 * 1000); // 5 minutes in milliseconds
}, 60000);

module.exports = sendmail;
