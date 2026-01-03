const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email, otp) => {
  await resend.emails.send({
    from: "MyStore <onboarding@resend.dev>",
    to: email,
    subject: "Your OTP Verification Code",
    html: `<h2>Your OTP: ${otp}</h2><p>Valid for 5 minutes</p>`
  });

  console.log("OTP email sent via Resend to:", email);
};

module.exports = sendEmail;
