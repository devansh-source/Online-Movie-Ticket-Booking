const nodemailer = require('nodemailer');
// 1. Create a transporter object (using environment variables from .env)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// --- NEW FUNCTION: Send Welcome Email ---
const sendRegistrationWelcome = async (userEmail, userName) => {
    const mailOptions = {
        from: `CinePass <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `🎉 Welcome to CinePass, ${userName}!`,
        text: `Hello ${userName},\n\nThank you for registering at CinePass. You can now log in and book your favorite movies!\n\nHappy Booking!`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #007bff;">Welcome to CinePass!</h2>
                <p>Hello <strong>${userName}</strong>,</p>
                <p>Thank you for registering with CinePass, your premium cinema companion.</p>
                <p>You can now log in and explore the latest movies and showtimes!</p>
                <p style="margin-top: 20px;">
                    <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" style="display: inline-block; padding: 10px 20px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px;">
                        Go to Login
                    </a>
                </p>
                <p style="margin-top: 20px; font-size: 12px; color: #777;">Happy Booking!</p>
            </div>
        `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`[EMAIL] Welcome email sent to ${userEmail}`);
    } catch (error) {
        console.error(`[EMAIL ERROR] Failed to send welcome email to ${userEmail}:`, error);
        // Do not throw here, as registration should still complete even if the email fails.
    }
};
// ------------------------------------------
// 2. Function to send a booking confirmation email
const sendBookingConfirmation = async (userEmail, bookingDetails) => {
    const attachments = (bookingDetails.qrCodes || []).map((qr, index) => ({
        filename: `ticket-${qr.seat}.png`,
        content: qr.url.split("base64,")[1],
        encoding: 'base64',
        cid: `qr-${qr.seat}` // Case-sensitive CID for inline images
    }));

    const qrImagesHtml = (bookingDetails.qrCodes || []).map(qr => `
        <div style="text-align: center; display: inline-block; margin: 10px; border: 1px solid #ccc; padding: 10px; border-radius: 8px;">
            <p style="margin: 0 0 10px; font-weight: bold; color: #333;">Seat: ${qr.seat}</p>
            <img src="cid:qr-${qr.seat}" width="150" height="150" style="display: block;" />
        </div>
    `).join('');

    const mailOptions = {
        from: `CinePass <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: '🎟️ Booking Confirmation - CinePass',
        text: `Your booking has been confirmed!\n\nMovie: ${bookingDetails.movieTitle}\nShowtime: ${bookingDetails.showTime}\nSeats: ${bookingDetails.seats.join(', ')}\nTotal: ₹${bookingDetails.totalPrice}\n\nEnjoy your movie!`,
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 600px; margin: auto; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #6366f1; margin: 0; font-size: 28px;">CinePass</h1>
                    <p style="color: #64748b; margin-top: 5px;">Your Movie Experience, Perfected</p>
                </div>
                <h2 style="color: #10b981; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Booking Confirmed!</h2>
                <p>Hello! Your tickets for <strong>${bookingDetails.movieTitle}</strong> are ready.</p>
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
                    <p style="margin: 5px 0;"><strong>Movie:</strong> ${bookingDetails.movieTitle}</p>
                    <p style="margin: 5px 0;"><strong>Showtime:</strong> ${bookingDetails.showTime}</p>
                    <p style="margin: 5px 0;"><strong>Seats:</strong> ${bookingDetails.seats.join(', ')}</p>
                    <p style="margin: 5px 0;"><strong>Total Price:</strong> ₹${bookingDetails.totalPrice}</p>
                </div>

                <h3 style="color: #475569; margin-top: 30px;">Your E-Tickets:</h3>
                <div style="text-align: center;">
                    ${qrImagesHtml}
                </div>

                <div style="margin-top: 40px; padding: 20px; text-align: center; border-top: 2px solid #f1f5f9;">
                    <p style="color: #64748b; font-size: 14px;">Please present these QR codes at the theater entrance.</p>
                    <p style="color: #94a3b8; font-size: 12px; margin-top: 10px;">&copy; 2026 CinePass Movie Booking System. All Rights Reserved.</p>
                </div>
            </div>
        `,
        attachments: attachments
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`[EMAIL] Booking confirmation sent to ${userEmail}`);
    } catch (error) {
        console.error(`[EMAIL ERROR] Failed to send booking confirmation to ${userEmail}:`, error);
    }
};
// 3. Function to send a password reset email
const sendPasswordResetEmail = async (userEmail, resetURL) => {
    const mailOptions = {
        from: `CinePass <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: '🔑 Password Reset Request',
        text: `You requested a password reset at CinePass. Click the link below to verify your identity:\n\n${resetURL}\n\nIf you didn't request this, please ignore this email.`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #dc3545;">Password Reset Request</h2>
                <p>You requested to reset your password for CinePass.</p>
                <p style="margin: 20px 0;">
                    <a href="${resetURL}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #dc3545; text-decoration: none; border-radius: 5px;">
                        Reset Password
                    </a>
                </p>
                <p>If you didn't request this password reset, please ignore this email.</p>
                <p style="font-size: 12px; color: #777;">This link will expire in 10 minutes.</p>
            </div>
        `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`[EMAIL] Password reset email sent to ${userEmail}`);
    } catch (error) {
        console.error(`[EMAIL ERROR] Failed to send password reset email to ${userEmail}:`, error);
    }
};
module.exports = { 
    sendBookingConfirmation, 
    sendPasswordResetEmail,
    sendRegistrationWelcome // <-- NEW EXPORT
};