
const { Resend } = require("resend");

const sendEmail = async (to, subject, html) => {
  console.log("📧 sendEmail function called with:");
  console.log("- To:", to);
  console.log("- Subject:", subject);
  console.log("- FROM_EMAIL env:", process.env.FROM_EMAIL);
  console.log("- RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);

  // Validate required environment variables
  if (!process.env.RESEND_API_KEY) {
    const error = "RESEND_API_KEY environment variable is not set";
    console.error("❌", error);
    return { success: false, error };
  }

  if (!process.env.FROM_EMAIL) {
    const error = "FROM_EMAIL environment variable is not set";
    console.error("❌", error);
    return { success: false, error };
  }

  // Validate email parameters
  if (!to || !subject || !html) {
    const error = "Missing required email parameters";
    console.error("❌", error, { to: !!to, subject: !!subject, html: !!html });
    return { success: false, error };
  }

  try {
    console.log("🔧 Initializing Resend client...");
    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log("🚀 Sending email via Resend...");
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: to,
      subject: subject,
      html: html,
    });

    console.log("✅ Email sent successfully!");
    console.log("- To:", to);
    console.log("- Resend ID:", response.id);
    console.log("- Response:", response);

    return { success: true, response };

  } catch (error) {
    console.error("❌ Failed to send email:");
    console.error("- Error message:", error?.message || error);
    console.error("- Error details:", error);

    // Return detailed error information
    return {
      success: false,
      error: error?.message || "Unknown email error",
      details: error
    };
  }
};

module.exports = sendEmail;
