
const axios = require("axios");

exports.createKhaltiPayment = async (req, res) => {
  try {
    const { orderId, email, items, totalAmount, shippingAddress } = req.body;

    console.log('Received Khalti payment request:', { orderId, email, totalAmount });

    // Validate required fields
    if (!orderId || !email) {
      console.log('Missing required fields:', { orderId: !!orderId, email: !!email });
      return res.status(400).json({
        message: "Order ID and email are required."
      });
    }

    // Required URLs
    const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080';
    const returnUrl = `${FRONTEND_URL}/payment-success?order=${orderId}`;
    const websiteUrl = FRONTEND_URL;

    // Create product name from items
    let productName = "Helmet Order";
    if (items && items.length > 0) {
      if (items.length === 1) {
        productName = items[0].name || "Helmet";
      } else {
        productName = `${items.length} Helmets`;
      }
    }

    // Khalti payment payload
    const khaltiPayload = {
      public_key: process.env.KHALTI_PUBLIC_KEY,
      amount: Math.round(totalAmount * 100), // Convert to paisa
      return_url: returnUrl,
      website_url: websiteUrl,
      purchase_order_id: orderId,
      purchase_order_name: productName,
      product_identity: orderId,
      product_name: productName,
      customer_info: {
        name: shippingAddress?.fullName || "Customer",
        email: email,
        phone: shippingAddress?.phone || ""
      },
      amount_breakdown: [
        {
          label: "Total Amount",
          amount: Math.round(totalAmount * 100)
        }
      ],
      customer_details: {
        name: shippingAddress?.fullName || "Customer",
        email: email,
        phone: shippingAddress?.phone || "",
        address: {
          street: shippingAddress?.address || "",
          city: shippingAddress?.city || "",
          state: "",
          zipcode: shippingAddress?.postalCode || "",
          country: shippingAddress?.country || "Nepal"
        }
      },
      shipping_details: {
        name: shippingAddress?.fullName || "Customer",
        phone: shippingAddress?.phone || "",
        address: {
          street: shippingAddress?.address || "",
          city: shippingAddress?.city || "",
          state: "",
          zipcode: shippingAddress?.postalCode || "",
          country: shippingAddress?.country || "Nepal"
        }
      },
      merchant_extra: {
        orderId: orderId.toString(),
        userEmail: email,
        totalAmount: totalAmount.toString(),
      }
    };

    console.log('Creating Khalti payment with payload:', khaltiPayload);

    // Create Khalti payment
    const khaltiResponse = await axios.post(
      'https://a.khalti.com/api/v2/epayment/initiate/',
      khaltiPayload,
      {
        headers: {
          'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Khalti payment created successfully:', khaltiResponse.data);

    res.status(200).json({
      payment_url: khaltiResponse.data.payment_url,
      pidx: khaltiResponse.data.pidx,
      message: "Payment initiated successfully"
    });

  } catch (err) {
    console.error("Khalti payment error:", err.response?.data || err.message);
    res.status(500).json({
      message: "Khalti payment creation failed",
      error: err.response?.data?.message || err.message,
    });
  }
};

exports.verifyKhaltiPayment = async (req, res) => {
  try {
    const { pidx } = req.body;

    if (!pidx) {
      return res.status(400).json({
        message: "Payment ID (pidx) is required."
      });
    }

    console.log('Verifying Khalti payment with pidx:', pidx);

    // Verify payment with Khalti
    const verificationResponse = await axios.post(
      'https://a.khalti.com/api/v2/epayment/lookup/',
      { pidx },
      {
        headers: {
          'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const paymentData = verificationResponse.data;

    if (paymentData.status === 'Completed') {
      // Payment successful - update order status
      const Order = require("../models/Order");
      const sendEmail = require("../utils/sendEmail");

      const orderId = paymentData.merchant_extra?.orderId;
      const userEmail = paymentData.merchant_extra?.userEmail;

      if (orderId) {
        const order = await Order.findByIdAndUpdate(
          orderId,
          {
            paymentStatus: "Paid",
            orderStatus: "Processing",
            khaltiPidx: pidx,
          },
          { new: true }
        ).populate("user").populate("items.helmet").populate("items.config");

        if (order && userEmail) {
          // Send confirmation email
          const itemsList = order.items.map(item => {
            const helmetName = item.helmet?.name || "Helmet";
            const size = item.size || "Standard";
            const color = item.color || "Standard";
            return `${helmetName} - Size: ${size}, Color: ${color} - ₹${item.price.toFixed(2)}`;
          }).join(", ");

          const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #333; text-align: center;">Thank you for your purchase!</h2>
              <p>Your order #${orderId} has been confirmed and payment received via Khalti.</p>
              <div style="border-top: 2px solid #ddd; padding-top: 15px; margin-top: 20px; background: #f9f9f9; padding: 15px; border-radius: 5px;">
                <p><strong>Items:</strong> ${itemsList}</p>
                <p><strong>Total:</strong> ₹${order.totalAmount.toFixed(2)}</p>
                <p><strong>Status:</strong> ${order.orderStatus}</p>
                <p><strong>Payment ID:</strong> ${pidx}</p>
              </div>
              <p style="margin-top: 20px;">We will notify you once your order ships.</p>
              <p style="color: #666; font-style: italic;">Thank you for choosing our helmet shop!</p>
            </div>
          `;

          await sendEmail(userEmail, `Order Confirmation #${orderId} - Helmet Shop`, emailHtml);
        }
      }

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        payment_data: paymentData
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed",
        status: paymentData.status
      });
    }

  } catch (err) {
    console.error("Khalti verification error:", err.response?.data || err.message);
    res.status(500).json({
      message: "Payment verification failed",
      error: err.response?.data?.message || err.message,
    });
  }
};
