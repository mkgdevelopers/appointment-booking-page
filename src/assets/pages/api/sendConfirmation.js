import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { fullName, email, phone, currentJob, date, time } = req.body;

    const response = await resend.emails.send({
      from: 'Your Site <onboarding@resend.dev>',
      to: 'muaaznaeemoff@gmail.com', // Change this to your actual email
      subject: 'New Appointment Booking',
      html: `
        <h2>New Appointment Booked</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Current Job:</strong> ${currentJob}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
      `,
    });

    return res.status(200).json({ message: 'Email sent successfully', response });
  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).json({ message: 'Failed to send email', error });
  }
}
