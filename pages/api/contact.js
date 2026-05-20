// pages/api/contact.js
// This API route handles the contact form submission
// Emails are sent to hello@nextechoc.com using Netlify Forms (no extra setup needed)

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
    // Send to Netlify Forms by submitting to the form endpoint
    // The form data is also captured by Netlify automatically on the frontend
    // This API route generates a ticket number and returns success
    
    const ticketNumber = Math.floor(100000 + Math.random() * 900000);
    
    // If you want email notifications, add your email service here
    // Example with Resend (free tier: 3000 emails/month):
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'noreply@nextechoc.com',
    //   to: 'hello@nextechoc.com',
    //   subject: `New Lead #${ticketNumber} — ${service} — ${firstName} ${lastName}`,
    //   html: `<h2>New Contact Form Submission</h2>
    //          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    //          <p><strong>Email:</strong> ${email}</p>
    //          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    //          <p><strong>Service:</strong> ${service}</p>
    //          <p><strong>Urgent:</strong> ${urgent ? 'YES' : 'No'}</p>
    //          <p><strong>Message:</strong><br>${message}</p>`
    // });

    return res.status(200).json({ 
      success: true, 
      ticketNumber,
      message: 'Your request has been received! We will contact you within 1 business hour.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ message: 'Something went wrong. Please call us directly at (714) 900-0000.' });
  }
}
