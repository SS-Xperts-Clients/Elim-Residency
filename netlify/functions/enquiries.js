import nodemailer from 'nodemailer';

const jsonHeaders = {
  'Content-Type': 'application/json'
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: jsonHeaders,
    body: JSON.stringify(body)
  };
}

function required(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateEnquiry(body) {
  const errors = [];

  if (!required(body.fullName)) errors.push('Full name is required.');
  if (!required(body.email)) errors.push('Email address is required.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email || '')) {
    errors.push('A valid email address is required.');
  }
  if (!required(body.phone)) errors.push('Phone number is required.');
  if (!required(body.roomType)) errors.push('Room type is required.');
  if (!required(body.message)) errors.push('Message is required.');
  if (body.consent !== true) errors.push('Consent is required.');

  return errors;
}

function escapeHtml(value) {
  return String(value).replace(/[<>&]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[char]);
}

function createTransporter() {
  const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_TO'];
  const missing = requiredEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing email configuration: ${missing.join(', ')}`);
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

function buildEmail(body) {
  const submitted = [
    ['Full name', body.fullName],
    ['Email', body.email],
    ['Phone', body.phone],
    ['Academic institution', body.institution || 'Not supplied'],
    ['Room type', body.roomType],
    ['Intended move-in date', body.moveInDate || 'Not supplied'],
    ['Message', body.message]
  ];

  const text = submitted.map(([label, value]) => `${label}: ${value}`).join('\n');
  const htmlRows = submitted
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px;border-bottom:1px solid #ddd">${label}</th><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join('');

  return {
    text,
    html: `<h2>New Elim Website Enquiry</h2><table cellspacing="0" cellpadding="0">${htmlRows}</table>`
  };
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed.' });
  }

  let body;

  try {
    body = JSON.parse(event.body || '{}');
  } catch (error) {
    return json(400, { error: 'Invalid request body.' });
  }

  const errors = validateEnquiry(body);

  if (errors.length > 0) {
    return json(400, { error: errors[0], errors });
  }

  try {
    const transporter = createTransporter();
    const email = buildEmail(body);

    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      replyTo: body.email,
      subject: `Elim enquiry from ${body.fullName}`,
      text: email.text,
      html: email.html
    });

    return json(200, { ok: true });
  } catch (error) {
    console.error('Failed to send enquiry email:', error);
    return json(500, { error: 'The enquiry could not be sent right now.' });
  }
}
