// pages/api/contact.js
import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, service, message, urgent } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !service || !message) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (message.trim().length < 10) {
    return res.status(400).json({ message: 'Message must be at least 10 characters.' });
  }

  try {
    const ticketNumber = Math.floor(100000 + Math.random() * 900000);
    const resend = new Resend(process.env.SEND_API_KEY);

    await resend.emails.send({
      from: 'noreply@nextechoc.com',
      to: 'nirowebix@gmail.com',
      subject: `New Lead #${ticketNumber} — ${service} — ${firstName} ${lastName}`,
      html: `<h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Urgent:</strong> ${urgent ? 'YES' : 'No'}</p>
        <p><strong>Message:</strong><br>${message}</p>`
    });

    return res.status(200).json({ 
      message: 'Message sent successfully!', 
      ticketNumber 
    });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
}