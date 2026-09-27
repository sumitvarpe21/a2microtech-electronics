import { Link } from 'react-router-dom';

export function Logo({
  className = '',
  variant = 'light',
}: {
  className?: string;
  variant?: 'light' | 'dark';
}) {
  const textColor = variant === 'dark' ? 'text-white' : 'text-slate-900';
  const accentColor = variant === 'dark' ? 'text-teal-400' : 'text-teal-700';
  const subtitleColor =
    variant === 'dark' ? 'text-slate-400' : 'text-slate-400';

  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/a2microtech-logo.jpg"
        alt="A2 Microtech"
        className="h-10 w-10 flex-shrink-0 rounded-lg object-cover shadow-sm ring-1 ring-black/5"
      />
      <div className="flex flex-col leading-none">
        <span className={`text-lg font-bold tracking-tight ${textColor}`}>
          A2<span className={accentColor}>Microtech</span>
        </span>
        <span
          className={`text-[10px] font-medium uppercase tracking-wider ${subtitleColor}`}
        >
          Electronics & Tech
        </span>
      </div>
    </Link>
  );
}

export function LogoCompact() {
  return (
    <img
      src="/a2microtech-logo.jpg"
      alt="A2 Microtech"
      className="h-10 w-10 rounded-lg object-cover shadow-sm"
    />
  );
}
