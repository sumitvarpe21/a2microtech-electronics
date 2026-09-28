import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  Cpu,
  Lightbulb,
  Wifi,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { COMPANY, CATEGORIES, CATEGORY_IMAGES } from '@/lib/company';

const ICONS: Record<string, typeof Cpu> = {
  'shield-check': ShieldCheck,
  truck: Truck,
  headphones: Headphones,
  cpu: Cpu,
  lightbulb: Lightbulb,
  wifi: Wifi,
};

export function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .order('id')
        .limit(8);
      if (!error && data) setFeatured(data as Product[]);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-teal-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-teal-500 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-cyan-500 blur-3xl" />
        </div>
        <div className="container-app relative grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 px-3 py-1 text-xs font-medium text-teal-300">
              <Sparkles className="h-3.5 w-3.5" />
              {COMPANY.tagline}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Electronic Components
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                For Every Builder
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300">
              {COMPANY.aboutLong}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary">
                Shop Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Buy on WhatsApp
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-white">20+</p>
                <p className="text-xs text-slate-400">Product Categories</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">COD</p>
                <p className="text-xs text-slate-400">Across India</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-slate-400">Quality Assured</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {featured.slice(0, 4).map((p, i) => (
                <div
                  key={p.id}
                  className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 transition-all hover:bg-white/10 ${
                    i % 2 === 1 ? 'translate-y-6' : ''
                  }`}
                >
                  <img
                    src={p.image || ''}
                    alt={p.name}
                    className="mb-3 h-28 w-full rounded-lg bg-white/90 object-contain p-2"
                    loading="lazy"
                  />
                  <p className="text-sm font-medium text-white line-clamp-1">
                    {p.name}
                  </p>
                  <p className="text-xs text-teal-400">
                    ₹{Number(p.price).toFixed(0)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-slate-100 bg-white">
        <div className="container-app grid grid-cols-1 gap-6 py-10 sm:grid-cols-3">
          {COMPANY.values.map((val) => {
            const Icon = ICONS[val.icon] || ShieldCheck;
            return (
              <div key={val.title} className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal-50">
                  <Icon className="h-6 w-6 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {val.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="container-app py-16">
        <div className="mb-8 text-center">
          <h2 className="section-title">Explore Categories</h2>
          <p className="section-subtitle">
            Find exactly what you need across our electronic component range
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-teal-300"
            >
              <img
                src={CATEGORY_IMAGES[cat] || CATEGORY_IMAGES['ICs']}
                alt={cat}
                className="h-full w-full object-cover opacity-80 transition-all group-hover:scale-110 group-hover:opacity-60"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-sm font-semibold text-white">{cat}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-slate-50 py-16">
        <div className="container-app">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">
                Top picks for your next electronics project
              </p>
            </div>
            <Link
              to="/products"
              className="hidden items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800 sm:flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] animate-pulse rounded-2xl bg-slate-200"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About teaser */}
      <section className="container-app py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
              <TrendingUp className="h-3.5 w-3.5" />
              About A2MICROTECH INDIA PVT. LTD
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              Building solutions with modern electronics
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {COMPANY.about}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Whether you need electronic components, technology solutions,
              project support or have a business enquiry, our team is here to
              help.
            </p>

            <div className="mt-6 space-y-3">
              {COMPANY.services.map((s) => {
                const Icon = ICONS[s.icon] || Cpu;
                return (
                  <div key={s.title} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50">
                      <Icon className="h-4.5 w-4.5 text-teal-700" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-500">{s.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link to="/about" className="mt-8 inline-flex btn-primary">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative">
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
        </div>
      </section>
    </div>
  );
}
