const response = await resend.emails.send({
  from: 'Acme <onboarding@resend.dev>', // this is fine for testing
  to: 'test@resend.dev',                // this is a Resend internal test inbox
  subject: 'Test Appointment Booking',
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
