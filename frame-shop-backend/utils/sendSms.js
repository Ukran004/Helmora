const twilio = require("twilio");

// Load credentials from .env file
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromWhatsApp = process.env.TWILIO_WHATSAPP_NUMBER;

const client = twilio(accountSid, authToken);

exports.sendSMS = async (to, message) => {
    try {
        // Ensure phone is formatted correctly for WhatsApp
        const formattedNumber = to.startsWith("+") ? to : `+977${to}`;

        await client.messages.create({
            body: message,
            from: fromWhatsApp,
            to: `whatsapp:${formattedNumber}`,
        });

        console.log("✅ WhatsApp message sent to:", formattedNumber);
    } catch (error) {
        console.error("❌ Failed to send WhatsApp message:", error.message);
        throw new Error("Failed to send WhatsApp message");
    }
};
