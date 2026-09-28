import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  Headphones,
  Cpu,
  Lightbulb,
  Wifi,
  Target,
  Users,
  ArrowRight,
  Mail,
  Phone,
} from 'lucide-react';
import { COMPANY } from '@/lib/company';

const ICONS: Record<string, typeof Cpu> = {
  'shield-check': ShieldCheck,
  truck: Truck,
  headphones: Headphones,
  cpu: Cpu,
  lightbulb: Lightbulb,
  wifi: Wifi,
};

export function AboutPage() {
  return (
    <div className="animate-fade-in min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-teal-900 py-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-teal-500 blur-3xl" />
        </div>
        <div className="container-app relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 px-3 py-1 text-xs font-medium text-teal-300">
            About A2MICROTECH INDIA PVT. LTD
          </span>
          <h1 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Building solutions with modern electronics
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
            {COMPANY.about}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container-app py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Our Story</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {COMPANY.aboutLong}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Whether you need electronic components, technology solutions,
              project support or have a business enquiry, our team is here to
              help. We serve students, developers, businesses and technology
              enthusiasts across India.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              From development boards and sensors to complete prototyping
              support, A2 Microtech is your trusted partner in electronics and
              digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/7097230/pexels-photo-7097230.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Development boards"
              className="aspect-square w-full rounded-2xl object-cover"
              loading="lazy"
            />
            <img
              src="https://images.pexels.com/photos/14887613/pexels-photo-14887613.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Electronic components"
              className="mt-8 aspect-square w-full rounded-2xl object-cover"
              loading="lazy"
            />
            <img
              src="https://images.pexels.com/photos/343457/pexels-photo-343457.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Circuit boards"
              className="aspect-square w-full rounded-2xl object-cover"
              loading="lazy"
            />
            <img
              src="https://images.pexels.com/photos/7989742/pexels-photo-7989742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="IoT solutions"
              className="mt-8 aspect-square w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-white py-16">
        <div className="container-app">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
                <Target className="h-6 w-6 text-teal-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {COMPANY.mission}
              </p>
            </div>

            {COMPANY.values.map((val) => {
              const Icon = ICONS[val.icon] || ShieldCheck;
              return (
                <div key={val.title} className="rounded-2xl border border-slate-200 p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
                    <Icon className="h-6 w-6 text-teal-700" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{val.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-app py-16">
        <div className="mb-8 text-center">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive electronics and technology solutions
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {COMPANY.services.map((s) => {
            const Icon = ICONS[s.icon] || Cpu;
            return (
              <div key={s.title} className="card p-6 hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-cyan-500">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16">
        <div className="container-app">
          <div className="mb-8 text-center">
            <h2 className="section-title">Our Team</h2>
            <p className="section-subtitle">
              The people behind A2 Microtech
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
            {COMPANY.team.map((member) => (
              <div
                key={member.name}
                className="card p-6 text-center hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 text-2xl font-bold text-white">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-teal-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-app py-16">
        <div className="rounded-3xl bg-gradient-to-br from-teal-700 to-cyan-700 p-10 text-center">
          <Users className="mx-auto h-10 w-10 text-white/80" />
          <h2 className="mt-4 text-2xl font-bold text-white">
            Need help with your project?
          </h2>
          <p className="mt-2 text-sm text-teal-100">
            Our team is ready to assist you with components, solutions and support.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-teal-700 hover:bg-teal-50">
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              {COMPANY.email}
            </a>
            <a
              href={`tel:${COMPANY.phones[0]}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              {COMPANY.phones[0]}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
