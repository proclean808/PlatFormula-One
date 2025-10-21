import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime

class EmailService:
    """Email service using Gmail SMTP with fallback logging"""
    
    def __init__(self):
        self.smtp_server = "smtp.gmail.com"
        self.smtp_port = 587
        self.sender_email = os.getenv('GMAIL_EMAIL', 'alphabotsteam@gmail.com')
        self.sender_password = os.getenv('GMAIL_APP_PASSWORD', '')  # Use App Password
        self.platform_email = "Jonathan@Behrendterprises.com"
        self.forward_to = "contact@alphabots.team"
        self.log_file = "/home/ubuntu/platformula-permanent/email_log.txt"
    
    def _log_email(self, to_email, subject, content):
        """Log email to file when SMTP fails"""
        try:
            with open(self.log_file, 'a') as f:
                f.write(f"\n{'='*80}\n")
                f.write(f"[{datetime.now().isoformat()}]\n")
                f.write(f"To: {to_email}\n")
                f.write(f"Subject: {subject}\n")
                f.write(f"Content:\n{content}\n")
                f.write(f"{'='*80}\n")
        except Exception as e:
            print(f"Error logging email: {str(e)}")
    
    def send_email(self, to_email, subject, html_content, text_content=None):
        """Send email via Gmail SMTP or log if credentials not available"""
        
        # If no App Password is set, log the email instead
        if not self.sender_password:
            print(f"[EMAIL LOG] To: {to_email}, Subject: {subject}")
            self._log_email(to_email, subject, text_content or html_content)
            return True
        
        try:
            message = MIMEMultipart('alternative')
            message['Subject'] = subject
            message['From'] = f"PlatFormula.One <{self.sender_email}>"
            message['To'] = to_email
            
            # Add text version
            if text_content:
                part1 = MIMEText(text_content, 'plain')
                message.attach(part1)
            
            # Add HTML version
            part2 = MIMEText(html_content, 'html')
            message.attach(part2)
            
            # Send email via Gmail
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.sendmail(self.sender_email, to_email, message.as_string())
            
            print(f"[EMAIL SENT] To: {to_email}, Subject: {subject}")
            return True
            
        except Exception as e:
            print(f"[EMAIL ERROR] {str(e)} - Logging email instead")
            self._log_email(to_email, subject, text_content or html_content)
            return True  # Return True so app doesn't fail
    
    def send_welcome_email(self, user_email, username):
        """Send welcome email to new users"""
        subject = "Welcome to PlatFormula.One! 🚀"
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to PlatFormula.One!</h1>
                </div>
                <div style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 10px 10px;">
                    <p style="font-size: 16px;">Hi <strong>{username}</strong>,</p>
                    <p>Thank you for joining <strong>PlatFormula.One</strong> - the ultimate AI-powered startup accelerator program platform.</p>
                    
                    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                        <h3 style="color: #10b981; margin-top: 0;">You now have access to:</h3>
                        <ul style="line-height: 2;">
                            <li>🤖 <strong>AI-powered application builder</strong></li>
                            <li>📊 <strong>Top accelerator directory</strong></li>
                            <li>📈 <strong>Application tracking dashboard</strong></li>
                            <li>📚 <strong>Curated startup resources</strong></li>
                            <li>👥 <strong>Community platform</strong></li>
                        </ul>
                    </div>
                    
                    <p>Get started by completing your profile and exploring the platform!</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://19hnincmlxwj.manus.space/" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px;">Go to Dashboard →</a>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                    
                    <p style="color: #6b7280; font-size: 14px; margin: 0;">
                        Best regards,<br>
                        <strong>The PlatFormula.One Team</strong><br>
                        {self.platform_email}
                    </p>
                </div>
            </body>
        </html>
        """
        text_content = f"Welcome to PlatFormula.One, {username}! Thank you for joining our platform. Visit https://19hnincmlxwj.manus.space/ to get started."
        
        return self.send_email(user_email, subject, html_content, text_content)
    
    def send_application_submitted_email(self, user_email, accelerator_name, application_id):
        """Send confirmation email when application is submitted"""
        subject = f"✅ Application Submitted: {accelerator_name}"
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">Application Submitted! ✅</h1>
                </div>
                <div style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 10px 10px;">
                    <p style="font-size: 16px;">Great news!</p>
                    <p>Your application to <strong style="color: #10b981;">{accelerator_name}</strong> has been successfully submitted.</p>
                    
                    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                        <p style="color: #6b7280; margin: 0; font-size: 14px;">Application ID</p>
                        <p style="font-size: 24px; font-weight: bold; color: #10b981; margin: 10px 0;">#{application_id}</p>
                    </div>
                    
                    <p>We'll track your application status and notify you of any updates.</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://19hnincmlxwj.manus.space/" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px;">View Application →</a>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                    
                    <p style="color: #6b7280; font-size: 14px; margin: 0;">
                        Best regards,<br>
                        <strong>The PlatFormula.One Team</strong>
                    </p>
                </div>
            </body>
        </html>
        """
        text_content = f"Your application to {accelerator_name} has been submitted successfully. Application ID: #{application_id}. Visit https://19hnincmlxwj.manus.space/ to view it."
        
        return self.send_email(user_email, subject, html_content, text_content)
    
    def send_contact_form_notification(self, admin_email, name, email, subject, message):
        """Send notification when contact form is submitted"""
        email_subject = f"📧 New Contact: {subject}"
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                </div>
                <div style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 10px 10px;">
                    <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="margin: 5px 0;"><strong>From:</strong> {name}</p>
                        <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:{email}" style="color: #10b981;">{email}</a></p>
                        <p style="margin: 5px 0;"><strong>Subject:</strong> {subject}</p>
                    </div>
                    
                    <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                        <p style="margin: 0 0 10px 0; font-weight: bold; color: #10b981;">Message:</p>
                        <p style="margin: 0; white-space: pre-wrap;">{message}</p>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="mailto:{email}" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px;">Reply to {name} →</a>
                    </div>
                </div>
            </body>
        </html>
        """
        text_content = f"New contact form submission\n\nFrom: {name} ({email})\nSubject: {subject}\n\nMessage:\n{message}\n\nReply to: {email}"
        
        # Send to both admin and forward address
        self.send_email(admin_email, email_subject, html_content, text_content)
        if self.forward_to != admin_email:
            self.send_email(self.forward_to, email_subject, html_content, text_content)
        
        return True

email_service = EmailService()

