import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Phone,
  Cpu,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Logo } from './Logo';
import { COMPANY, CATEGORIES } from '@/lib/company';

export function Header() {
  const { cartCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? 'text-teal-700'
        : 'text-slate-600 hover:text-slate-900'
    }`;

  return (
    <>
      {/* Top bar */}
      <div className="hidden bg-slate-900 text-slate-300 lg:block">
        <div className="container-app flex h-9 items-center justify-between text-xs">
          <span className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-teal-400" />
            <a href={`tel:${COMPANY.phones[0]}`} className="hover:text-white">
              {COMPANY.phones[0]}
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={`mailto:${COMPANY.email}`}
              className="hover:text-white"
            >
              {COMPANY.email}
            </a>
          </span>
          <span className="flex items-center gap-2">
            <Cpu className="h-3.5 w-3.5 text-teal-400" />
            <span>Available across India · Cash on Delivery</span>
          </span>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-40 border-b transition-all ${
          scrolled
            ? 'border-slate-200 bg-white/95 shadow-sm backdrop-blur'
            : 'border-transparent bg-white'
        }`}
      >
        <div className="container-app flex h-16 items-center justify-between gap-4">
          <Logo />

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden flex-1 max-w-md items-center md:flex"
          >
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search components, boards, sensors..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-6 lg:flex">
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/products" className={navLinkClass}>
                Products
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </nav>

            <button
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-600 px-1 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Category bar (desktop) */}
        <div className="hidden border-t border-slate-100 lg:block">
          <div className="container-app flex h-11 items-center gap-1 overflow-x-auto no-scrollbar">
            <Link
              to="/products"
              className="flex-shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-teal-700"
            >
              All Products
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="flex-shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-teal-700"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] animate-slide-in-right bg-white p-5 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <Logo />
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="mb-5">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:border-teal-500 focus:bg-white focus:outline-none"
                />
              </div>
            </form>

            <nav className="flex flex-col gap-1">
              <NavLink
                to="/"
                end
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Products
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Contact
              </NavLink>
            </nav>

            <div className="mt-6 border-t border-slate-100 pt-4">
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Categories
              </p>
              <div className="flex flex-col gap-0.5">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4">
              <a
                href={`tel:${COMPANY.phones[0]}`}
                className="flex items-center gap-2 px-3 text-sm font-medium text-teal-700"
              >
                <Phone className="h-4 w-4" />
                {COMPANY.phones[0]}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
