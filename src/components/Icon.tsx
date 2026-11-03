const paths = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  prev: <path d="m15 5-7 7 7 7" />,
  next: <path d="m9 5 7 7-7 7" />,
  phone: <path d="M6.6 3.5h2.6l1.4 4.1-2 1.4a12 12 0 0 0 6.4 6.4l1.4-2 4.1 1.4v2.6a1.8 1.8 0 0 1-2 1.8A16.6 16.6 0 0 1 4.8 5.5a1.8 1.8 0 0 1 1.8-2z" />,
  calendar: <><rect x="4" y="5" width="16" height="15" rx="1.5" /><path d="M4 10h16M9 3v4M15 3v4" /></>,
  whatsapp: <><path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.4 18.6z" /><path d="M9.2 8.6c.2 2.6 2.4 5 5.2 5.5l1-1.2-1.6-.9-.8.7a4.6 4.6 0 0 1-2.4-2.4l.7-.8-.9-1.6z" /></>,
};

export type IconName = keyof typeof paths;

export default function Icon({ name, size = 16, className = "" }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
