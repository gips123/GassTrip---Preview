'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, Check, Lock } from 'lucide-react';
import MiceIcon from '../components/MiceIcon';
import type { MiceRegisterTransformed } from '../core/mice-page.model';

interface MiceRegisterFormSectionProps {
  register: MiceRegisterTransformed;
}

export default function MiceRegisterFormSection({ register }: MiceRegisterFormSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [refNumber, setRefNumber] = useState('');
  const [eventType, setEventType] = useState('');
  const [radioError, setRadioError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearFieldError = (name: string) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const errors: Record<string, boolean> = {};
    let valid = true;

    const requiredFields = ['company', 'pic_name', 'email', 'phone', 'participants'];
    requiredFields.forEach((name) => {
      const value = (formData.get(name) as string)?.trim();
      if (!value) {
        errors[name] = true;
        valid = false;
      }
    });

    const agree = form.querySelector<HTMLInputElement>('#agree');
    if (!agree?.checked) {
      valid = false;
    }

    if (!eventType) {
      setRadioError(true);
      valid = false;
    } else {
      setRadioError(false);
    }

    setFieldErrors(errors);

    if (!valid) {
      alert(register.validationMessage);
      return;
    }

    const payload = Object.fromEntries(formData.entries()) as Record<string, string>;
    payload.event_type = eventType;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/mice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Gagal mengirim registrasi.');
      }

      setRefNumber(result.ref);
      setShowModal(true);
      form.reset();
      setEventType('');
      setFieldErrors({});
      setRadioError(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Gagal mengirim registrasi. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (name: string) =>
    `w-full rounded-[10px] border bg-mice-off-white px-3.5 py-2.5 text-sm text-mice-text outline-none transition focus:border-mice-gold focus:bg-white ${
      fieldErrors[name] ? 'border-red-500' : 'border-mice-gray-200'
    }`;

  return (
    <>
      <section id="register" className="mb-16">
        <div className="mb-8">
          <span className="mb-2 inline-block text-[11px] font-medium uppercase tracking-[2px] text-mice-gold-dark">
            {register.sectionLabel}
          </span>
          <h2 className="mb-2 text-3xl font-semibold text-mice-navy">{register.title}</h2>
          <p className="max-w-[540px] text-[15px] text-mice-text-muted">{register.description}</p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-mice-gray-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-br from-mice-navy to-mice-navy-mid px-8 py-7">
            <div>
              <h3 className="text-xl font-semibold text-white">{register.formTitle}</h3>
              <p className="text-[13px] text-white/55">{register.formSubtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {register.badges.map((badge) => (
                <span
                  key={badge.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-mice-gold/20 bg-mice-gold/15 px-3 py-1 text-[11px] text-mice-gold-light"
                >
                  <MiceIcon name={badge.icon} className="h-3 w-3" />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-5 flex items-center gap-2 border-b border-mice-gray-100 pb-2 text-[13px] font-medium text-mice-navy">
                <span className="inline-block h-3.5 w-0.5 rounded-sm bg-mice-gold" />
                {register.companySectionTitle}
              </div>

              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-wide text-mice-text-muted">
                    Nama Perusahaan <span className="text-mice-gold-dark">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="PT. Contoh Indonesia"
                    className={inputClass('company')}
                    onChange={() => clearFieldError('company')}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-wide text-mice-text-muted">Industri / Sektor</label>
                  <select name="industry" className={inputClass('industry')}>
                    <option value="">Pilih industri...</option>
                    {register.industryOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-wide text-mice-text-muted">
                    Nama PIC (Penanggung Jawab) <span className="text-mice-gold-dark">*</span>
                  </label>
                  <input
                    type="text"
                    name="pic_name"
                    placeholder="Nama lengkap Anda"
                    className={inputClass('pic_name')}
                    onChange={() => clearFieldError('pic_name')}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-wide text-mice-text-muted">Jabatan / Posisi</label>
                  <input type="text" name="position" placeholder="Manager / HRD / Direktur..." className={inputClass('position')} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-wide text-mice-text-muted">
                    Email Korporat <span className="text-mice-gold-dark">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="nama@perusahaan.com"
                    className={inputClass('email')}
                    onChange={() => clearFieldError('email')}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-wide text-mice-text-muted">
                    No. WhatsApp Aktif <span className="text-mice-gold-dark">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+62 812 xxxx xxxx"
                    className={inputClass('phone')}
                    onChange={() => clearFieldError('phone')}
                  />
                </div>
              </div>

              <div className="mb-5 flex items-center gap-2 border-b border-mice-gray-100 pb-2 text-[13px] font-medium text-mice-navy">
                <span className="inline-block h-3.5 w-0.5 rounded-sm bg-mice-gold" />
                {register.eventSectionTitle}
              </div>

              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-medium tracking-wide text-mice-text-muted">
                    Jenis Acara yang Dibutuhkan <span className="text-mice-gold-dark">*</span>
                  </label>
                  <div
                    className={`grid grid-cols-2 gap-2 rounded-lg md:grid-cols-3 ${
                      radioError ? 'p-2 outline outline-[1.5px] outline-red-500' : ''
                    }`}
                  >
                    {register.eventTypes.map((type) => (
                      <label
                        key={type.id}
                        className={`flex cursor-pointer items-center gap-2 rounded-[10px] border px-3.5 py-2.5 text-[13px] transition ${
                          eventType === type.value
                            ? 'border-mice-gold bg-mice-gold/[0.06] font-medium text-mice-navy'
                            : 'border-mice-gray-200 bg-mice-off-white text-mice-text'
                        }`}
                      >
                        <input
                          type="radio"
                          name="event_type"
                          value={type.value}
                          checked={eventType === type.value}
                          onChange={(e) => {
                            setEventType(e.target.value);
                            setRadioError(false);
                          }}
                          className="sr-only"
                        />
                        <span
                          className={`h-3.5 w-3.5 shrink-0 rounded-full border-[1.5px] ${
                            eventType === type.value
                              ? 'border-mice-gold bg-mice-gold'
                              : 'border-mice-gray-500'
                          }`}
                        />
                        <MiceIcon name={type.icon} className="h-4 w-4 shrink-0" />
                        {type.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-wide text-mice-text-muted">
                    Estimasi Jumlah Peserta <span className="text-mice-gold-dark">*</span>
                  </label>
                  <select
                    name="participants"
                    required
                    className={inputClass('participants')}
                    onChange={() => clearFieldError('participants')}
                  >
                    <option value="">Jumlah peserta...</option>
                    {register.participantOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-wide text-mice-text-muted">Paket yang Diminati</label>
                  <select name="package" className={inputClass('package')}>
                    <option value="">Pilih paket...</option>
                    {register.packageOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-wide text-mice-text-muted">Rencana Tanggal Acara</label>
                  <input type="date" name="event_date" className={inputClass('event_date')} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-wide text-mice-text-muted">Durasi Acara</label>
                  <select name="duration" className={inputClass('duration')}>
                    <option value="">Pilih durasi...</option>
                    {register.durationOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-wide text-mice-text-muted">Destinasi yang Diinginkan</label>
                  <input type="text" name="destination" placeholder="Bali, Yogyakarta, Singapura..." className={inputClass('destination')} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-wide text-mice-text-muted">Estimasi Budget</label>
                  <select name="budget" className={inputClass('budget')}>
                    <option value="">Kisaran budget...</option>
                    {register.budgetOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-medium tracking-wide text-mice-text-muted">
                    Ceritakan Kebutuhan Spesifik Anda
                  </label>
                  <textarea
                    name="notes"
                    rows={4}
                    placeholder="Jelaskan tema event, permintaan khusus, fasilitas yang dibutuhkan, atau hal lain yang ingin Anda sampaikan kepada tim kami..."
                    className={`${inputClass('notes')} min-h-[100px] resize-y`}
                  />
                </div>
              </div>

              <div className="flex items-start gap-2.5 py-3">
                <input type="checkbox" id="agree" required className="mt-0.5 h-4 w-4 shrink-0 accent-mice-gold-dark" />
                <span className="text-xs leading-relaxed text-mice-text-muted">{register.agreementText}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-gradient-to-br from-mice-gold to-mice-gold-dark py-4 text-[15px] font-medium tracking-wide text-mice-navy transition hover:-translate-y-px hover:opacity-90 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>{isSubmitting ? 'Mengirim...' : register.submitButtonLabel}</span>
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-mice-text-muted">
                <Lock className="h-3.5 w-3.5 text-mice-gold-dark" />
                {register.privacyNote}
              </p>
            </form>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-mice-navy/60 p-4">
          <div className="w-full max-w-[460px] rounded-3xl bg-white p-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-mice-gold/10 text-mice-gold-dark">
              <Check className="h-8 w-8" strokeWidth={2.5} />
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-mice-navy">{register.modalTitle}</h3>
            <p className="text-sm leading-relaxed text-mice-text-muted">{register.modalDescription}</p>
            <div className="my-5 rounded-[10px] bg-mice-off-white px-5 py-3 text-xs text-mice-text-muted">
              <strong className="mb-0.5 block text-sm text-mice-navy">{refNumber}</strong>
              {register.modalRefNote}
            </div>
            <p className="text-[13px] text-mice-text-muted">{register.modalFollowUp}</p>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-2 rounded-[10px] bg-mice-navy px-8 py-3 text-sm font-medium text-white transition hover:opacity-85"
            >
              {register.modalCloseLabel}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
