import { NextResponse } from 'next/server';
import { sendMiceRegistrationEmail } from '@/lib/email/resend';

const fieldLabels: Record<string, string> = {
  company: 'Nama Perusahaan',
  industry: 'Industri / Sektor',
  pic_name: 'Nama PIC',
  position: 'Jabatan / Posisi',
  email: 'Email Korporat',
  phone: 'No. WhatsApp',
  event_type: 'Jenis Acara',
  participants: 'Jumlah Peserta',
  package: 'Paket Diminati',
  event_date: 'Rencana Tanggal',
  duration: 'Durasi Acara',
  destination: 'Destinasi',
  budget: 'Estimasi Budget',
  notes: 'Kebutuhan Spesifik',
  ref: 'Referensi',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const company = typeof body.company === 'string' ? body.company.trim() : '';
    const picName = typeof body.pic_name === 'string' ? body.pic_name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const eventType = typeof body.event_type === 'string' ? body.event_type.trim() : '';
    const participants = typeof body.participants === 'string' ? body.participants.trim() : '';

    if (!company || !picName || !email || !phone || !eventType || !participants) {
      return NextResponse.json(
        { error: 'Mohon lengkapi semua field yang wajib diisi.' },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Format email tidak valid.' }, { status: 400 });
    }

    const ref = `GT-MICE-${Date.now().toString().slice(-6)}`;
    const labeledData: Record<string, string> = { ref };

    Object.entries(body).forEach(([key, value]) => {
      if (typeof value === 'string' && value.trim()) {
        labeledData[fieldLabels[key] || key] = value.trim();
      }
    });

    const data = await sendMiceRegistrationEmail(labeledData);

    return NextResponse.json({ success: true, id: data?.id, ref });
  } catch (error) {
    console.error('[mice] Failed to send email:', error);
    return NextResponse.json(
      { error: 'Gagal mengirim registrasi. Silakan coba lagi nanti.' },
      { status: 500 }
    );
  }
}
