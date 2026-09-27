import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Cpu,
  Truck,
  ShieldCheck,
  Headphones,
} from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY, CATEGORIES } from '@/lib/company';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-900 text-slate-300">
      {/* Feature strip */}
      <div className="border-b border-slate-800">
        <div className="container-app grid grid-cols-1 gap-6 py-8 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600/20">
              <ShieldCheck className="h-5 w-5 text-teal-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Quality Products</p>
              <p className="text-xs text-slate-400">Genuine components</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600/20">
              <Truck className="h-5 w-5 text-teal-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Fast Delivery</p>
              <p className="text-xs text-slate-400">Across India</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600/20">
              <Headphones className="h-5 w-5 text-teal-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Customer Support</p>
              <p className="text-xs text-slate-400">Dedicated help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-app grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4">
            <Logo variant="dark" />
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            {COMPANY.aboutLong}
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Categories
          </h3>
          <ul className="space-y-2.5 text-sm">
            {CATEGORIES.slice(0, 7).map((cat) => (
              <li key={cat}>
                <Link
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  className="text-slate-400 transition-colors hover:text-teal-400"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/products" className="text-slate-400 hover:text-teal-400">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-slate-400 hover:text-teal-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-slate-400 hover:text-teal-400">
                Contact Us
              </Link>
            </li>
            <li>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-teal-400"
              >
                Buy on WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-400" />
              <span>{COMPANY.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 flex-shrink-0 text-teal-400" />
              <a
                href={`tel:${COMPANY.phones[0]}`}
                className="hover:text-teal-400"
              >
                {COMPANY.phones[0]}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 flex-shrink-0 text-teal-400" />
              <a
                href={`mailto:${COMPANY.email}`}
                className="hover:text-teal-400"
              >
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="container-app flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row">
          <p className="flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-teal-500" />
            {COMPANY.copyright}
          </p>
          <p>Powered by A2 Microtech Technology Solutions</p>
        </div>
      </div>
    </footer>
  );
}
