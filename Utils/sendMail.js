const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'forwarder50@gmail.com',
              pass: 'cqxj werr gcpz cmvk '
            }
          });
          
          const mailOptions = {
            from: 'forwarder50@gmail.com',
            to: email,
            subject: subject,
            text: text,
          };
          
		await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
           console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              // do something useful
            }
          });
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};