export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { fullName, email, phone, currentJob, date, time } = req.body;

    // Your email logic here (e.g., using nodemailer or a third-party service)
    console.log("Sending email with:", req.body);

    // For now, just return success
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending failed:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
