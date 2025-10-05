# EmailJS Setup Instructions

To make the contact form functional, you need to set up EmailJS. Follow these steps:

## 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Note down your **Template ID**

## 4. Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

## 5. Update Configuration
In `src/components/Contact.jsx`, replace these values:

```javascript
const serviceId = 'service_your_service_id' // Replace with your Service ID
const templateId = 'template_your_template_id' // Replace with your Template ID
const publicKey = 'your_public_key' // Replace with your Public Key
```

## 6. Test the Form
1. Start your development server: `npm run dev`
2. Go to the contact section
3. Fill out and submit the form
4. Check your email for the message

## Free Tier Limits
- 200 emails per month
- Perfect for a personal portfolio

## Security Note
The public key is safe to use in client-side code. EmailJS handles the security on their end.

## Alternative: Environment Variables
For better security, you can use environment variables:

1. Create `.env` file in your project root:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

2. Update Contact.jsx:
```javascript
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
```

3. Add `.env` to your `.gitignore` file
