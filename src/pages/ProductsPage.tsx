import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, Search, X, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { CATEGORIES } from '@/lib/company';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<SortOption>('featured');

  const category = searchParams.get('category') || '';
  const query = searchParams.get('q') || '';

  useEffect(() => {
    (async () => {
      setLoading(true);
      let dbQuery = supabase.from('products').select('*');

      if (category) {
        dbQuery = dbQuery.eq('category', category);
      }

      const { data, error } = await dbQuery.order('id');
      if (!error && data) {
        setProducts(data as Product[]);
      }
      setLoading(false);
    })();
  }, [category, query]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q),
      );
    }
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return result;
  }, [products, query, sort]);

  const setCategory = (cat: string) => {
    const next = new URLSearchParams(searchParams);
    if (cat) next.set('category', cat);
    else next.delete('category');
    setSearchParams(next);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container-app flex items-center gap-1.5 py-3 text-xs text-slate-500">
          <Link to="/" className="hover:text-teal-700">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/products" className="hover:text-teal-700">
            Products
          </Link>
          {category && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-slate-700">{category}</span>
            </>
          )}
        </div>
      </div>

      <div className="container-app py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {category || 'All Products'}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {loading
                ? 'Loading...'
                : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
              {query && ` for "${query}"`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-teal-400 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 focus:border-teal-500 focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside
            className={`${
              showFilters ? 'fixed inset-0 z-50 lg:relative lg:z-auto' : 'hidden lg:block'
            }`}
          >
            {showFilters && (
              <div
                className="absolute inset-0 bg-slate-900/40 lg:hidden"
                onClick={() => setShowFilters(false)}
              />
            )}
            <div
              className={`relative w-64 max-w-[80vw] flex-shrink-0 overflow-y-auto bg-white p-5 lg:sticky lg:top-24 lg:rounded-2xl lg:border lg:border-slate-200 ${
                showFilters ? 'absolute right-0 top-0 h-full' : ''
              }`}
            >
              <div className="mb-4 flex items-center justify-between lg:hidden">
                <h3 className="text-sm font-bold text-slate-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-slate-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Categories
                </h3>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setCategory('')}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        !category
                          ? 'bg-teal-50 font-semibold text-teal-700'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      All Products
                    </button>
                  </li>
                  {CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setCategory(cat)}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          category === cat
                            ? 'bg-teal-50 font-semibold text-teal-700'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {(category || query) && (
                <button
                  onClick={clearFilters}
                  className="w-full rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] animate-pulse rounded-2xl bg-slate-200"
                  />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-center">
                <Search className="h-12 w-12 text-slate-300" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  No products found
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 btn-primary"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
