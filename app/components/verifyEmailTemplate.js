const hmtlContent = (userName,verificationLink) => {
  const hmtlTemplate = (
    <div>
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="font-size: 28px; color: #6c5ce7;">Issue Tracker</span>
      </div>

      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="margin-top: 0;">Verify Your Email Address</h1>
        <p>
          Thank you for signing up. Please verify your email address to access
          all features.
        </p>
      </div>

      <div style="margin: 25px 0; padding: 10px 15px; border-radius: 4px; text-align: center; background-color: rgba(255, 100, 100, 0.2); border-left: 4px solid #ff6464;">
        <p style="margin: 0;">
          <strong>Email Status:</strong> Verification Pending
        </p>
      </div>

      <p>Hello {{ userName }},</p>

      <p>
        We're excited to have you onboard! To complete your registration and
        access all of our features, please verify your email address by clicking
        the button below:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a
          href="{{verificationLink}}"
          style="display: inline-block; width: 200px; padding: 12px 24px; background-color: #6c5ce7; color: white; text-align: center; text-decoration: none; border-radius: 4px; font-weight: bold;"
        >
          Verify My Email
        </a>
      </div>

      <div style="background-color: rgba(255, 149, 0, 0.2); border-left: 4px solid #ff9500; padding: 10px 15px; margin: 20px 0; border-radius: 4px;">
        <p style="margin: 0;">
          <strong>Note:</strong> This verification link will expire in 24 hours.
        </p>
      </div>

      <div style="background-color: rgba(46, 204, 113, 0.2); border-left: 4px solid #2ecc71; padding: 10px 15px; margin: 20px 0; border-radius: 4px;">
        <p style="margin: 0;">
          Once verified, your account status will change to{" "}
          <strong>Active</strong>, and you'll have full access to all features.
        </p>
      </div>

      <p>
        If you didn't create an account with us, please disregard this email.
      </p>

      <p>
        If you're having trouble clicking the button, copy and paste the URL
        below into your web browser:
      </p>
      <p style="word-break: break-all; font-size: 12px;">
        {{ verificationLink }}
      </p>

      <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666666;">
        <p style="margin: 5px 0;">&copy; 2025 YourApp. All rights reserved.</p>
        <p style="margin: 5px 0;">123 App Street, San Francisco, CA 94107</p>
      </div>
    </div>
  );

  return hmtlTemplate
};

export default hmtlContent
