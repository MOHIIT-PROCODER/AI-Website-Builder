import nodemailer from 'nodemailer';

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CONTACT_EMAIL,       // your Gmail address
        pass: process.env.CONTACT_EMAIL_PASS,  // Gmail App Password
      },
    });

    // Email to YOU (owner notification)
    const ownerMailOptions = {
      from: `"Mohit AI Contact" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `📩 New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px; border: 1px solid #222;">
          <h2 style="color: #fff; margin-bottom: 4px;">New Contact Message</h2>
          <p style="color: #888; margin-top: 0;">Received from the Mohit AI contact form</p>
          <hr style="border-color: #222; margin: 20px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#a78bfa;">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background: #111; border-radius: 8px; padding: 16px; color: #ccc; white-space: pre-wrap;">${message}</div>
          <hr style="border-color: #222; margin: 20px 0;" />
          <p style="color: #555; font-size: 12px;">Sent via Mohit AI Website Builder</p>
        </div>
      `,
    };

    // Confirmation email to SENDER
    const senderMailOptions = {
      from: `"Mohit AI" <${process.env.CONTACT_EMAIL}>`,
      to: email,
      subject: `We received your message, ${name}! ✅`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px; border: 1px solid #222;">
          <h2 style="color: #fff;">Thanks for reaching out, ${name}!</h2>
          <p style="color: #aaa;">We've received your message and will get back to you within 24 hours.</p>
          <hr style="border-color: #222; margin: 20px 0;" />
          <p style="color: #888;"><strong>Your message:</strong></p>
          <div style="background: #111; border-radius: 8px; padding: 16px; color: #ccc; white-space: pre-wrap;">${message}</div>
          <hr style="border-color: #222; margin: 20px 0;" />
          <p style="color: #555; font-size: 12px;">Mohit AI Website Builder · mohitmohanta1144@gmail.com</p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(senderMailOptions);

    return res.status(200).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Contact email error:', error);
    return res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
};
