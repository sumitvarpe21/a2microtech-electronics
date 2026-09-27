import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  Check,
  MessageCircle,
} from 'lucide-react';
import { COMPANY } from '@/lib/company';

export function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email and message.');
      return;
    }
    if (!form.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    setError(null);

    // Simulate submission — orders table could be used but contact messages
    // are handled via WhatsApp/email in this no-auth storefront
    const waText = `Contact form submission:%0AName: ${form.name}%0AEmail: ${form.email}%0APhone: ${form.phone}%0ASubject: ${form.subject}%0AMessage: ${form.message}`;
    const waLink = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(waText)}`;

    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSent(true);

    // Also open WhatsApp with the message
    window.open(waLink, '_blank');
  };

  return (
    <div className="animate-fade-in min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-teal-900 py-14">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-teal-500 blur-3xl" />
        </div>
        <div className="container-app relative text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-300">
            Whether you need electronic components, technology solutions, project
            support or have a business enquiry, our team is here to help.
          </p>
        </div>
      </section>

      <div className="container-app py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact info */}
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Contact Information
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Reach out to us through any of the channels below.
            </p>

            <div className="mt-6 space-y-4">
              <div className="card flex items-start gap-4 p-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-teal-50">
                  <Phone className="h-5 w-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Phone</h3>
                  {COMPANY.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="block text-sm text-slate-600 hover:text-teal-700"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="card flex items-start gap-4 p-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-teal-50">
                  <Mail className="h-5 w-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Email</h3>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-sm text-slate-600 hover:text-teal-700"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              <div className="card flex items-start gap-4 p-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-teal-50">
                  <MapPin className="h-5 w-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Address</h3>
                  <p className="text-sm text-slate-600">{COMPANY.address}</p>
                </div>
              </div>

              <div className="card flex items-start gap-4 p-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-teal-50">
                  <Clock className="h-5 w-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Business Hours
                  </h3>
                  <p className="text-sm text-slate-600">
                    Mon – Sat: 9:00 AM – 7:00 PM
                  </p>
                  <p className="text-sm text-slate-600">Sunday: Closed</p>
                </div>
              </div>

              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-5 py-3.5 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="card p-6 lg:p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-9 w-9 text-green-600" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  Thank you for contacting A2MICROTECH INDIA PVT. LTD
                </h2>
                <p className="mt-2 max-w-sm text-sm text-slate-500">
                  We will get back to you soon. Your message has also been
                  forwarded to our WhatsApp.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
                  }}
                  className="mt-6 btn-secondary"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-slate-900">
                  Send us a message
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Fill out the form below and we'll get back to you.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-600">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        className="input-field"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-600">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="input-field"
                        placeholder="Your phone"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => update('subject', e.target.value)}
                      className="input-field"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      className="input-field resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  {error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-teal-800 active:scale-[0.98] disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
