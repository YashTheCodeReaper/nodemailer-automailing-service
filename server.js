require("dotenv").config();
const app = require("./app.js");
const nodemailer = require("nodemailer");

// Creating server
app.listen(process.env.PORT || 8080, () => {
  console.log("server created at port: " + 3000 || process.env.PORT);
});

app.post("/sendMail", (req, res) => {
  let { nodemailerEmail, nodemailerPassword, subject, text } = req.body;

  if (nodemailerEmail && nodemailerPassword && subject && text) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: nodemailerEmail,
        pass: nodemailerPassword,
      },
    });

    const options = {
      from: nodemailerEmail,
      to: nodemailerEmail,
      subject: subject,
      text: text,
    };

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        res.send({
          status: "failure",
          message: "Internal Server Error",
        });
        return;
      }
      res.send({
        status: "success",
        message: info.response,
      });
    });
  } else {
    res.send({
      status: "failure",
      message: "Invalid Request Body Object",
    });
  }
});
