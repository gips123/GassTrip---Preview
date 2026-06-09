import { Resend } from 'resend';
import {
  buildContactEmailHtml,
  buildMiceRegistrationEmailHtml,
} from './templates';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
}

function getEmailConfig() {
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL;

  if (!from || !to) {
    throw new Error('RESEND_FROM_EMAIL and RESEND_TO_EMAIL must be configured');
  }

  return { from, to };
}

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const resend = getResendClient();
  const { from, to } = getEmailConfig();
  const emailSubject = subject?.trim() || `Pesan baru dari ${name}`;

  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `GassTrip - ${emailSubject}`,
    html: buildContactEmailHtml({
      name,
      email,
      subject: emailSubject,
      message,
    }),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function sendMiceRegistrationEmail(formData: Record<string, string>) {
  const resend = getResendClient();
  const { from, to } = getEmailConfig();

  const company = formData['Nama Perusahaan'] || formData.company || 'Perusahaan';
  const replyTo =
    formData['Email Korporat'] || formData.email || undefined;

  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo,
    subject: `[GassTrip MICE] Registrasi baru - ${company}`,
    html: buildMiceRegistrationEmailHtml(formData),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
