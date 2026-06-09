const BRAND = {
  navy: '#0a1628',
  navyMid: '#1a3a5c',
  blue: '#3b82f6',
  blueDark: '#1e3a8a',
  gold: '#f57723',
  goldDark: '#e8541a',
  offWhite: '#f8f7f4',
  gray100: '#f1f5f9',
  gray200: '#e2e8f0',
  gray500: '#64748b',
  text: '#1e293b',
  textMuted: '#64748b',
  white: '#ffffff',
};

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getSiteUrl() {
  return (
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://gasstrip.com'
  ).replace(/\/$/, '');
}

function getLogoUrl() {
  const cloudinaryUrl = process.env.CLOUDINARY_LOGO_URL?.trim();
  if (cloudinaryUrl) {
    return cloudinaryUrl;
  }

  return `${getSiteUrl()}/gasstrip-logo.png`;
}

function formatFieldRows(fields: { label: string; value: string }[]) {
  return fields
    .filter((field) => field.value.trim())
    .map(
      (field) => `
        <tr>
          <td style="padding:14px 16px;border-bottom:1px solid ${BRAND.gray200};width:34%;font-size:13px;font-weight:600;color:${BRAND.textMuted};vertical-align:top;background-color:${BRAND.gray100};">
            ${escapeHtml(field.label)}
          </td>
          <td style="padding:14px 16px;border-bottom:1px solid ${BRAND.gray200};font-size:14px;color:${BRAND.text};vertical-align:top;line-height:1.6;">
            ${escapeHtml(field.value).replace(/\n/g, '<br />')}
          </td>
        </tr>
      `
    )
    .join('');
}

interface EmailLayoutOptions {
  title: string;
  subtitle: string;
  bodyHtml: string;
}

function buildEmailLayout({
  title,
  subtitle,
  bodyHtml,
}: EmailLayoutOptions) {
  const logoUrl = getLogoUrl();
  const siteUrl = getSiteUrl();
  const year = new Date().getFullYear();
  const sentAt = new Date().toLocaleString('id-ID', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Asia/Jakarta',
  });

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.offWhite};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${BRAND.offWhite};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;background-color:${BRAND.white};border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(10,22,40,0.08);">
          <!-- Title -->
          <tr>
            <td style="padding:32px 32px 0;">
              <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${BRAND.navy};line-height:1.3;">${escapeHtml(title)}</h1>
              <p style="margin:0;font-size:14px;color:${BRAND.textMuted};line-height:1.6;">${escapeHtml(subtitle)}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:24px 32px 8px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:8px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${BRAND.gray100};border-radius:12px;">
                <tr>
                  <td style="padding:18px 20px;text-align:center;">
                    <p style="margin:0 0 6px;font-size:12px;color:${BRAND.textMuted};line-height:1.5;">
                      Email otomatis dari formulir website
                      <a href="${siteUrl}" style="color:${BRAND.blue};text-decoration:none;font-weight:600;">gasstrip.com</a>
                    </p>
                    <p style="margin:0;font-size:11px;color:${BRAND.gray500};">Diterima pada ${sentAt} WIB</p>
                  </td>
                </tr>
              </table>
              <img
                src="${logoUrl}"
                alt="GassTrip"
                width="130"
                height="130"
                style="display:block;margin:24px auto 12px;border:0;"
              />
              <p style="margin:0;text-align:center;font-size:11px;color:${BRAND.gray500};line-height:1.5;">
                &copy; ${year} GassTrip. Semua hak dilindungi.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildContactEmailHtml({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const fields = [
    { label: 'Nama Lengkap', value: name },
    { label: 'Email', value: email },
    { label: 'Subjek', value: subject },
  ];

  const bodyHtml = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${BRAND.gray200};border-radius:12px;overflow:hidden;">
      ${formatFieldRows(fields)}
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:16px;">
      <tr>
        <td style="padding:18px 20px;background-color:${BRAND.offWhite};border:1px solid ${BRAND.gray200};border-left:4px solid ${BRAND.blue};border-radius:12px;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:${BRAND.textMuted};text-transform:uppercase;letter-spacing:0.6px;">Pesan</p>
          <p style="margin:0;font-size:14px;color:${BRAND.text};line-height:1.7;white-space:pre-wrap;">${escapeHtml(message).replace(/\n/g, '<br />')}</p>
        </td>
      </tr>
    </table>
    <p style="margin:16px 0 0;font-size:12px;color:${BRAND.textMuted};line-height:1.5;">
      Balas email ini untuk langsung menghubungi <strong style="color:${BRAND.text};">${escapeHtml(name)}</strong>.
    </p>
  `;

  return buildEmailLayout({
    title: 'Pesan Baru Masuk',
    subtitle: 'Ada pengunjung yang mengirim pesan melalui formulir contact di website.',
    bodyHtml,
  });
}

export function buildMiceRegistrationEmailHtml(formData: Record<string, string>) {
  const ref = formData.Referensi || formData.ref || '';
  const company = formData['Nama Perusahaan'] || formData.company || 'Perusahaan';

  const fields = Object.entries(formData)
    .filter(([key, value]) => value.trim() && key !== 'ref')
    .map(([label, value]) => ({ label, value }));

  const bodyHtml = `
    ${
      ref
        ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:16px;">
            <tr>
              <td style="padding:14px 18px;background:linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.navyMid} 100%);border-radius:12px;text-align:center;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.8px;">Nomor Referensi</p>
                <p style="margin:0;font-size:20px;font-weight:700;color:${BRAND.gold};letter-spacing:1px;">${escapeHtml(ref)}</p>
              </td>
            </tr>
          </table>`
        : ''
    }
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${BRAND.gray200};border-radius:12px;overflow:hidden;">
      ${formatFieldRows(fields)}
    </table>
    <p style="margin:16px 0 0;font-size:12px;color:${BRAND.textMuted};line-height:1.5;">
      Registrasi MICE dari <strong style="color:${BRAND.text};">${escapeHtml(company)}</strong>. Segera follow up dalam 1×24 jam.
    </p>
  `;

  return buildEmailLayout({
    title: 'Registrasi MICE Baru',
    subtitle: 'Perusahaan baru mendaftar untuk konsultasi kebutuhan MICE melalui website.',
    bodyHtml,
  });
}
