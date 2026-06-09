import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email/resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nama, email, dan pesan wajib diisi.' },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Format email tidak valid.' }, { status: 400 });
    }

    const data = await sendContactEmail({ name, email, subject, message });

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('[contact] Failed to send email:', error);
    return NextResponse.json(
      { error: 'Gagal mengirim pesan. Silakan coba lagi nanti.' },
      { status: 500 }
    );
  }
}
